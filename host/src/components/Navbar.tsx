import { Suspense, lazy } from "react"
import { NavLink } from "react-router-dom"
import "./Navbar.css"

// CartBadge loaded as a plain component (not Bridge) from cart_app remote
const CartBadge = lazy(() => import("cart_app/CartBadge"))

const Navbar = () => (
  <header className='navbar'>
    <div className='navbar-inner'>
      <NavLink to='/' className='brand' id='nav-brand'>
        <span className='brand-icon'>⬡</span>
        <span className='brand-name'>
          <span className='gradient-text'>Cyber</span>Market
        </span>
      </NavLink>
      <nav className='nav-links'>
        <NavLink
          to='/'
          end
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          id='nav-home'
        >
          หน้าหลัก
        </NavLink>
        <NavLink
          to='/products'
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          id='nav-products'
        >
          สินค้า
        </NavLink>
        <NavLink
          to='/cart'
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          id='nav-cart'
        >
          ตะกร้า
        </NavLink>
        <NavLink
          to='/profile'
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          id='nav-profile'
        >
          โปรไฟล์ (TanStack)
        </NavLink>
      </nav>
      <div className='navbar-end'>
        <Suspense fallback={<div className='badge-placeholder' />}>
          <CartBadge />
        </Suspense>
      </div>
    </div>
  </header>
)

export default Navbar
