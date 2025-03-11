
import { Eye, MailPlus, Download, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Evaluation } from "./data/mockEvaluations";
import { getDominantDimension, getStatusColor } from "./utils/evaluationHelpers";

type EvaluationTableRowProps = {
  evaluation: Evaluation;
};

export const EvaluationTableRow = ({ evaluation }: EvaluationTableRowProps) => {
  const dominantDimension = getDominantDimension(evaluation.dimensions);
  
  return (
    <tr className="hover:bg-gray-50" tabIndex={0}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{evaluation.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {evaluation.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {evaluation.department}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span 
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(evaluation.status)}`}
          aria-label={`Estado: ${evaluation.status}`}
        >
          {evaluation.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {dominantDimension.name !== "-" ? (
          <div className="flex items-center" aria-label={`Dimensión dominante: ${dominantDimension.name} ${dominantDimension.value}%`}>
            <span className="text-sm text-gray-900 mr-2">{dominantDimension.name}</span>
            <div className="w-16 h-2 bg-gray-200 rounded-full" role="presentation">
              <div 
                className="h-full rounded-full bg-blue-600" 
                style={{ width: `${dominantDimension.value}%` }}
                aria-hidden="true"
              />
            </div>
            <span className="text-xs text-gray-700 ml-1">{dominantDimension.value}%</span>
          </div>
        ) : (
          <span className="text-sm text-gray-500" aria-label="Sin dimensión dominante">-</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            aria-label={`Ver detalles de la evaluación de ${evaluation.name}`}
          >
            <Eye size={16} />
          </Button>
          {evaluation.status !== "Completado" && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              aria-label="Enviar recordatorio por correo electrónico"
            >
              <MailPlus size={16} />
            </Button>
          )}
          {evaluation.status === "Completado" && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              aria-label="Descargar resultados"
            >
              <Download size={16} />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            aria-label="Archivar evaluación"
          >
            <Archive size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
};
