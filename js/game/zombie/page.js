import { startLab } from "/js/game/lab.js";
import { MISSIONS } from "/js/game/zombie/missions.js";
startLab({ game: "zombie", missions: MISSIONS, base: (_, i) => 11 + i });
