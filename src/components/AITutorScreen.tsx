import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedTopic?: string;
}

interface AITutorScreenProps {
  initialPrompt?: string;
  onLaunchMicroQuiz: (topic: string) => void;
}

export const AITutorScreen: React.FC<AITutorScreenProps> = ({
  initialPrompt = '',
  onLaunchMicroQuiz,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      sender: 'ai',
      text: `Hello Alex! I'm your AI Academic Co-Pilot. I'm calibrated to your Organic Chemistry II midterm in 4 days, as well as Physics 201, Cellular Bio, and Macroeconomics.

How can I help you master a concept today? Pick a mode above or ask about any reaction mechanism, molecular orbital, or metabolic pathway!`,
      timestamp: '10:32 AM',
    },
  ]);
  const [inputText, setInputText] = useState(initialPrompt);
  const [subject, setSubject] = useState('Organic Chemistry II');
  const [mode, setMode] = useState<'socratic' | 'mechanism' | 'intuitive'>('socratic');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // If initialPrompt was provided from Home hook, send it automatically if not already sent
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length > 0) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          subject,
          mode,
          context: 'Student has an exam in 4 days. Highlight high-yield points.',
        }),
      });

      const data = await res.json();
      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Here is the step-by-step breakdown for this topic.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedTopic: text.includes('stereochemistry')
          ? 'Stereochemistry & Chirality'
          : text.includes('SN1') || text.includes('SN2')
          ? 'Nucleophilic Substitution (SN1/SN2)'
          : text.includes('Krebs') || text.includes('ATP')
          ? 'Krebs Cycle & ATP Synthase'
          : subject,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error('Error querying AI tutor:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'I encountered an issue connecting to the AI model. Let’s try again or check your question!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const promptSuggestions = [
    { label: 'Explain (R) vs (S) Priority', query: 'Walk me through how to assign Cahn-Ingold-Prelog (R) vs (S) priorities on stereocenters with an example.' },
    { label: 'SN1 vs SN2 Comparison', query: 'Compare SN1 and SN2 reactions in terms of kinetics, carbocation intermediates, stereochemistry, and solvent effects.' },
    { label: 'ATP Synthase Rotor Rotation', query: 'How does proton-motive force power the mechanical rotation of the c-ring in ATP synthase?' },
    { label: 'Keynesian Multiplier Derivation', query: 'Derive the simple Keynesian expenditure multiplier formula and explain how an increase in MPC shifts equilibrium output.' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-4xl mx-auto">
      {/* Top Controls Bar */}
      <div className="bg-surface-container-low border border-surface-container rounded-2xl p-3 mb-3 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Subject picker */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-headline font-semibold text-on-surface-variant">Subject:</span>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-xs font-headline font-semibold px-2.5 py-1 rounded-lg border border-surface-container bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Organic Chemistry II">CHEM 240: Organic Chem II</option>
              <option value="Physics & Dynamics">PHYS 201: Physics &amp; Dynamics</option>
              <option value="Cellular Biology">BIO 110: Cellular Biology</option>
              <option value="Macroeconomics">ECON 102: Macroeconomics</option>
            </select>
          </div>

          {/* Socratic / Mechanism / Intuitive Mode Tabs */}
          <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl">
            <button
              onClick={() => setMode('socratic')}
              className={`px-2.5 py-1 text-xs font-headline rounded-lg transition-all ${
                mode === 'socratic'
                  ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Socratic Hints
            </button>
            <button
              onClick={() => setMode('mechanism')}
              className={`px-2.5 py-1 text-xs font-headline rounded-lg transition-all ${
                mode === 'mechanism'
                  ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Mechanism Flow
            </button>
            <button
              onClick={() => setMode('intuitive')}
              className={`px-2.5 py-1 text-xs font-headline rounded-lg transition-all ${
                mode === 'intuitive'
                  ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Concept ELI5
            </button>
          </div>
        </div>

        {/* Quick prompt chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          <span className="text-[10px] uppercase font-bold text-on-surface-variant flex-shrink-0">
            Quick Prompts:
          </span>
          {promptSuggestions.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.query)}
              className="text-[11px] font-headline font-semibold px-2.5 py-1 rounded-lg bg-surface-container-lowest hover:bg-surface-container active:scale-95 text-on-surface whitespace-nowrap transition-all border border-surface-container flex-shrink-0"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 px-1 py-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${
              m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {m.sender === 'ai' ? (
              <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-xs mt-1">
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              </div>
            ) : (
              <img
                alt="User"
                className="w-8 h-8 rounded-xl object-cover ring-1 ring-primary/20 flex-shrink-0 mt-1"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJqXHKHWMQrJXBAZDmhYlExUthwyHV14pTqdJbwArr9WNODHtJj4tz1-1XhKe4y75JyRo4E51FDksq-9CNpMPQgSPY1vpp4ZrJUpjxXqwsq3cJVxCBukwqIL_NGYA8r5bVHl6Pc-0b42JIijN309mC-K9O4O5Xn5k3p_bHtVW7idksoF1pYE6cm75NA2prnd6dqCmqHPTq03LHoLlH6fyWnhmyGxzZUD1ITPQvHpro2ZjlLEP8yPF_"
              />
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-4 shadow-xs text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-primary text-on-primary rounded-tr-none'
                  : 'bg-surface-container-lowest text-on-surface border border-surface-container rounded-tl-none space-y-3'
              }`}
            >
              {m.sender === 'user' ? (
                <p className="whitespace-pre-wrap">{m.text}</p>
              ) : (
                <>
                  <div className="whitespace-pre-wrap leading-relaxed space-y-2">
                    {m.text.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Interactive Action for AI responses */}
                  {m.suggestedTopic && (
                    <div className="pt-2 border-t border-surface-container flex items-center justify-between gap-2">
                      <span className="text-[10px] text-on-surface-variant font-medium">
                        Concept Mastered?
                      </span>
                      <button
                        onClick={() => onLaunchMicroQuiz(m.suggestedTopic!)}
                        className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-on-primary font-headline text-[11px] font-bold transition-all flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">bolt</span>
                        <span>Quiz me on this</span>
                      </button>
                    </div>
                  )}
                </>
              )}
              <div
                className={`text-[10px] mt-1 text-right ${
                  m.sender === 'user' ? 'text-on-primary/70' : 'text-on-surface-variant'
                }`}
              >
                {m.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            </div>
            <div className="bg-surface-container-lowest p-3.5 rounded-2xl rounded-tl-none border border-surface-container flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span className="text-xs text-on-surface-variant font-headline">
                SmartStudy AI is synthesizing explanation...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center bg-surface-container-lowest rounded-2xl border border-surface-container p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent"
        >
          <input
            type="text"
            placeholder="Ask a question or describe a reaction mechanism..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-3 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/60 bg-transparent focus:outline-none"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              inputText.trim() && !isLoading
                ? 'bg-primary text-on-primary hover:bg-primary-container active:scale-95 shadow-xs'
                : 'bg-surface-variant text-on-surface-variant/40 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
        </form>
      </div>
    </div>
  );
};
