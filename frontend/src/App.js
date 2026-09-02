import React, { useState, useEffect, useMemo } from "react";
import "@/App.css";
import { QRCodeSVG } from "qrcode.react";
import { Phone, MessageCircle, Search, ShoppingCart, ArrowLeft, User, Package, Truck, BookOpen, Sparkles, Calculator, Download, Shield, LogOut, Trash2, Plus, Minus, Home as HomeIcon, ClipboardList, Menu, RefreshCw, Settings, Headphones, X } from "lucide-react";

// ============= CONFIG =============
const CFG = {
  phone: "+91 6301456725",
  wa: "916301456725",
  brand: "AS Enterprises",
  tagline: "Build Stronger, Build Smarter",
  hero: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80",
};

const getUPI = () => localStorage.getItem("customUpi") || "9030574216@upi";

// ============= TRANSLATIONS =============
const T = {
  EN: { b:"Build Stronger", c:"Cart", s:"Same-Day Delivery", w:"Wholesale Khata", g:"Genuine Brands", f:"Free Estimate", zip:"Download ZIP Backup", home:"Home", search:"Search TMT, Cement, Sand, Bricks...", login:"Login", logout:"Logout", orders:"My Orders", admin:"Admin", call:"Call Now", wa:"WhatsApp", cart:"Cart", buy:"Add to Cart", total:"Total", checkout:"Place Order", address:"Delivery Address", cod:"Cash on Delivery", upi:"Pay via UPI", confirm:"Confirm Order", noResults:"No products found. Call 6301456725 for custom order.", tracker:"Same-Day Tracker", khata:"Wholesale Khata", catalog:"Brand Catalog", estimator:"Estimate Calculator", welcome:"Welcome", name:"Full Name", mobile:"Mobile", email:"Email", pass:"Password", signin:"Sign In", pinLbl:"Enter Admin PIN", changeUpi:"Change UPI ID", currentUpi:"Current UPI", saveUpi:"Save UPI", zipInfo:"If publish fails, upload this ZIP to netlify.com/drop", qty:"Qty", price:"Price", stock:"In Stock", cat:"Category", all:"All", tmt:"TMT Bars", cement:"Cement", sand:"Sand & Aggregate", brick:"Bricks", tools:"Tools", empty:"Cart is empty", noord:"No orders yet", ordid:"Order", status:"Status", pending:"Pending", scan:"Scan QR to Pay", payto:"Pay to", est:"Enter dimensions to estimate", len:"Length (ft)", wid:"Width (ft)", ht:"Height (ft)", need:"You need approx", bags:"bags of Cement", tons:"tons of TMT", cft:"cft of Sand", bricks:"Bricks (approx)", calc:"Calculate", ledger:"Ledger", customer:"Customer", amt:"Amount", add:"Add Entry", type:"Type", credit:"Credit", debit:"Debit", note:"Note", del:"Delete", eta:"ETA Today", route:"Route", driver:"Driver" },
  HI: { b:"मजबूत बनाएं", c:"टोकरी", s:"आज डिलीवरी", w:"थोक खाता", g:"असली ब्रांड", f:"फ्री एस्टीमेट", zip:"ZIP डाउनलोड", home:"होम", search:"सरिया, सीमेंट, रेत, ईंट खोजें...", login:"लॉगिन", logout:"लॉगआउट", orders:"मेरे ऑर्डर", admin:"एडमिन", call:"कॉल करें", wa:"व्हाट्सएप", cart:"टोकरी", buy:"जोड़ें", total:"कुल", checkout:"ऑर्डर करें", address:"पता", cod:"कैश ऑन डिलीवरी", upi:"UPI से भुगतान", confirm:"पुष्टि करें", noResults:"कोई सामान नहीं मिला। कस्टम ऑर्डर के लिए 6301456725 पर कॉल करें।", tracker:"डिलीवरी ट्रैकर", khata:"थोक खाता", catalog:"ब्रांड कैटलॉग", estimator:"अनुमान कैलकुलेटर", welcome:"स्वागत है", name:"पूरा नाम", mobile:"मोबाइल", email:"ईमेल", pass:"पासवर्ड", signin:"साइन इन", pinLbl:"एडमिन PIN डालें", changeUpi:"UPI बदलें", currentUpi:"मौजूदा UPI", saveUpi:"UPI सेव करें", zipInfo:"अगर पब्लिश फेल हो तो ये ZIP netlify.com/drop पर अपलोड करें", qty:"मात्रा", price:"कीमत", stock:"स्टॉक में", cat:"श्रेणी", all:"सभी", tmt:"सरिया", cement:"सीमेंट", sand:"रेत/गिट्टी", brick:"ईंट", tools:"औजार", empty:"टोकरी खाली है", noord:"कोई ऑर्डर नहीं", ordid:"ऑर्डर", status:"स्थिति", pending:"लंबित", scan:"भुगतान के लिए QR स्कैन करें", payto:"भुगतान", est:"अनुमान के लिए माप डालें", len:"लंबाई (फीट)", wid:"चौड़ाई (फीट)", ht:"ऊंचाई (फीट)", need:"आपको लगभग चाहिए", bags:"सीमेंट बैग", tons:"टन सरिया", cft:"cft रेत", bricks:"ईंटें (लगभग)", calc:"गणना करें", ledger:"बही", customer:"ग्राहक", amt:"राशि", add:"जोड़ें", type:"प्रकार", credit:"जमा", debit:"नाम", note:"नोट", del:"हटाएं", eta:"आज पहुंचेगा", route:"रूट", driver:"ड्राइवर" },
  TE: { b:"బలంగా నిర్మించండి", c:"బుట్ట", s:"ఈరోజే డెలివరీ", w:"హోల్‌సేల్ ఖాతా", g:"అసలైన బ్రాండ్", f:"ఉచిత అంచనా", zip:"ZIP డౌన్‌లోడ్", home:"హోమ్", search:"సరియా, సిమెంట్, ఇసుక, ఇటుకలు...", login:"లాగిన్", logout:"లాగౌట్", orders:"నా ఆర్డర్లు", admin:"అడ్మిన్", call:"కాల్ చేయండి", wa:"వాట్సాప్", cart:"బుట్ట", buy:"జోడించు", total:"మొత్తం", checkout:"ఆర్డర్ చేయండి", address:"చిరునామా", cod:"క్యాష్ ఆన్ డెలివరీ", upi:"UPI ద్వారా చెల్లించండి", confirm:"నిర్ధారించండి", noResults:"వస్తువులు లేవు. కస్టమ్ ఆర్డర్ కోసం 6301456725 కు కాల్ చేయండి.", tracker:"డెలివరీ ట్రాకర్", khata:"హోల్‌సేల్ ఖాతా", catalog:"బ్రాండ్ కేటలాగ్", estimator:"అంచనా కాలిక్యులేటర్", welcome:"స్వాగతం", name:"పూర్తి పేరు", mobile:"మొబైల్", email:"ఇమెయిల్", pass:"పాస్‌వర్డ్", signin:"సైన్ ఇన్", pinLbl:"అడ్మిన్ PIN", changeUpi:"UPI మార్చండి", currentUpi:"ప్రస్తుత UPI", saveUpi:"UPI సేవ్ చేయండి", zipInfo:"పబ్లిష్ ఫెయిల్ అయితే ZIP ని netlify.com/drop కు అప్‌లోడ్ చేయండి", qty:"పరిమాణం", price:"ధర", stock:"స్టాక్‌లో", cat:"వర్గం", all:"అన్నీ", tmt:"సరియా", cement:"సిమెంట్", sand:"ఇసుక/కంకర", brick:"ఇటుకలు", tools:"పరికరాలు", empty:"బుట్ట ఖాళీ", noord:"ఆర్డర్లు లేవు", ordid:"ఆర్డర్", status:"స్థితి", pending:"పెండింగ్", scan:"చెల్లించడానికి QR స్కాన్ చేయండి", payto:"చెల్లింపు", est:"అంచనా కోసం కొలతలు ఇవ్వండి", len:"పొడవు (అడుగు)", wid:"వెడల్పు (అడుగు)", ht:"ఎత్తు (అడుగు)", need:"మీకు దాదాపు కావాలి", bags:"సిమెంట్ బస్తాలు", tons:"టన్నుల సరియా", cft:"cft ఇసుక", bricks:"ఇటుకలు (సుమారు)", calc:"లెక్కించండి", ledger:"లెడ్జర్", customer:"కస్టమర్", amt:"మొత్తం", add:"జోడించు", type:"రకం", credit:"క్రెడిట్", debit:"డెబిట్", note:"నోట్", del:"తొలగించు", eta:"ఈరోజు రావును", route:"రూట్", driver:"డ్రైవర్" }
};

// Search synonyms map
const MAP = { sariya:'tmt', saria:'tmt', steel:'tmt', rod:'tmt', tmt:'tmt', cement:'cement', simenti:'cement', ppc:'cement', opc:'cement', ret:'sand', balu:'sand', sand:'sand', isuka:'sand', metal:'sand', aggregate:'sand', gitti:'sand', brick:'brick', eent:'brick', itukalu:'brick', block:'brick', wire:'tools', tool:'tools' };

// Sample product catalog (18 items)
const PRODUCTS = [
  { id:1, n:"TMT Bar Fe500 8mm", b:"Tata Tiscon", p:62, u:"per kg", cat:"tmt", img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:2, n:"TMT Bar Fe500 10mm", b:"JSW Neosteel", p:61, u:"per kg", cat:"tmt", img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:3, n:"TMT Bar Fe500 12mm", b:"SAIL", p:60, u:"per kg", cat:"tmt", img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:4, n:"TMT Bar Fe500 16mm", b:"Kamdhenu", p:59, u:"per kg", cat:"tmt", img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:5, n:"TMT Bar Fe550 20mm", b:"Tata Tiscon", p:63, u:"per kg", cat:"tmt", img:"https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&q=70" },
  { id:6, n:"OPC 53 Grade Cement", b:"UltraTech", p:410, u:"per bag (50kg)", cat:"cement", img:"https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=400&q=70" },
  { id:7, n:"PPC Cement", b:"Ambuja", p:380, u:"per bag (50kg)", cat:"cement", img:"https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=400&q=70" },
  { id:8, n:"PPC Cement", b:"ACC Gold", p:385, u:"per bag (50kg)", cat:"cement", img:"https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=400&q=70" },
  { id:9, n:"White Cement", b:"JK White", p:850, u:"per bag (25kg)", cat:"cement", img:"https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=400&q=70" },
  { id:10, n:"River Sand (Ret / Balu)", b:"Local", p:1800, u:"per ton", cat:"sand", img:"https://images.unsplash.com/photo-1601055903647-ddf1ee9701b1?auto=format&fit=crop&w=400&q=70" },
  { id:11, n:"M-Sand (Manufactured)", b:"Robo Silicon", p:1400, u:"per ton", cat:"sand", img:"https://images.unsplash.com/photo-1601055903647-ddf1ee9701b1?auto=format&fit=crop&w=400&q=70" },
  { id:12, n:"20mm Aggregate (Metal)", b:"Local", p:1200, u:"per ton", cat:"sand", img:"https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=400&q=70" },
  { id:13, n:"12mm Aggregate", b:"Local", p:1250, u:"per ton", cat:"sand", img:"https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=400&q=70" },
  { id:14, n:"Red Bricks Class A", b:"Local Kiln", p:9, u:"per piece", cat:"brick", img:"https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=400&q=70" },
  { id:15, n:"Fly Ash Bricks", b:"EcoBrick", p:7, u:"per piece", cat:"brick", img:"https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=400&q=70" },
  { id:16, n:"AAC Blocks 600x200x100", b:"Magicrete", p:65, u:"per piece", cat:"brick", img:"https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=400&q=70" },
  { id:17, n:"Steel Binding Wire", b:"Tata Wiron", p:85, u:"per kg", cat:"tools", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70" },
  { id:18, n:"GI Wire 8 Gauge", b:"Bansal", p:95, u:"per kg", cat:"tools", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70" }
];

// ============= UTILS =============
const ls = {
  get: (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { console.error(e); } }
};

// ============= FLOAT ACTIONS (LOCKED) =============
const FloatButtons = () => (
  <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50 wa-call-lock">
    <a
      data-testid="whatsapp-fixed-btn"
      href={`https://wa.me/${CFG.wa}`}
      target="_blank"
      rel="noreferrer"
      className="wa-btn-lock flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg font-bold transition-transform hover:scale-105"
    >
      <MessageCircle size={20} /> <span className="hidden sm:inline">WA {CFG.wa}</span>
    </a>
    <a
      data-testid="call-fixed-btn"
      href={`tel:${CFG.phone.replace(/\s/g,'')}`}
      className="call-btn-lock flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-full shadow-lg font-bold transition-transform hover:scale-105"
    >
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
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [upi, setUpi] = useState(getUPI());
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = T[lang];

  useEffect(() => ls.set("lang", lang), [lang]);
  useEffect(() => ls.set("cart", cart), [cart]);
  useEffect(() => ls.set("myOrders", orders), [orders]);
  useEffect(() => ls.set("ledger", ledger), [ledger]);

  // Nav helpers
  const go = (s) => setScreen(s);
  const back = () => setScreen("home");

  // Cart helpers
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

  // 4 CARDS
  const CARDS = [
    { t: t.s, go: "tracker", icon: Truck, color: "bg-orange-500" },
    { t: t.w, go: "khata", icon: BookOpen, color: "bg-amber-600" },
    { t: t.g, go: "catalog", icon: Sparkles, color: "bg-red-600" },
    { t: t.f, go: "estimator", icon: Calculator, color: "bg-stone-700" }
  ];

  // Filter products
  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (category !== "ALL") list = list.filter(p => p.cat === category);
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const mapped = MAP[q];
      list = list.filter(p =>
        p.n.toLowerCase().includes(q) ||
        p.b.toLowerCase().includes(q) ||
        (mapped && p.cat === mapped)
      );
    }
    return list;
  }, [query, category]);

  const doSearch = (v) => {
    setQuery(v);
    if (v.trim()) setCategory("ALL");
  };

  const placeOrder = (payment, address) => {
    try {
      const order = {
        id: "ORD" + Date.now(),
        items: cart,
        total: cartTotal,
        payment,
        address,
        date: new Date().toISOString(),
        status: t.pending,
        user: user?.name || "Guest"
      };
      const updated = [order, ...orders];
      setOrders(updated);
      setCart([]);
      const msg = `New Order ${order.id}%0A${cart.map(x => `${x.n} x ${x.q} = ₹${x.p*x.q}`).join('%0A')}%0ATotal: ₹${cartTotal}%0APay: ${payment}%0AAddress: ${address}%0ACustomer: ${order.user}`;
      window.open(`https://wa.me/${CFG.wa}?text=${msg}`, "_blank");
      go("orders");
    } catch (e) { console.error(e); alert("Order failed. Please call " + CFG.phone); }
  };

  // ZIP download (18th feature)
  const downloadZip = () => {
    try {
      const code = "<!doctype html>" + document.documentElement.outerHTML;
      const blob = new Blob([code], { type: "text/html" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "as-buildmart-backup.html";
      a.click();
    } catch (e) { console.error(e); alert("Download failed"); }
  };

  const saveUpi = (v) => {
    try {
      localStorage.setItem("customUpi", v);
      setUpi(v);
      alert("UPI saved: " + v);
    } catch (e) { console.error(e); }
  };

  const logout = () => { setUser(null); localStorage.removeItem("userProfile"); go("home"); };

  return (
    <div className="min-h-screen bg-stone-50 font-body text-stone-900">
      {/* HEADER - NAVY #0A1931 */}
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
              {["EN", "HI", "TE"].map(l => (
                <button
                  key={l}
                  data-testid={`lang-${l}-btn`}
                  onClick={() => setLang(l)}
                  className={`text-xs font-bold px-2 py-1 rounded-full transition ${lang===l?'bg-orange-500 text-white':'text-white/70 hover:bg-white/10'}`}
                >{l}</button>
              ))}
            </div>
            <button data-testid="cart-header-btn" onClick={() => go("cart")} className="relative p-2 hover:bg-white/10 rounded-full text-white">
              <ShoppingCart size={20} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">{cart.reduce((s,x)=>s+x.q,0)}</span>}
            </button>
            <button data-testid="orders-header-btn" onClick={() => go("orders")} className="p-2 hover:bg-white/10 rounded-full text-white hidden sm:inline-flex">
              <ClipboardList size={20} />
            </button>
            {user ? (
              <button data-testid="user-btn" onClick={logout} className="hidden md:flex items-center gap-1 text-sm bg-orange-500 text-white px-3 py-1.5 rounded-full">
                <LogOut size={14} /> {user.name?.split(' ')[0] || 'User'}
              </button>
            ) : (
              <button data-testid="login-header-btn" onClick={() => go("login")} className="hidden md:flex items-center gap-1 text-sm bg-orange-500 text-white px-3 py-1.5 rounded-full">
                <User size={14} /> {t.login}
              </button>
            )}
            {/* HAMBURGER MENU */}
            <div className="relative">
              <button data-testid="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-white/10 rounded-full text-white">
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div data-testid="hamburger-menu" className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border-2 border-stone-200 overflow-hidden z-50">
                    <button
                      data-testid="menu-refresh-btn"
                      onClick={() => { setMenuOpen(false); window.location.reload(); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-100 text-left border-b border-stone-100"
                    >
                      <RefreshCw size={16} className="text-blue-600" />
                      <span className="text-sm font-bold text-stone-900">Refresh</span>
                    </button>
                    <button
                      data-testid="menu-settings-btn"
                      onClick={() => { setMenuOpen(false); go("admin"); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-100 text-left border-b border-stone-100"
                    >
                      <Settings size={16} className="text-stone-700" />
                      <span className="text-sm font-bold text-stone-900">Settings</span>
                    </button>
                    <button
                      data-testid="menu-admin-btn"
                      onClick={() => { setMenuOpen(false); go("admin"); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-100 text-left border-b border-stone-100"
                    >
                      <Shield size={16} className="text-orange-600" />
                      <span className="text-sm font-bold text-stone-900">Admin</span>
                      <span className="ml-auto text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">6301</span>
                    </button>
                    <a
                      data-testid="menu-care-btn"
                      href={`https://wa.me/${CFG.wa}?text=Customer%20Care%20Support`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 text-left"
                    >
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

      {/* BACK BUTTON (except home) */}
      {screen !== "home" && (
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <button data-testid="back-btn" onClick={back} className="flex items-center gap-2 text-sm font-bold text-stone-700 hover:text-orange-600 transition">
            <ArrowLeft size={16} /> {t.home}
          </button>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 pb-24 pt-4">
        {screen === "home" && <HomeScreen t={t} lang={lang} setScreen={go} CARDS={CARDS} query={query} doSearch={doSearch} category={category} setCategory={setCategory} filtered={filtered} addToCart={addToCart} setScreenAndCategory={(c)=>{setCategory(c); go("catalog");}} />}
        {screen === "catalog" && <CatalogScreen t={t} query={query} doSearch={doSearch} category={category} setCategory={setCategory} filtered={filtered} addToCart={addToCart} />}
        {screen === "cart" && <CartScreen t={t} cart={cart} updateQty={updateQty} removeItem={removeItem} total={cartTotal} onCheckout={placeOrder} upi={upi} user={user} />}
        {screen === "orders" && <OrdersScreen t={t} orders={orders} />}
        {screen === "tracker" && <TrackerScreen t={t} orders={orders} />}
        {screen === "khata" && <KhataScreen t={t} ledger={ledger} setLedger={setLedger} />}
        {screen === "estimator" && <EstimatorScreen t={t} />}
        {screen === "login" && <LoginScreen t={t} onLogin={(u)=>{setUser(u); ls.set("userProfile", u); go("home");}} />}
        {screen === "admin" && <AdminScreen t={t} unlocked={adminUnlocked} setUnlocked={setAdminUnlocked} upi={upi} saveUpi={saveUpi} downloadZip={downloadZip} orders={orders} />}
      </main>

      {/* FOOTER */}
      <footer className="border-t-2 border-stone-900 bg-white py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <div className="font-bold">© 2026 {CFG.brand}. All rights reserved.</div>
          <div className="flex gap-4">
            <button data-testid="admin-footer-btn" onClick={() => go("admin")} className="flex items-center gap-1 hover:text-orange-600">
              <Shield size={12} /> {t.admin}
            </button>
            <a href={`tel:${CFG.phone.replace(/\s/g,'')}`} className="hover:text-orange-600">{CFG.phone}</a>
          </div>
        </div>
      </footer>

      <FloatButtons />
    </div>
  );
}

// ============= HOME SCREEN =============
function HomeScreen({ t, lang, setScreen, CARDS, query, doSearch, category, setCategory, filtered, addToCart, setScreenAndCategory }) {
  const CATS = [
    { k: "ALL", n: t.all },
    { k: "tmt", n: t.tmt },
    { k: "cement", n: t.cement },
    { k: "sand", n: t.sand },
    { k: "brick", n: t.brick },
    { k: "tools", n: t.tools }
  ];
  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-stone-900 shadow-lg" data-testid="hero-banner">
        <img src={CFG.hero} alt="Construction site" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/70 to-stone-900/30" />
        <div className="relative p-6 sm:p-10 lg:p-14 text-white">
          <div className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            {CFG.brand} · BuildMart
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-none tracking-tight max-w-2xl">
            {t.b}
          </h1>
          <p className="text-base sm:text-lg mt-3 max-w-xl text-stone-200">
            TMT · Cement · Sand · Bricks — Genuine brands, wholesale rates, same-day delivery across the city.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button data-testid="hero-shop-btn" onClick={() => setScreen("catalog")} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105">
              Shop Now →
            </button>
            <a data-testid="hero-wa-btn" href={`https://wa.me/${CFG.wa}?text=Hi%20AS%20Enterprises`} target="_blank" rel="noreferrer" className="bg-white/10 backdrop-blur border border-white/40 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition">
              {t.wa}
            </a>
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="bg-white border-2 border-stone-900 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Search size={20} className="text-stone-500" />
          <input
            data-testid="search-input"
            value={query}
            onChange={(e) => doSearch(e.target.value)}
            placeholder={t.search}
            className="flex-1 bg-transparent outline-none text-base placeholder:text-stone-400"
          />
          {query && <button onClick={() => doSearch("")} className="text-xs text-stone-500 hover:text-red-600">✕</button>}
        </div>
      </section>

      {/* 4 SERVICE CARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {CARDS.map((c, i) => {
          const Icon = c.icon;
          return (
            <button
              key={c.go}
              data-testid={`card-${c.go}-btn`}
              onClick={() => setScreen(c.go)}
              className={`${c.color} text-white p-5 rounded-2xl text-left font-bold shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group`}
            >
              <Icon size={28} className="mb-3 opacity-90 group-hover:scale-110 transition" />
              <div className="text-base sm:text-lg leading-tight">{c.t}</div>
            </button>
          );
        })}
      </section>

      {/* CATEGORY PILLS */}
      <section className="flex flex-wrap gap-2">
        {CATS.map(c => (
          <button
            key={c.k}
            data-testid={`cat-${c.k}-btn`}
            onClick={() => setCategory(c.k)}
            className={`text-sm font-bold px-4 py-2 rounded-full transition ${category===c.k?'bg-stone-900 text-white':'bg-white border-2 border-stone-300 text-stone-700 hover:border-stone-900'}`}
          >{c.n}</button>
        ))}
      </section>

      {/* PRODUCT GRID */}
      <ProductGrid t={t} filtered={filtered} addToCart={addToCart} />
    </div>
  );
}

function ProductGrid({ t, filtered, addToCart }) {
  if (filtered.length === 0) {
    return (
      <div data-testid="no-results" className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-8 text-center">
        <div className="font-bold text-lg text-stone-900 mb-2">{t.noResults}</div>
        <a href={`tel:${CFG.phone.replace(/\s/g,'')}`} className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-full mt-2">
          <Phone size={16} /> {CFG.phone}
        </a>
      </div>
    );
  }
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filtered.map(p => (
        <div key={p.id} data-testid={`product-${p.id}`} className="bg-white border-2 border-stone-200 hover:border-stone-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
          <div className="aspect-square bg-stone-100 overflow-hidden">
            <img src={p.img} alt={p.n} className="w-full h-full object-cover group-hover:scale-105 transition" />
          </div>
          <div className="p-3 space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-orange-600 font-bold">{p.b}</div>
            <div className="font-bold text-sm leading-tight line-clamp-2 h-10">{p.n}</div>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-lg">₹{p.p}</span>
              <span className="text-[10px] text-stone-500">{p.u}</span>
            </div>
            <button data-testid={`add-cart-${p.id}-btn`} onClick={() => addToCart(p)} className="w-full bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold py-2 rounded-full transition">
              + {t.buy}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

// ============= CATALOG =============
function CatalogScreen({ t, query, doSearch, category, setCategory, filtered, addToCart }) {
  const CATS = [{ k:"ALL", n:t.all },{ k:"tmt", n:t.tmt },{ k:"cement", n:t.cement },{ k:"sand", n:t.sand },{ k:"brick", n:t.brick },{ k:"tools", n:t.tools }];
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.g}</h2>
      <div className="bg-white border-2 border-stone-900 rounded-2xl p-4 flex items-center gap-2">
        <Search size={20} className="text-stone-500" />
        <input data-testid="catalog-search" value={query} onChange={(e)=>doSearch(e.target.value)} placeholder={t.search} className="flex-1 bg-transparent outline-none" />
      </div>
      <div className="flex flex-wrap gap-2">
        {CATS.map(c => (
          <button key={c.k} onClick={() => setCategory(c.k)} className={`text-sm font-bold px-4 py-2 rounded-full transition ${category===c.k?'bg-stone-900 text-white':'bg-white border-2 border-stone-300 text-stone-700 hover:border-stone-900'}`}>{c.n}</button>
        ))}
      </div>
      <ProductGrid t={t} filtered={filtered} addToCart={addToCart} />
    </div>
  );
}

// ============= CART =============
function CartScreen({ t, cart, updateQty, removeItem, total, onCheckout, upi, user }) {
  const [address, setAddress] = useState(user?.address || "");
  const [payment, setPayment] = useState("COD");

  if (cart.length === 0) {
    return <div data-testid="empty-cart" className="bg-white border-2 border-stone-200 rounded-2xl p-12 text-center text-stone-500 font-bold">{t.empty}</div>;
  }
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.cart}</h2>
      <div className="space-y-3">
        {cart.map(item => (
          <div key={item.id} data-testid={`cart-item-${item.id}`} className="bg-white border-2 border-stone-200 rounded-2xl p-3 flex items-center gap-3">
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

      <div className="bg-white border-2 border-stone-900 rounded-2xl p-4 space-y-3">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500">{t.address}</span>
          <textarea data-testid="cart-address" value={address} onChange={(e)=>setAddress(e.target.value)} rows={2} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-stone-900" placeholder="House no, Street, City, Pincode" />
        </label>

        <div className="grid grid-cols-2 gap-2">
          <button data-testid="pay-cod-btn" onClick={()=>setPayment("COD")} className={`p-3 rounded-xl border-2 font-bold text-sm ${payment==="COD"?'border-stone-900 bg-stone-900 text-white':'border-stone-200 bg-white'}`}>{t.cod}</button>
          <button data-testid="pay-upi-btn" onClick={()=>setPayment("UPI")} className={`p-3 rounded-xl border-2 font-bold text-sm ${payment==="UPI"?'border-stone-900 bg-stone-900 text-white':'border-stone-200 bg-white'}`}>{t.upi}</button>
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
        <button data-testid="confirm-order-btn" onClick={()=>{ if(!address.trim()){alert("Please enter address"); return;} onCheckout(payment, address); }} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-full text-base transition">
          {t.confirm} · ₹{total}
        </button>
      </div>
    </div>
  );
}

// ============= ORDERS =============
function OrdersScreen({ t, orders }) {
  if (orders.length === 0) return <div data-testid="no-orders" className="bg-white border-2 border-stone-200 rounded-2xl p-12 text-center text-stone-500 font-bold">{t.noord}</div>;
  return (
    <div className="space-y-4">
      <h2 className="font-display font-black text-3xl">{t.orders}</h2>
      {orders.map(o => (
        <div key={o.id} data-testid={`order-${o.id}`} className="bg-white border-2 border-stone-200 rounded-2xl p-4">
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
          <div className="text-sm text-stone-600 space-y-0.5 mt-2">
            {o.items.map(i => <div key={i.id}>{i.n} × {i.q}</div>)}
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-stone-100">
            <span className="text-xs text-stone-500">{o.payment} · {o.address?.slice(0,30)}</span>
            <span className="font-black text-lg">₹{o.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============= TRACKER =============
function TrackerScreen({ t, orders }) {
  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.tracker}</h2>
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-lg">
        <Truck size={40} className="mb-3" />
        <div className="text-2xl font-black">{t.eta}: 4-6 hours</div>
        <div className="text-sm opacity-90 mt-1">Free delivery within 10km · ₹200 beyond</div>
      </div>
      {orders.length === 0 ? (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-8 text-center text-stone-500">{t.noord}</div>
      ) : (
        orders.slice(0, 3).map(o => (
          <div key={o.id} data-testid={`track-${o.id}`} className="bg-white border-2 border-stone-200 rounded-2xl p-4">
            <div className="flex justify-between mb-3">
              <div className="font-bold">{o.id}</div>
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">On the way</span>
            </div>
            <div className="flex justify-between text-xs text-stone-600">
              <div><div className="text-[10px] uppercase font-bold text-stone-400">{t.driver}</div>Ramesh · +91 98765***25</div>
              <div className="text-right"><div className="text-[10px] uppercase font-bold text-stone-400">{t.route}</div>Warehouse → {o.address?.slice(0,20)}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ============= KHATA (Wholesale Ledger) =============
function KhataScreen({ t, ledger, setLedger }) {
  const [customer, setCustomer] = useState("");
  const [amt, setAmt] = useState("");
  const [type, setType] = useState("credit");
  const [note, setNote] = useState("");

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

      <div className="bg-white border-2 border-stone-900 rounded-2xl p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <input data-testid="ledger-customer" value={customer} onChange={e=>setCustomer(e.target.value)} placeholder={t.customer} className="border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-stone-900" />
          <input data-testid="ledger-amt" value={amt} onChange={e=>setAmt(e.target.value)} type="number" placeholder={t.amt} className="border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-stone-900" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={()=>setType("credit")} className={`p-2 rounded-lg border-2 font-bold text-sm ${type==="credit"?'bg-emerald-700 text-white border-emerald-700':'border-stone-200'}`}>{t.credit}</button>
          <button onClick={()=>setType("debit")} className={`p-2 rounded-lg border-2 font-bold text-sm ${type==="debit"?'bg-red-700 text-white border-red-700':'border-stone-200'}`}>{t.debit}</button>
        </div>
        <input value={note} onChange={e=>setNote(e.target.value)} placeholder={t.note} className="w-full border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-stone-900" />
        <button data-testid="ledger-add-btn" onClick={add} className="w-full bg-stone-900 text-white font-bold py-2.5 rounded-full">+ {t.add}</button>
      </div>

      <div className="space-y-2">
        {ledger.map(l => (
          <div key={l.id} className="bg-white border-2 border-stone-200 rounded-xl p-3 flex justify-between items-center">
            <div>
              <div className="font-bold">{l.customer}</div>
              <div className="text-xs text-stone-500">{l.note} · {new Date(l.date).toLocaleDateString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-black ${l.type==='credit'?'text-emerald-700':'text-red-700'}`}>{l.type==='credit'?'+':'-'}₹{l.amt}</span>
              <button onClick={()=>del(l.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= ESTIMATOR =============
function EstimatorScreen({ t }) {
  const [len, setLen] = useState("");
  const [wid, setWid] = useState("");
  const [ht, setHt] = useState("");
  const [result, setResult] = useState(null);

  const calc = () => {
    const l = parseFloat(len), w = parseFloat(wid), h = parseFloat(ht);
    if (!l || !w || !h) return;
    const area = l * w;
    const vol = area * h;
    setResult({
      cement: Math.ceil(area * 0.4),   // bags per sqft (approx for 1000sqft house baseline)
      tmt: (area * 4 / 1000).toFixed(2), // tons
      sand: Math.ceil(vol * 0.5),
      bricks: Math.ceil(area * 55),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.estimator}</h2>
      <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 space-y-4">
        <div className="text-sm text-stone-600">{t.est}</div>
        <div className="grid grid-cols-3 gap-3">
          <label className="block">
            <span className="text-xs font-bold uppercase text-stone-500">{t.len}</span>
            <input data-testid="est-len" type="number" value={len} onChange={e=>setLen(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-stone-900" />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase text-stone-500">{t.wid}</span>
            <input data-testid="est-wid" type="number" value={wid} onChange={e=>setWid(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-stone-900" />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase text-stone-500">{t.ht}</span>
            <input data-testid="est-ht" type="number" value={ht} onChange={e=>setHt(e.target.value)} className="w-full mt-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-stone-900" />
          </label>
        </div>
        <button data-testid="est-calc-btn" onClick={calc} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-full">{t.calc}</button>
      </div>

      {result && (
        <div data-testid="est-result" className="bg-amber-50 border-2 border-orange-500 rounded-2xl p-5">
          <div className="text-sm font-bold text-stone-600 mb-3">{t.need}:</div>
          <div className="grid grid-cols-2 gap-3">
            <Stat label={t.bags} val={result.cement} />
            <Stat label={t.tons} val={result.tmt} />
            <Stat label={t.cft} val={result.sand} />
            <Stat label={t.bricks} val={result.bricks} />
          </div>
          <a href={`https://wa.me/${CFG.wa}?text=Estimate:%20${result.cement}%20bags,%20${result.tmt}%20tons%20TMT,%20${result.sand}%20cft%20sand,%20${result.bricks}%20bricks`} target="_blank" rel="noreferrer" className="mt-4 block bg-green-600 hover:bg-green-700 text-white text-center font-bold py-2.5 rounded-full">
            Get Quote on WhatsApp
          </a>
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

// ============= LOGIN =============
function LoginScreen({ t, onLogin }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim()) { alert("Name and Mobile required"); return; }
    onLogin({ name, mobile, email, pass });
  };
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 space-y-4">
        <h2 className="font-display font-black text-3xl">{t.welcome}</h2>
        <p className="text-sm text-stone-500">Sign in for faster checkout & order tracking</p>
        <form onSubmit={submit} className="space-y-3">
          <input data-testid="login-name" value={name} onChange={e=>setName(e.target.value)} placeholder={t.name} className="w-full border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-stone-900" />
          <input data-testid="login-mobile" value={mobile} onChange={e=>setMobile(e.target.value)} placeholder={t.mobile} className="w-full border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-stone-900" />
          <input data-testid="login-email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.email} type="email" className="w-full border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-stone-900" />
          <input data-testid="login-pass" value={pass} onChange={e=>setPass(e.target.value)} placeholder={t.pass} type="password" className="w-full border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-stone-900" />
          <button data-testid="login-submit-btn" type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-full">{t.signin}</button>
        </form>
      </div>
    </div>
  );
}

// ============= ADMIN =============
function AdminScreen({ t, unlocked, setUnlocked, upi, saveUpi, downloadZip, orders }) {
  const [pin, setPin] = useState("");
  const [newUpi, setNewUpi] = useState(upi);

  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 space-y-4 text-center">
          <Shield size={40} className="mx-auto text-orange-600" />
          <h2 className="font-display font-black text-2xl">{t.pinLbl}</h2>
          <input
            data-testid="admin-pin-input"
            type="password"
            value={pin}
            onChange={(e)=>setPin(e.target.value)}
            maxLength={4}
            className="w-full text-center text-2xl font-black tracking-widest border-2 border-stone-200 rounded-lg p-3 outline-none focus:border-stone-900"
            placeholder="••••"
          />
          <button data-testid="admin-unlock-btn" onClick={()=>{ if(pin==="6301") setUnlocked(true); else alert("Wrong PIN"); }} className="w-full bg-stone-900 text-white font-bold py-3 rounded-full">Unlock</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display font-black text-3xl">{t.admin} Panel</h2>

      <div className="bg-white border-2 border-stone-900 rounded-2xl p-5 space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-stone-500">{t.changeUpi}</div>
        <div className="text-sm">{t.currentUpi}: <span className="font-bold text-orange-600">{upi}</span></div>
        <div className="flex gap-2">
          <input data-testid="admin-upi-input" value={newUpi} onChange={e=>setNewUpi(e.target.value)} className="flex-1 border-2 border-stone-200 rounded-lg p-2 outline-none focus:border-stone-900" placeholder="yourname@upi" />
          <button data-testid="admin-save-upi-btn" onClick={()=>saveUpi(newUpi)} className="bg-stone-900 text-white font-bold px-4 py-2 rounded-lg">{t.saveUpi}</button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-5 space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest opacity-90">Backup & Deploy</div>
        <button data-testid="admin-zip-btn" onClick={downloadZip} className="w-full bg-white text-stone-900 font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-stone-100">
          <Download size={18} /> {t.zip}
        </button>
        <div className="text-xs opacity-90 text-center">{t.zipInfo}</div>
      </div>

      <div className="bg-white border-2 border-stone-200 rounded-2xl p-5">
        <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Total Orders</div>
        <div className="font-display font-black text-4xl">{orders.length}</div>
        <div className="text-xs text-stone-500">Revenue: ₹{orders.reduce((s,o)=>s+o.total,0).toLocaleString()}</div>
      </div>
    </div>
  );
}
