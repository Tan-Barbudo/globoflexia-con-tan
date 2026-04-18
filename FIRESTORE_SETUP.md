# Primer bloque: lo que ya quedó generado + lo que debes hacer tú

## ✅ Ya quedó generado en código
1. Refactor inicial del proyecto:
   - `index.html` limpio con import a `styles.css` y `src/main.js`.
   - `styles.css` con todos los estilos movidos desde el HTML.
   - `src/` modular con `main.js`, `auth.js`, `firebase.js`, `ui.js`, `videos.js`.
2. Carga de catálogo desde Firestore (`videos`), con fallback al catálogo local.
3. Archivo `videos.seed.json` con los 17 videos iniciales para que los subas a Firestore.

## 👤 Lo que debes hacer tú (paso a paso)

### 1) Activar Firestore Database
1. Entra a Firebase Console.
2. Proyecto: `globoflexia-tan-barbudo`.
3. Ve a **Firestore Database** > **Create database**.
4. Modo inicial sugerido: **test mode** (solo para arranque).

### 2) Crear colección `videos`
1. En Firestore, crea la colección `videos`.
2. Crea documentos con ID automático.
3. Copia cada objeto desde `videos.seed.json` dentro de un documento.
4. Verifica que cada documento tenga estos campos:
   - `id` (number)
   - `title` (string)
   - `description` (string)
   - `level` (string: `basico`, `intermedio`, `avanzado`)
   - `order` (number)
   - `youtubeEmbedUrl` (string)
   - `isActive` (boolean)

### 3) Crear índice compuesto (si Firebase lo pide)
La consulta usa `where(isActive == true)` + `orderBy(order)`.
- Si aparece error de índice, Firebase te dará un link para crearlo.
- Haz click en ese link y crea el índice.

### 4) Verificar funcionamiento local
1. Ejecuta un servidor estático (ejemplo):
   - `python3 -m http.server 8080`
2. Abre `http://localhost:8080`
3. Inicia sesión y revisa que:
   - Carga lista de tutoriales.
   - Selecciona y reproduce video.
   - Marca visto/pendiente y actualiza progreso.

## ⚠️ Nota importante
En este primer bloque, el progreso sigue en localStorage (`curso_v2`).
En el siguiente bloque migraremos progreso por usuario a Firestore (`users/{uid}/progress`).
