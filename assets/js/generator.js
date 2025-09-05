export function renderForm() {
    const container = document.getElementById('formContainer');
    if (!container) return;
  
    container.innerHTML = `
      <div class="form-group">
        <label><span>📌</span> Основной промт:</label>
        <textarea id="mainPrompt" placeholder="Опишите сцену..."></textarea>
      </div>
  
      <!-- Блок 1: Основные параметры -->
      <div class="form-block">
        <h3>⚙️ Основные параметры</h3>
        <div class="form-row">
          <div class="form-group">
            <label><span>⏱</span> Длительность (сек):</label>
            <input type="number" id="duration" value="8" min="1" max="60">
          </div>
          <div class="form-group">
            <label><span>🎞</span> FPS:</label>
            <select id="fps">
              <option value="24">24</option>
              <option value="30">30</option>
              <option value="60">60</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label><span>🎨</span> Стиль:</label>
          <select id="style">
            <option value="cinematic">Cinematic</option>
            <option value="painterly, magical realism" selected>Painterly, Magical Realism</option>
            <option value="anime">Anime</option>
            <option value="3D cartoon">3D Cartoon</option>
            <option value="realistic">Realistic</option>
          </select>
        </div>
      </div>
  
      <!-- Блок 2: Камера и цвета -->
      <div class="form-block">
        <h3>🎥 Камера и цвета</h3>
        <div class="form-group">
          <label><span>📹</span> Камера:</label>
          <select id="camera">
            <option value="static medium close-up" selected>Static Medium Close-Up</option>
            <option value="slow zoom in">Slow Zoom In</option>
            <option value="pan left to right">Pan Left to Right</option>
          </select>
        </div>
        <div class="form-group">
          <label><span>🌈</span> Цветовая палитра:</label>
          <input type="text" id="palette" placeholder="через запятую" value="deep red, gold, teal">
        </div>
      </div>
  
      <!-- Блок 3: Аудио и модель -->
      <div class="form-block">
        <h3>🔊 Аудио и модель</h3>
        <div class="form-group">
          <label><span>🎵</span> Аудио-подсказки:</label>
          <input type="text" id="audio" placeholder="музыка, звуки" value="ambient, sip sound">
        </div>
        <div class="form-group">
          <label><span>🤖</span> Модель:</label>
          <select id="model">
            <option value="Runway Gen-4">Runway Gen-4</option>
            <option value="Pika Labs">Pika Labs</option>
            <option value="Sora-compatible">Sora-compatible</option>
          </select>
        </div>
      </div>
    `;
  }
  
  // ✅ ЭКСПОРТИРУЕМ ФУНКЦИЮ
  export function generatePrompt() {
    const data = {
      prompt: document.getElementById('mainPrompt')?.value.trim() || "Описание отсутствует",
      duration: parseInt(document.getElementById('duration')?.value) || 8,
      fps: parseInt(document.getElementById('fps')?.value) || 24,
      style: document.getElementById('style')?.value,
      camera: document.getElementById('camera')?.value,
      color_palette: document.getElementById('palette')?.value.split(',').map(s => s.trim()),
      audio_suggestions: document.getElementById('audio')?.value,
      target_model: document.getElementById('model')?.value,
      aspect_ratio: "9:16",
      generated_at: new Date().toISOString()
    };
  
    const output = document.getElementById('output');
    output.textContent = JSON.stringify(data, null, 2);
  
    // Сохраняем в историю
    import('./history.js').then(module => {
      module.saveToHistory(data);
      module.renderHistory();
    });
  }