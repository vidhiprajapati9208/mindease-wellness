import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Search, Calendar, Award, Sparkles } from 'lucide-react';

const fallbackTherapists = [
  {
    _id: '1',
    name: 'Dr. Emily Chen, PhD',
    specialization: 'Anxiety & Burnout Specialist',
    experience: 12,
    roleTitle: 'Lead Clinical Psychologist',
    bio: 'With over 12 years of clinical practice, Dr. Chen guides clients through anxiety, perfectionism, and deep nervous system fatigue. She utilizes mindfulness-based somatic therapies to help restore inner peace.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
  },
  {
    _id: '2',
    name: 'Dr. Marcus Johnson, PsyD',
    specialization: 'Couples & Relational Harmony',
    experience: 10,
    roleTitle: 'Senior Relational Counselor',
    bio: 'Dr. Johnson specializes in healing fractured bonds, emotional attunement, and family dynamics. He creates a safe, neutral sanctuary where vulnerability transforms into lasting emotional trust.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
  },
  {
    _id: '3',
    name: 'Sarah Williams, LCSW',
    specialization: 'Trauma & Gentle Restoration',
    experience: 8,
    roleTitle: 'Restorative Care Specialist',
    bio: 'Sarah provides gentle, trauma-informed guidance to help clients release long-held sorrow and reclaim their sense of safety. Her sessions are paced with utmost respect for your comfort.',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#faecea] dark:bg-[#2a1725] text-dustyRose text-xs font-semibold uppercase tracking-[0.2em] border border-[#ecd8d4] dark:border-pink-500/30">
          Certified Guides & Faculty
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl italic font-normal text-stone-900 dark:text-rose-100 tracking-tight leading-tight">
          Meet our <span className="text-dustyRose">compassionate guides</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
          Every journey begins with a trusting relationship. Our licensed practitioners blend scientific psychology with heartfelt empathy to walk gently beside you.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 p-4 rounded-3xl card-soft-rose">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by practitioner name or expertise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-[#fdf9f7] dark:bg-[#261322] border border-[#ecd8d4] dark:border-pink-500/30 rounded-full text-xs sm:text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-dustyRose transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none">
          {['All', 'Anxiety', 'Couples', 'Trauma', 'Psychologist'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedSpec(filter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedSpec === filter
                  ? 'bg-dustyRose text-white shadow-sm shadow-dustyRose/30 scale-105'
                  : 'bg-[#faecea] dark:bg-[#2a1725] text-stone-700 dark:text-stone-300 hover:text-dustyRose hover:bg-[#f5d5d1]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Therapist Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTherapists.map((doc) => (
          <div
            key={doc._id}
            className="bg-white dark:bg-[#1e111b] border border-[#ecd8d4] dark:border-pink-500/20 rounded-3xl overflow-hidden card-soft-rose hover:border-dustyRose/60 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Doctor Photo */}
              <div className="h-72 overflow-hidden relative">
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 dark:bg-[#140b12]/90 backdrop-blur-md text-[11px] font-semibold text-stone-800 dark:text-rose-200 border border-[#ecd8d4] dark:border-pink-500/30 flex items-center gap-1.5 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-dustyRose" />
                  <span>{doc.experience}+ Years Exp</span>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-7 space-y-4">
                <div>
                  <h3 className="font-editorial text-2xl font-normal text-stone-900 dark:text-rose-100 group-hover:text-dustyRose transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-dustyRose uppercase tracking-wider mt-1">
                    {doc.roleTitle || 'Licensed Specialist'}
                  </p>
                </div>

                {/* Specialization Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-[#faecea] dark:bg-[#2a1725] border border-[#ecd8d4] dark:border-pink-500/20 text-xs text-dustyRose font-medium">
                  {doc.specialization}
                </div>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-4 font-normal">
                  {doc.bio}
                </p>
              </div>
            </div>

            {/* Book with this doctor */}
            <div className="p-7 pt-0">
              <Link
                to={`/book?doctor=${encodeURIComponent(doc.name)}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-dustyRose hover:bg-dustyRose-hover text-white text-xs font-semibold uppercase tracking-widest shadow-md shadow-dustyRose/25 hover:scale-[1.02] active:scale-98 transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Session with {doc.name.split(' ')[1] || doc.name}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Therapists;
