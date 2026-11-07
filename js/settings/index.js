import { T, el, mount, href, livePages, storageNote } from "/js/settings/ui.js";
mount("index", async (body, { user }) => {
  const list = el("ul", { class: "st-hub" });
  for (const p of livePages()) list.append(el("li", {}, el("a", { href: href(p) }, el("strong", {}, T("st." + p)), el("small", {}, T("st.d." + p)))));
  body.append(list, storageNote(user));
});
