#!/usr/bin/env node

/**
 * Script para configurar la base de datos de Supabase
 * 
 * Este script ejecuta el script SQL para crear el esquema de base de datos
 * en Supabase utilizando la API de Supabase.
 * 
 * Uso:
 *   node setup-database.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Verificar que las variables de entorno estén configuradas
if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY || !process.env.VITE_SUPABASE_DB_PASSWORD) {
  console.error('Error: Variables de entorno VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY y VITE_SUPABASE_DB_PASSWORD no configuradas.');
  process.exit(1);
}

// Crear cliente de Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
  {
    db: {
      schema: 'public',
    },
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        'x-supabase-db-password': process.env.VITE_SUPABASE_DB_PASSWORD
      }
    }
  }
);

// Leer el script SQL
const sqlScript = fs.readFileSync(path.resolve(__dirname, '../migrations/01_pda_schema.sql'), 'utf8');

// Dividir el script en partes más pequeñas
const sqlParts = [
  // Parte 1: Extensiones y funciones
  sqlScript.match(/-- Extensiones necesarias[\s\S]*?LANGUAGE plpgsql;/)[0],
  
  // Parte 2: Tablas de autenticación y roles
  sqlScript.match(/-- =============================================\s*-- 1\. TABLAS DE AUTENTICACIÓN Y ROLES[\s\S]*?-- =============================================\s*-- 2\./)[0].replace(/-- =============================================\s*-- 2\./, ''),
  
  // Parte 3: Tablas para gestión de evaluaciones
  sqlScript.match(/-- =============================================\s*-- 2\. TABLAS PARA GESTIÓN DE EVALUACIONES[\s\S]*?-- =============================================\s*-- 3\./)[0].replace(/-- =============================================\s*-- 3\./, ''),
  
  // Parte 4: Tablas para resultados de evaluaciones
  sqlScript.match(/-- =============================================\s*-- 3\. TABLAS PARA RESULTADOS DE EVALUACIONES[\s\S]*?-- =============================================\s*-- 4\./)[0].replace(/-- =============================================\s*-- 4\./, ''),
  
  // Parte 5: Tablas para análisis y reportes
  sqlScript.match(/-- =============================================\s*-- 4\. TABLAS PARA ANÁLISIS Y REPORTES[\s\S]*?-- =============================================\s*-- 5\./)[0].replace(/-- =============================================\s*-- 5\./, ''),
  
  // Parte 6: Disparadores para actualización de timestamps
  sqlScript.match(/-- =============================================\s*-- 5\. DISPARADORES PARA ACTUALIZACIÓN DE TIMESTAMPS[\s\S]*?-- =============================================\s*-- 6\./)[0].replace(/-- =============================================\s*-- 6\./, ''),
  
  // Parte 7: Políticas de seguridad (RLS)
  sqlScript.match(/-- =============================================\s*-- 6\. POLÍTICAS DE SEGURIDAD \(RLS\)[\s\S]*?-- =============================================\s*-- 7\./)[0].replace(/-- =============================================\s*-- 7\./, ''),
  
  // Parte 8: Datos iniciales
  sqlScript.match(/-- =============================================\s*-- 7\. DATOS INICIALES[\s\S]*$/)[0]
];

// Función para ejecutar una consulta SQL
async function executeQuery(query, name) {
  console.log(`Ejecutando ${name}...`);
  try {
    const { error } = await supabase.rpc('pgexecute', { query });
    if (error) {
      console.error(`Error al ejecutar ${name}:`, error);
      return false;
    }
    console.log(`${name} ejecutado correctamente.`);
    return true;
  } catch (error) {
    console.error(`Error al ejecutar ${name}:`, error.message);
    return false;
  }
}

// Ejecutar cada parte del script SQL
async function setupDatabase() {
  console.log('Configurando base de datos...');
  
  // Ejecutar cada parte del script SQL
  for (let i = 0; i < sqlParts.length; i++) {
    const success = await executeQuery(sqlParts[i], `Parte ${i + 1}`);
    if (!success) {
      console.error(`Error al ejecutar la parte ${i + 1}. Abortando.`);
      process.exit(1);
    }
  }
  
  console.log('Base de datos configurada correctamente.');
}

// Ejecutar el script
setupDatabase().catch(error => {
  console.error('Error al configurar la base de datos:', error);
  process.exit(1);
});
