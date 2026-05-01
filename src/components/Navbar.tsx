import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Ghost, User, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { useCart } from '../services/CartContext';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from './ui/Sheet';
import { ScrollArea } from './ui/ScrollArea';
import { Separator } from './ui/Separator';

export default function Navbar() {
  const { items, total, removeItem, updateQuantity, itemCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-tight text-slate-900">Fresh & Frost</span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-semibold -mt-1">Enterprise</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/catalog" className="hover:text-blue-600 transition-colors">Shop</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-blue-600"
              render={<Link to="/login" />}
              nativeButton={false}
            >
              <User size={20} />
            </Button>

            <Sheet>
              <SheetTrigger 
                nativeButton={true}
                render={
                  <Button variant="ghost" size="icon" className="relative hover:text-blue-600" />
                }
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                  <SheetTitle className="flex justify-between items-center">
                    <span>Your Cart</span>
                    <span className="text-sm font-normal text-slate-500">{itemCount} items</span>
                  </SheetTitle>
                </SheetHeader>
                
                <Separator className="my-4" />
                
                <ScrollArea className="flex-grow pr-4">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-slate-400">
                      <ShoppingCart size={48} className="mb-4 opacity-20" />
                      <p>Your cart is empty</p>
                      <Link to="/catalog">
                        <Button variant="link" className="text-blue-600">Go shopping</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.productId} className="flex space-x-4">
                          <div className="w-20 h-20 bg-slate-100 rounded-md flex-shrink-0 animate-pulse" />
                          <div className="flex-grow">
                            <h4 className="font-medium text-sm text-slate-900">{item.name}</h4>
                            <p className="text-sm text-slate-500">₦{item.price.toLocaleString()}</p>
                            <div className="flex items-center space-x-3 mt-2">
                              <button 
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                              >-</button>
                              <span className="text-xs font-mono">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                              >+</button>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeItem(item.productId)}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Ghost size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                {items.length > 0 && (
                  <SheetFooter className="mt-6 flex-col sm:flex-col space-y-4">
                    <Separator />
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-medium text-slate-600">Subtotal</span>
                      <span className="font-bold text-xl">₦{total.toLocaleString()}</span>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
                      Checkout
                    </Button>
                    <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
                      Free delivery within Lagos for orders over ₦50,000
                    </p>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>

            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
