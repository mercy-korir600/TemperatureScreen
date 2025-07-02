
import React from 'react';
import { Sun, CloudSun, ThermometerSun } from 'lucide-react';

interface TemperatureCardProps {
  title: string;
  temperature: number;
  humidity?: number;
  icon: 'sun' | 'cloud-sun' | 'thermometer-sun';
}

const TemperatureCard: React.FC<TemperatureCardProps> = ({ 
  title, 
  temperature, 
  humidity, 
  icon 
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'sun':
        return <Sun className="w-6 h-6 text-emerald-400" />;
      case 'cloud-sun':
        return <CloudSun className="w-6 h-6 text-teal-400" />;
      case 'thermometer-sun':
        return <ThermometerSun className="w-6 h-6 text-emerald-500" />;
      default:
        return <Sun className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/90 font-medium">{title}</h3>
        {getIcon()}
      </div>
      
      <div className="text-3xl font-bold text-white mb-2">
        {Math.round(temperature)}°F
      </div>
      
      {humidity && (
        <div className="text-white/70 text-sm">
          Humidity: {humidity}%
        </div>
      )}
    </div>
  );
};

export default TemperatureCard;
