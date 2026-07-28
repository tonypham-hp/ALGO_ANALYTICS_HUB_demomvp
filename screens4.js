/* ---------- 8. Ý tưởng ---------- */
window.__idea_sel = D.ideas[0].code;
function selectIdea(code){ window.__idea_sel = code; renderMain(); }
SCREENS.ytuong = (f) => {
  const sel = D.ideas.find(i=>i.code===window.__idea_sel);
  window.__after.ytuong = () => Chart2.multiLine(document.getElementById('ideaTrend'), [{data:D.spark(sel.code.length,20,sel.price,sel.price*0.02), color:"#3ba7e0"}]);
  return pageHead(f,"Khuyến nghị đa mô hình — kết hợp chuyên gia và bộ lọc tự động, có tỷ lệ thắng lịch sử.") +
  `<div class="grid" style="grid-template-columns:1.1fr 1.4fr;">
    ${card("Danh sách khuyến nghị", `<table><thead><tr><th>Mã</th><th>Mô hình</th><th>%</th><th>KN</th></tr></thead><tbody>
      ${D.ideas.map(i=>`<tr style="${i.code===sel.code?'background:var(--bg-hover);':''}cursor:pointer;" onclick="selectIdea('${i.code}')">
        <td class="tk">${i.code}</td><td class="txt small">${i.model}</td><td>${pctChg(i.pct)}</td>
        <td>${pill(i.signal, i.signal==='Mua'?'buy':i.signal==='Bán'?'sell':'watch')}</td></tr>`).join('')}
    </tbody></table>`)}
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${card(`${sel.code} · Mô hình ${sel.model}`, `<canvas id="ideaTrend" style="width:100%;height:130px;"></canvas>
        <div class="note-box" style="margin-top:10px;">Tỷ lệ thắng lịch sử: <b class="chg-up">62%</b> trên 40 lần khuyến nghị gần nhất của mô hình này.</div>`)}
      ${card("Vì sao khuyến nghị mã này?", `<div class="small" style="line-height:1.6;">${sel.code} đang có ${sel.pct>0?'động lượng tăng giá tích cực':'tín hiệu cần theo dõi thêm'}, Điểm chất lượng ở mức khá, dòng tiền ngành liên quan đang ${sel.pct>0?'vào ròng':'phân hóa'}.</div>`)}
    </div>
  </div>`;
};

/* ---------- 18. So sánh Return ---------- */
SCREENS.sosanhreturn = (f) => {
  window.__after.sosanhreturn = () => Chart2.multiLine(document.getElementById('retChart'), [
    {data:D.spark(21,24,100,3), color:"#3ecf8e"}, {data:D.spark(22,24,100,4), color:"#3ba7e0"}, {data:D.spark(23,24,100,2), color:"#e0b23c"},
  ]);
  return pageHead(f,"So sánh hiệu suất sinh lời giữa mã/ngành/danh mục với benchmark VN-Index.") +
  `<div class="chip-row"><span class="chip active">FPT</span><span class="chip active">Ngành Công nghệ</span><span class="chip active">VN-Index</span><span class="chip">+ Thêm</span></div>
  ${card("Return tích lũy 3 tháng gần nhất", `<canvas id="retChart" style="width:100%;height:220px;"></canvas>
    <div style="display:flex;gap:16px;margin-top:10px;font-size:11.5px;"><span>🟢 FPT +18.4%</span><span>🔵 Ngành CNTT +11.2%</span><span>🟡 VN-Index +6.8%</span></div>`)}`;
};

/* ---------- 20. Phân tích ngành ---------- */
SCREENS.phantichnganh = (f) => {
  const metrics = ["Giao dịch & cung cầu","Return ngành","PE","PB","Đòn bẩy tài chính","ROE-ROA"];
  return pageHead(f,"6 chỉ tiêu chuẩn phân tích ở cấp ngành.") +
  `<div class="chip-row">${metrics.map((m,i)=>`<span class="chip ${i===0?'active':''}">${m}</span>`).join('')}</div>
  ${card("Ngân hàng · Giao dịch & cung cầu", `<table><thead><tr><th>Chỉ tiêu</th><th>Giá trị</th></tr></thead><tbody>
    <tr><td class="txt">Vốn hóa ngành</td><td>1.842.000 tỷ</td></tr>
    <tr><td class="txt">GTGD trung bình 20 phiên</td><td>4.210 tỷ</td></tr>
    <tr><td class="txt">Khối ngoại sở hữu</td><td>19.4%</td></tr>
  </tbody></table>`)}`;
};

/* ---------- 21. Phân tích danh mục ---------- */
SCREENS.phantichdanhmuc = (f) => {
  const rows = [{code:"FPT",w:35},{code:"VCB",w:28},{code:"HPG",w:22},{code:"MWG",w:15}];
  window.__after.phantichdanhmuc = () => Chart2.donut(document.getElementById('portDonut'), [
    {value:35,color:"#3ecf8e"},{value:28,color:"#3ba7e0"},{value:22,color:"#e0b23c"},{value:15,color:"#9b8cf0"},
  ]);
  return pageHead(f,"Theo dõi và phân tích hiệu suất danh mục cá nhân.") +
  `<div class="grid grid-2">
    ${card("Cơ cấu danh mục", `<canvas id="portDonut" style="width:100%;height:180px;"></canvas>
      <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:8px;font-size:11.5px;">
      ${rows.map(r=>`<span>${r.code} ${r.w}%</span>`).join('')}</div>`)}
    ${card("Chỉ số danh mục", `
      <div class="list-item"><span class="txt">Return 3 tháng</span><span class="chg-up mono" style="margin-left:auto;">+9.8%</span></div>
      <div class="list-item"><span class="txt">P/E bình quân</span><span class="mono" style="margin-left:auto;">16.4</span></div>
      <div class="list-item"><span class="txt">Đòn bẩy TC bình quân</span><span class="mono" style="margin-left:auto;">0.42</span></div>`)}
  </div>`;
};

/* ---------- 35. Multi-strategy Backtest ---------- */
SCREENS.multistrategy = (f) => {
  window.__after.multistrategy = () => Chart2.multiLine(document.getElementById('multiEquity'), [{data:D.spark(31,30,100,3), color:"#3ecf8e"}]);
  return pageHead(f,"Kết hợp nhiều công thức theo trọng số để backtest như 1 chiến lược tổng hợp.") +
  `<div class="grid" style="grid-template-columns:1fr 1.6fr;">
    ${card("Cấu hình chiến lược", `
      <div class="list-item"><span class="txt">F-Score cao</span><input value="40" style="width:44px;margin-left:auto;background:var(--bg-panel-2);border:1px solid var(--border);color:var(--text-1);border-radius:4px;padding:2px 4px;"/>%</div>
      <div class="list-item"><span class="txt">Momentum 3T</span><input value="30" style="width:44px;margin-left:auto;background:var(--bg-panel-2);border:1px solid var(--border);color:var(--text-1);border-radius:4px;padding:2px 4px;"/>%</div>
      <div class="list-item"><span class="txt">Value (P/E thấp)</span><input value="30" style="width:44px;margin-left:auto;background:var(--bg-panel-2);border:1px solid var(--border);color:var(--text-1);border-radius:4px;padding:2px 4px;"/>%</div>
      <button class="btn primary" style="width:100%;margin-top:10px;">Chạy Backtest</button>`)}
    ${card("Đường cong vốn (equity curve) — 6 tháng", `<canvas id="multiEquity" style="width:100%;height:200px;"></canvas>
      <div class="stat-sub" style="margin-top:8px;">Return: <span class="chg-up">+14.2%</span> · Max Drawdown: <span class="chg-down">-6.1%</span> · Sharpe: 1.8</div>`)}
  </div>`;
};

/* ---------- 14. Bộ lọc 3 cấp độ ---------- */
SCREENS.boloc = (f) => {
  return pageHead(f,"3 cấp độ: point-and-click, viết công thức, công thức nâng cao.") +
  `<div class="tabs"><div class="tab active">Lọc cơ bản</div><div class="tab">Viết công thức</div><div class="tab">Công thức nâng cao</div></div>
  <div class="grid grid-3">
    ${card("Chọn điều kiện lọc", `<div class="list-item"><input type="radio" checked/> Định giá</div><div class="list-item"><input type="radio"/> Cổ tức</div><div class="list-item"><input type="radio"/> Khả năng sinh lời</div>`)}
    ${card("Chọn tiêu chí", `<div class="list-item"><input type="checkbox" checked/> P/E &lt; 15</div><div class="list-item"><input type="checkbox" checked/> ROE &gt; 15%</div>`)}
    ${card("Kết quả (4)", D.tickers.filter(t=>t.pe<15).slice(0,4).map(t=>`<div class="list-item"><span class="tk">${t.code}</span><span class="mono" style="margin-left:auto;">P/E ${t.pe}</span></div>`).join(''))}
  </div>`;
};

/* ---------- 23. Backtest công thức ---------- */
SCREENS.backtestcongthuc = (f) => {
  window.__after.backtestcongthuc = () => Chart2.multiLine(document.getElementById('btEquity'), [{data:D.spark(41,26,100,4), color:"#3ba7e0"}]);
  return pageHead(f,"Kiểm định 1 công thức trên dữ liệu lịch sử, có Stop Loss/Take Profit.") +
  `<div class="grid" style="grid-template-columns:1fr 1.6fr;">
    ${card("Tham số", `
      <div class="list-item"><span class="txt">Công thức</span><span style="margin-left:auto;">[Algo] ADL</span></div>
      <div class="list-item"><span class="txt">Stop Loss</span><span style="margin-left:auto;">15%</span></div>
      <div class="list-item"><span class="txt">Take Profit</span><span style="margin-left:auto;">100%</span></div>
      <button class="btn primary" style="width:100%;margin-top:10px;">Chạy Backtest</button>`)}
    ${card("Kết quả", `<canvas id="btEquity" style="width:100%;height:180px;"></canvas>
      <div class="stat-sub" style="margin-top:8px;">Tỷ lệ thắng: <span class="chg-up">58%</span> trên 62 lệnh · Return trung bình/lệnh: +4.2%</div>`)}
  </div>`;
};

/* ---------- 30. Backtest tự động ---------- */
SCREENS.backtesttudong = (f) => {
  return pageHead(f,"Tự động tính tỷ lệ thắng cho mọi công thức đang lưu trong Bộ lọc & Ý tưởng.") +
  card("Tỷ lệ thắng theo mô hình (tự động cập nhật hàng tuần)", ["EPS Growth","Siêu chỉ báo","Đột biến khối lượng","Phân kỳ tăng giá"].map((m,i)=>`
    <div class="list-item"><span class="txt" style="flex:1;">${m}</span>
    <div class="progress-track" style="width:140px;"><div class="progress-fill" style="width:${58+i*6}%;background:var(--up);"></div></div>
    <span class="mono" style="width:40px;text-align:right;">${58+i*6}%</span></div>`).join(''));
};

/* ---------- 37. Chợ công thức nội bộ ---------- */
SCREENS.chocongthuc = (f) => {
  return pageHead(f,"Chia sẻ và tái sử dụng công thức giữa các thành viên nội bộ.") +
  card("Công thức được chia sẻ nhiều nhất", D.formulas.map(fm=>`
    <div class="list-item"><span class="txt" style="flex:1;">${fm.name}<div class="small">bởi ${fm.author}</div></span>
    <span class="tag">${fm.used} lượt dùng</span><button class="btn" style="margin-left:10px;">Dùng thử</button></div>`).join(''));
};
