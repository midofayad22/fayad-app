/* =========================================================
   FAYAD — CENTRAL AUTH SYSTEM
   Supabase Authentication
========================================================= */

(function () {
  "use strict";

  /* =========================================================
     SUPABASE CONFIG
  ========================================================= */

  const SUPABASE_URL = "https://vsrysitexadvmmikcmfs.supabase.co";

  const SUPABASE_ANON_KEY = "sb_publishable_qo4ZB-vWkWThCQpoGtSRSw_2oaStgyp";

  /* =========================================================
     SAFETY CHECK
  ========================================================= */

  if (!window.supabase) {
    console.error("[FAYAD AUTH] Supabase library was not loaded.");
    return;
  }

  /* =========================================================
     CREATE SUPABASE CLIENT
  ========================================================= */

  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,

      // Explicitly use browser storage so the session
      // survives page refreshes and reopening the PWA.
      storage: window.localStorage,

      // Prevent multiple tabs/pages from creating
      // conflicting authentication states.
      storageKey: "fayad-supabase-auth",

      // Do not keep OAuth sessions in the URL hash.
      flowType: "pkce",
    },
  });

  /* =========================================================
     STORAGE KEYS
  ========================================================= */

  const STORAGE_KEYS = {
    lastEmail: "fayad_last_user_email",
    hasUsedAccount: "fayad_has_used_account",
  };

  /* =========================================================
     SAFE LOCAL STORAGE HELPERS
  ========================================================= */

  function saveLastUser(email) {
    if (!email) return;

    try {
      localStorage.setItem(STORAGE_KEYS.lastEmail, String(email).trim().toLowerCase());

      localStorage.setItem(STORAGE_KEYS.hasUsedAccount, "true");
    } catch (error) {
      console.warn("[FAYAD AUTH] Could not save local account info.", error);
    }
  }

  function getLastUserEmail() {
    try {
      return localStorage.getItem(STORAGE_KEYS.lastEmail);
    } catch (error) {
      return null;
    }
  }

  function hasUsedAccountBefore() {
    try {
      return localStorage.getItem(STORAGE_KEYS.hasUsedAccount) === "true";
    } catch (error) {
      return false;
    }
  }

  /* =========================================================
     USER DISPLAY HELPERS
  ========================================================= */

  function getUserInitial(user) {
    if (!user) return "F";

    const metadata = user.user_metadata || {};

    const name = metadata.full_name || metadata.name || metadata.username || "";

    if (name.trim()) {
      return name.trim().charAt(0).toUpperCase();
    }

    const email = user.email || metadata.email || "";

    if (!email) return "F";

    return email.trim().charAt(0).toUpperCase();
  }

  function getUserDisplayName(user) {
    if (!user) return "FAYAD User";

    const metadata = user.user_metadata || {};

    return metadata.full_name || metadata.name || metadata.username || "FAYAD User";
  }

  function getUserEmail(user) {
    if (!user) return "";

    return user.email || "";
  }

  function getUserAvatar(user) {
    if (!user) return "";

    const metadata = user.user_metadata || {};

    return metadata.avatar_url || metadata.picture || "";
  }

  /* =========================================================
     ESCAPE HTML
  ========================================================= */

  function escapeHtml(value) {
    if (value === null || value === undefined) {
      return "";
    }

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* =========================================================
     CREATE USER PROFILE UI
  ========================================================= */

  function renderLoggedInUser(user) {
    const authContainer = document.getElementById("auth-container");

    const userProfile = document.getElementById("user-profile");

    if (!user) {
      renderLoggedOutUser();
      return;
    }

    /*
      IMPORTANT:
      We save the email only.

      The password is NEVER stored.
      Supabase manages the authenticated session.
    */

    saveLastUser(user.email);

    /* =====================================================
       HIDE LOGIN
    ===================================================== */

    if (authContainer) {
      authContainer.style.display = "none";
    }

    /* =====================================================
       SHOW PROFILE
    ===================================================== */

    if (!userProfile) {
      return;
    }

    userProfile.style.display = "block";

    const initial = getUserInitial(user);

    const displayName = getUserDisplayName(user);

    const email = getUserEmail(user);

    const avatarUrl = getUserAvatar(user);

    const safeAvatarUrl = escapeHtml(avatarUrl);

    const avatarContent = safeAvatarUrl
      ? `
          <img
            src="${safeAvatarUrl}"
            alt="${escapeHtml(displayName)}"
            class="fayad-user-avatar-image"
            referrerpolicy="no-referrer"
          />
        `
      : escapeHtml(initial);

    userProfile.innerHTML = `
      <div
        class="fayad-user-menu"
        id="fayadUserMenu"
      >

        <button
          type="button"
          class="fayad-user-trigger"
          id="fayadUserTrigger"
          aria-expanded="false"
          aria-haspopup="true"
        >

          <span class="fayad-user-avatar">
            ${avatarContent}
          </span>

          <span class="fayad-user-info">

            <strong>
              ${escapeHtml(displayName)}
            </strong>

            <small>
              ${escapeHtml(email)}
            </small>

          </span>

          <i class="fa-solid fa-chevron-down"></i>

        </button>

        <div
          class="fayad-user-dropdown"
          id="fayadUserDropdown"
          hidden
        >

          <div class="fayad-user-dropdown-head">

            <span class="fayad-user-avatar large">
              ${avatarContent}
            </span>

            <div>

              <strong>
                ${escapeHtml(displayName)}
              </strong>

              <small>
                ${escapeHtml(email)}
              </small>

            </div>

          </div>

          <div class="fayad-user-dropdown-divider"></div>

          <a
            href="#"
            class="fayad-user-menu-item"
            data-auth-action="account"
          >

            <i class="fa-solid fa-user"></i>

            <span>
              حسابي
            </span>

          </a>

          <a
            href="#"
            class="fayad-user-menu-item"
            data-auth-action="progress"
          >

            <i class="fa-solid fa-chart-line"></i>

            <span>
              تقدمي
            </span>

          </a>

          <div class="fayad-user-dropdown-divider"></div>

          <button
            type="button"
            class="fayad-user-menu-item logout"
            id="fayadLogoutButton"
          >

            <i class="fa-solid fa-right-from-bracket"></i>

            <span>
              تسجيل الخروج
            </span>

          </button>

        </div>

      </div>
    `;

    bindUserMenuEvents();
  }

  /* =========================================================
     LOGGED OUT STATE
  ========================================================= */

  function renderLoggedOutUser() {
    const authContainer = document.getElementById("auth-container");

    const userProfile = document.getElementById("user-profile");

    if (authContainer) {
      authContainer.style.display = "";
    }

    if (userProfile) {
      userProfile.style.display = "none";
      userProfile.innerHTML = "";
    }
  }

  /* =========================================================
     USER MENU EVENTS
  ========================================================= */

  function bindUserMenuEvents() {
    const trigger = document.getElementById("fayadUserTrigger");

    const dropdown = document.getElementById("fayadUserDropdown");

    const logoutButton = document.getElementById("fayadLogoutButton");

    if (!trigger || !dropdown) {
      return;
    }

    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!isOpen));

      dropdown.hidden = isOpen;
    });

    document.addEventListener("click", function closeUserMenu(event) {
      const menu = document.getElementById("fayadUserMenu");

      if (!menu) {
        document.removeEventListener("click", closeUserMenu);

        return;
      }

      if (!menu.contains(event.target)) {
        trigger.setAttribute("aria-expanded", "false");

        dropdown.hidden = true;
      }
    });

    if (logoutButton) {
      logoutButton.addEventListener("click", handleLogout);
    }

    const accountLinks = document.querySelectorAll('[data-auth-action="account"], [data-auth-action="progress"]');

    accountLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        console.log("[FAYAD AUTH] Account/Progress page will be connected later.");
      });
    });
  }

  /* =========================================================
     LOGOUT
  ========================================================= */

  async function handleLogout(event) {
    if (event) {
      event.preventDefault();
    }

    const logoutButton = document.getElementById("fayadLogoutButton");

    if (logoutButton) {
      logoutButton.disabled = true;

      logoutButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>جاري تسجيل الخروج...</span>
      `;
    }

    try {
      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        throw error;
      }

      renderLoggedOutUser();

      window.dispatchEvent(
        new CustomEvent("fayad-auth-changed", {
          detail: {
            loggedIn: false,
            user: null,
            session: null,
            event: "SIGNED_OUT",
          },
        }),
      );
    } catch (error) {
      console.error("[FAYAD AUTH] Logout error:", error);

      if (logoutButton) {
        logoutButton.disabled = false;

        logoutButton.innerHTML = `
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>تسجيل الخروج</span>
        `;
      }

      alert("حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.");
    }
  }

  /* =========================================================
     CHECK CURRENT SESSION
  ========================================================= */

  async function checkAuthState() {
    try {
      const { data, error } = await supabaseClient.auth.getSession();

      if (error) {
        throw error;
      }

      const session = data?.session || null;

      if (session?.user) {
        renderLoggedInUser(session.user);
      } else {
        renderLoggedOutUser();
      }

      return session;
    } catch (error) {
      console.error("[FAYAD AUTH] Session check failed:", error);

      renderLoggedOutUser();

      return null;
    }
  }

  /* =========================================================
     GET CURRENT USER
  ========================================================= */

  async function getCurrentUser() {
    try {
      const { data, error } = await supabaseClient.auth.getUser();

      if (error) {
        throw error;
      }

      return data?.user || null;
    } catch (error) {
      console.error("[FAYAD AUTH] User check failed:", error);

      return null;
    }
  }

  /* =========================================================
     AUTH STATE LISTENER
  ========================================================= */

  function listenToAuthChanges() {
    supabaseClient.auth.onAuthStateChange(function (event, session) {
      console.log("[FAYAD AUTH]", event);

      if (session?.user) {
        renderLoggedInUser(session.user);
      } else {
        renderLoggedOutUser();
      }

      window.dispatchEvent(
        new CustomEvent("fayad-auth-changed", {
          detail: {
            event: event,
            session: session,
            user: session?.user || null,
            loggedIn: Boolean(session?.user),
          },
        }),
      );
    });
  }

  /* =========================================================
     PUBLIC AUTH API
  ========================================================= */

  window.FAYAD_AUTH = {
    client: supabaseClient,

    getSession: async function () {
      return await supabaseClient.auth.getSession();
    },

    getUser: async function () {
      return await supabaseClient.auth.getUser();
    },

    checkAuthState: checkAuthState,

    signOut: handleLogout,

    getLastUserEmail: getLastUserEmail,

    hasUsedAccountBefore: hasUsedAccountBefore,

    saveLastUser: saveLastUser,

    getUserInitial: getUserInitial,

    getUserDisplayName: getUserDisplayName,

    getUserEmail: getUserEmail,

    getUserAvatar: getUserAvatar,
  };

  /* =========================================================
     INITIALIZE
  ========================================================= */

  async function initializeAuth() {
    /*
      First restore the existing Supabase session.
    */

    await checkAuthState();

    /*
      Then listen for future changes:
      SIGNED_IN
      SIGNED_OUT
      TOKEN_REFRESHED
      USER_UPDATED
    */

    listenToAuthChanges();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAuth, { once: true });
  } else {
    initializeAuth();
  }
})();
