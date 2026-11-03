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

  /* The menu itself (avatar, real progress overview, dashboard/profile links, sign out) lives in js/account-menu.js */
  function mountAccountMenu(host, user) {
    if (window.FAYAD_ACCOUNT_MENU) {
      window.FAYAD_ACCOUNT_MENU.mount(host, user, { onSignOut: signOutCore });
      return;
    }
    window.addEventListener("fayad:account-menu-ready", function () { mountAccountMenu(host, user); }, { once: true });
  }

  async function signOutCore() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    renderLoggedOutUser();
    window.dispatchEvent(new CustomEvent("fayad-auth-changed", { detail: { loggedIn: false, user: null, session: null, event: "SIGNED_OUT" } }));
  }

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

    mountAccountMenu(userProfile, user);
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
        <svg class="fy-spin" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9"/></svg>
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
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
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
