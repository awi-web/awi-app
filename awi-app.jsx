import { useState, useEffect, useRef } from "react";

/*
 * AWI - WhatsApp-Style Communication App
 * Complete rebuild with all working buttons and navigation
 */

// ── Colors ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#111b21",
  deeper: "#0b141a",
  panel: "#202c33",
  hover: "#2a3942",
  input: "#2a3942",
  green: "#00a884",
  greenDk: "#008069",
  greenLt: "#25d366",
  bubbleMe: "#005c4b",
  bubbleThem: "#202c33",
  txt: "#e9edef",
  txt2: "#8696a0",
  txt3: "#667781",
  border: "#2a3942",
  red: "#ea0038",
  blue: "#53bdeb",
};

// ── Simple SVG Icon helper ──────────────────────────────────────────────────
function SvgIcon({ paths, size, color, style: st }) {
  return (
    <svg width={size || 20} height={size || 20} viewBox="0 0 24 24" fill="none"
      stroke={color || C.txt2} strokeWidth="1.8" strokeLinecap="round"
      strokeLinejoin="round" style={st || {}}>
      {paths}
    </svg>
  );
}

// ── All Icons as plain functions ────────────────────────────────────────────
function ChatIcon(props) {
  return <SvgIcon {...props} paths={<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>} />;
}
function PhoneIcon(props) {
  return <SvgIcon {...props} paths={<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>} />;
}
function StatusIcon(props) {
  return <SvgIcon {...props} paths={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>} />;
}
function UsersIcon(props) {
  return <SvgIcon {...props} paths={<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>} />;
}
function ChannelIcon(props) {
  return <SvgIcon {...props} paths={<><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></>} />;
}
function SearchIcon(props) {
  return <SvgIcon {...props} paths={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} />;
}
function SendIcon(props) {
  return <SvgIcon {...props} paths={<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>} />;
}
function MicIcon(props) {
  return <SvgIcon {...props} paths={<><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>} />;
}
function MicOffIcon(props) {
  return <SvgIcon {...props} paths={<><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"/><path d="M17 16.95A7 7 0 015 12v-2m14 0v2c0 .76-.13 1.49-.35 2.17"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>} />;
}
function VideoIcon(props) {
  return <SvgIcon {...props} paths={<><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>} />;
}
function VideoOffIcon(props) {
  return <SvgIcon {...props} paths={<><path d="M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2m5.66 0H14a2 2 0 012 2v3.34l1 1L23 7v10"/><line x1="1" y1="1" x2="23" y2="23"/></>} />;
}
function BackIcon(props) {
  return <SvgIcon {...props} paths={<><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>} />;
}
function PlusIcon(props) {
  return <SvgIcon {...props} paths={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} />;
}
function CheckIcon(props) {
  return <SvgIcon {...props} paths={<><path d="M18 6L7 17l-5-5"/><path d="M22 10l-9.17 9L10 16.17"/></>} />;
}
function LockIcon(props) {
  return <SvgIcon {...props} paths={<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>} />;
}
function SettingsIcon(props) {
  return <SvgIcon {...props} paths={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>} />;
}
function UserIcon(props) {
  return <SvgIcon {...props} paths={<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>} />;
}
function MonitorIcon(props) {
  return <SvgIcon {...props} paths={<><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>} />;
}
function BellIcon(props) {
  return <SvgIcon {...props} paths={<><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>} />;
}
function KeyIcon(props) {
  return <SvgIcon {...props} paths={<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>} />;
}
function HelpIcon(props) {
  return <SvgIcon {...props} paths={<><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>} />;
}
function KeyboardIcon(props) {
  return <SvgIcon {...props} paths={<><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="6" y1="8" x2="6.01" y2="8"/><line x1="10" y1="8" x2="10.01" y2="8"/><line x1="14" y1="8" x2="14.01" y2="8"/><line x1="18" y1="8" x2="18.01" y2="8"/><line x1="8" y1="16" x2="16" y2="16"/></>} />;
}
function LogoutIcon(props) {
  return <SvgIcon {...props} paths={<><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>} />;
}
function AttachIcon(props) {
  return <SvgIcon {...props} paths={<path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>} />;
}
function SmileIcon(props) {
  return <SvgIcon {...props} paths={<><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>} />;
}
function ArchiveIcon(props) {
  return <SvgIcon {...props} paths={<><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></>} />;
}
function EditIcon(props) {
  return <SvgIcon {...props} paths={<><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>} />;
}
function DotsIcon(props) {
  return <SvgIcon {...props} paths={<><circle cx="12" cy="5" r="1" fill={props.color || C.txt2} stroke="none"/><circle cx="12" cy="12" r="1" fill={props.color || C.txt2} stroke="none"/><circle cx="12" cy="19" r="1" fill={props.color || C.txt2} stroke="none"/></>} />;
}
function ChevronIcon(props) {
  return <SvgIcon {...props} paths={<polyline points="6 9 12 15 18 9"/>} />;
}
function ImageIcon(props) {
  return <SvgIcon {...props} paths={<><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>} />;
}

// ── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ name, size, online, color }) {
  var s = size || 40;
  var colors = ["#00a884","#8b5cf6","#ec4899","#f59e0b","#06b6d4","#ef4444","#6366f1"];
  var bg = color || colors[name.charCodeAt(0) % colors.length];
  var init = name.split(" ").map(function(w){ return w[0]; }).join("").slice(0,2).toUpperCase();
  return (
    <div style={{ position:"relative", width:s, height:s, flexShrink:0 }}>
      <div style={{ width:s, height:s, borderRadius:"50%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:s*0.36, fontWeight:600, color:"#fff" }}>{init}</div>
      {online !== undefined && (
        <div style={{ position:"absolute", bottom:0, right:0, width:s*0.28, height:s*0.28, borderRadius:"50%", background:online ? C.green : C.txt3, border:"2px solid " + C.panel }} />
      )}
    </div>
  );
}

// ── Sample Data ─────────────────────────────────────────────────────────────
var chats = [
  { id:1, name:"Sarah Müller", online:true, unread:3, pinned:true, last:"Können wir den Call auf 15 Uhr verschieben?", time:"14:32", msgs:[
    {id:1,from:"them",text:"Hey! Hast du den Report fertig?",time:"13:10"},
    {id:2,from:"me",text:"Fast – schicke ihn in 10 Minuten.",time:"13:12"},
    {id:3,from:"them",text:"Super, danke! 👍",time:"13:13"},
    {id:4,from:"them",text:"Können wir den Call auf 15 Uhr verschieben?",time:"14:32"},
  ]},
  { id:2, name:"Team Backend", group:true, unread:12, pinned:true, last:"Jonas: PR ist ready for review", time:"14:28", members:5, msgs:[
    {id:1,from:"Jonas",text:"PR ist ready for review",time:"14:25"},
    {id:2,from:"Mira",text:"Schaue ich mir gleich an 👀",time:"14:28"},
  ]},
  { id:3, name:"Max Weber", online:true, unread:0, last:"Build ist durch ✅", time:"14:15", msgs:[
    {id:1,from:"them",text:"Deployment läuft.",time:"13:50"},
    {id:2,from:"them",text:"Build ist durch ✅",time:"14:15"},
  ]},
  { id:4, name:"Lisa Chen", online:false, unread:1, last:"Hier sind die neuen Wireframes", time:"13:45", msgs:[
    {id:1,from:"them",text:"Hier sind die neuen Wireframes",time:"13:45"},
  ]},
  { id:5, name:"Tom Richter", online:true, unread:0, last:"Server Monitoring sieht gut aus", time:"12:30", msgs:[
    {id:1,from:"me",text:"Wie sieht das Monitoring aus?",time:"12:20"},
    {id:2,from:"them",text:"Server Monitoring sieht gut aus",time:"12:30"},
  ]},
  { id:6, name:"Anna Schmidt", online:false, unread:0, last:"Sprint Review morgen um 10", time:"11:20", msgs:[
    {id:1,from:"them",text:"Sprint Review morgen um 10",time:"11:20"},
  ]},
  { id:7, name:"Mira Kovac", online:true, unread:0, last:"Danke für das Feedback!", time:"Gestern", msgs:[
    {id:1,from:"them",text:"Danke für das Feedback!",time:"Gestern"},
  ]},
];

var calls = [
  { id:1, name:"Sarah Müller", dir:"in", video:true, time:"Heute, 14:00", missed:false },
  { id:2, name:"Max Weber", dir:"out", video:false, time:"Heute, 11:30", missed:false },
  { id:3, name:"Lisa Chen", dir:"in", video:false, time:"Gestern, 16:45", missed:true },
  { id:4, name:"Team Backend", dir:"out", video:true, time:"Gestern, 10:00", missed:false },
  { id:5, name:"Tom Richter", dir:"in", video:false, time:"01.04.2026", missed:false },
];

// ════════════════════════════════════════════════════════════════════════════
// SCREENS
// ════════════════════════════════════════════════════════════════════════════

// ── QR Login ────────────────────────────────────────────────────────────────
function ScreenQR({ goPhone }) {
  // Generate QR pattern
  var qrCells = [];
  for (var r = 0; r < 21; r++) {
    for (var c2 = 0; c2 < 21; c2++) {
      var isFinder = (r<7&&c2<7)||(r<7&&c2>13)||(r>13&&c2<7);
      if (isFinder || ((r+c2)%3===0) || ((r*c2)%7===0 && Math.sin(r*c2)>0)) {
        qrCells.push(<rect key={r+"-"+c2} x={c2*9+4} y={r*9+4} width={8} height={8} rx={1} fill="#e9edef"/>);
      }
    }
  }

  return (
    <div style={{ width:"100vw", height:"100vh", background:C.bg, display:"flex", flexDirection:"column" }}>
      <div style={{ background:C.greenDk, height:220 }}/>
      <div style={{ flex:1, display:"flex", justifyContent:"center", marginTop:-120 }}>
        <div style={{ background:C.panel, borderRadius:4, padding:"48px 56px", maxWidth:780, width:"100%", boxShadow:"0 18px 50px rgba(0,0,0,0.4)" }}>
          <h1 style={{ fontSize:28, fontWeight:300, color:C.txt, margin:"0 0 28px" }}>Bei Awi anmelden</h1>
          <div style={{ display:"flex", gap:40 }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
                <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div style={{ width:26, height:26, borderRadius:"50%", border:"1.5px solid "+C.green, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:C.green, flexShrink:0 }}>1</div>
                  <p style={{ margin:0, color:C.txt2, fontSize:15, lineHeight:1.6 }}>Scanne den QR-Code mit der Kamera deines Telefons.</p>
                </div>
                <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div style={{ width:26, height:26, borderRadius:"50%", border:"1.5px solid "+C.green, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:C.green, flexShrink:0 }}>2</div>
                  <p style={{ margin:0, color:C.txt2, fontSize:15, lineHeight:1.6 }}>Tippe auf den Link, um <strong style={{color:C.green}}>Awi</strong> zu öffnen.</p>
                </div>
                <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div style={{ width:26, height:26, borderRadius:"50%", border:"1.5px solid "+C.green, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:C.green, flexShrink:0 }}>3</div>
                  <p style={{ margin:0, color:C.txt2, fontSize:15, lineHeight:1.6 }}>Scanne den QR-Code noch einmal, um dein Konto zu verknüpfen.</p>
                </div>
              </div>
              <div style={{ marginTop:28 }}>
                <span style={{ color:C.green, fontSize:14, cursor:"pointer" }}>Brauchst du Hilfe? ↗</span>
              </div>
            </div>
            <div style={{ position:"relative" }}>
              <svg width={197} height={197} viewBox="0 0 197 197" style={{ borderRadius:8 }}>
                <rect width={197} height={197} fill="#111b21" rx={8}/>
                {qrCells}
              </svg>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:44, height:44, borderRadius:10, background:C.green, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:20, fontWeight:800, color:"#fff" }}>A</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop:32, display:"flex", justifyContent:"flex-end" }}>
            <button onClick={goPhone} style={{ background:"none", border:"none", color:C.green, fontSize:14, cursor:"pointer", fontWeight:500 }}>
              Mit Telefonnummer anmelden →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Phone Login ─────────────────────────────────────────────────────────────
function ScreenPhone({ goQR, goRegister, goApp }) {
  var inputS = { background:C.bg, border:"1px solid "+C.border, borderRadius:8, padding:"12px 16px", color:C.txt, fontSize:16, outline:"none", width:"100%", boxSizing:"border-box" };

  return (
    <div style={{ width:"100vw", height:"100vh", background:C.bg, display:"flex", flexDirection:"column" }}>
      <div style={{ background:C.greenDk, height:220 }}/>
      <div style={{ flex:1, display:"flex", justifyContent:"center", marginTop:-120 }}>
        <div style={{ background:C.panel, borderRadius:4, padding:"48px 56px", maxWidth:460, width:"100%", boxShadow:"0 18px 50px rgba(0,0,0,0.4)", textAlign:"center" }}>
          <button onClick={goQR} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:4, marginBottom:16 }}>
            <BackIcon color={C.txt2} size={20}/>
          </button>
          <h1 style={{ fontSize:24, fontWeight:300, color:C.txt, margin:"0 0 28px" }}>Gib eine Telefonnummer ein</h1>
          <div style={{ maxWidth:280, margin:"0 auto", display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, background:C.bg, borderRadius:8, padding:"12px 16px", border:"1px solid "+C.border }}>
              <span style={{ fontSize:18 }}>🇩🇪</span>
              <span style={{ color:C.txt, fontSize:15, flex:1, textAlign:"left" }}>Deutschland</span>
              <ChevronIcon color={C.txt2} size={16}/>
            </div>
            <input style={{...inputS, textAlign:"center", letterSpacing:1}} placeholder="+49"/>
          </div>
          <button onClick={goApp} style={{ marginTop:24, padding:"10px 32px", borderRadius:24, background:C.green, border:"none", color:"#fff", fontSize:14, fontWeight:500, cursor:"pointer" }}>
            Weiter
          </button>
          <div style={{ marginTop:16 }}>
            <button onClick={goQR} style={{ background:"none", border:"none", color:C.green, fontSize:14, cursor:"pointer" }}>
              Mit QR-Code anmelden →
            </button>
          </div>
          <div style={{ marginTop:20, borderTop:"1px solid "+C.border, paddingTop:18 }}>
            <span style={{ color:C.txt3, fontSize:13 }}>Noch kein Konto? </span>
            <button onClick={goRegister} style={{ background:"none", border:"none", color:C.green, fontSize:13, cursor:"pointer", fontWeight:600 }}>Registrieren</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Register ────────────────────────────────────────────────────────────────
function ScreenRegister({ goBack, goApp }) {
  var ref0 = useState(1);
  var step = ref0[0];
  var setStep = ref0[1];

  var ref1 = useState("");
  var name = ref1[0];
  var setName = ref1[1];

  var ref2 = useState("");
  var phone = ref2[0];
  var setPhone = ref2[1];

  var ref3 = useState("");
  var email = ref3[0];
  var setEmail = ref3[1];

  var ref4 = useState("");
  var pw = ref4[0];
  var setPw = ref4[1];

  var inputS = { background:C.bg, border:"1px solid "+C.border, borderRadius:8, padding:"12px 16px", color:C.txt, fontSize:15, outline:"none", width:"100%", boxSizing:"border-box" };
  var btnActive = { padding:"10px 32px", borderRadius:24, background:C.green, border:"none", color:"#fff", fontSize:14, fontWeight:500, cursor:"pointer", marginTop:8 };
  var btnDisabled = { padding:"10px 32px", borderRadius:24, background:C.hover, border:"none", color:C.txt3, fontSize:14, fontWeight:500, cursor:"default", marginTop:8 };

  function handleBack() {
    if (step > 1) { setStep(step - 1); }
    else { goBack(); }
  }

  return (
    <div style={{ width:"100vw", height:"100vh", background:C.bg, display:"flex", flexDirection:"column" }}>
      <div style={{ background:C.greenDk, height:220 }}/>
      <div style={{ flex:1, display:"flex", justifyContent:"center", marginTop:-120 }}>
        <div style={{ background:C.panel, borderRadius:4, padding:"48px 56px", maxWidth:460, width:"100%", boxShadow:"0 18px 50px rgba(0,0,0,0.4)", textAlign:"center" }}>
          <button onClick={handleBack} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:4, marginBottom:12 }}>
            <BackIcon color={C.txt2} size={20}/>
          </button>

          {step === 1 ? (
            <div>
              <div style={{ width:72, height:72, borderRadius:"50%", background:C.hover, margin:"0 auto 16px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <UserIcon color={C.txt2} size={32}/>
              </div>
              <h2 style={{ fontSize:22, fontWeight:300, color:C.txt, margin:"0 0 6px" }}>Profil erstellen</h2>
              <p style={{ color:C.txt3, fontSize:14, margin:"0 0 24px" }}>Gib deinen Namen ein</p>
              <div style={{ maxWidth:280, margin:"0 auto" }}>
                <input style={inputS} placeholder="Dein Name" value={name} onChange={function(e){setName(e.target.value)}}/>
                <button onClick={function(){if(name.trim()) setStep(2)}} style={name.trim() ? btnActive : btnDisabled}>Weiter</button>
              </div>
            </div>
          ) : step === 2 ? (
            <div>
              <PhoneIcon color={C.green} size={44}/>
              <h2 style={{ fontSize:22, fontWeight:300, color:C.txt, margin:"14px 0 6px" }}>Telefonnummer</h2>
              <p style={{ color:C.txt3, fontSize:14, margin:"0 0 24px" }}>Verifiziere deine Nummer</p>
              <div style={{ maxWidth:280, margin:"0 auto", display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, background:C.bg, borderRadius:8, padding:"12px 16px", border:"1px solid "+C.border }}>
                  <span style={{ fontSize:18 }}>🇩🇪</span>
                  <span style={{ color:C.txt, fontSize:14, flex:1, textAlign:"left" }}>Deutschland</span>
                </div>
                <input style={{...inputS, textAlign:"center", letterSpacing:1}} placeholder="+49 123 456 7890" value={phone} onChange={function(e){setPhone(e.target.value)}}/>
                <button onClick={function(){if(phone.trim()) setStep(3)}} style={phone.trim() ? btnActive : btnDisabled}>Code senden</button>
              </div>
            </div>
          ) : step === 3 ? (
            <div>
              <LockIcon color={C.green} size={44}/>
              <h2 style={{ fontSize:22, fontWeight:300, color:C.txt, margin:"14px 0 6px" }}>Verifizierung</h2>
              <p style={{ color:C.txt3, fontSize:14, margin:"0 0 24px" }}>Code wurde gesendet an {phone || "+49..."}</p>
              <div style={{ maxWidth:280, margin:"0 auto" }}>
                <input style={{...inputS, textAlign:"center", letterSpacing:8, fontSize:24}} placeholder="------" maxLength={6}/>
                <button onClick={function(){setStep(4)}} style={btnActive}>Verifizieren</button>
                <div style={{ marginTop:12 }}>
                  <button style={{ background:"none", border:"none", color:C.green, fontSize:13, cursor:"pointer" }}>Code erneut senden</button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <KeyIcon color={C.green} size={44}/>
              <h2 style={{ fontSize:22, fontWeight:300, color:C.txt, margin:"14px 0 6px" }}>Konto sichern</h2>
              <p style={{ color:C.txt3, fontSize:14, margin:"0 0 24px" }}>E-Mail und Passwort festlegen</p>
              <div style={{ maxWidth:280, margin:"0 auto", display:"flex", flexDirection:"column", gap:12 }}>
                <input style={inputS} type="email" placeholder="E-Mail-Adresse" value={email} onChange={function(e){setEmail(e.target.value)}}/>
                <input style={inputS} type="password" placeholder="Passwort erstellen" value={pw} onChange={function(e){setPw(e.target.value)}}/>
                <input style={inputS} type="password" placeholder="Passwort bestätigen"/>
                <button onClick={goApp} style={btnActive}>Registrierung abschließen</button>
              </div>
            </div>
          )}

          {/* Step dots */}
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:24 }}>
            {[1,2,3,4].map(function(s) {
              return <div key={s} style={{ width: s===step ? 24 : 8, height:8, borderRadius:4, background: s<=step ? C.green : C.hover, transition:"all 0.3s" }}/>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Settings Panel ──────────────────────────────────────────────────────────
function SettingsPanel({ onClose, onLogout }) {
  var ref0 = useState(null);
  var sub = ref0[0];
  var setSub = ref0[1];

  var items = [
    { icon: MonitorIcon, label:"Allgemein", desc:"Starten und schließen" },
    { icon: UserIcon, label:"Profil", desc:"Name, Profilbild, Benutzername" },
    { icon: KeyIcon, label:"Konto", desc:"Sicherheitsbenachrichtigungen, Kontoinformationen" },
    { icon: LockIcon, label:"Datenschutz", desc:"Blockierte Kontakte, selbstlöschende Nachrichten" },
    { icon: ChatIcon, label:"Chats", desc:"Design, Hintergrund, Chat-Einstellungen" },
    { icon: VideoIcon, label:"Video und Sprache", desc:"Kamera, Mikrofon und Lautsprecher" },
    { icon: BellIcon, label:"Benachrichtigungen", desc:"Benachrichtigungen zu Nachrichten" },
    { icon: KeyboardIcon, label:"Tastaturkürzel", desc:"Schnellmaßnahmen" },
    { icon: HelpIcon, label:"Hilfe und Feedback", desc:"Hilfebereich, Kontakt, Datenschutzrichtlinie" },
  ];

  if (sub) {
    return (
      <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"14px 16px", display:"flex", alignItems:"center", gap:14, borderBottom:"1px solid "+C.border }}>
          <button onClick={function(){setSub(null)}} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:4 }}>
            <BackIcon color={C.txt2} size={20}/>
          </button>
          <span style={{ fontSize:16, fontWeight:500, color:C.txt }}>{sub}</span>
        </div>
        <div style={{ flex:1, padding:20, overflowY:"auto" }}>
          {sub === "Profil" ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
              <Avatar name="Awi" size={80} color={C.green}/>
              <div style={{ fontSize:18, fontWeight:600, color:C.txt }}>Awi</div>
              <div style={{ fontSize:14, color:C.txt2 }}>Hey, ich benutze Awi!</div>
              <div style={{ width:"100%", marginTop:8 }}>
                {[["Name","Awi"],["Info","Hey, ich benutze Awi!"],["Telefon","+49 123 456 7890"],["E-Mail","awi@unternehmen.de"]].map(function(item){
                  return (
                    <div key={item[0]} style={{ background:C.bg, borderRadius:8, padding:14, marginBottom:10 }}>
                      <div style={{ fontSize:12, color:C.green, fontWeight:500, marginBottom:4 }}>{item[0]}</div>
                      <div style={{ color:C.txt, fontSize:15 }}>{item[1]}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : sub === "Datenschutz" ? (
            <div>
              {["Zuletzt online & Online","Profilbild","Info","Gruppen","Lesebestätigungen"].map(function(item){
                return (
                  <div key={item} style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid "+C.border }}>
                    <span style={{ color:C.txt, fontSize:14 }}>{item}</span>
                    <span style={{ color:C.txt3, fontSize:13 }}>Alle</span>
                  </div>
                );
              })}
              <div style={{ marginTop:20 }}>
                <div style={{ fontWeight:600, color:C.txt, fontSize:14, marginBottom:8 }}>Blockierte Kontakte</div>
                <p style={{ color:C.txt3, fontSize:13, margin:0 }}>Keine blockierten Kontakte</p>
              </div>
            </div>
          ) : (
            <p style={{ color:C.txt3, fontSize:14 }}>Einstellungen für „{sub}" werden hier angezeigt.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"14px 16px", display:"flex", alignItems:"center", gap:14, borderBottom:"1px solid "+C.border }}>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:4 }}>
          <BackIcon color={C.txt2} size={20}/>
        </button>
        <span style={{ fontSize:16, fontWeight:500, color:C.txt }}>Einstellungen</span>
      </div>
      <div onClick={function(){setSub("Profil")}} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", cursor:"pointer", borderBottom:"1px solid "+C.border }}>
        <Avatar name="Awi" size={50} color={C.green}/>
        <div>
          <div style={{ fontWeight:500, fontSize:16, color:C.txt }}>Awi</div>
          <div style={{ fontSize:13, color:C.txt3, marginTop:2 }}>Hey, ich benutze Awi!</div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto" }}>
        {items.map(function(item, idx){
          var IconComp = item.icon;
          return (
            <div key={idx} onClick={function(){setSub(item.label)}} style={{ display:"flex", alignItems:"center", gap:18, padding:"13px 22px", cursor:"pointer" }}
              onMouseEnter={function(e){e.currentTarget.style.background=C.hover}}
              onMouseLeave={function(e){e.currentTarget.style.background="transparent"}}>
              <IconComp color={C.txt2} size={20}/>
              <div>
                <div style={{ fontSize:15, color:C.txt }}>{item.label}</div>
                <div style={{ fontSize:13, color:C.txt3, marginTop:1 }}>{item.desc}</div>
              </div>
            </div>
          );
        })}
        <div onClick={onLogout} style={{ display:"flex", alignItems:"center", gap:18, padding:"13px 22px", cursor:"pointer" }}
          onMouseEnter={function(e){e.currentTarget.style.background=C.hover}}
          onMouseLeave={function(e){e.currentTarget.style.background="transparent"}}>
          <LogoutIcon color={C.red} size={20}/>
          <span style={{ fontSize:15, color:C.red }}>Abmelden</span>
        </div>
      </div>
    </div>
  );
}

// ── Chat Conversation ───────────────────────────────────────────────────────
function Conversation({ chat, onBack, onCall, onVideoCall }) {
  var ref0 = useState(chat.msgs.slice());
  var msgs = ref0[0];
  var setMsgs = ref0[1];

  var ref1 = useState("");
  var input = ref1[0];
  var setInput = ref1[1];

  var bottomRef = useRef(null);

  useEffect(function(){ if(bottomRef.current) bottomRef.current.scrollIntoView({behavior:"smooth"}); }, [msgs]);

  function send() {
    if (!input.trim()) return;
    var now = new Date();
    var t = (now.getHours()<10?"0":"") + now.getHours() + ":" + (now.getMinutes()<10?"0":"") + now.getMinutes();
    setMsgs(msgs.concat([{ id:Date.now(), from:"me", text:input.trim(), time:t }]));
    setInput("");
  }

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", background:C.deeper }}>
      {/* Header */}
      <div style={{ padding:"10px 16px", background:C.panel, display:"flex", alignItems:"center", gap:12, borderBottom:"1px solid "+C.border, borderLeft:"1px solid "+C.border }}>
        <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:4 }}>
          <BackIcon color={C.txt2} size={20}/>
        </button>
        <Avatar name={chat.name} size={38} online={chat.online}/>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:500, fontSize:15, color:C.txt }}>{chat.name}</div>
          <div style={{ fontSize:12, color: chat.online ? C.green : C.txt3 }}>
            {chat.group ? (chat.members||0)+" Teilnehmer" : chat.online ? "Online" : "zuletzt online"}
          </div>
        </div>
        <button onClick={onVideoCall} style={{ background:"none", border:"none", cursor:"pointer", padding:8, display:"flex", borderRadius:8 }}>
          <VideoIcon color={C.txt2} size={20}/>
        </button>
        <button onClick={onCall} style={{ background:"none", border:"none", cursor:"pointer", padding:8, display:"flex", borderRadius:8 }}>
          <PhoneIcon color={C.txt2} size={20}/>
        </button>
        <button style={{ background:"none", border:"none", cursor:"pointer", padding:8, display:"flex", borderRadius:8 }}>
          <SearchIcon color={C.txt2} size={20}/>
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"14px 60px" }}>
        <div style={{ textAlign:"center", marginBottom:14 }}>
          <span style={{ background:C.panel, color:C.txt3, padding:"4px 12px", borderRadius:8, fontSize:12 }}>Heute</span>
        </div>
        <div style={{ textAlign:"center", marginBottom:16 }}>
          <span style={{ background:"#182229", color:C.txt3, padding:"5px 12px", borderRadius:8, fontSize:12, display:"inline-flex", alignItems:"center", gap:5 }}>
            <LockIcon color={C.txt3} size={11}/> Nachrichten sind Ende-zu-Ende-verschlüsselt
          </span>
        </div>
        {msgs.map(function(m){
          var isMe = m.from === "me";
          return (
            <div key={m.id} style={{ display:"flex", justifyContent: isMe ? "flex-end" : "flex-start", marginBottom:3 }}>
              <div style={{ maxWidth:"65%", padding:"6px 8px 4px", borderRadius:8, borderTopLeftRadius: isMe?8:0, borderTopRightRadius: isMe?0:8, background: isMe ? C.bubbleMe : C.bubbleThem, boxShadow:"0 1px 1px rgba(0,0,0,0.08)" }}>
                {chat.group && !isMe && <div style={{ fontSize:12, fontWeight:600, color:C.green, marginBottom:2 }}>{m.from}</div>}
                <span style={{ fontSize:14, lineHeight:"1.45", color:C.txt }}>{m.text}</span>
                <span style={{ float:"right", fontSize:11, color:"rgba(255,255,255,0.45)", marginLeft:12, marginTop:4, display:"inline-flex", alignItems:"center", gap:3 }}>
                  {m.time}
                  {isMe && <CheckIcon size={14} color={C.blue}/>}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div style={{ padding:"8px 16px", background:C.panel, display:"flex", alignItems:"center", gap:8, borderLeft:"1px solid "+C.border }}>
        <button style={{ background:"none", border:"none", cursor:"pointer", padding:6, display:"flex" }}>
          <PlusIcon color={C.txt2} size={22}/>
        </button>
        <div style={{ flex:1, display:"flex", alignItems:"center", background:C.input, borderRadius:8, padding:"6px 12px", gap:8 }}>
          <button style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}>
            <SmileIcon color={C.txt2} size={22}/>
          </button>
          <input style={{ flex:1, background:"transparent", border:"none", outline:"none", color:C.txt, fontSize:15, padding:"4px 0" }}
            placeholder="Nachricht eingeben"
            value={input}
            onChange={function(e){setInput(e.target.value)}}
            onKeyDown={function(e){if(e.key==="Enter") send()}}
          />
          <button style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}>
            <AttachIcon color={C.txt2} size={20}/>
          </button>
        </div>
        {input.trim() ? (
          <button onClick={send} style={{ background:"none", border:"none", cursor:"pointer", padding:6, display:"flex" }}>
            <SendIcon color={C.txt2} size={22}/>
          </button>
        ) : (
          <button style={{ background:"none", border:"none", cursor:"pointer", padding:6, display:"flex" }}>
            <MicIcon color={C.txt2} size={22}/>
          </button>
        )}
      </div>
    </div>
  );
}

// ── Call Screen ─────────────────────────────────────────────────────────────
function CallScreen({ contact, isVideo, onEnd }) {
  var ref0 = useState(false);
  var muted = ref0[0];
  var setMuted = ref0[1];

  var ref1 = useState(isVideo);
  var vidOn = ref1[0];
  var setVidOn = ref1[1];

  var ref2 = useState(0);
  var elapsed = ref2[0];
  var setElapsed = ref2[1];

  useEffect(function(){
    var t = setInterval(function(){ setElapsed(function(s){ return s+1; }); }, 1000);
    return function(){ clearInterval(t); };
  }, []);

  var mm = Math.floor(elapsed/60);
  var ss = elapsed%60;
  var timeStr = (mm<10?"0":"")+mm+":"+(ss<10?"0":"")+ss;

  function CallBtn({ children, danger, active, onClick, label }) {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
        <button onClick={onClick} style={{ width:52, height:52, borderRadius:"50%", background: danger ? C.red : active ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {children}
        </button>
        <span style={{ fontSize:11, color:C.txt3 }}>{label}</span>
      </div>
    );
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:C.deeper, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      {isVideo && vidOn && (
        <div style={{ position:"absolute", top:16, right:16, width:120, height:170, borderRadius:12, background:C.panel, border:"2px solid "+C.border, display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
          <Avatar name="Du" size={40} color={C.green}/>
        </div>
      )}
      <Avatar name={contact.name} size={120}/>
      <h2 style={{ fontSize:24, fontWeight:400, color:C.txt, marginTop:20, marginBottom:4 }}>{contact.name}</h2>
      <p style={{ color:C.green, fontSize:14, margin:0 }}>{timeStr}</p>
      <p style={{ color:C.txt3, fontSize:13, marginTop:4, display:"flex", alignItems:"center", gap:4 }}>
        <LockIcon color={C.txt3} size={12}/> Ende-zu-Ende-verschlüsselt
      </p>
      <div style={{ position:"absolute", bottom:48, display:"flex", gap:20 }}>
        <CallBtn active={muted} onClick={function(){setMuted(!muted)}} label={muted?"Stumm":"Mikrofon"}>
          {muted ? <MicOffIcon color="#fff" size={22}/> : <MicIcon color="#fff" size={22}/>}
        </CallBtn>
        {isVideo && (
          <CallBtn active={!vidOn} onClick={function(){setVidOn(!vidOn)}} label="Kamera">
            {vidOn ? <VideoIcon color="#fff" size={22}/> : <VideoOffIcon color="#fff" size={22}/>}
          </CallBtn>
        )}
        <CallBtn onClick={function(){}} label="Teilen">
          <MonitorIcon color="#fff" size={22}/>
        </CallBtn>
        <CallBtn danger onClick={onEnd} label="Beenden">
          <PhoneIcon color="#fff" size={22}/>
        </CallBtn>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════════════════════════════════
export default function App() {
  var ref0 = useState("qr");
  var screen = ref0[0];
  var setScreen = ref0[1];

  var ref1 = useState("chats");
  var tab = ref1[0];
  var setTab = ref1[1];

  var ref2 = useState(null);
  var openChat = ref2[0];
  var setOpenChat = ref2[1];

  var ref3 = useState(null);
  var callInfo = ref3[0];
  var setCallInfo = ref3[1];

  var ref4 = useState(false);
  var showSettings = ref4[0];
  var setShowSettings = ref4[1];

  var ref5 = useState("");
  var search = ref5[0];
  var setSearch = ref5[1];

  var ref6 = useState("alle");
  var filter = ref6[0];
  var setFilter = ref6[1];

  // ── Auth Screens ──
  if (screen === "qr") return <ScreenQR goPhone={function(){setScreen("phone")}}/>;
  if (screen === "phone") return <ScreenPhone goQR={function(){setScreen("qr")}} goRegister={function(){setScreen("register")}} goApp={function(){setScreen("app")}}/>;
  if (screen === "register") return <ScreenRegister goBack={function(){setScreen("phone")}} goApp={function(){setScreen("app")}}/>;

  // ── Call Overlay ──
  if (callInfo) return <CallScreen contact={callInfo.contact} isVideo={callInfo.isVideo} onEnd={function(){setCallInfo(null)}}/>;

  // ── Filter chats ──
  var filteredChats = chats.filter(function(c2) {
    if (search && c2.name.toLowerCase().indexOf(search.toLowerCase()) === -1) return false;
    if (filter === "ungelesen" && !c2.unread) return false;
    if (filter === "gruppen" && !c2.group) return false;
    return true;
  });

  var totalUnread = 0;
  chats.forEach(function(c2){ totalUnread += c2.unread || 0; });

  // ── Sidebar Button ──
  function SideBtn({ IconComp, t, badge, onClick }) {
    var isActive = !showSettings && tab === t;
    function handleClick() {
      if (onClick) { onClick(); }
      else { setTab(t); setShowSettings(false); setOpenChat(null); }
    }
    return (
      <div style={{ position:"relative" }}>
        <button onClick={handleClick} style={{ width:44, height:44, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", background:"transparent", border:"none" }}
          onMouseEnter={function(e){e.currentTarget.style.background=C.hover}}
          onMouseLeave={function(e){e.currentTarget.style.background="transparent"}}>
          <IconComp color={isActive ? C.green : C.txt2} size={22}/>
        </button>
        {badge > 0 && (
          <div style={{ position:"absolute", top:2, right:2, background:C.green, color:"#fff", fontSize:10, fontWeight:700, borderRadius:10, minWidth:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 4px" }}>{badge}</div>
        )}
      </div>
    );
  }

  return (
    <div style={{ width:"100vw", height:"100vh", background:C.bg, color:C.txt, fontFamily:"'Segoe UI','Helvetica Neue',Arial,sans-serif", display:"flex", overflow:"hidden", fontSize:14 }}>

      {/* ═══ LEFT SIDEBAR ═══ */}
      <div style={{ width:56, background:C.panel, borderRight:"1px solid "+C.border, display:"flex", flexDirection:"column", alignItems:"center", paddingTop:12, gap:2, flexShrink:0 }}>
        <SideBtn IconComp={ChatIcon} t="chats" badge={totalUnread}/>
        <SideBtn IconComp={PhoneIcon} t="calls"/>
        <SideBtn IconComp={StatusIcon} t="status"/>
        <SideBtn IconComp={ChannelIcon} t="channels"/>
        <SideBtn IconComp={UsersIcon} t="communities"/>
        <div style={{ flex:1 }}/>
        <SideBtn IconComp={SettingsIcon} t="settings" onClick={function(){ setShowSettings(true); setOpenChat(null); }}/>
        <div style={{ marginBottom:12, cursor:"pointer" }}>
          <Avatar name="Awi" size={32} color={C.green}/>
        </div>
      </div>

      {/* ═══ MIDDLE PANEL ═══ */}
      <div style={{ width:340, background:C.panel, borderRight:"1px solid "+C.border, display:"flex", flexDirection:"column", flexShrink:0, overflow:"hidden" }}>
        {showSettings ? (
          <SettingsPanel onClose={function(){setShowSettings(false)}} onLogout={function(){setScreen("qr"); setShowSettings(false);}}/>
        ) : (
          <>
            {/* Panel Header */}
            <div style={{ padding:"14px 16px 10px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <h2 style={{ fontSize:22, fontWeight:700, margin:0, color:C.txt }}>
                  {tab==="chats"?"Chats":tab==="calls"?"Anrufe":tab==="status"?"Status":tab==="channels"?"Kanäle":"Communities"}
                </h2>
                <div style={{ display:"flex", gap:4 }}>
                  <button style={{ background:"none", border:"none", cursor:"pointer", padding:6, borderRadius:8, display:"flex" }}
                    onMouseEnter={function(e){e.currentTarget.style.background=C.hover}}
                    onMouseLeave={function(e){e.currentTarget.style.background="transparent"}}>
                    <EditIcon color={C.txt2} size={20}/>
                  </button>
                  <button style={{ background:"none", border:"none", cursor:"pointer", padding:6, borderRadius:8, display:"flex" }}
                    onMouseEnter={function(e){e.currentTarget.style.background=C.hover}}
                    onMouseLeave={function(e){e.currentTarget.style.background="transparent"}}>
                    <DotsIcon color={C.txt2} size={20}/>
                  </button>
                </div>
              </div>
              {/* Search */}
              <div style={{ display:"flex", alignItems:"center", background:C.input, borderRadius:8, padding:"6px 12px", gap:10 }}>
                <SearchIcon color={C.txt3} size={16}/>
                <input style={{ flex:1, background:"transparent", border:"none", outline:"none", color:C.txt, fontSize:13, padding:"2px 0" }}
                  placeholder="Suchen oder neuen Chat beginnen" value={search} onChange={function(e){setSearch(e.target.value)}}/>
              </div>
              {/* Filters */}
              {tab === "chats" && (
                <div style={{ display:"flex", gap:8, marginTop:10 }}>
                  {[{k:"alle",l:"Alle"},{k:"ungelesen",l:"Ungelesen"},{k:"gruppen",l:"Gruppen"}].map(function(f){
                    return (
                      <button key={f.k} onClick={function(){setFilter(f.k)}}
                        style={{ padding:"5px 14px", borderRadius:16, fontSize:13, fontWeight:500, cursor:"pointer", border:"none",
                          background: filter===f.k ? C.green+"22" : "transparent",
                          color: filter===f.k ? C.green : C.txt3,
                        }}
                        onMouseEnter={function(e){if(filter!==f.k) e.currentTarget.style.background=C.hover}}
                        onMouseLeave={function(e){if(filter!==f.k) e.currentTarget.style.background="transparent"}}>
                        {f.l}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* List */}
            <div style={{ flex:1, overflowY:"auto" }}>

              {/* ─ CHATS TAB ─ */}
              {tab === "chats" && (
                <>
                  <div style={{ display:"flex", alignItems:"center", gap:16, padding:"10px 20px", cursor:"pointer", borderBottom:"1px solid "+C.border }}
                    onMouseEnter={function(e){e.currentTarget.style.background=C.hover}}
                    onMouseLeave={function(e){e.currentTarget.style.background="transparent"}}>
                    <ArchiveIcon color={C.green} size={18}/>
                    <span style={{ fontSize:14, color:C.green, fontWeight:500 }}>Archiviert</span>
                  </div>
                  {filteredChats.map(function(c2){
                    var selected = openChat && openChat.id === c2.id;
                    return (
                      <div key={c2.id} onClick={function(){setOpenChat(c2)}}
                        style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", cursor:"pointer", background: selected ? C.hover : "transparent" }}
                        onMouseEnter={function(e){if(!selected) e.currentTarget.style.background=C.hover}}
                        onMouseLeave={function(e){if(!selected) e.currentTarget.style.background="transparent"}}>
                        <Avatar name={c2.name} size={48} online={c2.online}/>
                        <div style={{ flex:1, minWidth:0, borderBottom:"1px solid "+C.border, paddingBottom:10 }}>
                          <div style={{ display:"flex", justifyContent:"space-between" }}>
                            <span style={{ fontWeight: c2.unread ? 600 : 400, fontSize:15, color:C.txt }}>{c2.name}</span>
                            <span style={{ fontSize:12, color: c2.unread ? C.green : C.txt3, flexShrink:0 }}>{c2.time}</span>
                          </div>
                          <div style={{ display:"flex", justifyContent:"space-between", marginTop:2 }}>
                            <span style={{ fontSize:13, color:C.txt3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1, display:"flex", alignItems:"center", gap:4 }}>
                              {!c2.group && !c2.unread && <CheckIcon size={16} color={C.blue}/>}
                              {c2.last}
                            </span>
                            {c2.unread > 0 && (
                              <div style={{ background:C.green, color:"#fff", fontSize:11, fontWeight:700, borderRadius:10, minWidth:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 5px", flexShrink:0, marginLeft:8 }}>{c2.unread}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              {/* ─ CALLS TAB ─ */}
              {tab === "calls" && (
                <>
                  <div style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 20px", cursor:"pointer", borderBottom:"1px solid "+C.border }}
                    onMouseEnter={function(e){e.currentTarget.style.background=C.hover}}
                    onMouseLeave={function(e){e.currentTarget.style.background="transparent"}}>
                    <div style={{ width:42, height:42, borderRadius:"50%", background:C.green, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <PhoneIcon color="#fff" size={20}/>
                    </div>
                    <span style={{ fontWeight:500, color:C.txt }}>Neuer Anruf</span>
                  </div>
                  {calls.map(function(c2){
                    return (
                      <div key={c2.id}
                        onClick={function(){setCallInfo({contact:{name:c2.name}, isVideo:c2.video})}}
                        style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", cursor:"pointer" }}
                        onMouseEnter={function(e){e.currentTarget.style.background=C.hover}}
                        onMouseLeave={function(e){e.currentTarget.style.background="transparent"}}>
                        <Avatar name={c2.name} size={42}/>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:400, fontSize:15, color: c2.missed ? C.red : C.txt }}>{c2.name}</div>
                          <div style={{ fontSize:13, color:C.txt3, display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
                            <span style={{ color: c2.missed ? C.red : c2.dir==="in" ? C.green : C.txt3 }}>{c2.dir==="in" ? "↙" : "↗"}</span>
                            {c2.time}
                          </div>
                        </div>
                        {c2.video ? <VideoIcon color={C.green} size={20}/> : <PhoneIcon color={C.green} size={20}/>}
                      </div>
                    );
                  })}
                </>
              )}

              {/* ─ STATUS TAB ─ */}
              {tab === "status" && (
                <div style={{ padding:20 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24 }}>
                    <div style={{ position:"relative" }}>
                      <Avatar name="Awi" size={52} color={C.green}/>
                      <div style={{ position:"absolute", bottom:0, right:0, width:22, height:22, borderRadius:"50%", background:C.green, display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid "+C.panel }}>
                        <PlusIcon color="#fff" size={14}/>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontWeight:500, color:C.txt }}>Mein Status</div>
                      <div style={{ fontSize:13, color:C.txt3 }}>Tippe, um ein Statusupdate zu erstellen</div>
                    </div>
                  </div>
                  <div style={{ fontSize:13, color:C.txt3, fontWeight:500, marginBottom:12, textTransform:"uppercase", letterSpacing:0.5 }}>Neueste Updates</div>
                  {["Sarah Müller","Max Weber","Lisa Chen"].map(function(n){
                    return (
                      <div key={n} style={{ display:"flex", alignItems:"center", gap:14, padding:"8px 0", cursor:"pointer" }}>
                        <div style={{ padding:2, borderRadius:"50%", border:"2px solid "+C.green }}>
                          <Avatar name={n} size={42}/>
                        </div>
                        <div>
                          <div style={{ fontWeight:400, fontSize:14, color:C.txt }}>{n}</div>
                          <div style={{ fontSize:12, color:C.txt3 }}>Heute, {Math.floor(8+Math.random()*6)}:00</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ─ CHANNELS TAB ─ */}
              {tab === "channels" && (
                <div style={{ padding:20, textAlign:"center", paddingTop:60 }}>
                  <ChannelIcon color={C.txt3} size={48}/>
                  <h3 style={{ color:C.txt, fontWeight:400, marginTop:16 }}>Kanäle</h3>
                  <p style={{ color:C.txt3, fontSize:13, maxWidth:250, margin:"8px auto 20px" }}>Folge Kanälen, um Updates und Neuigkeiten zu erhalten.</p>
                  <button style={{ padding:"8px 20px", borderRadius:20, background:C.green, border:"none", color:"#fff", fontSize:14, cursor:"pointer" }}>Kanäle entdecken</button>
                </div>
              )}

              {/* ─ COMMUNITIES TAB ─ */}
              {tab === "communities" && (
                <div style={{ padding:20, textAlign:"center", paddingTop:60 }}>
                  <UsersIcon color={C.txt3} size={48}/>
                  <h3 style={{ color:C.txt, fontWeight:400, marginTop:16 }}>Communities</h3>
                  <p style={{ color:C.txt3, fontSize:13, maxWidth:260, margin:"8px auto 20px" }}>Kommuniziere einfach mit Mitgliedern aus Gruppen, die zusammengehören.</p>
                  <button style={{ padding:"8px 20px", borderRadius:20, background:C.green, border:"none", color:"#fff", fontSize:14, cursor:"pointer" }}>Community starten</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      {openChat ? (
        <Conversation
          key={openChat.id}
          chat={openChat}
          onBack={function(){setOpenChat(null)}}
          onCall={function(){setCallInfo({contact:openChat, isVideo:false})}}
          onVideoCall={function(){setCallInfo({contact:openChat, isVideo:true})}}
        />
      ) : (
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:C.deeper, borderLeft:"1px solid "+C.border }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ width:100, height:100, borderRadius:24, background:C.green+"22", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
              <span style={{ fontSize:48, fontWeight:800, color:C.green }}>A</span>
            </div>
            <h2 style={{ fontSize:28, fontWeight:300, color:C.txt, margin:"0 0 10px" }}>Awi für Desktop</h2>
            <p style={{ color:C.txt3, fontSize:14, maxWidth:380, margin:"0 auto 16px", lineHeight:1.6 }}>
              Sende und empfange Nachrichten ohne dein Telefon online halten zu müssen. Nutze Awi auf bis zu 4 verknüpften Geräten gleichzeitig.
            </p>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, color:C.txt3, fontSize:13 }}>
              <LockIcon color={C.txt3} size={14}/>
              <span>Ende-zu-Ende-verschlüsselt</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
