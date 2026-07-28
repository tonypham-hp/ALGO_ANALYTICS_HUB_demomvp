/* ============================================================
   ALGO ANALYTICS HUB — DỮ LIỆU MẪU (DEMO)
   Toàn bộ số liệu trong file này là dữ liệu MINH HỌA, không phải
   dữ liệu thị trường thực. Dùng để demo giao diện MVP.
   ============================================================ */

const D = {};

D.now = "10:32:14 · 28/07/2026";

D.indices = [
  { code: "VNINDEX", name: "VN-Index", value: 1667.42, chg: 8.61, pct: 0.52, vol: "812,4tr", val: "18.940 tỷ", up: 214, flat: 41, down: 158 },
  { code: "VN30", name: "VN30-Index", value: 1798.05, chg: 11.2, pct: 0.63, vol: "312,1tr", val: "9.870 tỷ", up: 21, flat: 2, down: 7 },
  { code: "HNXINDEX", name: "HNX-Index", value: 278.14, chg: -0.86, pct: -0.31, vol: "62,3tr", val: "780 tỷ", up: 58, flat: 63, down: 71 },
  { code: "UPCOM", name: "UPCOM-Index", value: 126.83, chg: 0.22, pct: 0.17, vol: "40,1tr", val: "410 tỷ", up: 88, flat: 102, down: 66 },
];

// mã: giá, %thay đổi, ngành, sàn
D.tickers = [
  { code:"VIC", name:"Tập đoàn Vingroup", price:45600, chg:1.8, sector:"Bất động sản", exch:"HOSE", pe:38.2, pb:2.4, roe:6.3, cap:174000 },
  { code:"VHM", name:"Vinhomes", price:41200, chg:2.4, sector:"Bất động sản", exch:"HOSE", pe:11.4, pb:1.6, roe:14.1, cap:192300 },
  { code:"VCB", name:"Vietcombank", price:92500, chg:0.6, sector:"Ngân hàng", exch:"HOSE", pe:15.2, pb:2.8, roe:18.4, cap:487200 },
  { code:"ACB", name:"Ngân hàng Á Châu", price:23900, chg:-0.4, sector:"Ngân hàng", exch:"HOSE", pe:7.1, pb:1.3, roe:19.8, cap:130200 },
  { code:"FPT", name:"FPT Corporation", price:132500, chg:2.1, sector:"Công nghệ", exch:"HOSE", pe:22.6, pb:6.8, roe:29.4, cap:168400 },
  { code:"HPG", name:"Hòa Phát", price:26400, chg:-1.5, sector:"Vật liệu XD", exch:"HOSE", pe:9.8, pb:1.2, roe:12.6, cap:153700 },
  { code:"MWG", name:"Thế Giới Di Động", price:63800, chg:0.9, sector:"Bán lẻ", exch:"HOSE", pe:19.3, pb:3.9, roe:20.1, cap:93600 },
  { code:"SSI", name:"Chứng khoán SSI", price:31700, chg:3.2, sector:"Chứng khoán", exch:"HOSE", pe:14.7, pb:1.9, roe:13.2, cap:60100 },
  { code:"BVH", name:"Bảo Việt", price:44300, chg:-0.2, sector:"Bảo hiểm", exch:"HOSE", pe:20.1, pb:2.1, roe:10.4, cap:33900 },
  { code:"MSN", name:"Masan Group", price:71200, chg:1.1, sector:"Hàng tiêu dùng", exch:"HOSE", pe:34.5, pb:3.2, roe:9.3, cap:102300 },
  { code:"GAS", name:"PV GAS", price:68900, chg:-0.7, sector:"Dầu khí", exch:"HOSE", pe:13.9, pb:2.5, roe:17.8, cap:132500 },
  { code:"CTG", name:"VietinBank", price:38200, chg:0.3, sector:"Ngân hàng", exch:"HOSE", pe:8.9, pb:1.4, roe:16.7, cap:200100 },
  { code:"TCB", name:"Techcombank", price:29800, chg:1.4, sector:"Ngân hàng", exch:"HOSE", pe:8.2, pb:1.5, roe:18.9, cap:210400 },
  { code:"PLX", name:"Petrolimex", price:41500, chg:-1.1, sector:"Dầu khí", exch:"HOSE", pe:16.8, pb:2.0, roe:11.9, cap:53700 },
  { code:"VJC", name:"Vietjet Air", price:104200, chg:2.8, sector:"Vận tải", exch:"HOSE", pe:29.4, pb:4.1, roe:14.0, cap:57200 },
];

D.watchlist = ["VCB","FPT","HPG","SSI","VIC"];

D.sectors = [
  { name:"Ngân hàng", flow: 320, pct: 1.4 },
  { name:"Bất động sản", flow: 480, pct: 2.1 },
  { name:"Công nghệ", flow: 210, pct: 3.2 },
  { name:"Bán lẻ", flow: -90, pct: -0.6 },
  { name:"Vật liệu XD", flow: -140, pct: -1.2 },
  { name:"Chứng khoán", flow: 150, pct: 2.6 },
  { name:"Dầu khí", flow: -60, pct: -0.4 },
  { name:"Bảo hiểm", flow: 20, pct: 0.3 },
  { name:"Du lịch & Giải trí", flow: 260, pct: 2.9 },
  { name:"Hàng tiêu dùng", flow: 40, pct: 0.5 },
  { name:"Dược phẩm", flow: -20, pct: -0.3 },
  { name:"Vận tải", flow: 95, pct: 1.7 },
];

D.commodityGroups = {
  "Năng lượng": [
    { name:"Dầu WTI", price:80.22, chg:0.88, pct:1.11 },
    { name:"Dầu Brent", price:96.19, chg:2.12, pct:2.25 },
    { name:"Khí thiên nhiên", price:2.91, chg:0.01, pct:0.24 },
    { name:"Xăng RBOB", price:3.47, chg:0.05, pct:1.51 },
  ],
  "Kim loại & Vật liệu": [
    { name:"Thép thanh Trung Quốc", price:3406, chg:-2, pct:-0.06 },
    { name:"HRC Trung Quốc", price:461.5, chg:0, pct:0 },
    { name:"Than cốc luyện kim TQ", price:1633, chg:0, pct:0 },
    { name:"Đồng LME", price:9120, chg:45, pct:0.5 },
  ],
  "Nông sản": [
    { name:"Dầu cọ thô", price:1009, chg:0, pct:0 },
    { name:"Cao su TSR20", price:172.4, chg:-1.1, pct:-0.6 },
    { name:"Cà phê Robusta", price:4210, chg:38, pct:0.9 },
  ],
};

D.commodityLinks = {
  "Dầu WTI": { stocks:["GAS","PLX","PVD","PVS"], sectors:["Dầu khí","Vận tải"] },
  "Thép thanh Trung Quốc": { stocks:["HPG","HSG","NKG"], sectors:["Vật liệu XD","Xây dựng"] },
  "Cao su TSR20": { stocks:["DRC","CSM","PHR"], sectors:["Hàng tiêu dùng","Nông nghiệp"] },
};

D.macroMatrix = [
  { group:"Chỉ tiêu KT chung", factor:"Tăng trưởng GDP", dir:"pos", strength:"Mạnh" },
  { group:"Chỉ tiêu KT chung", factor:"Tỷ lệ lạm phát", dir:"neu", strength:"Mạnh" },
  { group:"Chỉ tiêu KT chung", factor:"Tỷ giá USD/VND", dir:"neu", strength:"Rất mạnh" },
  { group:"Chỉ tiêu KT chung", factor:"Cán cân thương mại", dir:"pos", strength:"Trung bình" },
  { group:"Tiền tệ trong nước", factor:"Lãi suất liên ngân hàng", dir:"pos", strength:"Mạnh" },
  { group:"Tiền tệ trong nước", factor:"Lãi suất điều hành", dir:"neu", strength:"Nhẹ" },
  { group:"Tiền tệ trong nước", factor:"Tăng trưởng tín dụng", dir:"neu", strength:"Mạnh" },
  { group:"Tiền tệ quốc tế", factor:"Fed Fund Rate", dir:"neu", strength:"Mạnh" },
  { group:"Tiền tệ quốc tế", factor:"Chỉ số DXY", dir:"neu", strength:"Trung bình" },
  { group:"Lãi suất huy động", factor:"Lãi suất huy động NHTM", dir:"neg", strength:"Trung bình" },
];

D.macroNote = {
  current: "Quý II/2026 khép lại với bức tranh kinh tế vĩ mô tích cực, GDP ước tăng 7,9% so với cùng kỳ, tiếp tục nằm trong nhóm tăng trưởng nhanh khu vực ASEAN. Lạm phát được kiểm soát quanh mục tiêu 4%, tỷ giá ổn định nhờ dự trữ ngoại hối cải thiện.",
  outlook: "Kỳ vọng GDP Quý III/2026 đạt 7,5-8,0%, động lực chính từ đầu tư công và xuất khẩu phục hồi. Rủi ro cần theo dõi: biến động chính sách thuế quan quốc tế và áp lực tỷ giá cuối năm.",
};

D.events = [
  { date:"29/07", code:"HPG", desc:"Chia cổ tức bằng tiền, tỷ lệ 10%", type:"Cổ tức" },
  { date:"30/07", code:"VCB", desc:"Đại hội cổ đông bất thường", type:"ĐHCĐ" },
  { date:"02/08", code:"FPT", desc:"Công bố KQKD Quý II/2026", type:"KQKD" },
  { date:"05/08", code:"MWG", desc:"Ngày GDKHQ nhận cổ tức CP tỷ lệ 15%", type:"Cổ tức" },
  { date:"07/08", code:"SSI", desc:"Phát hành quyền mua CP giá 15.000đ", type:"Phát hành" },
];

D.macroCalendar = [
  { date:"29/07", country:"VN", name:"Công bố CPI tháng 7", impact:"Cao" },
  { date:"31/07", country:"US", name:"Họp FOMC — quyết định lãi suất", impact:"Rất cao" },
  { date:"01/08", country:"CN", name:"Chỉ số PMI sản xuất", impact:"Trung bình" },
  { date:"05/08", country:"VN", name:"Số liệu xuất nhập khẩu tháng 7", impact:"Cao" },
];

D.insiderTrades = [
  { code:"HPG", person:"Trần Đình Long", role:"Chủ tịch HĐQT", type:"Đăng ký mua", qty:"2.000.000", note:"Từ 05/08–03/09" },
  { code:"VIC", person:"Phạm Nhật Vượng", role:"Chủ tịch HĐQT", type:"Không thay đổi", qty:"—", note:"Báo cáo định kỳ" },
  { code:"FPT", person:"Quỹ đầu tư ABC", role:"Cổ đông lớn", type:"Bán ròng", qty:"850.000", note:"Giảm sở hữu còn 4,8%" },
];

D.ideas = [
  { code:"MWG", model:"EPS Growth", price:63800, pct:2.1, signal:"Mua" },
  { code:"ACB", model:"Siêu chỉ báo", price:23900, pct:-0.4, signal:"Mua" },
  { code:"VJC", model:"Đột biến khối lượng", price:104200, pct:2.8, signal:"Mua" },
  { code:"HPG", model:"Phân kỳ tăng giá", price:26400, pct:-1.5, signal:"Theo dõi" },
  { code:"GAS", model:"EPS Growth", price:68900, pct:-0.7, signal:"Bán" },
];

D.scores = {
  FPT: { fscore:8, magic:9, mscore:-2.4 },
  VCB: { fscore:7, magic:7, mscore:-2.8 },
  HPG: { fscore:5, magic:6, mscore:-1.9 },
};

D.valuation = {
  code:"FPT",
  methods:[
    { name:"Multi P/E", result:118400, weight:25 },
    { name:"Multi P/B", result:121900, weight:25 },
    { name:"Multi EV/EBITDA", result:126200, weight:25 },
    { name:"DCF (FCFE)", result:142100, weight:25 },
  ],
  final: 127150, upside: -4.0,
  fcfeHistory:[
    {y:2022, v:3120},{y:2023, v:2870},{y:2024, v:4210},{y:2025, v:4890},{y:2026, v:2340},
  ],
  fcfeForecast:[
    {y:2027, g:14, v:5580},{y:2028, g:14, v:6360},{y:2029, g:13, v:7190},{y:2030, g:12, v:8050},{y:2031, g:12, v:9020},
  ],
};

D.news = [
  { time:"09:41", title:"FPT ký hợp tác chiến lược AI với đối tác Nhật Bản, dự kiến đóng góp doanh thu từ 2027", code:"FPT" },
  { time:"09:15", title:"HPG khởi công giai đoạn 2 khu liên hợp gang thép, công suất tăng thêm 30%", code:"HPG" },
  { time:"08:52", title:"Khối ngoại mua ròng phiên thứ 5 liên tiếp, tập trung nhóm ngân hàng", code:null },
  { time:"08:30", title:"NHNN giữ nguyên lãi suất điều hành, ưu tiên ổn định tỷ giá", code:null },
];

D.chat = {
  suggestions: [
    "P/E của FPT hiện tại bao nhiêu?",
    "So sánh sức khỏe tài chính VCB và ACB",
    "Vì sao ngành ngân hàng tăng hôm nay?",
    "HPG có tín hiệu mua nào không?",
  ],
  responses: {
    "P/E của FPT hiện tại bao nhiêu?": "FPT — P/E hiện tại: 22.6 lần, cao hơn trung bình ngành Công nghệ (18.4 lần). EPS 4 quý gần nhất: 5.865đ/CP. (Nguồn: FS_REPORT_WIDE · cập nhật 10:32 28/07/2026)",
    "So sánh sức khỏe tài chính VCB và ACB": "VCB: ROE 18.4%, NIM ước tính cao hơn trung bình ngành, F-Score 7/9. ACB: ROE 19.8% (cao hơn VCB), P/E thấp hơn (7.1 vs 15.2). Cả hai đều thuộc nhóm ngân hàng có chất lượng tài sản tốt trong danh mục theo dõi. (Nguồn: So sánh 4 loại hình DN, DN 360)",
    "Vì sao ngành ngân hàng tăng hôm nay?": "Dòng tiền vào nhóm Ngân hàng đạt 320 tỷ (+1.4%), cao hơn TB 5 phiên. Khối ngoại mua ròng CTG, TCB. Không có tin tức chính sách bất thường trong phiên. (Nguồn: Thị trường, Ngành)",
    "HPG có tín hiệu mua nào không?": "HPG đang được mô hình \"Phân kỳ tăng giá\" gắn cờ theo dõi (chưa phải tín hiệu Mua mạnh). F-Score 5/9 — trung bình. Giá giảm -1.5% phiên nay, khối lượng chưa vượt ngưỡng đột biến. (Nguồn: Ý tưởng, Điểm chất lượng CP)",
  },
  fallback: "Mình đã ghi nhận câu hỏi. Ở bản MVP demo này, mình chỉ trả lời được các câu mẫu gợi ý bên dưới — bản triển khai thật sẽ truy vấn trực tiếp toàn bộ dữ liệu hệ thống.",
};

D.digest = [
  { text:"VCB: Điểm chất lượng tăng từ 6 → 7 sau BCTC Quý II", type:"up" },
  { text:"HPG: Sự kiện chia cổ tức trong 3 ngày tới", type:"info" },
  { text:"Ngành Thép: dòng tiền đảo chiều, giảm -140 tỷ", type:"down" },
  { text:"SSI: khối lượng giao dịch gấp 2.1 lần trung bình 10 phiên", type:"info" },
];

D.roles = [
  { id:"ba", label:"BA / Phân tích" },
  { id:"sales", label:"Sales" },
  { id:"leader", label:"Lãnh đạo" },
];

D.formulas = [
  { name:"[Algo] ADL – Accumulation/Distribution", author:"Đội ngũ Algo", used: 214 },
  { name:"Lọc cổ tức cao + ROE > 15%", author:"Nguyễn Văn A", used: 87 },
  { name:"Momentum 3 tháng theo ngành", author:"Trần Thị B", used: 63 },
];

// sparkline series cho các mini-chart (mảng 12-20 điểm)
D.spark = (seed=1, n=20, base=100, vol=6) => {
  let v = base, arr = [v];
  let s = seed*9301+49297;
  for (let i=1;i<n;i++){ s=(s*9301+49297)%233280; const r=(s/233280)-0.5; v = Math.max(base*0.7, v + r*vol); arr.push(v); }
  return arr;
};
