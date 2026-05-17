import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  Link,
} from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { cartStore, CartItem } from 'cart_app/cartStore';
import './App.css';

// 1. Root Layout Route
const rootRoute = createRootRoute({
  component: () => (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-avatar">👤</div>
        <h3 className="profile-username">K. Kiattisak</h3>
        <p className="profile-role">สมาชิกระดับ Gold</p>
        
        <nav className="profile-nav">
          <Link to="/" className="profile-nav-link" activeProps={{ className: 'active' }} activeOptions={{ exact: true }}>
            📋 หน้าภาพรวม
          </Link>
          <Link to="/settings" className="profile-nav-link" activeProps={{ className: 'active' }}>
            ⚙️ ตั้งค่าบัญชี
          </Link>
        </nav>
      </div>
      
      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  ),
});

// 2. Index Route (Dashboard View)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    const [items, setItems] = useState<CartItem[]>(cartStore.getItems());
    
    useEffect(() => {
      // Subscribe to cartStore to reflect real-time updates!
      const unsubscribe = cartStore.subscribe(() => {
        setItems([...cartStore.getItems()]);
      });
      return unsubscribe;
    }, []);

    return (
      <div className="profile-dashboard">
        <h2 className="dashboard-title">ภาพรวมข้อมูลผู้ใช้งาน</h2>
        <div className="dashboard-grid">
          <div className="dashboard-card status-card">
            <h4>สิทธิพิเศษของคุณ</h4>
            <p>จัดส่งฟรีทุกรายการสั่งซื้อ + คูปองส่วนลด 10% ทุกเดือน</p>
            <div className="gold-badge">🎖️ สมาชิกพิเศษ</div>
          </div>
          
          <div className="dashboard-card cart-status-card">
            <h4>🛒 ตะกร้าสินค้าของคุณ (แชร์ State จาก Cart MFE)</h4>
            {items.length === 0 ? (
              <p className="empty-msg">ไม่มีสินค้าในตะกร้าขณะนี้</p>
            ) : (
              <div className="profile-cart-list">
                <p className="cart-summary">มีสินค้าทั้งหมด {items.reduce((s, i) => s + i.quantity, 0)} ชิ้นในตะกร้า:</p>
                <ul>
                  {items.map((item) => (
                    <li key={item.id} className="profile-cart-item">
                      <img src={item.image} alt={item.name} className="item-thumbnail" />
                      <div className="item-details">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty-price">x{item.quantity} (฿{(item.price * item.quantity).toLocaleString()})</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
});

// 3. Settings Route
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: () => (
    <div className="profile-settings">
      <h2 className="dashboard-title">ตั้งค่าบัญชีผู้ใช้</h2>
      <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>ชื่อ-นามสกุล</label>
          <input type="text" defaultValue="Kiattisak O." />
        </div>
        <div className="form-group">
          <label>อีเมล</label>
          <input type="email" defaultValue="kiattisak@gmail.com" />
        </div>
        <div className="form-group">
          <label>เบอร์โทรศัพท์</label>
          <input type="text" defaultValue="089-xxx-xxxx" />
        </div>
        <button type="button" className="btn-save">บันทึกข้อมูล</button>
      </form>
    </div>
  ),
});

// 4. Create Route Tree
const routeTree = rootRoute.addChildren([indexRoute, settingsRoute]);

// 5. Root App wrapper
export const App = ({ basename }: { basename?: string }) => {
  const [router] = useState(() =>
    createRouter({
      routeTree,
      basepath: basename,
    })
  );

  return <RouterProvider router={router} />;
};

export default App;
