import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from '../components/ui/tabs';
import ProductCard from '../components/ProductCard';
import { Product, CategoryType } from '../types';

// Mock data
const ALL_PRODUCTS: Product[] = [
  { id: '1', name: 'Titus Fish (3/5)', price: 42000, category: 'Fish', description: 'Norway imported Titus fish.', stock: 25, unit: 'Carton', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800', isFeatured: true, createdAt: '', updatedAt: '' },
  { id: '2', name: 'Original Orobo Chicken', price: 35000, category: 'Poultry', description: 'Local massive hybrid chicken.', stock: 12, unit: 'Carton', image: 'https://images.unsplash.com/photo-1606728035253-49e1a2321499?auto=format&fit=crop&q=80&w=800', isFeatured: true, createdAt: '', updatedAt: '' },
  { id: '3', name: 'Turkey Finger', price: 48000, category: 'Poultry', description: 'Crispy finger sized turkey parts.', stock: 3, unit: 'Carton', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800', isFeatured: false, createdAt: '', updatedAt: '' },
  { id: '4', name: 'Golden Saithe Fish', price: 28000, category: 'Fish', description: 'Fresh Saithe fish for wholesale.', stock: 40, unit: 'Carton', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800', isFeatured: false, createdAt: '', updatedAt: '' },
  { id: '5', name: 'Basmati Rice 50kg', price: 82000, category: 'Other', description: 'Premium long grain rice.', stock: 50, unit: 'Bag', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800', isFeatured: true, createdAt: '', updatedAt: '' },
  { id: '6', name: 'Hake Fish', price: 32000, category: 'Fish', description: 'Cleaned and frozen Hake fish.', stock: 15, unit: 'Carton', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800', isFeatured: false, createdAt: '', updatedAt: '' },
  { id: '7', name: 'Chicken Wings (Imported)', price: 39000, category: 'Poultry', description: 'International grade chicken wings.', stock: 20, unit: 'Carton', image: 'https://images.unsplash.com/photo-1606728035253-49e1a2321499?auto=format&fit=crop&q=80&w=800', isFeatured: true, createdAt: '', updatedAt: '' },
  { id: '8', name: 'Gizzard (Turkey)', price: 44000, category: 'Poultry', description: 'Cleaned turkey gizzards.', stock: 8, unit: 'Carton', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=800', isFeatured: false, createdAt: '', updatedAt: '' },
];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('cat') || 'All';
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = ALL_PRODUCTS.filter(p => {
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Product Catalog</h1>
          <p className="text-slate-500 mt-1">Showing {filteredProducts.length} high-quality items</p>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Search products..." 
              className="pl-10 h-11 bg-white border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
            <SlidersHorizontal size={18} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Categories</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {['All', 'Fish', 'Poultry', 'Meat', 'Grains', 'Other'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSearchParams(cat === 'All' ? {} : { cat })}
                    className={`px-4 py-2 rounded-lg text-sm text-left transition-all ${
                      categoryFilter === cat 
                        ? 'bg-blue-600 text-white font-bold' 
                        : 'bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-blue-600 rounded-2xl text-white">
              <h4 className="font-bold mb-2">Bulk Orders?</h4>
              <p className="text-sm text-blue-100 mb-4">Partner with us for wholesale pricing on bulk purchases.</p>
              <Button variant="secondary" className="w-full font-bold">Contact Sales</Button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-500">Sorted by:</span>
              <select className="bg-transparent text-sm font-bold text-slate-900 border-none focus:ring-0">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
            
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-slate-100 text-blue-600' : 'text-slate-400'}`}
              >
                <Grid3X3 size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-slate-100 text-blue-600' : 'text-slate-400'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-24 text-center">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No products found</h3>
                <p className="text-slate-500">Try adjusting your filters or search query.</p>
                <Button variant="link" onClick={() => {setSearchQuery(''); setSearchParams({});}} className="text-blue-600 mt-2">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
