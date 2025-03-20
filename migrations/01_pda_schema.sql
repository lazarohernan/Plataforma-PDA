-- Esquema de Base de Datos para Plataforma PDA
-- Creado: Marzo 2025

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Función para actualizar timestamps
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 1. TABLAS DE AUTENTICACIÓN Y ROLES
-- =============================================

-- Tabla de roles
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL UNIQUE,
  descripcion TEXT,
  nivel INTEGER NOT NULL, -- 1: Admin sistema, 2: Consultor, 3: Asistente, 4: Usuario evaluado
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de organizaciones (para los consultores que adquieren el sistema)
CREATE TABLE IF NOT EXISTS organizaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  plan_suscripcion TEXT, -- tipo de plan contratado
  estado TEXT NOT NULL DEFAULT 'activo', -- activo, suspendido, etc.
  logo_url TEXT,
  configuracion JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de perfiles de usuario (complementa auth.users)
CREATE TABLE IF NOT EXISTS perfiles_usuario (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombres TEXT,
  apellidos TEXT,
  organizacion_id UUID REFERENCES organizaciones(id) ON DELETE CASCADE,
  rol_id UUID REFERENCES roles(id) ON DELETE RESTRICT,
  configuracion_personal JSONB, -- preferencias de usuario
  asignado_por UUID REFERENCES auth.users(id), -- quién asignó a este usuario (para asistentes)
  activo BOOLEAN DEFAULT TRUE,
  ultimo_acceso TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 2. TABLAS PARA GESTIÓN DE EVALUACIONES
-- =============================================

-- Tabla de perfiles de puesto
CREATE TABLE IF NOT EXISTS perfiles_puesto (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  organizacion_id UUID REFERENCES organizaciones(id) ON DELETE CASCADE,
  creado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  perfil JSONB NOT NULL, -- valores para cada eje (R, E, P, N, A)
  competencias JSONB, -- competencias asociadas al perfil
  activo BOOLEAN DEFAULT TRUE,
  publico BOOLEAN DEFAULT FALSE, -- si puede ser usado por toda la organización
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de evaluaciones (asignación de pruebas)
CREATE TABLE IF NOT EXISTS evaluaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT,
  descripcion TEXT,
  organizacion_id UUID REFERENCES organizaciones(id) ON DELETE CASCADE,
  asignado_por UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Consultor o asistente que asigna
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Usuario evaluado
  perfil_puesto_id UUID REFERENCES perfiles_puesto(id) ON DELETE SET NULL, -- Opcional para compatibilidad
  fecha_asignacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_vencimiento TIMESTAMP WITH TIME ZONE,
  estado TEXT NOT NULL DEFAULT 'pendiente', -- pendiente, en_progreso, completada, vencida
  codigo_acceso TEXT UNIQUE, -- Para acceso sin login (opcional)
  anonima BOOLEAN DEFAULT FALSE, -- Si la evaluación es anónima
  metadatos JSONB, -- Información adicional
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 3. TABLAS PARA RESULTADOS DE EVALUACIONES
-- =============================================

-- Tabla de resultados de evaluaciones
CREATE TABLE IF NOT EXISTS resultados_evaluacion (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  evaluacion_id UUID REFERENCES evaluaciones(id) ON DELETE CASCADE,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tiempo_completado INTEGER, -- en segundos
  perfil_natural JSONB NOT NULL, -- perfil normalizado (R,E,P,N,A)
  perfil_adaptado JSONB NOT NULL, -- perfil normalizado (R,E,P,N,A)
  indicadores JSONB NOT NULL, -- indicadores derivados
  compatibilidad JSONB, -- resultado de compatibilidad (si aplica)
  version_algoritmo TEXT, -- versión del algoritmo utilizado
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de descriptores seleccionados
CREATE TABLE IF NOT EXISTS descriptores_seleccionados (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resultado_id UUID REFERENCES resultados_evaluacion(id) ON DELETE CASCADE,
  tipo_perfil TEXT NOT NULL CHECK (tipo_perfil IN ('natural', 'adaptado')),
  descriptor_id TEXT NOT NULL, -- ID del descriptor seleccionado
  orden_seleccion INTEGER, -- orden en que fue seleccionado
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para datos de validación del algoritmo
CREATE TABLE IF NOT EXISTS datos_validacion (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resultado_id UUID REFERENCES resultados_evaluacion(id) ON DELETE CASCADE,
  valores_crudos JSONB, -- valores antes de normalización
  contradicciones INTEGER, -- número de contradicciones detectadas
  parametros_normalizacion JSONB, -- parámetros utilizados
  valoracion_precision INTEGER, -- valoración de precisión (1-10)
  comentarios TEXT, -- comentarios del evaluado o evaluador
  validado_por UUID REFERENCES auth.users(id), -- validado por experto (opcional)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 4. TABLAS PARA ANÁLISIS Y REPORTES
-- =============================================

-- Tabla para reportes generados
CREATE TABLE IF NOT EXISTS reportes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizacion_id UUID REFERENCES organizaciones(id) ON DELETE CASCADE,
  creado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  tipo TEXT NOT NULL, -- individual, comparativo, equipo, etc.
  contenido JSONB NOT NULL, -- contenido del reporte
  resultados_incluidos UUID[] NOT NULL, -- array de IDs de resultados incluidos
  publico BOOLEAN DEFAULT FALSE, -- si puede ser visto por toda la organización
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para grupos de análisis
CREATE TABLE IF NOT EXISTS grupos_analisis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizacion_id UUID REFERENCES organizaciones(id) ON DELETE CASCADE,
  creado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  miembros UUID[] NOT NULL, -- array de IDs de usuarios incluidos
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 5. DISPARADORES PARA ACTUALIZACIÓN DE TIMESTAMPS
-- =============================================

-- Disparador para roles
CREATE TRIGGER set_timestamp_roles
BEFORE UPDATE ON roles
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- Disparador para organizaciones
CREATE TRIGGER set_timestamp_organizaciones
BEFORE UPDATE ON organizaciones
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- Disparador para perfiles_usuario
CREATE TRIGGER set_timestamp_perfiles_usuario
BEFORE UPDATE ON perfiles_usuario
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- Disparador para perfiles_puesto
CREATE TRIGGER set_timestamp_perfiles_puesto
BEFORE UPDATE ON perfiles_puesto
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- Disparador para evaluaciones
CREATE TRIGGER set_timestamp_evaluaciones
BEFORE UPDATE ON evaluaciones
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- Disparador para resultados_evaluacion
CREATE TRIGGER set_timestamp_resultados_evaluacion
BEFORE UPDATE ON resultados_evaluacion
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- Disparador para datos_validacion
CREATE TRIGGER set_timestamp_datos_validacion
BEFORE UPDATE ON datos_validacion
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- Disparador para reportes
CREATE TRIGGER set_timestamp_reportes
BEFORE UPDATE ON reportes
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- Disparador para grupos_analisis
CREATE TRIGGER set_timestamp_grupos_analisis
BEFORE UPDATE ON grupos_analisis
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- =============================================
-- 6. POLÍTICAS DE SEGURIDAD (RLS)
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfiles_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfiles_puesto ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultados_evaluacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE descriptores_seleccionados ENABLE ROW LEVEL SECURITY;
ALTER TABLE datos_validacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE reportes ENABLE ROW LEVEL SECURITY;
ALTER TABLE grupos_analisis ENABLE ROW LEVEL SECURITY;

-- Crear función para obtener el rol del usuario actual
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS INTEGER AS $$
DECLARE
  role_level INTEGER;
BEGIN
  SELECT r.nivel INTO role_level
  FROM perfiles_usuario pu
  JOIN roles r ON pu.rol_id = r.id
  WHERE pu.id = auth.uid();
  
  RETURN COALESCE(role_level, 4); -- Default a usuario evaluado si no se encuentra
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear función para obtener la organización del usuario actual
CREATE OR REPLACE FUNCTION get_user_organization()
RETURNS UUID AS $$
DECLARE
  org_id UUID;
BEGIN
  SELECT organizacion_id INTO org_id
  FROM perfiles_usuario
  WHERE id = auth.uid();
  
  RETURN org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Políticas para roles
CREATE POLICY "Administradores pueden ver todos los roles" 
  ON roles FOR SELECT
  USING (get_user_role() = 1);

CREATE POLICY "Consultores pueden ver roles de nivel inferior" 
  ON roles FOR SELECT
  USING (get_user_role() = 2 AND nivel >= 2);

CREATE POLICY "Asistentes pueden ver roles de nivel usuario" 
  ON roles FOR SELECT
  USING (get_user_role() = 3 AND nivel = 4);

CREATE POLICY "Administradores pueden crear roles" 
  ON roles FOR INSERT
  WITH CHECK (get_user_role() = 1);

CREATE POLICY "Administradores pueden actualizar roles" 
  ON roles FOR UPDATE
  USING (get_user_role() = 1);

-- Políticas para organizaciones
CREATE POLICY "Administradores pueden ver todas las organizaciones" 
  ON organizaciones FOR SELECT
  USING (get_user_role() = 1);

CREATE POLICY "Usuarios pueden ver su propia organización" 
  ON organizaciones FOR SELECT
  USING (id = get_user_organization());

CREATE POLICY "Administradores pueden crear organizaciones" 
  ON organizaciones FOR INSERT
  WITH CHECK (get_user_role() = 1);

CREATE POLICY "Administradores pueden actualizar organizaciones" 
  ON organizaciones FOR UPDATE
  USING (get_user_role() = 1);

CREATE POLICY "Consultores pueden actualizar su propia organización" 
  ON organizaciones FOR UPDATE
  USING (id = get_user_organization() AND get_user_role() = 2);

-- Políticas para perfiles_usuario
CREATE POLICY "Administradores pueden ver todos los perfiles" 
  ON perfiles_usuario FOR SELECT
  USING (get_user_role() = 1);

CREATE POLICY "Consultores pueden ver perfiles de su organización" 
  ON perfiles_usuario FOR SELECT
  USING (organizacion_id = get_user_organization() AND get_user_role() = 2);

CREATE POLICY "Asistentes pueden ver perfiles asignados por ellos o su consultor" 
  ON perfiles_usuario FOR SELECT
  USING (
    (asignado_por = auth.uid() OR 
     organizacion_id = get_user_organization()) AND 
    get_user_role() = 3
  );

CREATE POLICY "Usuarios pueden ver su propio perfil" 
  ON perfiles_usuario FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Administradores pueden crear perfiles" 
  ON perfiles_usuario FOR INSERT
  WITH CHECK (get_user_role() = 1);

CREATE POLICY "Consultores pueden crear perfiles en su organización" 
  ON perfiles_usuario FOR INSERT
  WITH CHECK (organizacion_id = get_user_organization() AND get_user_role() = 2);

CREATE POLICY "Asistentes pueden crear perfiles de usuarios" 
  ON perfiles_usuario FOR INSERT
  WITH CHECK (
    organizacion_id = get_user_organization() AND 
    get_user_role() = 3 AND 
    (NEW.rol_id IN (SELECT id FROM roles WHERE nivel = 4))
  );

-- Políticas para perfiles_puesto
CREATE POLICY "Administradores pueden ver todos los perfiles de puesto" 
  ON perfiles_puesto FOR SELECT
  USING (get_user_role() = 1);

CREATE POLICY "Usuarios pueden ver perfiles de puesto de su organización" 
  ON perfiles_puesto FOR SELECT
  USING (organizacion_id = get_user_organization() OR publico = TRUE);

CREATE POLICY "Consultores pueden crear perfiles de puesto" 
  ON perfiles_puesto FOR INSERT
  WITH CHECK (organizacion_id = get_user_organization() AND get_user_role() = 2);

CREATE POLICY "Consultores pueden actualizar perfiles de puesto de su organización" 
  ON perfiles_puesto FOR UPDATE
  USING (organizacion_id = get_user_organization() AND get_user_role() = 2);

CREATE POLICY "Asistentes pueden crear perfiles de puesto" 
  ON perfiles_puesto FOR INSERT
  WITH CHECK (organizacion_id = get_user_organization() AND get_user_role() = 3);

CREATE POLICY "Asistentes pueden actualizar perfiles de puesto creados por ellos" 
  ON perfiles_puesto FOR UPDATE
  USING (creado_por = auth.uid() AND get_user_role() = 3);

-- Políticas para evaluaciones
CREATE POLICY "Administradores pueden ver todas las evaluaciones" 
  ON evaluaciones FOR SELECT
  USING (get_user_role() = 1);

CREATE POLICY "Consultores pueden ver evaluaciones de su organización" 
  ON evaluaciones FOR SELECT
  USING (organizacion_id = get_user_organization() AND get_user_role() = 2);

CREATE POLICY "Asistentes pueden ver evaluaciones asignadas por ellos" 
  ON evaluaciones FOR SELECT
  USING (asignado_por = auth.uid() AND get_user_role() = 3);

CREATE POLICY "Usuarios pueden ver sus propias evaluaciones" 
  ON evaluaciones FOR SELECT
  USING (usuario_id = auth.uid() OR codigo_acceso IS NOT NULL);

CREATE POLICY "Consultores pueden crear evaluaciones" 
  ON evaluaciones FOR INSERT
  WITH CHECK (organizacion_id = get_user_organization() AND get_user_role() = 2);

CREATE POLICY "Asistentes pueden crear evaluaciones" 
  ON evaluaciones FOR INSERT
  WITH CHECK (organizacion_id = get_user_organization() AND get_user_role() = 3);

-- Políticas para resultados_evaluacion
CREATE POLICY "Administradores pueden ver todos los resultados" 
  ON resultados_evaluacion FOR SELECT
  USING (get_user_role() = 1);

CREATE POLICY "Consultores pueden ver resultados de su organización" 
  ON resultados_evaluacion FOR SELECT
  USING (
    evaluacion_id IN (
      SELECT id FROM evaluaciones WHERE organizacion_id = get_user_organization()
    ) AND get_user_role() = 2
  );

CREATE POLICY "Asistentes pueden ver resultados de evaluaciones asignadas por ellos" 
  ON resultados_evaluacion FOR SELECT
  USING (
    evaluacion_id IN (
      SELECT id FROM evaluaciones WHERE asignado_por = auth.uid()
    ) AND get_user_role() = 3
  );

CREATE POLICY "Usuarios pueden ver sus propios resultados" 
  ON resultados_evaluacion FOR SELECT
  USING (usuario_id = auth.uid());

CREATE POLICY "Cualquiera puede crear resultados" 
  ON resultados_evaluacion FOR INSERT
  WITH CHECK (TRUE);

-- Políticas para descriptores_seleccionados
CREATE POLICY "Administradores pueden ver todos los descriptores" 
  ON descriptores_seleccionados FOR SELECT
  USING (get_user_role() = 1);

CREATE POLICY "Consultores pueden ver descriptores de su organización" 
  ON descriptores_seleccionados FOR SELECT
  USING (
    resultado_id IN (
      SELECT re.id FROM resultados_evaluacion re
      JOIN evaluaciones e ON re.evaluacion_id = e.id
      WHERE e.organizacion_id = get_user_organization()
    ) AND get_user_role() = 2
  );

CREATE POLICY "Usuarios pueden ver sus propios descriptores" 
  ON descriptores_seleccionados FOR SELECT
  USING (
    resultado_id IN (
      SELECT id FROM resultados_evaluacion WHERE usuario_id = auth.uid()
    )
  );

CREATE POLICY "Cualquiera puede crear descriptores" 
  ON descriptores_seleccionados FOR INSERT
  WITH CHECK (TRUE);

-- =============================================
-- 7. DATOS INICIALES
-- =============================================

-- Insertar roles predefinidos
INSERT INTO roles (nombre, descripcion, nivel) VALUES
  ('Administrador', 'Control total del sistema', 1),
  ('Consultor', 'Profesional de RRHH o consultor con su propia organización', 2),
  ('Asistente', 'Asistente de un consultor con permisos delegados', 3),
  ('Usuario', 'Usuario final que realiza evaluaciones', 4);
