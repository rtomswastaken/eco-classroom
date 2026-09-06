// LocalStorage manager for classroom data persistence

import { getInitialDemoData } from './demoData';

const APP_STORAGE_KEY = 'eco_classroom_data_v1';

export function loadAppState() {
  try {
    const saved = localStorage.getItem(APP_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
  }
  const initial = getInitialDemoData();
  saveAppState(initial);
  return initial;
}

export function saveAppState(state) {
  try {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
}
