let history = JSON.parse(localStorage.getItem('jsonpg_history') || '[]');

export function saveToHistory(data) {
  history.unshift(data);
  if (history.length > 20) history.pop();
  localStorage.setItem('jsonpg_history', JSON.stringify(history));
}

export function renderHistory() {
  const container = document.getElementById('historyList');
  if (!container) return;

  if (history.length === 0) {
    container.innerHTML = "Нет сохранённых промтов.";
    return;
  }

  container.innerHTML = history.map((item, index) => 
    `<div class="history-item" onclick="loadFromHistory(${index})">
      <strong>${item.prompt.substring(0, 50)}${item.prompt.length > 50 ? '...' : ''}</strong>
      <br><small>${new Date(item.generated_at).toLocaleString()} | ${item.target_model}</small>
    </div>`
  ).join('');
}

window.loadFromHistory = function(index) {
  if (!history[index]) return;
  const item = history[index];

  document.getElementById('mainPrompt').value = item.prompt;
  document.getElementById('duration').value = item.duration;
  document.getElementById('style').value = item.style;
  document.getElementById('camera').value = item.camera;
  document.getElementById('palette').value = item.color_palette.join(', ');
  document.getElementById('audio').value = item.audio_suggestions;
  document.getElementById('model').value = item.target_model;

  // Обновляем кастомные селекты
  setTimeout(() => {
    const customSelects = document.querySelectorAll('.custom-select');
    customSelects.forEach(customSelect => {
      const originalSelect = customSelect.nextElementSibling;
      if (originalSelect && originalSelect.tagName === 'SELECT') {
        const value = originalSelect.value;
        const trigger = customSelect.querySelector('.custom-select-trigger');
        const selectedOption = customSelect.querySelector(`[data-value="${value}"]`);
        if (trigger && selectedOption) {
          trigger.textContent = selectedOption.textContent;
          customSelect.querySelectorAll('.custom-select-option').forEach(option => {
            option.classList.remove('selected');
          });
          selectedOption.classList.add('selected');
        }
      }
    });
  }, 0);

  alert("Промт загружен в форму!");
};

// Очистка истории
export function clearHistory() {
  if (confirm("Вы уверены, что хотите очистить всю историю?")) {
    history = [];
    localStorage.removeItem('jsonpg_history');
    renderHistory();
    renderFullHistory();
  }
}

// Открытие модального окна истории
export function openHistoryModal() {
  const modal = document.getElementById('historyModal');
  modal.style.display = 'block';
  renderFullHistory();
}

// Закрытие модального окна истории
export function closeHistoryModal() {
  const modal = document.getElementById('historyModal');
  modal.style.display = 'none';
}

// Рендер полной истории в модальном окне
export function renderFullHistory() {
  const container = document.getElementById('fullHistoryList');
  if (!container) return;

  if (history.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Нет сохранённых промтов.</p>';
    return;
  }

  container.innerHTML = history.map((item, index) => 
    `<div class="full-history-item" onclick="loadFromHistory(${index}); closeHistoryModal();">
      <h3>${item.prompt.substring(0, 80)}${item.prompt.length > 80 ? '...' : ''}</h3>
      <p><strong>Стиль:</strong> ${item.style}</p>
      <p><strong>Камера:</strong> ${item.camera}</p>
      <p><strong>Модель:</strong> ${item.target_model}</p>
      <p><strong>Дата:</strong> ${new Date(item.generated_at).toLocaleString()}</p>
    </div>`
  ).join('');
}