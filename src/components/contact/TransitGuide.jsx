import React from 'react';
import { MapPin, Navigation, Compass, Wifi, Zap, Volume2, Bike, ExternalLink } from 'lucide-react';
import { MAPS_LINK } from '../../config';
import Scroll3DEmerge from './Scroll3DEmerge';

const LANDMARKS = [
  { name: 'Commerce College Road', time: '2 min walk', desc: 'Direct avenue access, calm pedestrian stroll' },
  { name: 'Talwandi Circle', time: '3 min commute', desc: 'Central junction connecting to city transit routes' },
  { name: 'Coaching Belt (Allen / Resonance / Vibrant)', time: '5–8 min ride', desc: 'Quick commute for focused post-class study' },
  { name: 'City Mall / Aerodrome Circle', time: '7–10 min transit', desc: 'Direct straight-line connectivity along avenue' },
];

const AMENITIES = [
  { icon: Bike, title: 'Dedicated Parking', desc: 'Free storefront two-wheeler parking and calm curbside car bays.' },
  { icon: Wifi, title: '200 Mbps Fiber Wi-Fi', desc: 'Symmetric high-speed connection for video calls and research.' },
  { icon: Zap, title: 'Universal Power Plugs', desc: 'Accessible outlets at study nooks and booth seating.' },
  { icon: Volume2, title: 'Acoustic Balance', desc: 'Curated low-volume soundscapes engineered for deep focus.' },
];

export const TransitGuide = () => {
  return (
    <section id="transit-guide" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF7F2] text-[#14100E] border-b-2 border-[#14100E] selection:bg-[#14100E] selection:text-[#FAF7F2]">
      
      {/* ── Ground Rift Line ── */}
      <div className="w-full max-w-7xl mx-auto mb-10 flex items-center justify-between border-b-2 border-dashed border-[#14100E]/20 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#A8612E] rotate-45 animate-pulse" />
          <span className="font-grotesk text-[9px] font-black uppercase tracking-[0.28em] text-[#A8612E]">
            TECTONIC SECTOR // CARTOGRAPHIC BLUEPRINT DOCK
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[9px] text-[#14100E]/60 uppercase tracking-widest">
          <span>PARALLAX EMERGENCE</span>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 pb-6 border-b-2 border-[#14100E] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-block bg-[#FAF7F2] border-2 border-[#14100E] px-3 py-1 shadow-[3px_3px_0px_#14100E] mb-3">
              <span className="font-grotesk text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#14100E]">
                ACCESS & NEIGHBORHOOD SPECIMEN
              </span>
            </div>
            <h2 className="font-grotesk font-black text-4xl sm:text-5xl uppercase tracking-tighter text-[#14100E]">
              Transit & Coordinates Guide
            </h2>
          </div>
          <p className="font-grotesk text-xs sm:text-sm uppercase tracking-wider text-[#14100E]/75 max-w-md leading-relaxed">
            Nestled in the serene heart of Talwandi, Kota. Easy walking access from commerce institutions and prominent coaching centres.
          </p>
        </div>

        {/* 2-Column Grid: Map Plate & Landmark Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 border-2 border-[#14100E] bg-[#FAF7F2] shadow-[8px_8px_0px_#14100E] overflow-hidden">
          
          {/* Left Column (6 Cols): Framed Interactive Map (Emerges from Left) */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-[#14100E] bg-[#FAF7F2]">
            <Scroll3DEmerge side="left" depth={80} pitchAngle={14}>
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#14100E]/20 font-grotesk text-xs font-black uppercase tracking-wider text-[#14100E]">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#A8612E]" />
                    Satellite Coordinates Plate
                  </span>
                  <span className="font-mono text-[10px] text-[#A8612E] font-black">25.1388° N, 75.8362° E</span>
                </div>

                {/* Map Frame */}
                <div className="border-2 border-[#14100E] p-2 bg-[#FAF7F2] shadow-[4px_4px_0px_#14100E] mb-4">
                  <div className="aspect-[4/3] w-full overflow-hidden border border-[#14100E]/20 relative">
                    <iframe
                      title="TATVA Café location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.123!2d75.8362!3d25.1388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA4JzE5LjciTiA3NcKwNTAnMTAuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: 280 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between font-grotesk text-[10px] font-bold uppercase tracking-wider text-[#14100E]/70 mb-6">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#A8612E]" />
                    Talwandi Sector • Kota, RJ 324005
                  </span>
                  <span className="text-[#14100E]">Step-Free Entry</span>
                </div>
              </div>

              {MAPS_LINK && (
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 bg-[#14100E] hover:bg-[#A8612E] text-[#FAF7F2] font-grotesk font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-[3px_3px_0px_#A8612E] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#A8612E]"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Navigation in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
            </Scroll3DEmerge>
          </div>

          {/* Right Column (6 Cols): Proximity Ledger & Amenities (Emerges from Right) */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-[#FAF7F2]">
            <Scroll3DEmerge side="right" depth={80} pitchAngle={14}>
              {/* Landmark Proximity Ledger */}
              <div className="mb-8">
                <div className="font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#A8612E] mb-4">
                  Key Neighborhood Proximity
                </div>
                <div className="divide-y-2 divide-[#14100E]/15 border-y-2 border-[#14100E]">
                  {LANDMARKS.map((item) => (
                    <div key={item.name} className="py-3.5 flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-grotesk font-black text-xs uppercase tracking-tight text-[#14100E]">
                          {item.name}
                        </h4>
                        <p className="font-grotesk text-[11px] text-[#14100E]/60 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                      <span className="font-mono text-xs font-black text-[#A8612E] whitespace-nowrap bg-[#EADBC8]/40 px-2.5 py-1 border border-[#14100E]/20">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* On-Site Amenities Grid */}
              <div>
                <div className="font-grotesk text-[10px] font-black uppercase tracking-[0.25em] text-[#A8612E] mb-4">
                  Sanctuary Specifications & Amenities
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AMENITIES.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div
                        key={amenity.title}
                        className="p-3.5 border-2 border-[#14100E] bg-[#FAF7F2] shadow-[2px_2px_0px_#14100E] hover:bg-[#EADBC8]/20 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className="w-4 h-4 text-[#A8612E] shrink-0" />
                          <span className="font-grotesk font-black text-xs uppercase text-[#14100E]">
                            {amenity.title}
                          </span>
                        </div>
                        <p className="font-grotesk text-[10px] text-[#14100E]/70 leading-relaxed">
                          {amenity.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Scroll3DEmerge>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TransitGuide;
