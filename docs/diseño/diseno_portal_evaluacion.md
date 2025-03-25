# Diseño del Portal de Evaluación PDA

## Visión General

Este documento detalla el diseño UI/UX del Portal de Evaluación de la plataforma PDA (Personal Development Analysis). El portal es el componente central donde los usuarios realizan las evaluaciones conductuales, siguiendo el modelo pentadimensional (Riesgo, Extroversión, Paciencia, Normatividad, Autocontrol).

## Objetivos de Diseño

1. **Claridad y enfoque**: Minimizar distracciones durante el proceso de evaluación
2. **Accesibilidad**: Asegurar que la evaluación sea comprensible para todos los usuarios
3. **Confiabilidad**: Transmitir profesionalismo y rigor científico
4. **Adaptabilidad**: Funcionar perfectamente en dispositivos móviles y de escritorio
5. **Engagement**: Mantener el interés del usuario durante todo el proceso

## Flujo de Usuario

### 1. Introducción y Preparación

**Pantalla de Bienvenida**
- Título claro: "Evaluación de Perfil Conductual PDA"
- Breve descripción del propósito y beneficios
- Tiempo estimado de completado (15-20 minutos)
- Instrucciones generales
- Botón prominente: "Comenzar Evaluación"

**Pantalla de Instrucciones**
- Explicación del proceso de selección de descriptores
- Énfasis en la honestidad y espontaneidad de las respuestas
- Aclaración sobre la ausencia de respuestas "correctas" o "incorrectas"
- Opción para ver un ejemplo
- Botones: "Ver Ejemplo" y "Continuar"

**Pantalla de Ejemplo** (opcional)
- Demostración visual de cómo seleccionar descriptores
- Explicación de la diferencia entre perfil natural y adaptado
- Botón: "Entendido, Comenzar"

### 2. Evaluación de Perfil Natural

**Pantalla de Contexto - Perfil Natural**
- Título: "Perfil Natural - Cómo te ves a ti mismo"
- Instrucción: "Selecciona los descriptores que consideras que mejor te definen"
- Explicación breve del concepto de perfil natural
- Botón: "Comenzar"

**Pantallas de Selección de Descriptores - Perfil Natural**
- Presentación de bloques de 4-5 descriptores a la vez
- Opción de selección múltiple (checkbox para cada descriptor)
- Indicador de progreso (ej. "Bloque 3 de 20")
- Botones: "Anterior" y "Siguiente"
- Opción para guardar y continuar más tarde

### 3. Evaluación de Perfil Adaptado

**Pantalla de Transición**
- Mensaje de completado de la primera parte
- Explicación de la segunda parte (perfil adaptado)
- Botón: "Continuar con la Segunda Parte"

**Pantalla de Contexto - Perfil Adaptado**
- Título: "Perfil Adaptado - Cómo crees que otros te perciben"
- Instrucción: "Selecciona los descriptores que crees que otros utilizarían para describirte"
- Explicación breve del concepto de perfil adaptado
- Botón: "Comenzar"

**Pantallas de Selección de Descriptores - Perfil Adaptado**
- Mismo formato que el perfil natural
- Mismos descriptores pero en orden diferente
- Indicador de progreso específico para esta sección

### 4. Finalización

**Pantalla de Confirmación**
- Resumen de selecciones (número de descriptores seleccionados en cada perfil)
- Opción para revisar y modificar respuestas
- Botón: "Finalizar y Procesar Resultados"

**Pantalla de Procesamiento**
- Animación de procesamiento
- Mensajes informativos sobre el análisis en curso
- Estimación de tiempo restante

**Pantalla de Completado**
- Mensaje de agradecimiento
- Información sobre cómo y cuándo acceder a los resultados
- Opción para proporcionar feedback sobre la experiencia
- Botón: "Ver Mi Perfil" o "Regresar al Dashboard"

## Elementos de Diseño

### Paleta de Colores

**Colores Primarios**
- Azul profundo (#1A365D): Transmite profesionalismo y confianza
- Gris claro (#F5F7FA): Fondo principal, facilita la lectura
- Blanco (#FFFFFF): Áreas de contenido principal

**Colores Secundarios**
- Azul medio (#3B719F): Elementos interactivos, botones
- Gris medio (#B0B7C3): Elementos secundarios, bordes
- Azul claro (#E5EEF6): Fondos secundarios, áreas destacadas

**Colores de Acento**
- Verde (#2E8B57): Confirmaciones, progreso
- Ámbar (#FFC107): Advertencias, información importante
- Rojo suave (#E57373): Errores, alertas

**Colores para Dimensiones**
- Riesgo: Rojo (#D32F2F)
- Extroversión: Amarillo (#FFC107)
- Paciencia: Verde (#388E3C)
- Normatividad: Azul (#1976D2)
- Autocontrol: Púrpura (#7B1FA2)

### Tipografía

**Fuentes**
- Títulos: Montserrat, semi-bold
- Cuerpo: Open Sans, regular
- Descriptores: Open Sans, medium

**Tamaños**
- Títulos principales: 28px
- Subtítulos: 20px
- Texto de instrucciones: 16px
- Descriptores: 18px
- Texto secundario: 14px

### Componentes UI

**Tarjetas de Descriptores**
- Fondo blanco con sombra suave
- Bordes redondeados (8px)
- Padding generoso (24px)
- Hover state con ligero cambio de color
- Animación suave al seleccionar

**Botones**
- Primarios: Azul medio con texto blanco
- Secundarios: Transparente con borde azul medio
- Estados hover y active claramente definidos
- Tamaño adecuado para dispositivos táctiles (min 44px altura)

**Barra de Progreso**
- Ubicada en la parte superior
- Color verde para secciones completadas
- Indicador de sección actual
- Etiquetas para cada sección principal

**Checkboxes**
- Tamaño generoso (24px)
- Animación suave al seleccionar
- Estado seleccionado claramente visible
- Área de clic amplia

## Consideraciones de Accesibilidad

- Contraste de color que cumple con WCAG 2.1 AA
- Textos escalables sin pérdida de funcionalidad
- Navegación completa por teclado
- Soporte para lectores de pantalla
- Mensajes de error claros y descriptivos
- Tiempo suficiente para completar cada sección

## Consideraciones Responsive

**Móvil (< 768px)**
- Diseño de una columna
- Descriptores presentados de uno en uno
- Botones de navegación a pantalla completa
- Tamaño de texto aumentado para mejor legibilidad

**Tablet (768px - 1024px)**
- Diseño de dos columnas para descriptores
- Barra de progreso simplificada
- Navegación adaptada a gestos táctiles

**Escritorio (> 1024px)**
- Diseño de tres o cuatro columnas para descriptores
- Visualización completa de la barra de progreso
- Atajos de teclado disponibles

## Microinteracciones

- Animación suave al seleccionar descriptores
- Feedback visual y sonoro (opcional) al completar una sección
- Transiciones fluidas entre pantallas
- Indicadores de carga para operaciones que toman tiempo
- Tooltips contextuales para términos técnicos

## Prototipos de Pantallas Clave

### 1. Pantalla de Bienvenida

```
+-------------------------------------------------------+
|                                                       |
|  [Logo PDA]                                           |
|                                                       |
|  # Evaluación de Perfil Conductual PDA                |
|                                                       |
|  Descubre tus tendencias naturales de comportamiento  |
|  y cómo te adaptas a diferentes entornos.             |
|                                                       |
|  Tiempo estimado: 15-20 minutos                       |
|                                                       |
|  [COMENZAR EVALUACIÓN]                                |
|                                                       |
|  * Tus respuestas son confidenciales                  |
|  * Puedes pausar y continuar más tarde                |
|                                                       |
+-------------------------------------------------------+
```

### 2. Pantalla de Selección de Descriptores

```
+-------------------------------------------------------+
|                                                       |
|  Perfil Natural - Bloque 3 de 20                      |
|  [===========>------------------------]  25%          |
|                                                       |
|  Selecciona los descriptores que mejor te definen:    |
|                                                       |
|  +-------------------+  +-------------------+         |
|  | [ ] Competitivo   |  | [ ] Metódico      |         |
|  +-------------------+  +-------------------+         |
|                                                       |
|  +-------------------+  +-------------------+         |
|  | [ ] Entusiasta    |  | [ ] Paciente      |         |
|  +-------------------+  +-------------------+         |
|                                                       |
|  +-------------------+                                |
|  | [ ] Analítico     |                                |
|  +-------------------+                                |
|                                                       |
|  [ANTERIOR]                          [SIGUIENTE]      |
|                                                       |
|  [Guardar y continuar más tarde]                      |
|                                                       |
+-------------------------------------------------------+
```

### 3. Pantalla de Transición entre Perfiles

```
+-------------------------------------------------------+
|                                                       |
|  [Ícono de Verificación]                              |
|                                                       |
|  ¡Primera parte completada!                           |
|                                                       |
|  Has completado la evaluación de tu Perfil Natural.   |
|                                                       |
|  A continuación, evaluaremos tu Perfil Adaptado:      |
|  cómo crees que otros te perciben en tu entorno       |
|  actual.                                              |
|                                                       |
|  [CONTINUAR CON LA SEGUNDA PARTE]                     |
|                                                       |
|  [Tomar un descanso y continuar más tarde]            |
|                                                       |
+-------------------------------------------------------+
```

### 4. Pantalla de Procesamiento Final

```
+-------------------------------------------------------+
|                                                       |
|  [Animación de Procesamiento]                         |
|                                                       |
|  Analizando tus respuestas...                         |
|                                                       |
|  Estamos procesando tu perfil conductual basado       |
|  en el modelo pentadimensional PDA.                   |
|                                                       |
|  Este análisis identificará tus tendencias en:        |
|  • Riesgo                                             |
|  • Extroversión                                       |
|  • Paciencia                                          |
|  • Normatividad                                       |
|  • Autocontrol                                        |
|                                                       |
|  Tiempo restante estimado: 15 segundos                |
|                                                       |
+-------------------------------------------------------+
```

## Consideraciones Técnicas para Implementación

- Desarrollar con React y lovable.dev
- Utilizar Context API para gestión de estado de la evaluación
- Implementar almacenamiento local para recuperación en caso de interrupción
- Asegurar validación de datos antes de envío al servidor
- Optimizar carga de recursos para minimizar tiempos de espera
- Implementar analytics para identificar puntos de abandono
- Considerar A/B testing para optimizar la tasa de completado

Para detalles técnicos completos sobre la implementación, consultar el documento [Parámetros Técnicos para el Portal de Evaluación PDA](parametros_evaluacion.md), que incluye:

- Configuración detallada de la evaluación (estructura, bloques, límites)
- Integración con el algoritmo pentadimensional
- Persistencia y recuperación de datos
- Adaptabilidad y personalización
- Métricas y análisis
- Implementación técnica (generación de bloques, cálculo de valores, validación)
- Seguridad y protección de datos
- Integración con componentes frontend
- Pruebas y validación

## Métricas de Éxito

- Tasa de completado > 85%
- Tiempo promedio de completado < 25 minutos
- Satisfacción del usuario > 4.2/5
- Tasa de abandono < 15%
- Uso en dispositivos móviles sin incidencias > 95%

## Próximos Pasos

1. Crear prototipos de alta fidelidad en lovable.dev
2. Realizar pruebas de usabilidad con usuarios representativos
3. Iterar basado en feedback
4. Desarrollar componentes React
5. Integrar con backend (Supabase)
6. Realizar pruebas de rendimiento y accesibilidad
7. Lanzar versión beta para pruebas en entorno real
