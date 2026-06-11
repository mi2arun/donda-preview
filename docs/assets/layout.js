/* =====================================================================
   DONDA ERP — Documentation Layout Engine  (the "main layout file")
   Single source of truth for navigation. Injects the sidebar (with
   collapsible per-module sub-menus), topbar/breadcrumb, and prev/next
   pager into every page. Works offline (file://) — no fetch needed.

   To add/rename a page or sub-section: edit the NAV array below only.
   Each page's <body data-page="ID"> must match an item id.
   ===================================================================== */
(function () {
  const NAV = [
    { group: 'Foundation', items: [
      { id: '01-overview', icon: '📋', title: 'Overview & Scope', sub: [
        { t: 'Business Overview', a: 'overview' }, { t: 'Scope', a: 'scope' },
        { t: 'Actors & Entities', a: 'actors' }, { t: 'Lifecycle', a: 'lifecycle' },
        { t: 'What Changed', a: 'changes' } ] },
      { id: '02-architecture', icon: '🔗', title: 'Architecture & Integration', tag: 'API', sub: [
        { t: 'The Big Picture', a: 'bigpicture' }, { t: 'Integration Principles', a: 'principles' } ] },
      { id: '03-bidding-data', icon: '🧩', title: 'Bidding Data Model', tag: 'API', sub: [
        { t: 'Expo / Tender', a: 'expo' }, { t: 'Expo Lots', a: 'lots' },
        { t: 'Lot Stones (Valuation)', a: 'stones' },
        { t: 'Bids', a: 'bids' }, { t: 'Wins & Payment', a: 'wins' },
        { t: 'Shape · Color · Clarity', a: 'codes' } ] },
      { id: '04-api', icon: '🔌', title: 'Integration API', tag: 'API', sub: [
        { t: 'Master-Data Reads', a: 'masters' }, { t: 'Bidding Writes', a: 'bidding' },
        { t: 'Stones & Media', a: 'valuation' }, { t: 'Examples', a: 'examples' } ] },
    ]},
    { group: 'Purchase Flow', items: [
      { id: '05-won-lots', icon: '🏆', title: 'Won Lots', sub: [
        { t: 'Header', a: 'header' }, { t: 'Lines', a: 'lines' } ] },
      { id: '06-inbound-logistics', icon: '✈️', title: 'Inbound Logistics', sub: [
        { t: 'Shipment Header', a: 'header' }, { t: 'Parcels', a: 'parcels' } ] },
      { id: '07-purchase-invoice', icon: '🧾', title: 'Purchase Invoice', sub: [
        { t: 'Header', a: 'header' }, { t: 'Line Items', a: 'lines' },
        { t: 'Expenses', a: 'expenses' }, { t: 'Worked Example', a: 'example' } ] },
      { id: '08-rough-lot-master', icon: '💎', title: 'Rough Lot Master', tag: 'NEW', sub: [
        { t: 'Numbering Pattern', a: 'pattern' }, { t: 'Numbering Rules', a: 'rules' },
        { t: 'Fields', a: 'fields' } ] },
    ]},
    { group: 'Sales Flow', items: [
      { id: '09-sales-invoice', icon: '💰', title: 'Sales Invoice & Sub-Lots', tag: 'NEW', sub: [
        { t: 'Header', a: 'header' }, { t: 'Sale Lines', a: 'lines' },
        { t: 'Expenses & Summary', a: 'summary' } ] },
      { id: '10-inter-company', icon: '🔄', title: 'Inter-Company Transfer', tag: 'NEW', sub: [
        { t: 'Transfer Flow', a: 'flow' }, { t: 'How It Works', a: 'how' } ] },
      { id: '11-outbound-logistics', icon: '📦', title: 'Outbound Logistics', sub: [
        { t: 'Shipment Header', a: 'header' } ] },
    ]},
    { group: 'Reference', items: [
      { id: '12-accounting', icon: '📒', title: 'Accounting', sub: [
        { t: 'On Purchase', a: 'purchase' }, { t: 'On Sales', a: 'sales' } ] },
      { id: '13-status-lifecycles', icon: '🚦', title: 'Status Lifecycles', sub: [
        { t: 'Expo Lot / Bid', a: 'lot' }, { t: 'Won Lot', a: 'wonlot' },
        { t: 'Inbound Shipment', a: 'inbound' }, { t: 'Rough Lot', a: 'rough' },
        { t: 'Sales → Outbound', a: 'salesout' } ] },
      { id: '14-master-data', icon: '🗂️', title: 'Master Data' },
      { id: '15-future-scope', icon: '🔮', title: 'Future & Open Questions', sub: [
        { t: 'Future Scope', a: 'future' }, { t: 'Open Questions', a: 'open' } ] },
      { id: '16-bidding-app-mapping', icon: '🗺️', title: 'Bidding-App Field Mapping', tag: 'API', sub: [
        { t: 'Hierarchy', a: 'hierarchy' }, { t: 'Field Mapping', a: 'fields' },
        { t: 'Gaps & Actions', a: 'gaps' } ] },
    ]},
    { group: 'Build · Phase 1', items: [
      { id: '17-purchase-entry-design', icon: '🏗️', title: 'Purchase Entry — Design', tag: 'NEW', sub: [
        { t: 'Model & Hierarchy', a: 'model' }, { t: 'Entry Flow', a: 'flow' },
        { t: 'Masters', a: 'masters' }, { t: 'Schema Sketch', a: 'schema' },
        { t: 'Numbering', a: 'numbering' }, { t: 'Open Items', a: 'open' } ] },
    ]},
    { group: 'MeghaOS · MCP', items: [
      { id: '18-meghaos-mcp-masters', icon: '🔌', title: 'Creating Masters via MCP', tag: 'NEW', sub: [
        { t: 'Overview & Status', a: 'overview' }, { t: 'Call Convention', a: 'convention' },
        { t: 'Creation Order', a: 'order' }, { t: 'Master Payloads', a: 'reference' },
        { t: 'Open Items', a: 'open' } ] },
    ]},
  ];

  const VERSION = 'v2.1';
  const flat = [];
  NAV.forEach(g => g.items.forEach(it => flat.push(it)));

  const inModules = /\/modules\//.test(location.pathname);
  const modHref = id => (inModules ? '' : 'modules/') + id + '.html';
  const homeHref = inModules ? '../index.html' : 'index.html';
  const page = document.body.dataset.page || '';
  const current = flat.find(x => x.id === page);

  /* ---------- Sidebar ---------- */
  const sb = document.createElement('aside');
  sb.className = 'sb';
  let html = `<a class="sb-brand" href="${homeHref}">
      <span class="sb-logo">💎</span>
      <span><b>DONDA ERP</b><small>Documentation</small></span>
    </a>`;
  NAV.forEach(g => {
    html += `<div class="sb-cat">${g.group}</div>`;
    g.items.forEach(it => {
      const active = it.id === page;
      const hasSub = it.sub && it.sub.length;
      const open = active && hasSub;
      html += `<div class="sb-item${active ? ' active' : ''}${hasSub ? ' has-sub' : ''}${open ? ' open' : ''}">
        <a class="sb-link" href="${modHref(it.id)}">
          <span class="sb-ic">${it.icon}</span>
          <span class="sb-tt">${it.title}</span>
          ${it.tag ? `<span class="sb-tag ${it.tag.toLowerCase()}">${it.tag}</span>` : ''}
          ${hasSub ? `<button class="sb-caret" aria-label="Toggle">▸</button>` : ''}
        </a>
        ${hasSub ? `<ul class="sb-sub">${it.sub.map(s => `<li><a href="${modHref(it.id)}#${s.a}">${s.t}</a></li>`).join('')}</ul>` : ''}
      </div>`;
    });
  });
  sb.innerHTML = html;

  /* ---------- Topbar ---------- */
  const tb = document.createElement('div');
  tb.className = 'tb';
  tb.innerHTML = `
    <button class="tb-burger" aria-label="Menu">☰</button>
    <div class="tb-crumb">
      <a href="${homeHref}">Docs</a>
      ${current ? `<span class="sep">›</span><span class="cur">${current.title}</span>` : ''}
    </div>
    <span class="tb-ver">${VERSION}</span>`;

  /* ---------- Pager (module pages only) ---------- */
  let pager = null;
  if (current) {
    const i = flat.indexOf(current);
    const prev = flat[i - 1], next = flat[i + 1];
    pager = document.createElement('nav');
    pager.className = 'pager';
    pager.innerHTML =
      (prev ? `<a class="prev" href="${modHref(prev.id)}"><div class="dir">← Previous</div><div class="ttl">${prev.title}</div></a>` : `<span style="flex:1"></span>`) +
      (next ? `<a class="next" href="${modHref(next.id)}"><div class="dir">Next →</div><div class="ttl">${next.title}</div></a>` : `<span style="flex:1"></span>`);
  }

  /* ---------- Assemble: body → [sb] [scrim] [content > tb + main(+pager)] ---------- */
  const main = document.querySelector('main');
  const content = document.createElement('div');
  content.className = 'content';
  main.parentNode.insertBefore(content, main);
  content.appendChild(tb);
  content.appendChild(main);
  if (pager) main.appendChild(pager);

  const scrim = document.createElement('div');
  scrim.className = 'scrim';

  document.body.insertBefore(scrim, content);
  document.body.insertBefore(sb, scrim);

  /* ---------- Behaviour ---------- */
  // collapse / expand sub-menus via caret (without navigating)
  sb.querySelectorAll('.sb-caret').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      btn.closest('.sb-item').classList.toggle('open');
    });
  });
  // mobile drawer
  const burger = tb.querySelector('.tb-burger');
  burger.addEventListener('click', () => document.body.classList.toggle('nav-open'));
  scrim.addEventListener('click', () => document.body.classList.remove('nav-open'));
})();
