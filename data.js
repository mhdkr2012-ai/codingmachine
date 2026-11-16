// VJudge'dan alındı: 16 Kasım 2026. TÜBİTAK Yaz Kampı 2026-2027 grubu.
// cozuldu: o tarihte VJudge'da Accepted olan sorular. Sitede tıklayınca değişir.
// rating: Codeforces'un resmi zorluk puanı (sadece Codeforces soruları için).

const KAMPLAR = [
  { id: "son-kamp", ad: "Son Kamp", aciklama: "Ortaokul Kasım Kampı" },
  { id: "ilk-kamp", ad: "İlk Kamp", aciklama: "Yaz kampı, Ağustos–Eylül 2026" },
];

const CONTESTLER = [
  { id: "868478", kamp: "son-kamp", ad: "Gün 2 · Kısa Contest", link: "https://vjudge.net/contest/868478" },
  { id: "868302", kamp: "son-kamp", ad: "Gün 2 · Uzun Contest", link: "https://vjudge.net/contest/868302" },
  { id: "868077", kamp: "son-kamp", ad: "Gün 1 · Kısa Contest", link: "https://vjudge.net/contest/868077" },
  { id: "847022", kamp: "ilk-kamp", ad: "Interaktif MASHUP", link: "https://vjudge.net/contest/847022" },
  { id: "846809", kamp: "ilk-kamp", ad: "Lise DP Mashup", link: "https://vjudge.net/contest/846809" },
  { id: "846299", kamp: "ilk-kamp", ad: "Online Gün 3 · Ortaokul A", link: "https://vjudge.net/contest/846299" },
  { id: "846216", kamp: "ilk-kamp", ad: "Online Gün 2 · Ortaokul B", link: "https://vjudge.net/contest/846216" },
  { id: "846206", kamp: "ilk-kamp", ad: "Lise C · Orta A Gün 2", link: "https://vjudge.net/contest/846206" },
  { id: "845896", kamp: "ilk-kamp", ad: "Online Gün 1 · Kolay", link: "https://vjudge.net/contest/845896" },
  { id: "845459", kamp: "ilk-kamp", ad: "Ortaokul Contest++", link: "https://vjudge.net/contest/845459" },
  { id: "845453", kamp: "ilk-kamp", ad: "Ortaokul Contest", link: "https://vjudge.net/contest/845453" },
  { id: "844942", kamp: "ilk-kamp", ad: "Ortaokul A · DP Contest", link: "https://vjudge.net/contest/844942" },
];

const SORULAR = [
  // Gün 2 · Kısa Contest
  { id: "868478-A", contest: "868478", harf: "A", ad: "Scuza", kaynak: "CodeForces 1742E", link: "https://vjudge.net/contest/868478#problem/A", rating: 1200, cozuldu: false },
  { id: "868478-B", contest: "868478", harf: "B", ad: "White-Black Balanced Subtrees", kaynak: "CodeForces 1676G", link: "https://vjudge.net/contest/868478#problem/B", rating: 1300, cozuldu: false },
  { id: "868478-C", contest: "868478", harf: "C", ad: "Air Conditioners", kaynak: "CodeForces 1547E", link: "https://vjudge.net/contest/868478#problem/C", rating: 1500, cozuldu: false },
  { id: "868478-D", contest: "868478", harf: "D", ad: "The Third Letter", kaynak: "CodeForces 1850H", link: "https://vjudge.net/contest/868478#problem/D", rating: 1700, cozuldu: false },
  { id: "868478-E", contest: "868478", harf: "E", ad: "Competitive Fishing", kaynak: "CodeForces 2042C", link: "https://vjudge.net/contest/868478#problem/E", rating: 1800, cozuldu: false },
  // Gün 2 · Uzun Contest
  { id: "868302-A", contest: "868302", harf: "A", ad: "Odašiljači", kaynak: "OJUZ COCI20_odasiljaci", link: "https://vjudge.net/contest/868302#problem/A", rating: null, cozuldu: true },
  { id: "868302-B", contest: "868302", harf: "B", ad: "Self Study", kaynak: "OJUZ JOI22_ho_t2", link: "https://vjudge.net/contest/868302#problem/B", rating: null, cozuldu: true },
  { id: "868302-C", contest: "868302", harf: "C", ad: "LANCI", kaynak: "QOJ 16627", link: "https://vjudge.net/contest/868302#problem/C", rating: null, cozuldu: true },
  // Gün 1 · Kısa Contest
  { id: "868077-A", contest: "868077", harf: "A", ad: "Swaplama", kaynak: "AtCoder abc135_b", link: "https://vjudge.net/contest/868077#problem/A", rating: null, cozuldu: false },
  { id: "868077-B", contest: "868077", harf: "B", ad: "Mihai", kaynak: "AtCoder abc138_d", link: "https://vjudge.net/contest/868077#problem/B", rating: null, cozuldu: false },
  { id: "868077-C", contest: "868077", harf: "C", ad: "Batrakov", kaynak: "AtCoder abc132_d", link: "https://vjudge.net/contest/868077#problem/C", rating: null, cozuldu: false },
  { id: "868077-D", contest: "868077", harf: "D", ad: "DOST", kaynak: "AtCoder abc131_e", link: "https://vjudge.net/contest/868077#problem/D", rating: null, cozuldu: false },
  // Interaktif MASHUP
  { id: "847022-A", contest: "847022", harf: "A", ad: "Cave", kaynak: "OJUZ IOI13_cave", link: "https://vjudge.net/contest/847022#problem/A", rating: null, cozuldu: false },
  { id: "847022-B", contest: "847022", harf: "B", ad: "Carnival", kaynak: "OJUZ CEOI14_carnival", link: "https://vjudge.net/contest/847022#problem/B", rating: null, cozuldu: false },
  { id: "847022-C", contest: "847022", harf: "C", ad: "Kuroni and the Celebration", kaynak: "CodeForces 1305D", link: "https://vjudge.net/contest/847022#problem/C", rating: 1900, cozuldu: false },
  { id: "847022-D", contest: "847022", harf: "D", ad: "Coins", kaynak: "OJUZ IOI17_coins", link: "https://vjudge.net/contest/847022#problem/D", rating: null, cozuldu: false },
  { id: "847022-E", contest: "847022", harf: "E", ad: "Data Transfer", kaynak: "OJUZ IOI19_transfer", link: "https://vjudge.net/contest/847022#problem/E", rating: null, cozuldu: false },
  // Lise DP Mashup
  { id: "846809-A", contest: "846809", harf: "A", ad: "Tetrahedron", kaynak: "CodeForces 166E", link: "https://vjudge.net/contest/846809#problem/A", rating: 1500, cozuldu: true },
  { id: "846809-B", contest: "846809", harf: "B", ad: "Boredom", kaynak: "CodeForces 455A", link: "https://vjudge.net/contest/846809#problem/B", rating: 1500, cozuldu: true },
  { id: "846809-C", contest: "846809", harf: "C", ad: "Buns", kaynak: "CodeForces 106C", link: "https://vjudge.net/contest/846809#problem/C", rating: 1700, cozuldu: true },
  { id: "846809-D", contest: "846809", harf: "D", ad: "Flowers", kaynak: "CodeForces 474D", link: "https://vjudge.net/contest/846809#problem/D", rating: 1700, cozuldu: true },
  { id: "846809-E", contest: "846809", harf: "E", ad: "Mysterious Present", kaynak: "CodeForces 4D", link: "https://vjudge.net/contest/846809#problem/E", rating: 1700, cozuldu: true },
  { id: "846809-F", contest: "846809", harf: "F", ad: "Bag of mice", kaynak: "CodeForces 148D", link: "https://vjudge.net/contest/846809#problem/F", rating: 1800, cozuldu: true },
  { id: "846809-G", contest: "846809", harf: "G", ad: "Queries for Number of Palindromes", kaynak: "CodeForces 245H", link: "https://vjudge.net/contest/846809#problem/G", rating: 1800, cozuldu: true },
  { id: "846809-H", contest: "846809", harf: "H", ad: "Kefa and Dishes", kaynak: "CodeForces 580D", link: "https://vjudge.net/contest/846809#problem/H", rating: 1800, cozuldu: true },
  { id: "846809-I", contest: "846809", harf: "I", ad: "Let's Go Rolling!", kaynak: "CodeForces 38E", link: "https://vjudge.net/contest/846809#problem/I", rating: 1800, cozuldu: false },
  { id: "846809-J", contest: "846809", harf: "J", ad: "Consecutive Subsequence", kaynak: "CodeForces 977F", link: "https://vjudge.net/contest/846809#problem/J", rating: 1700, cozuldu: true },
  // Online Gün 3 · Ortaokul A
  { id: "846299-A", contest: "846299", harf: "A", ad: "Date", kaynak: "Kilonova 244", link: "https://vjudge.net/contest/846299#problem/A", rating: null, cozuldu: true },
  { id: "846299-B", contest: "846299", harf: "B", ad: "Hide and seek", kaynak: "Kilonova 245", link: "https://vjudge.net/contest/846299#problem/B", rating: null, cozuldu: false },
  { id: "846299-C", contest: "846299", harf: "C", ad: "Ezlulu", kaynak: "Kilonova 243", link: "https://vjudge.net/contest/846299#problem/C", rating: null, cozuldu: true },
  // Online Gün 2 · Ortaokul B
  { id: "846216-A", contest: "846216", harf: "A", ad: "City Savers", kaynak: "AtCoder abc135_c", link: "https://vjudge.net/contest/846216#problem/A", rating: null, cozuldu: true },
  { id: "846216-B", contest: "846216", harf: "B", ad: "Nick and Array", kaynak: "CodeForces 1180B", link: "https://vjudge.net/contest/846216#problem/B", rating: 1500, cozuldu: true },
  { id: "846216-C", contest: "846216", harf: "C", ad: "Tetrahedron", kaynak: "CodeForces 166E", link: "https://vjudge.net/contest/846216#problem/C", rating: 1500, cozuldu: true },
  { id: "846216-D", contest: "846216", harf: "D", ad: "String Formation", kaynak: "AtCoder abc158_d", link: "https://vjudge.net/contest/846216#problem/D", rating: null, cozuldu: true },
  { id: "846216-E", contest: "846216", harf: "E", ad: "Forever Winter", kaynak: "CodeForces 1829F", link: "https://vjudge.net/contest/846216#problem/E", rating: 1300, cozuldu: true },
  // Lise C · Orta A Gün 2
  { id: "846206-A", contest: "846206", harf: "A", ad: "Redistributing Gifts", kaynak: "USACO 1206", link: "https://vjudge.net/contest/846206#problem/A", rating: null, cozuldu: true },
  { id: "846206-B", contest: "846206", harf: "B", ad: "Robot Instructions", kaynak: "USACO 1207", link: "https://vjudge.net/contest/846206#problem/B", rating: null, cozuldu: true },
  { id: "846206-C", contest: "846206", harf: "C", ad: "Email Filing", kaynak: "USACO 1208", link: "https://vjudge.net/contest/846206#problem/C", rating: null, cozuldu: false },
  // Online Gün 1 · Kolay
  { id: "845896-A", contest: "845896", harf: "A", ad: "Rima", kaynak: "QOJ 15375", link: "https://vjudge.net/contest/845896#problem/A", rating: null, cozuldu: true },
  { id: "845896-B", contest: "845896", harf: "B", ad: "Krugomet", kaynak: "QOJ 15376", link: "https://vjudge.net/contest/845896#problem/B", rating: null, cozuldu: true },
  { id: "845896-C", contest: "845896", harf: "C", ad: "Harmonija", kaynak: "QOJ 15377", link: "https://vjudge.net/contest/845896#problem/C", rating: null, cozuldu: false },
  { id: "845896-D", contest: "845896", harf: "D", ad: "Kraljica", kaynak: "QOJ 15378", link: "https://vjudge.net/contest/845896#problem/D", rating: null, cozuldu: false },
  { id: "845896-E", contest: "845896", harf: "E", ad: "Zagi", kaynak: "QOJ 15379", link: "https://vjudge.net/contest/845896#problem/E", rating: null, cozuldu: false },
  // Ortaokul Contest++
  { id: "845459-A", contest: "845459", harf: "A", ad: "Closest Cow Wins", kaynak: "USACO 1158", link: "https://vjudge.net/contest/845459#problem/A", rating: null, cozuldu: false },
  { id: "845459-B", contest: "845459", harf: "B", ad: "Connecting Two Barns", kaynak: "USACO 1159", link: "https://vjudge.net/contest/845459#problem/B", rating: null, cozuldu: false },
  { id: "845459-C", contest: "845459", harf: "C", ad: "Convoluted Intervals", kaynak: "USACO 1160", link: "https://vjudge.net/contest/845459#problem/C", rating: null, cozuldu: false },
  // Ortaokul Contest
  { id: "845453-A", contest: "845453", harf: "A", ad: "Lonely Photo", kaynak: "USACO 1155", link: "https://vjudge.net/contest/845453#problem/A", rating: null, cozuldu: true },
  { id: "845453-B", contest: "845453", harf: "B", ad: "Air Cownditioning", kaynak: "USACO 1156", link: "https://vjudge.net/contest/845453#problem/B", rating: null, cozuldu: true },
  { id: "845453-C", contest: "845453", harf: "C", ad: "Walking Home", kaynak: "USACO 1157", link: "https://vjudge.net/contest/845453#problem/C", rating: null, cozuldu: true },
  // Ortaokul A · DP Contest
  { id: "844942-A", contest: "844942", harf: "A", ad: "dp1", kaynak: "AtCoder dp_c", link: "https://vjudge.net/contest/844942#problem/A", rating: null, cozuldu: true },
  { id: "844942-B", contest: "844942", harf: "B", ad: "dp2", kaynak: "AtCoder dp_d", link: "https://vjudge.net/contest/844942#problem/B", rating: null, cozuldu: false },
  { id: "844942-C", contest: "844942", harf: "C", ad: "dp3", kaynak: "AtCoder dp_h", link: "https://vjudge.net/contest/844942#problem/C", rating: null, cozuldu: false },
  { id: "844942-D", contest: "844942", harf: "D", ad: "dp4", kaynak: "CodeForces 1881E", link: "https://vjudge.net/contest/844942#problem/D", rating: 1500, cozuldu: false },
  { id: "844942-E", contest: "844942", harf: "E", ad: "dp5", kaynak: "CodeForces 1842C", link: "https://vjudge.net/contest/844942#problem/E", rating: 1500, cozuldu: false },
  { id: "844942-F", contest: "844942", harf: "F", ad: "dp6", kaynak: "CodeForces 977F", link: "https://vjudge.net/contest/844942#problem/F", rating: 1700, cozuldu: true },
];
