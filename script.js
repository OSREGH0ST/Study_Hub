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

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navTabs = document.getElementById('navTabs');

    if (menuToggle && navTabs) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navTabs.classList.toggle('active');
        });
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            if (window.innerWidth < 768 && menuToggle && navTabs) {
                menuToggle.classList.remove('active');
                navTabs.classList.remove('active');
            }
        });
    });

    const vocabContainer = document.getElementById('vocabulary');
    if (vocabContainer && vocabContainer.classList.contains('active')) {
        if (document.getElementById('jp-numbers')) showVocabCategory('jp-numbers');
        else if (document.getElementById('fr-numbers')) showVocabCategory('fr-numbers');
    }
});

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');

    if (tabId === 'kanji' && document.getElementById('kanji-container')) {
        if (document.getElementById('kanji-container').children.length === 0) {
            initKanji();
        }
    }

    if (tabId === 'vocabulary') {
        const bar = document.getElementById('vocab-picker-bar');
        const menu = document.querySelector('#vocabulary .vocab-menu');
        if (bar) bar.style.display = 'none';
        if (menu) menu.classList.remove('is-collapsed');
        if (document.getElementById('jp-numbers')) showVocabCategory('jp-numbers');
        else if (document.getElementById('fr-numbers')) showVocabCategory('fr-numbers');
    }

    if (tabId === 'practice') {
        initPractice();
    }
}

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

function showVocabCategory(category) {
    document.querySelectorAll('.vocab-category').forEach(el => el.style.display = 'none');
    const target = document.getElementById(category);
    if (target) target.style.display = 'grid';

    if (window.innerWidth < 768) {
        const menu = document.querySelector('#vocabulary .vocab-menu');
        const bar  = document.getElementById('vocab-picker-bar');
        if (menu) menu.classList.add('is-collapsed');
        if (bar) {
            const btn = document.querySelector(`.vocab-btn[onclick*="'${category}'"]`);
            const label = btn ? btn.textContent.trim() : category;
            const labelEl = bar.querySelector('.vocab-picker-label');
            if (labelEl) labelEl.textContent = label;
            bar.style.display = 'flex';
        }
        const tables = document.getElementById('vocab-tables');
        if (tables) tables.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showVocabMenu() {
    const menu = document.querySelector('#vocabulary .vocab-menu');
    const bar  = document.getElementById('vocab-picker-bar');
    if (menu) menu.classList.remove('is-collapsed');
    if (bar) bar.style.display = 'none';
    document.querySelectorAll('.vocab-category').forEach(el => el.style.display = 'none');
    if (menu) menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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

/* ============================================
   PRACTICE MODULE
   ============================================ */

const PROXY_URL = 'https://api-management.owensanrios.workers.dev';

const FRENCH_PRACTICE_TOPICS = [
    { id: 'fr-prac-grammar', label: 'Articles & Pronouns', icon: '📖', color: '#60a5fa', content: `FRENCH ARTICLES:\nDefinite (the): le=masc.sing, la=fem.sing, l'=before vowel, les=plural\nIndefinite (a/some): un=masc.sing, une=fem.sing, des=plural\nPartitives (some/any): du=masc, de la=fem, de l'=vowel, des=plural\nDemonstratives (this/that): ce=masc, cet=masc+vowel, cette=fem, ces=plural\n\nPERSONAL PRONOUNS:\nje=I, tu=you(informal), il/elle=he/she, nous=we, vous=you(formal/plural), ils/elles=they\n\nNEGATION (ne...pas sandwich):\nJe ne parle pas. Use n' before vowel: Je n'ai pas.\nAll partitives become DE in negation: Je ne mange pas de pommes.\n\nOBLIGATION:\nIl faut + infinitive = one must. Il ne faut pas = one must not.\nJe devrais / Tu devrais + infinitive = I/you should.` },

    { id: 'fr-prac-present', label: 'Present Tense', icon: '⚡', color: '#fbbf24', content: `FRENCH PRESENT TENSE:\n-ER (parler): je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent\n-IR (finir): je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent\n-RE (vendre): je vends, tu vends, il vend, nous vendons, vous vendez, ils vendent\n\nIRREGULAR VERBS:\nêtre(to be): suis,es,est,sommes,êtes,sont\navoir(to have): ai,as,a,avons,avez,ont\naller(to go): vais,vas,va,allons,allez,vont\nfaire(to do/make): fais,fais,fait,faisons,faites,font\npouvoir(can): peux,peux,peut,pouvons,pouvez,peuvent\nvouloir(to want): veux,veux,veut,voulons,voulez,veulent\ndevoir(must): dois,dois,doit,devons,devez,doivent\nvenir(to come): viens,viens,vient,venons,venez,viennent\nsavoir(to know): sais,sais,sait,savons,savez,savent` },

    { id: 'fr-prac-passe', label: 'Passé Composé', icon: '📅', color: '#f87171', content: `PASSÉ COMPOSÉ — Structure: Subject + Avoir/Être + Past Participle\n\nAVOIR (default, 95% of verbs): J'ai mangé, Nous avons fini\nÊTRE (movement verbs + pronominal verbs): Elle est allée, Ils se sont réveillés\nNote: être verbs need gender/number agreement on past participle.\n\nPAST PARTICIPLES:\n-ER verbs → -é: parler=parlé, aller=allé, manger=mangé, demander=demandé\n-IR verbs → -i: finir=fini, choisir=choisi\nIrregular: avoir=eu, être=été, faire=fait, prendre=pris, voir=vu, boire=bu, lire=lu, comprendre=compris\n\n14 ÊTRE MOVEMENT VERBS:\naller,venir,entrer,sortir,arriver,partir,monter,descendre,naître,mourir,rester,tomber,retourner,devenir\n\nPRONOMINAL VERBS (always être): se réveiller,se lever,se laver,s'habiller,se coucher,se doucher,s'endormir,se promener` },

    { id: 'fr-prac-futur', label: 'Future Tenses', icon: '🔮', color: '#c084fc', content: `FUTUR PROCHE (near future — going to):\nStructure: aller (conjugated present) + infinitive\nJe vais manger = I am going to eat\nTu vas partir = You are going to leave\nNous allons étudier = We are going to study\n\nFUTUR SIMPLE (simple future — will):\nStructure: Full verb stem + endings: -ai,-as,-a,-ons,-ez,-ont\nJe mangerai = I will eat, Tu parleras = You will speak\nIrregular stem: aller → ir- (J'irai = I will go)` },

    { id: 'fr-prac-adjectives', label: 'Adjectives & Possession', icon: '🎨', color: '#c084fc', content: `POSSESSIVE ADJECTIVES (match the noun's gender/number):\nmon/ma/mes=my, ton/ta/tes=your, son/sa/ses=his/her\nnotre/notre/nos=our, votre/votre/vos=your(formal), leur/leur/leurs=their\nVowel rule: use masculine form before feminine nouns starting with vowel (mon amie, not ma amie)\n\nADJECTIVE PLACEMENT:\nMost go AFTER noun: chat noir, maison blanche\nBAGS adjectives go BEFORE: petit chat, beau garçon\nBAGS = Beauty(beau/joli), Age(jeune/vieux), Goodness(bon/mauvais), Size(grand/petit)\n\nCOLORS: blanc(he)=white, noir(e)=black, rouge=red, bleu(e)=blue, vert(e)=green, jaune=yellow, marron=brown, gris(e)=grey, rose=pink, violet(te)=purple\nSIZE/APPEARANCE: grand(e)=tall/big, petit(e)=small, gros(se)=fat, mince=slim, fort(e)=strong, beau/belle=beautiful\nPERSONALITY: gentil(le)=kind, méchant(e)=mean, drôle=funny, intelligent(e), content(e)=happy, triste=sad, fatigué(e)=tired, fâché(e)=angry` },

    { id: 'fr-prac-adverbs', label: 'Adverbs', icon: '📍', color: '#f59e0b', content: `FREQUENCY ADVERBS (scale never→always):\njamais=never, rarement=rarely, parfois=sometimes, souvent=often, d'habitude=usually, toujours=always\n\nLOCATION PREPOSITIONS:\nsur=on, sous=under, devant=in front, derrière=behind\nà droite=right, à gauche=left, dans=inside, dehors=outside\nà côté de=next to, près de=near, entre=between\n\nMANNER & TIME:\nrapidement=quickly, lentement=slowly, bien=well, mal=badly\naujourd'hui=today, demain=tomorrow, hier=yesterday, maintenant=now, bientôt=soon\n\nDEGREE:\ntrès=very, trop=too much, assez=enough, beaucoup=a lot, un peu=a little\nDE/D' rule: quantity adverbs before nouns require de/d': beaucoup d'amis, un peu de lait` },

    { id: 'fr-prac-numbers', label: 'Numbers', icon: '🔢', color: '#60a5fa', content: `FRENCH NUMBERS:\n0=zéro,1=un/une,2=deux,3=trois,4=quatre,5=cinq,6=six,7=sept,8=huit,9=neuf,10=dix\n11=onze,12=douze,13=treize,14=quatorze,15=quinze,16=seize\n17=dix-sept,18=dix-huit,19=dix-neuf,20=vingt\n30=trente,40=quarante,50=cinquante,60=soixante\n70=soixante-dix,80=quatre-vingts,90=quatre-vingt-dix\n100=cent,1000=mille,1000000=un million` },

    { id: 'fr-prac-time', label: 'Time & Weather', icon: '☁️', color: '#22d3ee', content: `DAYS: lundi=Monday,mardi=Tuesday,mercredi=Wednesday,jeudi=Thursday,vendredi=Friday,samedi=Saturday,dimanche=Sunday\nMONTHS: janvier,février,mars,avril,mai,juin,juillet,août,septembre,octobre,novembre,décembre\nSEASONS: printemps=spring,été=summer,automne=autumn,hiver=winter\n\nTIME EXPRESSIONS:\naujourd'hui=today,hier=yesterday,demain=tomorrow,maintenant=now,bientôt=soon\nle matin=morning,l'après-midi=afternoon,le soir=evening,la nuit=night,midi=noon,minuit=midnight\ncette semaine=this week\n\nWEATHER (Il fait / Il y a):\nIl fait beau=sunny,Il fait chaud=hot,Il fait froid=cold\nIl pleut=it rains,Il neige=it snows\nIl y a du vent=windy,Il y a des nuages=cloudy\norage=storm,brouillard=fog` },

    { id: 'fr-prac-travel', label: 'Travel & Nations', icon: '✈️', color: '#10b981', content: `TRANSPORT: train,métro=subway,bus,taxi,vélo=bicycle,voiture=car,avion=airplane\nTRAVEL ITEMS: billet=ticket,passeport=passport,aéroport=airport,hôtel=hotel,carte/plan=map\n\nNATIONALITIES:\nAméricain(e)=American,Français(e)=French,Espagnol(e)=Spanish\nAllemand(e)=German,Japonais(e)=Japanese,Chinois(e)=Chinese\nItalien(ne)=Italian,Canadien(ne)=Canadian,Turc/Turque=Turkish\nBelge=Belgian(invariable),Suisse=Swiss(invariable)\n\nPREPOSITIONS for countries:\nEN — feminine or vowel-start countries: en France,en Italie,en Espagne,en Allemagne\nAU — masculine countries: au Mexique,au Japon,au Canada\nAUX — plural countries: aux États-Unis\nÀ — cities: à Paris,à Tokyo,à Londres` },

    { id: 'fr-prac-family', label: 'Family', icon: '👨‍👩‍👧', color: '#f472b6', content: `FRENCH FAMILY VOCABULARY:\npère=father,mère=mother,frère=brother,sœur=sister\nfils=son,fille=daughter\ngrand-père=grandfather,grand-mère=grandmother\noncle=uncle,tante=aunt,cousin(e)=cousin\nmari=husband,femme=wife` },

    { id: 'fr-prac-house', label: 'House', icon: '🏠', color: '#fb923c', content: `KITCHEN: frigo=refrigerator,cuisinière=stove,micro-ondes=microwave,casserole=pot,poêle=pan,couteau=knife,cuillère=spoon,fourchette=fork,assiette=plate\n\nBEDROOM: lit=bed,oreiller=pillow,couverture=blanket,armoire=wardrobe,miroir=mirror,lampe=lamp,bureau=desk,tiroir=drawer\n\nBATHROOM: toilettes=toilet,lavabo=sink,baignoire=bathtub,douche=shower,serviette=towel,savon=soap,brosse à dents=toothbrush,shampooing=shampoo\n\nLIVING ROOM: canapé=sofa,fauteuil=armchair,table basse=coffee table,télévision=TV,étagère=bookshelf,rideaux=curtains,tapis=rug\n\nGENERAL: porte=door,fenêtre=window,mur=wall,plancher=floor,plafond=ceiling,escalier=staircase,couloir=hallway,clé=key` },

    { id: 'fr-prac-body', label: 'Body & Health', icon: '👤', color: '#fbbf24', content: `BODY PARTS:\ntête=head,œil/yeux=eye/eyes,nez=nose,bouche=mouth,oreille=ear,cheveux=hair\nmain=hand,bras=arm,jambe=leg,pied=foot,cœur=heart,dos=back,dents=teeth,ventre=stomach\n\nEXPRESSING PAIN — Structure: avoir + mal + à (au/à la/à l'/aux):\nj'ai mal à la tête=headache\nj'ai mal au ventre=stomachache\nj'ai mal aux dents=toothache\nj'ai mal au dos=backache` },

    { id: 'fr-prac-phrases', label: 'Common Phrases', icon: '💬', color: '#22d3ee', content: `GREETINGS:\nBonjour=Hello,Bonsoir=Good evening,Au revoir=Goodbye,À demain=See you tomorrow\nComment allez-vous?=How are you?,Ça va bien merci=I'm fine thanks,Enchanté(e)=Nice to meet you\n\nESSENTIAL QUESTIONS:\nQuel est votre nom?=What is your name?,Quel âge avez-vous?=How old are you?\nD'où venez-vous?=Where are you from?,Parlez-vous anglais?=Do you speak English?\nPouvez-vous m'aider?=Can you help me?,Qu'est-ce que c'est?=What is this?\n\nSHOPPING & DINING:\nCombien ça coûte?=How much does it cost?,Je voudrais...=I would like...\nL'addition s'il vous plaît=The bill please,Le menu s'il vous plaît=The menu please\n\nDIRECTIONS:\nOù est...?=Where is...?,Tournez à gauche=Turn left,Tournez à droite=Turn right,Tout droit=Straight ahead\n\nEMERGENCY:\nÀ l'aide!=Help!,Je suis perdu(e)=I'm lost\nJe ne comprends pas=I don't understand,J'ai besoin d'un médecin=I need a doctor` },
];

const JAPANESE_PRACTICE_TOPICS = [
    { id: 'jp-prac-particles', label: 'Particles', icon: '🔗', color: '#60a5fa', content: `JAPANESE PARTICLES:\nは(wa)=topic marker, が(ga)=subject marker, を(wo)=direct object\nに(ni)=time or destination, で(de)=place of action or means, へ(e)=direction\nと(to)=with / and (complete list), や(ya)=and (incomplete list)\nの(no)=possession, も(mo)=also/too, から(kara)=from, まで(made)=until\n\nDEMONSTRATIVES (こそあど system):\nKO=near me, SO=near you, A=far away, DO=question\nこの/その/あの/どの + noun = this/that/that far/which noun\nこれ/それ/あれ/どれ = this/that/that far/which (standalone things)\nここ/そこ/あそこ/どこ = here/there/over there/where (places)\nこちら/そちら/あちら/どちら = this way/that way/that way far/which way\n\nSENTENCE STRUCTURE: Time + Topic + Place + Object + Verb\nきのうわたしはとしょかんでほんをよみました。` },

    { id: 'jp-prac-masu', label: 'Masu Form', icon: '⚡', color: '#fbbf24', content: `MASU FORM TENSES (polite/formal):\nPresent (+): ~ます  たべます=I eat\nPresent (-): ~ません  たべません=I don't eat\nPast (+): ~ました  たべました=I ate\nPast (-): ~ませんでした  たべませんでした=I didn't eat\n\nINVITATIONS (drop ます, add ending):\n~ましょう = Let's~  (いきましょう=Let's go)\n~ませんか = Won't you~?  (のみませんか=Won't you drink?)\n~ましょうか = Shall I/we~?  (てつだいましょうか=Shall I help?)\n\nCOMMON VERBS (masu form):\nいきます=go,きます=come,かえります=return home\nたべます=eat,のみます=drink,みます=see/watch,ききます=listen\nよみます=read,かきます=write,はなします=speak\nかいます=buy,やすみます=rest,べんきょうします=study\nおきます=wake up,ねます=sleep,はたらきます=work\nわかります=understand,あげます=give,もらいます=receive\nかします=lend,かります=borrow,おしえます=teach,ならいます=learn` },

    { id: 'jp-prac-te', label: 'Te Form', icon: '🧩', color: '#f472b6', content: `TE FORM CONJUGATION RULES (from ます form):\nGroup 2 (Ru-verbs): drop ます, add て\n  たべます→たべて, みます→みて\nGroup 1 (U-verbs) — look at syllable before ます:\n  い/ち/り → って:  かいます→かって, まちます→まって, かえります→かえって\n  み/び/に → んで:  のみます→のんで, よびます→よんで\n  き → いて:  かきます→かいて, ききます→きいて\n  ぎ → いで:  およぎます→およいで\n  し → して:  はなします→はなして\n  EXCEPTION: いきます→いって (NOT いいて)\nGroup 3 (Irregular): します→して, きます→きて\n\nTE FORM POWER-UPS:\n~ている = ongoing action (たべています=I am eating)\n~てある = intentional completed state (かいてあります=it has been written)\n~てください = please do (まってください=please wait)\n~てから = after doing X (たべてから=after eating)\n~てもいいです = permission (みてもいいですか=may I look?)\n~てはいけません = prohibition/must not (のんではいけません=must not drink)\n~てしまいました = done accidentally or with regret (わすれてしまいました=I forgot)` },

    { id: 'jp-prac-adjectives', label: 'Adjectives', icon: '🎨', color: '#22d3ee', content: `I-ADJECTIVES (end in い — attach directly before noun):\nNegative: drop い, add くない\nおおきい=big,ちいさい=small,たかい=tall/expensive,ひくい=short,ながい=long,みじかい=short(length)\nあたらしい=new,ふるい=old,はやい=fast/early,おそい=slow\nあつい=hot(object),つめたい=cold(touch),あたたかい=warm,すずしい=cool\nおいしい=delicious,まずい=disgusting,あまい=sweet,からい=spicy,にがい=bitter,すっぱい=sour\nuれしい=happy,かなしい=sad,こわい=scary,いたい=painful,いそがしい=busy,あぶない=dangerous\nやさしい=gentle,おもしろい=funny,きびしい=strict,いい=good,わるい=bad\n\nNA-ADJECTIVES (add な before noun, じゃない for negative):\nきれい=beautiful/clean,しずか=quiet,げんき=energetic/healthy\nしんせつ=kind,まじめ=serious,ゆうめい=famous\nべんり=convenient,ふべん=inconvenient,かんたん=easy\nすき=like,きらい=dislike,たいせつ=important,ひま=free(time),たいへん=tough/hard\n\nCOLORS (I-adj): しろい=white,くろい=black,あかい=red,あおい=blue,きいろい=yellow,ちゃいろい=brown\nCOLORS (Noun, takes の): みどり=green,むらさき=purple,ピンク=pink,はいいろ=gray` },

    { id: 'jp-prac-numbers', label: 'Numbers', icon: '🔢', color: '#60a5fa', content: `BASIC NUMBERS:\n1=いち,2=に,3=さん,4=よん/し,5=ご,6=ろく,7=なな/しち,8=はち,9=きゅう/く,10=じゅう\n\nLARGE SCALE (Japanese groups by 4 zeros):\n100=ひゃく, 1000=せん, 10000=まん, 100,000,000=おく\n\nIRREGULAR SOUNDS (Hyaku/100s):\n300=さんびゃく, 600=ろっぴゃく, 800=はっぴゃく\n\nIRREGULAR SOUNDS (Sen/1000s):\n3000=さんぜん, 8000=はっせん\n\nIRREGULAR DAYS OF MONTH:\n1st=ついたち, 2nd=ふつか, 3rd=みっか, 4th=よっか, 10th=とおか, 20th=はつか` },

    { id: 'jp-prac-time', label: 'Time & Weather', icon: '⏰', color: '#6366f1', content: `DAYS OF WEEK:\nげつようび=Monday,かようび=Tuesday,すいようび=Wednesday\nもくようび=Thursday,きんようび=Friday,どようび=Saturday,にちようび=Sunday\n\nMONTHS: [number] + がつ\nいちがつ=January,にがつ=February,さんがつ=March,しがつ=April\nしちがつ=July,くがつ=September,じゅうにがつ=December\n\nTIME EXPRESSIONS:\nきょう=today,きのう=yesterday,あした=tomorrow\nこんしゅう=this week,せんしゅう=last week,らいしゅう=next week\nまいにち=every day,いま=now\nもう=already (with positive verb), まだ=not yet (with negative verb)\n\nWEATHER: はれ=sunny,くもり=cloudy,あめ=rain,ゆき=snow\nSEASONS: はる=spring,なつ=summer,あき=autumn,ふゆ=winter` },

    { id: 'jp-prac-family', label: 'Family', icon: '👨‍👩‍👧', color: '#facc15', content: `FAMILY VOCABULARY (polite forms for others' family):\nおとうさん=father,おかあさん=mother\nおにいさん=older brother,おねえさん=older sister\nおとうと=younger brother,いもうと=younger sister\nおじいさん=grandfather,おばあさん=grandmother\nおじさん=uncle,おばさん=aunt\nだんなさん=husband,おくさん=wife\n\nEXISTENCE VERBS:\nあります = exists / there is (inanimate objects and things)\nいます = exists / there is (people, animals, living things)\nExamples:\nほんがあります = There is a book.\nいぬがいます = There is a dog.\nせんせいがいます = There is a teacher.` },

    { id: 'jp-prac-body', label: 'Body & Health', icon: '👤', color: '#ef4444', content: `BODY PARTS:\nあたま=head,かお=face,め=eye,みみ=ear,はな=nose,くち=mouth\nて=hand,うで=arm,あし=leg/foot,からだ=body\nは=teeth,のど=throat,おなか=stomach\n\nEXPRESSING PAIN — Structure: [body part] + が + いたい:\nあたまがいたい = headache\nおなかがいたい = stomachache\nのどがいたい = sore throat\nはがいたい = toothache` },

    { id: 'jp-prac-kanji-basic', label: 'Kanji: Nature & Numbers', icon: '⛰️', color: '#fb923c', content: `NATURE KANJI (reading = くんよみ):\n山(やま)=mountain, 川(かわ)=river, 田(た)=rice field\n日(ひ/にち)=sun/day, 月(つき/げつ)=moon/month\n火(ひ/か)=fire, 水(みず/すい)=water, 木(き/もく)=tree\n金(かね/きん)=gold/money, 土(つち/ど)=soil/earth\n雨(あめ)=rain, 天(てん)=heaven, 空(そら)=sky\n\nNUMBER KANJI:\n一(いち)=1, 二(に)=2, 三(さん)=3, 四(よん/し)=4, 五(ご)=5\n六(ろく)=6, 七(なな/しち)=7, 八(はち)=8, 九(きゅう)=9, 十(じゅう)=10\n百(ひゃく)=100, 千(せん)=1000, 万(まん)=10000, 円(えん)=yen, 年(とし/ねん)=year` },

    { id: 'jp-prac-kanji-verbs', label: 'Kanji: Verbs & Directions', icon: '🎬', color: '#a78bfa', content: `VERB KANJI:\n行(い)=go, 来(く)=come, 食(た)=eat, 見(み)=see\n入(はい)=enter, 出(で)=exit, 書(か)=write, 言(い)=say\n飲(の)=drink, 話(はな)=speak, 読(よ)=read, 買(か)=buy\n休(やす)=rest, 聞(き)=listen\n\nACTION KANJI:\n始(はじ)=start, 終(お)=end, 使(つか)=use, 作(つく)=make\n待(ま)=wait, 開(あ)=open, 閉(し)=close, 帰(かえ)=return\n走(はし)=run, 歩(ある)=walk, 起(お)=wake up, 寝(ね)=sleep\n\nDIRECTION KANJI:\n東(ひがし)=east, 西(にし)=west, 南(みなみ)=south, 北(きた)=north\n上(うえ)=up/above, 下(した)=down/below, 中(なか)=inside/middle\n前(まえ)=front/before, 後(あと)=back/after, 左(ひだり)=left, 右(みぎ)=right` },
];

/* --- QUIZ STATE --- */
const quizState = {
    questions: [], current: 0, score: 0,
    answered: false, topic: null, answers: []
};

/* --- PRACTICE INIT --- */
function initPractice() {
    const grid = document.getElementById('practice-topic-grid');
    if (!grid || grid.children.length > 0) return;

    const lang = document.body.dataset.lang;
    const topics = lang === 'jp' ? JAPANESE_PRACTICE_TOPICS : FRENCH_PRACTICE_TOPICS;

    grid.innerHTML = topics.map(t => `
        <button class="practice-topic-card" onclick="startPractice('${t.id}')" style="--tc:${t.color}">
            <span class="ptc-icon">${t.icon}</span>
            <span class="ptc-label">${t.label}</span>
        </button>
    `).join('');
}

/* --- START A QUIZ --- */
async function startPractice(topicId) {
    const lang = document.body.dataset.lang;
    const topics = lang === 'jp' ? JAPANESE_PRACTICE_TOPICS : FRENCH_PRACTICE_TOPICS;
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;

    quizState.topic = topic;
    quizState.current = 0;
    quizState.score = 0;
    quizState.answers = [];

    _showView('quiz');
    document.getElementById('practice-quiz-topic-label').textContent = `${topic.icon} ${topic.label}`;
    document.getElementById('practice-quiz-progress').textContent = '';
    document.getElementById('practice-loading').style.display = 'flex';
    document.getElementById('quiz-question-area').style.display = 'none';
    document.getElementById('practice-error').style.display = 'none';

    try {
        const result = await _fetchQuiz(topic, lang);
        quizState.questions = result.questions;
        document.getElementById('practice-loading').style.display = 'none';
        document.getElementById('quiz-question-area').style.display = 'block';
        _renderQuestion();
    } catch (err) {
        console.error('Quiz error:', err);
        document.getElementById('practice-loading').style.display = 'none';
        document.getElementById('practice-error').style.display = 'flex';
    }
}

/* --- API CALL via Cloudflare Worker proxy (Gemini Version) --- */
async function _fetchQuiz(topic, lang) {
    const langName = lang === 'jp' ? 'Japanese' : 'French';

    const promptText = `You are a ${langName} quiz generator for a language study website for all ages.
Generate EXACTLY 5 multiple-choice questions based ONLY on the content provided below.
Hard rules:
- Use ONLY vocabulary, grammar rules, and examples from the supplied content. Do not add anything else.
- Each question has exactly 4 answer options.
- Exactly ONE option is correct.
- Vary the question style: translation, fill-in-the-blank phrasing, "which is correct?", grammar identification.
- Keep language clear and friendly for all ages.

MUST RETURN STRICT JSON using this format: 
{"questions":[{"q":"question text","opts":["A","B","C","D"],"ans":0,"tip":"short explanation"}]}

Topic: "${topic.label}"
Content: ${topic.content}`;

    const res = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: promptText }]
            }],
            generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json" 
            }
        })
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Proxy/API Error:", data);
        throw new Error(`HTTP ${res.status}: Check console for details.`);
    }

    try {
        const rawJsonText = data.candidates[0].content.parts[0].text;
        let parsed = JSON.parse(rawJsonText);
        
        if (Array.isArray(parsed)) {
            parsed = { questions: parsed };
        }
        return parsed;
        
    } catch (e) {
        console.error("Failed to parse Gemini response:", data);
        throw new Error("Could not parse the quiz data. Check the console.");
    }
}

/* --- RENDER CURRENT QUESTION --- */
function _renderQuestion() {
    const { questions, current } = quizState;
    const q = questions[current];
    const total = questions.length;
    document.getElementById('practice-quiz-progress').textContent = `${current + 1} / ${total}`;
    document.getElementById('quiz-question-area').innerHTML = `
        <div class="quiz-card">
            <p class="quiz-q-label">Question ${current + 1} <span style="opacity:.5">of ${total}</span></p>
            <p class="quiz-q-text">${q.q}</p>
            <div class="quiz-options">
                ${q.opts.map((opt, i) => `
                    <button class="quiz-opt-btn" id="qopt-${i}" onclick="selectAnswer(${i})">${opt}</button>
                `).join('')}
            </div>
            <div id="quiz-feedback" class="quiz-feedback" style="display:none;"></div>
            <button id="quiz-next-btn" class="quiz-next-btn" onclick="nextQuestion()" style="display:none;">
                ${current + 1 < total ? 'Next Question →' : 'See Results 🏁'}
            </button>
        </div>`;
    quizState.answered = false;
}

/* --- ANSWER SELECTION --- */
function selectAnswer(idx) {
    if (quizState.answered) return;
    quizState.answered = true;
    const q = quizState.questions[quizState.current];
    const correct = q.ans;
    const isRight = idx === correct;
    if (isRight) quizState.score++;
    quizState.answers.push({ selected: idx, correct, isRight });

    q.opts.forEach((_, i) => {
        const btn = document.getElementById(`qopt-${i}`);
        btn.disabled = true;
        if (i === correct) btn.classList.add('q-correct');
        else if (i === idx) btn.classList.add('q-wrong');
        else btn.classList.add('q-dim');
    });

    const fb = document.getElementById('quiz-feedback');
    fb.style.display = 'flex';
    fb.className = `quiz-feedback ${isRight ? 'fb-correct' : 'fb-wrong'}`;
    fb.innerHTML = `<span>${isRight ? '✅ Correct!' : `❌ The answer is: <strong>${q.opts[correct]}</strong>`}${q.tip ? ` — ${q.tip}` : ''}</span>`;
    document.getElementById('quiz-next-btn').style.display = 'block';
}

/* --- ADVANCE / RESULTS --- */
function nextQuestion() {
    quizState.current++;
    if (quizState.current < quizState.questions.length) {
        _renderQuestion();
    } else {
        _showResults();
    }
}

function _showResults() {
    _showView('results');
    const { score, questions } = quizState;
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const [emoji, title] = pct === 100 ? ['🏆','Perfect Score!'] : pct >= 80 ? ['🌟','Great job!'] : pct >= 60 ? ['👍','Good effort!'] : ['📚','Keep studying!'];

    document.getElementById('results-emoji').textContent = emoji;
    document.getElementById('results-title').textContent = title;
    document.getElementById('results-score').textContent = `${score} / ${total} correct · ${pct}%`;

    document.getElementById('results-breakdown').innerHTML = quizState.questions.map((q, i) => {
        const a = quizState.answers[i];
        return `<div class="rb-item ${a.isRight ? 'rb-right' : 'rb-wrong'}">
            <span class="rb-icon">${a.isRight ? '✅' : '❌'}</span>
            <div class="rb-text">
                <p class="rb-q">${q.q}</p>
                ${!a.isRight ? `<p class="rb-ans">Answer: ${q.opts[a.correct]}</p>` : ''}
            </div>
        </div>`;
    }).join('');
}

function retryQuiz() { startPractice(quizState.topic.id); }
function backToPracticeHome() { _showView('home'); }

function _showView(view) {
    document.getElementById('practice-home').style.display         = view === 'home'    ? 'block' : 'none';
    document.getElementById('practice-quiz-view').style.display    = view === 'quiz'    ? 'block' : 'none';
    document.getElementById('practice-results-view').style.display = view === 'results' ? 'block' : 'none';
}