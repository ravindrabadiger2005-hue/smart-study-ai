import React, { useState } from 'react';
import { SmartNote } from '../types';

interface SmartNotesScreenProps {
  notes: SmartNote[];
  onOpenScanNotes: () => void;
  onAskAIAboutNote: (topic: string) => void;
}

export const SmartNotesScreen: React.FC<SmartNotesScreenProps> = ({
  notes,
  onOpenScanNotes,
  onAskAIAboutNote,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0]?.id || '');

  const subjects = ['All', 'Organic Chemistry II', 'Cellular Biology', 'Physics & Dynamics'];

  const filteredNotes = selectedSubject === 'All'
    ? notes
    : notes.filter((n) => n.subject === selectedSubject);

  const activeNote = notes.find((n) => n.id === activeNoteId) || filteredNotes[0];

  return (
    <div className="flex flex-col w-full pb-8 space-y-4 max-w-4xl mx-auto">
      {/* Top Banner & Scan trigger */}
      <div className="flex items-center justify-between gap-3 bg-surface-container-low border border-surface-container rounded-2xl p-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <h2 className="font-headline font-bold text-lg text-on-surface">
              Smart Cornell Notebook
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Auto-synthesized key takeaways, cues, and exam traps
          </p>
        </div>

        <button
          onClick={onOpenScanNotes}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container active:scale-95 font-headline text-xs font-semibold transition-all shadow-xs flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_notes</span>
          <span>Scan / Add Notes</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {subjects.map((subj) => (
          <button
            key={subj}
            onClick={() => {
              setSelectedSubject(subj);
              const first = subj === 'All' ? notes[0] : notes.find((n) => n.subject === subj);
              if (first) setActiveNoteId(first.id);
            }}
            className={`px-3 py-1.5 rounded-xl font-headline text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSubject === subj
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* Note Selector Strip if multiple notes */}
      {filteredNotes.length > 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {filteredNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`text-left p-3 rounded-xl border transition-all ${
                activeNote?.id === note.id
                  ? 'bg-surface-container-lowest border-primary shadow-xs ring-1 ring-primary'
                  : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className="font-bold text-primary">{note.courseCode}</span>
                <span className="text-on-surface-variant">{note.date}</span>
              </div>
              <h4 className="font-headline text-xs font-bold text-on-surface line-clamp-1">
                {note.title}
              </h4>
            </button>
          ))}
        </div>
      )}

      {/* Cornell Note Layout View */}
      {activeNote ? (
        <div className="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-xs overflow-hidden">
          {/* Note Top Bar */}
          <div className="px-5 py-3.5 bg-surface-container-low border-b border-surface-container flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-headline bg-primary/10 text-primary">
                  {activeNote.courseCode}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">
                  {activeNote.date}
                </span>
              </div>
              <h3 className="font-headline font-bold text-base text-on-surface mt-1">
                {activeNote.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onAskAIAboutNote(`Explain this topic from my notes: ${activeNote.title}`)}
                className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-headline text-xs font-semibold transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                <span>Ask AI</span>
              </button>
            </div>
          </div>

          {/* Cornell Two-Column Area */}
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-surface-container">
            {/* Left Cue Column */}
            <div className="p-4 bg-surface-container-low/50 md:col-span-1 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant font-headline block">
                Recall Cues &amp; Terms
              </span>
              <div className="flex flex-wrap md:flex-col gap-1.5">
                {activeNote.cues.map((cue, i) => (
                  <span
                    key={i}
                    className="inline-block px-2 py-1 rounded-lg bg-surface-container-lowest border border-surface-container text-xs font-headline font-semibold text-primary"
                  >
                    {cue}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-surface-container">
                <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant font-headline block mb-1">
                  Flashcard Prompts
                </span>
                <span className="text-xs text-on-surface-variant">
                  {activeNote.flashcards.length} cards generated from these notes.
                </span>
              </div>
            </div>

            {/* Right Main Notes Column */}
            <div className="p-5 md:col-span-3 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-primary font-headline block mb-1">
                  Synthesized Summary
                </span>
                <p className="text-xs leading-relaxed text-on-surface">
                  {activeNote.summary}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-secondary font-headline block mb-1.5">
                  Core Principles &amp; Derivations
                </span>
                <ul className="space-y-1.5 text-xs text-on-surface-variant">
                  {activeNote.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-secondary font-bold text-sm leading-none mt-0.5">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exam Trap Alert Callout */}
              <div className="p-3.5 rounded-xl bg-error-container/40 border border-error/20 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-error text-[18px] flex-shrink-0 mt-0.5">
                  warning
                </span>
                <div>
                  <span className="text-xs font-headline font-bold text-error">
                    Exam Trap Alert
                  </span>
                  <p className="text-xs text-on-error-container mt-0.5 leading-relaxed">
                    {activeNote.examTrap}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-on-surface-variant">
          No notes found for this subject. Tap "Scan / Add Notes" to create one!
        </div>
      )}
    </div>
  );
};
