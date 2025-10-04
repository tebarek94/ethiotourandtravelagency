import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Calendar, 
  Heart, 
  Clock, 
  Shield, 
  Globe, 
  Award,
  Target
} from 'lucide-react';

const About: React.FC = () => {
  const { t } = useTranslation();
  
  const stats = [
    { number: '1000+', label: t('home.stats.pilgrims'), icon: Users },
    { number: '15+', label: t('home.stats.packages'), icon: Calendar },
    { number: '98%', label: 'Satisfaction Rate', icon: Heart },
    { number: '24/7', label: 'Customer Support', icon: Clock },
  ];

  const values = [
    {
      icon: Shield,
      title: t('about.values.integrity.title'),
      description: t('about.values.integrity.description')
    },
    {
      icon: Heart,
      title: t('about.values.compassion.title'),
      description: t('about.values.compassion.description')
    },
    {
      icon: Globe,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Award,
      title: t('about.values.reliability.title'),
      description: t('about.values.reliability.description')
    }
  ];

  const team = [
    {
      name: 'Murad Tadesse',
      role: 'Founder & CEO',
      description: 'Passionate about facilitating spiritual journeys with over 10 years of experience in travel and tourism.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Amina Hassan',
      role: 'Operations Manager',
      description: 'Expert in Umrah logistics and customer service, ensuring smooth experiences for all pilgrims.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Omar Ahmed',
      role: 'Spiritual Guide',
      description: 'Certified Islamic scholar providing spiritual guidance and support throughout your journey.',
      image: '/api/placeholder/300/300'
    }
  ];

  const milestones = [
    {
      year: '2025',
      title: 'Company Founded',
      description: 'EthioTour Travel Agency was established with a vision to make Umrah accessible and meaningful for all.'
    },
    {
      year: '2025',
      title: 'First 100 Pilgrims',
      description: 'Successfully facilitated Umrah journeys for our first 100 pilgrims with 100% satisfaction rate.'
    },
    {
      year: '2025',
      title: 'Partnership Network',
      description: 'Established partnerships with leading airlines, hotels, and transport services in Saudi Arabia.'
    },
    {
      year: '2025',
      title: 'Digital Platform',
      description: 'Launched our comprehensive digital platform for seamless booking and travel management.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary py-20 mt-16 lg:mt-20">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.mission.title')}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('about.mission.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Target size={24} className="text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Accessibility</h3>
                    <p className="text-gray-600">Making Umrah accessible to everyone regardless of their background or budget.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart size={24} className="text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Spiritual Enrichment</h3>
                    <p className="text-gray-600">Focusing on the spiritual aspect of your journey with proper guidance and support.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield size={24} className="text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Trust & Reliability</h3>
                    <p className="text-gray-600">Providing secure and reliable services with comprehensive support throughout your journey.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.vision.title')}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('about.vision.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">
              Numbers that reflect our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={32} className="text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon size={32} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to making your Umrah journey memorable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Key milestones in our growth and development
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="text-primary-600 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center relative z-10">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Begin Your Spiritual Journey?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Join thousands of satisfied pilgrims who have trusted us with their Umrah journey. 
            Let us make your spiritual experience truly memorable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/packages"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <Calendar size={20} />
              <span>View Packages</span>
            </a>
            <a
              href="/contact"
              className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
