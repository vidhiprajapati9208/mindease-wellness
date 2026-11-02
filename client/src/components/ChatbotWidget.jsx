import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, Sparkles, Heart } from 'lucide-react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Warm greetings! I am your MindEase Sanctuary Guide. I am here to listen, answer your therapy questions, and guide you toward inner peace. How can I support your heart and mind today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = '';
      const lower = query.toLowerCase();

      if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule')) {
        botReply = "I can gladly guide you to schedule a private consultation. We provide both calming in-person sanctuary sessions and secure online video appointments. Click 'Book Consultation' in the menu or let me take you there!";
      } else if (lower.includes('doctor') || lower.includes('therapist') || lower.includes('specialist')) {
        botReply = "Our compassionate clinical guides include Dr. Emily Chen (Anxiety & Burnout), Dr. Marcus Johnson (Couples & Relationships), and Sarah Williams (Trauma & Emotional Restoration). You can read their complete profiles on our Therapists page.";
      } else if (lower.includes('anxiety') || lower.includes('stress') || lower.includes('panic') || lower.includes('overwhelm')) {
        botReply = "Pause gently with me. Inhale slowly for 4 seconds... hold for 4... and softly exhale. You are safe in this moment. Your feelings are honored here, and our evidence-based therapies provide profound peace.";
      } else if (lower.includes('cost') || lower.includes('fee') || lower.includes('insurance') || lower.includes('price')) {
        botReply = "MindEase accepts major health insurance plans and offers sliding-scale sanctuary pricing. Please reach out to our front desk via the Contact page for quick verification.";
      } else if (lower.includes('hours') || lower.includes('open') || lower.includes('location')) {
        botReply = "Our peaceful sanctuary is open Monday–Friday: 8:00 AM – 8:00 PM, and Saturday–Sunday: 9:00 AM – 4:00 PM at 123 Sanctuary Way, Wellness Gardens.";
      } else if (lower.includes('crisis') || lower.includes('help') || lower.includes('suicide') || lower.includes('emergency')) {
        botReply = "If you are in acute distress or need immediate life-saving care, please dial 988 (National Crisis Lifeline) or text HOME to 741741. You matter deeply and support is available 24/7.";
      } else {
        botReply = "Thank you for sharing your thoughts. At MindEase Sanctuary, you never have to carry your journey alone. Explore our mindful guides, therapeutic services, or schedule a session whenever your heart feels ready.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating launcher button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white flex items-center justify-center shadow-xl shadow-dustyRose/40 hover:scale-105 active:scale-95 transition-all group animate-float cursor-pointer"
          aria-label="Open MindEase Assistant"
        >
          <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white dark:border-[#140b12] animate-pulse"></span>
          <span className="absolute -inset-1 rounded-full bg-dustyRose/20 -z-10 animate-ping" style={{ animationDuration: '3s' }}></span>
        </button>
      )}

      {/* Chat Window modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] h-[540px] max-h-[85vh] bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/30 rounded-3xl shadow-2xl shadow-dustyRose/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#fbf4f2] dark:bg-[#251222] p-4 border-b border-[#ecd8d4] dark:border-pink-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-dustyRose/15 border border-dustyRose/30 flex items-center justify-center text-dustyRose shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-editorial text-base italic text-stone-900 dark:text-rose-100 font-semibold leading-tight">
                  MindEase Sanctuary Guide
                </h3>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online & Listening
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Guidance Chips */}
          <div className="bg-[#fdf9f7] dark:bg-[#1a0f18] px-3 py-2 border-b border-[#ecd8d4] dark:border-pink-500/10 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
            <button
              onClick={() => handleSend('How can I book a session?')}
              className="px-2.5 py-1 rounded-full bg-[#faecea] dark:bg-[#2a1725] text-dustyRose hover:bg-[#f5d5d1] transition-colors border border-[#ecd8d4] dark:border-pink-500/30 cursor-pointer"
            >
              🗓️ Book Session
            </button>
            <button
              onClick={() => handleSend('Help with feeling anxious')}
              className="px-2.5 py-1 rounded-full bg-[#faecea] dark:bg-[#2a1725] text-dustyRose hover:bg-[#f5d5d1] transition-colors border border-[#ecd8d4] dark:border-pink-500/30 cursor-pointer"
            >
              🌸 Calm Anxiety
            </button>
            <button
              onClick={() => handleSend('Meet your therapists')}
              className="px-2.5 py-1 rounded-full bg-[#faecea] dark:bg-[#2a1725] text-dustyRose hover:bg-[#f5d5d1] transition-colors border border-[#ecd8d4] dark:border-pink-500/30 cursor-pointer"
            >
              👩‍⚕️ Meet Guides
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-white dark:bg-[#160b1e]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-dustyRose text-white rounded-tr-none shadow-sm shadow-dustyRose/20'
                      : 'bg-[#faecea] dark:bg-[#261322] text-stone-800 dark:text-stone-200 rounded-tl-none border border-[#ecd8d4] dark:border-pink-500/20'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-rose-100' : 'text-stone-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#faecea] dark:bg-[#261322] px-4 py-2.5 rounded-2xl rounded-tl-none border border-[#ecd8d4] dark:border-pink-500/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-dustyRose animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-dustyRose animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-dustyRose animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#fbf4f2] dark:bg-[#1e111b] border-t border-[#ecd8d4] dark:border-pink-500/20 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question or share how you feel..."
              className="flex-1 bg-white dark:bg-[#261322] text-stone-800 dark:text-stone-100 placeholder-stone-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-full border border-[#ecd8d4] dark:border-pink-500/30 focus:outline-none focus:border-dustyRose transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full bg-dustyRose hover:bg-dustyRose-hover disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-sm shrink-0 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
