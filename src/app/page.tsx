"use client";

import { useState, useEffect, useRef } from "react";

const G = "#00ff88";

// ─── IMAGE SLIDER ──────────────────────────────────────────────────────────
function ImageSlider({ images, alt = "" }: { images: (string | null)[]; alt?: string }) {
  const [idx, setIdx] = useState(0);
  const valid = images.filter(Boolean) as string[];

  if (valid.length === 0) return (
    <div style={{ width: "100%", aspectRatio: "4/3", background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 6 }}>
      <span style={{ fontSize: 24, opacity: 0.2 }}>📷</span>
      <span style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,0.15)", letterSpacing: "0.18em" }}>IMAGE SLOT</span>
    </div>
  );

  if (valid.length === 1) return (
    <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: 6, overflow: "hidden" }}>
      <img src={valid[0]} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: 6, overflow: "hidden" }}>
      <img src={valid[idx]} alt={`${alt} ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 0.3s" }} />
      <button onClick={e => { e.stopPropagation(); setIdx((idx - 1 + valid.length) % valid.length); }}
        style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 34, height: 34, borderRadius: 3, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>‹</button>
      <button onClick={e => { e.stopPropagation(); setIdx((idx + 1) % valid.length); }}
        style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 34, height: 34, borderRadius: 3, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>›</button>
      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 2 }}>
        {valid.map((_, i) => <div key={i} onClick={e => { e.stopPropagation(); setIdx(i); }} style={{ width: i === idx ? 18 : 6, height: 6, borderRadius: 3, background: i === idx ? G : "rgba(255,255,255,0.35)", cursor: "pointer", transition: "all 0.2s" }} />)}
      </div>
      <div style={{ position: "absolute", top: 8, right: 8, fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.8)", background: "rgba(0,0,0,0.6)", padding: "2px 8px", borderRadius: 2 }}>{idx + 1}/{valid.length}</div>
    </div>
  );
}

// ─── 4-COL CAROUSEL ──────────────────────────────────────────────────────────
function Carousel4({ items, renderCard }: { items: any[]; renderCard: (item: any, i: number) => React.ReactNode }) {
  const [page, setPage] = useState(0);
  const per = 4;
  const total = Math.ceil(items.length / per);
  const visible = items.slice(page * per, page * per + per);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, alignItems: "stretch" }}>
        {visible.map((item, i) => renderCard(item, i))}
        {visible.length < per && Array.from({ length: per - visible.length }).map((_, i) => <div key={`ph-${i}`} />)}
      </div>
      {total > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} onClick={() => setPage(i)} style={{ width: i === page ? 28 : 8, height: 8, borderRadius: 4, background: i === page ? G : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
              style={{ width: 44, height: 44, borderRadius: 3, border: "1px solid rgba(255,255,255,0.12)", background: page === 0 ? "transparent" : "rgba(255,255,255,0.05)", color: page === 0 ? "rgba(255,255,255,0.2)" : "#fff", cursor: page === 0 ? "default" : "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            <button onClick={() => setPage(Math.min(total - 1, page + 1))} disabled={page === total - 1}
              style={{ width: 44, height: 44, borderRadius: 3, border: "1px solid rgba(255,255,255,0.12)", background: page === total - 1 ? "transparent" : "rgba(255,255,255,0.05)", color: page === total - 1 ? "rgba(255,255,255,0.2)" : "#fff", cursor: page === total - 1 ? "default" : "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{page * per + 1}–{Math.min((page + 1) * per, items.length)} / {items.length}</span>
        </div>
      )}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const tickerSkills = [
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "ClickHouse", icon: "https://cdn.simpleicons.org/clickhouse/ffffff" },
  { name: "BigQuery", icon: "https://cdn.simpleicons.org/googlebigquery/4285F4" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Looker Studio", icon: "https://cdn.simpleicons.org/looker/4285F4" },
  { name: "Power BI", icon: "https://cdn.simpleicons.org/powerbi/F2C811" },
  { name: "Tableau", icon: "https://cdn.simpleicons.org/tableau/E97627" },
  { name: "Airflow", icon: "https://cdn.simpleicons.org/apacheairflow/017CEE" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "Streamlit", icon: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Scikit-learn", icon: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
  { name: "dbt", icon: "https://cdn.simpleicons.org/dbt/FF694B" },
];

const skillCategories = [
  { label: "Query & Storage", items: [
    { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "ClickHouse", icon: "https://cdn.simpleicons.org/clickhouse/ffffff" },
    { name: "BigQuery", icon: "https://cdn.simpleicons.org/googlebigquery/4285F4" },
    { name: "ERPNext", icon: "https://cdn.simpleicons.org/frappe/00ff88" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  ]},
  { label: "BI & Viz", items: [
    { name: "Looker Studio", icon: "https://cdn.simpleicons.org/looker/4285F4" },
    { name: "Power BI", icon: "https://cdn.simpleicons.org/powerbi/F2C811" },
    { name: "Tableau", icon: "https://cdn.simpleicons.org/tableau/E97627" },
    { name: "Redash", icon: "https://cdn.simpleicons.org/redash/FF6B6B" },
    { name: "Streamlit", icon: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
  ]},
  { label: "Python & ML", items: [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "Scikit-learn", icon: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "HuggingFace", icon: "https://cdn.simpleicons.org/huggingface/FFD21E" },
  ]},
  { label: "Engineering", items: [
    { name: "Airflow", icon: "https://cdn.simpleicons.org/apacheairflow/017CEE" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "dbt", icon: "https://cdn.simpleicons.org/dbt/FF694B" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  ]},
];

const experiences = [
  { role: "Analytics Engineer", company: "PT Unirama Duta Niaga", period: "Sep 2025 – Present", type: "Internship - Probation", photos: [] as string[], highlights: ["Optimized ERPNext & ClickHouse SQL queries processing tens of millions of records for national-scale reporting", "Built CRM Go dashboard & sales performance reports (e-cash, PJP, quotation monitoring) with Tailwind + TypeScript", "Maintained Airflow pipelines & automated email reports across regions (Daily Sales, Stock, Service Level)", "Executed data migration & validation for core ERP docs — Invoice, Delivery Note, Sales Order, Payment Entry", "Applied IndoBERT + K-Means NLP clustering on 5,000+ PJP remarks for automated sentiment insights"] },
  { role: "Data & Business Intelligence Intern", company: "PT Aska Daya Tama", period: "Sep 2024 – Feb 2025", type: "Internship", photos: [] as string[], highlights: ["Consolidated 2,700+ records from 7 multi-sheet Excel files into BigQuery via automated ETL", "Modeled fact constellation schema (3 fact + 7 dimension tables) for Mud Motor operations", "Built 6-page Looker Studio dashboard — 90.8/100 usability, 98% task success, 4.7/5 efficiency score"] },
  { role: "Machine Learning Cohort", company: "Bangkit Academy — Google, GoTo, Traveloka", period: "Feb – Aug 2024", type: "Apprenticeship", photos: [] as string[], highlights: ["Collected, labeled, and preprocessed 6,500+ records across 3 dataset types for FitMeLook App", "Built dual CNN models (MobileNet + DenseNet) achieving 91% face shape & 70% seasonal color accuracy", "Ranked Top 1,000 in English & Top 100 in Soft Skills among all cohort participants"] },
  { role: "Data Science Intern", company: "BCC FILKOM Universitas Brawijaya", period: "Feb – Apr 2023", type: "Internship", photos: [] as string[], highlights: ["Processed 159,000+ PayLater records — demographic profiling, EDA, and visualization", "Tuned Random Forest, Naive Bayes & XGBoost models to achieve 80%+ loan repayment prediction accuracy"] },
];

const projects = [
  { id: "01", title: "Mud Motor BI Dashboard", subtitle: "PT Aska Daya Tama", category: "BI & Data Engineering", tags: ["BigQuery", "Looker Studio", "ETL", "Kimball"], problem: "Operations team lacked centralized visibility into Mud Motor profitability, utilization, and maintenance cycles across multiple Excel files.", solution: "Designed end-to-end BI system — automated ETL consolidating 2,700+ records, fact constellation schema, 6-page interactive dashboard.", impact: ["90.8 / 100 usability score", "98% task success rate", "4.7 / 5 efficiency score", "3 fact × 7 dimension tables"], images: ["/Aska-1.jpg","/Aska-2.jpg","/Aska-3.jpg","/Aska-4.jpg","/Aska-5.jpg","/Aska-6.jpg","/Aska-7.jpg"] },
  { id: "02", title: "FitMeLook – Fashion Recommendation", subtitle: "Bangkit Academy Capstone", category: "Machine Learning", tags: ["CNN", "MobileNet", "DenseNet", "TF.js", "MTCNN"], problem: "Women struggle to find clothing that suits their face shape and skin tone — existing apps lack real personalization.", solution: "Built dual-model CNN: MobileNet for 4-seasonal color type, DenseNet for face shape — deployed on Android + Google Cloud.", impact: ["91% face shape accuracy", "70% seasonal color accuracy", "6,500+ labeled data points", "MTCNN face crop pipeline"], images: ["/fitmelook-1.jpeg","/fitmelook-2.jpeg","/fitmelook-3.jpeg"] },
  { id: "03", title: "Sales Performance & CRM Dashboard", subtitle: "PT Unirama Duta Niaga", category: "Analytics Engineering", tags: ["ClickHouse", "ERPNext", "TypeScript", "Tailwind", "Airflow"], problem: "National sales team had no real-time visibility into e-cash, PJP field rep activity, and quotation pipeline across all regions.", solution: "Engineered SQL-backed dashboards in CRM Go with TypeScript + Tailwind, automated via Airflow for daily multi-region reporting.", impact: ["10M+ records processed daily", "Automated multi-region reports", "IndoBERT sentiment on 5K+ remarks", "Full Q2P cycle monitoring"], images: ["/crm-1.jpeg"] },
  { id: "04", title: "Telecom KPI & HR Analytics", subtitle: "PwC Switzerland × Forage", category: "BI & Analytics", tags: ["Power BI", "DAX", "HR Analytics", "KPI"], problem: "Call center, customer churn, and diversity datasets had no unified dashboard — key metrics scattered with no decision-support layer.", solution: "Identified key KPIs across 3 datasets and built 3 Power BI dashboards tracking operational performance, churn risk, and gender diversity.", impact: ["3 Power BI dashboards delivered", "Churn risk & diversity KPIs", "Strategic decision-support summaries", "Virtual Case Experience — PwC"], images: ["/pwc-1.jpeg","/pwc-2.jpeg","/pwc-3.jpeg","/pwc-4.png"] },
  { id: "05", title: "Jet Airways Analytics Dashboard", subtitle: "BI Course — FILKOM UB", category: "BI & Data Warehousing", tags: ["MySQL", "Redash", "Dimensional Modeling", "SQL"], problem: "No unified analytical view of route profitability and customer trends from 10,000+ flight records.", solution: "Designed dimensional data warehouse, validated DDL in MySQL Workbench, built 5-viz Redash dashboard.", impact: ["10K+ records in star schema", "5 dashboard visualizations", "Revenue & route profitability", "Customer trend analysis"], images: ["/jetairways-1.png","/jetairways-2.png","/jetairways-3.png"] },
  { id: "06", title: "PayLater Credit Risk Prediction", subtitle: "BCC FILKOM UB Internship", category: "Machine Learning", tags: ["Python", "XGBoost", "Random Forest", "Scikit-learn"], problem: "High default rates in PayLater products required early identification of at-risk borrowers from demographic data.", solution: "End-to-end ML pipeline on 159,000+ records: EDA, outlier handling, imbalance correction, hyperparameter tuning.", impact: ["80%+ prediction accuracy", "159K+ records processed", "3 algorithms compared", "Random Forest best performer"], images: ["/bcc-1.png","/bcc-2.png","/bcc-3.png","/bcc-4.png","/bcc-5.png"] },
  { id: "07", title: "BTPN Syariah Credit Card Attrition", subtitle: "Project Based Internship × Rakamin", category: "Data Analytics", tags: ["SQL", "Tableau", "EDA", "Retention Strategy"], problem: "Declining credit card base threatened revenue — business needed to identify at-risk customers proactively.", solution: "Explored 10,000+ records with SQL, validated churn hypotheses, built Tableau visualizations with retention strategies.", impact: ["10K+ customer records", "Key attrition factors identified", "Retention strategies proposed", "Stakeholder visualizations"], images: ["/BTPN-1.jpg","/BTPN-2.jpg","/BTPN-3.jpg","/BTPN-4.jpg"] },
  { id: "08", title: "Bike Sharing Demand Analysis", subtitle: "IDCamp 2023 — Dicoding", category: "Data Analytics", tags: ["Python", "Streamlit", "EDA", "Matplotlib"], problem: "Bike sharing operators lacked insight into how season, weather, and holidays affected rental volumes.", solution: "Analyzed 17,000+ rental records and deployed Streamlit dashboard surfacing peak-demand patterns.", impact: ["17K+ records analyzed", "Streamlit dashboard deployed", "Holiday demand patterns", "Weather correlations mapped"], images: ["/Dicoding-1.png","/Dicoding-2.png","/Dicoding-3.png"] },
];

const otherProjects: Record<string, { title: string; desc: string; image: string | null }[]> = {
  "Data & ML": [
    { title: "Employee Promotion Model", desc: "Python — Weighted Product Method", image: "/Data-1.jpg" },
    { title: "Medical Appointment OLAP", desc: "Data Warehouse Study Case", image: "/Data-2.jpg" },
    { title: "Customer Segmentation", desc: "Weka — Market Campaign Analysis", image: "/Data-3.jpg" },
    { title: "ETL Pipeline", desc: "ID/X Partners × Rakamin Academy", image: "/Data-4.jpg" },
  ],
  "Business": [
    { title: "COBIT IT Asset Assessment", desc: "Framework — FILKOM UB", image: "/Business-1.jpg" },
    { title: "Value Chain Analysis", desc: "Clothing Manufacturing Case Study", image: "/Business-2.jpg" },
    { title: "Odoo ERP Module", desc: "Implementation — Rakamin Academy", image: "/Business-3.jpg" },
    { title: "Business Process Modelling", desc: "Ayam Paha Dada Caman, Bekasi", image: "/Business-4.jpg" },
    { title: "Business Case Nutrition", desc: "Nutrition Consultant Company", image: "/Business-5.jpg" },
    { title: "IS Analysis & Design", desc: "Document Information System", image: "/Business-6.jpg" },
  ],
  "Web & Apps": [
    { title: "Alami Herbal Website", desc: "Front-End — HTML/CSS/JS", image: "/Web-1.jpg" },
    { title: "Traview Android App", desc: "Travel Review Application", image: "/Web-2.jpg" },
    { title: "Todoo-App", desc: "Laravel Framework", image: "/Web-3.jpg" },
    { title: "Nutrition Mockup Apps", desc: "Mockup Study Case", image: "/Web-4.jpg" },
    { title: "Java Library System", desc: "OOP — Library Management", image: "/Web-5.jpg" },
    { title: "Stock Market App Mockup", desc: "Technopreneurship Project", image: "/Web-6.jpg" },
  ],
};

const achievements = [
  { year: "Sep 2025", title: "Best Graduate — Faculty of Computer Science", org: "Universitas Brawijaya", issuer: "Issued by Universitas Brawijaya", desc: "Recognized as one of 22 top graduates of Universitas Brawijaya in Graduation Period II 2025/2026, representing the Faculty of Computer Science for outstanding academic performance.", icon: "🏆", images: ["/terbaik-1.jpeg", "/terbaik-2.jpeg"] },
  { year: "Jan 2024", title: "Absolute Winner — Gold Medalist Math Competition", org: "POSN 2024, Yapresindo Institution", issuer: "Issued by Yapresindo", desc: "Attained Absolute Winner, clinching a Gold Medal out of 300+ national participants in POSN 2024, covering various academic fields including Mathematics.", icon: "🥇", images: ["/POSN.jpg", "/first-mtk.jpeg"] },
  { year: "Oct 2023", title: "Top 50 Best Posters — International Cycle Seminar", org: "MMD 1000D UB", issuer: "Issued by MMD1000D UB", desc: "The poster showcasing activities of MMD Team 547 in Desa Umbulsari was selected as one of the top 50 best posters at the CYCLE International Seminar among 1,000 teams.", icon: "📜", images: [] as string[] },
  { year: "2024", title: "Top Performer — Bangkit Academy", org: "Led by Google, GoTo & Traveloka", issuer: "Bangkit Academy 2024", desc: "Ranked Top 1,000 in English courses & tests, and Top 100 in Soft Skill assignments among all Bangkit Academy 2024 cohort participants.", icon: "⭐", images: ["/Top-Performer-Bangkit.jpg"] },
  { year: "Jan 2022", title: "Semifinalist — DIG IN Business Competition", org: "BINUS University", issuer: "Issued by DIG IN Competition 2022", desc: "Achieved semifinalist standing in the DIG IN Business Case Competition 2022 at BINUS University.", icon: "🎯", images: ["/semifinalist_digin.jpeg"] },
  { year: "Oct 2021", title: "2nd Place — PKM-GFK FILKOM UB", org: "PK2MABA & Startup Academy Filkom 2021", issuer: "Issued by PK2MABA & Startup Academy", desc: "Achieved 2nd place in a data analysis and research competition (Constructive Futuristic Ideas field) at Brawijaya University's Faculty of Computer Science.", icon: "🥈", images: ["/pkm-gfk.jpeg"] },
];

const activities = [
  { type: "Volunteering", title: "Mahasiswa Membangun 1000 Desa (MMD UB 2023)", org: "Universitas Brawijaya", period: "Jul – Aug 2023 · 2 mos", location: "Umbulsari, Jember, East Java", desc: "Participated in the MMD 1000D Program as part of Team MMD 547, primary mission to uplift rural communities in Umbulsari Village.", highlights: ["Initiated and managed digital-based supplementary classes, involving 40+ elementary school students", "Collaborated with BrainAcademy RuangGuru Jember to conduct digital education classes at SMPN 1 Umbulsari, engaging 800+ students", "Created and launched the brand logo for the Umbulsari Jember SME Association at an event attended by 1,000+ residents", "Selected as one of top 50 best posters in the International Cycle Seminar among 1,000 MMD teams"], images: ["/KKN-1.jpeg","/KKN-2.jpg","/KKN-3.jpg","/KKN-4.jpg","/KKN-5.jpg","/KKN-6.jpg"] },
  { type: "Training", title: "IDCamp Program 2023 × Dicoding", org: "IDCamp Indosat Ooredoo Hutchison", period: "Sep – Dec 2023", location: "Remote", desc: "Data Scientist & Machine Learning Developer Program. Completed modules in Python, Data Science, SQL, and Introduction to Machine Learning.", highlights: ["Achieved average score exceeding 98% in theoretical quizzes and exams", "Analyzed bike share data using Python and Streamlit, processing 18,000+ records", "Conducted statistical summaries and correlation analyses of weather and season with bike rentals"], images: [] as string[] },
  { type: "Language Program", title: "Intensive English Program", org: "Kampung Inggris LC", period: "Dec 2022 – Feb 2023 · 3 mos", location: "Pare, East Java · On-site", desc: "Completed intensive English language program focusing on grammar, fluency, pronunciation, and vocabulary.", highlights: ["Strengthened grammar foundation and conversational fluency", "Enhanced pronunciation, clarity, and vocabulary for effective communication"], images: ["/pare-1.jpeg", "/pare-2.jpg"] },
  { type: "Organization", title: "Leader — Karya Ilmiah Remaja (KIR)", org: "SMA Negeri 12 Jakarta", period: "Jul 2019 – Jul 2020 · 1 yr 1 mo", location: "East Jakarta, Indonesia", desc: "Led the KIR scientific writing organization at SMAN 12 Jakarta. Managed activities, taught scientific writing and research presentation skills.", highlights: ["Managed activities involving 50+ students in scientific research and writing", "Taught scientific writing and effective communication for research presentations", "Achieved Top 10 Finalist nationally in the BINECA Industrial Engineering Competition", "Previously served as Member (Jul 2018 – Jul 2019) before becoming Leader"], images: ["/kir.jpeg"] },
];

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "", decimals = 0, duration = 1800 }: { target: number; suffix?: string; decimals?: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const val = (1 - Math.pow(1 - p, 3)) * target;
      setCount(parseFloat(val.toFixed(decimals)));
      if (p < 1) requestAnimationFrame(step); else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration, decimals]);
  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : count}{suffix}</span>;
}

function Tag({ label }: { label: string }) {
  return <span style={{ fontFamily: "monospace", fontSize: 10, padding: "3px 9px", border: "1px solid rgba(0,255,136,0.3)", color: G, borderRadius: 2, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{label}</span>;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Data & ML");
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const [expandedAct, setExpandedAct] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = ["home", "about", "experience", "projects", "achievements", "activities", "contact"];
  const doubled = [...tickerSkills, ...tickerSkills];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#07090d;}

        /* ── Elegant background ── */
        body::before {
          content:'';
          position:fixed;
          inset:0;
          z-index:0;
          background:
            radial-gradient(ellipse 80% 50% at 10% 20%, rgba(0,255,136,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 90% 80%, rgba(0,120,255,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(0,255,136,0.02) 0%, transparent 70%);
          pointer-events:none;
        }
        /* Subtle dot grid */
        body::after {
          content:'';
          position:fixed;
          inset:0;
          z-index:0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events:none;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 100%);
        }

        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#07090d;}
        ::-webkit-scrollbar-thumb{background:#00ff88;border-radius:2px;}

        .nl{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.38);text-decoration:none;transition:color .2s;cursor:pointer;font-weight:500;}
        .nl:hover,.nl.on{color:#00ff88;}

        .ch{transition:all .3s;}
        .ch:hover{background:rgba(0,255,136,.05)!important;border-color:rgba(0,255,136,.25)!important;transform:translateY(-3px);}

        .bp:hover{background:#00e07a!important;transform:translateY(-1px);}
        .bs:hover{border-color:rgba(255,255,255,.4)!important;color:#fff!important;}

        .sc{display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-size:11px;padding:8px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:3px;margin:4px;transition:all .2s;color:rgba(255,255,255,.6);cursor:default;}
        .sc:hover{background:rgba(0,255,136,.08);border-color:rgba(0,255,136,.3);color:#00ff88;}
        .sc img{width:14px;height:14px;object-fit:contain;filter:grayscale(1) brightness(1.4);transition:filter .2s;}
        .sc:hover img{filter:grayscale(0);}

        .tw{overflow:hidden;position:relative;}
        .tw::before,.tw::after{content:'';position:absolute;top:0;bottom:0;width:100px;z-index:2;pointer-events:none;}
        .tw::before{left:0;background:linear-gradient(90deg,#07090d,transparent);}
        .tw::after{right:0;background:linear-gradient(-90deg,#07090d,transparent);}
        .tt{display:flex;gap:14px;width:max-content;animation:tk 35s linear infinite;}
        .tt:hover{animation-play-state:paused;}
        @keyframes tk{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        .ti{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border:1px solid rgba(255,255,255,.07);border-radius:3px;background:rgba(255,255,255,.025);font-family:'JetBrains Mono',monospace;font-size:12px;color:rgba(255,255,255,.45);white-space:nowrap;transition:all .2s;flex-shrink:0;}
        .ti:hover{color:#00ff88;border-color:rgba(0,255,136,.3);background:rgba(0,255,136,.05);}
        .ti img{width:15px;height:15px;object-fit:contain;filter:grayscale(1) brightness(1.5);}
        .ti:hover img{filter:grayscale(0);}

        .ii{display:flex;align-items:flex-start;gap:10px;margin-bottom:12px;font-size:15px;color:rgba(255,255,255,.65);line-height:1.65;}
        .id{width:6px;height:6px;border-radius:50%;background:#00ff88;margin-top:8px;flex-shrink:0;box-shadow:0 0 6px rgba(0,255,136,.5);}

        .sl{font-family:'JetBrains Mono',monospace;font-size:12px;color:#00ff88;letter-spacing:.22em;text-transform:uppercase;margin-bottom:20px;font-weight:600;}
        .st{font-size:clamp(38px,5vw,64px);font-weight:900;letter-spacing:-.04em;line-height:1;margin-bottom:60px;font-family:'DM Sans',sans-serif;white-space:nowrap;}

        .tb{font-family:'JetBrains Mono',monospace;font-size:11px;padding:9px 22px;border:1px solid rgba(255,255,255,.1);background:transparent;color:rgba(255,255,255,.38);cursor:pointer;border-radius:2px;letter-spacing:.1em;text-transform:uppercase;transition:all .2s;}
        .tb:hover{color:rgba(255,255,255,.7);border-color:rgba(255,255,255,.25);}
        .tb.on{background:rgba(0,255,136,.1);border-color:rgba(0,255,136,.4);color:#00ff88;}

        .sl2{width:40px;height:1px;background:rgba(255,255,255,.2);animation:sl2a 2s ease-in-out infinite;}
        @keyframes sl2a{0%,100%{width:40px;opacity:.2;}50%{width:64px;opacity:.5;}}

        .hd{position:absolute;right:5%;top:50%;transform:translateY(-50%);opacity:.035;font-family:'JetBrains Mono',monospace;font-size:11px;color:#00ff88;line-height:2;text-align:right;pointer-events:none;white-space:pre;}

        .divl{height:1px;background:linear-gradient(90deg,rgba(0,255,136,.3),transparent);border:none;margin:0 72px;}

        .tb2{font-family:'JetBrains Mono',monospace;font-size:9px;padding:3px 9px;border-radius:2px;letter-spacing:.12em;text-transform:uppercase;display:inline-block;margin-bottom:8px;}

        /* Timeline */
        .timeline{position:relative;padding-left:32px;}
        .timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(180deg,rgba(0,255,136,.5),rgba(0,255,136,.1));}
        .tl-item{position:relative;padding-bottom:0;margin-bottom:36px;}
        .tl-item:last-child{margin-bottom:0;}
        .tl-dot{position:absolute;left:-37px;top:6px;width:10px;height:10px;border-radius:50%;background:#00ff88;box-shadow:0 0 0 3px rgba(0,255,136,.2),0 0 16px rgba(0,255,136,.4);transition:box-shadow .3s;}
        .tl-item.open .tl-dot{box-shadow:0 0 0 4px rgba(0,255,136,.3),0 0 24px rgba(0,255,136,.6);}

        @media(max-width:1100px){
          .st{white-space:normal!important;font-size:clamp(28px,5vw,52px)!important;}
          .g4{grid-template-columns:repeat(2,1fr)!important;}
        }
        @media(max-width:768px){
          .hr{flex-direction:column!important;}
          .hp{width:100%!important;height:55vw!important;}
          .ht{height:auto!important;padding:48px 24px 56px!important;}
          .hd{display:none;}
          .sp2{padding:80px 24px!important;}
          .g2{grid-template-columns:1fr!important;}
          .g4{grid-template-columns:1fr!important;}
          .divl{margin:0 24px!important;}
          footer{padding:24px!important;flex-direction:column!important;gap:16px!important;}
          nav{padding:0 20px!important;}
          nav ul{gap:16px!important;}
          .timeline{padding-left:20px;}
          .tl-dot{left:-25px;}
        }
      `}</style>

      <div style={{ background: "#07090d", color: "#e8e8e8", fontFamily: "'DM Sans',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

        {/* Noise overlay */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 998, opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

        {/* NAV */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 52px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrollY > 60 ? "rgba(7,9,13,.96)" : "transparent", backdropFilter: scrollY > 60 ? "blur(16px)" : "none", borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,.05)" : "none", transition: "all .3s" }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, color: G, letterSpacing: ".15em", fontWeight: 600 }}>NRI_</span>
          <ul style={{ display: "flex", gap: 28, listStyle: "none" }}>
            {navItems.map(item => <li key={item}><a href={`#${item}`} className={`nl ${activeSection === item ? "on" : ""}`} onClick={() => setActiveSection(item)}>{item}</a></li>)}
          </ul>
        </nav>

        {/* HERO */}
        <section id="home" className="hr" style={{ minHeight: "100vh", display: "flex", alignItems: "stretch", position: "relative", overflow: "hidden", zIndex: 1 }}>
          <div className="hd">{`SELECT name, role\nFROM analysts\nWHERE gpa >= 3.91\nAND specialization\n  = 'data'\nORDER BY impact DESC\nLIMIT 1;`}</div>
          <div className="hp" style={{ width: "48%", height: "100vh", position: "relative", flexShrink: 0, display: "flex", alignItems: "flex-end" }}>
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "85%", height: "65%", background: "radial-gradient(ellipse at bottom,rgba(0,255,136,.08) 0%,transparent 65%)", pointerEvents: "none" }} />
            <img src="/Foto Diri-2.png" alt="Nandana Rifqi Irfansyah" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom center", filter: "drop-shadow(0 0 80px rgba(0,255,136,.12))", position: "relative", zIndex: 1 }} />
          </div>
          <div className="ht" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px 0 36px", height: "100vh", position: "relative" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: G, letterSpacing: ".22em", textTransform: "uppercase", marginBottom: 28, opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(10px)", transition: "all .8s ease .2s" }}>
              Analytics Engineer · Data & BI Specialist
            </div>
            <h1 style={{ fontSize: "clamp(52px,7vw,92px)", fontWeight: 900, lineHeight: .92, letterSpacing: "-.04em", marginBottom: 28, fontFamily: "'DM Sans',sans-serif", opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(30px)", transition: "all .9s ease .35s" }}>
              Nandana<br /><span style={{ color: G }}>Rifqi</span>{" "}<span style={{ color: "rgba(255,255,255,.16)" }}>Irfansyah</span>
            </h1>
            <p style={{ fontSize: "clamp(14px,1.5vw,18px)", color: "rgba(255,255,255,.42)", maxWidth: 410, lineHeight: 1.75, marginBottom: 44, opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all .8s ease .55s" }}>
              Information Systems graduate turning raw data into measurable business impact — from national-scale ERP pipelines to ML-powered dashboards.
            </p>
            <div style={{ display: "flex", gap: 16, marginBottom: 52, opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all .8s ease .7s" }}>
              <a href="#projects" className="bp" style={{ padding: "15px 34px", background: G, color: "#07090d", border: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, textDecoration: "none", display: "inline-block", transition: "all .2s" }}>View Projects</a>
              <a href="#contact" className="bs" style={{ padding: "15px 34px", background: "transparent", color: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.14)", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, textDecoration: "none", display: "inline-block", transition: "all .2s" }}>Get in touch</a>
            </div>
            <div style={{ display: "flex", gap: 44, marginBottom: 32, opacity: mounted ? 1 : 0, transition: "opacity .8s ease 1s" }}>
              {[
                { label: "GPA", node: <AnimatedNumber target={3.91} decimals={2} duration={1800} /> },
                { label: "Records Processed", node: <AnimatedNumber target={10} suffix="M+" duration={1600} /> },
                { label: "Projects", node: <AnimatedNumber target={8} suffix="+" duration={1400} /> },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 28, fontWeight: 700, color: G, lineHeight: 1 }}>{s.node}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.26)", letterSpacing: ".1em", marginTop: 5 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="sl2" /><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,.2)", letterSpacing: ".22em" }}>SCROLL</span>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", borderBottom: "1px solid rgba(255,255,255,.05)", padding: "16px 0", position: "relative", zIndex: 1 }}>
          <div className="tw"><div className="tt">{doubled.map((s, i) => <div key={i} className="ti"><img src={s.icon} alt={s.name} />{s.name}</div>)}</div></div>
        </div>

        {/* ABOUT */}
        <section id="about" className="sp2" style={{ padding: "100px 72px", position: "relative", zIndex: 1 }}>
          <div className="sl">01 — About</div>
          <h2 className="st">Built for data. Driven by <span style={{ color: G }}>impact.</span></h2>
          <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(255,255,255,.6)", marginBottom: 22 }}>Information Systems graduate from Universitas Brawijaya (GPA 3.91, Best Graduate of Faculty of Computer Science) specializing in analytics engineering and business intelligence. I design systems that turn messy, fragmented data into reliable pipelines and actionable dashboards stakeholders actually use.</p>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(255,255,255,.6)", marginBottom: 22 }}>At PT Unirama Duta Niaga, I operate at national scale — optimizing ClickHouse + ERPNext queries over tens of millions of records, building TypeScript/Tailwind CRM dashboards, and applying NLP clustering (IndoBERT) to 5,000+ field rep remarks.</p>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(255,255,255,.6)" }}>I move comfortably between SQL optimization, ETL automation, ML model training, and dashboard design — bridging the gap between engineering depth and business clarity.</p>
              <div style={{ marginTop: 44, display: "flex", gap: 14 }}>
                {[
                  { label: "GPA", accent: true, node: <AnimatedNumber target={3.91} decimals={2} /> },
                  { label: "Years Exp", node: <AnimatedNumber target={1} suffix="+" /> },
                  { label: "Certs", node: <AnimatedNumber target={12} suffix="+" /> },
                ].map((s, i) => (
                  <div key={s.label} style={{ padding: "22px 20px", background: s.accent ? "rgba(0,255,136,.05)" : "rgba(255,255,255,.025)", border: `1px solid ${s.accent ? "rgba(0,255,136,.22)" : "rgba(255,255,255,.06)"}`, borderRadius: 4, flex: 1 }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 30, fontWeight: 700, color: G, lineHeight: 1 }}>{s.node}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.32)", marginTop: 8, fontFamily: "'JetBrains Mono',monospace", letterSpacing: ".08em" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {skillCategories.map(cat => (
                <div key={cat.label} style={{ marginBottom: 26 }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: G, letterSpacing: ".22em", marginBottom: 10, textTransform: "uppercase" }}>{cat.label}</div>
                  <div>{cat.items.map(sk => <span key={sk.name} className="sc"><img src={sk.icon} alt={sk.name} />{sk.name}</span>)}</div>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: 24, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.05)", borderRadius: 4 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,.22)", marginBottom: 12, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 600 }}>Education</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Universitas Brawijaya</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.42)", marginBottom: 8 }}>B.Sc. Information Systems · 2021 – 2025</div>
                <div style={{ fontSize: 12, color: G, fontFamily: "'JetBrains Mono',monospace" }}>Best Graduate · Faculty of Computer Science</div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divl" />

        {/* EXPERIENCE — Timeline */}
        <section id="experience" className="sp2" style={{ padding: "100px 72px", position: "relative", zIndex: 1 }}>
          <div className="sl">02 — Experience</div>
          <h2 className="st">Where I've <span style={{ color: G }}>shipped</span> work.</h2>
          <div className="timeline">
            {experiences.map((exp, idx) => {
              const isOpen = expandedExp === exp.company;
              return (
                <div key={exp.company} className={`tl-item ${isOpen ? "open" : ""}`}>
                  <div className="tl-dot" />
                  {/* Card */}
                  <div style={{ border: `1px solid ${isOpen ? "rgba(0,255,136,.3)" : "rgba(255,255,255,.07)"}`, borderRadius: 8, overflow: "hidden", transition: "border-color .3s", marginBottom: idx < experiences.length - 1 ? 0 : 0 }}>
                    <div onClick={() => setExpandedExp(isOpen ? null : exp.company)}
                      style={{ padding: "26px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: isOpen ? "rgba(0,255,136,.03)" : "rgba(255,255,255,.02)", transition: "background .3s" }}
                      onMouseEnter={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.04)"; }}
                      onMouseLeave={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.02)"; }}
                    >
                      <div>
                        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{exp.role}</div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,.4)" }}>{exp.company}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: G }}>{exp.period}</div>
                          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,.22)", marginTop: 3 }}>{exp.type}</div>
                        </div>
                        <div style={{ fontSize: 20, color: isOpen ? G : "rgba(255,255,255,.3)", transition: "all .3s", transform: isOpen ? "rotate(180deg)" : "none" }}>▾</div>
                      </div>
                    </div>
                    {isOpen && (
                      <div style={{ padding: "0 32px 32px", background: "rgba(0,255,136,.015)" }}>
                        <div className="g2" style={{ display: "grid", gridTemplateColumns: exp.photos.length > 0 ? "1fr 1fr" : "1fr", gap: 40, paddingTop: 28 }}>
                          <div>
                            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: G, letterSpacing: ".18em", marginBottom: 18, textTransform: "uppercase", fontWeight: 600 }}>Highlights</div>
                            <ul style={{ listStyle: "none" }}>{exp.highlights.map((h, i) => <li key={i} className="ii"><span className="id" />{h}</li>)}</ul>
                          </div>
                          {exp.photos.length > 0 && (
                            <div>
                              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: G, letterSpacing: ".18em", marginBottom: 18, textTransform: "uppercase", fontWeight: 600 }}>Gallery</div>
                              <ImageSlider images={exp.photos} alt={exp.company} />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <hr className="divl" />

        {/* PROJECTS */}
        <section id="projects" className="sp2" style={{ padding: "100px 72px", position: "relative", zIndex: 1 }}>
          <div className="sl">03 — Projects</div>
          <h2 className="st">Problems solved, <span style={{ color: G }}>results</span> measured.</h2>
          <Carousel4 items={projects} renderCard={(proj) => {
            const isOpen = activeProject === proj.id;
            return (
              <div key={proj.id} onClick={() => setActiveProject(isOpen ? null : proj.id)}
                style={{ background: isOpen ? "rgba(0,255,136,.04)" : "rgba(255,255,255,.03)", border: `1px solid ${isOpen ? "rgba(0,255,136,.25)" : "rgba(255,255,255,.07)"}`, borderRadius: 10, padding: 22, cursor: "pointer", transition: "all .3s", display: "flex", flexDirection: "column" }}
                className="ch"
              >
                <ImageSlider images={proj.images} alt={proj.title} />
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,.2)" }}>{proj.id}</span>
                    <span style={{ fontFamily: "monospace", fontSize: 10, color: G, letterSpacing: ".08em" }}>{proj.category}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>{proj.title}</h3>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.3)", marginBottom: 12 }}>{proj.subtitle}</div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.65, marginBottom: 14, flex: 1 }}>{proj.problem}</p>
                  {isOpen && (
                    <div style={{ borderTop: "1px solid rgba(0,255,136,.15)", paddingTop: 16, marginBottom: 14 }}>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: G, letterSpacing: ".15em", marginBottom: 8, fontWeight: 600, textTransform: "uppercase" }}>Solution</div>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.65, marginBottom: 14 }}>{proj.solution}</p>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: G, letterSpacing: ".15em", marginBottom: 8, fontWeight: 600, textTransform: "uppercase" }}>Impact</div>
                      {proj.impact.map((item, j) => <div key={j} className="ii" style={{ marginBottom: 6 }}><span className="id" /><span style={{ fontSize: 13 }}>{item}</span></div>)}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>{proj.tags.map(t => <Tag key={t} label={t} />)}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.18)", fontFamily: "monospace" }}>{isOpen ? "▲ collapse" : "▼ expand details"}</div>
                </div>
              </div>
            );
          }} />

          {/* More projects */}
          <div style={{ marginTop: 72 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "rgba(255,255,255,.25)", letterSpacing: ".2em", marginBottom: 28, textTransform: "uppercase", fontWeight: 600 }}>More Projects</div>
            <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
              {Object.keys(otherProjects).map(tab => <button key={tab} className={`tb ${activeTab === tab ? "on" : ""}`} onClick={() => setActiveTab(tab)}>{tab}</button>)}
            </div>
            <Carousel4 items={otherProjects[activeTab]} renderCard={(p) => (
              <div key={p.title} className="ch" style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <ImageSlider images={[p.image]} alt={p.title} />
                <div style={{ padding: "14px 18px 20px" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 5 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>{p.desc}</div>
                </div>
              </div>
            )} />
          </div>
        </section>

        <hr className="divl" />

        {/* ACHIEVEMENTS */}
        <section id="achievements" className="sp2" style={{ padding: "100px 72px", position: "relative", zIndex: 1 }}>
          <div className="sl">04 — Achievements</div>
          <h2 className="st">Recognition & <span style={{ color: G }}>milestones.</span></h2>
          <Carousel4 items={achievements} renderCard={(ach) => (
            <div key={ach.title} className="ch" style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <ImageSlider images={ach.images} alt={ach.title} />
              <div style={{ padding: "20px 22px 24px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: G, marginBottom: 3 }}>{ach.year}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,.22)", letterSpacing: ".1em" }}>{ach.issuer}</div>
                  </div>
                  <span style={{ fontSize: 24 }}>{ach.icon}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{ach.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.38)", marginBottom: 8 }}>{ach.org}</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>{ach.desc}</p>
              </div>
            </div>
          )} />
        </section>

        <hr className="divl" />

        {/* ACTIVITIES */}
        <section id="activities" className="sp2" style={{ padding: "100px 72px", position: "relative", zIndex: 1 }}>
          <div className="sl">05 — Activities & Volunteering</div>
          <h2 className="st">Beyond <span style={{ color: G }}>the desk.</span></h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {activities.map(act => {
              const isOpen = expandedAct === act.title;
              const tColor: Record<string, string> = { Volunteering: G, Training: "#00c8ff", "Language Program": "#ffc800", Organization: "#ff8080" };
              const tBg: Record<string, string> = { Volunteering: "rgba(0,255,136,.1)", Training: "rgba(0,200,255,.1)", "Language Program": "rgba(255,200,0,.1)", Organization: "rgba(255,128,128,.1)" };
              return (
                <div key={act.title} style={{ border: `1px solid ${isOpen ? "rgba(0,255,136,.3)" : "rgba(255,255,255,.07)"}`, borderRadius: 8, overflow: "hidden", transition: "border-color .3s" }}>
                  <div onClick={() => setExpandedAct(isOpen ? null : act.title)}
                    style={{ padding: "26px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: isOpen ? "rgba(0,255,136,.03)" : "rgba(255,255,255,.02)", transition: "background .3s" }}
                    onMouseEnter={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.04)"; }}
                    onMouseLeave={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.02)"; }}
                  >
                    <div>
                      <span className="tb2" style={{ background: tBg[act.type] || "rgba(255,255,255,.08)", color: tColor[act.type] || "rgba(255,255,255,.5)", border: `1px solid ${tColor[act.type]}30` }}>{act.type}</span>
                      <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>{act.title}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 3 }}>{act.org} · {act.period}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,.22)", textAlign: "right", maxWidth: 160 }}>{act.location}</div>
                      <div style={{ fontSize: 20, color: isOpen ? G : "rgba(255,255,255,.3)", transition: "all .3s", transform: isOpen ? "rotate(180deg)" : "none" }}>▾</div>
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ padding: "0 32px 32px", background: "rgba(0,255,136,.015)" }}>
                      <div className="g2" style={{ display: "grid", gridTemplateColumns: act.images.length > 0 ? "1fr 1fr" : "1fr", gap: 40, paddingTop: 28 }}>
                        <div>
                          <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: 22 }}>{act.desc}</p>
                          <div style={{ fontFamily: "monospace", fontSize: 11, color: G, letterSpacing: ".18em", marginBottom: 16, textTransform: "uppercase", fontWeight: 600 }}>Highlights</div>
                          <ul style={{ listStyle: "none" }}>{act.highlights.map((h, i) => <li key={i} className="ii"><span className="id" />{h}</li>)}</ul>
                        </div>
                        {act.images.length > 0 && (
                          <div>
                            <div style={{ fontFamily: "monospace", fontSize: 11, color: G, letterSpacing: ".18em", marginBottom: 16, textTransform: "uppercase", fontWeight: 600 }}>Gallery</div>
                            <ImageSlider images={act.images} alt={act.title} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <hr className="divl" />

        {/* CONTACT — compact, footer-style */}
        <section id="contact" className="sp2" style={{ padding: "80px 72px 60px", position: "relative", zIndex: 1 }}>
          <div className="sl">06 — Contact</div>
          <h2 className="st">Let's build <span style={{ color: G }}>something</span> together.</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.4)", lineHeight: 1.7, maxWidth: 420, marginBottom: 36 }}>Open to analytics engineering and BI opportunities — full-time, freelance, or collaboration.</p>

          {/* Horizontal contact cards */}
          <div style={{ display: "flex", border: "1px solid rgba(255,255,255,.07)", borderRadius: 8, overflow: "hidden" }}>
            {[
              { label: "Email", value: "nandanarifqiirfansyah@gmail.com", href: "mailto:nandanarifqiirfansyah@gmail.com", icon: "✉️" },
              { label: "Phone", value: "+62 813 8879 1589", href: "tel:+6281388791589", icon: "📱" },
              { label: "LinkedIn", value: "nandanarifqii252", href: "https://linkedin.com/in/nandanarifqii252", icon: "💼" },
              { label: "Instagram", value: "@nandanarifqii", href: "https://instagram.com/nandanarifqii", icon: "📸" },
              { label: "Portfolio", value: "bit.ly/portofolio", href: "https://bit.ly/portofolio-nandanarifqii", icon: "🔗" },
            ].map((c, i) => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: "flex", flexDirection: "column", padding: "28px 24px", background: "rgba(255,255,255,.02)", textDecoration: "none", color: "inherit", transition: "background .2s", borderRight: i < 4 ? "1px solid rgba(255,255,255,.07)" : "none", position: "relative" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,255,136,.05)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.02)"}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{c.icon}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 8 }}>{c.label}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,.8)", fontWeight: 500, wordBreak: "break-all", lineHeight: 1.4 }}>{c.value}</div>
                <div style={{ position: "absolute", top: 20, right: 18, color: G, fontSize: 14, opacity: .5 }}>→</div>
              </a>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: "20px 72px", borderTop: "1px solid rgba(255,255,255,.05)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1, flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,.18)" }}>NRI_ · Analytics Engineer · 2025</span>
          <div style={{ display: "flex", gap: 24 }}>
            {[{ l: "LinkedIn", h: "https://linkedin.com/in/nandanarifqii252" }, { l: "Email", h: "mailto:nandanarifqiirfansyah@gmail.com" }].map(x => (
              <a key={x.l} href={x.h} style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,.28)", textDecoration: "none", letterSpacing: ".1em", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = G)} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.28)")}>{x.l}</a>
            ))}
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,.1)" }}>Built with Next.js</span>
        </footer>
      </div>
    </>
  );
}