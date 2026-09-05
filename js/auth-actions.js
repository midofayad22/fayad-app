/* =========================================================
   FAYAD — AUTH ACTIONS COMPATIBILITY LAYER

   Main authentication system:
   js/main-auth.js

   This file keeps older pages compatible.

   IMPORTANT:

   - Do NOT create another Supabase client here.
   - Do NOT store passwords.
   - Login and signup use the central FAYAD_AUTH system.
========================================================= */

(function () {
  "use strict";

  /* =========================================================
     GET MAIN AUTH SYSTEM
  ========================================================= */

  function getAuthSystem() {
    return window.FAYAD_AUTH || null;
  }

  /* =========================================================
     WAIT FOR MAIN AUTH SYSTEM
  ========================================================= */

  async function waitForAuthSystem(timeout = 10000) {
    const start = Date.now();

    while (!getAuthSystem() && Date.now() - start < timeout) {
      await new Promise(function (resolve) {
        setTimeout(resolve, 50);
      });
    }

    return getAuthSystem();
  }

  /* =========================================================
     CHECK AUTH STATE
  ========================================================= */

  async function checkAuthState() {
    const auth = await waitForAuthSystem();

    if (!auth) {
      console.warn("[FAYAD AUTH ACTIONS] Main auth system is not ready.");

      return null;
    }

    try {
      const { data, error } = await auth.getSession();

      if (error) {
        throw error;
      }

      return data?.session || null;
    } catch (error) {
      console.error("[FAYAD AUTH ACTIONS] Session check failed:", error);

      return null;
    }
  }

  /* =========================================================
     NORMALIZE EMAIL
  ========================================================= */

  function normalizeEmail(email) {
    return String(email || "")
      .trim()
      .toLowerCase();
  }

  /* =========================================================
     FRIENDLY ERROR MESSAGE
  ========================================================= */

  function getFriendlyAuthMessage(error, isSignUp) {
    const message = String(error?.message || "");

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("invalid login credentials")) {
      return "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
    }

    if (lowerMessage.includes("invalid credentials")) {
      return "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
    }

    if (lowerMessage.includes("email not confirmed")) {
      return "يرجى تأكيد بريدك الإلكتروني أولًا من رسالة التأكيد التي أرسلناها لك.";
    }

    if (lowerMessage.includes("user already registered")) {
      return "هذا البريد الإلكتروني مسجل بالفعل. قم بتسجيل الدخول بدلًا من إنشاء حساب جديد.";
    }

    if (lowerMessage.includes("password should be at least")) {
      return "كلمة المرور يجب أن تكون 6 أحرف على الأقل.";
    }

    if (lowerMessage.includes("password is too short")) {
      return "كلمة المرور قصيرة جدًا.";
    }

    if (lowerMessage.includes("email address is invalid")) {
      return "البريد الإلكتروني غير صحيح.";
    }

    if (lowerMessage.includes("too many requests")) {
      return "تم إرسال طلبات كثيرة خلال وقت قصير. انتظر قليلًا ثم حاول مرة أخرى.";
    }

    if (lowerMessage.includes("rate limit")) {
      return "تم تجاوز عدد المحاولات المسموح بها مؤقتًا. حاول مرة أخرى بعد قليل.";
    }

    if (lowerMessage.includes("network") || lowerMessage.includes("failed to fetch")) {
      return "تعذر الاتصال بخدمة تسجيل الدخول. تأكد من اتصال الإنترنت وحاول مرة أخرى.";
    }

    if (lowerMessage.includes("email rate limit")) {
      return "تم تجاوز حد إرسال رسائل البريد مؤقتًا. حاول مرة أخرى بعد قليل.";
    }

    if (lowerMessage.includes("signup is disabled")) {
      return "إنشاء الحسابات متوقف حاليًا.";
    }

    if (lowerMessage.includes("email provider is disabled")) {
      return "تسجيل الدخول بالبريد الإلكتروني غير متاح حاليًا.";
    }

    if (isSignUp) {
      return message || "حدث خطأ أثناء إنشاء الحساب.";
    }

    return message || "حدث خطأ أثناء تسجيل الدخول.";
  }

  /* =========================================================
     SAVE ACCOUNT INFO
  ========================================================= */

  function saveAccountInfo(email) {
    if (!email) return;

    try {
      localStorage.setItem("fayad_last_user_email", email);

      localStorage.setItem("fayad_has_used_account", "true");
    } catch (error) {
      console.warn("[FAYAD AUTH] Could not save account info.", error);
    }
  }

  /* =========================================================
     HANDLE AUTH ACTION
  ========================================================= */

  async function handleAuthAction(isSignUp) {
    const emailInput = document.getElementById("email");

    const passwordInput = document.getElementById("password");

    const errorMsg = document.getElementById("error-msg");

    if (!emailInput || !passwordInput) {
      console.error("[FAYAD AUTH ACTIONS] Email or password input was not found.");

      return;
    }

    /* =====================================================
       EMAIL
    ===================================================== */

    const email = normalizeEmail(emailInput.value);

    /* =====================================================
       PASSWORD

       IMPORTANT:
       DO NOT trim password.

       Password must be sent exactly as
       the user entered it.
    ===================================================== */

    const password = passwordInput.value;

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!email) {
      if (errorMsg) {
        errorMsg.textContent = "الرجاء إدخال البريد الإلكتروني.";
      }

      emailInput.focus();
      return;
    }

    if (!password) {
      if (errorMsg) {
        errorMsg.textContent = "الرجاء إدخال كلمة المرور.";
      }

      passwordInput.focus();
      return;
    }

    if (isSignUp && password.length < 6) {
      if (errorMsg) {
        errorMsg.textContent = "كلمة المرور يجب أن تكون 6 أحرف على الأقل.";
      }

      passwordInput.focus();
      return;
    }

    /* =====================================================
       GET CENTRAL AUTH
    ===================================================== */

    const auth = await waitForAuthSystem();

    if (!auth) {
      if (errorMsg) {
        errorMsg.textContent = "نظام تسجيل الدخول لم يتم تحميله بعد. حاول مرة أخرى.";
      }

      return;
    }

    /* =====================================================
       DISABLE AUTH BUTTONS
    ===================================================== */

    const submitButtons = document.querySelectorAll('button[type="submit"], input[type="submit"]');

    submitButtons.forEach(function (button) {
      button.disabled = true;
    });

    if (errorMsg) {
      errorMsg.textContent = isSignUp ? "جاري إنشاء الحساب..." : "جاري تسجيل الدخول...";
    }

    try {
      let response;

      /* ===================================================
         SIGN UP
      =================================================== */

      if (isSignUp) {
        response = await auth.client.auth.signUp({
          email: email,
          password: password,
        });
      } else {
        /* =================================================
           LOGIN
        ================================================= */

        response = await auth.client.auth.signInWithPassword({
          email: email,
          password: password,
        });
      }

      /* ===================================================
         CHECK SUPABASE ERROR
      =================================================== */

      if (response?.error) {
        throw response.error;
      }

      /* ===================================================
         SIGN UP RESULT
      =================================================== */

      if (isSignUp) {
        saveAccountInfo(email);

        const user = response?.data?.user || null;

        const session = response?.data?.session || null;

        /*
          If Supabase requires email confirmation,
          there will be a user but no session.

          This is NOT a JavaScript error.
          It means the Supabase project is configured
          to require email confirmation.
        */

        if (user && !session) {
          if (errorMsg) {
            errorMsg.textContent = "تم إنشاء الحساب بنجاح. افتح رسالة التأكيد في بريدك الإلكتروني ثم قم بتسجيل الدخول.";
          }

          submitButtons.forEach(function (button) {
            button.disabled = false;
          });

          return;
        }

        /*
          If signup returned a session,
          the account is immediately authenticated.
        */

        if (session?.user) {
          window.dispatchEvent(
            new CustomEvent("fayad-auth-login-success", {
              detail: {
                email: email,
                isSignUp: true,
                user: session.user,
                session: session,
              },
            }),
          );

          if (errorMsg) {
            errorMsg.textContent = "تم إنشاء الحساب وتسجيل الدخول بنجاح.";
          }

          /*
            Give Supabase auth listener a moment
            to update the UI before navigation.
          */

          setTimeout(function () {
            window.location.replace("index.html");
          }, 200);

          return;
        }
      }

      /* ===================================================
         LOGIN RESULT
      =================================================== */

      const session = response?.data?.session || null;

      const user = response?.data?.user || null;

      if (!session || !user) {
        throw new Error("تمت العملية ولكن لم يتم إنشاء جلسة تسجيل الدخول.");
      }

      /* ===================================================
         SAVE EMAIL ONLY
      =================================================== */

      saveAccountInfo(email);

      /* ===================================================
         SUCCESS EVENT
      =================================================== */

      window.dispatchEvent(
        new CustomEvent("fayad-auth-login-success", {
          detail: {
            email: email,
            isSignUp: false,
            user: user,
            session: session,
          },
        }),
      );

      /* ===================================================
         SUCCESS MESSAGE
      =================================================== */

      if (errorMsg) {
        errorMsg.textContent = "تم تسجيل الدخول بنجاح.";
      }

      /* ===================================================
         NAVIGATE HOME
      =================================================== */

      setTimeout(function () {
        window.location.replace("index.html");
      }, 200);
    } catch (error) {
      console.error("[FAYAD AUTH] Authentication error:", error);

      if (errorMsg) {
        errorMsg.textContent = getFriendlyAuthMessage(error, isSignUp);
      }

      submitButtons.forEach(function (button) {
        button.disabled = false;
      });
    }
  }

  /* =========================================================
     PUBLIC COMPATIBILITY API
  ========================================================= */

  window.FAYAD_AUTH_ACTIONS = {
    checkAuthState: checkAuthState,

    handleAuthAction: handleAuthAction,
  };

  /* =========================================================
     OLD GLOBAL FUNCTION NAMES
  ========================================================= */

  window.checkAuthState = checkAuthState;

  window.handleAuthAction = handleAuthAction;
})();
