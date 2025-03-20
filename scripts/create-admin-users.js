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

// Función principal
const createAdminUsers = async () => {
  try {
    // Correos electrónicos a registrar como administradores
    const adminEmails = [
      'hlazaroe@gmail.com',
      'dennisjoaquin@gmail.com'
    ];
    
    // Contraseña predeterminada (los usuarios pueden cambiarla después)
    const defaultPassword = 'PDA-Admin-2025';
    
    // Registrar usuarios
    for (const email of adminEmails) {
      // 1. Registrar usuario en Auth
      let authData;
      
      try {
        // Intentar iniciar sesión primero para ver si el usuario ya existe
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: defaultPassword
        });
        
        if (!signInError) {
          // El usuario existe y las credenciales son correctas
          console.log(`Usuario ${email} ya existe y las credenciales son correctas.`);
          authData = signInData;
        } else if (signInError.message.includes('Invalid login credentials')) {
          // El usuario puede existir pero la contraseña es incorrecta, o el usuario no existe
          console.log(`Intentando registrar usuario ${email}...`);
          
          // Crear nuevo usuario
          const { data, error: authError } = await supabase.auth.signUp({
            email,
            password: defaultPassword,
            options: {
              data: {
                role: 'admin'
              },
              emailRedirectTo: `${process.env.VITE_APP_URL || 'http://localhost:8080'}/dashboard`
            }
          });
          
          if (authError) {
            if (authError.message.includes('already registered')) {
              console.log(`Usuario ${email} ya existe pero la contraseña es incorrecta. Por favor, restablece la contraseña manualmente.`);
            } else {
              console.error(`Error al registrar usuario ${email}:`, authError);
              continue;
            }
          } else {
            authData = data;
            console.log(`Usuario ${email} registrado exitosamente. Se ha enviado un correo de confirmación.`);
            console.log(`IMPORTANTE: Para entornos locales, usa el servidor MCP de Supabase para confirmar manualmente el correo electrónico.`);
          }
        } else {
          // Otro tipo de error
          console.error(`Error al verificar usuario ${email}:`, signInError);
          continue;
        }
      } catch (error) {
        console.error(`Error inesperado para ${email}:`, error);
        continue;
      }
      
      // Si no tenemos datos de autenticación, no podemos continuar con este usuario
      if (!authData || !authData.user) {
        console.log(`No se pudo obtener información de autenticación para ${email}. Saltando...`);
        continue;
      }
      
      console.log(`Usuario ${email} registrado exitosamente.`);
      
      // 2. Insertar en tabla de administradores (si existe)
      try {
        const { error: adminError } = await supabase
          .from('administradores')
          .insert({
            id: authData.user.id,
            email: email,
            nombre: email.split('@')[0],
            rol: 'admin',
            fecha_creacion: new Date().toISOString()
          });
        
        if (adminError) {
          console.error(`Error al insertar en tabla administradores para ${email}:`, adminError);
        } else {
          console.log(`Registro en tabla administradores completado para ${email}.`);
        }
      } catch (err) {
        console.log(`Nota: La tabla 'administradores' puede no existir. Esto es normal si no se ha creado.`);
      }
    }
    
    console.log('\n=== RESUMEN ===');
    console.log('Usuarios administradores creados:');
    adminEmails.forEach(email => console.log(`- ${email}`));
    console.log(`\nContraseña predeterminada: ${defaultPassword}`);
    console.log('\nPuedes iniciar sesión en: http://localhost:8080/login');
    console.log('Y acceder al panel de administración en: http://localhost:8080/dashboard/validacion');
    
  } catch (error) {
    console.error('Error al crear usuarios administradores:', error);
  }
};

// Ejecutar la función principal
createAdminUsers();
