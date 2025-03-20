import { supabase } from './supabase';
import { Json } from '../types/supabase';

/**
 * Utilidades para migrar datos desde localStorage a Supabase
 */

/**
 * Migra los resultados de evaluación desde localStorage a Supabase
 * @returns El resultado de la migración
 */
export async function migrateResultsToSupabase() {
  try {
    // Obtener resultados de localStorage
    const storedResults = localStorage.getItem('pda_resultados');
    if (!storedResults) {
      console.log('No hay resultados para migrar');
      return { success: true, message: 'No hay resultados para migrar', data: null };
    }
    
    const results = JSON.parse(storedResults);
    
    // Obtener usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { 
        success: false, 
        message: 'Debes iniciar sesión para migrar tus resultados', 
        data: null 
      };
    }
    
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
      return { 
        success: false, 
        message: `Error al migrar resultados: ${error.message}`, 
        data: null 
      };
    }
    
    // Migrar descriptores seleccionados
    if (data && data[0]) {
      const resultadoId = data[0].id;
      
      // Obtener descriptores de localStorage
      const naturalSelections = JSON.parse(localStorage.getItem('pda_natural_selections') || '[]');
      const adaptedSelections = JSON.parse(localStorage.getItem('pda_adapted_selections') || '[]');
      
      // Insertar descriptores naturales
      for (let i = 0; i < naturalSelections.length; i++) {
        const { error: descriptorError } = await supabase
          .from('descriptores_seleccionados')
          .insert({
            resultado_id: resultadoId,
            tipo_perfil: 'natural',
            descriptor_id: naturalSelections[i],
            orden_seleccion: i + 1
          });
          
        if (descriptorError) {
          console.error('Error al migrar descriptor natural:', descriptorError);
        }
      }
      
      // Insertar descriptores adaptados
      for (let i = 0; i < adaptedSelections.length; i++) {
        const { error: descriptorError } = await supabase
          .from('descriptores_seleccionados')
          .insert({
            resultado_id: resultadoId,
            tipo_perfil: 'adaptado',
            descriptor_id: adaptedSelections[i],
            orden_seleccion: i + 1
          });
          
        if (descriptorError) {
          console.error('Error al migrar descriptor adaptado:', descriptorError);
        }
      }
    }
    
    return { 
      success: true, 
      message: 'Resultados migrados correctamente', 
      data 
    };
  } catch (error) {
    console.error('Error inesperado al migrar resultados:', error);
    return { 
      success: false, 
      message: `Error inesperado al migrar resultados: ${error instanceof Error ? error.message : String(error)}`, 
      data: null 
    };
  }
}

/**
 * Migra los perfiles de puesto desde localStorage a Supabase
 * @returns El resultado de la migración
 */
export async function migrateJobProfilesToSupabase() {
  try {
    // Obtener perfiles de puesto de localStorage
    const storedProfiles = localStorage.getItem('pda_job_profiles');
    if (!storedProfiles) {
      console.log('No hay perfiles de puesto para migrar');
      return { success: true, message: 'No hay perfiles de puesto para migrar', data: null };
    }
    
    const profiles = JSON.parse(storedProfiles);
    
    // Obtener usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { 
        success: false, 
        message: 'Debes iniciar sesión para migrar tus perfiles de puesto', 
        data: null 
      };
    }
    
    // Obtener perfil de usuario para obtener la organización
    const { data: userProfile } = await supabase
      .from('perfiles_usuario')
      .select('organizacion_id')
      .eq('id', user.id)
      .single();
    
    // Determinar la organización del usuario
    let organizacionId: string;
    
    if (!userProfile || !userProfile.organizacion_id) {
      // Si el usuario no tiene una organización, crear una
      const { data: org, error: orgError } = await supabase
        .from('organizaciones')
        .insert({
          nombre: `Organización de ${user.email}`,
          descripcion: 'Organización creada automáticamente durante la migración',
          estado: 'activo'
        })
        .select();
      
      if (orgError || !org) {
        return { 
          success: false, 
          message: `Error al crear organización: ${orgError?.message || 'Error desconocido'}`, 
          data: null 
        };
      }
      
      // Actualizar perfil de usuario con la nueva organización
      const { error: updateError } = await supabase
        .from('perfiles_usuario')
        .update({ organizacion_id: org[0].id })
        .eq('id', user.id);
      
      if (updateError) {
        return { 
          success: false, 
          message: `Error al actualizar perfil de usuario: ${updateError.message}`, 
          data: null 
        };
      }
      
      organizacionId = org[0].id;
    } else {
      organizacionId = userProfile.organizacion_id;
    }
    
    // Migrar cada perfil de puesto
    const migratedProfiles = [];
    
    for (const profile of profiles) {
      const { data, error } = await supabase
        .from('perfiles_puesto')
        .insert({
          nombre: profile.name || 'Perfil sin nombre',
          descripcion: profile.description || '',
          organizacion_id: organizacionId,
          creado_por: user.id,
          perfil: {
            R: profile.R || 0,
            E: profile.E || 0,
            P: profile.P || 0,
            N: profile.N || 0,
            A: profile.A || 0
          },
          competencias: profile.competencias || null,
          activo: true,
          publico: false
        })
        .select();
      
      if (error) {
        console.error('Error al migrar perfil de puesto:', error);
      } else if (data) {
        migratedProfiles.push(data[0]);
      }
    }
    
    return { 
      success: true, 
      message: `${migratedProfiles.length} perfiles de puesto migrados correctamente`, 
      data: migratedProfiles 
    };
  } catch (error) {
    console.error('Error inesperado al migrar perfiles de puesto:', error);
    return { 
      success: false, 
      message: `Error inesperado al migrar perfiles de puesto: ${error instanceof Error ? error.message : String(error)}`, 
      data: null 
    };
  }
}

/**
 * Migra todas las preferencias de usuario desde localStorage a Supabase
 * @returns El resultado de la migración
 */
export async function migrateUserPreferencesToSupabase() {
  try {
    // Obtener usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { 
        success: false, 
        message: 'Debes iniciar sesión para migrar tus preferencias', 
        data: null 
      };
    }
    
    // Recopilar todas las preferencias de localStorage que empiezan con 'pda_pref_'
    const preferences: Record<string, Json> = {};
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('pda_pref_')) {
        const prefName = key.replace('pda_pref_', '');
        try {
          preferences[prefName] = JSON.parse(localStorage.getItem(key) || 'null');
        } catch (e) {
          preferences[prefName] = localStorage.getItem(key);
        }
      }
    }
    
    // Si no hay preferencias, salir
    if (Object.keys(preferences).length === 0) {
      return { 
        success: true, 
        message: 'No hay preferencias para migrar', 
        data: null 
      };
    }
    
    // Actualizar perfil de usuario con las preferencias
    const { data, error } = await supabase
      .from('perfiles_usuario')
      .update({ 
        configuracion_personal: preferences,
        ultimo_acceso: new Date().toISOString()
      })
      .eq('id', user.id)
      .select();
    
    if (error) {
      return { 
        success: false, 
        message: `Error al migrar preferencias: ${error.message}`, 
        data: null 
      };
    }
    
    return { 
      success: true, 
      message: 'Preferencias migradas correctamente', 
      data 
    };
  } catch (error) {
    console.error('Error inesperado al migrar preferencias:', error);
    return { 
      success: false, 
      message: `Error inesperado al migrar preferencias: ${error instanceof Error ? error.message : String(error)}`, 
      data: null 
    };
  }
}

/**
 * Migra todos los datos de localStorage a Supabase
 * @returns El resultado de la migración
 */
export async function migrateAllDataToSupabase() {
  const results = await migrateResultsToSupabase();
  const profiles = await migrateJobProfilesToSupabase();
  const preferences = await migrateUserPreferencesToSupabase();
  
  return {
    results,
    profiles,
    preferences,
    success: results.success && profiles.success && preferences.success,
    message: [
      results.message,
      profiles.message,
      preferences.message
    ].join('. ')
  };
}

/**
 * Limpia los datos de localStorage después de una migración exitosa
 * @param keepPreferences Si es true, mantiene las preferencias de usuario
 */
export function clearLocalStorageAfterMigration(keepPreferences = true) {
  // Lista de claves a eliminar
  const keysToRemove = [
    'pda_resultados',
    'pda_natural_selections',
    'pda_adapted_selections',
    'pda_job_profiles'
  ];
  
  // Eliminar cada clave
  for (const key of keysToRemove) {
    localStorage.removeItem(key);
  }
  
  // Si no se deben mantener las preferencias, eliminar todas las que empiezan con 'pda_pref_'
  if (!keepPreferences) {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('pda_pref_')) {
        localStorage.removeItem(key);
      }
    }
  }
}
