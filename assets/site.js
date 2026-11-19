(function(){
  'use strict';

  var DATA = window.APP_DATA;
  var $ = function(s){ return document.querySelector(s); };
  // 下架判定：手动下架 或 有效期已过
  function isLive(a){
    if(!a) return false;
    if(a.offline) return false;
    if(a.expireAt){
      var end = new Date(String(a.expireAt) + 'T23:59:59');
      if(!isNaN(end.getTime()) && Date.now() > end.getTime()) return false;
    }
    return true;
  }
  var ALL = (DATA && Array.isArray(DATA.apps) ? DATA.apps : []).filter(function(a){ return a && a.name && isLive(a); });
  var SITE = (DATA && DATA.site) || {};
  var CONFIG_PAGE = Number(SITE.pageSize) > 0 ? Number(SITE.pageSize) : 24;
  // 每页条数按当前列数补齐整行，避免最后一行空着
  function pageSizeNow(){
    var g = $('#grid');
    var cols = 1;
    if(g){
      var tpl = getComputedStyle(g).gridTemplateColumns || '';
      var n = tpl.split(' ').filter(function(s){ return s && s !== 'none'; }).length;
      if(n > 0) cols = n;
      else {
        // 网格是空的时候拿不到列数，按卡片最小宽度估算
        var w = g.clientWidth || g.getBoundingClientRect().width || 0;
        cols = Math.max(1, Math.floor((w + 14) / (272 + 14)));
      }
    }
    var rows = Math.max(1, Math.round(CONFIG_PAGE / cols));
    return cols * rows;
  }
  var state = { q:'', cat:'全部', sort:'default', page:1 };
  var current = null;

  function norm(s){ return String(s == null ? '' : s).toLowerCase().replace(/\s+/g,' ').trim(); }
  function el(tag, cls, text){ var e = document.createElement(tag); if(cls) e.className = cls; if(text !== undefined) e.textContent = text; return e; }
  function firstChar(s){ return Array.from(String(s||'#'))[0] || '#'; }
  function hash(s){ var h = 0; for(var i=0;i<s.length;i++) h = (h*31 + s.charCodeAt(i)) % 360; return h; }
  // 密码哈希（浏览器内置 SHA-256，不存明文）
  function sha256hex(str){
    if(!(window.crypto && crypto.subtle)) return Promise.reject(new Error('no crypto'));
    var data = new TextEncoder().encode(String(str));
    return crypto.subtle.digest('SHA-256', data).then(function(buf){
      return Array.prototype.map.call(new Uint8Array(buf), function(b){
        return ('0' + b.toString(16)).slice(-2);
      }).join('');
    });
  }
  // 颜色混合：把 a 往 b 方向混 t（0~1）
  function mixColor(a, b, t){
    var pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    var r = Math.round(((pa >> 16) & 255) * (1 - t) + ((pb >> 16) & 255) * t);
    var g = Math.round(((pa >> 8) & 255) * (1 - t) + ((pb >> 8) & 255) * t);
    var bl = Math.round((pa & 255) * (1 - t) + (pb & 255) * t);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1);
  }

  // 站点信息（都能在管理页的「站点设置」里改，这里只是兜底）
  if(SITE.title){
    $('#site-title').textContent = SITE.title;
    document.title = SITE.title + ' · 夸克网盘下载';
  }
  if(SITE.tagline) $('#site-tagline').textContent = SITE.tagline;
  if(SITE.eyebrow) $('#eyebrow').textContent = SITE.eyebrow;
  if(SITE.h1) $('#h1a').textContent = SITE.h1;
  if(SITE.h1accent) $('#h1b').textContent = SITE.h1accent;
  if(SITE.note) $('#foot-note').textContent = SITE.note;
  if(SITE.badge) $('#badge').textContent = SITE.badge;

  // 站点图标：同时用作左上角 Logo 和浏览器标签页图标
  // 支持完整网址，也支持上传到 assets/ 后的相对路径
  if(SITE.icon){
    var fav = document.getElementById('favicon');
    if(fav) fav.href = SITE.icon;
    var mark = document.querySelector('.mark');
    if(mark){
      var mi = new Image();
      mi.alt = '';
      mi.onload = function(){ mark.textContent = ''; mark.append(mi); mark.classList.add('has-img'); };
      mi.src = SITE.icon;
    }
  }

  // 主题色：后台选一个颜色，悬停色和浅底色自动算
  // 夜间模式会自动把过暗的颜色调亮，否则按钮会和背景糊在一起
  function relLum(hex){
    var n = parseInt(hex.slice(1), 16);
    var ch = [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255].map(function(v){
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  }
  function applyAccent(){
    if(!(SITE.accent && /^#[0-9a-fA-F]{6}$/.test(SITE.accent))) return;
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var c = SITE.accent;
    if(dark){
      var l = relLum(c);
      if(l < 0.35) c = mixColor(c, '#ffffff', Math.min(0.75, 0.5 + (0.35 - l) * 0.8));
    }
    var rs = document.documentElement.style;
    rs.setProperty('--blue', c);
    rs.setProperty('--blue-dark', mixColor(c, '#000000', 0.12));
    rs.setProperty('--soft', mixColor(c, dark ? '#0f131a' : '#ffffff', dark ? 0.8 : 0.9));
    // 主色太亮时，按钮文字改用深色，否则白字看不清
    rs.setProperty('--onblue', relLum(c) > 0.42 ? '#11161e' : '#ffffff');
  }
  applyAccent();

  // 壁纸：电脑 / 手机两张，按屏幕方向自动选
  (function(){
    function pickWall(){
      var d = SITE.wallDesktop || '', m = SITE.wallMobile || '';
      var portrait = window.innerHeight > window.innerWidth;
      var w = portrait ? (m || d) : (d || m);
      document.documentElement.style.setProperty('--wall', w ? 'url("' + w + '")' : 'none');
    }
    pickWall();
    var wt;
    window.addEventListener('resize', function(){ clearTimeout(wt); wt = setTimeout(pickWall, 150); });
  })();

  // 公告栏
  function fmtBytes(b){
    b = Number(b) || 0;
    if(!b) return '';
    if(b >= 1048576) return (b / 1048576).toFixed(b >= 10485760 ? 0 : 1) + ' MB';
    if(b >= 1024) return Math.round(b / 1024) + ' KB';
    return b + ' B';
  }
  function fmtDT(v){
    if(!v) return '';
    var s = String(v);
    var m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if(m) return m[1] + '/' + (+m[2]) + '/' + (+m[3]);
    var d = new Date(s);
    if(isNaN(d.getTime())) return s;
    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' +
      ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
  }
  // 前台只显示日期，不显示几点几分
  function latestOf(a){ return String((a && (a.updatedAt || a.addedAt || a.date)) || ''); }
  function fmtD(v){
    var s = fmtDT(v);
    return s ? s.split(' ')[0] : '';
  }
  (function renderNotice(){
    var n = SITE.notice;
    if(!n || n.show === false) return;
    if(!n.text && !n.image && !n.file) return;
    var box = $('#notice');
    box.hidden = false;
    if(n.text) $('#notice-text').textContent = n.text;
    if(n.updated) $('#notice-time').textContent = '更新于 ' + fmtDT(n.updated);
    if(n.text){
      setTimeout(function(){
        var t = $('#notice-text');
        if(t.scrollHeight > t.clientHeight + 2){
          var btn = $('#notice-more');
          btn.hidden = false;
          btn.onclick = function(){
            var open = box.classList.toggle('open');
            btn.textContent = open ? '收起' : '展开';
          };
        }
      }, 60);
    }
    if(n.image){
      var im = $('#notice-img');
      im.src = n.image;
      im.hidden = false;
      im.addEventListener('click', function(){ window.open(n.image, '_blank', 'noopener'); });
    }
    if(n.file){
      var a = $('#notice-file');
      a.href = n.file;
      if(n.fileName) a.setAttribute('download', n.fileName);
      a.hidden = false;
      $('#notice-file-name').textContent = n.fileName || '下载附件';
      var sz = fmtBytes(n.fileSize);
      if(sz) $('#notice-file-size').textContent = sz;
    }
  })();

  var SEARCH = ALL.map(function(a){
    return norm([a.name, a.version, a.category, a.platform, a.description, (a.tags||[]).join(' ')].join(' '));
  });

  // 分类
  var catCount = {};
  ALL.forEach(function(a){ var c = a.category || '未分类'; catCount[c] = (catCount[c]||0) + 1; });
  // 分类顺序：优先按后台设置的 site.categories 顺序，没设的按数量排
  var CATS = Object.keys(catCount).sort(function(a, b){
    var order = SITE.categories || [];
    var ia = order.indexOf(a), ib = order.indexOf(b);
    if(ia === -1 && ib === -1) return catCount[b] - catCount[a] || a.localeCompare(b, 'zh-CN');
    if(ia === -1) return 1;
    if(ib === -1) return -1;
    return ia - ib;
  });

  function buildChips(){
    var box = $('#chips');
    var frag = document.createDocumentFragment();
    [['全部', ALL.length]].concat(CATS.map(function(c){ return [c, catCount[c]]; })).forEach(function(pair){
      var b = el('button','chip', pair[0] + ' ' + pair[1]);
      b.type = 'button';
      b.dataset.cat = pair[0];
      b.setAttribute('aria-pressed', String(state.cat === pair[0]));
      b.onclick = function(){ state.cat = pair[0]; state.page = 1; render(); };
      frag.append(b);
    });
    box.replaceChildren(frag);
  }

  function toast(msg){
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('on');
    clearTimeout(toast._t);
    toast._t = setTimeout(function(){ t.classList.remove('on'); }, 2400);
  }

  function copy(text, okMsg){
    var done = function(){ toast(okMsg || '已复制'); };
    var fail = function(){
      var ta = el('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0';
      document.body.append(ta);
      ta.focus(); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch(e) {}
      ta.remove();
      if(ok) done(); else toast('复制失败，请长按或手动选择链接复制');
    };
    if(navigator.clipboard && window.isSecureContext){
      navigator.clipboard.writeText(text).then(done, fail);
    } else { fail(); }
  }

  function sizeText(a){ return a.size ? String(a.size) : ''; }

  function iconEl(a){
    var box = el('div','icon');
    var h = hash(a.name);
    box.style.background = 'hsl(' + h + ' 82% 95%)';
    box.style.color = 'hsl(' + h + ' 55% 42%)';
    // 后台可以自定义图标上显示的文字；留空就自动取名称首字
    var label = String(a.iconText || '').trim() || firstChar(a.name);
    box.textContent = label;
    if(label.length >= 3) box.style.fontSize = Math.max(10, Math.min(18, Math.floor(46 / label.length * 0.95))) + 'px';
    if(a.icon){
      var img = new Image();
      img.alt = '';
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.onload = function(){ box.textContent = ''; box.append(img); };
      img.onerror = function(){ box.textContent = label; };
      img.src = a.icon;
    }
    return box;
  }

  function openDetail(a){
    current = a;
    $('#d-name').textContent = a.name;
    var bits = [];
    if(a.category) bits.push(a.category);
    if(a.platform) bits.push(fixPlat(a.platform));
    if(a.version) bits.push('v' + a.version);
    if(a.size) bits.push(a.size);
    var added = fmtD(a.addedAt) || fmtD(a.date);
    var upd = a.updatedAt ? fmtD(a.updatedAt) : '';
    if(upd) bits.push('更新 ' + upd);
    else if(added) bits.push('收录 ' + added);
    $('#d-sub').textContent = bits.join(' · ');
    $('#d-desc').textContent = a.description || '暂无简介。';
    $('#d-url').value = a.url || '（未填写链接）';
    var pwdRow = $('#d-pwdrow');
    if(a.pwd){
      pwdRow.hidden = false;
      $('#d-pwd').textContent = a.pwd;
    } else {
      pwdRow.hidden = true;
    }
    var open = $('#d-open');
    if(a.url){ open.href = a.url; open.hidden = false; } else { open.hidden = true; }
    var dlg = $('#detail');
    if(!dlg.open) dlg.showModal();
    $('#d-url').scrollTop = 0;
  }

  function pinIcon(){
    var s = document.createElementNS('http://www.w3.org/2000/svg','svg');
    s.setAttribute('viewBox','0 0 24 24');
    s.setAttribute('fill','none');
    s.setAttribute('stroke','currentColor');
    s.setAttribute('stroke-width','2');
    s.setAttribute('stroke-linecap','round');
    s.setAttribute('stroke-linejoin','round');
    s.setAttribute('aria-hidden','true');
    s.innerHTML = '<path d="M9 3h6l-1 5.5 3.5 2.5v1.5H6.5V11L10 8.5 9 3Z"/><path d="M12 12.5V21"/>';
    return s;
  }

  function card(a, i){
    var c = el('article', a.pinned ? 'card pinned' : 'card');
    if(a.pinned){
      var pb = el('span','pinbadge');
      pb.append(pinIcon());
      c.append(pb);
    }
    var head = el('div','c-head');
    var title = el('div','c-title');
    var name = el('button','name', a.name);
    name.type = 'button';
    name.title = a.name;
    name.onclick = function(){ openDetail(a); };
    var meta = el('div','meta');
    String(a.platform || '').split(/[\/、,，]/).map(function(s){ return s.trim(); }).filter(Boolean).forEach(function(p){
      meta.append(el('span','plat', fixPlat(p)));
    });
    if(a.version) meta.append(el('span','ver', 'v' + a.version));
    if(a.size) meta.append(el('span','sz', a.size));
    if(a.pwd) meta.append(el('span','code', '码 ' + a.pwd));
    title.append(name, meta);
    head.append(iconEl(a), title);

    var desc = el('p','desc', a.description || '点击查看详情并复制网盘链接。');

    var foot = el('div','c-foot');
    foot.append(el('span','tag', a.category || '未分类'));

    var acts = el('div','acts');
    var copyBtn = el('button','btn ghost','复制');
    copyBtn.type = 'button';
    copyBtn.onclick = function(){
      if(!a.url) return toast('这条还没有填链接');
      copy(a.url, a.pwd ? '链接已复制，提取码 ' + a.pwd : '链接已复制');
    };
    var openBtn = el(a.url ? 'a' : 'button', 'btn primary', '下载');
    if(a.url){
      openBtn.href = a.url;
      openBtn.target = '_blank';
      openBtn.rel = 'noopener noreferrer';
    } else {
      openBtn.type = 'button';
      openBtn.disabled = true;
      openBtn.title = '未填写链接';
    }
    acts.append(copyBtn, openBtn);
    foot.append(acts);

    c.append(head, desc, foot);

    // 整张卡片都能点开详情；按钮、选中文字、滑动页面时不触发
    var downX = 0, downY = 0, moved = false;
    c.addEventListener('pointerdown', function(e){
      downX = e.clientX; downY = e.clientY; moved = false;
    });
    c.addEventListener('pointermove', function(e){
      if(Math.abs(e.clientX - downX) > 8 || Math.abs(e.clientY - downY) > 8) moved = true;
    });
    c.addEventListener('click', function(e){
      if(moved) return;
      if(e.target.closest('.acts')) return;
      var sel = window.getSelection && window.getSelection();
      if(sel && String(sel).length) return;
      openDetail(a);
    });
    c.tabIndex = 0;
    c.setAttribute('role', 'button');
    c.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openDetail(a); }
    });

    return c;
  }

  // 名称排序用的键：英文/数字开头的排前面（按字母），中文排后面（按拼音）
  // 首字母：英文直接用，中文按拼音分桶（配对的边界表，避免字母错位）
  var PY_PAIRS = [['阿','A'],['八','B'],['擦','C'],['搭','D'],['蛾','E'],['发','F'],['噶','G'],['哈','H'],
                  ['击','J'],['喀','K'],['拉','L'],['妈','M'],['拿','N'],['哦','O'],['啪','P'],['期','Q'],
                  ['然','R'],['撒','S'],['塌','T'],['挖','W'],['昔','X'],['压','Y'],['匝','Z']];
  var PY_COL = null;
  try { PY_COL = new Intl.Collator('zh-Hans-CN', { sensitivity: 'base' }); } catch(e) {}
  // 平台名统一大小写（Macos / iOS / Android / Windows）
  function fixPlat(s){
    return String(s || '')
      .replace(/\bmacos\b/gi, 'Macos')
      .replace(/\bios\b/gi, 'iOS')
      .replace(/\bandroid\b/gi, 'Android')
      .replace(/\bwindows\b/gi, 'Windows');
  }  function nameMeta(s){
    var t = String(s || '').trim();
    var ch = t ? Array.from(t)[0] : '';
    var out = { letter: '#', ascii: false, rest: t.toLowerCase() };
    if(!ch) return out;
    if(/[0-9]/.test(ch)){ out.letter = '0'; out.ascii = true; return out; }
    if(/[a-zA-Z]/.test(ch)){ out.letter = ch.toUpperCase(); out.ascii = true; return out; }
    if(!PY_COL) return out;
    for(var i = 0; i < PY_PAIRS.length; i++){
      if(PY_COL.compare(ch, PY_PAIRS[i][0]) >= 0) out.letter = PY_PAIRS[i][1];
      else break;
    }
    return out;
  }
  function compareName(x, y){
    var a = nameMeta(x), b = nameMeta(y);
    if(a.letter !== b.letter) return a.letter < b.letter ? -1 : 1;
    if(a.ascii !== b.ascii) return a.ascii ? 1 : -1;   // 同字母时中文在前，英文在后
    return a.rest.localeCompare(b.rest, 'zh-Hans-CN', { numeric: true, sensitivity: 'base' });
  }

  function results(){
    var words = norm(state.q).split(' ').filter(Boolean);
    var list = ALL.filter(function(a, i){
      if(state.cat !== '全部' && (a.category || '未分类') !== state.cat) return false;
      return words.every(function(w){ return SEARCH[i].indexOf(w) > -1; });
    });
    if(state.sort === 'name'){
      list = list.slice().sort(function(a,b){
        return compareName(a.name, b.name) || a.index - b.index;
      });
    } else if(state.sort === 'date'){
      list = list.slice().sort(function(a,b){ return latestOf(b).localeCompare(latestOf(a)); });
    }
    // 置顶的永远排最前，其余保持当前排序
    var pinned = [], rest = [];
    list.forEach(function(a){ (a.pinned ? pinned : rest).push(a); });
    return pinned.concat(rest);
  }

  function pagerButton(text, page, label){
    var b = el('button', label ? 'nav' : null, text);
    b.type = 'button';
    if(label) b.setAttribute('aria-label', label);
    if(page === state.page && !label) b.setAttribute('aria-current', 'page');
    b.onclick = function(){
      state.page = page;
      render();
      var top = $('#grid').getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    };
    return b;
  }

  function render(){
    var list = results();
    var PAGE = pageSizeNow();
    var pages = Math.max(1, Math.ceil(list.length / PAGE));
    state.page = Math.min(Math.max(1, state.page), pages);
    var start = (state.page - 1) * PAGE;
    var slice = list.slice(start, start + PAGE);

    var grid = $('#grid');
    var frag = document.createDocumentFragment();
    if(!list.length){
      var empty = el('div','empty');
      var strong = el('strong', null, ALL.length ? '没有找到相关应用' : '还没有添加应用');
      empty.append(strong, el('p', null, ALL.length ? '换个关键词，或切换到「全部」分类再试试。' : '在管理页 admin.html 里添加条目，导出 apps.js 覆盖 data/apps.js。'));
      frag.append(empty);
    } else {
      slice.forEach(function(a){ frag.append(card(a)); });
    }
    grid.replaceChildren(frag);

    $('#rc').textContent = (state.q ? '找到 ' : '共 ') + list.length + ' 个应用';
    $('#clear').hidden = !state.q;

    document.querySelectorAll('.chip').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.cat === state.cat));
    });

    var pager = $('#pager');
    pager.replaceChildren();
    if(pages > 1){
      var prev = pagerButton('‹', state.page - 1, '上一页');
      prev.classList.add('nav');
      if(state.page === 1) prev.style.display = 'none';
      pager.append(prev);

      var nums = [1, pages];
      for(var n = state.page - 2; n <= state.page + 2; n++){ if(n >= 1 && n <= pages) nums.push(n); }
      nums = nums.filter(function(v, i, arr){ return arr.indexOf(v) === i; }).sort(function(a,b){ return a - b; });
      var last = 0;
      nums.forEach(function(n){
        if(last && n - last > 1) pager.append(el('span','dots','…'));
        pager.append(pagerButton(String(n), n));
        last = n;
      });

      var next = pagerButton('›', state.page + 1, '下一页');
      next.classList.add('nav');
      if(state.page === pages) next.style.display = 'none';
      pager.append(next);
    }
  }

  // 事件
  var timer;
  $('#q').addEventListener('input', function(){
    var v = this.value;
    clearTimeout(timer);
    timer = setTimeout(function(){
      state.q = v; state.page = 1; render();
    }, 120);
  });
  $('#clear').onclick = function(){ $('#q').value = ''; state.q = ''; state.page = 1; render(); $('#q').focus(); };
  $('#sort').onchange = function(){ state.sort = this.value; state.page = 1; render(); };
  $('#home').onclick = function(e){
    e.preventDefault();
    state.cat = '全部'; state.sort = 'default'; state.q = ''; state.page = 1;
    $('#q').value = ''; $('#sort').value = 'default';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  document.addEventListener('keydown', function(e){
    if(e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) && !e.target.isContentEditable){
      e.preventDefault(); $('#q').focus();
    }
    if(e.key === 'Escape' && e.target === $('#q')){ $('#q').value = ''; state.q = ''; state.page = 1; render(); }
  });

  $('#d-copy').onclick = function(){ if(current && current.url) copy(current.url, '链接已复制'); };
  $('#d-copypwd').onclick = function(){ if(current && current.pwd) copy(current.pwd, '提取码已复制'); };
  $('#d-copyall').onclick = function(){
    if(!current || !current.url) return toast('这条还没有填链接');
    var t = current.url + (current.pwd ? '\n提取码：' + current.pwd : '');
    copy(t, '链接和提取码已复制');
  };

  document.querySelectorAll('[data-close]').forEach(function(b){
    b.onclick = function(){ document.getElementById(b.dataset.close).close(); };
  });
  ['detail','help','disclaimer'].forEach(function(id){
    var dlg = document.getElementById(id);
    dlg.addEventListener('click', function(e){
      if(e.target !== dlg) return;
      var r = dlg.getBoundingClientRect();
      if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close();
    });
  });
  $('#help-btn').onclick = function(){ $('#help').showModal(); };
  $('#disclaimer-open').onclick = function(){ $('#disclaimer').showModal(); };
  if(SITE.title) $('#disc-name').textContent = SITE.title;

  // 日间 / 夜间切换
  function setTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('appindex.theme', t); } catch(e) {}
    var m = document.getElementById('themecolor');
    if(m) m.content = t === 'dark' ? '#0f131a' : '#f6f7fb';
    applyAccent();
  }
  $('#theme-btn').onclick = function(){
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  };

  // 回到顶部
  (function(){
    var btn = $('#totop');
    var onScroll = function(){
      btn.classList.toggle('on', window.pageYOffset > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  // 分享：手机走系统分享面板，电脑复制链接
  $('#share-btn').onclick = function(){
    if(location.protocol === 'file:'){
      toast('本地文件没法分享，部署到公网后这个按钮就能用了');
      return;
    }
    var url = location.href.split('#')[0];
    if(navigator.share){
      navigator.share({ title: SITE.title || document.title, url: url }).catch(function(){});
      return;
    }
    copy(url, '网址已复制，发给朋友吧');
  };

  // 窗口变宽变窄时列数会变，重新算一次每页条数
  var resizeTimer;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
      state.page = 1;
      render();
    }, 200);
  });

  // 卡片上的蜂窝聚光灯：跟着鼠标走
  var hexRaf = 0, hexTarget = null, hexLit = null;
  document.addEventListener('pointermove', function(e){
    var c = e.target && e.target.closest ? e.target.closest('.card') : null;
    if(hexLit && hexLit !== c) hexLit.style.setProperty('--hexo', '0');
    if(!c){ hexLit = null; return; }
    hexLit = c;
    c.style.setProperty('--hexo', '1');
    hexTarget = { el: c, x: e.clientX, y: e.clientY };
    if(hexRaf) return;
    hexRaf = requestAnimationFrame(function(){
      hexRaf = 0;
      if(!hexTarget) return;
      var r = hexTarget.el.getBoundingClientRect();
      hexTarget.el.style.setProperty('--mx', (hexTarget.x - r.left) + 'px');
      hexTarget.el.style.setProperty('--my', (hexTarget.y - r.top) + 'px');
      hexTarget = null;
    });
  }, { passive: true });

  // 手指松开后过一会儿淡出
  var hexOffTimer;
  function hexOff(){
    clearTimeout(hexOffTimer);
    hexOffTimer = setTimeout(function(){
      if(hexLit){ hexLit.style.setProperty('--hexo', '0'); hexLit = null; }
    }, 700);
  }
  document.addEventListener('pointerup', hexOff, { passive: true });
  document.addEventListener('pointercancel', hexOff, { passive: true });

  // 只有键盘操作才显示焦点框（手机点击不显示）
  document.addEventListener('keydown', function(e){
    if(e.key === 'Tab' || e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown'){
      document.body.classList.add('kb-nav');
    }
  }, true);
  document.addEventListener('pointerdown', function(){
    document.body.classList.remove('kb-nav');
  }, true);

  // 初始化
  $('#st-total').textContent = ALL.length;
  $('#st-cat').textContent = CATS.length;
  if(SITE.updated) $('#st-date').textContent = String(SITE.updated).slice(5, 10).replace('-', '.');
  (function(){
    var d = new Date(), p = function(n){ return ('0' + n).slice(-2); };
    var key = d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
    var n = ALL.filter(function(a){ return latestOf(a).slice(0, 10) === key; }).length;
    if(n > 0){ $('#st-today').textContent = n; $('#st-today-wrap').hidden = false; }
  })();
  buildChips();
  render();

  // 访问密码：设了密码就先挡住整页
  var NEED_PW = SITE.passwordHash || SITE.password;
  var UNLOCK_KEY = 'appindex.unlocked';
  if(NEED_PW && sessionStorage.getItem(UNLOCK_KEY) !== SITE.passwordHash && sessionStorage.getItem(UNLOCK_KEY) !== '1'){
    var gate = $('#gate');
    gate.hidden = false;
    var pwInput = $('#gatepw');
    var LEN = Number(SITE.pwdLen) > 0 ? Math.min(12, Number(SITE.pwdLen)) : 6;
    var pinsBox = $('#gatepins');
    var pinEls = [];
    for(var pi = 0; pi < LEN; pi++){
      var cell = document.createElement('div');
      cell.className = 'pin';
      cell.appendChild(document.createElement('i'));
      pinsBox.insertBefore(cell, pwInput);
      pinEls.push(cell);
    }
    function syncPins(){
      var n = pwInput.value.length;
      pinEls.forEach(function(el, i){
        el.classList.toggle('filled', i < n);
        el.classList.toggle('active', i === n && document.activeElement === pwInput);
      });
    }
    pinsBox.addEventListener('click', function(){ pwInput.focus(); });
    pwInput.addEventListener('focus', syncPins);
    pwInput.addEventListener('blur', syncPins);
    pwInput.addEventListener('input', function(){
      if(pwInput.value.length > LEN) pwInput.value = pwInput.value.slice(0, LEN);
      syncPins();
    });
    setTimeout(function(){ pwInput.focus(); syncPins(); }, 60);
    var tryUnlock = function(){
      if(lockLeft() > 0) return;
      Promise.resolve().then(function(){
        if(SITE.passwordHash) return sha256hex(pwInput.value);
        return pwInput.value === SITE.password ? 'ok' : 'no';
      }).then(function(v){
        var ok = SITE.passwordHash ? (v === SITE.passwordHash) : (v === 'ok');
        if(ok){
          sessionStorage.setItem(UNLOCK_KEY, SITE.passwordHash || '1');
          pwLockClear();
          gate.hidden = true;
        } else {
          pwLockFail();
          showLock();
        }
      }).catch(function(){
        $('#gateerr').textContent = '这个浏览器不支持密码校验，请换浏览器';
        $('#gateerr').hidden = false;
      });
    };

    // ---------- 输错锁定：跟 iPhone 一样 5 次后开始计时 ----------
    var LOCK_KEY = 'appindex.pwlock';
    var LOCK_STEPS = { 5: 60, 6: 300, 7: 900, 8: 1800, 9: 3600 };  // 秒
    function pwLockGet(){
      try { var o = JSON.parse(localStorage.getItem(LOCK_KEY) || '{}'); return { n: o.n || 0, until: o.until || 0 }; }
      catch(e){ return { n: 0, until: 0 }; }
    }
    function pwLockSet(o){ try { localStorage.setItem(LOCK_KEY, JSON.stringify(o)); } catch(e){} }
    function pwLockClear(){ try { localStorage.removeItem(LOCK_KEY); } catch(e){} }
    function lockLeft(){ return Math.max(0, Math.round((pwLockGet().until - Date.now()) / 1000)); }
    function pwLockFail(){
      var o = pwLockGet();
      o.n = (o.n || 0) + 1;
      var secs = LOCK_STEPS[o.n] || 0;
      if(secs) o.until = Date.now() + secs * 1000;
      pwLockSet(o);
    }
    var lockTimer;
    function showLock(){
      var left = lockLeft();
      var err = $('#gateerr');
      if(left > 0){
        pwInput.value = '';
        syncPins();
        pwInput.disabled = true;
        $('#gateok').disabled = true;
        pinsBox.classList.add('locked');
        err.hidden = false;
        var m = Math.floor(left / 60), s = left % 60;
        err.textContent = '密码错误次数过多，请在 ' + (m ? m + ' 分 ' + (s ? s + ' 秒' : '') : s + ' 秒') + '后重试';
        clearInterval(lockTimer);
        lockTimer = setInterval(function(){
          var l = lockLeft();
          if(l <= 0){
            clearInterval(lockTimer);
            pwInput.disabled = false;
            $('#gateok').disabled = false;
            pinsBox.classList.remove('locked');
            err.hidden = true;
            err.textContent = '密码错误，请重试';
            pwInput.focus();
            syncPins();
          } else {
            var mm = Math.floor(l / 60), ss = l % 60;
            err.textContent = '密码错误次数过多，请在 ' + (mm ? mm + ' 分 ' + (ss ? ss + ' 秒' : '') : ss + ' 秒') + '后重试';
          }
        }, 1000);
      } else {
        err.hidden = false;
        err.textContent = '密码错误，请重试';
        pinsBox.classList.add('shake');
        setTimeout(function(){ pinsBox.classList.remove('shake'); }, 340);
        pwInput.value = '';
        syncPins();
        pwInput.focus();
      }
    }
    if(lockLeft() > 0) showLock();

    $('#gateok').onclick = tryUnlock;
    pwInput.addEventListener('keydown', function(e){ if(e.key === 'Enter') tryUnlock(); });
  }
})();
