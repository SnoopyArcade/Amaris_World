/* ==========================================================================
   AMARIS WORLD — FASE 2: DATOS DE ZONAS
   Script plano (sin módulos ES), coherente con el resto del proyecto.
   Expone window.AMARIS_ZONES para que script.js lo consuma.

   Cada zona:
     id          → identificador único, usado como referencia interna
     name        → nombre visible en el mundo y en la pantalla de zona
     description → texto breve (placeholder hasta que exista contenido real)
     position    → { x, y } en porcentaje respecto al escenario del mundo
     unlocked    → si es false, la zona no se renderiza (preparado a futuro)
     destination → id de referencia para conectar con memories.js más adelante
   ========================================================================== */

window.AMARIS_ZONES = [
  {
    id: 'zona-1',
    name: 'Zona 1',
    description: 'Un lugar por descubrir.',
    position: { x: 22, y: 30 },
    unlocked: true,
    destination: 'zona-1'
  },
  {
    id: 'zona-2',
    name: 'Zona 2',
    description: 'Un lugar por descubrir.',
    position: { x: 74, y: 24 },
    unlocked: true,
    destination: 'zona-2'
  },
  {
    id: 'zona-3',
    name: 'Zona 3',
    description: 'Un lugar por descubrir.',
    position: { x: 32, y: 68 },
    unlocked: true,
    destination: 'zona-3'
  },
  {
    id: 'zona-4',
    name: 'Zona 4',
    description: 'Un lugar por descubrir.',
    position: { x: 76, y: 70 },
    unlocked: true,
    destination: 'zona-4'
  }
];
