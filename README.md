# Floodwise — Flood Risk Management Portal (Frontend)

A TypeScript + React-based web portal for assessing flood risks, managing multiple properties, and creating personalized flood emergency plans.  
Designed for integration with a QGIS mapping server and the Environment Agency (EA) flood risk APIs.

---

## Overview

**Floodwise** enables UK residents and professionals to:

- Evaluate flood risks for their properties.
- Manage multiple properties and assessments.
- Create and store personalized flood emergency plans.
- Visualize flood defenses and risk data via integrated maps.
- Access Environment Agency flood risk data in real-time.

The frontend is a modern, modular, and scalable React application built with **Vite**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** components.  
Backend services (API, authentication, QGIS server integration) are managed by a separate team and will be connected through REST endpoints.

---

## Tech Stack

| Category         | Technology                                                        |
| ---------------- | ----------------------------------------------------------------- |
| Framework        | **React 18** (TypeScript)                                         |
| Styling          | **Tailwind CSS v4.0**, custom design tokens                       |
| UI Components    | **shadcn/ui** (accessible components), **Lucide React** for icons |
| Build Tool       | **Vite**                                                          |
| Data Persistence | LocalStorage (temporary) → **TanStack Query** planned             |
| Validation       | **Zod** (planned)                                                 |
| Forms            | **React Hook Form** (planned)                                     |
| Mapping          | **Leaflet / QGIS Server integration**                             |
| Testing          | **Vitest**, **Testing Library**, **Cypress** (planned)            |

---

## Design System

**Typography**

- Headers: `Instrument Sans`
- Body: `Nunito Sans`

**Color Palette**

- Base: Neutral gray/black scheme
- Accent gradient:  
  `#5e59ff` → `#00deff` → `#00ffb8`

**Design Guidelines 2025/2026**
Design aims to an austere yet clean and trustworthy looks.
Floodwise being an insurtech, this design principle allows for high trustability.

- Flat design (no shadows)
- Thin black borders (`border-black`)
- Angular, geometric layout
- Gradient accents only where meaningful
- “Less is more” — clean, minimalist UX
