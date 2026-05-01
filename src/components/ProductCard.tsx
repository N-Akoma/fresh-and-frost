import * as React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Plus } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Product } from '../types';
import { useCart } from '../services/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`, {
      description: "You can view your items in the basket.",
      action: {
        label: "View Cart",
        onClick: () => console.log("Open cart"),
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
    >
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden bg-slate-50 relative">
            <img
              src={product.image || `https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop`}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {product.stock <= 5 && product.stock > 0 && (
              <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600 border-none">
                Low Stock
              </Badge>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
                <Badge variant="destructive" className="px-4 py-1 text-sm">Out of Stock</Badge>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button variant="secondary" size="sm" className="rounded-full shadow-lg">
                <Eye size={16} className="mr-2" />
                Quick View
              </Button>
            </div>
          </div>

          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-blue-600 font-bold mb-1">{product.category}</p>
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div>
                <span className="text-xl font-bold font-mono text-slate-900">₦{product.price.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block -mt-1 uppercase tracking-tighter">Per {product.unit}</span>
              </div>
            </div>
          </div>
        </Link>
        
        <Button 
          size="icon" 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`absolute bottom-5 right-5 rounded-full shadow-md z-1 ${product.stock === 0 ? 'bg-slate-200' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          <Plus size={20} />
        </Button>
      </div>
    </motion.div>
  );
}

export default ProductCard;
