import React, { useState } from 'react';
import { ScheduleItem, StudyModule } from '../types';

interface PlannerScreenProps {
  schedule: ScheduleItem[];
  modules: StudyModule[];
  onOpenScheduleModal: () => void;
  onToggleScheduleItem: (id: string) => void;
  onToggleModule: (id: number) => void;
  onOpenExamRoadmap: () => void;
}

export const PlannerScreen: React.FC<PlannerScreenProps> = ({
  schedule,
  modules,
  onOpenScheduleModal,
  onToggleScheduleItem,
  onToggleModule,
  onOpenExamRoadmap,
}) => {
  const [activeView, setActiveView] = useState<'schedule' | 'modules'>('schedule');

  const completedModulesCount = modules.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedModulesCount / modules.length) * 100);

  const weeklyStudyHours = [
    { day: 'Mon', hours: 3.2, goal: 3.0 },
    { day: 'Tue', hours: 2.8, goal: 3.0 },
    { day: 'Wed', hours: 3.5, goal: 3.0 },
    { day: 'Thu', hours: 2.5, goal: 3.0, isToday: true },
    { day: 'Fri', hours: 0, goal: 3.0, projected: 3.0 },
    { day: 'Sat', hours: 0, goal: 4.0, projected: 4.0 },
    { day: 'Sun', hours: 0, goal: 4.0, projected: 4.0 },
  ];

  return (
    <div className="flex flex-col w-full pb-8 space-y-4 max-w-4xl mx-auto">
      {/* Predictive Exam Countdown strip */}
      <div className="bg-gradient-to-r from-surface-container-low to-surface-container border border-surface-container rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[22px]">event_upcoming</span>
            <div>
              <h3 className="font-headline font-bold text-sm text-on-surface">
                Adaptive Exam Calendar
              </h3>
              <p className="text-xs text-on-surface-variant">Calibrated for peak retention curves</p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-headline text-xs font-bold">
            4 Days Until Midterm
          </span>
        </div>

        {/* 3 Exam pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
          <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-tertiary/30">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-primary font-headline">CHEM 240 Midterm</span>
              <span className="text-error font-mono">4 Days</span>
            </div>
            <div className="text-[10px] text-on-surface-variant mt-0.5">8 modules remaining</div>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-secondary font-headline">PHYS 201 Lab Exam</span>
              <span className="text-on-surface font-mono">11 Days</span>
            </div>
            <div className="text-[10px] text-on-surface-variant mt-0.5">Torque &amp; Faraday coils</div>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-tertiary font-headline">ECON 102 Final</span>
              <span className="text-on-surface font-mono">24 Days</span>
            </div>
            <div className="text-[10px] text-on-surface-variant mt-0.5">Macro multiplier review</div>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-surface-container">
          <button
            onClick={() => setActiveView('schedule')}
            className={`px-3 py-1.5 rounded-lg font-headline text-xs font-semibold transition-all ${
              activeView === 'schedule'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Today's Focus Schedule
          </button>
          <button
            onClick={() => setActiveView('modules')}
            className={`px-3 py-1.5 rounded-lg font-headline text-xs font-semibold transition-all ${
              activeView === 'modules'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            22-Module Roadmap ({completedModulesCount}/22)
          </button>
        </div>

        {activeView === 'schedule' ? (
          <button
            onClick={onOpenScheduleModal}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-on-primary font-headline text-xs font-semibold hover:bg-primary-container active:scale-95 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add Session</span>
          </button>
        ) : (
          <button
            onClick={onOpenExamRoadmap}
            className="text-xs text-primary font-headline font-bold hover:underline"
          >
            Full Screen Roadmap
          </button>
        )}
      </div>

      {/* Content based on Active View */}
      {activeView === 'schedule' ? (
        <div className="space-y-4">
          {/* Schedule list */}
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container p-4 space-y-3">
            {schedule.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-colors border border-surface-container/60"
              >
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => onToggleScheduleItem(item.id)}
                    title={item.status === 'Completed' ? 'Mark active' : 'Mark completed'}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      item.status === 'Completed'
                        ? 'bg-emerald-600 text-white'
                        : item.status === 'Up Next'
                        ? 'bg-primary text-white'
                        : 'border border-outline text-on-surface-variant'
                    }`}
                  >
                    {item.status === 'Completed' ? (
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    ) : (
                      <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                    )}
                  </button>
                  {idx < schedule.length - 1 && (
                    <div className="w-0.5 h-6 bg-surface-variant my-1"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-headline font-bold text-primary">
                      {item.time} · {item.duration}
                    </span>
                    <span
                      className={`text-[10px] font-headline font-semibold px-2 py-0.5 rounded-full ${
                        item.status === 'Completed'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : item.status === 'Up Next'
                          ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                          : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h4 className={`text-xs font-headline font-bold mt-0.5 ${item.status === 'Completed' ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Velocity / Hours chart */}
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-headline font-bold text-on-surface">
                Weekly Study Time vs Target
              </span>
              <span className="text-xs font-mono text-secondary font-bold">
                12.0 / 23.0 hrs completed
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 items-end h-28 pt-2 px-2">
              {weeklyStudyHours.map((d, i) => {
                const max = 4.5;
                const hPercent = Math.min(100, (d.hours / max) * 100);
                return (
                  <div key={i} className="flex flex-col items-center h-full justify-end">
                    <div className="w-full max-w-[28px] bg-surface-variant rounded-t-lg h-20 flex items-end overflow-hidden">
                      <div
                        className={`w-full transition-all duration-500 rounded-t-lg ${
                          d.isToday
                            ? 'bg-primary'
                            : d.hours > 0
                            ? 'bg-secondary'
                            : 'bg-transparent'
                        }`}
                        style={{ height: `${hPercent}%` }}
                      ></div>
                    </div>
                    <span className={`text-[10px] font-headline mt-1.5 ${d.isToday ? 'font-bold text-primary' : 'text-on-surface-variant'}`}>
                      {d.day}
                    </span>
                    <span className="text-[9px] font-mono text-on-surface-variant">
                      {d.hours > 0 ? `${d.hours}h` : '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Modules Roadmap */
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-surface-container">
            <div className="flex items-center justify-between text-xs font-headline mb-1.5">
              <span className="font-semibold text-on-surface">Organic Chemistry II Syllabus Progress</span>
              <span className="font-bold text-primary">{progressPercent}% Calibrated</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-variant overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container p-4 space-y-2">
            {modules.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low border border-surface-container/50 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onToggleModule(m.id)}
                    className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                      m.completed ? 'bg-primary text-on-primary' : 'border border-outline'
                    }`}
                  >
                    {m.completed && <span className="material-symbols-outlined text-[14px]">check</span>}
                  </button>
                  <span className="font-mono text-[10px] text-on-surface-variant">
                    #{m.id < 10 ? `0${m.id}` : m.id}
                  </span>
                  <span className={`font-headline font-medium ${m.completed ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>
                    {m.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-on-surface-variant text-[11px]">
                  <span>{m.estimatedMinutes}m</span>
                  {m.retentionScore && (
                    <span className="font-mono font-bold text-secondary">{m.retentionScore}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
