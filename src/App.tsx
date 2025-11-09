import React, { useState, useEffect } from 'react';
import { Calendar, Zap, Target, Award, Clock, AlertTriangle, CheckCircle, Heart, Briefcase, BookOpen, HelpCircle, Sun, Moon } from 'lucide-react';

const UNIVERSITIES = {
  harvard: { name: "Harvard University", flag: "🇺🇸", difficulty: 5, culture: "Competitive, entrepreneurial, networking-heavy" },
  yale: { name: "Yale University", flag: "🇺🇸", difficulty: 4, culture: "Residential community, arts-focused, collaborative" },
  oxford: { name: "University of Oxford", flag: "🇬🇧", difficulty: 5, culture: "Tutorial-intensive, deep intellectual focus" },
  cambridge: { name: "University of Cambridge", flag: "🇬🇧", difficulty: 5, culture: "Supervision-based, STEM-focused, rigorous" },
  unsw: { name: "UNSW Sydney", flag: "🇦🇺", difficulty: 4, culture: "Industry-connected, practical, beach lifestyle" }
};

const TASKS = {
  monday: [
    { id: 'm1', name: 'CS50 Lecture', type: 'academic', hours: 2, stamina: 20, points: 10, mandatory: true },
    { id: 'm2', name: 'Research Paper Start', type: 'academic', hours: 3, stamina: 35, points: 20 },
    { id: 'm3', name: 'Math Assignment', type: 'academic', hours: 3, stamina: 35, points: 25 },
    { id: 'm4', name: 'Economics Reading', type: 'academic', hours: 2, stamina: 25, points: 15 },
    { id: 'm5', name: 'Resume Workshop', type: 'career', hours: 2, stamina: 15, points: 15 },
    { id: 'm6', name: 'Study Group', type: 'social', hours: 2, stamina: 15, points: 10 },
    { id: 'm7', name: 'Dinner with Friends', type: 'social', hours: 2, stamina: -15, points: 5 },
    { id: 'm8', name: 'Gym Session', type: 'wellness', hours: 1, stamina: -25, points: 5 },
    { id: 'm9', name: 'Free Time', type: 'wellness', hours: 2, stamina: -20, points: 0 }
  ],
  tuesday: [
    { id: 't1', name: 'Math Lecture', type: 'academic', hours: 2, stamina: 20, points: 10, mandatory: true },
    { id: 't2', name: 'CS50 Section', type: 'academic', hours: 1, stamina: 15, points: 5, mandatory: true },
    { id: 't3', name: 'Continue Research', type: 'academic', hours: 3, stamina: 35, points: 20 },
    { id: 't4', name: 'CS50 Problem Set', type: 'academic', hours: 4, stamina: 45, points: 30 },
    { id: 't5', name: 'Office Hours', type: 'academic', hours: 1, stamina: 10, points: 5 },
    { id: 't6', name: 'Debate Prep', type: 'social', hours: 2, stamina: 20, points: 5 },
    { id: 't7', name: 'Debate Tryouts', type: 'social', hours: 2, stamina: 25, points: 30, critical: true },
    { id: 't8', name: 'Coffee Break', type: 'social', hours: 1, stamina: -10, points: 5 },
    { id: 't9', name: 'Yoga', type: 'wellness', hours: 1, stamina: -30, points: 5 },
    { id: 't10', name: 'Nap', type: 'wellness', hours: 1, stamina: -30, points: 0 }
  ],
  wednesday: [
    { id: 'w1', name: 'Economics Lecture', type: 'academic', hours: 2, stamina: 20, points: 10, mandatory: true },
    { id: 'w2', name: 'Finish Research', type: 'academic', hours: 3, stamina: 35, points: 20 },
    { id: 'w3', name: 'Continue CS50', type: 'academic', hours: 3, stamina: 40, points: 20 },
    { id: 'w4', name: 'Lab Report', type: 'academic', hours: 2, stamina: 25, points: 15 },
    { id: 'w5', name: 'Career Fair', type: 'career', hours: 3, stamina: 30, points: 40, critical: true },
    { id: 'w6', name: 'Networking Event', type: 'career', hours: 2, stamina: 20, points: 20 },
    { id: 'w7', name: 'Intramural Sports', type: 'social', hours: 2, stamina: 15, points: 10 },
    { id: 'w8', name: 'Club Meeting', type: 'social', hours: 1, stamina: 10, points: 10 },
    { id: 'w9', name: 'Walk Outside', type: 'wellness', hours: 1, stamina: -20, points: 5 },
    { id: 'w10', name: 'Extended Rest', type: 'wellness', hours: 3, stamina: -50, points: 0 }
  ],
  thursday: [
    { id: 'th1', name: 'Tutorial', type: 'academic', hours: 2, stamina: 20, points: 10, mandatory: true },
    { id: 'th2', name: 'Complete CS50', type: 'academic', hours: 3, stamina: 45, points: 30 },
    { id: 'th3', name: 'Write Paper Draft', type: 'academic', hours: 3, stamina: 40, points: 30 },
    { id: 'th4', name: 'Problem Set Review', type: 'academic', hours: 2, stamina: 25, points: 15 },
    { id: 'th5', name: 'Mock Interview', type: 'career', hours: 2, stamina: 20, points: 20 },
    { id: 'th6', name: 'Industry Talk', type: 'career', hours: 1, stamina: 10, points: 10 },
    { id: 'th7', name: 'Society Event', type: 'social', hours: 2, stamina: 15, points: 15 },
    { id: 'th8', name: 'Dinner Out', type: 'social', hours: 2, stamina: -15, points: 10 },
    { id: 'th9', name: 'Workout', type: 'wellness', hours: 1, stamina: -25, points: 5 },
    { id: 'th10', name: 'Movie Night', type: 'wellness', hours: 2, stamina: -20, points: 0 }
  ],
  friday: [
    { id: 'f1', name: 'Final Lecture', type: 'academic', hours: 2, stamina: 20, points: 10, mandatory: true },
    { id: 'f2', name: 'Revise Paper', type: 'academic', hours: 2, stamina: 30, points: 25 },
    { id: 'f3', name: 'Submit Paper', type: 'academic', hours: 1, stamina: 15, points: 20 },
    { id: 'f4', name: 'Final Problem Set', type: 'academic', hours: 3, stamina: 35, points: 25 },
    { id: 'f5', name: 'Hackathon', type: 'career', hours: 3, stamina: 30, points: 25 },
    { id: 'f6', name: 'Alumni Event', type: 'career', hours: 2, stamina: 15, points: 20 },
    { id: 'f7', name: 'Party', type: 'social', hours: 3, stamina: 20, points: 15 },
    { id: 'f8', name: 'BBQ', type: 'social', hours: 2, stamina: -15, points: 10 },
    { id: 'f9', name: 'Beach Trip', type: 'wellness', hours: 2, stamina: -30, points: 10 },
    { id: 'f10', name: 'Spa Day', type: 'wellness', hours: 2, stamina: -40, points: 5 }
  ]
};

const App = () => {
  const [screen, setScreen] = useState('landing');
  const [showTutorial, setShowTutorial] = useState(false);
  const [profile, setProfile] = useState({ name: '', username: '', email: '', interests: [], extra: '', weakAreas: [], uni: '' });
  const [game, setGame] = useState({ day: 0, stamina: 100, max: 100, scores: { academic: 0, career: 0, social: 0, wellness: 0 } });
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([]);
  const [transitioning, setTransitioning] = useState(false);

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  const Tutorial = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 max-w-2xl max-h-screen overflow-y-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">How to Play</h2>
          <button onClick={() => setShowTutorial(false)} className="text-2xl hover:text-gray-300">✕</button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Time Management</h3>
            <p className="text-sm">You have 14 hours per day. Plan strategically!</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Stamina System</h3>
            <p className="text-sm">Academic tasks drain stamina. Wellness activities restore it. Low stamina means poor performance!</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Scoring</h3>
            <p className="text-sm">Balance Academic, Career, Social, and Wellness for best results.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Transition = ({ day }) => {
    const names = { monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday' };
    const idx = days.indexOf(day);

    useEffect(() => {
      const timer = setTimeout(() => setTransitioning(false), 2500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center z-50">
        <div className="text-center text-white">
          <div className="mb-8">{idx % 2 === 0 ? <Sun className="w-32 h-32 mx-auto text-yellow-400" /> : <Moon className="w-32 h-32 mx-auto text-blue-300" />}</div>
          <h2 className="text-6xl font-bold mb-4">{names[day]}</h2>
          <p className="text-2xl opacity-80">Day {idx + 1} of 5</p>
        </div>
      </div>
    );
  };

  const Landing = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
      <button onClick={() => setShowTutorial(true)} className="absolute top-8 right-8 flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
        <HelpCircle className="w-5 h-5" /> Tutorial
      </button>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4">College Week Challenge</h1>
        <p className="text-2xl mb-8">Think You're Ready for Harvard?</p>
        <div className="bg-white/10 rounded-2xl p-8">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div><div className="text-4xl mb-2">⏱️</div><div>15-20 min</div></div>
            <div><div className="text-4xl mb-2">📊</div><div>Instant results</div></div>
            <div><div className="text-4xl mb-2">🎯</div><div>100% free</div></div>
          </div>
          <button onClick={() => setScreen('profile')} className="bg-gradient-to-r from-pink-500 to-purple-500 px-12 py-4 rounded-full text-xl font-bold">
            Take the Challenge
          </button>
        </div>
      </div>
      {showTutorial && <Tutorial />}
    </div>
  );

  const Profile = () => {
    const academics = ['Computer Science', 'Medicine', 'Law', 'Economics', 'Engineering', 'Psychology', 'Physics', 'Chemistry'];
    const extras = ['Debate', 'Sports', 'Music', 'Drama', 'Entrepreneurship', 'Journalism'];
    const weak = ['Time Management', 'Procrastination', 'Motivation', 'Work-Life Balance', 'Perfectionism', 'Stress Management'];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white p-8">
        <button onClick={() => setShowTutorial(true)} className="absolute top-8 right-8 flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
          <HelpCircle className="w-5 h-5" /> Tutorial
        </button>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">Create Your Profile</h2>
              <span>Step {step}/4</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full"><div className="h-full bg-purple-500 transition-all" style={{width: step * 25 + '%'}} /></div>
          </div>

          <div className="bg-white/10 rounded-2xl p-8">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block mb-2">Full Name</label>
                  <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value.replace(/[^a-zA-Z\s]/g, '')})} 
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block mb-2">Username</label>
                  <input value={profile.username} onChange={e => setProfile({...profile, username: e.target.value.replace(/[^a-zA-Z0-9_-]/g, '')})}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white" placeholder="john_doe" />
                </div>
                <div>
                  <label className="block mb-2">Email</label>
                  <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white" placeholder="john@email.com" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl mb-2">Academic Interests</h3>
                  <p className="text-sm opacity-75 mb-4">Choose 2</p>
                  <div className="grid grid-cols-2 gap-3">
                    {academics.map(a => (
                      <button key={a} onClick={() => {
                        if (profile.interests.includes(a)) setProfile({...profile, interests: profile.interests.filter(i => i !== a)});
                        else if (profile.interests.length < 2) setProfile({...profile, interests: [...profile.interests, a]});
                      }} className={'p-3 rounded-lg border-2 text-sm ' + (profile.interests.includes(a) ? 'bg-purple-500' : 'bg-white/10')}>
                        {a}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm mt-2 opacity-75">Selected: {profile.interests.length}/2</p>
                </div>
                <div>
                  <h3 className="text-xl mb-2">Extracurricular</h3>
                  <p className="text-sm opacity-75 mb-4">Choose 1</p>
                  <div className="grid grid-cols-2 gap-3">
                    {extras.map(e => (
                      <button key={e} onClick={() => setProfile({...profile, extra: e})}
                        className={'p-3 rounded-lg border-2 text-sm ' + (profile.extra === e ? 'bg-pink-500' : 'bg-white/10')}>
                        {e}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm mt-2 opacity-75">Selected: {profile.extra ? '1/1' : '0/1'}</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-xl mb-2">Where do you struggle?</h3>
                <p className="text-sm opacity-75 mb-4">Select up to 3</p>
                <div className="grid grid-cols-2 gap-3">
                  {weak.map(w => (
                    <button key={w} onClick={() => {
                      if (profile.weakAreas.includes(w)) setProfile({...profile, weakAreas: profile.weakAreas.filter(a => a !== w)});
                      else if (profile.weakAreas.length < 3) setProfile({...profile, weakAreas: [...profile.weakAreas, w]});
                    }} className={'p-3 rounded-lg border-2 text-sm ' + (profile.weakAreas.includes(w) ? 'bg-orange-500' : 'bg-white/10')}>
                      {w}
                    </button>
                  ))}
                </div>
                <p className="text-sm mt-2 opacity-75">Selected: {profile.weakAreas.length}/3</p>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Choose Your University</h3>
                <div className="space-y-4">
                  {Object.entries(UNIVERSITIES).map(([k, u]) => (
                    <button key={k} onClick={() => setProfile({...profile, uni: k})}
                      className={'w-full p-4 rounded-xl border-2 text-left ' + (profile.uni === k ? 'bg-purple-500' : 'bg-white/10')}>
                      <div className="font-bold text-lg">{u.flag} {u.name}</div>
                      <div className="text-sm opacity-90">{u.culture}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {step > 1 && <button onClick={() => setStep(step - 1)} className="flex-1 bg-white/20 py-3 rounded-lg">Back</button>}
              <button onClick={() => {
                if (step < 4) setStep(step + 1);
                else { setTransitioning(true); setTimeout(() => { setTransitioning(false); setScreen('game'); }, 2500); }
              }} disabled={(step === 1 && (!profile.name || !profile.username || !profile.email)) || (step === 2 && (profile.interests.length !== 2 || !profile.extra)) || (step === 3 && !profile.weakAreas.length) || (step === 4 && !profile.uni)}
                className={'flex-1 py-3 rounded-lg font-bold ' + ((step === 1 && profile.name && profile.username && profile.email) || (step === 2 && profile.interests.length === 2 && profile.extra) || (step === 3 && profile.weakAreas.length) || (step === 4 && profile.uni) ? 'bg-purple-500' : 'bg-gray-500 opacity-50')}>
                {step < 4 ? 'Next' : 'Start'}
              </button>
            </div>
          </div>
        </div>
        {showTutorial && <Tutorial />}
        {transitioning && <Transition day="monday" />}
      </div>
    );
  };

  const Game = () => {
    const day = days[game.day];
    const tasks = TASKS[day];
    const names = { monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday' };

    const calc = () => {
      let time = 0, stam = game.stamina, pts = { academic: 0, career: 0, social: 0, wellness: 0 };
      tasks.filter(t => t.mandatory).forEach(t => { time += t.hours; stam -= t.stamina; pts[t.type] += t.points; });
      selected.forEach(id => {
        const t = tasks.find(x => x.id === id && !x.mandatory);
        if (t) {
          time += t.hours;
          stam = t.stamina < 0 ? Math.min(game.max, stam - t.stamina) : stam - t.stamina;
          pts[t.type] += t.points;
        }
      });
      return { time, stam: Math.round(stam), pts };
    };

    const res = calc();

    const next = () => {
      const sc = { academic: game.scores.academic + res.pts.academic, career: game.scores.career + res.pts.career, social: game.scores.social + res.pts.social, wellness: game.scores.wellness + res.pts.wellness };
      if (game.day < 4) {
        setTransitioning(true);
        setTimeout(() => {
          setGame({ day: game.day + 1, stamina: Math.min(game.max, Math.max(30, res.stam + 30)), max: game.max, scores: sc });
          setSelected([]);
          setTransitioning(false);
        }, 2500);
      } else {
        setGame({ ...game, scores: sc });
        setScreen('results');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
        <button onClick={() => setShowTutorial(true)} className="absolute top-8 right-8 flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
          <HelpCircle className="w-5 h-5" /> Tutorial
        </button>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-2">{names[day]}, Week 5</h2>
            <p className="text-sm opacity-75 mb-6">Day {game.day + 1} of 5</p>

            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-4 gap-4 mb-3">
                <div><div className="text-xs opacity-75">Current</div><div className="flex items-center gap-2"><Zap className="w-5 h-5" /><span>{game.stamina}</span></div></div>
                <div><div className="text-xs opacity-75">After</div><div className="flex items-center gap-2"><Zap className="w-5 h-5" /><span>{res.stam}</span></div></div>
                <div><div className="text-xs opacity-75">Time</div><div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span>{res.time}/14h</span></div></div>
                <div><div className="text-xs opacity-75">Points</div><div className="flex items-center gap-2"><Target className="w-5 h-5" /><span>{Object.values(res.pts).reduce((a,b)=>a+b,0)}</span></div></div>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" style={{width: Math.min(100, Math.max(0, (res.stam/game.max)*100)) + '%'}} />
              </div>
              {res.stam < 40 && <p className="text-red-400 text-xs mt-2">Low stamina warning!</p>}
            </div>

            <div className="space-y-2 mb-6">
              {tasks.map(t => {
                const sel = selected.includes(t.id);
                const colors = { academic: 'border-blue-500 bg-blue-500/20', career: 'border-purple-500 bg-purple-500/20', social: 'border-pink-500 bg-pink-500/20', wellness: 'border-green-500 bg-green-500/20' };
                if (t.mandatory) return (
                  <div key={t.id} className="bg-red-500/20 border-l-4 border-red-500 p-3 rounded">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm opacity-90">{t.hours}h | {t.stamina} stamina | {t.points} pts</div>
                  </div>
                );
                return (
                  <button key={t.id} onClick={() => sel ? setSelected(selected.filter(x => x !== t.id)) : setSelected([...selected, t.id])}
                    className={'w-full border-l-4 p-3 rounded text-left ' + colors[t.type] + (sel ? ' ring-2 ring-white' : '')}>
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <div className="font-semibold">{t.name} {t.critical && <span className="text-xs bg-red-500 px-2 py-0.5 rounded ml-2">CRITICAL</span>}</div>
                        <div className="text-sm opacity-90">{t.hours}h | {t.stamina < 0 ? 'Restores ' + Math.abs(t.stamina) : t.stamina} stamina | {t.points} pts</div>
                      </div>
                      {sel && <CheckCircle className="w-6 h-6 text-green-400" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <button onClick={next} disabled={res.time > 14} className={'w-full py-4 rounded-xl font-bold text-lg ' + (res.time <= 14 ? 'bg-purple-500' : 'bg-gray-500 opacity-50')}>
              Complete {names[day]}
            </button>
          </div>
        </div>
        {showTutorial && <Tutorial />}
        {transitioning && <Transition day={days[game.day + 1]} />}
      </div>
    );
  };

  const Results = () => {
    const tot = Object.values(game.scores).reduce((a,b) => a+b, 0);
    const pct = Math.round((tot/800)*100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 rounded-2xl p-8">
            <h1 className="text-4xl font-bold text-center mb-6">Week Complete!</h1>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-center mb-8">
              <div className="text-6xl font-bold">{pct}%</div>
              <div className="text-xl">Score: {tot}/800</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-500/20 p-6 rounded-xl"><div className="text-2xl">Academic</div><div className="text-4xl font-bold">{game.scores.academic}</div></div>
              <div className="bg-purple-500/20 p-6 rounded-xl"><div className="text-2xl">Career</div><div className="text-4xl font-bold">{game.scores.career}</div></div>
              <div className="bg-pink-500/20 p-6 rounded-xl"><div className="text-2xl">Social</div><div className="text-4xl font-bold">{game.scores.social}</div></div>
              <div className="bg-green-500/20 p-6 rounded-xl"><div className="text-2xl">Wellness</div><div className="text-4xl font-bold">{game.scores.wellness}</div></div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 mb-8">
              <h3 className="text-2xl font-bold mb-4">Your Profile Analysis</h3>
              <p className="mb-4">Hello {profile.username}! Based on your performance this week at {UNIVERSITIES[profile.uni].name}, here's your detailed breakdown:</p>
              
              {pct >= 70 && (
                <div className="space-y-4">
                  <p className="text-sm">You demonstrated excellent time management and balance. You maintained strong academic performance while engaging in career networking and social activities. Your wellness score shows you understood the importance of rest and recovery.</p>
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">Strengths:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Strategic planning and prioritization</li>
                      <li>Balanced approach across all areas</li>
                      <li>Good stamina management</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/20 p-4 rounded-lg">
                    <p className="text-sm font-semibold">You are READY for top universities!</p>
                  </div>
                </div>
              )}

              {pct >= 40 && pct < 70 && (
                <div className="space-y-4">
                  <p className="text-sm">You showed ambition but struggled with time management. You tried to do too much and experienced burnout mid-week. This is a common mistake that can be corrected with better planning.</p>
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-2">Areas to Improve:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Start major assignments earlier</li>
                      <li>Learn to say no to some opportunities</li>
                      <li>Schedule rest BEFORE burnout hits</li>
                      <li>Prioritize critical deadlines over social events</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-500/20 p-4 rounded-lg">
                    <p className="text-sm font-semibold">You are DEVELOPING. Work on these skills before applying.</p>
                  </div>
                </div>
              )}

              {pct < 40 && (
                <div className="space-y-4">
                  <p className="text-sm">You experienced severe difficulties this week. Multiple deadlines were missed, burnout was severe, and performance suffered across all categories. This indicates you need significant skill development before tackling a top university.</p>
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">Critical Issues:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Time management skills need major work</li>
                      <li>Unable to handle multiple simultaneous deadlines</li>
                      <li>Burnout prevention strategies missing</li>
                      <li>Need to learn realistic capacity assessment</li>
                    </ul>
                  </div>
                  <div className="bg-red-500/20 p-4 rounded-lg">
                    <p className="text-sm font-semibold">You are NOT READY. Take time to build foundational skills first.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/10 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-3">Personalized Resources</h3>
              <div className="space-y-3">
                {profile.weakAreas.map(area => (
                  <div key={area} className="bg-blue-500/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-1">{area} Workshop</h4>
                    <p className="text-sm opacity-90 mb-2">Targeted strategies for improving {area.toLowerCase()}</p>
                    <button className="text-sm text-blue-300 hover:text-blue-200">Learn More →</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-3">Join Our Masterclass</h3>
              <p className="mb-4">Learn what top students (75%+ scores) did differently</p>
              <div className="bg-white/20 rounded-lg p-4 mb-4">
                <p className="font-semibold mb-1">Results sent to:</p>
                <p className="text-sm">{profile.email}</p>
              </div>
              <button className="w-full bg-white text-purple-900 font-bold py-3 rounded-lg">
                Register for Webinar →
              </button>
            </div>

            <div className="text-center">
              <button onClick={() => {
                setScreen('landing');
                setProfile({ name: '', username: '', email: '', interests: [], extra: '', weakAreas: [], uni: '' });
                setGame({ day: 0, stamina: 100, max: 100, scores: { academic: 0, career: 0, social: 0, wellness: 0 } });
                setSelected([]);
                setStep(1);
              }} className="bg-white/20 hover:bg-white/30 py-3 px-8 rounded-lg">
                Try Different University
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {screen === 'landing' && <Landing />}
      {screen === 'profile' && <Profile />}
      {screen === 'game' && <Game />}
      {screen === 'results' && <Results />}
    </div>
  );
};

export default App;