'use strict';

const toggleTheme = function () {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('pluto-theme', newTheme);
}
const storedTheme = localStorage.getItem('pluto-theme');
const systemThemeIsDark = window.matchMedia('prefers-color-scheme: dark').matches;
const initialTheme = storedTheme ?? (systemThemeIsDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', initialTheme);

window.addEventListener('DOMContentLoaded', function () {
    const $themeBtn = this.document.querySelector('[data-theme-btn]');
    if ($themeBtn) $themeBtn.addEventListener('click', toggleTheme);
});