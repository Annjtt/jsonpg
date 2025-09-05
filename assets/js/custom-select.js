// Кастомный селект компонент
export class CustomSelect {
  constructor(selectElement) {
    this.originalSelect = selectElement;
    this.options = Array.from(selectElement.options);
    this.selectedIndex = selectElement.selectedIndex;
    this.value = selectElement.value;
    this.isOpen = false;
    
    this.createCustomSelect();
    this.bindEvents();
  }

  createCustomSelect() {
    // Создаем контейнер для кастомного селекта
    this.customSelect = document.createElement('div');
    this.customSelect.className = 'custom-select';
    
    // Создаем триггер (видимая часть)
    this.trigger = document.createElement('div');
    this.trigger.className = 'custom-select-trigger';
    this.trigger.tabIndex = 0;
    
    // Создаем стрелку
    this.arrow = document.createElement('div');
    this.arrow.className = 'custom-select-arrow';
    
    // Создаем контейнер для опций
    this.optionsContainer = document.createElement('div');
    this.optionsContainer.className = 'custom-select-options';
    
    // Заполняем опции
    this.options.forEach((option, index) => {
      const customOption = document.createElement('div');
      customOption.className = 'custom-select-option';
      customOption.textContent = option.textContent;
      customOption.dataset.value = option.value;
      customOption.dataset.index = index;
      
      if (index === this.selectedIndex) {
        customOption.classList.add('selected');
        this.trigger.textContent = option.textContent;
      }
      
      this.optionsContainer.appendChild(customOption);
    });
    
    // Собираем структуру
    this.trigger.appendChild(this.arrow);
    this.customSelect.appendChild(this.trigger);
    this.customSelect.appendChild(this.optionsContainer);
    
    // Заменяем оригинальный селект
    this.originalSelect.style.display = 'none';
    this.originalSelect.parentNode.insertBefore(this.customSelect, this.originalSelect);
  }

  bindEvents() {
    // Клик по триггеру
    this.trigger.addEventListener('click', () => {
      this.toggle();
    });

    // Клик по опции
    this.optionsContainer.addEventListener('click', (e) => {
      const option = e.target.closest('.custom-select-option');
      if (option) {
        this.selectOption(parseInt(option.dataset.index));
      }
    });

    // Закрытие при клике вне селекта
    document.addEventListener('click', (e) => {
      if (!this.customSelect.contains(e.target)) {
        this.close();
      }
    });

    // Клавиатурная навигация
    this.trigger.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          this.toggle();
          break;
        case 'Escape':
          this.close();
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.open();
          this.highlightNext();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.open();
          this.highlightPrevious();
          break;
      }
    });

    // Навигация по опциям
    this.optionsContainer.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.highlightNext();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.highlightPrevious();
          break;
        case 'Enter':
          e.preventDefault();
          const highlighted = this.optionsContainer.querySelector('.custom-select-option.highlighted');
          if (highlighted) {
            this.selectOption(parseInt(highlighted.dataset.index));
          }
          break;
        case 'Escape':
          this.close();
          this.trigger.focus();
          break;
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.customSelect.classList.add('open');
    this.optionsContainer.querySelector('.custom-select-option').focus();
  }

  close() {
    this.isOpen = false;
    this.customSelect.classList.remove('open');
    this.clearHighlight();
  }

  selectOption(index) {
    // Обновляем выбранную опцию
    this.optionsContainer.querySelectorAll('.custom-select-option').forEach(option => {
      option.classList.remove('selected');
    });
    
    const selectedOption = this.optionsContainer.querySelector(`[data-index="${index}"]`);
    selectedOption.classList.add('selected');
    
    // Обновляем триггер
    this.trigger.textContent = this.options[index].textContent;
    
    // Обновляем оригинальный селект
    this.originalSelect.selectedIndex = index;
    this.originalSelect.value = this.options[index].value;
    
    // Вызываем событие change
    this.originalSelect.dispatchEvent(new Event('change', { bubbles: true }));
    
    this.close();
  }

  highlightNext() {
    const options = this.optionsContainer.querySelectorAll('.custom-select-option');
    const current = this.optionsContainer.querySelector('.custom-select-option.highlighted');
    const currentIndex = current ? parseInt(current.dataset.index) : -1;
    const nextIndex = (currentIndex + 1) % options.length;
    
    this.clearHighlight();
    options[nextIndex].classList.add('highlighted');
    options[nextIndex].focus();
  }

  highlightPrevious() {
    const options = this.optionsContainer.querySelectorAll('.custom-select-option');
    const current = this.optionsContainer.querySelector('.custom-select-option.highlighted');
    const currentIndex = current ? parseInt(current.dataset.index) : options.length - 1;
    const prevIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
    
    this.clearHighlight();
    options[prevIndex].classList.add('highlighted');
    options[prevIndex].focus();
  }

  clearHighlight() {
    this.optionsContainer.querySelectorAll('.custom-select-option').forEach(option => {
      option.classList.remove('highlighted');
    });
  }

  // Публичные методы для внешнего управления
  getValue() {
    return this.originalSelect.value;
  }

  setValue(value) {
    const option = this.options.find(opt => opt.value === value);
    if (option) {
      const index = this.options.indexOf(option);
      this.selectOption(index);
    }
  }

  destroy() {
    this.originalSelect.style.display = '';
    this.customSelect.remove();
  }
}

// Функция для инициализации всех кастомных селектов
export function initCustomSelects() {
  const selects = document.querySelectorAll('select');
  const customSelects = [];
  
  selects.forEach(select => {
    const customSelect = new CustomSelect(select);
    customSelects.push(customSelect);
  });
  
  return customSelects;
}

// Функция для получения значения кастомного селекта
export function getCustomSelectValue(selectId) {
  const originalSelect = document.getElementById(selectId);
  return originalSelect ? originalSelect.value : null;
}

// Функция для установки значения кастомного селекта
export function setCustomSelectValue(selectId, value) {
  const originalSelect = document.getElementById(selectId);
  if (originalSelect) {
    originalSelect.value = value;
    originalSelect.dispatchEvent(new Event('change', { bubbles: true }));
  }
}
