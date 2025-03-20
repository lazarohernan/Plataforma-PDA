import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton para el gráfico de categorías PDA
 */
export const PDACategoryChartSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-64 w-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

/**
 * Skeleton para la interpretación del perfil
 */
export const ProfileInterpretationSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-1/2" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
    <Skeleton className="h-6 w-1/3 mt-6" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
);

/**
 * Skeleton para los indicadores derivados
 */
export const DerivedIndicatorsSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-6 w-1/3" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-full rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * Skeleton para el análisis detallado
 */
export const ResultsDetailedAnalysisSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-6 w-1/3" />
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
);

/**
 * Skeleton para las recomendaciones
 */
export const ResultsRecommendationsSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-6 w-1/3" />
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * Skeleton para la compatibilidad
 */
export const ResultsCompatibilitySkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-6 w-1/3" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-1/3 mt-4" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Skeleton para la exportación
 */
export const ResultsExportSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-6 w-1/3" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <Skeleton className="h-80 w-full" />
    </div>
  </div>
);

/**
 * Skeleton para el resumen de resultados
 */
export const ResultsSummarySkeleton = () => (
  <>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
        <PDACategoryChartSkeleton />
      </div>
      <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
        <ProfileInterpretationSkeleton />
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <DerivedIndicatorsSkeleton />
    </div>
  </>
);
