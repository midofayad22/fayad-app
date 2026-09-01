(function() {
  const SUPABASE_URL = 'حط_هنا_الـ_Project_URL';
  const SUPABASE_ANON_KEY = 'حط_هنا_الـ_Anon_Key';

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