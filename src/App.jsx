import { useState, useEffect, useCallback } from "react";

const SCIT_ELECTIVES = [
  { id:"CIT3021", name:"Foundations of Information Systems", credits:3 },
  { id:"CIT4001", name:"Software Implementation", credits:3 },
  { id:"CIT3012", name:"Advanced Databases", credits:4 },
  { id:"CIT3013", name:"Database Administration", credits:4 },
  { id:"CIT4009", name:"Enterprise Computing 1", credits:4 },
  { id:"CIT4010", name:"Enterprise Computing 2", credits:4 },
  { id:"CIT3024", name:"Enterprise Architecture and Infrastructure", credits:4 },
  { id:"CIT4023", name:"E-Business Strategy & E-Commerce", credits:4 },
  { id:"CIT3025", name:"IS Innovation and Emerging Technologies", credits:4 },
  { id:"CIT4032", name:"IS Strategy, Planning and Management", credits:4 },
  { id:"CIT4031", name:"IS Auditing", credits:4 },
  { id:"CIT4033", name:"Distributed Systems", credits:4 },
  { id:"CIT3015", name:"Digital Communication / Telecommunication", credits:4 },
  { id:"CIT3014", name:"Advanced Computer Networks", credits:4 },
  { id:"CIT3017", name:"Network Administration & Technical Support", credits:4 },
  { id:"CIT4035", name:"Network Management and Security", credits:4 },
  { id:"CIT4034", name:"Web Systems Design & Implementation", credits:4 },
  { id:"CIT3023", name:"Intro to Human Computer Interaction", credits:4 },
  { id:"CIT4011", name:"Digital Graphics", credits:4 },
  { id:"CIT3020", name:"Digital Video Effects", credits:4 },
  { id:"CIT3018", name:"Computer Animation", credits:4 },
  { id:"CIT3027", name:"Mobile Computing", credits:4 },
  { id:"CMP3041", name:"Applied Software Testing", credits:4 },
  { id:"CIT4017", name:"Decision Science", credits:3 },
  { id:"CIT3029", name:"Internship (optional)", credits:4 },
];

const COURSES_DATA = [
  { id:"CMP1024", name:"Programming 1",                          credits:4, prereqs:[],                  coreqs:[], level:1, sem:1 },
  { id:"CMP1026", name:"Computer Networks 1",                    credits:3, prereqs:[],                  coreqs:[], level:1, sem:1 },
  { id:"INT1001", name:"Information Technology",                 credits:3, prereqs:[],                  coreqs:[], level:1, sem:1 },
  { id:"COM1024", name:"Academic Literacy for Undergraduates",   credits:3, prereqs:[],                  coreqs:[], level:1, sem:1 },
  { id:"MAT1047", name:"College Mathematics 1B",                 credits:4, prereqs:[],                  coreqs:[], level:1, sem:1 },
  { id:"CMP1025", name:"Programming 2",                          credits:4, prereqs:["CMP1024"],         coreqs:[], level:1, sem:2 },
  { id:"COM2016", name:"Critical Thinking, Reading & Writing",   credits:3, prereqs:["COM1024"],         coreqs:[], level:1, sem:2 },
  { id:"MAT1008", name:"Discrete Mathematics",                   credits:4, prereqs:["MAT1047"],         coreqs:[], level:1, sem:2 },
  { id:"PSY1002", name:"Introduction to Psychology",             credits:3, prereqs:[],                  coreqs:[], level:1, sem:2 },
  { id:"ENS3001", name:"Environmental Studies / Material Sci",   credits:3, prereqs:[],                  coreqs:[], level:1, sem:2 },
  { id:"CSP1001", name:"Community Service Project",              credits:1, prereqs:[],                  coreqs:[], level:1, sem:2 },
  { id:"CIT2004", name:"Object Oriented Programming",            credits:4, prereqs:["CMP1025"],         coreqs:[], level:2, sem:1 },
  { id:"STA2020", name:"Introductory Statistics",                credits:3, prereqs:["MAT1047"],         coreqs:[], level:2, sem:1 },
  { id:"CIT2011", name:"Web Programming",                        credits:3, prereqs:["INT1001"],         coreqs:[], level:2, sem:1 },
  { id:"CMP1005", name:"Computer Logic & Digital Design",        credits:3, prereqs:["INT1001"],         coreqs:[], level:2, sem:1 },
  { id:"CMP2018", name:"Database Design",                        credits:3, prereqs:["INT1001"],         coreqs:[], level:2, sem:1 },
  { id:"CMP2006", name:"Data Structures",                        credits:4, prereqs:["CIT2004"],         coreqs:[], level:2, sem:2 },
  { id:"CMP2019", name:"Software Engineering Analysis & Design", credits:3, prereqs:["INT1001"],         coreqs:[], level:2, sem:2 },
  { id:"HUM3010", name:"Professional Ethics & Legal Implications",credits:3,prereqs:["COM1024"],         coreqs:["CMP2019"], level:2, sem:2 },
  { id:"PHS1019", name:"Physics for Computer Science",           credits:4, prereqs:["MAT1047"],         coreqs:[], level:2, sem:2 },
  { id:"CIT3002", name:"Operating Systems",                      credits:4, prereqs:["CIT2004"],         coreqs:[], level:3, sem:1 },
  { id:"CIT4024", name:"IT Project Management",                  credits:3, prereqs:["CMP2019"],         coreqs:[], level:3, sem:1 },
  { id:"CIT3003", name:"Analysis of Algorithms",                 credits:4, prereqs:["CMP2006"],         coreqs:[], level:3, sem:1 },
  { id:"CIT3009", name:"Advanced Programming",                   credits:4, prereqs:["CMP2006"],         coreqs:[], level:3, sem:1 },
  { id:"CMP3040", name:"Forensic Computing / Bioinformatics",    credits:3, prereqs:["CIT2004"],         coreqs:[], level:3, sem:1 },
  { id:"RES3024", name:"Computing Research Methods",             credits:3, prereqs:["STA2020"],         coreqs:[], level:3, sem:2 },
  { id:"CIT3006", name:"Theory of Computation",                  credits:4, prereqs:["MAT1008"],         coreqs:[], level:3, sem:2 },
  { id:"CIT4020", name:"Computer Security",                      credits:4, prereqs:["CIT3002"],         coreqs:[], level:3, sem:2 },
  { id:"MAT2003", name:"Calculus 1",                             credits:4, prereqs:["MAT1047"],         coreqs:[], level:3, sem:2 },
  { id:"STA2016", name:"Design of Experiments",                  credits:3, prereqs:["STA2020"],         coreqs:[], level:3, sem:2 },
  { id:"PRJ4020", name:"Major Project (Year-long)",              credits:6, prereqs:["RES3024"],         coreqs:[], level:4, sem:1, yearlong:true },
  { id:"CMP3011", name:"Computer Organisation & Assembly",       credits:4, prereqs:["CMP1005"],         coreqs:[], level:4, sem:1 },
  { id:"CMP4011", name:"Artificial Intelligence",                credits:4, prereqs:["CIT3003"],         coreqs:[], level:4, sem:1 },
  { id:"MAT1043", name:"Linear Algebra",                         credits:3, prereqs:["MAT1047"],         coreqs:[], level:4, sem:1 },
  { id:"ELEC_UPPER_1", name:"SCIT Upper-Level Elective",         credits:4, prereqs:[],                  coreqs:[], level:4, sem:1, elective:"scit" },
  { id:"CIT4036", name:"Professional Development Seminar",       credits:3, prereqs:["RES3024"],         coreqs:[], level:4, sem:2 },
  { id:"ENT3001", name:"Entrepreneurship",                       credits:3, prereqs:[],                  coreqs:[], level:4, sem:2 },
  { id:"CIT4004", name:"Analysis of Programming Languages",      credits:4, prereqs:["CIT3009"],         coreqs:[], level:4, sem:2 },
  { id:"UNIV_ELEC", name:"University Elective",                  credits:3, prereqs:[],                  coreqs:[], level:4, sem:2, elective:"univ" },
  { id:"ELEC_UPPER_2", name:"SCIT Upper-Level Elective",         credits:4, prereqs:[],                  coreqs:[], level:4, sem:2, elective:"scit" },
];

const ALL_COURSES = Object.fromEntries(COURSES_DATA.map(c => [c.id, c]));
const MAX_SEM_CREDITS = 18;
const GRADE_POINTS = {"A+":4.3,"A":4.0,"A-":3.7,"B+":3.3,"B":3.0,"B-":2.7,"C+":2.3,"C":2.0,"C-":1.7,"D+":1.3,"D":1.0,"F":0};
const GRADE_OPTS = Object.keys(GRADE_POINTS);
const STORAGE_KEY = "utech_cs_planner_v2";

const STATUS_META = {
  locked:       { label:"Locked",      bg:"#191918", text:"#383830", border:"#222220" },
  available:    { label:"Available",   bg:"#1f1a0d", text:"#f0a500", border:"#b07800" },
  "in-progress":{ label:"In Progress", bg:"#201608", text:"#ffcc66", border:"#d08000" },
  completed:    { label:"Completed",   bg:"#0d1a0d", text:"#6ecf6e", border:"#2a6a2a" },
  elective:     { label:"Elective",    bg:"#16101f", text:"#c084fc", border:"#7c3aed" },
};

function initStates() {
  const s = {};
  COURSES_DATA.forEach(c => { s[c.id] = c.prereqs.length === 0 ? "available" : "locked"; });
  return s;
}

function getInProgressSet(states) {
  return new Set(Object.entries(states).filter(([,v]) => v === "in-progress").map(([k]) => k));
}

function computeStates(saved) {
  const result = { ...saved };
  const inP = getInProgressSet(result);
  COURSES_DATA.forEach(c => {
    if (result[c.id] === "completed" || result[c.id] === "in-progress") return;
    const prereqsDone = c.prereqs.every(p => result[p] === "completed");
    const coreqsMet = !c.coreqs?.length || c.coreqs.every(p => result[p] === "completed" || inP.has(p));
    result[c.id] = prereqsDone && coreqsMet ? "available" : "locked";
  });
  return result;
}

function calcGPA(states, grades) {
  let pts = 0, cr = 0;
  COURSES_DATA.forEach(c => {
    if (states[c.id] === "completed" && grades[c.id] != null && GRADE_POINTS[grades[c.id]] !== undefined) {
      pts += GRADE_POINTS[grades[c.id]] * c.credits; cr += c.credits;
    }
  });
  return cr > 0 ? (pts / cr).toFixed(2) : null;
}

const defaultSlot = (name = "Plan A") => ({
  name, states: initStates(), grades: {}, pickedElectives: {}, studentName: "", studentId: ""
});

// ── Tooltip ──────────────────────────────────────────────────────────────────
function Tooltip({ children, text }) {
  const [show, setShow] = useState(false);
  if (!text) return children;
  return (
    <div style={{ position:"relative" }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{
          position:"absolute", bottom:"calc(100% + 7px)", left:"50%", transform:"translateX(-50%)",
          background:"#130e05", border:"1px solid #b07800", color:"#f0a500",
          fontSize:10, padding:"5px 9px", borderRadius:4, whiteSpace:"pre-wrap", maxWidth:240,
          zIndex:999, pointerEvents:"none", lineHeight:1.6, boxShadow:"0 4px 16px #0008",
        }}>{text}</div>
      )}
    </div>
  );
}

// ── Elective Picker ───────────────────────────────────────────────────────────
function ElectivePicker({ slotId, onClose, onPick, pickedElectives }) {
  const [search, setSearch] = useState("");
  const taken = Object.entries(pickedElectives).filter(([k,v]) => k !== slotId && v).map(([,v]) => v);
  const filtered = SCIT_ELECTIVES.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16 }} onClick={onClose}>
      <div style={{ background:"#130f08",border:"1px solid #b07800",borderRadius:10,width:"100%",maxWidth:500,maxHeight:"82vh",display:"flex",flexDirection:"column",overflow:"hidden" }} onClick={e=>e.stopPropagation()}>
        <div style={{ padding:"18px 20px 12px", borderBottom:"1px solid #2a1f0a" }}>
          <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,color:"#f0a500",marginBottom:8 }}>SCIT Upper-Level Elective</div>
          <input autoFocus placeholder="Search courses…" value={search} onChange={e=>setSearch(e.target.value)}
            style={{ width:"100%",background:"#1a1510",border:"1px solid #3a2a10",color:"#ccc",fontSize:11,padding:"6px 10px",borderRadius:4,fontFamily:"'DM Mono',monospace" }} />
        </div>
        <div style={{ overflowY:"auto", padding:"10px 16px 16px", flex:1 }}>
          {filtered.map(e => {
            const isTaken = taken.includes(e.id);
            const isCurrent = pickedElectives[slotId] === e.id;
            return (
              <div key={e.id} onClick={() => !isTaken && onPick(slotId, e.id)}
                style={{
                  padding:"9px 12px",borderRadius:6,cursor:isTaken?"not-allowed":"pointer",marginBottom:5,
                  background:isCurrent?"#2a1f08":isTaken?"#111":"#1a1510",
                  border:`1px solid ${isCurrent?"#f0a500":isTaken?"#222":"#2a1f0a"}`,
                  opacity:isTaken?0.35:1,display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all 0.12s",
                }}>
                <div>
                  <span style={{ fontSize:9,color:"#666",marginRight:7 }}>{e.id}</span>
                  <span style={{ fontSize:12,color:isCurrent?"#f0a500":"#ccc" }}>{e.name}</span>
                  {isTaken && <span style={{ fontSize:9,color:"#555",marginLeft:6 }}>(already picked)</span>}
                </div>
                <span style={{ fontSize:10,color:"#555",marginLeft:8 }}>{e.credits}cr</span>
              </div>
            );
          })}
        </div>
        <div style={{ padding:"10px 16px", borderTop:"1px solid #2a1f0a" }}>
          <button onClick={onClose} style={{ width:"100%",padding:"8px",background:"#1a1510",border:"1px solid #3a2a10",color:"#aaa",borderRadius:5,cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:11 }}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Save Slot Modal ───────────────────────────────────────────────────────────
function SlotModal({ slots, current, onSwitch, onNew, onDelete, onClose }) {
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16 }} onClick={onClose}>
      <div style={{ background:"#130f08",border:"1px solid #b07800",borderRadius:10,width:"100%",maxWidth:360,padding:22 }} onClick={e=>e.stopPropagation()}>
        <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,color:"#f0a500",marginBottom:14 }}>Degree Plans</div>
        {slots.map((s,i) => (
          <div key={i} style={{ display:"flex",gap:7,marginBottom:7 }}>
            <div onClick={() => onSwitch(i)} style={{
              flex:1,padding:"9px 12px",borderRadius:5,cursor:"pointer",
              background:current===i?"#2a1f08":"#1a1510",
              border:`1px solid ${current===i?"#f0a500":"#3a2a10"}`,
              color:current===i?"#f0a500":"#aaa",fontSize:12,transition:"all 0.12s",
            }}>{s.name}{current===i ? " ✓":""}</div>
            {slots.length > 1 && <button onClick={() => onDelete(i)} style={{ background:"#1a0808",border:"1px solid #3a1010",color:"#e57373",padding:"6px 10px",borderRadius:4,cursor:"pointer",fontSize:11 }}>✕</button>}
          </div>
        ))}
        <button onClick={onNew} style={{ width:"100%",padding:"9px",background:"#1a1510",border:"1px dashed #3a2a10",color:"#f0a500",borderRadius:5,cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:11,marginTop:4 }}>+ New Plan</button>
        <button onClick={onClose} style={{ width:"100%",padding:"8px",background:"transparent",border:"1px solid #1f1a0a",color:"#555",borderRadius:5,cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:11,marginTop:8 }}>Done</button>
      </div>
    </div>
  );
}

// ── Course Card ───────────────────────────────────────────────────────────────
function CourseCard({ course, state, grade, onCycle, onGrade, onElectivePick, pickedElectives, states, flash }) {
  const isElective = !!course.elective;
  const displayState = isElective && state === "available" ? "elective" : state;
  const meta = STATUS_META[displayState] || STATUS_META.locked;
  const isLocked = state === "locked";
  const missingPre = course.prereqs.filter(p => states[p] !== "completed");
  const missingCo = (course.coreqs||[]).filter(p => states[p] !== "completed" && states[p] !== "in-progress");
  const tooltipLines = isLocked ? [
    missingPre.length ? `Prereqs: ${missingPre.join(", ")}` : null,
    missingCo.length ? `Co-reqs (can be same sem): ${missingCo.join(", ")}` : null,
  ].filter(Boolean).join("\n") : null;

  const pickedName = course.elective === "scit" && pickedElectives?.[course.id]
    ? SCIT_ELECTIVES.find(e => e.id === pickedElectives[course.id])?.name : null;

  return (
    <Tooltip text={tooltipLines}>
      <div className={`course-card${isLocked?" locked":""}${flash?" flash":""}`}
        onClick={() => !isLocked && onCycle(course.id)}
        style={{ background:meta.bg, border:`1px solid ${meta.border}`, borderRadius:7, padding:"10px 12px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:6 }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:9, color:"#484840", letterSpacing:1, marginBottom:3 }}>
              {course.id}{course.yearlong?" · YEARLONG":""}{course.coreqs?.length?" · co-req":""}
            </div>
            <div style={{ fontSize:12, color:meta.text, lineHeight:1.35 }}>
              {pickedName || course.name}
            </div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,flexShrink:0 }}>
            <span style={{ fontSize:10, color:meta.text, opacity:0.55 }}>{course.credits}cr</span>
            {displayState==="completed" && <span style={{ fontSize:11,color:"#6ecf6e" }}>✓</span>}
            {displayState==="in-progress" && <span style={{ fontSize:10,color:"#ffcc66" }}>▶</span>}
          </div>
        </div>

        {state === "completed" && (
          <div style={{ marginTop:7 }} onClick={e=>e.stopPropagation()}>
            <select value={grade||""} onChange={e=>onGrade(course.id,e.target.value)}
              style={{ background:"#0d1a0d",border:"1px solid #2a6a2a",color:grade?"#6ecf6e":"#3a5a3a",
                fontSize:10,padding:"3px 6px",borderRadius:3,width:"100%",fontFamily:"'DM Mono',monospace",cursor:"pointer" }}>
              <option value="">— enter grade —</option>
              {GRADE_OPTS.map(g=><option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        )}

        {course.elective === "scit" && state !== "locked" && (
          <button onClick={e=>{e.stopPropagation();onElectivePick(course.id);}}
            style={{ marginTop:7,width:"100%",fontSize:9,padding:"3px 0",background:"#16101f",
              border:"1px solid #7c3aed",color:"#c084fc",borderRadius:3,cursor:"pointer",
              fontFamily:"'DM Mono',monospace",letterSpacing:1 }}>
            {pickedElectives?.[course.id]?"✎ change elective":"+ pick elective"}
          </button>
        )}
      </div>
    </Tooltip>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function Planner() {
  const [slots, setSlots] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.slots) return d.slots.map(s => ({ ...defaultSlot(s.name), ...s, states: computeStates(s.states) }));
      }
    } catch {}
    return [defaultSlot()];
  });
  const [currentSlot, setCurrentSlot] = useState(0);
  const [view, setView] = useState("full");
  const [focusIdx, setFocusIdx] = useState(0);
  const [showUnlocked, setShowUnlocked] = useState(false);
  const [electiveModal, setElectiveModal] = useState(null);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [flashId, setFlashId] = useState(null);

  const slot = slots[Math.min(currentSlot, slots.length-1)] || defaultSlot();
  const { states, grades, pickedElectives, studentName, studentId } = slot;

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ slots, currentSlot })); } catch {}
  }, [slots, currentSlot]);

  const updateSlot = useCallback((fn) => {
    setSlots(prev => {
      const next = [...prev];
      const idx = Math.min(currentSlot, next.length-1);
      next[idx] = { ...next[idx], ...fn(next[idx]) };
      return next;
    });
  }, [currentSlot]);

  const cycleState = useCallback((id) => {
    updateSlot(s => {
      const cur = s.states[id];
      if (cur === "locked") return s;
      const course = ALL_COURSES[id];
      let next;
      if (course.elective) {
        next = cur === "available" ? "completed" : "available";
      } else {
        const order = ["available","in-progress","completed"];
        const i = order.indexOf(cur);
        next = i === -1 ? "available" : order[(i+1) % order.length];
      }
      if (next === "completed") { setFlashId(id); setTimeout(() => setFlashId(null), 700); }
      return { states: computeStates({ ...s.states, [id]: next }) };
    });
  }, [updateSlot]);

  const setGrade = useCallback((id, grade) => {
    updateSlot(s => ({ grades: { ...s.grades, [id]: grade } }));
  }, [updateSlot]);

  const pickElective = useCallback((slotId, electiveId) => {
    updateSlot(s => ({ pickedElectives: { ...s.pickedElectives, [slotId]: electiveId } }));
    setElectiveModal(null);
  }, [updateSlot]);

  const completedCr = COURSES_DATA.filter(c=>states[c.id]==="completed").reduce((s,c)=>s+c.credits,0);
  const totalCr = COURSES_DATA.reduce((s,c)=>s+c.credits,0);
  const progress = Math.round((completedCr/totalCr)*100);
  const gpa = calcGPA(states, grades);
  const unlockedList = COURSES_DATA.filter(c=>states[c.id]==="available"&&!ALL_COURSES[c.id].elective);

  const allSems = [1,2,3,4].flatMap(lv=>[1,2].map(sm=>({
    level:lv, sem:sm, label:`Level ${lv} · Semester ${sm}`,
    courses: COURSES_DATA.filter(c=>c.level===lv&&c.sem===sm),
  })));

  const exportData = () => {
    const blob = new Blob([JSON.stringify({slots,currentSlot},null,2)],{type:"application/json"});
    const a = document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="utech_cs_plan.json"; a.click();
  };
  const importData = () => {
    const input = document.createElement("input"); input.type="file"; input.accept=".json";
    input.onchange = e => {
      const file=e.target.files[0]; if(!file)return;
      const r=new FileReader();
      r.onload=ev=>{
        try {
          const d=JSON.parse(ev.target.result);
          if(d.slots){setSlots(d.slots.map(s=>({...defaultSlot(s.name),...s,states:computeStates(s.states)})));setCurrentSlot(d.currentSlot||0);}
          else{setSlots([{...defaultSlot(),states:computeStates(d)}]);setCurrentSlot(0);}
        }catch{}
      };
      r.readAsText(file);
    };
    input.click();
  };
  const printPlan = () => {
    const rows = COURSES_DATA.map(c=>`${c.level}.${c.sem}  ${c.id.padEnd(14)}${c.name.padEnd(44)}${c.credits}cr  ${(states[c.id]||"").padEnd(14)}${grades[c.id]||""}`).join("\n");
    const w=window.open("","_blank");
    w.document.write(`<pre style="font:12px/1.7 monospace;padding:24px">UTech BSc Computing — Computer Science\n${studentName?"Student: "+studentName+"  ":""}${studentId?"ID: "+studentId:""}\nGPA: ${gpa||"N/A"} | Credits Earned: ${completedCr}/${totalCr} (${progress}%)\n${"─".repeat(80)}\nLv.Sm  Code          Name                                        Cr    Status        Grade\n${"─".repeat(80)}\n${rows}</pre>`);
    w.print();
  };

  const renderSem = (semObj) => {
    const active = semObj.courses.filter(c=>states[c.id]==="in-progress"||states[c.id]==="completed").reduce((s,c)=>s+c.credits,0);
    const inProg = semObj.courses.filter(c=>states[c.id]==="in-progress").reduce((s,c)=>s+c.credits,0);
    const warn = inProg > MAX_SEM_CREDITS;
    return (
      <div key={`${semObj.level}-${semObj.sem}`}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8 }}>
          <div style={{ fontSize:10,color:"#585848",letterSpacing:2,textTransform:"uppercase" }}>Semester {semObj.sem}</div>
          <div style={{ display:"flex",alignItems:"center",gap:6,fontSize:9 }}>
            {warn&&<span style={{color:"#ff7070"}} title="Over 18 credits in-progress">⚠ overload</span>}
            <span style={{color:active>0?"#f0a500":"#3a3a28"}}>{active}cr active</span>
            <div style={{width:36,height:3,background:"#2a1f0a",borderRadius:2,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${Math.min(100,(inProg/MAX_SEM_CREDITS)*100)}%`,background:warn?"#ff7070":"#f0a500",borderRadius:2}}/>
            </div>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {semObj.courses.map(course=>(
            <CourseCard key={course.id} course={course} state={states[course.id]} grade={grades[course.id]}
              onCycle={cycleState} onGrade={setGrade} onElectivePick={setElectiveModal}
              pickedElectives={pickedElectives} states={states} flash={flashId===course.id}/>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{minHeight:"100vh",background:"#0e0d0b",fontFamily:"'DM Mono','Courier New',monospace",color:"#e0e0e0",paddingBottom:80}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#0e0d0b}::-webkit-scrollbar-thumb{background:#3a2a10}
        .course-card{transition:all 0.15s ease;cursor:pointer}
        .course-card:hover:not(.locked){transform:translateY(-2px);filter:brightness(1.1)}
        .course-card.locked{cursor:default;opacity:0.42}
        .course-card.flash{animation:pop 0.6s ease}
        @keyframes pop{0%{transform:scale(1)}35%{transform:scale(1.05)}100%{transform:scale(1)}}
        .btn{background:#1a1510;border:1px solid #3a2a10;color:#888;font-family:'DM Mono',monospace;font-size:11px;padding:6px 12px;cursor:pointer;border-radius:4px;transition:all 0.13s;white-space:nowrap}
        .btn:hover{background:#221a0c;color:#f0a500;border-color:#b07800}
        .btn.on{background:#221a08;color:#f0a500;border-color:#f0a500}
        .tab{background:transparent;border:none;border-bottom:2px solid transparent;color:#555;font-family:'DM Mono',monospace;font-size:11px;padding:8px 16px;cursor:pointer;transition:all 0.13s}
        .tab.on{color:#f0a500;border-bottom-color:#f0a500}
        input,select{outline:none}
        @media(max-width:580px){.semgrid{grid-template-columns:1fr!important}}
      `}</style>

      {/* ── Header ── */}
      <div style={{background:"#09080600",borderBottom:"1px solid #231b09",padding:"20px 18px 16px",background:"#0a0900"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{fontSize:9,letterSpacing:4,color:"#b07800",textTransform:"uppercase",marginBottom:4}}>University of Technology, Jamaica</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:21,fontWeight:800,lineHeight:1.15,color:"#fff"}}>
                BSc Computing · <span style={{color:"#f0a500"}}>Computer Science</span>
              </div>
            </div>
            <div style={{display:"flex",gap:18,alignItems:"flex-end"}}>
              {gpa&&(
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:24,fontWeight:300,color:"#f0a500",lineHeight:1}}>{gpa}</div>
                  <div style={{fontSize:9,color:"#555",letterSpacing:2,marginTop:2}}>GPA</div>
                </div>
              )}
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:28,fontWeight:300,color:"#fff",lineHeight:1}}>{progress}%</div>
                <div style={{fontSize:9,color:"#555",letterSpacing:2,marginTop:3}}>{completedCr}/{totalCr} CREDITS</div>
                <div style={{width:140,marginTop:6,height:5,background:"#1e1a10",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#d07000,#ffb020)",borderRadius:3,transition:"width 0.4s"}}/>
                </div>
              </div>
            </div>
          </div>

          {/* Student info */}
          <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>
            <input placeholder="Student Name" value={studentName}
              onChange={e=>updateSlot(()=>({studentName:e.target.value}))}
              style={{background:"#130f08",border:"1px solid #2a1f0a",color:"#ccc",fontSize:11,padding:"5px 10px",borderRadius:4,fontFamily:"'DM Mono',monospace",width:190}}/>
            <input placeholder="Student ID" value={studentId}
              onChange={e=>updateSlot(()=>({studentId:e.target.value}))}
              style={{background:"#130f08",border:"1px solid #2a1f0a",color:"#ccc",fontSize:11,padding:"5px 10px",borderRadius:4,fontFamily:"'DM Mono',monospace",width:130}}/>
          </div>

          {/* Legend */}
          <div style={{display:"flex",gap:7,marginTop:12,flexWrap:"wrap"}}>
            {Object.entries(STATUS_META).map(([k,v])=>(
              <div key={k} style={{fontSize:9,padding:"2px 9px",borderRadius:20,background:v.bg,color:v.text,border:`1px solid ${v.border}`,letterSpacing:1,textTransform:"uppercase"}}>{v.label}</div>
            ))}
          </div>

          {/* Actions */}
          <div style={{display:"flex",gap:6,marginTop:12,flexWrap:"wrap",alignItems:"center"}}>
            <button className="btn" onClick={()=>setShowSlotModal(true)}>⊞ Plans ({slots.length})</button>
            <button className={`btn${showUnlocked?" on":""}`} onClick={()=>setShowUnlocked(v=>!v)}>◈ Available ({unlockedList.length})</button>
            <button className="btn" onClick={exportData}>↑ Export</button>
            <button className="btn" onClick={importData}>↓ Import</button>
            <button className="btn" onClick={printPlan}>⎙ Print</button>
            <button className="btn" style={{color:"#e57373",borderColor:"#3a1010"}}
              onClick={()=>{if(confirm("Reset all progress in this plan?"))updateSlot(()=>({...defaultSlot(slot.name),studentName:slot.studentName,studentId:slot.studentId}))}}>⟳ Reset</button>
          </div>
        </div>
      </div>

      {/* ── Unlocked panel ── */}
      {showUnlocked&&(
        <div style={{background:"#0f0c07",borderBottom:"1px solid #231b09",padding:"12px 18px"}}>
          <div style={{maxWidth:980,margin:"0 auto"}}>
            <div style={{fontSize:9,color:"#b07800",letterSpacing:3,textTransform:"uppercase",marginBottom:9}}>Courses you can take right now</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {unlockedList.length===0
                ?<span style={{fontSize:11,color:"#555"}}>None yet — complete prerequisites to unlock more.</span>
                :unlockedList.map(c=>(
                  <div key={c.id} style={{background:"#1f1a0d",border:"1px solid #b07800",borderRadius:5,padding:"4px 10px",fontSize:11,color:"#f0a500"}}>
                    {c.id} <span style={{color:"#666"}}>·</span> {c.name} <span style={{color:"#666"}}>({c.credits}cr)</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ── View tabs ── */}
      <div style={{background:"#0a0900",borderBottom:"1px solid #1a1508"}}>
        <div style={{maxWidth:980,margin:"0 auto",display:"flex"}}>
          <button className={`tab${view==="full"?" on":""}`} onClick={()=>setView("full")}>Full Plan</button>
          <button className={`tab${view==="semester"?" on":""}`} onClick={()=>setView("semester")}>Semester Focus</button>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{maxWidth:980,margin:"0 auto",padding:"26px 16px 0"}}>

        {/* Semester focus view */}
        {view==="semester"&&(
          <>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,flexWrap:"wrap"}}>
              <button className="btn" disabled={focusIdx===0} onClick={()=>setFocusIdx(i=>Math.max(0,i-1))} style={{opacity:focusIdx===0?0.3:1}}>←</button>
              <div style={{flex:1,textAlign:"center",fontSize:12,color:"#f0a500"}}>{allSems[focusIdx]?.label}</div>
              <button className="btn" disabled={focusIdx===allSems.length-1} onClick={()=>setFocusIdx(i=>Math.min(allSems.length-1,i+1))} style={{opacity:focusIdx===allSems.length-1?0.3:1}}>→</button>
            </div>
            {/* Dot nav */}
            <div style={{display:"flex",justifyContent:"center",gap:7,marginBottom:22,flexWrap:"wrap"}}>
              {allSems.map((s,i)=>(
                <button key={i} onClick={()=>setFocusIdx(i)} title={s.label}
                  style={{width:10,height:10,borderRadius:"50%",border:"none",cursor:"pointer",padding:0,
                    background:i===focusIdx?"#f0a500":s.courses.every(c=>states[c.id]==="completed")?"#2a6a2a":"#2a1f0a"}}/>
              ))}
            </div>
            {renderSem(allSems[focusIdx])}
          </>
        )}

        {/* Full plan view */}
        {view==="full"&&[1,2,3,4].map(lv=>{
          const lvSems = allSems.filter(s=>s.level===lv);
          const lvDone = lvSems.flatMap(s=>s.courses).filter(c=>states[c.id]==="completed").reduce((s,c)=>s+c.credits,0);
          const lvTotal = lvSems.flatMap(s=>s.courses).reduce((s,c)=>s+c.credits,0);
          return(
            <div key={lv} style={{marginBottom:42}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:800,letterSpacing:3,color:"#f0a500",textTransform:"uppercase"}}>Level {lv}</div>
                <div style={{flex:1,height:1,background:"#231b09"}}/>
                <div style={{fontSize:9,color:"#484838"}}>{lvDone}/{lvTotal}cr</div>
              </div>
              <div className="semgrid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                {lvSems.map(s=>renderSem(s))}
              </div>
            </div>
          );
        })}

        <div style={{marginTop:8,padding:"13px 16px",background:"#0e0d0b",border:"1px solid #231b09",borderRadius:7,fontSize:10,color:"#3a3a30",lineHeight:1.9}}>
          <strong style={{color:"#4a4a38"}}>How to use</strong> — Click available courses to cycle: Available → In Progress → Completed.
          Hover locked cards for missing prerequisites. Elective slots let you pick from the full SCIT catalog.
          Enter grades on completed courses to track GPA. ⚠ warns if a semester exceeds 18 credits.
          Use Plans to maintain alternate degree paths.
        </div>
      </div>

      {electiveModal&&<ElectivePicker slotId={electiveModal} onClose={()=>setElectiveModal(null)} onPick={pickElective} pickedElectives={pickedElectives}/>}
      {showSlotModal&&(
        <SlotModal slots={slots} current={currentSlot}
          onSwitch={i=>{setCurrentSlot(i);setShowSlotModal(false);}}
          onNew={()=>{
            const name=prompt("Name for new plan:",`Plan ${String.fromCharCode(65+slots.length)}`);
            if(name){setSlots(p=>[...p,defaultSlot(name)]);setCurrentSlot(slots.length);}
            setShowSlotModal(false);
          }}
          onDelete={i=>{
            if(!confirm("Delete this plan?"))return;
            setSlots(p=>p.filter((_,j)=>j!==i));
            setCurrentSlot(c=>Math.max(0,Math.min(c,slots.length-2)));
          }}
          onClose={()=>setShowSlotModal(false)}/>
      )}
    </div>
  );
}
