(function(){
  try{ var th = localStorage.getItem('appindex.theme'); if(th === 'dark') document.documentElement.dataset.theme = 'dark'; }catch(e){}
  var LOGO = 'data:image/png;base64,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';
  var DATA = window.APP_DATA || { apps: [] };
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
  var COLOR = { '游戏':'#2b6e37', '软件':'#15489c', '插件':'#5b3aa8', '其他':'#3a3a3c', '未分类':'#3a3a3c' };
  var state = { tab:'today', screen:'home', listTitle:'', detail:null, q:'', sort:'default' };

  function catOf(a){ return a.category || '未分类'; }
  function color(a){ return COLOR[catOf(a)] || '#2b2b30'; }
  function sub(a){
    var t = (a.description || '').replace(/\s+/g,' ').trim();
    return t ? t.slice(0, 48) : ((a.platform || '') + (a.size ? ' · ' + a.size : ''));
  }
  function fixPath(u){ if(!u) return ''; if(/^https?:|^data:/.test(u)) return u; return u.replace(/^\/+/, ''); }
  function iconHTML(a){
    if(a.icon) return '<img src="' + fixPath(a.icon) + '" alt="">';
    return '<span>' + (a.iconText || a.name || '?').slice(0,2) + '</span>';
  }
  function bgLayer(a){
    return a.icon
      ? '<div class="bg" style="background-image:url(\'' + fixPath(a.icon) + '\')"></div><div class="veil"></div>'
      : '<div class="veil"></div>' +
          '<div class="menu" id="menu">' +
            '<button class="mi" data-act="theme">' +
              '<svg class="ic" viewBox="0 0 24 24"><path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z"/></svg>' +
              '暗黑模式<span class="sw' + (document.documentElement.dataset.theme === 'dark' ? ' on' : '') + '"></span>' +
            '</button>' +
            '<button class="mi" data-act="share">' +
              '<svg class="ic" viewBox="0 0 24 24"><path d="M12 3.5v10"/><path d="m8.5 7 3.5-3.5L15.5 7"/><path d="M6 11.5V19a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19v-7.5"/></svg>' +
              '分享给朋友</button>' +
            '<button class="mi" data-act="help">' +
              '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .9-1 1.6v.4"/><circle cx="12" cy="17" r=".6" fill="currentColor"/></svg>' +
              '使用说明</button>' +
          '</div>' +
        '</button>';
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
      return ALL.filter(function(a){ return latest(a).slice(0,10) === t; });
    }
    return ALL;
  }

  /* ---------- 头部 ---------- */
  function renderHead(){
    var box = document.getElementById('head');
    if(state.screen === 'home'){
      var t = state.tab === 'today' ? 'Today' : (state.tab === 'games' ? '游戏' : (state.tab === 'apps' ? '应用' : '搜索'));
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
    var label = state.tab === 'games' ? '游戏' : (state.tab === 'apps' ? '应用' : (state.tab === 'today' ? 'Today' : '搜索'));
    box.innerHTML = '<button class="back" data-act="back">' +
      '<svg viewBox="0 0 24 24"><path d="m14.5 6-6 6 6 6"/></svg>' + label + '</button>';
  }

  /* ---------- 卡片 ---------- */
  function todayCard(a){
    return '<div class="card" data-open="' + a.id + '" style="background:' + color(a) + '">' +
      '<div class="art">' + bgLayer(a) + iconHTML(a) + '</div>' +
      '<div class="txt"><div class="kick">' + catOf(a) + '</div>' +
        '<h2>' + a.name + '</h2><p>' + (a.note || '') + '</p>' +
        '<div class="foot"><div class="ic">' + iconHTML(a) + '</div>' +
          '<div class="m"><b>' + a.name + '</b><span>' + (a.version ? 'v' + a.version : sub(a)) + '</span></div>' +
          '<button class="get">获取</button></div>' +
      '</div></div>';
  }
  function featBlock(a){
    return '<div class="feat" data-open="' + a.id + '">' +
      '<div class="kick">' + (state.tab === 'games' ? '本周热玩' : '现已推出') + '</div>' +
      '<h2>' + a.name + '</h2><p>' + sub(a) + '</p>' +
      '<div class="visual" style="background:' + color(a) + '">' + bgLayer(a) +
        iconHTML(a).replace('<img ', '<img class="big" ').replace('<span>', '<span class="big">') +
        '<div class="overlay"><div class="ic">' + iconHTML(a) + '</div>' +
          '<div class="m"><b>' + a.name + '</b><span>' + sub(a) + '</span></div>' +
          '<button class="get">获取</button></div>' +
      '</div></div>';
  }
  function row(a){
    return '<div class="row" data-open="' + a.id + '"><div class="ic">' + iconHTML(a) + '</div>' +
      '<div class="tx' + (a.note ? ' has-note' : '') + '">' +
        '<div class="l1">' + a.name + '</div>' +
        (a.note ? '<div class="l2">' + a.note + '</div>' : '') +
      '</div>' +
      '<button class="btn">获取</button></div>';
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
      stage.innerHTML =
        '<div class="searchbar"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.6"/><path d="m15.8 15.8 4.6 4.6"/></svg>' +
        '<input id="q" placeholder="游戏、App、关键词" value="' + state.q.replace(/"/g,'') + '"></div>' +
        '<div class="sect"><h3>' + (state.q ? '搜索结果' : '为你推荐') + '</h3></div>' +
        '<p class="sectsub" id="srcount">' + (list.length ? list.length + ' 个应用' : '没有匹配的应用') + '</p>' +
        '<div class="list" id="srlist">' + list.map(row).join('') + '</div>' + (list.length ? '' : '<div class="empty" id="srempty">换个词试试</div>');
      var inp = document.getElementById('q');
      inp.addEventListener('input', function(){
        state.q = this.value;
        var v = state.q.trim().toLowerCase();
        var r = v ? ALL.filter(function(x){
          return (x.name + ' ' + (x.description||'') + ' ' + (x.version||'') + ' ' + catOf(x)).toLowerCase().indexOf(v) > -1;
        }) : ALL;
        var box = document.getElementById('srlist');
        var cnt = document.getElementById('srcount');
        if(cnt) cnt.textContent = r.length ? r.length + ' 个应用' : '没有匹配的应用';
        if(box) box.innerHTML = r.map(row).join('');
      });
      return;
    }

    var HOME_MAX = 10;
    // 顶部「本周热玩」：有置顶就只显示置顶（多个可横滑翻页）；没有置顶就显示最近更新的 1 个
    var pinned = list.filter(function(a){ return a.pinned; });
    var feats = pinned.length ? pinned : list.slice(0, 1);
    // 下面列表：置顶的不重复出现，最多 10 行
    var rest = list.filter(function(a){ return feats.indexOf(a) === -1; }).slice(0, HOME_MAX);
    var secTitle = state.tab === 'games' ? (list.length + ' 款近期佳作') : (list.length + ' 款大家都在用');
    stage.innerHTML =
      '<div class="hscroll">' + feats.map(featBlock).join('') + '</div>' +
      '<div class="sect"><h3>' + secTitle + '</h3>' +
        '<button class="all" data-act="all">查看全部</button></div>' +
      '<p class="sectsub">向下滑动 查看更多</p>' +
      '<div class="list">' + rest.map(row).join('') + '</div>';
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
    if(state.sort === 'name') arr.sort(byName);
    else if(state.sort === 'date') arr.sort(function(a,b){ return String(latest(b)).localeCompare(String(latest(a))); });
    return arr;
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
        '<div class="iconbox">' + (a.icon ? '<img src="' + fixPath(a.icon) + '" alt="">' : (a.iconText || a.name).slice(0,2)) + '</div>' +
        '<div style="flex:1;min-width:0">' +
          '<h2>' + a.name + '</h2>' +
          '<p class="dline">' + (a.note || '') + '</p>' +
          '<div class="drow"><button class="dbtn">获取</button>' +
            '<span class="dshare" data-act="copypwd"><svg viewBox="0 0 24 24"><path d="M12 3.5v10"/><path d="m8.5 7 3.5-3.5L15.5 7"/><path d="M6 11.5V19a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19v-7.5"/></svg></span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="dstats">' +
        '<div><em>版本</em><b>' + (a.version ? 'v' + a.version : '—') + '</b><small>当前版本</small></div>' +
        '<div><em>平台</em><b>' + plat + '</b><small>系统</small></div>' +
        '<div><em>分类</em><b>' + cat + '</b><small>排行榜</small></div>' +
        '<div><em>大小</em><b>' + sizeNum(a.size) + '</b><small>' + sizeUnit(a.size) + '</small></div>' +
      '</div>' +
      (a.shots && a.shots.length
        ? '<div class="shots">' + a.shots.map(function(s){ return '<img src="' + fixPath(s) + '" alt="">'; }).join('') + '</div>'
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
    var hs = document.querySelector('.hscroll');
    if(!hs) return;
    if(innerWidth >= 900){
      for(var k = 0; k < hs.children.length; k++) hs.children[k].style.flex = '';
      return;
    }
    var PAD = 18, GAP = 6, PEEK = 12;
    var W = hs.clientWidth - PAD - GAP - PEEK;
    for(var i = 0; i < hs.children.length; i++){
      hs.children[i].style.flex = '0 0 ' + W + 'px';
    }
  }
  window.addEventListener('resize', function(){
    clearTimeout(fitCards._t);
    fitCards._t = setTimeout(fitCards, 120);
  });

  function render(){
    renderHead();
    // 公告（noticeOnlyToday）只在 Today 展示
    var nb = document.getElementById('notice');
    if(nb){ nb.style.display = (state.tab === 'today' && state.screen === 'home') ? '' : 'none'; }
    if(state.screen === 'home') renderHome();
    else if(state.screen === 'list') renderListScreen();
    else renderDetail();
    document.getElementById('tabbar').style.display = '';
    var tb = document.querySelector('.tabbar');
    if(tb) tb.classList.add('ready');
    var hd = document.querySelector('.headdiv');
    if(hd) hd.style.display = (state.screen === 'home') ? '' : 'none';
    if(state.screen === 'home' && (state.tab === 'games' || state.tab === 'apps')) setTimeout(fitCards, 0);
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

    var av = e.target.closest('#avabtn');
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
      if(a2 === 'help'){ var sh = document.getElementById('sheet'); if(sh) sh.classList.add('open'); return; }
      if(a2 === 'closesheet'){ var sh2 = document.getElementById('sheet'); if(sh2) sh2.classList.remove('open'); return; }
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
      if(target && target.url){ window.open(fullLink(target), '_blank'); }
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
    if(card && !e.target.closest('.btn,.get')){
      var id = card.getAttribute('data-open');
      var app = ALL.filter(function(x){ return x.id === id; })[0];
      if(app){
        state.detail = app; state.screen = 'detail';
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
  function check(){
    if(sha(val) === hashes){
      try{ sessionStorage.setItem(KEY, hashes); }catch(e){}
      wrap.remove();
      try{ render(); }catch(e){}
    } else {
      err.textContent = '密码错误，请重试';
      val = ''; paint();
    }
  }

  var keys = ['1','2','3','4','5','6','7','8','9','','0','del'];
  var pad = wrap.querySelector('#g2pad');
  keys.forEach(function(k){
    var b = document.createElement('button');
    b.type = 'button';
    if(k === ''){ b.className = 'k empty'; }
    else if(k === 'del'){ b.className = 'k del'; b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6H9L3 12l6 6h11a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z"/><path d="m12 9.5 5 5M17 9.5l-5 5"/></svg>'; }
    else { b.className = 'k'; b.textContent = k; }
    b.onclick = function(){
      err.textContent = '';
      if(k === 'del') val = val.slice(0, -1);
      else if(k && val.length < LEN) val += k;
      paint();
      if(val.length === LEN) setTimeout(check, 130);
    };
    pad.appendChild(b);
  });

  wrap.querySelector('#g2help').onclick = function(){
    window.open('https://wpa.qq.com/msgrd?v=3&uin=897763598&site=qq&menu=yes', '_blank');
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
