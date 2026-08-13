/**
 * Mise en forme des durées — partagée par le précompilateur, le sommaire et
 * l'assembleur du classeur, pour qu'un même « 60 min » s'affiche partout de
 * la même façon.
 *
 * Au-delà d'une heure, compter en minutes ne se compare plus à rien : une
 * séance de « 60 min » se lit « 1 h », et un cumul de « 535 min » se lit
 * « 8 h 55 », qui se compare à une soirée.
 */

/** Un nombre de minutes vers sa forme lisible. 45 → « 45 min », 90 → « 1 h 30 ». */
export const enHeures = (min) =>
  min < 60
    ? `${min} min`
    : `${Math.floor(min / 60)} h${min % 60 ? ` ${String(min % 60).padStart(2, '0')}` : ''}`;

/**
 * Normalise une durée écrite à la main dans un en-tête YAML.
 * « 25 min » ne bouge pas, « 60 min » devient « 1 h », et tout ce qui est déjà
 * écrit en heures — « 4 h 10 » — traverse intact.
 */
export const formaterDuree = (v) => {
  const s = String(v ?? '').trim();
  const m = s.match(/^(\d+)\s*min\.?$/i);
  return m ? enHeures(Number(m[1])) : s;
};
