export function copyToClipboard() {
    const output = document.getElementById('output')?.textContent;
    if (!output || output.includes('Здесь появится')) {
      alert("Сначала сгенерируйте JSON!");
      return;
    }
  
    navigator.clipboard.writeText(output).then(() => {
      alert("✅ JSON скопирован!");
    }).catch(err => {
      console.error("Ошибка копирования:", err);
      alert("Не удалось скопировать. Попробуйте вручную.");
    });
  }
  
  export function downloadJSON() {
    const output = document.getElementById('output')?.textContent;
    if (!output || output.includes('Здесь появится')) {
      alert("Сначала сгенерируйте JSON!");
      return;
    }
  
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jsonpg_prompt_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }