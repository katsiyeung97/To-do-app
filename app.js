"use strict";
const { useState, useEffect, useRef } = React;
const { Plus, X, ChevronLeft, ChevronRight, Check, Cake, Droplet, Dumbbell, Pill, Trash2, Repeat, Flower2, Sun, CalendarDays, ListChecks, Sparkles, Moon, Leaf, Wallet, ShoppingCart, Receipt, Utensils, Car, ShoppingBag, Heart, Film, MoreHorizontal, TrendingUp, TrendingDown, Camera, Coffee, Wind, Feather, BookOpen, PiggyBank, Loader2, Landmark } = LucideReact;
/* ---------------------------------- THEME ---------------------------------- */
const COLORS = {
    bg: "#4F6E84",
    bgGradient: "linear-gradient(160deg, #52708C 0%, #4F6E84 50%, #4B6A80 100%)",
    bgSoft: "#5C7C90",
    bgDeep: "#3E5A6E",
    cream: "#F6F3E9",
    creamMuted: "rgba(246,243,233,0.62)",
    creamFaint: "rgba(246,243,233,0.4)",
    surface: "#FBF9F2",
    surfaceSolid: "#FBF9F2",
    surfaceSoft: "rgba(251,249,242,0.55)",
    surfaceSoft2: "rgba(251,249,242,0.78)",
    sage: "#5F7E68",
    sageLight: "#DDE6DA",
    sageDeep: "#3E5A46",
    teal: "#4C7583",
    tealLight: "#DCE7E9",
    taupe: "#9C8158",
    taupeLight: "#EDE3CE",
    text: "#2B3A42",
    textMuted: "#7C8A8C",
    textFaint: "#A9B3AF",
    border: "rgba(43,58,66,0.14)",
    borderLight: "rgba(246,243,233,0.18)",
    danger: "#A5654A",
};
const GLASS_BLUR = "blur(18px)";
const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'Jost', sans-serif";
const FONT_LOGO = "'Fraunces', serif";
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap');

* { box-sizing: border-box; }
.planner-root { font-family: ${FONT_BODY}; -webkit-tap-highlight-color: transparent; }
.planner-root ::-webkit-scrollbar { width: 0px; height: 0px; }
.planner-root button { font-family: inherit; cursor: pointer; }
.planner-root input, .planner-root select { font-family: inherit; }

@keyframes bloomIn {
  0% { transform: scale(0.6); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes modalIn {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes tabFade {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.35s ease both; }
.modal-in { animation: modalIn 0.25s cubic-bezier(0.16,1,0.3,1) both; }
.check-pop { animation: bloomIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both; }
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-52px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(52px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes introGlow {
  0% { opacity: 0; transform: scale(0.6); }
  100% { opacity: 0.35; transform: scale(1); }
}
.intro-to { display: inline-block; animation: slideInLeft 1.1s cubic-bezier(0.16,1,0.3,1) both; }
.intro-do { display: inline-block; animation: slideInRight 1.1s cubic-bezier(0.16,1,0.3,1) both; }
.intro-slash { display: inline-block; opacity: 1; }
.tab-panel { animation: tabFade 0.32s cubic-bezier(0.16,1,0.3,1) both; }

.clean-btn { transition: transform 0.15s ease, opacity 0.15s ease, background 0.15s ease; }
.clean-btn:active { transform: scale(0.94); opacity: 0.85; }

.grain-layer {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  opacity: 0.16; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@media (prefers-reduced-motion: reduce) {
  .fade-up, .modal-in, .check-pop, .tab-panel, .intro-to, .intro-do, .intro-glow { animation: none !important; }
  .planner-root * { transition: none !important; }
}
`;
/* -------------------------------- QUOTES -------------------------------- */
const QUOTES = [
    // motivation
    { text: "Do the work today that tomorrow's ease depends on.", author: "unknown" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Discipline is choosing what you want most over what you want now.", author: "unknown" },
    { text: "You are always one decision away from a different life.", author: "unknown" },
    { text: "Done is better than perfect.", author: "unknown" },
    { text: "Motivation gets you started. Habit keeps you going.", author: "unknown" },
    { text: "Work hard in silence, let results make the noise.", author: "unknown" },
    // finding peace
    { text: "Peace is not the absence of a storm, but calm within it.", author: "unknown" },
    { text: "Slow down — everything you are chasing is behind you.", author: "unknown" },
    { text: "Breathe in peace, breathe out tension.", author: "unknown" },
    { text: "A quiet mind is the best gift you can give yourself.", author: "unknown" },
    { text: "Trust the timing of your life.", author: "unknown" },
    { text: "Nothing blooms all year, and that's okay.", author: "unknown" },
    { text: "A calm morning is the foundation of a good day.", author: "unknown" },
    // staying consistent
    { text: "Small steps daily lead to big changes yearly.", author: "unknown" },
    { text: "Consistency is what transforms average into excellence.", author: "unknown" },
    { text: "Progress, not perfection.", author: "unknown" },
    { text: "Rest is part of the work, not a break from it.", author: "unknown" },
    { text: "Show up for yourself the way you show up for everyone else.", author: "unknown" },
    { text: "The days are long, but the years are short.", author: "unknown" },
    // goal driven
    { text: "You don't have to see the whole staircase, just take the first step.", author: "Martin Luther King Jr." },
    { text: "Focus on the step in front of you, not the whole staircase.", author: "unknown" },
    { text: "A goal without a plan is just a wish.", author: "unknown" },
    { text: "Energy flows where attention goes.", author: "unknown" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    // self
    { text: "Take care of your body — it's the only place you have to live.", author: "Jim Rohn" },
    { text: "Strong body, soft heart, clear mind.", author: "unknown" },
    { text: "Growth is uncomfortable because you're changing.", author: "unknown" },
    { text: "You can't pour from an empty cup — fill your own first.", author: "unknown" },
    { text: "Speak to yourself like someone you love.", author: "unknown" },
];
function getDayOfYear(d) {
    const start = new Date(d.getFullYear(), 0, 0);
    return Math.floor((d - start) / 86400000);
}
function dailyQuote() {
    return QUOTES[getDayOfYear(new Date()) % QUOTES.length];
}
/* ------------------------------ DATE HELPERS ------------------------------ */
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad = (n) => n.toString().padStart(2, "0");
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = (key) => {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d);
};
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const addMonths = (d, n) => { const r = new Date(d); r.setMonth(r.getMonth() + n); return r; };
const addYears = (d, n) => { const r = new Date(d); r.setFullYear(r.getFullYear() + n); return r; };
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
const startOfWeek = (d) => { const r = new Date(d); r.setDate(r.getDate() - r.getDay()); r.setHours(0, 0, 0, 0); return r; };
function formatTime(t) {
    if (!t)
        return null;
    const [h, m] = t.split(":").map(Number);
    const suffix = h >= 12 ? "pm" : "am";
    let h12 = h % 12;
    if (h12 === 0)
        h12 = 12;
    return `${h12}:${pad(m)}${suffix}`;
}
function formatDateHeader(key, todayKey, tomorrowKey) {
    if (key === todayKey)
        return "Today";
    if (key === tomorrowKey)
        return "Tomorrow";
    const d = fromKey(key);
    return `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}
function getOccurrences(task, rangeStartKey, rangeEndKey) {
    if (!task.date)
        return [];
    const rangeStart = fromKey(rangeStartKey);
    const rangeEnd = fromKey(rangeEndKey);
    const anchor = fromKey(task.date);
    const repeat = task.repeat || "none";
    if (repeat === "none") {
        return anchor >= rangeStart && anchor <= rangeEnd ? [task.date] : [];
    }
    const step = (d) => {
        if (repeat === "daily")
            return addDays(d, 1);
        if (repeat === "weekly")
            return addDays(d, 7);
        if (repeat === "monthly")
            return addMonths(d, 1);
        if (repeat === "yearly")
            return addYears(d, 1);
        return addDays(d, 1);
    };
    if (anchor > rangeEnd)
        return [];
    let cur = anchor;
    const result = [];
    let guard = 0;
    while (cur <= rangeEnd && guard < 3000) {
        if (cur >= rangeStart)
            result.push(toKey(cur));
        cur = step(cur);
        guard++;
    }
    return result;
}
/* -------------------------------- SEED DATA -------------------------------- */
const todayKeySeed = toKey(new Date());
const seedTasks = [
    { id: "seed-1", type: "task", title: "Morning pages / journal", date: todayKeySeed, time: "07:00", repeat: "daily", completed: false, completedAt: null, completions: [] },
    { id: "seed-2", type: "task", title: "Plan the week ahead", date: todayKeySeed, time: "20:00", repeat: "weekly", completed: false, completedAt: null, completions: [] },
    { id: "seed-3", type: "task", title: "Plan camping trip", date: null, time: null, repeat: "none", completed: false, completedAt: null, completions: [] },
    { id: "seed-4", type: "task", title: "Oil change", date: null, time: null, repeat: "none", completed: false, completedAt: null, completions: [] },
    { id: "seed-5", type: "birthday", title: "Ashley's birthday", date: toKey(addDays(new Date(), 5)), time: null, repeat: "yearly", completed: false, completedAt: null, completions: [] },
];
const seedHabits = [
    { id: "habit-1", name: "Drink water", icon: "droplet", completions: [] },
    { id: "habit-2", name: "Go to the gym", icon: "dumbbell", completions: [] },
    { id: "habit-3", name: "Take vitamins", icon: "pill", completions: [] },
];
const HABIT_ICONS = {
    droplet: Droplet, dumbbell: Dumbbell, pill: Pill, sparkles: Sparkles,
    flower: Flower2, sun: Sun, moon: Moon, leaf: Leaf,
};
const MOOD_ICON_MAP = {
    Sun, Droplet, Pill, BookOpen, Dumbbell, Coffee, Leaf, Heart, Moon, Wind, Feather, Sparkles, Flower2,
};
const uid = () => Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
function playDing() {
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx)
            return;
        const ctx = new Ctx();
        const now = ctx.currentTime;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.22, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
        gain.connect(ctx.destination);
        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(1318.5, now); // E6
        osc1.connect(gain);
        const gain2 = ctx.createGain();
        gain2.gain.setValueAtTime(0.08, now);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
        gain2.connect(ctx.destination);
        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(2637, now); // E7 — soft harmonic shimmer
        osc2.connect(gain2);
        osc1.start(now);
        osc1.stop(now + 0.9);
        osc2.start(now);
        osc2.stop(now + 0.6);
        osc1.onended = () => ctx.close();
    }
    catch (err) {
        // audio unavailable or blocked by the browser — fail silently
    }
}
/* -------------------------------- EXPENSES -------------------------------- */
const CATEGORIES = [
    { key: "Groceries", icon: ShoppingCart },
    { key: "Fitness", icon: Dumbbell },
    { key: "Bills", icon: Receipt },
    { key: "Dining", icon: Utensils },
    { key: "Transport", icon: Car },
    { key: "Shopping", icon: ShoppingBag },
    { key: "Health", icon: Heart },
    { key: "Entertainment", icon: Film },
    { key: "Other", icon: MoreHorizontal },
];
const categoryIcon = (key) => (CATEGORIES.find((c) => c.key === key) || CATEGORIES[CATEGORIES.length - 1]).icon;
const seedExpenses = [
    { id: "exp-1", type: "income", title: "Paycheck", amount: 2400, category: null, date: toKey(startOfMonth(new Date())), note: "" },
    { id: "exp-2", type: "expense", title: "Grocery run", amount: 86.4, category: "Groceries", date: toKey(new Date()), note: "" },
    { id: "exp-3", type: "expense", title: "Gym membership", amount: 45, category: "Fitness", date: toKey(new Date()), note: "" },
    { id: "exp-4", type: "expense", title: "Electric bill", amount: 112, category: "Bills", date: toKey(addDays(new Date(), -3)), note: "" },
];
const seedBudgets = { Groceries: 400, Fitness: 60, Bills: 250, Dining: 150, Transport: 100, Shopping: 150, Health: 80, Entertainment: 60, Other: 100 };
/* -------- Savings -------- */
const SAVINGS_ACCOUNTS = ["RRSP", "TFSA", "FHSA", "Savings", "Other"];
const seedSavings = [
    { id: "sav-1", account: "TFSA", amount: 50, date: toKey(startOfWeek(new Date())), repeat: "weekly" },
    { id: "sav-2", account: "RRSP", amount: 150, date: toKey(startOfMonth(new Date())), repeat: "monthly" },
];
function savingsOccurrenceTotal(entry, startKey, endKey) {
    return getOccurrences(entry, startKey, endKey).length * entry.amount;
}
/* -------- Spending pulse (week/month comparison) -------- */
function pctChange(current, previous) {
    if (previous === 0)
        return current === 0 ? 0 : null;
    return ((current - previous) / previous) * 100;
}
function sumExpensesBetween(expenses, startKey, endKey) {
    return expenses
        .filter((e) => e.type === "expense" && e.date >= startKey && e.date <= endKey)
        .reduce((a, e) => a + e.amount, 0);
}
function computeSpendingPulse(expenses) {
    const now = new Date();
    const thisWeekStart = startOfWeek(now);
    const thisWeekEnd = addDays(thisWeekStart, 6);
    const lastWeekStart = addDays(thisWeekStart, -7);
    const lastWeekEnd = addDays(thisWeekStart, -1);
    const thisMonthStart = startOfMonth(now);
    const thisMonthEnd = endOfMonth(now);
    const lastMonthRef = addMonths(now, -1);
    const lastMonthStart = startOfMonth(lastMonthRef);
    const lastMonthEnd = endOfMonth(lastMonthRef);
    return {
        weekCurrent: sumExpensesBetween(expenses, toKey(thisWeekStart), toKey(thisWeekEnd)),
        weekPrev: sumExpensesBetween(expenses, toKey(lastWeekStart), toKey(lastWeekEnd)),
        monthCurrent: sumExpensesBetween(expenses, toKey(thisMonthStart), toKey(thisMonthEnd)),
        monthPrev: sumExpensesBetween(expenses, toKey(lastMonthStart), toKey(lastMonthEnd)),
    };
}
/* -------- Grocery -------- */
const seedMeals = { breakfast: "Greek yogurt & berries", lunch: "Chicken & rice bowl", dinner: "Sheet-pan salmon & veg", snacks: "Apple slices & almond butter" };
const seedIngredients = [
    { id: "ing-1", name: "Greek yogurt" }, { id: "ing-2", name: "Blueberries" },
    { id: "ing-3", name: "Chicken breast" }, { id: "ing-4", name: "Rice" },
    { id: "ing-5", name: "Salmon" }, { id: "ing-6", name: "Broccoli" }, { id: "ing-7", name: "Olive oil" },
];
const seedPantry = [{ id: "pan-1", name: "Rice" }, { id: "pan-2", name: "Olive oil" }];
/* -------- Period tracking -------- */
const seedPeriodDays = (() => {
    const start = addDays(new Date(), -24);
    return [0, 1, 2, 3].map((i) => toKey(addDays(start, i)));
})();
const GLOSSARY = {
    "Menstrual phase": "The days of bleeding, when the uterine lining sheds because pregnancy hasn't occurred.",
    "Follicular phase": "The days after your period ends and before ovulation, when estrogen rises and the ovaries prepare an egg.",
    "Ovulation": "The release of a mature egg from the ovary, usually around the midpoint of the cycle.",
    "Luteal phase": "The days after ovulation and before your next period, when progesterone rises to support a possible pregnancy.",
    "Estrogen": "A hormone that rises through the first half of the cycle, supporting egg development and the uterine lining.",
    "Progesterone": "A hormone that rises after ovulation, helping prepare and maintain the uterine lining until it drops sharply if pregnancy doesn't occur.",
    "FSH": "Follicle-stimulating hormone — prompts the ovaries to begin developing an egg earlier in the cycle.",
    "LH surge": "A rapid rise in luteinizing hormone that triggers the release of the egg.",
};
const PHASE_ORDER = ["menstrual", "follicular", "ovulation", "luteal"];
/* Illustrative relative levels (0-100) across a typical 28-day cycle — for shape/education, not measured data */
const HORMONE_CURVES = {
    Estrogen: [15, 16, 18, 20, 22, 26, 32, 40, 50, 60, 72, 84, 95, 55, 50, 55, 60, 65, 68, 65, 60, 52, 42, 32, 24, 18, 15, 13],
    Progesterone: [5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 8, 10, 12, 15, 25, 40, 55, 68, 78, 85, 88, 85, 78, 65, 50, 35, 20, 10],
    "LH surge": [10, 10, 10, 10, 10, 10, 10, 10, 10, 12, 15, 20, 35, 90, 30, 15, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    FSH: [45, 50, 55, 50, 42, 35, 30, 28, 26, 25, 24, 26, 45, 55, 35, 25, 20, 18, 17, 16, 16, 17, 18, 20, 24, 30, 38, 45],
};
const HORMONE_COLORS = {
    Estrogen: COLORS.sage, Progesterone: COLORS.taupe, "LH surge": COLORS.danger, FSH: COLORS.teal,
};
const PHASES = {
    menstrual: {
        label: "Menstrual phase", range: "Bleeding days",
        hormones: ["Estrogen", "Progesterone"],
        hormoneNote: "Estrogen and Progesterone are both at their lowest point right now — that drop is what triggers the uterine lining to shed.",
        tips: {
            Diet: ["Iron-rich foods — leafy greens, beans, red meat — to help replace what's lost", "Warm, easy-to-digest meals", "Extra water"],
            Vitamins: ["Iron", "Magnesium for cramps", "Vitamin C to help iron absorption"],
            Sleep: ["Prioritize extra rest — energy is naturally lower right now"],
            Exercise: ["Gentle movement — walking, stretching, restorative yoga"],
        },
    },
    follicular: {
        label: "Follicular phase", range: "Roughly days 1–13",
        hormones: ["Estrogen", "FSH"],
        hormoneNote: "Estrogen and FSH are both rising, encouraging an egg to mature.",
        tips: {
            Diet: ["Lighter, fresh foods — salads, lean protein, fermented foods", "Build meals around vegetables as appetite often shifts"],
            Vitamins: ["B vitamins for energy", "Zinc"],
            Sleep: ["Sleep needs are usually lower — often the easiest stretch of the cycle"],
            Exercise: ["Good window for higher-intensity training as energy climbs"],
        },
    },
    ovulation: {
        label: "Ovulation phase", range: "Roughly days 13–15",
        hormones: ["Estrogen", "LH surge"],
        hormoneNote: "An Estrogen peak triggers an LH surge, which is what releases the egg.",
        tips: {
            Diet: ["Antioxidant-rich foods — berries, leafy greens", "Fiber to help clear the estrogen peak"],
            Vitamins: ["Vitamin E", "Omega-3s"],
            Sleep: ["Keep a consistent schedule — resting body temperature rises slightly now"],
            Exercise: ["Energy and strength often peak — good for your hardest workouts"],
        },
    },
    luteal: {
        label: "Luteal phase", range: "Roughly days 15–28",
        hormones: ["Progesterone", "Estrogen"],
        hormoneNote: "Progesterone rises to prepare the uterine lining, then both hormones drop sharply if pregnancy doesn't occur — often behind PMS symptoms.",
        tips: {
            Diet: ["Complex carbs to help steady blood sugar and mood", "Calcium and magnesium-rich foods for cramps and mood"],
            Vitamins: ["Magnesium", "Vitamin B6", "Calcium"],
            Sleep: ["Progesterone can be sedating but also disrupt sleep quality — keep a wind-down routine"],
            Exercise: ["Lower-intensity movement — yoga, pilates, walking — as high-intensity tolerance often dips"],
        },
    },
};
function groupPeriodEpisodes(periodDays) {
    const sorted = [...periodDays].sort();
    const episodes = [];
    let current = null;
    sorted.forEach((key) => {
        if (!current) {
            current = [key];
            return;
        }
        const prevDate = fromKey(current[current.length - 1]);
        const curDate = fromKey(key);
        const diffDays = Math.round((curDate - prevDate) / 86400000);
        if (diffDays <= 1)
            current.push(key);
        else {
            episodes.push(current);
            current = [key];
        }
    });
    if (current)
        episodes.push(current);
    return episodes;
}
function computeCyclePhase(periodDays) {
    const todayKey = toKey(new Date());
    const episodes = groupPeriodEpisodes(periodDays).filter((ep) => ep[0] <= todayKey);
    if (episodes.length === 0)
        return null;
    const last = episodes[episodes.length - 1];
    const cycleStart = fromKey(last[0]);
    const today = new Date();
    const cycleDay = Math.round((today - cycleStart) / 86400000) + 1;
    const isBleedingToday = periodDays.includes(todayKey);
    let phaseKey;
    if (isBleedingToday)
        phaseKey = "menstrual";
    else if (cycleDay <= 13)
        phaseKey = "follicular";
    else if (cycleDay <= 15)
        phaseKey = "ovulation";
    else
        phaseKey = "luteal";
    return { phaseKey, cycleDay, longCycle: cycleDay > 35 };
}
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1]);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}
async function scanReceipt(file) {
    const base64 = await fileToBase64(file);
    const prompt = `Look at this receipt image and extract the purchase details. Respond with ONLY strict JSON (no markdown fences, no preamble, no explanation) in exactly this shape:
{"merchant": string, "amount": number, "date": "YYYY-MM-DD" or null, "category": one of ["Groceries","Fitness","Bills","Dining","Transport","Shopping","Health","Entertainment","Other"]}
If a field is unclear, make your best reasonable guess rather than leaving it blank.`;
    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 500,
            messages: [{
                    role: "user",
                    content: [
                        { type: "image", source: { type: "base64", media_type: file.type || "image/jpeg", data: base64 } },
                        { type: "text", text: prompt },
                    ],
                }],
        }),
    });
    const data = await response.json();
    const text = (data.content || []).map((b) => b.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
}
/* -------------------------------- MOOD BOARD -------------------------------- */
const TILE_PALETTES = [
    [COLORS.bgSoft, COLORS.bgDeep],
    [COLORS.sageLight, COLORS.sage],
    [COLORS.tealLight, COLORS.teal],
    [COLORS.taupeLight, COLORS.taupe],
    [COLORS.cream, COLORS.sageLight],
    [COLORS.cream, COLORS.tealLight],
];
const MOOD_TILES = [
    { icon: "Sun", caption: "wake up" },
    { icon: "Droplet", caption: "hydrate" },
    { icon: "Pill", caption: "vitamins" },
    { icon: "BookOpen", caption: "morning pages" },
    { icon: "Dumbbell", caption: "move your body" },
    { icon: "Coffee", caption: "tea break" },
    { icon: "Leaf", caption: "slow living" },
    { icon: "Heart", caption: "self care" },
    { icon: "Moon", caption: "wind down" },
    { icon: "Wind", caption: "fresh air" },
    { icon: "Feather", caption: "soft mornings" },
    { icon: "Sparkles", caption: "glow up" },
    { icon: "Flower2", caption: "fresh blooms" },
    { icon: "Sun", caption: "golden hour" },
    { icon: "BookOpen", caption: "read a little" },
    { icon: "Droplet", caption: "skincare" },
    { icon: "Coffee", caption: "matcha moment" },
    { icon: "Leaf", caption: "plan the day" },
    { icon: "Heart", caption: "gratitude" },
    { icon: "Wind", caption: "evening walk" },
    { icon: "Moon", caption: "quiet moment" },
    { icon: "Feather", caption: "gentle pace" },
    { icon: "Flower2", caption: "garden hour" },
    { icon: "Sparkles", caption: "deep breath" },
];
function seededShuffle(arr, seed) {
    const out = [...arr];
    let s = seed % 2147483647;
    if (s <= 0)
        s += 2147483646;
    const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}
function dailyMoodTiles() {
    const seed = getDayOfYear(new Date()) * 7 + 13;
    const order = seededShuffle(MOOD_TILES.map((_, i) => i), seed);
    return order.slice(0, 6).map((i, pos) => ({ ...MOOD_TILES[i], palette: TILE_PALETTES[pos % TILE_PALETTES.length] }));
}
/* ------------------------------ SMALL UI PIECES ------------------------------ */
function Bloom({ checked, onClick, size = 22 }) {
    return (React.createElement("button", { onClick: onClick, "aria-label": checked ? "Mark as not done" : "Mark as done", style: {
            width: size, height: size, borderRadius: "50%", flexShrink: 0,
            border: `1.6px solid ${checked ? COLORS.sage : COLORS.creamMuted}`,
            background: checked ? `linear-gradient(135deg, ${COLORS.sage}, ${COLORS.teal})` : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease", padding: 0,
        } }, checked && React.createElement(Check, { className: "check-pop", size: size * 0.62, color: "#fff", strokeWidth: 3 })));
}
function Segmented({ options, value, onChange }) {
    return (React.createElement("div", { style: {
            display: "flex", background: COLORS.surfaceSoft, backdropFilter: GLASS_BLUR, WebkitBackdropFilter: GLASS_BLUR,
            borderRadius: 12, padding: 3, gap: 2, border: `1px solid ${COLORS.border}`,
        } }, options.map((opt) => (React.createElement("button", { key: opt.value, className: "clean-btn", onClick: () => onChange(opt.value), style: {
            flex: 1, border: "none", borderRadius: 9, padding: "7px 8px",
            fontSize: 12.5, fontWeight: 600, fontFamily: FONT_BODY,
            background: value === opt.value ? COLORS.surfaceSolid : "transparent",
            color: value === opt.value ? COLORS.sageDeep : COLORS.textMuted,
            transition: "all 0.18s ease", whiteSpace: "nowrap",
        } }, opt.label)))));
}
function SectionLabel({ children }) {
    return (React.createElement("div", { style: {
            fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
            color: COLORS.creamMuted, marginBottom: 10, marginTop: 4,
        } }, children));
}
function EmptyState({ text }) {
    return (React.createElement("div", { style: {
            padding: "36px 20px", textAlign: "center", color: COLORS.creamFaint,
            fontSize: 13.5, fontStyle: "italic", fontFamily: FONT_DISPLAY,
        } }, text));
}
/* -------------------------------- DRAG-TO-REORDER LIST -------------------------------- */
function DragList({ items, getKey, onCommit, renderItem }) {
    const [order, setOrder] = useState(() => items.map(getKey));
    const [dragId, setDragId] = useState(null);
    const drag = useRef({ active: false });
    const idsKey = items.map(getKey).join("|");
    useEffect(() => {
        setOrder((prev) => {
            const ids = items.map(getKey);
            const stillHere = prev.filter((id) => ids.includes(id));
            const added = ids.filter((id) => !prev.includes(id));
            return [...stillHere, ...added];
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idsKey]);
    const byId = {};
    items.forEach((it) => { byId[getKey(it)] = it; });
    const visual = order.map((id) => byId[id]).filter(Boolean);
    const startDrag = (e, id) => {
        if (e.pointerType === "mouse" && e.button !== 0)
            return;
        const el = e.currentTarget;
        try {
            el.setPointerCapture(e.pointerId);
        }
        catch (err) { /* ignore */ }
        drag.current.active = true;
        setDragId(id);
    };
    const moveDrag = (e, id) => {
        if (!drag.current.active || dragId !== id)
            return;
        e.preventDefault();
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const row = el && el.closest("[data-drag-id]");
        if (!row)
            return;
        const overId = row.getAttribute("data-drag-id");
        if (!overId || overId === id)
            return;
        setOrder((prev) => {
            const from = prev.indexOf(id);
            const to = prev.indexOf(overId);
            if (from === -1 || to === -1)
                return prev;
            const next = [...prev];
            next.splice(from, 1);
            next.splice(to, 0, id);
            return next;
        });
    };
    const endDrag = (id) => {
        if (drag.current.active)
            onCommit(order, id);
        drag.current.active = false;
        setDragId(null);
    };
    return (React.createElement("div", null, visual.map((item) => {
        const id = getKey(item);
        const dragging = dragId === id;
        const handleProps = {
            onPointerDown: (e) => startDrag(e, id),
            onPointerMove: (e) => moveDrag(e, id),
            onPointerUp: () => endDrag(id),
            onPointerCancel: () => endDrag(id),
            style: { touchAction: "none", cursor: "grab" },
        };
        return (React.createElement("div", { key: id, "data-drag-id": id, style: {
                opacity: dragging ? 0.85 : 1,
                position: "relative", zIndex: dragging ? 5 : "auto",
                userSelect: "none", WebkitUserSelect: "none", WebkitTouchCallout: "none",
                transition: dragging ? "none" : "opacity 0.15s ease",
            } }, renderItem(item, handleProps)));
    })));
}
function DragHandleIcon() {
    return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 3, padding: "10px 8px", flexShrink: 0 } },
        React.createElement("div", { style: { width: 16, height: 2, borderRadius: 1, background: COLORS.creamFaint } }),
        React.createElement("div", { style: { width: 16, height: 2, borderRadius: 1, background: COLORS.creamFaint } })));
}
/* -------------------------------- SWIPE TO DELETE -------------------------------- */
function ConfirmDeleteModal({ onCancel, onConfirm }) {
    return (React.createElement("div", { onClick: onCancel, style: {
            position: "fixed", inset: 0, zIndex: 70, background: "rgba(20,28,32,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        } },
        React.createElement("div", { onClick: (e) => e.stopPropagation(), className: "modal-in", style: {
                background: COLORS.surfaceSolid, borderRadius: 18, padding: "20px 18px",
                width: "100%", maxWidth: 280, textAlign: "center",
            } },
            React.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 600, color: COLORS.text, marginBottom: 4 } }, "Delete this task?"),
            React.createElement("div", { style: { fontSize: 12.5, color: COLORS.textMuted, marginBottom: 18 } }, "This can't be undone."),
            React.createElement("div", { style: { display: "flex", gap: 8 } },
                React.createElement("button", { className: "clean-btn", onClick: onCancel, style: {
                        flex: 1, padding: "10px", borderRadius: 12, border: `1px solid ${COLORS.border}`,
                        background: "none", color: COLORS.text, fontSize: 13.5, fontWeight: 600,
                    } }, "Cancel"),
                React.createElement("button", { className: "clean-btn", onClick: onConfirm, style: {
                        flex: 1, padding: "10px", borderRadius: 12, border: "none",
                        background: COLORS.danger, color: "#fff", fontSize: 13.5, fontWeight: 700,
                    } }, "Delete")))));
}
function SwipeRow({ onDelete, children }) {
    const REVEAL = 84;
    const [dx, setDx] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const drag = useRef({ startX: 0, startY: 0, active: false, decided: false });
    const onPointerDown = (e) => {
        drag.current.startX = e.clientX;
        drag.current.startY = e.clientY;
        drag.current.active = false;
        drag.current.decided = false;
    };
    const onPointerMove = (e) => {
        const dxRaw = e.clientX - drag.current.startX;
        const dyRaw = e.clientY - drag.current.startY;
        if (!drag.current.decided) {
            if (Math.abs(dxRaw) > 10 && Math.abs(dxRaw) > Math.abs(dyRaw) * 1.3) {
                drag.current.decided = true;
                drag.current.active = true;
                try {
                    e.currentTarget.setPointerCapture(e.pointerId);
                }
                catch (err) { /* ignore */ }
            }
            else if (Math.abs(dyRaw) > 10) {
                drag.current.decided = true;
                drag.current.active = false;
            }
            else {
                return;
            }
        }
        if (!drag.current.active)
            return;
        e.preventDefault();
        let next = (revealed ? -REVEAL : 0) + dxRaw;
        next = Math.min(0, Math.max(-REVEAL - 16, next));
        setDx(next);
    };
    const onPointerUp = () => {
        if (drag.current.active) {
            if (dx < -REVEAL / 2) {
                setDx(-REVEAL);
                setRevealed(true);
            }
            else {
                setDx(0);
                setRevealed(false);
            }
        }
        drag.current.active = false;
    };
    return (React.createElement("div", { style: { position: "relative", overflow: "hidden" } },
        React.createElement("div", { style: {
                position: "absolute", top: 0, right: 0, bottom: 0, width: REVEAL,
                display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.danger,
                opacity: Math.min(1, -dx / REVEAL),
            } },
            React.createElement("button", { onClick: () => setConfirming(true), style: { border: "none", background: "none", color: "#fff", fontSize: 12.5, fontWeight: 700, width: "100%", height: "100%" } }, "Delete")),
        React.createElement("div", { onPointerDown: onPointerDown, onPointerMove: onPointerMove, onPointerUp: onPointerUp, onPointerCancel: onPointerUp, style: {
                transform: `translateX(${dx}px)`,
                transition: drag.current.active ? "none" : "transform 0.2s ease",
                touchAction: "pan-y",
            } }, children),
        confirming && (React.createElement(ConfirmDeleteModal, { onCancel: () => { setConfirming(false); setDx(0); setRevealed(false); }, onConfirm: () => { setConfirming(false); setDx(0); setRevealed(false); onDelete(); } }))));
}
/* -------------------------------- TASK ROW -------------------------------- */
function TaskRow({ task, dateKey, onToggle, onDelete, showDate, dragHandleProps }) {
    const isRepeating = task.repeat && task.repeat !== "none";
    const done = isRepeating ? (task.completions || []).includes(dateKey) : !!task.completed;
    const time = formatTime(task.time);
    return (React.createElement("div", { className: "fade-up", style: { display: "flex", alignItems: "stretch" } },
        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
            React.createElement(SwipeRow, { onDelete: () => onDelete(task.id) },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 4px" } },
                    task.type === "birthday" ? (React.createElement("div", { style: {
                            width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                            background: COLORS.taupeLight, display: "flex", alignItems: "center", justifyContent: "center",
                        } },
                        React.createElement(Cake, { size: 13, color: COLORS.taupe }))) : (React.createElement(Bloom, { checked: done, onClick: () => onToggle(task.id, dateKey) })),
                    React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                        React.createElement("div", { style: {
                                fontSize: 14.5, color: done ? COLORS.creamFaint : COLORS.cream,
                                textDecoration: done ? "line-through" : "none",
                                fontWeight: 500, lineHeight: 1.35, wordBreak: "break-word",
                            } }, task.title),
                        (time || (showDate && task.date) || isRepeating) && (React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 2, alignItems: "center" } },
                            time && (React.createElement("span", { style: { fontSize: 11.5, color: COLORS.cream, fontWeight: 700, textDecoration: "underline" } }, time)),
                            showDate && task.date && (React.createElement("span", { style: { fontSize: 11.5, color: COLORS.creamFaint } },
                                MONTHS[fromKey(dateKey).getMonth()],
                                " ",
                                fromKey(dateKey).getDate())),
                            isRepeating && React.createElement(Repeat, { size: 11, color: COLORS.creamFaint }))))))),
        React.createElement("div", { ...dragHandleProps },
            React.createElement(DragHandleIcon, null))));
}
/* -------------------------------- QUOTE CARD -------------------------------- */
function MoodTile({ tile }) {
    const Icon = MOOD_ICON_MAP[tile.icon] || Sparkles;
    const [a, b] = tile.palette;
    return (React.createElement("div", { className: "fade-up", style: {
            position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "1 / 1",
            background: `linear-gradient(150deg, ${a} 0%, ${b} 100%)`,
        } },
        React.createElement("div", { style: {
                position: "absolute", inset: 0, opacity: 0.1, mixBlendMode: "overlay",
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            } }),
        React.createElement(Icon, { size: 26, color: "rgba(255,255,255,0.85)", strokeWidth: 1.5, style: { position: "absolute", top: 14, left: 14 } }),
        React.createElement("div", { style: {
                position: "absolute", left: 0, right: 0, bottom: 0, padding: "22px 12px 10px",
                background: "linear-gradient(to top, rgba(20,26,28,0.55), transparent)",
            } },
            React.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 14.5, color: "#fff", fontWeight: 500 } }, tile.caption))));
}
function InspireView() {
    const q = dailyQuote();
    return (React.createElement("div", { className: "fade-up", style: {
            background: COLORS.surface, borderRadius: 22, padding: "40px 26px", position: "relative",
            overflow: "hidden", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center",
        } },
        React.createElement(Leaf, { size: 90, color: COLORS.sage, style: { position: "absolute", right: -20, top: -20, opacity: 0.12, transform: "rotate(20deg)" } }),
        React.createElement("div", { style: { fontSize: 11, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", color: COLORS.sageDeep, marginBottom: 18, textAlign: "center" } }, "Today's thought"),
        React.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 26, lineHeight: 1.5, color: COLORS.text, fontWeight: 500, textAlign: "center" } },
            "\"",
            q.text,
            "\""),
        q.author !== "unknown" && (React.createElement("div", { style: { fontSize: 13, color: COLORS.textMuted, marginTop: 16, textAlign: "center" } },
            "\u2014 ",
            q.author))));
}
/* -------------------------------- TODAY VIEW -------------------------------- */
function sortTasks(list) {
    return [...list].sort((a, b) => {
        const ao = a.order || 0, bo = b.order || 0;
        if (ao !== bo)
            return ao - bo;
        if (!a.time && !b.time)
            return 0;
        if (!a.time)
            return 1;
        if (!b.time)
            return -1;
        return a.time.localeCompare(b.time);
    });
}
function TodayView({ tasks, onToggle, onDelete, onReorder }) {
    const [which, setWhich] = useState("today");
    const todayKey = toKey(new Date());
    const tomorrowKey = toKey(addDays(new Date(), 1));
    const activeKey = which === "today" ? todayKey : tomorrowKey;
    const items = [];
    tasks.forEach((t) => {
        const occ = getOccurrences(t, activeKey, activeKey);
        if (occ.length)
            items.push(t);
    });
    const sorted = sortTasks(items);
    return (React.createElement("div", { className: "fade-up" },
        React.createElement(Segmented, { value: which, onChange: setWhich, options: [{ label: "Today", value: "today" }, { label: "Tomorrow", value: "tomorrow" }] }),
        React.createElement("div", { style: { marginTop: 18 } },
            React.createElement(SectionLabel, null, which === "today" ? "Today's schedule" : "Tomorrow's schedule"),
            sorted.length === 0 ? (React.createElement(EmptyState, { text: "Nothing scheduled \u2014 enjoy the open space." })) : (React.createElement(DragList, { items: sorted, getKey: (t) => t.id, onCommit: onReorder, renderItem: (t, h) => React.createElement(TaskRow, { task: t, dateKey: activeKey, onToggle: onToggle, onDelete: onDelete, dragHandleProps: h }) })))));
}
/* -------------------------------- TASKS VIEW -------------------------------- */
function TasksView({ tasks, onToggle, onDelete, onReorder }) {
    const [historyOpen, setHistoryOpen] = useState(false);
    const general = tasks.filter((t) => t.type === "task" && !t.date);
    const activeGeneral = sortTasks(general.filter((t) => !t.completed));
    const history = [];
    tasks.forEach((t) => {
        const isRepeating = t.repeat && t.repeat !== "none";
        if (isRepeating) {
            (t.completions || []).forEach((d) => history.push({ id: t.id + "-" + d, title: t.title, date: d, type: t.type }));
        }
        else if (t.completed) {
            history.push({ id: t.id, title: t.title, date: t.completedAt || t.date, type: t.type });
        }
    });
    history.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return (React.createElement("div", { className: "fade-up" },
        React.createElement(SectionLabel, null, "General tasks"),
        activeGeneral.length === 0 ? (React.createElement(EmptyState, { text: "No general tasks \u2014 add something to remember." })) : (React.createElement(DragList, { items: activeGeneral, getKey: (t) => t.id, onCommit: onReorder, renderItem: (t, h) => React.createElement(TaskRow, { task: t, dateKey: t.date, onToggle: onToggle, onDelete: onDelete, dragHandleProps: h }) })),
        React.createElement("div", { style: { marginTop: 26 } },
            React.createElement("button", { onClick: () => setHistoryOpen((v) => !v), style: {
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "none", border: "none", padding: "8px 4px", marginBottom: 4,
                } },
                React.createElement("span", { style: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.creamMuted } },
                    "History (",
                    history.length,
                    ")"),
                React.createElement(ChevronRight, { size: 16, color: COLORS.creamMuted, style: {
                        transform: historyOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s ease",
                    } })),
            historyOpen && (history.length === 0 ? (React.createElement(EmptyState, { text: "Completed tasks will show up here." })) : (history.map((h) => (React.createElement("div", { key: h.id, className: "fade-up", style: {
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 4px",
                } },
                React.createElement("div", { style: {
                        width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                        background: `linear-gradient(135deg, ${COLORS.sage}, ${COLORS.teal})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                    } },
                    React.createElement(Check, { size: 12, color: "#fff", strokeWidth: 3 })),
                React.createElement("div", { style: { flex: 1, fontSize: 13.5, color: COLORS.creamMuted, textDecoration: "line-through" } }, h.title),
                h.date && (React.createElement("div", { style: { fontSize: 11, color: COLORS.creamFaint } },
                    MONTHS[fromKey(h.date).getMonth()],
                    " ",
                    fromKey(h.date).getDate()))))))))));
}
/* -------------------------------- CALENDAR VIEW -------------------------------- */
function monthDayCells(monthDate) {
    const daysInMonth = endOfMonth(monthDate).getDate();
    const firstWeekday = startOfMonth(monthDate).getDay();
    const cells = [];
    for (let i = 0; i < firstWeekday; i++)
        cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push({ day: d, key: toKey(new Date(monthDate.getFullYear(), monthDate.getMonth(), d)) });
    }
    return cells;
}
function MonthStructureModal({ initialDate, onClose }) {
    const months = [];
    for (let i = -12; i <= 12; i++)
        months.push(addMonths(initialDate, i));
    const todayKey = toKey(new Date());
    useEffect(() => {
        const el = document.getElementById("month-struct-current");
        if (el)
            el.scrollIntoView({ block: "start" });
    }, []);
    return (React.createElement("div", { onClick: onClose, style: {
            position: "fixed", inset: 0, zIndex: 60, background: "rgba(20,28,32,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        } },
        React.createElement("div", { onClick: (e) => e.stopPropagation(), style: {
                width: "100%", maxWidth: 360, height: "62vh", maxHeight: 460,
                background: COLORS.surfaceSolid, borderRadius: 24, overflow: "hidden",
                display: "flex", flexDirection: "column", boxShadow: "0 20px 50px rgba(20,28,32,0.35)",
            } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 16px 8px" } },
                React.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 600, color: COLORS.bgDeep } }, "Calendar"),
                React.createElement("button", { className: "clean-btn", onClick: onClose, style: { border: "none", background: COLORS.sageLight, borderRadius: "50%", padding: 6 } },
                    React.createElement(X, { size: 14, color: COLORS.bgDeep }))),
            React.createElement("div", { style: { flex: 1, overflowY: "auto", scrollSnapType: "y mandatory" } }, months.map((m, i) => (React.createElement("div", { key: i, id: i === 12 ? "month-struct-current" : undefined, style: {
                    scrollSnapAlign: "start", minHeight: "100%", padding: "8px 18px",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                } },
                React.createElement("div", { style: { textAlign: "center", fontFamily: FONT_DISPLAY, fontSize: 17, fontWeight: 600, color: COLORS.bgDeep, marginBottom: 14 } }, monthLabel(m)),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5, marginBottom: 6 } }, WEEKDAYS.map((w) => (React.createElement("div", { key: w, style: { textAlign: "center", fontSize: 9.5, fontWeight: 700, color: COLORS.bgSoft } }, w[0])))),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 } }, monthDayCells(m).map((c, idx) => (React.createElement("div", { key: idx, style: { aspectRatio: "1 / 1", display: "flex", alignItems: "center", justifyContent: "center" } }, c && (React.createElement("div", { style: {
                        width: "78%", height: "78%", borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: c.key === todayKey ? `1.5px solid ${COLORS.bgDeep}` : "none",
                    } },
                    React.createElement("span", { style: { fontSize: 11, color: COLORS.bgDeep, fontWeight: c.key === todayKey ? 700 : 400 } }, c.day))))))))))))));
}
function CalendarView({ tasks, onToggle, onDelete, onReorder, refDate, setRefDate, zoom, setZoom }) {
    const todayKey = toKey(new Date());
    const tomorrowKey = toKey(addDays(new Date(), 1));
    let rangeStart, rangeEnd;
    if (zoom === "day") {
        rangeStart = refDate;
        rangeEnd = refDate;
    }
    else if (zoom === "week") {
        rangeStart = refDate;
        rangeEnd = addDays(refDate, 6);
    }
    else if (zoom === "month") {
        rangeStart = startOfMonth(refDate);
        rangeEnd = endOfMonth(refDate);
    }
    else {
        rangeStart = startOfMonth(refDate);
        rangeEnd = endOfMonth(addMonths(refDate, 3));
    }
    const rsKey = toKey(rangeStart), reKey = toKey(rangeEnd);
    const byDate = {};
    tasks.forEach((t) => {
        getOccurrences(t, rsKey, reKey).forEach((k) => {
            if (!byDate[k])
                byDate[k] = [];
            byDate[k].push(t);
        });
    });
    const dateKeys = Object.keys(byDate).sort();
    dateKeys.forEach((k) => { byDate[k] = sortTasks(byDate[k]); });
    const step = (dir) => {
        if (zoom === "day")
            setRefDate(addDays(refDate, dir));
        else if (zoom === "week")
            setRefDate(addDays(refDate, dir * 7));
        else if (zoom === "month")
            setRefDate(addMonths(refDate, dir));
        else
            setRefDate(addMonths(refDate, dir * 4));
    };
    let rangeLabel;
    if (zoom === "day")
        rangeLabel = `${WEEKDAYS[refDate.getDay()]}, ${MONTHS[refDate.getMonth()]} ${refDate.getDate()}`;
    else if (zoom === "week")
        rangeLabel = `${MONTHS[rangeStart.getMonth()]} ${rangeStart.getDate()} – ${MONTHS[rangeEnd.getMonth()]} ${rangeEnd.getDate()}`;
    else if (zoom === "month")
        rangeLabel = `${MONTHS[refDate.getMonth()]} ${refDate.getFullYear()}`;
    else
        rangeLabel = `${MONTHS[rangeStart.getMonth()]} – ${MONTHS[rangeEnd.getMonth()]} ${rangeEnd.getFullYear()}`;
    let lastMonth = null;
    const [structureOpen, setStructureOpen] = useState(false);
    return (React.createElement("div", { className: "fade-up" },
        React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 10 } },
            React.createElement("button", { className: "clean-btn", onClick: () => setStructureOpen(true), style: {
                    border: "none", background: COLORS.surfaceSoft2, borderRadius: 10, padding: "6px 10px",
                    display: "flex", alignItems: "center", gap: 6,
                } },
                React.createElement(CalendarDays, { size: 13, color: COLORS.bgDeep }),
                React.createElement("span", { style: { fontSize: 11, fontWeight: 600, color: COLORS.bgDeep } }, "Month view"))),
        React.createElement(Segmented, { value: zoom, onChange: setZoom, options: [
                { label: "Day", value: "day" }, { label: "Week", value: "week" },
                { label: "Month", value: "month" }, { label: "4 Mo", value: "4months" },
            ] }),
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0 10px" } },
            React.createElement("button", { className: "clean-btn", onClick: () => step(-1), style: { border: "none", background: COLORS.surfaceSoft2, borderRadius: 10, padding: 7 } },
                React.createElement(ChevronLeft, { size: 16, color: COLORS.sageDeep })),
            React.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontSize: 15.5, fontWeight: 600, color: COLORS.cream } }, rangeLabel),
            React.createElement("button", { className: "clean-btn", onClick: () => step(1), style: { border: "none", background: COLORS.surfaceSoft2, borderRadius: 10, padding: 7 } },
                React.createElement(ChevronRight, { size: 16, color: COLORS.sageDeep }))),
        dateKeys.length === 0 ? (React.createElement(EmptyState, { text: "Nothing on the calendar for this stretch." })) : (dateKeys.map((k) => {
            const d = fromKey(k);
            const monthChanged = zoom === "4months" && d.getMonth() !== lastMonth;
            lastMonth = d.getMonth();
            return (React.createElement("div", { key: k },
                monthChanged && (React.createElement("div", { style: {
                        fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 600, color: COLORS.cream,
                        marginTop: 18, marginBottom: 6, paddingBottom: 4, borderBottom: `1px solid ${COLORS.borderLight}`,
                    } },
                    MONTHS[d.getMonth()],
                    " ",
                    d.getFullYear())),
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: COLORS.creamMuted, marginTop: 14, marginBottom: 2 } }, formatDateHeader(k, todayKey, tomorrowKey)),
                React.createElement(DragList, { items: byDate[k], getKey: (t) => t.id, onCommit: onReorder, renderItem: (t, h) => React.createElement(TaskRow, { task: t, dateKey: k, onToggle: onToggle, onDelete: onDelete, dragHandleProps: h }) })));
        })),
        structureOpen && (React.createElement(MonthStructureModal, { initialDate: refDate, onClose: () => setStructureOpen(false) }))));
}
/* -------------------------------- HABITS VIEW -------------------------------- */
function HabitCard({ habit, onToggle, onDelete }) {
    const Icon = HABIT_ICONS[habit.icon] || Sparkles;
    const week = [];
    const start = startOfWeek(new Date());
    for (let i = 0; i < 7; i++)
        week.push(addDays(start, i));
    const todayKey = toKey(new Date());
    let streak = 0;
    let cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    if (!(habit.completions || []).includes(toKey(cursor)))
        cursor = addDays(cursor, -1);
    while ((habit.completions || []).includes(toKey(cursor))) {
        streak++;
        cursor = addDays(cursor, -1);
    }
    return (React.createElement("div", { className: "fade-up", style: {
            background: COLORS.surface, backdropFilter: GLASS_BLUR, WebkitBackdropFilter: GLASS_BLUR,
            borderRadius: 18, padding: "16px 16px 14px", marginBottom: 12,
            border: `1px solid ${COLORS.border}`,
        } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } },
            React.createElement("div", { style: {
                    width: 34, height: 34, borderRadius: 10, background: COLORS.sageLight,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                } },
                React.createElement(Icon, { size: 17, color: COLORS.sageDeep })),
            React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontSize: 14.5, fontWeight: 600, color: COLORS.text } }, habit.name),
                streak > 0 && (React.createElement("div", { style: { fontSize: 11, color: COLORS.teal, fontWeight: 600 } },
                    streak,
                    " day streak"))),
            React.createElement("button", { onClick: () => onDelete(habit.id), style: { border: "none", background: "none", padding: 6, color: COLORS.textFaint } },
                React.createElement(Trash2, { size: 13 }))),
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } }, week.map((d) => {
            const k = toKey(d);
            const done = (habit.completions || []).includes(k);
            const isFuture = k > todayKey;
            return (React.createElement("div", { key: k, style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 5 } },
                React.createElement("span", { style: { fontSize: 10, color: k === todayKey ? COLORS.sageDeep : COLORS.textFaint, fontWeight: k === todayKey ? 700 : 500 } }, WEEKDAYS[d.getDay()][0]),
                React.createElement("button", { disabled: isFuture, onClick: () => onToggle(habit.id, k), style: {
                        width: 28, height: 28, borderRadius: "50%",
                        border: `1.5px solid ${done ? COLORS.sage : COLORS.border}`,
                        background: done ? `linear-gradient(135deg, ${COLORS.sage}, ${COLORS.teal})` : "transparent",
                        opacity: isFuture ? 0.35 : 1,
                        display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
                    } }, done && React.createElement(Check, { className: "check-pop", size: 14, color: "#fff", strokeWidth: 3 }))));
        }))));
}
function ConsistencyCalendar({ habits }) {
    const [monthRef, setMonthRef] = useState(new Date());
    const todayKey = toKey(new Date());
    const totalHabits = habits.length;
    const daysInMonth = endOfMonth(monthRef).getDate();
    const firstWeekday = startOfMonth(monthRef).getDay();
    const cells = [];
    for (let i = 0; i < firstWeekday; i++)
        cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
        const key = toKey(new Date(monthRef.getFullYear(), monthRef.getMonth(), d));
        const done = totalHabits === 0 ? 0 : habits.filter((h) => (h.completions || []).includes(key)).length;
        cells.push({ day: d, key, ratio: totalHabits === 0 ? 0 : done / totalHabits, isFuture: key > todayKey });
    }
    const pastCells = cells.filter((c) => c && !c.isFuture);
    const fullDays = pastCells.filter((c) => c.ratio === 1 && totalHabits > 0).length;
    const consistencyPct = pastCells.length > 0 ? Math.round((fullDays / pastCells.length) * 100) : 0;
    return (React.createElement("div", { style: { background: COLORS.surface, borderRadius: 20, padding: "18px 16px", marginTop: 16 } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 } },
            React.createElement("button", { className: "clean-btn", onClick: () => setMonthRef(addMonths(monthRef, -1)), style: { border: "none", background: COLORS.surfaceSoft2, borderRadius: 10, padding: 6 } },
                React.createElement(ChevronLeft, { size: 14, color: COLORS.sageDeep })),
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.textMuted } },
                "Consistency \u00B7 ",
                monthLabel(monthRef)),
            React.createElement("button", { className: "clean-btn", onClick: () => setMonthRef(addMonths(monthRef, 1)), style: { border: "none", background: COLORS.surfaceSoft2, borderRadius: 10, padding: 6 } },
                React.createElement(ChevronRight, { size: 14, color: COLORS.sageDeep }))),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 6 } }, WEEKDAYS.map((w) => (React.createElement("div", { key: w, style: { textAlign: "center", fontSize: 9.5, color: COLORS.textFaint, fontWeight: 600 } }, w[0])))),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 } }, cells.map((c, i) => (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "1 / 1" } }, c && (React.createElement("div", { style: {
                width: "72%", height: "72%", borderRadius: "50%",
                background: c.isFuture || c.ratio === 0 ? "transparent" : c.ratio === 1 ? `linear-gradient(135deg, ${COLORS.sage}, ${COLORS.teal})` : COLORS.sageLight,
                border: c.isFuture ? `1px solid ${COLORS.border}` : c.ratio === 0 ? `1px solid ${COLORS.border}` : "none",
                opacity: c.isFuture ? 0.4 : 1,
            } })))))),
        React.createElement("div", { style: { fontSize: 12, color: COLORS.textMuted, marginTop: 14, textAlign: "center" } }, totalHabits === 0
            ? "Add a habit to start tracking consistency."
            : `Fully on track ${fullDays} of ${pastCells.length} days this month (${consistencyPct}%).`)));
}
function HabitsView({ habits, onToggle, onDelete }) {
    return (React.createElement("div", { className: "fade-up" },
        React.createElement(SectionLabel, null, "Daily habits"),
        habits.length === 0 ? (React.createElement(EmptyState, { text: "No habits yet \u2014 add water, gym, vitamins, anything." })) : (habits.map((h) => React.createElement(HabitCard, { key: h.id, habit: h, onToggle: onToggle, onDelete: onDelete }))),
        React.createElement(ConsistencyCalendar, { habits: habits })));
}
/* -------------------------------- EXPENSES VIEW -------------------------------- */
const formatMoney = (n) => `$${Math.abs(n).toFixed(2)}`;
const monthLabel = (d) => `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
function weeklyBuckets(expenses, monthDate) {
    const totalDays = endOfMonth(monthDate).getDate();
    const buckets = [];
    for (let d = 1; d <= totalDays; d += 7) {
        buckets.push({ label: `${d}–${Math.min(d + 6, totalDays)}`, start: d, end: Math.min(d + 6, totalDays), total: 0 });
    }
    expenses.forEach((e) => {
        if (e.type !== "expense")
            return;
        const ed = fromKey(e.date);
        if (ed.getFullYear() !== monthDate.getFullYear() || ed.getMonth() !== monthDate.getMonth())
            return;
        const day = ed.getDate();
        const bucket = buckets.find((b) => day >= b.start && day <= b.end);
        if (bucket)
            bucket.total += e.amount;
    });
    return buckets;
}
function ExpenseRow({ item, onDelete }) {
    const Icon = item.type === "income" ? TrendingUp : categoryIcon(item.category);
    return (React.createElement("div", { className: "fade-up", style: {
            display: "flex", alignItems: "center", gap: 12, padding: "11px 4px",
            borderBottom: `1px solid ${COLORS.border}`,
        } },
        React.createElement("div", { style: {
                width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                background: item.type === "income" ? COLORS.sageLight : COLORS.surfaceSoft2,
                display: "flex", alignItems: "center", justifyContent: "center",
            } },
            React.createElement(Icon, { size: 15, color: item.type === "income" ? COLORS.sageDeep : COLORS.textMuted })),
        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
            React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: COLORS.text } }, item.title),
            React.createElement("div", { style: { fontSize: 11, color: COLORS.textFaint, marginTop: 1 } },
                item.type === "income" ? "Income" : item.category,
                " \u00B7 ",
                MONTHS[fromKey(item.date).getMonth()],
                " ",
                fromKey(item.date).getDate())),
        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: item.type === "income" ? COLORS.sageDeep : COLORS.text, flexShrink: 0 } },
            item.type === "income" ? "+" : "−",
            formatMoney(item.amount)),
        React.createElement("button", { onClick: () => onDelete(item.id), style: { border: "none", background: "none", padding: 4, color: COLORS.textFaint, flexShrink: 0 } },
            React.createElement(Trash2, { size: 13 }))));
}
function SpendingPulse({ pulse }) {
    const weekPct = pctChange(pulse.weekCurrent, pulse.weekPrev);
    const monthPct = pctChange(pulse.monthCurrent, pulse.monthPrev);
    if (weekPct === null && monthPct === null) {
        return (React.createElement("div", { style: { fontSize: 12.5, color: COLORS.creamMuted, fontStyle: "italic", fontFamily: FONT_DISPLAY, textAlign: "center", padding: "14px 8px" } }, "Keep logging purchases \u2014 once there's a full week and month behind you, you'll see how your spending trends here."));
    }
    const describe = (pct) => {
        if (pct === null)
            return "no prior data yet";
        const rounded = Math.round(Math.abs(pct));
        if (rounded === 0)
            return "about the same as";
        return `${rounded}% ${pct > 0 ? "more" : "less"} than`;
    };
    const worstPct = Math.max(weekPct ?? -Infinity, monthPct ?? -Infinity);
    const tone = worstPct > 10 ? COLORS.danger : worstPct > 0 ? COLORS.taupeLight : COLORS.sageLight;
    return (React.createElement("div", { style: { textAlign: "center", padding: "14px 10px 4px" } },
        React.createElement("div", { style: { fontSize: 13, color: COLORS.cream, lineHeight: 1.6 } },
            "This week you've spent ",
            React.createElement("strong", { style: { color: tone } }, describe(weekPct)),
            " last week. This month you're ",
            React.createElement("strong", { style: { color: tone } }, describe(monthPct)),
            " last month.")));
}
function ExpensesView({ expenses, budgets, savings, monthRef, setMonthRef, onDeleteExpense, onOpenBudgets }) {
    const inMonth = expenses.filter((e) => {
        const d = fromKey(e.date);
        return d.getFullYear() === monthRef.getFullYear() && d.getMonth() === monthRef.getMonth();
    });
    const income = inMonth.filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0);
    const spent = inMonth.filter((e) => e.type === "expense").reduce((s, e) => s + e.amount, 0);
    const net = income - spent;
    const byCategory = {};
    inMonth.forEach((e) => {
        if (e.type !== "expense")
            return;
        byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    });
    const activeCategories = CATEGORIES.filter((c) => byCategory[c.key] || budgets[c.key]);
    const buckets = weeklyBuckets(expenses, monthRef);
    const maxBucket = Math.max(1, ...buckets.map((b) => b.total));
    const sorted = [...inMonth].sort((a, b) => b.date.localeCompare(a.date));
    const todayKeyNow = toKey(new Date());
    const monthStartKey = toKey(startOfMonth(monthRef));
    const monthEndKey = toKey(endOfMonth(monthRef));
    const savingsByAccount = SAVINGS_ACCOUNTS
        .map((account) => {
        const entries = savings.filter((s) => s.account === account);
        if (entries.length === 0)
            return null;
        const month = entries.reduce((sum, e) => sum + savingsOccurrenceTotal(e, monthStartKey, monthEndKey), 0);
        const allTime = entries.reduce((sum, e) => sum + savingsOccurrenceTotal(e, e.date, todayKeyNow), 0);
        return { account, month, allTime };
    })
        .filter(Boolean);
    const pulse = computeSpendingPulse(expenses);
    return (React.createElement("div", { className: "fade-up" },
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 } },
            React.createElement("button", { className: "clean-btn", onClick: () => setMonthRef(addMonths(monthRef, -1)), style: { border: "none", background: COLORS.surfaceSoft2, borderRadius: 10, padding: 7 } },
                React.createElement(ChevronLeft, { size: 16, color: COLORS.sageDeep })),
            React.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 600, color: COLORS.cream } }, monthLabel(monthRef)),
            React.createElement("button", { className: "clean-btn", onClick: () => setMonthRef(addMonths(monthRef, 1)), style: { border: "none", background: COLORS.surfaceSoft2, borderRadius: 10, padding: 7 } },
                React.createElement(ChevronRight, { size: 16, color: COLORS.sageDeep }))),
        React.createElement("div", { style: { background: COLORS.surface, borderRadius: 20, padding: "18px 16px", display: "flex", marginBottom: 14 } },
            React.createElement("div", { style: { flex: 1, textAlign: "center" } },
                React.createElement("div", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", color: COLORS.textFaint } }, "Income"),
                React.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 600, color: COLORS.sageDeep, marginTop: 4 } }, formatMoney(income))),
            React.createElement("div", { style: { flex: 1, textAlign: "center", borderLeft: `1px solid ${COLORS.border}`, borderRight: `1px solid ${COLORS.border}` } },
                React.createElement("div", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", color: COLORS.textFaint } }, "Spent"),
                React.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 600, color: COLORS.danger, marginTop: 4 } }, formatMoney(spent))),
            React.createElement("div", { style: { flex: 1, textAlign: "center" } },
                React.createElement("div", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", color: COLORS.textFaint } }, "Net"),
                React.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 600, color: COLORS.text, marginTop: 4 } },
                    net >= 0 ? "+" : "−",
                    formatMoney(net)))),
        React.createElement("div", { style: { background: COLORS.surface, borderRadius: 20, padding: "18px 16px", marginBottom: 14 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } },
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.textMuted } }, "Budgets"),
                React.createElement("button", { className: "clean-btn", onClick: onOpenBudgets, style: { border: "none", background: "none", display: "flex", alignItems: "center", gap: 4, padding: 2 } },
                    React.createElement(PiggyBank, { size: 13, color: COLORS.sageDeep }),
                    React.createElement("span", { style: { fontSize: 11.5, color: COLORS.sageDeep, fontWeight: 600 } }, "Edit"))),
            activeCategories.length === 0 ? (React.createElement("div", { style: { fontSize: 12.5, color: COLORS.textFaint, fontStyle: "italic", fontFamily: FONT_DISPLAY } }, "Nothing tracked yet this month.")) : (activeCategories.map((c) => {
                const Icon = c.icon;
                const spentC = byCategory[c.key] || 0;
                const budget = budgets[c.key] || 0;
                const pct = budget > 0 ? Math.min(100, (spentC / budget) * 100) : 0;
                const over = budget > 0 && spentC > budget;
                return (React.createElement("div", { key: c.key, style: { marginBottom: 12 } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 } },
                        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } },
                            React.createElement(Icon, { size: 13, color: COLORS.textMuted }),
                            React.createElement("span", { style: { fontSize: 13, color: COLORS.text, fontWeight: 500 } }, c.key)),
                        React.createElement("span", { style: { fontSize: 12, color: over ? COLORS.danger : COLORS.textMuted } },
                            formatMoney(spentC),
                            budget > 0 ? ` / ${formatMoney(budget)}` : "")),
                    budget > 0 && (React.createElement("div", { style: { height: 6, borderRadius: 4, background: COLORS.surfaceSoft, overflow: "hidden" } },
                        React.createElement("div", { style: {
                                width: `${pct}%`, height: "100%", borderRadius: 4,
                                background: over ? COLORS.danger : `linear-gradient(90deg, ${COLORS.sage}, ${COLORS.teal})`,
                                transition: "width 0.4s ease",
                            } })))));
            }))),
        React.createElement("div", { style: { background: COLORS.surface, borderRadius: 20, padding: "18px 16px", marginBottom: 14 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, marginBottom: 12 } },
                React.createElement(Landmark, { size: 14, color: COLORS.textMuted }),
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.textMuted } }, "Savings")),
            savingsByAccount.length === 0 ? (React.createElement("div", { style: { fontSize: 12.5, color: COLORS.textFaint, fontStyle: "italic", fontFamily: FONT_DISPLAY } }, "No savings tracked yet \u2014 log a deposit to RRSP, TFSA, or another account.")) : (savingsByAccount.map((s) => (React.createElement("div", { key: s.account, style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0" } },
                React.createElement("span", { style: { fontSize: 13, color: COLORS.text, fontWeight: 500 } }, s.account),
                React.createElement("div", { style: { textAlign: "right" } },
                    React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: COLORS.sageDeep } },
                        formatMoney(s.month),
                        " ",
                        React.createElement("span", { style: { fontSize: 10.5, fontWeight: 500, color: COLORS.textFaint } }, "this month")),
                    React.createElement("div", { style: { fontSize: 11, color: COLORS.textFaint } },
                        formatMoney(s.allTime),
                        " all-time"))))))),
        React.createElement("div", { style: { background: COLORS.surface, borderRadius: 20, padding: "18px 16px", marginBottom: 14 } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 6 } }, "Transactions"),
            sorted.length === 0 ? (React.createElement("div", { style: { fontSize: 12.5, color: COLORS.textFaint, fontStyle: "italic", fontFamily: FONT_DISPLAY, padding: "10px 0" } },
                "Nothing logged for ",
                monthLabel(monthRef),
                " yet.")) : (sorted.map((e) => React.createElement(ExpenseRow, { key: e.id, item: e, onDelete: onDeleteExpense })))),
        React.createElement("div", { style: { background: COLORS.bgDeep, borderRadius: 20, padding: "18px 16px 14px" } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.creamMuted, marginBottom: 14 } }, "Weekly spending"),
            React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 10, height: 110 } }, buckets.map((b) => (React.createElement("div", { key: b.label, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" } },
                React.createElement("div", { style: {
                        width: "100%", maxWidth: 34, borderRadius: 6, background: COLORS.cream,
                        height: `${Math.max(4, (b.total / maxBucket) * 90)}px`, transition: "height 0.4s ease",
                    } }),
                React.createElement("div", { style: { fontSize: 9.5, color: COLORS.creamFaint, marginTop: 6 } }, b.label)))))),
        React.createElement(SpendingPulse, { pulse: pulse })));
}
/* -------------------------------- GROCERY VIEW -------------------------------- */
function QuickAddRow({ placeholder, onAdd }) {
    const [value, setValue] = useState("");
    const submit = () => {
        const v = value.trim();
        if (!v)
            return;
        onAdd(v);
        setValue("");
    };
    return (React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 8 } },
        React.createElement("input", { style: { ...inputStyle, flex: 1, padding: "9px 12px", fontSize: 13.5 }, placeholder: placeholder, value: value, onChange: (e) => setValue(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
                submit(); } }),
        React.createElement("button", { className: "clean-btn", onClick: submit, style: {
                width: 36, height: 36, borderRadius: 10, border: "none", background: COLORS.sageDeep,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            } },
            React.createElement(Plus, { size: 16, color: "#fff" }))));
}
function GroceryView({ meals, setMeals, ingredients, pantry, onAddIngredient, onRemoveIngredient, onAddPantry, onRemovePantry, onBuyItem }) {
    const pantryNames = new Set(pantry.map((p) => p.name.trim().toLowerCase()));
    const toBuy = ingredients.filter((i) => !pantryNames.has(i.name.trim().toLowerCase()));
    const mealFields = [
        { key: "breakfast", label: "Breakfast" },
        { key: "lunch", label: "Lunch" },
        { key: "dinner", label: "Dinner" },
        { key: "snacks", label: "Snacks" },
    ];
    return (React.createElement("div", { className: "fade-up" },
        React.createElement("div", { style: { background: COLORS.surface, borderRadius: 20, padding: "18px 16px", marginBottom: 14 } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 12 } }, "This week's meals"),
            mealFields.map((m) => (React.createElement("div", { key: m.key, style: { marginBottom: 12 } },
                React.createElement(FieldLabel, null, m.label),
                React.createElement("input", { style: { ...inputStyle, padding: "9px 12px", fontSize: 13.5 }, placeholder: `What's for ${m.label.toLowerCase()} this week?`, value: meals[m.key] || "", onChange: (e) => setMeals((prev) => ({ ...prev, [m.key]: e.target.value })) }))))),
        React.createElement("div", { style: { background: COLORS.surface, borderRadius: 20, padding: "18px 16px", marginBottom: 14 } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 4 } }, "Ingredients needed"),
            ingredients.length === 0 ? (React.createElement("div", { style: { fontSize: 12.5, color: COLORS.textFaint, fontStyle: "italic", fontFamily: FONT_DISPLAY, padding: "8px 0" } }, "Add what your meals need \u2014 we'll check it against what's in stock.")) : (ingredients.map((i) => {
                const have = pantryNames.has(i.name.trim().toLowerCase());
                return (React.createElement("div", { key: i.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "7px 0" } },
                    React.createElement("span", { style: { flex: 1, fontSize: 13.5, color: COLORS.text } }, i.name),
                    have && (React.createElement("span", { style: {
                            fontSize: 10, fontWeight: 700, color: COLORS.sageDeep, background: COLORS.sageLight,
                            borderRadius: 6, padding: "2px 7px",
                        } }, "have it")),
                    React.createElement("button", { onClick: () => onRemoveIngredient(i.id), style: { border: "none", background: "none", padding: 4, color: COLORS.textFaint } },
                        React.createElement(Trash2, { size: 13 }))));
            })),
            React.createElement(QuickAddRow, { placeholder: "Add an ingredient\u2026", onAdd: onAddIngredient })),
        React.createElement("div", { style: { background: COLORS.surface, borderRadius: 20, padding: "18px 16px", marginBottom: 14 } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 8 } },
                "To buy (",
                toBuy.length,
                ")"),
            toBuy.length === 0 ? (React.createElement("div", { style: { fontSize: 12.5, color: COLORS.textFaint, fontStyle: "italic", fontFamily: FONT_DISPLAY, padding: "8px 0" } }, "You have everything you need. Nothing to buy.")) : (toBuy.map((i) => (React.createElement("div", { key: i.id, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0" } },
                React.createElement(Bloom, { checked: false, onClick: () => onBuyItem(i) }),
                React.createElement("span", { style: { fontSize: 14, color: COLORS.text, fontWeight: 500 } }, i.name)))))),
        React.createElement("div", { style: { background: COLORS.surface, borderRadius: 20, padding: "18px 16px" } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 4 } }, "In stock"),
            pantry.length === 0 ? (React.createElement("div", { style: { fontSize: 12.5, color: COLORS.textFaint, fontStyle: "italic", fontFamily: FONT_DISPLAY, padding: "8px 0" } }, "Nothing marked as in stock yet.")) : (pantry.map((p) => (React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "7px 0" } },
                React.createElement("span", { style: { flex: 1, fontSize: 13.5, color: COLORS.text } }, p.name),
                React.createElement("button", { onClick: () => onRemovePantry(p.id), style: { border: "none", background: "none", padding: 4, color: COLORS.textFaint } },
                    React.createElement(Trash2, { size: 13 })))))),
            React.createElement(QuickAddRow, { placeholder: "Add to in-stock\u2026", onAdd: onAddPantry }))));
}
/* -------------------------------- PERIOD VIEW -------------------------------- */
function TermChip({ word, active, onClick, dotColor }) {
    return (React.createElement("button", { className: "clean-btn", onClick: () => onClick(word), style: {
            border: `1px solid ${active ? COLORS.sage : COLORS.border}`,
            background: active ? COLORS.sageLight : "transparent",
            borderRadius: 10, padding: "5px 10px", fontSize: 11.5, fontWeight: 600,
            color: COLORS.sageDeep, display: "inline-flex", alignItems: "center", gap: 6,
        } },
        dotColor && React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: dotColor, flexShrink: 0 } }),
        word));
}
function PhaseStepper({ currentKey }) {
    const idx = PHASE_ORDER.indexOf(currentKey);
    return (React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 3, marginBottom: 16, flexWrap: "wrap" } }, PHASE_ORDER.map((k, i) => (React.createElement(React.Fragment, { key: k },
        React.createElement("div", { style: {
                fontSize: 10.5, fontWeight: i === idx ? 700 : 500,
                color: i === idx ? COLORS.sageDeep : i < idx ? COLORS.textFaint : COLORS.textMuted,
                background: i === idx ? COLORS.sageLight : "transparent",
                borderRadius: 8, padding: "4px 8px",
            } }, PHASES[k].label.replace(" phase", "")),
        i < PHASE_ORDER.length - 1 && React.createElement(ChevronRight, { size: 10, color: COLORS.textFaint }))))));
}
function CycleChart({ cycle }) {
    const W = 280, H = 116, chartH = 96;
    const dayX = (day) => ((day - 1) / 27) * W;
    const valY = (v) => chartH - (v / 100) * chartH;
    const toPoints = (arr) => arr.map((v, i) => `${dayX(i + 1)},${valY(v)}`).join(" ");
    const bands = [
        { from: 1, to: 5, color: COLORS.danger },
        { from: 5, to: 13, color: COLORS.sage },
        { from: 13, to: 15, color: COLORS.teal },
        { from: 15, to: 28, color: COLORS.taupe },
    ];
    const markerX = cycle ? dayX(Math.min(28, Math.max(1, cycle.cycleDay))) : null;
    return (React.createElement("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", height: "130", style: { overflow: "visible" } },
        bands.map((b, i) => (React.createElement("rect", { key: i, x: dayX(b.from), y: 0, width: dayX(b.to) - dayX(b.from), height: chartH, fill: b.color, opacity: 0.08 }))),
        React.createElement("polyline", { points: toPoints(HORMONE_CURVES.Estrogen), fill: "none", stroke: HORMONE_COLORS.Estrogen, strokeWidth: "2", strokeLinejoin: "round" }),
        React.createElement("polyline", { points: toPoints(HORMONE_CURVES.Progesterone), fill: "none", stroke: HORMONE_COLORS.Progesterone, strokeWidth: "2", strokeLinejoin: "round" }),
        React.createElement("polyline", { points: toPoints(HORMONE_CURVES["LH surge"]), fill: "none", stroke: HORMONE_COLORS["LH surge"], strokeWidth: "1.6", strokeLinejoin: "round" }),
        React.createElement("polyline", { points: toPoints(HORMONE_CURVES.FSH), fill: "none", stroke: HORMONE_COLORS.FSH, strokeWidth: "1.6", strokeDasharray: "3,2", strokeLinejoin: "round" }),
        markerX !== null && (React.createElement(React.Fragment, null,
            React.createElement("line", { x1: markerX, y1: 0, x2: markerX, y2: chartH, stroke: COLORS.text, strokeWidth: "1", strokeDasharray: "2,2" }),
            React.createElement("text", { x: markerX, y: H - 2, fontSize: "7", fill: COLORS.textMuted, textAnchor: "middle" }, "today"))),
        React.createElement("text", { x: dayX(1), y: H - 2, fontSize: "7", fill: COLORS.textFaint, textAnchor: "start" }, "day 1"),
        React.createElement("text", { x: dayX(28), y: H - 2, fontSize: "7", fill: COLORS.textFaint, textAnchor: "end" }, "day 28")));
}
function PeriodView({ periodDays, onToggleDay }) {
    const [monthRef, setMonthRef] = useState(new Date());
    const [activeTerm, setActiveTerm] = useState(null);
    const todayKey = toKey(new Date());
    const cells = monthDayCells(monthRef);
    const periodSet = new Set(periodDays);
    const cycle = computeCyclePhase(periodDays);
    const phase = cycle ? PHASES[cycle.phaseKey] : null;
    return (React.createElement("div", { className: "fade-up" },
        React.createElement("div", { style: { background: COLORS.surface, borderRadius: 20, padding: "18px 16px", marginBottom: 14 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 } },
                React.createElement("button", { className: "clean-btn", onClick: () => setMonthRef(addMonths(monthRef, -1)), style: { border: "none", background: COLORS.surfaceSoft2, borderRadius: 10, padding: 6 } },
                    React.createElement(ChevronLeft, { size: 14, color: COLORS.sageDeep })),
                React.createElement("div", { style: { fontSize: 13, fontFamily: FONT_DISPLAY, fontWeight: 600, color: COLORS.text } }, monthLabel(monthRef)),
                React.createElement("button", { className: "clean-btn", onClick: () => setMonthRef(addMonths(monthRef, 1)), style: { border: "none", background: COLORS.surfaceSoft2, borderRadius: 10, padding: 6 } },
                    React.createElement(ChevronRight, { size: 14, color: COLORS.sageDeep }))),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 6 } }, WEEKDAYS.map((w) => (React.createElement("div", { key: w, style: { textAlign: "center", fontSize: 9.5, color: COLORS.textFaint, fontWeight: 600 } }, w[0])))),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 } }, cells.map((c, i) => (React.createElement("div", { key: i, style: { aspectRatio: "1 / 1", display: "flex", alignItems: "center", justifyContent: "center" } }, c && (React.createElement("button", { className: "clean-btn", onClick: () => onToggleDay(c.key), style: {
                    width: "78%", height: "78%", borderRadius: "50%", border: c.key === todayKey ? `1.5px solid ${COLORS.sageDeep}` : "none",
                    background: periodSet.has(c.key) ? COLORS.danger : COLORS.surfaceSoft,
                    display: "flex", alignItems: "center", justifyContent: "center",
                } },
                React.createElement("span", { style: { fontSize: 11, color: periodSet.has(c.key) ? "#fff" : COLORS.textMuted, fontWeight: c.key === todayKey ? 700 : 400 } }, c.day))))))),
            React.createElement("div", { style: { fontSize: 11, color: COLORS.textFaint, marginTop: 10, textAlign: "center" } }, "Tap a day to mark it as a period day")),
        React.createElement("div", { style: { background: COLORS.surface, borderRadius: 20, padding: "18px 16px" } }, !phase ? (React.createElement("div", { style: { fontSize: 12.5, color: COLORS.textFaint, fontStyle: "italic", fontFamily: FONT_DISPLAY, textAlign: "center", padding: "10px 0" } }, "Mark a few period days above and your current phase will show up here.")) : (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 4 } }, "You're likely in your"),
            React.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 600, color: COLORS.sageDeep, marginBottom: 2 } }, phase.label),
            React.createElement("div", { style: { fontSize: 12, color: COLORS.textFaint, marginBottom: 14 } },
                phase.range,
                " \u00B7 cycle day ",
                cycle.cycleDay),
            cycle.longCycle && (React.createElement("div", { style: { fontSize: 12, color: COLORS.danger, marginBottom: 14 } }, "This cycle is running longer than the typical ~28\u201335 days. If that keeps happening, it's worth mentioning to a doctor.")),
            React.createElement(PhaseStepper, { currentKey: cycle.phaseKey }),
            React.createElement("div", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 4 } }, "Cycle overview"),
            React.createElement(CycleChart, { cycle: cycle }),
            React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10, marginBottom: 14 } }, ["Estrogen", "Progesterone", "LH surge", "FSH"].map((t) => (React.createElement(TermChip, { key: t, word: t, dotColor: HORMONE_COLORS[t], active: activeTerm === t, onClick: (w) => setActiveTerm((cur) => (cur === w ? null : w)) })))),
            activeTerm && (React.createElement("div", { style: { background: COLORS.sageLight, borderRadius: 14, padding: "12px 14px", marginBottom: 16, position: "relative" } },
                React.createElement("button", { className: "clean-btn", onClick: () => setActiveTerm(null), style: { position: "absolute", top: 8, right: 8, border: "none", background: "none", padding: 4 } },
                    React.createElement(X, { size: 12, color: COLORS.sageDeep })),
                React.createElement("div", { style: { fontWeight: 700, fontSize: 12.5, color: COLORS.sageDeep, marginBottom: 4, paddingRight: 18 } }, activeTerm),
                React.createElement("div", { style: { fontSize: 12.5, color: COLORS.text, lineHeight: 1.5 } }, GLOSSARY[activeTerm]))),
            React.createElement("div", { style: { fontSize: 13, color: COLORS.text, lineHeight: 1.55, marginBottom: 18 } }, phase.hormoneNote),
            Object.entries(phase.tips).map(([category, items]) => (React.createElement("div", { key: category, style: { marginBottom: 14 } },
                React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, marginBottom: 6 } }, category),
                items.map((tip, i) => (React.createElement("div", { key: i, style: { fontSize: 13, color: COLORS.text, lineHeight: 1.5, marginBottom: 3, paddingLeft: 12, position: "relative" } },
                    React.createElement("span", { style: { position: "absolute", left: 0, color: COLORS.sage } }, "\u00B7"),
                    tip)))))),
            React.createElement("div", { style: { fontSize: 11, color: COLORS.textFaint, marginTop: 4, fontStyle: "italic" } }, "General wellness info, not medical advice \u2014 check with a healthcare provider for anything persistent or concerning."))))));
}
/* -------------------------------- MODALS -------------------------------- */
function ModalShell({ title, onClose, children }) {
    return (React.createElement("div", { style: {
            position: "fixed", inset: 0, background: "rgba(40,48,50,0.28)", zIndex: 50,
            display: "flex", alignItems: "flex-end", justifyContent: "center",
        }, onClick: onClose },
        React.createElement("div", { className: "modal-in", onClick: (e) => e.stopPropagation(), style: {
                background: COLORS.surfaceSolid, borderRadius: "24px 24px 0 0", padding: "20px 20px 28px",
                width: "100%", maxWidth: 420, maxHeight: "85vh", overflowY: "auto",
            } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 } },
                React.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontSize: 19, fontWeight: 600, color: COLORS.text } }, title),
                React.createElement("button", { className: "clean-btn", onClick: onClose, style: { border: "none", background: COLORS.surfaceSoft2, borderRadius: "50%", padding: 7 } },
                    React.createElement(X, { size: 16, color: COLORS.textMuted }))),
            children)));
}
function FieldLabel({ children }) {
    return React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, marginBottom: 6, letterSpacing: 0.3 } }, children);
}
const inputStyle = {
    width: "100%", padding: "11px 13px", borderRadius: 12, border: `1px solid ${COLORS.border}`,
    background: COLORS.surface, fontSize: 14.5, color: COLORS.text, outline: "none",
};
function AddTaskModal({ onClose, onSave, defaultDate }) {
    const [type, setType] = useState("task");
    const [title, setTitle] = useState("");
    const [hasDate, setHasDate] = useState(!!defaultDate);
    const [date, setDate] = useState(defaultDate || toKey(new Date()));
    const [hasTime, setHasTime] = useState(false);
    const [time, setTime] = useState("09:00");
    const [repeat, setRepeat] = useState("none");
    const isBirthday = type === "birthday";
    const effectiveHasDate = isBirthday ? true : hasDate;
    const effectiveRepeat = isBirthday ? "yearly" : repeat;
    const canSave = title.trim().length > 0;
    const handleSave = () => {
        if (!canSave)
            return;
        onSave({
            id: uid(),
            type,
            title: title.trim(),
            date: effectiveHasDate ? date : null,
            time: !isBirthday && effectiveHasDate && hasTime ? time : null,
            repeat: effectiveHasDate ? effectiveRepeat : "none",
            completed: false,
            completedAt: null,
            completions: [],
        });
        onClose();
    };
    return (React.createElement(ModalShell, { title: isBirthday ? "Add a birthday" : "Add a task", onClose: onClose },
        React.createElement(FieldLabel, null, "Type"),
        React.createElement("div", { style: { marginBottom: 16 } },
            React.createElement(Segmented, { value: type, onChange: setType, options: [{ label: "Task", value: "task" }, { label: "Birthday", value: "birthday" }] })),
        React.createElement(FieldLabel, null, isBirthday ? "Whose birthday?" : "Title"),
        React.createElement("input", { style: { ...inputStyle, marginBottom: 16, fontFamily: FONT_BODY }, placeholder: isBirthday ? "e.g. Hannah" : "e.g. Check in with Hannah", value: title, onChange: (e) => setTitle(e.target.value), autoFocus: true }),
        !isBirthday && (React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 16 } },
            React.createElement("button", { onClick: () => setHasDate((v) => !v), style: {
                    width: 40, height: 23, borderRadius: 12, border: "none", padding: 2,
                    background: hasDate ? COLORS.sage : COLORS.border, position: "relative", transition: "background 0.2s",
                } },
                React.createElement("div", { style: {
                        width: 19, height: 19, borderRadius: "50%", background: "#fff",
                        transform: hasDate ? "translateX(17px)" : "translateX(0)", transition: "transform 0.2s",
                    } })),
            React.createElement("span", { style: { fontSize: 13.5, color: COLORS.text } }, "Add a date"))),
        effectiveHasDate && (React.createElement(React.Fragment, null,
            React.createElement(FieldLabel, null, "Date"),
            React.createElement("input", { type: "date", style: { ...inputStyle, marginBottom: 16 }, value: date, onChange: (e) => setDate(e.target.value) }),
            !isBirthday && (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 16 } },
                    React.createElement("button", { onClick: () => setHasTime((v) => !v), style: {
                            width: 40, height: 23, borderRadius: 12, border: "none", padding: 2,
                            background: hasTime ? COLORS.sage : COLORS.border, position: "relative", transition: "background 0.2s",
                        } },
                        React.createElement("div", { style: {
                                width: 19, height: 19, borderRadius: "50%", background: "#fff",
                                transform: hasTime ? "translateX(17px)" : "translateX(0)", transition: "transform 0.2s",
                            } })),
                    React.createElement("span", { style: { fontSize: 13.5, color: COLORS.text } }, "Add a time")),
                hasTime && (React.createElement(React.Fragment, null,
                    React.createElement(FieldLabel, null, "Time"),
                    React.createElement("input", { type: "time", style: { ...inputStyle, marginBottom: 16 }, value: time, onChange: (e) => setTime(e.target.value) }))),
                React.createElement(FieldLabel, null, "Repeat"),
                React.createElement("select", { style: { ...inputStyle, marginBottom: 16 }, value: repeat, onChange: (e) => setRepeat(e.target.value) },
                    React.createElement("option", { value: "none" }, "Doesn't repeat"),
                    React.createElement("option", { value: "daily" }, "Daily"),
                    React.createElement("option", { value: "weekly" }, "Weekly"),
                    React.createElement("option", { value: "monthly" }, "Monthly"),
                    React.createElement("option", { value: "yearly" }, "Yearly")))))),
        React.createElement("button", { className: "clean-btn", onClick: handleSave, disabled: !canSave, style: {
                width: "100%", padding: "13px", borderRadius: 14, border: "none", marginTop: 6,
                background: canSave ? COLORS.sageDeep : COLORS.border,
                color: "#fff", fontSize: 14.5, fontWeight: 700,
            } }, "Save")));
}
function AddHabitModal({ onClose, onSave }) {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("droplet");
    const canSave = name.trim().length > 0;
    return (React.createElement(ModalShell, { title: "Add a habit", onClose: onClose },
        React.createElement(FieldLabel, null, "Name"),
        React.createElement("input", { style: { ...inputStyle, marginBottom: 16 }, placeholder: "e.g. Stretch before bed", value: name, onChange: (e) => setName(e.target.value), autoFocus: true }),
        React.createElement(FieldLabel, null, "Icon"),
        React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" } }, Object.entries(HABIT_ICONS).map(([key, Icon]) => (React.createElement("button", { key: key, onClick: () => setIcon(key), style: {
                width: 42, height: 42, borderRadius: 12,
                border: `1.5px solid ${icon === key ? COLORS.sage : COLORS.border}`,
                background: icon === key ? COLORS.sageLight : COLORS.surface,
                display: "flex", alignItems: "center", justifyContent: "center",
            } },
            React.createElement(Icon, { size: 18, color: icon === key ? COLORS.sageDeep : COLORS.textMuted }))))),
        React.createElement("button", { className: "clean-btn", onClick: () => { if (canSave) {
                onSave({ id: uid(), name: name.trim(), icon, completions: [] });
                onClose();
            } }, disabled: !canSave, style: {
                width: "100%", padding: "13px", borderRadius: 14, border: "none",
                background: canSave ? COLORS.sageDeep : COLORS.border,
                color: "#fff", fontSize: 14.5, fontWeight: 700,
            } }, "Save")));
}
function AddExpenseModal({ onClose, onSaveExpense, onSaveSavings }) {
    const [mode, setMode] = useState("expense");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Groceries");
    const [account, setAccount] = useState("TFSA");
    const [repeat, setRepeat] = useState("none");
    const [date, setDate] = useState(toKey(new Date()));
    const [scanning, setScanning] = useState(false);
    const [scanError, setScanError] = useState(null);
    const canSave = mode === "savings" ? parseFloat(amount) > 0 : title.trim().length > 0 && parseFloat(amount) > 0;
    const handleScan = async (e) => {
        const file = e.target.files && e.target.files[0];
        e.target.value = "";
        if (!file)
            return;
        setScanning(true);
        setScanError(null);
        try {
            const result = await scanReceipt(file);
            if (result.merchant)
                setTitle(result.merchant);
            if (result.amount)
                setAmount(String(result.amount));
            if (result.category && CATEGORIES.some((c) => c.key === result.category))
                setCategory(result.category);
            if (result.date)
                setDate(result.date);
        }
        catch (err) {
            setScanError("Couldn't read that receipt — go ahead and enter it manually below.");
        }
        finally {
            setScanning(false);
        }
    };
    const handleSave = () => {
        if (!canSave)
            return;
        if (mode === "savings") {
            onSaveSavings({ id: uid(), account, amount: parseFloat(amount), date, repeat });
        }
        else {
            onSaveExpense({
                id: uid(), type: mode, title: title.trim(), amount: parseFloat(amount),
                category: mode === "expense" ? category : null, date, note: "",
            });
        }
        onClose();
    };
    const titleText = mode === "expense" ? "Log a purchase" : mode === "income" ? "Log income" : "Log a deposit";
    return (React.createElement(ModalShell, { title: titleText, onClose: onClose },
        React.createElement("div", { style: { marginBottom: 16 } },
            React.createElement(Segmented, { value: mode, onChange: setMode, options: [
                    { label: "Expense", value: "expense" }, { label: "Income", value: "income" }, { label: "Savings", value: "savings" },
                ] })),
        mode === "expense" && (React.createElement("label", { className: "clean-btn", style: {
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "12px", borderRadius: 14, border: `1px dashed ${COLORS.border}`,
                marginBottom: 16, color: COLORS.sageDeep, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
            } },
            scanning ? React.createElement(Loader2, { size: 16, className: "check-pop" }) : React.createElement(Camera, { size: 16 }),
            React.createElement("span", null, scanning ? "Reading receipt…" : "Scan a receipt"),
            React.createElement("input", { type: "file", accept: "image/*", capture: "environment", onChange: handleScan, style: { display: "none" }, disabled: scanning }))),
        scanError && (React.createElement("div", { style: { fontSize: 12, color: COLORS.danger, marginTop: -10, marginBottom: 14 } }, scanError)),
        mode === "savings" ? (React.createElement(React.Fragment, null,
            React.createElement(FieldLabel, null, "Account"),
            React.createElement("select", { style: { ...inputStyle, marginBottom: 16 }, value: account, onChange: (e) => setAccount(e.target.value) }, SAVINGS_ACCOUNTS.map((a) => React.createElement("option", { key: a, value: a }, a))))) : (React.createElement(React.Fragment, null,
            React.createElement(FieldLabel, null, mode === "expense" ? "Merchant" : "Source"),
            React.createElement("input", { style: { ...inputStyle, marginBottom: 16 }, placeholder: mode === "expense" ? "e.g. Trader Joe's" : "e.g. Paycheck", value: title, onChange: (e) => setTitle(e.target.value) }))),
        React.createElement(FieldLabel, null, "Amount"),
        React.createElement("input", { type: "number", inputMode: "decimal", step: "0.01", style: { ...inputStyle, marginBottom: 16 }, placeholder: "0.00", value: amount, onChange: (e) => setAmount(e.target.value) }),
        mode === "expense" && (React.createElement(React.Fragment, null,
            React.createElement(FieldLabel, null, "Category"),
            React.createElement("select", { style: { ...inputStyle, marginBottom: 16 }, value: category, onChange: (e) => setCategory(e.target.value) }, CATEGORIES.map((c) => React.createElement("option", { key: c.key, value: c.key }, c.key))))),
        mode === "savings" && (React.createElement(React.Fragment, null,
            React.createElement(FieldLabel, null, "Repeats"),
            React.createElement("select", { style: { ...inputStyle, marginBottom: 16 }, value: repeat, onChange: (e) => setRepeat(e.target.value) },
                React.createElement("option", { value: "none" }, "Just once"),
                React.createElement("option", { value: "weekly" }, "Weekly"),
                React.createElement("option", { value: "monthly" }, "Monthly")))),
        React.createElement(FieldLabel, null, "Date"),
        React.createElement("input", { type: "date", style: { ...inputStyle, marginBottom: 16 }, value: date, onChange: (e) => setDate(e.target.value) }),
        React.createElement("button", { className: "clean-btn", onClick: handleSave, disabled: !canSave, style: {
                width: "100%", padding: "13px", borderRadius: 14, border: "none", marginTop: 6,
                background: canSave ? COLORS.sageDeep : COLORS.border,
                color: "#fff", fontSize: 14.5, fontWeight: 700,
            } }, "Save")));
}
function BudgetModal({ budgets, onClose, onSave }) {
    const [draft, setDraft] = useState({ ...budgets });
    return (React.createElement(ModalShell, { title: "Monthly budgets", onClose: onClose },
        CATEGORIES.map((c) => (React.createElement("div", { key: c.key, style: { marginBottom: 14 } },
            React.createElement(FieldLabel, null, c.key),
            React.createElement("input", { type: "number", inputMode: "decimal", step: "1", style: inputStyle, placeholder: "0", value: draft[c.key] ?? "", onChange: (e) => setDraft((d) => ({ ...d, [c.key]: parseFloat(e.target.value) || 0 })) })))),
        React.createElement("button", { className: "clean-btn", onClick: () => { onSave(draft); onClose(); }, style: {
                width: "100%", padding: "13px", borderRadius: 14, border: "none", marginTop: 6,
                background: COLORS.sageDeep, color: "#fff", fontSize: 14.5, fontWeight: 700,
            } }, "Save budgets")));
}
/* -------------------------------- APP -------------------------------- */
function App() {
    const [tasks, setTasks] = useState(seedTasks);
    const [habits, setHabits] = useState(seedHabits);
    const [expenses, setExpenses] = useState(seedExpenses);
    const [budgets, setBudgets] = useState(seedBudgets);
    const [savings, setSavings] = useState(seedSavings);
    const [meals, setMeals] = useState(seedMeals);
    const [ingredients, setIngredients] = useState(seedIngredients);
    const [pantry, setPantry] = useState(seedPantry);
    const [periodDays, setPeriodDays] = useState(seedPeriodDays);
    const [loaded, setLoaded] = useState(false);
    const [tab, setTab] = useState("today");
    const [modalOpen, setModalOpen] = useState(false);
    const [budgetModalOpen, setBudgetModalOpen] = useState(false);
    const [calRefDate, setCalRefDate] = useState(new Date());
    const [calZoom, setCalZoom] = useState("week");
    const [expenseMonthRef, setExpenseMonthRef] = useState(new Date());
    const [introPhase, setIntroPhase] = useState("in");
    const [introChecked, setIntroChecked] = useState(false);
    useEffect(() => {
        const t1 = setTimeout(() => setIntroPhase("out"), 2200);
        const t2 = setTimeout(() => setIntroPhase(null), 3300);
        const t3 = setTimeout(() => { setIntroChecked(true); playDing(); }, 1300);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await window.storage.get("planner-data", false);
                if (!cancelled && res && res.value) {
                    const data = JSON.parse(res.value);
                    if (data.tasks)
                        setTasks(data.tasks);
                    if (data.habits)
                        setHabits(data.habits);
                    if (data.expenses)
                        setExpenses(data.expenses);
                    if (data.budgets)
                        setBudgets(data.budgets);
                    if (data.savings)
                        setSavings(data.savings);
                    if (data.meals)
                        setMeals(data.meals);
                    if (data.ingredients)
                        setIngredients(data.ingredients);
                    if (data.pantry)
                        setPantry(data.pantry);
                    if (data.periodDays)
                        setPeriodDays(data.periodDays);
                }
            }
            catch (e) {
                // no saved data yet — keep seed data
            }
            if (!cancelled)
                setLoaded(true);
        })();
        return () => { cancelled = true; };
    }, []);
    useEffect(() => {
        if (!loaded)
            return;
        (async () => {
            try {
                await window.storage.set("planner-data", JSON.stringify({
                    tasks, habits, expenses, budgets, savings, meals, ingredients, pantry, periodDays,
                }), false);
            }
            catch (e) {
                console.error("Save failed", e);
            }
        })();
    }, [tasks, habits, expenses, budgets, savings, meals, ingredients, pantry, periodDays, loaded]);
    const toggleTask = (taskId, dateKey) => {
        setTasks((prev) => prev.map((t) => {
            if (t.id !== taskId)
                return t;
            const isRepeating = t.repeat && t.repeat !== "none";
            if (isRepeating) {
                const completions = t.completions || [];
                const has = completions.includes(dateKey);
                return { ...t, completions: has ? completions.filter((d) => d !== dateKey) : [...completions, dateKey] };
            }
            const nowDone = !t.completed;
            return { ...t, completed: nowDone, completedAt: nowDone ? (dateKey || toKey(new Date())) : null };
        }));
    };
    const deleteTask = (taskId) => setTasks((prev) => prev.filter((t) => t.id !== taskId));
    const addTask = (task) => setTasks((prev) => [...prev, task]);
    const reorderTasks = (newOrderIds, draggedId) => {
        setTasks((prev) => {
            const orderMap = {};
            newOrderIds.forEach((id, idx) => { orderMap[id] = idx + 1; });
            return prev.map((t) => {
                if (!(t.id in orderMap))
                    return t;
                const updated = { ...t, order: orderMap[t.id] };
                if (t.id === draggedId)
                    updated.time = null;
                return updated;
            });
        });
    };
    const toggleHabit = (habitId, dateKey) => {
        setHabits((prev) => prev.map((h) => {
            if (h.id !== habitId)
                return h;
            const has = h.completions.includes(dateKey);
            return { ...h, completions: has ? h.completions.filter((d) => d !== dateKey) : [...h.completions, dateKey] };
        }));
    };
    const deleteHabit = (habitId) => setHabits((prev) => prev.filter((h) => h.id !== habitId));
    const addHabit = (habit) => setHabits((prev) => [...prev, habit]);
    const addExpense = (expense) => setExpenses((prev) => [...prev, expense]);
    const deleteExpense = (id) => setExpenses((prev) => prev.filter((e) => e.id !== id));
    const saveBudgets = (draft) => setBudgets(draft);
    const addSavings = (entry) => setSavings((prev) => [...prev, entry]);
    const addIngredient = (name) => setIngredients((prev) => [...prev, { id: uid(), name }]);
    const removeIngredient = (id) => setIngredients((prev) => prev.filter((i) => i.id !== id));
    const addPantryItem = (name) => setPantry((prev) => {
        if (prev.some((p) => p.name.trim().toLowerCase() === name.trim().toLowerCase()))
            return prev;
        return [...prev, { id: uid(), name }];
    });
    const removePantryItem = (id) => setPantry((prev) => prev.filter((p) => p.id !== id));
    const buyIngredient = (item) => addPantryItem(item.name);
    const togglePeriodDay = (key) => setPeriodDays((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
    const today = new Date();
    const dateStr = `${WEEKDAYS[today.getDay()]}, ${MONTHS[today.getMonth()]} ${today.getDate()}`;
    const defaultTaskDate = tab === "today" ? toKey(today) : tab === "calendar" ? toKey(calRefDate) : null;
    const TABS = [
        { key: "today", label: "Today", icon: Sun },
        { key: "tasks", label: "Tasks", icon: ListChecks },
        { key: "calendar", label: "Calendar", icon: CalendarDays },
        { key: "expenses", label: "Expenses", icon: Wallet },
        { key: "grocery", label: "Grocery", icon: ShoppingCart },
        { key: "habits", label: "Habits", icon: Flower2 },
        { key: "period", label: "Period", icon: Moon },
        { key: "quote", label: "Quote", icon: Sparkles },
    ];
    const emboss = {
        color: COLORS.bgDeep,
        textShadow: "0 1px 1px rgba(255,255,255,0.25), 0 3px 5px rgba(255,255,255,0.18), 0 -2px 2px rgba(0,0,0,0.6), 0 -4px 7px rgba(0,0,0,0.32)",
    };
    return (React.createElement("div", { className: "planner-root", style: {
            minHeight: "100vh", background: COLORS.bgGradient, display: "flex", justifyContent: "center", position: "relative",
        } },
        React.createElement("style", null, GLOBAL_CSS),
        React.createElement("div", { className: "grain-layer" }),
        introPhase && (React.createElement("div", { style: {
                position: "fixed", inset: 0, zIndex: 100, background: COLORS.bgGradient,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                opacity: introPhase === "out" ? 0 : 1,
                transition: "opacity 1s ease",
                pointerEvents: introPhase === "out" ? "none" : "auto",
            } },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" } },
                React.createElement("div", { className: "intro-glow", style: {
                        position: "absolute", width: 200, height: 200, borderRadius: "50%",
                        background: `radial-gradient(circle, ${COLORS.bgSoft} 0%, transparent 70%)`,
                    } }),
                React.createElement("div", { style: {
                        fontFamily: FONT_LOGO, fontSize: 44, fontWeight: 500, letterSpacing: 1.5,
                        ...emboss,
                    } },
                    React.createElement("span", { className: "intro-to" }, "to"),
                    React.createElement("span", { className: "intro-slash" }, "/"),
                    React.createElement("span", { className: "intro-do" }, "do")),
                React.createElement("div", { style: {
                        marginTop: 16, width: 26, height: 26, borderRadius: "50%",
                        border: `1.6px solid ${introChecked ? COLORS.sage : COLORS.creamMuted}`,
                        background: introChecked ? `linear-gradient(135deg, ${COLORS.sage}, ${COLORS.teal})` : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.3s ease, border-color 0.3s ease",
                    } }, introChecked && React.createElement(Check, { className: "check-pop", size: 15, color: "#fff", strokeWidth: 3 }))))),
        React.createElement("div", { style: {
                position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
                background: `radial-gradient(ellipse at 30% 15%, rgba(255,255,255,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(0,0,0,0.14) 0%, transparent 60%)`,
            } }),
        React.createElement("div", { style: { width: "100%", maxWidth: 440, minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 } },
            React.createElement("div", { style: { padding: "calc(env(safe-area-inset-top, 20px) + 18px) 20px 8px" } },
                React.createElement("div", { style: { fontFamily: FONT_LOGO, fontSize: 24, fontWeight: 500, letterSpacing: 0.8, ...emboss } }, "to/do"),
                React.createElement("div", { style: { fontSize: 12.5, color: COLORS.creamMuted, marginTop: 6 } }, dateStr)),
            React.createElement("div", { style: { flex: 1, padding: "16px 20px 110px", overflowY: "auto", position: "relative" } },
                React.createElement("div", { key: tab, className: "tab-panel" },
                    tab === "today" && React.createElement(TodayView, { tasks: tasks, onToggle: toggleTask, onDelete: deleteTask, onReorder: reorderTasks }),
                    tab === "tasks" && React.createElement(TasksView, { tasks: tasks, onToggle: toggleTask, onDelete: deleteTask, onReorder: reorderTasks }),
                    tab === "calendar" && (React.createElement(CalendarView, { tasks: tasks, onToggle: toggleTask, onDelete: deleteTask, onReorder: reorderTasks, refDate: calRefDate, setRefDate: setCalRefDate, zoom: calZoom, setZoom: setCalZoom })),
                    tab === "habits" && React.createElement(HabitsView, { habits: habits, onToggle: toggleHabit, onDelete: deleteHabit }),
                    tab === "expenses" && (React.createElement(ExpensesView, { expenses: expenses, budgets: budgets, savings: savings, monthRef: expenseMonthRef, setMonthRef: setExpenseMonthRef, onDeleteExpense: deleteExpense, onOpenBudgets: () => setBudgetModalOpen(true) })),
                    tab === "grocery" && (React.createElement(GroceryView, { meals: meals, setMeals: setMeals, ingredients: ingredients, pantry: pantry, onAddIngredient: addIngredient, onRemoveIngredient: removeIngredient, onAddPantry: addPantryItem, onRemovePantry: removePantryItem, onBuyItem: buyIngredient })),
                    tab === "period" && React.createElement(PeriodView, { periodDays: periodDays, onToggleDay: togglePeriodDay }),
                    tab === "quote" && React.createElement(InspireView, null))),
            tab !== "quote" && tab !== "grocery" && tab !== "period" && (React.createElement("button", { className: "clean-btn", onClick: () => setModalOpen(true), "aria-label": "Add", style: {
                    position: "fixed", right: "max(20px, calc(50% - 200px))", bottom: 98,
                    width: 38, height: 38, borderRadius: "50%", border: "none",
                    background: COLORS.cream, zIndex: 2,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(20,30,38,0.3)",
                } },
                React.createElement(Plus, { size: 16, color: COLORS.sageDeep, strokeWidth: 2.4 }))),
            React.createElement("div", { style: {
                    position: "sticky", bottom: 0, left: 0, right: 0, zIndex: 1,
                    background: COLORS.surface, backdropFilter: GLASS_BLUR, WebkitBackdropFilter: GLASS_BLUR,
                    borderTop: `1px solid ${COLORS.border}`,
                    display: "flex", overflowX: "auto", WebkitOverflowScrolling: "touch",
                    padding: "10px 8px calc(10px + env(safe-area-inset-bottom))",
                } }, TABS.map((t) => {
                const Icon = t.icon;
                const active = tab === t.key;
                return (React.createElement("button", { key: t.key, className: "clean-btn", onClick: () => setTab(t.key), style: {
                        flexShrink: 0, minWidth: 58, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                        border: "none", background: active ? COLORS.sageLight : "transparent", borderRadius: 14,
                        padding: "6px 8px", position: "relative",
                    } },
                    React.createElement(Icon, { size: 18, color: active ? COLORS.sageDeep : COLORS.textFaint, strokeWidth: active ? 2.3 : 1.8 }),
                    React.createElement("span", { style: { fontSize: 9.5, fontWeight: active ? 700 : 500, color: active ? COLORS.sageDeep : COLORS.textFaint, whiteSpace: "nowrap" } }, t.label)));
            }))),
        modalOpen && tab === "habits" && (React.createElement(AddHabitModal, { onClose: () => setModalOpen(false), onSave: addHabit })),
        modalOpen && tab === "expenses" && (React.createElement(AddExpenseModal, { onClose: () => setModalOpen(false), onSaveExpense: addExpense, onSaveSavings: addSavings })),
        modalOpen && tab !== "habits" && tab !== "expenses" && tab !== "grocery" && tab !== "quote" && tab !== "period" && (React.createElement(AddTaskModal, { onClose: () => setModalOpen(false), onSave: addTask, defaultDate: defaultTaskDate })),
        budgetModalOpen && (React.createElement(BudgetModal, { budgets: budgets, onClose: () => setBudgetModalOpen(false), onSave: saveBudgets }))));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
