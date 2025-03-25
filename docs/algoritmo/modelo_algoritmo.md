# Modelo Conceptual: Algoritmo de Evaluación Conductual

## 1. Introducción

Este documento describe el modelo conceptual para el algoritmo de evaluación conductual que servirá como núcleo de la plataforma de análisis de perfiles de comportamiento. El algoritmo está diseñado para procesar las respuestas de los usuarios a un cuestionario de descriptores conductuales y generar perfiles que representen sus tendencias de comportamiento en diferentes contextos.

## 2. Fundamentos Matemáticos

### 2.1 Modelo Vectorial

El algoritmo se basa en un modelo vectorial multidimensional donde cada eje representa una dimensión conductual:

- **Eje 1 (R)**: Riesgo / Proactividad en entornos desfavorables
- **Eje 2 (E)**: Extroversión / Proactividad en entornos favorables
- **Eje 3 (P)**: Paciencia / Adaptación pasiva en entornos favorables
- **Eje 4 (N)**: Normatividad / Adaptación pasiva en entornos desfavorables
- **Eje 5 (A)**: Autocontrol / Gestión emocional

Cada individuo puede representarse como un punto en este espacio pentadimensional, donde sus coordenadas indican la intensidad relativa de cada dimensión conductual.

### 2.2 Espacio Normalizado

Para facilitar la interpretación y comparación, las puntuaciones se normalizan en una escala estándar:

- Escala de valores-C: 0-100 para cada eje
- Media poblacional: 50 en cada eje
- Desviación estándar: 10 puntos

Esta normalización permite:
- Comparar individuos entre sí
- Evaluar la intensidad relativa de cada dimensión
- Establecer rangos interpretativos (bajo, medio, alto)

## 3. Procesamiento de Datos de Entrada

### 3.1 Recolección de Datos

El algoritmo procesa dos conjuntos de datos para cada individuo:

1. **Perfil Natural**: Selección de descriptores que el individuo considera que lo definen
2. **Perfil Adaptado**: Selección de descriptores que el individuo cree que otros utilizarían para describirlo

### 3.2 Asignación de Descriptores

Cada descriptor del cuestionario está asignado a uno y solo uno de los 5 ejes conductuales. La distribución recomendada es:

- 16-19 descriptores por eje
- Total de 86 descriptores en el cuestionario completo

### 3.3 Cálculo de Valores Crudos

Para cada eje (i) y cada perfil (p), se calcula el valor crudo:

```
VC(i,p) = Número de descriptores seleccionados del eje i en el perfil p
```

### 3.4 Normalización

Los valores crudos se convierten en valores-C mediante una transformación que considera:

```
VC(i,p) = Valor crudo del eje i en el perfil p
Media(i) = Media poblacional del eje i
DS(i) = Desviación estándar poblacional del eje i

Valor-C(i,p) = 50 + 10 * [(VC(i,p) - Media(i)) / DS(i)]
```

Esta transformación sitúa las puntuaciones en una escala normalizada con media 50 y desviación estándar 10.

## 4. Cálculo de Indicadores

### 4.1 Nivel de Energía (NE)

Representa el quantum total de energía disponible/utilizada:

```
NE(p) = Suma de VC(i,p) para i = 1 a 4
```

Nota: El eje 5 (Autocontrol) no se incluye en este cálculo.

### 4.2 Equilibrio de Energía (EE)

Expresa la diferencia percibida entre energía demandada y disponible:

```
EE = NE(Perfil Adaptado) - NE(Perfil Natural)
```

Interpretación:
- EE > 0: Percepción de sobreexigencia
- EE ≈ 0: Equilibrio energético
- EE < 0: Percepción de subutilización

### 4.3 Toma de Decisiones (TD)

Evalúa el estilo decisorio basado en la relación entre Riesgo y Normatividad:

```
TD(p) = Valor-C(R,p) - Valor-C(N,p)
```

Interpretación:
- TD > 20: Decisor orientado al riesgo
- -20 < TD < 20: Decisor balanceado
- TD < -20: Decisor orientado a la seguridad

### 4.4 Modificación del Perfil (MP)

Mide la capacidad de adaptación conductual:

```
MP = Suma de |Valor-C(i,Natural) - Valor-C(i,Adaptado)| para i = 1 a 5
```

Interpretación:
- MP < 40: Baja adaptabilidad
- 40 ≤ MP ≤ 60: Adaptabilidad moderada
- MP > 60: Alta adaptabilidad

### 4.5 Intensidad del Eje (IE)

Evalúa cuán acentuado es cada eje:

```
IE(i,p) = |Valor-C(i,p) - 50| / 10
```

Interpretación:
- IE < 1: Intensidad baja
- 1 ≤ IE ≤ 2: Intensidad media
- IE > 2: Intensidad alta

### 4.6 Intensidad del Perfil (IP)

Define la intensidad global del perfil:

```
IP(p) = Suma de IE(i,p) para i = 1 a 5
```

### 4.7 Consistencia

Evalúa la coherencia de las respuestas mediante un algoritmo compuesto que considera:
- Patrones de respuesta
- Tiempo de completado
- Contradicciones internas
- Distribución de selecciones

```
Consistencia = f(NE, EE, MP, IP, Tiempo)
```

Donde f es una función ponderada que asigna mayor peso a los patrones de respuesta y las contradicciones.

## 5. Análisis de Compatibilidad

### 5.1 Perfil de Puesto

Cada puesto se define como un vector en el mismo espacio pentadimensional:

```
Puesto = [R_ideal, E_ideal, P_ideal, N_ideal, A_ideal]
```

Donde cada componente representa el valor ideal para ese eje en el puesto específico.

### 5.2 Índice de Compatibilidad

La compatibilidad entre un individuo y un puesto se calcula mediante:

```
IC = 100 - (20 * Distancia_Normalizada)
```

Donde:

```
Distancia_Normalizada = Distancia_Euclidiana / Distancia_Máxima_Posible

Distancia_Euclidiana = √(Suma de (Valor-C(i,Natural) - Valor_Ideal(i))² para i = 1 a 5)

Distancia_Máxima_Posible = √(5 * 100²) = 223.6
```

Interpretación:
- IC > 80: Compatibilidad alta
- 60 ≤ IC ≤ 80: Compatibilidad media
- IC < 60: Compatibilidad baja

### 5.3 Compatibilidad por Competencias

Para cada competencia (c), se define un vector de pesos para cada eje:

```
Competencia(c) = [w_R, w_E, w_P, w_N, w_A]
```

Donde cada w_i representa la importancia relativa del eje i para esa competencia.

El índice de compatibilidad por competencia se calcula como:

```
ICC(c) = 100 - (20 * Distancia_Ponderada_Normalizada)
```

Donde:

```
Distancia_Ponderada_Normalizada = Distancia_Ponderada / Distancia_Ponderada_Máxima

Distancia_Ponderada = √(Suma de w_i * (Valor-C(i,Natural) - Valor_Ideal(i))² para i = 1 a 5)

Distancia_Ponderada_Máxima = √(Suma de w_i * 100² para i = 1 a 5)
```

## 6. Visualización de Resultados

### 6.1 Gráfico de Perfil

El perfil se visualiza mediante un gráfico radial (spider chart) con 5 ejes, donde:
- Cada eje representa una dimensión conductual
- La distancia desde el centro indica la intensidad (Valor-C)
- Se muestran simultáneamente el Perfil Natural y el Adaptado

### 6.2 Gráfico de Compatibilidad

La compatibilidad con un puesto se visualiza mediante:
- Superposición del perfil individual con el perfil ideal del puesto
- Representación de áreas de coincidencia y discrepancia
- Indicadores numéricos de compatibilidad global y por eje

### 6.3 Dashboard de Indicadores

Los indicadores calculados se presentan en un dashboard que incluye:
- Valores numéricos
- Representaciones gráficas
- Interpretaciones textuales
- Recomendaciones basadas en algoritmos

## 7. Validación del Algoritmo

### 7.1 Validación Cruzada

El algoritmo debe validarse mediante:
- Comparación con evaluaciones de expertos
- Correlación con resultados de otros instrumentos validados
- Estudios de validez predictiva en entornos laborales

### 7.2 Ajuste de Parámetros

Los parámetros del algoritmo (pesos, puntos de corte, etc.) deben ajustarse mediante:
- Análisis estadístico de grandes muestras
- Retroalimentación de usuarios expertos
- Estudios longitudinales de resultados

### 7.3 Mejora Continua

El algoritmo debe incorporar mecanismos de aprendizaje para:
- Refinar la asignación de descriptores a ejes
- Ajustar los parámetros de normalización
- Mejorar los modelos de compatibilidad
- Optimizar las interpretaciones automáticas

## 8. Consideraciones Técnicas

### 8.1 Complejidad Computacional

El algoritmo está diseñado para ser computacionalmente eficiente:
- Cálculos principales: O(n) donde n es el número de descriptores
- Análisis de compatibilidad: O(m) donde m es el número de puestos/competencias
- Generación de visualizaciones: O(1) para cada tipo de gráfico

### 8.2 Escalabilidad

El sistema debe escalar para manejar:
- Millones de perfiles individuales
- Miles de perfiles de puestos
- Cientos de competencias definidas
- Análisis organizacionales complejos

### 8.3 Precisión y Redondeo

Para mantener la precisión:
- Los cálculos internos se realizan con precisión de punto flotante
- Los valores-C se redondean a enteros para presentación
- Los índices de compatibilidad se presentan con un decimal

## 9. Implementación Recomendada

### 9.1 Lenguajes y Bibliotecas

- **Procesamiento principal**: Python con NumPy y Pandas
- **Análisis estadístico**: R o Python con SciPy
- **Visualización**: JavaScript con D3.js
- **API**: Node.js o Django

### 9.2 Arquitectura

- Módulo de procesamiento de respuestas
- Módulo de cálculo de indicadores
- Módulo de análisis de compatibilidad
- Módulo de generación de reportes
- API para integración con frontend y sistemas externos

### 9.3 Optimización

- Precálculo de valores de normalización
- Caché de resultados frecuentes
- Procesamiento por lotes para análisis masivos
- Computación paralela para análisis organizacionales

## 10. Limitaciones y Consideraciones

### 10.1 Limitaciones Inherentes

- Dependencia de la autopercepción del evaluado
- Posible efecto de deseabilidad social
- Variabilidad cultural en la interpretación de descriptores
- Simplificación de la complejidad conductual humana

### 10.2 Mitigaciones

- Indicador de consistencia para detectar respuestas problemáticas
- Múltiples fuentes de evaluación (360°)
- Adaptaciones culturales de descriptores
- Combinación con otras metodologías de evaluación

---

Este modelo conceptual proporciona las bases matemáticas y lógicas para el desarrollo del algoritmo de evaluación conductual. La implementación específica requerirá refinamiento basado en datos empíricos y validación psicométrica.
