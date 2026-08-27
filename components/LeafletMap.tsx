'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { tripData } from '../data/tripData';
import { useAppStore } from '../store/useAppStore';
import { Navigation, Navigation2 } from 'lucide-react';

function MapController({ activeDay }: { activeDay: number }) {
  const map = useMap();

  useEffect(() => {
    const dayData = tripData.find((d) => d.day === activeDay);
    if (dayData && dayData.campsite) {
      map.flyTo([dayData.campsite.lat, dayData.campsite.lng], 9, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [activeDay, map]);

  return null;
}

export default function LeafletMap() {
  const [isClient, setIsClient] = useState(false);
  const { activeDay, setActiveDay } = useAppStore();

  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    supermarket: false,
    gas: false,
    water: false,
    dump: false,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const createDayIcon = (dayNumber: number, isActive: boolean) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${isActive ? '#10B981' : '#FFFFFF'}; 
                  color: ${isActive ? '#FFFFFF' : '#10B981'}; 
                  border: 2px solid #10B981; 
                  border-radius: 50%; width: 36px; height: 36px; 
                  display: flex; align-items: center; justify-content: center; 
                  font-size: 14px; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
                  transform: scale(${
                    isActive ? 1.1 : 1
                  }); transition: transform 0.2s;">
              D${dayNumber}
             </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18],
    });
  };

  // 🟢 極簡亮點圖示：深色小圓星標 + 旁邊浮動的高對比白色光暈文字
  const createHighlightIcon = (name: string) => {
    return L.divIcon({
      className: 'highlight-clean-icon',
      html: `<div style="display: flex; align-items: center; transform: translate(-12px, -12px);">
                <div style="background-color: #1E293B; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); flex-shrink: 0;">
                  <span style="font-size: 14px;">⭐</span>
                </div>
                <span style="margin-left: 6px; font-size: 13px; font-weight: 800; color: #1E293B; text-shadow: 1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white, 0 0 5px white, 0 0 10px white; white-space: nowrap;">
                  ${name}
                </span>
             </div>`,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
      popupAnchor: [0, -15],
    });
  };

  const createPoiIcon = (emoji: string, colorCode: string, rgbaBg: string) => {
    return L.divIcon({
      className: 'poi-glow-icon',
      html: `<div style="background-color: ${rgbaBg}; border: 2.5px solid ${colorCode}; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 0 15px ${rgbaBg}; backdrop-filter: blur(4px);">
                ${emoji}
             </div>`,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -22],
    });
  };

  const poiIcons = {
    supermarket: createPoiIcon('🛒', '#10B981', 'rgba(16, 185, 129, 0.25)'),
    gas: createPoiIcon('⛽', '#F43F5E', 'rgba(244, 63, 94, 0.25)'),
    water: createPoiIcon('💧', '#0EA5E9', 'rgba(14, 165, 233, 0.25)'),
    dump: createPoiIcon('🗑️', '#94A3B8', 'rgba(148, 163, 184, 0.3)'),
  };

  const offlinePOIData = [
    {
      id: 's1',
      name: "PAK'nSAVE Rolleston",
      type: 'supermarket',
      lat: -43.602,
      lng: 172.383,
    },
    {
      id: 's2',
      name: 'New World Three Parks',
      type: 'supermarket',
      lat: -44.713,
      lng: 169.155,
    },
    {
      id: 's3',
      name: 'FreshChoice Te Anau',
      type: 'supermarket',
      lat: -45.415,
      lng: 167.712,
    },
    {
      id: 'g1',
      name: 'NPD Tekapo (加油站)',
      type: 'gas',
      lat: -44.004,
      lng: 170.477,
    },
    {
      id: 'g2',
      name: 'Allied Petroleum Omarama',
      type: 'gas',
      lat: -44.487,
      lng: 169.967,
    },
    {
      id: 'd1',
      name: 'Twizel Dump Station',
      type: 'dump',
      lat: -44.258,
      lng: 170.098,
    },
    {
      id: 'd2',
      name: 'Te Anau Dump Station',
      type: 'dump',
      lat: -45.419,
      lng: 167.715,
    },
    {
      id: 'w1',
      name: 'Geraldine Fresh Water',
      type: 'water',
      lat: -44.093,
      lng: 171.246,
    },
    {
      id: 'w2',
      name: 'Fairlie Water Station',
      type: 'water',
      lat: -44.098,
      lng: 170.825,
    },
  ];

  const currentDayData =
    tripData.find((d) => d.day === activeDay) || tripData[0];
  const defaultCenter: [number, number] = currentDayData.campsite
    ? [currentDayData.campsite.lat, currentDayData.campsite.lng]
    : [-44.0, 170.5];

  const handleNavClick = (lat: number, lng: number) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      '_blank'
    );
  };

  const visiblePOIs = offlinePOIData.filter((poi) => activeLayers[poi.type]);
  const activeMarkerCount =
    visiblePOIs.length +
    (currentDayData.campsite ? 1 : 0) +
    currentDayData.highlights.length;

  return (
    <div className="relative w-full h-full bg-[#E5E7EB] font-sans">
      <div className="absolute top-14 left-0 right-0 z-[400] px-4 w-full">
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {tripData.map((day) => (
            <button
              key={`nav-${day.day}`}
              onClick={() => setActiveDay(day.day)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full border shadow-sm transition-colors text-sm ${
                activeDay === day.day
                  ? 'bg-emerald-500 border-emerald-600 text-white font-bold'
                  : 'bg-white/90 backdrop-blur border-slate-300 text-slate-700 font-medium'
              }`}
            >
              D{day.day}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute top-3 left-4 z-[400]">
        <div className="bg-[#1E293B] text-white px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-2 border border-slate-600">
          <span className="text-lg">🏕️</span>
          <span className="text-sm font-medium tracking-wide">
            D{activeDay} · {currentDayData.title.split(' ➔ ').pop()}
          </span>
        </div>
      </div>

      <div className="absolute top-3 right-4 z-[400]">
        <div className="bg-[#1E293B]/90 backdrop-blur text-slate-300 px-4 py-2.5 rounded-full shadow-lg border border-slate-600">
          <span className="text-sm font-medium">
            {activeMarkerCount} 個標記
          </span>
        </div>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={9}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <MapController activeDay={activeDay} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {tripData.map((day) => {
          if (!day.campsite) return null;
          const isActive = day.day === activeDay;
          return (
            <Marker
              key={`camp-${day.day}`}
              position={[day.campsite.lat, day.campsite.lng]}
              icon={createDayIcon(day.day, isActive)}
              zIndexOffset={isActive ? 1000 : 0}
            >
              <Popup className="rounded-xl">
                <div className="p-1 min-w-[200px]">
                  <div className="font-bold text-base text-slate-800 mb-1">
                    {day.campsite.name}
                  </div>
                  <div className="text-sm text-slate-500 mb-3">
                    Day {day.day} - {day.title.split(' ➔ ').pop()}
                  </div>
                  <button
                    onClick={() =>
                      handleNavClick(day.campsite!.lat, day.campsite!.lng)
                    }
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 active:bg-blue-700 text-white py-2.5 rounded-lg font-bold"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Google Maps 導航</span>
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {currentDayData.highlights.map((highlight, index) => (
          <Marker
            key={`highlight-${currentDayData.day}-${index}`}
            position={[highlight.lat, highlight.lng]}
            icon={createHighlightIcon(highlight.name)}
            zIndexOffset={800}
          >
            <Popup className="rounded-xl">
              <div className="p-1 min-w-[160px]">
                <div className="font-bold text-sm text-slate-800 mb-2">
                  {highlight.name}
                </div>
                <button
                  onClick={() => handleNavClick(highlight.lat, highlight.lng)}
                  className="w-full flex items-center justify-center space-x-1 bg-yellow-500 active:bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium"
                >
                  <Navigation2 className="w-4 h-4" />
                  <span>導航至此</span>
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {visiblePOIs.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.lat, poi.lng]}
            icon={poiIcons[poi.type as keyof typeof poiIcons]}
          >
            <Popup className="rounded-xl">
              <div className="p-1 min-w-[160px]">
                <div className="font-bold text-sm text-slate-800 mb-2">
                  {poi.name}
                </div>
                <button
                  onClick={() => handleNavClick(poi.lat, poi.lng)}
                  className="w-full flex items-center justify-center space-x-1 bg-slate-800 active:bg-slate-900 text-white py-2 rounded-lg text-sm font-medium"
                >
                  <Navigation2 className="w-4 h-4" />
                  <span>導航至此</span>
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute bottom-6 left-4 right-4 z-[400]">
        <div className="bg-[#94A3B8]/90 backdrop-blur-md p-5 rounded-[2rem] shadow-2xl border border-white/20">
          <div className="w-12 h-1 bg-white/40 rounded-full mx-auto mb-5"></div>
          <p className="text-xs text-slate-700 font-bold mb-4 ml-1">圖層篩選</p>

          <div className="flex justify-between px-1 mb-4">
            {(['supermarket', 'gas', 'water', 'dump'] as const).map(
              (type, index) => {
                const labels = ['超市', '加油', '清水', '污水'];
                const icons = ['🛒', '⛽', '💧', '🗑️'];

                let activeClass =
                  'bg-white/40 text-slate-600 border border-transparent';
                if (activeLayers[type]) {
                  if (type === 'supermarket')
                    activeClass =
                      'bg-emerald-100 border-2 border-emerald-500 text-emerald-600 shadow-md';
                  if (type === 'gas')
                    activeClass =
                      'bg-rose-100 border-2 border-rose-500 text-rose-600 shadow-md';
                  if (type === 'water')
                    activeClass =
                      'bg-sky-100 border-2 border-sky-500 text-sky-600 shadow-md';
                  if (type === 'dump')
                    activeClass =
                      'bg-slate-200 border-2 border-slate-500 text-slate-700 shadow-md';
                }

                return (
                  <button
                    key={type}
                    onClick={() =>
                      setActiveLayers((prev) => ({
                        ...prev,
                        [type]: !prev[type],
                      }))
                    }
                    className={`flex flex-col items-center justify-center w-[60px] h-[64px] rounded-[18px] transition-all ${activeClass}`}
                  >
                    <span className="text-2xl mb-1 opacity-90">
                      {icons[index]}
                    </span>
                    <span className="text-[11px] font-bold tracking-wide">
                      {labels[index]}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          <div className="flex items-center space-x-4 text-xs font-bold px-2 pt-2 border-t border-white/20">
            {activeLayers.supermarket && (
              <span className="text-emerald-700 flex items-center">
                🛒{' '}
                <span className="ml-1 opacity-80">
                  {
                    offlinePOIData.filter((p) => p.type === 'supermarket')
                      .length
                  }{' '}
                  個 超市
                </span>
              </span>
            )}
            {activeLayers.water && (
              <span className="text-sky-700 flex items-center">
                💧{' '}
                <span className="ml-1 opacity-80">
                  {offlinePOIData.filter((p) => p.type === 'water').length} 個
                  清水
                </span>
              </span>
            )}
            {activeLayers.gas && (
              <span className="text-rose-700 flex items-center">
                ⛽{' '}
                <span className="ml-1 opacity-80">
                  {offlinePOIData.filter((p) => p.type === 'gas').length} 個
                  加油
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
