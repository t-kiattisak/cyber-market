import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartStore, CartItem } from '../store/cartStore';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>(cartStore.getItems());
  const [total, setTotal] = useState(cartStore.getTotalPrice());

  useEffect(() => cartStore.subscribe(() => {
    setItems([...cartStore.getItems()]);
    setTotal(cartStore.getTotalPrice());
  }), []);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="empty-icon">🛒</div>
          <h2>ตะกร้าสินค้าว่างเปล่า</h2>
          <p>ยังไม่มีสินค้าในตะกร้า เริ่มช้อปปิ้งกันเลย!</p>
          <button className="btn-shop" onClick={() => navigate('/')}>ดูสินค้าทั้งหมด</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1><span className="gradient-text">ตะกร้าสินค้า</span></h1>
        <p className="cart-count-text">{items.length} รายการ</p>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>฿{item.price.toLocaleString()}</p>
              </div>
              <div className="qty-control">
                <button id={`qty-dec-${item.id}`} onClick={() => cartStore.updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button id={`qty-inc-${item.id}`} onClick={() => cartStore.updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <span className="item-subtotal">฿{(item.price * item.quantity).toLocaleString()}</span>
              <button id={`remove-${item.id}`} className="btn-remove" onClick={() => cartStore.removeItem(item.id)}>✕</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>สรุปคำสั่งซื้อ</h3>
          <div className="summary-row"><span>ราคาสินค้า</span><span>฿{total.toLocaleString()}</span></div>
          <div className="summary-row"><span>ค่าจัดส่ง</span><span className="free">ฟรี</span></div>
          <hr />
          <div className="summary-row total"><span>ยอดรวม</span><span>฿{total.toLocaleString()}</span></div>
          <Link to="/checkout" className="btn-checkout" id="btn-checkout">ดำเนินการชำระเงิน</Link>
          <button className="btn-clear" id="btn-clear-cart" onClick={() => cartStore.clearCart()}>ล้างตะกร้า</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
