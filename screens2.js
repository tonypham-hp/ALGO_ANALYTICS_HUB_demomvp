/* ---------- 1. Bảng giá hợp nhất ---------- */
SCREENS.banggia = (f) => {
  const rows = D.tickers.map(t=>{
    const inWl = D.watchlist.includes(t.code);
    return `<tr>
      <td><span class="star ${inWl?'on':''}" onclick="toggleWatch('${t.code}')">★</span></td>
      <td class="tk" onclick="gotoTicker('${t.code}')">${t.code}</td>
      <td class="mono">${fmt(t.price-800)}</td><td class="mono">${fmt(t.price+700)}</td><td class="mono">${fmt(t.price)}</td>
      <td>${pctChg(t.chg)}</td><td class="txt">${t.exch}</td><td class="txt">${t.sector}</td>
    </tr>`;
  }).join('');
  return pageHead(f,"Bảng giá 3 cấp giá, đa tài sản — bấm ★ để thêm vào danh mục quan tâm.") +
  `<div class="grid grid-4">
    ${D.indices.map(i=>statCard(i.name, fmt(i.value), `${chg(i.chg)} (${pctChg(i.pct)})`)).join('')}
  </div>
  <div style="margin-top:14px;">${card("", `<table><thead><tr><th></th><th>Mã</th><th>Sàn</th><th>Trần</th><th>Giá khớp</th><th>%</th><th>Sàn GD</th><th>Ngành</th></tr></thead><tbody>${rows}</tbody></table>`)}</div>`;
};

/* ---------- 9. PTKT ---------- */
SCREENS.ptkt = (f) => {
  const data = genCandles(40, 132500, 1800, 11);
  window.__after.ptkt = () => Chart2.candles(document.getElementById('candleChart'), data);
  return pageHead(f,"Biểu đồ nến kèm dữ liệu giao dịch nhà đầu tư nước ngoài.") +
  `<div class="grid" style="grid-template-columns:2.2fr 1fr;">
    ${card("FPT · 1D", `<canvas id="candleChart" style="width:100%;height:320px;"></canvas>`)}
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${card("Thông tin cơ bản", `
        <div class="list-item"><span class="txt">Tham chiếu</span><span class="mono" style="margin-left:auto;">132.500</span></div>
        <div class="list-item"><span class="txt">Mở cửa</span><span class="mono" style="margin-left:auto;">132.500</span></div>
        <div class="list-item"><span class="txt">Cao / Thấp</span><span class="mono" style="margin-left:auto;">135.100 / 130.800</span></div>
        <div class="list-item"><span class="txt">Khối lượng</span><span class="mono" style="margin-left:auto;">1.842.300</span></div>`)}
      ${card("Giao dịch NĐTNN", `
        <div class="list-item"><span class="txt">KL mua ròng</span><span class="mono chg-up" style="margin-left:auto;">+184.200</span></div>
        <div class="list-item"><span class="txt">GT mua ròng</span><span class="mono chg-up" style="margin-left:auto;">+24,4 tỷ</span></div>`)}
    </div>
  </div>`;
};

/* ---------- 12. Giao dịch ảo ---------- */
SCREENS.giaodichao = (f) => {
  const port = [{code:"FPT",qty:100,avg:128000},{code:"VCB",qty:50,avg:90200}];
  const rows = port.map(p=>{
    const cur = D.tickers.find(t=>t.code===p.code).price;
    const pl = (cur-p.avg)*p.qty; const pct=(cur-p.avg)/p.avg*100;
    return `<tr><td class="tk" onclick="gotoTicker('${p.code}')">${p.code}</td><td>${p.qty}</td><td>${fmt(p.avg)}</td><td>${fmt(cur)}</td>
      <td class="${pl>=0?'chg-up':'chg-down'}">${pl>=0?'+':''}${fmt(Math.round(pl))} (${pct.toFixed(1)}%)</td></tr>`;
  }).join('');
  return pageHead(f,"Mô phỏng đầu tư theo giá thật — luyện tập không rủi ro. Vốn ảo ban đầu: 500.000.000đ.") +
  `<div class="grid grid-3">
    ${statCard("Giá trị danh mục","512.640.000đ","<span class=\"chg-up\">+2,53%</span> từ khi bắt đầu")}
    ${statCard("Tiền mặt còn lại","368.100.000đ","72% danh mục")}
    ${statCard("Số lệnh đã thực hiện","7","2 đang nắm giữ")}
  </div>
  <div style="margin-top:14px;">${card("Danh mục ảo hiện tại", `<table><thead><tr><th>Mã</th><th>KL</th><th>Giá vốn</th><th>Giá hiện tại</th><th>Lãi/Lỗ</th></tr></thead><tbody>${rows}</tbody></table>`)}</div>
  <div style="margin-top:14px;display:flex;gap:10px;"><button class="btn primary">+ Đặt lệnh mua ảo</button><button class="btn">Đặt lệnh bán ảo</button></div>`;
};

/* ---------- 13. Tín hiệu theo mô hình ---------- */
SCREENS.tinhieumohinh = (f) => {
  const models = ["EPS Growth","Siêu chỉ báo","Đột biến khối lượng","Phân kỳ tăng giá"];
  return pageHead(f,"Các tín hiệu định lượng theo từng mô hình, kế thừa từ Ý tưởng và Algo Platform.") +
  `<div class="chip-row">${models.map((m,i)=>`<span class="chip ${i===0?'active':''}">${m}</span>`).join('')}</div>
  ${card("Mô hình: EPS Growth", D.ideas.filter(i=>i.model==="EPS Growth").map(i=>`
    <div class="list-item"><span class="tk" onclick="gotoTicker('${i.code}')" style="width:56px;">${i.code}</span>
    <span class="mono" style="width:90px;">${fmt(i.price)}</span>${pctChg(i.pct)}
    <span style="margin-left:auto;">${pill(i.signal, i.signal==='Mua'?'buy':i.signal==='Bán'?'sell':'watch')}</span></div>`).join(''))}`;
};

/* ---------- 40. Giao dịch ảo nâng cao ---------- */
SCREENS.giaodichaonangcao = (f) => {
  const board = [
    {name:"Nguyễn Văn A", dept:"Phòng Phân tích", ret:18.4},
    {name:"Trần Thị B", dept:"Phòng BA", ret:14.2},
    {name:"Bạn", dept:"Phòng BA", ret:11.7},
    {name:"Lê Văn C", dept:"Phòng Kinh doanh", ret:9.3},
  ];
  return pageHead(f,"Giao dịch ảo có bảng xếp hạng và huy hiệu thi đua nội bộ — dùng để đào tạo & gắn kết nhân sự mới.") +
  card("Bảng xếp hạng tháng 7/2026", board.map((b,i)=>`<div class="list-item">
    <span class="mono" style="width:24px;color:var(--text-3);">#${i+1}</span>
    <span class="txt" style="flex:1;${b.name==='Bạn'?'color:var(--brand);font-weight:600;':''}">${b.name}</span>
    <span class="small">${b.dept}</span>
    <span class="chg-up mono" style="width:70px;text-align:right;">+${b.ret}%</span>
  </div>`).join(''));
};
