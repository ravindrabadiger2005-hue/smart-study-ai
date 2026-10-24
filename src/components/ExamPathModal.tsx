import React from 'react';
import { StudyModule } from '../types';

interface ExamPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  modules: StudyModule[];
  onToggleModule: (id: number) => void;
  onLaunchStudy: (module: StudyModule) => void;
}

export const ExamPathModal: React.FC<ExamPathModalProps> = ({
  isOpen,
  onClose,
  modules,
  onToggleModule,
  onLaunchStudy,
}) => {
  if (!isOpen) return null;

  const completedCount = modules.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-surface-container flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">event_upcoming</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-base text-on-surface">
                  Organic Chemistry II Midterm
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                  4 Days Left
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                AI Calibrated Study Path: 90th Percentile Target
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Progress summary banner */}
        <div className="px-5 py-3.5 bg-surface-container/60 border-b border-surface-container">
          <div className="flex items-center justify-between text-xs font-headline mb-1.5">
            <span className="text-on-surface font-semibold">Study Path Completion</span>
            <span className="text-primary font-bold">
              {completedCount} / {modules.length} Modules ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-surface-variant overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-2">
            <span>{modules.length - completedCount} modules remain</span>
            <span>~4.5 hrs estimated prep time remaining</span>
          </div>
        </div>

        {/* Module Checklist */}
        <div className="p-5 overflow-y-auto flex-1 space-y-2">
          {modules.map((m) => (
            <div
              key={m.id}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                m.completed
                  ? 'bg-surface-container-low/60 border-surface-container text-on-surface-variant'
                  : 'bg-surface-container-lowest border-primary/20 shadow-xs text-on-surface'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => onToggleModule(m.id)}
                  title={m.completed ? 'Mark incomplete' : 'Mark completed'}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                    m.completed
                      ? 'bg-primary text-on-primary'
                      : 'border-2 border-outline hover:border-primary'
                  }`}
                >
                  {m.completed && <span className="material-symbols-outlined text-[16px]">check</span>}
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-on-surface-variant font-medium">
                      M{m.id < 10 ? `0${m.id}` : m.id}
                    </span>
                    <h5 className={`font-headline text-xs font-semibold truncate ${m.completed ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>
                      {m.title}
                    </h5>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-on-surface-variant mt-0.5">
                    <span>{m.estimatedMinutes} mins</span>
                    <span>·</span>
                    <span>Target: {m.targetDate}</span>
                    {m.retentionScore && (
                      <>
                        <span>·</span>
                        <span className="text-secondary font-bold font-mono">
                          {m.retentionScore}% retention
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {!m.completed ? (
                <button
                  onClick={() => {
                    onLaunchStudy(m);
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-on-primary font-headline text-[11px] font-semibold transition-colors flex-shrink-0"
                >
                  Review
                </button>
              ) : (
                <span className="text-[10px] text-emerald-600 font-headline font-semibold flex items-center gap-0.5 flex-shrink-0">
                  <span className="material-symbols-outlined text-[14px]">done_all</span>
                  Mastered
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-surface-container bg-surface-container-low flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-on-primary font-headline text-xs font-semibold hover:bg-primary-container active:scale-95"
          >
            Close Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};
