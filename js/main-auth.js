(function() {
  const SUPABASE_URL = 'https://vsrysitexadvmmikcmfs.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_qo4ZB-vWkWThCQpoGtSRSw_2oaStgyp';

  if (!window.supabase) return;

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  async function checkAuthStatus() {
    const { data: { session } } = await supabase.auth.getSession();
    const authBtn = document.getElementById('auth-btn-link');
    
    if (!authBtn) return;

    if (session) {
      // لو مسجل دخول، نغير شكل الزرار لـ Logout أو اسم المستخدم
      authBtn.textContent = "Logout";
      authBtn.href = "#";
      authBtn.onclick = async (e) => {
        e.preventDefault();
        await supabase.auth.signOut();
        window.location.reload();
      };
    } else {
      // لو مش مسجل، يفضل زرار الـ Sign In عادي جداً
      authBtn.textContent = "Sign In";
      authBtn.href = "login.html";
    }
  }

  document.addEventListener('DOMContentLoaded', checkAuthStatus);
})();