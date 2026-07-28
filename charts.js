/* ============================================================
   ALGO ANALYTICS HUB — MINI CHART ENGINE (canvas thuần, không phụ thuộc)
   ============================================================ */
const Chart2 = {};

function dpr(canvas){
  const ratio = window.devicePixelRatio || 1;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w*ratio; canvas.height = h*ratio;
  const ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);
  return {ctx, w, h};
}

// đường sparkline đơn giản
Chart2.sparkline = (canvas, data, color="#3ecf8e") => {
  const {ctx,w,h} = dpr(canvas);
  ctx.clearRect(0,0,w,h);
  const min = Math.min(...data), max = Math.max(...data);
  const pad = 3;
  const x = i => pad + i*(w-pad*2)/(data.length-1);
  const y = v => h-pad - (v-min)/(max-min||1)*(h-pad*2);
  ctx.beginPath();
  data.forEach((v,i)=> i===0 ? ctx.moveTo(x(i),y(v)) : ctx.lineTo(x(i),y(v)));
  ctx.strokeStyle = color; ctx.lineWidth = 1.6; ctx.lineJoin='round'; ctx.stroke();
  // fill nhẹ
  ctx.lineTo(x(data.length-1), h-pad); ctx.lineTo(x(0), h-pad); ctx.closePath();
  const grad = ctx.createLinearGradient(0,0,0,h);
  grad.addColorStop(0, color+"33"); grad.addColorStop(1, color+"00");
  ctx.fillStyle = grad; ctx.fill();
};

// biểu đồ đường đa chuỗi (nhiều series cùng trục)
Chart2.multiLine = (canvas, series, opts={}) => {
  const {ctx,w,h} = dpr(canvas);
  ctx.clearRect(0,0,w,h);
  const padL=34, padB=18, padT=8, padR=8;
  const all = series.flatMap(s=>s.data);
  const min = opts.min ?? Math.min(...all), max = opts.max ?? Math.max(...all);
  const n = series[0].data.length;
  const x = i => padL + i*(w-padL-padR)/(n-1);
  const y = v => h-padB - (v-min)/(max-min||1)*(h-padT-padB);
  // grid
  ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth=1;
  for(let g=0; g<=3; g++){
    const gy = padT + g*(h-padT-padB)/3;
    ctx.beginPath(); ctx.moveTo(padL,gy); ctx.lineTo(w-padR,gy); ctx.stroke();
  }
  ctx.fillStyle = "#5b6478"; ctx.font = "9px 'IBM Plex Mono', monospace";
  for(let g=0; g<=3; g++){
    const val = max - g*(max-min)/3;
    const gy = padT + g*(h-padT-padB)/3;
    ctx.fillText(val.toFixed(0), 2, gy+3);
  }
  series.forEach(s=>{
    ctx.beginPath();
    s.data.forEach((v,i)=> i===0? ctx.moveTo(x(i),y(v)) : ctx.lineTo(x(i),y(v)));
    ctx.strokeStyle = s.color; ctx.lineWidth = 1.8; ctx.lineJoin='round'; ctx.stroke();
  });
};

// biểu đồ cột (bar), values có thể âm/dương, tô màu theo dấu
Chart2.bars = (canvas, items, opts={}) => {
  const {ctx,w,h} = dpr(canvas);
  ctx.clearRect(0,0,w,h);
  const padL=30, padB=26, padT=8, padR=6;
  const vals = items.map(i=>i.value);
  const max = Math.max(...vals, 0), min = Math.min(...vals, 0);
  const zero = h-padB - (0-min)/(max-min||1)*(h-padT-padB);
  const bw = (w-padL-padR)/items.length;
  ctx.strokeStyle="rgba(255,255,255,0.08)"; ctx.beginPath(); ctx.moveTo(padL,zero); ctx.lineTo(w-padR,zero); ctx.stroke();
  items.forEach((it,i)=>{
    const bx = padL + i*bw + bw*0.18;
    const bh = (it.value-0)/(max-min||1)*(h-padT-padB);
    const by = it.value>=0 ? zero-bh : zero;
    ctx.fillStyle = it.value>=0 ? (opts.posColor||"#3ecf8e") : (opts.negColor||"#e5566d");
    ctx.fillRect(bx, by, bw*0.64, Math.abs(bh));
    if(opts.labels){
      ctx.fillStyle="#8b93a7"; ctx.font="8.5px 'IBM Plex Sans', sans-serif"; ctx.textAlign="center";
      ctx.fillText(it.label, bx+bw*0.32, h-padB+11);
    }
  });
  ctx.textAlign="left";
};

// gauge nửa vòng tròn 0-100
Chart2.gauge = (canvas, value, opts={}) => {
  const {ctx,w,h} = dpr(canvas);
  ctx.clearRect(0,0,w,h);
  const cx=w/2, cy=h-10, r=Math.min(w/2-8, h-18);
  const start=Math.PI, end=0;
  // nền
  const segs = [[0,20,"#3b82c4"],[20,40,"#3ecf8e"],[40,60,"#e0b23c"],[60,80,"#e08a3c"],[80,100,"#e5566d"]];
  segs.forEach(([a,b,c])=>{
    const a0 = Math.PI - (a/100)*Math.PI;
    const a1 = Math.PI - (b/100)*Math.PI;
    ctx.beginPath(); ctx.arc(cx,cy,r,a0,a1,true); ctx.strokeStyle=c; ctx.lineWidth=9; ctx.lineCap="butt"; ctx.stroke();
  });
  const ang = Math.PI - (value/100)*Math.PI;
  const nx = cx+Math.cos(ang)*(r-14), ny = cy+Math.sin(ang)*(r-14);
  ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(nx,ny); ctx.strokeStyle="#e8ecf3"; ctx.lineWidth=2; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx,cy,3,0,7); ctx.fillStyle="#e8ecf3"; ctx.fill();
};

// donut đơn giản
Chart2.donut = (canvas, items) => {
  const {ctx,w,h} = dpr(canvas);
  ctx.clearRect(0,0,w,h);
  const cx=w/2, cy=h/2, r=Math.min(w,h)/2-4, r0=r*0.58;
  const total = items.reduce((s,i)=>s+i.value,0);
  let a0=-Math.PI/2;
  items.forEach(it=>{
    const a1 = a0 + (it.value/total)*Math.PI*2;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,a0,a1); ctx.closePath();
    ctx.fillStyle = it.color; ctx.fill();
    a0=a1;
  });
  ctx.globalCompositeOperation="destination-out";
  ctx.beginPath(); ctx.arc(cx,cy,r0,0,Math.PI*2); ctx.fill();
  ctx.globalCompositeOperation="source-over";
};

// nến giá đơn giản (OHLC ngẫu nhiên nhưng nhất quán)
Chart2.candles = (canvas, data) => {
  const {ctx,w,h} = dpr(canvas);
  ctx.clearRect(0,0,w,h);
  const padT=10, padB=18;
  const highs = data.map(d=>d.h), lows = data.map(d=>d.l);
  const max = Math.max(...highs), min = Math.min(...lows);
  const cw = w/data.length;
  const y = v => padT + (max-v)/(max-min||1)*(h-padT-padB);
  data.forEach((d,i)=>{
    const cx = i*cw + cw/2;
    const up = d.c>=d.o;
    ctx.strokeStyle = up? "#3ecf8e":"#e5566d";
    ctx.beginPath(); ctx.moveTo(cx,y(d.h)); ctx.lineTo(cx,y(d.l)); ctx.stroke();
    ctx.fillStyle = up? "#3ecf8e":"#e5566d";
    const bodyTop = y(Math.max(d.o,d.c)), bodyBot = y(Math.min(d.o,d.c));
    ctx.fillRect(cx-cw*0.32, bodyTop, cw*0.64, Math.max(1.5,bodyBot-bodyTop));
  });
};

function genCandles(n=40, base=130000, vol=1600, seed=7){
  let s=seed, arr=[], last=base;
  for(let i=0;i<n;i++){
    s=(s*9301+49297)%233280; const r1=(s/233280)-0.5;
    s=(s*9301+49297)%233280; const r2=(s/233280)-0.5;
    const o=last, c=Math.max(base*0.6, o + r1*vol);
    const h=Math.max(o,c)+Math.abs(r2*vol*0.6), l=Math.min(o,c)-Math.abs(r2*vol*0.6);
    arr.push({o,h,l,c}); last=c;
  }
  return arr;
}
