import { Language, Nosach } from '@/types/birkat';
import birkatTextsData from './birkatTexts.json';

export interface BirkatContent {
  title: string;
  subtitle: string;
  sections: {
    opening: string[];
    psalm: string[];
    mainBlessingPart1: string[];
    chanukah?: string[];
    purim?: string[];
    mainBlessingPart2: string[];
    roshChodesh?: string[];
    shabbat?: string[];
    jerusalem: string[];
    buildingJerusalem: string[];
    benevolent: string[];
    wedding?: string[];
    guestBlessing?: string[];
    britMilah?: string[];
    conclusion: string[];
    shevaBrachot?: string[];
  };
}

export const getBirkatText = (language: Language, nosach: Nosach, phonetic: boolean): BirkatContent => {
  // Always return Hebrew text or phonetic based on nosach and phonetic mode
  // Language parameter only affects rendering of comments, not the prayer text itself
  if (phonetic) {
    return getHebrewPhoneticText(nosach);
  } else {
    return getHebrewText(nosach);
  }
};

const getHebrewText = (nosach: Nosach): BirkatContent => {
  // Load from JSON file
  const data = birkatTextsData[nosach as keyof typeof birkatTextsData];
  return data as BirkatContent;
};

const getHebrewPhoneticText = (nosach: Nosach): BirkatContent => {
  const ashkenazPhonetic: BirkatContent = {
    title: 'Birkat Hamazon',
    subtitle: 'Nusach Ashkenaz - Phonetic',
    sections: {
      opening: [
        "On days when Tachanun is said:",
        "Al naharot Bavel sham yashavnu gam bachinu bezochreinu et Tzion. Al aravim betochah talinu kinorotenu. Ki sham she'elunu shovenu divrei shir vetolaleynu simcha: shiru lanu mishir Tzion. Eich nashir et shir Adonai al admat nechar. Im eshkachech Yerushalayim tishkach yemini. Tidbak leshoni lechiki im lo ezkerachi im lo a'aleh et Yerushalayim al rosh simchati. Zechor Adonai livnei Edom et yom Yerushalayim ha'omrim aru aru ad hayesod bah. Bat Bavel hashedudah ashrei sheyeshalem lach et gemulech shegemalt lanu. Ashrei she'yochēz venipētz et olalayich el hasela.",
        "On days when Tachanun is not said:",
        "Shir hama'alot beshuv Adonai et shivat Tzion hayinu kecholmim. Az yimalē sechok pinu ulshonenu rinah az yomru vagoyim higdil Adonai la'asot im eleh. Higdil Adonai la'asot imanu hayinu semechim. Shuvah Adonai et shevitenu ka'afikim banegev. Hazorim bedim'ah berinah yiktzoru. Haloch yelech uvachoh nose meshech hazara bo yavo verinah nose alumotav."
      ],
      psalm: [
        "When three have eaten together they are obligated to form a zimmun and the leader begins: Rabotai, nevarech!",
        "Those present respond: Yehi shem Adonai mevorach me'atah ve'ad olam.",
        "The leader says: Birshut maran verabanan verabotai, nevarech (with ten: Eloheinu) (at a wedding: shehassimchah bime'ono) she'achalnu mishelo.",
        "Those present respond: Baruch (Eloheinu) (at a wedding: shehassimchah bime'ono) she'achalnu mishelo uvtuvo chayinu.",
        "The leader repeats: Baruch (Eloheinu) (at a wedding: shehassimchah bime'ono) she'achalnu mishelo uvtuvo chayinu."
      ],
      mainBlessingPart1: [
        "Baruch atah Adonai Eloheinu melech ha'olam hazan et ha'olam kulo betuvo bechen bechesed uvrachamim, hu noten lechem lechol basar ki le'olam chasdo. Uvtuvo hagadol tamid lo chasar lanu ve'al yechsar lanu mazon (tamid) le'olam va'ed ba'avur shemo hagadol ki hu El zan umfarnēs lakol umetiv lakol umechin mazon lechol beriyotav asher bara. Baruch atah Adonai hazan et hakol.",
        "Nodeh lecha Adonai Eloheinu al shehinchalta la'avotenu eretz chemdah tovah urechavah ve'al shehotzētanu Adonai Eloheinu me'eretz Mitzrayim ufeditanu mibet avadim ve'al britcha shechatamta bivsarenu ve'al Toratcha shelimadtanu ve'al chukecha shehodatanu ve'al chayim chen vachesed shechonantanu, ve'al achilat mazon sha'atah zan umfarnēs otanu tamid, bechol yom uvchol et uvchol sha'ah."
      ],
      chanukah: [
        "Al hanisim ve'al hapurkan ve'al hagevurot ve'al hatishu'ot ve'al hanifla'ot ve'al hanechamot she'asita la'avotenu bayamim hahem bazman hazeh.",
        "",
        "Bimei Mattityahu ben Yochanan kohen gadol Chashmonai uvanav keshė'amdah malchut Yavan harsha'ah al amcha Yisrael lehashkicham miToratecha ulha'aviram mechukei retzonecha ve'atah berachamecha harabim amad̄ta lahem be'et tzaratam ravta et rivam danta et dinam nakamta et nikmatam masarta giborim beyad chalashim verabim beyad me'atim utme'im beyad tehorim uresha'im beyad tzadikim vezedim beyad oskei Toratecha ulecha asita shem gadol vekadosh be'olamecha ule'amcha Yisrael asita teshu'ah gedolah ufurkan kehayom hazeh. Ve'achar kach ba'u vanecha lidvir beitecha ufinu et heichalecha vetiharu et mikdashecha vehidliku nerot bechatzrot kodshecha vekav'u shemonat yemei Chanukah elu lehodot ulhalēl leshimcha hagadol."
      ],
      purim: [
        "Al hanisim ve'al hapurkan ve'al hagevurot ve'al hatishu'ot ve'al hanifla'ot ve'al hanechamot she'asita la'avotenu bayamim hahem bazman hazeh.",
        "",
        "Bimei Mordechai veEstēr beShushan habirah keshė'amad aleihem Haman harasha bikēsh lehashmid laharog ule'abēd et kol haYehudim mina'ar ve'ad zaken taf venashim beyom echad bishloshah asar lechodesh shneim asar hu chodesh Adar ushelalum lavoz. Ve'atah berachamecha harabim hefarta et atzato vekilkalta et machashavto vahashevota lo gemulo berosho vetalu oto ve'et banav al ha'etz ve'asita imahem nisim venifla'ot venodeh leshimcha hagadol selah."
      ],
      mainBlessingPart2: [
        "Ve'al hakol Adonai Eloheinu anachnu modim lach umvarchim otach, yitbarach shimcha befi kol chai tamid le'olam va'ed. Kakatuv: Ve'achalta vesavata uverach̄ta et Adonai Elohecha al ha'aretz hatovah asher natan lach. Baruch atah Adonai, al ha'aretz ve'al hamazon."
      ],
      roshChodesh: [
        "On Rosh Chodesh and festivals, add here Ya'aleh Veyavo:",
        "Eloheinu vElohei avotenu, ya'aleh veyavo yagia yera'eh veyeratzeh yishama yipaked veyizacher zichronenu vezichronavotenu, zichron Yerushalayim irecha, vezichron Mashiach ben David avdecha, vezichron kol amcha beit Yisrael lefanecha, lifletah letovah lechen ulechesed ulrachamim lechayim ulshalom beyom",
        "On Rosh Chodesh: Rosh Chodesh",
        "On Pesach: Chag HaMatzot",
        "On Sukkot: Chag HaSukkot",
        "Zochreinu Adonai Eloheinu bo letovah, ufokdenu vo livrachah, vehoshi'enu vo lechayim, uvidvar yeshu'ah verachamim; chus vechonenu, verachem aleinu, vehoshi'enu ki elecha enenu, ki El melech chanun verachum atah."
      ],
      jerusalem: [
        "Rachem na Adonai Eloheinu al Yisrael amecha, ve'al Yerushalayim irecha, ve'al Tzion mishkan kevodecha, ve'al malchut beit David meshichecha, ve'al habayit hagadol vehakadosh shenikra shimcha alav. Eloheinu, Avinu, re'enu, zunenu, farnesenu vechalkeleinu veharvichenu, veharvaḥ lanu Adonai Eloheinu meherah mikol tzarotenu. Vena al tatzrichenu Adonai Eloheinu, lo lidei matat basar vadam velo lidei halva'atam, ki im leyadcha hamele'ah hapetuḥah hakedoshah veharechavah, shelo nevosh velo nikalem le'olam va'ed."
      ],
      buildingJerusalem: [
        "Uveneh Yerushalayim ir hakodesh bimherah veyamenu. Baruch atah Adonai, boneh verachamav Yerushalayim. Amen.",
        "Baruch atah Adonai Eloheinu, melech ha'olam, haEl Avinu, Malkenu, Adirenu, Bor'enu, Go'alenu, Yotzrenu, Kedoshenu kedosh Ya'akov, Ro'enu ro'eh Yisrael, hamelech hatov vehameitiv lakol, shebechol yom vayom hu hetiv, hu metiv, hu yetiv lanu, hu gemalanu, hu gomlenu, hu yigmelenu la'ad, lechen ulechesed ulrachamim ulrevach hatzalah vehatzlaḥah, berachah vishu'ah, nechamah parnasah vechalkalah verachamim vechayim veshalom, vechol tov; umikol tuv le'olam al yechasrenu."
      ],
      benevolent: [
        "Harachaman hu yimloch aleinu le'olam va'ed.",
        "",
        "Harachaman hu yitbarach bashamayim uva'aretz.",
        "",
        "Harachaman hu yishtabaḥ ledor dorim, veyitpa'ar banu la'ad ulnetzaḥ netzachim, veyithadar banu la'ad ule'olmei olamim.",
        "",
        "Harachaman hu yefarnese nu bechavod.",
        "",
        "Harachaman hu yishbor ulenu me'al tzavarenu, vehu yolichenu komemiyut le'artzenu.",
        "",
        "Harachaman hu yishlach lanu berachah merubah babayit hazeh, ve'al shulchan zeh she'achalnu alav.",
        "",
        "Harachaman hu yishlach lanu et Eliyahu hanavi zachur latov, vivaser lanu besorot tovot yeshu'ot venechamot.",
        "",
        "At one's father's house one says: Harachaman hu yevarech et avi mori ba'al habayit hazeh, ve'et imi morati ba'alat habayit hazeh.",
        "",
        "Married man says: Harachaman hu yevarech oti, (if parents are alive: ve'et avi mori, ve'et imi morati,) ve'et ishti, ve'et zar'i, ve'et kol asher li.",
        "",
        "Married woman says: Harachaman hu yevarech oti, (if parents are alive: ve'et avi mori, ve'et imi morati,) ve'et ba'ali, ve'et zar'i, ve'et kol asher li.",
        "",
        "Guest says: Harachaman hu yevarech et ba'al habayit hazeh ve'et ba'alat habayit hazeh, otam ve'et betam ve'et zar'am ve'et kol asher lahem. Yehi ratzon, shelo yevosh ba'al habayit ba'olam hazeh, velo yikhalem la'olam haba, veyitzlaḥ me'od bechol nechasav, veyihyu nechasav unchaseinu matzlichim ukerovim la'ir, ve'al yishlot Satan lo bema'asei yadav velo bema'asei yadenu, ve'al yizdakēk lo lefanav velo lefanenu shum devar hirhur chet va'averah ve'avon me'atah ve'ad olam.",
        "Otam ve'et betam ve'et zar'am ve'et kol asher lahem, otanu ve'et kol asher lanu, kemo shenivrechu avotenu Avraham Yitzchak veYa'akov bakol mikol kol – ken yevarech otanu kulanu yachad bivrachah shelemah. Venomar: Amen.",
        "Bamarom yelamdu aleihem ve'aleinu zechut sheteheלמשמרת shalom. Venisa verachah me'et Adonai, utzedakah me'Elohei yish'enu, venimtza chen vesechel tov be'enei Elohim ve'adam.",
        "",
        "On Rosh Chodesh: Harachaman hu yechadesh aleinu et hachodesh hazeh letovah velivrachah.",
        "",
        "On Sukkot: Harachaman hu yakim lanu et sukat David hanofelet.",
        "",
        "Some add: Harachaman hu yevarech et medinat Yisrael, reshit tzemiḥat ge'ulatenu.",
        "",
        "Harachaman hu yevarech et chayalei tzeva hahagana leYisrael ve'anshei kochot habitachon, ha'omdim al mishmar artzenu ve'arei Eloheinu, migvul haLevanon ve'ad midbar Mitzrayim, umin hayam hagadol ad levo ha'aravah, bayabashah ba'avir uvayam.",
        "",
        "Harachaman hu yezakenu limot haMashiaḥ ulchayei ha'olam haba. Migdil (on days when Musaf is recited and at Melaveh Malkah: Migdol) yeshu'ot malko, ve'oseh chesed limshicho, leDavid ulzar'o ad olam.",
        "**Oseh shalom bimromav, hu ya'aseh shalom aleinu ve'al kol Yisrael. Ve'imru: Amen.**"
      ],
      wedding: [],
      conclusion: [
        "Yeru et Adonai kedoshav, ki ein machsor lirei'av. Kefirim rashu vera'evu, vedorshei Adonai lo yachseru chol tov. Hodu ladonai ki tov, ki le'olam chasdo. Pote'aḥ et yadecha, umasbia lechol chai ratzon. Baruch hagever asher yivtach badonai, vehayah Adonai mivtacho. Na'ar hayiti gam zakanti, velo ra'iti tzadik ne'ezav, vezar'o mevakēsh lachem. Adonai oz le'amo yiten, Adonai yevarech et amo vashalom."
      ],
      shevaBrachot: [
        "**Sheva Brachot - Seven Blessings**",
        "",
        "(ברכה ראשונה)",
        "Baruch atah Adonai, Eloheinu melech ha'olam, yotzer ha'adam.",
        "",
        "",
        "(ברכה שניה)",
        "Baruch atah Adonai, Eloheinu melech ha'olam, asher yatzar et ha'adam betzalmo, betzelem demut tavnito, vehitkin lo mimenu binyan adei ad. Baruch atah Adonai, yotzer ha'adam.",
        "",
        "",
        "(ברכה שלישית)",
        "Sos tasis vetagel ha'akarah bekibutz baneha letocha besimchah. Baruch atah Adonai, mesamei'ach Tzion bevaneha.",
        "",
        "",
        "(ברכה רביעית)",
        "Samei'ach tesamach re'im ha'ahuvim ksamechacha yetzircha began Eden mikedem. Baruch atah Adonai, mesamei'ach chatan vekallah.",
        "",
        "",
        "(ברכה חמישית)",
        "Baruch atah Adonai, Eloheinu melech ha'olam, asher bara sason vesimchah, chatan vekallah, gilah rinah ditzah vechedvah, ahavah ve'achavah veshalom vere'ut. Meherah Adonai Eloheinu yishama be'arei Yehudah uvechutzot Yerushalayim kol sason vekol simchah, kol chatan vekol kallah, kol mitzhalot chatanim mechupatam un'arim mimish'teh neginatam. Baruch atah Adonai, mesamei'ach chatan im hakallah.",
        "",
        "",
        "(ברכה שישית)",
        "Baruch atah Adonai, Eloheinu melech ha'olam, borei peri hagafen.",
        "",
        "",
        "(ברכה שביעית)",
        "Baruch atah Adonai, Eloheinu melech ha'olam, shehakol bara lichvodo."
      ]
    }
  };

  const edotHamizrahPhonetic: BirkatContent = {
    title: 'Birkat Hamazon',
    subtitle: 'Nusach Edot HaMizrah - Phonetic',
    sections: {
      opening: [],
      psalm: [
        "When three have eaten together they are obligated to form a zimmun and the leader begins: Hav lan venivrich lemalka ilaa kadisha:",
        "Those present respond: Shamayim:",
        "The leader says: Birshut malka ilaa kadisha, uvirshut morai verabotai uvirshutchem nevarech (with ten: Eloheinu) (at a wedding: shehassimchah bime'ono) she'achalnu mishelo:",
        "Those present respond: Baruch (Eloheinu) (at a wedding: shehassimchah bime'ono) she'achalnu mishelo uvtuvo chayinu.",
        "The leader repeats: Baruch (Eloheinu) (at a wedding: shehassimchah bime'ono) she'achalnu mishelo uvtuvo chayinu."
      ],
      mainBlessingPart1: [
        "Baruch atah Adonai Eloheinu melech ha'olam hazan et ha'olam kulo betuvo bechen bechesed uvrachamim, hu noten lechem lechol basar ki le'olam chasdo. Uvtuvo hagadol tamid lo chasar lanu ve'al yechsar lanu mazon le'olam va'ed ba'avur shemo hagadol ki hu El zan umfarnēs lakol umetiv lakol umechin mazon lechol beriyotav asher bara. Baruch atah Adonai hazan et hakol.",
        "Nodeh lecha Adonai Eloheinu al shehinchalta la'avotenu eretz chemdah tovah urechavah ve'al shehotzētanu Adonai Eloheinu me'eretz Mitzrayim ufeditanu mibet avadim ve'al britcha shechatamta bivsarenu ve'al Toratcha shelimadtanu ve'al chukecha shehodatanu ve'al chayim chen vachesed shechonantanu, ve'al achilat mazon sha'atah zan umfarnēs otanu tamid, bechol yom uvchol et uvchol sha'ah."
      ],
      chanukah: [
        "Al hanisim ve'al hapurkan ve'al hagevurot ve'al hatishu'ot ve'al hanifla'ot ve'al hanechamot she'asita la'avotenu bayamim hahem bazman hazeh.",
        "Bimei Mattityah ben Yochanan kohen gadol Chashmonai uvanav keshė'amdah malchut Yavan harsha'ah al amcha Yisrael leshakcham Toratcha ulha'aviram mechukei retzonecha. Ve'atah berachamecha harabim amad̄ta lahem be'et tzaratam. Ravta et rivam. Danta et dinam. Nakamta et nikmatam. Masarta giborim beyad chalashim. Verabim beyad me'atim. Uresha'im beyad tzadikim. Utme'im beyad tehorim. Vezedim beyad oskei Toratecha. Lecha asita shem gadol vekadosh be'olamecha. Ule'amcha Yisrael asita teshu'ah gedolah ufurkan kehayom hazeh. Ve'achar kach ba'u vanecha lidvir beitecha ufinu et heichalecha. Vetiharu et mikdashecha. Vehidliku nerot bechatzrot kodshecha. Vekav'u shemonat yemei Chanukah elu behalel uvhoda'ah. Ve'asita imahem nisim venifla'ot venodeh leshimcha hagadol selah."
      ],
      purim: [
        "Al hanisim ve'al hapurkan ve'al hagevurot ve'al hatishu'ot ve'al hanifla'ot ve'al hanechamot she'asita la'avotenu bayamim hahem bazman hazeh.",
        "",
        "Bimei Mordechai veEstēr beShushan habirah keshė'amad aleihem Haman harasha bikēsh lehashmid laharog ule'abēd et kol haYehudim mina'ar ve'ad zaken taf venashim beyom echad bishloshah asar lechodesh shneim asar hu chodesh Adar ushelalum lavoz. Ve'atah berachamecha harabim hefarta et atzato vekilkalta et machashavto vahashevota lo gemulo berosho vetalu oto ve'et banav al ha'etz ve'asita imahem nisim venifla'ot venodeh leshimcha hagadol selah."
      ],
      mainBlessingPart2: [
        "Ve'al hakol Adonai Eloheinu anachnu modim lach umvarchim otach, yitbarach shimcha befi kol chai tamid le'olam va'ed. Kakatuv: Ve'achalta vesavata uverach̄ta et Adonai Elohecha al ha'aretz hatovah asher natan lach. Baruch atah Adonai, al ha'aretz ve'al hamazon."
      ],
      roshChodesh: [
        "On Rosh Chodesh and festivals, add here Ya'aleh Veyavo:",
        "Eloheinu vElohei avotenu, ya'aleh veyavo yagia yera'eh veyeratzeh yishama yipaked veyizacher zichronenu vezichronavotenu, zichron Yerushalayim irecha, vezichron Mashiach ben David avdecha, vezichron kol amcha beit Yisrael lefanecha, lifletah letovah, lechen ulechesed ulrachamim lechayim tovim ulshalom beyom",
        "On Rosh Chodesh: Rosh Hachodesh hazeh",
        "On Pesach: Chag HaMatzot hazeh beyom mikra kodesh hazeh",
        "On Sukkot: Chag HaSukkot hazeh beyom (tov) mikra kodesh hazeh",
        "Zochreinu Adonai Eloheinu bo letovah, ufokdenu vo livrachah, vehoshi'enu vo lechayim tovim, uvidvar yeshu'ah verachamim; chus vechonenu, verachem aleinu, vehoshi'enu ki elecha enenu, ki El melech chanun verachum atah."
      ],
      jerusalem: [
        "Rachem Adonai Eloheinu al Yisrael amecha, ve'al Yerushalayim irecha, ve'al Tzion mishkan kevodecha, ve'al malchut beit David meshichecha, ve'al habayit hagadol vehakadosh shenikra shimcha alav. Eloheinu, Avinu, Malkenu, re'enu, zunenu, farnesenu vechalkeleinu veharvichenu, veharvaḥ lanu Adonai Eloheinu meherah mikol tzarotenu. Vena al tatzrichenu Adonai Eloheinu, lo lidei matat basar vadam velo lidei halva'atam, ki im leyadcha hamele'ah hapetuḥah hakedoshah veharechavah, shelo nevosh velo nikalem le'olam va'ed."
      ],
      buildingJerusalem: [
        "Uveneh Yerushalayim ir hakodesh bimherah veyamenu. Baruch atah Adonai, boneh Yerushalayim. Amen.",
        "Baruch atah Adonai Eloheinu, melech ha'olam, haEl Avinu, Malkenu, Adirenu, Bor'enu, Go'alenu, Yotzrenu, Kedoshenu kedosh Ya'akov, Ro'enu ro'eh Yisrael, hamelech hatov vehameitiv lakol, shebechol yom vayom hu hetiv, hu metiv, hu yetiv lanu, hu gemalanu, hu gomlenu, hu yigmelenu la'ad, lechen ulechesed ulrachamim ulrevach hatzalah vehatzlaḥah, berachah vishu'ah, nechamah parnasah vechalkalah verachamim vechayim veshalom, vechol tov; umikol tuv le'olam al yechasrenu."
      ],
      benevolent: [
        "Harachaman hu yimloch aleinu le'olam va'ed.",
        "",
        "Harachaman hu yitbarach bashamayim uva'aretz.",
        "",
        "Harachaman hu yishtabaḥ ledor dorim, veyitpa'ar banu la'ad ulnetzaḥ netzachim, veyithadar banu la'ad ule'olmei olamim.",
        "",
        "Harachaman hu yefarnese nu bechavod.",
        "",
        "Harachaman hu yishbor ulenu me'al tzavarenu, vehu yolichenu komemiyut le'artzenu.",
        "",
        "Harachaman hu yishlach lanu berachah merubah babayit hazeh, ve'al shulchan zeh she'achalnu alav.",
        "",
        "Harachaman hu yishlach lanu et Eliyahu hanavi zachur latov, vivaser lanu besorot tovot yeshu'ot venechamot.",
        "",
        "Harachaman hu yifrosh aleinu sukat shelomo.",
        "",
        "Some add: Harachaman hu yevarech et medinat Yisrael (reshit tzemiḥat ge'ulatenu).",
        "",
        "Some add: Harachaman hu yevarech et chayalei tzeva hahagana leYisrael ve'anshei kochot habitachon ha'omdim al mishmar artzenu.",
        "",
        "Harachaman hu yita Torato ve'ahavato belibenu vetihyeh yir'ato al panenu levilti necheta, veyihyu chol ma'asenu leshem shamayim."
      ],
      guestBlessing: [
        "Harachaman hu yevarech et hashulchan hazeh she'achalnu alav, visader bo kol ma'adanei olam, veyihyeh keshulchano shel Avraham avinu alav hashalom. Kol ra'ev mimenu yochal, vechol tzame mimenu yishteh, ve'al yechsar mimenu kol tov la'ad ule'olmei olamim, amen. Harachaman hu yevarech et ba'al habayit hazeh uva'al hasedah hazot, hu uvanav ve'ishto vechol asher lo, bevanim sheyichyu uvnichasim sheyirbu. Barech Adonai cheilo ufoal yadav tirtzeh, veyihyu nechasav unchaseinu matzlichim ukerovim la'ir, ve'al yizdakek lefanav velo lefanenu shum devar chet vehirhur avon, sas vesameach kol hayamim be'osher vechavod me'atah ve'ad olam, lo yevosh ba'olam hazeh velo yikalem la'olam haba, amen ken yehi ratzon."
      ],
      wedding: [
        "Harachaman hu yevarech et hechatan vehakallah, bevanim zecharim shel kayama, la'avodato yitbarach. Harachaman hu yevarech et kol hamesubin bashulchan hazeh, veyiten lanu haKadosh Baruch Hu kol mish'alot libenu letovah."
      ],
      britMilah: [
        "At a brit milah meal: Harachaman hu yevarech et ba'al habayit hazeh, avi haben, hu ve'ishto hayoledet, me'atah ve'ad olam. Harachaman hu yevarech et hayeled hanolad, ucheshem shezikahu haKadosh Baruch Hu lemilah, kach yezakehu lehikanes laTorah velachupah velamitzvot ulema'asim tovim, vechen yehi ratzon venomar amen. Harachaman hu yevarech et ma'alat hasandak vehamohel ush'ar hamishtadlim bamitzvah, hem vechol asher lahem."
      ],
      conclusion: [
        "Harachaman hu yechayenu viyzakenu viykarvenu limot haMashiach ulevinyanbeit hamikdash ulchayei ha'olam haba.",
        "",
        "Magdil (on days when Musaf is recited and at Melaveh Malkah: Migdol) yeshu'ot malko, ve'oseh chesed limshicho leDavid ulzar'o ad olam.",
        "",
        "Kefirim rashu vera'evu vedorshei Adonai lo yachseru chol tov.",
        "",
        "Na'ar hayiti gam zakanti velo ra'iti tzadik ne'ezav vezar'o mevakēsh lachem.",
        "",
        "Kol hayom chonen umalveh vezar'o livrachah.",
        "",
        "Mah she'achalnu yihyeh lesov'ah, umah sheishatinu yihyeh lirfu'ah, umah shehotarnu yihyeh livrachah, kedichtiv: Vayiten lifneihem vayochlu vayotiru kidvar Adonai.",
        "",
        "Beruchim atem ladonai oseh shamayim va'aretz.",
        "",
        "Baruch hagever asher yivtach badonai vehayah Adonai mivtacho.",
        "",
        "Adonai oz le'amo yiten Adonai yevarech et amo vashalom.",
        "",
        "**Oseh shalom bimromav hu verachamav ya'aseh shalom aleinu ve'al kol amo Yisrael ve'imru amen.**"
      ],
      shevaBrachot: [
        "**Sheva Brachot - Seven Blessings**",
        "",
        "(ברכה ראשונה)",
        "Baruch atah Adonai, Eloheinu melech ha'olam, yotzer ha'adam.",
        "",
        "",
        "(ברכה שניה)",
        "Baruch atah Adonai, Eloheinu melech ha'olam, asher yatzar et ha'adam betzalmo, betzelem demut tavnito, vehitkin lo mimenu binyan adei ad. Baruch atah Adonai, yotzer ha'adam.",
        "",
        "",
        "(ברכה שלישית)",
        "Sos tasis vetagel ha'akarah bekibutz baneha letocha besimchah. Baruch atah Adonai, mesamei'ach Tzion bevaneha.",
        "",
        "",
        "(ברכה רביעית)",
        "Samei'ach tesamach re'im ha'ahuvim ksamechacha yetzircha began Eden mikedem. Baruch atah Adonai, mesamei'ach chatan vekallah.",
        "",
        "",
        "(ברכה חמישית)",
        "Baruch atah Adonai, Eloheinu melech ha'olam, asher bara sason vesimchah, chatan vekallah, gilah rinah ditzah vechedvah, ahavah ve'achavah veshalom vere'ut. Meherah Adonai Eloheinu yishama be'arei Yehudah uvechutzot Yerushalayim kol sason vekol simchah, kol chatan vekol kallah, kol mitzhalot chatanim mechupatam un'arim mimish'teh neginatam. Baruch atah Adonai, mesamei'ach chatan im hakallah.",
        "",
        "",
        "(ברכה שישית)",
        "Baruch atah Adonai, Eloheinu melech ha'olam, borei peri hagafen.",
        "",
        "",
        "(ברכה שביעית)",
        "Baruch atah Adonai, Eloheinu melech ha'olam, shehakol bara lichvodo."
      ]
    }
  };

  return nosach === 'ashkenaz' ? ashkenazPhonetic : edotHamizrahPhonetic;
};

const getFrenchText = (phonetic: boolean): BirkatContent => ({
  title: 'Birkat Hamazon',
  subtitle: 'Français',
  sections: {
    opening: ['Shir hama\'alot...'],
    psalm: ['Baruch atah...'],
    mainBlessingPart1: ['Nodeh lecha...'],
    mainBlessingPart2: ['Ve\'al hakol...'],
    jerusalem: ['Uveneh Yerushalayim...'],
    buildingJerusalem: ['Uveneh Yerushalayim...'],
    benevolent: ['Baruch atah...'],
    conclusion: ['Oseh shalom...'],
    shevaBrachot: ['Sheva Brachot - Les Sept Bénédictions...'],
  },
});

const getEnglishText = (phonetic: boolean): BirkatContent => ({
  title: 'Birkat Hamazon',
  subtitle: 'English',
  sections: {
    opening: ['Shir hama\'alot...'],
    psalm: ['Baruch atah...'],
    mainBlessingPart1: ['Nodeh lecha...'],
    mainBlessingPart2: ['Ve\'al hakol...'],
    jerusalem: ['Uveneh Yerushalayim...'],
    buildingJerusalem: ['Uveneh Yerushalayim...'],
    benevolent: ['Baruch atah...'],
    conclusion: ['Oseh shalom...'],
    shevaBrachot: ['Sheva Brachot - Seven Blessings...'],
  },
});
