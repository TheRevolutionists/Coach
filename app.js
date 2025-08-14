/* Client script for login + dashboard (Bushi, Kuwait, Trent).
   - Uses localStorage for a simple “auth” key
   - Renders per-user profile, tracker, sessions, and plan
*/

function offsetDaysISO(days) { return new Date(Date.now() + days * 86400000).toISOString(); }

const USERS = {
  // Bushi
  bushi: {
    username: 'Bushi',
    password: 'BushiRL',
    displayName: 'Bushi',
    trackerUrl: 'https://rocketleague.tracker.network/rocket-league/profile/steam/76561198208999589/overview',
    profile: {
      rank: 'Casual 1s: 1700 MMR',
      focus_areas: ['foundational mechanics', 'game understanding', 'hook shots', "Coco's aim training"],
      availability: 'N/A',
      notes: "Learning block now–end of September: RL Data Coach + Jack's Next Rank course daily.",
      goal: '2,000 casual MMR (1s), then switch to ranked'
    },
    sessions: [
      { coach: 'Self-coached', start_utc: new Date().toISOString(), duration_min: 45, topic: 'Hook shots (today)', summary: '250 hook shots each side of the pitch.' },
      { coach: 'Self-coached', start_utc: new Date().toISOString(), duration_min: 30, topic: "Coco's Aim Training (daily)", summary: '30 minutes daily aim training.' }
    ],
    plan: [
      { day: 'Block (Now → Sep 30)', title: 'Foundational Learning', body: [
        "Daily: Jack's Next Rank course — 1 lesson, take notes, apply in freeplay",
        'Daily: RL Data Coach study — concepts to apply next queue',
        "Daily: Coco's Aim Training — 30 minutes",
        'Every 3 days (starting tomorrow): upload 1 replay to RL Data Coach for review'
      ]},
      { day: 'Today', title: 'Execution Focus', body: [
        'Hook shots: 250 reps from each side (log best speed/consistency)',
        '1v1 focus: kickoff plan → first touch → early recoveries',
        'Tilt rule: if tilted, 5 min freeplay reset'
      ]},
      { day: 'Daily Routine', title: '1v1 Grind Toward 2k Casual', body: [
        'Warmup: 10 min freeplay; 20 hook-shot reps each side',
        'Queue 1v1 casual: play to performance (not MMR), aim for possession control',
        'Post-session: 10 min VOD or written notes (3 wins/3 fixes)'
      ]}
    ]
  },

  kuwait: {
    username: 'Kuwait',
    password: 'Kuwait',
    displayName: 'Kuwait',
    trackerUrl: 'https://rocketleague.tracker.network/rocket-league/profile/epic/komekuwait.ttv/overview',
    profile: {
      rank: 'Champ 2 – Champ 3',
      focus_areas: ['consistency at speed', 'smart challenges (no overcommit)', 'recoveries & boost economy', 'backboard defense', 'two-touch offense'],
      availability: 'N/A',
      notes: 'One-week GC1 push focused on low-risk, high-consistency play using the circle rule.',
      goal: 'GC 1',
      stall_reasons: [
        'Overcommitting on offense (risky 50s with no support)',
        'Inconsistent recoveries (out of the play after misses)',
        'Poor boost management (<30 boost commits, no pad path)',
        'Ignoring teammate position (1v2 plays, cutting rotation)',
        'No shot variety (predictable power shots, no delays/fakes)'
      ]
    },
    sessions: [
      { coach: 'Coach Bushi', start_utc: '2025-08-03T13:00:00-05:00', duration_min: 60, topic: 'Coaching Session', summary: 'Recoveries & aerial control.' },
      { coach: 'Coach Bushi', start_utc: '2025-08-06T13:00:00-05:00', duration_min: 60, topic: 'Coaching Session', summary: 'Circle rule & decision timing.' }
    ],
    plan: [
      {
        day: 'Day 1',
        title: 'Foundation & Speed Control',
        body: [
          'Custom Pack: medium-pace ground/corner shots — 100% accuracy goal before speeding up.',
          'Freeplay: circle-rule pathing at ~80% pace; never boost-drain fully; practice pad-to-pad routes.',
          'Replay review (30m): find 5 overcommits or speed chases; write the safer alternative.',
          'Ranked 2s (5 games): only safe challenges, second-man ready; KPI: <1 double-commit.'
        ]
      },
      {
        day: 'Day 2',
        title: 'Consistency in Challenges',
        body: [
          'Shadow defense (20m): stay one car behind the ball at 45°; force bad shots.',
          'Saves pack (15m): ground & mid-height blocks; hands neutral, no panic jumps.',
          'Challenge rulesheet: hard commit only on clear win; otherwise delay/fake.',
          'Ranked 2s (6 games): record; KPI: forced bad shots ≥3/game.'
        ]
      },
      {
        day: 'Day 3',
        title: 'Controlled Speed & Recovery',
        body: [
          'Figure-8 pad route (15m): supersonic with clean turns; no wall crashes.',
          'Recovery reps (15m): flip-cancel → wavedash after every touch; immediate face-play.',
          'Decision cue: awkward touch → abort to back-post instead of forcing speed.',
          'Ranked 2s (5 games): KPI: average boost >40 during defense.'
        ]
      },
      {
        day: 'Day 4',
        title: 'Two-Touch Offense & First Touch',
        body: [
          'First-touch into lane (20m): feed to self → settle → placed shot; 30 reps.',
          'Half-volleys (15m): strike early rise; low far-post placement; 30 reps.',
          'Corner carry → cut-inside (10m): 15 reps each side; keep ball tight.',
          'Ranked 2s (5 games): prioritize two-touch plays over 1-touch clears.'
        ]
      },
      {
        day: 'Day 5',
        title: 'Defensive Solidity & Backboard',
        body: [
          'Backboard clears: 20 clean clears per side (arrive early, one jump, nose slightly down).',
          'Shadow → challenge timing: engage as ball starts to drop; 20 reps.',
          'Ranked 2s (5 games): KPI: 0 own-goals, missed open nets ≤1.'
        ]
      },
      {
        day: 'Day 6',
        title: 'Match Simulation Day',
        body: [
          'Tournament set: 8 ranked 2s back-to-back; between games write 1 fix → apply next.',
          'Fuel rule: keep ≥40 boost before any hard challenge; otherwise pad path first.',
          'KPI: goals conceded from overcommit ≤1/game.'
        ]
      },
      {
        day: 'Day 7',
        title: 'GC Push & Reinforcement',
        body: [
          'Warm-up: 15m freeplay + 15m mixed pack.',
          'Queue only while composed; instant 5-min reset on tilt.',
          'Replay wins: clip 3 good rotations & 3 smart non-challenges; lock the habits.'
        ]
      },
      {
        day: 'Daily Mental & Confidence',
        title: 'Short Protocol (Use Every Day)',
        body: [
          'Breath 2m before queues: 4-in / 6-out.',
          'Rule of 3: after each game note 1 strength, 1 fix, 1 cue for next game.',
          'Tilt breaker: two rushed whiffs → 5-min freeplay reset.',
          'End on a win drill: 10 simple perfect placements before closing.'
        ]
      }
    ]
  },
   
  trent: {
    username: 'Trent',
    password: 'Trent',
    displayName: 'Trent',
    trackerUrl: 'https://rocketleague.tracker.network/rocket-league/profile/epic/Flyinplanes/overview',
    profile: {
      rank: 'Low Diamond (2s)',
      focus_areas: [
        'shot accuracy (ground / non-aerial)',
        'air control & aerial shots',
        'dribbling (incl. jump dribbles)',
        'two core flicks',
        'recoveries',
        'confidence & mental'
      ],
      availability: 'Evenings CST',
      notes: 'Road to GC course — 10 weeks; target D3/C1 by end.',
      goal: 'Reach Diamond 3 / Champ 1 by Week 10'
    },
    sessions: [],
    plan: [
      // ===========================
      // WEEK 1 — SHOT ACCURACY (GROUND/NON-AERIAL)
      // ===========================
      {
        day: 'Week 1 — Day 1',
        title: 'Baseline + Form First',
        body: [
          'Warmup (10m): 5A6A-A297-CCB3-1C5D (Training Pack).',
          'Pack (15m): 1FA9-8CAF-8EF2-21B7.',
          'Packs (. . .): Complete the Bronze, Silver, Gold, Plat. Complete 3 times each.',
        ]
      },
      {
        day: 'Week 1 — Day 2',
        title: 'Placement Over Power',
        body: [
          'Pack (Complete 10 times): 4912-A5C9-9A56-555D',
          'Packs (Complete each 2 times): Complete Bronze - Diamond',
          '1v1 Games: 3-5 Games',
        ]
      },
      {
        day: 'Week 1 — Day 3',
        title: 'Power Shot Mechanics (Still Grounded)',
        body: [
          'Day 1 + Day 2 Work'
        ]
      },
      {
        day: 'Week 1 — Day 4',
        title: 'First-Touch to Shot',
        body: [
          'Feeds (20m): soft pass to self → first-touch into lane → shot (30 reps).',
          'Half-volley (15m): let ball bounce once, strike early rise — 30 reps.',
          'Corner cuts (10m): carry from corner, cut inside to far-post finish — 15 each side.',
          '2s (30m): look for first-touch lanes, avoid panic shots.',
          'Mental (5m): 3 clips of good prep touches (save for review).'
        ]
      },
      {
        day: 'Week 1 — Day 5',
        title: 'Under Pressure Accuracy',
        body: [
          'Shot clock: 1.5s timer from first touch to strike — 40 reps mixed spots.',
          'Small-goal constraint: shrink target (imagine inner box); 30 reps must hit inside.',
          'Recovery into shot: turn, grab pads, quick set → shot (20 reps).',
          '2s (30m): “accuracy > power” rule; KPI: ≥70% on target.',
          'Reset (5m): 10 simple side-net finishes.'
        ]
      },
      {
        day: 'Week 1 — Day 6',
        title: 'Consistency Day (Re-test)',
        body: [
          'Re-run Day 1 pack: must beat your best on-target %.',
          'Corners: 20 each side with a defender bot; pick corner away from them.',
          'Edge cases: weak-foot sides and tight angles — 20 reps.',
          '2s (30m): focus on choosing the BEST shot, even if fewer attempts.',
          'Mental (5m): note 3 “bad shot triggers” to avoid tomorrow.'
        ]
      },
      {
        day: 'Week 1 — Day 7',
        title: 'Assessment & Transfer',
        body: [
          'Assessment pack (20m): 60 mixed ground shots; record on-target %, post placement map.',
          'Live pressure (15m): mirror defense → quick strike decisions.',
          '2s (30m): hunt quality — passes > bad shots.',
          'VOD (10m): mark 3 great shots and 3 passes where you skipped a bad shot.',
          'Set Week 2 intention: air control will build on this accuracy.'
        ]
      },

      // DAILY CONFIDENCE / MENTAL (applies every day in Week 1)
      {
        day: 'Week 1 — Daily Mental & Confidence',
        title: 'Short, Repeatable Protocol',
        body: [
          'Breathing: 2 minutes before queues — 4 in and out.',
          'Rule of 3: After every game, list 1 strength, 1 fix, 1 specific shot cue.',
          'Tilt breaker: if two rushed whiffs, 5-minute freeplay reset; resume only when calm.',
          'End on a win drill: End on a win.'
        ]
      },

      // ===========================
      // WEEK 2–5 — TOPICS (coming soon)
      // ===========================
      { day: 'Week 2 — Focus', title: 'Air Control, Aerials & Aerial Shots', body: ['Coming soon.'] },
      { day: 'Week 3 — Focus', title: 'Dribbling (incl. Jump Dribbles)', body: ['Coming soon.'] },
      { day: 'Week 4 — Focus', title: 'Flicks (Master 2 Types Only)', body: ['Coming soon.'] },
      { day: 'Week 5 — Focus', title: 'Recoveries (Speed, Landings, Pad Paths)', body: ['Coming soon.'] },

      // Weeks 6–10 placeholders (keep structure)
      { day: 'Week 6', title: 'Coming soon', body: [] },
      { day: 'Week 7', title: 'Coming soon', body: [] },
      { day: 'Week 8', title: 'Coming soon', body: [] },
      { day: 'Week 9', title: 'Coming soon', body: [] },
      { day: 'Week 10', title: 'Coming soon', body: [] }
    ]
  }
};

const AUTH_KEY = 'rl_auth_user';
function setAuth(name) { localStorage.setItem(AUTH_KEY, name); }
function getAuth() { return localStorage.getItem(AUTH_KEY); }
function clearAuth() { localStorage.removeItem(AUTH_KEY); }

function onLoginPage() {
  const form = document.getElementById('loginForm');
  const errorEl = document.getElementById('error');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    errorEl.classList.add('hidden');

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const key = (username || '').toLowerCase();

    const user = USERS[key];
    if (!user) { errorEl.textContent = 'User not found'; errorEl.classList.remove('hidden'); return; }
    if (password !== user.password) { errorEl.textContent = 'Wrong password'; errorEl.classList.remove('hidden'); return; }

    setAuth(key);
    window.location.href = 'dashboard.html';
  });

  if (getAuth()) window.location.href = 'dashboard.html';
}

function onDashboardPage() {
  const key = getAuth();
  if (!key || !USERS[key]) { window.location.href = 'index.html'; return; }
  const user = USERS[key];

  // Greeting
  document.getElementById('displayName').textContent = user.displayName;

  const p = user.profile || {};
const stallHtml = (p.stall_reasons && p.stall_reasons.length)
  ? `<ul>${p.stall_reasons.map(x => `<li>${x}</li>`).join('')}</ul>`
  : '—';

document.getElementById('profile').innerHTML = [
  row('Rank', p.rank || '—'),
  row('Focus Areas', (p.focus_areas || []).join(', ')),
  row('Availability', p.availability || '—'),
  row('Goal', p.goal || '—'),
  row('Notes', p.notes || '—'),
  row('Why C2/C3 → GC1 stalls', stallHtml)
].join('');


  // Tracker (responsive wrapper already in HTML/CSS)
  const trackerEmbed = document.getElementById('trackerEmbed');
  const trackerLinkWrap = document.getElementById('trackerLinkWrap');
  if (user.trackerUrl) {
    trackerEmbed.innerHTML = `<iframe src="${user.trackerUrl}" loading="lazy" referrerpolicy="no-referrer"></iframe>`;
    trackerLinkWrap.innerHTML = `If the embed is blocked, open here: <a href="${user.trackerUrl}" target="_blank">${user.trackerUrl}</a>`;
  } else {
    trackerEmbed.innerHTML = '<p class="muted">No tracker linked yet.</p>';
    trackerLinkWrap.textContent = '';
  }

  // Sessions
  const sessionsEl = document.getElementById('sessions');
  const sessions = user.sessions || [];
  sessionsEl.innerHTML = sessions.length ? sessions.map(s => itemTemplate({
    title: s.topic || 'Session',
    meta: `Coach: ${s.coach} • ${new Date(s.start_utc).toLocaleString()} • ${s.duration_min || 0} min`,
    body: s.summary || ''
  })).join('') : '<p class="muted">No sessions yet.</p>';

  // Plan
  const planEl = document.getElementById('plan');
  const plan = user.plan || [];
  planEl.innerHTML = plan.length ? plan.map(d => planItem(d)).join('') : '<p class="muted">Plan not set yet.</p>';

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', () => { clearAuth(); window.location.href = 'index.html'; });
}

function row(key, val) { return `<div class="key">${key}</div><div>${val ?? '—'}</div>`; }
function itemTemplate({ title, meta, body }) { return `<div class="item"><div class="title">${title}</div><div class="meta">${meta}</div><div>${body}</div></div>`; }
function planItem(d) {
  const list = (d.body || []).map(x => `<li>${x}</li>`).join('');
  return `<div class="item"><div class="title">${d.day}: ${d.title}</div><ul>${list}</ul></div>`;
}

window.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-page');
  if (page === 'login') onLoginPage();
  if (page === 'dashboard') onDashboardPage();
});
