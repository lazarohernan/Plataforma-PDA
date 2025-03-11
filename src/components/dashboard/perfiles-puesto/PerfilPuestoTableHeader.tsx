
export const PerfilPuestoTableHeader = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Nombre del Puesto
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Departamento
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Fecha de Creación
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Dimensión Dominante
        </th>
        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
          Acciones
        </th>
      </tr>
    </thead>
  );
};
