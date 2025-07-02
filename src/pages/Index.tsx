
import React, { useState, useEffect } from 'react';
import TemperatureDisplay from '../components/TemperatureDisplay';
import TemperatureCard from '../components/TemperatureCard';

const Index = () => {
  const [mainTemp, setMainTemp] = useState(72);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');
  const [sensors, setSensors] = useState([
    { id: 1, title: 'Living Room', temperature: 74, humidity: 45, icon: 'sun' as const },
    { id: 2, title: 'Kitchen', temperature: 76, humidity: 52, icon: 'thermometer-sun' as const },
    { id: 3, title: 'Bedroom', temperature: 68, humidity: 48, icon: 'cloud-sun' as const },
    { id: 4, title: 'Office', temperature: 71, humidity: 43, icon: 'sun' as const },
  ]);

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

      // Update sensor temperatures
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        temperature: sensor.temperature + (Math.random() - 0.5) * 1.5,
        humidity: Math.max(30, Math.min(70, sensor.humidity + (Math.random() - 0.5) * 3))
      })));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Temperature Monitor
          </h1>
          <p className="text-white/70 text-xl">
            Real-time temperature readings from your sensors
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

        {/* Temperature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sensors.map(sensor => (
            <TemperatureCard
              key={sensor.id}
              title={sensor.title}
              temperature={sensor.temperature}
              humidity={Math.round(sensor.humidity)}
              icon={sensor.icon}
            />
          ))}
        </div>

        {/* Status Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white/90 mb-4 md:mb-0">
              <span className="font-semibold">System Status:</span>
              <span className="ml-2 text-green-400">Online</span>
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
