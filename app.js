/* Static client logic (no backend). Title updated to Bushi's Coaching.
   Users: Kuwait, Trent (password same as name). */

const USERS = {
  kuwait: {
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
      // Past sessions at 1:00 PM America/Chicago (CDT is UTC-05:00 in August)
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
        'Custom training: short bounce reads (code of your choice), 20 min.',
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
  trent: {
    displayName: 'Trent',
    trackerUrl: '', // add later if desired
    profile: {
      rank: 'Champ 2',
      focus_areas: ['recovery mechanics', 'air consistency', 'flick consistency'],
      availability: 'Evenings CST',
      notes: 'Circle rule for 2s emphasized.',
      goal: ''
    },
    sessions: [],
    plan: []
  }
};

const AUTH_KEY = 'rl_auth_user';

function setAuth(username) { localStorage.setItem(AUTH_KEY, username); }
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
    const uname = (username || '').toLowerCase();

    const user = USERS[uname];
    if (!user) { errorEl.textContent = 'User not found'; errorEl.classList.remove('hidden'); return; }
    if (password !== user.displayName) { errorEl.textContent = 'Wrong password'; errorEl.classList.remove('hidden'); return; }

    setAuth(uname);
    window.location.href = 'dashboard.html';
  });

  if (getAuth()) window.location.href = 'dashboard.html';
}

function onDashboardPage() {
  const uname = getAuth();
  if (!uname || !USERS[uname]) { window.location.href = 'index.html'; return; }
  const user = USERS[uname];

  // Greeting
  document.getElementById('displayName').textContent = user.displayName;

  // Profile
  const p = user.profile;
  document.getElementById('profile').innerHTML = [
    row('Rank', p.rank),
    row('Focus Areas', (p.focus_areas || []).join(', ')),
    row('Availability', p.availability || '—'),
    row('Goal', p.goal || '—'),
    row('Notes', p.notes || '—')
  ].join('');

  // Tracker embed (may be blocked by site; show link fallback always)
  const trackerEmbed = document.getElementById('trackerEmbed');
  const trackerLinkWrap = document.getElementById('trackerLinkWrap');
  if (user.trackerUrl) {
    trackerEmbed.innerHTML = `<iframe src="${user.trackerUrl}" style="width:100%;height:360px;border:1px solid var(--border);border-radius:12px;" loading="lazy" referrerpolicy="no-referrer"></iframe>`;
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
    meta: `Coach: ${s.coach} • ${new Date(s.start_utc).toLocaleString()} • ${s.duration_min} min`,
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
