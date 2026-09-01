// بيانات الاتصال بقاعدة بيانات Supabase
const SUPABASE_URL = 'https://vsrysitexadvmmikcmfs.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_qo4ZB-vWkWThCQpoGtSRSw_2oaStgyp'

// تهيئة عميل Supabase باستخدام الكلاس المتاح من الـ CDN
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 1. التحقق من حالة الدخول وتحديث الهيدر في الصفحة الرئيسية (index.html)
async function checkAuthState() {
  const { data: { session } } = await supabase.auth.getSession();
  const signinBtn = document.getElementById('user-account-section') || document.querySelector('.btn-signin');
  
  if (session && signinBtn) {
    const user = session.user;
    const userInitial = user.email ? user.email.charAt(0).toUpperCase() : 'F';
    
    // تحويل زر الـ Sign In لدائرة البروفايل البرتقالية الفخمة مع زر الخروج
    signinBtn.href = "#";
    signinBtn.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
        <div style="width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #f97316, #ea580c); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 15px; box-shadow: 0 3px 10px rgba(249, 115, 22, 0.4);">
          ${userInitial}
        </div>
        <span style="font-size: 13px; color: #ef4444; font-weight: 600;">Logout</span>
      </div>
    `;

    // تفعيل وظيفة تسجيل الخروج عند الضغط عليه
    signinBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      await supabase.auth.signOut();
      window.location.reload();
    });
  }
}

// 2. معالجة عمليات الـ Sign In والـ Sign Up
async function handleAuthAction(isSignUp) {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorMsg = document.getElementById('error-msg');

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    if (errorMsg) errorMsg.innerText = 'الرجاء إدخال البريد الإلكتروني وكلمة المرور.';
    return;
  }

  try {
    let response;
    if (isSignUp) {
      response = await supabase.auth.signUp({ email, password });
    } else {
      response = await supabase.auth.signInWithPassword({ email, password });
    }

    if (response.error) throw response.error;

    // نجاح العملية: التحويل الفوري للصفحة الرئيسية
    window.location.href = 'index.html';
  } catch (err) {
    if (errorMsg) {
      let friendlyMessage = 'حدث خطأ أثناء العملية.';
      if (err.message.includes('Invalid login credentials')) {
        friendlyMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
      } else if (err.message.includes('User already registered')) {
        friendlyMessage = 'هذا البريد مسجل مسبقاً، قم بتسجيل الدخول.';
      } else if (err.message.includes('Password should be at least')) {
        friendlyMessage = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.';
      }
      errorMsg.innerText = friendlyMessage;
    }
  }
}

// 3. التشغيل التلقائي فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  checkAuthState();

  const signinButton = document.getElementById('signin-btn');
  const signupButton = document.getElementById('signup-btn');

  if (signinButton) {
    signinButton.addEventListener('click', (e) => {
      e.preventDefault();
      handleAuthAction(false); // تسجيل دخول
    });
  }

  if (signupButton) {
    signupButton.addEventListener('click', (e) => {
      e.preventDefault();
      handleAuthAction(true); // إنشاء حساب جديد
    });
  }
});