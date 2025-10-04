import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: t('navigation.about'), href: '/about' },
            { name: t('footer.ourServices'), href: '/services' },
            { name: t('navigation.contact'), href: '/contact' },
            { name: t('footer.faq'), href: '/faq' },
        ],
        services: [
            { name: t('footer.normalUmrah'), href: '/packages/normal' },
            { name: t('footer.vipUmrah'), href: '/packages/vip' },
            { name: t('footer.vvipUmrah'), href: '/packages/vvip' },
            { name: t('footer.customPackages'), href: '/packages/custom' },
        ],
        support: [
            { name: t('footer.helpCenter'), href: '/help' },
            { name: t('footer.travelGuide'), href: '/guide' },
            { name: t('footer.visaInfo'), href: '/visa' },
            { name: t('footer.support247'), href: '/support' },
        ],
        legal: [
            { name: t('footer.privacyPolicy'), href: '/privacy' },
            { name: t('footer.termsOfService'), href: '/terms' },
            { name: t('footer.refundPolicy'), href: '/refund' },
            { name: t('footer.disclaimer'), href: '/disclaimer' },
        ],
    };

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/ethiotour' },
        { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/ethiotour' },
        { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/ethiotour' },
        { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/ethiotour' },
    ];

    return (
        <footer className="bg-gray-900 text-white mt-auto">
            {/* Main Footer Content */}
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
                            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">E</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">EthioTour Travel Agency</h3>
                                <p className="text-sm text-gray-400">Complete Umrah Packages</p>
                            </div>
                        </Link>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                            {t('footer.description')}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                <Mail size={16} className="text-primary-400" />
                                <a
                                    href="mailto:umrah@ethiotour.com"
                                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                                >
                                    umrah@ethiotour.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                <Phone size={16} className="text-primary-400" />
                                <a
                                    href="tel:+251986111333"
                                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                                >
                                    +251 986 111 333
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                <MapPin size={16} className="text-primary-400" />
                                <span className="text-gray-300">Addis Ababa, Ethiopia</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
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
                                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-400 text-left rtl:text-right"
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
                        <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4 md:mb-0">
                            <span className="text-gray-400">Follow us:</span>
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
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
                            className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400 hover:text-primary-400 transition-colors duration-200"
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
                        <div className="flex items-center space-x-1 rtl:space-x-reverse mb-2 md:mb-0">
                            <span>© {currentYear} {t('footer.company')}. {t('footer.allRightsReserved')}</span>
                        </div>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
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
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <span>Made with</span>
                                <Heart size={14} className="text-red-500" />
                                <span>by</span>
                                EthioTours
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
