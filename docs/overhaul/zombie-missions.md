# Zombie Survival — الـ 15 مهمة (HTML / CSS / JavaScript حقيقية)

> يحل هذا الإصدار محل نموذج «JavaScript التكتيكي» السابق (انظر `PROGRESS.md`). المصدر: `js/game/zombie/missions.js`. كل مهمة مشهد مبني بـ HTML+CSS، واللاعب يعدّل كودًا حقيقيًا، والتحقق يقرأ الأنماط المحسوبة والأبعاد وحالة DOM داخل الـ sandbox، فكل حل يحقق النتيجة يُقبل (حلول متعددة صحيحة).

| # | المستوى | التقنية | المفهوم | عدد الشروط | حلول بديلة مختبرة |
|---|---|---|---|---|---|
| 1 | beginner | css | الممر الأول — display: flex و justify-content | 3 | 1 |
| 2 | beginner | css | جدار على الأرض — align-items و space-between | 3 | 0 |
| 3 | beginner | css | طابور أكياس الرمل — flex-direction و gap | 3 | 1 |
| 4 | intermediate | css | صناديق بلا مكان — flex-wrap | 3 | 1 |
| 5 | intermediate | css | سدّ بنسب — flex-grow / flex | 3 | 1 |
| 6 | intermediate | css | مناطق آمنة — CSS Grid: columns و gap | 3 | 1 |
| 7 | intermediate | css | مخطط الملجأ — CSS Grid: span و areas | 4 | 1 |
| 8 | advanced | css | مدفع على السطح — position: relative / absolute | 3 | 0 |
| 9 | advanced | css | السلم المخفي — display و visibility | 3 | 1 |
| 10 | advanced | css | بوابة تنزلق — transition و transform | 3 | 1 |
| 11 | intermediate | html | نموذج نداء الاستغاثة — HTML: form و label و input | 4 | 1 |
| 12 | intermediate | html | ترميم الملجأ — HTML الدلالي والوصول | 5 | 0 |
| 13 | advanced | js | فخ يعمل عند الدخول — JavaScript: الأحداث والحلقات | 3 | 1 |
| 14 | advanced | js | فرز المصابين — JavaScript: الدوال والشروط والبيانات | 4 | 1 |
| 15 | expert | html+css+js | لوحة الإنقاذ — HTML + CSS + JavaScript معًا | 4 | 0 |

## ما يُختبر آليًا
- `tests/zombie-missions.test.mjs`: الهيكل ثنائي اللغة، حقول الدرس الستة، تغطية CSS/HTML/JS/المختلط، **كل starter يفشل**، والحل المرجعي وكل بديل ينجح في كل الشروط داخل الـ sandbox الحقيقي.
- `tests/zombie-lab-ui.test.mjs`: 360/390/430/820/1366 بلا overflow ولا أخطاء، التلميحات المتدرجة ثم الحل، حل كل المهام الـ 15 عبر الواجهة على 1366 و360، ونص إنجليزي بلا حروف عربية.

## حدود صريحة
- المحاكاة بصرية (المشهد يتفاعل بعد النجاح: الزومبي يسقط/تُغلق البوابة)؛ لا توجد بعد موارد/أنواع زومبي بسلوك ديناميكي أو مناطق آمنة بمنطق لعب متعدد الخطوات داخل هذه المهام.
- `submit_solve` على الخادم ما زال يثق بإعلان العميل أن المستوى حُلّ (موثّق في `zombie-security.md` وتحسينه مخطط في مرحلة Supabase).
