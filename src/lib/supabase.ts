import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Estas variables de entorno deben configurarse en el entorno de desarrollo y producción
// Para desarrollo local, puedes usar un archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Verificar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Error: Variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY no configuradas.'
  );
}

// Crear el cliente de Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Función para obtener el usuario actual
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Función para obtener el perfil del usuario actual
export const getCurrentUserProfile = async () => {
  const user = await getCurrentUser();
  
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('perfiles_usuario')
    .select(`
      *,
      organizacion:organizaciones(*),
      rol:roles(*)
    `)
    .eq('id', user.id)
    .single();
  
  if (error) {
    console.error('Error al obtener perfil de usuario:', error);
    return null;
  }
  
  return data;
};

// Función para verificar si el usuario tiene un rol específico
export const hasRole = async (nivel: number) => {
  const perfil = await getCurrentUserProfile();
  
  if (!perfil || !perfil.rol) return false;
  
  return perfil.rol.nivel <= nivel; // Niveles menores tienen más permisos (1: Admin, 4: Usuario)
};

// Función para verificar si el usuario es administrador
export const isAdmin = async () => {
  return hasRole(1);
};

// Función para verificar si el usuario es consultor
export const isConsultor = async () => {
  return hasRole(2);
};

// Función para verificar si el usuario es asistente
export const isAsistente = async () => {
  return hasRole(3);
};
