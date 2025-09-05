// ✅ Сразу устанавливаем тему ДО загрузки DOM
(function() {
  const savedTheme = localStorage.getItem('jsonpg_theme') || 'dark';
  document.body.classList.add(`theme-${savedTheme}`);
})();

// ✅ Сразу регистрируем toggleTheme в window — ДО загрузки DOM
window.toggleTheme = function() {
    const body = document.body;
    const isDark = body.classList.contains('theme-dark');
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(isDark ? 'theme-light' : 'theme-dark');
    localStorage.setItem('jsonpg_theme', isDark ? 'light' : 'dark');
  };
  
  // Импортируем остальное после загрузки DOM
  document.addEventListener('DOMContentLoaded', async () => {
    const { initUI } = await import('./ui.js');
    const { renderHistory } = await import('./history.js');
    const { generatePrompt } = await import('./generator.js');
    const { copyToClipboard, downloadJSON } = await import('./utils.js');
    const { loadExamplePreset } = await import('./presets.js');
  
    initUI();
    renderHistory();
  
    document.getElementById('generateBtn')?.addEventListener('click', generatePrompt);
    document.getElementById('copyBtn')?.addEventListener('click', copyToClipboard);
    document.getElementById('downloadBtn')?.addEventListener('click', downloadJSON);
    document.getElementById('exampleBtn')?.addEventListener('click', loadExamplePreset);
  });