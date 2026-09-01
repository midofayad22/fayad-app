(function() {
  const SUPABASE_URL = 'https://vsrysitexadvmmikcmfs.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_qo4ZB-vWkWThCQpoGtSRSw_2oaStgyp';

  if (!window.supabase) return;

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const errorMsg = document.getElementById('error-msg');

  // 1. زرار إنشاء حساب جديد (مع حفظه في جدول user_progress)
  if (signupBtn) {
    signupBtn.addEventListener('click', async () => {
      const email = emailInput.value;
      const password = passwordInput.value;

      // الخطوة أ: إنشاء الحساب في نظام الـ Auth
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        errorMsg.textContent = error.message;
        return;
      }

      // الخطوة ب: لو التسجيل نجح، نسجل أول سجل ليه في جدول user_progress
      if (data.user) {
        const { error: dbError } = await supabase
          .from('user_progress')
          .insert([
            { user_id: data.user.id, completed_courses: 'Started Platform' }
          ]);

        if (dbError) {
          console.error("Error saving progress:", dbError.message);
        }
      }

      alert('Account created successfully! You can now sign in.');
    });
  }

  // 2. زرار تسجيل الدخول (Sign In)
  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      const email = emailInput.value;
      const password = passwordInput.value;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        errorMsg.textContent = error.message;
      } else {
        alert('Welcome back to FAYAD Platform!');
        window.location.href = 'index.html'; // يرجعك للرئيسية ومسجل دخول
      }
    });
  }
})();