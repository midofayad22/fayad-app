# Zombie Survival — المهمات الـ15 (بقاء حقيقي بـ HTML / CSS / JavaScript)

المصدر: `js/game/zombie/missions.js` · المحرك: `sim.js` · العالم: `world.js` · الواجهة: `game.js`. التصميم: `zombie-redesign.md`.

| # | المعرّف | الموقع | المستوى | التقنية | المهمة | أنواع الزومبي | الذخيرة | حلول بديلة |
|---|---|---|---|---|---|---|---|---|
| 1 | zb-1 | farm | beginner | css | متراس الحظيرة | walker | 6 | 2 |
| 2 | zb-2 | farm | beginner | css | ممران لا ممر واحد | walker | 6 | 1 |
| 3 | zb-3 | farm | beginner | css | صناديق لا تتسع | walker | 8 | 1 |
| 4 | zb-4 | gas | intermediate | css | ثلاثة ممرات، ثلاثة متاريس | walker | 7 | 1 |
| 5 | zb-5 | gas | intermediate | css | برج المراقبة | walker | 3 | 1 |
| 6 | zb-6 | gas | intermediate | css | سياج به ثغرة | walker, runner, crawler | 10 | 1 |
| 7 | zb-7 | clinic | intermediate | html | أدخل الناجين | runner | 8 | 0 |
| 8 | zb-8 | clinic | intermediate | html | نداء الراديو | walker | 3 | 1 |
| 9 | zb-9 | clinic | advanced | html | ترميم غرفة الإسعاف | walker, brute | 5 | 0 |
| 10 | zb-10 | school | advanced | js | جرس الإنذار | walker | 2 | 1 |
| 11 | zb-11 | school | advanced | js | لا تهدر الفخ | walker, brute | 4 | 1 |
| 12 | zb-12 | school | advanced | js | أغلق كل الأبواب | walker | 4 | 1 |
| 13 | zb-13 | bunker | advanced | css+js | بوابة ثقيلة وبطيئة | runner, walker | 3 | 0 |
| 14 | zb-14 | bunker | expert | html+js | نقطة الإنقاذ | runner | 5 | 1 |
| 15 | zb-15 | bunker | expert | html+css+js | الصمود الأخير | walker, runner, brute, spitter | 8 | 0 |

## آليات اللعب
- زومبي بخمسة سلوكيات: walker (يهاجم أي متراس)، runner (سريع يبحث عن الثغرات ولا يكسر)، crawler (يمر من الفتحات الصغيرة)، brute (يحطم المتاريس)، spitter (يرمي من بعيد فوق الجدران).
- عناصر DOM حقيقية تؤثر: `.barricade/.wall/.door/.gate/.crate` تحجب، `.trap.armed` تؤذي وتكلّف إمدادًا، `.turret.on` تطلق النار بذخيرة، `.ammo-crate` تعطي ذخيرة، `.barrel` ينفجر بنقرة (يؤذي من حوله مرة واحدة)، `.medkit` يصلح الملجأ +6.
- الفوز: الصمود حتى الفجر مع بقاء الملجأ وعدد كافٍ من الناجين. الخسارة تُشرح بسببها (تسلل/كسر/ملجأ/ناجٍ).
- النجوم: 1 فوز، +1 صحة الملجأ ≥ 60%، +1 كل الناجين دون تلميح.

## ما يُختبر آليًا
- `tests/zombie-structure.test.mjs`: بنية المهمات ثنائية اللغة، حقول الدرس الستة، ثلاثة تلميحات، وجود الأنواع والبراميل والإسعافات.
- `tests/zombie-sim.test.mjs`: المحاكاة الحقيقية داخل sandbox مع لاعب آلي: كل starter يخسر وكل حل وبديل يربح (`ZB_FAST=1` للضبط السريع فقط).
- `tests/zombie-game-ui.test.mjs`: الواجهة في متصفح حقيقي (الخريطة، HUD عند 360/390/430/820/1366، لعب حقيقي بالماوس واللمس، خسارة وإعادة، EN)؛ `ZB_ALL=1` يلعب المهمات الـ15 كلها بالماوس.

## حدود صريحة
- `submit_solve` على الخادم يثق بإعلان العميل أن المستوى حُلّ (انظر `zombie-security.md`)؛ ستُعالج في مرحلة الأمان.
- لا مؤثرات صوتية بعد. الزاحف يظهر في مهمة واحدة. الموارد (برميل/إسعاف) في 5 مهمات فقط.
