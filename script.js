(function(){
"use strict";

var IMG = {
  hero:      'assets/hero-beach.jpg',
  piano:     'assets/piano.jpg',
  riding:    'assets/horseback-riding.jpg',
  equilux:   'assets/equilux-store.jpg',
  cert:      'assets/piano-certificate.jpg',
  discovery: 'assets/discovery-cube.png',
  robotics:  'assets/vex-robotics.png',
  hospice:   'assets/carechoices.png',
  bctm:      'assets/bring-change-to-mind.png',
  launchx:   'assets/nerusa-ai.png'
};

var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- data ---------------- */
var CATS = {
  stem:    {label:'STEM & Making', color:'var(--c-stem)'},
  music:   {label:'Music',         color:'var(--c-music)'},
  service: {label:'Service',       color:'var(--c-service)'},
  business:{label:'Business',      color:'var(--c-business)'},
  sport:   {label:'Athletics',     color:'var(--c-sport)'}
};

var ITEMS = [
  {id:'piano', name:'Piano', role:'Private study, weekly lessons', cat:'music', span:'2024 \u2013 now',
   blurb:'The longest-running thing in my life. Years of scales and repertoire turned into a Certificate of Merit Panel pass and an invitation I still find hard to say out loud.',
   bullets:['Enrolled in weekly private lessons in Irvine, and playing since age 6','Passed the Certificate of Merit (CM) Panel','Invited to play at Carnegie Hall for the Golden Classical Music Awards'],
   media:{src:'piano', kind:'photo', cap:'Practicing at home \u2014 Chopin, most mornings'},
   video:{src:'assets/piano-video.mp4', poster:'assets/piano-poster.jpg', cap:'A full performance, start to finish'},
   tags:['music']},

  {id:'vr', name:'VR Equestrian Game', role:'Developer, working with a mentor', cat:'stem', span:'2025 \u2013 now',
   blurb:'Riding is expensive and hard to reach. I wanted to hand the feeling of it \u2014 the balance, the animal, the arena \u2014 to kids who can\u2019t get to a barn.',
   bullets:['Collaborating with a mentor to develop an equestrian VR game for children with disabilities','Responsible for gameplay and arena design in Unity','Preparing the build to enter game design competitions'],
   tags:['stem','service','sport']},

  {id:'launchx', name:'LaunchX', role:'Alumna, class of 2026', cat:'stem', span:'2026',
   blurb:'A summer of building a company end to end. We shipped, priced it, and found out what people would actually pay for.',
   bullets:['Built a product that translates academic papers and patents, launched as nerusa.ai','Earned an estimated $800 in sales with the product'],
   media:{src:'launchx', kind:'mark', cap:'The product we shipped', link:'https://nerusa.ai'},
   tags:['stem','business']},

  {id:'robotics', name:'OCSA Robotics Club', role:'Team Leader', cat:'stem', span:'2024 \u2013 2025',
   blurb:'Leading meant less building and more asking: what are we actually good at, and what are we avoiding? The honest answers made us faster.',
   bullets:['Learned to design, build and program robots and prepare them for competition','Hosted discussions to determine the team\u2019s strengths and weaknesses','Grew teamwork, collaboration and creative thinking under deadline'],
   media:{src:'robotics', kind:'mark', cap:'VEX Robotics Competition'},
   tags:['stem']},

  {id:'equilux', name:'Equilux', role:'Founder', cat:'business', span:'2024 \u2013 now',
   blurb:'It started as my own problem \u2014 finding riding gear worth buying \u2014 and turned into suppliers, listings, shipping questions and customers.',
   bullets:['Founded an online store specializing in horseback riding equipment','Partnered with suppliers to source high-quality riding gear and accessories','Manage online sales, marketing and customer support to grow the business'],
   media:{src:'equilux', kind:'photo', cap:'The Equilux storefront \u2014 featured products'},
   tags:['business','sport']},

  {id:'hospice', name:'CareChoices Hospice', role:'Volunteer', cat:'service', span:'2024 \u2013 now',
   blurb:'Starting in the office, working toward the harder and more meaningful part: sitting with patients and their families.',
   bullets:['Assist with administrative tasks that support daily office operations','Preparing to provide companionship and support to assigned patients and their families'],
   media:{src:'hospice', kind:'mark', cap:'CareCHOICES Hospice', link:'https://carechoices.net/hospice/volunteer-opportunities/'},
   tags:['service']},

  {id:'discovery', name:'Discovery Cube', role:'Volunteer, Santa Ana', cat:'service', span:'2025 \u2013 now',
   blurb:'I host the solar system station, which mostly means answering the questions eight-year-olds ask that adults have stopped asking.',
   bullets:['Supervise children and answer questions about each station; currently hosting the solar system station','Join community events covering life science, physical science and astronomy'],
   media:{src:'discovery', kind:'mark', cap:'Discovery Cube, Santa Ana', link:'https://www.discoverycube.org/volunteer/'},
   tags:['service','stem']},

  {id:'bctm', name:'Bring Change to Mind', role:'Club Secretary', cat:'service', span:'2025 \u2013 now',
   blurb:'A club built on the idea that the hardest part of mental health at school is being the first person to say something out loud.',
   bullets:['Support mental health awareness initiatives at school','Help create a safe, supportive environment through events and discussions'],
   media:{src:'bctm', kind:'mark', cap:'Bring Change to Mind', link:'https://www.bringchange2mind.org/'},
   tags:['service']},

  {id:'csf', name:'California Scholarship Federation', role:'Member', cat:'service', span:'2025 \u2013 now',
   blurb:'An academic honor society that keeps a standing bargain: hold the grades, and give the service hours back.',
   bullets:['Maintain a GPA of 3.5 or higher to qualify each semester','Completing community service hours toward the seven points needed for recognition'],
   tags:['service']},

  {id:'riding', name:'Horseback Riding', role:'Equestrian', cat:'sport', span:'since 8th grade',
   blurb:'Twice a week in the arena. Everything else I do borrows the patience this one taught me \u2014 including the VR game and the store.',
   bullets:['Train with a coach twice a week on riding and jumping technique','Built concentration, persistence, resilience and teamwork'],
   media:{src:'riding', kind:'photo', cap:'At the barn, before a lesson', ratio:'5/4', pos:'center 38%'},
   video:{src:'assets/riding-video.mp4', poster:'assets/riding-poster.jpg', cap:'A jumping round in the arena'},
   tags:['sport','business','stem']}
];

var YEARS = [
  {y:'2024', title:'High school begins', sum:'Ninth grade \u2014 and the year I stopped only participating: a team to lead, a business to run, an office to help keep going.',
   events:[{t:'Started high school at the Orange County School of the Arts', s:'Irvine, California \u2014 class of 2028'},
           {t:'Led the OCSA Robotics Club as Team Leader', s:'Design, build, program, compete', go:'robotics'},
           {t:'Founded Equilux', s:'An online store for horseback riding equipment', go:'equilux'},
           {t:'Started volunteering at CareChoices Hospice', s:'Administrative support, training for patient companionship', go:'hospice'},
           {t:'Began weekly private piano lessons in Irvine', s:'Working toward the Certificate of Merit Panel', go:'piano'},
           {t:'President\u2019s Volunteer Service Award \u2014 Gold', s:'Recognition for service hours'}]},
  {y:'2025', title:'Teaching, and starting to build in VR', sum:'A year of passing things on \u2014 to museum visitors, to classmates \u2014 while starting the biggest project yet.',
   events:[{t:'Began developing the VR equestrian game', s:'Unity, with a mentor, for children with disabilities', go:'vr'},
           {t:'Started at the Discovery Cube', s:'Hosting the solar system station', go:'discovery'},
           {t:'Elected Secretary of Bring Change to Mind', s:'Mental health awareness at school', go:'bctm'},
           {t:'Joined the California Scholarship Federation', s:'Academic honor society', go:'csf'},
           {t:'Piano Certificate of Merit \u2014 Level 10', s:'Music Teachers\u2019 Association of California', go:'piano'}]},
  {y:'2026', title:'Shipping, and the CM Panel', sum:'Top marks on both instruments, and a product that actually made money.',
   events:[{t:'Piano Certificate of Merit \u2014 Panel', s:'The highest CM level', go:'piano'},
           {t:'Violin Certificate of Merit \u2014 Level 10', s:'Music Teachers\u2019 Association of California'},
           {t:'LaunchX: shipped a translation product', s:'nerusa.ai \u2014 academic papers and patents, roughly $800 in sales', go:'launchx'},
           {t:'Performed 3 concerts in France', s:'Touring with the Orange County Youth Symphony and String Ensemble'}]},
  {y:'Ahead', title:'What\u2019s next', sum:'Two things I\u2019m working toward right now.',
   events:[{t:'Carnegie Hall \u2014 Golden Classical Music Awards', s:'Invited to perform', go:'piano'},
           {t:'Entering the VR game in design competitions', s:'Once the build is ready', go:'vr'}]}
];

var AWARDS = [
  {y:'2026', t:'Piano Certificate of Merit \u2014 Panel', d:'The highest level of the Music Teachers\u2019 Association of California\u2019s Certificate of Merit program, reached after years of weekly lessons since age six.'},
  {y:'2026', t:'Violin Certificate of Merit \u2014 Level 10', d:'Level 10 on a second instrument, earned in the same year as the piano Panel.'},
  {y:'2025', t:'Piano Certificate of Merit \u2014 Level 10', d:'The step before Panel \u2014 a full program of repertoire, technique, sight-reading and theory, judged by an evaluator.', img:'cert'},
  {y:'2024', t:'President\u2019s Volunteer Service Award \u2014 Gold', d:'National recognition for volunteer service hours, at the Gold level for my age group.'}
];

var FACTS = [
  {k:'Since age 6', h:'Playing from a young age', p:'Weekly lessons since I was six, and I still practice most days. Carnegie Hall is the strangest sentence on this page.'},
  {k:'Why VR', h:'Riding, for everyone', p:'The VR game exists because riding is hard to access. I wanted kids who can’t get to a barn to feel what the arena feels like.'},
  {k:'Founder', h:'Equilux started small', p:'It began as my own problem — good riding gear is hard to find — and became suppliers, listings and real customers.'},
  {k:'Volunteering', h:'Explaining science', p:'At the Discovery Cube I host the solar system station. Kids ask the questions adults have stopped asking, and I have to actually know the answer.'},
  {k:'Off-season', h:'Snowboarding and baking', p:'Winter on a board, rainy days in the kitchen. Painting and dancing fill in the rest.'}
];

/* ---------------- helpers ---------------- */
function el(tag, cls, txt){ var n=document.createElement(tag); if(cls)n.className=cls; if(txt!=null)n.textContent=txt; return n; }
function byId(id){ return document.getElementById(id); }
function catOf(id){ return CATS[id]; }
function host(url){ return String(url).replace(/^https?:\/\//,'').replace(/^www\./,'').split('/')[0]; }

/* ---------------- theme ---------------- */
byId('themeBtn').addEventListener('click', function(){
  var root = document.documentElement;
  var cur = root.getAttribute('data-theme');
  var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = cur ? cur === 'dark' : sysDark;
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  paintWash();
});

/* ---------------- hero wash (canvas) ---------------- */
var cv = byId('wash'), ctx = cv.getContext('2d');
function paintWash(){
  var host = cv.parentNode;
  var w = host.offsetWidth, h = host.offsetHeight, dpr = Math.min(window.devicePixelRatio||1, 2);
  if(!w || !h) return;
  cv.width = w*dpr; cv.height = h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,w,h);
  var cs = getComputedStyle(document.documentElement);
  var c1 = cs.getPropertyValue('--sky-200').trim() || '#BEE1F3';
  var c2 = cs.getPropertyValue('--sky-300').trim() || '#ACD2E9';
  var blobs = [
    {x:w*0.16, y:h*0.30, r:Math.max(w,h)*0.44, c:c2, a:0.55},
    {x:w*0.72, y:h*0.12, r:Math.max(w,h)*0.40, c:c1, a:0.55},
    {x:w*0.52, y:h*0.92, r:Math.max(w,h)*0.46, c:c2, a:0.34}
  ];
  blobs.forEach(function(b){
    var g = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
    g.addColorStop(0, hexA(b.c, b.a));
    g.addColorStop(1, hexA(b.c, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill();
  });
}
function hexA(hex, a){
  hex = hex.replace('#','');
  if(hex.length===3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  var n = parseInt(hex,16);
  if(isNaN(n)) return 'rgba(172,210,233,'+a+')';
  return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')';
}
paintWash();
window.addEventListener('resize', paintWash);
byId('heroImg').src = IMG.hero;
window.addEventListener('load', function(){ paintWash(); layoutRail(); });

/* ---------------- scroll buttons ---------------- */
Array.prototype.forEach.call(document.querySelectorAll('[data-scroll]'), function(b){
  b.addEventListener('click', function(){
    var target = b.getAttribute('data-scroll');
    if(target === '#journey') showYear(0);
    var t = document.querySelector(target);
    if(t) t.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'start'});
  });
});

/* ---------------- stats count-up ---------------- */
var statEls = Array.prototype.slice.call(document.querySelectorAll('#stats .v'));
function runStats(){
  statEls.forEach(function(s){
    var to = parseFloat(s.getAttribute('data-to'));
    var dec = parseInt(s.getAttribute('data-dec')||'0', 10);
    if(reduce){ s.textContent = to.toFixed(dec); return; }
    var start = null, dur = 900;
    function step(ts){
      if(start===null) start = ts;
      var p = Math.min((ts-start)/dur, 1);
      var e = 1 - Math.pow(1-p, 3);
      s.textContent = (to*e).toFixed(dec);
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}
if('IntersectionObserver' in window){
  var so = new IntersectionObserver(function(en){
    en.forEach(function(e){ if(e.isIntersecting){ runStats(); so.disconnect(); } });
  }, {threshold:0.4});
  so.observe(byId('stats'));
} else { runStats(); }

/* ---------------- explorer ---------------- */
var listEl = byId('list'), detailEl = byId('detail');
var current = 'piano', filter = 'all';

ITEMS.forEach(function(it){
  var b = el('button','row');
  b.type = 'button';
  b.setAttribute('role','tab');
  b.setAttribute('data-id', it.id);
  b.setAttribute('aria-selected','false');
  var bar = el('span','bar'); bar.style.background = catOf(it.cat).color;
  var nm = el('span','nm'); nm.appendChild(document.createTextNode(it.name));
  var sm = el('small', null, it.role); nm.appendChild(sm);
  var yr = el('span','yr mono', it.span);
  b.appendChild(bar); b.appendChild(nm); b.appendChild(yr);
  b.addEventListener('click', function(){ select(it.id); });
  b.addEventListener('keydown', function(e){
    if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
      e.preventDefault();
      var vis = visibleRows();
      var i = vis.indexOf(b);
      var next = vis[(i + (e.key==='ArrowDown'?1:vis.length-1)) % vis.length];
      if(next){ next.focus(); select(next.getAttribute('data-id'), true); }
    }
  });
  listEl.appendChild(b);
});

function visibleRows(){
  return Array.prototype.slice.call(listEl.querySelectorAll('.row')).filter(function(r){
    return !r.classList.contains('hide');
  });
}

function select(id, quiet){
  current = id;
  var it = ITEMS.filter(function(x){ return x.id===id; })[0];
  if(!it) return;
  Array.prototype.forEach.call(listEl.querySelectorAll('.row'), function(r){
    var on = r.getAttribute('data-id')===id;
    r.classList.toggle('on', on);
    r.setAttribute('aria-selected', String(on));
  });
  var c = catOf(it.cat);
  detailEl.innerHTML = '';
  var top = el('div','dtop');
  var badge = el('span','badge', c.label); badge.style.color = c.color;
  top.appendChild(badge);
  top.appendChild(el('span','span', it.span));
  detailEl.appendChild(top);
  detailEl.appendChild(el('h3', null, it.name));
  detailEl.appendChild(el('p','role', it.role));
  detailEl.appendChild(el('p','blurb', it.blurb));
  var ul = el('ul');
  it.bullets.forEach(function(t){ ul.appendChild(el('li', null, t)); });
  detailEl.appendChild(ul);
  if(it.media && IMG[it.media.src]){
    if(it.media.kind === 'photo'){
      var fig = el('figure','dmedia');
      var im = el('img'); im.src = IMG[it.media.src]; im.alt = it.media.cap || it.name; im.loading='lazy';
      if(it.media.ratio) im.style.aspectRatio = it.media.ratio;
      if(it.media.pos) im.style.objectPosition = it.media.pos;
      fig.appendChild(im);
      if(it.media.cap) fig.appendChild(el('figcaption', null, it.media.cap));
      detailEl.appendChild(fig);
    } else {
      var tile;
      if(it.media.link){
        tile = el('a','dmark');
        tile.href = it.media.link;
        tile.target = '_blank';
        tile.rel = 'noopener noreferrer';
        tile.setAttribute('aria-label', (it.media.cap || it.name) + ' \u2014 opens in a new tab');
      } else {
        tile = el('div','dmark');
      }
      var lg = el('img'); lg.src = IMG[it.media.src]; lg.alt = it.media.cap || it.name; lg.loading='lazy';
      tile.appendChild(lg);
      if(it.media.link){
        var pill = el('span','visit');
        pill.appendChild(document.createTextNode('Visit site '));
        pill.appendChild(el('i', null, '\u2197'));
        tile.appendChild(pill);
        tile.title = 'Opens ' + host(it.media.link) + ' in a new tab';
      }
      detailEl.appendChild(tile);
      var cap = el('p','dmarkcap');
      cap.appendChild(el('span', null, it.media.cap || it.name));
      if(it.media.link) cap.appendChild(el('span','host', host(it.media.link) + ' \u2197'));
      detailEl.appendChild(cap);
    }
  }
  if(it.video){
    var vfig = el('figure','dvideo');
    var v = document.createElement('video');
    v.src = it.video.src;
    if(it.video.poster) v.poster = it.video.poster;
    v.controls = true;
    v.preload = 'none';
    v.playsInline = true;
    v.setAttribute('playsinline','');
    v.setAttribute('aria-label', it.video.cap || (it.name + ' video'));
    vfig.appendChild(v);
    var vcap = el('figcaption');
    vcap.appendChild(el('span','tag-watch','Watch'));
    vcap.appendChild(el('span', null, it.video.cap || ''));
    vfig.appendChild(vcap);
    detailEl.appendChild(vfig);
  }
  var foot = el('div','foot');
  foot.appendChild(el('span','lbl','Related:'));
  it.tags.forEach(function(tg){
    var tb = el('button','tagbtn', catOf(tg).label);
    tb.type='button';
    tb.addEventListener('click', function(){ setFilter(tg); });
    foot.appendChild(tb);
  });
  detailEl.appendChild(foot);
  detailEl.classList.remove('swap');
  void detailEl.offsetWidth;
  detailEl.classList.add('swap');
  if(!quiet && window.innerWidth <= 940){
    detailEl.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'start'});
  }
}

var chips = Array.prototype.slice.call(document.querySelectorAll('#filters .chip'));
chips.forEach(function(ch){
  var cat = ch.getAttribute('data-cat');
  var n = cat==='all' ? ITEMS.length : ITEMS.filter(function(i){ return i.cat===cat || i.tags.indexOf(cat)>-1; }).length;
  var slot = ch.querySelector('.ct');
  if(slot) slot.textContent = n;
  ch.addEventListener('click', function(){ setFilter(cat); });
});

function setFilter(cat){
  filter = cat;
  chips.forEach(function(ch){ ch.setAttribute('aria-pressed', String(ch.getAttribute('data-cat')===cat)); });
  Array.prototype.forEach.call(listEl.querySelectorAll('.row'), function(r){
    var it = ITEMS.filter(function(x){ return x.id===r.getAttribute('data-id'); })[0];
    var show = cat==='all' || it.cat===cat || it.tags.indexOf(cat)>-1;
    r.classList.toggle('hide', !show);
  });
  var vis = visibleRows();
  if(vis.length && vis.map(function(r){return r.getAttribute('data-id');}).indexOf(current) === -1){
    select(vis[0].getAttribute('data-id'), true);
  }
}

/* ---------------- timeline ---------------- */
var railEl = byId('rail'), fillEl = byId('railFill'), lineEl = byId('railLine'), cardEl = byId('yearCard');
var activeYear = 0;
YEARS.forEach(function(yr, i){
  var b = el('button','rnode');
  b.type='button';
  b.setAttribute('role','tab');
  b.setAttribute('aria-selected','false');
  b.appendChild(el('span','dot'));
  b.appendChild(el('span','yr', yr.y));
  b.addEventListener('click', function(){ showYear(i); });
  b.addEventListener('keydown', function(e){
    if(e.key==='ArrowRight' || e.key==='ArrowLeft'){
      e.preventDefault();
      var n = (i + (e.key==='ArrowRight'?1:YEARS.length-1)) % YEARS.length;
      railEl.children[n].focus(); showYear(n);
    }
  });
  railEl.appendChild(b);
});

function showYear(i){
  var yr = YEARS[i];
  Array.prototype.forEach.call(railEl.children, function(b, j){
    b.classList.toggle('on', j===i);
    b.classList.toggle('done', j<i);
    b.setAttribute('aria-selected', String(j===i));
  });
  activeYear = i;
  layoutRail();
  cardEl.innerHTML = '';
  var head = el('div','yhead');
  head.appendChild(el('span','ybig mono', yr.y));
  head.appendChild(el('h3', null, yr.title));
  cardEl.appendChild(head);
  cardEl.appendChild(el('p','ysum', yr.sum));
  var wrapEv = el('div','events');
  yr.events.forEach(function(ev){
    var b = el('button', 'ev' + (ev.go ? '' : ' static'));
    b.type='button';
    b.appendChild(el('span','tick'));
    var t = el('span','txt'); t.appendChild(document.createTextNode(ev.t));
    t.appendChild(el('small', null, ev.s));
    b.appendChild(t);
    b.appendChild(el('span','go', ev.go ? 'Read more →' : ''));
    if(ev.go){
      b.addEventListener('click', function(){
        setFilter('all');
        select(ev.go, true);
        byId('work').scrollIntoView({behavior: reduce ? 'auto':'smooth', block:'start'});
      });
    } else {
      b.disabled = true;
    }
    wrapEv.appendChild(b);
  });
  cardEl.appendChild(wrapEv);
  cardEl.classList.remove('fadein');
  void cardEl.offsetWidth;
  cardEl.classList.add('fadein');
}

function centerOf(n){ return n.offsetLeft + n.offsetWidth/2; }
function layoutRail(){
  var nodes = railEl.children;
  if(nodes.length < 2) return;
  var l = centerOf(nodes[0]), r = centerOf(nodes[nodes.length-1]);
  lineEl.style.left = l + 'px';
  lineEl.style.right = (railEl.offsetWidth - r) + 'px';
  fillEl.style.left = l + 'px';
  fillEl.style.width = Math.max(0, centerOf(nodes[activeYear]) - l) + 'px';
}
window.addEventListener('resize', layoutRail);

/* ---------------- awards ---------------- */
var awEl = byId('awards');
AWARDS.forEach(function(a){
  var box = el('div','aw');
  var btn = el('button');
  btn.type='button';
  btn.setAttribute('aria-expanded','false');
  btn.appendChild(el('span','y mono', a.y));
  btn.appendChild(el('span','t', a.t));
  btn.appendChild(el('span','plus','+'));
  var body = el('div','body');
  var inner = el('div');
  inner.appendChild(el('p', null, a.d));
  if(a.img && IMG[a.img]){
    var ai = el('img'); ai.src = IMG[a.img]; ai.alt = a.t; ai.loading='lazy';
    inner.appendChild(ai);
  }
  body.appendChild(inner);
  btn.addEventListener('click', function(){
    var open = box.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  box.appendChild(btn); box.appendChild(body);
  awEl.appendChild(box);
});

/* ---------------- flip cards ---------------- */
var bEl = byId('factGrid');
FACTS.forEach(function(f){
  var card = el('button','flip');
  card.type='button';
  card.setAttribute('aria-expanded','false');
  var inner = el('div','flip-in');
  var front = el('div','face front');
  front.appendChild(el('span','sub', f.k));
  front.appendChild(el('h4', null, f.h));
  front.appendChild(el('span','turn','click to flip'));
  var back = el('div','face back');
  back.appendChild(el('span','sub', f.k));
  back.appendChild(el('p', null, f.p));
  back.appendChild(el('span','turn','click to flip back'));
  inner.appendChild(front); inner.appendChild(back);
  card.appendChild(inner);
  card.addEventListener('click', function(){
    var on = card.classList.toggle('on');
    card.setAttribute('aria-expanded', String(on));
  });
  bEl.appendChild(card);
});

/* ---------------- nav highlight ---------------- */
if('IntersectionObserver' in window){
  var links = Array.prototype.slice.call(document.querySelectorAll('#jump a'));
  var secs = links.map(function(a){ return document.querySelector(a.getAttribute('href')); });
  var no = new IntersectionObserver(function(en){
    en.forEach(function(e){
      if(e.isIntersecting){
        var i = secs.indexOf(e.target);
        links.forEach(function(a,j){ a.classList.toggle('on', i===j); });
      }
    });
  }, {rootMargin:'-25% 0px -65% 0px'});
  secs.forEach(function(s){ if(s) no.observe(s); });
}

/* ---------------- init ---------------- */
showYear(0);
select('piano', true);
})();
