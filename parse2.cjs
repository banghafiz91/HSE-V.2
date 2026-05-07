const fs = require('fs');

const raw = `FRESH / BLUE / CLEAN 🔵
No	Parfum	DNA Aroma	Family	Karakter
1	Dior Sauvage	Ambroxan fresh spicy	Aromatic Fresh	maskulin modern
2	Bleu de Chanel	Citrus woody incense	Woody Aromatic	elegan clean
3	Acqua di Gio Profumo	Marine incense	Aquatic Woody	classy pria dewasa
4	Acqua di Gio Profondo	Marine mineral aromatic	Aquatic Fresh	fresh aquatic modern
5	Versace Dylan Blue	Blue ambrox citrus	Aromatic Fresh	sexy fresh
6	Bvlgari Aqva	Marine salty citrus	Aquatic	laut maskulin
7	Nautica Voyage	Green apple aquatic	Fresh Green	fresh murah favorit
8	Davidoff Cool Water	Lavender marine	Aromatic Aquatic	clean classic
9	Afnan Turathi Blue	Citrus amber musk	Blue Fresh	semi niche fresh
10	Armaf Urban Man Elixir	Sauvage style spicy blue	Aromatic	beast fresh
AVENTUS STYLE 🍍
No	Parfum	DNA Aroma	Family	Karakter
11	Creed Aventus	Pineapple smoky musk	Fruity Chypre	alpha masculine
12	Armaf Club de Nuit Intense	Smoky lemon musk	Fruity Smoky	refill favorit
13	Mont Blanc Explorer	Woody ambrox pineapple	Woody Fresh	modern office
14	Afnan Supremacy Silver	Fruity birch musk	Fruity Woody	elegant clone
15	Nishane Hacivat	Pineapple oakmoss	Fruity Chypre	niche luxury
16	Mancera Cedrat Boise	Citrus leather fruity	Woody Citrus	niche versatile
17	Lattafa Qaed Al Fursan	Pineapple saffron woody	Fruity Oriental	murah gacor
18	Zara Vibrant Leather	Citrus leather	Woody Fresh	Aventus ringan
19	Al Haramain L'Aventure	Lemon pineapple musk	Fruity Fresh	projection tinggi
20	Rasasi Zebra Pour Homme	Fruity woody smoky	Woody Fruity	arabian aventus
SWEET / CLUBBING / MASS APPEAL 🍬
No	Parfum	DNA Aroma	Family	Karakter
21	Versace Eros	Mint vanilla apple	Aromatic Gourmand	clubbing
22	Jean Paul Gaultier Ultra Male	Pear vanilla cinnamon	Sweet Oriental	sexy muda
23	Afnan 9PM	Bubblegum vanilla	Sweet Amber	refill viral
24	Paco Rabanne 1 Million	Cinnamon leather sweet	Spicy Oriental	flashy
25	Paco Rabanne Invictus	Bubblegum marine	Sweet Fresh	sporty manis
26	Stronger With You	Chestnut vanilla amber	Gourmand Woody	romantis
27	Scandal Pour Homme	Caramel tonka	Sweet Gourmand	bold malam
28	Le Male Elixir	Honey vanilla tobacco	Oriental Gourmand	viral manis
29	Hawas Rasasi	Aquatic bubblegum	Sweet Aquatic	mass appealing
30	YSL Y EDP	Apple ambrox sage	Fresh Sweet	modern pria
BACCARAT / AMBERY / AIRY 🔥
No	Parfum	DNA Aroma	Family	Karakter
31	Maison Francis Kurkdjian Baccarat Rouge 540	Saffron amber ethyl maltol	Amber Sweet	airy luxury
32	Lattafa Ana Abiyedh Rouge	Sweet amber airy	Amber	dupe BR540
33	Armaf Untold	Metallic sweet amber	Amber Woody	clone populer
34	Burberry Her	Strawberry musk amber	Fruity Gourmand	cewek viral
35	Cloud Ariana Grande	Coconut praline musk	Sweet Musky	BR540 feminin
36	Instant Crush Mancera	Saffron vanilla amber	Amber Spicy	beast niche
37	Erba Pura Xerjoff	Fruity musk vanilla	Fruity Musky	fruity niche
38	Khamrah Lattafa	Cinnamon praline dates	Oriental Gourmand	arab sweet
39	Oud for Glory Lattafa	Oud saffron patchouli	Oud Oriental	oud viral
40	Delina Parfums de Marly	Rose lychee musk	Floral Fruity	cewek premium
WOODY / ELEGANT / OFFICE 🌲
No	Parfum	DNA Aroma	Family	Karakter
41	Terre d'Hermes	Orange vetiver cedar	Woody Citrus	mature classy
42	Encre Noire	Vetiver dark woody	Woody Earthy	gelap elegan
43	Lalique White	Tamarind spicy musk	Woody Spicy	unique office
44	Prada L'Homme	Iris powder clean	Powdery Woody	clean luxury
45	Dior Homme Intense	Iris cacao woody	Powdery Gourmand	gentleman
46	Givenchy Gentleman Reserve Privée	Whisky iris chestnut	Boozy Woody	classy malam
47	Boss Bottled	Apple cinnamon woody	Woody Sweet	formal casual
48	Gucci Guilty	Lavender lemon patchouli	Aromatic Woody	sensual
49	Dunhill Icon	Neroli black pepper	Citrus Woody	executive
50	Bentley for Men Intense	Rum leather incense	Boozy Leather	mature powerful
ARABIAN / OUD / MIDDLE EAST 🌙
No	Parfum	DNA Aroma	Family	Karakter
51	Oud Satin Mood	Rose oud vanilla	Oud Floral	luxury arab
52	Black Afgano	Cannabis incense oud	Dark Woody	misterius
53	Ombre Nomade	Raspberry oud incense	Oud Smoky	mahal niche
54	Arabians Tonka	Rose oud tonka	Oriental Oud	beast mode
55	Shaghaf Oud	Praline oud vanilla	Sweet Oud	refill favorit
56	Swiss Arabian Shaghaf Oud Aswad	Rose saffron oud	Oud Floral	arab sweet
57	Lattafa Bade'e Al Oud	Sweet smoky oud	Oriental Oud	viral murah
58	Amouage Interlude	Oregano incense amber	Smoky Oriental	niche berat
59	Initio Oud for Greatness	Lavender saffron oud	Fresh Oud	luxury modern
60	Khaltat Night	Cherry apple vanilla	Sweet Oriental	Timur Tengah
FEMININE / FLORAL / SOFT 🌸
No	Parfum	DNA Aroma	Family	Karakter
61	Miss Dior Blooming Bouquet	Rose peony musk	Floral Fresh	feminin clean
62	Chanel Chance Eau Tendre	Grapefruit jasmine musk	Fruity Floral	soft girly
63	Gucci Bloom	White floral tuberose	Floral White	elegan cewek
64	Lancome La Vie Est Belle	Pear praline vanilla	Sweet Floral	manis elegan
65	Black Opium	Coffee vanilla white floral	Gourmand Floral	sexy malam
66	Good Girl	Almond cacao tuberose	Oriental Floral	femme fatale
67	Libre YSL	Lavender vanilla musk	Floral Aromatic	modern wanita
68	Bright Crystal	Yuzu peony musk	Fresh Floral	fresh wanita
69	Bombshell Victoria's Secret	Fruity floral fresh	Fruity Floral	cewek muda
70	J'adore Dior	Jasmine floral fruity	Floral Luxury	classy wanita
GOURMAND / DESSERT / VANILLA 🍰
No	Parfum	DNA Aroma	Family	Karakter
71	Tobacco Vanille	Tobacco vanilla cacao	Gourmand Tobacco	mahal hangat
72	Vanilla 28 Kayali	Brown sugar vanilla	Vanilla Gourmand	viral cewek
73	Bianco Latte	Milk caramel vanilla	Milky Gourmand	creamy viral
74	Chocolate Greedy	Chocolate vanilla coffee	Chocolate Gourmand	dessert scent
75	Casamorati Lira	Lemon caramel vanilla	Citrus Gourmand	luxury cake
76	Nebras Lattafa	Cocoa vanilla berries	Sweet Gourmand	murah viral
77	Eilish Billie Eilish	Vanilla cacao sugar	Warm Gourmand	cozy
78	Cheirosa 62	Pistachio caramel vanilla	Beach Gourmand	body mist viral
79	Kerosene Followed	Coffee maple syrup	Coffee Gourmand	ekstrem
80	Angel Share	Cognac cinnamon praline	Boozy Gourmand	luxury malam
NICHE / CLEAN / MODERN ✨
No	Parfum	DNA Aroma	Family	Karakter
81	Le Labo Another 13	Ambrox musk pear	Musky Clean	clean niche
82	Santal 33	Sandalwood leather iris	Woody Musky	artsy niche
83	Molecule 01	Iso E Super dominant	Woody Transparent	skin scent
84	Gypsy Water	Juniper vanilla incense	Woody Aromatic	airy niche
85	Byredo Mojave Ghost	Sapodilla musk violet	Musky Floral	clean luxury
86	Replica Lazy Sunday Morning	White musk aldehydic	Clean Musky	laundry vibes
87	Replica Jazz Club	Rum tobacco vanilla	Boozy Tobacco	bar vibes
88	Philosykos	Fig green woody	Green Woody	natural niche
89	Bal d'Afrique	Lemon vetiver amber	Citrus Woody	elegant niche
90	Wood Sage & Sea Salt	Sea salt sage musk	Aquatic Aromatic	minimal clean
MASS MARKET / REFILL FAVORIT 🇮🇩
No	Parfum	DNA Aroma	Family	Karakter
91	HMNS Orgsm	Floral vanilla amber	Sweet Floral	lokal viral
92	Kahf Revered Oud	Fresh oud amber	Fresh Oud	muslim modern
93	Carl & Claire	Fresh fruity floral	Casual Fresh	market muda
94	Onix Black	Sweet woody musk	Woody Sweet	refill lokal
95	Miniso Garden of Mirror	Fruity musky	Fruity Clean	murah awet
96	Mykonos	Fresh tropical aquatic	Fresh Tropical	daily use
97	Evangeline Black Sakura	Floral powdery sweet	Floral Sweet	market luas
98	Vitalis Her Majesty	Sweet powder floral	Powdery Floral	nostalgia
99	Morris Eau de Parfum	Fresh woody amber	Fresh Woody	market pria
100	Casablanca	Powdery floral musk	Powdery	market klasik`;

let currentCategory = "";
const result = [];

raw.split('\\n').forEach(line => {
    line = line.trim();
    if (!line) return;
    
    const parts = line.split('\\t');
    if (parts.length >= 5 && parseInt(parts[0])) {
        result.push({
            id: parseInt(parts[0]),
            name: parts[1].trim(),
            dna: parts[2].trim(),
            family: parts[3].trim(),
            character: parts[4].trim(),
            category: currentCategory
        });
    } else {
        if (!line.includes('No') && !line.includes('Parfum') && !line.includes('DNA Aroma')) {
            currentCategory = line.trim();
        }
    }
});

fs.writeFileSync('/app/applet/src/data/parfumDatabase.ts', 'export const parfumDatabase = ' + JSON.stringify(result, null, 2) + ';');
console.log('Done parsing ' + result.length + ' items');
