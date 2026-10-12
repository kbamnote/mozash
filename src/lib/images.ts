/**
 * Placeholder photography (Pexels CDN) for the demo build.
 * Every id below has been eyeballed so nothing ships as a wrong-sport image.
 * Swap `px()` for the real CDN once the client supplies licensed art.
 */
export const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=${w}`;

export const photo = {
  heroServe: 38377267,
  heroMono: 38354576,

  /**
   * Sport-card set for the fan carousel. All five are portrait-orientation
   * originals — the cards are 3:4, and cropping landscape shots into a tall
   * frame is what made the previous set look amateurish.
   */
  tennisClay: 22931875,
  badmintonCourt: 8007090,
  pickleballPlayer: 30864598,
  padelCourt: 35248469,
  // Not 7648286 (the B&W serve): monochrome on a white court renders as a
  // near-blank card beside the other four and kills the set.
  squashCourt: 7648269,

  stringingWall: 26890804,
  shuttlesDark: 36188824,
  padelRacquets: 31012869,
  tennisBall: 226584,
  courtLines: 29820785,
} as const;
