/* ============================================================
   TRANG CHỦ / TỔNG QUAN
   ============================================================ */
function homeScreen(){
  window.__after.home = () => {
    Chart2.multiLine(document.getElementById('homeIdx'), [{data:D.spark(3,30,1650,14), color:"#3ecf8e"}]);
    Chart2.gauge(document.getElementById('homeGauge'), 42);
  };
  const topBuy = D.tickers.filter(t=>t.chg>0).sort((a,b)=>b.chg-a.chg).slice(0,5);
  const topSell = D.tickers.filter(t=>t.chg<0).sort((a,b)=>a.chg-b.chg).slice(0,5);
  return `
  <div class="page-head"><div>
    <div class="page-title">Tổng quan thị trường</div>
    <div class="page-desc">Điểm khởi đầu mỗi phiên — chỉ số chính, dòng tiền, tâm lý thị trường và tín hiệu đáng chú ý nhất hôm nay.</div>
  </div></div>
  <div class="grid grid-4">
    ${D.indices.map(i=>statCard(i.name, fmt(i.value), `${chg(i.chg)} (${pctChg(i.pct)})`)).join('')}
  </div>
  <div class="grid" style="grid-template-columns:1.6fr 1fr; margin-top:14px;">
    ${card("VN-Index · 1 tháng", `<canvas id="homeIdx" style="width:100%;height:180px;"></canvas>`)}
    ${card("Chỉ số Sợ hãi / Tham lam", `<div class="gauge-wrap"><canvas id="homeGauge" width="220" height="130" style="width:100%;height:110px;"></canvas><div class="gauge-val">42% <span style="font-size:13px;color:var(--text-2);">Sợ hãi</span></div></div>`)}
  </div>
  <div class="grid grid-3" style="margin-top:14px;">
    ${card("Top tăng giá", topBuy.map(t=>`<div class="list-item"><span class="tk" onclick="gotoTicker('${t.code}')" style="width:50px;">${t.code}</span>${pctChg(t.chg)}</div>`).join(''))}
    ${card("Top giảm giá", topSell.map(t=>`<div class="list-item"><span class="tk" onclick="gotoTicker('${t.code}')" style="width:50px;">${t.code}</span>${pctChg(t.chg)}</div>`).join(''))}
    ${card("Dòng tiền vào ngành mạnh nhất", D.sectors.slice().sort((a,b)=>b.flow-a.flow).slice(0,5).map(s=>`<div class="list-item"><span class="txt" style="flex:1;">${s.name}</span>${pctChg(s.pct)}</div>`).join(''))}
  </div>
  <div class="grid grid-2" style="margin-top:14px;">
    ${card("Tin tức mới nhất", D.news.map(n=>`<div class="list-item"><span class="cal-date">${n.time}</span><span class="txt">${n.title}</span></div>`).join(''))}
    ${card("Sự kiện sắp tới", D.events.slice(0,4).map(e=>`<div class="list-item"><span class="cal-date">${e.date}</span><span class="tk" onclick="gotoTicker('${e.code}')" style="width:44px;">${e.code}</span><span class="txt">${e.desc}</span></div>`).join(''))}
  </div>`;
}

/* ============================================================
   TÌM KIẾM TOÀN CỤC
   ============================================================ */
function buildSearchIndex(){
  const idx = [];
  DOMAINS.forEach(d=> d.feats.forEach(f=> idx.push({type:'feature', label:`${f.num} · ${f.name}`, group:d.label, go:()=>selectFeature(d.id,f.id)})));
  D.tickers.forEach(t=> idx.push({type:'ticker', label:`${t.code} — ${t.name}`, group:t.sector, go:()=>{ gotoTicker(t.code); }}));
  return idx;
}
let SEARCH_INDEX = [];
function initSearch(){
  SEARCH_INDEX = buildSearchIndex();
  const input = document.getElementById('globalSearch');
  const res = document.getElementById('searchResults');
  input.addEventListener('input', ()=>{
    const q = input.value.trim().toLowerCase();
    if(!q){ res.classList.remove('show'); return; }
    const matches = SEARCH_INDEX.filter(it=>it.label.toLowerCase().includes(q)).slice(0,8);
    res.innerHTML = matches.length? matches.map((m,i)=>`<div class="search-item" data-i="${i}">
      <span>${ic(m.type==='ticker'?'table':'bulb',13)}</span><span>${m.label}</span><span class="grp">${m.group}</span></div>`).join('')
      : `<div class="search-item" style="color:var(--text-3);">Không tìm thấy — thử từ khóa khác</div>`;
    res.classList.add('show');
    res.querySelectorAll('.search-item').forEach((el,i)=> el.onclick = () => { matches[i]?.go?.(); closeSearch(); });
  });
  input.addEventListener('focus', ()=>{ if(input.value.trim()) res.classList.add('show'); });
  document.addEventListener('click', (e)=>{ if(!e.target.closest('.search-wrap')) closeSearch(); });
}
function closeSearch(){
  document.getElementById('searchResults').classList.remove('show');
  document.getElementById('globalSearch').value='';
}

/* ============================================================
   KHỞI TẠO
   ============================================================ */
function goHome(){
  STATE.domain=null; STATE.feature=null;
  renderSidebar();
  document.getElementById('main').innerHTML = homeScreen();
  afterRenderHook('home');
  document.getElementById('main').scrollTop=0;
}

function init(){
  document.getElementById('clockText').textContent = D.now;
  renderSidebar();
  goHome();
  initSearch();
}
document.addEventListener('DOMContentLoaded', init);
