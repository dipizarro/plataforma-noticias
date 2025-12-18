# Despliegue en Azure Static Web Apps

## Prerrequisitos
- Cuenta de Azure
- Repositorio de GitHub conectado al proyecto

## Configuración de Azure Static Web Apps

1. **Crear un recurso Static Web App** en el Portal de Azure.
2. Seleccionar **GitHub** como fuente.
3. Seleccionar tu organización, repositorio y rama.
4. **Preajustes de compilación (Build Presets)**: Seleccionar `Next.js`.
    - **Ubicación de la app (App location)**: `/`
    - **Ubicación de la API (Api location)**: (Dejar vacío si no hay API de Azure Functions separada)
    - **Ubicación de salida (Output location)**: `.next` (o dejar por defecto, Azure maneja automáticamente Next.js híbrido/estático)

## Variables de Entorno (.env)
Debes configurar las variables de entorno en el Portal de Azure bajo **Settings > Environment variables**.

**Variables Requeridas:**
```env
NEXT_PUBLIC_API_KEY=tu_api_key_de_noticias
NEXT_PUBLIC_API_URL=https://newsapi.org/v2
# Agregar otras variables de .env.example
```

## Desarrollo Local
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear `.env.local` basado en `.env.example`.
3. Ejecutar servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Pipeline de CI/CD
El despliegue es manejado por GitHub Actions. El archivo de flujo de trabajo se encuentra en `.github/workflows/azure-static-web-apps.yml`. Automáticamente compila y despliega al hacer push a `main`.
