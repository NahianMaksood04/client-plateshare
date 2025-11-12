import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">PS</div>
          <div>
            <div className="font-heading">PlateShare</div>
            <div className="text-sm text-muted">Reducing food waste, feeding neighbors.</div>
          </div>
        </div>

        <div className="mt-4 md:mt-0 text-sm">
          <div>© {year} PlateShare. All rights reserved.</div>
          <div className="flex gap-3 mt-2">
            <a href="#" aria-label="X (Twitter)">X</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Instagram">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
