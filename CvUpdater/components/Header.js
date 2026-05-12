const AVATAR_COLORS = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#06b6d4', '#f97316', '#6366f1',
];
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}
function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1)
        return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
function createHeader(config) {
    const showPhoto = 'photoUrl' in config;
    const hero = document.createElement('section');
    hero.className = `hero${showPhoto ? ' hero--with-photo' : ''}`;
    const statsHtml = config.stats
        ? `<div class="hero-stats">${config.stats.map(s => `
      <div class="hero-stat">
        <div class="hero-stat-value">${s.value}</div>
        <div class="hero-stat-label">${s.label}</div>
      </div>`).join('')}
    </div>`
        : '';
    let photoHtml = '';
    if (showPhoto) {
        if (config.photoUrl) {
            photoHtml = `<div class="hero-photo"><img src="${config.photoUrl}" alt=""></div>`;
        }
        else {
            const initials = getInitials(config.title);
            const color = AVATAR_COLORS[hashCode(config.title) % AVATAR_COLORS.length];
            photoHtml = `<div class="hero-photo hero-photo--placeholder" style="background:${color}">${initials}</div>`;
        }
    }
    hero.innerHTML = `
    <div class="hero-content">
      ${photoHtml}
      <div class="hero-text">
        ${config.badge ? `<div class="hero-badge">${config.badge}</div>` : ''}
        <h1>${config.title}${config.highlight ? ` <span>${config.highlight}</span>` : ''}</h1>
        ${config.subtitle ? `<p>${config.subtitle}</p>` : ''}
        ${statsHtml}
      </div>
    </div>
  `;
    return hero;
}
export { createHeader };
