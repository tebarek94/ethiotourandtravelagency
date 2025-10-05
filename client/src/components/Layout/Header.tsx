import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Calendar, Package, BookOpen, Phone, Settings, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: t('navigation.home'), path: '/', icon: null },
    { name: t('navigation.about'), path: '/about', icon: null },
    { name: t('navigation.packages'), path: '/packages', icon: Package },
    { name: t('navigation.destinations'), path: '/destinations', icon: null },
    { name: t('navigation.blog'), path: '/blog', icon: BookOpen },
    { name: t('navigation.faq'), path: '/faq', icon: HelpCircle },
    { name: t('navigation.contact'), path: '/contact', icon: Phone },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-neutral-200/50'
          : 'bg-white/80 backdrop-blur-lg shadow-lg'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300">
                EthioTour
              </h1>
              <p className="text-xs text-neutral-600 font-medium">Travel</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-primary-50 shadow-sm'
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50/50'
                }`}
              >
                {item.icon && <item.icon size={18} />}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-2 lg:space-x-4 rtl:space-x-reverse">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-primary-600" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={16} />
                      <span>{t('navigation.profile')}</span>
                    </Link>
                    <Link
                      to="/bookings"
                      className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Calendar size={16} />
                      <span>{t('navigation.bookings')}</span>
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings size={16} />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left rtl:text-right"
                    >
                      <LogOut size={16} />
                      <span>{t('navigation.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Book Umrah Button */}
            <Link
              to="/packages"
              className="btn-primary text-sm hidden sm:inline-flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Calendar size={18} />
              <span>{t('package.bookNow')}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <item.icon size={18} />}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Backdrop for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
