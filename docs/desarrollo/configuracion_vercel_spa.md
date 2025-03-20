# Configuración de Vercel para Aplicaciones SPA (Single Page Application)

## Problema: Errores 404 al Refrescar Páginas

En aplicaciones SPA como React con React Router, es común encontrar errores 404 cuando:
- Se refresca la página en una ruta que no es la raíz (por ejemplo, `/login` o `/dashboard`)
- Se accede directamente a una URL que no es la raíz

Esto ocurre porque:
1. React Router maneja las rutas en el lado del cliente
2. Pero cuando se refresca la página, la solicitud va al servidor
3. El servidor busca un archivo físico que no existe (por ejemplo, busca un archivo "login" cuando la URL es `/login`)

## Solución Estándar: Configuración de Vercel

La solución oficial para este problema en Vercel es crear un archivo `vercel.json` en la raíz del proyecto con la siguiente configuración:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Explicación de la Configuración

**Rewrites**: Redirecciona cualquier ruta a `index.html`, permitiendo que React Router maneje la ruta en el cliente.
- `"source": "/(.*)"`: Captura cualquier ruta
- `"destination": "/index.html"`: Sirve index.html para todas las rutas

> **Nota importante**: Anteriormente se recomendaba usar tanto `rewrites` como `routes` en la configuración, pero Vercel ha actualizado su plataforma y ahora no permite usar ambas propiedades simultáneamente. Si se intentan usar ambas, se producirá un error de despliegue con el mensaje: "If `rewrites`, `redirects`, `headers`, `cleanUrls` or `trailingSlash` are used, then `routes` cannot be present."

## Implementación y Despliegue

Para implementar esta solución:

1. Crear el archivo `vercel.json` en la raíz del proyecto con la configuración anterior
2. Hacer commit y push de los cambios
3. Vercel detectará automáticamente los cambios y desplegará la aplicación

Si los cambios no surten efecto inmediatamente:
- Forzar un redeploy desde el dashboard de Vercel
- Limpiar la caché del navegador

## Referencias

- [Documentación oficial de Vercel sobre SPA](https://vercel.com/guides/using-react-router-with-vercel)
- [Solución de problemas de enrutamiento en React Router](https://reactrouter.com/en/main/start/overview)
