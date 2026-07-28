/* ---------- 15. Nhãn minh bạch dữ liệu ---------- */
SCREENS.nhan = (f) => pageHead(f,"Mọi số liệu đều có nhãn nguồn và thời điểm cập nhật.") +
  card("Ví dụ áp dụng", `
    <div class="list-item"><span class="txt">Bảng giá</span><span class="small" style="margin-left:auto;">Cập nhật ${D.now} · Nguồn: ALGOREALTIME</span></div>
    <div class="list-item"><span class="txt">Vĩ mô</span><span class="small" style="margin-left:auto;">Cập nhật 06:00 hôm nay · Nguồn: MACRO_704_GSO</span></div>
    <div class="list-item"><span class="txt">Điểm chất lượng CP</span><span class="small" style="margin-left:auto;">Cập nhật theo quý · Nguồn: Algo Platform</span></div>`);

/* ---------- 26. Trung tâm Kiến thức ---------- */
SCREENS.trungtamkienthuc = (f) => {
  const arts = [
    {t:"P/E là gì và tính như thế nào?", c:"Kiến thức doanh nghiệp"},
    {t:"Đọc hiểu chỉ số NIM, CASA, LDR của ngân hàng", c:"Kiến thức doanh nghiệp"},
    {t:"GDP, CPI ảnh hưởng tới chứng khoán ra sao?", c:"Kiến thức vĩ mô"},
    {t:"Cách đọc bảng giá 3 cấp", c:"Kiến thức thị trường"},
  ];
  return pageHead(f,"Bài viết giải thích khái niệm, đối chiếu trực tiếp với công thức thật đang chạy trong hệ thống.") +
  `<div class="chip-row"><span class="chip active">Tất cả</span><span class="chip">Thị trường</span><span class="chip">Doanh nghiệp</span><span class="chip">Vĩ mô</span></div>
  <div class="grid grid-2">${arts.map(a=>`<div class="card" style="cursor:pointer;"><div class="tag" style="margin-bottom:8px;">${a.c}</div><div class="card-title-lg">${a.t}</div></div>`).join('')}</div>`;
};

/* ---------- 27. Từ điển thuật ngữ ---------- */
SCREENS.tudien = (f) => {
  const terms = [["P/E","Giá đóng cửa / EPS 4 quý gần nhất"],["NIM","Thu nhập lãi thuần / Tài sản sinh lãi bình quân"],["CASA","Tiền gửi không kỳ hạn / Tổng huy động"],["F-Score","Điểm 0-9 đánh giá sức khỏe tài chính theo Piotroski"]];
  return pageHead(f,"Giải thích thuật ngữ ngay tại chỗ khi hover vào số liệu trên toàn hệ thống.") +
  card("Tra cứu nhanh", `<input class="search-input" style="position:static;width:100%;margin-bottom:14px;padding-left:14px;" placeholder="Tìm thuật ngữ...">` +
    terms.map(t=>`<div class="list-item"><b style="width:80px;">${t[0]}</b><span class="txt small">${t[1]}</span></div>`).join(''));
};

/* ---------- 28. Chatbot AI v1 ---------- */
SCREENS.chatbotv1 = (f) => chatScreen(f, "v1", "Hỏi nhanh, hệ thống trả kết quả tra cứu có cấu trúc — chưa sinh văn bản tự do.");
/* ---------- 34. Chatbot AI v2 ---------- */
SCREENS.chatbotv2 = (f) => chatScreen(f, "v2", "Hỏi tự do bằng ngôn ngữ tự nhiên — AI tổng hợp từ toàn bộ dữ liệu hệ thống (RAG).");
/* ---------- 39. Chatbot chủ động ---------- */
SCREENS.chatbotchudong = (f) => pageHead(f,"AI chủ động đề xuất insight không cần chờ được hỏi.") +
  card("Đề xuất hôm nay · 07:32", D.digest.map(d=>`<div class="list-item">
    <span style="width:8px;height:8px;border-radius:50%;background:${d.type==='up'?'var(--up)':d.type==='down'?'var(--down)':'var(--brand)'};flex-shrink:0;"></span>
    <span class="txt">${d.text}</span></div>`).join('')) +
  `<div class="note-box ai">${ic('ai',12)} Tần suất đề xuất chủ động giới hạn 3-5 lần/ngày để tránh gây phiền.</div>`;

function chatScreen(f, ver, desc){
  const wid = "chat_"+ver;
  window["send_"+ver] = () => {
    const input = document.getElementById(wid+"_input");
    const q = input.value.trim(); if(!q) return;
    appendChatMsg(wid, q, true);
    input.value="";
    setTimeout(()=>{
      const ans = D.chat.responses[q] || D.chat.fallback;
      appendChatMsg(wid, ans, false);
    }, 400);
  };
  window["suggest_"+ver] = (q) => { document.getElementById(wid+"_input").value=q; window["send_"+ver](); };
  setTimeout(()=>{
    const box = document.getElementById(wid+"_msgs");
    if(box) box.innerHTML = `<div class="msg bot">Xin chào! Đây là ${ver==='v1'?'Chatbot AI v1 — mình trả lời bằng dữ liệu tra cứu trực tiếp.':'Chatbot AI v2 (RAG) — hỏi mình bất cứ điều gì về dữ liệu hệ thống.'} Hãy thử một câu hỏi gợi ý bên dưới.</div>`;
  }, 10);
  return pageHead(f, desc) +
  `<div class="chat-shell">
    <div class="chat-msgs" id="${wid}_msgs"></div>
    <div class="chat-suggest">${D.chat.suggestions.map(s=>`<span class="chip" onclick="suggest_${ver}('${s.replace(/'/g,"\\'")}')">${s}</span>`).join('')}</div>
    <div class="chat-input-row">
      <input id="${wid}_input" placeholder="Nhập câu hỏi..." onkeydown="if(event.key==='Enter')send_${ver}()"/>
      <button class="chat-send" onclick="send_${ver}()">${ic('send',14)}</button>
    </div>
  </div>`;
}
function appendChatMsg(wid, text, isUser){
  const box = document.getElementById(wid+"_msgs");
  const src = !isUser && text.includes("Nguồn") ? "" : "";
  box.insertAdjacentHTML('beforeend', `<div class="msg ${isUser?'user':'bot'}">${text}</div>`);
  box.scrollTop = box.scrollHeight;
}

/* ---------- 31. Diễn giải tự động AI ---------- */
SCREENS.diengiaiAI = (f) => pageHead(f,"AI tự viết 2-3 câu diễn giải cho mỗi kết quả phân tích, dựa trên số liệu đã kiểm chứng.") +
  `<div class="grid grid-2">
    ${card("Ví dụ: Định giá FPT", `<div class="note-box ai">${ic('ai',12)} Định giá hợp lý ở mức 127.150đ, thấp hơn giá thị trường 4% — chủ yếu do phương pháp DCF phản ánh rủi ro tăng trưởng dài hạn thận trọng hơn thị trường.</div>`)}
    ${card("Ví dụ: Điểm chất lượng HPG", `<div class="note-box ai">${ic('ai',12)} F-Score 5/9 — mức trung bình, cần theo dõi thêm chỉ tiêu đòn bẩy tài chính trước khi đưa ra quyết định.</div>`)}
  </div>`;

/* ---------- 33. Kiến thức mở rộng ---------- */
SCREENS.kienthucmorong = (f) => pageHead(f,"Bài viết chuyên sâu về F-Score, Magic Formula, Beneish M-Score và Backtest.") +
  card("Bài viết nâng cao", ["Piotroski F-Score là gì và vì sao dùng 9 tiêu chí?","Magic Formula của Joel Greenblatt hoạt động ra sao?","Beneish M-Score phát hiện gian lận báo cáo tài chính thế nào?","Backtest là gì, và vì sao tỷ lệ thắng quá khứ không đảm bảo tương lai?"]
    .map(t=>`<div class="list-item"><span class="txt">${t}</span></div>`).join(''));

/* ---------- 11. Danh mục quan tâm ---------- */
function toggleWatch(code){
  const i = D.watchlist.indexOf(code);
  if(i>=0) D.watchlist.splice(i,1); else D.watchlist.push(code);
  if(STATE.feature) renderMain();
}
SCREENS.danhmucquantam = (f) => {
  const rows = D.watchlist.map(c=>D.tickers.find(t=>t.code===c)).filter(Boolean);
  return pageHead(f,"Watchlist cá nhân — nhiều danh mục cùng lúc.") +
  `<div class="chip-row"><span class="chip active">Danh mục mặc định</span><span class="chip">+ Tạo danh mục mới</span></div>
  ${card("", rows.length? `<table><thead><tr><th></th><th>Mã</th><th>Giá</th><th>%</th><th>Ngành</th></tr></thead><tbody>
    ${rows.map(t=>`<tr><td><span class="star on" onclick="toggleWatch('${t.code}')">★</span></td><td class="tk" onclick="gotoTicker('${t.code}')">${t.code}</td><td>${fmt(t.price)}</td><td>${pctChg(t.chg)}</td><td class="txt">${t.sector}</td></tr>`).join('')}
  </tbody></table>` : `<div class="empty-state">Chưa có mã nào — bấm ★ ở Bảng giá để thêm.</div>`)}`;
};

/* ---------- 38. Bản tin cá nhân hóa ---------- */
SCREENS.bantin = (f) => pageHead(f,"Bản tin sáng riêng theo watchlist của từng người — 07:30 hàng ngày.") +
  card(`Bản tin ${D.now}`, D.digest.map(d=>`<div class="list-item">
    <span style="width:8px;height:8px;border-radius:50%;background:${d.type==='up'?'var(--up)':d.type==='down'?'var(--down)':'var(--brand)'};flex-shrink:0;"></span>
    <span class="txt">${d.text}</span></div>`).join('')) +
  `<div class="note-box ai">${ic('ai',12)} Nội dung do AI tổng hợp lại từ dữ liệu đã tính sẵn theo watchlist cá nhân.</div>`;

/* ---------- 41. Dashboard theo vai trò ---------- */
SCREENS.dashboardvaitro = (f) => {
  return pageHead(f,"Màn hình mặc định khác nhau theo vai trò công việc — chọn thử bên dưới.") +
  `<div class="chip-row">${D.roles.map(r=>`<span class="chip ${STATE.role===r.id?'active':''}" onclick="setRole('${r.id}')">${r.label}</span>`).join('')}</div>
  ${card("Xem trước dashboard vai trò: "+D.roles.find(r=>r.id===STATE.role).label,
    STATE.role==='ba'? `<div class="small">Tổng quan phân tích đầy đủ: chỉ số, tín hiệu, DN 360, Ý tưởng.</div>`:
    STATE.role==='sales'? `<div class="small">Thông tin dễ trình bày khách hàng: tóm tắt vĩ mô, top cổ phiếu khuyến nghị.</div>`:
    `<div class="small">Tóm tắt điều hành: hiệu suất tổng thị trường, cảnh báo rủi ro nổi bật.</div>`)}`;
};
function setRole(id){ STATE.role=id; const rl=document.getElementById('roleLabel'); if(rl) rl.textContent = D.roles.find(r=>r.id===id).label; if(STATE.feature==='dashboardvaitro') renderMain(); }

/* ---------- 42. Nhật ký giao dịch nội bộ ---------- */
SCREENS.nhatky = (f) => pageHead(f,"Ghi chú lý do vào/ra lệnh, theo dõi kỷ luật giao dịch — mở khóa từ Algo Platform.") +
  card("Nhật ký gần đây", `
    <div class="list-item"><span class="tk" style="width:56px;">FPT</span><span class="txt" style="flex:1;">Mua 100CP @128.000 — kỳ vọng KQKD Q2 tích cực</span><span class="small">20/07</span></div>
    <div class="list-item"><span class="tk" style="width:56px;">VCB</span><span class="txt" style="flex:1;">Mua 50CP @90.200 — theo tín hiệu F-Score cải thiện</span><span class="small">15/07</span></div>`);
