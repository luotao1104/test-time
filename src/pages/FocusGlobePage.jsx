import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FocusGlobePage = () => {
  const globeEl = useRef();
  const [points, setPoints] = useState([]);

  useEffect(() => {
    // Simulate random data points
    const N = 50;
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() / 3,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));
    setPoints(gData);

    // Auto-rotate
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <Link to="/" className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors inline-block">
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      <div className="absolute top-4 right-4 z-10 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white max-w-xs">
        <h2 className="text-xl font-bold mb-2">全球专注热力图</h2>
        <p className="text-sm text-gray-300">
          实时显示全球各地正在专注的用户（模拟数据）。
          <br />
          转动地球，感受连接。
        </p>
      </div>

      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        pointsData={points}
        pointAltitude="size"
        pointColor="color"
        pointRadius="size"
        pointsMerge={true}
        atmosphereColor="#a855f7" // Purple atmosphere
        atmosphereAltitude={0.15}
      />
    </div>
  );
};

export default FocusGlobePage;
