import React, { useState } from 'react';
import { UserStats } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  stats,
  onUpdateStats,
}) => {
  const [goalHours, setGoalHours] = useState(stats.studiedGoalHours);
  const [retentionTarget, setRetentionTarget] = useState(90);

  if (!isOpen) return null;

  const weekDays = [
    { day: 'M', date: 'Oct 17', active: true },
    { day: 'T', date: 'Oct 18', active: true },
    { day: 'W', date: 'Oct 19', active: true },
    { day: 'T', date: 'Oct 20', active: true },
    { day: 'F', date: 'Oct 21', active: true },
    { day: 'S', date: 'Oct 22', active: true },
    { day: 'S', date: 'Oct 23', active: true, today: true },
  ];

  const handleSave = () => {
    onUpdateStats({ studiedGoalHours: goalHours });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-surface-container flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-3">
            <img
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/30"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJqXHKHWMQrJXBAZDmhYlExUthwyHV14pTqdJbwArr9WNODHtJj4tz1-1XhKe4y75JyRo4E51FDksq-9CNpMPQgSPY1vpp4ZrJUpjxXqwsq3cJVxCBukwqIL_NGYA8r5bVHl6Pc-0b42JIijN309mC-K9O4O5Xn5k3p_bHtVW7idksoF1pYE6cm75NA2prnd6dqCmqHPTq03LHoLlH6fyWnhmyGxzZUD1ITPQvHpro2ZjlLEP8yPF_"
            />
            <div>
              <h3 className="font-headline font-bold text-base text-on-surface">
                {stats.name}
              </h3>
              <p className="text-xs text-on-surface-variant font-mono">{stats.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Streak tracker */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-tertiary-fixed/30 to-tertiary-fixed/10 border border-tertiary-fixed/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">🔥</span>
                <span className="font-headline font-bold text-sm text-on-tertiary-fixed">
                  {stats.streakDays} Day Study Streak
                </span>
              </div>
              <span className="text-xs font-headline font-semibold text-tertiary">
                Top 5% Consistency
              </span>
            </div>
            <div className="grid grid-cols-7 gap-1 pt-1">
              {weekDays.map((d, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-headline ${
                      d.active
                        ? 'bg-tertiary text-on-tertiary'
                        : 'bg-surface-variant text-on-surface-variant'
                    } ${d.today ? 'ring-2 ring-primary ring-offset-1' : ''}`}
                  >
                    ✓
                  </div>
                  <span className="text-[10px] font-headline text-on-surface-variant mt-1 font-semibold">
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Velocity Score Card */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-headline font-semibold text-on-surface-variant uppercase tracking-wider">
                Velocity Score
              </span>
              <span className="text-lg font-headline font-extrabold text-primary">
                {stats.velocityScore} <span className="text-xs font-normal text-on-surface-variant">pts</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-surface-container p-2 rounded-lg">
                <div className="text-[10px] text-on-surface-variant">Accuracy</div>
                <div className="text-xs font-bold font-headline text-on-surface">+320 pts</div>
              </div>
              <div className="bg-surface-container p-2 rounded-lg">
                <div className="text-[10px] text-on-surface-variant">Consistency</div>
                <div className="text-xs font-bold font-headline text-on-surface">+280 pts</div>
              </div>
              <div className="bg-surface-container p-2 rounded-lg">
                <div className="text-[10px] text-on-surface-variant">Retention</div>
                <div className="text-xs font-bold font-headline text-on-surface">+250 pts</div>
              </div>
            </div>
          </div>

          {/* Daily Goal Setting */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-headline">
              <label className="font-semibold text-on-surface">Daily Study Target</label>
              <span className="font-bold text-primary">{goalHours.toFixed(1)} hrs / day</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="6.0"
              step="0.5"
              value={goalHours}
              onChange={(e) => setGoalHours(parseFloat(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-on-surface-variant">
              <span>1.0 hr</span>
              <span>3.0 hrs (Recommended)</span>
              <span>6.0 hrs</span>
            </div>
          </div>

          {/* AI Retention Calibration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-headline">
              <label className="font-semibold text-on-surface">Target Retention Percentile</label>
              <span className="font-bold text-secondary">{retentionTarget}th Percentile</span>
            </div>
            <input
              type="range"
              min="75"
              max="99"
              step="1"
              value={retentionTarget}
              onChange={(e) => setRetentionTarget(parseInt(e.target.value, 10))}
              className="w-full accent-secondary cursor-pointer"
            />
            <p className="text-[11px] text-on-surface-variant">
              Higher targets calibrate spaced repetition intervals more aggressively before exams.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-surface-container bg-surface-container-low flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-headline font-semibold text-on-surface-variant hover:text-on-surface"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-primary text-on-primary font-headline text-xs font-semibold hover:bg-primary-container active:scale-95"
          >
            Save Goals
          </button>
        </div>
      </div>
    </div>
  );
};
