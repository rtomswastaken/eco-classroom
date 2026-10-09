# EcoClassroom

A web application designed for elementary classrooms to encourage and track student-led environmental activities through point rewards, badges, and teacher moderation.

## Overview

EcoClassroom provides a shared interface for students and teachers to log and verify eco-friendly habits such as recycling, conserving water, planting, and reducing energy use. Students submit activities with descriptions and photo verification, earn points, and unlock achievements. Teachers review incoming submissions, award or adjust points, launch classroom challenges, and monitor aggregate impact metrics.

The application runs entirely in the browser using React and Vite, persisting all classroom and user state to local storage.

## Features

### Student Portal
- **Activity Logging**: Submit eco-actions with titles, categories, detailed notes, and photo proof (via file upload or preset sample images).
- **Status Tracking**: Monitor whether submitted activities are pending review, approved with points, or returned with teacher feedback.
- **Level Progression**: Earn points to advance through levels (Eco Beginner, Eco Explorer, Eco Helper, Planet Protector, Eco Champion).
- **Badge Showcase**: Track badge achievements unlocked across various environmental categories based on completed actions.
- **Leaderboard**: View classroom rankings with a top-three podium and full participant listings.
- **Challenges**: Browse and join classroom-wide eco challenges to earn bonus points.

### Teacher Portal
- **Submission Review**: Inspect pending submissions with photo proof, assign custom or default point awards, and add feedback.
- **Action Moderation**: Reject incomplete submissions with guidance or remove entries with automatic point deductions.
- **Roster Management**: View all enrolled students, inspect individual activity histories, and remove student profiles.
- **Challenge Manager**: Create and publish classroom challenges with bonus points, deadlines, and category tags.
- **Classroom Impact Analytics**: View total submissions, category breakdowns, and calculated environmental estimates (estimated CO2 reductions, water saved, and plastics diverted).
- **Classroom Settings**: Update class name, grade level, and school info; regenerate classroom join codes; and define custom activity categories.

## Tech Stack

- **Framework**: React 19
- **Bundler & Tooling**: Vite 8
- **Linter**: Oxlint
- **Icons**: Lucide React
- **Celebration Effects**: canvas-confetti
- **Styling**: Vanilla CSS

## Requirements

- Node.js (version 18 or higher recommended)
- npm (bundled with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rtomswastaken/eco-classroom.git
   cd eco-classroom
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open the printed local URL (typically `http://localhost:5173`) in your browser.

### Production Build
Create an optimized production build:
```bash
npm run build
```

### Preview Build
Locally preview the generated production build:
```bash
npm run preview
```

### Linting
Run Oxlint to check for code issues:
```bash
npm run lint
```

## Project Structure

```text
eco-classroom/
├── public/                 # Static assets and sample activity images
├── src/
│   ├── assets/             # Branding and vector assets
│   ├── components/
│   │   ├── common/         # Navbar and notification drawer
│   │   ├── student/        # Student dashboard, activities, modal, leaderboard, badges
│   │   └── teacher/        # Review queue, roster, challenges, stats, settings
│   ├── context/
│   │   └── AppContext.jsx  # Global application state and action handlers
│   ├── types/
│   │   └── data.js         # Categories, badge definitions, and level thresholds
│   ├── utils/
│   │   ├── confetti.js     # Celebration animations and audio cues
│   │   ├── demoData.js     # Default mock classroom and student data
│   │   └── storage.js      # LocalStorage serialization helpers
│   ├── views/
│   │   ├── RoleSelectView.jsx
│   │   ├── StudentView.jsx
│   │   └── TeacherView.jsx
│   ├── App.jsx             # Top-level view routing and toast container
│   ├── main.jsx            # Application entry point
│   ├── App.css             # Main styling rules
│   └── index.css           # Global reset and typography
├── package.json
└── vite.config.js
```

## Data and Persistence

All data is stored in the browser's `localStorage` under the key `eco_classroom_data_v1`. On initial launch, the application seeds itself with mock classroom data ("Grade 5 — Green Warriors", code: `GREEN5`) from `src/utils/demoData.js`. Any student submissions, approvals, roster updates, or configuration changes made within the app persist across browser reloads.

To reset the application state back to the initial demo dataset, clear the browser storage for the site or delete the `eco_classroom_data_v1` key in developer tools.

## License

This repository does not currently include an open-source license file.
