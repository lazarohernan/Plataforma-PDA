import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Database, Json } from "@/types/supabase";
import { 
  ProfileType,
  Descriptor,
  getAllDescriptors,
  getRandomizedDescriptors
} from "@/data/assessmentDescriptors";
import { 
  procesarEvaluacion, 
  Perfil, 
  ResultadoEvaluacion, 
  Eje 
} from "@/algoritmo";

// Función para combinar grupos de descriptores en 3 grandes grupos
const combineIntoThreeGroups = (descriptors: Descriptor[][]): Descriptor[][] => {
  const result: Descriptor[][] = [[], [], []];
  const totalGroups = descriptors.length;
  const groupsPerSection = Math.ceil(totalGroups / 3);
  
  // Distribuir los descriptores en 3 grupos grandes
  for (let i = 0; i < totalGroups; i++) {
    const sectionIndex = Math.floor(i / groupsPerSection);
    result[sectionIndex].push(...descriptors[i]);
  }
  
  return result;
};

// Función para convertir IDs de descriptores a formato para el algoritmo
const convertirSeleccionesAPerfilNormalizado = (
  seleccionesNatural: string[],
  seleccionesAdaptado: string[],
  tiempoCompletado: number = 600 // Valor por defecto: 10 minutos
): ResultadoEvaluacion => {
  // Obtener todos los descriptores disponibles
  const todosLosDescriptoresNatural = getAllDescriptors("natural");
  const todosLosDescriptoresAdaptado = getAllDescriptors("adapted");
  
  // Procesar la evaluación utilizando el algoritmo
  return procesarEvaluacion(
    seleccionesNatural,
    seleccionesAdaptado,
    [...todosLosDescriptoresNatural, ...todosLosDescriptoresAdaptado],
    tiempoCompletado
  );
};

// Función para guardar resultados en localStorage
const guardarResultadosLocalmente = (resultados: ResultadoEvaluacion) => {
  try {
    localStorage.setItem('pda_resultados', JSON.stringify(resultados));
    return true;
  } catch (error) {
    console.error("Error al guardar resultados:", error);
    return false;
  }
};

// Función para cargar resultados desde localStorage
const cargarResultadosLocalmente = (): ResultadoEvaluacion | null => {
  try {
    const datos = localStorage.getItem('pda_resultados');
    if (datos) {
      return JSON.parse(datos);
    }
    return null;
  } catch (error) {
    console.error("Error al cargar resultados:", error);
    return null;
  }
};

// Función para guardar el progreso de la evaluación
const guardarProgresoLocalmente = (
  naturalSelections: string[],
  adaptedSelections: string[],
  profileType: ProfileType,
  currentGroupIndex: number,
  isTransitioning: boolean,
  isCompleted: boolean
) => {
  try {
    const progreso = {
      naturalSelections,
      adaptedSelections,
      profileType,
      currentGroupIndex,
      isTransitioning,
      isCompleted,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('pda_progreso', JSON.stringify(progreso));
    return true;
  } catch (error) {
    console.error("Error al guardar progreso:", error);
    return false;
  }
};

// Función para cargar el progreso de la evaluación
const cargarProgresoLocalmente = () => {
  try {
    const datos = localStorage.getItem('pda_progreso');
    if (datos) {
      return JSON.parse(datos);
    }
    return null;
  } catch (error) {
    console.error("Error al cargar progreso:", error);
    return null;
  }
};

export const useAssessment = () => {
  const [profileType, setProfileType] = useState<ProfileType>("natural");
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [naturalSelections, setNaturalSelections] = useState<string[]>([]);
  const [adaptedSelections, setAdaptedSelections] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const [resultadoEvaluacion, setResultadoEvaluacion] = useState<ResultadoEvaluacion | null>(null);
  const [resultadoId, setResultadoId] = useState<string>("");
  const [tieneProgresoGuardado, setTieneProgresoGuardado] = useState<boolean>(false);
  const [guardandoResultados, setGuardandoResultados] = useState<boolean>(false);
  
  // Cargar progreso guardado al iniciar
  useEffect(() => {
    const progresoGuardado = cargarProgresoLocalmente();
    if (progresoGuardado) {
      setTieneProgresoGuardado(true);
    }
  }, []);
  
  // Restaurar progreso guardado
  const restaurarProgreso = () => {
    const progresoGuardado = cargarProgresoLocalmente();
    if (progresoGuardado) {
      setNaturalSelections(progresoGuardado.naturalSelections);
      setAdaptedSelections(progresoGuardado.adaptedSelections);
      setProfileType(progresoGuardado.profileType);
      setCurrentGroupIndex(progresoGuardado.currentGroupIndex);
      setIsTransitioning(progresoGuardado.isTransitioning);
      setIsCompleted(progresoGuardado.isCompleted);
      toast.success("Progreso restaurado correctamente");
      return true;
    }
    return false;
  };
  
  // Guardar progreso automáticamente cuando cambian las selecciones
  useEffect(() => {
    if (naturalSelections.length > 0 || adaptedSelections.length > 0) {
      guardarProgresoLocalmente(
        naturalSelections,
        adaptedSelections,
        profileType,
        currentGroupIndex,
        isTransitioning,
        isCompleted
      );
    }
  }, [naturalSelections, adaptedSelections, profileType, currentGroupIndex, isTransitioning, isCompleted]);
  
  // Obtener descriptores aleatorizados y combinarlos en grupos
  const combinedNaturalDescriptors = useMemo(() => {
    // Usar una semilla basada en la fecha para mantener consistencia durante la sesión
    const randomizedDescriptors = getRandomizedDescriptors("natural");
    return combineIntoThreeGroups(randomizedDescriptors);
  }, []);
  
  const combinedAdaptedDescriptors = useMemo(() => {
    // Usar una semilla basada en la fecha para mantener consistencia durante la sesión
    const randomizedDescriptors = getRandomizedDescriptors("adapted");
    return combineIntoThreeGroups(randomizedDescriptors);
  }, []);
  
  // Determine which descriptor set to use based on profile type
  const descriptorSets = profileType === "natural" 
    ? combinedNaturalDescriptors 
    : combinedAdaptedDescriptors;
  
  // Get current selections based on profile type
  const currentSelections = profileType === "natural" 
    ? naturalSelections 
    : adaptedSelections;
  
  // Set current selections based on profile type
  const setCurrentSelections = profileType === "natural"
    ? setNaturalSelections
    : setAdaptedSelections;
  
  // Calculate current step including transition
  const totalNaturalGroups = combinedNaturalDescriptors.length;
  const totalAdaptedGroups = combinedAdaptedDescriptors.length;
  const totalGroups = totalNaturalGroups + totalAdaptedGroups;
  
  // Calculate current step (including transition screen)
  const currentStep = isTransitioning 
    ? totalNaturalGroups + 1 
    : profileType === "natural" 
      ? currentGroupIndex + 1 
      : totalNaturalGroups + 1 + currentGroupIndex + 1;
  
  // Total steps including transition and completion screens
  const totalSteps = totalGroups + 3; // +1 for welcome, +1 for transition, +1 for completion
  
  // Define sections for progress bar
  const sections = [
    { name: "¿Cómo me veo?", steps: totalNaturalGroups + 1 }, // +1 for welcome
    { name: "¿Cómo me ven?", steps: totalAdaptedGroups + 1 }, // +1 for transition
    { name: "Finalización", steps: 1 }
  ];
  
  // Toggle descriptor selection
  const handleDescriptorToggle = (id: string) => {
    setCurrentSelections(prev => {
      // If already selected, remove it
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      }
      // Otherwise add it
      return [...prev, id];
    });
  };
  
  // Handle next button
  const handleNext = () => {
    // Check if the current group has at least one selection
    const currentGroupDescriptors = descriptorSets[currentGroupIndex];
    const hasSelectionInCurrentGroup = currentGroupDescriptors.some(
      d => currentSelections.includes(d.id)
    );
    
    if (!hasSelectionInCurrentGroup) {
      toast.error("Por favor seleccione al menos una palabra antes de continuar.");
      return;
    }
    
    // If at the last group of natural profile
    if (profileType === "natural" && currentGroupIndex === combinedNaturalDescriptors.length - 1) {
      setIsTransitioning(true);
      return;
    }
    
    // If at the last group of adapted profile
    if (profileType === "adapted" && currentGroupIndex === combinedAdaptedDescriptors.length - 1) {
      // Procesar resultados al completar
      const tiempoCompletado = Math.floor((Date.now() - startTime) / 1000);
      const resultado = convertirSeleccionesAPerfilNormalizado(
        naturalSelections,
        adaptedSelections,
        tiempoCompletado
      );
      
      setResultadoEvaluacion(resultado);
      guardarResultadosLocalmente(resultado);
      
      // Guardar resultados en Supabase
      guardarResultadosEnSupabase(resultado, tiempoCompletado);
      
      setIsCompleted(true);
      return;
    }
    
    // Otherwise, go to next group
    setCurrentGroupIndex(prev => prev + 1);
  };
  
  // Handle previous button
  const handlePrevious = () => {
    // If on transition screen, go back to last natural group
    if (isTransitioning) {
      setIsTransitioning(false);
      return;
    }
    
    // If on first group of adapted profile, go back to transition
    if (profileType === "adapted" && currentGroupIndex === 0) {
      setIsTransitioning(true);
      setProfileType("natural");
      return;
    }
    
    // Otherwise, go to previous group
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(prev => prev - 1);
    }
  };
  
  // Handle continue from transition screen
  const handleContinueToAdapted = () => {
    setIsTransitioning(false);
    setProfileType("adapted");
    setCurrentGroupIndex(0);
  };
  
  // Check if can go back
  const canGoBack = profileType === "natural" 
    ? currentGroupIndex > 0 
    : true; // Can always go back in adapted profile
  
  // Count total selections for each profile
  const totalNaturalSelected = naturalSelections.length;
  const totalAdaptedSelected = adaptedSelections.length;
  
  // Get current descriptors
  const getCurrentDescriptors = (): Descriptor[] => {
    return descriptorSets[currentGroupIndex];
  };
  
  // Guardar resultados en Supabase
  const guardarResultadosEnSupabase = async (resultado: ResultadoEvaluacion, tiempoCompletado: number) => {
    setGuardandoResultados(true);
    
    try {
      // Verificar si hay un código de acceso en sessionStorage
      const codigoAcceso = sessionStorage.getItem('codigo_acceso');
      const usuarioValidacionId = sessionStorage.getItem('usuario_validacion_id');
      
      // Insertar resultado en la tabla resultados_evaluacion
      const { data: resultadoData, error: resultadoError } = await supabase
        .from('resultados_evaluacion')
        .insert({
          tiempo_completado: tiempoCompletado,
          perfil_natural: resultado.perfilNatural as unknown as Json,
          perfil_adaptado: resultado.perfilAdaptado as unknown as Json,
          indicadores: resultado.indicadores as unknown as Json,
          version_algoritmo: '1.0'
        })
        .select()
        .single();
      
      if (resultadoError) throw resultadoError;
      
      // Guardar el ID del resultado
      setResultadoId(resultadoData.id);
      
      // Si hay un código de acceso, actualizar el usuario de validación
      if (codigoAcceso && usuarioValidacionId) {
        const { error: updateError } = await supabase
          .from('usuarios_validacion')
          .update({
            estado: 'completado',
            fecha_evaluacion: new Date().toISOString(),
            resultado_id: resultadoData.id
          })
          .eq('id', usuarioValidacionId);
        
        if (updateError) throw updateError;
      }
      
      // Guardar los descriptores seleccionados
      const descriptoresNatural = naturalSelections.map((id, index) => ({
        resultado_id: resultadoData.id,
        tipo_perfil: 'natural',
        descriptor_id: id,
        orden_seleccion: index + 1
      }));
      
      const descriptoresAdaptado = adaptedSelections.map((id, index) => ({
        resultado_id: resultadoData.id,
        tipo_perfil: 'adaptado',
        descriptor_id: id,
        orden_seleccion: index + 1
      }));
      
      const { error: descriptoresError } = await supabase
        .from('descriptores_seleccionados')
        .insert([...descriptoresNatural, ...descriptoresAdaptado]);
      
      if (descriptoresError) throw descriptoresError;
      
      // Guardar datos de validación
      const { error: validacionError } = await supabase
        .from('datos_validacion')
        .insert({
          resultado_id: resultadoData.id,
          valores_crudos: {
            naturalSelections,
            adaptedSelections,
            tiempoCompletado
          } as unknown as Json
        });
      
      if (validacionError) throw validacionError;
      
      toast.success("Resultados guardados correctamente");
    } catch (error) {
      console.error("Error al guardar resultados en Supabase:", error);
      toast.error("Error al guardar resultados. Se han guardado localmente.");
    } finally {
      setGuardandoResultados(false);
    }
  };
  
  return {
    profileType,
    currentGroupIndex,
    naturalSelections,
    adaptedSelections,
    isTransitioning,
    isCompleted,
    currentSelections,
    currentStep,
    totalSteps,
    sections,
    handleDescriptorToggle,
    handleNext,
    handlePrevious,
    handleContinueToAdapted,
    canGoBack,
    totalNaturalSelected,
    totalAdaptedSelected,
    getCurrentDescriptors,
    resultadoEvaluacion,
    resultadoId,
    tieneProgresoGuardado,
    restaurarProgreso,
    guardandoResultados
  };
};
