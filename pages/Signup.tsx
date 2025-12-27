
import React, { useState, useEffect } from 'react';
import { useLanguage, usePage } from '../App';

const Signup: React.FC = () => {
  const { t } = useLanguage();
  const { setPage } = usePage();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Requirement status for visual enforcement
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    special: false
  });

  useEffect(() => {
    const pwd = formData.password;
    const reqs = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      special: /[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)
    };
    setRequirements(reqs);

    let score = 0;
    if (!pwd) {
        setPasswordStrength(0);
        return;
    }
    if (pwd.length > 5) score++;
    if (reqs.length) score++;
    if (reqs.uppercase) score++;
    if (reqs.special) score++;
    setPasswordStrength(score);
  }, [formData.password]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (pwd: string) => {
    if (!requirements.length) return t({ en: 'Minimum 8 characters required', fr: 'Minimum 8 caractères requis' });
    if (!requirements.uppercase) return t({ en: 'Uppercase letter required', fr: 'Majuscule requise' });
    if (!requirements.special) return t({ en: 'Number or special char required', fr: 'Chiffre ou caractère spécial requis' });
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: {email?: string; password?: string} = {};
    
    if (!validateEmail(formData.email)) {
        newErrors.email = t({ en: 'Invalid email format', fr: 'Format d\'email invalide' });
    }

    const pwdError = validatePassword(formData.password);
    if (pwdError) {
        newErrors.password = pwdError;
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setPage('login');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative pt-24 pb-20">
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px]" />
       </div>

       <div className="glass w-full max-w-lg p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden animate-window-pop z-10">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-white to-brand-accent opacity-50" />
           
           <div className="text-center mb-10 space-y-2">
               <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900 dark:text-white">
                   {t({ en: 'Initialize Protocol', fr: 'Initialiser le Protocole' })}
               </h2>
               <p className="text-sm text-gray-600 dark:text-gray-300 font-antonio tracking-wide uppercase">
                   {t({ en: 'Create your operator identity to access the lab.', fr: 'Créez votre identité d\'opérateur pour accéder au laboratoire.' })}
               </p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-5">
               <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2 group">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:text-brand-accent transition-colors">
                           {t({ en: 'First Name', fr: 'Prénom' })}
                       </label>
                       <input 
                         type="text" 
                         name="firstName"
                         value={formData.firstName}
                         onChange={handleChange}
                         required
                         className="w-full bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-500/60 text-gray-900 dark:text-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] hover:bg-white/10 hover:border-white/30"
                         placeholder="Ada"
                       />
                   </div>
                   <div className="space-y-2 group">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:text-brand-accent transition-colors">
                           {t({ en: 'Last Name', fr: 'Nom' })}
                       </label>
                       <input 
                         type="text" 
                         name="lastName"
                         value={formData.lastName}
                         onChange={handleChange}
                         required
                         className="w-full bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-500/60 text-gray-900 dark:text-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] hover:bg-white/10 hover:border-white/30"
                         placeholder="Lovelace"
                       />
                   </div>
               </div>

               <div className="space-y-2 group">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:text-brand-accent transition-colors">
                       {t({ en: 'Organization / Unit', fr: 'Organisation / Unité' })}
                   </label>
                   <div className="relative">
                       <iconify-icon icon="ph:buildings-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                       <input 
                         type="text" 
                         name="organization"
                         value={formData.organization}
                         onChange={handleChange}
                         className="w-full bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-500/60 text-gray-900 dark:text-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] hover:bg-white/10 hover:border-white/30"
                         placeholder="Analytical Engine Corp"
                       />
                   </div>
               </div>

               <div className="space-y-2 group">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:text-brand-accent transition-colors">
                       {t({ en: 'Comms Address', fr: 'Adresse Comms' })}
                   </label>
                   <div className="relative">
                       <iconify-icon icon="ph:envelope-simple-bold" className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10 ${errors.email ? 'text-red-500' : 'text-gray-400'}`} />
                       <input 
                         type="email" 
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         required
                         className={`w-full bg-white/5 backdrop-blur-md border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-brand-accent'} rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-1 ${errors.email ? 'focus:ring-red-500/50' : 'focus:ring-brand-accent/50'} focus:bg-white/10 transition-all duration-300 placeholder:text-gray-500/60 text-gray-900 dark:text-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] hover:bg-white/10 hover:border-white/30`}
                         placeholder="ada@history.com"
                       />
                   </div>
                   {errors.email && (
                       <p className="text-[10px] text-red-500 font-bold tracking-wide uppercase mt-1 animate-pulse">
                           {errors.email}
                       </p>
                   )}
               </div>

               <div className="space-y-2 group">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:text-brand-accent transition-colors">
                       {t({ en: 'Security Key', fr: 'Clé de Sécurité' })}
                   </label>
                   <div className="relative">
                       <iconify-icon icon="ph:lock-key-bold" className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10 ${errors.password ? 'text-red-500' : 'text-gray-400'}`} />
                       
                       {/* Input Masking Overlay */}
                       <div className={`absolute inset-0 pl-12 pr-12 py-3 flex items-center pointer-events-none transition-opacity duration-300 ${isFocused && !formData.password ? 'opacity-40' : 'opacity-0'}`}>
                           <div className="flex gap-1.5 items-center">
                               {Array.from({ length: 8 }).map((_, i) => (
                                   <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                               ))}
                               <div className="flex gap-2 ml-4">
                                   <span className="text-[9px] font-bold uppercase tracking-widest border border-gray-500/30 px-1 rounded">A-Z</span>
                                   <span className="text-[9px] font-bold uppercase tracking-widest border border-gray-500/30 px-1 rounded">#/@</span>
                               </div>
                           </div>
                       </div>

                       <input 
                         type={showPassword ? "text" : "password"}
                         name="password"
                         value={formData.password}
                         onChange={handleChange}
                         onFocus={() => setIsFocused(true)}
                         onBlur={() => setIsFocused(false)}
                         required
                         className={`w-full bg-white/5 backdrop-blur-md border ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-brand-accent'} rounded-2xl pl-12 pr-12 py-3 text-sm focus:outline-none focus:ring-1 ${errors.password ? 'focus:ring-red-500/50' : 'focus:ring-brand-accent/50'} focus:bg-white/10 transition-all duration-300 placeholder:text-gray-500/60 text-gray-900 dark:text-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] hover:bg-white/10 hover:border-white/30`}
                         placeholder={!isFocused ? "••••••••••••" : ""}
                       />
                       
                       <button 
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-accent transition-colors focus:outline-none z-10"
                         aria-label={showPassword ? "Hide password" : "Show password"}
                       >
                         <iconify-icon icon={showPassword ? "ph:eye-slash-bold" : "ph:eye-bold"} width="20" />
                       </button>
                   </div>
                   
                   {/* Complexity Requirement Checklist (Visual Masking/Enforcement) */}
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                       <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all duration-300 ${requirements.length ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-white/5 border-white/5 text-gray-500'}`}>
                           <iconify-icon icon={requirements.length ? "ph:check-circle-fill" : "ph:circle-bold"} width="12" />
                           <span className="text-[8px] font-bold uppercase tracking-widest whitespace-nowrap">8+ Chars</span>
                       </div>
                       <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all duration-300 ${requirements.uppercase ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-white/5 border-white/5 text-gray-500'}`}>
                           <iconify-icon icon={requirements.uppercase ? "ph:check-circle-fill" : "ph:circle-bold"} width="12" />
                           <span className="text-[8px] font-bold uppercase tracking-widest whitespace-nowrap">Uppercase</span>
                       </div>
                       <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all duration-300 ${requirements.special ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-white/5 border-white/5 text-gray-500'}`}>
                           <iconify-icon icon={requirements.special ? "ph:check-circle-fill" : "ph:circle-bold"} width="12" />
                           <span className="text-[8px] font-bold uppercase tracking-widest whitespace-nowrap">Sym/Num</span>
                       </div>
                   </div>

                   {/* Password Strength Meter */}
                   <div className="flex gap-2 items-center mt-3">
                       {[1, 2, 3, 4].map((level) => (
                           <div 
                               key={level} 
                               className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                                   passwordStrength >= level 
                                       ? (passwordStrength < 3 ? 'bg-red-500' : (passwordStrength < 4 ? 'bg-yellow-500' : 'bg-green-500')) 
                                       : 'bg-black/10 dark:bg-white/10'
                               }`}
                           />
                       ))}
                       <span className={`text-[9px] uppercase font-bold transition-colors duration-300 ${
                           passwordStrength === 0 ? 'text-gray-400' : (passwordStrength < 3 ? 'text-red-500' : (passwordStrength < 4 ? 'text-yellow-500' : 'text-green-500'))
                       }`}>
                           {passwordStrength === 0 ? '---' : (passwordStrength < 2 ? 'Weak' : (passwordStrength < 4 ? 'Medium' : 'Strong'))}
                       </span>
                   </div>
                   
                   {errors.password && (
                       <p className="text-[10px] text-red-500 font-bold tracking-wide uppercase mt-1">
                           {errors.password}
                       </p>
                   )}
               </div>

               <div className="pt-4">
                   <button 
                     type="submit"
                     disabled={loading}
                     className="w-full bg-brand-accent text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-[0_20px_40px_-12px_rgba(163,163,163,0.5)] relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                       <span className={`relative z-10 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                           {t({ en: 'Register Operator', fr: 'Enregistrer Opérateur' })}
                           <iconify-icon icon="ph:check-bold" />
                       </span>
                       {loading && (
                           <div className="absolute inset-0 flex items-center justify-center">
                               <iconify-icon icon="ph:spinner-gap-bold" className="animate-spin text-xl text-black" />
                           </div>
                       )}
                   </button>
               </div>
           </form>

           <div className="mt-8 text-center">
               <p className="text-[10px] text-gray-600 dark:text-gray-400">
                   {t({ en: 'Already credentialed?', fr: 'Déjà accrédité ?' })}{' '}
                   <button onClick={() => setPage('login')} className="font-bold text-brand-accent hover:underline uppercase tracking-wider">
                       {t({ en: 'Access System', fr: 'Accéder au Système' })}
                   </button>
               </p>
           </div>
       </div>
    </div>
  );
};

export default Signup;
