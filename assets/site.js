(function(){
  try{ var th = localStorage.getItem('appindex.theme'); if(th === 'dark') document.documentElement.dataset.theme = 'dark'; }catch(e){}
  var LOGO = 'data:image/png;base64,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';
  var DATA = window.APP_DATA || { apps: [] };
  var BUILD_ID = '20261124-1335';
  try{ if(DATA.site && DATA.site.title) document.title = DATA.site.title; }catch(e){}
  function isLive(a){
    if(!a) return false;
    if(a.offline) return false;
    if(a.expireAt){
      var end = new Date(String(a.expireAt) + 'T23:59:59');
      if(!isNaN(end.getTime()) && Date.now() > end.getTime()) return false;
    }
    return true;
  }
  var ALL = (DATA.apps || []).filter(function(a){ return a && a.name && isLive(a); });
  var COLOR = { '游戏':'#2b6e37', '应用':'#2f5fbf', '软件':'#15489c', '插件':'#5b3aa8', '其他':'#3a3a3c', '未分类':'#3a3a3c' };
  var state = { tab:'today', screen:'home', listTitle:'', detail:null, q:'', sort:'default' };

  function catOf(a){ return a.category || '未分类'; }

  /* 从图标提取主色，作为卡片底色（失败则回退分类色） */
  var ICON_BG = {}, ICON_BUSY = {};
  function colorFromIcon(a){
    if(!a || !a.icon) return null;
    if(ICON_BG[a.id]) return ICON_BG[a.id];
    if(ICON_BUSY[a.id]) return null;
    ICON_BUSY[a.id] = true;

    function paint(src, isRetry){
      var img = new Image();
      img.onload = function(){
        try{
          var cv = document.createElement('canvas');
          cv.width = 24; cv.height = 24;
          var x = cv.getContext('2d');
          x.drawImage(img, 0, 0, 24, 24);
          var d = x.getImageData(0, 0, 24, 24).data;

          // 统计所有不透明像素的颜色桶，取「出现次数最多」的那个
          var bucket = {}, list = [];
          for(var i = 0; i < d.length; i += 4){
            if(d[i + 3] < 140) continue;
            var r = d[i], g = d[i + 1], b = d[i + 2];
            var key = (r >> 4) + ',' + (g >> 4) + ',' + (b >> 4);
            if(!bucket[key]) bucket[key] = { n: 0, r: 0, g: 0, b: 0 };
            bucket[key].n++; bucket[key].r += r; bucket[key].g += g; bucket[key].b += b;
          }
          for(var k in bucket){
            var o = bucket[k];
            var R = o.r / o.n, G = o.g / o.n, B = o.b / o.n;
            // 亮度：0 黑 → 1 白
            var lum = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
            var mx = Math.max(R, G, B), mn = Math.min(R, G, B);
            var sat = mx === 0 ? 0 : (mx - mn) / mx;
            list.push({ n: o.n, r: R, g: G, b: B, lum: lum, sat: sat });
          }
          list.sort(function(p1, p2){ return p2.n - p1.n; });

          ICON_BUSY[a.id] = false;
          if(!list.length) return;

          // 从最多的开始找：太黑/太白/太灰的都跳过，取第一个能用的
          var pick = null;
          for(var j = 0; j < list.length; j++){
            var c = list[j];
            if(c.lum < 0.12 || c.lum > 0.9) continue;   // 太黑 / 太白
            if(c.sat < 0.12) continue;                  // 太灰
            pick = c; break;
          }
          if(!pick){
            // 整张图都是黑白灰 → 用最深/最浅之外的那个最多次要色
            for(var m = 0; m < list.length; m++){
              if(list[m].lum >= 0.12 && list[m].lum <= 0.9){ pick = list[m]; break; }
            }
          }
          if(!pick) pick = list[0];

          // 稍微压暗一点，保证白字可读
          var f = 0.84;
          ICON_BG[a.id] = 'rgb(' + Math.round(pick.r * f) + ',' + Math.round(pick.g * f) + ',' + Math.round(pick.b * f) + ')';

          if(!colorFromIcon._t){
            colorFromIcon._t = setTimeout(function(){ colorFromIcon._t = null; try{ render(); }catch(e){} }, 60);
          }
        }catch(e){
          if(isRetry){ ICON_BUSY[a.id] = false; return; }
          fetch(src).then(function(r){ return r.blob(); }).then(function(bl){
            paint(URL.createObjectURL(bl), true);
          }).catch(function(){ ICON_BUSY[a.id] = false; });
        }
      };
      img.onerror = function(){ ICON_BUSY[a.id] = false; };
      img.src = src;
    }

    paint(fixPath(a.icon), false);
    return null;
  }

  function color(a){
    var ic = colorFromIcon(a);
    if(ic) return ic;
    var c = COLOR[catOf(a)];
    if(c) return c;
    var PAL = ['#2f5fbf', '#5b3aa8', '#2b6e37', '#b0462f', '#1f7a8c', '#7a4b1f'];
    var h = 0, nm = String(a.name || '');
    for(var i = 0; i < nm.length; i++) h = (h * 31 + nm.charCodeAt(i)) % 997;
    return PAL[h % PAL.length];
  }
  function sub(a){
    var t = (a.description || '').replace(/\s+/g,' ').trim();
    return t ? t.slice(0, 48) : ((a.platform || '') + (a.size ? ' · ' + a.size : ''));
  }
  function fixPath(u){ if(!u) return ''; if(/^https?:|^data:/.test(u)) return u; return u.replace(/^\/+/, ''); }
  window.fp = fixPath;
  function iconHTML(a){
    if(a.icon) return '<img src="' + fixPath(a.icon) + '" alt="">';
    return '<span>' + (a.iconText || a.name || '?').slice(0,2) + '</span>';
  }
  function bgLayer(a){
    var shot = (a.shots && a.shots.length) ? a.shots[0] : null;
    if(shot){
      var u = fixPath(shot);
      return '<div class="bg" style="background-image:url(\'' + u + '\')"></div>' +
             '<img class="shotlb" src="' + u + '" alt="" draggable="false">' +
             '<div class="veil soft"></div>';
    }
    if(!a.icon) return '<div class="veil"></div>';
    return '<div class="bg" style="background-image:url(\'' + fixPath(a.icon) + '\')"></div><div class="veil"></div>';
  }

  function color(a){
    var ic = colorFromIcon(a);
    if(ic) return ic;
    var c = COLOR[catOf(a)];
    if(c) return c;
    var PAL = ['#2f5fbf', '#5b3aa8', '#2b6e37', '#b0462f', '#1f7a8c', '#7a4b1f'];
    var h = 0, nm = String(a.name || '');
    for(var i = 0; i < nm.length; i++) h = (h * 31 + nm.charCodeAt(i)) % 997;
    return PAL[h % PAL.length];
  }
  function sub(a){
    var t = (a.description || '').replace(/\s+/g,' ').trim();
    return t ? t.slice(0, 48) : ((a.platform || '') + (a.size ? ' · ' + a.size : ''));
  }
  function fixPath(u){ if(!u) return ''; if(/^https?:|^data:/.test(u)) return u; return u.replace(/^\/+/, ''); }
  window.fp = fixPath;
  function iconHTML(a){
    if(a.icon) return '<img src="' + fixPath(a.icon) + '" alt="">';
    return '<span>' + (a.iconText || a.name || '?').slice(0,2) + '</span>';
  }
  
  function sizeNum(s){ var m = String(s||'').match(/[\d.]+/); return m ? m[0] : '—'; }
  function sizeUnit(s){ var m = String(s||'').match(/[a-zA-Z]+/); return m ? m[0].toUpperCase() : ''; }
  function ago(v){
    var t = Date.parse(String(v || '').replace(' ', 'T'));
    if(!t) return '';
    var d = Date.now() - t;
    if(d < 0) d = 0;
    var m = Math.floor(d / 60000), hh = Math.floor(m / 60), dd = Math.floor(hh / 24), ww = Math.floor(dd / 7);
    if(m < 1) return '刚刚';
    if(m < 60) return m + ' 分钟前';
    if(hh < 24) return hh + ' 小时前';
    if(dd < 7) return dd + ' 天前';
    if(ww < 5) return ww + ' 周前';
    return fmtDay(v).slice(0, 10);
  }
  function fmtDay(v){
    var s = String(v || '').trim();
    if(!s) return '—';
    return s.replace('T',' ').slice(0,16);
  }
  function latest(a){ return String(a.updatedAt || a.addedAt || a.date || ''); }
  function todayKey(){
    var d = new Date(), p = function(n){ return ('0'+n).slice(-2); };
    return d.getFullYear() + '-' + p(d.getMonth()+1) + '-' + p(d.getDate());
  }
  function listFor(tab){
    if(tab === 'games') return ALL.filter(function(a){ return catOf(a) === '游戏'; });
    if(tab === 'apps')  return ALL.filter(function(a){ return catOf(a) !== '游戏'; });
    if(tab === 'today'){
      var t = todayKey();
      return ALL.filter(function(a){ return latest(a).slice(0,10) === t; })
        .sort(function(x, y){ return String(latest(y)).localeCompare(String(latest(x))); });
    }
    return ALL;
  }

  /* ---------- 头部 ---------- */
  function renderHead(){
    var box = document.getElementById('head');
    if(state.screen === 'home'){
      var t = state.tab === 'today' ? 'Today' : (state.tab === 'games' ? '游戏' : (state.tab === 'apps' ? 'App' : '搜索'));
      box.innerHTML =
        '<h1>' + t + '</h1>' +
        '<div class="avatar" id="avabtn" role="button" aria-label="设置"><img src="' + LOGO + '" alt=""></div>' +
        '<div class="menu" id="menu">' +
          '<button class="mi" data-act="theme">' +
            '<svg class="ic" viewBox="0 0 24 24"><path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z"/></svg>' +
            '<span>暗黑模式</span><span class="sw' + (document.documentElement.dataset.theme === 'dark' ? ' on' : '') + '"></span>' +
          '</button>' +
          '<button class="mi" data-act="share">' +
            '<svg class="ic" viewBox="0 0 24 24"><path d="M12 3.5v10"/><path d="m8.5 7 3.5-3.5L15.5 7"/><path d="M6 11.5V19a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19v-7.5"/></svg>' +
            '<span>分享给朋友</span></button>' +
          '<button class="mi" data-act="help">' +
            '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .9-1 1.6v.4"/></svg>' +
            '<span>使用说明</span></button>' +
        '</div>';
      return;
    }
    var label = state.screen === 'help' ? '使用说明' : (state.tab === 'games' ? '游戏' : (state.tab === 'apps' ? 'App' : (state.tab === 'today' ? 'Today' : '搜索')));
    box.innerHTML = '<button class="back" data-act="back">' +
      '<svg viewBox="0 0 24 24"><path d="m14.5 6-6 6 6 6"/></svg>' + label + '</button>' +
      '<div class="avatar" id="avabtn2" role="button" aria-label="设置"><img src="' + LOGO + '" alt=""></div>' +
      '<div class="menu" id="menu">' +
          '<button class="mi" data-act="theme"><svg class="ic" viewBox="0 0 24 24"><path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z"/></svg>' +
            '<span>暗黑模式</span><span class="sw' + (document.documentElement.dataset.theme === 'dark' ? ' on' : '') + '"></span></button>' +
          '<button class="mi" data-act="share"><svg class="ic" viewBox="0 0 24 24"><path d="M12 3.5v10"/><path d="m8.5 7 3.5-3.5L15.5 7"/><path d="M6 11.5V19a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19v-7.5"/></svg><span>分享给朋友</span></button>' +
          '<button class="mi" data-act="help"><svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .9-1 1.6v.4"/></svg><span>使用说明</span></button>' +
        '</div>';
  }

  /* ---------- 卡片 ---------- */
  function todayCard(a){
    return '<div class="card" data-open="' + a.id + '" style="background:' + color(a) + '">' +
      '<div class="art">' + bgLayer(a) +
        ((a.shots && a.shots.length) ? '' : iconHTML(a)) +
      '</div>' +
      '<div class="txt"><div class="kick">' + catOf(a) + '</div>' +
        '<h2>' + a.name + '</h2><p>' + (a.note || '') + '</p>' +
        '<div class="foot"><div class="ic">' + iconHTML(a) + '</div>' +
          '<div class="m"><b>' + a.name + '</b><span>' + (a.version ? 'v' + a.version : sub(a)) + '</span></div>' +
          '<button class="get" data-dl="' + dlState(a) + '">' + dlLabel(a) + '</button></div>' +
      '</div></div>';
  }
  function featBlock(a){
    return '<div class="feat" data-open="' + a.id + '">' +
      '<div class="kick">' + (state.tab === 'games' ? '本周热玩' : '现已推出') + '</div>' +
      '<h2>' + a.name + '</h2><p class="sub1">' + (a.note || '') + '</p>' +
      '<div class="visual" style="background:' + color(a) + '">' + bgLayer(a) +
        iconHTML(a).replace('<img ', '<img class="big" ').replace('<span>', '<span class="big">') +
        '<div class="overlay"><div class="ic">' + iconHTML(a) + '</div>' +
          '<div class="m"><b>' + a.name + '</b><span>' + (a.note || '') + '</span></div>' +
          '<button class="get" data-dl="' + dlState(a) + '">' + dlLabel(a) + '</button></div>' +
      '</div></div>';
  }
  var QKEY = 'appindex.qlog';
  function qLog(){
    try{ return JSON.parse(localStorage.getItem(QKEY) || '{}'); }catch(e){ return {}; }
  }
  function qAdd(w){
    w = String(w || '').trim();
    if(w.length < 1) return;
    var o = qLog();
    o[w] = (o[w] || 0) + 1;
    try{ localStorage.setItem(QKEY, JSON.stringify(o)); }catch(e){}
  }
  function qTop(n){
    var o = qLog();
    var arr = Object.keys(o).sort(function(x, y){ return o[y] - o[x]; });
    return arr.slice(0, n);
  }
  function exploreWords(n){
    var t = qTop(n);
    if(t.length >= n) return t.slice(0, n);
    // 不够就用分类名 + 应用名补
    var cats = {};
    ALL.forEach(function(a){ cats[catOf(a)] = (cats[catOf(a)] || 0) + 1; });
    var rest = Object.keys(cats).sort(function(x, y){ return cats[y] - cats[x]; });
    t.forEach(function(w){ rest = rest.filter(function(r){ return r !== w; }); });
    var out = t.concat(rest).slice(0, n);
    if(out.length < n){
      ALL.slice().sort(function(x, y){ return String(latest(y)).localeCompare(String(latest(x))); })
        .forEach(function(a){
          if(out.length < n && out.indexOf(a.name) === -1) out.push(a.name);
        });
    }
    return out;
  }

  var DLKEY = 'appindex.dl';
  function dlAll(){
    try{ return JSON.parse(localStorage.getItem(DLKEY) || '{}'); }catch(e){ return {}; }
  }
  function dlGet(id){ return dlAll()[id] || null; }
  function dlSet(id, ver){
    var o = dlAll(); o[id] = String(ver || '');
    try{ localStorage.setItem(DLKEY, JSON.stringify(o)); }catch(e){}
  }
  function dlState(a){
    var rec = dlGet(a.id);
    if(rec === null) return 'get';
    return String(rec) === String(a.version || '') ? 'got' : 'update';
  }
  function dlLabel(a){
    var st = dlState(a);
    return st === 'got' ? '已获取' : (st === 'update' ? '更新' : '获取');
  }
  function dlUpdates(){
    var o = dlAll(), out = [];
    ALL.forEach(function(a){
      var rec = o[a.id];
      if(rec === undefined) return;
      if(String(rec) !== String(a.version || '')) out.push({ app: a, from: rec });
    });
    return out;
  }
  function dlCount(){ try { return dlUpdates().length; } catch(e){ return 0; } }
  window.__BUILD = BUILD_ID;
  var NICKKEY = 'appindex.nick';
  function getNick(){ try{ return localStorage.getItem(NICKKEY) || ''; }catch(e){ return ''; } }
  function setNick(v){ try{ localStorage.setItem(NICKKEY, String(v || '').slice(0, 16)); }catch(e){} }
  function makeCode(){
    var items = {};
    var all = dlAll();
    Object.keys(all).forEach(function(id){
      var r = all[id];
      items[id] = (typeof r === 'string') ? { v: r } : { v: r.v, at: r.at || null };
    });
    var payload = { n: getNick(), t: Date.now(), items: items };
    var b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    return b64.replace(/=+$/, '');
  }
  function readCode(code){
    var clean = String(code || '').replace(/\s+/g, '');
    var pad = clean.length % 4 ? '='.repeat(4 - clean.length % 4) : '';
    var json = decodeURIComponent(escape(atob(clean + pad)));
    var obj = JSON.parse(json);
    if(!obj || typeof obj !== 'object' || !obj.items) throw new Error('码无效');
    return obj;
  }
  function applyCode(code){
    var obj = readCode(code);
    var all = dlAll();
    Object.keys(obj.items).forEach(function(id){
      var it = obj.items[id] || {};
      all[id] = { v: String(it.v || ''), at: it.at || new Date().toISOString() };
    });
    try{ localStorage.setItem(DLKEY, JSON.stringify(all)); }catch(e){}
    if(obj.n) setNick(obj.n);
    return Object.keys(obj.items).length;
  }
  window.__ME = { nick: getNick, setNick: setNick, makeCode: makeCode, applyCode: applyCode };

    window.__shotFail = function(img){
    var item = img.closest('.shotitem');
    if(item){ var bg = item.querySelector('.shotbg'); if(bg) bg.style.backgroundImage = 'none'; item.classList.add('shotdead'); }
    var wrap = img.closest('.shots');
    if(!wrap) return;
    setTimeout(function(){
      if(wrap.querySelector('.shotitem:not(.shotdead)')) return;
      var a = state.detail; if(!a) return;
      var holder = document.createElement('div');
      holder.className = 'dshot';
      holder.innerHTML = bgLayer(a) + (a.icon ? '<img src="' + fixPath(a.icon) + '" alt="">' : '<span class="tile">' + (a.iconText || a.name || '?').slice(0,2) + '</span>');
      if(wrap.parentNode) wrap.parentNode.replaceChild(holder, wrap);
    }, 80);
  };

window.__DL = { updates: dlUpdates, set: dlSet, get: dlGet, state: dlState, label: dlLabel, all: dlAll };
  window.gotoHelp = function(){
    state.screen = 'help'; state.listTitle = '使用说明';
    render(); window.scrollTo(0, 0);
  };
  window.APP_NAV = {
    help: function(){
      state.screen = 'help'; state.listTitle = '使用说明';
      render(); window.scrollTo(0, 0);
    },
    detail: function(a){
      if(!a) return;
      state.detail = a; state.screen = 'detail'; state.listTitle = '账户';
      render(); window.scrollTo(0, 0);
    }
  };

  function clearLockIfIdle(){
    var g = document.getElementById('gate2');
    var p = document.querySelector('.spnl');
    var openPanel = p && p.classList.contains('on');
    if(!g && !openPanel) document.documentElement.classList.remove('locked');
  }
  window.clearLockIfIdle = clearLockIfIdle;

  function paintBadge(){
    var n = 0;
    try { n = (window.__DL ? window.__DL.updates().length : 0); } catch(e){ n = 0; }
    document.querySelectorAll('.avatar').forEach(function(av){
      var b = av.querySelector('.badge');
      if(!n){ if(b) b.remove(); return; }
      if(!b){
        b = document.createElement('span');
        b.className = 'badge';
        av.appendChild(b);
      }
      b.textContent = n > 99 ? '99+' : n;
    });
  }
  window.paintBadge = paintBadge;

  function row(a){
    return '<div class="row" data-open="' + a.id + '"><div class="ic">' + iconHTML(a) + '</div>' +
      '<div class="tx' + (a.note ? ' has-note' : '') + '">' +
        '<div class="l1">' + a.name + '</div>' +
        (a.note ? '<div class="l2">' + a.note + '</div>' : '') +
      '</div>' +
      '<button class="btn" data-dl="' + dlState(a) + '">' + dlLabel(a) + '</button></div>';
  }

  /* ---------- 三个页面 ---------- */
  function renderHome(){
    if(state.tab === 'today' && !listFor('today').length){
      document.getElementById('stage').innerHTML =
        '<div class="empty" style="padding:120px 0;text-align:center;color:var(--sub);font-size:15px">今日暂无更新</div>';
      var tbE = document.querySelector('.tabbar'); if(tbE) tbE.classList.add('ready');
      return;
    }
    var stage = document.getElementById('stage');
    var list = listFor(state.tab);

    if(state.tab === 'today'){
      stage.innerHTML = list.length
        ? list.map(todayCard).join('')
        : '<div class="empty">今天还没有更新</div>';
      return;
    }
    if(state.tab === 'search'){
      if(!String(state.q || '').trim() && !state.catf){
        var words;
        try { words = exploreWords(6); } catch(e){ words = []; }
        if(!words || !words.length) words = ['游戏', 'App', '插件'];
        var rec = ALL.slice().sort(function(x, y){ return String(latest(y)).localeCompare(String(latest(x))); }).slice(0, 6);
        stage.innerHTML =
          '<div class="searchwrap"><div class="searchbar"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.6"/><path d="m15.8 15.8 4.6 4.6"/></svg>' +
          '<input id="q" placeholder="游戏、App、关键词" value="">' +
          '<button class="sclear" type="button" data-clear hidden><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
          '</div><button class="scancel" type="button" data-cancel>取消</button></div>' +
          '<div class="sect"><h3>探索更多</h3></div>' +
          '<div class="explore">' + words.map(function(w, i){
            return '<button class="exrow' + (i % 2 ? ' r' : '') + '" data-word="' + w.replace(/"/g, '') + '">' +
              '<svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.6"/><path d="m15.8 15.8 4.6 4.6"/></svg>' +
              '<span>' + w + '</span></button>';
          }).join('') + '</div>' +
          '<div class="sect"><h3>为你推荐</h3></div>' +
          '<div class="list">' + rec.map(row).join('') + '</div>';
        var inp0 = document.getElementById('q');
        (function(){
          var c0 = document.querySelector('.scancel');
          if(c0 && inp0){
            c0.onmousedown = function(ev){ ev.preventDefault(); };
            c0.onclick = function(ev){
              ev.preventDefault(); ev.stopPropagation();
              inp0.blur();
              state.q = '';
              render();
            };
          }
          var x0 = document.querySelector('.sclear');
          if(x0 && inp0){
            x0.onmousedown = function(ev){ ev.preventDefault(); };
            x0.onclick = function(ev){
              ev.preventDefault(); ev.stopPropagation();
              inp0.value = ''; state.q = ''; x0.hidden = true; inp0.focus();
            };
          }
        })();
        var wrap0 = inp0 ? inp0.closest('.searchwrap') : null;
        if(inp0){
          inp0.addEventListener('focus', function(){ if(wrap0) wrap0.classList.add('focus'); });
          inp0.addEventListener('blur', function(){ if(wrap0) wrap0.classList.remove('focus'); });
        }
        inp0.addEventListener('input', function(){
          state.q = this.value;
          var clr = document.querySelector('.sclear'); if(clr) clr.hidden = !this.value;
          if(this.value.trim()) qAdd(this.value.trim());
          render();
          var el = document.getElementById('q');
          if(el){ el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
        });
        return;
      }
      if(state.catf){
        var cf = state.catf;
        var cl = ALL.filter(function(x){
          return cf === '应用' ? catOf(x) !== '游戏' : catOf(x) === cf;
        });
        stage.innerHTML =
          '<div class="searchwrap"><div class="searchbar"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.6"/><path d="m15.8 15.8 4.6 4.6"/></svg>' +
            '<input id="q" placeholder="' + cf + '" value="">' +
          '</div></div>' +
          '<p class="sectsub">' + cl.length + ' 个' + cf + '</p>' +
          '<div class="list">' + cl.map(row).join('') + '</div>' +
          '<div class="sect"><button class="more" data-clearcat="1" style="color:var(--blue);background:none;border:0;font-size:15px">显示全部</button></div>';
        var qc = document.getElementById('q');
        if(qc) qc.addEventListener('input', function(){
          state.catf = ''; state.q = this.value; render();
        });
        return;
      }
      stage.innerHTML =
        '<div class="searchwrap"><div class="searchbar"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.6"/><path d="m15.8 15.8 4.6 4.6"/></svg>' +
        '<input id="q" placeholder="游戏、App、关键词" value="' + state.q.replace(/"/g, '') + '">' +
        '<button class="sclear" type="button" data-clear><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
        '</div><button class="scancel" type="button" data-cancel>取消</button></div>' +
        '<p class="sectsub" id="srcount">' + (list.length ? list.length + ' 个应用' : '没有匹配的应用') + '</p>' +
        '<div class="list" id="srlist">' + list.map(row).join('') + '</div>' + (list.length ? '' : '<div class="empty" id="srempty">换个词试试</div>');
      var inp = document.getElementById('q');
      var wrap1 = inp ? inp.closest('.searchwrap') : null;
      var cancelBtn = document.querySelector('.scancel');
      if(cancelBtn && inp){
        var exitInput = function(ev){
          if(ev){ ev.stopPropagation(); }
          try{ inp.blur(); }catch(e){}
          state.q = ''; state.catf = '';      // 退出搜索
          render();                        // 回到探索页
          // iOS 有时会在重绘后再把焦点塞回输入框，这里多次兜底清除
          [0, 60, 160, 320].forEach(function(t){
            setTimeout(function(){
              var w = document.querySelector('.searchwrap'); if(w) w.classList.remove('focus');
              var q = document.getElementById('q');
              if(q && document.activeElement === q) q.blur();
            }, t);
          });
        };
        cancelBtn.addEventListener('pointerdown', exitInput, true);
        cancelBtn.addEventListener('click', exitInput, true);
      }
      var clrBtn = document.querySelector('.sclear');
      if(clrBtn && inp){
        clrBtn.onmousedown = function(ev){ ev.preventDefault(); };
        clrBtn.onclick = function(ev){
          ev.preventDefault(); ev.stopPropagation();
          inp.value = ''; state.q = '';
          var c2 = document.querySelector('.sclear'); if(c2) c2.hidden = true;
          render();
          var q9 = document.getElementById('q'); if(q9) q9.focus();
        };
      }
      if(inp){
        inp.addEventListener('focus', function(){ if(wrap1) wrap1.classList.add('focus'); });
        inp.addEventListener('blur', function(){ if(wrap1) wrap1.classList.remove('focus'); });
      }
      inp.addEventListener('input', function(){
        state.q = this.value;
        var v = this.value.trim().toLowerCase();
        var r = v ? ALL.filter(function(x){
          return (x.name + ' ' + (x.description || '') + ' ' + (x.version || '') + ' ' + catOf(x) + ' ' + (x.note || '')).toLowerCase().indexOf(v) > -1;
        }) : ALL;
        var box = document.getElementById('srlist');
        var cnt = document.getElementById('srcount');
        if(cnt) cnt.textContent = r.length ? r.length + ' 个应用' : '没有匹配的应用';
        if(box) box.innerHTML = r.map(row).join('');
      });
      return;
    }

    /* ---------- 游戏 / App 首页：顶部置顶精选 + 最近 10 款 ---------- */
    var pinned = list.filter(function(a){ return a.pinned; });
    var feats = pinned.length ? pinned : list.slice(0, 1);
    var rest = list.filter(function(a){ return feats.indexOf(a) === -1; }).slice(0, 10);
    var secTitle = state.tab === 'games' ? (list.length + ' 款近期佳作') : (list.length + ' 款大家都在用');
    stage.innerHTML =
      '<div class="hscroll">' + feats.map(featBlock).join('') + '</div>' +
      '<div class="sect"><h3>' + secTitle + '</h3>' +
        '<button class="more" data-act="all">查看全部</button></div>' +
      '<p class="sectsub">向下滑动 查看更多</p>' +
      '<div class="list">' + rest.map(row).join('') + '</div>';
    setTimeout(function(){
      fitCards();
      // 直接绑定「查看全部」，不依赖事件委托
      var moreBtn = document.querySelector('.sect .more[data-act="all"]');
      if(moreBtn && !moreBtn._bound){
        moreBtn._bound = true;
        moreBtn.addEventListener('click', function(ev){
          ev.preventDefault(); ev.stopPropagation();
          state.screen = 'list';
          state.q = ''; state.catf = '';
          state.listTitle = state.tab === 'games' ? '游戏' : (state.tab === 'apps' ? 'App' : 'Today');
          render(); window.scrollTo(0, 0);
        });
      }
    }, 0);
  }

  var PY_PAIRS = [['阿','A'],['八','B'],['擦','C'],['搭','D'],['蛾','E'],['发','F'],['噶','G'],['哈','H'],
    ['击','J'],['喀','K'],['拉','L'],['妈','M'],['拿','N'],['哦','O'],['啪','P'],['期','Q'],['然','R'],['撒','S'],
    ['塌','T'],['挖','W'],['昔','X'],['压','Y'],['匝','Z']];
  var PY_COL = null;
  try { PY_COL = new Intl.Collator('zh-Hans-CN', { sensitivity: 'base' }); } catch(e){}
  function nameMeta(str){
    var t = String(str || '').trim();
    var ch = t ? Array.from(t)[0] : '';
    var out = { letter: '#', ascii: false, rest: t.toLowerCase() };
    if(!ch) return out;
    if(/[0-9]/.test(ch)){ out.letter = '0'; out.ascii = true; return out; }
    if(/[a-zA-Z]/.test(ch)){ out.letter = ch.toUpperCase(); out.ascii = true; return out; }
    if(!PY_COL) return out;
    for(var i = 0; i < PY_PAIRS.length; i++){
      if(PY_COL.compare(ch, PY_PAIRS[i][0]) >= 0) out.letter = PY_PAIRS[i][1]; else break;
    }
    return out;
  }
  function byName(x, y){
    var a = nameMeta(x.name), b = nameMeta(y.name);
    if(a.letter !== b.letter) return a.letter < b.letter ? -1 : 1;
    if(a.ascii !== b.ascii) return a.ascii ? 1 : -1;
    return a.rest.localeCompare(b.rest, 'zh-Hans-CN', { numeric: true, sensitivity: 'base' });
  }
  function sortItems(items){
    var arr = items.slice();
    if(state.sort === 'name'){
      arr.sort(byName);
    } else if(state.sort === 'date'){
      arr.sort(function(a, b){
        return String(latest(b)).localeCompare(String(latest(a)));
      });
    } else {
      // 收录顺序：按收录时间（addedAt 优先，其次 date），新的在前
      arr.sort(function(a, b){
        var ka = String(a.addedAt || a.date || '');
        var kb = String(b.addedAt || b.date || '');
        return kb.localeCompare(ka);
      });
    }
    return arr;
  }

  function renderHelp(){
    var stage = document.getElementById('stage');
    stage.innerHTML =
      '<div class="helpwrap">' +
        '<div class="helpgroup">' +
          '<div class="helprow"><b>①</b><div>点应用卡片查看详情，点「获取」打开网盘链接。</div></div>' +
          '<div class="helprow"><b>②</b><div>「复制链接」或「复制+提取码」，到夸克 App 里打开即可转存。</div></div>' +
          '<div class="helprow"><b>③</b><div>转存后就能在自己的网盘里下载；链路有有效期，过期等群里补。</div></div>' +
        '</div>' +
        '<div class="helptag">已获取与更新</div>' +
        '<div class="helpgroup">' +
          '<div class="helprow"><b>·</b><div>点过「获取」的应用会记在本机，按钮变成「已获取」。</div></div>' +
          '<div class="helprow"><b>·</b><div>该应用发布新版本后，按钮显示「更新」，账户页也会列出可用更新。</div></div>' +
          '<div class="helprow"><b>·</b><div>记录只存在你自己的浏览器里，换设备或清缓存会清空。</div></div>' +
        '</div>' +
        '<div class="helptag">免责声明</div>' +
        '<div class="helpgroup">' +
          '<div class="helprow"><b>1</b><div>本站所有资源均收集于互联网，仅供学习和研究使用，版权归原作者或原公司所有。</div></div>' +
          '<div class="helprow"><b>2</b><div>用户下载后请于 24 小时内删除，如果觉得资源满意，请务必购买正版支持开发者。</div></div>' +
          '<div class="helprow"><b>3</b><div>本站不承担任何因使用本站资源而产生的法律责任。如有侵权，请联系管理员，我们将第一时间核实并删除。</div></div>' +
          '<div class="helprow"><b>4</b><div>访问本站即视为您同意并接受本免责声明的所有条款。</div></div>' +
        '</div>' +
      '</div>';
  }

  function renderListScreen(){
    var stage = document.getElementById('stage');
    var items = sortItems(listFor(state.tab));
    stage.innerHTML =
      '<div class="segwrap"><div class="seg">' +
        [['default','收录顺序'],['name','名称 A–Z'],['date','最近更新']].map(function(o){
          return '<button class="segbtn' + (state.sort === o[0] ? ' on' : '') + '" data-sort="' + o[0] + '">' + o[1] + '</button>';
        }).join('') +
      '</div></div>' +
      '<div class="list">' + items.map(row).join('') + '</div>';
  }

  function renderDetail(){
    var stage = document.getElementById('stage');
    var a = state.detail;
    if(!a){ stage.innerHTML = ''; return; }
    var plat = a.platform || '—';
    var cat = catOf(a);
    stage.innerHTML =
      '<div class="dtop">' +
        '<div class="iconbox">' + (a.icon ? '<img src="' + fp(a.icon) + '" alt="">' : (a.iconText || a.name).slice(0,2)) + '</div>' +
        '<div style="flex:1;min-width:0">' +
          '<h2>' + a.name + '</h2>' +
          '<p class="dline">' + (a.note || '') + '</p>' +
          '<div class="drow"><button class="dbtn" data-dl="' + dlState(a) + '">' + dlLabel(a) + '</button>' +
            '<span class="dshare" data-act="copypwd"><svg viewBox="0 0 24 24"><path d="M12 3.5v10"/><path d="m8.5 7 3.5-3.5L15.5 7"/><path d="M6 11.5V19a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19v-7.5"/></svg></span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="dstats">' +
        '<div><em>版本</em><b>' + (a.version ? 'v' + a.version : '—') + '</b><small>当前版本</small></div>' +
        '<div><em>平台</em><b>' + String(plat).split('/').map(function(x){return x.trim();}).join('<br>') + '</b><small>系统</small></div>' +
        '<div><em>分类</em><b>' + cat + '</b><small>类别</small></div>' +
        '<div><em>大小</em><b>' + sizeNum(a.size) + '</b><small>' + sizeUnit(a.size) + '</small></div>' +
      '</div>' +
      (a.shots && a.shots.length
        ? '<div class="shots' + (a.shots.length === 1 ? ' single' : '') + '">' + a.shots.map(function(sh){
            return '<div class="shotitem">' +
              '<div class="shotbg" style="background-image:url(' + fixPath(sh) + ')"></div>' +
              '<img src="' + fixPath(sh) + '" alt="" draggable="false" onerror="window.__shotFail&&window.__shotFail(this)">' +
            '</div>';
          }).join('') + '</div>'
        : '<div class="dshot">' + bgLayer(a) +
        (a.icon
          ? '<img src="' + fixPath(a.icon) + '" alt="">'
          : '<span class="tile">' + (a.iconText || a.name || '?').slice(0,2) + '</span>') +
      '</div>') +
      '<div class="ddesc">' + (a.description || '暂无简介') + '</div>' +

      (a.whatsNew ? '<div class="dnew">' +
        '<div class="nt"><h3>新功能</h3><span>' + ago(a.updatedAt || a.addedAt || a.date) + '</span></div>' +
        '<div class="ver">版本 ' + (a.version || '—') + '</div>' +
        '<p>' + String(a.whatsNew).replace(/\n/g, '<br>') + '</p></div>' : '') +
      '<div class="ddev">' +
        '<div class="v"><span class="blue">' + (a.updatedAt ? '更新时间' : '收录时间') + '</span>' +
        '<b>' + fmtDay(a.updatedAt || a.addedAt || a.date) + '</b></div>' +
      '</div>';;
  }

  // 让横滑卡片左右露出完全一致
  function fitCards(){
    return;   // 宽度改由 CSS 控制（桌面/手机各自的百分比），这里不再算像素

    /* eslint-disable */
    // 1) 详情页多图：左对齐 + 右侧露出 12px
    document.querySelectorAll('.shots').forEach(function(sh){
      var n = sh.children.length;
      if(!n) return;
      if(innerWidth >= 900){
        for(var w0 = 0; w0 < n; w0++) sh.children[w0].style.flex = '';
        sh.style.scrollSnapType = '';
        return;
      }
      // 与游戏页精选卡完全一致：左内边距 18、间距 6、右露 12
      // clientWidth 已含左右各 18 内边距 → 可见宽 = clientWidth - 36
      // 多张：可见宽 = 18(左) + W + 6(间距) + 12(右露) → W = clientWidth - 72
      var W2 = sh.clientWidth - 36;   // 左 18 + W + 6 + 右露 12 = clientWidth
      for(var q = 0; q < n; q++) sh.children[q].style.flex = '0 0 ' + W2 + 'px';
      sh.style.scrollSnapType = (n === 1) ? 'none' : '';
      if(!sh.dataset.init){ sh.dataset.init = '1'; sh.scrollLeft = 0; }
    });

    // 2) 首页精选卡
    var hs = document.querySelector('.hscroll');
    if(!hs) return;
    if(innerWidth >= 900){
      for(var k = 0; k < hs.children.length; k++) hs.children[k].style.flex = '';
      return;
    }
    var GAP = 6, PEEK = 12, SIDE = 36;
    var W = (hs.children.length === 1)
      ? hs.clientWidth - SIDE
      : hs.clientWidth - SIDE - GAP - PEEK;
    hs.style.scrollSnapType = (hs.children.length === 1) ? 'none' : '';
    for(var i = 0; i < hs.children.length; i++){
      hs.children[i].style.flex = '0 0 ' + W + 'px';
      hs.children[i].style.borderRadius = '20px';
    }
  }

  window.addEventListener('resize', function(){
    clearTimeout(fitCards._t);
    fitCards._t = setTimeout(fitCards, 120);
  });
  if(window.visualViewport){
    window.visualViewport.addEventListener('resize', function(){
      clearTimeout(fitCards._t);
      fitCards._t = setTimeout(fitCards, 120);
    });
  }

  function render(){
    renderHead();
    // 公告（noticeOnlyToday）只在 Today 展示
    var nb = document.getElementById('notice');
    if(nb){ nb.style.display = (state.tab === 'today' && state.screen === 'home') ? '' : 'none'; }
    if(state.screen === 'home') renderHome();
    else if(state.screen === 'list') renderListScreen();
    else if(state.screen === 'help'){
      renderHelp();
      if(!state._helpShown){
        state._helpShown = true;
        var stg = document.getElementById('stage');
        if(stg){ stg.classList.remove('page-in'); void stg.offsetWidth; stg.classList.add('page-in'); }
      }
    }
    else { renderDetail(); setTimeout(fitCards, 0); }
    document.getElementById('tabbar').style.display = (state.screen === 'help') ? 'none' : '';
    var tb = document.querySelector('.tabbar');
    if(tb) tb.classList.add('ready');
    var hd = document.querySelector('.headdiv');
    if(hd) hd.style.display = (state.screen === 'home') ? '' : 'none';
    if(state.screen === 'home' && (state.tab === 'games' || state.tab === 'apps')) setTimeout(fitCards, 0);
    try{ if(window.paintBadge) window.paintBadge(); }catch(e){}
    try{ if(window.clearLockIfIdle) window.clearLockIfIdle(); }catch(e){}
  }

  /* ---------- 事件 ---------- */
  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-tab]');
    if(t){
      state.tab = t.getAttribute('data-tab');
      state.screen = 'home'; state.q = '';
      document.querySelectorAll('.tab').forEach(function(x){ x.classList.remove('on'); });
      t.classList.add('on');
      render(); window.scrollTo(0,0); return;
    }
    if(e.target.id === 'sheet'){ e.target.classList.remove('open'); return; }

    var av = e.target.closest('#avabtn, #avabtn2');
    if(av){ var m = document.getElementById('menu'); if(m) m.classList.toggle('open'); e.stopPropagation(); return; }
    if(!e.target.closest('#menu')){ var mm = document.getElementById('menu'); if(mm) mm.classList.remove('open'); }

    var act = e.target.closest('[data-act]');
    if(act){
      var a2 = act.getAttribute('data-act');
      if(a2 === 'theme'){
        var dark = document.documentElement.dataset.theme === 'dark';
        document.documentElement.dataset.theme = dark ? '' : 'dark';
        try{ localStorage.setItem('appindex.theme', dark ? 'light' : 'dark'); }catch(err){}
        var sw = act.querySelector('.sw'); if(sw) sw.classList.toggle('on', !dark);
        return;
      }
      if(a2 === 'copypwd'){
        var cur2 = state.detail;
        if(!cur2){ toast('没有可复制的链接'); return; }
        copyText(fullLink(cur2) + (cur2.pwd ? ' 提取码 ' + cur2.pwd : ''), '链接和提取码已复制');
        return;
      }
      if(a2 === 'share'){ if(navigator.share){ navigator.share({ title: document.title, url: location.href }).catch(function(){}); } else { location.href = 'mailto:?body=' + encodeURIComponent(location.href); } return; }
      if(a2 === 'help'){ return; }
      if(a2 === 'closesheet'){ var sh2 = document.getElementById('sheet'); if(sh2) sh2.classList.remove('open'); return; }
      if(a2 === 'all'){
        state.screen = 'list';
        state.q = ''; state.catf = '';
        state.listTitle = state.tab === 'games' ? '游戏' : (state.tab === 'apps' ? 'App' : 'Today');
        render(); window.scrollTo(0, 0);
        return;
      }
      if(a2 === 'back'){
        var wasHelp = state.screen === 'help';
        if(wasHelp){
          state._helpShown = false;
          var stg0 = document.getElementById('stage');
          // 复制当前页作为幽灵层，向右滑出
          if(stg0){
            var r0 = stg0.getBoundingClientRect();
            var ghost = stg0.cloneNode(true);
            ghost.className = 'stage-ghost page-out';
            ghost.style.left = r0.left + 'px';
            ghost.style.top = r0.top + 'px';
            ghost.style.width = r0.width + 'px';
            ghost.style.minHeight = r0.height + 'px';
            document.body.appendChild(ghost);
            setTimeout(function(){ ghost.remove(); }, 300);
          }
          // 底下立刻变成账户页
          state.screen = 'home';
          render(); window.scrollTo(0, 0);
          if(window.openAccountSheet) window.openAccountSheet();
          return;
        }
        state.screen = (state._prevScreen === 'list') ? 'list' : 'home';
        render(); window.scrollTo(0, 0);
        return;
        state.screen = 'home';
        render(); window.scrollTo(0, 0);
        return;
      }
    }

    if(e.target.closest('[data-clear]')){
      state.q = ''; render();
      var q1 = document.getElementById('q'); if(q1) q1.focus();
      return;
    }
    if(e.target.closest('[data-cancel]')){
      state.q = '';
      var wc = document.querySelector('.searchwrap'); if(wc) wc.classList.remove('focus');
      render();
      var q2 = document.getElementById('q'); if(q2) q2.blur();
      return;
    }

    if(e.target.closest('[data-clearcat]')){ state.catf = ''; render(); return; }

    var wd = e.target.closest('[data-word]');
    if(wd){
      var word = wd.getAttribute('data-word');
      qAdd(word);
      var CAT_WORDS = ['游戏', '应用', '插件', '其他'];
      if(CAT_WORDS.indexOf(word) > -1){
        state.catf = word; state.q = '';
        render(); window.scrollTo(0, 0);
        return;
      }
      var hit = ALL.filter(function(x){ return x.name === word; })[0];
      if(hit){
        state.detail = hit; state.screen = 'detail';
        state.listTitle = '搜索';
        render(); window.scrollTo(0, 0);
        return;
      }
      state.q = word; render(); return;
    }

    var s = e.target.closest('[data-sort]');
    if(s){ state.sort = s.getAttribute('data-sort'); render(); return; }

    var b = e.target.closest('[data-act="back"]');
    if(b){ state.screen = 'home'; state.detail = null; render(); window.scrollTo(0,0); return; }

    var all = e.target.closest('[data-act="all"]');
    if(all){
      state.listTitle = state.tab === 'games' ? (listFor('games').length + ' 款近期佳作') : (listFor(state.tab).length + ' 款大家都在用');
      state.screen = 'list'; render(); window.scrollTo(0,0); return;
    }

    // 「获取 / 下载」按钮：直接打开网盘链接
    var gbtn = e.target.closest('.get,.btn,.dbtn');
    if(gbtn){
      e.stopPropagation();
      var host = gbtn.closest('[data-open]');
      var target = null;
      if(host){ target = ALL.filter(function(x){ return x.id === host.getAttribute('data-open'); })[0]; }
      if(!target && state.screen === 'detail') target = state.detail;
      if(target && target.url){
        window.open(fullLink(target), '_blank');
        dlSet(target.id, target.version);
        var lb = dlLabel(target);
        gbtn.textContent = lb;
        gbtn.setAttribute('data-dl', dlState(target)); gbtn.textContent = dlLabel(target);
        try{ if(window.paintBadge) window.paintBadge(); }catch(e){}
      }
      else toast('这条还没有链接');
      return;
    }

    var db = e.target.closest('.dact');
    if(db){
      var kind = db.getAttribute('data-act');
      var cur = state.detail;
      if(!cur) return;
      if(kind === 'open'){ if(cur.url) window.open(fullLink(cur), '_blank'); else toast('这条没有链接'); return; }
      if(kind === 'copy'){ copyText(fullLink(cur), '链接已复制'); return; }
      if(kind === 'copypwd'){ copyText(fullLink(cur) + (cur.pwd ? ' 提取码 ' + cur.pwd : ''), '链接和提取码已复制'); return; }
    }

    var card = e.target.closest('[data-open]');
    var hsw = card ? card.closest('.hscroll, .shots') : null;
    if(hsw && hsw._dragEnd && Date.now() - hsw._dragEnd < 200) return;   // 刚拖过，忽略这次点击
    if(card && !e.target.closest('.btn,.get')){
      var id = card.getAttribute('data-open');
      var app = ALL.filter(function(x){ return x.id === id; })[0];
      if(app){
        state._prevScreen = state.screen; state.detail = app; state.screen = 'detail';
        if(!state.listTitle) state.listTitle = state.tab === 'games' ? '游戏' : (state.tab === 'apps' ? '应用' : 'Today');
        render(); window.scrollTo(0,0);
      }
      return;
    }
  });

  render();
})();

  /* ================= 公共：toast / 复制 / 公告 / 密码门 ================= */
  function toast(msg){
    var t = document.getElementById('toast');
    if(!t) return;
    t.textContent = msg;
    t.classList.add('on');
    clearTimeout(toast._t);
    toast._t = setTimeout(function(){ t.classList.remove('on'); }, 2000);
  }

  window.toast = toast;

  function copyText(text, okMsg){
    var done = function(){ toast(okMsg || '已复制'); };
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(done, function(){ fallback(); });
    } else fallback();
    function fallback(){
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;top:-999px;left:-999px';
      document.body.appendChild(ta);
      ta.select();
      try{ document.execCommand('copy'); done(); }catch(e){ toast('复制失败，请长按选择'); }
      ta.remove();
    }
  }

  function fullLink(a){
    var u = a.url || '';
    if(a.pwd && u.indexOf('pwd=') === -1) u += (u.indexOf('?') > -1 ? '&' : '?') + 'pwd=' + encodeURIComponent(a.pwd);
    return u;
  }

  function sha256hex(str){
    var K = [1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];
    function rotr(x,n){ return (x>>>n)|(x<<(32-n)); }
    var H = [1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];
    var bytes = new TextEncoder().encode(str);
    var l = bytes.length;
    var withOne = new Uint8Array((((l + 9) >> 6) + 1) << 6);
    withOne.set(bytes); withOne[l] = 0x80;
    var dv = new DataView(withOne.buffer);
    dv.setUint32(withOne.length - 4, (l * 8) >>> 0);
    dv.setUint32(withOne.length - 8, Math.floor(l / 536870912));
    var w = new Uint32Array(64);
    for(var i = 0; i < withOne.length; i += 64){
      for(var t = 0; t < 16; t++) w[t] = dv.getUint32(i + t * 4);
      for(t = 16; t < 64; t++){
        var s0 = rotr(w[t-15],7) ^ rotr(w[t-15],18) ^ (w[t-15] >>> 3);
        var s1 = rotr(w[t-2],17) ^ rotr(w[t-2],19) ^ (w[t-2] >>> 10);
        w[t] = (w[t-16] + s0 + w[t-7] + s1) >>> 0;
      }
      var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
      for(t = 0; t < 64; t++){
        var S1 = rotr(e,6) ^ rotr(e,11) ^ rotr(e,25);
        var ch = (e & f) ^ (~e & g);
        var t1 = (h + S1 + ch + K[t] + w[t]) >>> 0;
        var S0 = rotr(a,2) ^ rotr(a,13) ^ rotr(a,22);
        var mj = (a & b) ^ (a & c) ^ (b & c);
        var t2 = (S0 + mj) >>> 0;
        h=g; g=f; f=e; e=(d+t1)>>>0; d=c; c=b; b=a; a=(t1+t2)>>>0;
      }
      H[0]=(H[0]+a)>>>0; H[1]=(H[1]+b)>>>0; H[2]=(H[2]+c)>>>0; H[3]=(H[3]+d)>>>0;
      H[4]=(H[4]+e)>>>0; H[5]=(H[5]+f)>>>0; H[6]=(H[6]+g)>>>0; H[7]=(H[7]+h)>>>0;
    }
    return H.map(function(x){ return ('00000000' + x.toString(16)).slice(-8); }).join('');
  }

  // 公告
  (function renderNotice(){
    var n = (window.APP_DATA && window.APP_DATA.site && window.APP_DATA.site.notice) || null;
    var box = document.getElementById('notice');
    if(!n || n.on === false || !box) return;
    var hasText = !!(n.text && String(n.text).trim());
    if(!(hasText || n.image || n.file)) return;
    if(n.title) box.querySelector('.notice-head b').textContent = n.title;
    if(n.text) document.getElementById('notice-text').textContent = n.text;
    if(n.updated) document.getElementById('notice-time').textContent = '更新于 ' + String(n.updated).replace('T',' ').slice(0,16);
    box.hidden = false;
    box.classList.add('shown');
  })();

  // （旧密码门已停用）



/* ================= 密码门（自建 DOM，iOS 锁屏风） ================= */
(function gateBoot(){
  var SITE = (window.APP_DATA && window.APP_DATA.site) || {};
  var hashes = SITE.passwordHash;
  if(!hashes) return;
  var KEY = 'appindex.unlocked';
  try{ if(sessionStorage.getItem(KEY) === hashes) return; }catch(e){}
  if(document.getElementById('gate2')) return;   // 只建一次

  var LEN = Number(SITE.pwdLen) > 0 ? Math.min(12, Number(SITE.pwdLen)) : 4;
  var val = '';

  var wrap = document.createElement('div');
  wrap.id = 'gate2';
  wrap.className = 'gate2';
  wrap.innerHTML =
    '<div class="g2-in">' +
      '<div class="g2-title">输入密码</div>' +
      '<div class="g2-dots" id="g2dots"></div>' +
      '<div class="g2-err" id="g2err"></div>' +
      '<div class="g2-pad" id="g2pad"></div>' +
      '<div class="g2-foot"><button type="button" id="g2help">获取密码</button></div>' +
    '</div>';
  document.body.appendChild(wrap);

  document.documentElement.classList.add('locked');

  var dots = wrap.querySelector('#g2dots');
  var err = wrap.querySelector('#g2err');
  for(var i = 0; i < LEN; i++) dots.appendChild(document.createElement('i'));

  function paint(){
    var ks = dots.children;
    for(var j = 0; j < ks.length; j++) ks[j].className = j < val.length ? 'on' : '';
  }
  paint();

  function sha(str){
    // 复用页面里的实现
    try { return sha256hex(str); } catch(e){ return ''; }
  }
  var LOCK_KEY = 'appindex.pwlock';
  var LOCK_STEPS = { 3: 60, 4: 300, 5: 900, 6: 3600 };   // 3次=1分钟 4次=5分钟 5次=15分钟 6次以上=1小时
  function lockGet(){ try { return JSON.parse(localStorage.getItem(LOCK_KEY) || '{}'); } catch(e){ return {}; } }
  function lockSet(o){ try { localStorage.setItem(LOCK_KEY, JSON.stringify(o)); } catch(e){} }
  function lockLeft(){ var o = lockGet(); return Math.max(0, Math.round(((o.until || 0) - Date.now()) / 1000)); }
  var lockTimer = null;
  function startCountdown(){
    clearInterval(lockTimer);
    lockTimer = setInterval(function(){
      var l = lockLeft();
      if(l <= 0){ clearInterval(lockTimer); err.textContent = ''; wrap.classList.remove('locked'); return; }
      var m = Math.floor(l / 60), ss = l % 60;
      err.textContent = '密码错误次数过多，请 ' + (m ? m + ' 分 ' + (ss ? ss + ' 秒' : '') : ss + ' 秒') + '后重试';
    }, 1000);
  }
  if(lockLeft() > 0){ wrap.classList.add('locked'); startCountdown(); }

  function check(){
    if(sha(val) === hashes){
      try{ sessionStorage.setItem(KEY, hashes); localStorage.removeItem('appindex.pwlock'); }catch(e){}
      wrap.remove();
      document.documentElement.classList.remove('locked');
      try{ render(); }catch(e){}
    } else {
      err.textContent = '密码错误，请重试';
      val = ''; paint();
    }
  }

  var keys = [['1',''],['2','ABC'],['3','DEF'],['4','GHI'],['5','JKL'],['6','MNO'],['7','PQRS'],['8','TUV'],['9','WXYZ'],['',''],['0',''],['del','']];
  var pad = wrap.querySelector('#g2pad');
  keys.forEach(function(k){
    var b = document.createElement('button');
    b.type = 'button';
    var num = k[0], lab = k[1];
    if(num === ''){ b.className = 'k empty'; }
    else if(num === 'del'){ b.className = 'k del'; b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6H9L3 12l6 6h11a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z"/><path d="m12 9.5 5 5M17 9.5l-5 5"/></svg>'; }
    else { b.className = 'k'; b.innerHTML = '<b>' + num + '</b>' + (lab ? '<i>' + lab + '</i>' : ''); }
    b.onclick = function(){
      if(wrap.classList.contains('locked')) return;
      err.textContent = '';
      if(num === 'del') val = val.slice(0, -1);
      else if(num && val.length < LEN) val += num;
      paint();
      if(val.length === LEN) setTimeout(check, 130);
    };
    pad.appendChild(b);
  });

  wrap.querySelector('#g2help').onclick = function(){
    var st = (window.APP_DATA && window.APP_DATA.site) || {};
    var link = st.qqLink || '';
    var grp  = st.qqGroup || '';
    if(link){ window.open(link, '_blank'); return; }
    if(grp){
      var isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
      window.open(isMobile
        ? 'mqqapi://card/show_pslcard?src_type=internal&version=1&uin=' + grp + '&card_type=group&source=qrcode'
        : 'https://qun.qq.com/', '_blank');
      return;
    }
    err.textContent = '还没配置 QQ 群，请在数据里填 site.qqGroup';
  };
})();

/* ===== 底栏：长按左右滑动切换 ===== */
(function tabbarSwipe(){
  var bar = document.querySelector('.tabbar');
  if(!bar) return;
  var startX = 0, startIdx = 0, dragging = false, timer = null;
  var tabs = function(){ return Array.prototype.slice.call(bar.querySelectorAll('.tab')); };

  function idx(){ return tabs().findIndex(function(t){ return t.classList.contains('on'); }); }
  function pick(i){
    var list = tabs();
    i = Math.max(0, Math.min(list.length - 1, i));
    if(list[i]) list[i].click();
  }

  bar.addEventListener('pointerdown', function(e){
    if(e.pointerType === 'mouse') return;
    startX = e.clientX; startIdx = idx();
    timer = setTimeout(function(){ dragging = true; }, 260);   // 长按 260ms 才进入滑动
  });
  bar.addEventListener('pointermove', function(e){
    if(!dragging) return;
    var dx = e.clientX - startX;
    var step = bar.clientWidth / tabs().length;
    var move = Math.round(dx / step);
    if(move !== 0){
      pick(startIdx - move * -1);
      startIdx = idx(); startX = e.clientX;
    }
  });
  function end(){ clearTimeout(timer); dragging = false; }
  bar.addEventListener('pointerup', end);
  bar.addEventListener('pointercancel', end);
  bar.addEventListener('pointerleave', end);
})();

/* ================= 右上角 logo → 账户抽屉 ================= */
(function accountSheet(){
  var built = false, bg = null, panel = null;

  function fp(u){
    if(!u) return '';
    if(/^(https?:|data:)/.test(u)) return u;
    return String(u).replace(/^\/+/, '');
  }

  function updBlock(){
    var list = [];
    try { list = (window.__DL ? window.__DL.updates() : []); } catch(e){ list = []; }
    if(!list.length) return '';

    function cnDate(v){
      var d = new Date(String(v || '').replace(' ', 'T'));
      if(isNaN(d.getTime())) return '';
      return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
    }

    var rows = list.map(function(o){
      var a = o.app;
      var ic = a.icon
        ? '<img src="' + fp(a.icon) + '" alt="">'
        : '<span class="t">' + (a.iconText || a.name).slice(0, 2) + '</span>';
      var note = String(a.whatsNew || '').replace(/\n/g, ' ');
      return '<div class="updrow">' +
        '<div class="updtop" data-upd="' + a.id + '">' +
          '<div class="uic">' + ic + '</div>' +
          '<div class="utx"><b>' + a.name + '</b><em>' + cnDate(a.updatedAt || a.addedAt || a.date) + '</em></div>' +
          '<span class="ubtn">更新</span>' +
        '</div>' +
        (note ? '<div class="unote"><span>' + note + '</span>' +
          '<button class="umore" data-goto="' + a.id + '">更多</button></div>' : '') +
      '</div>';
    }).join('');

    return '<div class="updwrap">' +
      '<div class="updtag">可用更新</div>' +
      '<div class="updcard">' +
        '<div class="updhead"><button class="uall" data-allupd="1">全部更新</button>' +
          '<span class="ubadge">' + list.length + '</span></div>' +
        rows +
      '</div></div>';
  }

  function build(){
    var st = (window.APP_DATA && window.APP_DATA.site) || {};
    var siteName = st.title || 'IPA&APK';
    var grp = st.qqGroup || '';
    var av = document.querySelector('.avatar img');
    var logo = av ? av.getAttribute('src') : '';
    var syncShort = '';
    try{
      var full = (window.__ME && window.__ME.makeCode) ? window.__ME.makeCode() : '';
      syncShort = full ? (full.slice(0, 10) + '…') : '';
    }catch(e){ syncShort = ''; }

    if(!bg){
      bg = document.createElement('div');
      bg.className = 'sbg';
      bg.onclick = close;
      panel = document.createElement('div');
      panel.className = 'spnl';
      document.body.appendChild(bg);
      document.body.appendChild(panel);
    }
    panel.innerHTML =
      '<div class="shead"><span>账户</span><button type="button" class="sdone">完成</button></div>' +
      '<div class="sbody">' +
        '<div class="sgroup">' +
          '<div class="suser" data-sact="qq">' +
            '<div class="suav">' + (logo ? '<img src="' + logo + '" alt="">' : '') + '</div>' +
            '<div class="suinfo"><b>' + siteName + '</b>' +
              '<span>' + (grp ? grp : '未设置群号') + '</span></div>' +
            '<i class="chev">›</i>' +
          '</div>' +
          '<button class="srow sync" data-sact="sync">' +
            '<span>备份码</span>' +
            '<span class="sright"><em class="scode">' + (syncShort || '点击生成') + '</em><i class="chev">›</i></span>' +
          '</button>' +
        '</div>' +
        '<div class="sgroup">' +
          '<button class="srow" data-sact="theme"><span>暗黑模式</span><span class="sw' + (document.documentElement.dataset.theme === 'dark' ? ' on' : '') + '"></span></button>' +
        '</div>' +
        '<div class="sgroup">' +
          '<button class="srow" data-sact="share"><span>分享给朋友</span><i class="chev">›</i></button>' +
          '<button class="srow" data-sact="restore"><span>恢复记录</span><i class="chev">›</i></button>' +
          '<button class="srow" data-sact="help" onclick="try{window.gotoHelp&&window.gotoHelp();document.documentElement.classList.remove(\'locked\');}catch(e){}"><span>使用说明</span><i class="chev">›</i></button>' +
        '</div>' +
        updBlock() +
        '<div class="sver">IPA&APK · ' + (((window.APP_DATA && window.APP_DATA.site && window.APP_DATA.site.version) || 'V0.1')) + '</div>' +

      '</div>';

    panel.querySelector('.sdone').onclick = close;

    // 「使用说明」直接绑事件，避免委托失效
    var helpRow = panel.querySelector('[data-sact="help"]');
    if(helpRow){
      helpRow.addEventListener('click', function(ev){
        ev.preventDefault(); ev.stopPropagation();
        close();
        if(window.APP_NAV) window.APP_NAV.help();
      }, true);
    }
    panel.addEventListener('click', function(e){
      if(e.target.closest('[data-allupd]')){
        var lst = (window.__DL ? window.__DL.updates() : []);
        lst.forEach(function(o){ if(window.__DL) window.__DL.set(o.app.id, o.app.version); });
        close();
        toast('已全部更新');
        return;
      }
      if(e.target.closest('[data-goto]')){
        var gid = e.target.closest('[data-goto]').getAttribute('data-goto');
        close();
        var ga = (window.APP_DATA.apps || []).filter(function(x){ return x.id === gid; })[0];
        if(ga && window.APP_NAV){ window.APP_NAV.detail(ga); }
        return;
      }

      var up = e.target.closest('[data-upd]');
      if(up){
        var id = up.getAttribute('data-upd');
        var app = (window.APP_DATA.apps || []).filter(function(x){ return x.id === id; })[0];
        if(app && app.url){
          var u = app.url + (app.pwd && app.url.indexOf('pwd=') === -1 ? (app.url.indexOf('?') > -1 ? '&' : '?') + 'pwd=' + app.pwd : '');
          window.open(u, '_blank');
          if(window.__DL) window.__DL.set(app.id, app.version);
          close();
          try{ render(); }catch(e){}          /* 全局按钮同步成「已获取」 */
          try{ if(window.paintBadge) window.paintBadge(); }catch(e){}
        }
        return;
      }

      var row = e.target.closest('[data-sact]');
      if(!row) return;
      var act = row.getAttribute('data-sact');
      if(act === 'theme'){
        var dark = document.documentElement.dataset.theme === 'dark';
        document.documentElement.dataset.theme = dark ? '' : 'dark';
        try{ localStorage.setItem('appindex.theme', dark ? 'light' : 'dark'); }catch(err){}
        var sw = row.querySelector('.sw'); if(sw) sw.classList.toggle('on', !dark);
        return;
      }
      if(act === 'share'){
        if(navigator.share){ navigator.share({ title: document.title, url: location.href }).catch(function(){}); }
        else { try{ copyText(location.href, '链接已复制'); }catch(err){} }
        return;
      }
      if(act === 'help'){
        close();
        if(window.APP_NAV) window.APP_NAV.help();
        return;
      }
      if(act === 'qq'){
        var st2 = (window.APP_DATA && window.APP_DATA.site) || {};
        if(st2.qqLink){ window.open(st2.qqLink, '_blank'); return; }
        if(st2.qqGroup){
          var mob = /iPhone|iPad|Android/i.test(navigator.userAgent);
          window.open(mob ? 'mqqapi://card/show_pslcard?src_type=internal&version=1&uin=' + st2.qqGroup + '&card_type=group&source=qrcode' : 'https://qun.qq.com/', '_blank');
        }
        return;
      }
    });
  }

  function open(){
    build();
    if(panel){
      var old = panel.querySelector('.sbody');
      if(old) old.innerHTML = old.innerHTML; // 保留结构
    }
    document.documentElement.classList.add('locked');
    bg.classList.add('on'); panel.classList.add('on');
  }
  function close(){
    if(!bg || !panel) return;
    bg.classList.remove('on'); panel.classList.remove('on');
    document.documentElement.classList.remove('locked');
  }

  window.openAccountSheet = open;
  document.addEventListener('click', function(e){
    if(e.target.closest('#avabtn, #avabtn2, #avabtn3')){ e.preventDefault(); e.stopPropagation(); open(); }
  }, true);
})();

/* 注册 Service Worker（可添加到主屏 / 离线打开） */
if('serviceWorker' in navigator && location.protocol !== 'file:'){
  window.addEventListener('load', function(){
    navigator.serviceWorker.register('sw.js').catch(function(){});
  });
}

/* 横滑改为原生滚动（更顺滑） */


/* 使用说明：文档级捕获，保证一次点击就跳转 */
document.addEventListener('click', function(e){
  if(!e.target.closest('[data-sact="help"]')) return;
  e.preventDefault(); e.stopPropagation();
  var pl = document.querySelector('.spnl');
  if(pl) pl.classList.remove('on');
  var bg = document.querySelector('.sbg');
  if(bg) bg.classList.remove('on');
  document.documentElement.classList.remove('locked');
  if(window.gotoHelp) window.gotoHelp();
}, true);

/* ================= 昵称 / 同步码 弹层 ================= */
(function meUI(){
  var box = null, bg = null;

  function ensure(){
    if(box) return;
    bg = document.createElement('div');
    bg.className = 'mebg';
    bg.onclick = close;
    box = document.createElement('div');
    box.className = 'mebox';
    document.body.appendChild(bg);
    document.body.appendChild(box);
  }

  function close(){
    if(!box) return;
    bg.classList.remove('on'); box.classList.remove('on');
    document.documentElement.classList.remove('locked');
  }

  function open(mode){
    ensure();
    var ME = window.__ME || {};
    var nick = ME.nick ? ME.nick() : '';

    if(mode === 'nick'){
      box.innerHTML =
        '<h3>修改昵称</h3>' +
        '<input id="me-nick" maxlength="16" placeholder="最多 16 个字" value="' + String(nick).replace(/"/g,'') + '">' +
        '<div class="mefoot"><button class="mebtn ghost" data-me="cancel">取消</button>' +
        '<button class="mebtn" data-me="savenick">保存</button></div>';
    } else if(mode === 'backup'){
      var code = '';
      try{ code = ME.makeCode ? ME.makeCode() : ''; }catch(e){ code = ''; }
      box.innerHTML =
        '<h3>同步码</h3>' +
        '<p class="metip">复制这串码保存好。换设备后在「恢复记录」里粘贴，就能把获取记录和昵称带过去。</p>' +
        '<textarea id="me-code" readonly>' + code + '</textarea>' +
        '<div class="mefoot"><button class="mebtn ghost" data-me="cancel">关闭</button>' +
        '<button class="mebtn" data-me="copycode">复制</button></div>';
    } else {
      box.innerHTML =
        '<h3>恢复记录</h3>' +
        '<p class="metip">粘贴之前备份的同步码，会合并到本机记录。</p>' +
        '<textarea id="me-in" placeholder="粘贴同步码"></textarea>' +
        '<div class="mefoot"><button class="mebtn ghost" data-me="cancel">取消</button>' +
        '<button class="mebtn" data-me="dorestore">恢复</button></div>';
    }

    bg.classList.add('on'); box.classList.add('on');
    document.documentElement.classList.add('locked');

    box.querySelectorAll('[data-me]').forEach(function(b){
      b.onclick = function(){
        var act = b.getAttribute('data-me');
        if(act === 'cancel') return close();
        if(act === 'savenick'){
          var v = (document.getElementById('me-nick').value || '').trim();
          if(window.__ME) window.__ME.setNick(v);
          close(); if(window.openAccountSheet) setTimeout(window.openAccountSheet, 120);
          return;
        }
        if(act === 'copycode'){
          var ta = document.getElementById('me-code');
          ta.focus(); ta.select();
          try{ document.execCommand('copy'); }catch(e){}
          b.textContent = '已复制';
          return;
        }
        if(act === 'dorestore'){
          var code2 = document.getElementById('me-in').value || '';
          try{
            var n = window.__ME.applyCode(code2);
            close();
            alert('已恢复 ' + n + ' 条记录');
            if(window.openAccountSheet) setTimeout(window.openAccountSheet, 120);
          }catch(e){
            alert('同步码无效，请检查是否完整');
          }
          return;
        }
      };
    });
  }

  window.ME_UI = { open: open, close: close };
})();

/* 昵称 / 恢复记录：文档级捕获，确保一次点击生效 */
document.addEventListener('click', function(e){
  var row = e.target.closest('[data-sact]');
  if(!row) return;
  var act = row.getAttribute('data-sact');

  // 备份码：直接复制并提示
  if(act === 'sync'){
    e.preventDefault(); e.stopPropagation();
    var code = '';
    try{ code = window.__ME ? window.__ME.makeCode() : ''; }catch(err){ code = ''; }
    if(!code){ if(window.toast) window.toast('暂无可备份的记录'); return; }
    var ta = document.createElement('textarea');
    ta.value = code;
    ta.style.cssText = 'position:fixed;top:-999px;left:-999px';
    document.body.appendChild(ta);
    ta.select();
    try{ document.execCommand('copy'); }catch(err){}
    ta.remove();
    if(window.toast) window.toast('复制成功');
    return;
  }

  if(act !== 'restore') return;
  e.preventDefault(); e.stopPropagation();

  var pl = document.querySelector('.spnl'); if(pl) pl.classList.remove('on');
  var bg = document.querySelector('.sbg'); if(bg) bg.classList.remove('on');
  document.documentElement.classList.remove('locked');

  if(window.ME_UI) window.ME_UI.open('restore');
}, true);

/* 电脑端：Shift + 滚轮横向滑动（精选卡 / 详情多图） */
document.addEventListener('wheel', function(e){
  if(!e.shiftKey) return;
  var el = e.target.closest('.hscroll, .shots');
  if(!el) return;
  e.preventDefault();
  el.scrollLeft += (e.deltaY || e.deltaX);
}, { passive: false });

/* 横滑区域里禁止浏览器原生拖图，否则鼠标一拖会把图片拽出来 */
document.addEventListener('dragstart', function(e){
  if(e.target.closest('.hscroll, .shots')) e.preventDefault();
}, true);

/* ===== 横滑拖拽：鼠标 + 触屏，轴向锁定 ===== */
(function dragBoot(){
  var drag = null, raf = 0, lastX = 0, lastT = 0, vel = 0;

  document.addEventListener('pointerdown', function(e){
    if(e.pointerType && e.pointerType !== 'mouse') return;   // 触屏走原生滚动
    var el = e.target.closest('.hscroll, .shots');
    if(!el) return;
    drag = {
      el: el, x: e.clientX, y: e.clientY, left: el.scrollLeft,
      moved: false, axis: null, id: e.pointerId
    };
    lastX = e.clientX; lastT = performance.now(); vel = 0;
  }, true);

  document.addEventListener('pointermove', function(e){
    if(!drag) return;
    var dx = e.clientX - drag.x;
    var dy = e.clientY - drag.y;

    // 先判断方向：竖向就放弃接管，让页面正常滚
    if(!drag.axis){
      if(Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if(drag.axis === 'y'){ drag = null; return; }
      drag.el.classList.add('dragging');
    }
    if(drag.axis !== 'x') return;

    drag.moved = true;
    if(e.cancelable) e.preventDefault();

    var now = performance.now();
    var dt = Math.max(1, now - lastT);
    vel = (e.clientX - lastX) / dt;
    lastX = e.clientX; lastT = now;

    var target = drag.left - dx;
    if(!raf){
      raf = requestAnimationFrame(function(){
        raf = 0;
        if(drag) drag.el.scrollLeft = target;
      });
    }
  }, { capture: true, passive: false });

  function end(){
    if(!drag) return;
    var el = drag.el;
    var moved = drag.moved && Math.abs(el.scrollLeft - drag.left) > 2;
    el.classList.remove('dragging');
    drag = null;
    if(raf){ cancelAnimationFrame(raf); raf = 0; }
    if(moved){
      var glide = -vel * 220;
      if(Math.abs(glide) > 12){
        try{ el.scrollBy({ left: glide, behavior: 'smooth' }); }catch(err){ el.scrollLeft += glide; }
      }
      var stop = function(ev){ ev.stopPropagation(); ev.preventDefault(); };
      document.addEventListener('click', stop, true);
      setTimeout(function(){ document.removeEventListener('click', stop, true); }, 0);
    }
  }
  document.addEventListener('pointerup', end, true);
  document.addEventListener('pointercancel', end, true);
})();





/* ===== 桌面端鼠标拖拽：rAF 节流 + 惯性，更顺滑 ===== */
(function mouseDragBoot(){
  var drag = null, raf = 0, lastX = 0, lastT = 0, vel = 0;

  document.addEventListener('pointerdown', function(e){
    if(e.pointerType && e.pointerType !== 'mouse') return;
    var el = e.target.closest('.hscroll, .shots');
    if(!el) return;
    drag = { el: el, x: e.clientX, left: el.scrollLeft, moved: false };
    lastX = e.clientX; lastT = performance.now(); vel = 0;
    el.classList.add('dragging');
  }, true);

  document.addEventListener('pointermove', function(e){
    if(!drag) return;
    var dx = e.clientX - drag.x;
    if(Math.abs(dx) > 10){
      drag.moved = true;
      e.preventDefault();
      var now = performance.now();
      var dt = Math.max(1, now - lastT);
      vel = (e.clientX - lastX) / dt;      // px/ms
      lastX = e.clientX; lastT = now;
      var target = drag.left - dx;
      if(!raf){
        raf = requestAnimationFrame(function(){
          raf = 0;
          if(drag) drag.el.scrollLeft = target;
        });
      }
    }
  }, true);

  function end(){
    if(!drag) return;
    var el = drag.el, moved = drag.moved && Math.abs(el.scrollLeft - drag.left) > 2;
    el.classList.remove('dragging');
    drag = null;
    if(raf){ cancelAnimationFrame(raf); raf = 0; }
    if(moved){
      // 惯性：按松手瞬间的速度滑一小段
      var glide = -vel * 220;
      if(Math.abs(glide) > 12){
        try{ el.scrollBy({ left: glide, behavior: 'smooth' }); }catch(err){ el.scrollLeft += glide; }
      }
      var stop = function(ev){ ev.stopPropagation(); ev.preventDefault(); };
      document.addEventListener('click', stop, true);
      setTimeout(function(){ document.removeEventListener('click', stop, true); }, 0);
    }
  }
  document.addEventListener('pointerup', end, true);
  document.addEventListener('pointercancel', end, true);
})();
