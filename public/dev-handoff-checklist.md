# Dev Handoff & Post-Launch Checklist — Florería Mori

## Contexto del Proyecto

Stack: Next.js 16 (App Router) + Tailwind v4 + Supabase (DB + Auth + Storage) + Vercel  
Dominio objetivo: `floreriamori.cl`  
Repo: local en `/Users/matiuusky/Desktop/Floreria_Mori/web-floreria-mori`

---

## Paso 1 — Preparar Variables de Entorno en Vercel

Antes de conectar el dominio, verificar que estas variables estén seteadas en el proyecto de Vercel (Settings → Environment Variables):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_GA_ID
```

Las primeras dos están en Supabase → Project Settings → API.  
`SUPABASE_SERVICE_ROLE_KEY` es la service_role key (solo para el servidor).  
`NEXT_PUBLIC_GA_ID` es el Measurement ID de Google Analytics (G-XXXXXXX).

---

## Paso 2 — Conectar Dominio en Vercel

1. En Vercel → proyecto → Settings → Domains → agregar `floreriamori.cl` y `www.floreriamori.cl`
2. Vercel entrega los registros DNS (A y/o CNAME)
3. En el panel del registrador del dominio (NIC Chile u otro), apuntar los registros DNS a Vercel
4. Esperar propagación DNS (puede tardar entre 10 min y 48 hrs)
5. Vercel emite el certificado SSL automáticamente

---

## Paso 3 — Verificar en Producción

Una vez el dominio esté activo, revisar:

- [ ] Página de inicio carga correctamente
- [ ] Catálogo muestra productos (depende de que la clienta haya subido contenido)
- [ ] Filtros de categoría funcionan
- [ ] Página de producto individual con URL `/catalogo/[slug]`
- [ ] Botón de WhatsApp abre con el número correcto y mensaje correcto
- [ ] Panel admin `/admin` — login funciona y CRUD operativo
- [ ] Upload de imágenes en admin funciona (Supabase Storage)
- [ ] Delivery page carga zonas
- [ ] Headers de seguridad activos — verificar en https://securityheaders.com
- [ ] CSP sin errores — revisar consola del navegador en producción

---

## Paso 4 — Google Search Console

1. Ir a https://search.google.com/search-console
2. Agregar propiedad → tipo URL → `https://floreriamori.cl`
3. Verificar con el método HTML tag (agregar en `app/layout.tsx` dentro del metadata de Next.js)
4. Una vez verificado, ir a Sitemaps → enviar `https://floreriamori.cl/sitemap.xml`
5. Monitorear cobertura de indexación durante las primeras 2 semanas

---

## Paso 5 — Google Analytics

- Verificar que el GA4 Measurement ID esté en las env vars
- Entrar a Google Analytics → Tiempo Real → abrir el sitio en otra pestaña → confirmar que aparece un usuario activo
- Si no aparece, revisar que `NEXT_PUBLIC_GA_ID` esté correctamente seteado en Vercel y hacer redeploy

---

## Paso 6 — Supabase (Producción)

- [ ] RLS habilitado en todas las tablas ✅ (ya verificado)
- [ ] Habilitar 2FA en la cuenta de Supabase (Authentication → Multi-Factor)
- [ ] En Supabase → Storage → Policies: confirmar que el bucket de imágenes solo permite subida a usuarios autenticados y lectura pública
- [ ] Revisar Supabase → Database → Logs en los primeros días para detectar queries lentas o errores

---

## Paso 7 — Monitoreo Ongoing

| Herramienta | Qué revisar | Frecuencia |
|-------------|------------|------------|
| Vercel Dashboard | Errores de build, usage, logs de funciones | Semanal |
| Google Analytics | Visitas, páginas más vistas, fuente de tráfico | Semanal |
| Google Search Console | Cobertura de índice, palabras clave, errores | Quincenal |
| Supabase | Storage usage, DB size, logs | Mensual |

---

## Arquitectura Resumida

```
app/
├── (public)/           → Sitio público (home, catálogo, delivery, contacto)
│   └── catalogo/[slug] → Página de producto con slug SEO-friendly
├── admin/(protected)/  → Panel admin con auth gate
└── api/                → 8 rutas API (products, categories, banners, delivery-zones, upload)

lib/
├── supabase/           → server.ts (anon), admin.ts (service role)
├── validation.ts       → Validación + sanitización de inputs
├── api-error.ts        → Manejo seguro de errores de DB
├── rate-limit.ts       → Rate limiting en memoria por IP
└── whatsapp.ts         → Generador de URLs de WhatsApp

middleware.ts           → Protección del panel admin + headers de seguridad
```

---

## Notas de Seguridad Implementadas

- CSP enforced en `next.config.ts`
- Rate limiting en endpoint de upload
- Magic byte validation en subida de imágenes (no confía en MIME del cliente)
- Mass assignment bloqueado en todas las rutas API (whitelist de campos)
- Errores de DB mascarados (no se exponen mensajes internos de PostgreSQL)
- JSON-LD sanitizado contra XSS
- RLS habilitado en Supabase con políticas correctas
- Iframe de Google Maps sandboxed

---

# Valorización del Proyecto

## Contexto de Mercado (Chile 2025-2026)

Fuente de referencia: tuwebchile.cl + datos de mercado freelance chileno

| Tipo de sitio en el mercado | Precio de mercado |
|-----------------------------|------------------|
| Landing page (1 página) | $80.000 — $200.000 |
| Sitio informativo (hasta 4 páginas) | $150.000 — $300.000 |
| Sitio corporativo completo | $300.000 — $600.000 |
| Catálogo + panel de administración (freelance) | $600.000 — $1.800.000 |
| Mismo proyecto en agencia pequeña Santiago | $1.200.000 — $3.500.000 |

**¿Dónde cae este proyecto?**  
Florería Mori no es un sitio informativo de 4 páginas. Tiene catálogo dinámico, panel de administración completo, base de datos, seguridad hardening, SEO técnico y analytics. Eso lo ubica en la categoría **catálogo + admin panel a medida**, cuyo piso en el mercado freelance chileno es **$600.000 CLP**.

---

## Por Qué la Clienta Percibe el Precio Como Alto

La clienta probablemente está comparando con lo que ve en redes sociales ("hago tu página web desde $50.000") que corresponde a:
- Una sola página estática sin base de datos
- Sin panel de administración (ella no puede actualizar nada sola)
- Sin SEO técnico ni analytics
- Sin seguridad
- Generalmente en Wix, Squarespace o WordPress con template

Lo que se desarrolló aquí es tecnológicamente más cercano a un sistema de gestión de contenido a medida que a una "página web". La clienta puede actualizar su catálogo, precios, fotos, zonas de delivery y banners sola, en cualquier momento, sin pedirle nada a nadie.

---

## Desglose por Área de Trabajo

| Área | Descripción | Horas Est. |
|------|-------------|-----------|
| Diseño UI/UX | Sistema de diseño completo (paleta, tipografía, componentes), responsive mobile-first | 25h |
| Frontend — Sitio Público | Home, catálogo con filtros y búsqueda, página de producto, delivery, contacto | 40h |
| Frontend — Panel Admin | CRUD completo para productos, categorías, banners y zonas de delivery | 25h |
| Backend / API | 8 rutas API REST, esquema de base de datos, integración con almacenamiento | 25h |
| SEO Técnico | Metadata dinámica, sitemap, datos estructurados, canonical URLs | 10h |
| Analytics | Integración Google Analytics 4, tracking de vistas de producto | 5h |
| Seguridad | Auditoría completa + implementación (middleware, validación, protección de datos) | 15h |
| Deployment | Configuración de hosting, variables de entorno, optimización | 5h |
| **Total** | | **~150h** |

---

## Opciones de Precio Según Situación

### Opción 1 — Si hay relación de largo plazo (mantención mensual incluida)
**$400.000 — $500.000 CLP** desarrollo inicial  
\+ mantención mensual de $60.000 — $80.000/mes

Esto permite recuperar el valor real del proyecto en 12-18 meses mientras se genera una relación continua. Es la opción más justa para ambas partes cuando el cliente tiene presupuesto limitado pero genuino interés.

### Opción 2 — Precio único accesible (sin mantención)
**$600.000 — $800.000 CLP** pago único

El mínimo que refleja honestamente el trabajo realizado según el mercado. Por debajo de este valor se está trabajando a pérdida considerando las horas invertidas.

### Opción 3 — Precio de mercado real (si se negocia sin descuento)
**$1.200.000 — $1.500.000 CLP** pago único

Lo que cobraría un freelance mid-level en Santiago por el mismo scope de trabajo.

---

## Recomendación para Esta Situación Específica

Dado que la clienta es una PYME familiar con recursos limitados, la estrategia más sostenible es:

1. **Cobrar $400.000 — $500.000** por el desarrollo (precio de lanzamiento / cliente nuevo)
2. **Ofrecer mantención mensual de $60.000 — $80.000** que incluya:
   - Sitio funcionando y monitoreado
   - Reporte mensual de visitas y productos más vistos
   - Soporte ante cualquier problema
3. **Dejar claro por escrito** qué se entrega y qué vale, para que la clienta entienda que está recibiendo algo que en el mercado cuesta el doble o más

Esto genera ingresos recurrentes predecibles para ti y un servicio accesible para ella. En 10 meses ya habrás recuperado el precio de mercado.

---

## Mantención Mensual — Detalle de Opciones

| Plan | Incluye | Precio |
|------|---------|--------|
| Básico | Monitoreo, soporte ante problemas, hosting activo | $50.000 — $70.000/mes |
| Estándar | Lo anterior + reporte mensual de visitas y métricas | $80.000 — $100.000/mes |
| Completo | Lo anterior + actualización de contenido (subir productos, cambiar banners) | $120.000 — $150.000/mes |

---

## Costos Operativos del Sitio (para informar a la clienta)

Estos son costos del proyecto, no del desarrollo:

| Servicio | Costo Aprox. |
|----------|-------------|
| Hosting | Gratis hasta cierto volumen de tráfico |
| Base de datos y almacenamiento de imágenes | Gratis hasta cierto uso (suficiente para 12-18 meses) |
| Dominio `floreriamori.cl` | ~$15.000 — $25.000 CLP/año |

Para el volumen de una florería pequeña, los servicios gratuitos son suficientes durante el primer año y medio.
