import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, Volume2, Sparkles, Heart } from 'lucide-react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! I'm your MindEase virtual assistant. I'm here to listen, answer your questions, and guide you to the right resources. How are you feeling today or what can I help you with?",
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

    // Add user message
    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Bot response logic
    setTimeout(() => {
      let botReply = '';
      const lower = query.toLowerCase();

      if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule')) {
        botReply = "I can definitely help you schedule a session with one of our licensed experts. You can choose In-Person or Online video sessions. Would you like me to take you directly to our booking page?";
      } else if (lower.includes('doctor') || lower.includes('therapist') || lower.includes('specialist')) {
        botReply = "We have certified experts available including Dr. Emily Chen (Anxiety & Burnout Specialist), Dr. Marcus Johnson (Couples & Family Dynamics), and Sarah Williams (Trauma & Depression Recovery). You can browse their full bios on our Therapists page.";
      } else if (lower.includes('anxiety') || lower.includes('stress') || lower.includes('panic') || lower.includes('overwhelm')) {
        botReply = "Take a slow, deep breath right now. Inhale for 4 seconds, hold for 4, and gently exhale for 4. You are safe. Remember that your feelings are valid, and our therapists specialize in gentle grounding techniques and CBT.";
      } else if (lower.includes('cost') || lower.includes('fee') || lower.includes('insurance') || lower.includes('price')) {
        botReply = "MindEase accepts most major health insurance plans. Out-of-pocket sessions start at sliding-scale rates depending on your clinical needs. Please reach out via our Contact page for direct insurance verification.";
      } else if (lower.includes('hours') || lower.includes('open') || lower.includes('location')) {
        botReply = "Our clinic is open Monday to Friday: 8:00 AM – 8:00 PM, and Saturday to Sunday: 9:00 AM – 4:00 PM at 123 Wellness Avenue, Health District, NY 10001.";
      } else if (lower.includes('crisis') || lower.includes('help') || lower.includes('suicide') || lower.includes('emergency')) {
        botReply = "If you or a loved one are in immediate danger or severe emotional distress, please call the 24/7 National Crisis Hotline at 988 or text HOME to 741741 immediately. We care about you deeply.";
      } else {
        botReply = "Thank you for sharing. Our mission at MindEase is to ensure nobody walks through their struggles alone. You can easily schedule an appointment, read our wellness library, or connect with our support team anytime.";
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
      {/* Floating launcher trigger matching Fig 14.1 bottom-right */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white flex items-center justify-center shadow-xl shadow-pink-500/40 hover:scale-110 active:scale-95 transition-all group animate-float"
          aria-label="Open MindEase Chatbot"
        >
          <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-mindDark-950 animate-pulse"></span>
          <span className="absolute -inset-1 rounded-full bg-pink-500/20 -z-10 animate-ping" style={{ animationDuration: '3s' }}></span>
        </button>
      )}

      {/* Chat Window modal matching Fig 14.6 */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] h-[540px] max-h-[85vh] bg-mindDark-900 border border-pink-500/30 rounded-2xl shadow-2xl shadow-pink-500/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-950/40 via-mindDark-850 to-pink-950/30 p-4 border-b border-pink-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 shadow-sm">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  MindEase AI Assistant
                </h3>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                  Online & Ready to Help
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                className="p-1.5 hover:text-white hover:bg-mindDark-800 rounded-lg transition-colors"
                title="Mute / Sound"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-mindDark-800 rounded-lg transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-mindDark-950/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0 mt-0.5 shadow-sm">
                    <Heart className="w-3.5 h-3.5 fill-pink-400/40" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-tr-none shadow-md shadow-pink-500/20'
                      : 'bg-mindDark-850 text-slate-200 border border-mindDark-border/80 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[10px] mt-1 text-right opacity-60">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-pink-300 text-xs py-1">
                <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                  <Sparkles className="w-3 h-3 animate-spin" />
                </div>
                <span>MindEase assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2 bg-mindDark-900 border-t border-mindDark-border/50 flex gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSend('How do I book an appointment?')}
              className="px-2.5 py-1 bg-mindDark-850 hover:bg-pink-500/10 border border-pink-500/20 hover:border-pink-500/40 rounded-full text-[11px] text-slate-300 hover:text-pink-300 whitespace-nowrap transition-colors"
            >
              🗓️ Book Appointment
            </button>
            <button
              onClick={() => handleSend('Tell me about your therapists')}
              className="px-2.5 py-1 bg-mindDark-850 hover:bg-pink-500/10 border border-pink-500/20 hover:border-pink-500/40 rounded-full text-[11px] text-slate-300 hover:text-pink-300 whitespace-nowrap transition-colors"
            >
              👩‍⚕️ Our Experts
            </button>
            <button
              onClick={() => handleSend('I am feeling anxious')}
              className="px-2.5 py-1 bg-mindDark-850 hover:bg-pink-500/10 border border-pink-500/20 hover:border-pink-500/40 rounded-full text-[11px] text-slate-300 hover:text-pink-300 whitespace-nowrap transition-colors"
            >
              🌸 Anxiety Support
            </button>
          </div>

          {/* Input field */}
          <div className="p-3 bg-mindDark-900 border-t border-mindDark-border flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-mindDark-950 border border-pink-500/20 focus:border-pink-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            <button
              onClick={() => handleSend()}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white flex items-center justify-center shrink-0 transition-all shadow-md shadow-pink-500/30 hover:scale-105 active:scale-95"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
