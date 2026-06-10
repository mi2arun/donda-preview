/* =====================================================================
   MEGHA ERP — single-master page renderer
   Each m-<key>.html sets <body data-master="<key>"> and loads
   masters-data.js then this file. Builds the full production chrome
   (top bar, module menu, breadcrumb, grid) for that one master.
   The module-menu dropdowns navigate to the other m-<key>.html files.
   ===================================================================== */
(function () {
  const ALL = [];
  MASTER_GROUPS.forEach(g => g.masters.forEach(m => ALL.push({ ...m, group: g.group })));
  const key = document.body.dataset.master;
  const current = ALL.find(m => m.key === key) || ALL[0];
  document.title = current.title + ' Master — Megha ERP';

  // ── module menu (links to sibling files) ──
  const menu = MASTER_GROUPS.map((g, gi) => {
    const hasActive = g.masters.some(m => m.key === current.key);
    return `<div class="mod${hasActive ? ' has-active' : ''}" data-gi="${gi}">
        <button class="modbtn" data-gi="${gi}"><span class="ic">${g.icon}</span> ${g.group} <span class="cv">▾</span></button>
        <div class="dropdown">${g.masters.map(m =>
          `<a class="${m.key === current.key ? 'active' : ''}" href="m-${m.key}.html"><span class="ic">${m.icon}</span> ${m.title}</a>`).join('')}</div>
      </div>`;
  }).join('');

  // ── chrome ──
  const chrome = `
    <div class="topbar">
      <div class="tb-grid">▦</div>
      <div class="brand"><b>Megha</b><span>ERP</span></div>
      <div class="tabs">
        <a class="tab" href="masters.html" style="text-decoration:none"><span class="ic">▦</span> Masters <span class="x">✕</span></a>
        <div class="tab active"><span class="ic">${current.icon}</span> ${current.title} <span class="x">✕</span></div>
      </div>
      <div class="tb-spacer"></div>
      <div class="tb-ico">⋯</div>
      <div class="tb-search">🔍 <span>Search</span> <kbd>⌘K</kbd></div>
      <div class="tb-ico">💎</div><div class="tb-ico">?</div><div class="tb-ico">✉</div>
      <div class="avatar">SA</div>
    </div>
    <div class="modnav" id="modnav">${menu}</div>
    <div class="crumb">Masters <span class="sep">›</span> ${current.group} <span class="sep">›</span> <span class="cur">${current.title}</span></div>
    <div class="page">
      <div class="page-head">
        <div class="ph-icon">${current.icon}</div>
        <h1>${current.title} Master</h1>
        <div class="spacer"></div>
        <button class="btn primary">＋ Add ${current.singular}</button>
      </div>
      <div class="gridcard">
        <div class="grid-tools">
          <div class="spacer"></div>
          <div class="gt-search">🔍 <input id="q" placeholder="Search across all columns.."></div>
          <div class="gt-ico" title="Refresh">⟳</div><div class="gt-ico" title="Fullscreen">⤢</div>
          <div class="gt-ico" title="Help">?</div><div class="gt-ico" title="More">⋮</div>
        </div>
        <div class="tbl-scroll"><table class="grid"><thead><tr id="head"></tr></thead><tbody id="rows"></tbody></table></div>
        <div class="grid-foot"><span id="count">— rows</span><div class="spacer"></div><div class="zoom">− <b>12px</b> ＋</div><span title="info">ⓘ</span></div>
      </div>
    </div>
    <div class="statusbar">
      <div class="s">💠 <b>Megha ERP</b></div><div class="s">👤 SUPER_ADMIN</div>
      <div class="s">🏢 Donda Exports</div><div class="s"><span class="dot"></span> Connected</div>
      <div class="spacer"></div><div class="s">v0.1.0 (Build #10)</div><div class="s">Last Build: Today at 11:54 AM</div>
    </div>`;
  document.body.insertAdjacentHTML('afterbegin', chrome);

  // ── render ──
  const cell = (val, r) => {
    if (val === '-' || val === '') return '<span class="dash">—</span>';
    if (r === 'status') return val === 'Active' ? '<span class="chip green">Active</span>' : '<span class="chip">' + val + '</span>';
    if (r === 'chip') return '<span class="chip">' + val + '</span>';
    if (r === 'mono') return '<span class="mono">' + val + '</span>';
    return val;
  };
  const cols = current.columns;
  document.getElementById('head').innerHTML =
    `<th class="c">#</th><th class="c"><span class="cbox"></span></th><th class="c">✎</th><th class="c">⋮</th>`
    + cols.map(c => `<th>${c.l}</th>`).join('');
  function render(rows) {
    document.getElementById('rows').innerHTML = rows.map((row, i) => `
      <tr>
        <td class="rownum">${i + 1}</td><td class="c"><span class="cbox"></span></td>
        <td class="c rowico">✎</td><td class="c rowico">⋮</td>
        ${cols.map((c, ci) => `<td class="${ci === 0 ? 'name' : ''}">${ci === 0 ? row[ci] : cell(row[ci], c.r)}</td>`).join('')}
      </tr>`).join('');
    document.getElementById('count').textContent = rows.length + ' rows';
  }
  render(current.rows);

  // ── behaviour ──
  document.getElementById('q').addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    render(!q ? current.rows : current.rows.filter(r => r.join(' ').toLowerCase().includes(q)));
  });
  const closeMods = () => document.querySelectorAll('.mod.open').forEach(m => m.classList.remove('open'));
  document.querySelectorAll('.modbtn').forEach(btn => btn.addEventListener('click', e => {
    e.stopPropagation();
    const el = btn.closest('.mod'); const was = el.classList.contains('open');
    closeMods(); if (!was) el.classList.add('open');
  }));
  document.addEventListener('click', closeMods);
})();
