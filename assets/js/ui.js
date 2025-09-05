import { renderForm } from './generator.js';
import { renderPresets } from './presets.js';
import { initCustomSelects } from './custom-select.js';

export function initUI() {
  renderForm();
  renderPresets();
  
  // Инициализируем кастомные селекты после рендера формы
  setTimeout(() => {
    initCustomSelects();
  }, 0);
}