// Yeni anahtar: eski işaretler sıfırlandı, her şey "çözülmedi" başlar.
const ANAHTAR = "codingmachine.durumlar.v2";

function oku() {
  try { return JSON.parse(localStorage.getItem(ANAHTAR) || "{}"); }
  catch { return {}; }
}
function kaydet() {
  try { localStorage.setItem(ANAHTAR, JSON.stringify(durumlar)); } catch {}
}

const durumlar = oku();
const cozulduMu = (s) => durumlar[s.id] === true;

let durumFiltresi = "hepsi";
let kampFiltresi = "hepsi";
let siralama = "contest";

// Codeforces etiketlerinin Türkçesi
const KONU_ADI = {
  "greedy": "Açgözlü (greedy)",
  "math": "Matematik",
  "constructive algorithms": "Yapıcı algoritmalar (constructive)",
  "implementation": "Uygulama (implementation)",
  "dp": "Dinamik programlama (dp)",
  "brute force": "Kaba kuvvet (brute force)",
  "data structures": "Veri yapıları",
  "sortings": "Sıralama (sortings)",
  "two pointers": "İki işaretçi (two pointers)",
  "binary search": "İkili arama (binary search)",
  "bitmasks": "Bit işlemleri (bitmasks)",
  "graphs": "Graflar",
  "number theory": "Sayılar teorisi",
  "dfs and similar": "DFS ve benzerleri",
  "strings": "Stringler",
  "combinatorics": "Kombinatorik",
  "trees": "Ağaçlar",
  "games": "Oyunlar",
  "dsu": "DSU",
  "interactive": "İnteraktif",
  "matrices": "Matrisler",
  "hashing": "Hashing",
  "shortest paths": "En kısa yol",
  "geometry": "Geometri",
  "communication": "İletişim (communication)",
  "divide and conquer": "Böl ve fethet",
  "probabilities": "Olasılık",
  "expression parsing": "İfade ayrıştırma",
  "chinese remainder theorem": "Çin kalan teoremi",
};
const konuAdi = (k) => KONU_ADI[k] || k;

// Codeforces rating rengi
function ratingRengi(r) {
  if (r == null) return "var(--soluk)";
  if (r < 1200) return "var(--r-gri)";
  if (r < 1400) return "var(--r-yesil)";
  if (r < 1600) return "var(--r-camgobegi)";
  if (r < 1900) return "var(--r-mavi)";
  if (r < 2100) return "var(--r-mor)";
  if (r < 2400) return "var(--r-turuncu)";
  return "var(--r-kirmizi)";
}

function el(etiket, ozellik = {}, ...cocuklar) {
  const e = document.createElement(etiket);
  Object.assign(e, ozellik);
  e.append(...cocuklar);
  return e;
}

const contestSorulari = (id) => SORULAR.filter((s) => s.contest === id);
const kampContestleri = (id) => CONTESTLER.filter((c) => c.kamp === id);
const CONTEST = Object.fromEntries(CONTESTLER.map((c) => [c.id, c]));
const SIRA = Object.fromEntries(SORULAR.map((s, i) => [s.id, i]));

// Kolaydan zora; rating'i olmayanlar sonda
const zorlukSirasi = (a, b) =>
  (a.rating ?? 1e9) - (b.rating ?? 1e9) || SIRA[a.id] - SIRA[b.id];

function ciz() {
  const tablo = document.getElementById("tablo");
  const bolumler = document.getElementById("bolumler");
  const kampSecim = document.getElementById("kamp-secim");
  let gecikme = 0;

  for (const kamp of KAMPLAR) {
    const b = el("button", { className: "secim", textContent: kamp.ad });
    b.dataset.kamp = kamp.id;
    b.setAttribute("aria-pressed", "false");
    kampSecim.append(b);

    const baslik = el("div", { className: "tablo-kamp", textContent: kamp.ad });
    baslik.dataset.kamp = kamp.id;
    tablo.append(baslik);
    const kampBolum = el("section", { className: "kamp" });
    kampBolum.dataset.kamp = kamp.id;
    kampBolum.append(
      el("div", { className: "kamp-head" },
        el("h2", { textContent: kamp.ad }),
        el("p", { textContent: kamp.aciklama }),
      ),
    );

    for (const c of kampContestleri(kamp.id)) {
      const sorular = contestSorulari(c.id);

      // Üstteki skor tablosu satırı
      const hucreler = el("div", { className: "hucreler" });
      for (const s of sorular) {
        const h = el("button", {
          className: "hucre giris" + (cozulduMu(s) ? " cozuldu" : ""),
          textContent: s.harf,
          title: `${s.harf}. ${s.ad}`,
        });
        h.dataset.id = s.id;
        h.style.animationDelay = Math.min(gecikme++, 40) * 25 + "ms";
        h.addEventListener("click", () => soruyaGit(s.id));
        hucreler.append(h);
      }
      const satir = el("div", { className: "tablo-satir" },
        el("div", { className: "tablo-ad", textContent: c.ad }),
        hucreler,
        el("div", { className: "tablo-sayi", id: "ozet-" + c.id }),
      );
      satir.dataset.kamp = kamp.id;
      tablo.append(satir);

      // Contest bölümü
      const liste = el("ul", { className: "liste" });
      for (const s of sorular) liste.append(soruSatiri(s, false));
      kampBolum.append(
        el("section", { className: "bolum", id: "bolum-" + c.id },
          el("div", { className: "bolum-head" },
            el("h3", {}, el("a", { href: c.link, target: "_blank", rel: "noopener", textContent: c.ad })),
            el("span", { className: "sayi", id: "sayi-" + c.id }),
          ),
          el("div", { className: "cubuk" }, el("span", { id: "cubuk-" + c.id })),
          liste,
          el("p", { className: "bos-not", hidden: true, textContent: "Bu filtrede soru yok." }),
        ),
      );
    }
    bolumler.append(kampBolum);
  }
  guncelle();
}

// duz = true: sıralı listede gösterilir, contest adı da yazılır
function soruSatiri(s, duz) {
  const li = el("li", { className: "soru" + (cozulduMu(s) ? " cozuldu" : "") });
  li.dataset.id = s.id;
  const isaret = el("button", { className: "isaret", textContent: "+", ariaLabel: s.ad + " çözüldü" });
  isaret.setAttribute("aria-pressed", cozulduMu(s));
  isaret.addEventListener("click", () => degistir(s, isaret));

  const rating = el("span", { className: "rating", textContent: s.rating ?? "" });
  rating.style.color = ratingRengi(s.rating);

  const alt = [duz ? CONTEST[s.contest].ad : s.kaynak];
  if (s.konular.length) alt.push(s.konular.join(", "));

  li.append(
    isaret,
    el("span", { className: "harf", textContent: s.harf }),
    el("span", { className: "ad" }, s.ad, el("small", { textContent: alt.join(" — ") })),
    rating,
    el("a", { className: "ac", href: s.link, target: "_blank", rel: "noopener", textContent: "Aç" }),
  );
  return li;
}

function degistir(s, tiklanan) {
  const olacak = !cozulduMu(s);
  durumlar[s.id] = olacak;
  kaydet();

  // Aynı soru birden fazla yerde görünebilir (ör. birkaç konu altında)
  for (const li of document.querySelectorAll(`.soru[data-id="${s.id}"]`)) {
    li.classList.toggle("cozuldu", olacak);
    li.querySelector(".isaret").setAttribute("aria-pressed", olacak);
  }
  tiklanan.classList.remove("pat");
  void tiklanan.offsetWidth; // animasyonu yeniden başlatmak için
  if (olacak) tiklanan.classList.add("pat");

  document.querySelector(`.hucre[data-id="${s.id}"]`).classList.toggle("cozuldu", olacak);
  guncelle();
}

function soruyaGit(id) {
  if (siralama !== "contest") siralamaSec("contest");
  const li = document.querySelector(`#bolumler .soru[data-id="${id}"]`);
  if (li.classList.contains("gizli")) durumSec("hepsi");
  if (li.closest(".kamp").hidden) kampSec("hepsi");
  li.scrollIntoView({ behavior: "smooth", block: "center" });
  li.classList.remove("vurgu");
  void li.offsetWidth;
  li.classList.add("vurgu");
}

// Sıralı görünüm: seçili kamptaki sorular, başlıklar altında
function gruplar() {
  const sorular = SORULAR
    .filter((s) => kampFiltresi === "hepsi" || CONTEST[s.contest].kamp === kampFiltresi)
    .sort(zorlukSirasi);
  const g = new Map();
  const ekle = (anahtar, s) => (g.get(anahtar) || g.set(anahtar, []).get(anahtar)).push(s);

  if (siralama === "zorluk") {
    for (const s of sorular) ekle(s.rating == null ? "Rating yok" : "Rating " + s.rating, s);
  } else if (siralama === "harf") {
    for (const s of [...sorular].sort((a, b) => a.harf[0].localeCompare(b.harf[0])))
      ekle(s.harf[0] + " soruları", s);
  } else if (siralama === "durum") {
    for (const s of sorular.filter((s) => !cozulduMu(s))) ekle("Çözülmedi", s);
    for (const s of sorular.filter(cozulduMu)) ekle("Çözüldü", s);
  } else if (siralama === "konu") {
    const sayac = {};
    for (const s of sorular) for (const k of s.konular) sayac[k] = (sayac[k] || 0) + 1;
    const konular = Object.keys(sayac).sort((a, b) => sayac[b] - sayac[a]);
    for (const k of konular) for (const s of sorular) if (s.konular.includes(k)) ekle(konuAdi(k), s);
    for (const s of sorular) if (!s.konular.length) ekle("Konu bilinmiyor", s);
  }
  return g;
}

function duzCiz() {
  const duz = document.getElementById("duz");
  duz.replaceChildren();
  for (const [baslik, sorular] of gruplar()) {
    const liste = el("ul", { className: "liste" });
    for (const s of sorular) liste.append(soruSatiri(s, true));
    const h3 = el("h3", { textContent: baslik });
    if (siralama === "zorluk") h3.style.color = ratingRengi(sorular[0].rating);
    duz.append(
      el("section", { className: "bolum grup-duz" },
        el("div", { className: "bolum-head" }, h3, el("span", { className: "sayi" })),
        el("div", { className: "cubuk" }, el("span")),
        liste,
      ),
    );
  }
  duz.append(el("p", { className: "bos-not", id: "duz-bos", hidden: true, textContent: "Bu filtrede soru yok." }));
  guncelle();
}

function guncelle() {
  let toplam = 0;
  for (const c of CONTESTLER) {
    const sorular = contestSorulari(c.id);
    const n = sorular.filter(cozulduMu).length;
    toplam += n;
    document.getElementById("ozet-" + c.id).textContent = `${n}/${sorular.length}`;
    document.getElementById("sayi-" + c.id).textContent = `${n} / ${sorular.length}`;
    document.getElementById("cubuk-" + c.id).style.width = sorular.length ? (n / sorular.length) * 100 + "%" : "0";
  }
  for (const g of document.querySelectorAll(".grup-duz")) {
    const hepsi = g.querySelectorAll(".soru").length;
    const n = g.querySelectorAll(".soru.cozuldu").length;
    g.querySelector(".sayi").textContent = `${n} / ${hepsi}`;
    g.querySelector(".cubuk span").style.width = (n / hepsi) * 100 + "%";
  }
  document.getElementById("toplam-cozulen").textContent = toplam;
  document.getElementById("toplam-soru").textContent = SORULAR.length;
  filtrele();
}

function filtrele() {
  for (const e of document.querySelectorAll(".kamp, .tablo-kamp, .tablo-satir")) {
    e.hidden = kampFiltresi !== "hepsi" && e.dataset.kamp !== kampFiltresi;
  }
  document.getElementById("bolumler").hidden = siralama !== "contest";
  document.getElementById("duz").hidden = siralama === "contest";

  for (const bolum of document.querySelectorAll(".bolum")) {
    let gorunen = 0;
    for (const li of bolum.querySelectorAll(".soru")) {
      const c = li.classList.contains("cozuldu");
      const goster = durumFiltresi === "hepsi" || (durumFiltresi === "cozuldu") === c;
      li.classList.toggle("gizli", !goster);
      if (goster) gorunen++;
    }
    if (bolum.classList.contains("grup-duz")) bolum.hidden = gorunen === 0;
    else bolum.querySelector(".bos-not").hidden = gorunen > 0;
  }
  const duzBos = document.getElementById("duz-bos");
  if (duzBos) duzBos.hidden = !!document.querySelector(".grup-duz:not([hidden])");
}

function secimleriIsaretle(grup, ozellik, deger) {
  for (const b of document.querySelectorAll(`#${grup} .secim`)) {
    b.setAttribute("aria-pressed", b.dataset[ozellik] === deger);
  }
}
function durumSec(d) { durumFiltresi = d; secimleriIsaretle("durum-secim", "durum", d); filtrele(); }
function kampSec(k) {
  kampFiltresi = k;
  secimleriIsaretle("kamp-secim", "kamp", k);
  if (siralama !== "contest") duzCiz();
  filtrele();
}
function siralamaSec(s) {
  siralama = s;
  document.getElementById("siralama").value = s;
  if (s === "contest") document.getElementById("duz").replaceChildren();
  else duzCiz();
  filtrele();
}

ciz();

document.getElementById("durum-secim").addEventListener("click", (e) => {
  const b = e.target.closest(".secim");
  if (b) durumSec(b.dataset.durum);
});
document.getElementById("kamp-secim").addEventListener("click", (e) => {
  const b = e.target.closest(".secim");
  if (b) kampSec(b.dataset.kamp);
});
document.getElementById("siralama").addEventListener("change", (e) => siralamaSec(e.target.value));
