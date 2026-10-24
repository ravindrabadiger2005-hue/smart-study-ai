/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { AITutorScreen } from './components/AITutorScreen';
import { SmartNotesScreen } from './components/SmartNotesScreen';
import { PlannerScreen } from './components/PlannerScreen';
import { MicroQuizModal } from './components/MicroQuizModal';
import { FlashcardModal } from './components/FlashcardModal';
import { ScanNotesModal } from './components/ScanNotesModal';
import { ProfileModal } from './components/ProfileModal';
import { ScheduleModal } from './components/ScheduleModal';
import { ExamPathModal } from './components/ExamPathModal';

import {
  initialUserStats,
  initialSchedule,
  initialDecks,
  initialModules,
  initialNotes,
} from './data/mockData';
import { Deck, ScheduleItem, SmartNote, StudyModule, UserStats } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'ai-tutor' | 'smart-notes' | 'planner'>('home');
  const [stats, setStats] = useState<UserStats>(initialUserStats);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(initialSchedule);
  const [decks] = useState<Deck[]>(initialDecks);
  const [modules, setModules] = useState<StudyModule[]>(initialModules);
  const [notes, setNotes] = useState<SmartNote[]>(initialNotes);

  // Modals state
  const [isMicroQuizOpen, setIsMicroQuizOpen] = useState(false);
  const [quizTopic, setQuizTopic] = useState('Krebs Cycle & ATP Synthase');
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [isScanNotesOpen, setIsScanNotesOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isExamPathOpen, setIsExamPathOpen] = useState(false);

  // AI Tutor incoming prompt state
  const [aiTutorPrompt, setAiTutorPrompt] = useState('');

  // Handlers
  const handleOpenMicroQuiz = (topic?: string) => {
    setQuizTopic(topic || 'Krebs Cycle & ATP Synthase');
    setIsMicroQuizOpen(true);
  };

  const handleQuizComplete = (score: number, total: number) => {
    const accuracy = score / total;
    const masteryGain = Math.round(accuracy * 35);
    const scoreBoost = Math.round(score * 15 + 20);

    setStats((prev) => ({
      ...prev,
      criticalGapMastery: Math.min(95, prev.criticalGapMastery + masteryGain),
      velocityScore: prev.velocityScore + scoreBoost,
      studiedTodayHours: Number((prev.studiedTodayHours + 0.1).toFixed(1)),
      overallGoalPercent: Math.min(100, prev.overallGoalPercent + 3),
    }));
  };

  const handleOpenDeck = (deck: Deck) => {
    setActiveDeck(deck);
  };

  const handleOpenAITutorWithPrompt = (prompt: string) => {
    setAiTutorPrompt(prompt);
    setActiveTab('ai-tutor');
  };

  const handleAddScheduleSession = (newSession: ScheduleItem) => {
    setSchedule((prev) => [newSession, ...prev]);
  };

  const handleToggleScheduleItem = (id: string) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'Completed' ? 'Scheduled' : 'Completed',
            }
          : item
      )
    );
  };

  const handleToggleModule = (id: number) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
  };

  const handleAddNote = (newNote: SmartNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleUpdateStats = (newStats: Partial<UserStats>) => {
    setStats((prev) => ({ ...prev, ...newStats }));
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top Header */}
      <Header
        currentTab={activeTab}
        streakDays={stats.streakDays}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenStreak={() => setIsProfileModalOpen(true)}
        onSelectTab={setActiveTab}
      />

      {/* Main Content View with responsive width and safe areas */}
      <main className="flex-1 w-full bg-surface pt-20 pb-24 px-4 sm:px-6">
        {activeTab === 'home' && (
          <HomeScreen
            stats={stats}
            schedule={schedule}
            decks={decks}
            modules={modules}
            onOpenMicroQuiz={handleOpenMicroQuiz}
            onOpenDeck={handleOpenDeck}
            onOpenScanNotes={() => setIsScanNotesOpen(true)}
            onOpenSchedule={() => setIsScheduleModalOpen(true)}
            onOpenExamPath={() => setIsExamPathOpen(true)}
            onOpenAITutorWithPrompt={handleOpenAITutorWithPrompt}
            onSwitchTab={setActiveTab}
          />
        )}

        {activeTab === 'ai-tutor' && (
          <AITutorScreen
            initialPrompt={aiTutorPrompt}
            onLaunchMicroQuiz={(topic) => handleOpenMicroQuiz(topic)}
          />
        )}

        {activeTab === 'smart-notes' && (
          <SmartNotesScreen
            notes={notes}
            onOpenScanNotes={() => setIsScanNotesOpen(true)}
            onAskAIAboutNote={(topic) => handleOpenAITutorWithPrompt(topic)}
          />
        )}

        {activeTab === 'planner' && (
          <PlannerScreen
            schedule={schedule}
            modules={modules}
            onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
            onToggleScheduleItem={handleToggleScheduleItem}
            onToggleModule={handleToggleModule}
            onOpenExamRoadmap={() => setIsExamPathOpen(true)}
          />
        )}
      </main>

      {/* Primary Fixed Bottom Navigation */}
      <BottomNav currentTab={activeTab} onSelectTab={setActiveTab} />

      {/* Interactive Modals */}
      <MicroQuizModal
        isOpen={isMicroQuizOpen}
        onClose={() => setIsMicroQuizOpen(false)}
        topic={quizTopic}
        onQuizComplete={handleQuizComplete}
      />

      <FlashcardModal
        deck={activeDeck}
        onClose={() => setActiveDeck(null)}
      />

      <ScanNotesModal
        isOpen={isScanNotesOpen}
        onClose={() => setIsScanNotesOpen(false)}
        onNoteCreated={handleAddNote}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        stats={stats}
        onUpdateStats={handleUpdateStats}
      />

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onAddSession={handleAddScheduleSession}
      />

      <ExamPathModal
        isOpen={isExamPathOpen}
        onClose={() => setIsExamPathOpen(false)}
        modules={modules}
        onToggleModule={handleToggleModule}
        onLaunchStudy={(m) => handleOpenAITutorWithPrompt(`Explain syllabus module #${m.id}: ${m.title}`)}
      />
    </div>
  );
}
