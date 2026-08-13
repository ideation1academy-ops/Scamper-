<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>رحلة الاستبدال المدهشة</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --sky-top:#eaf7f4;
    --sky-bottom:#d7f0ea;
    --teal:#0f766e;
    --teal-deep:#0a4a45;
    --path-line:#cbb994;
    --gem:#ffb703;
    --gem-deep:#c98a00;
    --coral:#ef5b5b;
    --success:#2fae72;
    --card:#fffaf0;
    --ink:#20302c;
    --radius:18px;
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{
    font-family:'Cairo',sans-serif;
    color:var(--ink);
    background:linear-gradient(180deg,var(--sky-top),var(--sky-bottom) 60%,#f4ead2);
    min-height:100vh;
    padding:0 0 50px;
  }
  .wrap{max-width:520px;margin:0 auto;padding:0 16px;}

  /* ---- top bar ---- */
  .topbar{
    display:flex;align-items:center;justify-content:space-between;
    padding:14px 16px;
    background:linear-gradient(180deg,var(--teal),var(--teal-deep));
    color:#fff;
    border-radius:0 0 20px 20px;
    box-shadow:0 6px 16px rgba(0,0,0,0.15);
    position:sticky;top:0;z-index:20;
    max-width:520px;margin:0 auto;
  }
  .brand{font-family:'Baloo 2',sans-serif;font-weight:700;font-size:16px;}
  .gems{
    font-family:'Baloo 2',sans-serif;font-weight:800;font-size:16px;
    background:rgba(255,255,255,0.18);
    padding:6px 14px;border-radius:20px;
    display:flex;align-items:center;gap:6px;
    transition:transform .25s;
  }
  .gems.pulse{animation:gemPulse .5s ease;}
  @keyframes gemPulse{0%{transform:scale(1);}40%{transform:scale(1.25);}100%{transform:scale(1);}}

  .screen{display:none;padding-top:18px;}
  .screen.active{display:block;animation:fadeIn .35s ease;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}

  /* ---- map / journey path ---- */
  .map-intro{
    text-align:center;font-size:14.5px;color:var(--teal-deep);
    font-weight:600;line-height:1.7;margin:6px 0 26px;
  }
  .path{position:relative;padding:6px 0 20px;}
  .path::before{
    content:"";position:absolute;top:10px;bottom:40px;left:50%;
    width:0;border-left:4px dashed var(--path-line);
    transform:translateX(-50%);z-index:0;
  }
  .station{
    position:relative;z-index:1;
    display:flex;flex-direction:column;align-items:center;gap:6px;
    width:160px;margin:0 auto 40px;
    cursor:pointer;
  }
  .station.pos-l{transform:translateX(-52px);}
  .station.pos-r{transform:translateX(52px);}
  .node{
    width:68px;height:68px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:30px;
    background:linear-gradient(180deg,#fff,#f1ead6);
    border:4px solid var(--gem);
    box-shadow:0 6px 0 rgba(0,0,0,0.12);
    transition:transform .2s;
  }
  .node.locked{
    border-color:#c9c2b0;background:#e7e2d3;filter:grayscale(70%);opacity:0.75;
  }
  .node.current{animation:nodePulse 1.6s ease-in-out infinite;}
  @keyframes nodePulse{0%,100%{box-shadow:0 6px 0 rgba(0,0,0,0.12), 0 0 0 0 rgba(255,183,3,0.5);}50%{box-shadow:0 6px 0 rgba(0,0,0,0.12), 0 0 0 10px rgba(255,183,3,0);}}
  .node.done{border-color:var(--success);}
  .node-label{
    font-family:'Baloo 2',sans-serif;font-weight:700;font-size:13.5px;
    text-align:center;color:var(--teal-deep);
  }
  .stars{font-size:14px;letter-spacing:2px;min-height:16px;}
  .lock-hint{font-size:11px;color:#8a8370;}

  /* ---- shared panel ---- */
  .panel{
    background:var(--card);border-radius:var(--radius);
    padding:22px 18px;
    box-shadow:0 8px 0 rgba(0,0,0,0.14), 0 12px 20px rgba(0,0,0,0.2);
  }
  .station-title{
    font-family:'Baloo 2',sans-serif;font-weight:800;color:var(--teal-deep);
    font-size:19px;margin:0 0 4px;text-align:center;
  }
  .station-sub{
    text-align:center;font-size:13.5px;color:#6b6350;margin:0 0 18px;font-weight:600;
  }
  .btn{
    font-family:'Baloo 2',sans-serif;font-weight:700;font-size:16px;color:#fff;
    background:linear-gradient(180deg,var(--teal),var(--teal-deep));
    border:none;padding:12px 26px;border-radius:14px;cursor:pointer;
    box-shadow:0 5px 0 #06322e,0 8px 14px rgba(0,0,0,0.2);
    transition:transform .12s;
  }
  .btn:active{transform:translateY(4px);box-shadow:0 1px 0 #06322e;}
  .btn:disabled{opacity:0.4;cursor:not-allowed;}
  .btn.gold{
    background:linear-gradient(180deg,var(--gem),var(--gem-deep));
    box-shadow:0 5px 0 #7a5600,0 8px 14px rgba(0,0,0,0.2);
  }
  .btn.gold:active{box-shadow:0 1px 0 #7a5600;}
  .center{text-align:center;}
  .row-btns{display:flex;justify-content:center;margin-top:16px;}

  /* ---- Station 1: MCQ ---- */
  .q-card{display:none;}
  .q-card.active{display:block;animation:fadeIn .3s ease;}
  .q-eyebrow{
    display:inline-block;font-family:'Baloo 2',sans-serif;font-weight:700;font-size:12.5px;
    color:var(--teal-deep);background:#e6f2ee;padding:3px 12px;border-radius:20px;margin-bottom:10px;
  }
  .q-text{font-family:'Baloo 2',sans-serif;font-weight:700;font-size:17.5px;margin:0 0 16px;line-height:1.5;}
  .options{display:grid;gap:11px;}
  .opt{
    background:#fff;border:2.5px solid #e7dcc4;border-radius:14px;padding:12px 15px;
    font-weight:600;font-size:15px;cursor:pointer;text-align:right;
    transition:border-color .2s,background .2s;
  }
  .opt:hover{border-color:var(--teal);}
  .opt.correct{background:#e6f6ee;border-color:var(--success);}
  .opt.wrong{background:#fbe9e7;border-color:var(--coral);}
  .opt.disabled{pointer-events:none;}
  .feedback{margin-top:12px;font-family:'Baloo 2',sans-serif;font-weight:700;font-size:14.5px;min-height:20px;}
  .feedback.ok{color:var(--success);}
  .feedback.no{color:var(--coral);}

  /* ---- Station 2: memory match ---- */
  .grid-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:6px;}
  .mcard{
    aspect-ratio:3/4;border-radius:12px;background:linear-gradient(180deg,var(--teal),var(--teal-deep));
    display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px;
    cursor:pointer;box-shadow:0 4px 0 rgba(0,0,0,0.15);
    transition:transform .25s;
  }
  .mcard .front{display:none;font-size:11.5px;font-weight:700;font-family:'Baloo 2',sans-serif;text-align:center;padding:2px;color:var(--teal-deep);}
  .mcard .back{font-size:22px;}
  .mcard.flipped{background:#fff;border:2.5px solid var(--gem);}
  .mcard.flipped .front{display:block;}
  .mcard.flipped .back{display:none;}
  .mcard.matched{background:#e6f6ee;border:2.5px solid var(--success);}
  .mcard.shake{animation:shakeCard .35s;}
  @keyframes shakeCard{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}
  .match-status{text-align:center;font-weight:700;font-family:'Baloo 2',sans-serif;color:var(--teal-deep);margin-top:10px;font-size:14px;}

  /* ---- Station 3: toolbox ---- */
  .scenario-box{
    background:#fff;border:2px dashed var(--gem);border-radius:14px;padding:14px;margin-bottom:16px;text-align:center;
  }
  .scenario-box p{margin:0;font-weight:700;font-family:'Baloo 2',sans-serif;font-size:16px;color:var(--ink);}
  .toolbox-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
  .tool-opt{
    background:#fff;border:3px solid #e7dcc4;border-radius:16px;padding:18px 8px;
    display:flex;flex-direction:column;align-items:center;gap:6px;
    font-weight:700;font-size:13.5px;cursor:pointer;transition:border-color .2s,transform .15s;
  }
  .tool-opt .ic{font-size:34px;}
  .tool-opt:hover{border-color:var(--teal);}
  .tool-opt.correct{border-color:var(--success);background:#e6f6ee;}
  .tool-opt.wrong{border-color:var(--coral);background:#fbe9e7;animation:shakeCard .35s;}
  .tool-opt.disabled{pointer-events:none;}

  /* ---- Station 4: speed round ---- */
  .timerbar-wrap{background:#e7dcc4;border-radius:20px;height:14px;overflow:hidden;margin-bottom:18px;}
  .timerbar{height:100%;background:linear-gradient(90deg,var(--gem),var(--coral));width:100%;transition:width .2s linear;}
  .speed-card{background:#fff;border-radius:14px;padding:18px;text-align:center;box-shadow:0 4px 0 rgba(0,0,0,0.1);}
  .speed-pair{font-family:'Baloo 2',sans-serif;font-weight:700;font-size:16.5px;margin-bottom:16px;line-height:1.6;}
  .speed-btns{display:flex;gap:14px;justify-content:center;}
  .sbtn{
    flex:1;max-width:140px;padding:16px 10px;border-radius:14px;border:none;
    font-family:'Baloo 2',sans-serif;font-weight:800;font-size:16px;color:#fff;cursor:pointer;
  }
  .sbtn.yes{background:var(--success);}
  .sbtn.no{background:var(--coral);}
  .speed-counter{text-align:center;font-weight:700;color:var(--teal-deep);margin-bottom:8px;font-size:13.5px;}

  /* ---- station complete overlay ---- */
  .complete-box{text-align:center;}
  .complete-box .medal{font-size:46px;margin-bottom:4px;}
  .complete-box h3{font-family:'Baloo 2',sans-serif;color:var(--teal-deep);margin:0 0 6px;font-size:19px;}
  .complete-box .stars-big{font-size:26px;letter-spacing:4px;margin-bottom:10px;}
  .complete-box p{font-size:14px;color:#6b6350;margin:0 0 16px;font-weight:600;}

  /* ---- final screen ---- */
  .final-panel{text-align:center;}
  .final-panel .trophy{font-size:60px;margin-bottom:6px;}
  .final-panel h2{font-family:'Baloo 2',sans-serif;color:var(--teal-deep);font-size:23px;margin:0 0 6px;}
  .final-panel .tier{font-size:15px;color:var(--gem-deep);font-weight:700;margin-bottom:16px;}
  .final-gems{
    font-family:'Baloo 2',sans-serif;font-weight:800;font-size:22px;color:var(--teal-deep);
    background:#fff4d6;border-radius:16px;padding:12px;margin-bottom:16px;
  }
  .certificate{
    border:3px dashed var(--gem);border-radius:14px;padding:16px;margin-bottom:18px;
    background:repeating-linear-gradient(45deg,#fff,#fff 10px,#fffaf0 10px,#fffaf0 20px);
  }
  .certificate .cname{font-family:'Baloo 2',sans-serif;font-weight:800;color:var(--teal-deep);font-size:18px;}
  .certificate small{display:block;color:#6b6350;margin-top:5px;font-size:12.5px;}

  footer{text-align:center;color:#7a9490;font-size:12px;margin-top:20px;}
</style>
</head>
<body>
<div class="topbar">
  <div class="brand">🧭 رحلة الاستبدال</div>
  <div class="gems" id="gemsDisplay">💎 <span id="gemsCount">0</span></div>
</div>

<div class="wrap">

  <!-- MAP -->
  <section id="mapScreen" class="screen active">
    <p class="map-intro">أداة "استبدل" من SCAMPER 🔁 — امشِ بالمسار، افتح كل محطة بالترتيب، واجمع أكبر عدد من الجواهر!</p>
    <div class="path">
      <div class="station pos-c" data-station="1">
        <div class="node current" id="node1">🔍</div>
        <div class="node-label">محطة التخمين الذكي</div>
        <div class="stars" id="stars1"></div>
      </div>
      <div class="station pos-r" data-station="2">
        <div class="node locked" id="node2">🃏</div>
        <div class="node-label">محطة المطابقة</div>
        <div class="stars" id="stars2"></div>
      </div>
      <div class="station pos-l" data-station="3">
        <div class="node locked" id="node3">🧰</div>
        <div class="node-label">صندوق العدة</div>
        <div class="stars" id="stars3"></div>
      </div>
      <div class="station pos-r" data-station="4">
        <div class="node locked" id="node4">⚡</div>
        <div class="node-label">تحدي البرق</div>
        <div class="stars" id="stars4"></div>
      </div>
      <div class="station pos-c" data-station="final">
        <div class="node locked" id="nodeFinal">🏆</div>
        <div class="node-label">خط النهاية</div>
      </div>
    </div>
  </section>

  <!-- STATION 1: MCQ -->
  <section id="station1" class="screen">
    <div class="panel">
      <h2 class="station-title">🔍 محطة التخمين الذكي</h2>
      <p class="station-sub">اختر أذكى بديل لكل موقف</p>

      <div class="q-card active" data-idx="0">
        <span class="q-eyebrow">سؤال ١ من ٤</span>
        <p class="q-text">نفد الصابون السائل! شو أذكى بديل؟</p>
        <div class="options">
          <div class="opt" data-correct="true">🧼 صابون قطعة</div>
          <div class="opt">🪥 معجون أسنان</div>
          <div class="opt">🍳 زيت الطبخ</div>
          <div class="opt">💧 ماء بس</div>
        </div>
        <p class="feedback"></p>
        <div class="row-btns"><button class="btn next-btn" disabled>التالي ←</button></div>
      </div>

      <div class="q-card" data-idx="1">
        <span class="q-eyebrow">سؤال ٢ من ٤</span>
        <p class="q-text">ما لقيت شريط لتزيين كيس الهدية، شو تستبدله فيه؟</p>
        <div class="options">
          <div class="opt" data-correct="true">🧶 خيط صوف ملوّن</div>
          <div class="opt">🔌 سلك كهرباء</div>
          <div class="opt">📰 ورق جرايد</div>
          <div class="opt">🚫 اتركه بدون تزيين</div>
        </div>
        <p class="feedback"></p>
        <div class="row-btns"><button class="btn next-btn" disabled>التالي ←</button></div>
      </div>

      <div class="q-card" data-idx="2">
        <span class="q-eyebrow">سؤال ٣ من ٤</span>
        <p class="q-text">طاولة الدراسة قصيرة شوي، شو بديل ذكي لرفعها؟</p>
        <div class="options">
          <div class="opt" data-correct="true">📚 كتب سميكة تحت أرجلها</div>
          <div class="opt">🔨 كسر الطاولة</div>
          <div class="opt">🪑 الجلوس على الأرض</div>
          <div class="opt">🛒 شراء طاولة فورًا</div>
        </div>
        <p class="feedback"></p>
        <div class="row-btns"><button class="btn next-btn" disabled>التالي ←</button></div>
      </div>

      <div class="q-card" data-idx="3">
        <span class="q-eyebrow">سؤال ٤ من ٤</span>
        <p class="q-text">ما في عندك غراء لتلصيق ورقتين، شو تجرب؟</p>
        <div class="options">
          <div class="opt" data-correct="true">📎 دبّاسة</div>
          <div class="opt">💧 ماء</div>
          <div class="opt">🏖️ رمل</div>
          <div class="opt">🧼 صابون</div>
        </div>
        <p class="feedback"></p>
        <div class="row-btns"><button class="btn next-btn" disabled>إنهاء المحطة 🏁</button></div>
      </div>

      <div class="complete-box" id="s1Complete" style="display:none;">
        <div class="medal">🎉</div>
        <h3>أحسنت! خلّصت محطة التخمين الذكي</h3>
        <div class="stars-big" id="s1StarsBig"></div>
        <p id="s1Summary"></p>
        <button class="btn gold" onclick="backToMap()">العودة للخريطة 🗺️</button>
      </div>
    </div>
  </section>

  <!-- STATION 2: MEMORY MATCH -->
  <section id="station2" class="screen">
    <div class="panel" id="s2Panel">
      <h2 class="station-title">🃏 محطة المطابقة</h2>
      <p class="station-sub">لاقي كل غرض مع بديله الذكي</p>
      <div class="grid-cards" id="matchGrid"></div>
      <p class="match-status" id="matchStatus">افتح بطاقتين وشوف إذا يشكّلوا زوج ذكي</p>

      <div class="complete-box" id="s2Complete" style="display:none;">
        <div class="medal">🎉</div>
        <h3>ممتاز! لقيت كل الأزواج</h3>
        <div class="stars-big" id="s2StarsBig"></div>
        <p id="s2Summary"></p>
        <button class="btn gold" onclick="backToMap()">العودة للخريطة 🗺️</button>
      </div>
    </div>
  </section>

  <!-- STATION 3: TOOLBOX -->
  <section id="station3" class="screen">
    <div class="panel">
      <h2 class="station-title">🧰 صندوق العدة</h2>
      <p class="station-sub">دوس على أذكى بديل من الصندوق</p>

      <div id="s3Rounds"></div>

      <div class="complete-box" id="s3Complete" style="display:none;">
        <div class="medal">🎉</div>
        <h3>رائع! فتحت صندوق العدة بالكامل</h3>
        <div class="stars-big" id="s3StarsBig"></div>
        <p id="s3Summary"></p>
        <button class="btn gold" onclick="backToMap()">العودة للخريطة 🗺️</button>
      </div>
    </div>
  </section>

  <!-- STATION 4: SPEED ROUND -->
  <section id="station4" class="screen">
    <div class="panel">
      <h2 class="station-title">⚡ تحدي البرق</h2>
      <p class="station-sub">بديل ذكي؟ ✅ ولا مو منطقي؟ ❌ — بسرعة!</p>
      <div class="timerbar-wrap"><div class="timerbar" id="timerBar"></div></div>
      <div class="speed-counter" id="speedCounter">السؤال ١ من ٥</div>
      <div class="speed-card">
        <p class="speed-pair" id="speedPairText"></p>
        <div class="speed-btns">
          <button class="sbtn yes" id="speedYes">✅ ذكي</button>
          <button class="sbtn no" id="speedNo">❌ مو منطقي</button>
        </div>
      </div>

      <div class="complete-box" id="s4Complete" style="display:none;">
        <div class="medal">⚡</div>
        <h3>وقت مذهل!</h3>
        <div class="stars-big" id="s4StarsBig"></div>
        <p id="s4Summary"></p>
        <button class="btn gold" onclick="backToMap()">العودة للخريطة 🗺️</button>
      </div>
    </div>
  </section>

  <!-- FINAL -->
  <section id="finalScreen" class="screen">
    <div class="panel final-panel">
      <div class="trophy" id="finalTrophy">🏆</div>
      <h2 id="finalTitle">بطل الاستبدال!</h2>
      <div class="tier" id="finalTier"></div>
      <div class="final-gems">💎 مجموع الجواهر: <span id="finalGems">0</span></div>
      <div class="certificate">
        <div class="cname">🎓 شهادة بطل أداة "استبدل"</div>
        <small>أكمل رحلة الاستبدال المدهشة ضمن برنامج SCAMPER للتفكير الإبداعي</small>
      </div>
      <button class="btn gold" onclick="resetJourney()">🔁 ابدأ رحلة جديدة</button>
    </div>
  </section>

  <footer>صُنعت بحب لكل مفكّر مبدع صغير ✨</footer>
</div>

<script>
(function(){
  let totalGems = 0;
  const stationStars = {1:0,2:0,3:0,4:0};
  const stationUnlockOrder = [1,2,3,4,'final'];

  function addGems(n){
    totalGems += n;
    document.getElementById('gemsCount').textContent = totalGems;
    const g = document.getElementById('gemsDisplay');
    g.classList.remove('pulse'); void g.offsetWidth; g.classList.add('pulse');
  }

  function showScreen(id){
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  }

  window.backToMap = function(){ showScreen('mapScreen'); };

  function unlockNode(n){
    const node = document.getElementById('node'+n);
    node.classList.remove('locked');
  }
  function markNodeCurrent(n){
    document.querySelectorAll('.node').forEach(x=>x.classList.remove('current'));
    const node = document.getElementById('node'+n);
    if(node) node.classList.add('current');
  }
  function markNodeDone(n, stars){
    const node = document.getElementById('node'+n);
    node.classList.remove('current','locked');
    node.classList.add('done');
    document.getElementById('stars'+n).textContent = '⭐'.repeat(stars) + '☆'.repeat(3-stars);
    // unlock next
    const idx = stationUnlockOrder.indexOf(n);
    const next = stationUnlockOrder[idx+1];
    if(next){
      unlockNode(next);
      markNodeCurrent(next);
    }
  }

  function starsFor(correct, total){
    if(correct >= total) return 3;
    if(correct >= Math.ceil(total*0.6)) return 2;
    return 1;
  }

  // map click handlers
  document.querySelectorAll('.station').forEach(st => {
    st.addEventListener('click', function(){
      const s = st.dataset.station;
      const nodeEl = document.getElementById(s === 'final' ? 'nodeFinal' : 'node'+s);
      if(nodeEl.classList.contains('locked')) return;
      if(s === 'final'){ showFinal(); return; }
      showScreen('station'+s);
    });
  });

  /* ---------------- STATION 1: MCQ ---------------- */
  (function(){
    const cards = Array.from(document.querySelectorAll('#station1 .q-card'));
    let correctCount = 0;
    cards.forEach((card, idx) => {
      const opts = Array.from(card.querySelectorAll('.opt'));
      const feedback = card.querySelector('.feedback');
      const nextBtn = card.querySelector('.next-btn');
      opts.forEach(opt => {
        opt.addEventListener('click', function(){
          if(card.dataset.answered) return;
          card.dataset.answered = "1";
          opts.forEach(o=>o.classList.add('disabled'));
          const isCorrect = opt.dataset.correct === "true";
          if(isCorrect){
            opt.classList.add('correct');
            feedback.textContent = '✅ صح! بديل ذكي فعلًا';
            feedback.className = 'feedback ok';
            correctCount++;
            addGems(10);
          } else {
            opt.classList.add('wrong');
            opts.find(o=>o.dataset.correct==="true").classList.add('correct');
            feedback.textContent = '❌ في بديل أذكى، شوف الأخضر';
            feedback.className = 'feedback no';
          }
          nextBtn.disabled = false;
        });
      });
      nextBtn.addEventListener('click', function(){
        card.classList.remove('active');
        if(idx+1 < cards.length){
          cards[idx+1].classList.add('active');
        } else {
          const stars = starsFor(correctCount, 4);
          stationStars[1] = stars;
          document.getElementById('s1StarsBig').textContent = '⭐'.repeat(stars)+'☆'.repeat(3-stars);
          document.getElementById('s1Summary').textContent = `أجبت صح على ${correctCount} من ٤`;
          document.getElementById('s1Complete').style.display='block';
          markNodeDone(1, stars);
        }
      });
    });
  })();

  /* ---------------- STATION 2: MEMORY MATCH ---------------- */
  (function(){
    const pairs = [
      {pair:'p1', kind:'object', label:'مظلة', icon:'🌂'},
      {pair:'p1', kind:'sub', label:'كيس بلاستيك كبير', icon:'🛍️'},
      {pair:'p2', kind:'object', label:'كرسي', icon:'🪑'},
      {pair:'p2', kind:'sub', label:'صندوق كرتون', icon:'📦'},
      {pair:'p3', kind:'object', label:'فرشاة أسنان', icon:'🪥'},
      {pair:'p3', kind:'sub', label:'قماش نظيف', icon:'🧣'},
      {pair:'p4', kind:'object', label:'مسطرة', icon:'📏'},
      {pair:'p4', kind:'sub', label:'حافة كتاب', icon:'📚'},
    ];
    // shuffle
    for(let i=pairs.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [pairs[i],pairs[j]] = [pairs[j],pairs[i]];
    }
    const grid = document.getElementById('matchGrid');
    let firstPick=null, secondPick=null, lock=false, matches=0, wrongAttempts=0;

    pairs.forEach((p, i) => {
      const card = document.createElement('div');
      card.className='mcard';
      card.dataset.pair = p.pair;
      card.dataset.index = i;
      card.innerHTML = `<div class="back">❓</div><div class="front">${p.icon}<br>${p.label}</div>`;
      card.addEventListener('click', function(){
        if(lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
        card.classList.add('flipped');
        if(!firstPick){ firstPick = card; return; }
        secondPick = card;
        lock = true;
        if(firstPick.dataset.pair === secondPick.dataset.pair){
          firstPick.classList.add('matched');
          secondPick.classList.add('matched');
          matches++;
          addGems(15);
          document.getElementById('matchStatus').textContent = `زوج ذكي! (${matches} من ٤)`;
          firstPick=null; secondPick=null; lock=false;
          if(matches === 4){
            const stars = wrongAttempts<=1 ? 3 : (wrongAttempts<=3 ? 2 : 1);
            stationStars[2]=stars;
            document.getElementById('s2StarsBig').textContent = '⭐'.repeat(stars)+'☆'.repeat(3-stars);
            document.getElementById('s2Summary').textContent = `لقيت كل الأزواج بـ ${wrongAttempts} محاولة خاطئة`;
            document.getElementById('s2Complete').style.display='block';
            markNodeDone(2, stars);
          }
        } else {
          wrongAttempts++;
          firstPick.classList.add('shake');
          secondPick.classList.add('shake');
          document.getElementById('matchStatus').textContent = 'مو زوج... جرب تذكّر مكانهم!';
          setTimeout(()=>{
            firstPick.classList.remove('flipped','shake');
            secondPick.classList.remove('flipped','shake');
            firstPick=null; secondPick=null; lock=false;
          }, 800);
        }
      });
      grid.appendChild(card);
    });
  })();

  /* ---------------- STATION 3: TOOLBOX ---------------- */
  (function(){
    const rounds = [
      { text:'انكسرت المظلة! شو تستخدم بدالها بالمطر؟',
        options:[
          {icon:'🧥',label:'معطف بغطاء رأس',correct:true},
          {icon:'🩴',label:'شبشب',correct:false},
          {icon:'🍽️',label:'صحن',correct:false},
          {icon:'🎸',label:'غيتار',correct:false},
        ]},
      { text:'ما في عندك كرسي إضافي للضيف، شو تستخدم؟',
        options:[
          {icon:'🧺',label:'سلة مقلوبة',correct:true},
          {icon:'🚗',label:'سيارة',correct:false},
          {icon:'🪟',label:'نافذة',correct:false},
          {icon:'🐟',label:'سمكة',correct:false},
        ]},
      { text:'نفدت أكياس الشاي! شو تستخدم لعمل مشروب أعشاب؟',
        options:[
          {icon:'🌿',label:'أوراق نعناع طازجة',correct:true},
          {icon:'🧦',label:'جورب',correct:false},
          {icon:'🔑',label:'مفتاح',correct:false},
          {icon:'🖊️',label:'قلم',correct:false},
        ]},
    ];
    const container = document.getElementById('s3Rounds');
    let correctCount = 0;

    rounds.forEach((r, idx) => {
      const div = document.createElement('div');
      div.className = 'q-card' + (idx===0 ? ' active':'');
      div.dataset.idx = idx;
      const optsHtml = r.options.map(o => `<div class="tool-opt" data-correct="${o.correct}"><span class="ic">${o.icon}</span>${o.label}</div>`).join('');
      div.innerHTML = `
        <span class="q-eyebrow">جولة ${idx+1} من ٣</span>
        <div class="scenario-box"><p>${r.text}</p></div>
        <div class="toolbox-grid">${optsHtml}</div>
        <p class="feedback"></p>
        <div class="row-btns"><button class="btn next-btn" disabled>${idx===rounds.length-1 ? 'إنهاء المحطة 🏁' : 'الجولة التالية ←'}</button></div>
      `;
      container.appendChild(div);

      const opts = Array.from(div.querySelectorAll('.tool-opt'));
      const feedback = div.querySelector('.feedback');
      const nextBtn = div.querySelector('.next-btn');
      opts.forEach(opt => {
        opt.addEventListener('click', function(){
          if(div.dataset.answered) return;
          div.dataset.answered = "1";
          opts.forEach(o=>o.classList.add('disabled'));
          const isCorrect = opt.dataset.correct === "true";
          if(isCorrect){
            opt.classList.add('correct');
            feedback.textContent = '✅ اختيار ذكي!';
            feedback.className='feedback ok';
            correctCount++;
            addGems(15);
          } else {
            opt.classList.add('wrong');
            opts.find(o=>o.dataset.correct==="true").classList.add('correct');
            feedback.textContent = '❌ في خيار أفضل، شوف الأخضر';
            feedback.className='feedback no';
          }
          nextBtn.disabled = false;
        });
      });
      nextBtn.addEventListener('click', function(){
        div.classList.remove('active');
        const nextDiv = container.children[idx+1];
        if(nextDiv){
          nextDiv.classList.add('active');
        } else {
          const stars = starsFor(correctCount, 3);
          stationStars[3]=stars;
          document.getElementById('s3StarsBig').textContent = '⭐'.repeat(stars)+'☆'.repeat(3-stars);
          document.getElementById('s3Summary').textContent = `أجبت صح على ${correctCount} من ٣`;
          document.getElementById('s3Complete').style.display='block';
          markNodeDone(3, stars);
        }
      });
    });
  })();

  /* ---------------- STATION 4: SPEED ROUND ---------------- */
  (function(){
    const items = [
      {pair:'قلم رصاص مكسور ↔ ألوان الشمع', answer:true},
      {pair:'كوب ماء ↔ حجر', answer:false},
      {pair:'شريط هدايا ↔ خيط صوف ملوّن', answer:true},
      {pair:'مسطرة ↔ سمكة', answer:false},
      {pair:'غراء ↔ دبّاسة', answer:true},
    ];
    let idx = 0, correctCount = 0, timeLeft = 25, totalTime = 25, timerId = null, started = false, finished = false;

    const pairText = document.getElementById('speedPairText');
    const counter = document.getElementById('speedCounter');
    const bar = document.getElementById('timerBar');
    const yesBtn = document.getElementById('speedYes');
    const noBtn = document.getElementById('speedNo');

    function renderItem(){
      if(idx >= items.length){ finishRound(); return; }
      counter.textContent = `السؤال ${idx+1} من ${items.length}`;
      pairText.textContent = items[idx].pair;
    }

    function startTimer(){
      if(started) return;
      started = true;
      timerId = setInterval(()=>{
        timeLeft -= 0.2;
        bar.style.width = Math.max(0,(timeLeft/totalTime*100)) + '%';
        if(timeLeft <= 0){
          clearInterval(timerId);
          finishRound();
        }
      }, 200);
    }

    function answer(val){
      if(finished || idx >= items.length) return;
      startTimer();
      if(val === items[idx].answer){
        correctCount++;
        addGems(20);
      }
      idx++;
      if(idx >= items.length){
        clearInterval(timerId);
        finishRound();
      } else {
        renderItem();
      }
    }

    yesBtn.addEventListener('click', ()=>answer(true));
    noBtn.addEventListener('click', ()=>answer(false));

    function finishRound(){
      if(finished) return;
      finished = true;
      clearInterval(timerId);
      yesBtn.disabled = true; noBtn.disabled = true;
      const speedBonus = timeLeft > 8 && correctCount === items.length;
      if(speedBonus) addGems(20);
      const stars = starsFor(correctCount, items.length);
      stationStars[4] = stars;
      document.getElementById('s4StarsBig').textContent = '⭐'.repeat(stars)+'☆'.repeat(3-stars);
      document.getElementById('s4Summary').textContent = `صح: ${correctCount} من ${items.length}` + (speedBonus ? ' — 🎁 مكافأة سرعة!' : '');
      document.getElementById('s4Complete').style.display='block';
      markNodeDone(4, stars);
    }

    renderItem();
  })();

  /* ---------------- FINAL ---------------- */
  window.showFinal = function(){
    document.getElementById('finalGems').textContent = totalGems;
    const totalStars = stationStars[1]+stationStars[2]+stationStars[3]+stationStars[4];
    let tier, trophy;
    if(totalStars >= 11){ tier='بطل الاستبدال الأسطوري! 🏆'; trophy='🏆'; }
    else if(totalStars >= 7){ tier='نجم الاستبدال الماهر! 🌟'; trophy='🌟'; }
    else { tier='مستكشف واعد — استمر بالتدريب! 💪'; trophy='🔧'; }
    document.getElementById('finalTier').textContent = tier;
    document.getElementById('finalTrophy').textContent = trophy;
    showScreen('finalScreen');
    launchConfetti();
  };

  function launchConfetti(){
    const emojis = ['🎉','✨','💎','⭐','🎊'];
    for(let i=0;i<24;i++){
      const el = document.createElement('div');
      el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      el.style.position='fixed';
      el.style.left = Math.random()*100+'vw';
      el.style.top='-30px';
      el.style.fontSize = (14+Math.random()*16)+'px';
      el.style.zIndex = 999;
      el.style.pointerEvents='none';
      el.style.transition = 'transform 2.2s ease-in, opacity 2.2s ease-in';
      document.body.appendChild(el);
      requestAnimationFrame(()=>{
        el.style.transform = `translateY(${80+Math.random()*20}vh) rotate(${Math.random()*360}deg)`;
        el.style.opacity = '0';
      });
      setTimeout(()=>el.remove(), 2300);
    }
  }

  window.resetJourney = function(){
    location.reload();
  };

})();
</script>
</body>
</html>
