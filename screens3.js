/* ---------- 7. DN 360 ---------- */
window.__dn360_code = "FPT";
window.__dn360_tab = "tongquan";
function setDn360Ticker(code){ window.__dn360_code = code; renderMain(); }
function setDn360Tab(tab){ window.__dn360_tab = tab; renderMain(); }

SCREENS.dn360 = (f) => {
  const t = D.tickers.find(x=>x.code===window.__dn360_code) || D.tickers[0];
  const tabs = ["tongquan","tai chinh","canh bao","su kien","cung nganh"];
  const tabLabels = {"tongquan":"Tổng quan","tai chinh":"Tài chính","canh bao":"Cảnh báo rủi ro","su kien":"Sự kiện","cung nganh":"DN cùng ngành"};
  const cur = window.__dn360_tab;

  window.__after.dn360 = () => Chart2.candles(document.getElementById('dn360chart'), genCandles(30,t.price,t.price*0.02,t.code.charCodeAt(0)));

  let body = "";
  if(cur==="tongquan"){
    body = `<div class="grid" style="grid-template-columns:2fr 1fr;">
      ${card(t.code+" · 1D", `<canvas id="dn360chart" style="width:100%;height:240px;"></canvas>`)}
      <div style="display:flex;flex-direction:column;gap:14px;">
        ${card("Thông tin định giá", `
          <div class="list-item"><span class="txt">P/E</span><span class="mono" style="margin-left:auto;">${t.pe}</span></div>
          <div class="list-item"><span class="txt">P/B</span><span class="mono" style="margin-left:auto;">${t.pb}</span></div>
          <div class="list-item"><span class="txt">ROE</span><span class="mono" style="margin-left:auto;">${t.roe}%</span></div>
          <div class="list-item"><span class="txt">Vốn hóa</span><span class="mono" style="margin-left:auto;">${fmt(t.cap)} tỷ</span></div>`)}
      </div>
    </div>`;
  } else if(cur==="tai chinh"){
    window.__after.dn360 = () => Chart2.bars(document.getElementById('dn360fin'), [
      {label:"22",value:12},{label:"23",value:15},{label:"24",value:22},{label:"25",value:19},{label:"26",value:27},
    ], {labels:true, posColor:"#3ba7e0"});
    body = card("Tăng trưởng doanh thu 5 năm (nghìn tỷ, minh họa)", `<canvas id="dn360fin" style="width:100%;height:200px;"></canvas>`);
  } else if(cur==="canh bao"){
    body = card("Cảnh báo rủi ro tự động", `
      <div class="list-item"><span class="pill pill-buy">Thấp</span><span class="txt" style="margin-left:10px;">Dòng tiền HĐKD dương ổn định 4 quý liên tiếp</span></div>
      <div class="list-item"><span class="pill pill-watch">Trung bình</span><span class="txt" style="margin-left:10px;">Nợ vay tăng 8% so với quý trước</span></div>
      <div class="note-box ai">${ic('ai',12)} AI diễn giải: mức nợ vay hiện tại vẫn trong ngưỡng an toàn so với trung bình ngành, cần theo dõi thêm 1-2 quý tới.</div>`);
  } else if(cur==="su kien"){
    body = card("Sự kiện & tin tức", D.news.map(n=>`<div class="list-item"><span class="cal-date">${n.time}</span><span class="txt">${n.title}</span></div>`).join(''));
  } else {
    const peers = D.tickers.filter(x=>x.sector===t.sector && x.code!==t.code).slice(0,4);
    body = card(`DN cùng ngành ${t.sector}`, `<table><thead><tr><th>Mã</th><th>Giá</th><th>%</th><th>P/E</th><th>ROE</th></tr></thead><tbody>
      ${peers.map(p=>`<tr><td class="tk" onclick="gotoTicker('${p.code}')">${p.code}</td><td>${fmt(p.price)}</td><td>${pctChg(p.chg)}</td><td>${p.pe}</td><td>${p.roe}%</td></tr>`).join('')}
    </tbody></table>`);
  }

  return `<div class="page-head"><div>
      <div class="page-title">${t.code} — ${t.name} <span style="font-size:14px;color:var(--text-2);font-weight:400;">${fmt(t.price)}đ ${pctChg(t.chg)}</span></div>
      <div class="page-desc">Hồ sơ doanh nghiệp 360° — chọn mã khác:
        <select onchange="setDn360Ticker(this.value)" style="margin-left:8px;background:var(--bg-panel-2);color:var(--text-1);border:1px solid var(--border);border-radius:6px;padding:3px 8px;">
        ${D.tickers.map(x=>`<option value="${x.code}" ${x.code===t.code?'selected':''}>${x.code}</option>`).join('')}</select>
      </div></div></div>
    <div class="tabs">${tabs.map(tb=>`<div class="tab ${cur===tb?'active':''}" onclick="setDn360Tab('${tb}')">${tabLabels[tb]}</div>`).join('')}</div>
    ${body}`;
};

/* ---------- 10. Định giá ---------- */
SCREENS.dinhgia = (f) => {
  const v = D.valuation;
  window.__after.dinhgia = () => Chart2.multiLine(document.getElementById('dcfChart'),
    [{data:[...v.fcfeHistory.map(x=>x.v), ...v.fcfeForecast.map(x=>x.v)], color:"#3ba7e0"}]);
  return pageHead(f,"4 phương pháp định giá kết hợp — Bội số (P/E, P/B, EV/EBITDA) và DCF tùy chỉnh tay.") +
  `<div class="grid grid-4">
    ${v.methods.map(m=>statCard(m.name, fmt(m.result), `Tỷ trọng ${m.weight}%`))}
  </div>
  <div class="grid grid-2" style="margin-top:14px;">
    ${card("Kết quả tổng hợp", `<div class="stat-big" style="font-size:30px;">${fmt(v.final)}đ</div>
      <div class="stat-sub" style="margin-top:6px;">Upside: <span class="${v.upside>=0?'chg-up':'chg-down'}">${v.upside>=0?'+':''}${v.upside}%</span> so với giá thị trường</div>`)}
    ${card("Dòng tiền FCFE — lịch sử & dự phóng", `<canvas id="dcfChart" style="width:100%;height:150px;"></canvas>`)}
  </div>
  ${card("Giả định dự phóng (tùy chỉnh được)", `<table><thead><tr><th>Năm</th><th>Tăng trưởng g(%)</th><th>FCFE (tỷ)</th></tr></thead><tbody>
    ${v.fcfeForecast.map(x=>`<tr><td>${x.y}</td><td><input value="${x.g}" style="width:50px;background:var(--bg-panel-2);border:1px solid var(--border);color:var(--text-1);border-radius:4px;padding:2px 6px;font-family:var(--font-mono);"/></td><td>${fmt(x.v)}</td></tr>`).join('')}
  </tbody></table>`, {style:"margin-top:14px;"})}`;
};

/* ---------- 19. So sánh 4 loại hình DN ---------- */
SCREENS.sosanh4loai = (f) => {
  const rows = [
    ["NIM (%)","3.28","2.95"],["Tỉ lệ CASA (%)","21.27","19.80"],["LDR (lần)","1.10","1.05"],["CIR (lần)","0.32","0.34"],
  ];
  return pageHead(f,"So sánh chỉ tiêu đặc trưng theo 4 loại hình DN với trung bình ngành.") +
  `<div class="chip-row"><span class="chip active">Ngân hàng</span><span class="chip">Chứng khoán</span><span class="chip">Bảo hiểm</span><span class="chip">Cổ phiếu thường</span></div>
  ${card("VCB so với ngành Ngân hàng", `<table><thead><tr><th>Chỉ tiêu</th><th>Ngành</th><th>VCB</th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td class="txt">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}
  </tbody></table>`)}`;
};

/* ---------- 22. Chỉ số ngân hàng sâu ---------- */
SCREENS.chisonganhang = (f) => {
  window.__after.chisonganhang = () => Chart2.multiLine(document.getElementById('bankChart'), [
    {data:D.spark(11,20,14,2), color:"#3ecf8e"},{data:D.spark(12,20,12,2), color:"#3ba7e0"},
    {data:D.spark(13,20,10,2), color:"#e0b23c"},{data:D.spark(14,20,9,2), color:"#9b8cf0"},
  ]);
  return pageHead(f,"Xu hướng 1 chỉ số qua nhiều ngân hàng cùng lúc, theo thời gian dài.") +
  `<div style="display:flex;gap:10px;margin-bottom:14px;">
    <select style="background:var(--bg-panel-2);color:var(--text-1);border:1px solid var(--border);border-radius:8px;padding:7px 10px;"><option>Vốn chủ sở hữu/Tổng tài sản</option></select>
  </div>
  ${card("VCB · ACB · CTG · TCB — 5 năm gần nhất", `<canvas id="bankChart" style="width:100%;height:220px;"></canvas>`)}`;
};

/* ---------- 24. Dự phóng LN / PE Forward ---------- */
SCREENS.duphong = (f) => {
  return pageHead(f,"Dự phóng lợi nhuận và tính PE Forward theo giả định tự nhập — dữ liệu lịch sử 17 năm.") +
  `<div class="grid grid-2">
    ${card("Lợi nhuận ròng & EPS lịch sử", `<table><thead><tr><th>Năm</th><th>LN ròng (tỷ)</th><th>EPS</th></tr></thead><tbody>
      <tr><td>2024</td><td>7.850</td><td>5.120</td></tr><tr><td>2025</td><td>8.640</td><td>5.510</td></tr><tr><td>2026</td><td>9.310</td><td>5.865</td></tr>
    </tbody></table>`)}
    ${card("Dự phóng PE Forward", `
      <div class="list-item"><span class="txt">Kỳ dự phóng</span><span style="margin-left:auto;">Quý tiếp theo</span></div>
      <div class="list-item"><span class="txt">Kỳ vọng tăng trưởng LN</span><input value="12.5" style="width:60px;margin-left:auto;background:var(--bg-panel-2);border:1px solid var(--border);color:var(--text-1);border-radius:4px;padding:2px 6px;"/>%</div>
      <div style="margin-top:12px;"><button class="btn primary" style="width:100%;">Tính PE Forward</button></div>
      <div class="stat-big" style="margin-top:14px;">21.4 lần</div><div class="stat-sub">PE Forward ước tính</div>`)}
  </div>`;
};

/* ---------- 29. Điểm chất lượng CP ---------- */
SCREENS.diemchatluong = (f) => {
  const s = D.scores.FPT;
  window.__after.diemchatluong = () => {
    Chart2.gauge(document.getElementById('gaugeMScore'), (s.mscore+3)/6*100);
  };
  return pageHead(f,"3 mô hình học thuật quốc tế — Piotroski F-Score, Magic Formula, Beneish M-Score.") +
  `<div class="grid grid-3">
    ${card("Piotroski F-Score", `<div class="progress-row"><div class="progress-track"><div class="progress-fill" style="width:${s.fscore/9*100}%;background:var(--up);"></div></div></div>
      <div class="stat-big">${s.fscore} <span style="font-size:15px;color:var(--text-2);">/ 9</span></div><div class="stat-sub">Sức khỏe tài chính tốt</div>`)}
    ${card("Magic Formula", `<div style="font-size:22px;color:var(--ref);">${'★'.repeat(s.magic)}${'☆'.repeat(9-s.magic)}</div>
      <div class="stat-sub" style="margin-top:8px;">Hạng A+ — kết hợp ROC cao & Earnings Yield tốt</div>`)}
    ${card("Beneish M-Score", `<canvas id="gaugeMScore" width="200" height="110" style="width:100%;height:90px;"></canvas>
      <div class="stat-sub" style="text-align:center;">${s.mscore} — dưới ngưỡng cảnh báo -1.78 (an toàn)</div>`)}
  </div>
  <div class="note-box ai">${ic('ai',12)} AI diễn giải: FPT có sức khỏe tài chính tốt (F-Score 8/9), được định giá hấp dẫn theo Magic Formula, và không có dấu hiệu thao túng báo cáo tài chính.</div>`;
};
