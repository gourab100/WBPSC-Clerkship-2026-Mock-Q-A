import React, { useState } from 'react';
import {
  Bot,
  CheckCircle2,
  HelpCircle,
  Lock,
  MessageSquare,
  QrCode,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';

interface FloatingSupportChatProps {
  isUnlocked: boolean;
  isLoggedIn: boolean;
  userEmail: string;
  upiId: string;
  onTriggerSignInOrPayment: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const QUICK_FAQS = [
  {
    q: 'How do I unlock all questions for ₹100?',
    a: 'Click "Sign in with Google", scan the ₹100 Google Pay / UPI QR code on the payment screen, and submit your 12-digit UTR number for lifetime access.',
  },
  {
    q: 'What is included in ₹100 Lifetime Access?',
    a: 'You unlock all Year-wise Previous Year Prelims & Mains Papers (with step-by-step math & model descriptive answers), all Sequential 100-Question CBT Mock Tests, and full "My Test" scorecards.',
  },
  {
    q: 'Why are some answers hidden in My Test?',
    a: 'To protect exam integrity, "My Test" reveals solutions only for the questions you attempted. Reattempt the Mock Test and complete all 100 questions to unlock the full answer sheet.',
  },
  {
    q: 'My ₹100 UPI payment is done. Where is my UTR?',
    a: 'Open your Google Pay, PhonePe, or Paytm receipt and copy the 12-digit UPI Transaction ID / UTR number, then paste it into the verification box on the payment page.',
  },
];

export const FloatingSupportChat: React.FC<FloatingSupportChatProps> = ({
  isUnlocked,
  isLoggedIn,
  userEmail,
  upiId,
  onTriggerSignInOrPayment,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Welcome to WBPSC Clerkship 2026 Help & Payment Support! How can I help you with exam practice or your ₹100 lifetime unlock today?',
    },
  ]);

  const handleAskFaq = (question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'user', text: question },
      { id: `b-${Date.now() + 1}`, sender: 'bot', text: answer },
    ]);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;
    setInputText('');

    const lower = trimmed.toLowerCase();
    let reply =
      'Thank you for your message! For instant unlocking, sign in with your Google account, complete the ₹100 UPI QR payment (Merchant UPI: ' +
      upiId +
      '), and enter your 12-digit UTR number.';

    if (lower.includes('utr') || lower.includes('pay') || lower.includes('100') || lower.includes('qr')) {
      reply =
        `You can pay ₹100 via Google Pay, PhonePe, or Paytm to ${upiId}. After paying, enter the 12-digit UTR number on the payment screen to activate lifetime access linked to your Google email.`;
    } else if (lower.includes('mock') || lower.includes('my test') || lower.includes('reattempt')) {
      reply =
        'Each Mock Test contains 100 fresh questions (Q1 to Q100). In "My Test", only your attempted questions are shown until you complete all 100 questions via Reattempt.';
    } else if (lower.includes('bengali') || lower.includes('language')) {
      reply =
        'Use the "[ English | বাংলা ]" toggle in the top header bar at any time to switch bilingual Bengali question translations on or off.';
    }

    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'user', text: trimmed },
      { id: `b-${Date.now() + 1}`, sender: 'bot', text: reply },
    ]);
  };

  return (
    <div
      data-testid="floating-support-widget"
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end"
    >
      {/* Expanded Support Chat Window */}
      {isOpen && (
        <div
          data-testid="floating-support-panel"
          className="mb-3 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Royal Navy Header */}
          <div className="bg-[#162238] text-white px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-extrabold tracking-tight">
                  AI Help &amp; Payment Support
                </div>
                <div className="text-[11px] text-slate-300">
                  {isUnlocked
                    ? 'Full Access Active'
                    : isLoggedIn
                    ? `Signed in: ${userEmail}`
                    : '24×7 Exam & ₹100 Unlock Desk'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close support chat"
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3.5 max-h-64 overflow-y-auto space-y-2.5 bg-[#F4F6F9]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#162238] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-2xs rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick FAQ Buttons */}
          <div className="px-3.5 py-2.5 bg-white border-t border-slate-100 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Quick Help Topics
            </div>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_FAQS.map((faq, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAskFaq(faq.q, faq.a)}
                  className="text-left text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  {faq.q}
                </button>
              ))}
            </div>

            {!isUnlocked && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onTriggerSignInOrPayment();
                }}
                className="w-full mt-1.5 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-extrabold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {isLoggedIn
                    ? 'Open ₹100 Google Pay QR Payment'
                    : 'Sign In with Google to Unlock All (₹100)'}
                </span>
              </button>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendCustom}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about ₹100 QR payment or tests..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#162238]"
            />
            <button
              type="submit"
              aria-label="Send support message"
              className="p-2 rounded-xl bg-[#162238] text-white hover:bg-[#1E2E4A] transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Bottom-Right Chat Pill & Avatar Button (Matches Mockup Image 1) */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          data-testid="floating-support-pill-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-lg border border-slate-200/90 hover:bg-slate-50 transition-all cursor-pointer whitespace-nowrap"
        >
          AI Help &amp; Payment Support
        </button>

        <button
          type="button"
          data-testid="floating-support-avatar-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle AI Help and Payment Support"
          className="w-12 h-12 rounded-full bg-[#162238] text-white shadow-xl border-2 border-slate-700/80 flex items-center justify-center hover:bg-[#1E2E4A] transition-all cursor-pointer shrink-0"
        >
          <Bot className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};
