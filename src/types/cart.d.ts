interface ICartItem {
  sku: string
  quantity: number
  selected_options?: string[]
}

interface ICart {
  id: string
  email: string
  items: IListCartItems[]
  available_payment_methods: Availablepaymentmethod[]
  shipping_addresses?: IShippingAddress[]
  applied_coupons: null | { code: string }[]
  prices: IPrices
  selected_payment_method: {
    code: string
    purchase_order_number: string | number
    title: string
  }
}
interface IShippingMethods {
  amount: Amount
  method_title: string
  carrier_code: string
  carrier_title: string
  available: string
  method_code: string
}

interface IPrices {
  discounts: IDiscount[]
  subtotal_excluding_tax: Amount
  subtotal_including_tax: Amount
  subtotal_with_discount_excluding_tax: Amount
  grand_total: Amount
}

interface IDiscount {
  amount: Amount
  label: string
}

interface Availablepaymentmethod {
  code: string
  title: string
  logo: string
}

interface IListCartItems {
  id: string
  uid: string
  quantity: number
  prices: {
    discounts: {
      amount: Amount
    }[]
    price: Amount
    row_total: Amount
  }
  product: ICartProduct
  errors: null
  available_to_checkout: boolean
  configurable_options?: {
    option_label: string
    value_label: string
  }[]
  configured_variant?: {
    image: {
      url: string
    }
  }
}

interface ICartProduct {
  __typename: string
  attributes: {
    attribute_code: string
    label: string
    value: null | string
  }[]
  new_from_date: null
  new_to_date: null
  review_count: number
  rating_summary: number
  name: string
  sku: string
  url_key: string
  stock_status: string
  image: {
    disabled: null
    label: string
    position: null
    url: string
  }
  thumbnail: {
    url: string
  }
  crosssell_products: {
    id: number
    name: string
    sku: string
  }[]
}
interface Amount {
  value: number
  currency: string
}
interface IShippingAddress {
  available_shipping_methods: IShippingMethods[]
  company: null
  country: { code: string; label: string }
  firstname: string
  lastname: string
  postcode: string
  selected_shipping_method: IShippingMethods
  street: string[]
  telephone: string
  ui: string
  vat_id: null
  city: string
  city_id: number
  district: string
  district_id: number
  ward: string
  ward_id: number
  address_note: string
}
