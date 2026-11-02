import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Search, Sparkles, Calendar, Award, Filter, UserCheck } from 'lucide-react';

const fallbackTherapists = [
  {
    _id: '1',
    name: 'Dr. Emily Chen, PhD',
    specialization: 'Anxiety & Burnout Specialist',
    experience: 12,
    roleTitle: 'Clinical Psychologist',
    bio: 'With over 12 years of clinical experience, Dr. Chen helps high-achieving professionals reconnect with their inner peace. She actively uses mindfulness-based cognitive therapy to help clients slow down and manage chronic worry.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
  },
  {
    _id: '2',
    name: 'Dr. Marcus Johnson, PsyD',
    specialization: 'Couples & Family Dynamics',
    experience: 10,
    roleTitle: 'Licensed Therapist',
    bio: 'Dr. Johnson focuses on healing strained relationships. Whether you are navigating a difficult marriage or family trauma, he provides a neutral, warm space to foster difficult conversations and rebuild deep trust.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
  },
  {
    _id: '3',
    name: 'Sarah Williams, LCSW',
    specialization: 'Trauma & Depression Recovery',
    experience: 8,
    roleTitle: 'Clinical Social Worker',
    bio: 'Sarah is deeply passionate about helping clients unburden themselves from past grief and trauma. Her approach is trauma-informed, deeply gentle, and paced entirely by what feels safe and comfortable to you.',
    imageUrl: 'https://images.unsplash.com/photo-1594824813580-c11f7c5e532a?auto=format&fit=crop&w=600&q=80'
  }
];

const Therapists = () => {
  const [therapists, setTherapists] = useState(fallbackTherapists);
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTherapists = async () => {
      setLoading(true);
      try {
        const res = await api.get('/therapists');
        if (res.data && res.data.length > 0) {
          setTherapists(res.data);
        }
      } catch (err) {
        console.log('Using default therapist roster');
      } finally {
        setLoading(false);
      }
    };
    fetchTherapists();
  }, []);

  const filteredTherapists = therapists.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.specialization.toLowerCase().includes(search.toLowerCase()) ||
      t.bio.toLowerCase().includes(search.toLowerCase());

    const matchesSpec =
      selectedSpec === 'All' ||
      t.specialization.toLowerCase().includes(selectedSpec.toLowerCase());

    return matchesSearch && matchesSpec;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header matching Fig 14.4 */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-block px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-1">
          Certified Practitioners
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-300">Experts</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Our licensed therapists bring years of collective experience across various mental health disciplines. They are here to walk beside you.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-mindDark-900 border border-pink-500/20 p-4 rounded-2xl shadow-lg shadow-pink-500/5">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by doctor name or expertise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-mindDark-950 border border-pink-500/20 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
          {['All', 'Anxiety', 'Couples', 'Trauma', 'Psychologist'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedSpec(filter)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedSpec === filter
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30 scale-105'
                  : 'bg-mindDark-850 text-slate-300 hover:text-pink-300 hover:bg-pink-500/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Therapist Card Grid matching Fig 14.4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTherapists.map((doc) => (
          <div
            key={doc._id}
            className="bg-mindDark-900 border border-pink-500/20 rounded-2xl overflow-hidden hover:border-pink-500/60 card-hover-lift transition-all flex flex-col justify-between group shadow-lg shadow-pink-500/5"
          >
            <div>
              {/* Doctor Photo */}
              <div className="h-64 overflow-hidden relative">
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-pink-950/80 backdrop-blur-md text-[11px] font-semibold text-pink-200 border border-pink-500/30 flex items-center gap-1 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-pink-400" />
                  <span>{doc.experience}+ Years Exp</span>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-pink-400 mt-0.5">
                    {doc.roleTitle || 'Licensed Specialist'}
                  </p>
                </div>

                {/* Specialization Badge */}
                <div className="inline-block px-3 py-1 rounded-lg bg-pink-500/10 border border-pink-500/30 text-xs text-pink-300 font-medium">
                  {doc.specialization}
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-4">
                  {doc.bio}
                </p>
              </div>
            </div>

            {/* Book with this doctor */}
            <div className="p-6 pt-0">
              <Link
                to={`/book?doctor=${encodeURIComponent(doc.name)}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-pink-500/15 to-rose-500/15 hover:from-pink-500 hover:to-rose-500 text-pink-300 hover:text-white text-xs font-semibold border border-pink-500/30 hover:border-pink-500 shadow-sm hover:shadow-md hover:shadow-pink-500/25 hover:scale-[1.02] active:scale-98 transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                <span>Book with {doc.name.split(' ')[1] || doc.name}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Therapists;
