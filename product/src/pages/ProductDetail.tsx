import { useParams, useNavigate } from "react-router-dom"
import { useState, lazy, Suspense } from "react"
import { mockProducts } from "../data/mockProducts"
import "./ProductDetail.css"

const ViewCartButton = lazy(() => import("cart_app/ViewCartButton"))

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const product = mockProducts.find((p) => p.id === productId)

  if (!product)
    return (
      <div className='detail-page'>
        <h2>ไม่พบสินค้า</h2>
        <button onClick={() => navigate("/")}>← กลับ</button>
      </div>
    )

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const handleAdd = async () => {
    const { cartStore } = await import("cart_app/cartStore")
    cartStore.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className='detail-page'>
      <button className='back-btn' onClick={() => navigate("/")}>
        ← กลับ
      </button>
      <div className='detail-grid'>
        <div className='detail-img-wrap'>
          <img src={product.image} alt={product.name} />
          {product.badge && (
            <span
              className={`badge badge-${product.badge.toLowerCase().replace(" ", "-")}`}
            >
              {product.badge}
            </span>
          )}
        </div>
        <div className='detail-info'>
          <p className='detail-cat'>{product.category}</p>
          <h1 className='detail-name'>{product.name}</h1>
          <p className='detail-desc'>{product.description}</p>
          <div className='detail-stars'>
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={s <= Math.round(product.rating) ? "star on" : "star"}
              >
                ★
              </span>
            ))}
            <span className='rating-info'>
              {product.rating} ({product.reviewCount.toLocaleString()} รีวิว)
            </span>
          </div>
          <div className='detail-price-box'>
            <span className='big-price'>฿{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className='orig'>
                ฿{product.originalPrice.toLocaleString()}
              </span>
            )}
            {discount && <span className='save'>ประหยัด {discount}%</span>}
          </div>
          <div className='detail-actions'>
            <button
              id={`detail-add-${product.id}`}
              className={`btn-detail-add ${added ? "added" : ""}`}
              onClick={handleAdd}
            >
              {added ? "✓ เพิ่มลงตะกร้าแล้ว!" : "+ เพิ่มลงตะกร้า"}
            </button>
            <Suspense
              fallback={<div className='btn-view-cart'>ดูตะกร้า...</div>}
            >
              <ViewCartButton />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
