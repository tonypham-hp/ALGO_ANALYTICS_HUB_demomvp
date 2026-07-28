const SCREENS = {};
window.__after = {};

/* ---------- 2. Vĩ mô ---------- */
SCREENS.vimo = (f) => {
  const rows = D.macroMatrix.map(m=>`<tr>
    <td class="txt">${m.group}</td><td class="txt">${m.factor}</td>
    <td>${m.dir==='pos'?'<span class="chg-up">Tích cực</span>':m.dir==='neg'?'<span class="chg-down">Tiêu cực</span>':'<span class="chg-flat">Trung lập</span>'}</td>
    <td class="txt">${m.strength}</td></tr>`).join('');
  return pageHead(f,"Ma trận tác động 2 chiều: chiều hướng × mức độ ảnh hưởng của từng yếu tố vĩ mô tới VN-Index.") +
  `<div class="grid grid-2" style="grid-template-columns:1.4fr 1fr;">
    ${card("Ma trận tác động", `<table><thead><tr><th>Nhóm</th><th>Yếu tố</th><th>Ảnh hưởng</th><th>Mức độ</th></tr></thead><tbody>${rows}</tbody></table>`)}
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${card("Tình hình hiện tại", `<div class="small" style="color:var(--text-2);line-height:1.6;font-size:12.5px;">${D.macroNote.current}</div>`)}
      ${card("Nhận định xu hướng", `<div class="small" style="color:var(--text-2);line-height:1.6;font-size:12.5px;">${D.macroNote.outlook}</div>`)}
    </div>
  </div>
  <div class="note-box">Dữ liệu minh họa cho mục đích demo giao diện — không phải nhận định đầu tư thật.</div>`;
};

/* ---------- 3. Lịch K.tế ---------- */
SCREENS.lichkt = (f) => {
  const rows = D.macroCalendar.map(e=>`<div class="calendar-item">
    <div class="cal-date">${e.date}</div><div class="tag">${e.country}</div>
    <div class="txt" style="flex:1;">${e.name}</div>
    <div class="pill ${e.impact.includes('cao')||e.impact.includes('Cao')?'pill-sell':'pill-watch'}">${e.impact}</div>
  </div>`).join('');
  return pageHead(f,"Lịch công bố dữ liệu kinh tế Việt Nam, Mỹ và Trung Quốc — 3 nền kinh tế ảnh hưởng trực tiếp nhất tới TTCK Việt Nam.") +
  `<div class="chip-row"><span class="chip active">Tất cả</span><span class="chip">Việt Nam</span><span class="chip">Mỹ</span><span class="chip">Trung Quốc</span></div>
  ${card("Sự kiện sắp tới", rows)}`;
};

/* ---------- 4. Thị trường ---------- */
SCREENS.thitruong = (f) => {
  const topInfluence = D.tickers.slice(0,10).map(t=>({label:t.code, value:+(t.chg*1.4).toFixed(1)}));
  window.__after.thitruong = () => {
    Chart2.gauge(document.getElementById('gaugeFG'), 42);
    Chart2.gauge(document.getElementById('gaugeVT'), 58);
    Chart2.bars(document.getElementById('barInfluence'), topInfluence, {labels:true});
  };
  return pageHead(f,"Chỉ số Sợ hãi/Tham lam, độ rộng thị trường và Top ảnh hưởng chỉ số.") +
  `<div class="grid grid-4">
    ${statCard("VN-Index", fmt(D.indices[0].value), `${chg(D.indices[0].chg)} (${pctChg(D.indices[0].pct)})`)}
    ${statCard("Khối lượng", D.indices[0].vol, "Giá trị "+D.indices[0].val)}
    ${statCard("Độ rộng", `<span class="chg-up">${D.indices[0].up}</span> / <span class="chg-flat">${D.indices[0].flat}</span> / <span class="chg-down">${D.indices[0].down}</span>`, "Tăng / Đứng / Giảm")}
    ${statCard("Khối ngoại", "+284 tỷ", "Mua ròng phiên nay")}
  </div>
  <div class="grid grid-2" style="margin-top:14px;">
    ${card("Chỉ số Sợ hãi / Tham lam", `<div class="gauge-wrap"><canvas id="gaugeFG" width="220" height="130" style="width:100%;height:110px;"></canvas><div class="gauge-val">42% <span style="font-size:13px;color:var(--text-2);">Sợ hãi</span></div></div>`)}
    ${card("Vị thế thị trường", `<div class="gauge-wrap"><canvas id="gaugeVT" width="220" height="130" style="width:100%;height:110px;"></canvas><div class="gauge-val">58% <span style="font-size:13px;color:var(--text-2);">Trung tính</span></div></div>`)}
  </div>
  ${card("Top ảnh hưởng đến Index", `<canvas id="barInfluence" style="width:100%;height:180px;"></canvas>`, {style:"margin-top:14px;"})}`;
};

/* ---------- 5. Ngành ---------- */
SCREENS.nganh = (f) => {
  const sorted = [...D.sectors].sort((a,b)=>b.flow-a.flow);
  const max = Math.max(...sorted.map(s=>Math.abs(s.flow)));
  const rows = sorted.map(s=>`<div style="display:flex;align-items:center;gap:10px;margin-bottom:9px;">
    <div style="width:150px;font-size:12px;">${s.name}</div>
    <div style="flex:1;background:var(--bg-panel-2);border-radius:4px;height:16px;position:relative;overflow:hidden;">
      <div style="position:absolute;left:${s.flow>=0?'50%':'auto'};right:${s.flow<0?'50%':'auto'};width:${Math.abs(s.flow)/max*50}%;height:100%;background:${s.flow>=0?'var(--up)':'var(--down)'};opacity:.75;"></div>
    </div>
    <div class="mono" style="width:70px;text-align:right;font-size:11.5px;">${pctChg(s.pct)}</div>
  </div>`).join('');
  window.__after.nganh = () => Chart2.multiLine(document.getElementById('sectorTrend'), [
    {data:D.spark(1,16,100,8), color:"var(--up)"===0?"":"#3ecf8e"},
    {data:D.spark(2,16,100,8), color:"#e5566d"},
    {data:D.spark(3,16,100,8), color:"#e0b23c"},
  ]);
  return pageHead(f,"Phân bổ dòng tiền theo ngành và xu hướng tích lũy nhiều tuần.") +
  `<div class="tabs"><div class="tab active">Phân bổ dòng tiền</div><div class="tab">Chi tiết ngành</div></div>
  <div class="grid grid-2">
    ${card("Dòng tiền theo ngành (tỷ đồng)", rows)}
    ${card("Xu hướng dòng tiền 3 ngành dẫn đầu", `<canvas id="sectorTrend" style="width:100%;height:220px;"></canvas>`)}
  </div>`;
};

/* ---------- 6. Hàng hóa ---------- */
SCREENS.hanghoa = (f) => {
  const groupNames = Object.keys(D.commodityGroups);
  window.__hanghoa_group = groupNames[0];
  const render = () => {
    const g = window.__hanghoa_group;
    const rows = D.commodityGroups[g].map(c=>`<tr><td class="txt">${c.name}</td><td>${fmt(c.price)}</td><td>${pctChg(c.pct)}</td></tr>`).join('');
    const linked = D.commodityLinks[D.commodityGroups[g][0].name] || {stocks:[],sectors:[]};
    document.getElementById('hh_table').innerHTML = `<table><thead><tr><th>Mặt hàng</th><th>Giá</th><th>%</th></tr></thead><tbody>${rows}</tbody></table>`;
    document.getElementById('hh_linked').innerHTML = `
      <div class="card-title" style="margin-bottom:8px;">Cổ phiếu liên quan</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">${(linked.stocks||[]).map(s=>`<span class="tag tk" onclick="gotoTicker('${s}')">${s}</span>`).join('')||'<span class="small">Chưa có mapping mẫu</span>'}</div>
      <div class="card-title" style="margin-bottom:8px;">Ngành liên quan</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${(linked.sectors||[]).map(s=>`<span class="tag">${s}</span>`).join('')||''}</div>`;
  };
  window.__after.hanghoa = () => { render(); Chart2.sparkline(document.getElementById('hhSpark'), D.spark(5,24,90,10), "#e0b23c"); };
  window.selectHHGroup = (g) => { window.__hanghoa_group=g; renderMain(); };
  return pageHead(f,"Giá hàng hóa quốc tế liên kết trực tiếp tới cổ phiếu và ngành trong nước — tính năng độc quyền.") +
  `<div class="chip-row">${groupNames.map(g=>`<span class="chip ${g===window.__hanghoa_group?'active':''}" onclick="selectHHGroup('${g}')">${g}</span>`).join('')}</div>
  <div class="grid grid-2" style="grid-template-columns:1fr 1fr;">
    <div id="hh_table">${card("", "")}</div>
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${card("Biến động 3 năm (mẫu)", `<canvas id="hhSpark" style="width:100%;height:80px;"></canvas>`)}
      <div class="card" id="hh_linked"></div>
    </div>
  </div>`;
};

/* ---------- 16. Market Watch đầy đủ ---------- */
SCREENS.marketwatch = (f) => {
  window.__after.marketwatch = () => Chart2.multiLine(document.getElementById('adLine'), [{data:D.spark(9,30,0,40).map((v,i)=>v-50-i*2), color:"#e5566d"}]);
  const cards = ["Market Breadth","Độ rộng thị trường","Thanh khoản","NN mua bán ròng","Tự doanh mua bán ròng","Giá trị giao dịch","Vốn hóa","Khuyến nghị mua bán"];
  return pageHead(f,"8 chỉ báo thị trường tổng hợp — kế thừa từ Algo Platform.") +
  `${card("Advance/Decline Line", `<canvas id="adLine" style="width:100%;height:160px;"></canvas>`)}
  <div class="grid grid-4" style="margin-top:14px;">
    ${cards.map(c=>`<div class="card"><div class="card-title">${c}</div><div class="stat-sub" style="margin-top:8px;">Xem chi tiết trong bản đầy đủ</div></div>`).join('')}
  </div>`;
};

/* ---------- 17. Market Watch ngành ---------- */
SCREENS.marketwatchnganh = (f) => {
  window.__after.marketwatchnganh = () => Chart2.donut(document.getElementById('donutSector'), [
    {value:38, color:"#3ecf8e"},{value:22, color:"#3ba7e0"},{value:15, color:"#e0b23c"},{value:13, color:"#9b8cf0"},{value:12, color:"#e5566d"},
  ]);
  return pageHead(f,"Đóng góp của từng ngành vào chỉ số, theo nhiều khung thời gian.") +
  `<div class="chip-row"><span class="chip active">1 Phiên</span><span class="chip">1 Tuần</span><span class="chip">1 Tháng</span><span class="chip">QTD</span><span class="chip">YTD</span></div>
  <div class="grid grid-2">
    ${card("Đóng góp vào Index", `<canvas id="donutSector" style="width:100%;height:220px;"></canvas>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:10px;font-size:11px;color:var(--text-2);">
    <span>🟢 Ngân hàng</span><span>🔵 BĐS</span><span>🟡 Công nghệ</span><span>🟣 Chứng khoán</span><span>🔴 Thép</span></div>`)}
    ${card("NN & Tự doanh theo ngành", D.sectors.slice(0,6).map(s=>`<div class="list-item"><span class="txt" style="flex:1;">${s.name}</span>${pctChg(s.pct)}</div>`).join(''))}
  </div>`;
};

/* ---------- 25. GD CĐ lớn & nội bộ ---------- */
SCREENS.gdcdlon = (f) => {
  const rows = D.insiderTrades.map(t=>`<tr>
    <td class="tk" onclick="gotoTicker('${t.code}')">${t.code}</td><td class="txt">${t.person}</td><td class="txt">${t.role}</td>
    <td class="txt">${t.type}</td><td>${t.qty}</td><td class="txt small">${t.note}</td></tr>`).join('');
  return pageHead(f,"Theo dõi giao dịch cổ đông lớn và người nội bộ toàn thị trường — tín hiệu tin cậy cao.") +
  card("Giao dịch gần nhất", `<table><thead><tr><th>Mã</th><th>Người GD</th><th>Vai trò</th><th>Loại GD</th><th>Khối lượng</th><th>Ghi chú</th></tr></thead><tbody>${rows}</tbody></table>`);
};

/* ---------- 36. Tín hiệu nội bộ tự động ---------- */
SCREENS.tinhieunoibo = (f) => {
  const flags = [
    {code:"SSI", desc:"Khối lượng gấp 2.1 lần TB 10 phiên, giá phá vùng tích lũy 3 tuần", lvl:"Cao"},
    {code:"VJC", desc:"Khối ngoại mua ròng 4 phiên liên tiếp, momentum tăng tốc", lvl:"Trung bình"},
    {code:"HPG", desc:"Giá giảm dưới MA20 kèm khối lượng bất thường", lvl:"Cao"},
  ];
  return pageHead(f,"Hệ thống tự quét toàn thị trường mỗi phiên, gắn cờ mã có dấu hiệu bất thường — không tự đặt lệnh.") +
  card("Tín hiệu hôm nay · "+D.now, flags.map(x=>`<div class="list-item">
    <span class="tk" onclick="gotoTicker('${x.code}')" style="width:56px;">${x.code}</span>
    <span class="txt" style="flex:1;">${x.desc}</span>
    <span class="pill ${x.lvl==='Cao'?'pill-sell':'pill-watch'}">${x.lvl}</span>
  </div>`).join('')) +
  `<div class="note-box ai">${ic('ai',12)} Lớp diễn giải AI: dựa trên thống kê đã tính sẵn (độ lệch chuẩn khối lượng, breakout MA), AI chỉ viết lại thành câu dễ hiểu — không tự suy luận số liệu.</div>`;
};
