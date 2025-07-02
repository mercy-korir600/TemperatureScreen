
import React, { useState, useEffect } from 'react';
import TemperatureDisplay from '../components/TemperatureDisplay';
import TemperatureCard from '../components/TemperatureCard';

const Index = () => {
  const [mainTemp, setMainTemp] = useState(72);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');
  const [sensor, setSensor] = useState({
    id: 1, 
    title: 'Main Sensor', 
    temperature: 74, 
    humidity: 45, 
    icon: 'thermometer-sun' as const 
  });

  // Simulate real-time temperature updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update main temperature
      setMainTemp(prev => {
        const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
        const newTemp = prev + change;
        
        // Update trend based on change
        if (change > 0.3) setTrend('up');
        else if (change < -0.3) setTrend('down');
        else setTrend('stable');
        
        return Math.max(50, Math.min(90, newTemp)); // Keep between 50-90°F
      });

      // Update sensor temperature
      setSensor(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 1.5,
        humidity: Math.max(30, Math.min(70, prev.humidity + (Math.random() - 0.5) * 3))
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Temperature Monitor
          </h1>
          <p className="text-white/70 text-xl">
            Real-time temperature readings from your sensor
          </p>
        </div>

        {/* Main Temperature Display */}
        <div className="flex justify-center mb-12">
          <TemperatureDisplay 
            temperature={mainTemp}
            trend={trend}
            location="Main Sensor"
          />
        </div>

        {/* Single Temperature Card */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-sm">
            <TemperatureCard
              title={sensor.title}
              temperature={sensor.temperature}
              humidity={Math.round(sensor.humidity)}
              icon={sensor.icon}
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white/90 mb-4 md:mb-0">
              <span className="font-semibold">System Status:</span>
              <span className="ml-2 text-emerald-400">Online</span>
            </div>
            <div className="text-white/70 text-sm">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
