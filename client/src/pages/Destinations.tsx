import React from 'react';
import { MapPin } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { destinationsAPI } from '../services/api';

const Destinations: React.FC = () => {
  const { data: destinations, loading } = useApi(() => destinationsAPI.getAll());


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-primary py-16">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Destinations
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Explore the sacred destinations included in our Umrah packages. 
            From the holy cities of Makkah and Madinah to significant Islamic landmarks.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations?.map((destination) => (
                <div key={destination.destination_id} className="card-hover">
                  <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-t-xl flex items-center justify-center">
                    <MapPin size={48} className="text-white" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        {destination.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {destination.name}
                    </h3>
                    
                    <p className="text-gray-600 line-clamp-3">
                      {destination.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Destinations;
