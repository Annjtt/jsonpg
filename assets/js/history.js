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

  alert("Промт загружен в форму!");
};