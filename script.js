/* --- GLOBAL DATA --- */
const kanjiData = [
    { lesson: 1, title: "Pictographs 1", chars: [
        {k: "山", r: "やま", m: "Mountain"}, {k: "川", r: "かわ", m: "River"}, {k: "田", r: "た", m: "Rice Field"}, {k: "日", r: "ひ / にち", m: "Sun/Day"}, {k: "月", r: "つき / げつ", m: "Moon/Month"}, 
        {k: "火", r: "ひ / か", m: "Fire"}, {k: "水", r: "みず / すい", m: "Water"}, {k: "木", r: "き / もく", m: "Tree"}, {k: "金", r: "かね / きん", m: "Gold/Money"}, {k: "土", r: "つち / ど", m: "Soil/Earth"}
    ]},
    { lesson: 2, title: "Numbers", chars: [
        {k: "一", r: "いち", m: "One"}, {k: "二", r: "に", m: "Two"}, {k: "三", r: "さん", m: "Three"}, {k: "四", r: "よん / し", m: "Four"}, {k: "五", r: "ご", m: "Five"}, 
        {k: "六", r: "ろく", m: "Six"}, {k: "七", r: "なな / しち", m: "Seven"}, {k: "八", r: "はち", m: "Eight"}, {k: "九", r: "きゅう", m: "Nine"}, {k: "十", r: "じゅう", m: "Ten"}
    ]},
    { lesson: 3, title: "Numbers & Signs", chars: [
        {k: "百", r: "ひゃく", m: "Hundred"}, {k: "千", r: "せん", m: "Thousand"}, {k: "万", r: "まん", m: "Ten Thousand"}, {k: "円", r: "えん", m: "Yen"}, {k: "年", r: "とし / ねん", m: "Year"}, 
        {k: "上", r: "うえ", m: "Up/Above"}, {k: "下", r: "した", m: "Down/Below"}, {k: "中", r: "なか", m: "Middle/Inside"}, {k: "半", r: "はん", m: "Half"}, {k: "分", r: "ふん / ぶん", m: "Minute/Part"}
    ]},
    { lesson: 4, title: "Pictographs 2", chars: [
        {k: "人", r: "ひと / じん", m: "Person"}, {k: "子", r: "こ", m: "Child"}, {k: "女", r: "おんな", m: "Woman"}, {k: "男", r: "おとこ", m: "Man"}, {k: "目", r: "め", m: "Eye"}, 
        {k: "口", r: "くち", m: "Mouth"}, {k: "耳", r: "みみ", m: "Ear"}, {k: "手", r: "て", m: "Hand"}, {k: "足", r: "あし", m: "Leg/Foot"}, {k: "力", r: "ちから", m: "Power"}
    ]},
    { lesson: 5, title: "Pictographs 3", chars: [
        {k: "父", r: "ちち", m: "Father"}, {k: "母", r: "はは", m: "Mother"}, {k: "先", r: "さき / せん", m: "Previous"}, {k: "生", r: "せい", m: "Life/Birth"}, {k: "学", r: "がく", m: "Study"}, 
        {k: "校", r: "こう", m: "School"}, {k: "友", r: "とも", m: "Friend"}, {k: "本", r: "ほん", m: "Book"}, {k: "毎", r: "まい", m: "Every"}, {k: "何", r: "なに / なん", m: "What"}
    ]},
    { lesson: 6, title: "Directions", chars: [
        {k: "前", r: "まえ", m: "Front/Before"}, {k: "後", r: "あと / うしろ", m: "Back/After"}, {k: "外", r: "そと / がい", m: "Outside"}, {k: "左", r: "ひだり", m: "Left"}, {k: "右", r: "みぎ", m: "Right"}, 
        {k: "東", r: "ひがし", m: "East"}, {k: "西", r: "にし", m: "West"}, {k: "南", r: "みなみ", m: "South"}, {k: "北", r: "きた", m: "North"}, {k: "名", r: "な / めい", m: "Name"}
    ]},
    { lesson: 7, title: "Pictographs 4", chars: [
        {k: "牛", r: "うし", m: "Cow"}, {k: "馬", r: "うま", m: "Horse"}, {k: "魚", r: "さかな", m: "Fish"}, {k: "貝", r: "かい", m: "Shellfish"}, {k: "雨", r: "あめ", m: "Rain"}, 
        {k: "天", r: "てん", m: "Heaven"}, {k: "気", r: "き", m: "Spirit"}, {k: "車", r: "くるま", m: "Car"}, {k: "門", r: "もん", m: "Gate"}, {k: "午", r: "ご", m: "Noon"}
    ]},
    { lesson: 8, title: "Adjectives", chars: [
        {k: "大", r: "おお(きい)", m: "Big"}, {k: "小", r: "ちい(さい)", m: "Small"}, {k: "高", r: "たか(い)", m: "High/Exp"}, {k: "安", r: "やす(い)", m: "Cheap"}, {k: "新", r: "あたら(しい)", m: "New"}, 
        {k: "古", r: "ふる(い)", m: "Old"}, {k: "長", r: "なが(い)", m: "Long"}, {k: "多", r: "おお(い)", m: "Many"}, {k: "少", r: "すく(ない)", m: "Few"}, {k: "早", r: "はや(い)", m: "Early"}
    ]},
    { lesson: 9, title: "Verbs", chars: [
        {k: "行", r: "い(く)", m: "Go"}, {k: "来", r: "く(る)", m: "Come"}, {k: "食", r: "た(べる)", m: "Eat"}, {k: "見", r: "み(る)", m: "See"}, {k: "入", r: "はい(る)", m: "Enter"}, 
        {k: "出", r: "で(る)", m: "Exit"}, {k: "立", r: "た(つ)", m: "Stand"}, {k: "書", r: "か(く)", m: "Write"}, {k: "言", r: "い(う)", m: "Say"}, {k: "飲", r: "の(む)", m: "Drink"}
    ]},
    { lesson: 10, title: "Combinations 1", chars: [
        {k: "話", r: "はな(す)", m: "Speak"}, {k: "読", r: "よ(む)", m: "Read"}, {k: "語", r: "ご", m: "Language"}, {k: "間", r: "あいだ", m: "Between"}, {k: "聞", r: "き(く)", m: "Listen"}, 
        {k: "買", r: "か(う)", m: "Buy"}, {k: "休", r: "やす(む)", m: "Rest"}, {k: "時", r: "とき / じ", m: "Time"}, {k: "週", r: "しゅう", m: "Week"}, {k: "道", r: "みち", m: "Road"}
    ]},
    { lesson: 11, title: "Combinations 2", chars: [
        {k: "今", r: "いま", m: "Now"}, {k: "会", r: "あ(う) / かい", m: "Meet"}, {k: "社", r: "しゃ", m: "Company"}, {k: "店", r: "みせ", m: "Shop"}, {k: "駅", r: "えき", m: "Station"}, 
        {k: "花", r: "はな", m: "Flower"}, {k: "国", r: "くに", m: "Country"}, {k: "白", r: "しろ", m: "White"}, {k: "空", r: "そら", m: "Sky"}, {k: "電", r: "でん", m: "Electricity"}
    ]},
    { lesson: 12, title: "Adjectives & Verbs", chars: [
        {k: "明", r: "あか(るい)", m: "Bright"}, {k: "暗", r: "くら(い)", m: "Dark"}, {k: "広", r: "ひろ(い)", m: "Wide"}, {k: "近", r: "ちか(い)", m: "Near"}, {k: "遠", r: "とお(い)", m: "Far"},
        {k: "強", r: "つよ(い)", m: "Strong"}, {k: "弱", r: "よわ(い)", m: "Weak"}, {k: "重", r: "おも(い)", m: "Heavy"}, {k: "軽", r: "かる(い)", m: "Light"}, {k: "良", r: "よ(い)", m: "Good"}
    ]},
    { lesson: 13, title: "Action Verbs", chars: [
        {k: "始", r: "はじ(める)", m: "To start"}, {k: "終", r: "お(わる)", m: "To end"}, {k: "使", r: "つか(う)", m: "To use"}, {k: "作", r: "つく(る)", m: "To make"}, {k: "持", r: "も(つ)", m: "To hold"},
        {k: "待", r: "ま(つ)", m: "To wait"}, {k: "開", r: "あ(ける)", m: "To open"}, {k: "閉", r: "し(める)", m: "To close"}, {k: "帰", r: "かえ(る)", m: "To return"}, {k: "思", r: "おも(う)", m: "To think"}
    ]},
    { lesson: 14, title: "Movement & Daily Life", chars: [
        {k: "走", r: "はし(る)", m: "To run"}, {k: "歩", r: "ある(く)", m: "To walk"}, {k: "起", r: "お(きる)", m: "To wake up"}, {k: "寝", r: "ね(る)", m: "To sleep"}, {k: "働", r: "はたら(く)", m: "To work"},
        {k: "洗", r: "あら(う)", m: "To wash"}, {k: "借", r: "か(りる)", m: "To borrow"}, {k: "貸", r: "か(す)", m: "To lend"}, {k: "送", r: "おく(る)", m: "To send"}, {k: "教", r: "おし(える)", m: "To teach"}
    ]},
    { lesson: 15, title: "Social Actions", chars: [
        {k: "習", r: "なら(う)", m: "To learn"}, {k: "勉", r: "べん(きょう)", m: "To study"}, {k: "強", r: "きょう", m: "Strong"}, {k: "忘", r: "わす(れる)", m: "To forget"}, {k: "有", r: "あ(る)", m: "To exist"},
        {k: "住", r: "す(む)", m: "To reside"}, {k: "知", r: "し(る)", m: "To know"}, {k: "作", r: "つく(る)", m: "To make"}, {k: "使", r: "つか(う)", m: "To use"}, {k: "借", r: "か(りる)", m: "To borrow"}
    ]}
];

/* --- CORE FUNCTIONS --- */

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navTabs = document.getElementById('navTabs');

    // 1. Mobile Menu Logic
    if (menuToggle && navTabs) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navTabs.classList.toggle('active');
        });
    }

    // 2. Tab Selection & Mobile Auto-Close
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            e.currentTarget.classList.add('active');

            // Close mobile menu
            if (window.innerWidth < 768 && menuToggle && navTabs) {
                menuToggle.classList.remove('active');
                navTabs.classList.remove('active');
            }
        });
    });

    // 3. Initial Vocab category check
    const vocabContainer = document.getElementById('vocabulary');
    if (vocabContainer && vocabContainer.classList.contains('active')) {
        // Detect language and show default
        if (document.getElementById('jp-numbers')) showVocabCategory('jp-numbers');
        else if (document.getElementById('fr-numbers')) showVocabCategory('fr-numbers');
    }
});

// Main Tab Switcher (JP and FR)
function switchTab(tabId) {
    // Hide all main content areas
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    // Show the target one
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
    
    // Kanji Initialization Logic
    if (tabId === 'kanji' && document.getElementById('kanji-container')) {
        if (document.getElementById('kanji-container').children.length === 0) {
            initKanji();
        }
    }

    // Default Vocab Logic
    if (tabId === 'vocabulary') {
        // Reset mobile picker bar state on tab switch
        const bar = document.getElementById('vocab-picker-bar');
        const menu = document.querySelector('#vocabulary .vocab-menu');
        if (bar) bar.style.display = 'none';
        if (menu) menu.classList.remove('is-collapsed');

        if (document.getElementById('jp-numbers')) showVocabCategory('jp-numbers');
        else if (document.getElementById('fr-numbers')) showVocabCategory('fr-numbers');
    }
}

// Sub-Tab / Bookmark Switcher (e.g., Verbs section)
function openSubTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("inner-tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    const tablinks = document.getElementsByClassName("inner-tab-btn");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    const target = document.getElementById(tabName);
    if (target) target.style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Vocab Category Grid Switcher
function showVocabCategory(category) {
    document.querySelectorAll('.vocab-category').forEach(el => el.style.display = 'none');
    const target = document.getElementById(category);
    if (target) target.style.display = 'grid';

    // Mobile-only: collapse the button grid and show the compact picker bar
    if (window.innerWidth < 768) {
        const menu = document.querySelector('#vocabulary .vocab-menu');
        const bar  = document.getElementById('vocab-picker-bar');
        if (menu) menu.classList.add('is-collapsed');
        if (bar) {
            // Grab label from the clicked button (emoji + text)
            const btn = document.querySelector(`.vocab-btn[onclick*="'${category}'"]`);
            const label = btn ? btn.textContent.trim() : category;
            const labelEl = bar.querySelector('.vocab-picker-label');
            if (labelEl) labelEl.textContent = label;
            bar.style.display = 'flex';
        }
        // Scroll to the content area so user sees it immediately
        const tables = document.getElementById('vocab-tables');
        if (tables) tables.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Restore the full vocab menu (called by "← Topics" button on mobile)
function showVocabMenu() {
    const menu = document.querySelector('#vocabulary .vocab-menu');
    const bar  = document.getElementById('vocab-picker-bar');
    if (menu) menu.classList.remove('is-collapsed');
    if (bar) bar.style.display = 'none';
    // Clear displayed category so user sees the menu in isolation
    document.querySelectorAll('.vocab-category').forEach(el => el.style.display = 'none');
    // Scroll menu into view
    if (menu) menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Kanji List Builder
function initKanji() {
    const container = document.getElementById('kanji-container');
    if (!container) return;

    kanjiData.forEach(lesson => {
        const lessonDiv = document.createElement('div');
        lessonDiv.className = 'kanji-lesson';
        
        const header = document.createElement('div');
        header.className = 'kanji-lesson-header';
        header.innerHTML = `<h3>Lesson ${lesson.lesson}: ${lesson.title}</h3>`;
        lessonDiv.appendChild(header);
        
        const charsDiv = document.createElement('div');
        charsDiv.className = 'kanji-chars';
        lesson.chars.forEach(char => {
            const charDiv = document.createElement('div');
            charDiv.className = 'kanji-char';
            charDiv.innerHTML = `
                <div class="kanji-symbol">${char.k}</div>
                <div class="kanji-reading">${char.r}</div>
                <div class="kanji-meaning">${char.m}</div>
            `;
            charsDiv.appendChild(charDiv);
        });
        lessonDiv.appendChild(charsDiv);
        container.appendChild(lessonDiv);
    });
}