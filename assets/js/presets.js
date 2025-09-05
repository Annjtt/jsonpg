const PRESETS = {
    coffee: {
      name: "☕ Кофе-сцена",
      data: {
        prompt: "Девушка в красном свитере с узорами, лицо украшено мандалами, пьёт кофе, который подаёт рука из-за кадра. Мистическая атмосфера.",
        style: "painterly, magical realism",
        camera: "static medium close-up",
        palette: "deep red, gold, teal, warm amber",
        audio: "soft ambient music, gentle sip sound",
        model: "Runway Gen-4"
      }
    },
    anime: {
      name: "🎨 Аниме-старт",
      data: {
        prompt: "Аниме-девушка смотрит в дождливое окно. Меланхоличное настроение.",
        style: "anime",
        camera: "slow zoom in",
        palette: "cool blue, grey, soft pink",
        audio: "rain sounds, piano melody",
        model: "Pika Labs"
      }
    }
  };
  
  export function renderPresets() {
    const container = document.getElementById('presetsContainer');
    if (!container) return;
  
    container.innerHTML = Object.entries(PRESETS).map(([key, preset]) => 
      `<button class="preset-btn" onclick="applyPreset('${key}')">${preset.name}</button>`
    ).join('');
  }
  
  window.applyPreset = function(key) {
    if (!PRESETS[key]) return;
    const p = PRESETS[key].data;
  
    document.getElementById('mainPrompt').value = p.prompt;
    document.getElementById('style').value = p.style;
    document.getElementById('camera').value = p.camera;
    document.getElementById('palette').value = p.palette;
    document.getElementById('audio').value = p.audio;
    document.getElementById('model').value = p.model;
  
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
  
    alert(`Пресет "${PRESETS[key].name}" применён!`);
  };
  
  export function loadExamplePreset() {
    applyPreset('coffee');
  }