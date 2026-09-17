/**
 * Em Mơ — Character Codex Tracker (Sổ tay sưu tập cá nhân)
 * Manages collected characters via localStorage.
 */

const CODEX_STORAGE_KEY = 'emmo_codex_collection';

class CodexManager {
  constructor(characters) {
    this.characters = characters;
    this.collected = this.loadCollection();
  }

  loadCollection() {
    try {
      const data = localStorage.getItem(CODEX_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('LocalStorage not available, fallback to memory', e);
      return [];
    }
  }

  saveCollection() {
    try {
      localStorage.setItem(CODEX_STORAGE_KEY, JSON.stringify(this.collected));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }

  unlock(characterId) {
    const existing = this.collected.find(item => item.id === characterId);
    if (existing) {
      existing.count = (existing.count || 1) + 1;
      existing.lastUnlocked = Date.now();
    } else {
      this.collected.push({
        id: characterId,
        count: 1,
        firstUnlocked: Date.now(),
        lastUnlocked: Date.now()
      });
    }
    this.saveCollection();
    this.updateUI();
  }

  isUnlocked(characterId) {
    return this.collected.some(item => item.id === characterId);
  }

  getCount(characterId) {
    const item = this.collected.find(item => item.id === characterId);
    return item ? item.count : 0;
  }

  getUnlockedCount() {
    return this.collected.length;
  }

  getTotalCharacters() {
    return this.characters.length;
  }

  getPercentage() {
    return Math.round((this.getUnlockedCount() / this.getTotalCharacters()) * 100);
  }

  renderDrawer() {
    const gridEl = document.getElementById('codexGrid');
    const progTextEl = document.getElementById('codexProgressText');
    const progBarEl = document.getElementById('codexProgressBar');
    const badgeEl = document.getElementById('codexBadgeCount');

    if (badgeEl) {
      badgeEl.textContent = `${this.getUnlockedCount()}/${this.getTotalCharacters()}`;
    }

    if (progTextEl) {
      progTextEl.textContent = `Đã khám phá ${this.getUnlockedCount()}/${this.getTotalCharacters()} nhân vật (${this.getPercentage()}%)`;
    }

    if (progBarEl) {
      progBarEl.style.width = `${this.getPercentage()}%`;
    }

    if (!gridEl) return;

    gridEl.innerHTML = this.characters.map(char => {
      const unlocked = this.isUnlocked(char.id);
      const count = this.getCount(char.id);
      return `
        <div class="codex-slot ${unlocked ? 'unlocked' : 'locked'}" data-id="${char.id}">
          <img src="${char.image}" alt="${char.name}" class="codex-thumb" loading="lazy">
          <div class="codex-slot-name">${unlocked ? char.name : '??? (Chưa mở)'}</div>
          <div style="font-size:0.75rem; color: ${unlocked ? 'var(--gold-bright)' : 'var(--ink-faint)'}; margin-top:2px;">
            ${unlocked ? `Đã mở: ${count} lần` : char.tierLabel}
          </div>
        </div>
      `;
    }).join('');
  }

  updateUI() {
    this.renderDrawer();
  }
}

window.CodexManager = CodexManager;
