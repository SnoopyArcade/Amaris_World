/* ==========================================================================
   AMARIS WORLD — FASE 1: LOBBY
   JS vanilla. Sin dependencias externas.
   ========================================================================== */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ------------------------------------------------------------------ */
  /* 1) Fallback de altura de viewport para iOS Safari antiguo           */
  /*    (100dvh ya cubre la mayoría de dispositivos modernos, esto es    */
  /*    solo una red de seguridad).                                      */
  /* ------------------------------------------------------------------ */

  function setAppHeight() {
    const root = document.documentElement;
    if (!CSS.supports('height', '100dvh')) {
      root.style.setProperty('--app-height', `${window.innerHeight}px`);
    }
  }
  setAppHeight();
  window.addEventListener('resize', setAppHeight);
  window.addEventListener('orientationchange', setAppHeight);

  /* ------------------------------------------------------------------ */
  /* 2) Generación de estrellas (decorativas, estáticas salvo parpadeo)  */
  /* ------------------------------------------------------------------ */

  function createStars(count) {
    const layer = document.getElementById('starsLayer');
    if (!layer) return; // sin capa de estrellas, no hay nada que generar

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.className = 'star';

      const size = (Math.random() * 1.8 + 0.8).toFixed(2); // 0.8px - 2.6px
      const top = (Math.random() * 100).toFixed(2);
      const left = (Math.random() * 100).toFixed(2);
      const duration = (Math.random() * 3 + 3).toFixed(2); // 3s - 6s
      const delay = (Math.random() * 4).toFixed(2);

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${top}%`;
      star.style.left = `${left}%`;
      star.style.setProperty('--dur', `${duration}s`);
      star.style.setProperty('--delay', `${delay}s`);

      fragment.appendChild(star);
    }

    layer.appendChild(fragment);
  }

  /* ------------------------------------------------------------------ */
  /* 3) Generación de partículas flotantes (muy discretas)                */
  /* ------------------------------------------------------------------ */

  function createParticles(count) {
    const layer = document.getElementById('particlesLayer');
    if (!layer || prefersReducedMotion) return; // se omiten con movimiento reducido

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';

      const size = (Math.random() * 3 + 2).toFixed(2); // 2px - 5px
      const left = (Math.random() * 100).toFixed(2);
      const bottom = (Math.random() * 30).toFixed(2); // nace en el tercio inferior
      const duration = (Math.random() * 6 + 10).toFixed(2); // 10s - 16s
      const delay = (Math.random() * 10).toFixed(2);

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.bottom = `${bottom}%`;
      particle.style.setProperty('--dur', `${duration}s`);
      particle.style.setProperty('--delay', `${delay}s`);

      fragment.appendChild(particle);
    }

    layer.appendChild(fragment);
  }

  /* ------------------------------------------------------------------ */
  /* 4) Transición ENTRAR → siguiente estado del lobby                   */
  /* ------------------------------------------------------------------ */

  function goToThreshold() {
    const orb = document.getElementById('orb');
    const lobbyScreen = document.getElementById('lobbyScreen');
    const thresholdScreen = document.getElementById('thresholdScreen');
    const enterBtn = document.getElementById('enterBtn');

    if (!orb || !lobbyScreen || !thresholdScreen || !enterBtn) return;

    // Evita doble activación (touch + click, o pulsaciones repetidas)
    enterBtn.disabled = true;

    orb.classList.add('is-opening');

    // Duración del portal (debe igualar --portal-duration en el CSS)
    const portalDuration = prefersReducedMotion ? 300 : 900;

    // Tiempo que el mensaje "Tu mundo está despertando…" permanece activo
    // antes de asentarse. Mantener entre 1s y 1.5s.
    const holdDuration = prefersReducedMotion ? 400 : 1200;

    window.setTimeout(() => {
      lobbyScreen.setAttribute('aria-hidden', 'true');
      thresholdScreen.setAttribute('aria-hidden', 'false');

      // Mueve el foco de teclado al nuevo estado para accesibilidad
      thresholdScreen.setAttribute('tabindex', '-1');
      thresholdScreen.focus({ preventScroll: true });

      // Cierra limpiamente el estado "despertando": detiene la animación
      // infinita de los puntos para que no dé sensación de carga eterna.
      // (No conecta con Fase 2: solo finaliza la animación de Fase 1.)
      window.setTimeout(() => {
        thresholdScreen.classList.add('is-settled');
        revealWorld(); // Fase 2: única línea añadida a esta función existente
      }, holdDuration);
    }, portalDuration);
  }

  /* ------------------------------------------------------------------ */
  /* 4b) FASE 4 — Luciérnagas decorativas de la escena pixel-art          */
  /*     (idéntico patrón que createParticles: solo fija estilos          */
  /*     inline con valores aleatorios; toda la animación vive en CSS).   */
  /* ------------------------------------------------------------------ */

  function createFireflies(count) {
    const layer = document.getElementById('firefliesLayer');
    if (!layer || prefersReducedMotion || layer.dataset.rendered === 'true') return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const firefly = document.createElement('span');
      firefly.className = 'pixel-firefly';

      const left = (Math.random() * 30 + 52).toFixed(2); // cerca del farol/picnic (52%-82%)
      const bottom = (Math.random() * 14 + 6).toFixed(2);
      const duration = (Math.random() * 5 + 7).toFixed(2); // 7s - 12s
      const delay = (Math.random() * 8).toFixed(2);

      firefly.style.left = `${left}%`;
      firefly.style.bottom = `${bottom}%`;
      firefly.style.setProperty('--dur', `${duration}s`);
      firefly.style.setProperty('--delay', `${delay}s`);

      fragment.appendChild(firefly);
    }

    layer.appendChild(fragment);
    layer.dataset.rendered = 'true';
  }

  // Destellos extra sobre el cielo de la imagen de fondo (sutiles, para
  // complementar las estrellas ya pintadas en el PNG).
  function createSkyTwinkles(count) {
    const layer = document.getElementById('skyTwinkleLayer');
    if (!layer || prefersReducedMotion || layer.dataset.rendered === 'true') return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.className = 'sky-twinkle';

      const left = (Math.random() * 90 + 5).toFixed(2);
      const top = (Math.random() * 35 + 4).toFixed(2); // solo en la franja de cielo
      const duration = (Math.random() * 3 + 3).toFixed(2);
      const delay = (Math.random() * 4).toFixed(2);

      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.setProperty('--dur', `${duration}s`);
      star.style.setProperty('--delay', `${delay}s`);

      fragment.appendChild(star);
    }

    layer.appendChild(fragment);
    layer.dataset.rendered = 'true';
  }

  /* ------------------------------------------------------------------ */
  /* 5) FASE 2 — Mundo interactivo: revelación y render                  */
  /* ------------------------------------------------------------------ */

  function revealWorld() {
    const thresholdScreen = document.getElementById('thresholdScreen');
    const worldScreen = document.getElementById('worldScreen');
    if (!thresholdScreen || !worldScreen) return;

    renderWorld();
    bindZoneEvents();
    createFireflies(6);
    createSkyTwinkles(14);

    const worldRevealDelay = prefersReducedMotion ? 200 : 700;

    window.setTimeout(() => {
      thresholdScreen.setAttribute('aria-hidden', 'true');
      worldScreen.setAttribute('aria-hidden', 'false');
      worldScreen.setAttribute('tabindex', '-1');
      worldScreen.focus({ preventScroll: true });
    }, worldRevealDelay);
  }

  function renderWorld() {
    const stage = document.getElementById('worldStage');
    if (!stage || stage.dataset.rendered === 'true') return; // evita doble render

    const zones = window.AMARIS_ZONES || [];
    if (!zones.length) return;

    const fragment = document.createDocumentFragment();

    zones.forEach((zone) => {
      if (zone.unlocked === false) return; // preparado para zonas bloqueadas a futuro

      const point = document.createElement('button');
      point.type = 'button';
      point.className = 'zone-point';
      point.dataset.zoneId = zone.id;
      point.style.setProperty('--x', `${zone.position.x}%`);
      point.style.setProperty('--y', `${zone.position.y}%`);
      point.setAttribute('aria-label', zone.name);

      const glyph = document.createElement('span');
      glyph.className = 'zone-glyph';
      glyph.setAttribute('aria-hidden', 'true');

      const label = document.createElement('span');
      label.className = 'zone-label';
      label.textContent = zone.name;

      point.appendChild(glyph);
      point.appendChild(label);
      fragment.appendChild(point);
    });

    stage.appendChild(fragment);
    stage.dataset.rendered = 'true';
  }

  // Un solo listener delegado: cubre click de mouse y el click sintético
  // que los navegadores móviles disparan tras un touch, sin duplicar lógica.
  function bindZoneEvents() {
    const stage = document.getElementById('worldStage');
    if (!stage || stage.dataset.bound === 'true') return;

    stage.addEventListener('click', (event) => {
      const point = event.target.closest('.zone-point');
      if (!point) return;
      enterZone(point.dataset.zoneId);
    });

    stage.dataset.bound = 'true';

    bindWorldParallax();
  }

  function enterZone(zoneId) {
    const worldScreen = document.getElementById('worldScreen');
    const zoneScreen = document.getElementById('zoneScreen');
    if (!worldScreen || !zoneScreen) return;

    const zone = (window.AMARIS_ZONES || []).find((z) => z.id === zoneId);
    if (!zone) return;

    populateZoneContent(zone);
    renderMemories(zone.id); // Fase 3: única línea añadida a esta función

    // Pequeño margen para que se aprecie la respuesta visual del punto
    // (escala/glow vía CSS) antes de que ocurra la transición de pantalla.
    const feedbackDelay = prefersReducedMotion ? 0 : 260;

    window.setTimeout(() => {
      worldScreen.setAttribute('aria-hidden', 'true');
      zoneScreen.setAttribute('aria-hidden', 'false');
      zoneScreen.setAttribute('tabindex', '-1');
      zoneScreen.focus({ preventScroll: true });
    }, feedbackDelay);
  }

  function exitZone() {
    const worldScreen = document.getElementById('worldScreen');
    const zoneScreen = document.getElementById('zoneScreen');
    if (!worldScreen || !zoneScreen) return;

    zoneScreen.setAttribute('aria-hidden', 'true');
    worldScreen.setAttribute('aria-hidden', 'false');
    worldScreen.setAttribute('tabindex', '-1');
    worldScreen.focus({ preventScroll: true });
  }

  function populateZoneContent(zone) {
    const body = document.getElementById('zoneBody');
    if (!body) return;
    body.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'zone-title';
    title.textContent = zone.name;

    const desc = document.createElement('p');
    desc.className = 'zone-description';
    desc.textContent = zone.description || '';

    body.appendChild(title);
    body.appendChild(desc);
  }

  // Parallax sutil, solo en dispositivos con puntero fino y sin
  // movimiento reducido. Un único listener, con throttle por rAF: el JS
  // solo fija una custom property, toda la animación la resuelve el CSS
  // (mismo principio que el resto del proyecto).
  function bindWorldParallax() {
    const worldScreen = document.getElementById('worldScreen');
    const ambient = document.querySelector('.world-ambient');
    if (!worldScreen || !ambient) return;

    const canParallax = window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion;
    if (!canParallax) return;

    let rafId = null;

    worldScreen.addEventListener('mousemove', (event) => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const offsetX = (event.clientX / window.innerWidth - 0.5) * 12;
        const offsetY = (event.clientY / window.innerHeight - 0.5) * 12;
        ambient.style.setProperty('--px', `${offsetX.toFixed(2)}px`);
        ambient.style.setProperty('--py', `${offsetY.toFixed(2)}px`);
        rafId = null;
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 7) FASE 3 — Recuerdos: lista dentro de una Zona                     */
  /* ------------------------------------------------------------------ */

  function renderMemories(zoneId) {
    const list = document.getElementById('memoryList');
    if (!list) return;

    list.innerHTML = '';
    list.dataset.bound = 'false'; // se re-vincula cada vez que cambia de zona

    const memories = (window.AMARIS_MEMORIES && window.AMARIS_MEMORIES[zoneId]) || [];
    if (!memories.length) return;

    const fragment = document.createDocumentFragment();

    memories.forEach((memory) => {
      if (memory.unlocked === false) return; // preparado para recuerdos bloqueados a futuro

      const point = document.createElement('button');
      point.type = 'button';
      point.className = 'memory-point';
      point.dataset.memoryId = memory.id;
      point.textContent = memory.title;

      fragment.appendChild(point);
    });

    list.appendChild(fragment);
    bindMemoryEvents();
  }

  function bindMemoryEvents() {
    const list = document.getElementById('memoryList');
    if (!list || list.dataset.bound === 'true') return;

    list.addEventListener('click', (event) => {
      const point = event.target.closest('.memory-point');
      if (!point) return;
      openMemory(point.dataset.memoryId);
    });

    list.dataset.bound = 'true';
  }

  function openMemory(memoryId) {
    const zoneScreen = document.getElementById('zoneScreen');
    const memoryScreen = document.getElementById('memoryDetailScreen');
    if (!zoneScreen || !memoryScreen) return;

    const memory = findMemoryById(memoryId);
    if (!memory) return;

    populateMemoryContent(memory);

    zoneScreen.setAttribute('aria-hidden', 'true');
    memoryScreen.setAttribute('aria-hidden', 'false');
    memoryScreen.setAttribute('tabindex', '-1');
    memoryScreen.focus({ preventScroll: true });
  }

  function closeMemory() {
    const zoneScreen = document.getElementById('zoneScreen');
    const memoryScreen = document.getElementById('memoryDetailScreen');
    if (!zoneScreen || !memoryScreen) return;

    memoryScreen.setAttribute('aria-hidden', 'true');
    zoneScreen.setAttribute('aria-hidden', 'false');
    zoneScreen.setAttribute('tabindex', '-1');
    zoneScreen.focus({ preventScroll: true });
  }

  function findMemoryById(memoryId) {
    const all = window.AMARIS_MEMORIES || {};
    for (const zoneId in all) {
      const found = all[zoneId].find((m) => m.id === memoryId);
      if (found) return found;
    }
    return null;
  }

  function populateMemoryContent(memory) {
    const body = document.getElementById('memoryBody');
    if (!body) return;
    body.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'memory-title';
    title.textContent = memory.title;

    const text = document.createElement('p');
    text.className = 'memory-text';
    text.textContent = memory.content || '';

    body.appendChild(title);
    body.appendChild(text);
  }

  /* ------------------------------------------------------------------ */
  /* Inicialización                                                      */
  /* ------------------------------------------------------------------ */

  document.addEventListener('DOMContentLoaded', () => {
    createStars(36);
    createParticles(prefersReducedMotion ? 0 : 12);

    const enterBtn = document.getElementById('enterBtn');
    if (enterBtn) {
      enterBtn.addEventListener('click', goToThreshold);
    }

    const backToWorldBtn = document.getElementById('backToWorldBtn');
    if (backToWorldBtn) {
      backToWorldBtn.addEventListener('click', exitZone);
    }

    const backToZoneBtn = document.getElementById('backToZoneBtn');
    if (backToZoneBtn) {
      backToZoneBtn.addEventListener('click', closeMemory);
    }
  });

  /*
    NOTA PARA FASES FUTURAS (audio):
    Aquí es donde se inicializaría la reproducción de audio ambiental,
    siempre disparada por una interacción explícita del usuario
    (por ejemplo, dentro de goToThreshold), nunca en autoplay al cargar.
  */
})();
