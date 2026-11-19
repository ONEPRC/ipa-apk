(function(){
  'use strict';
  var KEY = 'appindex.data.v2';
  var $ = function(s){ return document.querySelector(s); };
  var editing = -1;
  var data;
    var view = { q: '', page: 1, sort: 'manual', cat: '全部', shelf: 'all' };
  var PAGE_ADMIN = 20;

  function clone(o){ return JSON.parse(JSON.stringify(o)); }
  function toast(msg){
    var t = $('#toast'); t.textContent = msg; t.classList.add('on');
    clearTimeout(toast._t);
    toast._t = setTimeout(function(){ t.classList.remove('on'); }, 2200);
  }
  function today(){ var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
  function nowLocal(){
    var d = new Date(), p = function(n){ return ('0' + n).slice(-2); };
    return d.getFullYear() + '-' + p(d.getMonth()+1) + '-' + p(d.getDate()) + 'T' + p(d.getHours()) + ':' + p(d.getMinutes());
  }
  function fmtDT(v){
    if(!v) return '';
    var s = String(v);
    var m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if(m) return m[1] + '/' + (+m[2]) + '/' + (+m[3]);
    var d = new Date(s);
    if(isNaN(d.getTime())) return s;
    var p = function(n){ return ('0' + n).slice(-2); };
    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  // 载入：本机缓存 > data/apps.js > 空
  function load(){
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(KEY)); } catch(e) {}
    var file = (window.APP_DATA && Array.isArray(window.APP_DATA.apps)) ? clone(window.APP_DATA) : null;
    if(!saved || !Array.isArray(saved.apps)) return file || { site:{ title:'应用索引', tagline:'搜索应用，跳转夸克网盘转存下载', updated: today() }, apps: [] };
    if(!file) return saved;
    // 只要有数据文件，就以文件为准（缓存只在没有文件时兜底），避免旧快照把字段冲掉
    if(Array.isArray(file.apps) && file.apps.length) return file;
    return saved;
  }
  function save(){
    try { localStorage.setItem(KEY, JSON.stringify(data)); }
    catch(e){ toast('本地保存失败（可能是隐私模式）'); }
    if(SERVER){ pushServer(); }
    else {
      markDirty();
      // 浏览器模式也能自动发布（手机上打开线上管理页时走这条）
      if($('#p-auto').checked && $('#p-repo').value.trim() && $('#p-token').value.trim()) schedulePublish();
    }
  }

  // ---------- 直连保存：跑起本地服务后，保存 = 直接写文件 ----------
  var SERVER = false;
  var pushTimer, flashTimer;
  function markDirty(){
    var txt = $('#dirtytext');
    if(txt){
      var hasToken = !!$('#p-token').value.trim();
      txt.textContent = hasToken
        ? '改动还没发布，稍等几秒会自动推送到 GitHub ——'
        : '改了但还没写进文件，前台不会变 ——';
    }
    $('#dirtybar').hidden = false;
  }
  function clearDirty(){
    $('#dirtybar').hidden = true;
  }
  function pushServer(){
    clearTimeout(pushTimer);
    clearTimeout(flashTimer);
    pushTimer = setTimeout(function(){
      fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(function(r){ return r.json(); }).then(function(j){
        if(j && j.ok){
          if(j.rev && data.site) data.site.rev = j.rev;
          $('#mode').textContent = '已写入 ' + new Date().toLocaleTimeString('zh-CN', { hour12:false });
          $('#mode').classList.add('on');
          if(j.cleaned) toast('已自动清理 ' + j.cleaned + ' 个没用的图片');
          schedulePublish();
        } else if(j && j.stale){
          // 磁盘上的数据比管理页里的新，不能拿旧数据覆盖
          $('#mode').textContent = '数据已更新';
          $('#mode').classList.remove('on');
          if(confirm('数据文件比这个页面里的新（可能刚在别处改过）。\n\n点「确定」重新加载最新数据，点「取消」就什么都不改。')){
            location.reload();
          }
        } else {
          $('#mode').textContent = '写入失败';
          toast('写入失败：' + ((j && j.error) || '未知原因'));
        }
      }).catch(function(){
        SERVER = false;
        $('#mode').textContent = '导出模式';
        $('#mode').classList.remove('on');
        markDirty();
        toast('本地服务断了，已切回导出模式');
      });
    }, 350);
  }

  // 站点文案：在管理页直接改，不用碰 HTML
  var SITE_FIELDS = [
    ['s-title','title'], ['s-tagline','tagline'], ['s-h1','h1'], ['s-h1accent','h1accent'],
    ['s-eyebrow','eyebrow'], ['s-badge','badge'], ['s-pagesize','pageSize'], ['s-note','note'],
    ['s-accent','accent'], ['s-icon','icon'],
    ['s-wall-desk','wallDesktop'], ['s-wall-mob','wallMobile']
  ];
  function syncSiteForm(){
    if(!data.site) data.site = {};
    SITE_FIELDS.forEach(function(f){
      var v = data.site[f[1]];
      if(v === undefined || v === null) v = '';
      if(f[0] === 's-accent' && !v) v = '#3b6cf6';  // 颜色框不能留空，给个默认值
      $('#' + f[0]).value = v;
    });
    previewTo($('#s-icon-prev'), data.site.icon);
    previewTo($('#s-wall-desk-prev'), data.site.wallDesktop);
    previewTo($('#s-wall-mob-prev'), data.site.wallMobile);
  }
  function bindSiteForm(){
    SITE_FIELDS.forEach(function(f){
      $('#' + f[0]).addEventListener('input', function(){
        var v = this.value.trim();
        if(!data.site) data.site = {};
        if(f[1] === 'pageSize'){
          var n = parseInt(v, 10);
          if(n > 0) data.site.pageSize = n; else delete data.site.pageSize;
        } else if(v){ data.site[f[1]] = v; }
        else { delete data.site[f[1]]; }
        save();
      });
    });
  }

  // ---------- 本地图片：选文件 → 有本地服务就存进 assets/，没有就内嵌 base64 ----------
  function previewTo(img, src){
    if(!img) return;
    if(src){
      img.onerror = function(){ img.hidden = true; };
      img.src = src;
      img.hidden = false;
    } else {
      img.hidden = true;
      img.removeAttribute('src');
    }
  }
  function pickImage(cb){
    var inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/png,image/jpeg,image/webp,image/gif,image/svg+xml';
    inp.onchange = function(){
      var f = inp.files && inp.files[0];
      if(f) cb(f);
    };
    inp.click();
  }
  function fileToDataURL(file){
    return new Promise(function(resolve, reject){
      var r = new FileReader();
      r.onload = function(){ resolve(String(r.result)); };
      r.onerror = function(){ reject(new Error('图片读取失败')); };
      r.readAsDataURL(file);
    });
  }
  // 上传用的文件名：优先用应用名/站点名，方便在 assets 里认人
  function uploadName(file, hint){
    var ext = (String(file.name).match(/\.[A-Za-z0-9]+$/) || [''])[0];
    var base = String(hint || '').replace(/[\\/:*?"<>|]/g, '').trim().slice(0, 24);
    if(!base) base = String(file.name).replace(/\.[^.]+$/, '').slice(0, 24) || 'img';
    return base + ext;
  }
  function uploadImage(file, hint){
    if(file.size > 8 * 1024 * 1024) return Promise.reject(new Error('图片超过 8MB'));
    if(SERVER){
      return fetch('/api/upload?name=' + encodeURIComponent(uploadName(file, hint)), {
        method: 'POST',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        body: file
      }).then(function(r){ return r.json(); }).then(function(j){
        if(!j || !j.ok) throw new Error((j && j.error) || '上传失败');
        return j.path;
      });
    }
    // 没有本地服务：直接内嵌进数据，体积要小
    if(file.size > 400 * 1024) return Promise.reject(new Error('没开本地服务时，图片请压到 200KB 以内'));
    return fileToDataURL(file);
  }

  // 平台名统一大小写（macOS / iOS / Android / Windows）
  function fixPlat(s){
    return String(s || '')
      .replace(/\bmacos\b/gi, 'Macos')
      .replace(/\bios\b/gi, 'iOS')
      .replace(/\bandroid\b/gi, 'Android')
      .replace(/\bwindows\b/gi, 'Windows');
  }
  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function thumb(a){
    var d = document.createElement('div');
    d.className = 'thumb';
    var label = String(a.iconText || '').trim() || Array.from(a.name || '?')[0];
    var h = hashHue(a.name || String(label));
    d.style.background = 'hsl(' + h + ' 82% 95%)';
    d.style.color = 'hsl(' + h + ' 55% 42%)';
    d.textContent = label;
    if(a.icon){
      var img = new Image();
      img.alt = '';
      img.src = a.icon;
      img.onload = function(){ d.textContent = ''; d.append(img); };
    }
    return d;
  }

  function pagerBtn(text, page, label){
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = text;
    if(label) b.setAttribute('aria-label', label);
    if(!label && page === view.page) b.setAttribute('aria-current', 'page');
    b.onclick = function(){ view.page = page; render(); };
    return b;
  }

  // 管理页自己的标签标题和图标，跟着站点设置走
  function applyTab(){
    var s = (data && data.site) || {};
    var name = s.title || '应用索引';
    var want = name + ' · 管理页';
    if(document.title !== want) document.title = want;
    var link = document.getElementById('admin-favicon');
    if(link && s.icon && link.getAttribute('href') !== s.icon) link.setAttribute('href', s.icon);
  }

  // 顶部分类筛选条
  function renderCatchips(){
    var box = $('#catchips');
    if(!box) return;
    var counts = catCounts();
    var names = catOrderList();
    if(view.cat !== '全部' && names.indexOf(view.cat) === -1) view.cat = '全部';
    var frag = document.createDocumentFragment();
    [['全部', data.apps.length]].concat(names.map(function(n){ return [n, counts[n]]; })).forEach(function(pair){
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = pair[0] + ' ' + pair[1];
      b.setAttribute('aria-pressed', String(view.cat === pair[0]));
      b.onclick = function(){
        view.cat = pair[0];
        view.page = 1;
        render();
      };
      frag.append(b);
    });
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ordertoggle';
    toggle.textContent = '⇅ 排序';
    toggle.title = '调整分类顺序';
    toggle.setAttribute('aria-pressed', String(!$('#catorder').hidden));
    toggle.onclick = function(){
      var bar = $('#catorder');
      bar.hidden = !bar.hidden;
      renderCatsort();
    };
    frag.append(toggle);
    box.replaceChildren(frag);
    renderCatsort();
  }

  // 分类排序
  function catCounts(){
    var used = {};
    (data.apps || []).forEach(function(a){ var c = a.category || '未分类'; used[c] = (used[c] || 0) + 1; });
    return used;
  }
  function catOrderList(){
    var used = catCounts();
    var names = Object.keys(used);
    var order = (data.site && data.site.categories) || [];
    names.sort(function(a, b){
      var ia = order.indexOf(a), ib = order.indexOf(b);
      if(ia === -1 && ib === -1) return used[b] - used[a] || a.localeCompare(b, 'zh-CN');
      if(ia === -1) return 1;
      if(ib === -1) return -1;
      return ia - ib;
    });
    return names;
  }
  function moveCat(name, dir){
    var list = catOrderList();
    var i = list.indexOf(name);
    var j = i + dir;
    if(i < 0 || j < 0 || j >= list.length) return;
    var tmp = list[i]; list[i] = list[j]; list[j] = tmp;
    if(!data.site) data.site = {};
    var tail = ((data.site.categories) || []).filter(function(c){ return list.indexOf(c) === -1; });
    data.site.categories = list.concat(tail);
    data.site.updated = today();
    save();
    render();
  }
  function renderCatsort(){
    var boxes = [$('#catorder')].filter(Boolean);
    if(!boxes.length) return;
    var used = catCounts();
    var list = catOrderList();
    var build = function(){
      var frag = document.createDocumentFragment();
      if(!list.length){ frag.append(document.createTextNode('还没有分类')); return frag; }
      list.forEach(function(name, idx){
        var row = document.createElement('div');
        row.className = 'crow';
        var label = document.createElement('span');
        label.textContent = name;
        var cnt = document.createElement('em');
        cnt.textContent = used[name] + ' 条';
        var up = document.createElement('button');
        up.type = 'button'; up.textContent = '↑'; up.title = '上移';
        up.disabled = idx === 0;
        up.onclick = function(){ moveCat(name, -1); };
        var down = document.createElement('button');
        down.type = 'button'; down.textContent = '↓'; down.title = '下移';
        down.disabled = idx === list.length - 1;
        down.onclick = function(){ moveCat(name, 1); };
        row.append(label, cnt, up, down);
        frag.append(row);
      });
      return frag;
    };
    boxes.forEach(function(box){ box.replaceChildren(build()); });
  }

  function render(){
    var apps = data.apps;
    var words = view.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    var matched = apps.map(function(a, i){ return { a: a, i: i }; }).filter(function(o){
      if(view.shelf === 'down' && !isDown(o.a)) return false;
      if(view.shelf === 'soon' && shelfState(o.a).key !== 'soon') return false;
      if(view.cat !== '全部' && (o.a.category || '未分类') !== view.cat) return false;
      if(!words.length) return true;
      var hay = [o.a.name, o.a.version, o.a.category, o.a.platform, o.a.url, o.a.iconText, o.a.description].join(' ').toLowerCase();
      return words.every(function(w){ return hay.indexOf(w) > -1; });
    }).sort(function(x, y){
      // 置顶的排前面；其余按「最新在前」或「收录顺序」
      var px = x.a.pinned ? 0 : 1, py = y.a.pinned ? 0 : 1;
      if(px !== py) return px - py;
      if(view.sort === 'date'){
        var tx = String(x.a.updatedAt || x.a.addedAt || x.a.date || '');
        var ty = String(y.a.updatedAt || y.a.addedAt || y.a.date || '');
        if(tx !== ty) return ty.localeCompare(tx);
      } else if(view.sort === 'name'){
        return compareNameA(x.a.name, y.a.name) || x.i - y.i;
      }
      return x.i - y.i;
    });

    var missing = apps.filter(function(a){ return !a.url; }).length;
    var cats = {};
    apps.forEach(function(a){ var c = a.category || '未分类'; cats[c] = (cats[c]||0)+1; });
    var catNames = Object.keys(cats).sort();
    var allCats = catNames.slice();
    ((data.site && data.site.categories) || []).forEach(function(c){
      if(c && allCats.indexOf(c) === -1) allCats.push(c);
    });
    $('#cat-list').replaceChildren.apply($('#cat-list'), allCats.map(function(c){
      var o = document.createElement('option'); o.value = c; return o;
    }));
    renderCatPick();
    renderCatchips();
    renderCatsort();
    applyTab();

    var warn = missing ? ' · <span class="warn">缺链接 ' + missing + '</span>' : '';
    var scope = words.length ? ' · 筛出 <b>' + matched.length + '</b>' : '';
    var downN = 0, soonN = 0, expN = 0;
    apps.forEach(function(a){
      var s = shelfState(a).key;
      if(s === 'off' || s === 'expired') downN++;
      if(s === 'expired') expN++;
      if(s === 'soon') soonN++;
    });
    var shelfInfo = '';
    if(downN) shelfInfo += ' · <button class="linkbtn" data-filter="down">已下架 ' + downN + '</button>';
    if(soonN) shelfInfo += ' · <button class="linkbtn soon" data-filter="soon">临期 ' + soonN + '</button>';
    $('#stats').innerHTML = '共 <b>' + apps.length + '</b> 条 · <b>' + catNames.length + '</b> 个分类' + scope + warn + shelfInfo;

    var wrap = $('#tablewrap');
    var pager = $('#pager');
    pager.replaceChildren();

    if(!apps.length){
      wrap.innerHTML = '<div class="empty">还没有数据。左边填一条试试，或点「导入文件」。</div>';
      return;
    }
    if(!matched.length){
      wrap.innerHTML = '<div class="empty">没有匹配「' + esc(view.q) + '」的记录</div>';
      return;
    }

    var pages = Math.max(1, Math.ceil(matched.length / PAGE_ADMIN));
    view.page = Math.min(Math.max(1, view.page), pages);
    var start = (view.page - 1) * PAGE_ADMIN;
    var slice = matched.slice(start, start + PAGE_ADMIN);

    var t = document.createElement('table');
    t.innerHTML = '<thead><tr><th></th><th>名称</th><th>版本</th><th>分类</th><th>收录</th><th></th></tr></thead>';
    var tb = document.createElement('tbody');
    slice.forEach(function(o){
      var a = o.a, i = o.i;
      var tr = document.createElement('tr');
      tr.dataset.idx = i;
      tr.innerHTML =
        '<td class="n"></td>' +
        '<td class="name"><div title="' + esc(a.name) + '">' + esc(a.name) + '</div><small>' + esc(fixPlat(a.platform) || '') + (a.size ? ' · ' + esc(a.size) : '') + '</small></td>' +
        '<td>' + (a.version ? 'v' + esc(a.version) : '—') + '</td>' +
        '<td class="cat">' + esc(a.category || '未分类') + '</td>' +
        '<td class="when" title="' + esc('收录 ' + (fmtDT(a.addedAt) || fmtDT(a.date) || '—') + (a.updatedAt ? '　更新 ' + fmtDT(a.updatedAt) : '')) + '">' + ((fmtDT(a.updatedAt) || fmtDT(a.addedAt) || fmtDT(a.date) || '—').split(' ')[0]) + '</td>' +
        '<td></td>';
      var st = shelfState(a);
      if(st.key === 'off' || st.key === 'expired') tr.classList.add('down');
      if(st.label){
        var badge = document.createElement('span');
        badge.className = 'shelf ' + st.key;
        badge.textContent = st.label;
        var nmSmall = tr.querySelector('td.name small');
        tr.querySelector('td.name').insertBefore(badge, nmSmall);
      }
      tr.firstElementChild.append(thumb(a));
      var acts = tr.lastElementChild;
      var box = document.createElement('div'); box.className = 'rowacts';
      function mk(text, title, fn, cls){
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'btn ghost mini ' + (cls || ''); b.textContent = text; b.title = title; b.onclick = fn;
        box.append(b);
      }
      mk(a.pinned ? '★' : '☆', a.pinned ? '取消置顶' : '置顶到最前', function(){
        if(a.pinned){ delete a.pinned; } else { a.pinned = true; }
        if(data.site) data.site.updated = today();
        save(); render();
        toast(a.pinned ? '已置顶：' + a.name : '已取消置顶');
      }, a.pinned ? 'pin on' : 'pin');
      if(st.key === 'off'){
        mk('上架','重新上架', function(){
          delete a.offline; save(); render(); toast('已上架：' + a.name);
        });
      } else if(st.key === 'expired'){
        mk('续期','改有效期并重新上架', function(){ edit(i); $('#f-exp-days').focus(); });
      } else {
        mk('下架','暂时从前台隐藏', function(){
          a.offline = true; save(); render(); toast('已下架：' + a.name);
        });
      }
      mk('编辑','编辑这一条', function(){ edit(i); });
      mk('删除','删除这一条', function(){
        if(!confirm('删除「' + a.name + '」？')) return;
        if(!confirm('再确认一次：真的要删除「' + a.name + '」吗？')) return;
        apps.splice(i, 1);
        if(editing === i) resetForm();
        save(); render();
        toast('已删除「' + a.name + '」');
      });
      acts.append(box);
      tb.append(tr);
    });
    t.append(tb);
    wrap.replaceChildren(t);

    if(pages > 1){
      var prev = pagerBtn('←', view.page - 1, '上一页');
      prev.disabled = view.page === 1;
      pager.append(prev);
      var nums = [1, pages];
      for(var n = view.page - 2; n <= view.page + 2; n++){ if(n >= 1 && n <= pages) nums.push(n); }
      nums = nums.filter(function(v, i2, arr){ return arr.indexOf(v) === i2; }).sort(function(x, y){ return x - y; });
      var last = 0;
      nums.forEach(function(n){
        if(last && n - last > 1){ var dots = document.createElement('span'); dots.className = 'dots'; dots.textContent = '…'; pager.append(dots); }
        pager.append(pagerBtn(String(n), n));
        last = n;
      });
      var next = pagerBtn('→', view.page + 1, '下一页');
      next.disabled = view.page === pages;
      pager.append(next);
    }
  }

  // 访问密码：只存 SHA-256 哈希，不存明文
  function sha256hex(str){
    var data8 = new TextEncoder().encode(String(str));
    return crypto.subtle.digest('SHA-256', data8).then(function(buf){
      return Array.prototype.map.call(new Uint8Array(buf), function(b){
        return ('0' + b.toString(16)).slice(-2);
      }).join('');
    });
  }
  function updatePassTip(){
    var on = !!(data.site && data.site.passwordHash);
    var tip = $('#s-pass-tip');
    tip.textContent = on ? '已设置密码 ✓ 访客必须输入密码才能进入' : '未设置密码，任何人拿到网址都能打开';
    tip.className = 'tip' + (on ? ' ok' : '');
  }

  // 公告栏
  function noticeObj(){
    if(!data.site) data.site = {};
    if(!data.site.notice) data.site.notice = { show: true };
    return data.site.notice;
  }
  function syncNoticeForm(){
    var n = (data.site && data.site.notice) || {};
    $('#n-show').checked = n.show !== false;
    $('#n-text').value = n.text || '';
    $('#n-img').value = n.image || '';
    previewTo($('#n-imgprev'), n.image);
    $('#n-file').value = n.file || '';
    $('#n-file').title = n.fileName || '';
  }
  function uploadFileBlob(file){
    if(!SERVER) return Promise.reject(new Error('附件需要本地服务：先双击「启动管理页.bat」'));
    if(file.size > 60 * 1024 * 1024) return Promise.reject(new Error('文件超过 60MB'));
    return fetch('/api/upload?kind=file&name=' + encodeURIComponent(file.name), {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: file
    }).then(function(r){ return r.json(); }).then(function(j){
      if(!j || !j.ok) throw new Error((j && j.error) || '上传失败');
      return j;
    });
  }
  function pickAnyFile(cb){
    var inp = document.createElement('input');
    inp.type = 'file';
    inp.onchange = function(){ var f = inp.files && inp.files[0]; if(f) cb(f); };
    inp.click();
  }

  // 图标文字预览：和前台一样的取色算法
  function hashHue(s){ var h = 0; for(var i=0;i<s.length;i++) h = (h*31 + s.charCodeAt(i)) % 360; return h; }
  function updateIconPrev(){
    var name = $('#f-name').value.trim();
    var text = $('#f-icontext').value.trim() || Array.from(name)[0] || '?';
    var box = $('#f-icontext-prev');
    box.textContent = text;
    var h = hashHue(name || text);
    box.style.background = 'hsl(' + h + ' 82% 95%)';
    box.style.color = 'hsl(' + h + ' 55% 42%)';
    box.style.fontSize = text.length >= 3 ? '10px' : (text.length === 2 ? '12px' : '15px');
  }

  // 平台多选：存成 "iOS / macOS" 这样的字符串，前台按 / 拆成多个标签
  function getPlatform(){
    return Array.prototype.slice.call(document.querySelectorAll('#f-platform input:checked'))
      .map(function(i){ return i.value; }).join(' / ');
  }
  function setPlatform(str){
    var picked = String(str || '').split(/[\/、,，]/).map(function(s){ return s.trim(); }).filter(Boolean);
    Array.prototype.forEach.call(document.querySelectorAll('#f-platform input'), function(cb){
      cb.checked = picked.indexOf(cb.value) > -1;
      cb.parentNode.classList.toggle('on', cb.checked);
    });
  }

  // 分类快捷选择
  function catList(){
    var set = {};
    ((data.site && data.site.categories) || []).forEach(function(c){ if(c) set[c] = 1; });
    (data.apps || []).forEach(function(a){ if(a.category) set[a.category] = 1; });
    return Object.keys(set);
  }
  function deleteCategory(name, count){
    var msg = count
      ? '删除分类「' + name + '」？\n\n该分类下有 ' + count + ' 个应用，删除后它们会变成「未分类」。'
      : '删除分类「' + name + '」？';
    if(!confirm(msg)) return;
    if(count){
      (data.apps || []).forEach(function(x){
        if((x.category || '未分类') === name) x.category = '';
      });
    }
    if(data.site && Array.isArray(data.site.categories)){
      data.site.categories = data.site.categories.filter(function(c){ return c !== name; });
    }
    if($('#f-category').value.trim() === name) $('#f-category').value = '';
    save();
    renderCatPick();
    render();
    toast('已删除分类：' + name);
  }
  function renderCatPick(){
    var box = $('#catpick');
    if(!box) return;
    var cur = $('#f-category').value.trim();
    var frag = document.createDocumentFragment();
    catList().forEach(function(c){
      var n = (data.apps || []).filter(function(x){ return (x.category || '未分类') === c; }).length;
      var wrapEl = document.createElement('span');
      wrapEl.className = 'catitem' + (c === cur ? ' on' : '');
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = c;
      b.onclick = function(){
        $('#f-category').value = c;
        renderCatPick();
      };
      var del = document.createElement('button');
      del.type = 'button';
      del.className = 'catdel';
      del.textContent = '×';
      del.title = n ? ('该分类下有 ' + n + ' 个应用') : '删除分类';
      del.onclick = function(e){
        e.stopPropagation();
        deleteCategory(c, n);
      };
      wrapEl.append(b, del);
      frag.append(wrapEl);
    });
    var add = document.createElement('button');
    add.type = 'button';
    add.className = 'add';
    add.textContent = '+ 新分类';
    add.onclick = function(){
      var v = prompt('新增分类名称（比如：社交、工具、影音）');
      if(!v) return;
      v = String(v).trim();
      if(!v) return;
      if(!data.site) data.site = {};
      if(!data.site.categories) data.site.categories = [];
      if(data.site.categories.indexOf(v) === -1) data.site.categories.push(v);
      data.site.updated = today();
      save();
      $('#f-category').value = v;
      renderCatPick();
      render();
      toast('已添加分类：' + v);
    };
    frag.append(add);
    box.replaceChildren(frag);
  }

  function edit(i){
    var a = data.apps[i];
    editing = i;
    $('#form-title').textContent = '编辑：' + a.name;
    $('#f-name').value = a.name || '';
    $('#f-version').value = a.version || '';
    $('#f-size').value = a.size || '';
    $('#f-category').value = a.category || '';
    setPlatform(a.platform || '');
    $('#f-icon').value = a.icon || '';
    $('#f-icontext').value = a.iconText || '';
    $('#f-url').value = a.url || '';
    $('#f-pwd').value = a.pwd || '';
    $('#f-date').value = a.date || '';
    $('#f-exp-date').value = a.expireAt || '';
    updateExpTip();
    $('#f-desc').value = a.description || '';
    previewTo($('#f-icon-prev'), a.icon);
    updateIconPrev();
    $('#state').textContent = '正在编辑第 ' + (i+1) + ' 条，保存后覆盖。';
    $('#f-name').focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm(){
    editing = -1;
    $('#form-title').textContent = '添加应用';
    ['#f-name','#f-version','#f-size','#f-category','#f-icon','#f-icontext','#f-url','#f-pwd','#f-desc'].forEach(function(s){ $(s).value = ''; });
    setPlatform('');
    $('#f-date').value = today();
    $('#f-exp-date').value = '';
    $('#f-exp-days').value = '';
    updateExpTip();
    $('#state').textContent = '';
    previewTo($('#f-icon-prev'), '');
    updateIconPrev();
  }

  // ---------- 上下架状态 ----------
  function dayStart(d){ var x = new Date(d); x.setHours(0,0,0,0); return x.getTime(); }
  function shelfState(a){
    if(a.offline) return { key: 'off', label: '已下架', left: null };
    if(a.expireAt){
      var end = dayStart(String(a.expireAt) + 'T00:00:00');
      if(!isNaN(end)){
        var left = Math.round((end - dayStart(new Date())) / 86400000);
        if(left < 0) return { key: 'expired', label: '已过期 ' + (-left) + ' 天', left: left };
        if(left <= 3) return { key: 'soon', label: '剩 ' + left + ' 天', left: left };
        return { key: 'ok', label: '剩 ' + left + ' 天', left: left };
      }
    }
    return { key: 'none', label: '', left: null };
  }
  function isDown(a){ var s = shelfState(a).key; return s === 'off' || s === 'expired'; }

  function updateExpTip(){
    var v = $('#f-exp-date').value;
    var tip = $('#f-exp-tip');
    if(!tip) return;
    if(!v){ tip.textContent = '不设有效期 ＝ 一直上架'; tip.className = 'tip'; return; }
    var left = Math.round((dayStart(v + 'T00:00:00') - dayStart(new Date())) / 86400000);
    if(left < 0){ tip.textContent = '这个日期已经过去，保存后会立即下架'; tip.className = 'tip warn'; }
    else { tip.textContent = '到 ' + v + ' 结束，还剩 ' + left + ' 天'; tip.className = 'tip'; }
  }

  // 名称排序：按首字母分桶，同字母内中文在前、英文在后
  var PY_PAIRS = [['阿','A'],['八','B'],['擦','C'],['搭','D'],['蛾','E'],['发','F'],['噶','G'],['哈','H'],
                  ['击','J'],['喀','K'],['拉','L'],['妈','M'],['拿','N'],['哦','O'],['啪','P'],['期','Q'],
                  ['然','R'],['撒','S'],['塌','T'],['挖','W'],['昔','X'],['压','Y'],['匝','Z']];
  var PY_COL_A = null;
  try { PY_COL_A = new Intl.Collator('zh-Hans-CN', { sensitivity: 'base' }); } catch(e) {}
  function nameMetaA(s){
    var str = String(s || '').trim();
    var ch = str ? Array.from(str)[0] : '';
    var out = { letter: '#', ascii: false, rest: str.toLowerCase() };
    if(!ch) return out;
    if(/[0-9]/.test(ch)){ out.letter = '0'; out.ascii = true; return out; }
    if(/[a-zA-Z]/.test(ch)){ out.letter = ch.toUpperCase(); out.ascii = true; return out; }
    if(!PY_COL_A) return out;
    for(var i = 0; i < PY_PAIRS.length; i++){
      if(PY_COL_A.compare(ch, PY_PAIRS[i][0]) >= 0) out.letter = PY_PAIRS[i][1];
      else break;
    }
    return out;
  }
  function compareNameA(x, y){
    var m1 = nameMetaA(x), m2 = nameMetaA(y);
    if(m1.letter !== m2.letter) return m1.letter < m2.letter ? -1 : 1;
    if(m1.ascii !== m2.ascii) return m1.ascii ? 1 : -1;
    return m1.rest.localeCompare(m2.rest, 'zh-Hans-CN', { numeric: true, sensitivity: 'base' });
  }

  function saveItem(){
    var name = $('#f-name').value.trim();
    var url = $('#f-url').value.trim();
    if(!name) { toast('请填写应用名称'); $('#f-name').focus(); return; }
    if(url && !/^https?:\/\//i.test(url)) { toast('链接要以 http:// 或 https:// 开头'); $('#f-url').focus(); return; }
    if(!url && !confirm('这条没有填链接，前台会显示为不可打开。仍然保存？')) return;

    var prev = editing >= 0 ? data.apps[editing] : null;
    var item = {
      id: (prev && prev.id) ? prev.id : 'a' + Date.now().toString(36),
      name: name,
      version: $('#f-version').value.trim(),
      category: $('#f-category').value.trim() || '未分类',
      platform: getPlatform(),
      size: $('#f-size').value.trim(),
      icon: $('#f-icon').value.trim(),
      iconText: $('#f-icontext').value.trim(),
      url: url,
      pwd: $('#f-pwd').value.trim(),
      description: $('#f-desc').value.trim(),
      date: $('#f-date').value || today(),
      expireAt: $('#f-exp-date').value || '',
      addedAt: (prev && (prev.addedAt || prev.date)) || nowLocal()
    };
    // 编辑时保留置顶 / 下架状态
    if(prev && prev.pinned) item.pinned = true;
    if(prev && prev.offline) item.offline = true;
    if(!item.expireAt) delete item.expireAt;

    if(editing >= 0){
      // 内容真的变了才刷新「更新时间」
      var changed = false;
      Object.keys(item).forEach(function(k){
        if(k === 'updatedAt') return;
        if(String(prev && prev[k] || '') !== String(item[k] || '')) changed = true;
      });
      item.updatedAt = changed ? nowLocal() : (prev && prev.updatedAt) || null;
      if(!item.updatedAt) delete item.updatedAt;
      data.apps[editing] = item;
      toast(changed ? '已更新（更新时间已刷新）' : '已更新');
    }
    else { delete item.updatedAt; data.apps.unshift(item); toast('已添加'); }

    data.site.updated = today();
    save(); resetForm(); render();
  }

  function download(filename, text){
    var blob = new Blob([text], { type: 'application/javascript;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.append(a);
    a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    toast('已下载 ' + filename);
  }

  function exportJS(){
    var head = '// 应用数据文件 —— 由管理页生成于 ' + new Date().toLocaleString('zh-CN') + '\n// 结构：site 站点信息，apps 应用列表（数组顺序就是默认展示顺序）\n';
    download('apps.js', head + 'window.APP_DATA = ' + JSON.stringify(data, null, 2) + ';\n');
    clearDirty();
  }
  function exportJSON(){ download('apps.json', JSON.stringify(data, null, 2)); }

  function parseImport(text){
    var t = text.trim();
    var objStart = t.indexOf('{'), arrStart = t.indexOf('[');
    var useArr = arrStart > -1 && (objStart === -1 || arrStart < objStart);
    var s, e;
    if(useArr){ s = arrStart; e = t.lastIndexOf(']'); }
    else { s = objStart; e = t.lastIndexOf('}'); }
    if(s === -1 || e === -1) throw new Error('格式看不懂');
    var parsed = JSON.parse(t.slice(s, e + 1));
    if(Array.isArray(parsed)) return { site: data.site, apps: parsed };
    if(!parsed || !Array.isArray(parsed.apps)) throw new Error('没有 apps 数组');
    return { site: parsed.site || data.site, apps: parsed.apps };
  }

  // ---------- 长按拖动排序 ----------
  (function dragSort(){
    var st = null;
    var box = $('#tablewrap');
    function ensureManual(){
      if(view.sort === 'manual') return true;
      view.sort = 'manual';
      var sel0 = $('#listsort'); if(sel0) sel0.value = 'manual';
      view.page = 1;
      render();
      toast('已切到「收录顺序」，现在可以拖动');
      return true;
    }
    function canDrag(){
      return !view.q.trim() && view.cat === '全部';
    }
    function endDrag(){
      if(!st) return;
      clearTimeout(st.timer);
      var wasActive = st.active, tr = st.tr;
      st = null;
      if(!wasActive) return;
      tr.classList.remove('dragging');
      document.body.classList.remove('dragging-row');
      var order = Array.prototype.map.call(tr.parentNode.children, function(r){ return Number(r.dataset.idx); });
      // 只处理「第 1 页、未筛选」的情况：显示顺序的索引就是前 N 条
      var ok = order.every(function(k){ return k >= 0 && k < order.length; });
      if(!ok){ toast('顺序没变'); render(); return; }
      var head = order.map(function(k){ return data.apps[k]; });
      data.apps = head.concat(data.apps.slice(order.length));
      if(data.site) data.site.updated = today();
      save(); render();
      toast('顺序已保存');
    }
    box.addEventListener('pointerdown', function(e){
      if(e.button) return;
      if(e.target.closest('.rowacts')) return;
      var tr = e.target.closest('tr');
      if(!tr || !tr.dataset.idx) return;
      st = { tr: tr, x: e.clientX, y: e.clientY, active: false, timer: null };
      st.timer = setTimeout(function(){
        if(!st) return;
        // 当前是「最新在前」：先切到收录顺序，重排一次让用户再拖
        if(view.sort !== 'manual'){
          view.sort = 'manual';
          var sel0 = $('#listsort'); if(sel0) sel0.value = 'manual';
          view.page = 1;
          st = null;
          render();
          toast('已切到「收录顺序」，再按住拖一次');
          return;
        }
        if(view.q.trim() || view.cat !== '全部'){
          toast('拖动排序请先清空搜索、分类选「全部」');
          st = null; return;
        }
        st.active = true;
        st.tr.classList.add('dragging');
        document.body.classList.add('dragging-row');
      }, 300);
    });
    box.addEventListener('pointermove', function(e){
      if(!st) return;
      if(!st.active){
        if(Math.abs(e.clientX - st.x) > 6 || Math.abs(e.clientY - st.y) > 6){ clearTimeout(st.timer); st = null; }
        return;
      }
      if(e.cancelable) e.preventDefault();
      var el = document.elementFromPoint(e.clientX, e.clientY);
      var over = el && el.closest ? el.closest('tr') : null;
      if(over && over !== st.tr && over.parentNode === st.tr.parentNode && over.dataset.idx){
        var r = over.getBoundingClientRect();
        over.parentNode.insertBefore(st.tr, (e.clientY > r.top + r.height / 2) ? over.nextSibling : over);
      }
    }, { passive: false });
    box.addEventListener('pointerup', endDrag);
    box.addEventListener('pointercancel', endDrag);
    document.addEventListener('pointerup', function(){ if(st && st.active) endDrag(); });
  })();

  // 统计里的「已下架 / 临期」可点，作为筛选开关
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('.linkbtn[data-filter]');
    if(!b) return;
    var f = b.getAttribute('data-filter');
    view.shelf = (view.shelf === f) ? 'all' : f;
    view.page = 1;
    render();
    if(view.shelf !== 'all') toast(f === 'down' ? '只看已下架' : '只看临期');
  });

  // 事件绑定
  // 有效期：快捷天数
  document.querySelectorAll('.expquick [data-days]').forEach(function(b){
    b.onclick = function(){
      var n = parseInt(b.getAttribute('data-days'), 10);
      var d = new Date(); d.setDate(d.getDate() + n);
      $('#f-exp-date').value = d.getFullYear() + '-' + ('0'+(d.getMonth()+1)).slice(-2) + '-' + ('0'+d.getDate()).slice(-2);
      updateExpTip();
    };
  });
  $('#f-exp-date').addEventListener('change', updateExpTip);
  $('#f-exp-clear').onclick = function(){
    $('#f-exp-date').value = '';
    $('#f-exp-days').value = '';
    updateExpTip();
    toast('已设为永久');
  };

  $('#save').onclick = saveItem;
  $('#reset').onclick = resetForm;
  $('#export-js').onclick = exportJS;
  $('#dirty-save').onclick = exportJS;
  $('#export-json').onclick = exportJSON;
  $('#import').onclick = function(){ $('#file').click(); };
  $('#file').onchange = function(){
    var f = this.files && this.files[0];
    if(!f) return;
    var r = new FileReader();
    r.onload = function(){
      try {
        var parsed = parseImport(String(r.result));
        if(!confirm('导入 ' + parsed.apps.length + ' 条，覆盖当前 ' + data.apps.length + ' 条？')) return;
        data = parsed;
        if(!data.site) data.site = {};
        save(); resetForm(); render(); syncSiteForm();
        toast('导入成功');
      } catch(err){ alert('导入失败：' + err.message); }
    };
    r.readAsText(f, 'utf-8');
    this.value = '';
  };
  $('#clearall').onclick = function(){
    if(!data.apps.length) return toast('已经是空的了');
    if(!confirm('清空全部 ' + data.apps.length + ' 条？这个操作不能撤销。')) return;
    var typed = prompt('最后一步：输入「清空」两个字确认（直接点取消就放弃）');
    if(typed === null) return toast('已取消');
    if(String(typed).trim() !== '清空') return toast('输入不对，已取消');
    data.apps = [];
    save(); resetForm(); render();
    toast('已清空全部');
  };

  // 链接里带 ?pwd= 时自动填提取码
  $('#f-url').addEventListener('blur', function(){
    var v = this.value.trim();
    if(!v) return;
    try {
      var u = new URL(v);
      var p = u.searchParams.get('pwd') || u.searchParams.get('p');
      if(p && !$('#f-pwd').value.trim()){ $('#f-pwd').value = p; $('#state').textContent = '已从链接自动识别提取码：' + p; }
    } catch(e) {}
  });
  $('#f-name').addEventListener('keydown', function(e){ if(e.key === 'Enter'){ e.preventDefault(); saveItem(); } });
  $('#f-platform').addEventListener('change', function(e){
    var lab = e.target.closest('label');
    if(lab) lab.classList.toggle('on', e.target.checked);
  });
  $('#f-name').addEventListener('input', updateIconPrev);
  $('#f-icontext').addEventListener('input', updateIconPrev);
  $('#f-category').addEventListener('input', renderCatPick);

  var qTimer;
  $('#q').addEventListener('input', function(){
    var v = this.value;
    clearTimeout(qTimer);
    qTimer = setTimeout(function(){ view.q = v; view.page = 1; render(); }, 140);
  });
  $('#listsort').addEventListener('change', function(){
    view.sort = this.value;
    view.page = 1;
    render();
  });

  // 数据体检
  function runCheck(){
    var apps = data.apps;
    var rules = [
      ['缺链接', function(a){ return !a.url; }],
      ['缺版本', function(a){ return !a.version; }],
      ['缺大小', function(a){ return !a.size; }],
      ['缺图标', function(a){ return !a.icon && !a.iconText; }],
      ['缺简介', function(a){ return !a.description; }],
      ['分类为空', function(a){ return !a.category || a.category === '未分类'; }]
    ];
    var html = '共 <b>' + apps.length + '</b> 条<br>';
    rules.forEach(function(r){
      var list = apps.filter(r[1]);
      if(!list.length){ html += '<div class="row ok">✓ ' + r[0] + '：全部都有</div>'; return; }
      html += '<div class="row">✗ ' + r[0] + '（' + list.length + '）：' +
        list.map(function(a){ return '<button class="name" data-q="' + esc(a.name) + '">' + esc(a.name) + '</button>'; }).join('') +
        '</div>';
    });
    var seen = {}, dup = [];
    apps.forEach(function(a){
      var k = String(a.name || '').trim();
      if(!k) return;
      if(seen[k]) dup.push(k); else seen[k] = 1;
    });
    html += dup.length
      ? '<div class="row">✗ 重名（' + dup.length + '）：' + dup.map(esc).join('、') + '</div>'
      : '<div class="row ok">✓ 重名：没有重复</div>';

    var panel = $('#checkpanel');
    panel.innerHTML = html;
    panel.hidden = false;
    Array.prototype.forEach.call(panel.querySelectorAll('.name'), function(b){
      b.onclick = function(){
        view.q = b.getAttribute('data-q');
        $('#q').value = view.q;
        view.page = 1;
        render();
      };
    });
  }
  $('#check').onclick = function(){
    var panel = $('#checkpanel');
    if(!panel.hidden){ panel.hidden = true; return; }
    runCheck();
  };

  $('#s-pass').addEventListener('keydown', function(e){
    if(e.key !== 'Enter') return;
    e.preventDefault();
    var input = this;
    var v = input.value.trim();
    if(!v){ toast('密码不能为空'); return; }
    if(!(window.crypto && crypto.subtle)){ toast('这个浏览器不支持，换一个试试'); return; }
    sha256hex(v).then(function(h){
      data.site = data.site || {};
      data.site.passwordHash = h;
      data.site.pwdLen = v.length;
      delete data.site.password;
      save();
      input.value = '';
      updatePassTip();
      toast('密码已设置，前台刷新后生效');
    }).catch(function(){ toast('设置失败'); });
  });

  $('#s-pass-clear').onclick = function(){
    if(!(data.site && data.site.passwordHash)) return toast('本来就没设密码');
    if(!confirm('取消密码后，任何人拿到网址都能进入，确定？')) return;
    delete data.site.passwordHash;
    delete data.site.password;
    delete data.site.pwdLen;
    save();
    updatePassTip();
    toast('已取消密码');
  };

  // 公告栏事件
  function saveNotice(){
    noticeObj().updated = nowLocal();
    save();
  }
  $('#n-show').onchange = function(){ noticeObj().show = this.checked; saveNotice(); };
  $('#n-text').addEventListener('input', function(){ noticeObj().text = this.value; saveNotice(); });
  $('#n-img').addEventListener('input', function(){
    var v = this.value.trim();
    if(v) noticeObj().image = v; else delete noticeObj().image;
    previewTo($('#n-imgprev'), v);
    saveNotice();
  });
  $('#n-img-up').onclick = function(){
    pickImage(function(file){
      uploadImage(file, '公告图').then(function(p){
        noticeObj().image = p;
        $('#n-img').value = p;
        previewTo($('#n-imgprev'), p);
        saveNotice();
        toast('公告图片已设置');
      }).catch(function(err){ toast(err.message); });
    });
  };
  $('#n-img-clear').onclick = function(){
    delete noticeObj().image;
    $('#n-img').value = '';
    previewTo($('#n-imgprev'), '');
    saveNotice();
  };
  $('#n-file-up').onclick = function(){
    pickAnyFile(function(file){
      uploadFileBlob(file).then(function(j){
        var n = noticeObj();
        n.file = j.path;
        n.fileName = file.name;
        n.fileSize = j.bytes;
        $('#n-file').value = j.path;
        $('#n-file').title = file.name;
        saveNotice();
        toast('附件已上传');
      }).catch(function(err){ toast(err.message); });
    });
  };
  $('#n-file-clear').onclick = function(){
    var n = noticeObj();
    delete n.file; delete n.fileName; delete n.fileSize;
    $('#n-file').value = '';
    saveNotice();
  };

  // ---------- 图片裁剪 ----------
  var crop = { cb: null, sel: null, dragging: false, sx: 0, sy: 0, file: null };

  function clamp(v, a, b){ return Math.min(Math.max(v, a), b); }

  function drawSel(){
    var box = $('#cropsel');
    if(!crop.sel){ box.style.display = 'none'; return; }
    box.style.display = 'block';
    box.style.left = crop.sel.x + 'px';
    box.style.top = crop.sel.y + 'px';
    box.style.width = crop.sel.w + 'px';
    box.style.height = crop.sel.h + 'px';
  }

  function openCropper(file, cb, max){
    var img = $('#cropimg');
    crop.file = file;
    crop.cb = cb;
    crop.max = Number(max) > 0 ? Number(max) : 512;
    crop.sel = null;
    crop.dragging = false;
    drawSel();
    $('#cropinfo').textContent = '拖动可以重新框选，不拖就是整张图';
    var url = URL.createObjectURL(file);
    img.onerror = function(){
      URL.revokeObjectURL(url);
      $('#cropper').close();
      toast('这张图打不开，换一张试试（jpg / png / webp）');
    };
    img.onload = function(){
      URL.revokeObjectURL(url);
      crop.sel = { x: 0, y: 0, w: img.clientWidth, h: img.clientHeight };
      drawSel();
    };
    img.src = url;
    $('#cropper').showModal();
  }

  (function bindCropper(){
    var stage = $('#cropstage');
    function pos(e){
      var r = stage.getBoundingClientRect();
      return { x: clamp(e.clientX - r.left, 0, r.width), y: clamp(e.clientY - r.top, 0, r.height), w: r.width, h: r.height };
    }
    stage.addEventListener('pointerdown', function(e){
      var p = pos(e);
      crop.dragging = true;
      crop.sx = p.x; crop.sy = p.y;
      crop.sel = { x: p.x, y: p.y, w: 0, h: 0 };
      try { stage.setPointerCapture(e.pointerId); } catch(err) {}
      e.preventDefault();
    });
    stage.addEventListener('pointermove', function(e){
      if(!crop.dragging) return;
      var p = pos(e);
      var x0 = Math.min(crop.sx, p.x), y0 = Math.min(crop.sy, p.y);
      var w = Math.abs(p.x - crop.sx), h = Math.abs(p.y - crop.sy);
      if($('#crop-square').checked){
        var cx = x0 + w / 2, cy = y0 + h / 2;
        var s = Math.max(w, h, 8);
        s = Math.min(s, Math.min(cx, p.w - cx) * 2, Math.min(cy, p.h - cy) * 2);
        x0 = cx - s / 2; y0 = cy - s / 2; w = h = s;
      }
      crop.sel = { x: x0, y: y0, w: w, h: h };
      drawSel();
      e.preventDefault();
    });
    stage.addEventListener('pointerup', function(){
      if(!crop.dragging) return;
      crop.dragging = false;
      if(!crop.sel || crop.sel.w < 8 || crop.sel.h < 8){
        var img = $('#cropimg');
        crop.sel = { x: 0, y: 0, w: img.clientWidth, h: img.clientHeight };
        drawSel();
      }
    });
    stage.addEventListener('pointercancel', function(){ crop.dragging = false; });
  })();

  $('#crop-cancel').onclick = function(){ $('#cropper').close(); };
  $('#crop-original').onclick = function(){
    var f = crop.file, cb = crop.cb;
    $('#cropper').close();
    if(f && cb) cb(f);
  };
  $('#crop-ok').onclick = function(){
    var img = $('#cropimg');
    var s = crop.sel;
    if(!s || !s.w || !s.h){ toast('先框选一块区域'); return; }
    var scale = img.naturalWidth / img.clientWidth;
    var sx = Math.round(s.x * scale), sy = Math.round(s.y * scale);
    var sw = Math.max(1, Math.round(s.w * scale)), sh = Math.max(1, Math.round(s.h * scale));
    var MAX = crop.max || 512;
    var outW = sw, outH = sh;
    if(sw >= sh && sw > MAX){ outW = MAX; outH = Math.round(sh * MAX / sw); }
    if(sh > sw && sh > MAX){ outH = MAX; outW = Math.round(sw * MAX / sh); }
    var cv = document.createElement('canvas');
    cv.width = Math.max(1, outW);
    cv.height = Math.max(1, outH);
    var ctx = cv.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cv.width, cv.height);
    cv.toBlob(function(blob){
      $('#cropper').close();
      if(!blob){ toast('裁剪失败，试试「用原图」'); return; }
      if(crop.cb) crop.cb(new File([blob], 'crop-' + Date.now().toString(36) + '.png', { type: 'image/png' }));
    }, 'image/png');
  };

  // 上传图片按钮（先裁剪再上传）
  function handleIconFile(file, isSite){
    var hint = isSite
      ? ((data.site && data.site.title) || '站点图标')
      : ($('#f-name').value.trim() || '应用图标');
    uploadImage(file, hint).then(function(p){
      if(isSite){
        $('#s-icon').value = p;
        if(!data.site) data.site = {};
        data.site.icon = p;
        previewTo($('#s-icon-prev'), p);
        save();
        toast(SERVER ? '图标已上传，刷新前台就能看到' : '已转成内嵌图片，记得导出');
      } else {
        $('#f-icon').value = p;
        previewTo($('#f-icon-prev'), p);
        toast('图标已就绪，点「保存」生效');
      }
    }).catch(function(err){ toast(err.message); });
  }
  $('#s-icon-up').onclick = function(){
    pickImage(function(file){ openCropper(file, function(f){ handleIconFile(f, true); }, 128); });
  };
  // 壁纸：先缩到 1920px 宽再上传，避免几 MB 的大图拖慢前台
  function shrinkWallpaper(file){
    return new Promise(function(resolve){
      var url = URL.createObjectURL(file);
      var im = new Image();
      im.onload = function(){
        var MAXW = 1920;
        var w = im.naturalWidth, h = im.naturalHeight;
        if(w <= MAXW){ URL.revokeObjectURL(url); resolve(file); return; }
        var cv = document.createElement("canvas");
        cv.width = MAXW; cv.height = Math.round(h * MAXW / w);
        cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height);
        cv.toBlob(function(blob){
          URL.revokeObjectURL(url);
          if(!blob){ resolve(file); return; }
          resolve(new File([blob], "wall-" + Date.now() + ".jpg", { type: "image/jpeg" }));
        }, "image/jpeg", 0.85);
      };
      im.onerror = function(){ URL.revokeObjectURL(url); resolve(file); };
      im.src = url;
    });
  }
  // 背景壁纸：电脑 / 手机 两张
  ['s-wall-desk','s-wall-mob'].forEach(function(id){
    var key = id === 's-wall-desk' ? 'wallDesktop' : 'wallMobile';
    var up = $('#' + id + '-up');
    var box = $('#' + id);
    var prev = $('#' + id + '-prev');
    up.onclick = function(){
      pickImage(function(file){
        shrinkWallpaper(file).then(function(f){ return uploadImage(f, '壁纸'); }).then(function(p){
          if(!data.site) data.site = {};
          data.site[key] = p;
          box.value = p;
          previewTo(prev, p);
          save();
          toast('壁纸已更新');
        }).catch(function(e){ toast(e.message); });
      });
    };
    var clr = document.querySelector('[data-clear="' + id + '"]');
    if(clr) clr.onclick = function(){
      box.value = '';
      delete data.site[key];
      previewTo(prev, '');
      save();
      toast('已清空壁纸');
    };
  });
  $('#f-icon-up').onclick = function(){
    pickImage(function(file){ openCropper(file, function(f){ handleIconFile(f, false); }, 128); });
  };

  // ---------- 一键发布到 GitHub ----------
  var PUB_KEY = 'appindex.publish.v1';
  function pubCfg(){
    return {
      repo: $('#p-repo').value.trim(),
      branch: $('#p-branch').value.trim() || 'main',
      token: $('#p-token').value.trim(),
      auto: $('#p-auto').checked
    };
  }
  function savePubCfg(){
    try { localStorage.setItem(PUB_KEY, JSON.stringify(pubCfg())); } catch(e) {}
  }
  function loadPubCfg(){
    var c = {};
    try { c = JSON.parse(localStorage.getItem(PUB_KEY)) || {}; } catch(e) {}
    $('#p-repo').value = c.repo || '';
    $('#p-branch').value = c.branch || 'main';
    $('#p-token').value = c.token || '';
    $('#p-auto').checked = !!c.auto;
  }
  // 浏览器模式发布：只推 data/apps.js（手机上也能用）
  function b64utf8(str){
    return btoa(unescape(encodeURIComponent(str)));
  }
  function publishBrowser(c){
    var d = JSON.parse(JSON.stringify(data));
    d.site = d.site || {};
    d.site.rev = Date.now();
    var text = '// 应用数据文件 —— 由管理页发布 ' + new Date().toLocaleString('zh-CN') + '\n' +
      '// 结构：site 站点信息，apps 应用列表（数组顺序就是默认展示顺序）\n' +
      'window.APP_DATA = ' + JSON.stringify(d, null, 2) + ';\n';
    var path = 'data/apps.js';
    var url = 'https://api.github.com/repos/' + c.repo + '/contents/' + path.split('/').map(encodeURIComponent).join('/');
    var headers = {
      Authorization: 'Bearer ' + c.token,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json'
    };
    return fetch(url + '?ref=' + encodeURIComponent(c.branch), { headers: headers, cache: 'no-store' })
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(meta){
        var body = {
          message: '更新 apps.js  ' + new Date().toLocaleString('zh-CN'),
          content: b64utf8(text),
          branch: c.branch
        };
        if(meta && meta.sha) body.sha = meta.sha;
        return fetch(url, { method: 'PUT', headers: headers, body: JSON.stringify(body) });
      })
      .then(function(r){
        return r.json().then(function(j){ return { ok: r.ok, j: j }; });
      });
  }

  function publishNow(silent){
    var c = pubCfg();
    if(!c.repo || !c.token){
      if(!silent) toast('先把仓库和令牌填上');
      return Promise.resolve(false);
    }
    var tip = $('#p-tip');
    tip.className = 'tip';

    if(!SERVER){
      // 没有本地服务（比如手机打开线上管理页）：直接找 GitHub
      tip.textContent = '正在发布（浏览器模式，只推数据）…';
      return publishBrowser(c).then(function(res){
        if(res.ok){
          tip.className = 'tip ok';
          tip.textContent = '✓ 数据已发布，等 1 分钟线上生效';
          clearDirty();
          if(!silent) toast('发布成功');
          return true;
        }
        var msg = (res.j && res.j.message) || '未知错误';
        tip.textContent = '✗ ' + msg;
        if(!silent) toast('发布失败：' + msg);
        return false;
      }).catch(function(e){
        tip.textContent = '✗ ' + e.message;
        if(!silent) toast('发布失败：' + e.message);
        return false;
      });
    }

    tip.textContent = '正在发布…';
    return fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: c.token, repo: c.repo, branch: c.branch, prune: true })
    }).then(function(r){ return r.json(); }).then(function(j){
      if(j && j.ok){
        tip.className = 'tip ok';
        tip.textContent = '✓ 已发布：' + j.changed + ' 个文件更新' +
          (j.deleted ? '，' + j.deleted + ' 个旧文件已删除' : '') +
          '，' + j.skipped + ' 个无变化' +
          (j.backup ? '　｜　已更新 备份 文件夹' : '');
        if(!silent) toast('发布成功，等 1 分钟线上生效');
        return true;
      }
      var msg = (j && j.error) || (j && j.failed && j.failed[0] && j.failed[0].error) || '未知错误';
      tip.textContent = '✗ ' + msg;
      if(!silent) toast('发布失败：' + msg);
      return false;
    }).catch(function(e){
      tip.textContent = '✗ ' + e.message;
      if(!silent) toast('发布失败：' + e.message);
      return false;
    });
  }
  var pubTimer;
  function schedulePublish(){
    if(!$('#p-auto').checked) return;
    clearTimeout(pubTimer);
    pubTimer = setTimeout(function(){ publishNow(true); }, 6000);
  }

  // 启动
  data = load();
  if(!data.site) data.site = {};

  // ---------- 管理页门禁：设了密码就要先输 ----------
  (function adminGate(){
    var hash = data.site && data.site.passwordHash;
    if(!hash) return;
    if(sessionStorage.getItem('appindex.admin.unlocked') === hash) return;

    var box = $('#agate');
    var pw = $('#agatepw');
    var pins = $('#agatepins');
    var LEN = Number(data.site.pwdLen) > 0 ? Math.min(12, Number(data.site.pwdLen)) : 6;
    var cells = [];
    for(var i = 0; i < LEN; i++){
      var c = document.createElement('div');
      c.className = 'pin';
      c.appendChild(document.createElement('i'));
      pins.appendChild(c);
      cells.push(c);
    }
    function sync(){
      var n = pw.value.length;
      cells.forEach(function(el, i){
        el.classList.toggle('filled', i < n);
        el.classList.toggle('active', i === n && document.activeElement === pw);
      });
    }
    // 输错锁定：跟 iPhone 一样，第 5 次开始计时
    var LOCK_KEY = 'appindex.pwlock';
    var LOCK_STEPS = { 5: 60, 6: 300, 7: 900, 8: 1800, 9: 3600 };
    function lockGet(){
      try { var o = JSON.parse(localStorage.getItem(LOCK_KEY) || '{}'); return { n: o.n || 0, until: o.until || 0 }; }
      catch(e){ return { n: 0, until: 0 }; }
    }
    function lockSet(o){ try { localStorage.setItem(LOCK_KEY, JSON.stringify(o)); } catch(e){} }
    function lockClear(){ try { localStorage.removeItem(LOCK_KEY); } catch(e){} }
    function lockLeft(){ return Math.max(0, Math.round((lockGet().until - Date.now()) / 1000)); }
    var lockTimer;
    function showLock(){
      var left = lockLeft();
      var err = $('#agateerr');
      if(left <= 0) return false;
      pw.value = ''; sync(); pw.disabled = true;
      var okBtn = $('#agateok'); if(okBtn) okBtn.disabled = true;
      err.hidden = false;
      var paint = function(){
        var l = lockLeft();
        if(l <= 0){
          clearInterval(lockTimer);
          pw.disabled = false;
          var b2 = $('#agateok'); if(b2) b2.disabled = false;
          err.hidden = true;
          err.textContent = '密码错误，请重试';
          pw.focus(); sync();
          return;
        }
        var m = Math.floor(l / 60), s2 = l % 60;
        err.textContent = '密码错误次数过多，请在 ' + (m ? m + ' 分 ' + (s2 ? s2 + ' 秒' : '') : s2 + ' 秒') + '后重试';
      };
      paint();
      clearInterval(lockTimer);
      lockTimer = setInterval(paint, 1000);
      return true;
    }

    function submit(){
      if(lockLeft() > 0) return;
      var v = pw.value;
      if(!v) return;
      sha256hex(v).then(function(h){
        if(h === hash){
          sessionStorage.setItem('appindex.admin.unlocked', hash);
          lockClear();
          box.hidden = true;
        } else {
          var o = lockGet();
          o.n = (o.n || 0) + 1;
          var secs = LOCK_STEPS[o.n] || 0;
          if(secs) o.until = Date.now() + secs * 1000;
          lockSet(o);
          if(showLock()) return;
          $('#agateerr').hidden = false;
          pins.classList.add('shake');
          setTimeout(function(){ pins.classList.remove('shake'); }, 340);
          pw.value = ''; sync(); pw.focus();
        }
      }).catch(function(){ toast('这个浏览器不支持密码校验'); });
    }
    box.hidden = false;
    showLock();
    pins.addEventListener('click', function(){ pw.focus(); });
    pw.addEventListener('focus', sync);
    pw.addEventListener('blur', sync);
    pw.addEventListener('input', function(){
      if(pw.value.length > LEN) pw.value = pw.value.slice(0, LEN);
      sync();
    });
    pw.addEventListener('keydown', function(e){ if(e.key === 'Enter') submit(); });
    $('#agateok').onclick = submit;
    setTimeout(function(){ pw.focus(); sync(); }, 80);
  })();

  $('#f-date').value = today();
  bindSiteForm();
  syncSiteForm();
  syncNoticeForm();
  render();
  updatePassTip();
  loadPubCfg();
  ['#p-repo','#p-branch','#p-token'].forEach(function(sel){
    $(sel).addEventListener('input', savePubCfg);
  });
  $('#p-auto').addEventListener('change', savePubCfg);
  $('#p-now').onclick = function(){ publishNow(false); };

  // 关掉页面时通知本地服务自动退出（浏览器关闭 → 黑窗口跟着关）
  window.addEventListener('pagehide', function(){
    if(!SERVER) return;
    try {
      if(navigator.sendBeacon) navigator.sendBeacon('api/bye');
      else fetch('api/bye', { method: 'POST', keepalive: true });
    } catch(e) {}
  });

  // 探测本地服务：有就直接写文件，没有就是导出模式
  fetch('api/ping', { cache: 'no-store' }).then(function(r){ return r.json(); }).then(function(j){
    if(j && j.ok){
      SERVER = true;
      $('#mode').textContent = '直连保存';
      $('#mode').classList.add('on');
      $('#form-sub').textContent = '保存会直接写进 data/apps.js，前台刷新就能看到。';
      clearDirty();
      // 打开管理页就自动同步一次（把本地攒下的改动推上去）
      var c = pubCfg();
      if(c.repo && c.token){
        setTimeout(function(){ publishNow(true); }, 900);
      }
    }
  }).catch(function(){
    // 没有本地服务（比如手机上打开线上管理页）
    if($('#p-token').value){
      $('#mode').textContent = '浏览器发布';
      $('#mode').classList.add('on');
    }
  });
})();
