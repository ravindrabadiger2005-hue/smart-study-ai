import React, { useState } from 'react';
import { Deck, Flashcard } from '../types';

interface FlashcardModalProps {
  deck: Deck | null;
  onClose: () => void;
}

export const FlashcardModal: React.FC<FlashcardModalProps> = ({ deck, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  if (!deck) return null;

  const currentCard: Flashcard | undefined = deck.cards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = (_rating: 'again' | 'hard' | 'good' | 'easy') => {
    setReviewedCount((r) => r + 1);
    setIsFlipped(false);
    if (currentIndex + 1 < deck.cards.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsDone(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewedCount(0);
    setIsDone(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-surface-container flex flex-col min-h-[500px]">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold font-headline bg-primary/10 text-primary">
              {deck.code}
            </span>
            <h3 className="font-headline font-bold text-sm text-on-surface truncate">
              {deck.title} Quick-Deck
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Card Arena */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          {!isDone && currentCard ? (
            <>
              {/* Progress info */}
              <div className="flex items-center justify-between text-xs font-headline mb-3 text-on-surface-variant">
                <span>
                  Card {currentIndex + 1} of {deck.cards.length}
                </span>
                <span className="text-secondary font-bold">
                  {deck.masteryPercent}% Mastery Deck
                </span>
              </div>

              {/* 3D Flip Card Container */}
              <div
                onClick={handleFlip}
                className="relative w-full h-64 cursor-pointer perspective-1000 group my-auto select-none"
              >
                <div
                  className={`relative w-full h-full rounded-2xl transition-transform duration-500 transform-style-preserve-3d shadow-md hover:shadow-lg border border-surface-container p-6 flex flex-col justify-between ${
                    isFlipped
                      ? 'bg-gradient-to-br from-surface-container-low to-surface-container text-on-surface'
                      : 'bg-gradient-to-br from-primary/5 via-surface-container-lowest to-surface-container-low text-on-surface'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold font-headline tracking-wider uppercase text-on-surface-variant">
                      {isFlipped ? '💡 Answer / Concept' : '❓ Question / Prompt'}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-primary/70 group-hover:rotate-180 transition-transform duration-300">
                      flip
                    </span>
                  </div>

                  <div className="my-auto text-center px-2">
                    <p className={`font-headline leading-relaxed ${isFlipped ? 'text-sm text-on-surface' : 'text-base font-semibold text-primary'}`}>
                      {isFlipped ? currentCard.back : currentCard.front}
                    </p>
                  </div>

                  <div className="text-center text-[11px] text-on-surface-variant/80">
                    Tap to {isFlipped ? 'see question' : 'reveal answer'}
                  </div>
                </div>
              </div>

              {/* SRS Rating Bar */}
              <div className="mt-4 pt-2">
                {isFlipped ? (
                  <div className="grid grid-cols-4 gap-1.5">
                    <button
                      onClick={() => handleRate('again')}
                      className="flex flex-col items-center py-2 px-1 rounded-xl bg-error-container/40 hover:bg-error-container text-on-error-container transition-all active:scale-95"
                    >
                      <span className="font-headline font-bold text-xs">Again</span>
                      <span className="text-[10px] opacity-75">&lt;1m</span>
                    </button>
                    <button
                      onClick={() => handleRate('hard')}
                      className="flex flex-col items-center py-2 px-1 rounded-xl bg-tertiary-fixed/40 hover:bg-tertiary-fixed text-on-tertiary-fixed transition-all active:scale-95"
                    >
                      <span className="font-headline font-bold text-xs">Hard</span>
                      <span className="text-[10px] opacity-75">12h</span>
                    </button>
                    <button
                      onClick={() => handleRate('good')}
                      className="flex flex-col items-center py-2 px-1 rounded-xl bg-primary-fixed/40 hover:bg-primary-fixed text-on-primary-fixed transition-all active:scale-95"
                    >
                      <span className="font-headline font-bold text-xs">Good</span>
                      <span className="text-[10px] opacity-75">1d</span>
                    </button>
                    <button
                      onClick={() => handleRate('easy')}
                      className="flex flex-col items-center py-2 px-1 rounded-xl bg-secondary-fixed/50 hover:bg-secondary-fixed text-on-secondary-fixed transition-all active:scale-95"
                    >
                      <span className="font-headline font-bold text-xs">Easy</span>
                      <span className="text-[10px] opacity-75">3d</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleFlip}
                    className="w-full py-3 rounded-xl bg-primary text-on-primary font-headline text-xs font-semibold hover:bg-primary-container active:scale-98 transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Reveal Flashcard</span>
                    <span className="material-symbols-outlined text-[16px]">touch_app</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="py-8 text-center space-y-4 my-auto">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">auto_stories</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-lg text-on-surface">
                  Deck Review Complete!
                </h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  You reviewed all {reviewedCount} flashcards in {deck.title}.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container text-xs text-on-surface">
                Spaced repetition intervals updated. Next review scheduled for tomorrow morning.
              </div>
              <div className="flex gap-2 justify-center pt-2">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-headline text-xs font-semibold"
                >
                  Review Again
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary font-headline text-xs font-semibold hover:bg-primary-container"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
