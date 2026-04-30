import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../services/CartContext';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

// Mock data for initial fill
const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Titus Fish (Premium)',
    price: 45000,
    category: 'Fish',
    description: 'High quality Titus fish imported from Norway. Perfect for grilling or soup.',
    stock: 15,
    unit: 'Carton',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Chicken Wings (Orobo)',
    price: 38000,
    category: 'Poultry',
    description: 'Large, juicy chicken wings. Great for bars and restaurants.',
    stock: 8,
    unit: 'Carton',
    image: 'https://images.unsplash.com/photo-1606728035253-49e1a2321499?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Turkey Lap (Full)',
    price: 52000,
    category: 'Poultry',
    description: 'Meaty turkey laps. Excellent for festive period and special occasions.',
    stock: 5,
    unit: 'Carton',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Basmati Rice (Gold)',
    price: 85000,
    category: 'Other',
    description: 'Extra long grain Basmati rice. Fragrant and easy to cook.',
    stock: 20,
    unit: 'Bag (50kg)',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1553649033-3fbc8d0fa3cb?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-2xl text-white">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-6 leading-[0.9]">
                Freshness <br />
                <span className="text-blue-500">You Can Trust,</span> <br />
                Delivered Frozen.
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
                Wholesale and retail distributors of premium frozen fish, poultry and groceries across Lagos. Quality guaranteed from farm to table.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/catalog"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-xl shadow-blue-600/20 flex items-center"
                >
                  Shop Catalog
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-full font-bold transition-all">
                  Wholesale Inquiry
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tight text-slate-900">Shop by Category</h2>
            <p className="text-slate-500 mt-1">Discover our range of premium products</p>
          </div>
          <Link to="/catalog" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center text-sm uppercase tracking-widest">
            View All <ArrowRight className="ml-1" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Fish', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop', count: '12 Items' },
            { name: 'Poultry', image: 'https://images.unsplash.com/photo-1606728035253-49e1a2321499?q=80&w=600&auto=format&fit=crop', count: '8 Items' },
            { name: 'Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop', count: '15 Items' },
            { name: 'Meat', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc822?q=80&w=600&auto=format&fit=crop', count: '6 Items' },
          ].map((cat) => (
            <Link 
              key={cat.name} 
              to={`/catalog?cat=${cat.name}`}
              className="group relative h-64 rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img 
                src={cat.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-90"
                alt={cat.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">{cat.name}</h3>
                <p className="text-xs text-slate-300 font-medium uppercase tracking-widest">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold tracking-tight text-slate-900">Featured Weekly Specials</h2>
            <p className="text-slate-500 mt-2">Our most popular items this week, specially priced for value.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Markers */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center p-8 bg-blue-50 rounded-3xl">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-500/30">
            <motion.div whileHover={{ rotate: 15 }}><ArrowRight className="rotate-[-45deg]" size={32} /></motion.div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Fast Logistics</h3>
          <p className="text-sm text-slate-600">Cold chain delivery within 4-6 hours across Lagos State.</p>
        </div>
        <div className="flex flex-col items-center text-center p-8 bg-slate-100 rounded-3xl">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-6 text-white shadow-lg shadow-slate-900/30">
             <motion.div whileHover={{ scale: 1.1 }}>★</motion.div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Grade A Quality</h3>
          <p className="text-sm text-slate-600">Strict quality control on all fish and poultry products.</p>
        </div>
        <div className="flex flex-col items-center text-center p-8 bg-blue-50 rounded-3xl">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-500/30">
            <Phone size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp Order</h3>
          <p className="text-sm text-slate-600">Convenient ordering via WhatsApp for person-to-person service.</p>
        </div>
      </section>
    </div>
  );
}
