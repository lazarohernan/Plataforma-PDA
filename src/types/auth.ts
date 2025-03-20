import { User, Session } from '@supabase/supabase-js';
import { Database } from './supabase';

type Tables = Database['public']['Tables'];

export type OrganizacionData = Tables['organizaciones']['Row'] & {
  metadata?: Record<string, unknown>;
};

export type RolData = Tables['roles']['Row'] & {
  metadata?: Record<string, unknown>;
};

export type UserProfile = Tables['perfiles_usuario']['Row'] & {
  organizacion: OrganizacionData | null;
  rol: RolData | null;
  metadata?: Record<string, unknown>;
};

export interface AuthResponse {
  data: {
    user: User;
    session: Session;
  };
  profile: UserProfile;
}
