import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/Table';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-6 space-y-8 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] overflow-y-auto">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 px-2">Management</h2>
            <nav className="space-y-1">
              {[
                { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                { id: 'products', icon: Package, label: 'Inventory' },
                { id: 'orders', icon: ShoppingCart, label: 'Recent Orders' },
                { id: 'customers', icon: Users, label: 'Customers' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === item.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 px-2">Admin</h2>
            <nav className="space-y-1">
              <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
                <Settings size={18} />
                <span>Settings</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50">
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-grow p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <header className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Console</h1>
                <p className="text-slate-500">Welcome back, Fresh & Frost manager.</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-600/20">
                <Plus size={18} className="mr-2" /> Add New Product
              </Button>
            </header>

            {activeTab === 'overview' && <AdminOverview />}
            {activeTab === 'products' && <AdminProductList />}
            {activeTab === 'orders' && <AdminOrderList />}
          </div>
        </main>
      </div>
    </div>
  );
}

function AdminOverview() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Monthly Revenue', value: '₦4.2M', trend: '+12.5%', icon: TrendingUp, color: 'text-green-600' },
          { label: 'Active Orders', value: '24', trend: '8 Pending', icon: ShoppingCart, color: 'text-blue-600' },
          { label: 'Low Stock Items', value: '6', trend: 'Immediate Action', icon: AlertCircle, color: 'text-orange-600' },
          { label: 'Total Customers', value: '1,284', trend: '+48 this week', icon: Users, color: 'text-indigo-600' },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 bg-slate-50 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <Badge variant="secondary" className="bg-slate-50 text-slate-500">{stat.trend}</Badge>
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
              [ Sales Chart Visualization Placeholder ]
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Inventory Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
              [ Inventory Mix Visualization Placeholder ]
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminProductList() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Product Inventory</CardTitle>
        <div className="flex items-center space-x-2">
          <Input placeholder="Filter products..." className="w-64 h-9" />
          <Button variant="outline" size="sm">Export CSV</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: 'Titus Fish (3/5)', cat: 'Fish', price: '₦42,000', stock: 12, status: 'In Stock' },
              { name: 'Orobo Chicken', cat: 'Poultry', price: '₦35,000', stock: 4, status: 'Low Stock' },
              { name: 'Basmati Rice', cat: 'Grains', price: '₦85,000', stock: 0, status: 'Out of Stock' },
              { name: 'Croaker Fish', cat: 'Fish', price: '₦28,000', stock: 25, status: 'In Stock' },
            ].map((p) => (
              <TableRow key={p.name}>
                <TableCell className="font-semibold">{p.name}</TableCell>
                <TableCell>{p.cat}</TableCell>
                <TableCell className="font-mono">{p.price}</TableCell>
                <TableCell>{p.stock} cartons</TableCell>
                <TableCell>
                  <Badge className={
                    p.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                    p.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }>
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function AdminOrderList() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Live Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
             {[
                { id: '#1024', name: 'John Doe', total: '₦124,000', status: 'Pending', date: '2 mins ago' },
                { id: '#1023', name: 'Sarah Ahmed', total: '₦48,000', status: 'Confirmed', date: '1 hour ago' },
                { id: '#1022', name: 'Musa Bello', total: '₦210,000', status: 'Delivered', date: '3 hours ago' },
             ].map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono">{o.id}</TableCell>
                  <TableCell className="font-medium">{o.name}</TableCell>
                  <TableCell className="font-mono">{o.total}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      o.status === 'Pending' ? 'border-orange-500 text-orange-500' :
                      o.status === 'Confirmed' ? 'border-blue-500 text-blue-500' :
                      'border-green-500 text-green-500'
                    }>
                      {o.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs">{o.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
             ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
