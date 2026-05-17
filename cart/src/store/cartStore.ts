export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type Listener = () => void

const createCartStore = () => {
  let items: CartItem[] = []
  const listeners = new Set<Listener>()

  const notify = () => listeners.forEach((l) => l())

  return {
    getItems: (): CartItem[] => items,
    getTotalCount: (): number => items.reduce((s, i) => s + i.quantity, 0),
    getTotalPrice: (): number =>
      items.reduce((s, i) => s + i.price * i.quantity, 0),

    addItem(product: Omit<CartItem, "quantity">) {
      const existing = items.find((i) => i.id === product.id)
      items = existing
        ? items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...items, { ...product, quantity: 1 }]
      notify()
    },

    removeItem(id: string) {
      items = items.filter((i) => i.id !== id)
      notify()
    },

    updateQuantity(id: string, quantity: number) {
      if (quantity <= 0) {
        this.removeItem(id)
        return
      }
      items = items.map((i) => (i.id === id ? { ...i, quantity } : i))
      notify()
    },

    clearCart() {
      items = []
      notify()
    },

    subscribe(listener: Listener): () => void {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}

// Singleton — exposed via Module Federation so all apps share the same instance
export const cartStore = createCartStore()
