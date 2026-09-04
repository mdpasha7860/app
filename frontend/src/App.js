import React, { useState, useEffect, useMemo, useRef } from "react";
import "@/App.css";
import { QRCodeSVG } from "qrcode.react";
import { Phone, MessageCircle, Search, ShoppingCart, ArrowLeft, User, Truck, BookOpen, Sparkles, Calculator, Download, Shield, LogOut, Trash2, Plus, Minus, ClipboardList, Menu, RefreshCw, Settings, Headphones, X, Moon, Sun, Mic, Star, Camera, Upload, FileSpreadsheet, TrendingUp, Award, CreditCard, Edit3, Image as ImageIcon, FileText, MapPin, AlertTriangle, KeyRound, Percent, Database } from "lucide-react";

// ============= CONFIG =============
const CFG = {
  phone: "+91 6301456725",
  wa: "916301456725",
  brand: "AS Enterprises",
  defaultHero: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80",
  defaultHeadline: "Build Stronger. Order Smarter.",
};
const getUPI = () => localStorage.getItem("customUpi") || "9030574216@upi";
const getHero = () => localStorage.getItem("bannerImg") || CFG.defaultHero;
const getHeadline = () => localStorage.getItem("bannerText") || "";

// ============= TRANSLATIONS (unchanged) =============
const T = {
  EN: { b:"Build Stronger. Order Smarter.", c:"Cart", s:"Same-Day Delivery", w:"Wholesale Khata", g:"Genuine Brands", f:"Free Estimate", zip:"Download ZIP Backup", home:"Home", search:"Search TMT, Cement, Sand, Bricks...", login:"Login", logout:"Logout", orders:"My Orders", admin:"Admin", call:"Call Now", wa:"WhatsApp", cart:"Cart", buy:"Add to Cart", total:"Total", checkout:"Place Order", address:"Delivery Address", cod:"Cash on Delivery", upi:"Pay via UPI", confirm:"Confirm Order", noResults:"No products found. Call 6301456725 for custom order.", tracker:"Live Order Tracker", khata:"Wholesale Khata", catalog:"Brand Catalog", estimator:"Estimate Calculator", welcome:"Welcome", mobile:"Mobile Number", otp:"Enter OTP", sendOtp:"Send OTP", verify:"Verify & Login", pinLbl:"Enter Admin PIN", changeUpi:"Change UPI ID", currentUpi:"Current UPI", saveUpi:"Save UPI", zipInfo:"If publish fails, upload this ZIP to netlify.com/drop", qty:"Qty", stock:"In Stock", cat:"Category", all:"All", tmt:"TMT Bars", cement:"Cement", sand:"Sand & Aggregate", brick:"Bricks", tools:"Tools", empty:"Cart is empty", noord:"No orders yet", ordid:"Order", status:"Status", pending:"Pending", scan:"Scan QR to Pay", payto:"Pay to", est:"Enter dimensions to estimate", len:"Length (ft)", wid:"Width (ft)", ht:"Height (ft)", need:"You need approx", bags:"bags of Cement", tons:"tons of TMT", cft:"cft of Sand", bricks:"Bricks (approx)", calc:"Calculate", ledger:"Ledger", customer:"Customer", amt:"Amount", add:"Add Entry", credit:"Credit", debit:"Debit", note:"Note", del:"Delete", eta:"ETA Today", driver:"Driver", low:"LOW STOCK", tick:"⚡ Same-Day Delivery · Wholesale Rates · Genuine Brands · Free Estimate · Call 6301456725" },
  HI: { b:"मजबूत बनाएं। स्मार्ट ऑर्डर करें।", c:"टोकरी", s:"आज डिलीवरी", w:"थोक खाता", g:"असली ब्रांड", f:"फ्री एस्टीमेट", zip:"ZIP डाउनलोड", home:"होम", search:"सरिया, सीमेंट, रेत, ईंट खोजें...", login:"लॉगिन", logout:"लॉगआउट", orders:"मेरे ऑर्डर", admin:"एडमिन", call:"कॉल करें", wa:"व्हाट्सएप", cart:"टोकरी", buy:"जोड़ें", total:"कुल", checkout:"ऑर्डर करें", address:"पता", cod:"कैश ऑन डिलीवरी", upi:"UPI से भुगतान", confirm:"पुष्टि करें", noResults:"कोई सामान नहीं मिला। 6301456725 पर कॉल करें।", tracker:"लाइव ऑर्डर ट्रैकर", khata:"थोक खाता", catalog:"ब्रांड कैटलॉग", estimator:"अनुमान कैलकुलेटर", welcome:"स्वागत है", mobile:"मोबाइल नंबर", otp:"OTP दर्ज करें", sendOtp:"OTP भेजें", verify:"वेरीफाई करें", pinLbl:"एडमिन PIN डालें", changeUpi:"UPI बदलें", currentUpi:"मौजूदा UPI", saveUpi:"UPI सेव करें", zipInfo:"पब्लिश फेल हो तो ZIP netlify.com/drop पर अपलोड करें", qty:"मात्रा", stock:"स्टॉक में", cat:"श्रेणी", all:"सभी", tmt:"सरिया", cement:"सीमेंट", sand:"रेत/गिट्टी", brick:"ईंट", tools:"औजार", empty:"टोकरी खाली", noord:"कोई ऑर्डर नहीं", ordid:"ऑर्डर", status:"स्थिति", pending:"लंबित", scan:"QR स्कैन करें", payto:"भुगतान", est:"माप डालें", len:"लंबाई (फीट)", wid:"चौड़ाई (फीट)", ht:"ऊंचाई (फीट)", need:"आपको चाहिए", bags:"सीमेंट बैग", tons:"टन सरिया", cft:"cft रेत", bricks:"ईंटें", calc:"गणना करें", ledger:"बही", customer:"ग्राहक", amt:"राशि", add:"जोड़ें", credit:"जमा", debit:"नाम", note:"नोट", del:"हटाएं", eta:"आज पहुंचेगा", driver:"ड्राइवर", low:"स्टॉक कम", tick:"⚡ आज डिलीवरी · थोक रेट · असली ब्रांड · फ्री एस्टीमेट · कॉल 6301456725" },
  TE: { b:"బలంగా నిర్మించండి. తెలివిగా ఆర్డర్ చేయండి.", c:"బుట్ట", s:"ఈరోజే డెలివరీ", w:"హోల్‌సేల్ ఖాతా", g:"అసలైన బ్రాండ్", f:"ఉచిత అంచనా", zip:"ZIP డౌన్‌లోడ్", home:"హోమ్", search:"సరియా, సిమెంట్, ఇసుక, ఇటుకలు...", login:"లాగిన్", logout:"లాగౌట్", orders:"నా ఆర్డర్లు", admin:"అడ్మిన్", call:"కాల్ చేయండి", wa:"వాట్సాప్", cart:"బుట్ట", buy:"జోడించు", total:"మొత్తం", checkout:"ఆర్డర్ చేయండి", address:"చిరునామా", cod:"క్యాష్ ఆన్ డెలివరీ", upi:"UPI చెల్లింపు", confirm:"నిర్ధారించండి", noResults:"వస్తువులు లేవు. 6301456725 కు కాల్ చేయండి.", tracker:"లైవ్ ఆర్డర్ ట్రాకర్", khata:"హోల్‌సేల్ ఖాతా", catalog:"బ్రాండ్ కేటలాగ్", estimator:"అంచనా కాలిక్యులేటర్", welcome:"స్వాగతం", mobile:"మొబైల్ నంబర్", otp:"OTP నమోదు", sendOtp:"OTP పంపండి", verify:"వెరిఫై చేయండి", pinLbl:"అడ్మిన్ PIN", changeUpi:"UPI మార్చండి", currentUpi:"ప్రస్తుత UPI", saveUpi:"UPI సేవ్ చేయండి", zipInfo:"పబ్లిష్ ఫెయిల్ అయితే ZIP ని netlify.com/drop కు అప్‌లోడ్ చేయండి", qty:"పరిమాణం", stock:"స్టాక్‌లో", cat:"వర్గం", all:"అన్నీ", tmt:"సరియా", cement:"సిమెంట్", sand:"ఇసుక/కంకర", brick:"ఇటుకలు", tools:"పరికరాలు", empty:"బుట్ట ఖాళీ", noord:"ఆర్డర్లు లేవు", ordid:"ఆర్డర్", status:"స్థితి", pending:"పెండింగ్", scan:"QR స్కాన్ చేయండి", payto:"చెల్లింపు", est:"కొలతలు ఇవ్వండి", len:"పొడవు (అడుగు)", wid:"వెడల్పు (అడుగు)", ht:"ఎత్తు (అడుగు)", need:"కావాలి", bags:"సిమెంట్ బస్తాలు", tons:"టన్నుల సరియా", cft:"cft ఇసుక", bricks:"ఇటుకలు", calc:"లెక్కించండి", ledger:"లెడ్జర్", customer:"కస్టమర్", amt:"మొత్తం", add:"జోడించు", credit:"క్రెడిట్", debit:"డెబిట్", note:"నోట్", del:"తొలగించు", eta:"ఈరోజు", driver:"డ్రైవర్", low:"స్టాక్ తక్కువ", tick:"⚡ ఈరోజే డెలివరీ · హోల్‌సేల్ రేట్లు · అసలైన బ్రాండ్ · ఉచిత అంచనా · 6301456725" }
};

const MAP = { sariya:'tmt', saria:'tmt', steel:'tmt', rod:'tmt', tmt:'tmt', cement:'cement', simenti:'cement', ppc:'cement', opc:'cement', ret:'sand', balu:'sand', sand:'sand', isuka:'sand', metal:'sand', aggregate:'sand', gitti:'sand', brick:'brick', eent:'brick', itukalu:'brick', block:'brick', wire:'tools', tool:'tools' };

const DEFAULT_PRODUCTS = [
  { id:1, n:"TMT Bar Fe500 8mm", b:"Tata Tiscon", p:62, u:"per kg", cat:"tmt", stock:250, rating:4.7, img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:2, n:"TMT Bar Fe500 10mm", b:"JSW Neosteel", p:61, u:"per kg", cat:"tmt", stock:180, rating:4.6, img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:3, n:"TMT Bar Fe500 12mm", b:"SAIL", p:60, u:"per kg", cat:"tmt", stock:8, rating:4.5, img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:4, n:"TMT Bar Fe500 16mm", b:"Kamdhenu", p:59, u:"per kg", cat:"tmt", stock:120, rating:4.4, img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:5, n:"TMT Bar Fe550 20mm", b:"Tata Tiscon", p:63, u:"per kg", cat:"tmt", stock:90, rating:4.8, img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:6, n:"OPC 53 Grade Cement", b:"UltraTech", p:410, u:"per bag (50kg)", cat:"cement", stock:320, rating:4.9, img:"https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=400&q=70" },
  { id:7, n:"PPC Cement", b:"Ambuja", p:380, u:"per bag (50kg)", cat:"cement", stock:210, rating:4.7, img:"https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=400&q=70" },
  { id:8, n:"PPC Cement", b:"ACC Gold", p:385, u:"per bag (50kg)", cat:"cement", stock:6, rating:4.6, img:"https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=400&q=70" },
  { id:9, n:"White Cement", b:"JK White", p:850, u:"per bag (25kg)", cat:"cement", stock:45, rating:4.5, img:"https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=400&q=70" },
  { id:10, n:"River Sand (Ret / Balu)", b:"Local", p:1800, u:"per ton", cat:"sand", stock:60, rating:4.3, img:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=70" },
  { id:11, n:"M-Sand (Manufactured)", b:"Robo Silicon", p:1400, u:"per ton", cat:"sand", stock:80, rating:4.4, img:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=70" },
  { id:12, n:"20mm Aggregate (Metal)", b:"Local", p:1200, u:"per ton", cat:"sand", stock:100, rating:4.2, img:"https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=400&q=70" },
  { id:13, n:"12mm Aggregate", b:"Local", p:1250, u:"per ton", cat:"sand", stock:75, rating:4.3, img:"https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=400&q=70" },
  { id:14, n:"Red Bricks Class A", b:"Local Kiln", p:9, u:"per piece", cat:"brick", stock:5000, rating:4.5, img:"https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=400&q=70" },
  { id:15, n:"Fly Ash Bricks", b:"EcoBrick", p:7, u:"per piece", cat:"brick", stock:3200, rating:4.4, img:"https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=400&q=70" },
  { id:16, n:"AAC Blocks 600x200x100", b:"Magicrete", p:65, u:"per piece", cat:"brick", stock:900, rating:4.7, img:"https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=400&q=70" },
  { id:17, n:"Steel Binding Wire", b:"Tata Wiron", p:85, u:"per kg", cat:"tools", stock:150, rating:4.6, img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70" },
  { id:18, n:"GI Wire 8 Gauge", b:"Bansal", p:95, u:"per kg", cat:"tools", stock:110, rating:4.5, img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70" }
];

const ls = {
  get: (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { console.error(e); } }
};

// ============= WORKERS (edit name/rate/phone here) =============
const WORKERS = [
  { id:1, role:"Rajmistri (Mason)", name:"Ramesh Kumar", rate:850, phone:"916301456725", icon:"🧱", exp:"12 yrs" },
  { id:2, role:"Electrician", name:"Suresh Reddy", rate:700, phone:"916301456725", icon:"⚡", exp:"8 yrs" },
  { id:3, role:"Plumber", name:"Mahesh Yadav", rate:650, phone:"916301456725", icon:"🔧", exp:"10 yrs" },
  { id:4, role:"Builder / Contractor", name:"Anil Sharma", rate:1500, phone:"916301456725", icon:"👷", exp:"18 yrs" },
  { id:5, role:"Welder", name:"Prakash Verma", rate:800, phone:"916301456725", icon:"🔥", exp:"7 yrs" }
];

// ============= FLOAT BUTTONS (LOCKED) =============
const FloatButtons = () => (
  <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50 wa-call-lock">
    <a data-testid="whatsapp-fixed-btn" href={`https://wa.me/${CFG.wa}`} target="_blank" rel="noreferrer" className="wa-btn-lock flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg font-bold transition-transform hover:scale-105">
      <MessageCircle size={20} /> <span className="hidden sm:inline">WA {CFG.wa}</span>
    </a>
    <a data-testid="call-fixed-btn" href={`tel:${CFG.phone.replace(/\s/g,'')}`} className="call-btn-lock flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-full shadow-lg font-bold transition-transform hover:scale-105">
      <Phone size={20} /> <span className="hidden sm:inline">{CFG.phone}</span>
    </a>
  </div>
);

// ============= APP =============
export default function App() {
  const [screen, setScreen] = useState("home");
  const [lang, setLang] = useState(ls.get("lang", "EN"));
  const [cart, setCart] = useState(ls.get("cart", []));
  const [user, setUser] = useState(ls.get("userProfile", null));
  const [orders, setOrders] = useState(ls.get("myOrders", []));
  const [ledger, setLedger] = useState(ls.get("ledger", []));
  const [products, setProducts] = useState(ls.get("products", DEFAULT_PRODUCTS));
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

  useEffect(() => ls.set("lang", lang), [lang]);
  useEffect(() => ls.set("cart", cart), [cart]);
  useEffect(() => ls.set("myOrders", orders), [orders]);
  useEffect(() => ls.set("ledger", ledger), [ledger]);
  useEffect(() => ls.set("products", products), [products]);
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
    let list = products;
    if (category !== "ALL") list = list.filter(p => p.cat === category);
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const mapped = MAP[q];
      list = list.filter(p => p.n.toLowerCase().includes(q) || p.b.toLowerCase().includes(q) || (mapped && p.cat === mapped));
    }
    return list;
  }, [query, category, products]);

  const lowStock = useMemo(() => products.filter(p => p.stock < 10), [products]);

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
      // Feature 20: Auto WhatsApp Update
      const msg = `New Order ${order.id}%0A${cart.map(x => `${x.n} x ${x.q} = ₹${x.p*x.q}`).join('%0A')}%0ATotal: ₹${cartTotal}%0APay: ${payment}%0AAddress: ${address}%0A+${order.loyalty} Mistri Points`;
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
      {/* HEADER NAVY */}
      <header className="sticky top-0 z-40 border-b-4 border-orange-500 shadow-lg" style={{ backgroundColor: "#0A1931" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button data-testid="home-btn" onClick={() => go("home")} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center font-black text-lg rounded-md shadow group-hover:rotate-3 transition">AS</div>
            <div className="text-left">
              <div className="font-display font-black text-lg leading-none tracking-tight text-white">{CFG.brand}</div>
              <div className="text-[10px] text-orange-300 uppercase tracking-widest">BuildMart</div>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 border border-white/20 rounded-full p-1 bg-white/5">
              {["EN","HI","TE"].map(l => (
                <button key={l} data-testid={`lang-${l}-btn`} onClick={() => setLang(l)} className={`text-xs font-bold px-2 py-1 rounded-full transition ${lang===l?'bg-orange-500 text-white':'text-white/70 hover:bg-white/10'}`}>{l}</button>
              ))}
            </div>
            <button data-testid="cart-header-btn" onClick={() => go("cart")} className="relative p-2 hover:bg-white/10 rounded-full text-white">
              <ShoppingCart size={20} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">{cart.reduce((s,x)=>s+x.q,0)}</span>}
            </button>
            <button data-testid="orders-header-btn" onClick={() => go("orders")} className="p-2 hover:bg-white/10 rounded-full text-white hidden sm:inline-flex"><ClipboardList size={20} /></button>
            {user ? (
              <button data-testid="user-btn" onClick={logout} className="hidden md:flex items-center gap-1 text-sm bg-orange-500 text-white px-3 py-1.5 rounded-full"><LogOut size={14} /> {user.name?.split(' ')[0] || user.mobile}</button>
            ) : (
              <button data-testid="login-header-btn" onClick={() => go("login")} className="hidden md:flex items-center gap-1 text-sm bg-orange-500 text-white px-3 py-1.5 rounded-full"><User size={14} /> {t.login}</button>
            )}
            <div className="relative">
              <button data-testid="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} className="relative z-50 p-2 hover:bg-white/10 rounded-full text-white">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                  <div data-testid="hamburger-menu" className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border-2 border-stone-200 overflow-hidden z-50">
                    <MenuItem tid="menu-refresh-btn" icon={RefreshCw} color="text-blue-600" label="Refresh" onClick={() => { setMenuOpen(false); window.location.reload(); }} />
                    {user ? (
                      <MenuItem tid="menu-logout-btn" icon={LogOut} color="text-red-600" label={`Logout (${user.name?.split(' ')[0] || user.mobile})`} onClick={() => { setMenuOpen(false); logout(); }} />
                    ) : (
                      <MenuItem tid="menu-login-btn" icon={User} color="text-orange-600" label="Login (Mobile OTP)" onClick={() => { setMenuOpen(false); go("login"); }} />
                    )}
                    <MenuItem tid="menu-settings-btn" icon={Settings} color="text-stone-700" label="Settings" onClick={() => { setMenuOpen(false); go("admin"); }} />
                    <MenuItem tid="menu-admin-btn" icon={Shield} color="text-orange-600" label="Admin" badge="6301" onClick={() => { setMenuOpen(false); go("admin"); }} />
                    <MenuItem tid="menu-gallery-btn" icon={ImageIcon} color="text-purple-600" label="Gallery" onClick={() => { setMenuOpen(false); go("gallery"); }} />
                    <MenuItem tid="menu-loyalty-btn" icon={Award} color="text-amber-600" label="Mistri Loyalty" onClick={() => { setMenuOpen(false); go("loyalty"); }} />
                    <MenuItem tid="menu-emi-btn" icon={CreditCard} color="text-emerald-600" label="EMI Calculator" onClick={() => { setMenuOpen(false); go("emi"); }} />
                    <MenuItem tid="menu-ai-btn" icon={TrendingUp} color="text-rose-600" label="AI Rate Predictor" onClick={() => { setMenuOpen(false); go("predictor"); }} />
                    <MenuItem tid="menu-sync-btn" icon={Database} color="text-emerald-600" label="Data Sync (Backup)" onClick={() => { setMenuOpen(false); go("admin"); }} />
                    <MenuItem tid="menu-dark-btn" icon={dark?Sun:Moon} color="text-indigo-600" label={dark?"Light Mode":"Dark Mode"} onClick={() => { setDark(!dark); setMenuOpen(false); }} />
                    <a data-testid="menu-care-btn" href={`https://wa.me/${CFG.wa}?text=Customer%20Care`} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 text-left">
                      <Headphones size={16} className="text-green-600" />
                      <span className="text-sm font-bold text-stone-900">Customer Care</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Feature 3: TICKER */}
      <div data-testid="ticker" className="bg-orange-500 text-white overflow-hidden py-2 border-b-2 border-orange-700">
        <div className="ticker-track font-bold text-sm whitespace-nowrap">
          {t.tick} · {t.tick} · {t.tick}
        </div>
      </div>

      {/* Feature 14: LOW STOCK ALERT */}
      {lowStock.length > 0 && screen === "home" && (
        <div data-testid="low-stock-alert" className="bg-red-50 border-b-2 border-red-500 py-2">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 text-xs sm:text-sm font-bold text-red-700">
            <AlertTriangle size={16} className="animate-pulse flex-shrink-0" />
            <span>{t.low}: {lowStock.map(p=>p.n).join(", ")}</span>
          </div>
        </div>
      )}

      {screen !== "home" && (
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <button data-testid="back-btn" onClick={back} className="flex items-center gap-2 text-sm font-bold text-stone-700 hover:text-orange-600 transition dark-text">
            <ArrowLeft size={16} /> {t.home}
          </button>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 pb-24 pt-4">
        {screen === "home" && <HomeScreen t={t} lang={lang} setScreen={go} CARDS={CARDS} query={query} doSearch={doSearch} category={category} setCategory={setCategory} filtered={filtered} addToCart={addToCart} heroImg={heroImg} heroTxt={heroTxt} />}
        {screen === "catalog" && <CatalogScreen t={t} query={query} doSearch={doSearch} category={category} setCategory={setCategory} filtered={filtered} addToCart={addToCart} />}
        {screen === "cart" && <CartScreen t={t} cart={cart} updateQty={updateQty} removeItem={removeItem} total={cartTotal} onCheckout={placeOrder} upi={upi} user={user} />}
        {screen === "orders" && <OrdersScreen t={t} orders={orders} setOrders={setOrders} upi={upi} />}
        {screen === "tracker" && <TrackerScreen t={t} orders={orders} />}
        {screen === "khata" && <KhataScreen t={t} ledger={ledger} setLedger={setLedger} upi={upi} />}
        {screen === "estimator" && <EstimatorScreen t={t} />}
        {screen === "login" && <LoginScreen t={t} onLogin={(u)=>{setUser(u); ls.set("userProfile", u); go("home");}} />}
        {screen === "admin" && <AdminScreen t={t} unlocked={adminUnlocked} setUnlocked={setAdminUnlocked} upi={upi} saveUpi={saveUpi} downloadZip={downloadZip} orders={orders} products={products} setProducts={setProducts} setHeroImg={setHeroImg} setHeroTxt={setHeroTxt} heroImg={heroImg} heroTxt={heroTxt} />}
        {screen === "gallery" && <GalleryScreen gallery={gallery} setGallery={setGallery} />}
        {screen === "loyalty" && <LoyaltyScreen orders={orders} user={user} />}
        {screen === "emi" && <EmiScreen />}
        {screen === "predictor" && <PredictorScreen products={products} />}
      </main>

      <footer className="border-t-4 border-orange-500 py-6 mt-8" style={{ backgroundColor: "#0A1931" }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <div className="font-bold">© 2026 {CFG.brand}. All rights reserved.</div>
          <div className="flex gap-4">
            <button data-testid="admin-footer-btn" onClick={() => go("admin")} className="flex items-center gap-1 hover:text-orange-400"><Shield size={12} /> {t.admin}</button>
            <a href={`tel:${CFG.phone.replace(/\s/g,'')}`} className="hover:text-orange-400">{CFG.phone}</a>
          </div>
        </div>
      </footer>

      <FloatButtons />
    </div>
  );
}

const MenuItem = ({ tid, icon: Icon, color, label, badge, onClick }) => (
  <button data-testid={tid} onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-100 text-left border-b border-stone-100">
    <Icon size={16} className={color} />
    <span className="text-sm font-bold text-stone-900 flex-1">{label}</span>
    {badge && <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{badge}</span>}
  </button>
);

// ============= Feature 19: VOICE SEARCH =============
function VoiceMic({ onResult, lang }) {
  const [listening, setListening] = useState(false);
  const start = () => {
    try {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) { alert("Voice not supported. Please type."); return; }
      const rec = new SR();
      rec.lang = lang === "HI" ? "hi-IN" : lang === "TE" ? "te-IN" : "en-IN";
      rec.onresult = (e) => { onResult(e.results[0][0].transcript); setListening(false); };
      rec.onerror = () => setListening(false);
      rec.onend = () => setListening(false);
      rec.start(); setListening(true);
    } catch (e) { console.error(e); setListening(false); }
  };
  return (
    <button data-testid="voice-mic-btn" onClick={start} className={`p-2 rounded-full transition ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-orange-100 text-orange-600 hover:bg-orange-200'}`} title="Voice Search">
      <Mic size={18} />
    </button>
  );
}

// ============= HOME =============
function HomeScreen({ t, lang, setScreen, CARDS, query, doSearch, category, setCategory, filtered, addToCart, heroImg, heroTxt }) {
  const CATS = [{k:"ALL",n:t.all},{k:"tmt",n:t.tmt},{k:"cement",n:t.cement},{k:"sand",n:t.sand},{k:"brick",n:t.brick},{k:"tools",n:t.tools}];
  return (
    <div className="space-y-4">
      {/* Feature 2 & 8: HERO NAVY (banner editable) - compact */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-orange-500 shadow-xl" data-testid="hero-banner" style={{ backgroundColor: "#0A1931" }}>
        <div className="relative p-4 sm:p-6 lg:p-8 text-white">
          <div className="inline-block px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-2">{CFG.brand} · BuildMart</div>
          <h1 data-testid="hero-headline" className="font-display font-black text-2xl 
 sm:text-3xl lg:text-4xl leading-tight tracking-tight max-w-3xl">
              <span className="font-serif italic font-bold">Build Stronger.<br />Order Smarter.</span>
            </h1>

            {/* Bada aur Saaf Font - Bina Chashme Ke Saaf Dikhne Wala */}
            <p className="text-base sm:text-lg mt-3 max-w-2xl text-stone-100 font-medium leading-relaxed">
              Cement, TMT steel, sand &amp; 10+ categories delivered across Greater Hyderabad. Live rates, wholesale pricing &amp; instant WhatsApp estimates.
            </p>

            {/* Premium Golden Button & Options */}
            <div className="flex flex-col sm:flex-row gap-2.5 mt-4">
              <button
                data-testid="hero-shop-btn"
                onClick={() => setScreen("catalog")}
                className="bg-[#f59e0b] hover:bg-[#d97706] text-stone-950 font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
              >
                BROWSE CATALOG &rarr;
              </button>

              <div className="flex gap-2">
                <a
                  data-testid="hero-mistri-btn"
                  href={`https://wa.me/${CFG.wa}?text=Hi%20AS,%20I%20want%20to%20book%20Mistri/Labour`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#059669] hover:bg-emerald-600 text-white font-bold text-xs px-3 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow"
                >
                  👷 Book Mistri/Labour
                </a>

                <a
                  data-testid="hero-wa-btn"
                  href={`https://wa.me/${CFG.wa}?text=Hi%20AS,%20I%20need%20a%20Free%20Estimate`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#1c2541] hover:bg-slate-800 text-white border border-amber-400/40 font-bold text-xs px-3 py-2.5 rounded-xl flex items-center justify-center shadow"
                >
                  Get Free Estimate
                </a>
              </div>
            </div>
          </div>
        </section>


      {/* Feature 19: SEARCH + VOICE - compact */}
      <section className="bg-white border-2 border-stone-900 rounded-full py-1.5 px-3 shadow-sm dark-card">
        <div className="flex items-center gap-2">
          <Search size={16} className="text-stone-500 flex-shrink-0" />
          <input data-testid="search-input" value={query} onChange={(e) => doSearch(e.target.value)} placeholder={t.search} className="flex-1 bg-transparent outline-none text-sm placeholder:text-stone-400 py-1" />
          <VoiceMic onResult={doSearch} lang={lang} />
          {query && <button onClick={() => doSearch("")} className="text-xs text-stone-500 hover:text-red-600 flex-shrink-0">✕</button>}
        </div>
      </section>

      {/* Feature 17: 4 SERVICE CARDS - compact */}
      <section className="grid grid-cols-4 gap-2">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <button key={c.go} data-testid={`card-${c.go}-btn`} onClick={() => setScreen(c.go)} className={`${c.color} text-white p-2.5 rounded-xl text-left font-bold shadow hover:shadow-lg transition-all hover:-translate-y-1 group`}>
              <Icon size={18} className="mb-1 opacity-90 group-hover:scale-110 transition" />
              <div className="text-[11px] sm:text-xs leading-tight">{c.t}</div>
            </button>
          );
        })}
      </section>

      <section className="flex flex-wrap gap-1.5">
        {CATS.map(c => (
          <button key={c.k} data-testid={`cat-${c.k}-btn`} onClick={() => setCategory(c.k)} className={`text-xs font-bold px-3 py-1 rounded-full transition ${category===c.k?'bg-orange-500 text-white':'bg-white border-2 border-stone-300 text-stone-700 hover:border-orange-500'}`}>{c.n}</button>
        ))}
      </section>

      {/* WORKERS SECTION - Hire skilled workers */}
      <WorkersSection wa={CFG.wa} />

      <ProductGrid t={t} filtered={filtered} addToCart={addToCart} />
    </div>
  );
}

// ============= WORKERS SECTION =============
function WorkersSection({ wa }) {
  return (
    <section data-testid="workers-section" className="space-y-2 pt-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-black text-lg" style={{ color: "#0A1931" }}>Hire Skilled Workers</h3>
        <span className="text-[10px] uppercase tracking-widest text-orange-600 font-bold">Book Direct · No Commission</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {WORKERS.map(w => (
          <div key={w.id} data-testid={`worker-${w.id}`} className="bg-white border-2 border-stone-200 hover:border-orange-500 rounded-xl p-2.5 shadow-sm hover:shadow-md transition group dark-card">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: "#0A1931" }}>
                <span>{w.icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-widest text-orange-600 font-bold truncate">{w.role}</div>
                <div className="font-bold text-xs truncate">{w.name}</div>
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="font-display font-black text-base">₹{w.rate}</span>
              <span className="text-[10px] text-stone-500">/day · {w.exp}</span>
            </div>
            <a data-testid={`worker-call-${w.id}`} href={`tel:+${w.phone}`} className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold py-1.5 rounded-full transition flex items-center justify-center gap-1">
              <Phone size={11} /> Call
            </a>
            <a data-testid={`worker-wa-${w.id}`} href={`https://wa.me/${w.phone}?text=Hi%20${encodeURIComponent(w.name)}%2C%20need%20${encodeURIComponent(w.role)}`} target="_blank" rel="noreferrer" className="mt-1 w-full bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold py-1.5 rounded-full transition flex items-center justify-center gap-1">
              <MessageCircle size={11} /> WA
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}


// ============= Feature 15: STAR RATING =============
const Stars = ({ n }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => <Star key={i} size={11} className={i<=Math.round(n)?"fill-amber-400 text-amber-400":"text-stone-300"} />)}
  </div>
);

function ProductGrid({ t, filtered, addToCart }) {
  if (filtered.length === 0) return (
    <div data-testid="no-results" className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-8 text-center">
      <div className="font-bold text-lg text-stone-900 mb-2">{t.noResults}</div>
      <a href={`tel:${CFG.phone.replace(/\s/g,'')}`} className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-full mt-2"><Phone size={16} /> {CFG.phone}</a>
    </div>
  );
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {filtered.map(p => (
        <div key={p.id} data-testid={`product-${p.id}`} className="bg-white border-2 border-stone-200 hover:border-orange-500 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group dark-card">
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
            <button data-testid={`add-cart-${p.id}-btn`} onClick={() => addToCart(p)} className="w-full bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold py-1.5 rounded-full transition">+ {t.buy}</button>
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
      <div className="bg-white border-2 border-stone-900 rounded-2xl p-4 flex items-center gap-2 dark-card">
        <Search size={20} className="text-stone-500" />
        <input data-testid="catalog-search" value={query} onChange={(e)=>doSearch(e.target.value)} placeholder={t.search} className="flex-1 bg-transparent outline-none" />
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
  if (cart.length === 0) return <div data-testid="empty-cart" className="bg-white border-2 border-stone-200 rounded-2xl p-12 text-center text-stone-500 font-bold dark-card">{t.empty}</div>;
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.cart}</h2>
      <div className="space-y-3">
        {cart.map(item => (
          <div key={item.id} data-testid={`cart-item-${item.id}`} className="bg-white border-2 border-stone-200 rounded-2xl p-3 flex items-center gap-3 dark-card">
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
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-4 space-y-3 dark-card">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500">{t.address}</span>
          <textarea data-testid="cart-address" value={address} onChange={(e)=>setAddress(e.target.value)} rows={2} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" placeholder="House, Street, City, Pincode" />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button data-testid="pay-cod-btn" onClick={()=>setPayment("COD")} className={`p-3 rounded-xl border-2 font-bold text-sm ${payment==="COD"?'border-orange-500 bg-orange-500 text-white':'border-stone-200 bg-white'}`}>{t.cod}</button>
          <button data-testid="pay-upi-btn" onClick={()=>setPayment("UPI")} className={`p-3 rounded-xl border-2 font-bold text-sm ${payment==="UPI"?'border-orange-500 bg-orange-500 text-white':'border-stone-200 bg-white'}`}>{t.upi}</button>
        </div>
        {payment === "UPI" && (
          <div data-testid="qr-box" className="bg-stone-50 border-2 border-dashed border-orange-500 rounded-xl p-4 flex flex-col items-center gap-2">
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
<div style={{margin:"12px 0",padding:"10px",background:"#fff8f0",borderRadius:"8px",border:"1px solid #fed7aa",fontSize:"12px"}}><label style={{display:"flex",gap:"8px",cursor:"pointer",color:"#333"}}><input type="checkbox" required defaultChecked={true} style={{marginTop:"2px",accentColor:"#f97316"}}/><span>Main <b>Terms & Conditions</b> se sahmat hoon: Unloading customer ki zimmedari hogi, cement aur saria wapas nahi hoga.</span></label></div>


        <button data-testid="confirm-order-btn" onClick={()=>{ if(!address.trim()){alert("Enter address"); return;} onCheckout(payment, address); }} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full text-base transition">{t.confirm} · ₹{total}</button>
      </div>
    </div>
  );
}

// ============= Feature 12: GST BILL PDF + WhatsApp =============
function generateGstBill(order) {
  const gst = Math.round(order.total * 0.18);
  const grand = order.total + gst;
  const html = `<!doctype html><html><head><title>GST Bill ${order.id}</title><style>body{font-family:Arial;padding:24px;color:#111}h1{color:#ea580c;margin:0}table{width:100%;border-collapse:collapse;margin-top:16px}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#0A1931;color:#fff}.tot{text-align:right;font-weight:bold}</style></head><body><h1>AS Enterprises</h1><div>GSTIN: 36ABCDE1234F1Z5 · Ph +91 6301456725</div><hr/><h2>Tax Invoice: ${order.id}</h2><div>Date: ${new Date(order.date).toLocaleString()}</div><div>Customer: ${order.user}</div><div>Address: ${order.address}</div><table><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>${order.items.map(i=>`<tr><td>${i.n} - ${i.b}</td><td>${i.q}</td><td>₹${i.p}</td><td>₹${i.p*i.q}</td></tr>`).join('')}<tr><td colspan="3" class="tot">Subtotal</td><td>₹${order.total}</td></tr><tr><td colspan="3" class="tot">GST (18%)</td><td>₹${gst}</td></tr><tr><td colspan="3" class="tot">Grand Total</td><td>₹${grand}</td></tr></table><p>Payment: ${order.payment}</p><p>Thank you for your business!</p></body></html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  return grand;
}

function OrdersScreen({ t, orders, setOrders, upi }) {
  if (orders.length === 0) return <div data-testid="no-orders" className="bg-white border-2 border-stone-200 rounded-2xl p-12 text-center text-stone-500 font-bold dark-card">{t.noord}</div>;
  const shareWA = (o) => {
    const gst = Math.round(o.total * 0.18);
    const grand = o.total + gst;
    const msg = `GST Bill ${o.id}%0A${o.items.map(i=>`${i.n} x${i.q} = ₹${i.p*i.q}`).join('%0A')}%0ASubtotal: ₹${o.total}%0AGST 18%25: ₹${gst}%0ATotal: ₹${grand}`;
    window.open(`https://wa.me/${CFG.wa}?text=${msg}`, "_blank");
  };
  return (
    <div className="space-y-4">
      <h2 className="font-display font-black text-3xl">{t.orders}</h2>
      {orders.map(o => (
        <div key={o.id} data-testid={`order-${o.id}`} className="bg-white border-2 border-stone-200 rounded-2xl p-4 dark-card">
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
          <div className="text-sm text-stone-600 space-y-0.5 mt-2">{o.items.map(i => <div key={i.id}>{i.n} × {i.q}</div>)}</div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-stone-100">
            <span className="text-xs text-stone-500">{o.payment} · {o.address?.slice(0,30)}</span>
            <span className="font-black text-lg">₹{o.total}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button data-testid={`gst-btn-${o.id}`} onClick={() => generateGstBill(o)} className="flex items-center justify-center gap-1 bg-stone-900 text-white text-xs font-bold py-2 rounded-full"><FileText size={12} /> GST Bill PDF</button>
            <button data-testid={`gst-wa-btn-${o.id}`} onClick={() => shareWA(o)} className="flex items-center justify-center gap-1 bg-green-600 text-white text-xs font-bold py-2 rounded-full"><MessageCircle size={12} /> Send WhatsApp</button>
          </div>
          {o.loyalty > 0 && <div className="text-xs text-amber-700 mt-2 font-bold">✨ +{o.loyalty} Mistri Points earned</div>}
        </div>
      ))}
    </div>
  );
}

// ============= Feature 13: LIVE TRUCK MAP =============
function TrackerScreen({ t, orders }) {
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPos(p => (p + 1) % 100), 200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.tracker}</h2>
      <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-lg">
        <Truck size={40} className="mb-3" />
        <div className="text-2xl font-black">{t.eta}: 4-6 hours</div>
        <div className="text-sm opacity-90 mt-1">Free delivery within 10km · ₹200 beyond</div>
      </div>
      {/* Live Map */}
      <div data-testid="live-map" className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 overflow-hidden relative" style={{ minHeight: 180 }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #10b981 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, #10b981 0 1px, transparent 1px 40px)' }} />
        <div className="relative flex items-center justify-between text-emerald-800 font-bold text-xs mb-2 z-10">
          <span className="flex items-center gap-1"><MapPin size={14}/> Warehouse</span>
          <span className="flex items-center gap-1">Home <MapPin size={14}/></span>
        </div>
        <div className="relative h-3 bg-white/50 rounded-full mt-16 z-10">
          <div className="absolute h-3 bg-emerald-600 rounded-full transition-all" style={{ width: pos + "%" }} />
          <div className="absolute -top-6 transition-all text-2xl" style={{ left: pos + "%", transform: 'translateX(-50%)' }}>🚚</div>
        </div>
        <div className="relative text-center mt-3 text-xs text-emerald-800 font-bold z-10">Truck live · {pos}% route covered</div>
      </div>
      {orders.length === 0 ? (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-8 text-center text-stone-500 dark-card">{t.noord}</div>
      ) : orders.slice(0, 3).map(o => (
        <div key={o.id} data-testid={`track-${o.id}`} className="bg-white border-2 border-stone-200 rounded-2xl p-4 dark-card">
          <div className="flex justify-between mb-3">
            <div className="font-bold">{o.id}</div>
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">On the way</span>
          </div>
          <div className="flex justify-between text-xs text-stone-600">
            <div><div className="text-[10px] uppercase font-bold text-stone-400">{t.driver}</div>Ramesh · 98765***25</div>
            <div className="text-right"><div className="text-[10px] uppercase font-bold text-stone-400">Route</div>Warehouse → {o.address?.slice(0,20)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============= KHATA + UPI QR (Feature 11) =============
function KhataScreen({ t, ledger, setLedger, upi }) {
  const [customer, setCustomer] = useState("");
  const [amt, setAmt] = useState("");
  const [type, setType] = useState("credit");
  const [note, setNote] = useState("");
  const [showQr, setShowQr] = useState(null);

  const add = () => {
    if (!customer.trim() || !amt) return;
    setLedger([{ id: Date.now(), customer, amt: parseFloat(amt), type, note, date: new Date().toISOString() }, ...ledger]);
    setCustomer(""); setAmt(""); setNote("");
  };
  const del = (id) => setLedger(ledger.filter(l => l.id !== id));
  const balance = ledger.reduce((s, l) => s + (l.type === 'credit' ? l.amt : -l.amt), 0);

  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.khata}</h2>
      <div className={`p-6 rounded-2xl text-white shadow-lg ${balance>=0?'bg-emerald-700':'bg-red-700'}`}>
        <div className="text-xs uppercase tracking-widest opacity-80">Net Balance</div>
        <div className="font-display font-black text-4xl mt-1">₹{Math.abs(balance).toLocaleString()}</div>
        <div className="text-xs mt-1 opacity-80">{balance >= 0 ? 'To Receive' : 'To Pay'}</div>
      </div>
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-4 space-y-3 dark-card">
        <div className="grid grid-cols-2 gap-2">
          <input data-testid="ledger-customer" value={customer} onChange={e=>setCustomer(e.target.value)} placeholder={t.customer} className="border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" />
          <input data-testid="ledger-amt" value={amt} onChange={e=>setAmt(e.target.value)} type="number" placeholder={t.amt} className="border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={()=>setType("credit")} className={`p-2 rounded-lg border-2 font-bold text-sm ${type==="credit"?'bg-emerald-700 text-white border-emerald-700':'border-stone-200'}`}>{t.credit}</button>
          <button onClick={()=>setType("debit")} className={`p-2 rounded-lg border-2 font-bold text-sm ${type==="debit"?'bg-red-700 text-white border-red-700':'border-stone-200'}`}>{t.debit}</button>
        </div>
        <input value={note} onChange={e=>setNote(e.target.value)} placeholder={t.note} className="w-full border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" />
        <button data-testid="ledger-add-btn" onClick={add} className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-full">+ {t.add}</button>
      </div>

      <div className="space-y-2">
        {ledger.map(l => (
          <div key={l.id} className="bg-white border-2 border-stone-200 rounded-xl p-3 dark-card">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">{l.customer}</div>
                <div className="text-xs text-stone-500">{l.note} · {new Date(l.date).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-black ${l.type==='credit'?'text-emerald-700':'text-red-700'}`}>{l.type==='credit'?'+':'-'}₹{l.amt}</span>
                {l.type==='credit' && <button data-testid={`khata-qr-${l.id}`} onClick={() => setShowQr(showQr===l.id?null:l.id)} className="p-1.5 bg-orange-100 text-orange-600 rounded-full" title="UPI QR"><Camera size={12} /></button>}
                <button onClick={()=>del(l.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={14} /></button>
              </div>
            </div>
            {showQr === l.id && (
              <div className="mt-3 p-3 bg-orange-50 rounded-lg flex flex-col items-center">
                <QRCodeSVG value={`upi://pay?pa=${upi}&pn=AS&am=${l.amt}&cu=INR&tn=${encodeURIComponent(l.customer)}`} size={140} />
                <div className="text-xs mt-2 font-bold text-orange-700">Pay ₹{l.amt} to {upi}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= ESTIMATOR =============
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
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-6 space-y-4 dark-card">
        <div className="text-sm text-stone-600">{t.est}</div>
        <div className="grid grid-cols-3 gap-3">
          <label><span className="text-xs font-bold uppercase text-stone-500">{t.len}</span><input data-testid="est-len" type="number" value={len} onChange={e=>setLen(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" /></label>
          <label><span className="text-xs font-bold uppercase text-stone-500">{t.wid}</span><input data-testid="est-wid" type="number" value={wid} onChange={e=>setWid(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" /></label>
          <label><span className="text-xs font-bold uppercase text-stone-500">{t.ht}</span><input data-testid="est-ht" type="number" value={ht} onChange={e=>setHt(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" /></label>
        </div>
        <button data-testid="est-calc-btn" onClick={calc} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full">{t.calc}</button>
      </div>
      {result && (
        <div data-testid="est-result" className="bg-amber-50 border-2 border-orange-500 rounded-2xl p-5">
          <div className="text-sm font-bold text-stone-600 mb-3">{t.need}:</div>
          <div className="grid grid-cols-2 gap-3">
            <Stat label={t.bags} val={result.cement} /><Stat label={t.tons} val={result.tmt} /><Stat label={t.cft} val={result.sand} /><Stat label={t.bricks} val={result.bricks} />
          </div>
          <a href={`https://wa.me/${CFG.wa}?text=Estimate:%20${result.cement}%20bags,%20${result.tmt}%20tons%20TMT,%20${result.sand}%20cft%20sand,%20${result.bricks}%20bricks`} target="_blank" rel="noreferrer" className="mt-4 block bg-green-600 hover:bg-green-700 text-white text-center font-bold py-2.5 rounded-full">Get Quote on WhatsApp</a>
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

// ============= Feature 4 & 6: LOGIN (Mobile OTP + Forgot Reset) =============
function LoginScreen({ t, onLogin }) {
  const [step, setStep] = useState("mobile"); // mobile | otp | forgot
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [sentOtp, setSentOtp] = useState("");

  const sendOtp = () => {
    if (mobile.length < 10) { alert("Enter 10-digit mobile"); return; }
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setSentOtp(code);
    alert(`OTP sent to ${mobile}: ${code}\n(Demo mode — real SMS via provider)`);
    setStep("otp");
  };
  const verify = () => {
    if (otp !== sentOtp) { alert("Wrong OTP"); return; }
    onLogin({ mobile, name: name || `User ${mobile.slice(-4)}`, date: new Date().toISOString() });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-6 space-y-4 dark-card">
        <h2 className="font-display font-black text-3xl">{t.welcome}</h2>
        {step === "mobile" && (
          <>
            <p className="text-sm text-stone-500">Login with Mobile OTP for faster checkout</p>
            <input data-testid="login-name" value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name (optional)" className="w-full border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500" />
            <input data-testid="login-mobile" value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit Mobile Number" type="tel" className="w-full border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500 tracking-widest text-lg" />
            <button data-testid="send-otp-btn" onClick={sendOtp} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full">{t.sendOtp}</button>
            <button data-testid="forgot-btn" onClick={() => setStep("forgot")} className="w-full text-sm text-orange-600 font-bold hover:underline">Forgot / Reset?</button>
          </>
        )}
        {step === "otp" && (
          <>
            <p className="text-sm text-stone-500">OTP sent to <b>+91 {mobile}</b></p>
            <input data-testid="otp-input" value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,4))} placeholder={t.otp} maxLength={4} className="w-full text-center text-3xl font-black tracking-widest border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500" />
            <button data-testid="verify-otp-btn" onClick={verify} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full">{t.verify}</button>
            <button onClick={() => setStep("mobile")} className="w-full text-xs text-stone-500 hover:underline">Change mobile</button>
          </>
        )}
        {step === "forgot" && (
          <>
            <div className="flex items-center gap-2 text-orange-600">
              <KeyRound size={20} /> <span className="font-bold">Reset Access</span>
            </div>
            <p className="text-sm text-stone-500">Enter your mobile — we'll send a fresh OTP to reset.</p>
            <input data-testid="forgot-mobile" value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="Registered Mobile" type="tel" className="w-full border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500" />
            <button data-testid="forgot-send-btn" onClick={sendOtp} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full">Send Reset OTP</button>
            <button onClick={() => setStep("mobile")} className="w-full text-xs text-stone-500 hover:underline">← Back to login</button>
          </>
        )}
      </div>
    </div>
  );
}

// ============= Feature 5,7,8,9,15,18: ADMIN with tabs =============
function AdminScreen({ t, unlocked, setUnlocked, upi, saveUpi, downloadZip, orders, products, setProducts, setHeroImg, setHeroTxt, heroImg, heroTxt }) {
  const [pin, setPin] = useState("");
  const [tab, setTab] = useState("rates");
  const [newUpi, setNewUpi] = useState(upi);
  const [newBanner, setNewBanner] = useState(heroImg);
  const [newHead, setNewHead] = useState(heroTxt);
  const [newProd, setNewProd] = useState({ n:"", b:"", p:"", u:"per unit", cat:"tmt", stock:100, img:"" });

  if (!unlocked) return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-6 space-y-4 text-center dark-card">
        <Shield size={40} className="mx-auto text-orange-600" />
        <h2 className="font-display font-black text-2xl">{t.pinLbl}</h2>
        <input data-testid="admin-pin-input" type="password" value={pin} onChange={(e)=>setPin(e.target.value)} maxLength={4} className="w-full text-center text-2xl font-black tracking-widest border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500" placeholder="••••" />
        <button data-testid="admin-unlock-btn" onClick={()=>{ if(pin==="6301") setUnlocked(true); else alert("Wrong PIN"); }} className="w-full bg-orange-500 text-white font-bold py-3 rounded-full">Unlock</button>
      </div>
    </div>
  );

  const updatePrice = (id, p) => setProducts(products.map(x => x.id===id?{...x, p:parseFloat(p)||0}:x));
  const updateStock = (id, s) => setProducts(products.map(x => x.id===id?{...x, stock:parseInt(s)||0}:x));
  const delProd = (id) => setProducts(products.filter(x => x.id !== id));
  const addProd = () => {
    if (!newProd.n || !newProd.p) { alert("Name & Price required"); return; }
    setProducts([{ ...newProd, id:Date.now(), p:parseFloat(newProd.p), stock:parseInt(newProd.stock)||100, rating:4.5, img:newProd.img||"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70" }, ...products]);
    setNewProd({ n:"", b:"", p:"", u:"per unit", cat:"tmt", stock:100, img:"" });
  };
  const exportCsv = () => {
    const csv = "id,name,brand,price,unit,category,stock,rating\n" + products.map(p => `${p.id},"${p.n}","${p.b}",${p.p},"${p.u}",${p.cat},${p.stock},${p.rating||4.5}`).join("\n");
    const blob = new Blob([csv], { type:'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'as-prices.csv'; a.click();
  };
  const importCsv = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const lines = r.result.split(/\r?\n/).slice(1).filter(Boolean);
        const updated = [...products];
        lines.forEach(line => {
          const m = line.match(/^(\d+),"?([^",]+)"?,"?([^",]*)"?,(\d+(?:\.\d+)?)/);
          if (m) { const id = parseInt(m[1]), price = parseFloat(m[4]); const idx = updated.findIndex(p => p.id === id); if (idx >= 0) updated[idx] = { ...updated[idx], p: price }; }
        });
        setProducts(updated);
        alert(`Imported ${lines.length} rows`);
      } catch (err) { alert("Bad CSV format"); }
    };
    r.readAsText(f);
  };
  const readFile = (file, cb) => { const r = new FileReader(); r.onload = () => cb(r.result); r.readAsDataURL(file); };

  const TABS = [{k:"rates",n:"Rate Edit"},{k:"banner",n:"Banner Edit"},{k:"products",n:"Products"},{k:"bulk",n:"Bulk CSV"},{k:"settings",n:"Settings"}];
  return (
    <div className="space-y-4">
      <h2 className="font-display font-black text-3xl">{t.admin} Panel</h2>
      <div className="flex flex-wrap gap-2">
        {TABS.map(x => <button key={x.k} data-testid={`admin-tab-${x.k}`} onClick={() => setTab(x.k)} className={`text-xs font-bold px-3 py-2 rounded-full transition ${tab===x.k?'bg-orange-500 text-white':'bg-white border-2 border-stone-300 text-stone-700 hover:border-orange-500'}`}>{x.n}</button>)}
      </div>
<div className="mb-3"><button onClick={() => setTab("orders")} className={`px-4 py-1.5 rounded-full text-xs font-bold ${tab === "orders" ? "bg-orange-500 text-white" : "bg-stone-200 text-stone-700"}`}>📦 View Orders</button></div>

{/* Feature: Orders Management with Approve/Reject */}
{tab === "orders" && (
  <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 dark-card">
    <div className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-3">Customer Orders</div>
    <div className="space-y-3 max-h-96 overflow-auto">
      {(!orders || orders.length === 0) ? (
        <div className="text-xs text-stone-400 text-center py-4">No orders yet</div>
      ) : (
        orders.map((ord, idx) => (
          <div key={ord.order_id || idx} className="p-3 border border-stone-200 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold">Order #{ord.order_id || idx + 1}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ord.status === "Approved" ? "bg-green-100 text-green-700" : ord.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>{ord.status || "Pending"}</span>
            </div>
            <div className="text-xs text-stone-600"><strong>Address:</strong> {ord.delivery_address || ord.address || "N/A"}</div>
            <div className="text-xs font-bold text-stone-800">Total: ₹{ord.total_amount || ord.total}</div>
            <div className="flex gap-2 pt-1">
              <button onClick={() => { ord.status = "Approved"; alert("Order Approved!"); }} className="flex-1 bg-green-600 text-white text-xs font-bold py-1.5 rounded-lg hover:bg-green-700">Approve</button>
              <button onClick={() => { ord.status = "Rejected"; alert("Order Rejected!"); }} className="flex-1 bg-red-600 text-white text-xs font-bold py-1.5 rounded-lg hover:bg-red-700">Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)}


      {/* Feature 7: Rate Edit */}
      {tab === "rates" && (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 dark-card">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-3">Edit Prices & Stock</div>
          <div className="space-y-2 max-h-96 overflow-auto">
            {products.map(p => (
              <div key={p.id} className="flex items-center gap-2 p-2 border border-stone-200 rounded-lg">
                <img src={p.img} alt="" className="w-10 h-10 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate">{p.n}</div>
                  <div className="text-[10px] text-stone-500">{p.b}</div>
                </div>
                <input data-testid={`rate-${p.id}`} type="number" defaultValue={p.p} onBlur={e=>updatePrice(p.id, e.target.value)} className="w-20 border-2 border-stone-200 rounded p-1 text-sm text-right" />
                <input data-testid={`stock-${p.id}`} type="number" defaultValue={p.stock} onBlur={e=>updateStock(p.id, e.target.value)} className="w-16 border-2 border-stone-200 rounded p-1 text-sm text-right" />
                <button onClick={()=>delProd(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature 8: Banner Edit */}
      {tab === "banner" && (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 space-y-3 dark-card">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">Edit Banner</div>
          <label className="block text-xs font-bold">Headline<input data-testid="banner-head" value={newHead} onChange={e=>setNewHead(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" /></label>
          <label className="block text-xs font-bold">Banner Image URL<input data-testid="banner-img" value={newBanner} onChange={e=>setNewBanner(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" /></label>
          <label className="block text-xs font-bold">Or Upload Image<input type="file" accept="image/*" onChange={e => e.target.files[0] && readFile(e.target.files[0], (d)=>setNewBanner(d))} className="w-full mt-1" /></label>
          <img src={newBanner} alt="preview" className="w-full h-32 object-cover rounded-lg border-2 border-stone-200" />
          <button data-testid="banner-save-btn" onClick={()=>{ localStorage.setItem("bannerImg", newBanner); localStorage.setItem("bannerText", newHead); setHeroImg(newBanner); setHeroTxt(newHead); alert("Banner saved"); }} className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-full">Save Banner</button>
        </div>
      )}

      {/* Feature 9: Add Product with Photo */}
      {tab === "products" && (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 space-y-3 dark-card">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">Add New Product</div>
          <input data-testid="prod-name" value={newProd.n} onChange={e=>setNewProd({...newProd, n:e.target.value})} placeholder="Product name" className="w-full border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" />
          <div className="grid grid-cols-2 gap-2">
            <input data-testid="prod-brand" value={newProd.b} onChange={e=>setNewProd({...newProd, b:e.target.value})} placeholder="Brand" className="border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" />
            <input data-testid="prod-price" type="number" value={newProd.p} onChange={e=>setNewProd({...newProd, p:e.target.value})} placeholder="Price ₹" className="border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <select data-testid="prod-cat" value={newProd.cat} onChange={e=>setNewProd({...newProd, cat:e.target.value})} className="border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500">
              <option value="tmt">TMT</option><option value="cement">Cement</option><option value="sand">Sand</option><option value="brick">Brick</option><option value="tools">Tools</option>
            </select>
            <input data-testid="prod-stock" type="number" value={newProd.stock} onChange={e=>setNewProd({...newProd, stock:e.target.value})} placeholder="Stock" className="border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" />
          </div>
          <input data-testid="prod-unit" value={newProd.u} onChange={e=>setNewProd({...newProd, u:e.target.value})} placeholder="Unit (per bag, per kg)" className="w-full border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" />
          <label className="block text-xs font-bold">Product Photo<input data-testid="prod-photo" type="file" accept="image/*,capture=camera" onChange={e => e.target.files[0] && readFile(e.target.files[0], d=>setNewProd({...newProd, img:d}))} className="w-full mt-1" /></label>
          {newProd.img && <img src={newProd.img} alt="" className="w-24 h-24 object-cover rounded-lg border-2 border-stone-200" />}
          <button data-testid="prod-add-btn" onClick={addProd} className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-full">+ Add Product</button>
        </div>
      )}

      {/* Feature 15 & 18: Bulk CSV */}
      {tab === "bulk" && (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 space-y-3 dark-card">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">Bulk Price Excel/CSV</div>
          <button data-testid="csv-export-btn" onClick={exportCsv} className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-full"><Download size={16} /> Export Prices CSV</button>
          <label className="block">
            <span className="text-xs font-bold uppercase text-stone-500">Import Prices CSV</span>
            <input data-testid="csv-import-input" type="file" accept=".csv" onChange={importCsv} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 text-sm" />
          </label>
          <div className="text-[11px] text-stone-500 bg-stone-100 p-2 rounded">CSV format: id,name,brand,price,unit,category,stock,rating</div>
        </div>
      )}

      {/* Settings tab: UPI + ZIP + Stats */}
      {tab === "settings" && (
        <div className="space-y-4">
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-5 space-y-3 dark-card">
            <div className="text-xs font-bold uppercase tracking-widest text-stone-500">{t.changeUpi}</div>
            <div className="text-sm">{t.currentUpi}: <span className="font-bold text-orange-600">{upi}</span></div>
            <div className="flex gap-2">
              <input data-testid="admin-upi-input" value={newUpi} onChange={e=>setNewUpi(e.target.value)} className="flex-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-orange-500" placeholder="yourname@upi" />
              <button data-testid="admin-save-upi-btn" onClick={()=>saveUpi(newUpi)} className="bg-stone-900 text-white font-bold px-4 py-2 rounded-lg">{t.saveUpi}</button>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest opacity-90">Backup & Deploy</div>
            <button data-testid="admin-zip-btn" onClick={downloadZip} className="w-full bg-white text-stone-900 font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-stone-100"><Download size={18} /> {t.zip}</button>
            <div className="text-xs opacity-90 text-center">{t.zipInfo}</div>
          </div>
          {/* Feature 8: SYNC (Export/Import All Data) */}
          <div className="bg-white border-2 border-emerald-500 rounded-2xl p-5 space-y-3 dark-card">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 flex items-center gap-2"><Database size={14} /> Data Sync (Backup / Restore)</div>
            <div className="text-xs text-stone-500">Export all app data (orders, khata, products, gallery, UPI, banner) as one JSON file. Import on any device to restore.</div>
            <div className="grid grid-cols-2 gap-2">
              <button data-testid="sync-export-btn" onClick={() => {
                try {
                  const data = { customUpi: localStorage.getItem("customUpi"), products: localStorage.getItem("products"), myOrders: localStorage.getItem("myOrders"), ledger: localStorage.getItem("ledger"), gallery: localStorage.getItem("gallery"), bannerImg: localStorage.getItem("bannerImg"), bannerText: localStorage.getItem("bannerText"), lang: localStorage.getItem("lang"), userProfile: localStorage.getItem("userProfile"), _v: 1, _date: new Date().toISOString() };
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `as-buildmart-sync-${Date.now()}.json`; a.click();
                } catch (e) { alert("Export failed"); }
              }} className="flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-full text-sm"><Download size={14} /> Export All</button>
              <label className="flex items-center justify-center gap-1 bg-stone-900 hover:bg-stone-800 text-white font-bold py-2.5 rounded-full text-sm cursor-pointer">
                <Upload size={14} /> Import All
                <input data-testid="sync-import-input" type="file" accept=".json,application/json" className="hidden" onChange={(e) => {
                  const f = e.target.files[0]; if (!f) return;
                  const r = new FileReader();
                  r.onload = () => {
                    try {
                      const d = JSON.parse(r.result);
                      Object.entries(d).forEach(([k, v]) => { if (v !== null && !k.startsWith('_')) localStorage.setItem(k, v); });
                      alert("Data restored. Reloading...");
                      window.location.reload();
                    } catch (err) { alert("Bad JSON file"); }
                  };
                  r.readAsText(f);
                }} />
              </label>
            </div>
          </div>
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-5 dark-card">
            <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Total Orders</div>
            <div className="font-display font-black text-4xl">{orders.length}</div>
            <div className="text-xs text-stone-500">Revenue: ₹{orders.reduce((s,o)=>s+o.total,0).toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============= Feature 10: GALLERY (unlimited, camera, add/delete/edit) =============
function GalleryScreen({ gallery, setGallery }) {
  const fileRef = useRef();
  const [editing, setEditing] = useState(null);
  const [caption, setCaption] = useState("");
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
  const saveCaption = () => { setGallery(gallery.map(g => g.id===editing?{...g, caption}:g)); setEditing(null); setCaption(""); };
  const downloadAll = () => {
    if (gallery.length === 0) return;
    const html = `<!doctype html><html><head><title>AS Gallery</title></head><body style="margin:0;background:#111;color:#fff;font-family:sans-serif"><h1 style="padding:20px">AS Enterprises Gallery (${gallery.length})</h1>${gallery.map(g=>`<div style="margin:20px"><img src="${g.img}" style="max-width:100%"/><p>${g.caption||''}</p></div>`).join('')}</body></html>`;
    const blob = new Blob([html], { type:'text/html' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'as-gallery.html'; a.click();
  };

  return (
    <div className="space-y-4">
      <h2 className="font-display font-black text-3xl">Project Gallery</h2>
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-4 space-y-3 dark-card">
        <div className="text-xs font-bold uppercase tracking-widest text-stone-500">Add Photos (up to 100)</div>
        <input ref={fileRef} data-testid="gallery-input" type="file" accept="image/*" multiple capture="environment" onChange={e => e.target.files.length && addImgs(e.target.files)} className="hidden" />
        <div className="grid grid-cols-2 gap-2">
          <button data-testid="gallery-camera-btn" onClick={() => fileRef.current?.click()} className="flex items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-full"><Camera size={14} /> Camera / Files</button>
          <button data-testid="gallery-zip-btn" onClick={downloadAll} className="flex items-center justify-center gap-1 bg-stone-900 text-white font-bold py-2.5 rounded-full"><Download size={14} /> ZIP All ({gallery.length})</button>
        </div>
      </div>

      {gallery.length === 0 ? (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-12 text-center text-stone-500 font-bold dark-card">No photos yet. Tap Camera to add.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {gallery.map(g => (
            <div key={g.id} data-testid={`gallery-${g.id}`} className="bg-white border-2 border-stone-200 rounded-2xl overflow-hidden group relative dark-card">
              <img src={g.img} alt={g.caption} className="w-full aspect-square object-cover" />
              {editing === g.id ? (
                <div className="p-2 flex gap-1">
                  <input value={caption} onChange={e=>setCaption(e.target.value)} placeholder="Caption" className="flex-1 border border-stone-300 rounded p-1 text-xs" />
                  <button onClick={saveCaption} className="text-xs bg-orange-500 text-white px-2 rounded font-bold">✓</button>
                </div>
              ) : (
                <div className="p-2 flex items-center justify-between gap-1">
                  <div className="text-xs text-stone-700 truncate flex-1">{g.caption || <span className="text-stone-400">No caption</span>}</div>
                  <button onClick={()=>{setEditing(g.id); setCaption(g.caption||"");}} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit3 size={12} /></button>
                  <button onClick={()=>del(g.id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={12} /></button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============= Feature 22: MISTRI LOYALTY =============
function LoyaltyScreen({ orders, user }) {
  const points = orders.reduce((s, o) => s + (o.loyalty || 0), 0);
  const tier = points > 500 ? "Gold" : points > 100 ? "Silver" : "Bronze";
  const tierColor = tier==="Gold"?"from-amber-400 to-yellow-600":tier==="Silver"?"from-slate-300 to-slate-500":"from-orange-700 to-amber-900";
  return (
    <div className="space-y-4">
      <h2 className="font-display font-black text-3xl">Mistri Loyalty</h2>
      <div data-testid="loyalty-card" className={`bg-gradient-to-br ${tierColor} text-white rounded-2xl p-6 shadow-xl relative overflow-hidden`}>
        <Award size={100} className="absolute -right-4 -top-4 opacity-20" />
        <div className="text-xs uppercase tracking-widest opacity-80">Total Points</div>
        <div className="font-display font-black text-5xl mt-1">{points}</div>
        <div className="text-sm mt-1 opacity-90">Tier: <b>{tier}</b></div>
        <div className="text-xs mt-3 opacity-80">Customer: {user?.name || user?.mobile || "Guest"}</div>
      </div>
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-5 dark-card">
        <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">How it works</div>
        <ul className="text-sm space-y-2 text-stone-700">
          <li>• Earn <b>1 point</b> per ₹100 spent</li>
          <li>• <b>100 points</b> → ₹100 off next order</li>
          <li>• Silver <b>100+</b> → free delivery beyond 10km</li>
          <li>• Gold <b>500+</b> → priority same-day delivery + 2% discount</li>
        </ul>
      </div>
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 dark-card">
        <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Recent Earnings</div>
        {orders.length === 0 ? <div className="text-sm text-stone-400">Place your first order to earn points!</div> : (
          <div className="space-y-1">
            {orders.slice(0,5).map(o => <div key={o.id} className="flex justify-between text-sm"><span className="text-stone-600">{o.id}</span><span className="font-bold text-amber-700">+{o.loyalty || 0}</span></div>)}
          </div>
        )}
      </div>
    </div>
  );
}

// ============= Feature 22: EMI CALCULATOR =============
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
      <h2 className="font-display font-black text-3xl">EMI Calculator</h2>
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-5 space-y-3 dark-card">
        <label className="block text-xs font-bold">Loan Amount ₹<input data-testid="emi-amt" type="number" value={amt} onChange={e=>setAmt(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500 text-lg font-bold" /></label>
        <label className="block text-xs font-bold">Interest Rate % p.a.<input data-testid="emi-rate" type="number" value={rate} onChange={e=>setRate(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500" /></label>
        <label className="block text-xs font-bold">Tenure (months)<input data-testid="emi-months" type="number" value={months} onChange={e=>setMonths(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-orange-500" /></label>
      </div>
      <div data-testid="emi-result" className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-2xl p-6">
        <div className="text-xs uppercase tracking-widest opacity-80">Monthly EMI</div>
        <div className="font-display font-black text-5xl mt-1">₹{emi.toLocaleString()}</div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div><div className="text-[10px] uppercase opacity-70">Total Payable</div><div className="font-bold text-lg">₹{total.toLocaleString()}</div></div>
          <div><div className="text-[10px] uppercase opacity-70">Total Interest</div><div className="font-bold text-lg">₹{(total-P).toLocaleString()}</div></div>
        </div>
      </div>
      <a href={`https://wa.me/${CFG.wa}?text=EMI%20Quote:%20%E2%82%B9${P}%20@${rate}%25%20for%20${n}m%20=%20%E2%82%B9${emi}/mo`} target="_blank" rel="noreferrer" className="block bg-green-600 hover:bg-green-700 text-white text-center font-bold py-3 rounded-full">Apply on WhatsApp</a>
    </div>
  );
}

// ============= Feature 21: AI RATE PREDICTOR =============
function PredictorScreen({ products }) {
  const [selected, setSelected] = useState(products[0]?.id || 1);
  const p = products.find(x => x.id === Number(selected)) || products[0];
  const history = useMemo(() => {
    if (!p) return [];
    const arr = [];
    for (let i = 6; i >= 1; i--) {
      const trend = 1 + (Math.sin(i * 0.5) * 0.03) + ((6-i) * 0.008);
      arr.push({ label: `${i}mo ago`, val: Math.round(p.p / trend) });
    }
    arr.push({ label: "Now", val: p.p });
    const slope = (p.p - arr[0].val) / 6;
    for (let i = 1; i <= 3; i++) arr.push({ label: `+${i}mo`, val: Math.round(p.p + slope * i), predicted: true });
    return arr;
  }, [p]);
  if (!p) return <div className="bg-white border-2 border-stone-200 rounded-2xl p-12 text-center text-stone-500 dark-card">No products to predict</div>;
  const max = Math.max(...history.map(h => h.val));
  const min = Math.min(...history.map(h => h.val));
  const next = history[history.length - 1] || { val: p.p };
  const trend = next.val > p.p ? "up" : "down";

  return (
    <div className="space-y-4">
      <h2 className="font-display font-black text-3xl">AI Rate Predictor</h2>
      <div className="bg-white border-2 border-orange-500 rounded-2xl p-5 dark-card">
        <label className="block text-xs font-bold mb-2">Select Product</label>
        <select data-testid="predict-select" value={selected} onChange={e=>setSelected(e.target.value)} className="w-full border-2 border-stone-200 rounded-lg p-2">
          {products.map(x => <option key={x.id} value={x.id}>{x.n} - {x.b}</option>)}
        </select>
      </div>
      <div className="bg-gradient-to-br from-rose-600 to-orange-600 text-white rounded-2xl p-5">
        <div className="text-xs uppercase tracking-widest opacity-80">3-Month Forecast</div>
        <div className="font-display font-black text-5xl mt-1">₹{next.val}</div>
        <div className="text-sm mt-1 opacity-90 flex items-center gap-2">
          <TrendingUp size={16} className={trend==="up"?"":"rotate-180"} />
          {trend === "up" ? "Prices trending up" : "Prices trending down"} · {p?.u}
        </div>
      </div>
      <div data-testid="predict-chart" className="bg-white border-2 border-stone-200 rounded-2xl p-4 dark-card">
        <div className="text-xs font-bold uppercase text-stone-500 mb-3">Price Trend (past 6mo + forecast 3mo)</div>
        <div className="flex items-end gap-1 h-40">
          {history.map((h, i) => {
            const range = max - min || 1;
            const height = 25 + ((h.val - min) / range) * 70; // 25% baseline min, 95% max
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="text-[9px] font-bold">{h.val}</div>
                <div className={`w-full rounded-t ${h.predicted?'bg-rose-400 border-2 border-dashed border-rose-700':'bg-orange-500'}`} style={{ height: height + "%" }} />
                <div className="text-[8px] text-stone-500 mt-1 whitespace-nowrap">{h.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-xs text-stone-500 bg-stone-100 p-3 rounded-lg">💡 Prediction uses local linear trend + seasonal factor. For serious purchases, confirm with our team on WhatsApp.</div>
    </div>
  );
}
