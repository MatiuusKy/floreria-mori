// Whitelist helpers — strip unknown fields before writing to the DB.

type UnknownBody = Record<string, unknown>

export function safeProductFields(src: UnknownBody) {
  return {
    slug:              typeof src.slug        === 'string'  ? src.slug        : undefined,
    name:              typeof src.name        === 'string'  ? src.name        : undefined,
    description:       typeof src.description === 'string'  ? src.description : null,
    price:             Number(src.price),
    discount_price:    src.discount_price != null            ? Number(src.discount_price) : null,
    category_id:       typeof src.category_id === 'string'  ? src.category_id : null,
    image_url:         typeof src.image_url  === 'string'   ? src.image_url   : null,
    available:         typeof src.available  === 'boolean'  ? src.available   : true,
    featured:          typeof src.featured   === 'boolean'  ? src.featured    : false,
    best_seller:       typeof src.best_seller === 'boolean' ? src.best_seller  : false,
    stock:             src.stock != null                     ? Number(src.stock) : 0,
    variants:          Array.isArray(src.variants) && src.variants.length > 0 ? src.variants : null,
    same_day_delivery: typeof src.same_day_delivery === 'boolean' ? src.same_day_delivery : false,
    limited_stock:     typeof src.limited_stock     === 'boolean' ? src.limited_stock     : false,
    campaign_tag:      typeof src.campaign_tag      === 'string'  ? src.campaign_tag      : null,
    colors:            Array.isArray(src.colors) ? src.colors.filter((c: unknown) => typeof c === 'string') : [],
  }
}

export function safeDeliveryZoneFields(body: UnknownBody) {
  return {
    name:            body.name.toString().trim(),
    reference_price: body.reference_price != null ? Number(body.reference_price) : null,
    active:          typeof body.active === 'boolean' ? body.active : true,
  }
}
