#!/usr/bin/env node
/* =====================================================================
   Donda ERP — create all masters via the MeghaOS MCP, in dependency order.

   SOURCE OF TRUTH: ./masters-data.js (the registry). This script never
   re-declares master data — it iterates the registry, so it always creates
   exactly what the mockups + docs show.

   STATUS: the MeghaOS MCP is NOT deployed yet, so createMaster() is a
   DRY-RUN stub that prints each call. When the MCP is live:
     1. set  DRY_RUN = false
     2. replace the body of createMaster() with the real MCP tool call
        (see the marked TODO — it's a one-line swap)
     3. (optional) implement exists() for idempotent re-runs

   Run a dry-run:   node mockups/megha-erp/create-masters.js
   ===================================================================== */
'use strict';
const { MASTER_GROUPS, MASTERS_VERSION } = require('./masters-data.js');

const DRY_RUN = true;

// payload key = column label → lowercase, non-alphanumerics collapsed to "_"
const keyOf = l => l.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const byKey = {};
MASTER_GROUPS.forEach(g => g.masters.forEach(m => { byKey[m.key] = m; }));

// ── dependency tiers — created top → bottom so foreign keys resolve ──
const ORDER = [
  // Tier 1 — no dependencies
  'currency', 'country', 'payment-terms', 'expense-type', 'hs-code',
  'stone-type', 'shape', 'color', 'clarity', 'lot-numbering',
  // Tier 2 — reference Tier 1
  'mine',          // → country
  'group-company', // → currency
  'transport',     // → country
  // Tier 3 — reference Tiers 1–2
  'supplier',      // → payment-terms, currency
  'customer',      // → currency
];

// natural key per entity for idempotency / logging (first column unless noted)
const NATURAL_KEY = { supplier: 'supplier_name', customer: 'customer_name', 'lot-numbering': 'sequence' };
const naturalKeyOf = (entity, data) => data[NATURAL_KEY[entity] || 'code'] ?? data.name ?? '?';

function toData(master, row) {
  const d = {};
  master.columns.forEach((c, i) => { d[keyOf(c.l)] = row[i]; });
  return d;
}

// OPTIONAL: implement against the MCP for idempotent re-runs
async function exists(/* entity, data */) { return false; }

async function createMaster(entity, data) {
  // ── TODO(MeghaOS MCP): replace this stub with the real create call, e.g.
  //     return await meghaos.master.create({ entity, data });
  if (DRY_RUN) {
    console.log(`  create ${entity.padEnd(14)} ${naturalKeyOf(entity, data)}  ${JSON.stringify(data)}`);
    return { id: `dry-${entity}-${naturalKeyOf(entity, data)}` };
  }
  throw new Error('MeghaOS MCP not wired: set DRY_RUN=false and swap createMaster() body.');
}

async function run() {
  console.log(`# Donda masters — registry v${MASTERS_VERSION} — DRY_RUN=${DRY_RUN}\n`);
  let total = 0;
  for (const key of ORDER) {
    const m = byKey[key];
    if (!m) { console.warn(`! skip unknown master: ${key}`); continue; }
    console.log(`## ${m.title}  (${m.rows.length})`);
    for (const row of m.rows) {
      const data = toData(m, row);
      if (await exists(key, data)) { console.log(`  skip   ${key}  ${naturalKeyOf(key, data)} (exists)`); continue; }
      await createMaster(key, data);
      total++;
    }
    console.log('');
  }
  // safety: any masters in the registry not covered by ORDER?
  const missing = Object.keys(byKey).filter(k => !ORDER.includes(k));
  if (missing.length) console.warn(`! NOT in ORDER (add them): ${missing.join(', ')}`);
  console.log(`# done — ${total} records across ${ORDER.length} masters`);
}

run().catch(e => { console.error(e); process.exit(1); });
