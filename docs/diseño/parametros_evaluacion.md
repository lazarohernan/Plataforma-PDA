# Parámetros Técnicos para el Portal de Evaluación PDA

Este documento define los parámetros técnicos necesarios para la implementación completa del portal de evaluación, complementando el diseño UI/UX existente con especificaciones técnicas detalladas.

## 1. Configuración de la Evaluación

### 1.1 Estructura de Presentación
- **Número total de descriptores**: 86 descriptores (según el banco de descriptores)
- **Distribución por eje**: 
  - Riesgo (R): 17 descriptores
  - Extroversión (E): 17 descriptores
  - Paciencia (P): 17 descriptores
  - Normatividad (N): 17 descriptores
  - Autocontrol (A): 18 descriptores

### 1.2 Organización de Bloques
- **Tamaño de bloque**: 4-5 descriptores por pantalla
- **Número total de bloques**: 18-22 bloques (dependiendo del tamaño exacto)
- **Composición de bloques**: Cada bloque debe contener descriptores de al menos 3 ejes diferentes para evitar sesgos
- **Secuencia**: Orden aleatorio pero predeterminado (mismo orden para todos los usuarios, pero sin agrupación por eje)

### 1.3 Límites de Selección
- **Mínimo de selecciones total**: 20 descriptores (para garantizar suficientes datos)
- **Máximo de selecciones total**: 40 descriptores (para evitar selección indiscriminada)
- **Porcentaje mínimo por eje**: Al menos 10% de los descriptores disponibles de cada eje
- **Equilibrio entre perfiles**: No hay requisito de seleccionar igual número en perfil natural y adaptado

## 2. Integración con el Algoritmo

### 2.1 Modelo de Datos para Respuestas
```typescript
// Estructura para almacenar las respuestas del usuario
interface RespuestasUsuario {
  usuarioId: string;
  timestamp: Date;
  perfilNatural: string[]; // Array de IDs de descriptores seleccionados
  perfilAdaptado: string[]; // Array de IDs de descriptores seleccionados
  tiempoCompletado: number; // Tiempo en segundos
  dispositivo: string; // Información del dispositivo
}

// Estructura para cálculo de valores crudos
interface SeleccionesPorEje {
  R: number; // Cantidad de descriptores seleccionados del eje R
  E: number;
  P: number;
  N: number;
  A: number;
}
```

### 2.2 Cálculo de Valores Crudos
- **Fórmula base**: Para cada eje, valor crudo = (número de descriptores seleccionados / número total de descriptores del eje) * 10
- **Ajuste por cantidad**: Factor de corrección si el número total de selecciones es muy alto o bajo
- **Normalización**: Valores crudos se transforman usando los parámetros de normalización definidos en el algoritmo

### 2.3 Validación de Respuestas
- **Validación mínima**: Alertar si menos de 20 descriptores en total
- **Validación de distribución**: Advertencia si algún eje tiene 0 descriptores seleccionados
- **Validación de tiempo**: Marcar para revisión si el tiempo es menor a 3 minutos o mayor a 30 minutos

## 3. Persistencia y Recuperación

### 3.1 Almacenamiento Local
```typescript
interface EstadoEvaluacion {
  usuarioId: string;
  paso: number; // Número de bloque actual
  tipo: 'natural' | 'adaptado'; // Tipo de perfil actual
  seleccionesNatural: string[]; // IDs seleccionados hasta el momento
  seleccionesAdaptado: string[]; // IDs seleccionados hasta el momento
  bloqueActual: Descriptor[]; // Descriptores del bloque actual
  tiempoInicio: Date;
  ultimaActividad: Date;
}
```

### 3.2 Persistencia en Supabase
- **Tabla principal**: `evaluaciones` (id, usuario_id, fecha_inicio, fecha_completado, estado)
- **Tabla secundaria**: `respuestas_evaluacion` (evaluacion_id, tipo_perfil, descriptor_id, seleccionado)
- **Tabla de tracking**: `sesiones_evaluacion` (evaluacion_id, bloque, tiempo_bloque, selecciones_bloque)

### 3.3 Mecanismo de Recuperación
- Verificar localStorage al cargar la aplicación
- Ofrecer continuar evaluación en progreso si existe
- Si hay conexión, verificar también en backend si existe evaluación pendiente
- Sincronizar ambas fuentes y continuar desde el último bloque registrado

## 4. Adaptabilidad y Personalización

### 4.1 Parámetros Configurables
- **Modo de presentación**: Estándar (4-5 por pantalla) o Compacto (6-8 por pantalla)
- **Tiempo entre bloques**: 0-2 segundos (configurable para reducir agotamiento)
- **Tamaño de texto**: Normal, Grande, Muy Grande (accesibilidad)
- **Opciones de alto contraste**: Activado/Desactivado

### 4.2 Comportamiento Adaptativo
- **Dispositivos móviles**: Reducir a 3-4 descriptores por pantalla
- **Pantallas pequeñas**: Ajustar layout vertical vs horizontal
- **Conexión lenta**: Precarga de bloques y guardado más frecuente

### 4.3 Variaciones por Contexto
- **Evaluación individual**: Proceso completo con ambos perfiles
- **Evaluación rápida**: Versión abreviada (40-50 descriptores)
- **Evaluación para equipos**: Énfasis en perfiles combinados

## 5. Métricas y Análisis

### 5.1 Métricas de Uso
- **Tiempo por bloque**: Promedio y desviación
- **Patrones de selección**: Distribución a lo largo de la evaluación
- **Tasa de abandono**: Por bloque y tipo de perfil
- **Dispositivos**: Distribución de completados por tipo de dispositivo

### 5.2 Análisis de Calidad
- **Consistencia interna**: Alpha de Cronbach por eje
- **Validez aparente**: Cuestionario breve post-evaluación
- **Tasa de éxito**: Porcentaje de evaluaciones completadas correctamente
- **Feedback cualitativo**: Campo opcional al finalizar

## 6. Implementación Técnica

### 6.1 Generación de Bloques
```typescript
// Algoritmo para generación de bloques balanceados
function generarBloques(descriptores: Descriptor[], tamañoBloque: number): Descriptor[][] {
  // 1. Agrupar descriptores por eje
  const descriptoresPorEje = agruparPorEje(descriptores);
  
  // 2. Inicializar bloques vacíos
  const bloques: Descriptor[][] = [];
  
  // 3. Distribuir descriptores asegurando balance entre ejes
  while (hayDescriptoresSinAsignar(descriptoresPorEje)) {
    const bloque: Descriptor[] = [];
    
    // Seleccionar descriptores de al menos 3 ejes diferentes
    const ejesDisponibles = obtenerEjesConDescriptores(descriptoresPorEje);
    const ejesParaBloque = seleccionarEjesAleatoriamente(ejesDisponibles, Math.min(3, ejesDisponibles.length));
    
    // Añadir un descriptor de cada eje seleccionado
    for (const eje of ejesParaBloque) {
      if (bloque.length < tamañoBloque && descriptoresPorEje[eje].length > 0) {
        bloque.push(descriptoresPorEje[eje].pop());
      }
    }
    
    // Completar el bloque si es necesario
    while (bloque.length < tamañoBloque && hayDescriptoresSinAsignar(descriptoresPorEje)) {
      const ejeConMasDescriptores = obtenerEjeConMasDescriptores(descriptoresPorEje);
      if (descriptoresPorEje[ejeConMasDescriptores].length > 0) {
        bloque.push(descriptoresPorEje[ejeConMasDescriptores].pop());
      }
    }
    
    bloques.push(bloque);
  }
  
  return bloques;
}
```

### 6.2 Cálculo de Valores Crudos
```typescript
// Cálculo de valores crudos a partir de selecciones
function calcularValoresCrudos(selecciones: string[], descriptores: Descriptor[]): ValoresCrudos {
  // 1. Inicializar contadores por eje
  const contadores: SeleccionesPorEje = { R: 0, E: 0, P: 0, N: 0, A: 0 };
  const totalesPorEje: SeleccionesPorEje = { R: 0, E: 0, P: 0, N: 0, A: 0 };
  
  // 2. Contar descriptores totales por eje
  for (const descriptor of descriptores) {
    totalesPorEje[descriptor.eje]++;
  }
  
  // 3. Contar selecciones por eje
  for (const seleccionId of selecciones) {
    const descriptor = descriptores.find(d => d.id === seleccionId);
    if (descriptor) {
      contadores[descriptor.eje]++;
    }
  }
  
  // 4. Calcular valores crudos (escala 0-10)
  const valoresCrudos: ValoresCrudos = {
    R: (contadores.R / totalesPorEje.R) * 10,
    E: (contadores.E / totalesPorEje.E) * 10,
    P: (contadores.P / totalesPorEje.P) * 10,
    N: (contadores.N / totalesPorEje.N) * 10,
    A: (contadores.A / totalesPorEje.A) * 10
  };
  
  // 5. Aplicar factor de corrección si es necesario
  const totalSelecciones = selecciones.length;
  if (totalSelecciones < 20) {
    // Ajuste para pocas selecciones
    aplicarFactorCorreccionBajo(valoresCrudos);
  } else if (totalSelecciones > 40) {
    // Ajuste para muchas selecciones
    aplicarFactorCorreccionAlto(valoresCrudos);
  }
  
  return valoresCrudos;
}
```

### 6.3 Validación de Respuestas
```typescript
// Validación de respuestas del usuario
function validarRespuestas(selecciones: string[], descriptores: Descriptor[]): ValidationResult {
  const errores = [];
  const advertencias = [];
  
  // 1. Validar cantidad total
  if (selecciones.length < 20) {
    errores.push('Se requieren al menos 20 descriptores seleccionados para un análisis preciso.');
  }
  
  if (selecciones.length > 40) {
    advertencias.push('Has seleccionado un número elevado de descriptores, lo que podría afectar la precisión del perfil.');
  }
  
  // 2. Validar distribución por eje
  const contadoresPorEje = contarSeleccionesPorEje(selecciones, descriptores);
  
  for (const eje of ['R', 'E', 'P', 'N', 'A'] as Eje[]) {
    if (contadoresPorEje[eje] === 0) {
      advertencias.push(`No has seleccionado ningún descriptor del eje ${obtenerNombreEje(eje)}.`);
    }
    
    const porcentajeSeleccionado = contadoresPorEje[eje] / obtenerTotalDescriptoresPorEje(descriptores, eje);
    if (porcentajeSeleccionado < 0.1) {
      advertencias.push(`Has seleccionado muy pocos descriptores del eje ${obtenerNombreEje(eje)}.`);
    }
  }
  
  return {
    valido: errores.length === 0,
    errores,
    advertencias
  };
}
```

## 7. Seguridad y Protección de Datos

### 7.1 Protección de Respuestas
- Encriptación de datos sensibles en localStorage
- Tokens de sesión para validar continuidad de evaluación
- Timeouts automáticos tras inactividad prolongada

### 7.2 Prevención de Manipulación
- Validación en servidor de tiempos entre bloques
- Detección de patrones sospechosos (selecciones demasiado rápidas)
- Registro de eventos de interacción para auditoría

### 7.3 Anonimización para Análisis
- Separación de datos identificables de las respuestas para análisis agregados
- Opción de participar en estudios de mejora del algoritmo
- Cumplimiento con regulaciones de privacidad (GDPR, etc.)

## 8. Integración con Componentes Frontend

### 8.1 Componentes React Necesarios
```typescript
// Componentes principales para la evaluación
interface ComponentesEvaluacion {
  AssessmentContainer: React.FC; // Contenedor principal
  WelcomeScreen: React.FC; // Pantalla de bienvenida
  InstructionsScreen: React.FC; // Instrucciones
  DescriptorBlock: React.FC<{descriptores: Descriptor[], onSelect: Function}>; // Bloque de descriptores
  TransitionScreen: React.FC; // Transición entre perfiles
  ProgressIndicator: React.FC<{paso: number, total: number}>; // Indicador de progreso
  ValidationFeedback: React.FC<{errores: string[], advertencias: string[]}>; // Feedback de validación
  CompletionScreen: React.FC; // Pantalla de finalización
}
```

### 8.2 Hooks Personalizados
```typescript
// Hooks para gestión de estado de la evaluación
const useAssessment = () => {
  // Estado para la evaluación completa
  const [estado, setEstado] = useState<EstadoEvaluacion>(/* ... */);
  
  // Métodos para gestionar la evaluación
  const iniciarEvaluacion = () => { /* ... */ };
  const seleccionarDescriptor = (id: string) => { /* ... */ };
  const deseleccionarDescriptor = (id: string) => { /* ... */ };
  const avanzarBloque = () => { /* ... */ };
  const retrocederBloque = () => { /* ... */ };
  const cambiarTipoPerfil = () => { /* ... */ };
  const guardarProgreso = () => { /* ... */ };
  const finalizarEvaluacion = async () => { /* ... */ };
  
  return {
    estado,
    iniciarEvaluacion,
    seleccionarDescriptor,
    deseleccionarDescriptor,
    avanzarBloque,
    retrocederBloque,
    cambiarTipoPerfil,
    guardarProgreso,
    finalizarEvaluacion
  };
};
```

## 9. Pruebas y Validación

### 9.1 Plan de Pruebas
- **Pruebas unitarias**: Validación de algoritmos de generación de bloques y cálculo
- **Pruebas de integración**: Flujo completo de evaluación
- **Pruebas de usabilidad**: Con usuarios representativos
- **Pruebas de rendimiento**: Carga y tiempo de respuesta
- **Pruebas de compatibilidad**: Diferentes navegadores y dispositivos

### 9.2 Criterios de Aceptación
- Tiempo promedio de completado < 25 minutos
- Tasa de abandono < 15%
- Consistencia interna (Alpha de Cronbach) > 0.7 para cada eje
- Correlación test-retest > 0.8
- Satisfacción del usuario > 4/5

---

Este documento proporciona las especificaciones técnicas necesarias para implementar el portal de evaluación PDA, complementando el diseño UI/UX existente con parámetros concretos para la integración con el algoritmo pentadimensional y la infraestructura técnica.
