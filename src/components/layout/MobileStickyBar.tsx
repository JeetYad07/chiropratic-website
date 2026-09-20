import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { clinicInfo } from '../../data/clinicInfo';
import { openWhatsAppChat } from '../../utils/whatsapp';

export const MobileStickyBar: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-2.5 shadow-lg">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Button */}
        <a
          href={`tel:${clinicInfo.phone}`}
          className="flex flex-col items-center justify-center gap-1 min-h-[48px] bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 active:bg-slate-300"
        >
          <Phone className="w-4.5 h-4.5 text-sky-600" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <button
          onClick={() => openWhatsAppChat()}
          className="flex flex-col items-center justify-center gap-1 min-h-[48px] bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
        >
          <MessageSquare className="w-4.5 h-4.5" />
          <span>WhatsApp</span>
        </button>

        {/* Book Button */}
        <Link
          to="/book"
          className="flex flex-col items-center justify-center gap-1 min-h-[48px] bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
        >
          <Calendar className="w-4.5 h-4.5" />
          <span>Book</span>
        </Link>
      </div>
    </div>
  );
};
