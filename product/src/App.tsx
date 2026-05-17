import { Routes, Route } from 'react-router-dom';
import ProductGrid from './pages/ProductGrid';
import ProductDetail from './pages/ProductDetail';

const App = () => (
  <Routes>
    <Route path="/" element={<ProductGrid />} />
    <Route path="/:productId" element={<ProductDetail />} />
  </Routes>
);

export default App;
