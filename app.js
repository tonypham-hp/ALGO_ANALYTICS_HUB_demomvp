/* ============================================================
   ALGO ANALYTICS HUB — APP ENGINE
   ============================================================ */

const ICONS = {
  home: `<path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2v-9z"/>`,
  globe: `<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>`,
  table: `<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/>`,
  building: `<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>`,
  bulb: `<path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3 11c.6.5 1 1 1 2h4c0-1 .4-1.5 1-2a6 6 0 0 0-3-11z"/>`,
  beaker: `<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>`,
  book: `<path d="M4 5a2 2 0 0 1 2-2h12a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2V5z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>`,
  user: `<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/>`,
  search: `<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>`,
  bell: `<path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 21a2 2 0 0 0 4 0"/>`,
  chevron: `<path d="M9 6l6 6-6 6"/>`,
  ai: `<path d="M12 2l1.8 4.2L18 8l-4.2 1.8L12 14l-1.8-4.2L6 8l4.2-1.8L12 2z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"/>`,
  send: `<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>`,
  arrow: `<path d="M5 12h14M13 6l6 6-6 6"/>`,
};
function ic(name, size=16){ return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]||''}</svg>`; }

/* ===== Cấu trúc điều hướng — 7 miền, 41 chức năng UI + gợi ý AI ===== */
const DOMAINS = [
  { id:"market", label:"Thị trường & Vĩ mô", icon:"globe", feats:[
    {id:"vimo", num:2, name:"Vĩ mô"},
    {id:"lichkt", num:3, name:"Lịch K.tế"},
    {id:"thitruong", num:4, name:"Thị trường"},
    {id:"nganh", num:5, name:"Ngành"},
    {id:"hanghoa", num:6, name:"Hàng hóa"},
    {id:"marketwatch", num:16, name:"Market Watch đầy đủ"},
    {id:"marketwatchnganh", num:17, name:"Market Watch ngành"},
    {id:"gdcdlon", num:25, name:"GD CĐ lớn & nội bộ"},
    {id:"tinhieunoibo", num:36, name:"Tín hiệu nội bộ tự động", ai:1},
  ]},
  { id:"price", label:"Bảng giá & Giao dịch", icon:"table", feats:[
    {id:"banggia", num:1, name:"Bảng giá hợp nhất"},
    {id:"ptkt", num:9, name:"PTKT"},
    {id:"giaodichao", num:12, name:"Giao dịch ảo"},
    {id:"tinhieumohinh", num:13, name:"Tín hiệu theo mô hình"},
    {id:"giaodichaonangcao", num:40, name:"Giao dịch ảo nâng cao"},
  ]},
  { id:"company", label:"Doanh nghiệp & Định giá", icon:"building", feats:[
    {id:"dn360", num:7, name:"DN 360"},
    {id:"dinhgia", num:10, name:"Định giá"},
    {id:"sosanh4loai", num:19, name:"So sánh 4 loại hình DN"},
    {id:"chisonganhang", num:22, name:"Chỉ số ngân hàng sâu"},
    {id:"duphong", num:24, name:"Dự phóng LN / PE Fwd"},
    {id:"diemchatluong", num:29, name:"Điểm chất lượng CP", ai:1},
  ]},
  { id:"idea", label:"Ý tưởng & Phân tích", icon:"bulb", feats:[
    {id:"ytuong", num:8, name:"Ý tưởng"},
    {id:"sosanhreturn", num:18, name:"So sánh Return"},
    {id:"phantichnganh", num:20, name:"Phân tích ngành"},
    {id:"phantichdanhmuc", num:21, name:"Phân tích danh mục"},
    {id:"multistrategy", num:35, name:"Multi-strategy Backtest"},
  ]},
  { id:"tools", label:"Công cụ định lượng", icon:"beaker", feats:[
    {id:"boloc", num:14, name:"Bộ lọc 3 cấp độ"},
    {id:"backtestcongthuc", num:23, name:"Backtest công thức"},
    {id:"backtesttudong", num:30, name:"Backtest tự động"},
    {id:"chocongthuc", num:37, name:"Chợ công thức nội bộ"},
  ]},
  { id:"knowledge", label:"Kiến thức & Trợ lý AI", icon:"book", feats:[
    {id:"nhan", num:15, name:"Nhãn minh bạch dữ liệu"},
    {id:"trungtamkienthuc", num:26, name:"Trung tâm Kiến thức"},
    {id:"tudien", num:27, name:"Từ điển thuật ngữ"},
    {id:"chatbotv1", num:28, name:"Chatbot AI v1", ai:1},
    {id:"diengiaiAI", num:31, name:"Diễn giải tự động AI", ai:1},
    {id:"kienthucmorong", num:33, name:"Kiến thức mở rộng"},
    {id:"chatbotv2", num:34, name:"Chatbot AI v2 (RAG)", ai:1},
    {id:"chatbotchudong", num:39, name:"Chatbot chủ động", ai:1},
  ]},
  { id:"personal", label:"Cá nhân hóa", icon:"user", feats:[
    {id:"danhmucquantam", num:11, name:"Danh mục quan tâm"},
    {id:"bantin", num:38, name:"Bản tin cá nhân hóa", ai:1},
    {id:"dashboardvaitro", num:41, name:"Dashboard theo vai trò"},
    {id:"nhatky", num:42, name:"Nhật ký giao dịch nội bộ"},
  ]},
];

const FEAT_INDEX = {}; // id -> {domain, feat}
DOMAINS.forEach(d=> d.feats.forEach(f=> FEAT_INDEX[f.id] = {domain:d, feat:f}));

/* ===== state ===== */
const STATE = { domain: "market", feature: null, openDomains: new Set(["market"]), role: "ba" };

/* ===== helpers UI ===== */
const fmt = n => n.toLocaleString('vi-VN');
const chg = (v) => `<span class="${v>0?'chg-up':v<0?'chg-down':'chg-flat'}">${v>0?'+':''}${v.toFixed(2)}</span>`;
const pctChg = (v) => `<span class="${v>0?'chg-up':v<0?'chg-down':'chg-flat'}">${v>0?'▲':v<0?'▼':'—'} ${Math.abs(v).toFixed(2)}%</span>`;

function card(title, inner, opts={}){
  return `<div class="card" ${opts.style?`style="${opts.style}"`:''}>
    ${title? `<div class="card-head"><div class="${opts.big?'card-title-lg':'card-title'}">${title}</div>${opts.right||''}</div>`:''}
    ${inner}
  </div>`;
}
function statCard(label, value, sub, cls=""){
  return `<div class="card"><div class="card-title">${label}</div><div class="stat-big ${cls}">${value}</div><div class="stat-sub">${sub||''}</div></div>`;
}
function pill(text, kind){ return `<span class="pill pill-${kind}">${text}</span>`; }

function tickerRow(t, extraCols=""){
  return `<tr><td class="tk" onclick="gotoTicker('${t.code}')">${t.code}</td><td class="txt">${t.name}</td>
    <td>${fmt(t.price)}</td><td>${pctChg(t.chg)}</td><td class="txt">${t.sector}</td>${extraCols}</tr>`;
}

function pageHead(feat, desc){
  return `<div class="page-head"><div><div class="page-title">${feat.num? feat.num+' · ':''}${feat.name||feat.label}</div>
    <div class="page-desc">${desc||''}</div></div></div>`;
}
function crumbs(domain, feat){
  return `<div class="crumbs"><span class="back" onclick="selectDomain('${domain.id}')">${domain.label}</span>
    ${feat? `<span>›</span><span class="cur">${feat.name}</span>`:''}</div>`;
}

/* ===== render sidebar ===== */
function renderSidebar(){
  const el = document.getElementById('sidebar');
  el.innerHTML = DOMAINS.map(d=>{
    const open = STATE.openDomains.has(d.id);
    const activeHead = STATE.domain===d.id && !STATE.feature;
    return `<div class="sb-domain ${open?'open':''}">
      <div class="sb-domain-head ${activeHead?'active':''}" onclick="toggleDomain('${d.id}')">
        <span class="sb-ic">${ic(d.icon)}</span>
        <span class="sb-label">${d.label}</span>
        <span class="sb-count">${d.feats.length}</span>
        <span class="sb-chevron">${ic('chevron',12)}</span>
      </div>
      <div class="sb-feats">
        ${d.feats.map(f=> `<div class="sb-feat ${STATE.feature===f.id?'active':''}" onclick="selectFeature('${d.id}','${f.id}', event)">
          <span>${f.num} · ${f.name}</span>
          ${f.ai? `<span class="sb-badge">AI</span>`:''}
        </div>`).join('')}
      </div>
    </div>`;
  }).join('');
}
function toggleDomain(id){
  if(STATE.openDomains.has(id)) STATE.openDomains.delete(id); else STATE.openDomains.add(id);
  renderSidebar();
}
function selectDomain(id){
  STATE.domain=id; STATE.feature=null; STATE.openDomains.add(id);
  renderSidebar(); renderMain();
}
function selectFeature(domainId, featId, e){
  if(e) e.stopPropagation();
  STATE.domain=domainId; STATE.feature=featId; STATE.openDomains.add(domainId);
  renderSidebar(); renderMain();
  document.getElementById('main').scrollTop=0;
}
function gotoTicker(code){
  selectFeature('company','dn360'); setTimeout(()=>setDn360Ticker(code), 30);
}

/* ===== main render dispatch ===== */
function renderMain(){
  const el = document.getElementById('main');
  const domain = DOMAINS.find(d=>d.id===STATE.domain);
  if(!STATE.feature){
    el.innerHTML = domainHub(domain);
  } else {
    const f = domain.feats.find(x=>x.id===STATE.feature);
    const fn = SCREENS[STATE.feature];
    el.innerHTML = crumbs(domain, f) + (fn? fn(f) : emptyScreen(f));
    afterRenderHook(STATE.feature);
  }
}

function domainHub(domain){
  return crumbs(domain) + pageHead(domain, domainDesc[domain.id]) +
    `<div class="grid grid-3">${domain.feats.map(f=>`
      <div class="feature-hub-card" onclick="selectFeature('${domain.id}','${f.id}')">
        <div class="fhc-num">#${f.num}</div>
        <div class="fhc-title">${f.name}</div>
        <div class="fhc-desc">${featDesc[f.id]||''}</div>
        ${f.ai? `<span class="fhc-ai">${ic('ai',11)} AI</span>`:''}
      </div>`).join('')}
    </div>`;
}

function emptyScreen(f){
  return `<div class="empty-state">Màn hình "${f.name}" đang được thiết kế chi tiết hơn trong bản kế tiếp.</div>`;
}

function afterRenderHook(id){
  // gọi các hàm vẽ chart/canvas sau khi DOM đã render — từng màn tự đăng ký trong window.__after
  if(window.__after && window.__after[id]) window.__after[id]();
}
