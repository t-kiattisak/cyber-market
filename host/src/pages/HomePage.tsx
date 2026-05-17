import './HomePage.css';

const HomePage = () => (
  <main className="home">
    <section className="hero">
      <div className="hero-glow" />
      <div className="hero-content">
        <div className="hero-badge">🚀 Module Federation 2.0 + Bridge Pattern POC</div>
        <h1 className="hero-title">อนาคตของ <span className="gradient-text">E-Commerce</span><br />เริ่มต้นที่นี่</h1>
        <p className="hero-sub">สถาปัตยกรรม Micro-Frontend ที่แต่ละทีมพัฒนา Deploy และ Scale ได้อย่างอิสระ ด้วย Module Federation Bridge Pattern</p>
        <div className="hero-cta">
          <a href="/products" className="btn-primary" id="cta-products">เริ่มช้อปปิ้ง →</a>
          <a href="/cart" className="btn-secondary" id="cta-cart">ดูตะกร้าสินค้า</a>
        </div>
      </div>
    </section>

    <section className="arch-section">
      <h2><span className="gradient-text">MFE Architecture</span></h2>
      <p className="arch-sub">แต่ละ Micro-Frontend รันอิสระ แต่ทำงานร่วมกันได้อย่างราบรื่น</p>
      <div className="arch-cards">
        <ArchCard port="3000" name="Host Shell" color="cyan" icon="⬡" desc='Consumer — Orchestrates routing + Navbar. Loads remote MFEs via Bridge. Renders CartBadge from cart_app.' />
        <ArchCard port="3001" name="Product MFE" color="purple" icon="📦" desc='Provider — Exposes Bridge App + imports cartStore from cart_app dynamically for cross-MFE state.' />
        <ArchCard port="3002" name="Cart MFE" color="pink" icon="🛒" desc='Provider — Exposes Bridge App, CartBadge component, and cartStore singleton for shared reactive state.' />
      </div>
      <div className="flow">
        {[
          { icon: '🔗', text: 'Host กำหนด /products/* → Bridge โหลด Product MFE' },
          { icon: '⚡', text: 'Bridge inject basename อัตโนมัติ — Router ทำงานทันที' },
          { icon: '🔄', text: 'Add to Cart → cartStore อัปเดต → CartBadge เปลี่ยน Real-time' },
        ].map((step, i) => (
          <div key={i} className="flow-item">
            {i > 0 && <span className="flow-arrow">→</span>}
            <div className="flow-step"><span className="flow-icon">{step.icon}</span><p>{step.text}</p></div>
          </div>
        ))}
      </div>
    </section>
  </main>
);

interface ArchCardProps { port: string; name: string; color: string; icon: string; desc: string; }
const ArchCard = ({ port, name, color, icon, desc }: ArchCardProps) => (
  <div className={`arch-card arch-${color}`} id={`arch-card-${port}`}>
    <div className="arch-head">
      <span className="arch-icon">{icon}</span>
      <div><p className="arch-port">Port {port}</p><h3 className="arch-name">{name}</h3></div>
    </div>
    <p className="arch-desc">{desc}</p>
  </div>
);

export default HomePage;
