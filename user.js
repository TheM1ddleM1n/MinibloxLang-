// ==UserScript==
// @name         Miniblox Chat Translator + Filter
// @namespace    #TheM1ddleM1nCooksAgain
// @version      6.3
// @description  Ts is tuff 🪙
// @match        *://miniblox.io/*
// @author       TheM1ddleM1n (filter by joudaALT)
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    console.log("[CHAT] Translator + Filter loaded");

    // ─── Language Config ───────────────────────────────────────────────────────

    const LANGUAGES = {
        OFF: { label: "OFF", color: "#444", text: "#aaa" },
        HI: { label: "Hindi", color: "#b35c00", text: "#fff" },
        RU: { label: "Russian", color: "#1a5cb3", text: "#fff" },
        JA: { label: "Japanese", color: "#b30000", text: "#fff" },
        AR: { label: "Arabic", color: "#006b3c", text: "#fff" },
        GR: { label: "Greek", color: "#003f8a", text: "#ffd700" },
        KO: { label: "Korean", color: "#6a0dad", text: "#fff" },
        HE: { label: "Hebrew", color: "#1a3a6b", text: "#fff" },
        TH: { label: "Thai", color: "#8b0000", text: "#fff" },
        KA: { label: "Georgian", color: "#722f37", text: "#fff" },
        HY: { label: "Armenian", color: "#c0392b", text: "#fff" },
        BR: { label: "Braille", color: "#006666", text: "#fff" },
        MO: { label: "Morse", color: "#4a5c2a", text: "#fff" },
        VI: { label: "Vietnamese", color: "#da251d", text: "#ffff00" },
        ZH: { label: "Chinese", color: "#8b0000", text: "#ffd700" },
        TR: { label: "Turkish", color: "#e30a17", text: "#fff" },
        PL: { label: "Polish", color: "#dc143c", text: "#fff" },
    };

    // ─── Character Maps ────────────────────────────────────────────────────────

    const COMMON = {
        "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
        "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
        " ": " ", ".": ".", ",": ",", "!": "!", "?": "?", "-": "-", "_": "_", "/": "/"
    };

    const HI_MAP = {
        a: "ए", b: "बी", c: "सी", d: "डी", e: "ई", f: "एफ", g: "जी", h: "एच",
        i: "आई", j: "जे", k: "के", l: "एल", m: "एम", n: "एन", o: "ओ", p: "पी",
        q: "क्यू", r: "आर", s: "एस", t: "टी", u: "यू", v: "वी", w: "डब्लू", x: "एक्स",
        y: "वाय", z: "ज़ैड",
        A: "ए", B: "बी", C: "सी", D: "डी", E: "ई", F: "एफ", G: "जी", H: "एच",
        I: "आई", J: "जे", K: "के", L: "एल", M: "एम", N: "एन", O: "ओ", P: "पी",
        Q: "क्यू", R: "आर", S: "एस", T: "टी", U: "यू", V: "वी", W: "डब्लू", X: "एक्स",
        Y: "वाय", Z: "ज़ैड"
    };

    const RU_MAP = {
        a: "а", b: "б", c: "ц", d: "д", e: "е", f: "ф", g: "г", h: "х",
        i: "и", j: "й", k: "к", l: "л", m: "м", n: "н", o: "о", p: "п",
        q: "я", r: "р", s: "с", t: "т", u: "у", v: "в", w: "ш", x: "кс",
        y: "ы", z: "з",
        A: "А", B: "Б", C: "Ц", D: "Д", E: "Е", F: "Ф", G: "Г", H: "Х",
        I: "И", J: "Й", K: "К", L: "Л", M: "М", N: "Н", O: "О", P: "П",
        Q: "Я", R: "Р", S: "С", T: "Т", U: "У", V: "В", W: "Ш", X: "КС",
        Y: "Ы", Z: "З"
    };

    const JA_MAP = {
        a: "ア", b: "ブ", c: "ク", d: "ド", e: "エ", f: "フ", g: "グ", h: "ハ",
        i: "イ", j: "ジ", k: "ク", l: "ル", m: "ム", n: "ン", o: "オ", p: "プ",
        q: "ク", r: "ル", s: "ス", t: "ト", u: "ウ", v: "ヴ", w: "ウ", x: "クス",
        y: "ヤ", z: "ズ",
        A: "ア", B: "ブ", C: "ク", D: "ド", E: "エ", F: "フ", G: "グ", H: "ハ",
        I: "イ", J: "ジ", K: "ク", L: "ル", M: "ム", N: "ン", O: "オ", P: "プ",
        Q: "ク", R: "ル", S: "ス", T: "ト", U: "ウ", V: "ヴ", W: "ウ", X: "クス",
        Y: "ヤ", Z: "ズ"
    };

    const AR_MAP = {
        a: "ا", b: "ب", c: "ك", d: "د", e: "ي", f: "ف", g: "ج", h: "ه",
        i: "ي", j: "ج", k: "ك", l: "ل", m: "م", n: "ن", o: "و", p: "پ",
        q: "ق", r: "ر", s: "س", t: "ت", u: "و", v: "ڤ", w: "و", x: "كس",
        y: "ي", z: "ز",
        A: "ا", B: "ب", C: "ك", D: "د", E: "ي", F: "ف", G: "ج", H: "ه",
        I: "ي", J: "ج", K: "ك", L: "ل", M: "م", N: "ن", O: "و", P: "پ",
        Q: "ق", R: "ر", S: "س", T: "ت", U: "و", V: "ڤ", W: "و", X: "كس",
        Y: "ي", Z: "ز"
    };

    const GR_MAP = {
        a: "α", b: "β", c: "ψ", d: "δ", e: "ε", f: "φ", g: "γ", h: "η",
        i: "ι", j: "ξ", k: "κ", l: "λ", m: "μ", n: "ν", o: "ο", p: "π",
        q: "θ", r: "ρ", s: "σ", t: "τ", u: "υ", v: "ω", w: "ω", x: "χ",
        y: "υ", z: "ζ",
        A: "Α", B: "Β", C: "Ψ", D: "Δ", E: "Ε", F: "Φ", G: "Γ", H: "Η",
        I: "Ι", J: "Ξ", K: "Κ", L: "Λ", M: "Μ", N: "Ν", O: "Ο", P: "Π",
        Q: "Θ", R: "Ρ", S: "Σ", T: "Τ", U: "Υ", V: "Ω", W: "Ω", X: "Χ",
        Y: "Υ", Z: "Ζ"
    };

    const KO_MAP = {
        a: "아", b: "비", c: "씨", d: "디", e: "이", f: "에프", g: "지", h: "에이치",
        i: "아이", j: "제이", k: "케이", l: "엘", m: "엠", n: "엔", o: "오", p: "피",
        q: "큐", r: "아르", s: "에스", t: "티", u: "유", v: "브이", w: "더블유", x: "엑스",
        y: "와이", z: "제트",
        A: "아", B: "비", C: "씨", D: "디", E: "이", F: "에프", G: "지", H: "에이치",
        I: "아이", J: "제이", K: "케이", L: "엘", M: "엠", N: "엔", O: "오", P: "피",
        Q: "큐", R: "아르", S: "에스", T: "티", U: "유", V: "브이", W: "더블유", X: "엑스",
        Y: "와이", Z: "제트"
    };

    const HE_MAP = {
        a: "א", b: "ב", c: "צ", d: "ד", e: "ע", f: "פ", g: "ג", h: "ה",
        i: "י", j: "ג׳", k: "ק", l: "ל", m: "מ", n: "נ", o: "ו", p: "פ",
        q: "ק", r: "ר", s: "ס", t: "ת", u: "ו", v: "ו", w: "ו", x: "כס",
        y: "י", z: "ז",
        A: "א", B: "ב", C: "צ", D: "ד", E: "ע", F: "פ", G: "ג", H: "ה",
        I: "י", J: "ג׳", K: "ק", L: "ל", M: "מ", N: "נ", O: "ו", P: "פ",
        Q: "ק", R: "ר", S: "ס", T: "ת", U: "ו", V: "ו", W: "ו", X: "כס",
        Y: "י", Z: "ז"
    };

    const TH_MAP = {
        a: "อา", b: "บี", c: "ซี", d: "ดี", e: "อี", f: "เอฟ", g: "จี", h: "เอช",
        i: "ไอ", j: "เจ", k: "เค", l: "แอล", m: "เอ็ม", n: "เอ็น", o: "โอ", p: "พี",
        q: "คิว", r: "อาร์", s: "เอส", t: "ที", u: "ยู", v: "วี", w: "ดับเบิ้ลยู", x: "เอ็กซ์",
        y: "วาย", z: "ซีด",
        A: "อา", B: "บี", C: "ซี", D: "ดี", E: "อี", F: "เอฟ", G: "จี", H: "เอช",
        I: "ไอ", J: "เจ", K: "เค", L: "แอล", M: "เอ็ม", N: "เอ็น", O: "โอ", P: "พี",
        Q: "คิว", R: "อาร์", S: "เอส", T: "ที", U: "ยู", V: "วี", W: "ดับเบิ้ลยู", X: "เอ็กซ์",
        Y: "วาย", Z: "ซีด"
    };

    const KA_MAP = {
        a: "ა", b: "ბ", c: "ც", d: "დ", e: "ე", f: "ფ", g: "გ", h: "ჰ",
        i: "ი", j: "ჯ", k: "კ", l: "ლ", m: "მ", n: "ნ", o: "ო", p: "პ",
        q: "ქ", r: "რ", s: "ს", t: "ტ", u: "უ", v: "ვ", w: "წ", x: "ხ",
        y: "ყ", z: "ზ",
        A: "ა", B: "ბ", C: "ც", D: "დ", E: "ე", F: "ფ", G: "გ", H: "ჰ",
        I: "ი", J: "ჯ", K: "კ", L: "ლ", M: "მ", N: "ნ", O: "ო", P: "პ",
        Q: "ქ", R: "რ", S: "ს", T: "ტ", U: "უ", V: "ვ", W: "წ", X: "ხ",
        Y: "ყ", Z: "ზ"
    };

    const HY_MAP = {
        a: "ա", b: "բ", c: "ց", d: "դ", e: "է", f: "ֆ", g: "գ", h: "հ",
        i: "ի", j: "ձ", k: "կ", l: "լ", m: "մ", n: "ն", o: "օ", p: "պ",
        q: "ք", r: "ր", s: "ս", t: "տ", u: "ու", v: "վ", w: "ւ", x: "խ",
        y: "յ", z: "զ",
        A: "Ա", B: "Բ", C: "Ծ", D: "Դ", E: "Է", F: "Ֆ", G: "Գ", H: "Հ",
        I: "Ի", J: "Ձ", K: "Կ", L: "Լ", M: "Մ", N: "Ն", O: "Օ", P: "Պ",
        Q: "Ք", R: "Ռ", S: "Ս", T: "Տ", U: "Ու", V: "Վ", W: "Ւ", X: "Խ",
        Y: "Յ", Z: "Զ"
    };

    const BR_MAP = {
        a: "⠁", b: "⠃", c: "⠉", d: "⠙", e: "⠑", f: "⠋", g: "⠛", h: "⠓",
        i: "⠊", j: "⠚", k: "⠅", l: "⠇", m: "⠍", n: "⠝", o: "⠕", p: "⠏",
        q: "⠟", r: "⠗", s: "⠎", t: "⠞", u: "⠥", v: "⠧", w: "⠺", x: "⠭",
        y: "⠽", z: "⠵",
        A: "⠁", B: "⠃", C: "⠉", D: "⠙", E: "⠑", F: "⠋", G: "⠛", H: "⠓",
        I: "⠊", J: "⠚", K: "⠅", L: "⠇", M: "⠍", N: "⠝", O: "⠕", P: "⠏",
        Q: "⠟", R: "⠗", S: "⠎", T: "⠞", U: "⠥", V: "⠧", W: "⠺", X: "⠭",
        Y: "⠽", Z: "⠵"
    };

    const MO_MAP = {
        a: ".- ", b: "-... ", c: "-.-. ", d: "-.. ", e: ". ", f: "..-. ", g: "--. ", h: ".... ",
        i: ".. ", j: ".--- ", k: "-.- ", l: ".-.. ", m: "-- ", n: "-. ", o: "--- ", p: ".--. ",
        q: "--.- ", r: ".-. ", s: "... ", t: "- ", u: "..- ", v: "...- ", w: ".-- ", x: "-..- ",
        y: "-.-- ", z: "--.. ",
        A: ".- ", B: "-... ", C: "-.-. ", D: "-.. ", E: ". ", F: "..-. ", G: "--. ", H: ".... ",
        I: ".. ", J: ".--- ", K: "-.- ", L: ".-.. ", M: "-- ", N: "-. ", O: "--- ", P: ".--. ",
        Q: "--.- ", R: ".-. ", S: "... ", T: "- ", U: "..- ", V: "...- ", W: ".-- ", X: "-..- ",
        Y: "-.-- ", Z: "--.. ",
        "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
        "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
        " ": " / ", ".": ".-.-.- ", ",": "--..-- ", "!": "-.-.-- ", "?": "..--.. "
    };

    const VI_MAP = {
        a: "à", b: "bê", c: "xê", d: "đê", e: "ê", f: "ép", g: "giê", h: "hắt",
        i: "i", j: "gi", k: "ca", l: "el", m: "em", n: "en", o: "ô", p: "pê",
        q: "qui", r: "er", s: "ét", t: "tê", u: "u", v: "vê", w: "vê kép", x: "ích",
        y: "i dài", z: "dét",
        A: "À", B: "Bê", C: "Xê", D: "Đê", E: "Ê", F: "Ép", G: "Giê", H: "Hắt",
        I: "I", J: "Gi", K: "Ca", L: "El", M: "Em", N: "En", O: "Ô", P: "Pê",
        Q: "Qui", R: "Er", S: "Ét", T: "Tê", U: "U", V: "Vê", W: "Vê kép", X: "Ích",
        Y: "I dài", Z: "Dét"
    };

    const ZH_MAP = {
        a: "诶", b: "比", c: "西", d: "迪", e: "伊", f: "艾弗", g: "吉", h: "艾尺",
        i: "艾", j: "杰", k: "开", l: "艾勒", m: "艾马", n: "艾娜", o: "哦", p: "屁",
        q: "吉吾", r: "艾儿", s: "艾丝", t: "提", u: "优", v: "维", w: "豆贝尔维", x: "艾克斯",
        y: "歪", z: "贼德",
        A: "诶", B: "比", C: "西", D: "迪", E: "伊", F: "艾弗", G: "吉", H: "艾尺",
        I: "艾", J: "杰", K: "开", L: "艾勒", M: "艾马", N: "艾娜", O: "哦", P: "屁",
        Q: "吉吾", R: "艾儿", S: "艾丝", T: "提", U: "优", V: "维", W: "豆贝尔维", X: "艾克斯",
        Y: "歪", Z: "贼德"
    };

    const TR_MAP = {
        a: "a", b: "be", c: "ce", d: "de", e: "e", f: "fe", g: "ge", h: "he",
        i: "ı", j: "je", k: "ke", l: "le", m: "me", n: "ne", o: "o", p: "pe",
        q: "ku", r: "re", s: "se", t: "te", u: "u", v: "ve", w: "çift ve", x: "iks",
        y: "ye", z: "ze",
        A: "A", B: "Be", C: "Ce", D: "De", E: "E", F: "Fe", G: "Ge", H: "He",
        I: "I", J: "Je", K: "Ke", L: "Le", M: "Me", N: "Ne", O: "O", P: "Pe",
        Q: "Ku", R: "Re", S: "Se", T: "Te", U: "U", V: "Ve", W: "Çift ve", X: "İks",
        Y: "Ye", Z: "Ze"
    };

    const PL_MAP = {
        a: "a", b: "be", c: "ce", d: "de", e: "e", f: "ef", g: "gie", h: "ha",
        i: "i", j: "jot", k: "ka", l: "el", m: "em", n: "en", o: "o", p: "pe",
        q: "ku", r: "er", s: "es", t: "te", u: "u", v: "fau", w: "wu", x: "iks",
        y: "igrek", z: "zet",
        A: "A", B: "Be", C: "Ce", D: "De", E: "E", F: "Ef", G: "Gie", H: "Ha",
        I: "I", J: "Jot", K: "Ka", L: "El", M: "Em", N: "En", O: "O", P: "Pe",
        Q: "Ku", R: "Er", S: "Es", T: "Te", U: "U", V: "Fau", W: "Wu", X: "Iks",
        Y: "Igrek", Z: "Zet"
    };

    [HI_MAP, RU_MAP, JA_MAP, AR_MAP, GR_MAP, KO_MAP, HE_MAP, TH_MAP, KA_MAP, HY_MAP, BR_MAP, VI_MAP, ZH_MAP, TR_MAP, PL_MAP].forEach(m => Object.assign(m, COMMON));

    const MAPS = {
        HI: HI_MAP, RU: RU_MAP, JA: JA_MAP, AR: AR_MAP, GR: GR_MAP, KO: KO_MAP,
        HE: HE_MAP, TH: TH_MAP, KA: KA_MAP, HY: HY_MAP, BR: BR_MAP, MO: MO_MAP,
        VI: VI_MAP, ZH: ZH_MAP, TR: TR_MAP, PL: PL_MAP
    };

    // ─── Filter Config ─────────────────────────────────────────────────────────

    const CONFIG = {
        blockBadWords: true,
        blockSpam: true,
        blockAllCaps: false
    };

    const BAD_WORDS = [
        // ── English profanity ──────────────────────────────────────────────────
        'fuck', 'fucking', 'fucker', 'fucked', 'fucks', 'motherfucker', 'motherfucking',
        'shit', 'shitty', 'shitter', 'bullshit', 'horseshit',
        'bitch', 'bitches', 'bitching', 'bitchy', 'son of a bitch',
        'asshole', 'arse', 'arsehole', 'asses', 'jackass', 'smartass', 'dumbass',
        'damn', 'dammit', 'goddamn', 'damned',
        'crap', 'crappy', 'crapping',
        'bastard', 'bastards',
        'dickhead', 'dick', 'dicks',
        'cock', 'cocks', 'cocksucker',
        'pussy', 'pussies',
        'pissed', 'pissing', 'piss',
        'cunt', 'cunts',
        'twat', 'twats',
        'wanker', 'wank', 'wanking',
        'bollocks', 'bollock',
        'tosser', 'tossers',
        'bellend', 'muppet',
        // ── English slurs ─────────────────────────────────────────────────────
        'fag', 'faggot', 'fags', 'faggots', 'faggy',
        'dyke', 'dykes',
        'nigger', 'niggers', 'nigga', 'niggas', 'niggaz',
        'retard', 'retarded', 'retards',
        'nazi', 'nazis', 'neo-nazi',
        'kike', 'kikes',
        'chink', 'chinks', 'chinky',
        'spic', 'spics', 'spick',
        'wetback', 'wetbacks',
        'tranny', 'trannies',
        'gook', 'gooks',
        'beaner', 'beaners',
        'paki', 'pakis',
        'towelhead', 'towelheads', 'raghead', 'ragheads',
        'cracker', 'crackers',
        'honky', 'honkies',
        'zipperhead', 'sandnigger',
        'gyp', 'gypo', 'gyppo',
        'coon', 'coons',
        'jigaboo', 'pickaninny', 'sambo', 'spook',
        'slope', 'slopes', 'squaw',
        'hymie', 'heeb', 'heebs', 'shylock',
        'poofter', 'poofters', 'queer', 'troon',
        // ── English drug references ────────────────────────────────────────────
        'cocaine', 'coke', 'blow', 'snow',
        'heroin', 'smack', 'dope', 'junk',
        'meth', 'methamphetamine', 'crystal meth',
        'crack', 'crack cocaine',
        'mdma', 'ecstasy', 'molly',
        'lsd', 'acid', 'shrooms', 'mushrooms',
        'fentanyl', 'oxy', 'oxycodone', 'percocet', 'xanax',
        'weed', 'marijuana', 'cannabis', 'pot', 'blunt', 'joint', 'spliff', 'bong',
        'ketamine', 'ket', 'special k',
        'pcp', 'angel dust',
        'shooting up', 'shoot up',
        // ── English sexual content ─────────────────────────────────────────────
        'porn', 'porno', 'pornography',
        'rape', 'raping', 'raped', 'rapist',
        'hentai',
        'whore', 'whores', 'slut', 'sluts', 'skank', 'skanks',
        'dildo', 'vibrator', 'fleshlight',
        // ── English leetspeak ─────────────────────────────────────────────────
        'fuk', 'fck', 'fuc', 'fucc', 'phuck', 'f4ck', 'f@ck', 'fvck', 'fxck', 'f**k', 'fu*k',
        'sht', 'shyt', 'sh1t', 'sh!t', '$hit', 's#it',
        'btch', 'b1tch', 'biatch', 'b!tch', 'b*tch',
        'azz', 'a$$', 'a55', '@ss',
        'dck', 'd1ck', 'd!ck', 'd*ck',
        'cnt', 'c*nt', 'c0nt',
        'nigg', 'n1gga', 'n1gger', 'n!gga', 'n!gger', 'n1gg3r', 'n!99a',
        'pr0n', 'p0rn', 'p*rn',
        'r4pe', 'r@pe',
        'h3r0in', 'c0ke', 'w33d', 'mdm4',
        // ── Self harm ─────────────────────────────────────────────────────────
        'kys', 'kill yourself', 'kill ur self', 'end yourself',
        // ── Russian ───────────────────────────────────────────────────────────
        'блять', 'блядь', 'блядина', 'блядки',
        'ёбаный', 'ёб', 'ёбать', 'ёбанный', 'ёбаная', 'заёбал',
        'пизда', 'пиздец', 'пиздить', 'пиздатый', 'распиздяй',
        'хуй', 'хуйня', 'хуёво', 'хуёвый', 'нахуй', 'похуй',
        'мудак', 'мудило', 'мудень',
        'залупа', 'залупаться',
        'ёптвоюмать', 'ёпт', 'ёп',
        'сука', 'суки', 'сучка',
        'пиздабол', 'пиздобратия',
        'ёбнутый', 'ёбнуться',
        'долбоёб', 'долбанутый',
        'манда', 'мандавошка',
        'шлюха', 'шлюхи',
        'ёбарь', 'уёбок', 'уёбище',
        'пиздёж', 'пиздюк',
        'нихуя', 'нихера',
        // ── Arabic ────────────────────────────────────────────────────────────
        'كس', 'كسك', 'كسمك', 'كسأمك',
        'زب', 'زبك', 'زبالة',
        'شرموطة', 'شراميط',
        'عرص', 'عرصة',
        'متناك', 'منيوك',
        'ابن الشرموطة', 'ابن القحبة',
        'قحبة', 'قحاب',
        'لوطي', 'لواط',
        'نيك', 'ينيك', 'ناك',
        'خول', 'خوالات',
        'طيز', 'طيزك',
        'هبل', 'معرص',
        // ── Hebrew ────────────────────────────────────────────────────────────
        'זין', 'זיין', 'מזדיין',
        'כוס', 'כוסאמק', 'כוסית',
        'שרמוטה', 'שרמוטות',
        'מנייק', 'מניאק',
        'בן זונה', 'בן שרמוטה',
        'זונה', 'זונות',
        'לך תזדיין', 'תזדיין',
        'חרא', 'חראים',
        'טמבל', 'אידיוט',
        'נבלה', 'מפגר',
        'זיפ', 'דפוק',
        // ── Chinese ───────────────────────────────────────────────────────────
        '操', '操你', '操你妈', '操你祖宗',
        '草泥马', '草你妈',
        '妈的', '他妈的', '他妈',
        '傻逼', '傻屄', '傻叉',
        '屄', '臭屄',
        '狗日', '狗日的',
        '婊子', '妓女',
        '龟儿子', '狗杂种',
        '滚', '滚蛋',
        '贱人', '贱货',
        '王八蛋', '混蛋',
        '烂货', '臭货',
        '废物', '蠢货',
        // ── Turkish ───────────────────────────────────────────────────────────
        'orospu', 'orospu çocuğu', 'orospunun evladı',
        'siktir', 'sik', 'sikmek', 'siktirgit',
        'amk', 'amına koyayım', 'amcık', 'am',
        'göt', 'götveren', 'götlek',
        'piç', 'piçlik', 'piç kurusu',
        'ibne', 'ibnelik',
        'kahpe', 'bok', 'boktan', 'boku',
        'yarrak', 'yarak',
        'şerefsiz', 'alçak',
        'pezevenk', 'pezevenklik',
        'kaltak', 'sürtük',
        'gavat', 'kancık',
        // ── Polish ────────────────────────────────────────────────────────────
        'kurwa', 'kurwy', 'kurwica', 'kurewska',
        'jebać', 'jebany', 'jebanie', 'zajebać',
        'pierdolić', 'pierdolony', 'pierdol się', 'pierdolec',
        'chuj', 'chuja', 'chujowy', 'chujnia',
        'pizda', 'pizdy', 'pizdaty',
        'skurwysyn', 'skurwiel',
        'cipa', 'cipy', 'cipsko',
        'dupa', 'dupek', 'dupsko',
        'zjeb', 'zjebany',
        'spierdalaj', 'spieprzaj',
        'zasrany', 'zasraniec',
        'cwel', 'cwelowanie',
        // ── Japanese ──────────────────────────────────────────────────────────
        'くそ', 'くそやろう', 'くそったれ',
        'ばか', 'バカ', 'ばかやろう', 'バカヤロウ',
        'あほ', 'アホ', 'あほんだら',
        'しね', '死ね', 'しんでくれ',
        'うざい', 'うざ',
        'きもい', 'きもちわるい',
        'まんこ', 'まんちん',
        'ちんこ', 'ちんぽ', 'ちんちん',
        'おまんこ', 'おちんちん',
        'ファック', 'ファッキン',
        'クソ野郎', 'クソガキ',
        'てめえ', 'てめー',
        'ぶっころす', 'ぶっ殺す',
        'むかつく', 'ざけんな',
        // ── Korean ────────────────────────────────────────────────────────────
        '씨발', '씨발놈', '씨발년',
        '개새끼', '개새', '개자식',
        '병신', '병신같은',
        '지랄', '지랄하네',
        '좆', '좆같은', '좆밥',
        '보지', '보짓물',
        '자지', '자지같은',
        '창녀', '창년',
        '꺼져', '닥쳐',
        '미친', '미친놈', '미친년',
        '개년', '개놈',
        '죽어', '뒤져',
        '찐따', '정신병자',
        '후레자식', '호로자식',
        // ── Hindi ─────────────────────────────────────────────────────────────
        'मादरचोद', 'मादरचोदों',
        'बहनचोद', 'भड़वा',
        'रंडी', 'रंडीबाज',
        'चूतिया', 'चूत',
        'लंड', 'लंडू',
        'गांड', 'गांडू', 'गांडमारा',
        'हरामी', 'हरामजादा', 'हरामजादी',
        'कमीना', 'कमीनी',
        'साला', 'साली',
        'कुत्ता', 'कुतिया',
        'बकलोल', 'बेवकूफ',
        'भोसड़ीके', 'टट्टी',
        // ── Vietnamese ────────────────────────────────────────────────────────
        'đụ', 'đụ má', 'đụ mẹ', 'đụ mày',
        'địt', 'địt mẹ', 'địt mày', 'địt con mẹ',
        'đéo', 'đéo biết', 'đéo cần',
        'cặc', 'cặc người',
        'lồn', 'lồn mày', 'con lồn',
        'vãi', 'vãi lồn', 'vãi cả lồn',
        'chó chết', 'chó má',
        'thằng chó', 'con chó',
        'mẹ kiếp', 'mẹ mày',
        'đồ khốn', 'đồ chó',
        'ngu', 'ngu như bò', 'ngu vãi',
        'khốn nạn', 'đồ khốn nạn',
        'súc vật', 'đồ súc vật',
    ];

    // ─── Filter Logic ──────────────────────────────────────────────────────────

    const SPAM_THRESHOLD = 3;
    const spamCounts = {};

    function stripSeparators(text) {
        return text.replace(/[\s\.\-\_\*\|\~\+\=]/g, '');
    }

    function containsBadWords(text) {
        const cleanText = text
            .replace(/\\#[0-9A-Fa-f]{6}\\/g, '')
            .replace(/\\reset\\/g, '')
            .replace(/\\glow\\/g, '')
            .toLowerCase();

        const strippedText = stripSeparators(cleanText);

        for (let word of BAD_WORDS) {
            const wordLower = word.toLowerCase();
            const isLatin = /^[a-z\s\*\@\$\!0-9]+$/.test(wordLower);

            if (isLatin) {
                const escapedWord = wordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp('(^|[^a-z])' + escapedWord + '($|[^a-z])', 'i');
                if (regex.test(cleanText)) return true;
                if (strippedText.includes(wordLower)) return true;
            } else {
                if (cleanText.includes(wordLower)) return true;
            }
        }

        return false;
    }

    function isSpam(text) {
        if (!spamCounts[text]) spamCounts[text] = 0;
        spamCounts[text]++;
        return spamCounts[text] >= SPAM_THRESHOLD;
    }

    function isAllCaps(text) {
        const letters = text.replace(/[^a-zA-Z]/g, '');
        if (letters.length < 10) return false;
        return letters === letters.toUpperCase();
    }

    function shouldBlockMessage(chatObj) {
        if (!chatObj || !chatObj.text) return false;
        const text = chatObj.text;
        if (text.includes('🚫 This message was blocked')) return false;
        if (/^\*+$/.test(text.trim())) return true;
        if ((text.match(/\*/g) || []).length >= 3) return true;
        if (CONFIG.blockBadWords && containsBadWords(text)) return true;
        if (CONFIG.blockSpam && isSpam(text)) return true;
        if (CONFIG.blockAllCaps && isAllCaps(text)) return true;
        return false;
    }

    // ─── State ─────────────────────────────────────────────────────────────────

    let currentLang = localStorage.getItem("miniblox_lang") || "OFF";

    function setLang(lang) {
        currentLang = lang;
        localStorage.setItem("miniblox_lang", lang);
        applyUIState();
    }

    // ─── Translate ─────────────────────────────────────────────────────────────

    function translate(text) {
        const map = MAPS[currentLang];
        if (!map) return text;
        return text.split("").map(c => map[c] ?? c).join("");
    }

    // ─── UI ────────────────────────────────────────────────────────────────────

    let button, dropdown;

    function applyUIState() {
        const lang = LANGUAGES[currentLang];
        button.style.background = lang.color;
        button.style.color = lang.text;
        button.innerText = `Chat: ${lang.label} ▾`;
        dropdown.value = currentLang;
    }

    function createUI() {
        const wrapper = document.createElement("div");
        wrapper.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            font-family: sans-serif;
        `;

        button = document.createElement("button");
        button.style.cssText = `
            padding: 8px 14px;
            border: 1px solid #555;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            font-size: 13px;
            transition: background 0.2s, color 0.2s;
            min-width: 150px;
            text-align: left;
        `;

        dropdown = document.createElement("select");
        dropdown.style.cssText = `
            display: none;
            background: #1a1a1a;
            color: white;
            border: 1px solid #555;
            border-radius: 6px;
            padding: 6px 10px;
            font-size: 13px;
            cursor: pointer;
            min-width: 150px;
            outline: none;
        `;

        Object.entries(LANGUAGES).forEach(([code, cfg]) => {
            const opt = document.createElement("option");
            opt.value = code;
            opt.innerText = `${code === "OFF" ? "⬜" : "🌐"} ${cfg.label}`;
            dropdown.appendChild(opt);
        });

        button.onclick = (e) => {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
        };

        dropdown.onclick = (e) => e.stopPropagation();

        dropdown.onchange = () => {
            setLang(dropdown.value);
            dropdown.style.display = "none";
        };

        document.addEventListener("click", () => {
            dropdown.style.display = "none";
        });

        wrapper.appendChild(button);
        wrapper.appendChild(dropdown);
        document.body.appendChild(wrapper);

        applyUIState();
    }

    // ─── Game Hook ─────────────────────────────────────────────────────────────

    function waitForGame() {
        const reactRoot = document.querySelector("#react");
        if (!reactRoot) return setTimeout(waitForGame, 1000);

        try {
            const internal = Object.values(reactRoot)[0];
            const game = internal?.updateQueue?.baseState?.element?.props?.game;

            if (!game || !game.chat) return setTimeout(waitForGame, 1000);

            const originalSubmit = game.chat.submit;
            const originalAddChat = game.chat.addChat;

            game.chat.submit = function (...args) {
                const message = this.inputValue || "";

                if (!game.chat.isInputCommandMode && containsBadWords(message)) {
                    originalAddChat.call(game.chat, {
                        text: "🚫 This message was blocked",
                        color: "red"
                    });
                    this.inputValue = "";
                    return;
                }

                if (!game.chat.isInputCommandMode) {
                    const translated = translate(message);
                    this.inputValue = translated;
                }

                return originalSubmit.apply(this, args);
            };

            game.chat.addChat = function (chatObj) {
                if (shouldBlockMessage(chatObj)) {
                    originalAddChat.call(this, {
                        text: "🚫 This message was blocked",
                        color: "red"
                    });
                    return;
                }
                originalAddChat.call(this, chatObj);
            };

            console.log("[CHAT] Translator + Filter ready");
        } catch {
            setTimeout(waitForGame, 1000);
        }
    }

    // ─── Init ──────────────────────────────────────────────────────────────────

    createUI();
    waitForGame();

})();
