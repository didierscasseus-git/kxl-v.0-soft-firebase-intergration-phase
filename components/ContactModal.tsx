import React, { useState, useEffect } from 'react';
import { useLanguage } from '../App';
import '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-100 backdrop-blur-md bg-black/60' : 'opacity-0 backdrop-blur-none pointer-events-none'}`}>
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      <div className={`relative w-full max-w-2xl mx-4 glass bg-[#0c0c0c]/90 border-white/10 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 flex flex-col ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="space-y-1">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white">
                    {t({ en: 'Initialize Project', fr: 'Initialiser le Projet' })}
                </h3>
                <p className="text-[10px] text-brand-accent font-mono uppercase tracking-wider">
                    {t({ en: 'Secure Transmission Protocol', fr: 'Protocole de Transmission Sécurisé' })}
                </p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
                <iconify-icon icon="ph:x-bold" />
            </button>
        </div>

        {/* Body */}
        <div className="p-8 md:p-10 space-y-6 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                        {t({ en: 'Identity', fr: 'Identité' })}
                    </label>
                    <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors placeholder:text-gray-600" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                        {t({ en: 'Coordinates', fr: 'Coordonnées' })}
                    </label>
                    <input type="email" placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors placeholder:text-gray-600" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                    {t({ en: 'Organization', fr: 'Organisation' })}
                </label>
                <input type="text" placeholder="Company Name Inc." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors placeholder:text-gray-600" />
            </div>

            <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                    {t({ en: 'Directives', fr: 'Directives' })}
                </label>
                <textarea rows={4} placeholder={t({ en: "Briefly describe your architectural requirements...", fr: "Décrivez brièvement vos exigences architecturales..." })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors placeholder:text-gray-600 resize-none" />
            </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-white/10 bg-white/5 flex justify-end">
            <button className="bg-brand-accent text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-brand-accent/20">
                {t({ en: 'Transmit Request', fr: 'Transmettre la Demande' })}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;