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
  CheckCircle2, Compass, BarChart3, Share2, Building, Receipt
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

// ============= CONFIG =============
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

// ============= TRANSLATIONS =============
const T = {
  EN: { b:"Build Stronger. Order Smarter.", c:"Cart", s:"Same-Day Delivery", w:"Wholesale Khata", g:"Brand Catalog", f:"Free Estimate", zip:"Download ZIP Backup", home:"Home", search:"Search TMT, Cement, Sand, Bricks...", login:"Login", logout:"Logout", orders:"My Orders", admin:"Admin", call:"Call Now", wa:"WhatsApp", cart:"Cart", buy:"Add to Cart", total:"Total", checkout:"Place Order", address:"Delivery Address", cod:"Cash on Delivery", upi:"Pay via UPI", confirm:"Confirm Order", noResults:"No products found. Call 6301456725 for custom order.", tracker:"Live Order Tracker", khata:"Wholesale Khata", catalog:"Brand Catalog", estimator:"Estimate Calculator", welcome:"Welcome", mobile:"Mobile Number", otp:"Enter OTP", sendOtp:"Send OTP", verify:"Verify & Login", pinLbl:"Enter Admin PIN", changeUpi:"Change UPI ID", currentUpi:"Current UPI", saveUpi:"Save UPI", zipInfo:"If publish fails, upload this ZIP to netlify.com/drop", qty:"Qty", stock:"In Stock", cat:"Category", all:"All", tmt:"TMT Bars", cement:"Cement", sand:"Sand & Aggregate", brick:"Bricks", tools:"Tools", empty:"Cart is empty", noord:"No orders yet", ordid:"Order", status:"Status", pending:"Pending", scan:"Scan QR to Pay", payto:"Pay to", est:"Enter dimensions to estimate", len:"Length (ft)", wid:"Width (ft)", ht:"Height (ft)", need:"You need approx", bags:"bags of Cement", tons:"tons of TMT", cft:"cft of Sand", bricks:"Bricks (approx)", calc:"Calculate", ledger:"Ledger", customer:"Customer", amt:"Amount", add:"Add Entry", credit:"Credit", debit:"Debit", note:"Note", del:"Delete", eta:"ETA Today", driver:"Driver", low:"LOW STOCK", tick:"★ Same-Day Delivery Across Hyderabad • Wholesale Rates • Genuine Brands • Instant WhatsApp Estimates ★" },
  HI: { b:"मजबूत बनाएं। स्मार्ट ऑर्डर करें।", c:"टोकरी", s:"आज डिलीवरी", w:"थोक खाता", g:"ब्रांड कैटलॉग", f:"फ्री एस्टीमेट", zip:"ZIP डाउनलोड", home:"होम", search:"सरिया, सीमेंट, रेत, ईंट खोजें...", login:"लॉगिन", logout:"लॉगआउट", orders:"मेरे ऑर्डर", admin:"एडमिन", call:"कॉल करें", wa:"व्हाट्सएप", cart:"टोकरी", buy:"जोड़ें", total:"कुल", checkout:"ऑर्डर करें", address:"पता", cod:"कैश ऑन डिलीवरी", upi:"UPI से भुगतान", confirm:"पुष्टि करें", noResults:"कोई सामान नहीं मिला। 6301456725 पर कॉल करें।", tracker:"लाइव ऑर्डर ट्रैकर", khata:"थोक खाता", catalog:"ब्रांड कैटलॉग", estimator:"अनुमान कैलकुलेटर", welcome:"स्वागत है", mobile:"मोबाइल नंबर", otp:"OTP दर्ज करें", sendOtp:"OTP भेजें", verify:"वेरीफाई करें", pinLbl:"एडमिन PIN डालें", changeUpi:"UPI बदलें", currentUpi:"मौजूदा UPI", saveUpi:"UPI सेव करें", zipInfo:"पब्लिश फेल हो तो ZIP netlify.com/drop पर अपलोड करें", qty:"मात्रा", stock:"स्टॉक में", cat:"श्रेणी", all:"सभी", tmt:"सरिया", cement:"सीमेंट", sand:"रेत/गिट्टी", brick:"ईंट", tools:"औजार", empty:"टोकरी खाली", noord:"कोई ऑर्डर नहीं", ordid:"ऑर्डर", status:"स्थिति", pending:"लंबित", scan:"QR स्कैन करें", payto:"भुगतान", est:"माप डालें", len:"लंबाई (फीट)", wid:"चौड़ाई (फीट)", ht:"ऊंचाई (फीट)", need:"आपको चाहिए", bags:"सीमेंट बैग", tons:"टन सरिया", cft:"cft रेत", bricks:"ईंटें", calc:"गणना करें", ledger:"बही", customer:"ग्राहक", amt:"राशि", add:"जोड़ें", credit:"जमा", debit:"नाम", note:"नोट", del:"हटाएं", eta:"आज पहुंचेगा", driver:"ड्राइवर", low:"स्टॉक कम", tick:"★ हैदराबाद में आज ही डिलीवरी • थोक रेट • असली ब्रांड • इंस्टेंट व्हाट्सएप एस्टीमेट ★" },
  TE: { b:"బలంగా నిర్మించండి. తెలివిగా ఆర్డర్ చేయండి.", c:"బుట్ట", s:"ఈరోజే డెలివరీ", w:"హోల్‌సేల్ ఖాతా", g:"బ్రాండ్ కేటలాగ్", f:"ఉచిత అంచనా", zip:"ZIP డౌన్‌లోడ్", home:"హోమ్", search:"సరియా, సిమెంట్, ఇసుక, ఇటుకలు...", login:"లాగిన్", logout:"లాగౌట్", orders:"నా ఆర్డర్లు", admin:"అడ్మిన్", call:"కాల్ చేయండి", wa:"వాట్సాప్", cart:"బుట్ట", buy:"జోడించు", total:"మొత్తం", checkout:"ఆర్డర్ చేయండి", address:"చిరునామా", cod:"క్యాష్ ఆన్ డెలివరీ", upi:"UPI చెల్లింపు", confirm:"నిర్ధారించండి", noResults:"వస్తువులు లేవు. 6301456725 కు కాల్ చేయండి.", tracker:"లైవ్ ఆర్డర్ ట్రాకర్", khata:"హోల్‌సేల్ ఖాతా", catalog:"బ్రాండ్ కేటలాగ్", estimator:"అంచనా కాలిక్యులేటర్", welcome:"స్వాగతం", mobile:"మొబైల్ నంబర్", otp:"OTP నమోదు", sendOtp:"OTP పంపండి", verify:"వెరిఫై చేయండి", pinLbl:"అడ్మిన్ PIN", changeUpi:"UPI మార్చండి", currentUpi:"ప్రస్తుత UPI", saveUpi:"UPI సేవ్ చేయండి", zipInfo:"పబ్లిష్ ఫెయిల్ అయితే ZIP ని netlify.com/drop కు అప్‌లోడ్ చేయండి", qty:"పరిమాణం", stock:"స్టాక్‌లో", cat:"వర్గం", all:"అన్నీ", tmt:"సరియా", cement:"సిమెంట్", sand:"ఇసుక/కంకర", brick:"ఇటుకలు", tools:"పరికరాలు", empty:"బుట్ట ఖాళీ", noord:"ఆర్డర్లు లేవు", ordid:"ఆర్డర్", status:"స్థితి", pending:"పెండింగ్", scan:"QR స్కాన్ చేయండి", payto:"చెల్లింపు", est:"కొలతలు ఇవ్వండి", len:"పొడవు (అడుగు)", wid:"వెడల్పు (అడుగు)", ht:"ఎత్తు (అడుగు)", need:"కావాలి", bags:"సిమెంట్ బస్తాలు", tons:"టన్నుల సరియా", cft:"cft ఇసుక", bricks:"ఇటుకలు", calc:"లెక్కించండి", ledger:"లెడ్జర్", customer:"కస్టమర్", amt:"మొత్తం", add:"జోడించు", credit:"క్రెడిట్", debit:"డెబిట్", note:"నోట్", del:"తొలగించు", eta:"ఈరోజు", driver:"డ్రైవర్", low:"స్టాక్ తక్కువ", tick:"★ హైదరాబాద్‌లో ఈరోజే డెలివరీ • హోల్‌సేల్ రేట్లు • అసలైన బ్రాండ్ • తక్షణ వాట్సాప్ అంచనా ★" }
};

const MAP = { sariya:'tmt', saria:'tmt', steel:'tmt', rod:'tmt', tmt:'tmt', cement:'cement', simenti:'cement', ppc:'cement', opc:'cement', ret:'sand', balu:'sand', sand:'sand', isuka:'sand', metal:'sand', aggregate:'sand', gitti:'sand', brick:'brick', eent:'brick', itukalu:'brick', block:'brick', wire:'tools', tool:'tools' };

const DEFAULT_PRODUCTS = [
  { id:1, n:"TMT Bar Fe500 8mm", b:"Tata Tiscon", p:62, u:"per kg", cat:"tmt", stock:250, rating:4.7, visible:true, img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:2, n:"TMT Bar Fe500 10mm", b:"JSW Neosteel", p:61, u:"per kg", cat:"tmt", stock:180, rating:4.6, visible:true, img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:3, n:"TMT Bar Fe500 12mm", b:"SAIL", p:60, u:"per kg", cat:"tmt", stock:8, rating:4.5, visible:true, img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:4, n:"TMT Bar Fe500 16mm", b:"Kamdhenu", p:59, u:"per kg", cat:"tmt", stock:120, rating:4.4, visible:true, img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:5, n:"TMT Bar Fe550 20mm", b:"Tata Tiscon", p:63, u:"per kg", cat:"tmt", stock:90, rating:4.8, visible:true, img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:6, n:"OPC 53 Grade Cement", b:"UltraTech", p:410, u:"per bag (50kg)", cat:"cement", stock:320, rating:4.9, visible:true, img:"https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=400&q=70" },
  { id:7, n:"PPC Cement", b:"Ambuja", p:380, u:"per bag (50kg)", cat:"cement", stock:210, rating:4.7, visible:true, img:"https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=400&q=70" },
  { id:8, n:"PPC Cement", b:"ACC Gold", p:385, u:"per bag (50kg)", cat:"cement", stock:6, rating:4.6, visible:true, img:"https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=400&q=70" },
  { id:9, n:"White Cement", b:"JK White", p:850, u:"per bag (25kg)", cat:"cement", stock:45, rating:4.5, visible:true, img:"https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=400&q=70" },
  { id:10, n:"River Sand (Ret / Balu)", b:"Local", p:1800, u:"per ton", cat:"sand", stock:60, rating:4.3, visible:true, img:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=70" },
  { id:11, n:"M-Sand (Manufactured)", b:"Robo Silicon", p:1400, u:"per ton", cat:"sand", stock:80, rating:4.4, visible:true, img:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=70" },
  { id:12, n:"20mm Aggregate (Metal)", b:"Local", p:1200, u:"per ton", cat:"sand", stock:100, rating:4.2, visible:true, img:"https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=400&q=70" },
  { id:13, n:"12mm Aggregate", b:"Local", p:1250, u:"per ton", cat:"sand", stock:75, rating:4.3, visible:true, img:"https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=400&q=70" },
  { id:14, n:"Red Bricks Class A", b:"Local Kiln", p:9, u:"per piece", cat:"brick", stock:5000, rating:4.5, visible:true, img:"https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=400&q=70" },
  { id:15, n:"Fly Ash Bricks", b:"EcoBrick", p:7, u:"per piece", cat:"brick", stock:3200, rating:4.4, visible:true, img:"https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=400&q=70" },
  { id:16, n:"AAC Blocks 600x200x100", b:"Magicrete", p:65, u:"per piece", cat:"brick", stock:900, rating:4.7, visible:true, img:"https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=400&q=70" },
  { id:17, n:"Steel Binding Wire", b:"Tata Wiron", p:85, u:"per kg", cat:"tools", stock:150, rating:4.6, visible:true, img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70" },
  { id:18, n:"GI Wire 8 Gauge", b:"Bansal", p:95, u:"per kg", cat:"tools", stock:110, rating:4.5, visible:true, img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70" }
];

const DEFAULT_WORKERS = [
  { id:1, role:"Rajmistri (Mason)", name:"Ramesh Kumar", rate:850, phone:"916301456725", icon:"🧱", exp:"12 yrs", area:"Hyderabad" },
  { id:2, role:"Electrician", name:"Suresh Reddy", rate:700, phone:"916301456725", icon:"⚡", exp:"8 yrs", area:"Secunderabad" },
  { id:3, role:"Plumber", name:"Mahesh Yadav", rate:650, phone:"916301456725", icon:"🔧", exp:"10 yrs", area:"Hyderabad" },
  { id:4, role:"Builder / Contractor", name:"Anil Sharma", rate:1500, phone:"916301456725", icon:"👷", exp:"18 yrs", area:"Telangana" },
  { id:5, role:"Welder", name:"Prakash Verma", rate:800, phone:"916301456725", icon:"🔥", exp:"7 yrs", area:"Hyderabad" },
  { id:6, role:"Painter", name:"Naresh Goud", rate:700, phone:"916301456725", icon:"🎨", exp:"9 yrs", area:"Secunderabad" }
];

// ============= FLOAT BUTTONS =============
const FloatButtons = () => (
  <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
    <a href={`https://wa.me/${CFG.wa}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg font-bold transition-transform hover:scale-105">
      <MessageCircle size={20} /> <span className="hidden sm:inline">WhatsApp</span>
    </a>
    <a href={`tel:${CFG.phone.replace(/\s/g,'')}`} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-full shadow-lg font-bold transition-transform hover:scale-105">
      <Phone size={20} /> <span className="hidden sm:inline">Call Now</span>
    </a>
  </div>
);

// ============= MAIN APP =============
export default function App() {
  const [screen, setScreen] = useState("home");
  const [lang, setLang] = useState(ls.get("lang", "EN"));
  const [cart, setCart] = useState(ls.get("cart", []));
  const [user, setUser] = useState(ls.get("userProfile", null));
  const [orders, setOrders] = useState(ls.get("myOrders", []));
  const [ledger, setLedger] = useState(ls.get("ledger", []));
  const [invoices, setInvoices] = useState(ls.get("saved_invoices", []));
  const [products, setProducts] = useState(ls.get("products", DEFAULT_PRODUCTS));
  const [workers, setWorkers] = useState(ls.get("workers", DEFAULT_WORKERS));
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

  // 🔥 Real-time Firestore Sync
  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, "app_data", "main_store"), (snap) => {
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
  useEffect(() => ls.set("products", products), [products]);
  useEffect(() => ls.set("workers", workers), [workers]);
  useEffect(() => ls.set("bank_info", bankInfo), [bankInfo]);
  useEffect(() => ls.set("gallery", gallery), [gallery]);
  useEffect(() => { ls.set("dark", dark); document.documentElement.classList.toggle("dark-mode", dark); }, [dark]);

  const go = (s) => { setScreen(s); window.scrollTo(0,0); };
  const back = () => go("home");

  const addToCart = (p) => {
    try {
      const existing = cart.find(x => x.id === p.id);
      if (existing) setCart(cart.map(x => x.id === p.id ? { ...x, q: x.q + 1 } : x));
      else setCart([...cart, { ...p, q: 1 }]);
    } catch (e) { console.error(e); }
  };
  const updateQty = (id, delta) => setCart(cart.map(x => x.id === id ? { ...x, q: Math.max(1, x.q + delta) } : x));
  const removeItem = (id) => setCart(cart.filter(x => x.id !== id));
  const cartTotal = useMemo(() => cart.reduce((s, x) => s + x.p * x.q, 0), [cart]);

  const CARDS = [
    { t: t.s, go: "tracker", icon: Truck, color: "bg-orange-500" },
    { t: t.w, go: "khata", icon: BookOpen, color: "bg-amber-600" },
    { t: t.g, go: "catalog", icon: Sparkles, color: "bg-red-600" },
    { t: t.f, go: "estimator", icon: Calculator, color: "bg-stone-700" }
  ];

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
      const msg = `*NEW ORDER - AS ENTERPRISES*%0AOrder ID: ${order.id}%0A${cart.map(x => `• ${x.n} x ${x.q} = Rs.${x.p*x.q}`).join('%0A')}%0A*Total: Rs.${cartTotal}*%0APayment: ${payment}%0AAddress: ${address}%0A%0A_Terms Accepted: Unloading customer side, cement/steel non-returnable._`;
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
                    <MenuItem icon={RefreshCw} color="text-blue-600" label="Refresh" onClick={() => { setMenuOpen(false); window.location.reload(); }} />
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

      {screen !== "home" && (
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <button onClick={back} className="flex items-center gap-2 text-sm font-bold text-stone-700 hover:text-orange-600 transition">
            <ArrowLeft size={16} /> {t.home}
          </button>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 pb-24 pt-4">
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

      <footer className="border-t-4 border-orange-500 py-6 mt-8" style={{ backgroundColor: "#0A1931" }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <div className="font-bold">© 2026 {CFG.brand}. All rights reserved. Hyderabad, Telangana.</div>
          <div className="flex gap-4">
            <button onClick={() => go("admin")} className="flex items-center gap-1 hover:text-orange-400"><Shield size={12} /> {t.admin}</button>
            <a href={`tel:${CFG.phone.replace(/\s/g,'')}`} className="hover:text-orange-400">{CFG.phone}</a>
          </div>
        </div>
      </footer>

      <FloatButtons />
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
      if (!SR) { alert("Voice search is not supported in this browser. Please type."); return; }
      const rec = new SR();
      rec.lang = lang === "HI" ? "hi-IN" : lang === "TE" ? "te-IN" : "en-IN";
      rec.onresult = (e) => { onResult(e.results[0][0].transcript); setListening(false); };
      rec.onerror = () => setListening(false);
      rec.onend = () => setListening(false);
      rec.start(); setListening(true);
    } catch (e) { console.error(e); setListening(false); }
  };
  return (
    <button onClick={start} className={`p-2 rounded-full transition ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-orange-100 text-orange-600 hover:bg-orange-200'}`} title="Voice Search">
      <Mic size={18} />
    </button>
  );
}

// ============= SMART CONSTRUCTION GRADE SELECTOR =============
function SmartGradeSelector({ products, addToCart }) {
  const [useCase, setUseCase] = useState("slab");

  const recommendations = useMemo(() => {
    if (useCase === "slab") {
      return {
        title: "Roof & Slab Casting (छत ढलाई)",
        desc: "Requires high initial strength & optimal load distribution.",
        cement: products.find(p => p.n.includes("OPC 53") || p.b.includes("UltraTech")) || products[5],
        steel: products.find(p => p.n.includes("12mm") || p.n.includes("10mm")) || products[2]
      };
    } else if (useCase === "pillar") {
      return {
        title: "Pillars, Beams & Heavy Foundation (पिलर और बीम)",
        desc: "Demands heavy gauge Fe500/Fe550 rebars for maximum tensile load.",
        cement: products.find(p => p.n.includes("53 Grade")) || products[5],
        steel: products.find(p => p.n.includes("16mm") || p.n.includes("20mm")) || products[3]
      };
    } else {
      return {
        title: "Brick Masonry & Plastering (ईंट चुनाई और प्लास्टर)",
        desc: "PPC cement provides superior cohesion, zero cracks & smoother finish.",
        cement: products.find(p => p.n.includes("PPC") || p.b.includes("Ambuja")) || products[6],
        steel: products.find(p => p.n.includes("Binding Wire") || p.cat === "brick") || products[13]
      };
    }
  }, [useCase, products]);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="text-amber-400" size={20} />
          <h3 className="font-bold text-sm sm:text-base">Smart Grade Selector (सही ग्रेड गाइड)</h3>
        </div>
        <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">Auto Recommendation</span>
      </div>
      <p className="text-xs text-slate-300">Select what you are constructing to get verified IS-grade materials & instant market rates:</p>

      <div className="grid grid-cols-3 gap-2 pt-1">
        <button 
          onClick={() => setUseCase("slab")}
          className={`py-2 px-1 text-xs font-bold rounded-xl transition border text-center ${useCase === "slab" ? "bg-amber-500 text-slate-950 border-amber-400 shadow" : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"}`}
        >
          🏠 Roof Slab
        </button>
        <button 
          onClick={() => setUseCase("pillar")}
          className={`py-2 px-1 text-xs font-bold rounded-xl transition border text-center ${useCase === "pillar" ? "bg-amber-500 text-slate-950 border-amber-400 shadow" : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"}`}
        >
          🏛️ Pillars / Beam
        </button>
        <button 
          onClick={() => setUseCase("brickwork")}
          className={`py-2 px-1 text-xs font-bold rounded-xl transition border text-center ${useCase === "brickwork" ? "bg-amber-500 text-slate-950 border-amber-400 shadow" : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"}`}
        >
          🧱 Brick & Plaster
        </button>
      </div>

      <div className="bg-white/10 rounded-xl p-3 border border-white/10 space-y-2 mt-2">
        <div className="text-xs font-bold text-amber-300">{recommendations.title}</div>
        <div className="text-[11px] text-slate-300">{recommendations.desc}</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {recommendations.cement && (
            <div className="bg-slate-900/80 p-2.5 rounded-lg flex items-center justify-between border border-white/5">
              <div>
                <div className="text-[10px] text-amber-400 uppercase font-bold">Recommended Cement</div>
                <div className="text-xs font-bold truncate max-w-[150px]">{recommendations.cement.n}</div>
                <div className="text-xs font-black text-white">₹{recommendations.cement.p} <span className="text-[10px] font-normal text-slate-400">/{recommendations.cement.u}</span></div>
              </div>
              <button 
                onClick={() => addToCart(recommendations.cement)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition"
              >
                + Add
              </button>
            </div>
          )}

          {recommendations.steel && (
            <div className="bg-slate-900/80 p-2.5 rounded-lg flex items-center justify-between border border-white/5">
              <div>
                <div className="text-[10px] text-amber-400 uppercase font-bold">Recommended Steel / Rebar</div>
                <div className="text-xs font-bold truncate max-w-[150px]">{recommendations.steel.n}</div>
                <div className="text-xs font-black text-white">₹{recommendations.steel.p} <span className="text-[10px] font-normal text-slate-400">/{recommendations.steel.u}</span></div>
              </div>
              <button 
                onClick={() => addToCart(recommendations.steel)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition"
              >
                + Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============= HOME SCREEN =============
function HomeScreen({ t, lang, setScreen, CARDS, query, doSearch, category, setCategory, filtered, addToCart, heroImg, heroTxt, workers, products }) {
  const CATS = [{k:"ALL",n:t.all},{k:"tmt",n:t.tmt},{k:"cement",n:t.cement},{k:"sand",n:t.sand},{k:"brick",n:t.brick},{k:"tools",n:t.tools}];
  return (
    <div className="space-y-4">
      <section 
        style={{
          position: 'relative',
          marginLeft: '-16px',
          marginRight: '-16px',
          width: 'calc(100% + 32px)',
          backgroundColor: '#020617',
          padding: '24px 16px 20px 16px',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${heroImg || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.22,
            filter: 'grayscale(60%)',
            pointerEvents: 'none'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(2,6,23,0.8) 0%, rgba(2,6,23,0.95) 100%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '500px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 10px',
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '999px',
            color: '#fbbf24',
            fontSize: '11px',
            fontWeight: '600',
            marginBottom: '10px'
          }}>
            <span>⚡</span> Wholesale Construction Hub • Hyderabad & Secunderabad
          </div>

          <div style={{ lineHeight: '1', marginBottom: '4px' }}>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#f59e0b', letterSpacing: '-0.5px' }}>AS</div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase' }}>ENTERPRISES</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0 10px 0' }}>
            <div style={{ width: '28px', height: '3px', backgroundColor: '#f59e0b', borderRadius: '2px' }} />
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1px', color: '#94a3b8', textTransform: 'uppercase' }}>
              GENUINE MATERIALS & DIRECT BILLING
            </span>
          </div>

          <div style={{ margin: '6px 0 8px 0' }}>
            <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '28px', color: '#ffffff', lineHeight: '1.2' }}>
              {heroTxt ? heroTxt.split(".")[0] : "Build Stronger."}
            </div>
            <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '28px', color: '#ffffff', lineHeight: '1.2' }}>
              {heroTxt && heroTxt.split(".")[1] ? heroTxt.split(".")[1] : "Order Smarter."}
            </div>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.4', margin: '0 0 12px 0' }}>
            Direct supply of Tata/JSW Steel, UltraTech/Ambuja Cement, River Sand & Bricks. Transparent wholesale pricing with GST invoice.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => setScreen("catalog")}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#f59e0b',
                color: '#0f172a',
                fontWeight: '800',
                fontSize: '14px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              Browse Products & Rates →
            </button>
            <button
              onClick={() => setScreen("estimator")}
              style={{
                width: '100%',
                padding: '11px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                color: '#f8fafc',
                border: '1px solid #334155',
                fontWeight: '600',
                fontSize: '13px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Calculate Material Estimate
            </button>
          </div>
        </div>
      </section>

      {/* Smart Grade Selector Component */}
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
        {CATS.map(c => (
          <button key={c.k} onClick={() => setCategory(c.k)} className={`text-xs font-bold px-3 py-1 rounded-full transition ${category===c.k?'bg-orange-500 text-white':'bg-white border-2 border-stone-300 text-stone-700 hover:border-orange-500'}`}>{c.n}</button>
        ))}
      </section>

      <WorkersSection workers={workers} />
      <ProductGrid t={t} filtered={filtered} addToCart={addToCart} />
    </div>
  );
}

// ============= WORKERS SECTION =============
function WorkersSection({ workers }) {
  return (
    <section className="space-y-2 pt-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-black text-lg" style={{ color: "#0A1931" }}>Hire Skilled Workers</h3>
        <span className="text-[10px] uppercase tracking-widest text-orange-600 font-bold">Direct Booking · No Commission</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {workers.map(w => (
          <div key={w.id} className="bg-white border-2 border-stone-200 hover:border-orange-500 rounded-xl p-2.5 shadow-sm hover:shadow-md transition group">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: "#0A1931" }}>
                <span>{w.icon || "👷"}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-widest text-orange-600 font-bold truncate">{w.role}</div>
                <div className="font-bold text-xs truncate">{w.name}</div>
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="font-display font-black text-base">₹{w.rate}</span>
              <span className="text-[10px] text-stone-500">/day · {w.exp || "Verified"}</span>
            </div>
            {w.area && <div className="text-[9px] text-stone-400 truncate">📍 {w.area}</div>}
            <a href={`tel:+${w.phone || CFG.wa}`} className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold py-1.5 rounded-full transition flex items-center justify-center gap-1">
              <Phone size={11} /> Call
            </a>
            <a href={`https://wa.me/${w.phone || CFG.wa}?text=Hi%20${encodeURIComponent(w.name)}%2C%20need%20${encodeURIComponent(w.role)}`} target="_blank" rel="noreferrer" className="mt-1 w-full bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold py-1.5 rounded-full transition flex items-center justify-center gap-1">
              <MessageCircle size={11} /> WhatsApp
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

const Stars = ({ n }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => <Star key={i} size={11} className={i<=Math.round(n)?"fill-amber-400 text-amber-400":"text-stone-300"} />)}
  </div>
);

function ProductGrid({ t, filtered, addToCart }) {
  if (filtered.length === 0) return (
    <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-8 text-center">
      <div className="font-bold text-lg text-stone-900 mb-2">{t.noResults}</div>
      <a href={`tel:${CFG.phone.replace(/\s/g,'')}`} className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-full mt-2"><Phone size={16} /> {CFG.phone}</a>
    </div>
  );
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {filtered.map(p => (
        <div key={p.id} className="bg-white border-2 border-stone-200 hover:border-orange-500 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
          <div className="h-32 bg-stone-100 overflow-hidden relative">
            <img src={p.img} alt={p.n} className="w-full h-full object-cover group-hover:scale-105 transition" />
            {p.stock < 10 && <span className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-pulse">{t.low}</span>}
          </div>
          <div className="p-2 space-y-1">
            <div className="text-[9px] uppercase tracking-widest text-orange-600 font-bold">{p.b}</div>
            <div className="font-bold text-xs leading-tight line-clamp-2 h-8">{p.n}</div>
            <div className="flex items-center justify-between">
              <Stars n={p.rating || 4.5} />
              <span className="text-[9px] text-stone-500">{p.stock} {t.stock}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-base">₹{p.p}</span>
              <span className="text-[9px] text-stone-500">{p.u}</span>
            </div>
            <button onClick={() => addToCart(p)} className="w-full bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold py-1.5 rounded-full transition">+ {t.buy}</button>
          </div>
        </div>
      ))}
    </section>
  );
}

// ============= CATALOG =============
function CatalogScreen({ t, query, doSearch, category, setCategory, filtered, addToCart }) {
  const CATS = [{k:"ALL",n:t.all},{k:"tmt",n:t.tmt},{k:"cement",n:t.cement},{k:"sand",n:t.sand},{k:"brick",n:t.brick},{k:"tools",n:t.tools}];
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.g}</h2>
      <div className="bg-white border-2 border-stone-900 rounded-2xl p-4 flex items-center gap-2">
        <Search size={20} className="text-stone-500" />
        <input value={query} onChange={(e)=>doSearch(e.target.value)} placeholder={t.search} className="flex-1 bg-transparent outline-none" />
      </div>
      <div className="flex flex-wrap gap-2">
        {CATS.map(c => <button key={c.k} onClick={() => setCategory(c.k)} className={`text-sm font-bold px-4 py-2 rounded-full transition ${category===c.k?'bg-orange-500 text-white':'bg-white border-2 border-stone-300 text-stone-700 hover:border-orange-500'}`}>{c.n}</button>)}
      </div>
      <ProductGrid t={t} filtered={filtered} addToCart={addToCart} />
    </div>
  );
}

// ============= CART =============
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
            <img src={item.img} alt={item.n} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase text-orange-600 font-bold">{item.b}</div>
              <div className="font-bold text-sm truncate">{item.n}</div>
              <div className="text-xs text-stone-500">₹{item.p} {item.u}</div>
            </div>
            <div className="flex items-center gap-1 border-2 border-stone-300 rounded-full">
              <button onClick={() => updateQty(item.id, -1)} className="p-1.5 hover:bg-stone-100 rounded-full"><Minus size={14} /></button>
              <span className="font-bold w-6 text-center text-sm">{item.q}</span>
              <button onClick={() => updateQty(item.id, 1)} className="p-1.5 hover:bg-stone-100 rounded-full"><Plus size={14} /></button>
            </div>
            <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-4 space-y-3">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500">{t.address}</span>
          <textarea value={address} onChange={(e)=>setAddress(e.target.value)} rows={2} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" placeholder="Delivery Site Address, City, Pincode" />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={()=>setPayment("COD")} className={`p-3 rounded-xl border-2 font-bold text-sm ${payment==="COD"?'border-orange-500 bg-orange-500 text-white':'border-stone-200 bg-white'}`}>{t.cod}</button>
          <button onClick={()=>setPayment("UPI")} className={`p-3 rounded-xl border-2 font-bold text-sm ${payment==="UPI"?'border-orange-500 bg-orange-500 text-white':'border-stone-200 bg-white'}`}>{t.upi}</button>
        </div>
        {payment === "UPI" && (
          <div className="bg-stone-50 border-2 border-dashed border-orange-500 rounded-xl p-4 flex flex-col items-center gap-2">
            <div className="text-xs font-bold uppercase text-stone-600 tracking-widest">{t.scan}</div>
            <QRCodeSVG value={`upi://pay?pa=${upi}&pn=AS%20Enterprises&am=${total}&cu=INR`} size={200} />
            <div className="text-sm font-bold mt-2">{t.payto}: <span className="text-orange-600">{upi}</span></div>
            <div className="text-xs text-stone-500">Amount: ₹{total}</div>
          </div>
        )}
        <div className="flex justify-between items-center pt-2 border-t border-stone-200">
          <span className="font-bold text-lg">{t.total}</span>
          <span className="font-display font-black text-2xl">₹{total}</span>
        </div>
        <div style={{margin:"12px 0",padding:"10px",background:"#fff8f0",borderRadius:"8px",border:"1px solid #fed7aa",fontSize:"12px"}}>
          <label style={{display:"flex",gap:"8px",cursor:"pointer",color:"#333"}}>
            <input type="checkbox" checked={termsAgreed} onChange={(e)=>setTermsAgreed(e.target.checked)} style={{marginTop:"2px",accentColor:"#f97316"}}/>
            <span>I agree to <b>Terms & Conditions</b>: Unloading is customer responsibility. Materials once unloaded are non-returnable. Subject to Hyderabad Jurisdiction.</span>
          </label>
        </div>
        <button 
          onClick={()=>{ 
            if(!address.trim()){alert("Please enter delivery site address"); return;} 
            if(!termsAgreed){alert("Please accept Terms & Conditions"); return;}
            onCheckout(payment, address); 
          }} 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full text-base transition"
        >
          {t.confirm} · ₹{total}
        </button>
      </div>
    </div>
  );
}

// ============= GST TAX INVOICE & DELIVERY CHALLAN PRINT ENGINE =============
function printTaxInvoiceDocument(inv, isChallan = false, currentBank = DEFAULT_BANK) {
  const taxable = parseFloat(inv.taxable || inv.total || 0);
  const discount = parseFloat(inv.discount || 0);
  const adjustedTaxable = Math.max(0, taxable - discount);
  const gst = parseFloat(inv.gst || (adjustedTaxable * 0.18));
  const grand = Math.round(adjustedTaxable + gst);
  const cgst = (gst / 2).toFixed(2);
  const sgst = (gst / 2).toFixed(2);

  const bank = inv.bankSnapshot || currentBank;

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${isChallan ? 'Delivery Challan' : 'Tax Invoice'} - ${inv.id || 'DOC'}</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 24px; color: #111; max-width: 800px; margin: auto; }
    .header { border-bottom: 3px solid #ea580c; padding-bottom: 12px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: flex-start; }
    .brand { font-size: 26px; font-weight: 900; color: #0A1931; margin: 0; }
    .badge { background: ${isChallan ? '#0A1931' : '#ea580c'}; color: #fff; padding: 4px 10px; font-size: 12px; font-weight: bold; border-radius: 4px; }
    .meta-table { width: 100%; margin-bottom: 20px; font-size: 13px; }
    .meta-table td { padding: 4px 0; vertical-align: top; }
    table.items { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
    table.items th, table.items td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
    table.items th { background: #0A1931; color: #fff; font-weight: 700; }
    .text-right { text-align: right; }
    .tot-row td { font-weight: bold; }
    .grand-tot td { font-size: 16px; color: #ea580c; font-weight: 900; background: #fff7ed; }
    .bank-box { margin-top: 20px; padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 12px; background: #f8fafc; }
    .terms { margin-top: 25px; border-top: 1px dashed #94a3b8; padding-top: 12px; font-size: 11px; color: #475569; }
    .sign-box { margin-top: 35px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 12px; }
    .sign-img { max-height: 55px; border-bottom: 1px solid #333; margin-bottom: 4px; display: block; }
    .kanta-preview { margin-top: 20px; border: 1px dashed #cbd5e1; padding: 8px; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="brand">AS ENTERPRISES</h1>
      <div style="font-size: 13px; color: #475569; margin-top: 3px;">Wholesale Building Materials & TMT Supply</div>
      <div style="font-size: 12px; margin-top: 2px;"><strong>GSTIN:</strong> ${CFG.gstin} · <strong>Phone:</strong> ${CFG.phone}</div>
      <div style="font-size: 12px;">Hyderabad, Telangana, 500077</div>
    </div>
    <div style="text-align: right;">
      <span class="badge">${isChallan ? 'DELIVERY CHALLAN / GATE PASS' : 'TAX INVOICE'}</span>
      <div style="margin-top: 6px; font-size: 13px;"><strong>${isChallan ? 'Challan No' : 'Invoice No'}:</strong> ${inv.id || 'DOC-'+Date.now()}</div>
      <div style="font-size: 12px; color: #64748b;"><strong>Date:</strong> ${new Date(inv.date || Date.now()).toLocaleDateString('en-IN')}</div>
    </div>
  </div>

  <table class="meta-table">
    <tr>
      <td style="width: 50%;">
        <strong>Billed / Dispatched To:</strong><br/>
        <span style="font-size: 15px; font-weight: bold; color: #0A1931;">${inv.customer || inv.user || 'Valued Customer'}</span><br/>
        Phone: ${inv.phone || 'N/A'}<br/>
        Delivery Site: ${inv.address || 'Direct Yard Pickup'}
      </td>
      <td style="width: 50%; text-align: right;">
        <strong>Vehicle & Transit Details:</strong><br/>
        Vehicle No: <strong>${inv.vehicle || 'Dispatched Lorry'}</strong><br/>
        Payment Terms: <strong>${inv.payment || 'Recorded'}</strong><br/>
        Transit Status: Road Dispatch (Official Gate Pass)
      </td>
    </tr>
  </table>

  <table class="items">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Material Description</th>
        <th class="text-right">Qty</th>
        ${!isChallan ? '<th class="text-right">Rate (₹)</th><th class="text-right">Taxable Amount (₹)</th>' : ''}
      </tr>
    </thead>
    <tbody>
      ${inv.items && inv.items.length > 0 ? inv.items.map((it, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${it.n || it.name} - ${it.b || ''}</td>
          <td class="text-right"><strong>${it.q || it.qty} ${it.u || ''}</strong></td>
          ${!isChallan ? `
            <td class="text-right">${parseFloat(it.p || it.rate).toFixed(2)}</td>
            <td class="text-right">${((it.q || it.qty) * (it.p || it.rate)).toFixed(2)}</td>
          ` : ''}
        </tr>
      `).join('') : `
        <tr>
          <td>1</td>
          <td>${inv.material || 'Construction Material'}</td>
          <td class="text-right"><strong>${inv.qty || 1}</strong></td>
          ${!isChallan ? `
            <td class="text-right">${taxable.toFixed(2)}</td>
            <td class="text-right">${taxable.toFixed(2)}</td>
          ` : ''}
        </tr>
      `}
      ${!isChallan ? `
        <tr class="tot-row">
          <td colspan="4" class="text-right">Taxable Subtotal</td>
          <td class="text-right">₹${taxable.toFixed(2)}</td>
        </tr>
        ${discount > 0 ? `
          <tr>
            <td colspan="4" class="text-right" style="color: #15803d;">Cash Discount Applied</td>
            <td class="text-right" style="color: #15803d;">-₹${discount.toFixed(2)}</td>
          </tr>
        ` : ''}
        <tr>
          <td colspan="4" class="text-right">CGST @ 9%</td>
          <td class="text-right">₹${cgst}</td>
        </tr>
        <tr>
          <td colspan="4" class="text-right">SGST @ 9%</td>
          <td class="text-right">₹${sgst}</td>
        </tr>
        <tr class="grand-tot">
          <td colspan="4" class="text-right">GRAND TOTAL (Round Off)</td>
          <td class="text-right">₹${grand.toLocaleString('en-IN')}.00</td>
        </tr>
      ` : ''}
    </tbody>
  </table>

  ${!isChallan ? `
    <div class="bank-box">
      <strong>Direct NEFT / RTGS Bank Transfer Details:</strong><br/>
      Bank: <b>${bank.bankName}</b> | A/c No: <b>${bank.accNo}</b> | IFSC: <b>${bank.ifsc}</b> | Branch: ${bank.branch}<br/>
      UPI ID: <b>${getUPI()}</b>
    </div>
  ` : ''}

  ${inv.kantaImg ? `
    <div class="kanta-preview">
      <strong>Attached Weighbridge / Dharam Kanta Slip:</strong><br/>
      <img src="${inv.kantaImg}" style="max-height: 120px; margin-top: 6px; border-radius: 4px;" alt="Kanta Slip" />
    </div>
  ` : ''}

  <div class="terms">
    <strong>Terms & Conditions (नियम व शर्तें):</strong><br/>
    1. Unloading of materials at destination site is customer's sole responsibility.<br/>
    2. Goods once unloaded and checked are strictly non-returnable and non-refundable.<br/>
    3. Any discrepancy in count or bags must be recorded on this dispatch copy before discharge.<br/>
    4. Delayed payments beyond agreed credit period attract interest @ 18% p.a.<br/>
    5. All disputes subject to Hyderabad Jurisdiction only.
  </div>

  <div class="sign-box">
    <div>
      ${inv.signature ? `<img class="sign-img" src="${inv.signature}" alt="Customer Sign"/>` : '<div style="height:40px; border-bottom:1px solid #333; width:180px;"></div>'}
      <div>Customer / Site Munshi Receiving Sign</div>
    </div>
    <div style="text-align: right;">
      For <strong>AS ENTERPRISES</strong><br/><br/><br/>Authorized Signatory
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (win) {
    win.focus();
  }
}

// ============= PRINT CUSTOMER STATEMENT OF ACCOUNT =============
function printCustomerStatement(customerName, entries) {
  const custEntries = entries.filter(e => e.customer.toLowerCase().trim() === customerName.toLowerCase().trim());
  const balance = custEntries.reduce((s, l) => s + (l.type === 'credit' ? l.amt : -l.amt), 0);

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Khata Statement - ${customerName}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; color: #111; max-width: 800px; margin: auto; }
    .header { border-bottom: 3px solid #ea580c; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
    th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
    th { background: #0A1931; color: #fff; }
    .text-right { text-align: right; }
    .cr { color: #dc2626; font-weight: bold; }
    .dr { color: #16a34a; font-weight: bold; }
    .balance-box { background: #fff7ed; border: 2px solid #ea580c; border-radius: 8px; padding: 15px; margin-top: 20px; display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h2 style="margin: 0; color: #0A1931;">AS ENTERPRISES</h2>
      <div>Wholesale Customer Statement / Bahi Khata</div>
      <div>Ph: ${CFG.phone} · Hyderabad</div>
    </div>
    <div style="text-align: right;">
      <h3>Party: ${customerName}</h3>
      <div>Statement Date: ${new Date().toLocaleDateString('en-IN')}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Particulars / Invoice Note</th>
        <th class="text-right">Debit (Received / जमा)</th>
        <th class="text-right">Credit (Due / उधारी)</th>
      </tr>
    </thead>
    <tbody>
      ${custEntries.map(e => `
        <tr>
          <td>${new Date(e.date).toLocaleDateString('en-IN')}</td>
          <td>${e.note || 'Material Transaction'}</td>
          <td class="text-right dr">${e.type === 'debit' ? '₹' + e.amt.toLocaleString('en-IN') : '-'}</td>
          <td class="text-right cr">${e.type === 'credit' ? '₹' + e.amt.toLocaleString('en-IN') : '-'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="balance-box">
    <span>Closing Balance:</span>
    <span style="color: ${balance >= 0 ? '#dc2626' : '#16a34a'};">
      ₹${Math.abs(balance).toLocaleString('en-IN')} ${balance >= 0 ? '(Pending To Receive)' : '(Advance Received)'}
    </span>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (win) win.focus();
}

// ============= ORDERS SCREEN =============
function OrdersScreen({ t, orders, setOrders, upi, bankInfo }) {
  if (orders.length === 0) return <div className="bg-white border-2 border-stone-200 rounded-2xl p-12 text-center text-stone-500 font-bold">{t.noord}</div>;
  
  const shareWA = (o) => {
    const gst = Math.round(o.total * 0.18);
    const grand = o.total + gst;
    const msg = `*AS ENTERPRISES - TAX INVOICE*%0AInvoice: ${o.id}%0ACustomer: ${o.user}%0A${o.items.map(i=>`• ${i.n} x ${i.q} = Rs.${i.p*i.q}`).join('%0A')}%0ASubtotal: Rs.${o.total}%0AGST (18%): Rs.${gst}%0A*Grand Total: Rs.${grand}*%0A%0A_Terms: Unloading customer side, goods non-returnable._`;
    window.open(`https://wa.me/${CFG.wa}?text=${msg}`, "_blank");
  };

  return (
    <div className="space-y-4">
      <h2 className="font-display font-black text-3xl">{t.orders}</h2>
      {orders.map(o => (
        <div key={o.id} className="bg-white border-2 border-stone-200 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-orange-600 font-bold">{t.ordid}</div>
              <div className="font-bold">{o.id}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-stone-500">{new Date(o.date).toLocaleDateString()}</div>
              <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mt-1">{o.status}</span>
            </div>
          </div>
          <div className="text-sm text-stone-600 space-y-0.5 mt-2">{o.items.map((i, idx) => <div key={idx}>{i.n} × {i.q}</div>)}</div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-stone-100">
            <span className="text-xs text-stone-500">{o.payment} · {o.address?.slice(0,30)}</span>
            <span className="font-black text-lg">₹{o.total}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button onClick={() => printTaxInvoiceDocument(o, false, bankInfo)} className="flex items-center justify-center gap-1 bg-stone-900 text-white text-xs font-bold py-2 rounded-full"><FileText size={12} /> Tax Invoice PDF</button>
            <button onClick={() => shareWA(o)} className="flex items-center justify-center gap-1 bg-green-600 text-white text-xs font-bold py-2 rounded-full"><MessageCircle size={12} /> WhatsApp Bill</button>
          </div>
          {o.loyalty > 0 && <div className="text-xs text-amber-700 mt-2 font-bold">✨ +{o.loyalty} Mistri Points earned</div>}
        </div>
      ))}
    </div>
  );
}

// ============= REAL GPS TRACKER SCREEN =============
function TrackerScreen({ t, orders }) {
  const [driverLocation, setDriverLocation] = useState(null);
  const [gpsError, setGpsError] = useState("");

  const getDriverGPS = () => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          time: new Date().toLocaleTimeString()
        };
        setDriverLocation(coords);
        setGpsError("");
      },
      (err) => {
        setGpsError("Unable to retrieve GPS: " + err.message);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">Live Delivery GPS Tracker</h2>
      
      {/* Real GPS Driver Broadcast */}
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="text-orange-600" size={22} />
            <h3 className="font-black text-base text-stone-900">Driver Live GPS Station</h3>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Real GPS</span>
        </div>
        <p className="text-xs text-stone-500">
          Delivery vehicle driver can tap below to broadcast exact live GPS location on Google Maps directly to customer.
        </p>

        <button 
          onClick={getDriverGPS} 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
        >
          <MapPin size={15} /> Fetch Driver Phone GPS Location
        </button>

        {gpsError && <div className="text-xs text-red-600 font-bold">{gpsError}</div>}

        {driverLocation && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs space-y-2">
            <div className="text-emerald-900 font-bold">📍 Current Coordinates Acquired:</div>
            <div>Latitude: <b>{driverLocation.lat.toFixed(5)}</b> | Longitude: <b>{driverLocation.lng.toFixed(5)}</b></div>
            <div className="text-stone-500 text-[10px]">Updated at: {driverLocation.time}</div>
            <div className="flex gap-2 pt-1">
              <a 
                href={`https://www.google.com/maps?q=${driverLocation.lat},${driverLocation.lng}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-stone-900 text-white text-center py-2 rounded-lg font-bold"
              >
                View on Google Maps
              </a>
              <a 
                href={`https://wa.me/${CFG.wa}?text=${encodeURIComponent(`*AS ENTERPRISES - DRIVER LIVE LOCATION*\nVehicle is on the way.\nTrack live on Google Maps: https://www.google.com/maps?q=${driverLocation.lat},${driverLocation.lng}`)}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-green-600 text-white text-center py-2 rounded-lg font-bold flex items-center justify-center gap-1"
              >
                <MessageCircle size={14} /> Send Link to Client
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Dispatched Orders */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500">Active Delivery Orders</h4>
        {orders.length === 0 ? (
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-8 text-center text-stone-500">{t.noord}</div>
        ) : (
          orders.slice(0, 5).map(o => (
            <div key={o.id} className="bg-white border-2 border-stone-200 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold">{o.id} ({o.user})</span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">{o.status}</span>
              </div>
              <div className="text-xs text-stone-600"><strong>Address:</strong> {o.address}</div>
              <div className="text-xs text-stone-500">Total: ₹{o.total} · Payment: {o.payment}</div>
              <div className="pt-2 flex gap-2">
                <a 
                  href={`https://wa.me/${CFG.wa}?text=${encodeURIComponent(`Hi ${o.user}, your AS Enterprises material order #${o.id} is dispatched. Warehouse contact: ${CFG.phone}`)}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 bg-green-600 text-white text-xs font-bold py-1.5 rounded-lg text-center flex items-center justify-center gap-1"
                >
                  <MessageCircle size={12} /> WhatsApp ETA
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============= WHOLESALE KHATA WITH STATEMENT DOWNLOAD & REMINDERS =============
function KhataScreen({ t, ledger, setLedger, upi, bankInfo }) {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [amt, setAmt] = useState("");
  const [type, setType] = useState("credit");
  const [note, setNote] = useState("");
  const [showQr, setShowQr] = useState(null);

  const add = () => {
    if (!customer.trim() || !amt) return;
    setLedger([{ id: Date.now(), customer, phone, amt: parseFloat(amt), type, note, date: new Date().toISOString() }, ...ledger]);
    setCustomer(""); setPhone(""); setAmt(""); setNote("");
  };
  const del = (id) => setLedger(ledger.filter(l => l.id !== id));
  const balance = ledger.reduce((s, l) => s + (l.type === 'credit' ? l.amt : -l.amt), 0);

  const sendPaymentReminder = (entry) => {
    const custPhone = entry.phone || prompt("Enter Party's 10-digit WhatsApp Number:");
    if (!custPhone) return;

    const msg = `*PAYMENT REMINDER - AS ENTERPRISES*\n` +
                `आदरणीय ${entry.customer} जी,\n` +
                `आपके खाते में *₹${entry.amt.toLocaleString('en-IN')}* का बकाया शेष है (${entry.note || 'Material Purchase'}).\n\n` +
                `कृपया नीचे दिए गए UPI या बैंक विवरण पर भुगतान करें:\n` +
                `UPI ID: *${upi}*\n` +
                `Bank A/c: ${bankInfo.accNo} (${bankInfo.ifsc})\n` +
                `संपर्क: ${CFG.phone}\n\n` +
                `_AS Enterprises, Wholesale Building Materials, Hyderabad_`;

    window.open(`https://wa.me/91${custPhone.replace(/\D/g,'').slice(-10)}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.khata}</h2>
      <div className={`p-6 rounded-2xl text-white shadow-lg ${balance>=0?'bg-emerald-700':'bg-red-700'}`}>
        <div className="text-xs uppercase tracking-widest opacity-80">Net Balance</div>
        <div className="font-display font-black text-4xl mt-1">₹{Math.abs(balance).toLocaleString()}</div>
        <div className="text-xs mt-1 opacity-80">{balance >= 0 ? 'To Receive (उधारी लेना बाकी)' : 'To Pay (भुगतान करना है)'}</div>
      </div>

      <div className="bg-white border-2 border-orange-500 rounded-2xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input value={customer} onChange={e=>setCustomer(e.target.value)} placeholder={t.customer} className="border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500 text-sm" />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="WhatsApp Phone" className="border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500 text-sm" />
          <input value={amt} onChange={e=>setAmt(e.target.value)} type="number" placeholder={t.amt} className="border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500 text-sm font-bold" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={()=>setType("credit")} className={`p-2 rounded-lg border-2 font-bold text-sm ${type==="credit"?'bg-emerald-700 text-white border-emerald-700':'border-stone-200'}`}>{t.credit} (बाकी / To Receive)</button>
          <button onClick={()=>setType("debit")} className={`p-2 rounded-lg border-2 font-bold text-sm ${type==="debit"?'bg-red-700 text-white border-red-700':'border-stone-200'}`}>{t.debit} (जमा / Received)</button>
        </div>
        <input value={note} onChange={e=>setNote(e.target.value)} placeholder={t.note} className="w-full border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500 text-sm" />
        <button onClick={add} className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-full">+ {t.add}</button>
      </div>

      <div className="space-y-2">
        {ledger.map(l => (
          <div key={l.id} className="bg-white border-2 border-stone-200 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-sm">{l.customer}</div>
                <div className="text-xs text-stone-500">{l.note} · {new Date(l.date).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-black ${l.type==='credit'?'text-emerald-700':'text-red-700'}`}>{l.type==='credit'?'+':'-'}₹{l.amt}</span>
                <button 
                  onClick={() => printCustomerStatement(l.customer, ledger)} 
                  className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-full text-[11px] font-bold px-2 flex items-center gap-1"
                  title="Print Party Ledger Statement"
                >
                  <Receipt size={12} /> Statement
                </button>
                {l.type === 'credit' && (
                  <button 
                    onClick={() => sendPaymentReminder(l)} 
                    className="p-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-full flex items-center gap-1 text-[11px] font-bold px-2.5" 
                    title="Send WhatsApp Payment Reminder"
                  >
                    <BellRing size={13} /> Remind
                  </button>
                )}
                {l.type==='credit' && <button onClick={() => setShowQr(showQr===l.id?null:l.id)} className="p-1.5 bg-orange-100 text-orange-600 rounded-full" title="UPI QR"><Camera size={12} /></button>}
                <button onClick={()=>del(l.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={14} /></button>
              </div>
            </div>
            {showQr === l.id && (
              <div className="mt-3 p-3 bg-orange-50 rounded-lg flex flex-col items-center">
                <QRCodeSVG value={`upi://pay?pa=${upi}&pn=AS%20Enterprises&am=${l.amt}&cu=INR&tn=${encodeURIComponent(l.customer)}`} size={140} />
                <div className="text-xs mt-2 font-bold text-orange-700">Pay ₹{l.amt} to {upi}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= ESTIMATOR SCREEN =============
function EstimatorScreen({ t }) {
  const [len, setLen] = useState(""); const [wid, setWid] = useState(""); const [ht, setHt] = useState("");
  const [result, setResult] = useState(null);
  const calc = () => {
    const l = parseFloat(len), w = parseFloat(wid), h = parseFloat(ht);
    if (!l || !w || !h) return;
    const area = l * w, vol = area * h;
    setResult({ cement: Math.ceil(area * 0.4), tmt: (area * 4 / 1000).toFixed(2), sand: Math.ceil(vol * 0.5), bricks: Math.ceil(area * 55) });
  };
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.estimator}</h2>
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-6 space-y-4">
        <div className="text-sm text-stone-600">{t.est}</div>
        <div className="grid grid-cols-3 gap-3">
          <label><span className="text-xs font-bold uppercase text-stone-500">{t.len}</span><input type="number" value={len} onChange={e=>setLen(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" /></label>
          <label><span className="text-xs font-bold uppercase text-stone-500">{t.wid}</span><input type="number" value={wid} onChange={e=>setWid(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" /></label>
          <label><span className="text-xs font-bold uppercase text-stone-500">{t.ht}</span><input type="number" value={ht} onChange={e=>setHt(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" /></label>
        </div>
        <button onClick={calc} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full">{t.calc}</button>
      </div>
      {result && (
        <div className="bg-amber-50 border-2 border-orange-500 rounded-2xl p-5">
          <div className="text-sm font-bold text-stone-600 mb-3">{t.need}:</div>
          <div className="grid grid-cols-2 gap-3">
            <Stat label={t.bags} val={result.cement} /><Stat label={t.tons} val={result.tmt} /><Stat label={t.cft} val={result.sand} /><Stat label={t.bricks} val={result.bricks} />
          </div>
          <a href={`https://wa.me/${CFG.wa}?text=AS%20Enterprises%20Estimate:%20${result.cement}%20bags%20cement,%20${result.tmt}%20tons%20TMT,%20${result.sand}%20cft%20sand,%20${result.bricks}%20bricks`} target="_blank" rel="noreferrer" className="mt-4 block bg-green-600 hover:bg-green-700 text-white text-center font-bold py-2.5 rounded-full">Get Quote on WhatsApp</a>
        </div>
      )}
    </div>
  );
}
const Stat = ({ label, val }) => (
  <div className="bg-white rounded-xl p-3 border-2 border-orange-200">
    <div className="font-display font-black text-2xl">{val}</div>
    <div className="text-xs text-stone-600 font-bold">{label}</div>
  </div>
);

// ============= LOGIN SCREEN =============
function LoginScreen({ t, onLogin }) {
  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [sentOtp, setSentOtp] = useState("");

  const sendOtp = () => {
    if (mobile.length < 10) { alert("Enter 10-digit mobile"); return; }
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setSentOtp(code);
    alert(`Verification OTP for ${mobile}: ${code}`);
    setStep("otp");
  };
  const verify = () => {
    if (otp !== sentOtp) { alert("Wrong OTP entered"); return; }
    onLogin({ mobile, name: name || `Customer ${mobile.slice(-4)}`, date: new Date().toISOString() });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-6 space-y-4">
        <h2 className="font-display font-black text-3xl">{t.welcome}</h2>
        {step === "mobile" && (
          <>
            <p className="text-sm text-stone-500">Customer Login for Fast Billing & Order Records</p>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name / Business Name" className="w-full border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500" />
            <input value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit Mobile Number" type="tel" className="w-full border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500 tracking-widest text-lg" />
            <button onClick={sendOtp} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full">{t.sendOtp}</button>
          </>
        )}
        {step === "otp" && (
          <>
            <p className="text-sm text-stone-500">OTP sent to <b>+91 {mobile}</b></p>
            <input value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,4))} placeholder={t.otp} maxLength={4} className="w-full text-center text-3xl font-black tracking-widest border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500" />
            <button onClick={verify} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full">{t.verify}</button>
            <button onClick={() => setStep("mobile")} className="w-full text-xs text-stone-500 hover:underline">Change mobile</button>
          </>
        )}
      </div>
    </div>
  );
}

// ============= DIGITAL SIGNATURE PAD =============
function SignaturePad({ onSave }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#0A1931";
    }
  }, []);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e) => {
    setIsDrawing(true);
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      onSave(canvasRef.current.toDataURL("image/png"));
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onSave("");
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <label className="font-bold text-stone-600">Client / Munshi Receiving Signature (Touch/Draw):</label>
        <button type="button" onClick={clear} className="text-red-500 hover:underline font-bold text-[10px]">Clear</button>
      </div>
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={90} 
        onMouseDown={startDraw} 
        onMouseMove={draw} 
        onMouseUp={stopDraw}
        onTouchStart={startDraw} 
        onTouchMove={draw} 
        onTouchEnd={stopDraw}
        className="border-2 border-dashed border-stone-300 rounded-lg bg-white w-full cursor-crosshair touch-none"
      />
    </div>
  );
}

// ============= DAILY SALES SUMMARY / DAY CLOSE REPORT =============
function DayCloseReport({ invoices }) {
  const todayStr = new Date().toLocaleDateString('en-IN');
  
  const todayInvoices = useMemo(() => {
    return invoices.filter(inv => new Date(inv.date).toLocaleDateString('en-IN') === todayStr);
  }, [invoices, todayStr]);

  const totalSales = todayInvoices.reduce((s, x) => s + (x.grand || 0), 0);
  const totalCashCollected = todayInvoices.reduce((s, x) => s + (x.paid || 0), 0);
  const totalCreditDue = todayInvoices.reduce((s, x) => s + (x.due || 0), 0);

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4 shadow-xl border border-slate-700">
      <div className="flex justify-between items-center border-b border-slate-700 pb-3">
        <div>
          <h3 className="font-black text-lg text-amber-400 flex items-center gap-2">
            <BarChart3 size={20} /> Daily Business Close Report
          </h3>
          <p className="text-xs text-slate-400">Date: {todayStr} · Live Business Summary</p>
        </div>
        <button 
          onClick={() => window.print()} 
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs"
        >
          Print Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Today's Invoiced Sales</div>
          <div className="font-black text-2xl text-white mt-1">₹{totalSales.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-slate-400">{todayInvoices.length} Bills Generated</div>
        </div>
        <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30">
          <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">Cash / UPI Collected</div>
          <div className="font-black text-2xl text-emerald-300 mt-1">₹{totalCashCollected.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-emerald-400/80">Direct Inflows</div>
        </div>
        <div className="bg-rose-950/60 p-3 rounded-xl border border-rose-500/30">
          <div className="text-[10px] uppercase tracking-wider text-rose-400 font-bold">New Khata Credit (उधारी)</div>
          <div className="font-black text-2xl text-rose-300 mt-1">₹{totalCreditDue.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-rose-400/80">Recorded in Khata</div>
        </div>
      </div>
    </div>
  );
}

// ============= ADMIN PANEL WITH DYNAMIC BANK MANAGER =============
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
  const [newBanner, setNewBanner] = useState(heroImg);
  const [newHead, setNewHead] = useState(heroTxt);
  const [newProd, setNewProd] = useState({ n:"", b:"", p:"", u:"per unit", cat:"tmt", stock:100, img:"" });

  // Dynamic Bank State for Settings
  const [editBank, setEditBank] = useState({ ...bankInfo });

  // Multi-Item Invoice Maker State
  const [invCust, setInvCust] = useState("");
  const [invPhone, setInvPhone] = useState("");
  const [invAddress, setInvAddress] = useState("");
  const [invVehicle, setInvVehicle] = useState("");
  const [invDiscount, setInvDiscount] = useState("0");
  const [invPaid, setInvPaid] = useState("");
  const [kantaImg, setKantaImg] = useState("");
  const [signatureData, setSignatureData] = useState("");

  const [billItems, setBillItems] = useState([
    { n: products[0]?.n || "TMT Bar Fe500 8mm", b: products[0]?.b || "Tata Tiscon", q: 100, p: products[0]?.p || 62, u: products[0]?.u || "per kg" }
  ]);

  const readFile = (file, cb) => { const r = new FileReader(); r.onload = () => cb(r.result); r.readAsDataURL(file); };

  if (!unlocked) return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-6 space-y-4 text-center">
        <Shield size={40} className="mx-auto text-orange-600" />
        <h2 className="font-display font-black text-2xl">{t.pinLbl}</h2>
        <input type="password" value={pin} onChange={(e)=>setPin(e.target.value)} maxLength={4} className="w-full text-center text-2xl font-black tracking-widest border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500" placeholder="••••" />
        <button onClick={()=>{ if(pin==="6301") setUnlocked(true); else alert("Wrong PIN. Enter 6301"); }} className="w-full bg-orange-500 text-white font-bold py-3 rounded-full">Unlock Admin</button>
      </div>
    </div>
  );

  const syncToFirestore = async (newProds, newWrks, newBank) => {
    try {
      await setDoc(doc(db, "app_data", "main_store"), {
        products: newProds || products,
        workers: newWrks || workers,
        bankInfo: newBank || bankInfo
      }, { merge: true });
    } catch (e) {
      console.error("Firestore sync error:", e);
    }
  };

  const saveProductItem = async (p) => {
    const updated = products.map(x => x.id === p.id ? p : x);
    setProducts(updated);
    await syncToFirestore(updated, workers, bankInfo);
    alert(`${p.n} rate & stock updated live!`);
  };

  const toggleVisibility = async (id) => {
    const updated = products.map(x => x.id === id ? { ...x, visible: x.visible === false ? true : false } : x);
    setProducts(updated);
    await syncToFirestore(updated, workers, bankInfo);
  };

  const delProd = async (id) => {
    if (confirm("Delete this material?")) {
      const updated = products.filter(x => x.id !== id);
      setProducts(updated);
      await syncToFirestore(updated, workers, bankInfo);
    }
  };

  const addProd = async () => {
    if (!newProd.n || !newProd.p) { alert("Name & Price required"); return; }
    const updated = [{ ...newProd, id:Date.now(), p:parseFloat(newProd.p), stock:parseInt(newProd.stock)||100, rating:4.5, visible:true, img:newProd.img||"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70" }, ...products];
    setProducts(updated);
    await syncToFirestore(updated, workers, bankInfo);
    setNewProd({ n:"", b:"", p:"", u:"per unit", cat:"tmt", stock:100, img:"" });
    alert("New material added to store!");
  };

  const addBillItem = () => {
    setBillItems([...billItems, { n: products[0]?.n || "", b: products[0]?.b || "", q: 1, p: products[0]?.p || 0, u: products[0]?.u || "per unit" }]);
  };

  const removeBillItem = (idx) => {
    setBillItems(billItems.filter((_, i) => i !== idx));
  };

  const updateBillItem = (idx, field, val) => {
    const next = [...billItems];
    next[idx][field] = val;
    if (field === 'n') {
      const found = products.find(p => p.n === val);
      if (found) {
        next[idx].p = found.p;
        next[idx].b = found.b;
        next[idx].u = found.u;
      }
    }
    setBillItems(next);
  };

  const broadcastRateSheet = () => {
    const today = new Date().toLocaleDateString('en-IN');
    let msg = `*AS ENTERPRISES — TODAY'S WHOLESALE MARKET RATES (${today})*\n` +
              `Hyderabad & Secunderabad Direct Yard Supply\n\n`;

    products.filter(p => p.visible !== false).slice(0, 10).forEach(p => {
      msg += `• *${p.n}* (${p.b}): ₹${p.p} ${p.u}\n`;
    });

    msg += `\n⚡ Free delivery available for wholesale quantities.\n` +
           `📞 Order / Quote: ${CFG.phone}\n` +
           `🌐 Book online: https://app-blue-nu-10.vercel.app/`;

    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Save Dynamic Bank Info
  const handleSaveBankInfo = async () => {
    setBankInfo(editBank);
    ls.set("bank_info", editBank);
    await syncToFirestore(products, workers, editBank);
    alert("Bank Account details updated live for all new invoices & statements!");
  };

  const handleCreateInvoice = (actionType) => {
    if (!invCust.trim()) { alert("Please enter Customer / Firm Name"); return; }
    if (billItems.length === 0) { alert("Add at least one item to bill"); return; }

    const taxable = billItems.reduce((s, it) => s + (parseFloat(it.q) || 0) * (parseFloat(it.p) || 0), 0);
    const disc = parseFloat(invDiscount) || 0;
    const adjTaxable = Math.max(0, taxable - disc);
    const gst = adjTaxable * 0.18;
    const grand = Math.round(adjTaxable + gst);
    const paidAmt = parseFloat(invPaid) || 0;
    const dueAmt = grand - paidAmt;

    const newInv = {
      id: "INV-" + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      customer: invCust.trim(),
      phone: invPhone.trim(),
      address: invAddress.trim() || "Hyderabad Yard Pickup",
      vehicle: invVehicle.trim() || "Direct Dispatch",
      items: billItems,
      taxable: taxable,
      discount: disc,
      gst: gst,
      grand: grand,
      paid: paidAmt,
      due: dueAmt,
      kantaImg: kantaImg,
      signature: signatureData,
      bankSnapshot: { ...bankInfo }
    };

    const updatedProducts = products.map(prod => {
      const match = billItems.find(it => it.n === prod.n);
      if (match) {
        return { ...prod, stock: Math.max(0, prod.stock - (parseInt(match.q) || 0)) };
      }
      return prod;
    });
    setProducts(updatedProducts);
    syncToFirestore(updatedProducts, workers, bankInfo);

    setInvoices([newInv, ...invoices]);

    if (dueAmt > 0) {
      const khataEntry = {
        id: Date.now(),
        customer: invCust.trim(),
        phone: invPhone.trim(),
        amt: dueAmt,
        type: 'credit',
        note: `Bill #${newInv.id} Balance Due`,
        date: new Date().toISOString()
      };
      setLedger([khataEntry, ...ledger]);
    }

    if (actionType === "print") {
      printTaxInvoiceDocument(newInv, false, bankInfo);
    } else if (actionType === "challan") {
      printTaxInvoiceDocument(newInv, true, bankInfo);
    } else if (actionType === "wa") {
      if (!invPhone.trim()) { alert("Enter mobile number to send WhatsApp bill"); return; }
      const itemsList = billItems.map(it => `• ${it.n} (${it.q} ${it.u}) @ ₹${it.p} = ₹${it.q * it.p}`).join('\n');
      const msg = `*AS ENTERPRISES — TAX INVOICE*\n` +
                  `Invoice No: *${newInv.id}*\n` +
                  `Date: ${new Date().toLocaleDateString('en-IN')}\n` +
                  `Customer: *${newInv.customer}*\n` +
                  `Vehicle: ${newInv.vehicle}\n\n` +
                  `*Materials:*\n${itemsList}\n\n` +
                  `Taxable: ₹${newInv.taxable.toFixed(2)}\n` +
                  (disc > 0 ? `Discount: -₹${disc.toFixed(2)}\n` : '') +
                  `GST (18%): ₹${newInv.gst.toFixed(2)}\n` +
                  `*Grand Total: ₹${newInv.grand}*\n` +
                  (dueAmt > 0 ? `Paid: ₹${paidAmt} | *Balance Due: ₹${dueAmt}*\n` : `Status: Fully Paid\n`) +
                  `UPI: ${upi}\n` +
                  `Bank: ${bankInfo.bankName} | A/c: ${bankInfo.accNo} | IFSC: ${bankInfo.ifsc}\n\n` +
                  `*Terms:* Unloading customer responsibility. Material non-returnable.\n` +
                  `AS Enterprises, Hyderabad · 6301456725`;
      window.open(`https://wa.me/91${invPhone.replace(/\D/g,'').slice(-10)}?text=${encodeURIComponent(msg)}`, '_blank');
    }
  };

  const TABS = [
    { k:"invoice_maker", n:"📄 Multi-Item GST Bill" },
    { k:"day_report", n:"📊 Day Close Report" },
    { k:"rates", n:"Material Rates" },
    { k:"orders", n:"Customer Orders" },
    { k:"workers", n:"Workers Rates" },
    { k:"products", n:"Add Product" },
    { k:"settings", n:"Bank & UPI Settings" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-3xl">{t.admin} Dashboard</h2>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full mt-1 inline-block">Authorized: 6301</span>
        </div>
        <button 
          onClick={broadcastRateSheet}
          className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow"
          title="Share Today's Rates on WhatsApp"
        >
          <Share2 size={15} /> Daily Rate Sheet
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map(x => (
          <button key={x.k} onClick={() => setTab(x.k)} className={`text-xs font-bold px-3 py-2 rounded-full transition ${tab===x.k?'bg-orange-500 text-white shadow':'bg-white border-2 border-stone-300 text-stone-700 hover:border-orange-500'}`}>
            {x.n}
          </button>
        ))}
      </div>

      {/* DAY CLOSE REPORT TAB */}
      {tab === "day_report" && (
        <DayCloseReport invoices={invoices} />
      )}

      {/* MULTI-ITEM DIRECT INVOICE / BILL MAKER */}
      {tab === "invoice_maker" && (
        <div className="bg-white border-2 border-orange-500 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="border-b pb-3">
            <h3 className="font-display font-black text-xl text-stone-900 flex items-center gap-2">
              <FileText className="text-orange-600" size={22} />
              Multi-Item Tax Invoice & Transport Challan Maker
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">Add multiple materials (Cement + Steel + Sand) on a single compliant invoice.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Customer / Firm Name *</label>
              <input 
                type="text" 
                value={invCust} 
                onChange={e=>setInvCust(e.target.value)} 
                placeholder="e.g. Ramesh Builders / Sri Sai Rice Mill" 
                className="w-full border-2 border-stone-200 rounded-lg p-2.5 text-sm outline-none focus:border-orange-500" 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">WhatsApp Mobile Number *</label>
              <input 
                type="tel" 
                value={invPhone} 
                onChange={e=>setInvPhone(e.target.value)} 
                placeholder="10-digit phone for instant bill" 
                className="w-full border-2 border-stone-200 rounded-lg p-2.5 text-sm outline-none focus:border-orange-500" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Site Delivery Address</label>
              <input 
                type="text" 
                value={invAddress} 
                onChange={e=>setInvAddress(e.target.value)} 
                placeholder="Site location, Hyderabad" 
                className="w-full border-2 border-stone-200 rounded-lg p-2 text-sm outline-none focus:border-orange-500" 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Vehicle / Lorry Number (for Gate Pass)</label>
              <input 
                type="text" 
                value={invVehicle} 
                onChange={e=>setInvVehicle(e.target.value)} 
                placeholder="e.g. TS 08 UB 1234" 
                className="w-full border-2 border-stone-200 rounded-lg p-2 text-sm outline-none focus:border-orange-500" 
              />
            </div>
          </div>

          {/* MULTI-ITEM LIST */}
          <div className="space-y-2 border border-stone-200 rounded-xl p-3 bg-stone-50">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-black text-stone-700 uppercase tracking-wide">Materials & Products on this Bill</label>
              <button 
                type="button" 
                onClick={addBillItem} 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-3 py-1 rounded-lg flex items-center gap-1"
              >
                <Plus size={14} /> + Add Another Item
              </button>
            </div>

            {billItems.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-white p-2.5 rounded-lg border border-stone-200 items-center">
                <div className="sm:col-span-5">
                  <select 
                    value={item.n} 
                    onChange={e => updateBillItem(idx, 'n', e.target.value)} 
                    className="w-full border border-stone-300 rounded p-1.5 text-xs font-bold"
                  >
                    {products.map(p => <option key={p.id} value={p.n}>{p.n} ({p.b})</option>)}
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <input 
                    type="number" 
                    value={item.q} 
                    onChange={e => updateBillItem(idx, 'q', parseFloat(e.target.value) || 0)} 
                    placeholder="Qty" 
                    className="w-full border border-stone-300 rounded p-1.5 text-xs font-bold" 
                  />
                </div>
                <div className="sm:col-span-3">
                  <input 
                    type="number" 
                    value={item.p} 
                    onChange={e => updateBillItem(idx, 'p', parseFloat(e.target.value) || 0)} 
                    placeholder="Rate ₹" 
                    className="w-full border border-stone-300 rounded p-1.5 text-xs font-bold" 
                  />
                </div>
                <div className="sm:col-span-1 flex justify-center">
                  {billItems.length > 1 && (
                    <button onClick={() => removeBillItem(idx)} className="text-red-500 hover:bg-red-50 p-1.5 rounded">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Cash Discount (छूट ₹)</label>
              <input 
                type="number" 
                value={invDiscount} 
                onChange={e=>setInvDiscount(e.target.value)} 
                placeholder="0" 
                className="w-full border-2 border-stone-200 rounded-lg p-2 text-sm bg-white font-bold" 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Advance / Paid Amount (₹)</label>
              <input 
                type="number" 
                value={invPaid} 
                onChange={e=>setInvPaid(e.target.value)} 
                placeholder="0 (If fully unpaid)" 
                className="w-full border-2 border-stone-200 rounded-lg p-2 text-sm bg-white font-bold" 
              />
            </div>
          </div>

          {/* Weighbridge Dharam Kanta Slip Attachment & Digital Signature */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl">
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Weighbridge / Dharam Kanta Slip (Optional)</label>
              <input 
                type="file" 
                accept="image/*" 
                capture="environment"
                onChange={e => e.target.files[0] && readFile(e.target.files[0], setKantaImg)} 
                className="w-full text-xs" 
              />
              {kantaImg && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={kantaImg} alt="Kanta Preview" className="h-14 w-20 object-cover rounded border" />
                  <span className="text-[10px] text-green-700 font-bold">✓ Kanta slip attached</span>
                </div>
              )}
            </div>

            <div>
              <SignaturePad onSave={setSignatureData} />
            </div>
          </div>

          {/* Real-time Calculation Summary */}
          {(() => {
            const taxable = billItems.reduce((s, it) => s + (parseFloat(it.q) || 0) * (parseFloat(it.p) || 0), 0);
            const disc = parseFloat(invDiscount) || 0;
            const adjTaxable = Math.max(0, taxable - disc);
            const gst = adjTaxable * 0.18;
            const grand = Math.round(adjTaxable + gst);
            const paid = parseFloat(invPaid) || 0;
            const due = grand - paid;

            return (
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-3.5 text-xs space-y-1.5">
                <div className="flex justify-between text-stone-700">
                  <span>Gross Taxable Amount:</span>
                  <span className="font-bold">₹{taxable.toFixed(2)}</span>
                </div>
                {disc > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Cash Discount:</span>
                    <span className="font-bold">-₹{disc.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-700">
                  <span>GST Total (18% - 9% CGST + 9% SGST):</span>
                  <span className="font-bold">₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-orange-950 pt-1 border-t border-orange-200">
                  <span>Grand Total (Round Off):</span>
                  <span>₹{grand.toLocaleString('en-IN')}.00</span>
                </div>
                {due > 0 && (
                  <div className="flex justify-between text-red-700 font-bold pt-1">
                    <span>Balance Due to Wholesale Khata:</span>
                    <span>₹{due.toLocaleString('en-IN')}.00</span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            <button 
              onClick={() => handleCreateInvoice("print")}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow"
            >
              <Printer size={15} /> Print Tax Invoice PDF
            </button>
            <button 
              onClick={() => handleCreateInvoice("challan")}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow"
            >
              <Truck size={15} /> Gate Pass / Challan
            </button>
            <button 
              onClick={() => handleCreateInvoice("wa")}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow"
            >
              <MessageCircle size={15} /> Send WhatsApp Bill
            </button>
          </div>

          {/* Recent Created Invoices */}
          {invoices.length > 0 && (
            <div className="mt-6 pt-4 border-t border-stone-200">
              <h4 className="text-xs uppercase font-bold text-stone-500 mb-2">Recently Generated Invoices ({invoices.length})</h4>
              <div className="space-y-2 max-h-56 overflow-auto">
                {invoices.slice(0, 10).map((inv, idx) => (
                  <div key={idx} className="p-2.5 border rounded-lg bg-stone-50 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold">{inv.id} - {inv.customer}</div>
                      <div className="text-[10px] text-stone-500">Items: {inv.items?.length || 1} · ₹{inv.grand}</div>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={()=>printTaxInvoiceDocument(inv, false, bankInfo)} className="px-2 py-1 bg-stone-200 hover:bg-stone-300 rounded font-bold text-[11px]">Bill PDF</button>
                      <button onClick={()=>printTaxInvoiceDocument(inv, true, bankInfo)} className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded font-bold text-[11px]">Challan</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Material Rates Tab */}
      {tab === "rates" && (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 space-y-3">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-1">Edit Materials Price, Stock, Photo & Visibility</div>
          <div className="space-y-3 max-h-96 overflow-auto">
            {products.map(p => (
              <div key={p.id} className="p-3 border border-stone-200 rounded-xl space-y-2 bg-stone-50">
                <div className="flex items-center gap-2">
                  <img src={p.img} alt="" className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">{p.n}</div>
                    <div className="text-[10px] text-stone-500">{p.b} ({p.u})</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleVisibility(p.id)}
                    className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${p.visible !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-500'}`}
                  >
                    {p.visible !== false ? <Eye size={14}/> : <EyeOff size={14}/>}
                  </button>
                  <button onClick={()=>delProd(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] font-bold text-stone-500 block">Rate (₹)</label>
                    <input
                      type="number"
                      defaultValue={p.p}
                      onChange={(e) => { p.p = parseFloat(e.target.value) || 0; }}
                      className="w-full border border-stone-300 rounded p-1 text-xs font-black bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-stone-500 block">Stock</label>
                    <input
                      type="number"
                      defaultValue={p.stock}
                      onChange={(e) => { p.stock = parseInt(e.target.value) || 0; }}
                      className="w-full border border-stone-300 rounded p-1 text-xs bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => saveProductItem(p)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Check size={12} /> Save Changes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Orders Tab */}
      {tab === "orders" && (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 space-y-3">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-2">Customer Web Orders ({orders.length})</div>
          <div className="space-y-3 max-h-96 overflow-auto">
            {orders.length === 0 ? (
              <div className="text-xs text-stone-400 text-center py-4">No online customer orders yet</div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="p-3 border border-stone-200 rounded-xl space-y-2 bg-stone-50 text-xs">
                  <div className="flex justify-between items-center font-bold">
                    <span>{ord.id} - {ord.user}</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded">{ord.status}</span>
                  </div>
                  <div className="text-stone-600">Address: {ord.address}</div>
                  <div className="font-bold">Total: ₹{ord.total} ({ord.payment})</div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => printTaxInvoiceDocument(ord, false, bankInfo)} className="flex-1 bg-stone-900 text-white py-1.5 rounded font-bold">Tax PDF</button>
                    <button onClick={() => {
                      const updated = orders.map(o => o.id === ord.id ? { ...o, status: "Approved" } : o);
                      setOrders(updated);
                      alert("Order approved!");
                    }} className="flex-1 bg-green-600 text-white py-1.5 rounded font-bold">Approve</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Workers Tab */}
      {tab === "workers" && (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 space-y-3">
          <div className="text-xs uppercase tracking-widest text-orange-600 font-bold mb-2">Manage Skilled Workers Rates</div>
          <div className="space-y-3">
            {workers.map((w, idx) => (
              <div key={w.id || idx} className="p-3 border border-stone-200 rounded-xl bg-stone-50 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span>{w.role} - {w.name}</span>
                  <span className="text-orange-600 font-black">₹{w.rate}/day</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    defaultValue={w.name} 
                    onChange={e => { w.name = e.target.value; }} 
                    placeholder="Worker Name" 
                    className="border p-1 rounded bg-white" 
                  />
                  <input 
                    type="number" 
                    defaultValue={w.rate} 
                    onChange={e => { w.rate = Number(e.target.value); }} 
                    placeholder="Rate" 
                    className="border p-1 rounded bg-white font-bold" 
                  />
                </div>
                <button 
                  onClick={async () => {
                    const updated = [...workers];
                    setWorkers(updated);
                    await syncToFirestore(products, updated, bankInfo);
                    alert("Worker saved!");
                  }} 
                  className="bg-orange-500 text-white px-3 py-1 rounded font-bold"
                >
                  Save Worker
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Product Tab */}
      {tab === "products" && (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 space-y-3">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">Add New Material / Brand</div>
          <input value={newProd.n} onChange={e=>setNewProd({...newProd, n:e.target.value})} placeholder="Product Name (e.g. TMT 12mm)" className="w-full border-2 border-stone-200 rounded-lg p-2 text-sm outline-none focus:border-orange-500" />
          <div className="grid grid-cols-2 gap-2">
            <input value={newProd.b} onChange={e=>setNewProd({...newProd, b:e.target.value})} placeholder="Brand (e.g. Tata Tiscon)" className="border-2 border-stone-200 rounded-lg p-2 text-sm outline-none focus:border-orange-500" />
            <input type="number" value={newProd.p} onChange={e=>setNewProd({...newProd, p:e.target.value})} placeholder="Price ₹" className="border-2 border-stone-200 rounded-lg p-2 text-sm outline-none focus:border-orange-500" />
          </div>
          <button onClick={addProd} className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-full">+ Add Product to Store</button>
        </div>
      )}

      {/* Bank & Settings Tab */}
      {tab === "settings" && (
        <div className="space-y-4">
          <div className="bg-white border-2 border-orange-500 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-orange-600 font-black text-sm uppercase tracking-wide">
              <Building size={18} />
              <span>Live Bank Account Manager (For Invoices & NEFT)</span>
            </div>
            <p className="text-xs text-stone-500">Whatever bank details you save here will be printed on all official Tax Invoices & WhatsApp messages.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Bank Name</label>
                <input 
                  type="text" 
                  value={editBank.bankName} 
                  onChange={e => setEditBank({ ...editBank, bankName: e.target.value })} 
                  className="w-full border border-stone-300 rounded p-2 text-xs font-bold" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Account Number</label>
                <input 
                  type="text" 
                  value={editBank.accNo} 
                  onChange={e => setEditBank({ ...editBank, accNo: e.target.value })} 
                  className="w-full border border-stone-300 rounded p-2 text-xs font-bold" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">IFSC Code</label>
                <input 
                  type="text" 
                  value={editBank.ifsc} 
                  onChange={e => setEditBank({ ...editBank, ifsc: e.target.value })} 
                  className="w-full border border-stone-300 rounded p-2 text-xs font-bold" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Branch Name</label>
                <input 
                  type="text" 
                  value={editBank.branch} 
                  onChange={e => setEditBank({ ...editBank, branch: e.target.value })} 
                  className="w-full border border-stone-300 rounded p-2 text-xs font-bold" 
                />
              </div>
            </div>

            <button 
              onClick={handleSaveBankInfo}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 shadow"
            >
              <Check size={14} /> Save Bank Details
            </button>
          </div>

          <div className="bg-white border-2 border-stone-200 rounded-2xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-stone-500">{t.changeUpi}</div>
            <div className="text-sm">{t.currentUpi}: <span className="font-bold text-orange-600">{upi}</span></div>
            <div className="flex gap-2">
              <input value={newUpi} onChange={e=>setNewUpi(e.target.value)} className="flex-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500 text-xs" placeholder="yourname@upi" />
              <button onClick={()=>saveUpi(newUpi)} className="bg-stone-900 text-white font-bold px-4 py-2 rounded-lg text-xs">{t.saveUpi}</button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest opacity-90">Backup & Deploy</div>
            <button onClick={downloadZip} className="w-full bg-white text-stone-900 font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-stone-100 text-xs"><Download size={18} /> {t.zip}</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============= GALLERY =============
function GalleryScreen({ gallery, setGallery }) {
  const fileRef = useRef();
  const readFile = (file, cb) => { const r = new FileReader(); r.onload = () => cb(r.result); r.readAsDataURL(file); };
  const addImgs = (files) => {
    const arr = Array.from(files).slice(0, 100);
    const promises = arr.map(f => new Promise(res => readFile(f, res)));
    Promise.all(promises).then(dataUrls => {
      const newItems = dataUrls.map((d, i) => ({ id: Date.now() + i, img: d, caption: "", date: new Date().toISOString() }));
      setGallery([...newItems, ...gallery]);
    });
  };
  const del = (id) => setGallery(gallery.filter(g => g.id !== id));

  return (
    <div className="space-y-4">
      <h2 className="font-display font-black text-3xl">Project Gallery</h2>
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-4 space-y-3">
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => e.target.files.length && addImgs(e.target.files)} className="hidden" />
        <button onClick={() => fileRef.current?.click()} className="w-full flex items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-full"><Camera size={14} /> Upload Site Photos</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {gallery.map(g => (
          <div key={g.id} className="bg-white border rounded-xl overflow-hidden relative">
            <img src={g.img} alt="" className="w-full aspect-square object-cover" />
            <button onClick={()=>del(g.id)} className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full"><Trash2 size={12}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= MISTRI LOYALTY =============
function LoyaltyScreen({ orders, user }) {
  const points = orders.reduce((s, o) => s + (o.loyalty || 0), 0);
  const tier = points > 500 ? "Gold" : points > 100 ? "Silver" : "Bronze";
  const tierColor = tier==="Gold"?"from-amber-400 to-yellow-600":tier==="Silver"?"from-slate-300 to-slate-500":"from-orange-700 to-amber-900";
  return (
    <div className="space-y-4">
      <h2 className="font-display font-black text-3xl">Mistri Loyalty Program</h2>
      <div className={`bg-gradient-to-br ${tierColor} text-white rounded-2xl p-6 shadow-xl relative overflow-hidden`}>
        <Award size={100} className="absolute -right-4 -top-4 opacity-20" />
        <div className="text-xs uppercase tracking-widest opacity-80">Total Points</div>
        <div className="font-display font-black text-5xl mt-1">{points}</div>
        <div className="text-sm mt-1 opacity-90">Tier: <b>{tier}</b></div>
      </div>
    </div>
  );
}

// ============= EMI CALCULATOR =============
function EmiScreen() {
  const [amt, setAmt] = useState("100000");
  const [rate, setRate] = useState("12");
  const [months, setMonths] = useState("6");
  const P = parseFloat(amt) || 0;
  const r = (parseFloat(rate) || 0) / 12 / 100;
  const n = parseInt(months) || 1;
  const emi = r > 0 ? Math.round((P * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1)) : Math.round(P / n);
  const total = emi * n;
  return (
    <div className="space-y-4">
      <h2 className="font-display font-black text-3xl">Material EMI Calculator</h2>
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-5 space-y-3">
        <label className="block text-xs font-bold">Material Loan Amount ₹<input type="number" value={amt} onChange={e=>setAmt(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500 text-lg font-bold" /></label>
        <label className="block text-xs font-bold">Tenure (months)<input type="number" value={months} onChange={e=>setMonths(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500" /></label>
      </div>
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-2xl p-6">
        <div className="text-xs uppercase tracking-widest opacity-80">Monthly EMI</div>
        <div className="font-display font-black text-5xl mt-1">₹{emi.toLocaleString()}</div>
      </div>
      <a href={`https://wa.me/${CFG.wa}?text=EMI%20Quote:%20Rs.${P}%20for%20${n}m%20=%20Rs.${emi}/mo`} target="_blank" rel="noreferrer" className="block bg-green-600 hover:bg-green-700 text-white text-center font-bold py-3 rounded-full">Apply for Wholesale Credit on WhatsApp</a>
    </div>
  );
}
