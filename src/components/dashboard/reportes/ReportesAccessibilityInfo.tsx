
export const ReportesAccessibilityInfo = () => {
  return (
    <div className="sr-only" role="region" aria-label="Información de accesibilidad">
      <h2>Información de accesibilidad</h2>
      <p>
        Esta página permite generar y gestionar reportes. Utilice los controles de teclado para
        navegar entre las diferentes secciones. Las tablas muestran información sobre reportes
        generados, y puede interactuar con los controles para crear nuevos reportes o descargar
        los existentes.
      </p>
      <p>
        Para generar un nuevo reporte, seleccione el tipo de reporte deseado en las pestañas,
        configure las opciones y haga clic en "Generar Ahora".
      </p>
    </div>
  );
};
