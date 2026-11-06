/* Pure validation helpers for the profile page (unit-tested in Node). */
export const AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const AVATAR_MAX = 5 * 1024 * 1024;
/** @returns {null | "type" | "size" | "empty"} */
export function validateAvatar(file) {
  if (!file || !file.size) return "empty";
  if (!AVATAR_TYPES.includes(file.type)) return "type";
  if (file.size > AVATAR_MAX) return "size";
  return null;
}
export function validateName(raw) { const n = String(raw || "").replace(/\s+/g, " ").trim(); return n.length >= 1 && n.length <= 80 ? n : null; }

