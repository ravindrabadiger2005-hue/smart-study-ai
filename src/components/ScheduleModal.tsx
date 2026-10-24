import React, { useState } from 'react';
import { ScheduleItem } from '../types';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSession: (item: ScheduleItem) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onAddSession,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [time, setTime] = useState('3:30 PM');
  const [duration, setDuration] = useState('45 mins');
  const [subject, setSubject] = useState('Organic Chemistry II');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: ScheduleItem = {
      id: `sch-${Date.now()}`,
      time,
      duration,
      title: title.trim(),
      subtitle: subtitle.trim() || `${subject} focused review session`,
      status: 'Scheduled',
      icon: 'menu_book',
      subject,
    };

    onAddSession(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-surface-container flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">calendar_add_on</span>
            <h3 className="font-headline font-bold text-base text-on-surface">
              Schedule Study Session
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-headline font-semibold text-on-surface-variant block mb-1">
              Course / Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xs font-headline p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Organic Chemistry II">CHEM 240: Organic Chemistry II</option>
              <option value="Physics & Dynamics">PHYS 201: Physics &amp; Dynamics</option>
              <option value="Cellular Biology">BIO 110: Cellular Biology</option>
              <option value="Macroeconomics">ECON 102: Macroeconomics</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-headline font-semibold text-on-surface-variant block mb-1">
              Session Focus Topic
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Carbocation Rearrangements & 1,2-Shifts"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-xs font-headline font-semibold text-on-surface-variant block mb-1">
              Key Objectives (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Hydride vs methyl shift worked problems"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-headline font-semibold text-on-surface-variant block mb-1">
                Time
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g., 3:30 PM"
                className="w-full text-xs p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-headline font-semibold text-on-surface-variant block mb-1">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full text-xs font-headline p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="25 mins">25 mins (Pomodoro)</option>
                <option value="30 mins">30 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="60 mins">60 mins</option>
                <option value="90 mins">90 mins</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-headline font-semibold text-on-surface-variant hover:text-on-surface"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-on-primary font-headline text-xs font-semibold hover:bg-primary-container active:scale-95 shadow-xs"
            >
              Add to Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
