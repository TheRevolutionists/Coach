/* Known-good client script: handles login + dashboard. */

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
      { coach: 'Self‑coached', start_utc: new Date().toISOString(), duration_min: 45, topic: 'Hook shots (today)', summary: '250 hook shots each side of the pitch.' },
      { coach: 'Self‑coached', start_utc: new Date().toISOString(), duration_min: 30, topic: "Coco's Aim Training (daily)", summary: '30 minutes daily aim training.' }
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

  // Kuwait
  kuwait: {
    username: 'Kuwait',
    password: 'Kuwait',
    displayName: 'Kuwait',
    trackerUrl: 'https://rocketleague.tracker.network/rocket-league/profile/epic/komekuwait.ttv/overview',
    profile: {
      rank: 'Champ 2 - Champ 3',
      focus_areas: ['recovery mechanics', 'air consistency', 'flick consistency'],
      availability: 'N/A',
      notes: 'Circle rule for 2s emphasized.',
      goal: 'GC 1'
    },
    sessions: [
      { coach: 'Coach Bushi', start_utc: '2025-08-03T13:00:00-05:00', duration_min: 60, topic: 'Coaching Session', summary: 'Focused on recoveries and aerial control.' },
      { coach: 'Coach Bushi', start_utc: '2025-08-06T13:00:00-05:00', duration_min: 60, topic: 'Coaching Session', summary: 'Rechecked recoveries, introduced flick ladder.' }
    ],
    plan: [
      { day: 'Day 1', title: 'Recovery Reset', body: [
        '15 min: No boost recoveries (landings to supersonic in 2s, camera discipline).',
        '15 min: Wall falls → fast recoveries (single/jump resets).',
        'Custom: 30 ranked 1s touches focused on instant recovery after every hit.'
      ]},
      { day: 'Day 2', title: 'First Touch → Air Control', body: [
        '20 min: First-touch catches into controlled pop (no goal allowed).',
        '20 min: Air roll pathing (S‑curves, throttle feather).',
        'Scrim: 2× Bo3 1s sets; VOD note each lost possession.'
      ]},
      { day: 'Day 3', title: 'Flick Ladder', body: [
        'Warmup: 30 ground dribbles (no boost).',
        'Ladder: basic → 45° → 90° → musty (10 reps each; record best power).',
        '10 comp 2s plays applying circle rule; log 3 good/3 bad plays.'
      ]},
      { day: 'Day 4', title: 'Speed + Control', body: [
        'Speed flips (left/right) 30 reps; cue: car straight before contact.',
        'Aerial routes box → corner → mid (no ball) 15 min, then with ball 15 min.',
        'Replay review: 15 min focus on avoidable stalls (bad landings).'
      ]},
      { day: 'Day 5', title: 'Pressure Simulation', body: [
        'Heatseeker or rings to elevate reaction; 20 min.',
        'Custom training: short bounce reads, 20 min.',
        '2s queues: only fast rotations; if tilt, 5‑min freeplay reset.'
      ]},
      { day: 'Day 6', title: 'Consistency Day', body: [
        'Pick 3 drills you missed—repeat until 80% success.',
        '20 min flick accuracy with power tracking.',
        '1s: 5 games max; focus on kickoff plans and possession from corner.'
      ]},
      { day: 'Day 7', title: 'Assessment', body: [
        'Record a 10‑min playlist of plays. Note 5 recovery wins and 5 losses.',
        'Re-test flick ladder (document best/avg power).',
        'Set next‑week targets toward GC 1.'
      ]}
    ]
  },

  // Trent
  trent: {
    username: 'Trent',
    password: 'Trent',
    displayName: 'Trent',
    trackerUrl: 'https://rocketleague.tracker.network/rocket-league/profile/epic/Flyinplanes/overview',
    profile: {
      rank: 'Target: Diamond 3 / Champ 1 (10 weeks)',
      focus_areas: [
        'possession & first touch',
        'solid rotations (2s/1s fundamentals)',
        'consistency under pressure',
        'efficient recoveries & boost usage'
      ],
      availability: 'Evenings CST',
      notes: 'Following the Road to GC course (10‑week track).',
      goal: 'Reach D3–C1 by end of Week 10'
    },
    sessions: [],
    plan: [
      { day: 'Week 1 — Day 1', title: 'Baseline & Mechanics Audit', body: [
        'Warmup (15m): freeplay car control — wide turns, powerslides, half‑flips; aim for smooth recoveries after every touch.',
        'Mechanic sets (25m): 30 speed‑flip reps each side; 20 wavedash recoveries; 20 half‑flip recoveries (record best/avg success).',
        'Dribble & flicks (15m): 10 controlled carries end‑to‑end; Flick ladder: basic → 45° → 90° (8 reps each).',
        'Games (30m): 3–5 casual 1s. KPI to track: kickoff win %, boost wasted (est.), shots on target/game.'
      ]},
      { day: 'Week 1 — Day 2', title: 'First Touch & Possession', body: [
        'First touch drill (20m): receive rolling balls, settle to controlled carry within 2 touches; no goal allowed.',
        'Pressure pops (15m): pop to sidewall → soft catch; aim for ball height ≤ crossbar on catch.',
        'Decision rule: if contest is 50/50 and you have <30 boost, shadow instead; prioritize back‑post path.',
        'Games (30–45m): 1s focus on possession over shots; concede low‑value shots rather than panic flicks.'
      ]},
      { day: 'Week 1 — Day 3', title: 'Shadow Defense & Backboard', body: [
        'Shadow lanes (20m): mirror the ball at ~45°; never cross front‑post unless clear win.',
        'Backboard clears (15m): 20 reps each side; cue: arrive early, jump once, nose slightly down on contact.',
        'Counter‑attack patterns (10m): soft block → immediate boost pad line → turn on ball.',
        'Games (30m): 1s; KPI: goals conceded from over‑commits ≤ 1/game.'
      ]},
      { day: 'Week 1 — Day 4', title: 'Aerial Consistency & Landings', body: [
        'No‑ball aerial routes (10m): corner → mid → opposite corner; focus on smooth air‑roll pathing.',
        'With‑ball touches (20m): wall takeoffs to soft touches down; target 70% controlled touches.',
        'Landings (10m): 20 sequences: land, face play, supersonic in 2s; if not, redo.',
        'Games (30–45m): 2s or 1s with rule: after every aerial, immediate recovery line to nearest pad path.'
      ]},
      { day: 'Week 1 — Day 5', title: 'Kickoffs & Boost Economy', body: [
        'Kickoff set (25m): 20 standard, 10 delayed, 10 speed‑flip; record outcomes (possession/win/neutral/loss).',
        'Boost economy (15m): pad‑path laps (no ball) using small pads only for 5 minutes; then with ball keep ≥ 40 boost average in freeplay.',
        'Games (30m): 1s focusing on kickoff follow‑ups and holding possession after the win.'
      ]},
      { day: 'Week 1 — Day 6', title: 'Pressure Simulation & Adaptability', body: [
        'Custom pressure (20m): fast bounce reads; aim for first‑time controlled touches.',
        'Scrim set (30m): play a higher‑MMR casual opponent if possible; focus on safe challenges and corner outs.',
        'Review (10m): write 3 strengths, 3 fixes; pick 1 fix to prioritize tomorrow.'
      ]},
      { day: 'Week 1 — Day 7', title: 'Assessment & Light Grind', body: [
        'Assessment set (20m): re‑test speed‑flip, half‑flip success; re‑test flick ladder power/consistency.',
        'Light games (20–30m): only play while composed; stop at first strong tilt signal.',
        'VOD notes (10m): clip 3 good possessions & 3 poor ones; summarize fixes for Week 2.'
      ]},
      { day: 'Week 2', title: 'Coming soon', body: [] },
      { day: 'Week 3', title: 'Coming soon', body: [] },
      { day: 'Week 4', title: 'Coming soon', body: [] },
      { day: 'Week 5', title: 'Coming soon', body: [] },
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

  document.getElementById('displayName').textContent = user.displayName;

  const p = user.profile || {};
  document.getElementById('profile').innerHTML = [
    row('Rank', p.rank || '—'),
    row('Focus Areas', (p.focus_areas || []).join(', ')),
    row('Availability', p.availability || '—'),
    row('Goal', p.goal || '—'),
    row('Notes', p.notes || '—')
  ].join('');

  // Tracker
  const trackerEmbed = document.getElementById('trackerEmbed');
  const trackerLinkWrap = document.getElementById('trackerLinkWrap');
  if (user.trackerUrl) {
    // Responsive wrapper support (if present in HTML/CSS)
    trackerEmbed.innerHTML = `<iframe src="${user.trackerUrl}" loading="lazy" referrerpolicy="no-referrer"></iframe>`;
  } else {
    trackerEmbed.innerHTML = '<p class="muted">No tracker linked yet.</p>';
  }
  if (trackerLinkWrap) {
    trackerLinkWrap.innerHTML = user.trackerUrl ? `If the embed is blocked, open here: <a href="${user.trackerUrl}" target="_blank">${user.trackerUrl}</a>` : '';
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

  document.getElementById('logoutBtn')?.addEventListener('click', () => { clearAuth(); window.location.href = 'index.html'; });
}

function row(key, val) { return `<div class="key">${key}</div><div>${val ?? '—'}</div>`; }
function itemTemplate({ title, meta, body }) { return `<div class="item"><div class="title">${title}</div><div class="meta">${meta}</div><div>${body}</div></div>`; }
function planItem(d) { const list = (d.body || []).map(x => `<li>${x}</li>`).join(''); return `<div class="item"><div class="title">${d.day}: ${d.title}</div><ul>${list}</ul></div>`; }

window.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-page');
  if (page === 'login') onLoginPage();
  if (page === 'dashboard') onDashboardPage();
});
