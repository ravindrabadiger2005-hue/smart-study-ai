import React, { useState } from 'react';
import { Deck, ScheduleItem, StudyModule, UserStats } from '../types';

interface HomeScreenProps {
  stats: UserStats;
  schedule: ScheduleItem[];
  decks: Deck[];
  modules: StudyModule[];
  onOpenMicroQuiz: (topic?: string) => void;
  onOpenDeck: (deck: Deck) => void;
  onOpenScanNotes: () => void;
  onOpenSchedule: () => void;
  onOpenExamPath: () => void;
  onOpenAITutorWithPrompt: (prompt: string) => void;
  onSwitchTab: (tab: 'home' | 'ai-tutor' | 'smart-notes' | 'planner') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  stats,
  schedule,
  decks,
  modules,
  onOpenMicroQuiz,
  onOpenDeck,
  onOpenScanNotes,
  onOpenSchedule,
  onOpenExamPath,
  onOpenAITutorWithPrompt,
  onSwitchTab,
}) => {
  const [snoozedWeakSpot, setSnoozedWeakSpot] = useState(false);
  const [quickActionCustomized, setQuickActionCustomized] = useState(false);

  const completedModulesCount = modules.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedModulesCount / modules.length) * 100);

  // Radial calculation (radius 40, circumference 2 * pi * 40 = 251.327)
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (stats.overallGoalPercent / 100) * circumference;

  return (
    <div className="flex flex-col w-full pb-8 space-y-6 max-w-4xl mx-auto">
      {/* Greeting & Daily Progress Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3e2ade] via-[#584bf6] to-[#4e3fec] p-6 text-on-primary shadow-xl mt-1">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-surface-container-highest/20 blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-on-primary/15 backdrop-blur-md mb-2">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
              <span className="font-headline text-[10px] text-on-primary tracking-wide uppercase font-bold">
                AI Adaptive Sync
              </span>
            </div>

            <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-on-primary tracking-tight">
              Hey {stats.name}{' '}
              <span className="inline-block hover:rotate-12 transition-transform cursor-pointer">
                👋
              </span>
            </h1>

            <p className="text-sm text-on-primary-container mt-1 line-clamp-1 opacity-90">
              Ready to conquer Organic Chem?
            </p>

            <div className="flex items-center gap-4 mt-4 pt-1">
              <div className="flex flex-col">
                <span className="font-headline text-[22px] leading-6 font-bold text-on-primary">
                  {stats.studiedTodayHours.toFixed(1)}
                  <span className="text-xs text-on-primary-container ml-0.5 font-normal">hrs</span>
                </span>
                <span className="text-[11px] text-on-primary-container/80">Studied today</span>
              </div>

              <div className="h-7 w-px bg-on-primary/20"></div>

              <div className="flex flex-col">
                <span className="font-headline text-[22px] leading-6 font-bold text-secondary-fixed">
                  {stats.velocityScore}
                  <span className="text-xs text-on-primary-container ml-0.5 font-normal">pts</span>
                </span>
                <span className="text-[11px] text-on-primary-container/80">Velocity Score</span>
              </div>
            </div>
          </div>

          {/* Radial Progress Gauge (78%) */}
          <div className="relative flex-shrink-0 flex items-center justify-center w-24 h-24">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                className="text-on-primary/20 fill-none"
                cx="50"
                cy="50"
                r={radius}
                stroke="currentColor"
                strokeWidth="9"
              />
              <circle
                className="text-secondary-fixed-dim fill-none transition-all duration-1000 ease-out"
                cx="50"
                cy="50"
                r={radius}
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="9"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-headline text-lg font-extrabold text-on-primary leading-none">
                {stats.overallGoalPercent}%
              </span>
              <span className="font-headline text-[10px] text-on-primary-container tracking-tighter uppercase mt-0.5 font-bold">
                Goal
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Shortcuts */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-2 px-0.5">
          <span className="font-headline text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            Quick Actions
          </span>
          <button
            onClick={() => setQuickActionCustomized(!quickActionCustomized)}
            className="text-xs text-primary font-medium hover:underline focus:outline-none"
          >
            {quickActionCustomized ? 'Done' : 'Customize'}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          <button
            onClick={() => onSwitchTab('ai-tutor')}
            className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container active:scale-95 transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            type="button"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shadow-xs mb-1.5">
              <span className="material-symbols-outlined text-[24px]">smart_toy</span>
            </div>
            <span className="font-headline text-xs font-semibold text-on-surface truncate w-full">
              Ask AI
            </span>
          </button>

          <button
            onClick={onOpenScanNotes}
            className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container active:scale-95 transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            type="button"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors shadow-xs mb-1.5">
              <span className="material-symbols-outlined text-[24px]">document_scanner</span>
            </div>
            <span className="font-headline text-xs font-semibold text-on-surface truncate w-full">
              Scan Notes
            </span>
          </button>

          <button
            onClick={() => onOpenMicroQuiz('Instant STEM Challenge')}
            className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container active:scale-95 transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            type="button"
          >
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed-dim/30 flex items-center justify-center text-tertiary-container group-hover:bg-tertiary-container group-hover:text-on-tertiary transition-colors shadow-xs mb-1.5">
              <span className="material-symbols-outlined text-[24px]">bolt</span>
            </div>
            <span className="font-headline text-xs font-semibold text-on-surface truncate w-full">
              Instant Quiz
            </span>
          </button>

          <button
            onClick={onOpenSchedule}
            className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container active:scale-95 transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            type="button"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary transition-colors shadow-xs mb-1.5">
              <span className="material-symbols-outlined text-[24px]">calendar_add_on</span>
            </div>
            <span className="font-headline text-xs font-semibold text-on-surface truncate w-full">
              Schedule
            </span>
          </button>
        </div>
      </section>

      {/* AI Learning Insights */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-primary text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <h2 className="font-headline text-lg font-bold text-on-surface">
              Personalized For You
            </h2>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">Live Audit</span>
        </div>

        {/* Weak Spot Attention Card */}
        {!snoozedWeakSpot ? (
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all border border-surface-container">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-headline text-[11px] font-bold uppercase tracking-wider">
                  Critical Gap
                </span>
                <span className="text-xs text-on-surface-variant font-medium">Cellular Energy</span>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded-full">
                <span className="font-headline text-xs text-error font-bold">
                  {stats.criticalGapMastery}%
                </span>
                <span className="text-[10px] text-on-surface-variant uppercase font-semibold">
                  Mastery
                </span>
              </div>
            </div>

            <div className="mt-2.5">
              <h3 className="font-headline text-sm font-bold text-on-surface">
                Identified Weak Spot: Krebs Cycle &amp; ATP Synthase
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                You missed 4 of 6 questions on substrate-level phosphorylation during yesterday's deck.
              </p>
            </div>

            <div className="mt-4 pt-1 flex items-center justify-between gap-3">
              <button
                onClick={() => onOpenMicroQuiz('Krebs Cycle & ATP Synthase')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container active:scale-[0.98] text-on-primary font-headline text-xs font-semibold transition-all shadow-xs"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>Start 5-min Micro-Quiz</span>
              </button>
              <button
                onClick={() => setSnoozedWeakSpot(true)}
                title="Snooze insight for 24 hours"
                aria-label="Dismiss insight"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">snooze</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between text-xs text-on-surface-variant">
            <span>Weak spot audit snoozed for 24 hours.</span>
            <button
              onClick={() => setSnoozedWeakSpot(false)}
              className="text-primary font-bold hover:underline"
            >
              Restore
            </button>
          </div>
        )}

        {/* Predictive Exam Alert */}
        <div
          onClick={onOpenExamPath}
          className="rounded-2xl bg-gradient-to-r from-surface-container-low to-surface-container p-4 shadow-xs border border-surface-container cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-tertiary">
              <span className="material-symbols-outlined text-[20px]">event_upcoming</span>
              <span className="font-headline text-[11px] font-bold uppercase tracking-wider">
                Predictive Exam Alert
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-headline text-xs font-bold">
              4 Days Left
            </span>
          </div>

          <div className="mt-2.5 flex items-start justify-between gap-2">
            <div>
              <h3 className="font-headline text-sm font-bold text-on-surface">
                Midterm in 4 days: Organic Chemistry II
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                AI Study Path calibrated: {modules.length - completedModulesCount} modules remain for targeted 90th percentile retention.
              </p>
            </div>
          </div>

          <div className="mt-3.5">
            <div className="flex items-center justify-between text-xs font-headline mb-1.5">
              <span className="text-on-surface font-semibold">Study Path Completion</span>
              <span className="text-primary font-bold">
                {completedModulesCount} / {modules.length} Modules
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-surface-variant overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Focus Schedule Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">schedule</span>
            <h2 className="font-headline text-lg font-bold text-on-surface">
              Today's Focus Schedule
            </h2>
          </div>
          <button
            onClick={() => onSwitchTab('planner')}
            className="text-xs text-secondary font-bold hover:underline"
          >
            Full View
          </button>
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-xs border border-surface-container space-y-4">
          {schedule.slice(0, 2).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSwitchTab('planner')}
              className="flex items-start gap-3 group cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-headline text-xs font-bold transition-colors ${
                    item.status === 'Up Next'
                      ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant group-hover:bg-surface-tint group-hover:text-on-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                </div>
                {idx === 0 && <div className="w-0.5 h-8 bg-surface-variant my-1"></div>}
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-headline text-xs font-bold ${
                      item.status === 'Up Next' ? 'text-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {item.time} · {item.duration}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full font-headline text-[11px] font-semibold ${
                      item.status === 'Up Next'
                        ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                        : 'bg-surface-variant text-on-surface-variant'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <h4 className="font-headline text-sm text-on-surface font-semibold mt-0.5 truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-on-surface-variant truncate">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subject Quick-Decks Carousel */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">style</span>
            <h2 className="font-headline text-lg font-bold text-on-surface">
              Subject Quick-Decks
            </h2>
          </div>
          <span className="text-xs text-on-surface-variant">{decks.length} Active</span>
        </div>

        {/* Horizontal scroll track */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar snap-x snap-mandatory">
          {decks.map((deck) => (
            <div
              key={deck.id}
              onClick={() => onOpenDeck(deck)}
              className="snap-start flex-shrink-0 w-64 rounded-2xl bg-surface-container-lowest p-4 shadow-xs hover:shadow-md transition-all border border-surface-container cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded-full font-headline text-[11px] font-bold ${deck.badgeBg}`}>
                    {deck.code}
                  </span>
                  <span className="font-headline text-xs font-bold text-primary">
                    {deck.masteryPercent}%
                  </span>
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface">{deck.title}</h3>
                <p className="text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                  {deck.description}
                </p>
              </div>

              <div className="mt-4 pt-1 flex items-center justify-between">
                <span className="text-xs text-on-surface-variant">{deck.cardsCount} Cards</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDeck(deck);
                  }}
                  className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors active:scale-95"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive AI Tutor Prompt Float Hook */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-high p-4 flex items-center justify-between gap-3 shadow-xs border border-surface-container">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[20px]">psychology</span>
          </div>
          <div className="min-w-0">
            <p className="font-headline text-xs font-bold text-on-surface truncate">
              Stuck on stereochemistry?
            </p>
            <p className="text-xs text-on-surface-variant truncate">Drop a diagram or question here</p>
          </div>
        </div>

        <button
          onClick={() =>
            onOpenAITutorWithPrompt(
              'Can you explain how to determine (R) versus (S) configuration on stereocenters with a step-by-step example and priority assignment?'
            )
          }
          className="flex-shrink-0 px-3.5 py-2 rounded-xl bg-primary text-on-primary font-headline text-xs font-bold hover:bg-primary-container active:scale-95 transition-all shadow-xs"
          type="button"
        >
          Ask Now
        </button>
      </div>
    </div>
  );
};
