# Plataforma PDA (Personal Development Assessment)

Plataforma de evaluación psicométrica basada en el modelo PDA (Personal Development Assessment) para la identificación de perfiles conductuales y competencias profesionales.

## Características

- Evaluación interactiva con selección de descriptores
- Algoritmo de procesamiento y normalización de resultados
- Perfiles Natural y Adaptado
- Indicadores derivados y análisis de compatibilidad
- Panel de administración para gestión de evaluaciones
- Generación de reportes detallados
- Integración con Supabase para almacenamiento y autenticación

## Tecnologías

- React + TypeScript
- Vite como bundler
- Tailwind CSS + shadcn/ui para la interfaz
- Supabase para base de datos y autenticación
- Gráficos interactivos con Chart.js

## Instalación

1. Clona este repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Copia el archivo `.env.example` a `.env` y configura las variables de entorno:
   ```bash
   cp .env.example .env
   ```
4. Configura tu proyecto Supabase y actualiza las variables de entorno con tus credenciales
5. Ejecuta el script de configuración de la base de datos:
   ```bash
   node scripts/setup-database.js
   ```
6. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

- `/src`: Código fuente de la aplicación
  - `/algoritmo`: Implementación del algoritmo PDA
  - `/components`: Componentes React reutilizables
  - `/data`: Datos estáticos como descriptores
  - `/hooks`: Custom hooks de React
  - `/lib`: Utilidades y configuraciones
  - `/pages`: Páginas principales de la aplicación
  - `/types`: Definiciones de tipos TypeScript
- `/migrations`: Scripts SQL para la base de datos
- `/public`: Archivos estáticos
- `/scripts`: Scripts de utilidad para configuración

## Flujo de Evaluación

1. El administrador genera códigos de acceso desde el panel de administración
2. El usuario accede a la evaluación con su código
3. Completa la evaluación seleccionando descriptores para su perfil Natural y Adaptado
4. El sistema procesa los resultados y genera el perfil
5. Se muestran los resultados con análisis detallado
6. El usuario puede proporcionar feedback sobre la precisión de los resultados

## Licencia

Este proyecto está bajo licencia privada. Todos los derechos reservados.
