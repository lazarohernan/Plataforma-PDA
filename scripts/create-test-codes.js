import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Cargar variables de entorno
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY son requeridas');
  process.exit(1);
}

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para generar un código de acceso aleatorio
const generateAccessCode = () => {
  // Generar un código de 6 caracteres alfanuméricos
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Función principal
const createTestCodes = async () => {
  try {
    // Generar dos códigos de acceso
    const code1 = generateAccessCode();
    const code2 = generateAccessCode();
    
    // Insertar los códigos en la tabla usuarios_validacion
    const { data, error } = await supabase
      .from('usuarios_validacion')
      .insert([
        {
          id: uuidv4(),
          nombre: 'Pendiente',
          codigo_acceso: code1,
          estado: 'pendiente',
          fecha_creacion: new Date().toISOString(),
          metadata: { tipo: 'Usuario de prueba 1' }
        },
        {
          id: uuidv4(),
          nombre: 'Pendiente',
          codigo_acceso: code2,
          estado: 'pendiente',
          fecha_creacion: new Date().toISOString(),
          metadata: { tipo: 'Usuario de prueba 2' }
        }
      ]);
    
    if (error) {
      throw error;
    }
    
    console.log('Códigos de acceso creados exitosamente:');
    console.log(`Código 1: ${code1}`);
    console.log(`Código 2: ${code2}`);
    console.log('\nPuedes usar estos códigos en la página de acceso a la evaluación: http://localhost:8080/acceso-evaluacion');
    
  } catch (error) {
    console.error('Error al crear códigos de acceso:', error);
  }
};

// Ejecutar la función principal
createTestCodes();
