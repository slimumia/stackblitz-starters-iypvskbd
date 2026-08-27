'use client';

import React, { useEffect, useState } from 'react';
import { tripData } from '../data/tripData';
import { useAppStore } from '../store/useAppStore';
import {
  AlertTriangle,
  MapPin,
  Wind,
  Thermometer,
  Droplets,
  RefreshCw,
  Star,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface WeatherData {
  temp: number;
  windGust: number;
  rain: number;
}

export default function MorningBriefing() {
  const { activeDay, setActiveDay } = useAppStore();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  // 🟢 狀態：紀錄目前展開的亮點與戰術索引
  const [expandedHighlight, setExpandedHighlight] = useState<number | null>(
    null
  );
  const [expandedProtocol, setExpandedProtocol] = useState<number | null>(null);

  const todayPlan = tripData.find((d) => d.day === activeDay) || tripData[0];

  useEffect(() => {
    setExpandedHighlight(null);
    setExpandedProtocol(null);
    const fetchWeather = async () => {
      if (!todayPlan.campsite) return;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${todayPlan.campsite.lat}&longitude=${todayPlan.campsite.lng}&current=temperature_2m,wind_gusts_10m,precipitation&wind_speed_unit=kmh`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('API Request Failed');
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          windGust: Math.round(data.current.wind_gusts_10m),
          rain: data.current.precipitation || 0,
        });
        setIsOffline(false);
      } catch (error) {
        setIsOffline(true);
      }
    };
    fetchWeather();
  }, [todayPlan]);

  const isExtremeWeather =
    weather && (weather.temp <= 5 || weather.windGust >= 50);

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">
            晨間戰情簡報
          </h1>
          <p className="text-xs text-slate-400">
            NZ Campervan · {todayPlan.date}
          </p>
        </div>
        <button className="p-2 bg-slate-800 rounded-full border border-slate-700 text-slate-300">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {tripData.map((day) => (
          <button
            key={day.day}
            onClick={() => setActiveDay(day.day)}
            className={`flex flex-col items-center justify-center min-w-[64px] py-2 rounded-xl border transition-colors ${
              activeDay === day.day
                ? 'bg-emerald-400 border-emerald-400 text-slate-900'
                : 'bg-slate-800/50 border-slate-700 text-slate-400'
            }`}
          >
            <span className="text-[10px] font-bold">D{day.day}</span>
            <span className="text-[11px]">{day.date.substring(5)}</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-2xl space-y-3">
        <div className="flex items-center space-x-2 text-slate-400 text-sm">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>今日路線</span>
        </div>
        <h2 className="text-lg font-bold text-white leading-snug">
          D{todayPlan.day} · {todayPlan.title.split(' ➔ ').pop()}
        </h2>
        <p className="text-sm text-slate-300 mb-2">{todayPlan.title}</p>

        {/* 🟢 戰術動作 (Accordion) */}
        {todayPlan.tacticalProtocols.length > 0 && (
          <div className="pt-2 border-t border-slate-700">
            <h3 className="text-xs font-bold text-slate-400 mb-2 flex items-center">
              <ShieldAlert className="w-3 h-3 mr-1 text-rose-400" />{' '}
              戰術動作與時間閘門
            </h3>
            <ul className="space-y-2">
              {todayPlan.tacticalProtocols.map((protocol, i) => (
                <li
                  key={i}
                  className="bg-slate-700/30 rounded-lg border border-slate-600/50 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedProtocol(expandedProtocol === i ? null : i)
                    }
                    className="w-full flex justify-between items-center p-2.5 text-left text-sm text-rose-300 font-medium active:bg-slate-700/50"
                  >
                    <span>{protocol.title}</span>
                    {expandedProtocol === i ? (
                      <ChevronUp className="w-4 h-4 opacity-70" />
                    ) : (
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    )}
                  </button>
                  {expandedProtocol === i && (
                    <div className="px-2.5 pb-2.5 text-xs text-slate-300 leading-relaxed bg-slate-800/30">
                      {protocol.detail}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 🟢 行程亮點 (Accordion) */}
        {todayPlan.highlights.length > 0 && (
          <div className="pt-2 border-t border-slate-700 mt-2">
            <h3 className="text-xs font-bold text-slate-400 mb-2 flex items-center">
              <Star className="w-3 h-3 mr-1 text-yellow-500" /> 核心行程亮點
            </h3>
            <ul className="space-y-2">
              {todayPlan.highlights.map((h, i) => (
                <li
                  key={i}
                  className="bg-slate-700/30 rounded-lg border border-slate-600/50 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedHighlight(expandedHighlight === i ? null : i)
                    }
                    className="w-full flex justify-between items-center p-2.5 text-left text-sm text-emerald-300 font-medium active:bg-slate-700/50"
                  >
                    <span className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                      {h.name}
                    </span>
                    {expandedHighlight === i ? (
                      <ChevronUp className="w-4 h-4 opacity-70" />
                    ) : (
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    )}
                  </button>
                  {expandedHighlight === i && (
                    <div className="px-3 pb-2.5 text-xs text-slate-300 leading-relaxed bg-slate-800/30 border-t border-slate-700/50 pt-2 mt-1">
                      {h.description}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-end space-x-2">
              <span className="text-5xl font-bold text-white">
                {weather ? weather.temp : '--'}°
              </span>
              <span className="text-2xl mb-1">🌧️</span>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              {isOffline
                ? '離線模式'
                : `體感 ${weather ? weather.temp - 3 : '--'}°`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-emerald-400 flex items-center justify-end space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>剛剛更新</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {todayPlan.campsite?.name || '移動日'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-900/50 p-3 rounded-xl flex flex-col items-center justify-center border border-slate-700/50">
            <Wind className="w-5 h-5 text-slate-400 mb-1" />
            <span className="text-white font-bold">
              {weather ? weather.windGust : '--'}
            </span>
            <span className="text-[10px] text-slate-500">km/h 陣風</span>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-xl flex flex-col items-center justify-center border border-slate-700/50">
            <Thermometer className="w-5 h-5 text-slate-400 mb-1" />
            <span className="text-white font-bold">
              {weather ? weather.temp : '--'}
            </span>
            <span className="text-[10px] text-slate-500">°C 氣溫</span>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-xl flex flex-col items-center justify-center border border-slate-700/50">
            <Droplets className="w-5 h-5 text-slate-400 mb-1" />
            <span className="text-white font-bold">
              {weather ? weather.rain : '--'}
            </span>
            <span className="text-[10px] text-slate-500">mm 降雨</span>
          </div>
        </div>

        {isExtremeWeather && (
          <div className="bg-red-900/20 border border-red-900/50 p-3 rounded-xl flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-xs text-red-400">
              強陣風/低溫警告 — 建議於原穿搭內加強防風層
            </p>
          </div>
        )}
      </div>

      <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-2xl">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-2xl">👗</span>
          <div>
            <h3 className="font-bold text-white text-sm">穿搭指令</h3>
            <p className="text-xs text-slate-400">Vibe Outfit Protocol</p>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-700/50 p-3 rounded-xl">
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {todayPlan.vibeOutfit}
          </p>
        </div>
      </div>
    </div>
  );
}
