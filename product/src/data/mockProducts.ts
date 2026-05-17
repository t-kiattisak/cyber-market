export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  badge?: string;
}

export const mockProducts: Product[] = [
  { id: '1', name: 'NeuralLink Pro X1', description: 'หูฟังไร้สายสายพันธุ์ใหม่ ด้วย AI Noise Cancellation และ Spatial Audio ระดับ Studio', price: 12900, originalPrice: 15900, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', rating: 4.8, reviewCount: 2341, category: 'Audio', badge: 'Best Seller' },
  { id: '2', name: 'HoloWatch Ultra', description: 'สมาร์ทวอทช์ฝาแฝดโลกดิจิทัล รองรับ Holographic Display และ Health Biometrics', price: 18500, originalPrice: 22000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', rating: 4.7, reviewCount: 1872, category: 'Wearables', badge: 'New' },
  { id: '3', name: 'CyberLens AR Glass', description: 'แว่น AR ล้ำสมัย Overlay ข้อมูล Real-time บน Display โปร่งแสง น้ำหนักเพียง 42g', price: 34900, image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop', rating: 4.6, reviewCount: 956, category: 'AR/VR' },
  { id: '4', name: 'Quantum Keyboard QK-7', description: 'คีย์บอร์ด Mechanical 0.1ms latency และ RGB Quantum Sync', price: 8900, originalPrice: 9900, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', rating: 4.9, reviewCount: 4210, category: 'Peripherals', badge: 'Top Rated' },
  { id: '5', name: 'PlasmaCore Monitor 4K', description: 'จอมอนิเตอร์ OLED 27" 240Hz HDR10+ สำหรับ Pro Gaming และ Creative Work', price: 42000, originalPrice: 48000, image: 'https://images.unsplash.com/photo-1527443224154-c4a573d5f5b4?w=400&h=400&fit=crop', rating: 4.8, reviewCount: 1543, category: 'Displays' },
  { id: '6', name: 'VortexPad X Wireless', description: 'Mouse Pad ไร้สาย Qi Charging ในตัว RGB หนา 5mm', price: 2900, originalPrice: 3500, image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400&h=400&fit=crop', rating: 4.5, reviewCount: 3876, category: 'Peripherals', badge: 'Sale' },
];
