import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, BookOpen, Clock, User, ArrowRight, X, Heart, Mail, CheckCircle } from 'lucide-react';

const initialArticles = [
  {
    _id: '1',
    title: 'How to Manage Daily Anxiety Without Feeling Overwhelmed',
    author: 'Dr. Emily Chen, PhD',
    category: 'Anxiety & Stress',
    readTime: '6 min read',
    date: 'March 14, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    summary: 'Anxiety has a sneaky way of making small mountains out of completely flat land. In this guide, we dive deep into the daily habits, grounding exercises, and mental re-framing techniques that can help you silence that inner alarm bell without needing to completely exhaust yourself in the process.',
    content: `Anxiety has a sneaky way of making small mountains out of completely flat land. In this guide, we dive deep into the daily habits, grounding exercises, and mental re-framing techniques that can help you silence that inner alarm bell without needing to completely exhaust yourself in the process.

1. The 5-4-3-2-1 Sensory Grounding:
Notice 5 things you can see, 4 things you can feel around you, 3 things you can hear, 2 things you can smell, and 1 positive affirmation you can tell yourself. This pulls your brain out of the fight-or-flight loop and anchors you firmly in the present moment.

2. Diaphragmatic Box Breathing:
Inhale for 4 counts, hold for 4, exhale slowly for 4, and hold empty for 4. Repeat 4 cycles to stimulate your vagus nerve and initiate the parasympathetic calm response.

3. Labeling Without Judging:
When an anxious thought arises, acknowledge it objectively: "I am experiencing the emotion of worry right now, but this thought is not an absolute fact." Giving thoughts room to pass prevents them from becoming overwhelming spirals.`
  },
  {
    _id: '2',
    title: '5 Warning Signs You Are Approaching Severe Burnout',
    author: 'Dr. Marcus Johnson',
    category: 'Stress & Burnout',
    readTime: '5 min read',
    date: 'March 02, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    summary: 'Burnout doesn\'t happen overnight. It is a slow fade of energy, passion, and patience. Recognizing these 5 subtle signs early can save you months of severe emotional fatigue...',
    content: `Burnout doesn't happen overnight. It is a slow fade of energy, passion, and patience. Recognizing these 5 subtle signs early can save you months of severe emotional fatigue:

• Cynicism and emotional detachment from work and loved ones.
• Waking up feeling drained even after 8 hours of sleep.
• Inability to concentrate on standard everyday tasks.
• Physical symptoms such as tension headaches and stomach knots.
• Withdrawing from social interactions that used to bring you joy.`
  },
  {
    _id: '3',
    title: "A Therapist's Top 3 Daily Mental Wellness Tips",
    author: 'Sarah Williams, LCSW',
    category: 'Wellness',
    readTime: '4 min read',
    date: 'February 28, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    summary: 'You don\'t need a two-hour meditation routine to stay mentally fit. Adding these three incredibly simple actions to your morning commute or lunch break can drastically improve your peace...',
    content: `Mental wellness on a daily level shouldn't feel like a chore. If your self-care routine is stressing you out, it's not self-care. Try these three remarkably simple tips to incorporate effortlessly into a busy life:

1. The 10-Minute Morning Disconnect:
Delay looking at your smartphone for the first 10 minutes after waking up. It sets the tone for your brain that you dictate the rhythm of your day, not external notifications.

2. Mindful Sipping:
When drinking your morning coffee or tea, do absolutely nothing else. Don't read the news, don't drive. Just feel the warmth of the mug and smell the drink. It's a 2-minute daily meditation.

3. A Gratitude Anchor:
Pick an object you walk past frequently—like your front door handle or a mirror. Every time you touch it, force your brain to identify one thing you are genuinely thankful for in that exact moment.`
  },
  {
    _id: '4',
    title: 'Navigating Life Transitions and Emotional Grief',
    author: 'Dr. Emily Chen, PhD',
    category: 'Personal Growth',
    readTime: '5 min read',
    date: 'February 15, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80',
    summary: 'Grief isn\'t just about losing a person. You can grieve a past version of yourself, a lost career path, or a major move. Here is how to give yourself grace through big life changes.',
    content: `Grief isn't just about losing a person. You can grieve a past version of yourself, a lost career path, or a major move. Here is how to give yourself grace through big life changes and honor your emotional evolution with patience.`
  },
  {
    _id: '5',
    title: 'How to Set Boundaries with Family Gently',
    author: 'Dr. Marcus Johnson',
    category: 'Relationships',
    readTime: '6 min read',
    date: 'January 30, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=80',
    summary: 'Saying \'no\' to family can feel riddled with guilt. Learn the scripts and internal mindset needed to set firm, loving boundaries that protect your peace while preserving healthy connections.',
    content: `Saying 'no' to family can feel riddled with guilt. Learn the scripts and internal mindset needed to set firm, loving boundaries that protect your peace while preserving healthy connections.`
  }
];

const Blog = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [search, setSearch] = useState('');
  const [activeArticle, setActiveArticle] = useState(null); // for modal Fig 14.10
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title & Search matching Fig 14.9 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Mental Wellness <span className="text-mindCyan">Library</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Honest articles, actionable exercises, and supportive advice written by our licensed therapists.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search topics (e.g. Anxiety, Burnout)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-mindDark-900 border border-mindDark-border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan transition-colors"
          />
        </div>
      </div>

      {/* Featured Article Card matching Fig 14.9 */}
      {featured && (
        <div className="bg-mindDark-900 border border-mindDark-border rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl hover:border-slate-700 transition-colors">
          <div className="lg:col-span-5 h-64 lg:h-auto overflow-hidden">
            <img
              src={featured.imageUrl}
              alt={featured.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-mindDark-850 text-mindCyan text-xs font-bold uppercase tracking-wider border border-mindDark-border">
                {featured.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug hover:text-mindCyan transition-colors cursor-pointer"
                  onClick={() => setActiveArticle(featured)}>
                {featured.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                {featured.summary || featured.content}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-mindDark-border/60">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="text-white font-medium">{featured.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTime || '6 min read'}
                </span>
              </div>

              <button
                onClick={() => setActiveArticle(featured)}
                className="px-6 py-2.5 rounded-full bg-mindCyan hover:bg-mindCyan-hover text-white text-xs font-semibold shadow-md shadow-mindCyan/20 transition-all flex items-center gap-1.5"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* "Latest Articles" Grid matching Fig 14.9 */}
      <div className="space-y-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-mindCyan" />
          <span>Latest Articles</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGrid.map((art) => (
            <div
              key={art._id}
              onClick={() => setActiveArticle(art)}
              className="bg-mindDark-900 border border-mindDark-border rounded-2xl overflow-hidden hover:border-mindCyan/50 hover:shadow-xl hover:shadow-mindCyan/10 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-mindDark-950/80 backdrop-blur-md text-[11px] font-semibold text-mindCyan-light border border-mindDark-border">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h4 className="text-lg font-bold text-white group-hover:text-mindCyan transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {art.summary || art.content}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-400 border-t border-mindDark-border/60 mt-4">
                <span className="font-medium text-slate-300">{art.author}</span>
                <span className="text-mindCyan font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "A gentle reminder in your inbox" Newsletter Card matching Fig 14.9 bottom */}
      <div className="rounded-3xl bg-mindDark-900 border border-mindDark-border p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">
            A gentle reminder in your inbox
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
            Subscribe to our weekly wellness newsletter. No spam, no overwhelming clinical jargon—just simple, actionable mental health tips and community stories.
          </p>
        </div>

        {subscribed ? (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-center gap-2 max-w-md mx-auto">
            <CheckCircle className="w-4 h-4" />
            <span>Thank you! You have been subscribed to our wellness reminders.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={subscriberEmail}
              onChange={(e) => setSubscriberEmail(e.target.value)}
              className="w-full sm:flex-1 px-4 py-3 bg-mindDark-950 border border-mindDark-border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-mindCyan"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-mindCyan hover:bg-mindCyan-hover text-white text-xs font-bold transition-all shadow-md shadow-mindCyan/20 whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
        )}

        <p className="text-[11px] text-slate-500">
          We deeply respect your privacy. You can unsubscribe anytime.
        </p>
      </div>

      {/* Blog Detail Reader Modal matching Fig 14.10 */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-mindDark-900 border border-mindDark-border rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            {/* Cover image header */}
            <div className="relative h-64 shrink-0">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-mindDark-950/80 hover:bg-mindDark-950 text-white flex items-center justify-center transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 rounded-full bg-mindCyan text-white text-xs font-bold uppercase tracking-wider">
                  {activeArticle.category}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-slate-400 pb-4 border-b border-mindDark-border/60">
                <div className="w-8 h-8 rounded-full bg-mindDark-800 text-mindCyan flex items-center justify-center font-bold">
                  {activeArticle.author.charAt(0)}
                </div>
                <div>
                  <span className="text-white font-semibold block">{activeArticle.author}</span>
                  <span>{activeArticle.date || 'Recent article'} • {activeArticle.readTime || '4 min read'}</span>
                </div>
              </div>

              <div className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>

              <div className="pt-6 border-t border-mindDark-border/60 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2 rounded-xl bg-mindDark-850 hover:bg-mindDark-800 text-white text-xs font-semibold border border-mindDark-border"
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
