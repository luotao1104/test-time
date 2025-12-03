# RT-001 Spec-Lite: Rename Pomodoro to Pomodoro Time

## 1. Problem & Goal

The current module name "番茄钟" is not preferred by the user. The goal is to rename it to "番茄时间".

## 2. User Stories

- As a user, I want to see "番茄时间" instead of "番茄钟" on the Home Page card and tour guide.

## 3. Invariants

- The module ID `pomodoro` should remain unchanged to preserve routing and logic.
- The icon and color should remain unchanged.

## 4. Impact

- `src/pages/HomePage.jsx`: Update title in `modules` array and `startTour` function.
