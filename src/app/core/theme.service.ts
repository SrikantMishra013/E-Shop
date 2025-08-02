import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeKey = 'theme-mode';
  isDark = false;

  constructor() {
    const saved = localStorage.getItem(this.themeKey) || 'light';
    this.setTheme(saved as 'light' | 'dark');
  }

  toggleTheme() {
    const current = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(mode: 'light' | 'dark') {
    this.isDark = mode === 'dark';
    document.body.classList.remove('dark-theme');
    if (mode === 'dark') {
      document.body.classList.add('dark-theme');
    }
    localStorage.setItem(this.themeKey, mode);
  }
}
