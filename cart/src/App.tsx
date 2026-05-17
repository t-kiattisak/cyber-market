import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

const App = () => (
  <Routes>
    <Route path="/" element={<CartPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
  </Routes>
);

export default App;
