const PRESETS = {
    anime: {
      name: "🎨 Аниме-старт",
      data: {
        prompt: "Аниме-девушка смотрит в дождливое окно. Меланхоличное настроение.",
        style: "anime",
        camera: "slow zoom in",
        palette: "cool blue, grey, soft pink",
        audio: "rain sounds, piano melody",
        model: "Pika Labs",
        aspectRatio: "9:16"
      }
    },
    cinematic: {
      name: "🎬 Кинематограф",
      data: {
        prompt: "Драматичная сцена в стиле голливудского фильма. Эмоциональный момент с красивым освещением.",
        style: "cinematic",
        camera: "pan left to right",
        palette: "golden hour, warm orange, deep shadows",
        audio: "epic orchestral music, dramatic sound effects",
        model: "Runway Gen-4",
        aspectRatio: "16:9"
      }
    },
    cyberpunk: {
      name: "🤖 Киберпанк",
      data: {
        prompt: "Неоновый город будущего, дождь, отражения в лужах, киберпанк атмосфера.",
        style: "realistic",
        camera: "slow zoom in",
        palette: "neon pink, electric blue, purple, black",
        audio: "synthwave music, electronic beats, rain",
        model: "Runway Gen-4",
        aspectRatio: "21:9"
      }
    },
    nature: {
      name: "🌿 Природа",
      data: {
        prompt: "Красивый лесной пейзаж с солнечными лучами, пробивающимися сквозь листву.",
        style: "realistic",
        camera: "static medium close-up",
        palette: "forest green, golden sunlight, earth tones",
        audio: "birds singing, wind through leaves, nature sounds",
        model: "Runway Gen-4",
        aspectRatio: "16:9"
      }
    },
    fantasy: {
      name: "✨ Фэнтези",
      data: {
        prompt: "Магическая сцена с волшебником, заклинания, искры магии, мистическая атмосфера.",
        style: "painterly, magical realism",
        camera: "pan left to right",
        palette: "magical purple, mystical blue, golden sparks",
        audio: "fantasy music, magical chimes, mystical sounds",
        model: "Runway Gen-4",
        aspectRatio: "16:9"
      }
    },
    retro: {
      name: "📺 Ретро",
      data: {
        prompt: "Винтажная сцена в стиле 80-х, неоновые вывески, ретро автомобили.",
        style: "3D cartoon",
        camera: "slow zoom in",
        palette: "hot pink, cyan, yellow, black",
        audio: "retro synth music, vintage sound effects",
        model: "Pika Labs",
        aspectRatio: "1:1"
      }
    },
    horror: {
      name: "👻 Хоррор",
      data: {
        prompt: "Жуткая атмосфера, тени, туман, мистические элементы ужаса.",
        style: "realistic",
        camera: "static medium close-up",
        palette: "dark shadows, blood red, pale moonlight",
        audio: "creepy ambient, horror sound effects, whispers",
        model: "Runway Gen-4",
        aspectRatio: "9:16"
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
    document.getElementById('model').value = p.model || "";
    document.getElementById('aspectRatio').value = p.aspectRatio || "9:16";
  
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
    applyPreset('anime');
  }