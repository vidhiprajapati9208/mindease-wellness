import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, BookOpen, Clock, ArrowRight, X, Heart, Mail, CheckCircle, Sparkles } from 'lucide-react';

const initialArticles = [
  {
    _id: '1',
    title: 'How to Gently Quiet Daily Anxiety Without Exhausting Yourself',
    author: 'Dr. Emily Chen, PhD',
    category: 'Anxiety & Grounding',
    readTime: '6 min read',
    date: 'March 14, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    summary: 'Anxiety has a subtle way of making small pebbles feel like impossible boulders. In this essay, we explore gentle somatic anchors, vagal nerve resets, and daily self-compassion to soften inner alarm bells.',
    content: `Anxiety has a subtle way of making small pebbles feel like impossible boulders. In this essay, we explore gentle somatic anchors, vagal nerve resets, and daily self-compassion to soften inner alarm bells.

1. The 5-4-3-2-1 Sensory Grounding:
Notice 5 things you can see around your room, 4 textures you can touch, 3 quiet sounds you can hear, 2 subtle scents, and 1 kind thought you can offer yourself. This pulls your nervous system out of an imaginary spiral and grounds you safely into the current room.

2. Diaphragmatic Box Breathing:
Inhale softly for 4 counts, hold for 4, exhale slowly for 4, and rest empty for 4. Repeat 4 cycles to stimulate your vagus nerve and initiate your parasympathetic calm response.

3. Objective Labeling Without Self-Judgment:
When an anxious impulse surfaces, speak to it with softness: "I notice worry is present right now, but this feeling is not a fact." Giving your emotions room to breathe without fighting them allows them to dissolve naturally.`
  },
  {
    _id: '2',
    title: '5 Subtle Signs Your Body Is Whispering That You Need Deep Rest',
    author: 'Dr. Marcus Johnson, PsyD',
    category: 'Stress & Restoration',
    readTime: '5 min read',
    date: 'March 02, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    summary: 'Burnout is rarely a sudden crash; it is an almost imperceptible leak of emotional energy. Recognizing these signs allows you to rest before your body demands it.',
    content: `Burnout is rarely a sudden crash; it is an almost imperceptible leak of emotional energy. Recognizing these signs allows you to rest before your body demands it:

• Emotional numbness or feeling detached from conversations that once brought joy.
• Waking up feeling physically heavy even after full sleep cycles.
• Uncharacteristic irritability over small inconveniences.
• Somatic tension headaches, shoulder knots, or shallow chest breathing.
• An impulse to isolate rather than ask for gentle support.`
  },
  {
    _id: '3',
    title: "A Therapist's 3 Morning Rituals for Emotional Resilience",
    author: 'Sarah Williams, LCSW',
    category: 'Daily Mindful Living',
    readTime: '4 min read',
    date: 'February 28, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    summary: 'You do not need an elaborate two-hour morning routine. These three micro-habits anchor your day with genuine tranquility and clarity.',
    content: `Mental well-being should never become another stressful item on your to-do list. Try these three micro-rituals:

1. The 10-Minute Digital Horizon:
Delay looking at any phone screen for the first 10 minutes upon waking. Let your thoughts awaken at their own natural cadence.

2. Mindful Warmth:
When drinking your morning tea or water, focus completely on the tactile warmth of the cup and the rhythmic breath of the morning.

3. The Gratitude Compass:
Name one simple thing you are thankful for before leaving your bedroom—the morning light, clean sheets, or a breath of fresh air.`
  }
];

const Blog = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [search, setSearch] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/blogs');
        if (res.data && res.data.length > 0) {
          setArticles(res.data);
        }
      } catch (e) {
        console.log('Using default blog posts');
      }
    };
    fetchArticles();
  }, []);

  const featured = articles[0];
  const gridArticles = articles.slice(1);

  const filteredGrid = gridArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscriberEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setSubscriberEmail('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#faecea] dark:bg-[#2a1725] text-dustyRose text-xs font-semibold uppercase tracking-[0.2em] border border-[#ecd8d4] dark:border-pink-500/30">
            Sanctuary Library & Essays
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl italic font-normal text-stone-900 dark:text-rose-100 tracking-tight leading-tight">
            Reflections for <span className="text-dustyRose">inner peace</span>
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm font-normal leading-relaxed">
            Thoughtful articles, grounding exercises, and psychological guidance written by our licensed faculty.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search topics (e.g. Anxiety, Rest)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-full text-xs sm:text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-dustyRose transition-colors card-soft-rose"
          />
        </div>
      </div>

      {/* Featured Article Card */}
      {featured && (
        <div className="bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 card-soft-rose">
          <div className="lg:col-span-5 h-72 lg:h-auto overflow-hidden">
            <img
              src={featured.imageUrl}
              alt={featured.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#faecea] dark:bg-[#2a1725] text-dustyRose text-xs font-semibold uppercase tracking-wider border border-[#ecd8d4] dark:border-pink-500/30">
                {featured.category}
              </span>
              <h2
                className="font-editorial text-2xl sm:text-4xl text-stone-900 dark:text-rose-100 italic font-normal leading-snug hover:text-dustyRose transition-colors cursor-pointer"
                onClick={() => setActiveArticle(featured)}
              >
                {featured.title}
              </h2>
              <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                {featured.summary || featured.content}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#ecd8d4] dark:border-pink-500/20">
              <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                <span className="font-semibold text-stone-800 dark:text-stone-200">{featured.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTime || '6 min read'}
                </span>
              </div>

              <button
                onClick={() => setActiveArticle(featured)}
                className="px-6 py-2.5 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest shadow-md shadow-dustyRose/25 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read Reflection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Latest Articles Grid */}
      <div className="space-y-8">
        <h3 className="font-editorial text-2xl sm:text-3xl italic text-stone-900 dark:text-rose-100 flex items-center gap-2 font-normal">
          <BookOpen className="w-5 h-5 text-dustyRose" />
          <span>Recent Journal Entries</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredGrid.map((art) => (
            <div
              key={art._id}
              onClick={() => setActiveArticle(art)}
              className="bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 rounded-3xl overflow-hidden card-soft-rose hover:border-dustyRose/60 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-[#140b12]/90 backdrop-blur-md text-[11px] font-semibold text-dustyRose border border-[#ecd8d4]">
                    {art.category}
                  </div>
                </div>

                <div className="p-7 space-y-3">
                  <h4 className="font-editorial text-xl sm:text-2xl text-stone-900 dark:text-rose-100 group-hover:text-dustyRose transition-colors line-clamp-2 font-normal italic">
                    {art.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed font-normal">
                    {art.summary || art.content}
                  </p>
                </div>
              </div>

              <div className="p-7 pt-0 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 border-t border-[#ecd8d4] dark:border-pink-500/20 mt-4">
                <span className="font-semibold text-stone-800 dark:text-stone-200">{art.author}</span>
                <span className="text-dustyRose font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gentle Newsletter Subscription */}
      <div className="rounded-3xl bg-gradient-to-r from-[#faecea] via-[#fbf2f0] to-[#faecea] dark:from-[#200f1c] dark:via-[#2a1725] dark:to-[#200f1c] border border-[#ecd8d4] dark:border-pink-500/30 p-10 sm:p-14 text-center max-w-3xl mx-auto space-y-6">
        <span className="text-2xl">🌸</span>
        <div className="space-y-2">
          <h3 className="font-editorial text-3xl sm:text-4xl italic text-stone-900 dark:text-rose-100 font-normal">
            Gentle reminders in your inbox
          </h3>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm max-w-lg mx-auto font-normal">
            Receive our weekly reflection on emotional peace, breathwork, and self-compassion. Free from jargon or spam.
          </p>
        </div>

        {subscribed ? (
          <div className="p-4 rounded-2xl bg-white border border-[#ecd8d4] text-dustyRose text-xs font-semibold flex items-center justify-center gap-2 max-w-md mx-auto">
            <CheckCircle className="w-4 h-4" />
            <span>Thank you. You have been warmly subscribed to our reflections.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={subscriberEmail}
              onChange={(e) => setSubscriberEmail(e.target.value)}
              className="w-full sm:flex-1 px-4 py-3 bg-white dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-full text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-dustyRose"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md shadow-dustyRose/25 cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/30 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            <div className="relative h-64 shrink-0">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-stone-700 hover:text-stone-900 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Close reflection"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="px-3.5 py-1 rounded-full bg-dustyRose text-white text-xs font-semibold uppercase tracking-wider shadow-sm">
                  {activeArticle.category}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              <h2 className="font-editorial text-2xl sm:text-4xl text-stone-900 dark:text-rose-100 italic font-normal leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-stone-500 pb-4 border-b border-[#ecd8d4]">
                <div>
                  <span className="text-stone-800 dark:text-stone-200 font-semibold block">{activeArticle.author}</span>
                  <span>{activeArticle.date || 'Recent essay'} • {activeArticle.readTime || '4 min read'}</span>
                </div>
              </div>

              <div className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-4 font-normal">
                {activeArticle.content}
              </div>

              <div className="pt-6 border-t border-[#ecd8d4] flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-full bg-[#faecea] text-dustyRose text-xs font-semibold uppercase tracking-wider hover:bg-[#f5d5d1] transition-colors cursor-pointer"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Blog;
