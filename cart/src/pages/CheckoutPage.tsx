import { Link } from 'react-router-dom';
import { cartStore } from '../store/cartStore';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const items = cartStore.getItems();
  const total = cartStore.getTotalPrice();

  return (
    <div className="checkout-page">
      <Link to="/" className="back-link">← กลับไปตะกร้า</Link>
      <h1><span className="gradient-text">ชำระเงิน</span></h1>
      <div className="checkout-grid">
        <div className="order-summary">
          <h3>รายการสินค้า</h3>
          {items.map((item) => (
            <div key={item.id} className="co-item">
              <img src={item.image} alt={item.name} />
              <div><p className="co-name">{item.name}</p><p className="co-qty">×{item.quantity}</p></div>
              <p className="co-price">฿{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
          <div className="co-total"><span>ยอดรวม</span><span className="co-total-price">฿{total.toLocaleString()}</span></div>
        </div>
        <div className="payment-section">
          <h3>ข้อมูลการจัดส่ง</h3>
          <div className="form-group"><label>ชื่อ-นามสกุล</label><input id="input-name" type="text" placeholder="กรอกชื่อ-นามสกุล" /></div>
          <div className="form-group"><label>ที่อยู่</label><textarea id="input-address" placeholder="กรอกที่อยู่" rows={3} /></div>
          <div className="form-group"><label>เบอร์โทรศัพท์</label><input id="input-phone" type="tel" placeholder="0xx-xxx-xxxx" /></div>
          <h3>วิธีชำระเงิน</h3>
          {['บัตรเครดิต', 'พร้อมเพย์', 'เก็บเงินปลายทาง'].map((m) => (
            <label key={m} className="payment-option">
              <input type="radio" name="payment" defaultChecked={m === 'บัตรเครดิต'} /> {m}
            </label>
          ))}
          <button id="btn-place-order" className="btn-order" onClick={() => { cartStore.clearCart(); alert('✅ สั่งซื้อสำเร็จ!'); }}>
            ยืนยันการสั่งซื้อ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
