import React, { useState } from 'react';

interface HeaderProps {
  currentTab: string;
  streakDays: number;
  onOpenProfile: () => void;
  onOpenStreak: () => void;
  onSelectTab: (tab: 'home' | 'ai-tutor' | 'smart-notes' | 'planner') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  streakDays,
  onOpenProfile,
  onOpenStreak,
  onSelectTab,
}) => {
  const [logoError, setLogoError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const tabLabels: Record<string, string> = {
    home: 'Home',
    'ai-tutor': 'AI Tutor',
    'smart-notes': 'Smart Notes',
    planner: 'Planner',
  };

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-surface/85 backdrop-blur-xl border-b border-surface-container shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between">
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1 -ml-1 transition-transform active:scale-98"
        >
          {!logoError ? (
            <img
              alt="SmartStudy AI Logo"
              className="h-8 w-8 object-contain rounded-lg shadow-xs"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WYOJpk_1Kfy46mQCFFPUJAUenLMceycOJJFNRPOmCtIBkhdM1z29Y0-uPJzDBhUpn6qrx3qbvFenT3ByPsEpSJb3Yjgos3s5knsMZn4WvhU-x_Z9yd1RaFKN2xho3KvAzuA7zUabI6tyiCpWzmUHJXiT-hbzSvp2rq4iT25BCwRaGUV3pYI8cRnjC8tOFG9dkRslApPDvo-Vj4p3VmPXZUtDf9pD-12GXhAUkd6tDl0Y-KM3dLFeGawUU"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-headline font-bold text-lg text-primary tracking-tight leading-none">
              SmartStudy AI
            </span>
            <span className="font-headline text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mt-0.5">
              {tabLabels[currentTab] || 'Home'}
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {/* Streak pill button */}
          <button
            onClick={onOpenStreak}
            title="View 7-day study streak"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed/30 hover:bg-tertiary-fixed/50 active:scale-95 text-tertiary-container shadow-xs transition-all border border-tertiary-fixed/50"
            type="button"
          >
            <span className="text-xs leading-none">🔥</span>
            <span className="font-headline text-xs text-on-tertiary-fixed font-bold tracking-tight">
              {streakDays} Days
            </span>
          </button>

          {/* Profile Avatar button */}
          <button
            onClick={onOpenProfile}
            aria-label="Profile and Settings"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            type="button"
          >
            {!avatarError ? (
              <img
                alt="Profile Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJqXHKHWMQrJXBAZDmhYlExUthwyHV14pTqdJbwArr9WNODHtJj4tz1-1XhKe4y75JyRo4E51FDksq-9CNpMPQgSPY1vpp4ZrJUpjxXqwsq3cJVxCBukwqIL_NGYA8r5bVHl6Pc-0b42JIijN309mC-K9O4O5Xn5k3p_bHtVW7idksoF1pYE6cm75NA2prnd6dqCmqHPTq03LHoLlH6fyWnhmyGxzZUD1ITPQvHpro2ZjlLEP8yPF_"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                A
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
