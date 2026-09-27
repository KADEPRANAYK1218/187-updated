import React, { useState } from 'react';
import { Shield, Key, UserPlus, Lock, MapPin, Sun, Moon } from 'lucide-react';
import { VajraLogo } from '../branding/VajraLogo';
import { ExistingOfficerLogin } from './ExistingOfficerLogin';
import { NewOfficerRegistration } from './NewOfficerRegistration';
import { UserAccount } from '../../types';
import { useSettings } from '../../context/SettingsContext';

interface LoginCardProps {
  onCredentialsVerified: (
    user: UserAccount,
    factorStatus: {
      serviceId: boolean;
      service: boolean;
      rank: boolean;
      password: boolean;
      pin: boolean;
    }
  ) => void;
  onAuthenticationFailed: (
    failedFactors: {
      serviceId: boolean;
      service: boolean;
      rank: boolean;
      password: boolean;
      pin: boolean;
    },
    reason: string
  ) => void;
}

export const LoginCard: React.FC<LoginCardProps> = ({
  onCredentialsVerified,
  onAuthenticationFailed
}) => {
  const [activeTab, setActiveTab] = useState<'EXISTING' | 'REGISTER'>('EXISTING');
  const [prefilledServiceId, setPrefilledServiceId] = useState<string>('');
  const { theme, setTheme } = useSettings();
  const isLight = theme === 'Light';

  const handleRegistrationSuccess = (newServiceId: string) => {
    setPrefilledServiceId(newServiceId);
    setActiveTab('EXISTING');
  };

  return (
    <div
      className={`vajra-panel-elevated relative z-10 max-w-md md:max-w-lg w-full rounded-2xl p-5 sm:p-7 border ${
        isLight
          ? 'bg-white border-slate-300 shadow-2xl text-slate-900'
          : 'bg-slate-950/80 border-cyan-500/35 shadow-2xl text-slate-100'
      } backdrop-blur-xl transition-all duration-300`}
      id="vajra-auth-card"
    >
      {/* Top Atmospheric Indian Glow Strip */}
      <div className="absolute -top-px left-8 right-8 h-1 bg-gradient-to-r from-amber-500 via-white to-emerald-500 rounded-full shadow-lg" />

      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
        <VajraLogo size="lg" showSubtitle={true} animated={false} />

        <div className={`mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full ${
          isLight 
            ? 'bg-cyan-50 border border-cyan-300 text-cyan-950 font-bold shadow-xs' 
            : 'bg-cyan-950/80 border border-cyan-500/30 text-cyan-300'
        } text-[10px] sm:text-[11px] font-tech tracking-wider shadow-sm`}>
          <Lock className={`w-3 h-3 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
          <span>AUTHORIZED PERSONNEL ACCESS ONLY</span>
        </div>
      </div>

      {/* Tabs: EXISTING OFFICER / NEW REGISTRATION */}
      <div className={`grid grid-cols-2 gap-2 p-1.5 rounded-xl ${
        isLight ? 'bg-slate-100 border border-slate-300' : 'bg-slate-950/80 border border-cyan-500/20'
      } mb-6`}>
        <button
          type="button"
          onClick={() => setActiveTab('EXISTING')}
          className={`py-2.5 px-4 rounded-lg text-xs font-tech font-bold tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'EXISTING'
              ? 'bg-gradient-to-r from-cyan-600 to-indigo-700 text-white shadow-md shadow-cyan-500/25 border border-cyan-400/40'
              : isLight
              ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-200'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
          id="tab-existing-officer"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>EXISTING OFFICER</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('REGISTER')}
          className={`py-2.5 px-4 rounded-lg text-xs font-tech font-bold tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'REGISTER'
              ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-md shadow-amber-500/25 border border-amber-400/40'
              : isLight
              ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-200'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
          id="tab-new-registration"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>NEW REGISTRATION</span>
        </button>
      </div>

      {/* Form View Body */}
      {activeTab === 'EXISTING' ? (
        <ExistingOfficerLogin
          initialServiceId={prefilledServiceId}
          onCredentialsVerified={onCredentialsVerified}
          onAuthenticationFailed={onAuthenticationFailed}
        />
      ) : (
        <NewOfficerRegistration onRegistrationSuccess={handleRegistrationSuccess} />
      )}

    </div>
  );
};
