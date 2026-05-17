declare module "cart_app/CartBadge" {
  const CartBadge: React.ComponentType
  export default CartBadge
}

declare module "cart_app/cartStore" {
  export const cartStore: {
    getItems: () => any[]
    getTotalPrice: () => number
    getTotalQuantity: () => number
    addItem: (item: any) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, qty: number) => void
    clearCart: () => void
    subscribe: (listener: () => void) => () => void
  }
}

declare module "product_app/export-app" {
  const exportApp: any
  export default exportApp
}

declare module "cart_app/export-app" {
  const exportApp: any
  export default exportApp
}
