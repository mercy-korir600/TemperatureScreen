
import React from 'react';
import { Thermometer, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TemperatureDisplayProps {
  temperature: number;
  trend: 'up' | 'down' | 'stable';
  location: string;
}

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({ 
  temperature, 
  trend, 
  location 
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-6 h-6 text-red-500" />;
      case 'down':
        return <TrendingDown className="w-6 h-6 text-blue-500" />;
      default:
        return <Minus className="w-6 h-6 text-gray-500" />;
    }
  };

  const getTemperatureColor = () => {
    if (temperature >= 80) return 'text-red-500';
    if (temperature >= 70) return 'text-orange-500';
    if (temperature >= 60) return 'text-emerald-400';
    if (temperature >= 50) return 'text-teal-400';
    return 'text-blue-500';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Thermometer className="w-8 h-8 text-white/80 mr-3" />
          <h2 className="text-xl font-semibold text-white/90">{location}</h2>
        </div>
        
        <div className="relative">
          <div className={`text-8xl font-bold mb-4 ${getTemperatureColor()} transition-colors duration-500`}>
            {Math.round(temperature)}°
          </div>
          <div className="absolute -top-2 -right-8">
            {getTrendIcon()}
          </div>
        </div>
        
        <div className="text-white/70 text-lg">
          Fahrenheit
        </div>
      </div>
    </div>
  );
};

export default TemperatureDisplay;
