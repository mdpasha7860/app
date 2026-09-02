# AS Enterprises BuildMart - Pocket App (18-in-1)

## Original Problem Statement
Build POCKET APP 18-in-1 for AS Enterprises (Indian building materials shop).
LOCK: WA 916301456725 + Call +91 6301456725 (fixed with !important, unremovable).
Frontend-only React app + localStorage, single file, 18 features, PIN 6301 admin.

## Architecture
- Frontend-only: React 19 + Tailwind + qrcode.react
- No backend / MongoDB (all state in localStorage)
- Single-file `/app/frontend/src/App.js`
- CSS lock rules in `/app/frontend/src/index.css`

## User Personas
- Retail customer (buys TMT/cement/sand/bricks)
- Wholesale trader (uses Khata ledger)
- Shop admin (manages UPI, downloads ZIP backup)

## Core Requirements (18 features, all shipped)
1. QR UPI payment (qrcode.react, amount encoded)
2. Admin PIN 6301 + UPI change (localStorage.customUpi)
3. Login (Name/Mobile/Email/Pass -> userProfile localStorage)
4. Back button on all non-home screens
5. 4 service cards (Tracker/Khata/Catalog/Estimator)
6. Search with synonym MAP (sariya->tmt, balu->sand, ret, steel, gitti…)
7. Language switcher EN/HI/TE with full T[] translations
8. Cart with Address + COD/UPI + WhatsApp order push
9. MyOrders screen (persisted)
10. Hero banner (Anton display font, "AS Enterprises" spelling preserved)
11. ZIP/HTML download (netlify.com/drop fallback deploy)
12. Product catalog (18 seeded items across TMT/Cement/Sand/Bricks/Tools)
13. Same-Day Delivery tracker screen
14. Wholesale Khata ledger (credit/debit balance)
15. Free Estimator (LxWxH → bags/tons/cft/bricks)
16. Fixed WA button (`.wa-btn-lock !important`)
17. Fixed Call button (`.call-btn-lock !important`)
18. Bolt/StackBlitz branding hidden via CSS

## Test Credentials
- Admin PIN: `6301`
- Default UPI: `9030574216@upi` (change via Admin)

## What's Implemented (2026-02)
- All 18 flows verified end-to-end by testing agent (100% pass)
- Locked WA/Call CSS (computed display:flex, visibility:visible)
- Multi-language + language persistence
- Order creation opens wa.me/916301456725 with itemised message

## Backlog / Next
- P1: Voice search for hindi/telugu customers
- P2: Rate card PDF export
- P2: Truck route map integration
- P2: Push notifications for order status
