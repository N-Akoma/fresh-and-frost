import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RefreshCcw, Star, Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useCart } from '../services/CartContext';
import { Product } from '../types';
import { toast } from 'sonner';

// Mock function for now
const getProductById = (id: string): Product | undefined => {
  return { id, name: 'Titus Fish (Premium)', price: 45000, category: 'Fish', description: 'Premium grade Titus fish imported from cold waters of Norway. Known for its rich omega-3 content and distinct flavor. Perfect for traditional Nigerian soups, stews, or sophisticated grilling. Each carton contains uniformly sized fish that maintain texture even after deep freezing.', stock: 15, unit: 'Carton', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200', isFeatured: true, createdAt: '', updatedAt: '' };
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    if (id) {
      setProduct(getProductById(id));
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`, {
      description: `${quantity} ${product.unit}(s) added successfully.`
    });
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello Fresh & Frost, I'm interested in ordering ${quantity} ${product.unit}(s) of ${product.name}. Total: ₦${(product.price * quantity).toLocaleString()}.`;
    const url = `https://wa.me/2348109789723?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/catalog" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors group">
        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer hover:border-blue-500 transition-colors">
                 <img src={product.image} className="w-full h-full object-cover opacity-50 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-4 py-1">{product.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-orange-400">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="text-sm text-slate-500">(24 Customer Reviews)</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm font-medium text-green-600">In Stock: {product.stock} {product.unit}s</span>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-4xl font-bold text-slate-900">₦{product.price.toLocaleString()}</span>
              <span className="text-slate-500 ml-2">/ {product.unit}</span>
            </div>
          </div>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-center space-x-6">
              <div className="flex items-center border border-slate-200 rounded-full h-14 px-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100"
                ><Minus size={18} /></button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100"
                ><Plus size={18} /></button>
              </div>
              <Button 
                onClick={handleAddToCart}
                className="flex-grow h-14 bg-blue-600 hover:bg-blue-700 text-lg rounded-full font-bold shadow-xl shadow-blue-600/20"
              >
                <ShoppingCart className="mr-2" /> Add to Cart
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleWhatsAppOrder}
              className="w-full h-14 border-green-500 text-green-600 hover:bg-green-50 text-lg rounded-full font-bold"
            >
              Order via WhatsApp
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-600">
                <Truck size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-900">Express Delivery</p>
              <p className="text-[10px] text-slate-500">Lagos State Only</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-600">
                <ShieldCheck size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-900">Quality Check</p>
              <p className="text-[10px] text-slate-500">ISO Certified Handling</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-600">
                <RefreshCcw size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-900">Easy Returns</p>
              <p className="text-[10px] text-slate-500">Within 24 Hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator({ orientation = 'horizontal', className }: { orientation?: 'horizontal' | 'vertical', className?: string }) {
  if (orientation === 'vertical') {
    return <div className={`w-[1px] bg-slate-200 ${className}`} />;
  }
  return <div className={`h-[1px] w-full bg-slate-200 ${className}`} />;
}
