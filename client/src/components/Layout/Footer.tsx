import React from 'react';
import { Link } from 'react-router-dom';
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Heart,
    ArrowUp
} from 'lucide-react';

const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Our Services', href: '/services' },
            { name: 'Contact Us', href: '/contact' },
            { name: 'FAQ', href: '/faq' },
        ],
        services: [
            { name: 'Normal Umrah Package', href: '/packages/normal' },
            { name: 'VIP Umrah Package', href: '/packages/vip' },
            { name: 'VVIP Umrah Package', href: '/packages/vvip' },
            { name: 'Custom Packages', href: '/packages/custom' },
        ],
        support: [
            { name: 'Help Center', href: '/help' },
            { name: 'Travel Guide', href: '/guide' },
            { name: 'Visa Information', href: '/visa' },
            { name: '24/7 Support', href: '/support' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Refund Policy', href: '/refund' },
            { name: 'Disclaimer', href: '/disclaimer' },
        ],
    };

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/ethiotour' },
        { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/ethiotour' },
        { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/ethiotour' },
        { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/ethiotour' },
    ];

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="container-custom section-padding">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 mb-6">
                            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">E</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">EthioTour Travel Agency</h3>
                                <p className="text-sm text-gray-400">Complete Umrah Packages</p>
                            </div>
                        </Link>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Your trusted partner for blessed journeys to the holy cities.
                            We provide authentic, affordable, and spiritually enriching Umrah experiences
                            with hotels near the Haramain, guided Ziyarat, and 24/7 support.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Mail size={16} className="text-primary-400" />
                                <a
                                    href="mailto:umrah@ethiotour.com"
                                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                                >
                                    umrah@ethiotour.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone size={16} className="text-primary-400" />
                                <a
                                    href="tel:+251986111333"
                                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                                >
                                    +251 986 111 333
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin size={16} className="text-primary-400" />
                                <span className="text-gray-300">Addis Ababa, Ethiopia</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="max-w-md mx-auto text-center">
                        <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
                        <p className="text-gray-400 mb-4">
                            Subscribe to our newsletter for the latest Umrah information and offers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-400"
                            />
                            <button className="btn-primary whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <span className="text-gray-400">Follow us:</span>
                            <div className="flex items-center space-x-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                                        aria-label={social.name}
                                    >
                                        <social.icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Back to Top Button */}
                        <button
                            onClick={scrollToTop}
                            className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors duration-200"
                        >
                            <ArrowUp size={16} />
                            <span>Back to Top</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gray-950 py-4">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                        <div className="flex items-center space-x-1 mb-2 md:mb-0">
                            <span>© {currentYear} EthioTour Travel Agency. All rights reserved.</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/privacy"
                                className="hover:text-primary-400 transition-colors duration-200"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="hover:text-primary-400 transition-colors duration-200"
                            >
                                Terms of Service
                            </Link>
                            <div className="flex items-center space-x-1">
                                <span>Made with</span>
                                <Heart size={14} className="text-red-500" />
                                <span>by</span>
                                EthioTour
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
