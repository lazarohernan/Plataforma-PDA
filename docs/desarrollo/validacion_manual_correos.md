# Validación Manual de Correos Electrónicos en Entornos Locales

Este documento proporciona instrucciones sobre cómo validar manualmente los correos electrónicos de los usuarios administradores en entornos locales utilizando el servidor MCP de Supabase.

## Contexto

En entornos de producción, Supabase envía correos electrónicos de confirmación a los usuarios cuando se registran. Sin embargo, en entornos locales o de desarrollo, es posible que no se puedan enviar correos electrónicos o que no se quiera esperar a que los usuarios confirmen sus correos electrónicos.

Ya hemos implementado una solución para confirmar automáticamente los correos electrónicos de los usuarios administradores creados a través del script `create-admin-users.js`. Sin embargo, si necesitas confirmar manualmente el correo electrónico de un usuario, puedes seguir estas instrucciones.

## Requisitos

- Acceso al servidor MCP de Supabase
- Credenciales de administrador de Supabase

## Pasos para Validar Manualmente un Correo Electrónico

### 1. Habilitar el Modo Inseguro para la Base de Datos

```javascript
<use_mcp_tool>
<server_name>github.com/alexander-zuev/supabase-mcp-server</server_name>
<tool_name>live_dangerously</tool_name>
<arguments>
{
  "service": "database",
  "enable_unsafe_mode": true
}
</arguments>
</use_mcp_tool>
```

### 2. Actualizar el Campo `email_confirmed_at` del Usuario

```javascript
<use_mcp_tool>
<server_name>github.com/alexander-zuev/supabase-mcp-server</server_name>
<tool_name>execute_postgresql</tool_name>
<arguments>
{
  "query": "UPDATE auth.users SET email_confirmed_at = NOW(), raw_user_meta_data = jsonb_set(raw_user_meta_data, '{email_verified}', 'true') WHERE email = 'correo@ejemplo.com';"
}
</arguments>
</use_mcp_tool>
```

Reemplaza `'correo@ejemplo.com'` con el correo electrónico del usuario que deseas confirmar.

### 3. Verificar que el Correo Electrónico se Haya Confirmado

```javascript
<use_mcp_tool>
<server_name>github.com/alexander-zuev/supabase-mcp-server</server_name>
<tool_name>execute_postgresql</tool_name>
<arguments>
{
  "query": "SELECT email, email_confirmed_at, confirmed_at, raw_user_meta_data FROM auth.users WHERE email = 'correo@ejemplo.com';"
}
</arguments>
</use_mcp_tool>
```

Reemplaza `'correo@ejemplo.com'` con el correo electrónico del usuario que deseas verificar.

Si el campo `email_confirmed_at` tiene un valor de fecha y hora, y el campo `raw_user_meta_data` tiene `email_verified` establecido en `true`, entonces el correo electrónico se ha confirmado correctamente.

### 4. Volver al Modo Seguro para la Base de Datos

```javascript
<use_mcp_tool>
<server_name>github.com/alexander-zuev/supabase-mcp-server</server_name>
<tool_name>live_dangerously</tool_name>
<arguments>
{
  "service": "database",
  "enable_unsafe_mode": false
}
</arguments>
</use_mcp_tool>
```

## Notas Importantes

- Esta validación manual solo debe realizarse en entornos locales o de desarrollo.
- En entornos de producción, se debe seguir el flujo normal de confirmación de correo electrónico.
- Asegúrate de tener las credenciales de administrador de Supabase antes de intentar validar manualmente un correo electrónico.
- Si tienes problemas para validar manualmente un correo electrónico, contacta al administrador de Supabase.

## Solución Alternativa: Desactivar la Confirmación de Correo Electrónico

Si prefieres desactivar completamente la confirmación de correo electrónico en tu entorno local, puedes modificar la configuración de Supabase. Sin embargo, esto no se recomienda para entornos de producción.

Para desactivar la confirmación de correo electrónico, puedes modificar la configuración de Supabase a través de la interfaz de administración de Supabase o mediante la API de administración de Supabase.

## Referencias

- [Documentación de Supabase sobre Autenticación](https://supabase.com/docs/guides/auth)
- [API de Administración de Supabase](https://supabase.com/docs/reference/javascript/auth-admin-createuser)
- [Servidor MCP de Supabase](https://github.com/alexander-zuev/supabase-mcp-server)
