import { useState, useEffect, useRef } from "react";

// ─── Awi – WhatsApp-Style Business Communication App ─────────────────────────

// ─── Theme (WhatsApp Dark) ───────────────────────────────────────────────────
const T = {
  bg: "#111b21",
  bgDeeper: "#0b141a",
  bgPanel: "#202c33",
  bgBubbleMe: "#005c4b",
  bgBubbleThem: "#202c33",
  bgHover: "#2a3942",
  bgInput: "#2a3942",
  accent: "#00a884",
  accentDark: "#008069",
  accentLight: "#25d366",
  text: "#e9edef",
  textSecondary: "#8696a0",
  textMuted: "#667781",
  border: "#2a3942",
  borderLight: "#313d45",
  headerBg: "#202c33",
  red: "#ea0038",
  blue: "#53bdeb",
  unreadBg: "#00a884",
};

// ─── Icons ───────────────────────────────────────────────────────────────────
const Ic = ({ d, size = 20, color = T.textSecondary, style, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style} {...p}>
    {typeof d === "string" ? <path d={d} /> : d}
  </svg>
);

const I = {
  chat: (p) => <Ic d={<><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></>} {...p} />,
  phone: (p) => <Ic d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" {...p} />,
  status: (p) => <Ic d={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>} {...p} />,
  community: (p) => <Ic d={<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>} {...p} />,
  channel: (p) => <Ic d={<><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></>} {...p} />,
  meta: (p) => <Ic d={<><circle cx="12" cy="12" r="2"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10"/></>} {...p} />,
  search: (p) => <Ic d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} {...p} />,
  send: (p) => <Ic d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" {...p} />,
  attach: (p) => <Ic d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" {...p} />,
  smile: (p) => <Ic d={<><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>} {...p} />,
  mic: (p) => <Ic d={<><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>} {...p} />,
  micOff: (p) => <Ic d={<><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"/><path d="M17 16.95A7 7 0 015 12v-2m14 0v2c0 .76-.13 1.49-.35 2.17"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>} {...p} />,
  video: (p) => <Ic d={<><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>} {...p} />,
  videoOff: (p) => <Ic d={<><path d="M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2m5.66 0H14a2 2 0 012 2v3.34l1 1L23 7v10"/><line x1="1" y1="1" x2="23" y2="23"/></>} {...p} />,
  back: (p) => <Ic d={<><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>} {...p} />,
  down: (p) => <Ic d={<><polyline points="6 9 12 15 18 9"/></>} {...p} />,
  plus: (p) => <Ic d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} {...p} />,
  check: (p) => <Ic d="M20 6L9 17l-5-5" {...p} />,
  checkCheck: (p) => <Ic d={<><path d="M18 6L7 17l-5-5"/><path d="M22 10l-9.17 9L10 16.17"/></>} {...p} />,
  x: (p) => <Ic d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} {...p} />,
  settings: (p) => <Ic d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>} {...p} />,
  user: (p) => <Ic d={<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>} {...p} />,
  lock: (p) => <Ic d={<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>} {...p} />,
  monitor: (p) => <Ic d={<><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>} {...p} />,
  bell: (p) => <Ic d={<><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>} {...p} />,
  key: (p) => <Ic d={<><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></>} {...p} />,
  image: (p) => <Ic d={<><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>} {...p} />,
  help: (p) => <Ic d={<><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>} {...p} />,
  keyboard: (p) => <Ic d={<><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="6" y1="8" x2="6.01" y2="8"/><line x1="10" y1="8" x2="10.01" y2="8"/><line x1="14" y1="8" x2="14.01" y2="8"/><line x1="18" y1="8" x2="18.01" y2="8"/><line x1="6" y1="12" x2="6.01" y2="12"/><line x1="10" y1="12" x2="10.01" y2="12"/><line x1="14" y1="12" x2="14.01" y2="12"/><line x1="18" y1="12" x2="18.01" y2="12"/><line x1="8" y1="16" x2="16" y2="16"/></>} {...p} />,
  logout: (p) => <Ic d={<><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>} {...p} />,
  archive: (p) => <Ic d={<><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></>} {...p} />,
  pin: (p) => <Ic d={<><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19"/></>} {...p} />,
  moreV: (p) => <Ic d={<><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></>} {...p} />,
  filter: (p) => <Ic d={<><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>} {...p} />,
  edit: (p) => <Ic d={<><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>} {...p} />,
};

// ─── Avatar ──────────────────────────────────────────────────────────────────
const Avatar = ({ name, size = 40, online, color, img }) => {
  const colors = ["#00a884","#8b5cf6","#ec4899","#f59e0b","#06b6d4","#ef4444","#6366f1","#d946ef"];
  const bg = color || colors[name.charCodeAt(0) % colors.length];
  const initials = name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <div style={{ width:size, height:size, borderRadius:"50%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.36, fontWeight:600, color:"#fff", letterSpacing:0.3 }}>{initials}</div>
      {online !== undefined && <div style={{ position:"absolute", bottom:0, right:0, width:size*0.28, height:size*0.28, borderRadius:"50%", background:online?T.accent:T.textMuted, border:`2px solid ${T.bgPanel}` }} />}
    </div>
  );
};

// ─── QR Code SVG (decorative) ────────────────────────────────────────────────
const QRCode = () => {
  const cells = [];
  for (let r = 0; r < 25; r++) for (let c = 0; c < 25; c++) {
    const isFinder = (r<7&&c<7)||(r<7&&c>17)||(r>17&&c<7);
    const fill = isFinder || Math.random()>0.55;
    if (fill) cells.push(<rect key={`${r}-${c}`} x={c*8} y={r*8} width={7} height={7} rx={1} fill="#e9edef" />);
  }
  return (
    <div style={{ position:"relative", display:"inline-block" }}>
      <svg width={200} height={200} viewBox="0 0 200 200" style={{ background:"#e9edef", borderRadius:8, padding:0 }}>
        <rect width={200} height={200} fill="#111b21" rx={8} />
        {cells}
      </svg>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:48, height:48, borderRadius:10, background:T.accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:22, fontWeight:800, color:"#fff" }}>A</span>
      </div>
    </div>
  );
};

// ─── Sample Data ─────────────────────────────────────────────────────────────
const chatData = [
  { id:1, name:"Sarah Müller", online:true, unread:3, pinned:true, lastMsg:"Können wir den Call auf 15 Uhr verschieben?", time:"14:32", typing:false, msgs:[
    {id:1,from:"them",text:"Hey! Hast du den Report fertig?",time:"13:10"},
    {id:2,from:"me",text:"Fast – schicke ihn in 10 Minuten.",time:"13:12"},
    {id:3,from:"them",text:"Super, danke! 👍",time:"13:13"},
    {id:4,from:"them",text:"Können wir den Call auf 15 Uhr verschieben?",time:"14:32"},
  ]},
  { id:2, name:"Team Backend", isGroup:true, online:undefined, unread:12, pinned:true, lastMsg:"Jonas: PR ist ready for review", time:"14:28", members:["Jonas","Mira","Kai","Lena","Tom"], msgs:[
    {id:1,from:"Jonas",text:"PR ist ready for review",time:"14:28"},
    {id:2,from:"Mira",text:"Schaue ich mir gleich an 👀",time:"14:29"},
  ]},
  { id:3, name:"Max Weber", online:true, unread:0, pinned:false, lastMsg:"Build ist durch ✅", time:"14:15", msgs:[
    {id:1,from:"them",text:"Deployment läuft.",time:"13:50"},
    {id:2,from:"them",text:"Build ist durch ✅",time:"14:15"},
  ]},
  { id:4, name:"Lisa Chen", online:false, unread:1, pinned:false, lastMsg:"Hier sind die neuen Wireframes", time:"13:45", msgs:[
    {id:1,from:"them",text:"Hier sind die neuen Wireframes",time:"13:45"},
  ]},
  { id:5, name:"Tom Richter", online:true, unread:0, pinned:false, lastMsg:"Server Monitoring sieht gut aus", time:"12:30", msgs:[
    {id:1,from:"me",text:"Wie sieht das Monitoring aus?",time:"12:20"},
    {id:2,from:"them",text:"Server Monitoring sieht gut aus",time:"12:30"},
  ]},
  { id:6, name:"Anna Schmidt", online:false, unread:0, pinned:false, lastMsg:"Sprint Review morgen um 10", time:"11:20", msgs:[
    {id:1,from:"them",text:"Sprint Review morgen um 10",time:"11:20"},
  ]},
  { id:7, name:"DevOps Alerts", isGroup:true, online:undefined, unread:0, pinned:false, lastMsg:"System: All services healthy", time:"10:05", members:["Tom","Kai","Bot"], msgs:[
    {id:1,from:"System",text:"All services healthy",time:"10:05"},
  ]},
  { id:8, name:"Mira Kovac", online:true, unread:0, pinned:false, lastMsg:"Danke für das Feedback!", time:"Gestern", msgs:[
    {id:1,from:"them",text:"Danke für das Feedback!",time:"Gestern"},
  ]},
];

const callHistory = [
  { id:1, name:"Sarah Müller", type:"incoming", isVideo:true, time:"Heute, 14:00", missed:false },
  { id:2, name:"Max Weber", type:"outgoing", isVideo:false, time:"Heute, 11:30", missed:false },
  { id:3, name:"Lisa Chen", type:"incoming", isVideo:false, time:"Gestern, 16:45", missed:true },
  { id:4, name:"Team Backend", type:"outgoing", isVideo:true, time:"Gestern, 10:00", missed:false, isGroup:true },
  { id:5, name:"Tom Richter", type:"incoming", isVideo:false, time:"01.04.2026", missed:false },
];

// ─── Login: QR Code Screen ──────────────────────────────────────────────────
const LoginQR = ({ onPhoneLogin }) => (
  <div style={{ width:"100vw", height:"100vh", background:T.bg, display:"flex", flexDirection:"column" }}>
    <div style={{ background:T.accentDark, height:222 }} />
    <div style={{ flex:1, display:"flex", justifyContent:"center", marginTop:-120 }}>
      <div style={{ background:T.bgPanel, borderRadius:4, padding:"48px 58px", maxWidth:800, width:"100%", boxShadow:"0 18px 50px rgba(0,0,0,0.4)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
          <button onClick={onPhoneLogin} style={{ background:"none", border:"none", cursor:"pointer", padding:6, display:"flex" }}>
            {I.back({ color:T.textSecondary, size:20 })}
          </button>
        </div>
        <h1 style={{ fontSize:28, fontWeight:300, color:T.text, margin:"0 0 28px", letterSpacing:"-0.2px" }}>Bei Awi anmelden</h1>
        <div style={{ display:"flex", gap:48, alignItems:"flex-start" }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              {[
                "Scanne den QR-Code mit der Kamera deines Telefons.",
                <>Tippe auf den Link, um <strong style={{color:T.accent}}>Awi</strong> zu öffnen.</>,
                "Scanne den QR-Code noch einmal, um eine Verknüpfung mit deinem Konto herzustellen.",
              ].map((text, i) => (
                <div key={i} style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", border:`1.5px solid ${T.accent}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:T.accent, flexShrink:0, fontWeight:500 }}>{i+1}</div>
                  <p style={{ margin:0, color:T.textSecondary, fontSize:15, lineHeight:1.6 }}>{text}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop:32 }}>
              <a href="#" style={{ color:T.accent, fontSize:14, textDecoration:"none" }}>Brauchst du Hilfe? ↗</a>
            </div>
          </div>
          <div>
            <QRCode />
          </div>
        </div>
        <div style={{ marginTop:36, display:"flex", justifyContent:"flex-end" }}>
          <button onClick={onPhoneLogin} style={{ background:"none", border:"none", color:T.accent, fontSize:14, cursor:"pointer", fontWeight:500, display:"flex", alignItems:"center", gap:6 }}>
            Mit Telefonnummer anmelden {I.down({color:T.accent, size:14, style:{transform:"rotate(-90deg)"}})}
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── Login: Phone Number Screen ─────────────────────────────────────────────
const LoginPhone = ({ onQRLogin, onRegister, onLogin }) => {
  const [phone, setPhone] = useState("");
  const [country] = useState("Deutschland");
  return (
    <div style={{ width:"100vw", height:"100vh", background:T.bg, display:"flex", flexDirection:"column" }}>
      <div style={{ background:T.accentDark, height:222 }} />
      <div style={{ flex:1, display:"flex", justifyContent:"center", marginTop:-120 }}>
        <div style={{ background:T.bgPanel, borderRadius:4, padding:"48px 58px", maxWidth:480, width:"100%", boxShadow:"0 18px 50px rgba(0,0,0,0.4)", textAlign:"center" }}>
          <button onClick={onQRLogin} style={{ background:"none", border:"none", cursor:"pointer", padding:6, display:"flex", position:"absolute" }}>
            {I.back({ color:T.textSecondary, size:20 })}
          </button>
          <h1 style={{ fontSize:24, fontWeight:300, color:T.text, margin:"0 0 32px" }}>Gib eine Telefonnummer ein</h1>

          <div style={{ display:"flex", flexDirection:"column", gap:12, maxWidth:300, margin:"0 auto" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, background:T.bg, borderRadius:8, padding:"12px 16px", border:`1px solid ${T.border}` }}>
              <span style={{ fontSize:18 }}>🇩🇪</span>
              <span style={{ color:T.text, fontSize:15, flex:1, textAlign:"left" }}>{country}</span>
              {I.down({ color:T.textSecondary, size:16 })}
            </div>
            <input
              style={{ background:T.bg, border:`1px solid ${T.border}`, borderRadius:8, padding:"12px 16px", color:T.text, fontSize:16, outline:"none", textAlign:"center", letterSpacing:1 }}
              placeholder="+49"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          <button onClick={onLogin} style={{ marginTop:28, padding:"10px 32px", borderRadius:24, background:T.accent, border:"none", color:"#fff", fontSize:14, fontWeight:500, cursor:"pointer" }}>
            Weiter
          </button>

          <div style={{ marginTop:20 }}>
            <button onClick={onQRLogin} style={{ background:"none", border:"none", color:T.accent, fontSize:14, cursor:"pointer", fontWeight:500, display:"inline-flex", alignItems:"center", gap:4 }}>
              Mit QR-Code anmelden {I.down({color:T.accent, size:14, style:{transform:"rotate(-90deg)"}})}
            </button>
          </div>

          <div style={{ marginTop:24, borderTop:`1px solid ${T.border}`, paddingTop:20 }}>
            <span style={{ color:T.textMuted, fontSize:13 }}>Noch kein Konto? </span>
            <button onClick={onRegister} style={{ background:"none", border:"none", color:T.accent, fontSize:13, cursor:"pointer", fontWeight:600 }}>Registrieren</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Register Screen ─────────────────────────────────────────────────────────
const RegisterScreen = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const inputStyle = { background:T.bg, border:`1px solid ${T.border}`, borderRadius:8, padding:"12px 16px", color:T.text, fontSize:15, outline:"none", width:"100%", boxSizing:"border-box" };

  return (
    <div style={{ width:"100vw", height:"100vh", background:T.bg, display:"flex", flexDirection:"column" }}>
      <div style={{ background:T.accentDark, height:222 }} />
      <div style={{ flex:1, display:"flex", justifyContent:"center", marginTop:-120 }}>
        <div style={{ background:T.bgPanel, borderRadius:4, padding:"48px 58px", maxWidth:460, width:"100%", boxShadow:"0 18px 50px rgba(0,0,0,0.4)", textAlign:"center" }}>
          <button onClick={step>1?()=>setStep(step-1):onBack} style={{ background:"none", border:"none", cursor:"pointer", padding:6, display:"flex" }}>
            {I.back({ color:T.textSecondary, size:20 })}
          </button>

          {step === 1 && (
            <>
              <div style={{ width:80, height:80, borderRadius:"50%", background:T.bgHover, margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {I.user({ color:T.textSecondary, size:36 })}
              </div>
              <h2 style={{ fontSize:22, fontWeight:300, color:T.text, margin:"0 0 8px" }}>Profil erstellen</h2>
              <p style={{ color:T.textMuted, fontSize:14, margin:"0 0 28px" }}>Gib deinen Namen ein</p>
              <div style={{ maxWidth:300, margin:"0 auto", display:"flex", flexDirection:"column", gap:14 }}>
                <input style={inputStyle} placeholder="Dein Name" value={name} onChange={e=>setName(e.target.value)} />
                <button onClick={()=>setStep(2)} disabled={!name.trim()} style={{ padding:"10px 32px", borderRadius:24, background:name.trim()?T.accent:T.bgHover, border:"none", color:name.trim()?"#fff":T.textMuted, fontSize:14, fontWeight:500, cursor:name.trim()?"pointer":"default" }}>
                  Weiter
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {I.phone({ color:T.accent, size:48 })}
              <h2 style={{ fontSize:22, fontWeight:300, color:T.text, margin:"16px 0 8px" }}>Telefonnummer</h2>
              <p style={{ color:T.textMuted, fontSize:14, margin:"0 0 28px" }}>Verifiziere deine Nummer</p>
              <div style={{ maxWidth:300, margin:"0 auto", display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, background:T.bg, borderRadius:8, padding:"12px 16px", border:`1px solid ${T.border}` }}>
                  <span style={{ fontSize:18 }}>🇩🇪</span>
                  <span style={{ color:T.text, fontSize:14, flex:1, textAlign:"left" }}>Deutschland</span>
                  {I.down({ color:T.textSecondary, size:16 })}
                </div>
                <input style={{...inputStyle, textAlign:"center", letterSpacing:1}} placeholder="+49 123 456 7890" value={phone} onChange={e=>setPhone(e.target.value)} />
                <button onClick={()=>setStep(3)} disabled={!phone.trim()} style={{ padding:"10px 32px", borderRadius:24, background:phone.trim()?T.accent:T.bgHover, border:"none", color:phone.trim()?"#fff":T.textMuted, fontSize:14, fontWeight:500, cursor:phone.trim()?"pointer":"default" }}>
                  Code senden
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {I.lock({ color:T.accent, size:48 })}
              <h2 style={{ fontSize:22, fontWeight:300, color:T.text, margin:"16px 0 8px" }}>Verifizierung</h2>
              <p style={{ color:T.textMuted, fontSize:14, margin:"0 0 28px" }}>Code wurde an {phone || "+49..."} gesendet</p>
              <div style={{ maxWidth:300, margin:"0 auto", display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
                  {[0,1,2,3,4,5].map(i => (
                    <input key={i} maxLength={1} style={{ ...inputStyle, width:44, height:52, textAlign:"center", fontSize:22, fontWeight:600, padding:0, borderRadius:10 }}
                      value={code[i]||""} onChange={e => { const v=code.split(""); v[i]=e.target.value; setCode(v.join("")); if(e.target.value&&e.target.nextElementSibling) e.target.nextElementSibling.focus(); }}
                    />
                  ))}
                </div>
                <button onClick={()=>setStep(4)} style={{ padding:"10px 32px", borderRadius:24, background:T.accent, border:"none", color:"#fff", fontSize:14, fontWeight:500, cursor:"pointer", marginTop:8 }}>
                  Verifizieren
                </button>
                <button style={{ background:"none", border:"none", color:T.accent, fontSize:13, cursor:"pointer" }}>Code erneut senden</button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div style={{ width:80, height:80, borderRadius:"50%", background:`${T.accent}22`, margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {I.key({ color:T.accent, size:36 })}
              </div>
              <h2 style={{ fontSize:22, fontWeight:300, color:T.text, margin:"0 0 8px" }}>Konto sichern</h2>
              <p style={{ color:T.textMuted, fontSize:14, margin:"0 0 28px" }}>E-Mail und Passwort festlegen</p>
              <div style={{ maxWidth:300, margin:"0 auto", display:"flex", flexDirection:"column", gap:14 }}>
                <input style={inputStyle} type="email" placeholder="E-Mail-Adresse" value={email} onChange={e=>setEmail(e.target.value)} />
                <input style={inputStyle} type="password" placeholder="Passwort erstellen" value={password} onChange={e=>setPassword(e.target.value)} />
                <input style={inputStyle} type="password" placeholder="Passwort bestätigen" />
                <button onClick={onComplete} style={{ padding:"10px 32px", borderRadius:24, background:T.accent, border:"none", color:"#fff", fontSize:14, fontWeight:500, cursor:"pointer", marginTop:4 }}>
                  Registrierung abschließen
                </button>
              </div>
            </>
          )}

          {/* Step indicators */}
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:28 }}>
            {[1,2,3,4].map(s => (
              <div key={s} style={{ width:s===step?24:8, height:8, borderRadius:4, background:s<=step?T.accent:T.bgHover, transition:"all 0.3s" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Settings Panel ──────────────────────────────────────────────────────────
const SettingsPanel = ({ onClose }) => {
  const [subPage, setSubPage] = useState(null);

  const items = [
    { icon:I.monitor, label:"Allgemein", desc:"Starten und schließen" },
    { icon:I.user, label:"Profil", desc:"Name, Profilbild, Benutzername" },
    { icon:I.key, label:"Konto", desc:"Sicherheitsbenachrichtigungen, Kontoinformationen" },
    { icon:I.lock, label:"Datenschutz", desc:"Blockierte Kontakte, selbstlöschende Nachrichten" },
    { icon:I.chat, label:"Chats", desc:"Design, Hintergrund, Chat-Einstellungen" },
    { icon:I.video, label:"Video und Sprache", desc:"Kamera, Mikrofon und Lautsprecher" },
    { icon:I.bell, label:"Benachrichtigungen", desc:"Benachrichtigungen zu Nachrichten" },
    { icon:I.keyboard, label:"Tastaturkürzel", desc:"Schnellmaßnahmen" },
    { icon:I.help, label:"Hilfe und Feedback", desc:"Hilfebereich, Kontakt, Datenschutzrichtlinie" },
  ];

  if (subPage) {
    return (
      <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"16px 20px", display:"flex", alignItems:"center", gap:16, borderBottom:`1px solid ${T.border}` }}>
          <button onClick={()=>setSubPage(null)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}>{I.back({color:T.textSecondary})}</button>
          <span style={{ fontSize:16, fontWeight:500, color:T.text }}>{subPage}</span>
        </div>
        <div style={{ flex:1, padding:24, overflowY:"auto" }}>
          {subPage === "Profil" && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
              <Avatar name="Awi" size={80} color={T.accent} />
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:18, fontWeight:600, color:T.text }}>Awi</div>
                <div style={{ fontSize:14, color:T.textSecondary, marginTop:4 }}>Hey, ich benutze Awi!</div>
              </div>
              <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:16, marginTop:12 }}>
                <div style={{ background:T.bg, borderRadius:8, padding:16 }}>
                  <div style={{ fontSize:12, color:T.accent, fontWeight:500, marginBottom:6 }}>Name</div>
                  <div style={{ color:T.text, fontSize:15 }}>Awi</div>
                </div>
                <div style={{ background:T.bg, borderRadius:8, padding:16 }}>
                  <div style={{ fontSize:12, color:T.accent, fontWeight:500, marginBottom:6 }}>Info</div>
                  <div style={{ color:T.text, fontSize:15 }}>Hey, ich benutze Awi!</div>
                </div>
                <div style={{ background:T.bg, borderRadius:8, padding:16 }}>
                  <div style={{ fontSize:12, color:T.accent, fontWeight:500, marginBottom:6 }}>Telefon</div>
                  <div style={{ color:T.text, fontSize:15 }}>+49 123 456 7890</div>
                </div>
              </div>
            </div>
          )}
          {subPage === "Datenschutz" && (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {["Zuletzt online & Online", "Profilbild", "Info", "Gruppen", "Lesebestätigungen"].map(item => (
                <div key={item} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:`1px solid ${T.border}` }}>
                  <span style={{ color:T.text, fontSize:14 }}>{item}</span>
                  <span style={{ color:T.textMuted, fontSize:13 }}>Alle</span>
                </div>
              ))}
              <div style={{ marginTop:16 }}>
                <div style={{ fontWeight:600, color:T.text, fontSize:14, marginBottom:12 }}>Blockierte Kontakte</div>
                <p style={{ color:T.textMuted, fontSize:13, margin:0 }}>Keine blockierten Kontakte</p>
              </div>
            </div>
          )}
          {subPage !== "Profil" && subPage !== "Datenschutz" && (
            <p style={{ color:T.textMuted, fontSize:14 }}>Einstellungen für „{subPage}" werden hier angezeigt.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"16px 20px", display:"flex", alignItems:"center", gap:16, borderBottom:`1px solid ${T.border}` }}>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}>{I.back({color:T.textSecondary})}</button>
        <span style={{ fontSize:16, fontWeight:500, color:T.text }}>Einstellungen</span>
      </div>

      {/* Profile Header */}
      <div onClick={()=>setSubPage("Profil")} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 20px", cursor:"pointer", borderBottom:`1px solid ${T.border}` }}
        onMouseEnter={e=>e.currentTarget.style.background=T.bgHover}
        onMouseLeave={e=>e.currentTarget.style.background="transparent"}
      >
        <Avatar name="Awi" size={52} color={T.accent} />
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:500, fontSize:16, color:T.text }}>Awi</div>
          <div style={{ fontSize:13, color:T.textMuted, marginTop:2 }}>Hey, ich benutze Awi!</div>
        </div>
      </div>

      {/* Settings Items */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {items.map((item, idx) => (
          <div key={idx} onClick={()=>setSubPage(item.label)} style={{ display:"flex", alignItems:"center", gap:18, padding:"14px 24px", cursor:"pointer" }}
            onMouseEnter={e=>e.currentTarget.style.background=T.bgHover}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}
          >
            {item.icon({ color:T.textSecondary, size:20 })}
            <div>
              <div style={{ fontSize:15, color:T.text, fontWeight:400 }}>{item.label}</div>
              <div style={{ fontSize:13, color:T.textMuted, marginTop:1 }}>{item.desc}</div>
            </div>
          </div>
        ))}
        <div style={{ padding:"14px 24px", cursor:"pointer", display:"flex", alignItems:"center", gap:18 }}
          onMouseEnter={e=>e.currentTarget.style.background=T.bgHover}
          onMouseLeave={e=>e.currentTarget.style.background="transparent"}
        >
          {I.logout({ color:T.red, size:20 })}
          <span style={{ fontSize:15, color:T.red }}>Abmelden</span>
        </div>
      </div>
    </div>
  );
};

// ─── Chat Conversation ──────────────────────────────────────────────────────
const ChatConversation = ({ chat, onBack, onCall, onVideoCall }) => {
  const [messages, setMessages] = useState(chat.msgs || []);
  const [input, setInput] = useState("");
  const ref = useRef(null);

  useEffect(() => { ref.current?.scrollIntoView({behavior:"smooth"}); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id:Date.now(), from:"me", text:input.trim(), time:new Date().toLocaleTimeString("de",{hour:"2-digit",minute:"2-digit"}) }]);
    setInput("");
  };

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", background:T.bgDeeper }}>
      {/* Header */}
      <div style={{ padding:"10px 16px", background:T.headerBg, display:"flex", alignItems:"center", gap:12, borderBottom:`1px solid ${T.border}`, borderLeft:`1px solid ${T.border}` }}>
        <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:4 }}>{I.back({color:T.textSecondary, size:20})}</button>
        <Avatar name={chat.name} size={38} online={chat.online} />
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:500, fontSize:15, color:T.text }}>{chat.name}</div>
          <div style={{ fontSize:12, color:chat.online?T.accent:T.textMuted }}>{chat.isGroup?`${chat.members?.length||0} Teilnehmer`:chat.online?"Online":"zuletzt heute online"}</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={onVideoCall} style={{ background:"none", border:"none", cursor:"pointer", padding:8, borderRadius:8, display:"flex" }}
            onMouseEnter={e=>e.currentTarget.style.background=T.bgHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            {I.video({color:T.textSecondary,size:20})}
          </button>
          <button onClick={onCall} style={{ background:"none", border:"none", cursor:"pointer", padding:8, borderRadius:8, display:"flex" }}
            onMouseEnter={e=>e.currentTarget.style.background=T.bgHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            {I.phone({color:T.textSecondary,size:20})}
          </button>
          <button style={{ background:"none", border:"none", cursor:"pointer", padding:8, borderRadius:8, display:"flex" }}
            onMouseEnter={e=>e.currentTarget.style.background=T.bgHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            {I.search({color:T.textSecondary,size:20})}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"16px 60px", backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2' fill='%23${T.bgPanel.slice(1)}' fill-opacity='0.3'/%3E%3C/svg%3E")` }}>
        {/* Date badge */}
        <div style={{ textAlign:"center", marginBottom:16 }}>
          <span style={{ background:T.bgPanel, color:T.textMuted, padding:"5px 12px", borderRadius:8, fontSize:12, boxShadow:"0 1px 2px rgba(0,0,0,0.2)" }}>Heute</span>
        </div>

        {/* Encryption notice */}
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <span style={{ background:"#182229", color:T.textMuted, padding:"6px 14px", borderRadius:8, fontSize:12, display:"inline-flex", alignItems:"center", gap:6 }}>
            {I.lock({color:T.textMuted, size:12})} Nachrichten sind Ende-zu-Ende-verschlüsselt
          </span>
        </div>

        {messages.map(m => (
          <div key={m.id} style={{ display:"flex", justifyContent:m.from==="me"?"flex-end":"flex-start", marginBottom:4 }}>
            <div style={{
              maxWidth:"65%", padding:"6px 8px 4px", borderRadius:8,
              borderTopLeftRadius: m.from==="me"?8:0,
              borderTopRightRadius: m.from==="me"?0:8,
              background: m.from==="me"?T.bgBubbleMe:T.bgBubbleThem,
              boxShadow:"0 1px 1px rgba(0,0,0,0.1)",
            }}>
              {chat.isGroup && m.from !== "me" && <div style={{ fontSize:12, fontWeight:600, color:T.accent, marginBottom:2 }}>{m.from}</div>}
              <div style={{ display:"inline" }}>
                <span style={{ fontSize:14, lineHeight:1.45, color:T.text, wordBreak:"break-word" }}>{m.text}</span>
                <span style={{ float:"right", fontSize:11, color:"rgba(255,255,255,0.45)", marginLeft:12, marginTop:4, display:"inline-flex", alignItems:"center", gap:3, whiteSpace:"nowrap" }}>
                  {m.time}
                  {m.from === "me" && I.checkCheck({size:14, color:T.blue})}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={ref} />
      </div>

      {/* Input Bar */}
      <div style={{ padding:"8px 16px", background:T.headerBg, display:"flex", alignItems:"center", gap:8, borderLeft:`1px solid ${T.border}` }}>
        <button style={{ background:"none", border:"none", cursor:"pointer", padding:6, display:"flex" }}>{I.plus({color:T.textSecondary, size:22})}</button>
        <div style={{ flex:1, display:"flex", alignItems:"center", background:T.bgInput, borderRadius:8, padding:"6px 12px", gap:8 }}>
          <button style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}>{I.smile({color:T.textSecondary,size:22})}</button>
          <input style={{ flex:1, background:"transparent", border:"none", outline:"none", color:T.text, fontSize:15, padding:"4px 0" }}
            placeholder="Nachricht eingeben" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} />
          <button style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}>{I.attach({color:T.textSecondary,size:20})}</button>
        </div>
        {input.trim() ? (
          <button onClick={send} style={{ background:"none", border:"none", cursor:"pointer", padding:6, display:"flex" }}>{I.send({color:T.textSecondary,size:22})}</button>
        ) : (
          <button style={{ background:"none", border:"none", cursor:"pointer", padding:6, display:"flex" }}>{I.mic({color:T.textSecondary,size:22})}</button>
        )}
      </div>
    </div>
  );
};

// ─── Call Screen ─────────────────────────────────────────────────────────────
const CallScreen = ({ contact, isVideo, onEnd }) => {
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(isVideo);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => { const t = setInterval(()=>setElapsed(s=>s+1),1000); return ()=>clearInterval(t); }, []);
  const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:T.bgDeeper, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      {isVideo && videoOn && (
        <div style={{ position:"absolute", top:16, right:16, width:120, height:170, borderRadius:12, background:T.bgPanel, border:`2px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
          <Avatar name="Du" size={40} color={T.accent} />
        </div>
      )}
      <div style={{ textAlign:"center" }}>
        <Avatar name={contact.name} size={120} />
        <h2 style={{ fontSize:24, fontWeight:400, color:T.text, marginTop:20, marginBottom:4 }}>{contact.name}</h2>
        <p style={{ color:T.accent, fontSize:14, margin:0 }}>{fmt(elapsed)}</p>
        <p style={{ color:T.textMuted, fontSize:13, marginTop:4 }}>
          {I.lock({color:T.textMuted, size:12, style:{display:"inline",verticalAlign:"middle"}})} Ende-zu-Ende-verschlüsselt
        </p>
      </div>
      <div style={{ position:"absolute", bottom:48, display:"flex", gap:20 }}>
        {[
          { icon:muted?I.micOff:I.mic, active:muted, onClick:()=>setMuted(!muted), label:"Mikrofon" },
          ...(isVideo?[{ icon:videoOn?I.video:I.videoOff, active:!videoOn, onClick:()=>setVideoOn(!videoOn), label:"Kamera" }]:[]),
          { icon:I.monitor, onClick:()=>{}, label:"Teilen" },
          { icon:I.phone, danger:true, onClick:onEnd, label:"Beenden" },
        ].map((b,i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
            <button onClick={b.onClick} style={{ width:52, height:52, borderRadius:"50%", background:b.danger?T.red:b.active?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.08)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {b.icon({color:"#fff", size:22})}
            </button>
            <span style={{ fontSize:11, color:T.textMuted }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("qr"); // qr, phone, register, app
  const [activeTab, setActiveTab] = useState("chats");
  const [selectedChat, setSelectedChat] = useState(null);
  const [callState, setCallState] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatFilter, setChatFilter] = useState("alle"); // alle, ungelesen, gruppen

  // Auth screens
  if (screen === "qr") return <LoginQR onPhoneLogin={()=>setScreen("phone")} />;
  if (screen === "phone") return <LoginPhone onQRLogin={()=>setScreen("qr")} onRegister={()=>setScreen("register")} onLogin={()=>setScreen("app")} />;
  if (screen === "register") return <RegisterScreen onBack={()=>setScreen("phone")} onComplete={()=>setScreen("app")} />;
  if (callState) return <CallScreen contact={callState.contact} isVideo={callState.isVideo} onEnd={()=>setCallState(null)} />;

  const filteredChats = chatData.filter(c => {
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (chatFilter === "ungelesen" && !c.unread) return false;
    if (chatFilter === "gruppen" && !c.isGroup) return false;
    return true;
  });

  // Sidebar icon button
  const SideBtn = ({ icon, tab, badge, onClick }) => {
    const isActive = !showSettings && activeTab === tab;
    return (
      <div style={{ position:"relative" }}>
        <button onClick={onClick || (()=>{setActiveTab(tab);setShowSettings(false);setSelectedChat(null)})}
          style={{ width:44, height:44, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", background:"transparent", border:"none" }}
          onMouseEnter={e=>e.currentTarget.style.background=T.bgHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          {icon({ color:isActive?T.accent:T.textSecondary, size:22 })}
        </button>
        {badge > 0 && <div style={{ position:"absolute", top:2, right:2, background:T.unreadBg, color:"#fff", fontSize:10, fontWeight:700, borderRadius:10, minWidth:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 4px" }}>{badge}</div>}
      </div>
    );
  };

  return (
    <div style={{ width:"100vw", height:"100vh", background:T.bg, color:T.text, fontFamily:"'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif", display:"flex", overflow:"hidden", fontSize:14 }}>
      {/* ── Left Sidebar ── */}
      <div style={{ width:56, background:T.headerBg, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", alignItems:"center", paddingTop:12, gap:2, flexShrink:0 }}>
        <SideBtn icon={I.chat} tab="chats" badge={chatData.reduce((a,c)=>a+c.unread,0)} />
        <SideBtn icon={I.phone} tab="calls" />
        <SideBtn icon={I.status} tab="status" />
        <SideBtn icon={I.channel} tab="channels" />
        <SideBtn icon={I.community} tab="communities" />
        <div style={{ flex:1 }} />
        <SideBtn icon={I.settings} tab="settings" onClick={()=>{setShowSettings(true);setSelectedChat(null)}} />
        <div style={{ marginBottom:12 }}>
          <Avatar name="Awi" size={32} color={T.accent} />
        </div>
      </div>

      {/* ── Panel ── */}
      <div style={{ width:340, background:T.headerBg, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", flexShrink:0, overflow:"hidden" }}>
        {showSettings ? (
          <SettingsPanel onClose={()=>setShowSettings(false)} />
        ) : (
          <>
            {/* Panel Header */}
            <div style={{ padding:"14px 16px 10px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <h2 style={{ fontSize:22, fontWeight:700, margin:0, color:T.text }}>
                  {activeTab==="chats"?"Chats":activeTab==="calls"?"Anrufe":activeTab==="status"?"Status":activeTab==="channels"?"Kanäle":"Communities"}
                </h2>
                <div style={{ display:"flex", gap:4 }}>
                  <button style={{ background:"none", border:"none", cursor:"pointer", padding:6, borderRadius:8, display:"flex" }}
                    onMouseEnter={e=>e.currentTarget.style.background=T.bgHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    {I.edit({color:T.textSecondary, size:20})}
                  </button>
                  <button style={{ background:"none", border:"none", cursor:"pointer", padding:6, borderRadius:8, display:"flex" }}
                    onMouseEnter={e=>e.currentTarget.style.background=T.bgHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    {I.moreV({color:T.textSecondary, size:20})}
                  </button>
                </div>
              </div>

              {/* Search */}
              <div style={{ display:"flex", alignItems:"center", background:T.bgInput, borderRadius:8, padding:"6px 12px", gap:10 }}>
                {I.search({color:T.textMuted, size:16})}
                <input style={{ flex:1, background:"transparent", border:"none", outline:"none", color:T.text, fontSize:13, padding:"2px 0" }}
                  placeholder="Suchen oder neuen Chat beginnen" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} />
              </div>

              {/* Filters (Chats tab) */}
              {activeTab === "chats" && (
                <div style={{ display:"flex", gap:8, marginTop:10 }}>
                  {[{key:"alle",label:"Alle"},{key:"ungelesen",label:"Ungelesen"},{key:"gruppen",label:"Gruppen"}].map(f => (
                    <button key={f.key} onClick={()=>setChatFilter(f.key)}
                      style={{ padding:"5px 14px", borderRadius:16, fontSize:13, fontWeight:500, cursor:"pointer", border:"none",
                        background:chatFilter===f.key?T.accent+"22":"transparent",
                        color:chatFilter===f.key?T.accent:T.textMuted,
                      }}
                      onMouseEnter={e=>{if(chatFilter!==f.key) e.currentTarget.style.background=T.bgHover}}
                      onMouseLeave={e=>{if(chatFilter!==f.key) e.currentTarget.style.background="transparent"}}
                    >{f.label}</button>
                  ))}
                </div>
              )}
            </div>

            {/* List Content */}
            <div style={{ flex:1, overflowY:"auto" }}>
              {/* Chats */}
              {activeTab === "chats" && (
                <>
                  {/* Archived row */}
                  <div style={{ display:"flex", alignItems:"center", gap:16, padding:"10px 20px", cursor:"pointer", borderBottom:`1px solid ${T.border}` }}
                    onMouseEnter={e=>e.currentTarget.style.background=T.bgHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    {I.archive({color:T.accent, size:18})}
                    <span style={{ fontSize:14, color:T.accent, fontWeight:500 }}>Archiviert</span>
                  </div>

                  {filteredChats.map(c => (
                    <div key={c.id} onClick={()=>setSelectedChat(c)}
                      style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", cursor:"pointer",
                        background:selectedChat?.id===c.id?T.bgHover:"transparent",
                      }}
                      onMouseEnter={e=>{if(selectedChat?.id!==c.id) e.currentTarget.style.background=T.bgHover}}
                      onMouseLeave={e=>{if(selectedChat?.id!==c.id) e.currentTarget.style.background="transparent"}}
                    >
                      <Avatar name={c.name} size={48} online={c.online} />
                      <div style={{ flex:1, minWidth:0, borderBottom:`1px solid ${T.border}`, paddingBottom:10 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                          <span style={{ fontWeight:c.unread?600:400, fontSize:15, color:T.text }}>{c.name}</span>
                          <span style={{ fontSize:12, color:c.unread?T.accent:T.textMuted, flexShrink:0 }}>{c.time}</span>
                        </div>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:2 }}>
                          <span style={{ fontSize:13, color:T.textMuted, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1, display:"flex", alignItems:"center", gap:4 }}>
                            {!c.isGroup && !c.unread && I.checkCheck({size:16, color:T.blue})}
                            {c.lastMsg}
                          </span>
                          <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
                            {c.pinned && <span style={{ fontSize:11, color:T.textMuted, transform:"rotate(45deg)", display:"inline-block" }}>📌</span>}
                            {c.unread > 0 && <div style={{ background:T.unreadBg, color:"#fff", fontSize:11, fontWeight:700, borderRadius:10, minWidth:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 5px" }}>{c.unread}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Calls */}
              {activeTab === "calls" && (
                <>
                  <div style={{ padding:"12px 20px", display:"flex", alignItems:"center", gap:14, cursor:"pointer", borderBottom:`1px solid ${T.border}` }}
                    onMouseEnter={e=>e.currentTarget.style.background=T.bgHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div style={{ width:42, height:42, borderRadius:"50%", background:T.accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {I.phone({color:"#fff", size:20})}
                    </div>
                    <span style={{ fontWeight:500, color:T.text }}>Neuer Anruf</span>
                  </div>
                  {callHistory.map(c => (
                    <div key={c.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", cursor:"pointer" }}
                      onMouseEnter={e=>e.currentTarget.style.background=T.bgHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <Avatar name={c.name} size={42} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:400, fontSize:15, color:c.missed?T.red:T.text }}>{c.name}</div>
                        <div style={{ fontSize:13, color:T.textMuted, display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
                          <span style={{ color:c.missed?T.red:c.type==="incoming"?T.accent:T.textMuted }}>
                            {c.type==="incoming"?"↙":"↗"}
                          </span>
                          {c.time}
                        </div>
                      </div>
                      {c.isVideo?I.video({color:T.accent,size:20}):I.phone({color:T.accent,size:20})}
                    </div>
                  ))}
                </>
              )}

              {/* Status */}
              {activeTab === "status" && (
                <div style={{ padding:20 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24 }}>
                    <div style={{ position:"relative" }}>
                      <Avatar name="Awi" size={52} color={T.accent} />
                      <div style={{ position:"absolute", bottom:0, right:0, width:22, height:22, borderRadius:"50%", background:T.accent, display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid ${T.headerBg}` }}>
                        {I.plus({color:"#fff", size:14})}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontWeight:500, color:T.text }}>Mein Status</div>
                      <div style={{ fontSize:13, color:T.textMuted }}>Tippe, um ein Statusupdate zu erstellen</div>
                    </div>
                  </div>
                  <div style={{ fontSize:13, color:T.textMuted, fontWeight:500, marginBottom:12, textTransform:"uppercase", letterSpacing:0.5 }}>Neueste Updates</div>
                  {["Sarah Müller","Max Weber","Lisa Chen"].map(name => (
                    <div key={name} style={{ display:"flex", alignItems:"center", gap:14, padding:"8px 0", cursor:"pointer" }}>
                      <div style={{ padding:2, borderRadius:"50%", border:`2px solid ${T.accent}` }}>
                        <Avatar name={name} size={42} />
                      </div>
                      <div>
                        <div style={{ fontWeight:400, fontSize:14, color:T.text }}>{name}</div>
                        <div style={{ fontSize:12, color:T.textMuted }}>Heute, {Math.floor(8+Math.random()*6)}:{String(Math.floor(Math.random()*60)).padStart(2,"0")}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Channels */}
              {activeTab === "channels" && (
                <div style={{ padding:20 }}>
                  <div style={{ textAlign:"center", padding:"40px 0" }}>
                    {I.channel({color:T.textMuted, size:48})}
                    <h3 style={{ color:T.text, fontWeight:400, marginTop:16 }}>Kanäle</h3>
                    <p style={{ color:T.textMuted, fontSize:13, maxWidth:250, margin:"8px auto 20px" }}>Folge Kanälen, um Updates und Neuigkeiten zu erhalten.</p>
                    <button style={{ padding:"8px 20px", borderRadius:20, background:T.accent, border:"none", color:"#fff", fontSize:14, cursor:"pointer" }}>Kanäle entdecken</button>
                  </div>
                </div>
              )}

              {/* Communities */}
              {activeTab === "communities" && (
                <div style={{ padding:20 }}>
                  <div style={{ textAlign:"center", padding:"40px 0" }}>
                    {I.community({color:T.textMuted, size:48})}
                    <h3 style={{ color:T.text, fontWeight:400, marginTop:16 }}>Communities</h3>
                    <p style={{ color:T.textMuted, fontSize:13, maxWidth:260, margin:"8px auto 20px" }}>Kommuniziere einfach mit Mitgliedern aus Gruppen, die zusammengehören.</p>
                    <button style={{ padding:"8px 20px", borderRadius:20, background:T.accent, border:"none", color:"#fff", fontSize:14, cursor:"pointer" }}>Community starten</button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── Main Content Area ── */}
      {selectedChat ? (
        <ChatConversation
          key={selectedChat.id}
          chat={selectedChat}
          onBack={()=>setSelectedChat(null)}
          onCall={()=>setCallState({contact:selectedChat,isVideo:false})}
          onVideoCall={()=>setCallState({contact:selectedChat,isVideo:true})}
        />
      ) : (
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:T.bgDeeper, borderLeft:`1px solid ${T.border}` }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ width:280, height:220, margin:"0 auto 32px", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ position:"relative" }}>
                <div style={{ width:100, height:100, borderRadius:24, background:`linear-gradient(135deg, ${T.accent}33, ${T.accent}11)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:48, fontWeight:800, color:T.accent }}>A</span>
                </div>
              </div>
            </div>
            <h2 style={{ fontSize:28, fontWeight:300, color:T.text, margin:"0 0 12px" }}>Awi für Desktop</h2>
            <p style={{ color:T.textMuted, fontSize:14, maxWidth:400, margin:"0 auto 20px", lineHeight:1.6 }}>
              Sende und empfange Nachrichten ohne dein Telefon online halten zu müssen.<br/>
              Nutze Awi auf bis zu 4 verknüpften Geräten und 1 Telefon gleichzeitig.
            </p>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, color:T.textMuted, fontSize:13 }}>
              {I.lock({color:T.textMuted, size:14})}
              <span>Ende-zu-Ende-verschlüsselt</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
