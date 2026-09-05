import React, { useState, useEffect, useMemo, useRef } from "react";
import "@/App.css";
import { QRCodeSVG } from "qrcode.react";
import { 
  Phone, MessageCircle, Search, ShoppingCart, ArrowLeft, User, Truck, 
  BookOpen, Sparkles, Calculator, Download, Shield, LogOut, Trash2, 
  Plus, Minus, ClipboardList, Menu, RefreshCw, Settings, Headphones, 
  X, Moon, Sun, Mic, Star, Camera, Upload, TrendingUp, Award, CreditCard, 
  Edit3, Image as ImageIcon, FileText, MapPin, AlertTriangle, KeyRound, 
  Database, Eye, EyeOff, Check, Send, Navigation, Printer, BellRing, 
  CheckCircle2, Compass, BarChart3, Share2, Building, Receipt, FileSpreadsheet, RotateCcw
} from "lucide-react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEtTaCAhkGUKGfWUQRTCj1xujnidgk2vI",
  authDomain: "as-enterprises-bd7f1.firebaseapp.com",
  projectId: "as-enterprises-bd7f1",
  storageBucket: "as-enterprises-bd7f1.firebasestorage.app",
  messagingSenderId: "667179272592",
  appId: "1:667179272592:web:56a95a9dfdb108bdee8b15"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const CFG = {
  phone: "+91 6301456725",
  wa: "916301456725",
  brand: "AS Enterprises",
  gstin: "36ABCDE1234F1Z5",
  defaultHero: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80",
  defaultHeadline: "Build Stronger. Order Smarter.",
};

const ls = {
  get: (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { console.error(e); } }
};

const DEFAULT_BANK = {
  bankName: "State Bank of India",
  accNo: "38920192831",
  ifsc: "SBIN0020182",
  branch: "Hyderabad Main Branch"
};

const getUPI = () => localStorage.getItem("customUpi") || "9030574216@upi";
const getHero = () => localStorage.getItem("bannerImg") || CFG.defaultHero;
const getHeadline = () => localStorage.getItem("bannerText") || "";

const T = {
  EN: { b:"Build Stronger. Order Smarter.", c:"Cart", s:"Same-Day Delivery", w:"Wholesale Khata", g:"Brand Catalog", f:"Free Estimate", zip:"Download Full Site Backup", home:"Home", search:"Search Sariya, Cement, Sand, Bricks...", login:"Login", logout:"Logout", orders:"My Orders", admin:"Admin", call:"Call Now", wa:"WhatsApp", cart:"Cart", buy:"Add to Cart", total:"Total", checkout:"Place Order", address:"Delivery Address", cod:"Cash on Delivery", upi:"Pay via UPI", confirm:"Confirm Order", noResults:"No materials found. Add inventory from Admin Panel.", tracker:"Live Order Tracker", khata:"Wholesale Khata", catalog:"Brand Catalog", estimator:"Estimate Calculator", welcome:"Welcome", mobile:"Mobile Number", otp:"Enter OTP", sendOtp:"Send OTP", verify:"Verify & Login", pinLbl:"Enter Admin PIN", changeUpi:"Change UPI ID", currentUpi:"Current UPI", saveUpi:"Save UPI", zipInfo:"Full backup file", qty:"Qty (Weight)", stock:"In Stock", cat:"Category", all:"All", tmt:"Sariya (TMT)", cement:"Cement", sand:"Sand & Aggregate", brick:"Bricks", tools:"Tools", empty:"Cart is empty", noord:"No orders yet", ordid:"Order", status:"Status", pending:"Pending", scan:"Scan QR to Pay", payto:"Pay to", est:"Enter dimensions to estimate", len:"Length (ft)", wid:"Width (ft)", ht:"Height (ft)", need:"You need approx", bags:"bags of Cement", tons:"tons of Sariya", cft:"cft of Sand", bricks:"Bricks (approx)", calc:"Calculate", ledger:"Ledger", customer:"Customer", amt:"Amount", add:"Add Entry", credit:"Credit", debit:"Debit", note:"Note", del:"Delete", eta:"ETA Today", driver:"Driver", low:"LOW STOCK", tick:"★ Same-Day Delivery Across Hyderabad • Wholesale Rates • Genuine Brands • Instant WhatsApp Estimates ★" },
  HI: { b:"मजबूत बनाएं। स्मार्ट ऑर्डर करें।", c:"टोकरी", s:"आज डिलीवरी", w:"थोक खाता", g:"ब्रांड कैटलॉग", f:"फ्री एस्टीमेट", zip:"साइट बैकअप डाउनलोड करें", home:"होम", search:"सरिया, सीमेंट, रेत, ईंट खोजें...", login:"लॉगिन", logout:"लॉगआउट", orders:"मेरे ऑर्डर", admin:"एडमिन", call:"कॉल करें", wa:"व्हाट्सएप", cart:"टोकरी", buy:"जोड़ें", total:"कुल", checkout:"ऑर्डर करें", address:"पता", cod:"कैश ऑन डिलीवरी", upi:"UPI से भुगतान", confirm:"पुष्टि करें", noResults:"सामान नहीं मिला। एडमिन पैनल से स्टॉक जोड़ें।", tracker:"लाइव ऑर्डर ट्रैकर", khata:"थोक खाता", catalog:"ब्रांड कैटलॉग", estimator:"अनुमान कैलकुलेटर", welcome:"स्वागत है", mobile:"मोबाइल नंबर", otp:"OTP दर्ज करें", sendOtp:"OTP भेजें", verify:"वेरीफाई करें", pinLbl:"एडमिन PIN डालें", changeUpi:"UPI बदलें", currentUpi:"मौजूदा UPI", saveUpi:"UPI सेव करें", zipInfo:"पूरा बैकअप", qty:"वज़न (किलो / बैग)", stock:"स्टॉक में", cat:"श्रेणी", all:"सभी", tmt:"सरिया (TMT)", cement:"सीमेंट", sand:"रेत/गिट्टी", brick:"ईंट", tools:"औजार", empty:"टोकरी खाली", noord:"कोई ऑर्डर नहीं", ordid:"ऑर्डर", status:"स्थिति", pending:"लंबित", scan:"QR स्कैन करें", payto:"भुगतान", est:"माप डालें", len:"लंबाई (फीट)", wid:"चौड़ाई (फीट)", ht:"ऊंचाई (फीट)", need:"आपको चाहिए", bags:"सीमेंट बैग", tons:"टन सरिया", cft:"cft रेत", bricks:"ईंटें", calc:"गणना करें", ledger:"बही", customer:"ग्राहक", amt:"राशि", add:"जोड़ें", credit:"जमा", debit:"नाम", note:"नोट", del:"हटाएं", eta:"आज पहुंचेगा", driver:"ड्राइवर", low:"स्टॉक कम", tick:"★ हैदराबाद में आज ही डिलीवरी • थोक रेट • असली ब्रांड • इंस्टेंट व्हाट्सएप एस्टीमेट ★" },
  TE: { b:"బలంగా నిర్మించండి. తెలివిగా ఆర్డర్ చేయండి.", c:"బుట్ట", s:"ఈరోజే డెలివరీ", w:"హోల్‌సేల్ ఖాతా", g:"బ్రాండ్ కేటలాగ్", f:"ఉచిత అంచనా", zip:"బ్యాకప్ డౌన్‌లోడ్", home:"హోమ్", search:"సరియా, సిమెంట్, ఇసుక, ఇటుకలు...", login:"లాగిన్", logout:"లాగౌట్", orders:"నా ఆర్డర్లు", admin:"అడ్మిన్", call:"కాల్ చేయండి", wa:"వాట్సాప్", cart:"బుట్ట", buy:"జోడించు", total:"మొత్తం", checkout:"ఆర్డర్ చేయండి", address:"చిరునామా", cod:"క్యాష్ ఆన్ డెలివరీ", upi:"UPI చెల్లింపు", confirm:"నిర్ధారించండి", noResults:"సరుకులు లేవు. అడ్మిన్ ప్యానెల్ నుండి జోడించండి.", tracker:"లైవ్ ఆర్డర్ ట్రాకర్", khata:"హోల్‌సేల్ ఖాతా", catalog:"బ్రాండ్ కేటలాగ్", estimator:"అంచనా కాలిక్యులేటర్", welcome:"స్వాగతం", mobile:"మొబైల్ నంబర్", otp:"OTP నమోదు", sendOtp:"OTP పంపండి", verify:"వెరిఫై చేయండి", pinLbl:"అడ్మిన్ PIN", changeUpi:"UPI మార్చండి", currentUpi:"ప్రస్తుత UPI", saveUpi:"UPI సేవ్ చేయండి", zipInfo:"పూర్తి బ్యాకప్", qty:"పరిమాణం (కిలోలు)", stock:"స్టాక్‌లో", cat:"వర్గం", all:"అన్నీ", tmt:"సరియా (TMT)", cement:"సిమెంట్", sand:"ఇసుక/కంకర", brick:"ఇటుకలు", tools:"పరికరాలు", empty:"బుట్ట ఖಾళీ", noord:"ఆర్డర్లు లేవు", ordid:"ఆర్డర్", status:"స్థితి", pending:"పెండింగ్", scan:"QR స్కాన్ చేయండి", payto:"చెల్లింపు", est:"కొలతలు ఇవ్వండి", len:"పొడవు (అడుగు)", wid:"వెడల్పు (అడుగు)", ht:"ఎత్తు (అడుగు)", need:"కావాలి", bags:"సిమెంట్ బస్తాలు", tons:"టన్నుల సరియా", cft:"cft ఇసుక", bricks:"ఇటుకలు", calc:"లెక్కించండి", ledger:"లెడ్జర్", customer:"కస్టమర్", amt:"మొత్తం", add:"జోడించు", credit:"క్రెడిట్", debit:"డెబిట్", note:"నోట్", del:"తొలగించు", eta:"ఈరోజు", driver:"డ్రైవర్", low:"స్టాక్ తక్కువ", tick:"★ హైదరాబాద్‌లో ఈరోజే డెలివరీ • హోల్‌సేల్ రేట్లు • అసలైన బ్రాండ్ • తక్షణ వాట్సాప్ అంచనా ★" }
};

const MAP = { sariya:'tmt', saria:'tmt', steel:'tmt', rod:'tmt', tmt:'tmt', cement:'cement', simenti:'cement', ppc:'cement', opc:'cement', ret:'sand', balu:'sand', sand:'sand', isuka:'sand', metal:'sand', aggregate:'sand', gitti:'sand', brick:'brick', eent:'brick', itukalu:'brick', block:'brick', wire:'tools', tool:'tools' };

const CLEAN_FRESH_PRODUCTS = [
  { id: 1001, n: "सरिया 8 MM (Tata Tiscon)", b: "Tata Tiscon", p: 62, u: "प्रति किलो (per kg)", cat: "tmt", stock: 500, rating: 4.8, visible: true, img: "", moq: 10 },
  { id: 1002, n: "सरिया 10 MM (JSW Neosteel)", b: "JSW Neosteel", p: 61, u: "प्रति किलो (per kg)", cat: "tmt", stock: 500, rating: 4.7, visible: true, img: "", moq: 10 },
  { id: 1003, n: "सरिया 12 MM (SAIL)", b: "SAIL", p: 60, u: "प्रति किलो (per kg)", cat: "tmt", stock: 500, rating: 4.6, visible: true, img: "", moq: 10 },
  { id: 1004, n: "सरिया 16 MM (Kamdhenu)", b: "Kamdhenu", p: 59, u: "प्रति किलो (per kg)", cat: "tmt", stock: 500, rating: 4.5, visible: true, img: "", moq: 10 },
  { id: 1005, n: "सीमेंट UltraTech OPC 53 Grade", b: "UltraTech", p: 410, u: "प्रति बैग (50kg bag)", cat: "cement", stock: 300, rating: 4.9, visible: true, img: "", moq: 10 },
  { id: 1006, n: "सीमेंट Ambuja PPC", b: "Ambuja", p: 380, u: "प्रति बैग (50kg bag)", cat: "cement", stock: 200, rating: 4.8, visible: true, img: "", moq: 10 },
  { id: 1007, n: "रेत River Sand (बालू)", b: "Local River", p: 1800, u: "प्रति टन (per ton)", cat: "sand", stock: 50, rating: 4.5, visible: true, img: "", moq: 1 },
  { id: 1008, n: "गिट्टी 20 MM Aggregate", b: "Local Quarry", p: 1200, u: "प्रति टन (per ton)", cat: "sand", stock: 80, rating: 4.4, visible: true, img: "", moq: 1 },
  { id: 1009, n: "लाल ईंट Red Bricks Class A", b: "Kiln Standard", p: 9, u: "प्रति पीस (per piece)", cat: "brick", stock: 5000, rating: 4.6, visible: true, img: "", moq: 200 }
];

const DEFAULT_WORKERS = [
  { id: 1, role: "Rajmistri (Mason)", name: "Ramesh Kumar", rate: 850, phone: "916301456725", icon: "🧱", exp: "12 yrs", area: "Hyderabad" },
  { id: 2, role: "Electrician", name: "Suresh Reddy", rate: 700, phone: "916301456725", icon: "⚡", exp: "8 yrs", area: "Secunderabad" },
  { id: 3, role: "Plumber", name: "Mahesh Yadav", rate: 650, phone: "916301456725", icon: "🔧", exp: "10 yrs", area: "Hyderabad" },
  { id: 4, role: "Contractor / Builder", name: "Anil Sharma", rate: 1500, phone: "916301456725", icon: "👷", exp: "18 yrs", area: "Telangana" }
];

const fileToDataURL = (file) => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result);
  r.onerror = rej;
  r.readAsDataURL(file);
});

const downloadCSV = (filename, rows) => {
  const processRow = (row) => row.map(val => `"${(val || '').toString().replace(/"/g, '""')}"`).join(',');
  const csvContent = "data:text/csv;charset=utf-8," + rows.map(processRow).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [lang, setLang] = useState(ls.get("lang", "EN"));
  const [cart, setCart] = useState(ls.get("cart", []));
  const [user, setUser] = useState(ls.get("userProfile", null));
  const [orders, setOrders] = useState(ls.get("myOrders", []));
  const [ledger, setLedger] = useState(ls.get("ledger", []));
  const [invoices, setInvoices] = useState(ls.get("saved_invoices", []));
  
  const [products, setProducts] = useState(ls.get("as_prod_master_v13", CLEAN_FRESH_PRODUCTS));
  const [workers, setWorkers] = useState(ls.get("as_wrk_master_v13", DEFAULT_WORKERS));
  const [bankInfo, setBankInfo] = useState(ls.get("bank_info", DEFAULT_BANK));
  const [gallery, setGallery] = useState(ls.get("gallery", []));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [upi, setUpi] = useState(getUPI());
  const [heroImg, setHeroImg] = useState(getHero());
  const [heroTxt, setHeroTxt] = useState(getHeadline());
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(ls.get("dark", false));
  const t = T[lang];

  // ALL HOOKS ARE ABSOLUTELY AT TOP LEVEL NOW
  const cartTotal = useMemo(() => cart.reduce((s, x) => s + x.p * x.q, 0), [cart]);

  const filtered = useMemo(() => {
    let list = products.filter(p => p.visible !== false);
    if (category !== "ALL") list = list.filter(p => p.cat === category);
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const mapped = MAP[q];
      list = list.filter(p => p.n.toLowerCase().includes(q) || p.b.toLowerCase().includes(q) || (mapped && p.cat === mapped));
    }
    return list;
  }, [query, category, products]);

  const lowStock = useMemo(() => products.filter(p => p.stock < 10 && p.visible !== false), [products]);

  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, "app_data", "main_store_v13"), (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data.products && Array.isArray(data.products) && data.products.length > 0) {
            setProducts(data.products);
          }
          if (data.workers && Array.isArray(data.workers) && data.workers.length > 0) {
            setWorkers(data.workers);
          }
          if (data.bankInfo) {
            setBankInfo(data.bankInfo);
          }
        }
      });
      return () => unsub();
    } catch (err) {
      console.error("Firestore sync error:", err);
    }
  }, []);

  useEffect(() => ls.set("lang", lang), [lang]);
  useEffect(() => ls.set("cart", cart), [cart]);
  useEffect(() => ls.set("myOrders", orders), [orders]);
  useEffect(() => ls.set("ledger", ledger), [ledger]);
  useEffect(() => ls.set("saved_invoices", invoices), [invoices]);
  useEffect(() => ls.set("as_prod_master_v13", products), [products]);
  useEffect(() => ls.set("as_wrk_master_v13", workers), [workers]);
  useEffect(() => ls.set("bank_info", bankInfo), [bankInfo]);
  useEffect(() => ls.set("gallery", gallery), [gallery]);
  useEffect(() => { ls.set("dark", dark); document.documentElement.classList.toggle("dark-mode", dark); }, [dark]);

  const go = (s) => { setScreen(s); window.scrollTo(0,0); };
  const back = () => go("home");

  const addToCart = (p) => {
    try {
      if (p.stock <= 0) { alert("This item is currently Out of Stock."); return; }
      const minQty = p.moq || 1;
      const existing = cart.find(x => x.id === p.id);
      if (existing) setCart(cart.map(x => x.id === p.id ? { ...x, q: x.q + 1 } : x));
      else setCart([...cart, { ...p, q: minQty }]);
    } catch (e) { console.error(e); }
  };
  const updateQty = (id, delta) => setCart(cart.map(x => x.id === id ? { ...x, q: Math.max(1, x.q + delta) } : x));
  const removeItem = (id) => setCart(cart.filter(x => x.id !== id));

  const CARDS = [
    { t: t.s, go: "tracker", icon: Truck, color: "bg-orange-500" },
    { t: t.w, go: "khata", icon: BookOpen, color: "bg-amber-600" },
    { t: t.g, go: "catalog", icon: Sparkles, color: "bg-red-600" },
    { t: t.f, go: "estimator", icon: Calculator, color: "bg-stone-700" }
  ];

  const doSearch = (v) => { setQuery(v); if (v.trim()) setCategory("ALL"); };

  const placeOrder = (payment, address) => {
    try {
      const order = {
        id: "ORD" + Date.now(),
        items: cart, total: cartTotal, payment, address,
        date: new Date().toISOString(),
        status: t.pending,
        user: user?.name || user?.mobile || "Guest",
        loyalty: Math.floor(cartTotal / 100)
      };
      setOrders([order, ...orders]);
      setCart([]);
      const msg = `*NEW ORDER - AS ENTERPRISES*%0AOrder ID: ${order.id}%0A${cart.map(x => `• ${x.n} x ${x.q} ${x.u} = Rs.${x.p*x.q}`).join('%0A')}%0A*Total: Rs.${cartTotal}*%0APayment: ${payment}%0AAddress: ${address}%0A%0A_Terms Accepted: Unloading customer side, cement/steel non-returnable._`;
      window.open(`https://wa.me/${CFG.wa}?text=${msg}`, "_blank");
      go("orders");
    } catch (e) { console.error(e); alert("Order failed. Call " + CFG.phone); }
  };

  const downloadZip = () => {
    try {
      const code = "<!doctype html>" + document.documentElement.outerHTML;
      const blob = new Blob([code], { type: "text/html" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "as-buildmart-backup.html"; a.click();
    } catch (e) { console.error(e); }
  };
  const saveUpi = (v) => { localStorage.setItem("customUpi", v); setUpi(v); alert("UPI saved"); };
  const logout = () => { setUser(null); localStorage.removeItem("userProfile"); go("home"); };

  return (
    <div className={`min-h-screen font-body ${dark ? 'bg-stone-900 text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      <header className="sticky top-0 z-40 border-b-4 border-orange-500 shadow-lg" style={{ backgroundColor: "#0A1931" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button onClick={() => go("home")} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center font-black text-lg rounded-md shadow group-hover:rotate-3 transition">AS</div>
            <div className="text-left">
              <div className="font-display font-black text-lg leading-none tracking-tight text-white">{CFG.brand}</div>
              <div className="text-[10px] text-orange-300 uppercase tracking-widest">BuildMart</div>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 border border-white/20 rounded-full p-1 bg-white/5">
              {["EN","HI","TE"].map(l => (
                <button key={l} onClick={() => setLang(l)} className={`text-xs font-bold px-2 py-1 rounded-full transition ${lang===l?'bg-orange-500 text-white':'text-white/70 hover:bg-white/10'}`}>{l}</button>
              ))}
            </div>
            <button onClick={() => go("cart")} className="relative p-2 hover:bg-white/10 rounded-full text-white">
              <ShoppingCart size={20} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">{cart.reduce((s,x)=>s+x.q,0)}</span>}
            </button>
            <button onClick={() => go("orders")} className="p-2 hover:bg-white/10 rounded-full text-white hidden sm:inline-flex"><ClipboardList size={20} /></button>
            {user ? (
              <button onClick={logout} className="hidden md:flex items-center gap-1 text-sm bg-orange-500 text-white px-3 py-1.5 rounded-full"><LogOut size={14} /> {user.name?.split(' ')[0] || user.mobile}</button>
            ) : (
              <button onClick={() => go("login")} className="hidden md:flex items-center gap-1 text-sm bg-orange-500 text-white px-3 py-1.5 rounded-full"><User size={14} /> {t.login}</button>
            )}
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="relative z-50 p-2 hover:bg-white/10 rounded-full text-white">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 border-stone-200 overflow-hidden z-50">
                    <MenuItem icon={RefreshCw} color="text-blue-600" label="Refresh App" onClick={() => { setMenuOpen(false); window.location.reload(); }} />
                    <MenuItem icon={FileText} color="text-emerald-600" label="GST Bill / Invoice Maker" badge="Multi-Item" onClick={() => { setMenuOpen(false); go("admin"); }} />
                    {user ? (
                      <MenuItem icon={LogOut} color="text-red-600" label={`Logout (${user.name?.split(' ')[0] || user.mobile})`} onClick={() => { setMenuOpen(false); logout(); }} />
                    ) : (
                      <MenuItem icon={User} color="text-orange-600" label="Login (Mobile OTP)" onClick={() => { setMenuOpen(false); go("login"); }} />
                    )}
                    <MenuItem icon={Shield} color="text-orange-600" label="Admin Panel" badge="PIN 6301" onClick={() => { setMenuOpen(false); go("admin"); }} />
                    <MenuItem icon={Truck} color="text-blue-600" label="Live Delivery Tracking" onClick={() => { setMenuOpen(false); go("tracker"); }} />
                    <MenuItem icon={BookOpen} color="text-amber-600" label="Wholesale Khata & Reminders" onClick={() => { setMenuOpen(false); go("khata"); }} />
                    <MenuItem icon={Award} color="text-amber-600" label="Mistri Loyalty" onClick={() => { setMenuOpen(false); go("loyalty"); }} />
                    <MenuItem icon={CreditCard} color="text-emerald-600" label="EMI Calculator" onClick={() => { setMenuOpen(false); go("emi"); }} />
                    <MenuItem icon={dark?Sun:Moon} color="text-indigo-600" label={dark?"Light Mode":"Dark Mode"} onClick={() => { setDark(!dark); setMenuOpen(false); }} />
                    <a href={`https://wa.me/${CFG.wa}?text=Customer%20Care`} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 text-left border-t border-stone-100">
                      <Headphones size={16} className="text-green-600" />
                      <span className="text-sm font-bold text-stone-900">Customer Support</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Gold Ticker */}
      <div style={{
        background: 'linear-gradient(90deg, #b8860b 0%, #ffd700 25%, #fff1a8 50%, #ffd700 75%, #b8860b 100%)',
        color: '#071126',
        fontWeight: '800',
        fontSize: '12px',
        padding: '9px 0',
        letterSpacing: '0.6px',
        textTransform: 'uppercase',
        boxShadow: '0 2px 10px rgba(0,0,0,0.35)',
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}>
        <marquee scrollamount="6">{t.tick}</marquee>
      </div>

      {lowStock.length > 0 && screen === "home" && (
        <div className="bg-red-50 border-b-2 border-red-500 py-2">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 text-xs sm:text-sm font-bold text-red-700">
            <AlertTriangle size={16} className="animate-pulse flex-shrink-0" />
            <span>{t.low}: {lowStock.map(p=>p.n).join(", ")}</span>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 pb-28 pt-4">
        {screen === "home" && (
          <HomeScreen 
            t={t} lang={lang} setScreen={go} CARDS={CARDS} 
            query={query} doSearch={doSearch} category={category} 
            setCategory={setCategory} filtered={filtered} addToCart={addToCart} 
            heroImg={heroImg} heroTxt={heroTxt} workers={workers} 
            products={products}
          />
        )}
        {screen === "catalog" && <CatalogScreen t={t} query={query} doSearch={doSearch} category={category} setCategory={setCategory} filtered={filtered} addToCart={addToCart} />}
        {screen === "cart" && <CartScreen t={t} cart={cart} updateQty={updateQty} removeItem={removeItem} total={cartTotal} onCheckout={placeOrder} upi={upi} user={user} />}
        {screen === "orders" && <OrdersScreen t={t} orders={orders} setOrders={setOrders} upi={upi} bankInfo={bankInfo} />}
        {screen === "tracker" && <TrackerScreen t={t} orders={orders} />}
        {screen === "khata" && <KhataScreen t={t} ledger={ledger} setLedger={setLedger} upi={upi} bankInfo={bankInfo} />}
        {screen === "estimator" && <EstimatorScreen t={t} />}
        {screen === "login" && <LoginScreen t={t} onLogin={(u)=>{setUser(u); ls.set("userProfile", u); go("home");}} />}
        {screen === "admin" && (
          <AdminScreen 
            t={t} unlocked={adminUnlocked} setUnlocked={setAdminUnlocked} 
            upi={upi} saveUpi={saveUpi} downloadZip={downloadZip} 
            orders={orders} setOrders={setOrders} 
            products={products} setProducts={setProducts} 
            workers={workers} setWorkers={setWorkers} 
            setHeroImg={setHeroImg} setHeroTxt={setHeroTxt} 
            heroImg={heroImg} heroTxt={heroTxt}
            invoices={invoices} setInvoices={setInvoices}
            ledger={ledger} setLedger={setLedger}
            bankInfo={bankInfo} setBankInfo={setBankInfo}
          />
        )}
        {screen === "gallery" && <GalleryScreen gallery={gallery} setGallery={setGallery} />}
        {screen === "loyalty" && <LoyaltyScreen orders={orders} user={user} />}
        {screen === "emi" && <EmiScreen />}
      </main>

      {/* Floating Back Button */}
      {screen !== "home" && (
        <div className="fixed bottom-5 left-4 z-50">
          <button 
            onClick={back} 
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black px-5 py-3 rounded-full shadow-2xl border-2 border-white/60 text-sm transition-transform hover:scale-105 active:scale-95"
            style={{ boxShadow: '0 8px 25px rgba(234, 88, 12, 0.55)' }}
          >
            <ArrowLeft size={18} />
            <span>← Back to Home</span>
          </button>
        </div>
      )}

      {/* Float Buttons */}
      <div className="fixed bottom-5 right-4 flex flex-col gap-3 z-50">
        <a href={`https://wa.me/${CFG.wa}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-xl font-bold transition-transform hover:scale-105">
          <MessageCircle size={20} /> <span className="hidden sm:inline">WhatsApp</span>
        </a>
        <a href={`tel:${CFG.phone.replace(/\s/g,'')}`} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-full shadow-xl font-bold transition-transform hover:scale-105">
          <Phone size={20} /> <span className="hidden sm:inline">Call</span>
        </a>
      </div>

      <footer className="border-t-4 border-orange-500 py-6 mt-8" style={{ backgroundColor: "#0A1931" }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <div className="font-bold">© 2026 {CFG.brand}. All rights reserved. Hyderabad, Telangana.</div>
          <div className="flex gap-4">
            <button onClick={() => go("admin")} className="flex items-center gap-1 hover:text-orange-400"><Shield size={12} /> {t.admin}</button>
            <a href={`tel:${CFG.phone.replace(/\s/g,'')}`} className="hover:text-orange-400">{CFG.phone}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const MenuItem = ({ icon: Icon, color, label, badge, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-100 text-left border-b border-stone-100">
    <Icon size={16} className={color} />
    <span className="text-sm font-bold text-stone-900 flex-1">{label}</span>
    {badge && <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{badge}</span>}
  </button>
);

function VoiceMic({ onResult, lang }) {
  const [listening, setListening] = useState(false);
  const start = () => {
    try {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) { alert("Voice search not supported."); return; }
      const rec = new SR();
      rec.lang = lang === "HI" ? "hi-IN" : lang === "TE" ? "te-IN" : "en-IN";
      rec.onresult = (e) => { onResult(e.results[0][0].transcript); setListening(false); };
      rec.onerror = () => setListening(false);
      rec.onend = () => setListening(false);
      rec.start(); setListening(true);
    } catch (e) { setListening(false); }
  };
  return (
    <button onClick={start} className={`p-2 rounded-full transition ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-orange-100 text-orange-600'}`} title="Voice Search">
      <Mic size={18} />
    </button>
  );
}

function SmartGradeSelector({ products, addToCart }) {
  const [useCase, setUseCase] = useState("slab");
  const recommendations = useMemo(() => {
    if (useCase === "slab") {
      return {
        title: "छत ढलाई (Roof & Slab Casting)",
        desc: "छत के लिए अल्ट्राटेक 53 ग्रेड और सरिया सबसे सही रहता है।",
        cement: products.find(p => p.n.includes("OPC 53") || p.b.includes("UltraTech")) || products[4],
        steel: products.find(p => p.n.includes("10 MM") || p.n.includes("12 MM")) || products[1]
      };
    } else if (useCase === "pillar") {
      return {
        title: "पिलर और बीम (Pillars & Beams)",
        desc: "मजबूत पिलर के लिए 12mm और 16mm का भारी सरिया इस्तेमाल करें।",
        cement: products.find(p => p.n.includes("53 Grade")) || products[4],
        steel: products.find(p => p.n.includes("16 MM") || p.n.includes("12 MM")) || products[2]
      };
    } else {
      return {
        title: "ईंट चुनाई और प्लास्टर (Brickwork & Plaster)",
        desc: "प्लास्टर में दरार न आए इसलिए PPC सीमेंट और महीन रेत सबसे उत्तम है।",
        cement: products.find(p => p.n.includes("PPC") || p.b.includes("Ambuja")) || products[5],
        steel: products.find(p => p.cat === "brick") || products[8]
      };
    }
  }, [useCase, products]);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2"><Compass className="text-amber-400" size={20} /><h3 className="font-bold text-sm sm:text-base">Smart Grade Guide (सही मटीरियल गाइड)</h3></div>
        <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">Auto Advice</span>
      </div>
      <p className="text-xs text-slate-300">साइट के काम के हिसाब से तुरंत सही माल और रेट चुनें:</p>
      <div className="grid grid-cols-3 gap-2 pt-1">
        <button onClick={() => setUseCase("slab")} className={`py-2 px-1 text-xs font-bold rounded-xl transition border text-center ${useCase === "slab" ? "bg-amber-500 text-slate-950 border-amber-400 shadow" : "bg-white/5 border-white/10 text-white/80"}`}>🏠 छत ढलाई</button>
        <button onClick={() => setUseCase("pillar")} className={`py-2 px-1 text-xs font-bold rounded-xl transition border text-center ${useCase === "pillar" ? "bg-amber-500 text-slate-950 border-amber-400 shadow" : "bg-white/5 border-white/10 text-white/80"}`}>🏛️ पिलर/बीम</button>
        <button onClick={() => setUseCase("brickwork")} className={`py-2 px-1 text-xs font-bold rounded-xl transition border text-center ${useCase === "brickwork" ? "bg-amber-500 text-slate-950 border-amber-400 shadow" : "bg-white/5 border-white/10 text-white/80"}`}>🧱 चुनाई/प्लास्टर</button>
      </div>
      <div className="bg-white/10 rounded-xl p-3 border border-white/10 space-y-2 mt-2">
        <div className="text-xs font-bold text-amber-300">{recommendations.title}</div>
        <div className="text-[11px] text-slate-300">{recommendations.desc}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {recommendations.cement && (
            <div className="bg-slate-900/80 p-2.5 rounded-lg flex items-center justify-between border border-white/5">
              <div><div className="text-[10px] text-amber-400 uppercase font-bold">Cement</div><div className="text-xs font-bold truncate max-w-[140px]">{recommendations.cement.n}</div><div className="text-xs font-black text-white">₹{recommendations.cement.p}</div></div>
              <button onClick={() => addToCart(recommendations.cement)} className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg">+ Add</button>
            </div>
          )}
          {recommendations.steel && (
            <div className="bg-slate-900/80 p-2.5 rounded-lg flex items-center justify-between border border-white/5">
              <div><div className="text-[10px] text-amber-400 uppercase font-bold">Sariya</div><div className="text-xs font-bold truncate max-w-[140px]">{recommendations.steel.n}</div><div className="text-xs font-black text-white">₹{recommendations.steel.p}</div></div>
              <button onClick={() => addToCart(recommendations.steel)} className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg">+ Add</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ t, lang, setScreen, CARDS, query, doSearch, category, setCategory, filtered, addToCart, heroImg, heroTxt, workers, products }) {
  const CATS = [{k:"ALL",n:t.all},{k:"tmt",n:t.tmt},{k:"cement",n:t.cement},{k:"sand",n:t.sand},{k:"brick",n:t.brick},{k:"tools",n:t.tools}];
  return (
    <div className="space-y-4">
      <section style={{ position: 'relative', marginLeft: '-16px', marginRight: '-16px', width: 'calc(100% + 32px)', backgroundColor: '#020617', padding: '24px 16px 20px 16px', boxSizing: 'border-box', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${heroImg || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.22, filter: 'grayscale(60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,6,23,0.8) 0%, rgba(2,6,23,0.95) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', backgroundColor: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '999px', color: '#fbbf24', fontSize: '11px', fontWeight: '600', marginBottom: '10px' }}><span>⚡</span> Wholesale Construction Hub • Hyderabad & Secunderabad</div>
          <div style={{ lineHeight: '1', marginBottom: '4px' }}>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#f59e0b', letterSpacing: '-0.5px' }}>AS</div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase' }}>ENTERPRISES</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0 10px 0' }}>
            <div style={{ width: '28px', height: '3px', backgroundColor: '#f59e0b', borderRadius: '2px' }} />
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1px', color: '#94a3b8', textTransform: 'uppercase' }}>GENUINE MATERIALS & DIRECT BILLING</span>
          </div>
          <div style={{ margin: '6px 0 8px 0' }}>
            <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '28px', color: '#ffffff', lineHeight: '1.2' }}>{heroTxt ? heroTxt.split(".")[0] : "Build Stronger."}</div>
            <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '28px', color: '#ffffff', lineHeight: '1.2' }}>{heroTxt && heroTxt.split(".")[1] ? heroTxt.split(".")[1] : "Order Smarter."}</div>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.4', margin: '0 0 12px 0' }}>Direct wholesale supply of Tata/JSW Sariya, UltraTech/Ambuja Cement, River Sand & Bricks with GST Invoice.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => setScreen("catalog")} style={{ width: '100%', padding: '12px', backgroundColor: '#f59e0b', color: '#0f172a', fontWeight: '800', fontSize: '14px', borderRadius: '8px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>Browse Products & Rates →</button>
            <button onClick={() => setScreen("estimator")} style={{ width: '100%', padding: '11px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#f8fafc', border: '1px solid #334155', fontWeight: '600', fontSize: '13px', borderRadius: '8px', cursor: 'pointer' }}>Calculate Material Estimate</button>
          </div>
        </div>
      </section>

      <SmartGradeSelector products={products} addToCart={addToCart} />

      <section className="bg-white border-2 border-stone-900 rounded-full py-1.5 px-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Search size={16} className="text-stone-500 flex-shrink-0" />
          <input value={query} onChange={(e) => doSearch(e.target.value)} placeholder={t.search} className="flex-1 bg-transparent outline-none text-sm placeholder:text-stone-400 py-1" />
          <VoiceMic onResult={doSearch} lang={lang} />
          {query && <button onClick={() => doSearch("")} className="text-xs text-stone-500 hover:text-red-600 flex-shrink-0">✕</button>}
        </div>
      </section>

      <section className="grid grid-cols-4 gap-2">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <button key={c.go} onClick={() => setScreen(c.go)} className={`${c.color} text-white p-2.5 rounded-xl text-left font-bold shadow hover:shadow-lg transition-all hover:-translate-y-1 group`}>
              <Icon size={18} className="mb-1 opacity-90 group-hover:scale-110 transition" />
              <div className="text-[11px] sm:text-xs leading-tight">{c.t}</div>
            </button>
          );
        })}
      </section>

      <section className="flex flex-wrap gap-1.5">
        {CATS.map(c => <button key={c.k} onClick={() => setCategory(c.k)} className={`text-xs font-bold px-3 py-1 rounded-full transition ${category===c.k?'bg-orange-500 text-white':'bg-white border-2 border-stone-300 text-stone-700'}`}>{c.n}</button>)}
      </section>

      <WorkersSection workers={workers} />
      <ProductGrid t={t} filtered={filtered} addToCart={addToCart} />
    </div>
  );
}

function WorkersSection({ workers }) {
  return (
    <section className="space-y-2 pt-2">
      <div className="flex items-center justify-between"><h3 className="font-display font-black text-lg" style={{ color: "#0A1931" }}>Hire Skilled Workers</h3><span className="text-[10px] uppercase tracking-widest text-orange-600 font-bold">Direct Booking · No Commission</span></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {workers.map(w => (
          <div key={w.id} className="bg-white border-2 border-stone-200 hover:border-orange-500 rounded-xl p-2.5 shadow-sm transition">
            <div className="flex items-center gap-2"><div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: "#0A1931" }}><span>{w.icon || "👷"}</span></div><div className="min-w-0 flex-1"><div className="text-[10px] uppercase tracking-widest text-orange-600 font-bold truncate">{w.role}</div><div className="font-bold text-xs truncate">{w.name}</div></div></div>
            <div className="flex items-baseline gap-1 mt-2"><span className="font-display font-black text-base">₹{w.rate}</span><span className="text-[10px] text-stone-500">/day · {w.exp}</span></div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              <a href={`tel:+${w.phone}`} className="bg-orange-500 text-white text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1"><Phone size={11} /> Call</a>
              <a href={`https://wa.me/${w.phone}?text=Hi`} target="_blank" rel="noreferrer" className="bg-green-600 text-white text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1"><MessageCircle size={11} /> WhatsApp</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductGrid({ t, filtered, addToCart }) {
  if (filtered.length === 0) return <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-8 text-center font-bold text-stone-900">{t.noResults}</div>;
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {filtered.map(p => (
        <div key={p.id} className="bg-white border-2 border-stone-200 hover:border-orange-500 rounded-xl overflow-hidden shadow-sm transition flex flex-col justify-between">
          <div>
            <div className="h-32 bg-stone-100 overflow-hidden relative flex items-center justify-center">
              {p.img ? <img src={p.img} alt="" className="w-full h-full object-cover" /> : <div className="text-center p-2"><ImageIcon size={32} className="mx-auto text-stone-300 mb-1" /><span className="text-[10px] font-bold uppercase text-stone-400">{p.b}</span></div>}
              {p.stock <= 0 ? <span className="absolute top-1.5 right-1.5 bg-stone-800 text-white text-[9px] font-black px-2 py-0.5 rounded-full">Out of Stock</span> : p.stock < 10 ? <span className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-pulse">{t.low}</span> : null}
            </div>
            <div className="p-2 space-y-1">
              <div className="text-[9px] uppercase tracking-widest text-orange-600 font-bold">{p.b}</div>
              <div className="font-bold text-xs leading-tight line-clamp-2 h-8 text-stone-900">{p.n}</div>
              <div className="flex items-center justify-between"><div className="text-xs font-bold text-amber-500">★ 4.8</div><span className="text-[9px] text-stone-500">{p.stock > 0 ? `${p.stock} उपलब्ध` : 'कॉल करें'}</span></div>
              <div className="flex items-baseline gap-1"><span className="font-display font-black text-base text-stone-900">₹{p.p}</span><span className="text-[9px] text-stone-500">{p.u}</span></div>
            </div>
          </div>
          <div className="p-2 pt-0"><button onClick={() => addToCart(p)} disabled={p.stock <= 0} className={`w-full text-[11px] font-bold py-1.5 rounded-full transition ${p.stock <= 0 ? 'bg-stone-300 text-stone-500' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}>{p.stock <= 0 ? 'Out of Stock' : `+ ${t.buy}`}</button></div>
        </div>
      ))}
    </section>
  );
}

function CatalogScreen({ t, query, doSearch, category, setCategory, filtered, addToCart }) {
  const CATS = [{k:"ALL",n:t.all},{k:"tmt",n:t.tmt},{k:"cement",n:t.cement},{k:"sand",n:t.sand},{k:"brick",n:t.brick},{k:"tools",n:t.tools}];
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.g}</h2>
      <div className="bg-white border-2 border-stone-900 rounded-2xl p-4 flex items-center gap-2"><Search size={20} className="text-stone-500" /><input value={query} onChange={(e)=>doSearch(e.target.value)} placeholder={t.search} className="flex-1 bg-transparent outline-none" /></div>
      <div className="flex flex-wrap gap-2">{CATS.map(c => <button key={c.k} onClick={() => setCategory(c.k)} className={`text-sm font-bold px-4 py-2 rounded-full transition ${category===c.k?'bg-orange-500 text-white':'bg-white border-2 border-stone-300 text-stone-700'}`}>{c.n}</button>)}</div>
      <ProductGrid t={t} filtered={filtered} addToCart={addToCart} />
    </div>
  );
}

function CartScreen({ t, cart, updateQty, removeItem, total, onCheckout, upi, user }) {
  const [address, setAddress] = useState(user?.address || "");
  const [payment, setPayment] = useState("COD");
  const [termsAgreed, setTermsAgreed] = useState(true);
  if (cart.length === 0) return <div className="bg-white border-2 border-stone-200 rounded-2xl p-12 text-center text-stone-500 font-bold">{t.empty}</div>;
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.cart}</h2>
      <div className="space-y-3">
        {cart.map(item => (
          <div key={item.id} className="bg-white border-2 border-stone-200 rounded-2xl p-3 flex items-center gap-3">
            {item.img ? <img src={item.img} alt="" className="w-16 h-16 object-cover rounded-lg" /> : <div className="w-16 h-16 bg-stone-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-stone-400">{item.b}</div>}
            <div className="flex-1 min-w-0"><div className="text-[10px] uppercase text-orange-600 font-bold">{item.b}</div><div className="font-bold text-sm truncate">{item.n}</div><div className="text-xs text-stone-500">₹{item.p} {item.u}</div></div>
            <div className="flex items-center gap-1 border-2 border-stone-300 rounded-full"><button onClick={() => updateQty(item.id, -1)} className="p-1.5"><Minus size={14} /></button><span className="font-bold w-6 text-center text-sm">{item.q}</span><button onClick={() => updateQty(item.id, 1)} className="p-1.5"><Plus size={14} /></button></div>
            <button onClick={() => removeItem(item.id)} className="p-2 text-red-500"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-4 space-y-3">
        <label className="block"><span className="text-xs font-bold uppercase text-stone-500">{t.address}</span><textarea value={address} onChange={(e)=>setAddress(e.target.value)} rows={2} className="w-full mt-1 border-2 rounded-lg p-2 outline-none" placeholder="Delivery Address" /></label>
        <div className="grid grid-cols-2 gap-2"><button onClick={()=>setPayment("COD")} className={`p-3 rounded-xl border-2 font-bold text-sm ${payment==="COD"?'border-orange-500 bg-orange-500 text-white':'bg-white'}`}>{t.cod}</button><button onClick={()=>setPayment("UPI")} className={`p-3 rounded-xl border-2 font-bold text-sm ${payment==="UPI"?'border-orange-500 bg-orange-500 text-white':'bg-white'}`}>{t.upi}</button></div>
        {payment === "UPI" && (<div className="bg-stone-50 border-2 border-dashed border-orange-500 rounded-xl p-4 flex flex-col items-center gap-2"><QRCodeSVG value={`upi://pay?pa=${upi}&pn=AS%20Enterprises&am=${total}&cu=INR`} size={180} /><div className="text-sm font-bold mt-1">Pay to: <span className="text-orange-600">{upi}</span></div></div>)}
        <div className="flex justify-between items-center pt-2 border-t"><span className="font-bold text-lg">{t.total}</span><span className="font-display font-black text-2xl">₹{total}</span></div>
        <button onClick={()=>{ if(!address.trim()){alert("Enter address"); return;} if(!termsAgreed){alert("Accept terms"); return;} onCheckout(payment, address); }} className="w-full bg-orange-500 text-white font-bold py-3 rounded-full">
          {t.confirm} · ₹{total}
        </button>
      </div>
    </div>
  );
}

function printTaxInvoiceDocument(inv, isChallan = false, currentBank = DEFAULT_BANK) {
  const taxable = parseFloat(inv.taxable || inv.total || 0);
  const discount = parseFloat(inv.discount || 0);
  const freight = parseFloat(inv.freight || 0);
  const adjustedTaxable = Math.max(0, taxable - discount);
  const gst = parseFloat(inv.gst || (adjustedTaxable * 0.18));
  const grand = Math.round(adjustedTaxable + gst + freight);
  const cgst = (gst / 2).toFixed(2);
  const sgst = (gst / 2).toFixed(2);
  const bank = inv.bankSnapshot || currentBank;

  const html = `<!doctype html><html><head><meta charset="utf-8"/><title>${isChallan ? 'Challan' : 'Invoice'} - ${inv.id}</title><style>body { font-family: Arial, sans-serif; padding: 20px; color: #111; max-width: 800px; margin: auto; } .header { border-bottom: 3px solid #ea580c; padding-bottom: 10px; display: flex; justify-content: space-between; } table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; } th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; } th { background: #0A1931; color: #fff; } .text-right { text-align: right; }</style></head><body>
  <div class="header"><div><h1 style="margin:0; color:#0A1931;">AS ENTERPRISES</h1><div>Wholesale Building Materials Supply</div><div>GSTIN: ${CFG.gstin} · Ph: ${CFG.phone}</div></div><div style="text-align:right;"><strong>${isChallan ? 'DELIVERY CHALLAN' : 'TAX INVOICE'}</strong><br/>No: ${inv.id}<br/>Date: ${new Date(inv.date).toLocaleDateString('en-IN')}</div></div>
  <p><strong>Billed To:</strong> ${inv.customer} (Ph: ${inv.phone})<br/><strong>Site:</strong> ${inv.address} | <strong>Vehicle:</strong> ${inv.vehicle}</p>
  <table><thead><tr><th>S.No</th><th>Material Description</th><th class="text-right">Qty</th>${!isChallan ? '<th class="text-right">Rate</th><th class="text-right">Amount</th>' : ''}</tr></thead>
  <tbody>${inv.items.map((it, i)=>`<tr><td>${i+1}</td><td>${it.n}</td><td class="text-right"><strong>${it.q} ${it.u}</strong></td>${!isChallan ? `<td class="text-right">₹${it.p}</td><td class="text-right">₹${it.q*it.p}</td>` : ''}</tr>`).join('')}
  ${!isChallan ? `<tr style="font-weight:bold;"><td colspan="4" class="text-right">Subtotal</td><td class="text-right">₹${taxable.toFixed(2)}</td></tr><tr><td colspan="4" class="text-right">GST (18%)</td><td class="text-right">₹${gst.toFixed(2)}</td></tr>${freight>0?`<tr><td colspan="4" class="text-right" style="color:#ea580c;">Freight (भाड़ा)</td><td class="text-right" style="color:#ea580c;">+₹${freight.toFixed(2)}</td></tr>`:''}<tr style="font-size:15px; color:#ea580c; font-weight:900;"><td colspan="4" class="text-right">GRAND TOTAL</td><td class="text-right">₹${grand}.00</td></tr>` : ''}
  </tbody></table>
  ${!isChallan ? `<div style="margin-top:15px; font-size:12px; background:#f8fafc; padding:10px; border:1px solid #cbd5e1;">Bank: <b>${bank.bankName}</b> | A/c: <b>${bank.accNo}</b> | IFSC: <b>${bank.ifsc}</b> | UPI: <b>${getUPI()}</b></div>` : ''}
  <div style="margin-top:30px; display:flex; justify-content:space-between; font-size:12px;"><div>Receiver Sign</div><div style="text-align:right;">For <b>AS ENTERPRISES</b><br/><br/>Authorized Signatory</div></div>
  </body></html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (win) win.focus();
}

function printCustomerStatement(customerName, entries) {
  const custEntries = entries.filter(e => e.customer.toLowerCase().trim() === customerName.toLowerCase().trim());
  const balance = custEntries.reduce((s, l) => s + (l.type === 'credit' ? l.amt : -l.amt), 0);
  const html = `<!doctype html><html><head><meta charset="utf-8"/><title>Khata - ${customerName}</title><style>body { font-family: Arial; padding: 20px; max-width:800px; margin:auto; } table { width:100%; border-collapse:collapse; margin-top:15px; font-size:13px; } th,td { border:1px solid #cbd5e1; padding:8px; text-align:left; } th { background:#0A1931; color:#fff; }</style></head><body>
  <h2>AS ENTERPRISES - Khata Statement: ${customerName}</h2>
  <table><thead><tr><th>Date</th><th>Note</th><th style="text-align:right;">Debit (जमा)</th><th style="text-align:right;">Credit (उधारी)</th></tr></thead>
  <tbody>${custEntries.map(e=>`<tr><td>${new Date(e.date).toLocaleDateString()}</td><td>${e.note||''}</td><td style="text-align:right; color:#16a34a;">${e.type==='debit'?'₹'+e.amt:'-'}</td><td style="text-align:right; color:#dc2626;">${e.type==='credit'?'₹'+e.amt:'-'}</td></tr>`).join('')}</tbody></table>
  <h3>Closing Balance: ₹${Math.abs(balance)} ${balance>=0?'(Due to Receive)':'(Advance)'}</h3></body></html>`;
  const win = window.open(URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' })), '_blank');
  if (win) win.focus();
}

function OrdersScreen({ t, orders, setOrders, upi, bankInfo }) {
  if (orders.length === 0) return <div className="bg-white border-2 border-stone-200 rounded-2xl p-12 text-center text-stone-500 font-bold">{t.noord}</div>;
  const shareWA = (o) => {
    const gst = Math.round(o.total * 0.18);
    const grand = o.total + gst;
    const msg = `*AS ENTERPRISES - TAX INVOICE*%0AInvoice: ${o.id}%0ACustomer: ${o.user}%0A${o.items.map(i=>`• ${i.n} x ${i.q} = Rs.${i.p*i.q}`).join('%0A')}%0ASubtotal: Rs.${o.total}%0AGST (18%): Rs.${gst}%0A*Grand Total: Rs.${grand}*`;
    window.open(`https://wa.me/${CFG.wa}?text=${msg}`, "_blank");
  };
  return (
    <div className="space-y-4">
      <h2 className="font-display font-black text-3xl">{t.orders}</h2>
      {orders.map(o => (
        <div key={o.id} className="bg-white border-2 border-stone-200 rounded-2xl p-4">
          <div className="flex justify-between font-bold text-sm"><span>{o.id} - {o.user}</span><span>₹{o.total}</span></div>
          <div className="text-xs text-stone-600 mt-1">{o.address}</div>
          <button onClick={() => printTaxInvoiceDocument(o, false, bankInfo)} className="mt-3 bg-stone-900 text-white text-xs font-bold py-2 px-4 rounded-full">Print Tax Invoice</button>
        </div>
      ))}
    </div>
  );
}

function TrackerScreen({ t }) {
  const [loc, setLoc] = useState(null);
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">Live Delivery GPS Tracker</h2>
      <button onClick={() => { if(navigator.geolocation) navigator.geolocation.getCurrentPosition(p=>setLoc({lat:p.coords.latitude, lng:p.coords.longitude})); }} className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl text-xs">Fetch Current Driver GPS Location</button>
      {loc && <div className="p-3 bg-emerald-50 border rounded-xl text-xs">Lat: {loc.lat}, Lng: {loc.lng} <a href={`https://www.google.com/maps?q=${loc.lat},${loc.lng}`} target="_blank" rel="noreferrer" className="block text-blue-600 font-bold underline mt-1">Open in Google Maps</a></div>}
    </div>
  );
}

function KhataScreen({ t, ledger, setLedger, upi, bankInfo }) {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [amt, setAmt] = useState("");
  const [type, setType] = useState("credit");
  const [note, setNote] = useState("");
  const add = () => { if(!customer || !amt) return; setLedger([{ id: Date.now(), customer, phone, amt: parseFloat(amt), type, note, date: new Date().toISOString() }, ...ledger]); setCustomer(""); setPhone(""); setAmt(""); setNote(""); };
  const balance = ledger.reduce((s, l) => s + (l.type === 'credit' ? l.amt : -l.amt), 0);
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.khata}</h2>
      <div className={`p-6 rounded-2xl text-white shadow-lg ${balance>=0?'bg-emerald-700':'bg-red-700'}`}><div className="text-xs uppercase opacity-80">Net Balance</div><div className="font-display font-black text-4xl mt-1">₹{Math.abs(balance).toLocaleString()}</div></div>
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2"><input value={customer} onChange={e=>setCustomer(e.target.value)} placeholder="Customer Name" className="border-2 rounded-lg p-2 text-sm outline-none" /><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="WhatsApp Phone" className="border-2 rounded-lg p-2 text-sm outline-none" /><input value={amt} onChange={e=>setAmt(e.target.value)} type="number" placeholder="Amount" className="border-2 rounded-lg p-2 text-sm font-bold outline-none" /></div>
        <div className="grid grid-cols-2 gap-2"><button onClick={()=>setType("credit")} className={`p-2 rounded-lg border-2 font-bold text-sm ${type==="credit"?'bg-emerald-700 text-white':'bg-white'}`}>To Receive (उधारी)</button><button onClick={()=>setType("debit")} className={`p-2 rounded-lg border-2 font-bold text-sm ${type==="debit"?'bg-red-700 text-white':'bg-white'}`}>Received (जमा)</button></div>
        <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Note / Material" className="w-full border-2 rounded-lg p-2 text-sm outline-none" />
        <button onClick={add} className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-full">+ Add Entry</button>
      </div>
      <div className="space-y-2">{ledger.map(l => (<div key={l.id} className="bg-white border-2 rounded-xl p-3 flex justify-between items-center"><div><div className="font-bold text-sm">{l.customer}</div><div className="text-xs text-stone-500">{l.note}</div></div><div className="flex items-center gap-2"><span className={`font-black ${l.type==='credit'?'text-emerald-700':'text-red-700'}`}>{l.type==='credit'?'+':'-'}₹{l.amt}</span><button onClick={()=>printCustomerStatement(l.customer, ledger)} className="px-2 py-1 bg-stone-100 rounded text-xs font-bold">Statement</button><button onClick={()=>setLedger(ledger.filter(x=>x.id!==l.id))} className="text-red-500"><Trash2 size={14}/></button></div></div>))}</div>
    </div>
  );
}

function EstimatorScreen({ t }) {
  const [len, setLen] = useState(""); const [wid, setWid] = useState(""); const [ht, setHt] = useState("");
  const [res, setRes] = useState(null);
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.estimator}</h2>
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3"><input type="number" value={len} onChange={e=>setLen(e.target.value)} placeholder="Length (ft)" className="border-2 rounded-lg p-2" /><input type="number" value={wid} onChange={e=>setWid(e.target.value)} placeholder="Width (ft)" className="border-2 rounded-lg p-2" /><input type="number" value={ht} onChange={e=>setHt(e.target.value)} placeholder="Height (ft)" className="border-2 rounded-lg p-2" /></div>
        <button onClick={()=>{ const l=parseFloat(len)||0, w=parseFloat(wid)||0, h=parseFloat(ht)||0; if(l&&w&&h) setRes({cement:Math.ceil(l*w*0.4), tmt:(l*w*4/1000).toFixed(2), sand:Math.ceil(l*w*h*0.5), bricks:Math.ceil(l*w*55)}); }} className="w-full bg-orange-500 text-white font-bold py-3 rounded-full">Calculate</button>
      </div>
      {res && <div className="bg-amber-50 border-2 border-orange-500 rounded-2xl p-5 grid grid-cols-2 gap-3"><Stat label="Cement Bags" val={res.cement} /><Stat label="TMT Tons" val={res.tmt} /><Stat label="Sand CFT" val={res.sand} /><Stat label="Bricks" val={res.bricks} /></div>}
    </div>
  );
}
const Stat = ({ label, val }) => (<div className="bg-white rounded-xl p-3 border-2 border-orange-200"><div className="font-display font-black text-2xl">{val}</div><div className="text-xs text-stone-600 font-bold">{label}</div></div>);

function LoginScreen({ t, onLogin }) {
  const [mob, setMob] = useState("");
  return (
    <div className="max-w-md mx-auto"><div className="bg-white border-2 border-orange-500 rounded-2xl p-6 space-y-4"><h2 className="font-display font-black text-3xl">{t.welcome}</h2><input value={mob} onChange={e=>setMob(e.target.value)} placeholder="10-digit Mobile" maxLength={10} className="w-full border-2 rounded-lg p-3 text-lg font-bold tracking-widest" /><button onClick={()=>{if(mob.length===10) onLogin({mobile:mob, name:`Customer ${mob.slice(-4)}`}); else alert("Enter 10 digits");}} className="w-full bg-orange-500 text-white font-bold py-3 rounded-full">Login</button></div></div>
  );
}

function SignaturePad({ onSave }) {
  const cvs = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const pos = (e) => { const r = cvs.current.getBoundingClientRect(); return e.touches ? {x:e.touches[0].clientX-r.left, y:e.touches[0].clientY-r.top} : {x:e.clientX-r.left, y:e.clientY-r.top}; };
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs"><label className="font-bold text-stone-600">Customer Signature:</label><button type="button" onClick={()=>{cvs.current.getContext("2d").clearRect(0,0,300,90); onSave("");}} className="text-red-500">Clear</button></div>
      <canvas ref={cvs} width={300} height={90} onMouseDown={e=>{setDrawing(true); const p=pos(e); cvs.current.getContext("2d").beginPath(); cvs.current.getContext("2d").moveTo(p.x, p.y);}} onMouseMove={e=>{if(!drawing)return; const p=pos(e); cvs.current.getContext("2d").lineTo(p.x,p.y); cvs.current.getContext("2d").stroke();}} onMouseUp={()=>setDrawing(false)} onTouchStart={e=>{setDrawing(true); const p=pos(e); cvs.current.getContext("2d").beginPath(); cvs.current.getContext("2d").moveTo(p.x, p.y);}} onTouchMove={e=>{if(!drawing)return; const p=pos(e); cvs.current.getContext("2d").lineTo(p.x,p.y); cvs.current.getContext("2d").stroke();}} onTouchEnd={()=>setDrawing(false)} className="border-2 border-dashed rounded-lg bg-white w-full touch-none" />
    </div>
  );
}

function DayCloseReport({ invoices }) {
  const today = new Date().toLocaleDateString('en-IN');
  const todayInv = invoices.filter(i => new Date(i.date).toLocaleDateString('en-IN') === today);
  const sales = todayInv.reduce((s,x)=>s+(x.grand||0),0);
  const cash = todayInv.reduce((s,x)=>s+(x.paid||0),0);
  const due = todayInv.reduce((s,x)=>s+(x.due||0),0);
  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4 shadow-xl">
      <div className="flex justify-between border-b border-slate-700 pb-3"><div><h3 className="font-black text-lg text-amber-400">Daily Close Report</h3><p className="text-xs text-slate-400">Date: {today}</p></div><button onClick={()=>window.print()} className="bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded text-xs">Print</button></div>
      <div className="grid grid-cols-3 gap-3"><div className="bg-white/5 p-3 rounded-xl"><div className="text-[10px] text-slate-400 font-bold">Sales</div><div className="font-black text-xl">₹{sales}</div></div><div className="bg-emerald-950/60 p-3 rounded-xl"><div className="text-[10px] text-emerald-400 font-bold">Collected</div><div className="font-black text-xl text-emerald-300">₹{cash}</div></div><div className="bg-rose-950/60 p-3 rounded-xl"><div className="text-[10px] text-rose-400 font-bold">New Due</div><div className="font-black text-xl text-rose-300">₹{due}</div></div></div>
    </div>
  );
}

function AdminScreen({ 
  t, unlocked, setUnlocked, upi, saveUpi, downloadZip, 
  orders, setOrders, products, setProducts, 
  workers, setWorkers, setHeroImg, setHeroTxt, heroImg, heroTxt,
  invoices, setInvoices, ledger, setLedger,
  bankInfo, setBankInfo
}) {
  const [pin, setPin] = useState("");
  const [tab, setTab] = useState("invoice_maker");
  const [newUpi, setNewUpi] = useState(upi);
  const [newProd, setNewProd] = useState({ n:"", b:"", p:"", u:"प्रति किलो", cat:"tmt", stock:500, img:"", moq:10 });
  const [editBank, setEditBank] = useState({ ...bankInfo });

  const [invCust, setInvCust] = useState("");
  const [invPhone, setInvPhone] = useState("");
  const [invAddress, setInvAddress] = useState("");
  const [invVehicle, setInvVehicle] = useState("");
  const [invEway, setInvEway] = useState("");
  const [invDiscount, setInvDiscount] = useState("0");
  const [invFreight, setInvFreight] = useState("0");
  const [invPaid, setInvPaid] = useState("");
  const [kantaImg, setKantaImg] = useState("");
  const [signatureData, setSignatureData] = useState("");

  const [billItems, setBillItems] = useState([
    { n: products[0]?.n || "सरिया 12 MM (SAIL)", b: products[0]?.b || "SAIL", q: 50, p: products[0]?.p || 60, u: "किलो" }
  ]);

  if (!unlocked) return (
    <div className="max-w-md mx-auto"><div className="bg-white border-2 border-orange-500 rounded-2xl p-6 space-y-4 text-center"><Shield size={40} className="mx-auto text-orange-600" /><h2 className="font-display font-black text-2xl">{t.pinLbl}</h2><input type="password" value={pin} onChange={e=>setPin(e.target.value)} maxLength={4} className="w-full text-center text-2xl font-black tracking-widest border-2 rounded-lg p-3 outline-none" placeholder="••••" /><button onClick={()=>{ if(pin==="6301") setUnlocked(true); else alert("Wrong PIN (6301)"); }} className="w-full bg-orange-500 text-white font-bold py-3 rounded-full">Unlock Admin</button></div></div>
  );

  const syncToFirestore = async (newProds, newWrks, newBank) => {
    try { await setDoc(doc(db, "app_data", "main_store_v13"), { products: newProds || products, workers: newWrks || workers, bankInfo: newBank || bankInfo }, { merge: true }); } catch (e) {}
  };

  const handleProductImageUpload = async (productId, file) => {
    if (!file) return;
    const dataUrl = await fileToDataURL(file);
    const updated = products.map(x => x.id === productId ? { ...x, img: dataUrl } : x);
    setProducts(updated);
    await syncToFirestore(updated, workers, bankInfo);
    alert("Image updated!");
  };

  const addBillItem = () => setBillItems([...billItems, { n: products[0]?.n || "", b: products[0]?.b || "", q: 10, p: products[0]?.p || 0, u: "किलो" }]);
  const removeBillItem = (idx) => setBillItems(billItems.filter((_, i) => i !== idx));

  const customerPreviousDue = useMemo(() => {
    if (!invCust.trim()) return 0;
    const custLedger = ledger.filter(l => l.customer.toLowerCase().trim() === invCust.toLowerCase().trim());
    return custLedger.reduce((s, l) => s + (l.type === 'credit' ? l.amt : -l.amt), 0);
  }, [invCust, ledger]);

  const handleCreateInvoice = (actionType) => {
    if (!invCust.trim()) { alert("Enter customer name"); return; }
    const taxable = billItems.reduce((s, it) => s + (parseFloat(it.q) || 0) * (parseFloat(it.p) || 0), 0);
    const disc = parseFloat(invDiscount) || 0;
    const freight = parseFloat(invFreight) || 0;
    const adjTaxable = Math.max(0, taxable - disc);
    const gst = adjTaxable * 0.18;
    const currentBillGrand = Math.round(adjTaxable + gst + freight);
    const paidAmt = parseFloat(invPaid) || 0;
    const newDueThisBill = currentBillGrand - paidAmt;
    const totalPayableWithPrevious = currentBillGrand + (customerPreviousDue > 0 ? customerPreviousDue : 0);

    const newInv = {
      id: "INV-" + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      customer: invCust.trim(),
      phone: invPhone.trim(),
      address: invAddress.trim() || "Hyderabad Yard",
      vehicle: invVehicle.trim() || "Direct",
      ewayNo: invEway.trim(),
      items: billItems, taxable, discount: disc, freight, gst, grand: currentBillGrand, paid: paidAmt, due: newDueThisBill,
      previousDue: customerPreviousDue, totalPayable: totalPayableWithPrevious,
      kantaImg, signature: signatureData, bankSnapshot: { ...bankInfo }
    };

    setInvoices([newInv, ...invoices]);
    if (newDueThisBill > 0) {
      setLedger([{ id: Date.now(), customer: invCust.trim(), phone: invPhone.trim(), amt: newDueThisBill, type: 'credit', note: `Bill #${newInv.id} Due`, date: new Date().toISOString() }, ...ledger]);
    }

    if (actionType === "print") printTaxInvoiceDocument(newInv, false, bankInfo);
    else if (actionType === "challan") printTaxInvoiceDocument(newInv, true, bankInfo);
    else if (actionType === "wa") {
      if (!invPhone.trim()) { alert("Enter mobile number"); return; }
      const msg = `*AS ENTERPRISES - TAX INVOICE*\nInv: ${newInv.id}\nCustomer: ${newInv.customer}\n${billItems.map(i=>`• ${i.n}: ${i.q} ${i.u} = ₹${i.q*i.p}`).join('\n')}\nGST (18%): ₹${gst.toFixed(2)}\n${freight>0?`Freight (भाड़ा): ₹${freight}\n`:''}Current Bill: ₹${currentBillGrand}\n${customerPreviousDue > 0 ? `Previous Due: ₹${customerPreviousDue}\n*Total Payable: ₹${totalPayableWithPrevious}*\n` : ''}`;
      window.open(`https://wa.me/91${invPhone.replace(/\D/g,'').slice(-10)}?text=${encodeURIComponent(msg)}`, '_blank');
    }
  };

  const TABS = [
    { k:"invoice_maker", n:"📄 GST Bill Maker" },
    { k:"day_report", n:"📊 Day Report" },
    { k:"rates", n:"Inventory & Photos" },
    { k:"orders", n:"Orders" },
    { k:"workers", n:"Workers" },
    { k:"products", n:"Add Item" },
    { k:"settings", n:"Bank & Settings" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="font-display font-black text-3xl">{t.admin} Dashboard</h2><span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full mt-1">PIN: 6301</span></div>
        <button onClick={()=>{let m=`*RATES*\n`+products.map(p=>`• ${p.n}: ₹${p.p} ${p.u}`).join('\n'); window.open(`https://wa.me/?text=${encodeURIComponent(m)}`,'_blank');}} className="bg-green-600 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1"><Share2 size={15} /> Rate Sheet</button>
      </div>

      <div className="flex flex-wrap gap-2">{TABS.map(x => <button key={x.k} onClick={() => setTab(x.k)} className={`text-xs font-bold px-3 py-2 rounded-full transition ${tab===x.k?'bg-orange-500 text-white shadow':'bg-white border-2'}`}>{x.n}</button>)}</div>

      {tab === "day_report" && <DayCloseReport invoices={invoices} />}

      {tab === "invoice_maker" && (
        <div className="bg-white border-2 border-orange-500 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="border-b pb-3"><h3 className="font-display font-black text-xl text-stone-900">GST Invoice with Auto-Previous Due & WhatsApp PDF</h3></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="text-xs font-bold text-stone-600 block mb-1">Customer / Firm Name *</label><input type="text" value={invCust} onChange={e=>setInvCust(e.target.value)} placeholder="Ramesh Builders" className="w-full border-2 rounded-lg p-2.5 text-sm outline-none" /></div>
            <div><label className="text-xs font-bold text-stone-600 block mb-1">WhatsApp Number *</label><input type="tel" value={invPhone} onChange={e=>setInvPhone(e.target.value)} placeholder="10-digit mobile" className="w-full border-2 rounded-lg p-2.5 text-sm outline-none" /></div>
          </div>

          {customerPreviousDue !== 0 && (
            <div className={`p-3 rounded-xl border-2 text-xs font-bold flex justify-between items-center ${customerPreviousDue > 0 ? 'bg-red-50 border-red-400 text-red-800' : 'bg-emerald-50 border-emerald-400 text-emerald-800'}`}>
              <span>⚠️ Party Khata Status for "{invCust}":</span>
              <span className="text-sm font-black">₹{Math.abs(customerPreviousDue)} {customerPreviousDue > 0 ? 'Pending Due (उधारी बाकी)' : 'Advance Credit'}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><label className="text-xs font-bold text-stone-600 block mb-1">Delivery Address</label><input type="text" value={invAddress} onChange={e=>setInvAddress(e.target.value)} placeholder="Site location" className="w-full border-2 rounded-lg p-2 text-sm" /></div>
            <div><label className="text-xs font-bold text-stone-600 block mb-1">Vehicle No</label><input type="text" value={invVehicle} onChange={e=>setInvVehicle(e.target.value)} placeholder="TS 08 UB 1234" className="w-full border-2 rounded-lg p-2 text-sm" /></div>
            <div><label className="text-xs font-bold text-stone-600 block mb-1">E-Way Bill No (&gt; ₹50k)</label><input type="text" value={invEway} onChange={e=>setInvEway(e.target.value)} placeholder="Optional" className="w-full border-2 rounded-lg p-2 text-sm font-bold" /></div>
          </div>

          <div className="space-y-2 border rounded-xl p-3 bg-stone-50">
            <div className="flex justify-between items-center mb-1"><label className="text-xs font-black text-stone-700 uppercase">Materials on Bill</label><button type="button" onClick={addBillItem} className="bg-orange-500 text-white font-bold text-xs px-3 py-1 rounded-lg">+ Add Item</button></div>
            {billItems.map((item, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-lg border">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <div className="sm:col-span-6"><select value={item.n} onChange={e => {
                    const next = [...billItems];
                    next[idx].n = e.target.value;
                    const f = products.find(p => p.n === e.target.value);
                    if(f){ next[idx].p = f.p; next[idx].b = f.b; next[idx].u = f.u.includes("किलो")?"किलो":"बैग"; }
                    setBillItems(next);
                  }} className="w-full border rounded p-2 text-xs font-bold">{products.map(p => <option key={p.id} value={p.n}>{p.n} — ₹{p.p}</option>)}</select></div>
                  <div className="sm:col-span-3 flex items-center gap-1"><input type="number" value={item.q} onChange={e => {const next=[...billItems]; next[idx].q = parseFloat(e.target.value)||0; setBillItems(next);}} placeholder="वज़न" className="w-full border rounded p-1.5 text-xs font-black text-orange-600 text-center" /><span className="text-xs font-bold">{item.u}</span></div>
                  <div className="sm:col-span-2"><input type="number" value={item.p} onChange={e => {const next=[...billItems]; next[idx].p = parseFloat(e.target.value)||0; setBillItems(next);}} placeholder="Rate" className="w-full border rounded p-1.5 text-xs font-bold" /></div>
                  <div className="sm:col-span-1 flex justify-center">{billItems.length > 1 && <button onClick={() => removeBillItem(idx)} className="text-red-500"><Trash2 size={16}/></button>}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><label className="text-xs font-bold text-stone-600 block mb-1">Discount ₹</label><input type="number" value={invDiscount} onChange={e=>setInvDiscount(e.target.value)} className="w-full border-2 rounded-lg p-2 text-sm font-bold" /></div>
            <div><label className="text-xs font-bold text-orange-600 block mb-1">Freight (भाड़ा ₹)</label><input type="number" value={invFreight} onChange={e=>setInvFreight(e.target.value)} className="w-full border-2 border-orange-300 rounded-lg p-2 text-sm font-black bg-orange-50" /></div>
            <div><label className="text-xs font-bold text-stone-600 block mb-1">Paid / Advance ₹</label><input type="number" value={invPaid} onChange={e=>setInvPaid(e.target.value)} className="w-full border-2 rounded-lg p-2 text-sm font-bold" /></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-stone-50 border rounded-xl">
            <div><label className="text-xs font-bold text-stone-600 block mb-1">Weighbridge Slip</label><input type="file" accept="image/*" capture="environment" onChange={async(e)=>{if(e.target.files[0]) setKantaImg(await fileToDataURL(e.target.files[0]));}} className="w-full text-xs" /></div>
            <div><SignaturePad onSave={setSignatureData} /></div>
          </div>

          {(() => {
            const taxable = billItems.reduce((s, it) => s + (parseFloat(it.q) || 0) * (parseFloat(it.p) || 0), 0);
            const disc = parseFloat(invDiscount) || 0;
            const freight = parseFloat(invFreight) || 0;
            const adjTaxable = Math.max(0, taxable - disc);
            const gst = adjTaxable * 0.18;
            const grand = Math.round(adjTaxable + gst + freight);
            const paid = parseFloat(invPaid) || 0;
            const totalPayableAll = grand + (customerPreviousDue > 0 ? customerPreviousDue : 0);

            return (
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-3.5 text-xs space-y-1.5">
                <div className="flex justify-between text-stone-700"><span>Current Bill Subtotal (excl. GST):</span><span className="font-bold">₹{taxable.toFixed(2)}</span></div>
                <div className="flex justify-between text-stone-700"><span>GST Total (18%):</span><span className="font-bold">₹{gst.toFixed(2)}</span></div>
                {freight > 0 && <div className="flex justify-between text-orange-800 font-bold"><span>Freight (भाड़ा):</span><span>+₹{freight.toFixed(2)}</span></div>}
                <div className="flex justify-between text-sm font-black text-stone-900 pt-1 border-t"><span>Current Bill Grand Total:</span><span>₹{grand.toLocaleString('en-IN')}.00</span></div>
                {customerPreviousDue > 0 && (
                  <div className="flex justify-between text-red-700 font-bold bg-red-100 p-1.5 rounded">
                    <span>+ Previous Khata Due:</span>
                    <span>₹{customerPreviousDue.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {customerPreviousDue > 0 && (
                  <div className="flex justify-between text-base font-black text-red-900 pt-1 border-t border-red-200">
                    <span>TOTAL PAYABLE (Current + Old Due):</span>
                    <span>₹{totalPayableAll.toLocaleString('en-IN')}.00</span>
                  </div>
                )}
              </div>
            );
          })()}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            <button onClick={() => handleCreateInvoice("print")} className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow"><Printer size={15} /> Print Tax Invoice</button>
            <button onClick={() => handleCreateInvoice("challan")} className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow"><Truck size={15} /> Gate Pass / Challan</button>
            <button onClick={() => handleCreateInvoice("wa")} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow"><MessageCircle size={15} /> WhatsApp PDF Bill</button>
          </div>
        </div>
      )}

      {tab === "rates" && (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 space-y-3">
          <div className="text-xs uppercase font-bold text-orange-600">Inventory & Camera Photo Manager</div>
          <div className="space-y-3 max-h-[500px] overflow-auto">
            {products.map(p => (
              <div key={p.id} className="p-3 border rounded-xl space-y-2 bg-stone-50">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-stone-200 rounded-lg overflow-hidden flex items-center justify-center border">{p.img ? <img src={p.img} alt="" className="w-full h-full object-cover" /> : <span className="text-[9px] text-stone-400">No Img</span>}</div>
                  <div className="flex-1 min-w-0"><div className="text-xs font-bold truncate">{p.n}</div><label className="cursor-pointer inline-flex items-center gap-1 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded mt-1"><Camera size={12} /> Photo<input type="file" accept="image/*" capture="environment" onChange={(e) => handleProductImageUpload(p.id, e.target.files[0])} className="hidden" /></label></div>
                  <button onClick={()=>toggleVisibility(p.id)} className={`p-2 rounded text-xs font-bold ${p.visible !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200'}`}>{p.visible !== false ? <Eye size={14}/> : <EyeOff size={14}/>}</button>
                  <button onClick={()=>{setProducts(products.filter(x=>x.id!==p.id)); syncToFirestore(products.filter(x=>x.id!==p.id), workers, bankInfo);}} className="text-red-500 p-2"><Trash2 size={16}/></button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div><label className="text-[9px] font-bold text-stone-500">Rate ₹</label><input type="number" defaultValue={p.p} onChange={(e) => { p.p = parseFloat(e.target.value) || 0; }} className="w-full border rounded p-1 text-xs font-black bg-white" /></div>
                  <div><label className="text-[9px] font-bold text-stone-500">Stock</label><input type="number" defaultValue={p.stock} onChange={(e) => { p.stock = parseInt(e.target.value) || 0; }} className="w-full border rounded p-1 text-xs bg-white" /></div>
                </div>
                {p.stock < 10 && (
                  <button onClick={() => {
                    const supMsg = `*URGENT STOCK REORDER - AS ENTERPRISES*\nRespected Dealer,\nOur stock for *${p.n}* is critically low (${p.stock} left).\nPlease dispatch fresh stock to Hyderabad yard urgently.\nContact: ${CFG.phone}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(supMsg)}`, '_blank');
                  }} className="w-full bg-red-600 text-white text-[11px] font-bold py-1.5 rounded flex items-center justify-center gap-1">
                    <MessageCircle size={13} /> Order More from Supplier (Low Stock)
                  </button>
                )}
                <div className="text-right"><button onClick={()=>{setProducts([...products]); syncToFirestore(products, workers, bankInfo); alert("Saved!");}} className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded">Save Changes</button></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "orders" && <OrdersScreen t={t} orders={orders} setOrders={setOrders} upi={upi} bankInfo={bankInfo} />}
      {tab === "workers" && <div className="bg-white border-2 rounded-2xl p-4">Workers Section Active</div>}
      {tab === "products" && (
        <div className="bg-white border-2 rounded-2xl p-4 space-y-3">
          <div className="text-xs uppercase font-bold">Add Material</div>
          <input value={newProd.n} onChange={e=>setNewProd({...newProd, n:e.target.value})} placeholder="Name (सरिया 16 MM)" className="w-full border-2 rounded-lg p-2 text-sm" />
          <div className="grid grid-cols-2 gap-2"><input value={newProd.b} onChange={e=>setNewProd({...newProd, b:e.target.value})} placeholder="Brand" className="border-2 rounded-lg p-2 text-sm" /><input type="number" value={newProd.p} onChange={e=>setNewProd({...newProd, p:e.target.value})} placeholder="Price ₹" className="border-2 rounded-lg p-2 text-sm" /></div>
          <button onClick={()=>{if(newProd.n && newProd.p){setProducts([{...newProd, id:Date.now(), p:parseFloat(newProd.p), stock:500, visible:true}, ...products]); syncToFirestore([{...newProd, id:Date.now(), p:parseFloat(newProd.p), stock:500, visible:true}, ...products], workers, bankInfo); alert("Added!");}}} className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-full">+ Add</button>
        </div>
      )}
      {tab === "settings" && (
        <div className="space-y-4">
          <div className="bg-white border-2 rounded-2xl p-5 space-y-3">
            <div className="text-xs font-black uppercase">Bank Account Manager</div>
            <div className="grid grid-cols-2 gap-2"><input value={editBank.bankName} onChange={e=>setEditBank({...editBank, bankName:e.target.value})} placeholder="Bank Name" className="border rounded p-2 text-xs" /><input value={editBank.accNo} onChange={e=>setEditBank({...editBank, accNo:e.target.value})} placeholder="A/c No" className="border rounded p-2 text-xs" /></div>
            <button onClick={()=>{setBankInfo(editBank); syncToFirestore(products, workers, editBank); alert("Saved!");}} className="w-full bg-emerald-600 text-white font-bold py-2 rounded text-xs">Save Bank</button>
          </div>
          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-5 space-y-2">
            <div className="text-xs font-black text-emerald-800 uppercase">Excel Reports (.CSV)</div>
            <div className="grid grid-cols-2 gap-2"><button onClick={()=>{
              if(invoices.length===0){alert("No invoices"); return;}
              downloadCSV(`Sales.csv`, [["ID","Date","Customer","Grand Total"], ...invoices.map(i=>[i.id,i.date,i.customer,i.grand])]);
            }} className="bg-emerald-700 text-white font-bold py-2 rounded text-xs">Export Sales</button>
            <button onClick={()=>{
              if(ledger.length === 0){alert("No khata"); return;}
              downloadCSV(`Khata.csv`, [["ID","Date","Customer","Amount","Type"], ...ledger.map(l=>[l.id,l.date,l.customer,l.amt,l.type])]);
            }} className="bg-amber-700 text-white font-bold py-2 rounded text-xs">Export Khata</button></div>
          </div>
          <div className="b-red-50 border-2 border-red-500 rounded-2xl p-5"><button onClick={()=>{if(prompt("Enter PIN (6301) to reset:")==="6301"){setOrders([]); setInvoices([]); setLedger([]); alert("Reset done!");}}} className="w-full bg-red-600 text-white font-black py-2.5 rounded text-xs">Factory Reset Test Data</button></div>
        </div>
      )}
    </div>
  );
}

function GalleryScreen({ gallery, setGallery }) {
  return (<div className="space-y-4"><h2 className="font-display font-black text-3xl">Gallery</h2><input type="file" accept="image/*" multiple onChange={async(e)=>{if(e.target.files.length){const d=await Promise.all(Array.from(e.target.files).map(f=>fileToDataURL(f))); setGallery([...d.map((x,i)=>({id:Date.now()+i, img:x})), ...gallery]);}}} className="w-full border-2 p-2 rounded" /><div className="grid grid-cols-3 gap-2">{gallery.map(g=>(<div key={g.id} className="relative aspect-square border rounded"><img src={g.img} alt="" className="w-full h-full object-cover" /><button onClick={()=>setGallery(gallery.filter(x=>x.id!==g.id))} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"><Trash2 size={10}/></button></div>))}</div></div>);
}
function LoyaltyScreen({ orders }) {
  const pts = orders.reduce((s,o)=>s+(o.loyalty||0),0);
  return (<div className="space-y-4"><h2 className="font-display font-black text-3xl">Mistri Loyalty</h2><div className="bg-gradient-to-br from-amber-400 to-yellow-600 text-white rounded-2xl p-6 shadow"><div className="text-xs uppercase opacity-80">Total Points</div><div className="font-display font-black text-5xl mt-1">{pts}</div></div></div>);
}
function EmiScreen() {
  const [amt, setAmt] = useState("100000"); const [m, setM] = useState("6");
  const emi = Math.round((parseFloat(amt)||0) / (parseInt(m)||1));
  return (<div className="space-y-4"><h2 className="font-display font-black text-3xl">EMI Calculator</h2><div className="bg-white border-2 rounded-2xl p-5 space-y-3"><input type="number" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="Amount" className="w-full border-2 rounded p-3 font-bold text-lg" /><input type="number" value={m} onChange={e=>setM(e.target.value)} placeholder="Months" className="w-full border-2 rounded p-3" /></div><div className="bg-emerald-700 text-white rounded-2xl p-6"><div className="text-xs uppercase">Monthly EMI</div><div className="font-black text-4xl mt-1">₹{emi.toLocaleString()}</div></div></div>);
}
