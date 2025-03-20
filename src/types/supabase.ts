export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      roles: {
        Row: {
          id: string
          nombre: string
          descripcion: string | null
          nivel: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nombre: string
          descripcion?: string | null
          nivel: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          descripcion?: string | null
          nivel?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      organizaciones: {
        Row: {
          id: string
          nombre: string
          descripcion: string | null
          plan_suscripcion: string | null
          estado: string
          logo_url: string | null
          configuracion: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nombre: string
          descripcion?: string | null
          plan_suscripcion?: string | null
          estado?: string
          logo_url?: string | null
          configuracion?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          descripcion?: string | null
          plan_suscripcion?: string | null
          estado?: string
          logo_url?: string | null
          configuracion?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      perfiles_usuario: {
        Row: {
          id: string
          nombres: string | null
          apellidos: string | null
          organizacion_id: string | null
          rol_id: string | null
          configuracion_personal: Json | null
          asignado_por: string | null
          activo: boolean
          ultimo_acceso: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          nombres?: string | null
          apellidos?: string | null
          organizacion_id?: string | null
          rol_id?: string | null
          configuracion_personal?: Json | null
          asignado_por?: string | null
          activo?: boolean
          ultimo_acceso?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombres?: string | null
          apellidos?: string | null
          organizacion_id?: string | null
          rol_id?: string | null
          configuracion_personal?: Json | null
          asignado_por?: string | null
          activo?: boolean
          ultimo_acceso?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "perfiles_usuario_asignado_por_fkey"
            columns: ["asignado_por"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perfiles_usuario_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perfiles_usuario_organizacion_id_fkey"
            columns: ["organizacion_id"]
            referencedRelation: "organizaciones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perfiles_usuario_rol_id_fkey"
            columns: ["rol_id"]
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
        ]
      }
      perfiles_puesto: {
        Row: {
          id: string
          nombre: string
          descripcion: string | null
          organizacion_id: string | null
          creado_por: string | null
          perfil: Json
          competencias: Json | null
          activo: boolean
          publico: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nombre: string
          descripcion?: string | null
          organizacion_id?: string | null
          creado_por?: string | null
          perfil: Json
          competencias?: Json | null
          activo?: boolean
          publico?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          descripcion?: string | null
          organizacion_id?: string | null
          creado_por?: string | null
          perfil?: Json
          competencias?: Json | null
          activo?: boolean
          publico?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "perfiles_puesto_creado_por_fkey"
            columns: ["creado_por"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perfiles_puesto_organizacion_id_fkey"
            columns: ["organizacion_id"]
            referencedRelation: "organizaciones"
            referencedColumns: ["id"]
          }
        ]
      }
      evaluaciones: {
        Row: {
          id: string
          titulo: string | null
          descripcion: string | null
          organizacion_id: string | null
          asignado_por: string | null
          usuario_id: string | null
          perfil_puesto_id: string | null
          fecha_asignacion: string
          fecha_vencimiento: string | null
          estado: string
          codigo_acceso: string | null
          anonima: boolean
          metadatos: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          titulo?: string | null
          descripcion?: string | null
          organizacion_id?: string | null
          asignado_por?: string | null
          usuario_id?: string | null
          perfil_puesto_id?: string | null
          fecha_asignacion?: string
          fecha_vencimiento?: string | null
          estado?: string
          codigo_acceso?: string | null
          anonima?: boolean
          metadatos?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          titulo?: string | null
          descripcion?: string | null
          organizacion_id?: string | null
          asignado_por?: string | null
          usuario_id?: string | null
          perfil_puesto_id?: string | null
          fecha_asignacion?: string
          fecha_vencimiento?: string | null
          estado?: string
          codigo_acceso?: string | null
          anonima?: boolean
          metadatos?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluaciones_asignado_por_fkey"
            columns: ["asignado_por"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluaciones_organizacion_id_fkey"
            columns: ["organizacion_id"]
            referencedRelation: "organizaciones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluaciones_perfil_puesto_id_fkey"
            columns: ["perfil_puesto_id"]
            referencedRelation: "perfiles_puesto"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluaciones_usuario_id_fkey"
            columns: ["usuario_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      resultados_evaluacion: {
        Row: {
          id: string
          evaluacion_id: string | null
          usuario_id: string | null
          tiempo_completado: number | null
          perfil_natural: Json
          perfil_adaptado: Json
          indicadores: Json
          compatibilidad: Json | null
          version_algoritmo: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          evaluacion_id?: string | null
          usuario_id?: string | null
          tiempo_completado?: number | null
          perfil_natural: Json
          perfil_adaptado: Json
          indicadores: Json
          compatibilidad?: Json | null
          version_algoritmo?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          evaluacion_id?: string | null
          usuario_id?: string | null
          tiempo_completado?: number | null
          perfil_natural?: Json
          perfil_adaptado?: Json
          indicadores?: Json
          compatibilidad?: Json | null
          version_algoritmo?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resultados_evaluacion_evaluacion_id_fkey"
            columns: ["evaluacion_id"]
            referencedRelation: "evaluaciones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resultados_evaluacion_usuario_id_fkey"
            columns: ["usuario_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      descriptores_seleccionados: {
        Row: {
          id: string
          resultado_id: string | null
          tipo_perfil: string
          descriptor_id: string
          orden_seleccion: number | null
          created_at: string
        }
        Insert: {
          id?: string
          resultado_id?: string | null
          tipo_perfil: string
          descriptor_id: string
          orden_seleccion?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          resultado_id?: string | null
          tipo_perfil?: string
          descriptor_id?: string
          orden_seleccion?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "descriptores_seleccionados_resultado_id_fkey"
            columns: ["resultado_id"]
            referencedRelation: "resultados_evaluacion"
            referencedColumns: ["id"]
          }
        ]
      }
      datos_validacion: {
        Row: {
          id: string
          resultado_id: string | null
          valores_crudos: Json | null
          contradicciones: number | null
          parametros_normalizacion: Json | null
          valoracion_precision: number | null
          comentarios: string | null
          validado_por: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          resultado_id?: string | null
          valores_crudos?: Json | null
          contradicciones?: number | null
          parametros_normalizacion?: Json | null
          valoracion_precision?: number | null
          comentarios?: string | null
          validado_por?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          resultado_id?: string | null
          valores_crudos?: Json | null
          contradicciones?: number | null
          parametros_normalizacion?: Json | null
          valoracion_precision?: number | null
          comentarios?: string | null
          validado_por?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "datos_validacion_resultado_id_fkey"
            columns: ["resultado_id"]
            referencedRelation: "resultados_evaluacion"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "datos_validacion_validado_por_fkey"
            columns: ["validado_por"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reportes: {
        Row: {
          id: string
          organizacion_id: string | null
          creado_por: string | null
          titulo: string
          descripcion: string | null
          tipo: string
          contenido: Json
          resultados_incluidos: string[]
          publico: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organizacion_id?: string | null
          creado_por?: string | null
          titulo: string
          descripcion?: string | null
          tipo: string
          contenido: Json
          resultados_incluidos: string[]
          publico?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organizacion_id?: string | null
          creado_por?: string | null
          titulo?: string
          descripcion?: string | null
          tipo?: string
          contenido?: Json
          resultados_incluidos?: string[]
          publico?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reportes_creado_por_fkey"
            columns: ["creado_por"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reportes_organizacion_id_fkey"
            columns: ["organizacion_id"]
            referencedRelation: "organizaciones"
            referencedColumns: ["id"]
          }
        ]
      }
      grupos_analisis: {
        Row: {
          id: string
          organizacion_id: string | null
          creado_por: string | null
          nombre: string
          descripcion: string | null
          miembros: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organizacion_id?: string | null
          creado_por?: string | null
          nombre: string
          descripcion?: string | null
          miembros: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organizacion_id?: string | null
          creado_por?: string | null
          nombre?: string
          descripcion?: string | null
          miembros?: string[]
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "grupos_analisis_creado_por_fkey"
            columns: ["creado_por"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grupos_analisis_organizacion_id_fkey"
            columns: ["organizacion_id"]
            referencedRelation: "organizaciones"
            referencedColumns: ["id"]
          }
        ]
      }
      usuarios_validacion: {
        Row: {
          id: string
          nombre: string
          email: string | null
          edad: number | null
          sector_profesional: string | null
          codigo_acceso: string
          estado: string
          fecha_creacion: string
          fecha_evaluacion: string | null
          resultado_id: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          nombre: string
          email?: string | null
          edad?: number | null
          sector_profesional?: string | null
          codigo_acceso: string
          estado?: string
          fecha_creacion?: string
          fecha_evaluacion?: string | null
          resultado_id?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          nombre?: string
          email?: string | null
          edad?: number | null
          sector_profesional?: string | null
          codigo_acceso?: string
          estado?: string
          fecha_creacion?: string
          fecha_evaluacion?: string | null
          resultado_id?: string | null
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_validacion_resultado_id_fkey"
            columns: ["resultado_id"]
            referencedRelation: "resultados_evaluacion"
            referencedColumns: ["id"]
          }
        ]
      }
      feedback_evaluacion: {
        Row: {
          id: string
          resultado_id: string | null
          valoracion_precision: number | null
          valoracion_claridad: number | null
          valoracion_experiencia: number | null
          comentarios_generales: string | null
          fecha_feedback: string
        }
        Insert: {
          id?: string
          resultado_id?: string | null
          valoracion_precision?: number | null
          valoracion_claridad?: number | null
          valoracion_experiencia?: number | null
          comentarios_generales?: string | null
          fecha_feedback?: string
        }
        Update: {
          id?: string
          resultado_id?: string | null
          valoracion_precision?: number | null
          valoracion_claridad?: number | null
          valoracion_experiencia?: number | null
          comentarios_generales?: string | null
          fecha_feedback?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_evaluacion_resultado_id_fkey"
            columns: ["resultado_id"]
            referencedRelation: "resultados_evaluacion"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_organization: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
