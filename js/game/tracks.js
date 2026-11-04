/* Game tracks: id, display name, loader of the challenge set. Challenge sets are lazy ES modules. */
export const TRACKS = [
  { id: "html", name: "HTML", tag: "HTML" },
  { id: "css", name: "CSS", tag: "CSS" },
  { id: "js", name: "JavaScript", tag: "JS" },
];
export const loadChallenges = async (id) => (await import(`/js/game/challenges/${id}.js`)).CHALLENGES;
