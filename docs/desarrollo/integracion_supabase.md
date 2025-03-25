# Integración con Supabase

Este documento describe cómo configurar y utilizar Supabase como backend para la Plataforma PDA.

## Índice

1. [Introducción](#introducción)
2. [Configuración de Supabase](#configuración-de-supabase)
3. [Esquema de Base de Datos](#esquema-de-base-de-datos)
4. [Autenticación y Autorización](#autenticación-y-autorización)
5. [Migración desde localStorage](#migración-desde-localstorage)
6. [Uso en el Código](#uso-en-el-código)
7. [Consideraciones de Seguridad](#consideraciones-de-seguridad)
8. [Solución de Problemas](#solución-de-problemas)
9. [Funciones RPC](#funciones-rpc)

## Introducción

Supabase es una alternativa de código abierto a Firebase que proporciona todos los servicios de backend necesarios para la Plataforma PDA:

- Base de datos PostgreSQL
- Autenticación y gestión de usuarios
- Almacenamiento de archivos
- Funciones en tiempo real
- API RESTful y GraphQL

Esta integración permite migrar de un almacenamiento local (localStorage) a una solución en la nube, facilitando el acceso desde múltiples dispositivos, la colaboración entre usuarios y la escalabilidad del sistema.

## Configuración de Supabase

### 1. Crear una cuenta en Supabase

1. Visita [Supabase](https://supabase.com/) y crea una cuenta
2. Crea un nuevo proyecto
3. Anota la URL y la clave anónima (anon key) del proyecto

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon
```

### 3. Ejecutar el script de migración

El script SQL para crear el esquema de base de datos se encuentra en `migrations/01_pda_schema.sql`. Puedes ejecutarlo directamente en el editor SQL de Supabase:

1. Ve al panel de control de Supabase
2. Navega a SQL Editor
3. Crea un nuevo script
4. Copia y pega el contenido de `migrations/01_pda_schema.sql`
5. Ejecuta el script

## Esquema de Base de Datos

El esquema de base de datos incluye las siguientes tablas:

- **roles**: Define los roles de usuario (Administrador, Consultor, Asistente, Usuario)
- **organizaciones**: Organizaciones que utilizan la plataforma
- **perfiles_usuario**: Información adicional de los usuarios
- **perfiles_puesto**: Perfiles de puesto para comparación
- **evaluaciones**: Evaluaciones asignadas a usuarios
- **resultados_evaluacion**: Resultados de las evaluaciones
- **descriptores_seleccionados**: Descriptores seleccionados en cada evaluación
- **datos_validacion**: Datos para validación del algoritmo
- **reportes**: Reportes generados
- **grupos_analisis**: Grupos para análisis comparativo

Para más detalles, consulta el archivo `migrations/01_pda_schema.sql`.

## Autenticación y Autorización

### Autenticación

Supabase proporciona múltiples métodos de autenticación:

- Email y contraseña
- Proveedores OAuth (Google, Facebook, GitHub, etc.)
- Magic links
- Teléfono (SMS)

La Plataforma PDA utiliza principalmente email y contraseña, pero se pueden habilitar otros métodos según sea necesario.

### Autorización (Row Level Security)

El esquema incluye políticas de seguridad a nivel de fila (RLS) que controlan el acceso a los datos según el rol del usuario:

- **Administradores**: Acceso completo a todos los datos
- **Consultores**: Acceso a datos de su organización
- **Asistentes**: Acceso a datos asignados por ellos o su consultor
- **Usuarios**: Acceso solo a sus propios datos

Estas políticas se implementan utilizando las funciones `get_user_role()` y `get_user_organization()`.

## Migración desde localStorage

Para migrar datos desde localStorage a Supabase:

1. Recuperar datos de localStorage
2. Transformar los datos al formato requerido por Supabase
3. Insertar los datos en las tablas correspondientes

Ejemplo de migración de resultados:

```typescript
import { supabase } from '@/lib/supabase';

// Función para migrar resultados de localStorage a Supabase
export async function migrateResultsToSupabase() {
  // Obtener resultados de localStorage
  const storedResults = localStorage.getItem('pda_resultados');
  if (!storedResults) return;
  
  const results = JSON.parse(storedResults);
  
  // Obtener usuario actual
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  
  // Insertar en Supabase
  const { data, error } = await supabase
    .from('resultados_evaluacion')
    .insert({
      usuario_id: user.id,
      perfil_natural: results.perfilNatural,
      perfil_adaptado: results.perfilAdaptado,
      indicadores: results.indicadores,
      tiempo_completado: results.tiempoCompletado || 600,
      version_algoritmo: '1.0.0'
    })
    .select();
  
  if (error) {
    console.error('Error al migrar resultados:', error);
    return null;
  }
  
  // Migrar descriptores seleccionados
  if (data && data[0]) {
    const resultadoId = data[0].id;
    
    // Obtener descriptores de localStorage
    const naturalSelections = JSON.parse(localStorage.getItem('pda_natural_selections') || '[]');
    const adaptedSelections = JSON.parse(localStorage.getItem('pda_adapted_selections') || '[]');
    
    // Insertar descriptores naturales
    for (let i = 0; i < naturalSelections.length; i++) {
      await supabase
        .from('descriptores_seleccionados')
        .insert({
          resultado_id: resultadoId,
          tipo_perfil: 'natural',
          descriptor_id: naturalSelections[i],
          orden_seleccion: i + 1
        });
    }
    
    // Insertar descriptores adaptados
    for (let i = 0; i < adaptedSelections.length; i++) {
      await supabase
        .from('descriptores_seleccionados')
        .insert({
          resultado_id: resultadoId,
          tipo_perfil: 'adaptado',
          descriptor_id: adaptedSelections[i],
          orden_seleccion: i + 1
        });
    }
  }
  
  return data;
}
```

## Uso en el Código

### Cliente de Supabase

El cliente de Supabase está configurado en `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### Autenticación

```typescript
// Registro de usuario
async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

// Inicio de sesión
async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

// Cierre de sesión
async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Obtener usuario actual
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
```

### Operaciones CRUD

```typescript
// Crear un registro
async function createRecord(table: string, data: any) {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();
  return { result, error };
}

// Leer registros
async function getRecords(table: string, query: any = {}) {
  let queryBuilder = supabase.from(table).select();
  
  // Aplicar filtros
  if (query.filters) {
    for (const [column, value] of Object.entries(query.filters)) {
      queryBuilder = queryBuilder.eq(column, value);
    }
  }
  
  // Aplicar ordenamiento
  if (query.orderBy) {
    queryBuilder = queryBuilder.order(query.orderBy.column, {
      ascending: query.orderBy.ascending
    });
  }
  
  // Aplicar paginación
  if (query.limit) {
    queryBuilder = queryBuilder.limit(query.limit);
  }
  
  if (query.offset) {
    queryBuilder = queryBuilder.range(query.offset, query.offset + (query.limit || 10) - 1);
  }
  
  const { data, error } = await queryBuilder;
  return { data, error };
}

// Actualizar un registro
async function updateRecord(table: string, id: string, data: any) {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select();
  return { result, error };
}

// Eliminar un registro
async function deleteRecord(table: string, id: string) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
  return { error };
}
```

## Consideraciones de Seguridad

### Protección de Datos Sensibles

- Nunca almacenes la clave secreta de Supabase en el código cliente
- Utiliza siempre la clave anónima para operaciones desde el frontend
- Implementa políticas RLS para proteger los datos
- Considera cifrar datos sensibles antes de almacenarlos

### Validación de Datos

- Valida todos los datos en el cliente antes de enviarlos a Supabase
- Implementa restricciones y validaciones en la base de datos
- Utiliza tipos TypeScript para garantizar la integridad de los datos

### Monitoreo y Auditoría

- Habilita el registro de auditoría en Supabase
- Monitorea regularmente los accesos y operaciones
- Configura alertas para actividades sospechosas

## Solución de Problemas

### Problemas Comunes

1. **Error de conexión**:
   - Verifica que las variables de entorno estén configuradas correctamente
   - Comprueba la conectividad a Internet
   - Verifica que el proyecto de Supabase esté activo

2. **Error de autenticación**:
   - Verifica las credenciales de usuario
   - Comprueba que el usuario tenga los permisos necesarios
   - Verifica que la clave anónima sea válida

3. **Error de RLS**:
   - Verifica que las políticas RLS estén configuradas correctamente
   - Comprueba que el usuario tenga el rol adecuado
   - Verifica que el usuario esté autenticado

### Herramientas de Depuración

- Utiliza la consola de desarrollador del navegador para ver errores
- Habilita el registro detallado en Supabase
- Utiliza herramientas como Postman para probar la API directamente

## Funciones RPC

Supabase permite crear funciones PostgreSQL que pueden ser llamadas desde el cliente. Estas funciones se conocen como RPC (Remote Procedure Call).

### Función get_user_role

Esta función devuelve el rol del usuario actual basado en su correo electrónico o metadatos.

#### Definición

```sql
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id UUID;
  user_email TEXT;
  user_metadata JSONB;
BEGIN
  -- Obtener el ID del usuario actual
  user_id := auth.uid();
  
  -- Si no hay usuario autenticado, devolver NULL
  IF user_id IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Obtener el email y metadatos del usuario
  SELECT email, raw_user_meta_data INTO user_email, user_metadata
  FROM auth.users
  WHERE id = user_id;
  
  -- Verificar si el usuario es uno de los administradores conocidos por email
  IF user_email IN ('hlazaroe@gmail.com', 'dennisjoaquin@gmail.com') THEN
    RETURN 1; -- 1 = Administrador
  END IF;
  
  -- Verificar si el usuario tiene rol de administrador en los metadatos
  IF user_metadata->>'role' = 'admin' THEN
    RETURN 1; -- 1 = Administrador
  ELSIF user_metadata->>'role' = 'consultor' THEN
    RETURN 2; -- 2 = Consultor
  ELSIF user_metadata->>'role' = 'asistente' THEN
    RETURN 3; -- 3 = Asistente
  END IF;
  
  -- Si no se encontró un rol específico, devolver rol de usuario normal
  RETURN 4; -- 4 = Usuario normal
END;
$$;
```

#### Uso

```typescript
// Verificar si el usuario es administrador
async function isAdmin() {
  const { data: userRole, error } = await supabase.rpc('get_user_role');
  
  if (error) {
    console.error('Error al obtener rol de usuario:', error);
    return false;
  }
  
  return userRole === 1; // 1 = Administrador
}

// Verificar si el usuario tiene acceso a una página específica
async function hasAccess(requiredRole: number) {
  const { data: userRole, error } = await supabase.rpc('get_user_role');
  
  if (error) {
    console.error('Error al obtener rol de usuario:', error);
    return false;
  }
  
  return userRole <= requiredRole; // Roles menores tienen más permisos
}
```

#### Valores de Retorno

- **1**: Administrador (acceso completo)
- **2**: Consultor (acceso a datos de su organización)
- **3**: Asistente (acceso a datos asignados)
- **4**: Usuario normal (acceso solo a sus propios datos)
- **NULL**: Usuario no autenticado

Esta función se utiliza en el componente `AdminValidacion.tsx` para verificar si el usuario tiene permisos para acceder a la página de validación.
