const ANAHTAR = "codingmachine.durumlar";

// Kayıtlı işaretler: { soruId: true/false }. Yoksa data.js'teki "cozuldu" geçerli.
function oku() {
  try { return JSON.parse(localStorage.getItem(ANAHTAR) || "{}"); }
  catch { return {}; }
}
function kaydet() {
  try { localStorage.setItem(ANAHTAR, JSON.stringify(durumlar)); } catch {}
}

const durumlar = oku();
const cozulduMu = (s) => (s.id in durumlar ? durumlar[s.id] : s.cozuldu);

let durumFiltresi = "hepsi";
let kampFiltresi = "hepsi";

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
      for (const s of sorular) liste.append(soruSatiri(s));
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

function soruSatiri(s) {
  const li = el("li", { className: "soru" + (cozulduMu(s) ? " cozuldu" : ""), id: "soru-" + s.id });
  const isaret = el("button", { className: "isaret", textContent: "+", ariaLabel: s.ad + " çözüldü" });
  isaret.setAttribute("aria-pressed", cozulduMu(s));
  isaret.addEventListener("click", () => degistir(s, li, isaret));

  const rating = el("span", { className: "rating", textContent: s.rating ?? "" });
  rating.style.color = ratingRengi(s.rating);

  li.append(
    isaret,
    el("span", { className: "harf", textContent: s.harf }),
    el("span", { className: "ad" }, s.ad, el("small", { textContent: s.kaynak })),
    rating,
    el("a", { className: "ac", href: s.link, target: "_blank", rel: "noopener", textContent: "Aç" }),
  );
  return li;
}

function degistir(s, li, isaret) {
  const olacak = !cozulduMu(s);
  durumlar[s.id] = olacak;
  kaydet();

  li.classList.toggle("cozuldu", olacak);
  isaret.setAttribute("aria-pressed", olacak);
  isaret.classList.remove("pat");
  void isaret.offsetWidth; // animasyonu yeniden başlatmak için
  if (olacak) isaret.classList.add("pat");

  document.querySelector(`.hucre[data-id="${s.id}"]`).classList.toggle("cozuldu", olacak);
  guncelle();
}

function soruyaGit(id) {
  const li = document.getElementById("soru-" + id);
  if (li.classList.contains("gizli")) durumSec("hepsi");
  if (li.closest(".kamp").hidden) kampSec("hepsi");
  li.scrollIntoView({ behavior: "smooth", block: "center" });
  li.classList.remove("vurgu");
  void li.offsetWidth;
  li.classList.add("vurgu");
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
  document.getElementById("toplam-cozulen").textContent = toplam;
  document.getElementById("toplam-soru").textContent = SORULAR.length;
  filtrele();
}

function filtrele() {
  for (const e of document.querySelectorAll(".kamp, .tablo-kamp, .tablo-satir")) {
    e.hidden = kampFiltresi !== "hepsi" && e.dataset.kamp !== kampFiltresi;
  }
  for (const bolum of document.querySelectorAll(".bolum")) {
    let gorunen = 0;
    for (const li of bolum.querySelectorAll(".soru")) {
      const c = li.classList.contains("cozuldu");
      const goster = durumFiltresi === "hepsi" || (durumFiltresi === "cozuldu") === c;
      li.classList.toggle("gizli", !goster);
      if (goster) gorunen++;
    }
    bolum.querySelector(".bos-not").hidden = gorunen > 0;
  }
}

function secimleriIsaretle(grup, ozellik, deger) {
  for (const b of document.querySelectorAll(`#${grup} .secim`)) {
    b.setAttribute("aria-pressed", b.dataset[ozellik] === deger);
  }
}
function durumSec(d) { durumFiltresi = d; secimleriIsaretle("durum-secim", "durum", d); filtrele(); }
function kampSec(k) { kampFiltresi = k; secimleriIsaretle("kamp-secim", "kamp", k); filtrele(); }

ciz();

document.getElementById("durum-secim").addEventListener("click", (e) => {
  const b = e.target.closest(".secim");
  if (b) durumSec(b.dataset.durum);
});
document.getElementById("kamp-secim").addEventListener("click", (e) => {
  const b = e.target.closest(".secim");
  if (b) kampSec(b.dataset.kamp);
});
