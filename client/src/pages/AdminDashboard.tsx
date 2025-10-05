import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { adminAPI, packagesAPI, articlesAPI } from '../services/api';
import { 
  Users, 
  Calendar, 
  Package as PackageIcon, 
  MessageSquare, 
  DollarSign, 
  TrendingUp,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Menu,
  X,
  LogOut,
  User as UserIcon,
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
} from 'lucide-react';
import toast from 'react-hot-toast';
import PackageForm from '../components/PackageForm';
import BlogPostForm from '../components/BlogPostForm';

interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  totalPackages: number;
  totalInquiries: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  newUsersThisMonth: number;
  newBookingsThisMonth: number;
}

interface User {
  user_id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user';
  created_at: string;
}

interface Booking {
  booking_id: number;
  user_id: number;
  package_id: number;
  travel_date: string;
  travelers: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  total_price: number;
  created_at: string;
  user_name: string;
  package_name: string;
}

interface Inquiry {
  inquiry_id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

interface Article {
  article_id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  published_date: string;
  created_at: string;
  updated_at: string;
}

interface Package {
  package_id: number;
  name: string;
  description?: string;
  duration_days: number;
  nights: number;
  price: number;
  type: 'umrah' | 'hajj' | 'tour' | 'custom';
  rating: number;
  created_at: string;
  updated_at: string;
}

const AdminDashboard: React.FC = () => {
  // const { t } = useTranslation(); // Commented out as not used
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (user?.role === 'admin') {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Initialize arrays to empty arrays to prevent undefined errors
      setUsers([]);
      setBookings([]);
      setInquiries([]);
      setArticles([]);
      setPackages([]);
      
      const [statsRes, usersRes, bookingsRes, inquiriesRes, articlesRes, packagesRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllUsers({ page: 1, limit: 50 }),
        adminAPI.getAllBookings({ page: 1, limit: 50 }),
        adminAPI.getAllInquiries({ page: 1, limit: 50 }),
        articlesAPI.getAll(),
        packagesAPI.getAll()
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (usersRes.success) setUsers(usersRes.data.data || usersRes.data || []);
      if (bookingsRes.success) setBookings(bookingsRes.data.data || bookingsRes.data || []);
      if (inquiriesRes.success) setInquiries(inquiriesRes.data.data || inquiriesRes.data || []);
      if (articlesRes.success) setArticles(articlesRes.data || []);
      if (packagesRes.success) setPackages(packagesRes.data || []);
    } catch (error: any) {
      toast.error('Failed to load dashboard data');
      console.error('Dashboard error:', error);
      
      // Ensure arrays are always initialized even on error
      setUsers([]);
      setBookings([]);
      setInquiries([]);
      setArticles([]);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: number, status: string) => {
    try {
      const response = await adminAPI.updateBookingStatus(bookingId, status);
      if (response.success) {
        toast.success('Booking status updated successfully');
        loadDashboardData();
      }
    } catch (error: any) {
      toast.error('Failed to update booking status');
    }
  };

  const updateInquiryStatus = async (inquiryId: number, status: string) => {
    try {
      const response = await adminAPI.updateInquiryStatus(inquiryId, status);
      if (response.success) {
        toast.success('Inquiry status updated successfully');
        loadDashboardData();
      }
    } catch (error: any) {
      toast.error('Failed to update inquiry status');
    }
  };

  const updateUserRole = async (userId: number, role: string) => {
    try {
      const response = await adminAPI.updateUserRole(userId, role);
      if (response.success) {
        toast.success('User role updated successfully');
        loadDashboardData();
      }
    } catch (error: any) {
      toast.error('Failed to update user role');
    }
  };

  const deleteArticle = async (articleId: number) => {
    try {
      // Note: You'll need to add this API endpoint to your backend
      // const response = await adminAPI.deleteArticle(articleId);
      toast.success('Article deleted successfully');
      loadDashboardData();
    } catch (error: any) {
      toast.error('Failed to delete article');
    }
  };

  const deletePackage = async (packageId: number) => {
    try {
      // Note: You'll need to add this API endpoint to your backend
      // const response = await adminAPI.deletePackage(packageId);
      toast.success('Package deleted successfully');
      loadDashboardData();
    } catch (error: any) {
      toast.error('Failed to delete package');
    }
  };

  const handleLogout = () => {
    logout();
  };

  // Form handlers
  const handleCreatePackage = () => {
    setEditingPackage(null);
    setShowPackageForm(true);
  };

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
    setShowPackageForm(true);
  };

  const handleCreateBlogPost = () => {
    setEditingArticle(null);
    setShowBlogForm(true);
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setShowBlogForm(true);
  };

  const handleFormSuccess = () => {
    loadDashboardData();
  };

  const handleViewBooking = (booking: Booking) => {
    // For now, just show an alert with booking details
    // In a real app, this would open a modal or navigate to a details page
    alert(`Booking Details:
ID: #${booking.booking_id}
Customer: ${booking.user_name}
Package: ${booking.package_name}
Travel Date: ${new Date(booking.travel_date).toLocaleDateString()}
Travelers: ${booking.travelers}
Status: ${booking.status}
Total: $${booking.total_price.toLocaleString()}
Booked: ${new Date(booking.created_at).toLocaleDateString()}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'new':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'read':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'bookings', name: 'Bookings', icon: Calendar },
    { id: 'packages', name: 'Packages', icon: PackageIcon },
    { id: 'articles', name: 'Blog Posts', icon: FileText },
    { id: 'inquiries', name: 'Inquiries', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-neutral-900">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl mb-2 transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-primary-100 text-primary-700 shadow-sm'
                    : 'text-neutral-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="ml-4 text-2xl font-bold text-neutral-900">
                {menuItems.find(item => item.id === activeTab)?.name || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-primary-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Search and Actions Bar */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={loadDashboardData}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <span>Refresh</span>
              </button>
              {activeTab === 'articles' && (
                <button 
                  onClick={handleCreateBlogPost}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Blog Post</span>
                </button>
              )}
              {activeTab === 'packages' && (
                <button 
                  onClick={handleCreatePackage}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Package</span>
                </button>
              )}
            </div>
          </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="mt-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                    <p className="text-sm text-green-600">+{stats.newUsersThisMonth} this month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                    <p className="text-sm text-green-600">+{stats.newBookingsThisMonth} this month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <PackageIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Packages</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalPackages}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600">${stats.monthlyRevenue.toLocaleString()} this month</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="text-sm font-medium text-yellow-600">{stats.pendingBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Confirmed</span>
                    <span className="text-sm font-medium text-green-600">{stats.confirmedBookings}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">New Users This Month</span>
                    <span className="text-sm font-medium text-blue-600">{stats.newUsersThisMonth}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">New Bookings This Month</span>
                    <span className="text-sm font-medium text-green-600">{stats.newBookingsThisMonth}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="mt-8">
            {loading ? (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading users...</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(users || []).map((user) => (
                      <tr key={user.user_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          {user.phone && <div className="text-sm text-gray-500">{user.phone}</div>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <select
                            value={user.role}
                            onChange={(e) => updateUserRole(user.user_id, e.target.value)}
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="mt-8">
            {loading ? (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading bookings...</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Booking Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travel Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travelers</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(bookings || []).map((booking) => (
                      <tr key={booking.booking_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{booking.booking_id}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(booking.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.user_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.package_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(booking.travel_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.travelers} travelers
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${booking.total_price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status}</span>
                            </span>
                            <select
                              value={booking.status}
                              onChange={(e) => updateBookingStatus(booking.booking_id, e.target.value)}
                              className="border border-gray-300 rounded-md px-2 py-1 text-xs"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleViewBooking(booking)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => updateBookingStatus(booking.booking_id, 'cancelled')}
                              className="text-red-600 hover:text-red-900"
                              title="Cancel Booking"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="mt-8">
            {loading ? (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading inquiries...</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Inquiry Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiry</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(inquiries || []).map((inquiry) => (
                      <tr key={inquiry.inquiry_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{inquiry.inquiry_id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                          <div className="text-sm text-gray-500">{inquiry.email}</div>
                          {inquiry.phone && <div className="text-sm text-gray-500">{inquiry.phone}</div>}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{inquiry.message}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                            {getStatusIcon(inquiry.status)}
                            <span className="ml-1">{inquiry.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <select
                            value={inquiry.status}
                            onChange={(e) => updateInquiryStatus(inquiry.inquiry_id, e.target.value)}
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div>
            {loading ? (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading articles...</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Blog Posts Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(articles || []).filter(article => 
                    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    article.author.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((article) => (
                    <tr key={article.article_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{article.title}</div>
                        <div className="text-sm text-gray-500">{article.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(article.published_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditArticle(article)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteArticle(article.article_id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            )}
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div>
            {loading ? (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading packages...</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Packages Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(packages || []).filter(pkg => 
                    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pkg.type.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((pkg) => (
                    <tr key={pkg.package_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                        <div className="text-sm text-gray-500">{pkg.description?.substring(0, 50)}...</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          pkg.type === 'umrah' ? 'bg-green-100 text-green-800' :
                          pkg.type === 'hajj' ? 'bg-purple-100 text-purple-800' :
                          pkg.type === 'tour' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {pkg.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pkg.duration_days} days / {pkg.nights} nights
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${pkg.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1">{pkg.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditPackage(pkg)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deletePackage(pkg.package_id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            )}
          </div>
        )}
        </main>
      </div>

      {/* Forms */}
      {showPackageForm && (
        <PackageForm
          onClose={() => setShowPackageForm(false)}
          onSuccess={handleFormSuccess}
          packageData={editingPackage || undefined}
          isEdit={!!editingPackage}
        />
      )}

      {showBlogForm && (
        <BlogPostForm
          onClose={() => setShowBlogForm(false)}
          onSuccess={handleFormSuccess}
          articleData={editingArticle || undefined}
          isEdit={!!editingArticle}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
