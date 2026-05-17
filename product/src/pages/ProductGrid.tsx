import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';
import './ProductGrid.css';

const CATEGORIES = ['ทั้งหมด', 'Audio', 'Wearables', 'AR/VR', 'Peripherals', 'Displays'];

const ProductGrid = () => {
  const [category, setCategory] = useState('ทั้งหมด');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = mockProducts.filter((p) => {
    const matchCat = category === 'ทั้งหมด' || p.category === category;
    const q = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="grid-page">
      <div className="grid-header">
        <div>
          <h1><span className="gradient-text">สินค้าทั้งหมด</span></h1>
          <p className="subtitle">เทคโนโลยีล้ำสมัยจากอนาคต — {filtered.length} รายการ</p>
        </div>
        <div className="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input id="product-search" type="text" placeholder="ค้นหาสินค้า..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="category-tabs">
        {CATEGORIES.map((c) => (
          <button key={c} id={`cat-${c}`} className={`cat-tab ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>
      {filtered.length === 0
        ? <p className="no-results">ไม่พบสินค้าที่ตรงกับการค้นหา</p>
        : <div className="product-grid">{filtered.map((p) => <ProductCard key={p.id} product={p} onClick={() => navigate(`/${p.id}`)} />)}</div>
      }
    </div>
  );
};

export default ProductGrid;
