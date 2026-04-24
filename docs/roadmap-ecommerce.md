# Florería Mori — Roadmap E-commerce

Fecha de creación: 2026-04-24  
Estado: Pendiente de implementación

---

## Visión general

Escalar el sitio catálogo actual a una plataforma de venta online completa, con carrito de compras, pagos, gestión de pedidos y atribución de marketing (Google Ads + Facebook Ads).

---

## Orden de implementación recomendado

```
Carrito → Checkout → Pagos → Órdenes → Attribution de marketing
```

Cada fase depende de la anterior. No es recomendable saltear fases.

---

## Fase 1 — Carrito de compras

**Qué incluye:**
- Estado del carrito persistido en `localStorage` (o contexto React)
- Ícono de carrito en navbar con contador de ítems
- Drawer/panel lateral con resumen del carrito (productos, cantidades, subtotal)
- Botón "Agregar al carrito" en tarjetas de producto y página de detalle
- Manejo de variantes (tamaño) al agregar
- Botón de vaciar carrito

**Qué no incluye aún:** formulario de checkout, pagos.

**Tablas DB necesarias:** ninguna nueva (el carrito vive en el cliente).

---

## Fase 2 — Checkout

**Qué incluye:**
- Página `/checkout` con formulario: nombre, teléfono, email, dirección de entrega, comuna, fecha/hora deseada, mensaje para la tarjeta
- Selector de zona de delivery (vinculado a tabla existente `delivery_zones`)
- Resumen del pedido con total
- Validación de campos antes de proceder al pago
- Guardar el pedido en la DB con estado `pendiente_pago` antes de redirigir al gateway

**Tablas DB necesarias:**
```sql
orders (
  id, created_at, status,
  customer_name, customer_email, customer_phone,
  delivery_address, delivery_commune, delivery_date, delivery_time,
  card_message, total_amount,
  items (JSONB)  -- snapshot de los productos al momento de la compra
)
```

---

## Fase 3 — Pagos

**Gateway recomendado para Chile: Transbank WebPay Plus**
- Estándar en Chile, soporta tarjetas de crédito y débito
- Integración oficial via `transbank-sdk` (npm)
- Flujo: redirección a Transbank → callback de confirmación → actualizar orden en DB

**Alternativa: Stripe**
- Más fácil de integrar, mejor documentación
- Cobra en USD (hay conversión), puede generar confusión en clientes chilenos
- Acepta tarjetas internacionales

**Recomendación:** Transbank para el mercado local de Peñalolén.

**Lo que requiere:**
- Cuenta comercial Transbank (proceso de onboarding ~1-2 semanas)
- Variables de entorno: `TRANSBANK_COMMERCE_CODE`, `TRANSBANK_API_KEY`
- Rutas API nuevas: `/api/checkout/initiate`, `/api/checkout/confirm`
- Página de éxito (`/checkout/exito`) y fracaso (`/checkout/error`)
- Email de confirmación al cliente (via Resend o SendGrid)

---

## Fase 4 — Gestión de pedidos (Admin)

**Qué incluye en el panel admin:**
- Nueva sección `/admin/pedidos` con lista de órdenes
- Filtros por estado: `pendiente_pago`, `pagado`, `en_preparación`, `enviado`, `entregado`, `cancelado`
- Vista detalle de cada pedido con datos del cliente, productos, dirección
- Cambio manual de estado (ej: marcar como "en preparación")
- Indicador de pedidos nuevos sin revisar (badge en sidebar)

**Mejoras al dashboard existente:**
- Agregar estadísticas de ventas: total del día, semana, mes
- Gráfico simple de ventas por período

---

## Fase 5 — Attribution de marketing

**Google Ads:**
- Evento de conversión en `/checkout/exito` (compra completada)
- Remarketing tag en páginas de producto (usuarios que vieron pero no compraron)
- Conversión de valor dinámico (monto real de la compra)

**Meta (Facebook/Instagram) Ads:**
- Pixel ya instalado (`Analytics.tsx`) — agregar eventos estándar:
  - `AddToCart` al agregar producto al carrito
  - `InitiateCheckout` al llegar a la página de checkout
  - `Purchase` con valor y moneda al confirmar pago
- **Conversions API (CAPI):** envío server-side de eventos para mayor precisión (bypassa ad blockers)
  - Requiere Meta Business Access Token
  - Se implementa en las rutas API de confirmación de pago

**Google Analytics 4:**
- Eventos e-commerce: `add_to_cart`, `begin_checkout`, `purchase`
- Ya se tiene GA4 instalado — solo agregar los eventos en los momentos correctos

---

## Seguridad adicional requerida para pagos

- Webhook verification (firmar y verificar callbacks de Transbank)
- Idempotency keys en la creación de órdenes (evitar duplicados)
- Rate limiting en `/api/checkout/initiate` (Upstash Redis — el actual rate limiter en memoria no es suficiente)
- HTTPS forzado (HSTS ya implementado ✅)
- Logs de transacciones para auditoría

---

## Admin — mejoras pendientes (independientes de e-commerce)

Estas pueden implementarse en cualquier momento sin esperar las fases anteriores:

| # | Mejora | Descripción |
|---|--------|-------------|
| 1 | Búsqueda de productos | Campo de búsqueda en `/admin/productos` para filtrar por nombre |
| 2 | Orden drag-and-drop | Reordenar productos destacados visualmente |
| 3 | Alertas de stock | Notificación cuando `stock > 0` y `stock <= 5` |
| 4 | Historial de cambios | Log simple de quién cambió qué (útil si en el futuro hay más de un admin) |
| 5 | Vista previa del banner | Previsualización inline antes de publicar |
| 6 | Exportar productos CSV | Para respaldo o migración |

---

## Estimación de complejidad

| Fase | Complejidad | Dependencias externas |
|------|------------|----------------------|
| Carrito | Baja | Ninguna |
| Checkout | Media | Ninguna |
| Pagos (Transbank) | Alta | Cuenta comercial Transbank |
| Gestión de pedidos | Media | Fase 2 |
| Attribution | Media | Fases 3-4, Meta Business, Google Ads cuenta |

---

## Stack tecnológico adicional necesario

- `transbank-sdk` — integración con WebPay
- `resend` o `nodemailer` — emails transaccionales
- `@upstash/ratelimit` + `@upstash/redis` — rate limiting real en serverless
- Posiblemente `zustand` o `jotai` — estado del carrito en cliente

---

*Documento creado en sesión de brainstorming 2026-04-24.*  
*Para iniciar cualquier fase, retomar este documento y ejecutar el proceso de diseño detallado.*
