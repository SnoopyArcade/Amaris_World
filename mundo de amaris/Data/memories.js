/* ==========================================================================
   AMARIS WORLD — FASE 3: DATOS DE RECUERDOS
   Script plano (sin módulos ES), coherente con el resto del proyecto.
   Expone window.AMARIS_MEMORIES, indexado por zone.id (ver data/zones.js).

   Cada recuerdo:
     id        → identificador único
     title     → título visible en la lista de la zona y en la experiencia
     content   → texto del recuerdo (placeholder hasta que exista contenido real)
     unlocked  → si es false, no se renderiza (preparado a futuro)
   ========================================================================== */

window.AMARIS_MEMORIES = {
  'zona-1': [
    { id: 'zona-1-recuerdo-1', title: 'Recuerdo 1', content: 'Un recuerdo por escribir.', unlocked: true },
    { id: 'zona-1-recuerdo-2', title: 'Recuerdo 2', content: 'Un recuerdo por escribir.', unlocked: true },
    { id: 'zona-1-recuerdo-3', title: 'Recuerdo 3', content: 'Un recuerdo por escribir.', unlocked: true }
  ],
  'zona-2': [
    { id: 'zona-2-recuerdo-1', title: 'Recuerdo 1', content: 'Un recuerdo por escribir.', unlocked: true },
    { id: 'zona-2-recuerdo-2', title: 'Recuerdo 2', content: 'Un recuerdo por escribir.', unlocked: true },
    { id: 'zona-2-recuerdo-3', title: 'Recuerdo 3', content: 'Un recuerdo por escribir.', unlocked: true }
  ],
  'zona-3': [
    { id: 'zona-3-recuerdo-1', title: 'Recuerdo 1', content: 'Un recuerdo por escribir.', unlocked: true },
    { id: 'zona-3-recuerdo-2', title: 'Recuerdo 2', content: 'Un recuerdo por escribir.', unlocked: true },
    { id: 'zona-3-recuerdo-3', title: 'Recuerdo 3', content: 'Un recuerdo por escribir.', unlocked: true }
  ],
  'zona-4': [
    { id: 'zona-4-recuerdo-1', title: 'Recuerdo 1', content: 'Un recuerdo por escribir.', unlocked: true },
    { id: 'zona-4-recuerdo-2', title: 'Recuerdo 2', content: 'Un recuerdo por escribir.', unlocked: true },
    { id: 'zona-4-recuerdo-3', title: 'Recuerdo 3', content: 'Un recuerdo por escribir.', unlocked: true }
  ]
};
