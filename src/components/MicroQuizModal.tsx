import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';

interface MicroQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic?: string;
  onQuizComplete: (score: number, total: number) => void;
}

export const MicroQuizModal: React.FC<MicroQuizModalProps> = ({
  isOpen,
  onClose,
  topic = 'Krebs Cycle & ATP Synthase',
  onQuizComplete,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(300); // 5 mins

  useEffect(() => {
    if (!isOpen) return;

    // Reset state
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
    setSecondsRemaining(300);
    setIsLoading(true);

    fetch('/api/ai/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, count: 5 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
        }
      })
      .catch((err) => {
        console.error('Failed to load quiz questions:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isOpen, topic]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || isCompleted || isLoading) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isCompleted, isLoading]);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      onQuizComplete(score + (selectedOption === currentQ.correctIndex ? 0 : 0), questions.length);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-surface-container flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-on-primary">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-base text-on-surface">
                  5-min Micro-Quiz
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-error-container text-on-error-container">
                  Weak Spot Audit
                </span>
              </div>
              <p className="text-xs text-on-surface-variant line-clamp-1">{topic}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 font-mono text-xs font-semibold px-2 py-1 rounded-md bg-surface-container text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-tertiary">timer</span>
              <span>{formatTime(secondsRemaining)}</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container active:scale-95 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="font-headline font-semibold text-sm text-on-surface">
                Calibrating targeted micro-quiz with AI...
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                Targeting substrate-level phosphorylation and ATP synthesis gaps
              </p>
            </div>
          ) : isCompleted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary-container/20 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">verified</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-xl text-on-surface">
                  Micro-Quiz Complete!
                </h4>
                <p className="text-sm text-on-surface-variant mt-1">
                  You scored <span className="font-bold text-primary">{score} / {questions.length}</span> correct
                </p>
              </div>

              {/* Mastery improvement display */}
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container text-left space-y-2">
                <div className="flex items-center justify-between text-xs font-headline">
                  <span className="text-on-surface-variant">Mastery Update</span>
                  <span className="text-primary font-bold">
                    42% → {Math.min(95, 42 + Math.round((score / questions.length) * 45))}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-variant overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(95, 42 + Math.round((score / questions.length) * 45))}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1">
                  <span>Velocity Score Boost: <strong className="text-secondary-fixed-variant font-bold">+{score * 15 + 20} pts</strong></span>
                  <span className="text-tertiary font-bold">🔥 7-Day Streak Active</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container active:scale-95 text-on-primary font-headline text-sm font-semibold transition-all shadow-md"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : currentQ ? (
            <div className="space-y-4">
              {/* Question count & progress bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-headline mb-1.5">
                  <span className="text-on-surface-variant font-medium">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="font-bold text-primary">
                    Score: {score}/{currentIndex + (isAnswered ? 1 : 0)}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-variant overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question text */}
              <h4 className="font-headline font-semibold text-base text-on-surface leading-snug">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5 pt-1">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'bg-surface-container-low hover:bg-surface-container text-on-surface border-surface-container';
                  let icon = <span className="w-5 h-5 rounded-full border border-outline flex items-center justify-center text-[10px] font-bold text-on-surface-variant">{String.fromCharCode(65 + idx)}</span>;

                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold';
                      icon = <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>;
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-error-container/50 border-error text-on-error-container font-semibold';
                      icon = <span className="material-symbols-outlined text-error text-[18px]">cancel</span>;
                    } else {
                      btnStyle = 'opacity-50 border-surface-container bg-surface-container-low';
                    }
                  } else if (selectedOption === idx) {
                    btnStyle = 'border-primary bg-primary/10 text-primary font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 active:scale-98 ${btnStyle}`}
                      type="button"
                    >
                      <div className="flex-shrink-0 mt-0.5">{icon}</div>
                      <span className="text-sm leading-relaxed flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation card upon answering */}
              {isAnswered && (
                <div className="mt-4 p-3.5 rounded-xl bg-surface-container-high border border-surface-container text-xs text-on-surface space-y-1 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 font-headline font-bold text-primary">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>AI Concept Rationale</span>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Modal Footer Controls */}
        {!isLoading && !isCompleted && (
          <div className="px-5 py-3 border-t border-surface-container bg-surface-container-low flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">
              {isAnswered ? 'Review rationale before proceeding' : 'Tap an option to submit'}
            </span>
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`px-4 py-2 rounded-lg font-headline text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isAnswered
                  ? 'bg-primary text-on-primary hover:bg-primary-container active:scale-95 shadow-xs'
                  : 'bg-surface-variant text-on-surface-variant/50 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
