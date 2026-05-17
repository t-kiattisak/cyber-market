import { useState } from "react"
import { Product } from "../data/mockProducts"
import "./ProductCard.css"

// cartStore is imported dynamically from the cart_app remote
// TypeScript type declaration is in src/@mf-types
interface CartStoreModule {
  cartStore: {
    addItem: (item: {
      id: string
      name: string
      price: number
      image: string
    }) => void
  }
}

let cartStoreModule: CartStoreModule | null = null

// Lazy load cartStore from remote — avoids blocking render
const getCartStore = async () => {
  if (!cartStoreModule) {
    cartStoreModule = await import("cart_app/cartStore")
  }
  return cartStoreModule.cartStore
}

interface Props {
  product: Product
  onClick: () => void
}

const ProductCard = ({ product, onClick }: Props) => {
  const [status, setStatus] = useState<"idle" | "adding" | "added">("idle")

  const handleAdd = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setStatus("adding")
    const store = await getCartStore()
    store.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setStatus("added")
    setTimeout(() => setStatus("idle"), 1500)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div
      className='product-card'
      id={`product-${product.id}`}
      onClick={onClick}
    >
      {product.badge && (
        <span
          className={`badge badge-${product.badge.toLowerCase().replace(" ", "-")}`}
        >
          {product.badge}
        </span>
      )}
      <div className='card-img-wrap'>
        <img src={product.image} alt={product.name} loading='lazy' />
        <div className='card-img-overlay' />
      </div>
      <div className='card-body'>
        <p className='card-cat'>{product.category}</p>
        <h3 className='card-name'>{product.name}</h3>
        <p className='card-desc'>{product.description}</p>
        <div className='card-stars'>
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className={s <= Math.round(product.rating) ? "star on" : "star"}
            >
              ★
            </span>
          ))}
          <span className='rating-val'>{product.rating}</span>
        </div>
        <p className='card-reviews'>
          ({product.reviewCount.toLocaleString()} รีวิว)
        </p>
        <div className='card-footer'>
          <div className='prices'>
            <span className='price'>฿{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className='orig-price'>
                ฿{product.originalPrice.toLocaleString()}
              </span>
            )}
            {discount && <span className='discount'>-{discount}%</span>}
          </div>
          <button
            id={`add-to-cart-${product.id}`}
            className={`btn-add status-${status}`}
            onClick={handleAdd}
          >
            {status === "added"
              ? "✓ เพิ่มแล้ว"
              : status === "adding"
                ? "..."
                : "+ ตะกร้า"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
