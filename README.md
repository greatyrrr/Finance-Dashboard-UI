# Finance Dashboard

A responsive finance dashboard built with **React + TypeScript + Vite**.

## Quick Start

```bash
npm install
npm run dev
```
Open **http://localhost:5173**

---

## Tech Stack
- React 18 + TypeScript
- Vite
- Recharts (charts)
- Context API (state management)
- CSS Variables (theming)

---

## Features
- Dashboard with summary cards, area chart, and pie chart
- Transactions list with search, filter, and sort
- Role-based UI — Admin can add/edit/delete, Viewer is read-only
- Insights section with spending breakdown and monthly comparison
- Dark mode toggle
- Responsive design

---

## Project Structure
```
src/
├── components/      # Sidebar, Dashboard, Transactions, Insights, Modal
├── context/         # AppContext — global state
├── hooks/           # useFilteredTransactions, useSummary
├── data/            # 42 mock transactions + chart data
└── types/           # TypeScript interfaces
```

---

## Role Switching
Use the dropdown in the sidebar to switch between **Admin** and **Viewer** roles.

---

**Gargi Sharma** — Zorvyn Frontend Intern Assignment