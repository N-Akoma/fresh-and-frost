import * as React from 'react';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully!", {
        description: "A representative will contact you shortly."
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
            Connect with <br /> <span className="text-blue-600">Our Sales Experts</span>
          </h1>
          <p className="text-slate-600 text-lg mb-12 max-w-md">
            Whether you're a restaurant owner, a retailer, or a family shopper, we're here to provide the best frozen goods at the best prices.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Direct Call / WhatsApp</h3>
                <p className="text-slate-500">08109789723</p>
                <p className="text-xs text-blue-600 mt-1 font-semibold uppercase tracking-widest">Available 24/7</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Official Email</h3>
                <p className="text-slate-500">sales@freshandfrost.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Lagos Head Office</h3>
                <p className="text-slate-500">123 Market Road, Orile Iganmu, Lagos</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="text-xl font-bold mb-2">Wholesale Partnership</h4>
                <p className="text-slate-400 text-sm mb-6">Join our network of over 500 retailers across Lagos. Get exclusive access to bulk discounts and premium delivery slots.</p>
                <Button className="bg-blue-600 hover:bg-blue-700 border-none px-8 font-bold">Apply for Account</Button>
             </div>
             <MessageSquare className="absolute bottom-[-20px] right-[-20px] text-white/5 w-48 h-48 rotate-[-15deg]" />
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-8 lg:p-12 border border-slate-100 shadow-2xl shadow-blue-500/5">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required className="bg-slate-50 border-none h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="080 1234 5678" required className="bg-slate-50 border-none h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" required className="bg-slate-50 border-none h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Wholesale Inquiry" className="bg-slate-50 border-none h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">How can we help?</Label>
              <textarea 
                id="message" 
                rows={4} 
                className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Tell us about your requirements..."
                required
              ></textarea>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-lg font-bold rounded-2xl shadow-xl shadow-blue-600/20"
            >
              {loading ? "Sending..." : "Submit Message"} <Send size={18} className="ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
