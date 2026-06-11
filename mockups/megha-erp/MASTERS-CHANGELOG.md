# Donda Masters — Change Log

**Source of truth:** `mockups/megha-erp/masters-data.js` (`MASTERS_VERSION`)
**Consumers (auto-derive, never edit by hand):** the master screens (`master.html` / `m-*.html`),
the MCP docs payloads (docs module 18), and the creation script (`create-masters.js`).

Every change to a master definition — fields, dropdown options, or adding/removing a master —
is made **once** in the registry and recorded here.

## How to record a change

1. **Edit the registry** — `masters-data.js` only. Don't change derived files by hand.
2. **Bump `MASTERS_VERSION`** (semver):
   - **patch** (x.x.+1) — data/options change (e.g. add a currency, new shape code)
   - **minor** (x.+1.0) — a **field added** to a master
   - **major** (+1.0.0) — a field **renamed/removed**, or a master added/removed
3. **Add a changelog entry** below (date · version · master · change · migration note).
4. **Apply to MeghaOS** — re-run `create-masters.js` for new rows, or run the MeghaOS MCP
   update for changed/removed rows. Note any **migration** needed for existing records.

> Major changes (rename/remove a field) require a **MeghaOS data migration** — call it out
> in the entry so existing records aren't silently broken.

## Changelog

### 1.0.0 — 2026-06-11 — Baseline
Initial 15 masters defined:
`group-company`, `supplier`, `customer`, `transport`, `expense-type`, `payment-terms`,
`currency`, `hs-code`, `country`, `mine`, `stone-type`, `shape`, `color`, `clarity`,
`lot-numbering`. 91 seed records. No migration (first load).

<!-- Template for the next entry:
### x.y.z — YYYY-MM-DD — <short title>
- **<master>**: <what changed>. Migration: <none | describe MeghaOS migration>.
-->
