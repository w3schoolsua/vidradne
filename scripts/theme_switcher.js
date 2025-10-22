/**
 * theme_switcher.js
 * Скрипт для перемикання світлої/темної теми.
 * Логіка: змінює клас 'dark' на <html> та атрибут src на <img> для іконки.
 */

// Ключ для збереження теми в локальному сховищі
const THEME_KEY = 'themePreference';

// Основні DOM-елементи, які шукає скрипт
const htmlElement = document.documentElement;
const toggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon'); // Це елемент <img>

// Шляхи до зовнішніх SVG-файлів іконок
const ICON_SOURCES = {
    light: 'svg/icon_sun.svg',
    dark: 'svg/icon_moon.svg'
};

/**
 * Оновлює атрибут 'src' елемента <img>, щоб відобразити правильну іконку.
 * @param {string} theme - 'light' або 'dark'
 */
function updateIconSource(theme) {
    if (themeIcon) {
        themeIcon.src = theme === 'dark' ? ICON_SOURCES.dark : ICON_SOURCES.light;
    }
}

/**
 * Застосовує вказану тему до елемента <html>, зберігає її та оновлює іконку.
 * @param {string} theme - 'light' або 'dark'
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
        localStorage.setItem(THEME_KEY, 'dark');
    } else {
        htmlElement.classList.remove('dark');
        localStorage.setItem(THEME_KEY, 'light');
    }
    updateIconSource(theme);
}

/**
 * Ініціалізація: Перевіряє збережену тему та застосовує її при завантаженні.
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    // Якщо немає збереженої теми, використовуємо 'light' за замовчуванням
    let initialTheme = 'light'; 
    
    // Якщо знайдено 'dark' у сховищі, встановлюємо її як початкову
    if (savedTheme === 'dark') {
        initialTheme = 'dark';
    }
    
    applyTheme(initialTheme);
}

/**
 * Обробник події кліку для перемикання теми.
 */
function toggleTheme() {
    // Визначаємо поточну тему, перевіряючи наявність класу 'dark'
    const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    // Визначаємо нову тему
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    applyTheme(newTheme);
}


// --- Точка входу: Ініціалізація та обробники ---
// 1. Запускаємо ініціалізацію теми, як тільки скрипт завантажено
initializeTheme();

// 2. Додаємо слухача подій до кнопки-перемикача
if (toggleButton) {
    toggleButton.addEventListener('click', toggleTheme);
} else {
    // Це повідомлення допоможе вам знайти помилку, якщо кнопка не знайдена
    console.error('Кнопка перемикача теми (id="theme-toggle") не знайдена!');
}
