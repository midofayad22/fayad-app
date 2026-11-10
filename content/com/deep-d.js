// Computer Basics — deep rewrite of lessons com-16 … com-19 (bodies only). Authored once as AR/EN pairs (see content/_doc.js).
import { T } from "../_doc.js";

const tm = (s) => `<span class="term">${s}</span>`;

export const defs = [
  // ───────────────────────── com-16 ─────────────────────────
  {
    id: "com-16",
    body: [
      { k: "objectives", items: [
        T(`تفرّق بين ${tm("Internet")} و${tm("Web")} و${tm("Browser")} وتشرح علاقة كل منها بالآخر.`, `Tell the ${tm("Internet")}, the ${tm("Web")} and a ${tm("Browser")} apart and explain how they relate.`),
        T(`تفكّك عنوان ${tm("URL")} إلى أجزائه وتتتبع ما يحدث من الضغط على الرابط حتى ظهور الصفحة.`, `Break a ${tm("URL")} into its parts and trace what happens from clicking a link to seeing the page.`),
        T(`تستعمل أدوات المطوّر في المتصفح لقراءة الطلبات ورموز الحالة بنفسك.`, `Use the browser developer tools to read requests and status codes yourself.`),
      ] },
      { k: "prereq", items: [T(`درس «الإنترنت والشبكات» (com-15)، ودرس «كيف يعمل البرنامج» (com-14) مفيد.`, `The lesson “Internet and networks” (com-15); “How a program runs” (com-14) also helps.`)] },

      { k: "h", t: T(`مقدمة: ثلاثة أشياء يخلطها الناس`, `Introduction: three things people mix up`) },
      { k: "p", t: T(`يقول كثيرون «فتحت الإنترنت» وهم يقصدون أنهم فتحوا موقعًا. في الحقيقة هناك ثلاث طبقات مختلفة. ${tm("Internet")} هو شبكة الشبكات: الكابلات والموجّهات والاتفاقات التي تنقل الحزم بين الأجهزة. ${tm("Web")} هو خدمة تعمل فوق الإنترنت، وهو مجموعة ضخمة من المستندات والتطبيقات المترابطة التي يُوصَل إليها بعناوين وبروتوكول ${tm("HTTP")}. أما ${tm("Browser")} فهو برنامج على جهازك يطلب هذه المستندات ويعرضها. البريد الإلكتروني والألعاب المتصلة تستعمل الإنترنت نفسه دون أن تكون جزءًا من الويب.`, `Many people say “I opened the internet” when they mean they opened a website. In reality there are three different layers. The ${tm("Internet")} is the network of networks: the cables, routers and agreements that move packets between devices. The ${tm("Web")} is a service running on top of it, a vast collection of linked documents and applications reached through addresses and the ${tm("HTTP")} protocol. A ${tm("Browser")} is the program on your device that requests those documents and displays them. Email and online games use the same internet without being part of the web.`) },
      { k: "diagram", title: T(`الطبقات من الأعلى إلى الأسفل`, `The layers, top to bottom`), rows: [
        { label: T(`المتصفح`, `Browser`), sub: T(`برنامج على جهازك يعرض الصفحات وينفّذ شيفرتها`, `a program on your device that displays pages and runs their code`) },
        { label: T(`الويب`, `The Web`), sub: T(`صفحات وتطبيقات يصل إليها الناس بعناوين URL عبر HTTP`, `pages and applications reached by URLs over HTTP`) },
        { label: T(`الإنترنت`, `The Internet`), sub: T(`الشبكة التي تنقل الحزم بين أي جهازين عبر عناوين IP`, `the network that carries packets between any two devices using IP addresses`) },
      ] },

      { k: "h", t: T(`تشريح عنوان URL`, `Anatomy of a URL`) },
      { k: "p", t: T(`عنوان ${tm("URL")} (Uniform Resource Locator) يحدد مكان مورد ما وطريقة الوصول إليه. لنأخذ هذا المثال ونقسمه:`, `A ${tm("URL")} (Uniform Resource Locator) states where a resource is and how to reach it. Take this example and split it up:`) },
      { k: "code", lang: "text", code: "https://shop.example.com:443/books/search?q=linux&page=2#reviews\n\nscheme    https\nhost      shop.example.com\nport      443\npath      /books/search\nquery     q=linux&page=2\nfragment  reviews" },
      { k: "ul", items: [
        T(`<strong>Scheme:</strong> البروتوكول، هنا <code>https</code> أي HTTP مع تشفير.`, `<strong>Scheme:</strong> the protocol, here <code>https</code>, meaning HTTP with encryption.`),
        T(`<strong>Host:</strong> اسم الخادم <code>shop.example.com</code>، ويحوّله ${tm("DNS")} إلى عنوان IP.`, `<strong>Host:</strong> the server name <code>shop.example.com</code>, which ${tm("DNS")} translates into an IP address.`),
        T(`<strong>Port:</strong> رقم البوابة على الخادم؛ 443 هو الافتراضي لـ HTTPS فلا يُكتب عادة.`, `<strong>Port:</strong> the door number on the server; 443 is the default for HTTPS, so it is usually omitted.`),
        T(`<strong>Path:</strong> أي مورد نريد على ذلك الخادم.`, `<strong>Path:</strong> which resource we want on that server.`),
        T(`<strong>Query:</strong> معاملات تُرسل للخادم بعد علامة <code>?</code> وتُفصل بـ <code>&amp;</code>.`, `<strong>Query:</strong> parameters sent to the server after the <code>?</code> sign, separated by <code>&amp;</code>.`),
        T(`<strong>Fragment:</strong> ما بعد <code>#</code> يبقى في المتصفح ولا يُرسل للخادم؛ يحدد موضعًا داخل الصفحة.`, `<strong>Fragment:</strong> what follows <code>#</code> stays in the browser and is not sent to the server; it points to a spot inside the page.`),
      ] },

      { k: "h", t: T(`رحلة الطلب والاستجابة`, `The request and response journey`) },
      { k: "p", t: T(`عندما تكتب العنوان وتضغط Enter تبدأ سلسلة من الخطوات، وكلها تنتهي عادة في أجزاء من الثانية:`, `When you type the address and press Enter a chain of steps begins, and all of it usually finishes in a fraction of a second:`) },
      { k: "flow", title: T(`من الضغط على Enter إلى الصفحة`, `From pressing Enter to the page`), steps: [
        { label: T(`DNS`, `DNS`), sub: T(`يسأل جهازك عن عنوان IP للاسم shop.example.com، ويستعمل ذاكرة مؤقتة إن وُجدت إجابة سابقة`, `your device asks for the IP address behind shop.example.com, using a cache if it already knows`) },
        { label: T(`TCP`, `TCP`), sub: T(`يُنشأ اتصال موثوق مع الخادم بتبادل رسائل قصيرة تسمى المصافحة`, `a reliable connection to the server is set up by exchanging short messages called a handshake`) },
        { label: T(`TLS`, `TLS`), sub: T(`يتحقق المتصفح من شهادة الموقع ويتفق الطرفان على مفاتيح تشفير`, `the browser checks the site certificate and both sides agree on encryption keys`) },
        { label: T(`HTTP request`, `HTTP request`), sub: T(`يرسل المتصفح طلب GET للمسار المطلوب`, `the browser sends a GET request for the wanted path`) },
        { label: T(`HTTP response`, `HTTP response`), sub: T(`يعيد الخادم رمز حالة ومحتوى الصفحة، ثم يبدأ المتصفح بعرضها`, `the server returns a status code and the page content, and the browser starts rendering it`) },
      ] },
      { k: "code", lang: "http", code: "GET /books/search?q=linux&page=2 HTTP/1.1\nHost: shop.example.com\nAccept: text/html\n\nHTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\nContent-Length: 18342" },
      { k: "p", t: T(`السطر الأول طلب، والسطور بعد الفراغ رأس استجابة. ${tm("HTTP")} بروتوكول نصي بسيط من نوع طلب واستجابة، ولا يتذكر الخادم بذاته من أنت بين طلبين، وهنا تأتي الكوكيز كما سنرى.`, `The first lines are a request, and the lines after the blank one are a response header. ${tm("HTTP")} is a simple text protocol of request and response, and by itself the server does not remember who you are between two requests; that is where cookies come in, as we will see.`) },

      { k: "h", t: T(`أساليب HTTP ورموز الحالة`, `HTTP methods and status codes`) },
      { k: "p", t: T(`يحدد الطلب <em>ماذا نريد</em> بما يسمى ${tm("Method")}، وتُجيب الاستجابة برقم ${tm("Status Code")} من ثلاث خانات تبيّن النتيجة. الخانة الأولى تحدد الفئة.`, `A request states <em>what we want</em> with a ${tm("Method")}, and the response answers with a three-digit ${tm("Status Code")} showing the outcome. The first digit gives the class.`) },
      { k: "table", head: [T(`العنصر`, `Item`), T(`المعنى`, `Meaning`), T(`مثال`, `Example`)], rows: [
        [T(`GET`, `GET`), T(`اطلب مواردًا دون تغيير شيء`, `fetch a resource without changing anything`), T(`فتح صفحة`, `opening a page`)],
        [T(`POST`, `POST`), T(`أرسل بيانات لمعالجتها`, `send data to be processed`), T(`إرسال نموذج تسجيل الدخول`, `submitting a login form`)],
        [T(`200`, `200`), T(`نجح الطلب`, `success`), T(`تم تحميل الصفحة`, `the page loaded`)],
        [T(`301`, `301`), T(`انتقل المورد نهائيًا إلى عنوان آخر`, `moved permanently to another address`), T(`من http إلى https`, `from http to https`)],
        [T(`404`, `404`), T(`الخادم يعمل لكنه لا يجد المورد`, `the server works but cannot find the resource`), T(`رابط مكسور`, `a broken link`)],
        [T(`500`, `500`), T(`خطأ داخل الخادم نفسه`, `an error inside the server itself`), T(`خلل في شيفرة الموقع`, `a bug in the site code`)],
      ] },
      { k: "note", kind: "tip", t: T(`قاعدة سريعة: 2xx نجاح، 3xx إعادة توجيه، 4xx خطأ من جهة الطلب، 5xx خطأ من جهة الخادم.`, `Quick rule: 2xx means success, 3xx redirection, 4xx an error on the request side, 5xx an error on the server side.`) },

      { k: "h", t: T(`ماذا يفعل المتصفح بالصفحة؟`, `What the browser does with the page`) },
      { k: "p", t: T(`الاستجابة نص ${tm("HTML")} يصف بنية الصفحة: عناوين وفقرات وصور وروابط. يقرأه المتصفح ويبني منه شجرة تسمى ${tm("DOM")}. وأثناء القراءة يجد إشارات إلى ملفات أخرى فيطلبها: ${tm("CSS")} الذي يحدد الألوان والتخطيط، و${tm("JavaScript")} الذي يضيف السلوك والتفاعل، والصور والخطوط. ثم يرسم الصفحة على الشاشة. لهذا تحتاج صفحة واحدة غالبًا عشرات الطلبات.`, `The response is ${tm("HTML")} text describing the page structure: headings, paragraphs, images and links. The browser reads it and builds a tree called the ${tm("DOM")}. While reading it finds references to other files and requests them: ${tm("CSS")}, which sets colours and layout; ${tm("JavaScript")}, which adds behaviour and interactivity; and images and fonts. Then it paints the page on screen. This is why a single page often needs dozens of requests.`) },
      { k: "p", t: T(`ولتسريع الأمور يحتفظ المتصفح بنسخ من الملفات في ${tm("Cache")} على جهازك، فلا يعيد تحميل الشعار نفسه في كل صفحة. أما ${tm("Cookies")} فهي قطع صغيرة من النص يخزّنها المتصفح بطلب من الموقع ويعيد إرسالها معه في كل طلب لاحق، وبها يتذكر الموقع أنك سجلت الدخول أو أنك اخترت لغة معينة. الكوكي ليست برنامجًا ولا تنفّذ شيئًا؛ هي بيانات فقط.`, `To save time the browser keeps copies of files in a ${tm("Cache")} on your device, so it does not re-download the same logo on every page. ${tm("Cookies")} are small pieces of text the browser stores at a site's request and sends back with every later request to it; that is how a site remembers you are signed in or that you picked a language. A cookie is not a program and executes nothing; it is only data.`) },

      { k: "h", t: T(`تطبيق عملي: تبويب Network في أدوات المطوّر`, `Hands-on: the Network tab in developer tools`) },
      { k: "p", t: T(`افتح أي موقع ثم اضغط <code>F12</code> (أو <code>Ctrl+Shift+I</code>، وعلى macOS الاختصار <code>Cmd+Option+I</code>) واختر تبويب Network، ثم أعد تحميل الصفحة. سترى جدولًا بكل طلب أجراه المتصفح.`, `Open any site, press <code>F12</code> (or <code>Ctrl+Shift+I</code>, and on macOS <code>Cmd+Option+I</code>) and choose the Network tab, then reload the page. You will see a table of every request the browser made.`) },
      { k: "out", code: "Name         Status  Type        Size     Time\nsearch       200     document    18.3 kB  120 ms\nstyle.css    200     stylesheet  9.1 kB   45 ms\napp.js       200     script      64 kB    80 ms\nlogo.svg     304     svg+xml     (cache)  8 ms\nold-page     301     document    0.4 kB   60 ms\nmissing.png  404     png         0.2 kB   50 ms" },
      { k: "ul", items: [
        T(`عمود <strong>Status</strong> يعرض رمز الحالة؛ ابحث عن الأحمر منها (4xx و5xx).`, `The <strong>Status</strong> column shows the status code; look for the red ones (4xx and 5xx).`),
        T(`عمود <strong>Time</strong> يبيّن الطلبات البطيئة التي تؤخر الصفحة.`, `The <strong>Time</strong> column reveals slow requests that delay the page.`),
        T(`اضغط على أي طلب لترى رأس الطلب ورأس الاستجابة والكوكيز المرسلة.`, `Click any request to see its request headers, response headers and the cookies sent.`),
      ] },
      { k: "note", kind: "info", t: T(`الرمز 304 يعني أن النسخة المخزنة عندك ما زالت صالحة، فلم يُرسل المحتوى مرة أخرى.`, `Code 304 means your cached copy is still valid, so the content was not sent again.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>تشخيص الأعطال:</strong> رؤية 500 في تبويب Network تخبر المطوّر أن الخلل في الخادم لا في المتصفح.`, `<strong>Debugging:</strong> seeing 500 in the Network tab tells a developer the fault is on the server, not in the browser.`),
        T(`<strong>تحسين الأداء:</strong> فرق المواقع تقلّل حجم الصور وعدد الطلبات لتسريع التحميل.`, `<strong>Performance tuning:</strong> site teams shrink images and cut request counts to load faster.`),
        T(`<strong>تحسين الظهور في البحث:</strong> إعادة التوجيه الدائمة 301 تحفظ قيمة الرابط القديم عند نقل موقع.`, `<strong>Search visibility:</strong> a permanent 301 redirect preserves the value of an old link when a site moves.`),
        T(`<strong>الخصوصية:</strong> فهم الكوكيز يساعدك على إدارة ما يتتبعه كل موقع عنك.`, `<strong>Privacy:</strong> understanding cookies helps you manage what each site tracks about you.`),
      ] },

      { k: "mistakes", items: [
        T(`«الإنترنت والويب شيء واحد»: الويب خدمة واحدة فوق الإنترنت؛ البريد والمكالمات المرئية وتحديثات النظام تستعمل الإنترنت بلا متصفح.`, `“The internet and the web are the same”: the web is one service on top of the internet; email, video calls and system updates use the internet without a browser.`),
        T(`«المتصفح هو محرك البحث»: المتصفح برنامج على جهازك، أما محرك البحث فموقع يعمل على خوادم بعيدة تفتحه من خلاله.`, `“The browser is the search engine”: the browser is a program on your device, while a search engine is a site on remote servers that you open through it.`),
        T(`«قفل HTTPS يعني أن الموقع آمن وصادق»: القفل يعني أن الاتصال مشفّر مع ذلك الخادم فقط، أما نوايا الموقع فمسألة أخرى.`, `“The HTTPS padlock means the site is safe and honest”: the padlock only means the connection to that server is encrypted; the site's intentions are another matter.`),
        T(`«الكوكيز فيروسات»: الكوكي نص يخزّن معلومة صغيرة ولا تُنفَّذ، لكن بعضها يُستعمل للتتبع فمن حقك إدارتها.`, `“Cookies are viruses”: a cookie is text holding a small piece of information and never runs, though some are used for tracking, so managing them is your right.`),
      ] },

      { k: "ex", q: T(`<strong>تحليل:</strong> فكّك العنوان <code>https://docs.example.org/guide/install?lang=ar#step-3</code> إلى أجزائه، وحدد أيها لا يصل إلى الخادم.`, `<strong>Analysis:</strong> split <code>https://docs.example.org/guide/install?lang=ar#step-3</code> into its parts and say which part never reaches the server.`), a: T(`<p>Scheme هو <code>https</code>، وHost هو <code>docs.example.org</code>، وPath هو <code>/guide/install</code>، وQuery هو <code>lang=ar</code>، وFragment هو <code>step-3</code>. الجزء الذي لا يُرسل للخادم هو الـ Fragment، فالمتصفح يستعمله محليًا للتمرير إلى موضع معين في الصفحة.</p>`, `<p>The scheme is <code>https</code>, the host is <code>docs.example.org</code>, the path is <code>/guide/install</code>, the query is <code>lang=ar</code> and the fragment is <code>step-3</code>. The part that is not sent to the server is the fragment; the browser uses it locally to scroll to a position in the page.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> أدخلت عنوان موقع عرفته من قبل فظهرت الصفحة أسرع من المرة الأولى. اذكر خطوتين في الرحلة وفّرتهما الذاكرة المؤقتة.`, `<strong>Reasoning:</strong> you revisit a known site and the page appears faster than the first time. Name two steps in the journey that caching saved.`), a: T(`<p>أولًا خطوة DNS: يحتفظ نظامك أو المتصفح بعنوان IP لفترة فلا يسأل من جديد. ثانيًا تحميل الملفات الثابتة كملف CSS والصور: إن كانت النسخة المخزنة صالحة فلا تُنزَّل ثانية، وقد يكتفي الخادم بإجابة 304. وفي بعض الحالات تُعاد استعمال اتصال قائم فتُوفَّر المصافحة أيضًا.</p>`, `<p>First the DNS step: your system or browser keeps the IP address for a while, so it does not ask again. Second, downloading static files such as CSS and images: if the stored copy is still valid it is not downloaded again, and the server may just answer 304. In some cases an existing connection is reused, which also skips the handshake.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> افتح تبويب Network على موقع تزوره كثيرًا وأعد التحميل. سجّل عدد الطلبات، وأكبر ملف، وأي رمز حالة غير 200.`, `<strong>Hands-on:</strong> open the Network tab on a site you visit often and reload. Record the number of requests, the largest file, and any status code other than 200.`), a: T(`<p>سترى عادة بين عشرات ومئات الطلبات لصفحة واحدة. أكبر ملف غالبًا صورة أو حزمة JavaScript أو فيديو؛ رتّب العمود Size تنازليًا لتجده. ستظهر رموز مثل 304 للملفات المخزنة، و301 أو 302 لإعادة التوجيه، وقد تجد 404 لملف مفقود لا يلاحظه الزائر. إن أضفت الخيار Disable cache وأعدت التحميل فسترى الأحجام الكاملة وزمنًا أطول، وهذا يريك أثر الذاكرة المؤقتة عمليًا.</p>`, `<p>You will typically see dozens to hundreds of requests for one page. The largest file is usually an image, a JavaScript bundle or a video; sort the Size column in descending order to find it. Codes such as 304 appear for cached files, 301 or 302 for redirects, and you may spot a 404 for a missing file the visitor never notices. If you tick Disable cache and reload, you will see full sizes and longer times, which shows the effect of caching in practice.</p>`) },

      { k: "summary", items: [
        T(`الإنترنت شبكة، والويب خدمة فوقها، والمتصفح برنامج يعرض الويب.`, `The internet is a network, the web is a service over it, and the browser is the program that shows it.`),
        T(`يتكوّن الرابط من scheme وhost وpath وquery وfragment، ويمر الطلب بـ DNS ثم TCP ثم TLS ثم HTTP.`, `A URL has scheme, host, path, query and fragment, and a request passes through DNS, TCP, TLS and then HTTP.`),
        T(`رموز 2xx و3xx و4xx و5xx تلخص نتيجة كل طلب، ويعرضها تبويب Network.`, `The 2xx, 3xx, 4xx and 5xx codes summarise each request, and the Network tab displays them.`),
        T(`الذاكرة المؤقتة والكوكيز تجعلان تجربة الويب أسرع وأكثر استمرارية.`, `Cache and cookies make the web faster and keep sessions continuous.`),
      ], next: T(`الأمن السيبراني: بعد أن عرفت كيف تنتقل البيانات، نتعلم كيف نحميها.`, `Cybersecurity: now that you know how data travels, we learn how to protect it.`) },
    ],
  },

  // ───────────────────────── com-17 ─────────────────────────
  {
    id: "com-17",
    body: [
      { k: "objectives", items: [
        T(`تشرح ثلاثية ${tm("CIA")}: السرية والسلامة والإتاحة، وتصنّف بها أي حادثة أمنية.`, `Explain the ${tm("CIA")} triad of confidentiality, integrity and availability, and classify any incident with it.`),
        T(`تتعرف على التهديدات الشائعة وتربط كل منها بدفاع مناسب.`, `Recognise common threats and match each with a suitable defence.`),
        T(`تميّز بين ${tm("Hashing")} و${tm("Encryption")} وتنفّذ تدقيقًا ذاتيًا لحساباتك.`, `Tell ${tm("Hashing")} from ${tm("Encryption")} and carry out a self-audit of your own accounts.`),
      ] },
      { k: "prereq", items: [T(`دروس «الإنترنت والشبكات» و«المتصفح والويب».`, `The lessons “Internet and networks” and “Browser and web”.`)] },

      { k: "h", t: T(`مقدمة: حماية ما يهمك`, `Introduction: protecting what matters`) },
      { k: "p", t: T(`${tm("Cybersecurity")} هو مجموعة الممارسات التي تحمي الأجهزة والحسابات والبيانات من الوصول غير المصرّح به أو التلف أو التعطيل. هذا الدرس دفاعي بالكامل: هدفه أن تعرف ما الذي تحميه، ومن أي خطر، وبأي وسيلة. وأكثر الاختراقات في الواقع لا تبدأ بعبقري يكسر التشفير، بل بكلمة مرور ضعيفة أو رسالة خادعة أو تحديث مؤجَّل.`, `${tm("Cybersecurity")} is the set of practices that protect devices, accounts and data from unauthorised access, damage or disruption. This lesson is entirely defensive: its aim is to know what you are protecting, from which danger, and with which measure. Most real breaches do not begin with a genius breaking encryption but with a weak password, a deceptive message or a postponed update.`) },

      { k: "h", t: T(`ثلاثية CIA: ثلاثة أهداف للأمن`, `The CIA triad: three goals of security`) },
      { k: "p", t: T(`كل حادثة أمنية تقريبًا تمسّ هدفًا من ثلاثة، ولذا تُستعمل هذه الثلاثية لتحليلها:`, `Almost every security incident touches one of three goals, so this triad is used to analyse them:`) },
      { k: "table", head: [T(`الهدف`, `Goal`), T(`معناه`, `Meaning`), T(`مثال على خرقه`, `Example of a breach`), T(`وسيلة حماية`, `Protection`)], rows: [
        [T(`Confidentiality السرية`, `Confidentiality`), T(`لا يطّلع على البيانات إلا المصرّح لهم`, `only authorised people can read the data`), T(`تسرّب قاعدة بيانات عملاء`, `a customer database leaks`), T(`التشفير وصلاحيات الوصول`, `encryption and access control`)],
        [T(`Integrity السلامة`, `Integrity`), T(`البيانات لم تُعدَّل خفية`, `data has not been changed unnoticed`), T(`تغيير رقم في تحويل مالي`, `an amount altered in a transfer`), T(`التجزئة والتوقيع الرقمي`, `hashes and digital signatures`)],
        [T(`Availability الإتاحة`, `Availability`), T(`الخدمة متاحة عند الحاجة`, `the service is usable when needed`), T(`موقع يتعطل بسبب فدية`, `a site down because of ransomware`), T(`النسخ الاحتياطي والتكرار`, `backups and redundancy`)],
      ] },

      { k: "h", t: T(`التهديدات الشائعة`, `Common threats`) },
      { k: "ul", items: [
        T(`<strong>${tm("Phishing")}:</strong> رسالة تنتحل جهة موثوقة لتدفعك إلى إدخال كلمة مرورك في صفحة مزيفة أو فتح مرفق.`, `<strong>${tm("Phishing")}:</strong> a message impersonating a trusted party to push you to type your password into a fake page or open an attachment.`),
        T(`<strong>${tm("Malware")}:</strong> اسم عام للبرمجيات الخبيثة، كالفيروسات وبرامج التجسس، وتدخل غالبًا عبر برنامج مقرصن أو مرفق.`, `<strong>${tm("Malware")}:</strong> a general name for malicious software, such as viruses and spyware, usually arriving through a pirated program or an attachment.`),
        T(`<strong>${tm("Ransomware")}:</strong> نوع منه يشفّر ملفاتك ثم يطلب فدية لفك التشفير؛ يستهدف الإتاحة.`, `<strong>${tm("Ransomware")}:</strong> a kind that encrypts your files and demands payment to unlock them; it attacks availability.`),
        T(`<strong>${tm("Social Engineering")}:</strong> خداع الإنسان بدل كسر التقنية، كمكالمة تدّعي أنها من الدعم الفني وتستعجلك.`, `<strong>${tm("Social Engineering")}:</strong> tricking the person instead of breaking the technology, such as a call claiming to be tech support that rushes you.`),
        T(`<strong>كلمات المرور الضعيفة أو المكررة:</strong> إن تسرّبت كلمتك من موقع واحد جُرّبت على مواقع أخرى تلقائيًا.`, `<strong>Weak or reused passwords:</strong> if your password leaks from one site, it is tried automatically on other sites.`),
      ] },
      { k: "note", kind: "warn", t: T(`القاسم المشترك بين أغلب الهجمات هو الاستعجال والخوف والإغراء. أي رسالة تطلب منك التصرف فورًا تستحق التوقف والتحقق عبر قناة أخرى.`, `The common thread in most attacks is urgency, fear or temptation. Any message that demands immediate action deserves a pause and a check through another channel.`) },

      { k: "h", t: T(`خطوط الدفاع`, `Lines of defence`) },
      { k: "table", head: [T(`التهديد`, `Threat`), T(`الدفاع الأساسي`, `Main defence`), T(`لماذا ينفع`, `Why it works`)], rows: [
        [T(`Phishing`, `Phishing`), T(`فحص المرسل والرابط، وMFA`, `check sender and link, plus MFA`), T(`حتى لو سُرقت كلمتك فالمهاجم يحتاج عاملًا ثانيًا`, `even a stolen password is not enough without a second factor`)],
        [T(`Malware`, `Malware`), T(`التحديثات وتثبيت البرامج من مصادر رسمية`, `updates and installing from official sources`), T(`التحديثات تسد ثغرات معروفة`, `updates close known vulnerabilities`)],
        [T(`Ransomware`, `Ransomware`), T(`نسخ احتياطي 3-2-1`, `3-2-1 backups`), T(`تستعيد ملفاتك دون دفع`, `you restore your files without paying`)],
        [T(`Social Engineering`, `Social engineering`), T(`التحقق عبر قناة ثانية وعدم الاستعجال`, `verify through a second channel and do not rush`), T(`يقتل عنصر الضغط الذي تعتمد عليه`, `it removes the pressure the trick relies on`)],
        [T(`كلمات مرور ضعيفة`, `Weak passwords`), T(`مدير كلمات مرور وكلمة فريدة لكل حساب`, `a password manager and a unique password per account`), T(`تسرّب موقع لا يفتح غيره`, `one leak does not open other accounts`)],
      ] },
      { k: "h4", t: T(`كلمات المرور`, `Passwords`) },
      { k: "p", t: T(`الطول أهم من التعقيد الشكلي: عبارة من أربع كلمات عشوائية أو أكثر أصعب على التخمين من كلمة قصيرة مليئة بالرموز. والأهم أن تكون <strong>فريدة</strong> لكل حساب، ولا يستطيع أحد حفظ عشرات الكلمات الفريدة، فيتولى ${tm("Password Manager")} توليدها وحفظها، وتحفظ أنت كلمة رئيسية واحدة قوية.`, `Length matters more than cosmetic complexity: a passphrase of four or more random words is harder to guess than a short word full of symbols. More important still, it must be <strong>unique</strong> per account. Nobody can memorise dozens of unique passwords, so a ${tm("Password Manager")} generates and stores them, and you remember one strong master password.`) },
      { k: "h4", t: T(`المصادقة متعددة العوامل`, `Multi-factor authentication`) },
      { k: "p", t: T(`${tm("MFA")} تضيف إلى «ما تعرفه» (كلمة المرور) عاملًا من «ما تملكه» كتطبيق مصادقة أو مفتاح أمان، أو «ما أنت عليه» كبصمة الإصبع. تطبيق المصادقة أو المفتاح أقوى عمومًا من الرمز المرسل برسالة نصية، لأن الرسائل أسهل اعتراضًا أو تحويلًا.`, `${tm("MFA")} adds to “something you know” (the password) a factor of “something you have”, such as an authenticator app or security key, or “something you are”, such as a fingerprint. An authenticator app or key is generally stronger than a code sent by text message, since texts are easier to intercept or redirect.`) },
      { k: "h4", t: T(`النسخ الاحتياطي 3-2-1`, `The 3-2-1 backup rule`) },
      { k: "p", t: T(`احتفظ بـ <strong>3</strong> نسخ من بياناتك المهمة، على <strong>2</strong> نوعين مختلفين من الوسائط، مع نسخة <strong>1</strong> خارج مكانك الفعلي (سحابة أو قرص في مكان آخر). وجرّب الاستعادة فعلًا؛ نسخة لم تُختبر قد لا تعمل وقت الحاجة.`, `Keep <strong>3</strong> copies of important data, on <strong>2</strong> different kinds of media, with <strong>1</strong> copy off-site (a cloud service or a disk elsewhere). And actually test a restore; a backup that was never tested may fail when needed.`) },

      { k: "h", t: T(`التجزئة والتشفير: فكرتان مختلفتان`, `Hashing and encryption: two different ideas`) },
      { k: "p", t: T(`${tm("Encryption")} تحويل البيانات إلى شكل غير مقروء بمفتاح، ويمكن عكسه بالمفتاح الصحيح؛ يُستعمل عند نقل البيانات كما في HTTPS وعند تخزينها. أما ${tm("Hashing")} فتحويل في اتجاه واحد: يعطي أي مدخل بصمة بطول ثابت ولا يمكن استرجاع المدخل منها. الموقع المحترم لا يخزّن كلمتك نفسها بل بصمتها مع قيمة عشوائية تسمى ${tm("Salt")}، فإذا تسرّبت قاعدة البيانات لم تظهر الكلمات مباشرة.`, `${tm("Encryption")} turns data into an unreadable form with a key and can be reversed with the right key; it is used when data travels, as in HTTPS, and when it is stored. ${tm("Hashing")} is a one-way conversion: any input gives a fixed-length fingerprint from which the input cannot be recovered. A responsible site does not store your password itself but its hash together with a random value called a ${tm("Salt")}, so a leaked database does not directly reveal the passwords.`) },
      { k: "code", lang: "bash", code: "echo -n \"hello\" | sha256sum\necho -n \"hello!\" | sha256sum" },
      { k: "out", code: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824  -\nce06092fb948d9ffac7d1a376e404b26b7575bcc11ee05a4615fef4fec3a308b  -" },
      { k: "p", t: T(`المدخلان يختلفان بعلامة تعجب واحدة لكن البصمتين تختلفان كليًا، وهذا ما يجعل التجزئة ممتازة لكشف أي تعديل في ملف (السلامة). شغّل الأمر على جهازك وتأكد من القيمتين بنفسك.`, `The inputs differ by one exclamation mark yet the two fingerprints are completely different, which makes hashing excellent for detecting any change to a file (integrity). Run the command on your own machine and confirm both values yourself.`) },

      { k: "h", t: T(`أقل صلاحية ممكنة`, `Least privilege`) },
      { k: "p", t: T(`مبدأ ${tm("Least Privilege")} يعني أن يملك كل مستخدم أو برنامج الصلاحيات التي يحتاجها فقط. استعمل حسابًا عاديًا للعمل اليومي ولا تعمل بصلاحيات المدير إلا عند الحاجة، ولا تمنح تطبيقًا الوصول إلى الكاميرا أو الموقع إن لم تكن وظيفته تتطلب ذلك. فإذا اختُرق حساب محدود الصلاحيات كان الضرر محدودًا أيضًا.`, `The ${tm("Least Privilege")} principle means each user or program holds only the permissions it needs. Use a standard account for daily work and run as administrator only when required, and do not give an app camera or location access if its job does not need it. If a limited account is compromised, the damage is limited too.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>البنوك:</strong> تطلب رمزًا ثانيًا عند عملية حساسة، وهذا MFA عمليًا.`, `<strong>Banks:</strong> ask for a second code on a sensitive operation, which is MFA in practice.`),
        T(`<strong>الشركات:</strong> تعمّم تحديثات الأنظمة وتدرّب الموظفين على كشف رسائل التصيّد.`, `<strong>Companies:</strong> roll out system updates and train staff to spot phishing messages.`),
        T(`<strong>تنزيل البرامج:</strong> مقارنة بصمة SHA-256 التي ينشرها المطوّر ببصمة الملف الذي نزّلته تؤكد أنه لم يتلف أو يُعدَّل.`, `<strong>Downloading software:</strong> comparing the SHA-256 hash a developer publishes with the hash of your downloaded file confirms it was not corrupted or altered.`),
        T(`<strong>المنازل:</strong> تغيير كلمة مرور الراوتر الافتراضية وتحديث برنامجه يسدان أكثر المداخل شيوعًا.`, `<strong>Homes:</strong> changing the router's default password and updating its firmware closes some of the most common entry points.`),
      ] },

      { k: "mistakes", items: [
        T(`«لا أحد يهتم باختراق حسابي العادي»: الهجمات تُنفَّذ آليًا على ملايين الحسابات، والحساب العادي يُستعمل لسرقة هوية أو لإرسال رسائل لأصدقائك.`, `“Nobody cares about hacking my ordinary account”: attacks run automatically against millions of accounts, and an ordinary account is used for identity theft or to message your friends.`),
        T(`«التشفير والتجزئة شيء واحد»: التشفير قابل للعكس بمفتاح، والتجزئة اتجاه واحد لا يُسترجع منه المدخل.`, `“Encryption and hashing are the same”: encryption is reversible with a key, while hashing is one-way and the input cannot be recovered.`),
        T(`«مضاد الفيروسات يكفي»: هو طبقة واحدة، ولا ينقذك من كلمة مرور مسروقة أو من خداعك أنت بنفسك.`, `“Antivirus is enough”: it is one layer, and it will not save you from a stolen password or from being tricked yourself.`),
        T(`«الوضع الخاص في المتصفح يخفيني»: يمنع حفظ السجل محليًا فقط، أما الموقع ومزوّد الإنترنت فيرون نشاطك كالمعتاد.`, `“Private browsing makes me invisible”: it only stops history being saved locally; the site and your internet provider still see your activity as usual.`),
      ] },

      { k: "ex", q: T(`<strong>تصنيف:</strong> صنّف كل حادثة بحسب CIA: (أ) موظف يرسل ملفًا سريًا إلى بريد خاطئ، (ب) برنامج فدية يشفّر خوادم مستشفى، (ج) شخص يعدّل درجاته في قاعدة بيانات مدرسة.`, `<strong>Classification:</strong> classify each incident by CIA: (a) an employee emails a confidential file to the wrong address, (b) ransomware encrypts a hospital's servers, (c) someone edits grades in a school database.`), a: T(`<p>(أ) خرق للسرية لأن من لا يحق له اطّلع على الملف. (ب) خرق للإتاحة لأن الأنظمة لا تعمل، وقد تمسّ السرية أيضًا إن سُرقت نسخ قبل التشفير. (ج) خرق للسلامة لأن البيانات عُدّلت دون تصريح. ملاحظة: قد تمسّ الحادثة الواحدة أكثر من هدف، والمهم أن تحدد الأهم أثرًا.</p>`, `<p>(a) A confidentiality breach, since someone not entitled saw the file. (b) An availability breach because systems stop working; it may also touch confidentiality if copies were stolen before encryption. (c) An integrity breach because data was altered without authorisation. Note that one incident can touch more than one goal; the point is to identify the most significant impact.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> لماذا لا تكفي كلمة مرور قوية جدًا إن استعملتها في عشرة مواقع؟`, `<strong>Reasoning:</strong> why is a very strong password not enough if you use it on ten sites?`), a: T(`<p>قوة الكلمة تحمي من التخمين، لكنها لا تحمي من تسرّب الموقع نفسه. إن اخترق مهاجم أضعف تلك المواقع أمنًا حصل على كلمتك كما هي (أو على بصمة يمكن كسرها إن كانت ضعيفة التجزئة) فيجربها آليًا على بقية الحسابات، وهذا يسمى حشو بيانات الاعتماد. التفرّد يحصر الضرر في موقع واحد، ولهذا نوصي بمدير كلمات مرور مع MFA.</p>`, `<p>Strength protects against guessing, but not against the site itself being breached. If an attacker compromises the least secure of those sites, they obtain your password as it is (or a hash that may be crackable if poorly hashed) and automatically try it on your other accounts, which is called credential stuffing. Uniqueness confines the damage to one site, which is why a password manager with MFA is recommended.</p>`) },
      { k: "ex", q: T(`<strong>تدقيق ذاتي (على جهازك):</strong> نفّذ خمس فحوص على حياتك الرقمية وسجّل نتيجة كل منها.`, `<strong>Self-audit (on your own device):</strong> run five checks on your digital life and record the result of each.`), a: T(`<p>1) عدّ حساباتك المهمة (بريد، بنك، شبكات اجتماعية) وتأكد أن لكل منها كلمة فريدة، وأن بريدك الأساسي محمي بأقوى كلمة. 2) فعّل MFA على البريد والبنك أولًا، وفضّل تطبيق المصادقة. 3) افتح إعدادات النظام وتحقق من تفعيل التحديث التلقائي للنظام والمتصفح. 4) اسأل: ما أهم ملفاتي؟ وهل لها ثلاث نسخ بحسب 3-2-1؟ ثم جرّب استعادة ملف واحد. 5) راجع أذونات التطبيقات في هاتفك (الكاميرا والموقع والميكروفون) واسحب ما لا يحتاجه التطبيق. دوّن الثغرات بحسب الأهمية وأصلح واحدة كل يوم.</p>`, `<p>1) List your important accounts (email, bank, social networks) and confirm each has a unique password, with your main email protected by the strongest. 2) Enable MFA on email and bank first, preferring an authenticator app. 3) Open system settings and verify automatic updates are on for the system and the browser. 4) Ask: what are my most important files, and do they have three copies by 3-2-1? Then try restoring one file. 5) Review app permissions on your phone (camera, location, microphone) and revoke what an app does not need. Note the gaps by importance and fix one a day.</p>`) },

      { k: "summary", items: [
        T(`الأمن يهدف إلى السرية والسلامة والإتاحة، وكل حادثة تمسّ واحدًا منها على الأقل.`, `Security aims at confidentiality, integrity and availability, and every incident touches at least one.`),
        T(`أغلب التهديدات تستهدف الإنسان، فالحذر والتحقق دفاع أساسي.`, `Most threats target the person, so caution and verification are core defences.`),
        T(`كلمات مرور فريدة وطويلة وMFA وتحديثات ونسخ 3-2-1 تغطي معظم المخاطر اليومية.`, `Long unique passwords, MFA, updates and 3-2-1 backups cover most everyday risks.`),
        T(`التشفير يُعكس بمفتاح، والتجزئة اتجاه واحد، ومبدأ أقل صلاحية يحدّ من الضرر.`, `Encryption reverses with a key, hashing is one-way, and least privilege limits damage.`),
      ], next: T(`تاريخ الكمبيوتر: نعود إلى الوراء لنرى كيف وصلنا إلى هذه الأجهزة.`, `History of Computing: we look back to see how we reached these devices.`) },
    ],
  },

  // ───────────────────────── com-18 ─────────────────────────
  {
    id: "com-18",
    body: [
      { k: "objectives", items: [
        T(`ترتّب أهم محطات تاريخ الحوسبة بتواريخها التقريبية الصحيحة.`, `Order the main milestones of computing history with their correct approximate dates.`),
        T(`تشرح الأجيال الأربعة الأولى وما غيّره كل قفزة تقنية.`, `Explain the first four generations and what each technological leap changed.`),
        T(`تصف معمارية ${tm("Von Neumann")} وقانون مور بدقة دون مبالغة.`, `Describe the ${tm("Von Neumann")} architecture and Moore's law carefully and without exaggeration.`),
      ] },
      { k: "prereq", items: [T(`دروس «كيف يعمل الكمبيوتر؟» و«المعالج» و«ثنائي وبيانات».`, `The lessons “How a computer works”, “The CPU” and “Binary and data”.`)] },

      { k: "h", t: T(`مقدمة: لماذا نقرأ التاريخ؟`, `Introduction: why read the history?`) },
      { k: "p", t: T(`تاريخ الحاسوب ليس قائمة تواريخ للحفظ، بل قصة مشكلات متتالية: كيف نحسب أسرع؟ كيف نصغّر الآلة؟ كيف نجعلها أرخص ليقتنيها الجميع؟ وكل جواب فتح بابًا جديدًا. حين تعرف السبب وراء كل خطوة تفهم لماذا يعمل جهازك بهذا الشكل، وتدرك أن ما نراه اليوم نتيجة تراكم أفكار عمرها قرون.`, `The history of computing is not a list of dates to memorise but a story of successive problems: how do we calculate faster, make the machine smaller, make it cheap enough for everyone? Each answer opened a new door. Knowing the reason behind each step helps you see why your device works the way it does, and that today's machines are the accumulation of ideas centuries old.`) },

      { k: "h", t: T(`خط زمني من الآلات الميكانيكية إلى الإنترنت`, `A timeline from mechanical machines to the internet`) },
      { k: "table", head: [T(`السنة التقريبية`, `Approx. year`), T(`الحدث`, `Event`), T(`أهميته`, `Why it matters`)], rows: [
        [T(`1642`, `1642`), T(`آلة باسكال الحاسبة ${tm("Pascaline")}`, `Pascal's mechanical calculator, the ${tm("Pascaline")}`), T(`أول آلات الجمع والطرح الميكانيكية العملية`, `one of the first practical mechanical adding machines`)],
        [T(`1804`, `1804`), T(`نول جاكار بالبطاقات المثقوبة`, `Jacquard loom with punched cards`), T(`برمجة آلة بوساطة بطاقات؛ أثّرت لاحقًا في الحواسيب`, `programming a machine with cards; it later influenced computers`)],
        [T(`1837`, `1837`), T(`تصميم تشارلز باباج للآلة التحليلية ${tm("Analytical Engine")}`, `Charles Babbage designs the ${tm("Analytical Engine")}`), T(`تصور آلة قابلة للبرمجة بذاكرة ووحدة حساب، لكنها لم تُبنَ في حياته`, `a programmable design with memory and an arithmetic unit, never completed in his lifetime`)],
        [T(`1843`, `1843`), T(`ملاحظات آدا لوفلايس`, `Ada Lovelace's notes`), T(`وصف خوارزمية لتلك الآلة، وكثيرًا ما تُعدّ أول برنامج منشور`, `an algorithm for that machine, often called the first published program`)],
        [T(`1936`, `1936`), T(`بحث آلان تورينغ عن ${tm("Turing Machine")}`, `Alan Turing's paper on the ${tm("Turing Machine")}`), T(`نموذج رياضي يحدد ما يمكن حسابه`, `a mathematical model of what can be computed`)],
        [T(`1945-1946`, `1945-1946`), T(`${tm("ENIAC")}`, `${tm("ENIAC")}`), T(`حاسوب إلكتروني عام الغرض بآلاف الصمامات المفرغة، كُشف عنه عام 1946`, `a general-purpose electronic computer with thousands of vacuum tubes, unveiled in 1946`)],
        [T(`1947`, `1947`), T(`${tm("Transistor")} في مختبرات بِل`, `The ${tm("Transistor")} at Bell Labs`), T(`مفتاح إلكتروني صغير يغني عن الصمام`, `a small electronic switch replacing the vacuum tube`)],
        [T(`1958-1959`, `1958-1959`), T(`${tm("Integrated Circuit")}`, `The ${tm("Integrated Circuit")}`), T(`عدة ترانزستورات على رقاقة واحدة (كيلبي ونويس)`, `several transistors on one chip (Kilby and Noyce)`)],
        [T(`1969`, `1969`), T(`${tm("ARPANET")}`, `${tm("ARPANET")}`), T(`شبكة تجريبية هي سلف الإنترنت`, `an experimental network that was an ancestor of the internet`)],
        [T(`1971`, `1971`), T(`معالج ${tm("Microprocessor")} من إنتل طراز 4004`, `The Intel 4004 ${tm("Microprocessor")}`), T(`وحدة المعالجة المركزية على رقاقة واحدة`, `a whole CPU on a single chip`)],
        [T(`1975-1981`, `1975-1981`), T(`ظهور الحاسوب الشخصي: Altair ثم Apple II ثم IBM PC`, `The personal computer arrives: Altair, then Apple II, then the IBM PC`), T(`صار الحاسوب في متناول البيوت والمكاتب`, `computers reach homes and offices`)],
        [T(`1983 و1991`, `1983 and 1991`), T(`اعتماد TCP/IP ثم الويب العالمي`, `TCP/IP adopted, then the World Wide Web`), T(`تيم بيرنرز لي اقترح الويب عام 1989 وأُتيح للعامة في بداية التسعينيات`, `Tim Berners-Lee proposed the web in 1989 and it opened to the public in the early 1990s`)],
        [T(`2007`, `2007`), T(`أول iPhone`, `The first iPhone`), T(`جعل الحاسوب الكامل في الجيب بشاشة لمس`, `put a full computer with a touchscreen in the pocket`)],
      ] },
      { k: "note", kind: "info", t: T(`تختلف المصادر قليلًا في تواريخ بعض الأحداث بحسب ما يُعدّ «الاكتمال»: التصميم أم أول عمل أم الكشف العام، ولذلك كُتبت التواريخ تقريبية.`, `Sources differ slightly on some dates depending on what counts as “done”: the design, the first working version or the public unveiling, which is why the dates here are approximate.`) },

      { k: "h", t: T(`الأجيال وماذا غيّرت`, `Generations and what they changed`) },
      { k: "p", t: T(`يقسم المؤرخون الحواسيب الإلكترونية إلى أجيال بحسب التقنية الأساسية في صنعها. الحدود بينها تقريبية، لكن الفكرة تفسّر الاتجاه العام: كل جيل أصغر وأسرع وأرخص وأقل استهلاكًا للطاقة من سابقه.`, `Historians divide electronic computers into generations by the main technology used to build them. The boundaries are approximate, but the idea explains the overall direction: each generation was smaller, faster, cheaper and less power-hungry than the last.`) },
      { k: "table", head: [T(`الجيل`, `Generation`), T(`التقنية`, `Technology`), T(`الفترة التقريبية`, `Approx. period`), T(`ما تغيّر`, `What changed`)], rows: [
        [T(`الأول`, `First`), T(`صمامات مفرغة`, `Vacuum tubes`), T(`1940 - 1956`, `1940s - mid-1950s`), T(`حواسيب بحجم غرفة تستهلك طاقة كبيرة وتتعطل كثيرًا`, `room-sized machines that used much power and failed often`)],
        [T(`الثاني`, `Second`), T(`ترانزستورات`, `Transistors`), T(`1956 - 1963`, `mid-1950s - mid-1960s`), T(`أصغر وأكثر اعتمادية، وظهرت لغات عالية المستوى`, `smaller and more reliable, and high-level languages appeared`)],
        [T(`الثالث`, `Third`), T(`دوائر متكاملة`, `Integrated circuits`), T(`1964 - 1971`, `mid-1960s - early 1970s`), T(`أرخص وأسرع، وبدأت أنظمة التشغيل متعددة المهام`, `cheaper and faster, and multitasking operating systems began`)],
        [T(`الرابع`, `Fourth`), T(`معالجات دقيقة`, `Microprocessors`), T(`1971 حتى اليوم`, `1971 to today`), T(`حاسوب شخصي ثم هاتف ذكي بمعالج على رقاقة واحدة`, `personal computers and then smartphones built around a chip-sized CPU`)],
      ] },
      { k: "p", t: T(`تحدّث بعضهم عن «جيل خامس» مرتبط بالذكاء الاصطناعي، لكنه تعريف فضفاض لا يتفق عليه الجميع.`, `Some people speak of a “fifth generation” tied to artificial intelligence, but that is a loose label not everyone agrees on.`) },

      { k: "h", t: T(`قانون مور`, `Moore's law`) },
      { k: "p", t: T(`في عام 1965 لاحظ غوردون مور، وهو من مؤسسي إنتل لاحقًا، أن عدد المكوّنات التي يمكن وضعها اقتصاديًا على رقاقة يتضاعف تقريبًا كل عام، ثم عدّل توقعه في 1975 إلى نحو كل سنتين. ${tm("Moore's Law")} إذن <strong>ملاحظة تجريبية وتوقع صناعي</strong> وليس قانونًا فيزيائيًا. وقد صدق عقودًا لأن الصناعة جعلته هدفًا تسعى إليه، لكن تباطأ في السنوات الأخيرة مع اقتراب الترانزستور من حدود فيزيائية وارتفاع تكلفة التصنيع. لذلك تتجه الصناعة اليوم إلى معالجات متعددة الأنوية ومسرّعات متخصصة بدل الاعتماد على رفع التردد وحده.`, `In 1965 Gordon Moore, later a co-founder of Intel, observed that the number of components that could economically fit on a chip was doubling roughly every year, and in 1975 he revised the forecast to about every two years. ${tm("Moore's Law")} is therefore <strong>an empirical observation and an industry forecast</strong>, not a law of physics. It held for decades because the industry made it a target, but it has slowed in recent years as transistors approach physical limits and manufacturing costs rise. So the industry now turns to multi-core processors and specialised accelerators instead of relying on clock speed alone.`) },
      { k: "code", lang: "text", code: "start: 2,300 transistors (Intel 4004, 1971)\ndoubling every 2 years for 50 years = 25 doublings\n2,300 x 2^25 = about 77 billion" },
      { k: "p", t: T(`الناتج الحسابي يقارب رقم المعالجات الكبيرة جدًا اليوم، التي تضم عشرات المليارات من الترانزستورات، فيبيّن كيف تتراكم المضاعفة المنتظمة. هو تقدير للتوضيح لا رقم قياسي لمنتج بعينه.`, `The arithmetic lands near the transistor counts of today's very large processors, which hold tens of billions, and shows how steady doubling accumulates. It is an illustrative estimate, not the exact figure of any one product.`) },

      { k: "h", t: T(`معمارية فون نيومان`, `The Von Neumann architecture`) },
      { k: "p", t: T(`في مسودة تقرير عام 1945 وصف جون فون نيومان تصميمًا ما زال أساسًا لمعظم الحواسيب: وحدة معالجة (حساب ومنطق وتحكم)، وذاكرة واحدة تحوي <strong>التعليمات والبيانات معًا</strong>، وأجهزة إدخال وإخراج. إن كان البرنامج مخزّنًا في الذاكرة فيمكن تغييره بتحميل برنامج آخر دون إعادة توصيل الأسلاك، وهذا ما كان يتطلبه ENIAC في صورته الأولى. ولها ثمن يُعرف بـ ${tm("Von Neumann Bottleneck")}: المسار الواحد بين المعالج والذاكرة قد يصبح عنق زجاجة، ولهذا أضافت المعالجات الحديثة ذاكرة مؤقتة سريعة Cache.`, `In a 1945 draft report John von Neumann described a design that is still the basis of most computers: a processing unit (arithmetic, logic and control), a single memory holding <strong>instructions and data together</strong>, and input and output devices. If the program is stored in memory it can be changed by loading another program without rewiring, which early ENIAC required. It has a cost known as the ${tm("Von Neumann Bottleneck")}: the single path between processor and memory can become a choke point, which is why modern processors add a fast cache.`) },
      { k: "note", kind: "info", t: T(`نُسب التصميم إلى فون نيومان وحده في التسمية الشائعة، لكن فريقًا كاملًا ساهم في الفكرة، منهم إيكرت وموكلي مصممو ENIAC.`, `The design is named after von Neumann alone in common usage, but a whole team contributed to the idea, including Eckert and Mauchly, the designers of ENIAC.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>فهم المصطلحات:</strong> كلمة «Bug» ورثناها من أيام الأجهزة الكهروميكانيكية، وكلمة «Computer» من العاملين على الحساب اليدوي.`, `<strong>Understanding vocabulary:</strong> the word “bug” comes from the era of electromechanical machines, and “computer” from the people who calculated by hand.`),
        T(`<strong>اتخاذ قرار شراء:</strong> معرفة أن الأداء لا يأتي من التردد وحده، بل من الأنوية والذاكرة المؤقتة، تحميك من إعلانات مضللة.`, `<strong>Buying decisions:</strong> knowing that performance does not come from clock speed alone but from cores and cache protects you from misleading ads.`),
        T(`<strong>تصميم البرمجيات:</strong> مشكلة عنق الزجاجة تفسّر لماذا تؤثر طريقة الوصول إلى الذاكرة في سرعة البرنامج.`, `<strong>Software design:</strong> the bottleneck explains why the way a program accesses memory affects its speed.`),
        T(`<strong>التحليل التاريخي:</strong> ترى أن كل تقنية جديدة (الشبكة ثم الهاتف) خلقت صناعات لم تكن متخيَّلة قبلها.`, `<strong>Historical perspective:</strong> you can see that each new technology (the network, then the phone) created industries nobody had imagined before.`),
      ] },

      { k: "mistakes", items: [
        T(`«ENIAC كان أول حاسوب على الإطلاق»: كانت قبله آلات مثل Colossus البريطاني في الحرب العالمية الثانية؛ ويُميَّز ENIAC بأنه إلكتروني عام الغرض ضخم.`, `“ENIAC was the very first computer”: there were earlier machines such as Britain's Colossus in World War II; ENIAC stands out as a large general-purpose electronic computer.`),
        T(`«قانون مور قانون طبيعي لا يتغير»: هو ملاحظة صناعية، وقد تباطأ، ولا يعني أن سرعة الجهاز تتضاعف كل سنتين بل عدد الترانزستورات.`, `“Moore's law is an unchanging law of nature”: it is an industry observation that has slowed, and it concerns transistor counts rather than device speed doubling every two years.`),
        T(`«باباج بنى أول حاسوب»: صمّم الآلة التحليلية بدقة لكنها لم تكتمل، فهي أول تصور لا أول جهاز يعمل.`, `“Babbage built the first computer”: he designed the Analytical Engine in detail but it was never completed, so it is the first concept, not the first working machine.`),
        T(`«الإنترنت والويب ظهرا معًا»: الشبكة سبقت الويب بنحو عقدين، فـ ARPANET في 1969 والويب في أواخر الثمانينيات وبداية التسعينيات.`, `“The internet and the web appeared together”: the network preceded the web by about two decades, ARPANET in 1969 and the web in the late 1980s and early 1990s.`),
      ] },

      { k: "ex", q: T(`<strong>ترتيب:</strong> رتّب زمنيًا: iPhone، الترانزستور، Intel 4004، ENIAC، الدائرة المتكاملة. ثم اذكر الجيل الذي ينتمي إليه كل ابتكار إن أمكن.`, `<strong>Ordering:</strong> put these in time order: iPhone, transistor, Intel 4004, ENIAC, integrated circuit. Then name the generation each belongs to where possible.`), a: T(`<p>الترتيب: ENIAC (1945-1946)، ثم الترانزستور (1947)، ثم الدائرة المتكاملة (1958-1959)، ثم Intel 4004 (1971)، ثم iPhone (2007). ENIAC من الجيل الأول (صمامات)، والترانزستور أساس الجيل الثاني، والدائرة المتكاملة أساس الثالث، و4004 بداية الرابع. أما iPhone فمنتج من الجيل الرابع مبني على معالجات دقيقة، وليس جيلًا جديدًا.</p>`, `<p>The order is ENIAC (1945-1946), the transistor (1947), the integrated circuit (1958-1959), the Intel 4004 (1971), then the iPhone (2007). ENIAC is first generation (vacuum tubes), the transistor underlies the second, the integrated circuit the third, and the 4004 begins the fourth. The iPhone is a fourth-generation product built on microprocessors, not a new generation.</p>`) },
      { k: "ex", q: T(`<strong>حساب:</strong> لو تضاعف عدد الترانزستورات كل سنتين، فبكم يتضاعف خلال عشر سنوات؟ وماذا لو تباطأ التضاعف إلى كل ثلاث سنوات؟`, `<strong>Calculation:</strong> if transistor counts double every two years, by what factor do they grow in ten years? And if doubling slows to every three years?`), a: T(`<p>عشر سنوات مع تضاعف كل سنتين تعني خمس مرات تضاعف: 2<sup>5</sup> = 32 ضعفًا. وبتضاعف كل ثلاث سنوات: 10 ÷ 3 ≈ 3.33 مرة، فيكون 2<sup>3.33</sup> ≈ 10 أضعاف تقريبًا. التباطؤ الظاهر في الأرقام الصغيرة يصنع فارقًا كبيرًا بعد سنوات قليلة، وهذا ما يجعله مهمًا للصناعة.</p>`, `<p>Ten years with doubling every two years is five doublings: 2<sup>5</sup> = 32 times. With doubling every three years: 10 ÷ 3 ≈ 3.33 doublings, so 2<sup>3.33</sup> is about 10 times. A slowdown that looks small in the exponent makes a big difference after only a few years, which is why it matters to the industry.</p>`) },
      { k: "ex", q: T(`<strong>تأمل عملي:</strong> اختر جهازًا قديمًا في بيتك أو بيت أحد أقاربك (هاتف قديم، آلة حاسبة، لعبة). ابحث عن سنة صنعه وقارن مواصفاته بهاتفك الآن.`, `<strong>Hands-on reflection:</strong> pick an old device at home or a relative's (an old phone, calculator or console). Look up when it was made and compare its specifications with your current phone.`), a: T(`<p>ستجد على الأرجح أن الذاكرة والتخزين أصغر بمئات المرات أو آلاف، وأن المعالج أبطأ وأقل أنوية. قارن أيضًا الحجم والوزن واستهلاك الطاقة. السؤال المفيد: أي تقنية من الخط الزمني جعلت هذا الفارق ممكنًا؟ غالبًا الجواب هو الدوائر المتكاملة المتقدمة وتقليص حجم الترانزستور، مع تحسّن ذاكرة الفلاش والبطاريات. دوّن ثلاثة فروق وسبب كل منها.</p>`, `<p>You will probably find memory and storage hundreds or thousands of times smaller, and a slower processor with fewer cores. Compare size, weight and power use too. A useful question: which technology from the timeline made the difference possible? Often the answer is advanced integrated circuits and transistor shrinking, plus better flash memory and batteries. Write down three differences and the reason for each.</p>`) },

      { k: "summary", items: [
        T(`الحوسبة تطورت من آلات ميكانيكية إلى تصاميم نظرية (باباج وتورينغ) ثم إلى حواسيب إلكترونية.`, `Computing evolved from mechanical machines to theoretical designs (Babbage and Turing) and then to electronic computers.`),
        T(`الترانزستور والدائرة المتكاملة والمعالج الدقيق هي القفزات التي جعلت الحاسوب صغيرًا ورخيصًا.`, `The transistor, integrated circuit and microprocessor were the leaps that made computers small and cheap.`),
        T(`قانون مور ملاحظة عن عدد الترانزستورات وليس قانونًا طبيعيًا، وقد تباطأ.`, `Moore's law is an observation about transistor counts, not a natural law, and it has slowed.`),
        T(`معمارية فون نيومان تخزّن التعليمات والبيانات في ذاكرة واحدة وما زالت الأساس.`, `The Von Neumann architecture keeps instructions and data in one memory and is still the foundation.`),
      ], next: T(`الحوسبة الحديثة: نرى كيف انتقلت القدرة من جهازك إلى مراكز البيانات والسحابة.`, `Modern Computing: we see how computing power moved from your device to data centres and the cloud.`) },
    ],
  },

  // ───────────────────────── com-19 ─────────────────────────
  {
    id: "com-19",
    body: [
      { k: "objectives", items: [
        T(`تشرح كيف انتقل جزء كبير من الحوسبة إلى ${tm("Cloud")} ومراكز البيانات، وتفرّق بين ${tm("Virtual Machine")} و${tm("Container")}.`, `Explain how much computing moved to the ${tm("Cloud")} and data centres, and tell a ${tm("Virtual Machine")} from a ${tm("Container")}.`),
        T(`تقارن نماذج ${tm("SaaS")} و${tm("PaaS")} و${tm("IaaS")} وتختار المناسب لمثال معين.`, `Compare ${tm("SaaS")}, ${tm("PaaS")} and ${tm("IaaS")} models and pick the right one for a given case.`),
        T(`تحلل مفاضلات الحوسبة الحديثة: التأخر والتكلفة والخصوصية والطاقة.`, `Analyse the trade-offs of modern computing: latency, cost, privacy and energy.`),
      ] },
      { k: "prereq", items: [T(`دروس المعالج والذاكرة والتخزين والشبكات وتاريخ الحوسبة.`, `The lessons on the CPU, RAM, storage, networks and the history of computing.`)] },

      { k: "h", t: T(`مقدمة: الحاسوب لم يعد أمامك فقط`, `Introduction: the computer is no longer only in front of you`) },
      { k: "p", t: T(`حين تطلب سيارة عبر تطبيق أو تشاهد فيلمًا أو تحرّر مستندًا مع زملائك، فإن الجهاز الذي بين يديك يؤدي جزءًا صغيرًا من العمل، أما الجزء الأكبر فيجري على حواسيب بعيدة لا تراها. الحوسبة الحديثة هي هذا التوزيع: أجهزة محمولة في اليد، وخوادم في مراكز بيانات، وأجهزة صغيرة في كل مكان، وكلها متصلة. وهي ليست شيئًا جديدًا كليًا؛ فكل ما فيها مبني على المكونات التي درستها، لكنه مرتب بطريقة مختلفة.`, `When you order a ride through an app, stream a film or edit a document with colleagues, the device in your hand does a small part of the work, and the larger part runs on distant computers you never see. Modern computing is this distribution: handheld devices, servers in data centres, tiny devices everywhere, all connected. It is not entirely new; everything in it is built from the components you studied, only arranged differently.`) },

      { k: "h", t: T(`الهاتف والسحابة ومراكز البيانات`, `Mobile, cloud and data centres`) },
      { k: "p", t: T(`الهاتف الذكي حاسوب كامل مبني حول رقاقة واحدة تسمى ${tm("SoC")} (System on a Chip) تجمع المعالج والرسوميات ومكونات أخرى لتوفير الطاقة والحجم، ويعمل ببطارية، ولذلك يصمم كل شيء فيه حول الكفاءة. وخلف تطبيقاتك يقف ${tm("Data Center")}: مبنى يضم آلاف الخوادم مع شبكات سريعة وأنظمة تبريد وكهرباء احتياطية. و${tm("Cloud")} هو استئجار قدرات هذه المراكز عبر الإنترنت عند الطلب بدل شراء الأجهزة وتشغيلها بنفسك.`, `A smartphone is a full computer built around a single chip called a ${tm("SoC")} (System on a Chip) that combines the processor, graphics and other parts to save power and space, and it runs on a battery, so everything in it is designed around efficiency. Behind your apps stands a ${tm("Data Center")}: a building housing thousands of servers with fast networks, cooling and backup power. The ${tm("Cloud")} is renting the capacity of such centres over the internet on demand instead of buying and operating the hardware yourself.`) },
      { k: "flow", title: T(`ماذا يحدث حين تفتح تطبيق مشاهدة`, `What happens when you open a streaming app`), steps: [
        { label: T(`الجهاز`, `Your device`), sub: T(`الهاتف يرسل الطلب ويعرض الواجهة ويفك ضغط الفيديو`, `the phone sends the request, shows the interface and decodes the video`) },
        { label: T(`الشبكة`, `The network`), sub: T(`تنتقل الحزم عبر شبكة الاتصالات إلى أقرب خادم`, `packets travel across the carrier network to the nearest server`) },
        { label: T(`مركز البيانات`, `Data centre`), sub: T(`خوادم تتحقق من حسابك وتبحث في قواعد بيانات`, `servers check your account and query databases`) },
        { label: T(`التخزين والتوصيل`, `Storage and delivery`), sub: T(`يُرسل الفيديو من نسخ قريبة منك لتقليل التأخر`, `video is served from copies close to you to cut delay`) },
      ] },

      { k: "h", t: T(`المحاكاة الافتراضية والحاويات`, `Virtualisation and containers`) },
      { k: "p", t: T(`لا تستعمل السحابة خادمًا فعليًا لكل عميل، بل تقسم الخادم الواحد. في ${tm("Virtualization")} يشغّل برنامج يسمى ${tm("Hypervisor")} عدة <strong>أجهزة افتراضية</strong> على عتاد واحد، لكل منها نظام تشغيل كامل خاص بها يظن أنه يملك جهازًا مستقلًا. أما ${tm("Containers")} فأخف: تتشارك فيها الحاويات نواة نظام التشغيل نفسها لكنها تُعزل عن بعضها في ما تراه من ملفات وعمليات وشبكة. تبدأ الحاوية بسرعة وتستهلك أقل، لكن عزلها أضعف من عزل جهاز افتراضي كامل، لأن النواة مشتركة. ويحدد هذا الفرق جزءًا مما سنتعلمه في قسم أنظمة التشغيل.`, `The cloud does not use a physical server per customer; it divides one server. In ${tm("Virtualization")} a program called a ${tm("Hypervisor")} runs several <strong>virtual machines</strong> on one piece of hardware, each with its own complete operating system that believes it has a separate computer. ${tm("Containers")} are lighter: they share the same operating system kernel but are isolated from each other in the files, processes and network they can see. A container starts quickly and uses less, but its isolation is weaker than a full virtual machine because the kernel is shared. This difference connects to what we will learn in the operating systems section.`) },
      { k: "table", head: [T(`الجانب`, `Aspect`), T(`جهاز افتراضي`, `Virtual machine`), T(`حاوية`, `Container`)], rows: [
        [T(`نظام التشغيل`, `Operating system`), T(`نظام كامل لكل جهاز`, `a full OS per machine`), T(`نواة مشتركة مع المضيف`, `kernel shared with the host`)],
        [T(`زمن البدء`, `Start time`), T(`دقائق أو ثوانٍ طويلة`, `from many seconds up to minutes`), T(`ثوانٍ أو أقل`, `seconds or less`)],
        [T(`الحجم`, `Size`), T(`كبير (غيغابايتات)`, `large (gigabytes)`), T(`أصغر عادة`, `usually much smaller`)],
        [T(`العزل`, `Isolation`), T(`أقوى`, `stronger`), T(`أخف وأضعف نسبيًا`, `lighter and relatively weaker`)],
      ] },

      { k: "h", t: T(`نماذج الخدمة: SaaS وPaaS وIaaS`, `Service models: SaaS, PaaS and IaaS`) },
      { k: "p", t: T(`تختلف الخدمات السحابية بمقدار ما تديره أنت وما يديره المزوّد. كلما صعدنا نحو SaaS قلّ ما تتحكم به وقلّ ما تصونه.`, `Cloud services differ in how much you manage and how much the provider does. The closer to SaaS, the less you control and the less you maintain.`) },
      { k: "table", head: [T(`النموذج`, `Model`), T(`ماذا تحصل عليه`, `What you get`), T(`ماذا تديره أنت`, `What you manage`), T(`مثال`, `Example`)], rows: [
        [T(`IaaS`, `IaaS`), T(`خوادم وشبكة وتخزين افتراضية`, `virtual servers, network and storage`), T(`نظام التشغيل والبرامج والبيانات`, `the OS, software and data`), T(`استئجار جهاز افتراضي`, `renting a virtual machine`)],
        [T(`PaaS`, `PaaS`), T(`منصة جاهزة لتشغيل تطبيقك`, `a ready platform to run your app`), T(`الشيفرة والبيانات فقط`, `only your code and data`), T(`منصة تستضيف تطبيق ويب`, `a platform hosting a web app`)],
        [T(`SaaS`, `SaaS`), T(`تطبيق كامل جاهز`, `a finished application`), T(`حسابك وإعداداتك وبياناتك`, `your account, settings and data`), T(`بريد إلكتروني ومحرر مستندات عبر المتصفح`, `web email and an online document editor`)],
      ] },

      { k: "h", t: T(`إنترنت الأشياء والحافة`, `IoT and edge computing`) },
      { k: "p", t: T(`${tm("IoT")} (Internet of Things) هو أجهزة يومية فيها حاسوب صغير ومستشعرات واتصال: ساعة ذكية، ومقياس حرارة منزلي، وحساسات في مزرعة. وتولّد كمية هائلة من البيانات، وإرسالها كلها إلى السحابة مكلف وبطيء. لذلك ظهرت ${tm("Edge Computing")}: معالجة جزء من البيانات قريبًا من مصدرها، على الجهاز نفسه أو على خادم محلي، وإرسال النتائج المهمة فقط. كاميرا ذكية تكتشف الحركة بنفسها وترسل مقطعًا قصيرًا بدل بث ساعات.`, `${tm("IoT")} (Internet of Things) means everyday devices with a small computer, sensors and connectivity: a smartwatch, a home thermostat, sensors on a farm. They generate huge amounts of data, and sending all of it to the cloud is costly and slow. So ${tm("Edge Computing")} appeared: processing part of the data close to its source, on the device itself or on a local server, and sending only the important results. A smart camera detects motion by itself and uploads a short clip instead of streaming hours of video.`) },

      { k: "h", t: T(`الذكاء الاصطناعي وتعلّم الآلة بصورة مفاهيمية`, `AI and machine learning, conceptually`) },
      { k: "p", t: T(`في البرمجة التقليدية تكتب أنت القواعد، أما في ${tm("Machine Learning")} فتعطي النظام أمثلة كثيرة ويستخلص هو النمط بنفسه: يُدرَّب على آلاف الصور المصنّفة ليتعرف على صورة جديدة. التدريب عمل ثقيل يحتاج وحدات رسوميات وكميات كبيرة من الذاكرة، ولهذا يجري عادة في مراكز البيانات. أما استعمال النموذج المدرَّب فأخف، وقد يعمل على الهاتف. هذه النماذج تتنبأ بما يشبه الأمثلة التي رأتها، فهي قد تخطئ وتحتاج إلى مراجعة بشرية في المواقف المهمة.`, `In traditional programming you write the rules; in ${tm("Machine Learning")} you give the system many examples and it extracts the pattern by itself: it is trained on thousands of labelled images so it can recognise a new one. Training is heavy work needing graphics processors and large amounts of memory, so it usually happens in data centres. Using a trained model is lighter and may run on a phone. These models predict what resembles the examples they saw, so they can be wrong and need human review in important situations.`) },

      { k: "h", t: T(`المفاضلات: لا يوجد خيار مجاني`, `Trade-offs: there is no free option`) },
      { k: "ul", items: [
        T(`<strong>التأخر ${tm("Latency")}:</strong> كلما بعد الحاسوب عنك زاد زمن الاستجابة؛ والحافة تقلله.`, `<strong>${tm("Latency")}:</strong> the farther the computer is from you, the longer the response takes; the edge reduces it.`),
        T(`<strong>التكلفة:</strong> السحابة تحوّل شراء الأجهزة إلى دفع بحسب الاستعمال، وهذا رخيص عند الحاجة المتقطعة لكنه قد يغلو مع الحمل الدائم.`, `<strong>Cost:</strong> the cloud turns buying hardware into pay-as-you-go, cheap for occasional needs but possibly expensive under constant load.`),
        T(`<strong>الخصوصية:</strong> بياناتك على خوادم جهة أخرى، فيجب أن تعرف أين تُخزّن ومن يصل إليها وكيف تُشفّر.`, `<strong>Privacy:</strong> your data sits on another party's servers, so you must know where it is stored, who can reach it and how it is encrypted.`),
        T(`<strong>الطاقة:</strong> مراكز البيانات تستهلك كهرباء وتبريدًا ضخمين، ولذلك تُقاس الكفاءة بالعمل المنجز لكل وحدة طاقة.`, `<strong>Energy:</strong> data centres use large amounts of electricity and cooling, so efficiency is measured as work done per unit of energy.`),
        T(`<strong>الاعتماد على الاتصال:</strong> إن انقطعت الشبكة تعطلت الخدمات التي تعتمد على السحابة بالكامل.`, `<strong>Dependence on connectivity:</strong> if the network drops, services that rely entirely on the cloud stop working.`),
      ] },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>المتاجر الإلكترونية:</strong> تزيد عدد الخوادم الافتراضية في موسم التخفيضات ثم تقللها بعده.`, `<strong>Online shops:</strong> add virtual servers during a sale season and remove them afterwards.`),
        T(`<strong>الزراعة الذكية:</strong> مستشعرات تقيس الرطوبة وتقرر الري محليًا وترسل ملخصًا للسحابة.`, `<strong>Smart farming:</strong> sensors measure moisture, decide on watering locally and send a summary to the cloud.`),
        T(`<strong>التعاون:</strong> يحرّر فريق كامل مستندًا واحدًا لأن النسخة الواحدة مخزنة في السحابة.`, `<strong>Collaboration:</strong> a whole team edits one document because the single copy lives in the cloud.`),
        T(`<strong>التطوير:</strong> المبرمجون يغلّفون تطبيقهم في حاوية ليعمل بالطريقة نفسها على أي جهاز.`, `<strong>Development:</strong> programmers wrap their app in a container so it runs the same way on any machine.`),
      ] },

      { k: "mistakes", items: [
        T(`«السحابة مكان غامض بلا عتاد»: هي خوادم حقيقية في مبانٍ حقيقية يملكها طرف آخر.`, `“The cloud is a mysterious place with no hardware”: it is real servers in real buildings owned by someone else.`),
        T(`«الحاوية جهاز افتراضي مصغّر»: الحاوية تشارك نواة المضيف، والجهاز الافتراضي يحمل نظامًا كاملًا.`, `“A container is a small virtual machine”: a container shares the host kernel, while a virtual machine carries a full OS.`),
        T(`«السحابة دائمًا أرخص وأكثر أمانًا»: الأمر يعتمد على الحمل والإعداد، وكثير من التسريبات سببها خطأ في إعدادات العميل.`, `“The cloud is always cheaper and safer”: it depends on workload and setup, and many leaks come from the customer's own misconfiguration.`),
        T(`«الذكاء الاصطناعي يفهم كما يفهم الإنسان»: النموذج يكتشف أنماطًا إحصائية في البيانات، وقد يعطي إجابة واثقة وخاطئة.`, `“AI understands as a human does”: a model finds statistical patterns in data and can give a confident but wrong answer.`),
      ] },

      { k: "ex", q: T(`<strong>اختيار نموذج:</strong> شركة صغيرة تريد (أ) بريدًا ومستندات لموظفيها، (ب) استضافة تطبيق ويب كتبه مطوّرها، (ج) تشغيل برنامج قديم يحتاج نظام تشغيل بعينه. اختر SaaS أو PaaS أو IaaS لكل حالة.`, `<strong>Choosing a model:</strong> a small company wants (a) email and documents for its staff, (b) to host a web app its developer wrote, (c) to run an old program that needs a specific operating system. Pick SaaS, PaaS or IaaS for each.`), a: T(`<p>(أ) SaaS لأن المطلوب تطبيق جاهز ولا داعي لإدارة خوادم. (ب) PaaS لأن الفريق يريد التركيز على الشيفرة وتتولى المنصة التشغيل والتحديثات. (ج) IaaS لأنك تحتاج التحكم في نظام التشغيل نفسه، فتستأجر جهازًا افتراضيًا وتثبّت عليه ما تريد. القاعدة: اختر أعلى مستوى يلبي حاجتك لتقل أعباء الصيانة.</p>`, `<p>(a) SaaS, because a finished application is needed and there is no reason to manage servers. (b) PaaS, because the team wants to focus on code while the platform handles running and updates. (c) IaaS, because you need control of the operating system itself, so you rent a virtual machine and install what you need. Rule: choose the highest level that meets your need to reduce maintenance load.</p>`) },
      { k: "ex", q: T(`<strong>مفاضلة:</strong> كاميرا مراقبة تبث فيديو على مدار الساعة. قارن بين إرسال كل الفيديو إلى السحابة ومعالجته على الحافة من حيث التأخر والتكلفة والخصوصية.`, `<strong>Trade-off:</strong> a surveillance camera records around the clock. Compare sending all the video to the cloud with processing it at the edge in terms of latency, cost and privacy.`), a: T(`<p>الإرسال الكامل يستهلك نطاقًا ترددًا كبيرًا وتخزينًا مكلفًا، ويضيف تأخرًا قبل أن يأتي أي تنبيه، ويعرّض كل اللقطات لمخاطر النقل والتخزين البعيد. المعالجة على الحافة تكتشف الحدث محليًا فتنبّه فورًا وترسل مقاطع قليلة فقط، فتنخفض التكلفة وتتحسن الخصوصية. ثمن ذلك أن الجهاز المحلي يحتاج قدرة معالجة أعلى وصيانة وتحديثًا، وقد لا يكون نموذجه بدقة نموذج السحابة الأكبر. فالحل العملي غالبًا مزيج بين الاثنين.</p>`, `<p>Sending everything uses large bandwidth and costly storage, adds delay before any alert arrives, and exposes all footage to transport and remote-storage risks. Edge processing detects the event locally, alerts immediately and uploads only a few clips, so cost drops and privacy improves. The price is that the local device needs more processing power plus maintenance and updates, and its model may be less accurate than a larger cloud one. The practical answer is often a mix of both.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> اختر ثلاث خدمات تستعملها يوميًا (بريد، فيديو، تخزين صور). لكل منها: أين تعمل الأجزاء، وهل تعمل دون إنترنت، وما نوعها SaaS أو غيره؟`, `<strong>Hands-on:</strong> pick three services you use daily (email, video, photo storage). For each: where do the parts run, does it work without internet, and is it SaaS or another type?`), a: T(`<p>أغلبها SaaS لأنك تستعمل تطبيقًا جاهزًا. جرّب وضع الطيران وافتح كل واحدة: ستجد أن بعضها يعرض ما خُزّن مسبقًا على جهازك (ذاكرة مؤقتة ونسخ محلية)، وبعضها لا يعمل أبدًا. هذا يبيّن أي جزء يعمل محليًا وأي جزء في السحابة. ثم افتح إعدادات الخصوصية وانظر ما الذي يُرفع إلى الخادم. اكتب لكل خدمة جدولًا صغيرًا: ما يُحفظ محليًا وما يُحفظ في السحابة وما أثر انقطاع الشبكة.</p>`, `<p>Most will be SaaS since you use a finished application. Try airplane mode and open each: some will show what was stored earlier on your device (cache and local copies) and others will not work at all. This shows which part runs locally and which in the cloud. Then open the privacy settings and see what is uploaded to the server. Write a small table per service: what is kept locally, what in the cloud, and what a network outage does.</p>`) },

      { k: "summary", items: [
        T(`الحوسبة اليوم موزعة بين أجهزة محمولة ومراكز بيانات وأجهزة IoT وطبقة حافة قريبة.`, `Computing today is spread across mobile devices, data centres, IoT devices and a nearby edge layer.`),
        T(`الأجهزة الافتراضية والحاويات تقسم العتاد؛ الأولى بنظام كامل، والثانية بنواة مشتركة.`, `Virtual machines and containers divide hardware; the first with a full OS, the second with a shared kernel.`),
        T(`SaaS وPaaS وIaaS تختلف بمقدار ما تديره أنت مقابل المزوّد.`, `SaaS, PaaS and IaaS differ in how much you manage versus the provider.`),
        T(`كل خيار له ثمن في التأخر والتكلفة والخصوصية والطاقة.`, `Every option has a cost in latency, price, privacy and energy.`),
      ], next: T(`معمارية نظام التشغيل: النواة والفضاءان. نفتح الطبقة التي تقف بين البرامج والعتاد، وبعدها ننتقل إلى أساسيات البرمجة.`, `OS Architecture: Kernel, User Space and Kernel Space. We open the layer between programs and hardware, and afterwards move on to Programming Basics.`) },
    ],
  },
];
