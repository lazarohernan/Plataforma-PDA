-- Crear función para manejar la creación automática de perfiles de usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfiles_usuario (
    id,
    nombres,
    apellidos,
    rol_id,
    activo
  ) VALUES (
    NEW.id,
    SPLIT_PART(NEW.raw_user_meta_data->>'full_name', ' ', 1),
    SPLIT_PART(NEW.raw_user_meta_data->>'full_name', ' ', 2),
    (SELECT id FROM public.roles WHERE nivel = 4), -- Rol de usuario por defecto
    TRUE
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear trigger para nuevos usuarios
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Actualizar las políticas de RLS para permitir la creación automática de perfiles
ALTER POLICY "Administradores pueden crear perfiles" ON public.perfiles_usuario
  WITH CHECK (get_user_role() = 1 OR auth.uid() = id);
