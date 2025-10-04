import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Plane, 
  CreditCard, 
  Shield, 
  Users, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      id: 'general',
      title: t('faq.categories.general.title'),
      icon: HelpCircle,
      questions: [
        {
          question: t('faq.general.q1.question'),
          answer: t('faq.general.q1.answer')
        },
        {
          question: t('faq.general.q2.question'),
          answer: t('faq.general.q2.answer')
        },
        {
          question: t('faq.general.q3.question'),
          answer: t('faq.general.q3.answer')
        },
        {
          question: t('faq.general.q4.question'),
          answer: t('faq.general.q4.answer')
        }
      ]
    },
    {
      id: 'booking',
      title: t('faq.categories.booking.title'),
      icon: Calendar,
      questions: [
        {
          question: t('faq.booking.q1.question'),
          answer: t('faq.booking.q1.answer')
        },
        {
          question: t('faq.booking.q2.question'),
          answer: t('faq.booking.q2.answer')
        },
        {
          question: t('faq.booking.q3.question'),
          answer: t('faq.booking.q3.answer')
        },
        {
          question: t('faq.booking.q4.question'),
          answer: t('faq.booking.q4.answer')
        }
      ]
    },
    {
      id: 'travel',
      title: t('faq.categories.travel.title'),
      icon: Plane,
      questions: [
        {
          question: t('faq.travel.q1.question'),
          answer: t('faq.travel.q1.answer')
        },
        {
          question: t('faq.travel.q2.question'),
          answer: t('faq.travel.q2.answer')
        },
        {
          question: t('faq.travel.q3.question'),
          answer: t('faq.travel.q3.answer')
        },
        {
          question: t('faq.travel.q4.question'),
          answer: t('faq.travel.q4.answer')
        }
      ]
    },
    {
      id: 'payment',
      title: t('faq.categories.payment.title'),
      icon: CreditCard,
      questions: [
        {
          question: t('faq.payment.q1.question'),
          answer: t('faq.payment.q1.answer')
        },
        {
          question: t('faq.payment.q2.question'),
          answer: t('faq.payment.q2.answer')
        },
        {
          question: t('faq.payment.q3.question'),
          answer: t('faq.payment.q3.answer')
        },
        {
          question: t('faq.payment.q4.question'),
          answer: t('faq.payment.q4.answer')
        }
      ]
    },
    {
      id: 'safety',
      title: t('faq.categories.safety.title'),
      icon: Shield,
      questions: [
        {
          question: t('faq.safety.q1.question'),
          answer: t('faq.safety.q1.answer')
        },
        {
          question: t('faq.safety.q2.question'),
          answer: t('faq.safety.q2.answer')
        },
        {
          question: t('faq.safety.q3.question'),
          answer: t('faq.safety.q3.answer')
        },
        {
          question: t('faq.safety.q4.question'),
          answer: t('faq.safety.q4.answer')
        }
      ]
    },
    {
      id: 'support',
      title: t('faq.categories.support.title'),
      icon: Users,
      questions: [
        {
          question: t('faq.support.q1.question'),
          answer: t('faq.support.q1.answer')
        },
        {
          question: t('faq.support.q2.question'),
          answer: t('faq.support.q2.answer')
        },
        {
          question: t('faq.support.q3.question'),
          answer: t('faq.support.q3.answer')
        },
        {
          question: t('faq.support.q4.question'),
          answer: t('faq.support.q4.answer')
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-primary py-16 mt-16 lg:mt-20">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Quick Help */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone size={24} className="text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('faq.quickHelp.phone.title')}
                </h3>
                <p className="text-gray-600 mb-3">
                  {t('faq.quickHelp.phone.description')}
                </p>
                <a 
                  href="tel:+251912345678" 
                  className="text-primary-600 font-medium hover:text-primary-700 transition-colors duration-200"
                >
                  +251 912 345 678
                </a>
              </div>

              <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('faq.quickHelp.email.title')}
                </h3>
                <p className="text-gray-600 mb-3">
                  {t('faq.quickHelp.email.description')}
                </p>
                <a 
                  href="mailto:support@zadtravel.com" 
                  className="text-primary-600 font-medium hover:text-primary-700 transition-colors duration-200"
                >
                  support@zadtravel.com
                </a>
              </div>

              <div className="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock size={24} className="text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('faq.quickHelp.hours.title')}
                </h3>
                <p className="text-gray-600 mb-3">
                  {t('faq.quickHelp.hours.description')}
                </p>
                <span className="text-primary-600 font-medium">
                  {t('faq.quickHelp.hours.time')}
                </span>
              </div>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={category.id} className="card">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <category.icon size={20} className="text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {category.title}
                    </h2>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {category.questions.map((item, questionIndex) => {
                    const globalIndex = categoryIndex * 10 + questionIndex;
                    const isOpen = openItems.includes(globalIndex);
                    
                    return (
                      <div key={questionIndex} className="p-6">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
                        >
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-primary-600 text-sm font-semibold">
                                {questionIndex + 1}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                              {item.question}
                            </h3>
                          </div>
                          <div className="flex-shrink-0">
                            {isOpen ? (
                              <ChevronUp size={20} className="text-gray-500" />
                            ) : (
                              <ChevronDown size={20} className="text-gray-500" />
                            )}
                          </div>
                        </button>
                        
                        {isOpen && (
                          <div className="mt-4 pl-9">
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-gray-700 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still Need Help */}
          <div className="mt-16">
            <div className="card p-8 text-center bg-gradient-to-r from-primary-50 to-secondary-50">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle size={32} className="text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('faq.stillNeedHelp.title')}
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('faq.stillNeedHelp.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+251912345678"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <Phone size={18} />
                  <span>{t('faq.stillNeedHelp.call')}</span>
                </a>
                <a
                  href="mailto:support@zadtravel.com"
                  className="btn-outline inline-flex items-center space-x-2"
                >
                  <Mail size={18} />
                  <span>{t('faq.stillNeedHelp.email')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
