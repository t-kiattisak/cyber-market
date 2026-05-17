declare module 'cart_app/cartStore' {
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }
  export const cartStore: {
    getItems: () => CartItem[];
    getTotalCount: () => number;
    getTotalPrice: () => number;
    subscribe: (listener: () => void) => () => void;
  };
}
