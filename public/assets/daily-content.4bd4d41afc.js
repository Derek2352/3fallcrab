(function (root) {
"use strict";
const SPRINT_DAYS = 14;
const MAX_SHIELDS = 2;
const SHIELD_EVERY = 7;
const CATEGORIES = {
spend: { en: "Smart Spending", zh: "精明消費", color: "#FF7B35", badgeBg: "#FFF0E5", badgeFg: "#9A3408" },
save: { en: "Pay Yourself First", zh: "先儲後使", color: "#14968B", badgeBg: "#E3F7F4", badgeFg: "#0B665E" },
scam: { en: "Scam & Risk Shield", zh: "防騙與保障", color: "#8B6CF2", badgeBg: "#EFEAFF", badgeFg: "#4C2FA8" },
future: { en: "Credit & Long-Term", zh: "信貸與長線", color: "#2F9A4C", badgeBg: "#E5F5E9", badgeFg: "#1B6B33" },
};
const QUESTIONS = [
{
id: "d01_peek", sprintDay: 1, cat: "save", item: "transitcard", good: "yes",
en: "Did you take 10 seconds today to peek at your main bank or Octopus balance without judging yourself?",
zh: "今日有冇花10秒睇吓自己常用銀行戶口或者八達通餘額（唔批評自己，純粹知情）？",
yesText: ["Yes, I checked!", "有，睇咗！"],
noText: ["Not yet today", "今日仲未"],
tip: [
"Awareness beats willpower. Knowing your real balance before spending stops accidental overdrafts and late fees.",
"知情勝過死忍。出街消費前睇清餘額，最簡單就避開唔覺意使凸。"
],
rescue: [
"Open your bank or Octopus app right now and glance at your balance for 5 seconds. No spreadsheet needed.",
"而家打開銀行或八達通App望5秒餘額就搞掂，唔使記數住，做到即刻打卡！"
],
},
{
id: "d02_pause", sprintDay: 2, cat: "spend", item: "polobun", good: "yes",
en: "Before buying a drink, snack, or extra ride today, did you pause 3 seconds to ask “do I actually want this right now”?",
zh: "今日買飲品、小食或者想搭貴啲車之前，有冇停3秒問自己「係咪真係想要」？",
yesText: ["Yes, I paused!", "有，停咗諗一諗！"],
noText: ["Bought on autopilot", "慣性買咗／未試"],
tip: [
"A 3-second pause breaks autopilot spending. Swapping one HK$42 café drink for an HK$8 pineapple bun twice a week saves ~HK$3,500 a year.",
"停3秒可以打破慣性消費。一星期有兩次將HK$42咖啡換做HK$8菠蘿包，一年就儲多約HK$3,500。"
],
rescue: [
"Pick one small autopilot purchase you'll swap or skip on your very next meal or commute, and lock that swap in now.",
"而家為下一餐或下一程車揀定一個想慳返嘅小消費（例如走飲品／行多五分鐘），即刻做到！"
],
},
{
id: "d03_topspend", sprintDay: 3, cat: "spend", item: "passbook", good: "yes",
en: "Can you name your single biggest expense from the past 24 hours off the top of your head?",
zh: "唔使估，你講唔講得出過去24小時自己最大筆嗰項消費係咩？",
yesText: ["Yes, I know it", "講得出！"],
noText: ["Can't recall", "唔記得了"],
tip: [
"You don't need to log every dollar on Day 3. Spotting your top daily outflow already shows where 60%+ of your money goes.",
"第3日唔使記晒每毫子，只要睇實每日最大筆嗰項支出，已經掌握咗六成以上資金流向。"
],
rescue: [
"Glance at your PayMe, Octopus, or bank transaction list right now just to spot yesterday's #1 expense.",
"而家打開PayMe、八達通或銀行紀錄望一望尋日最大筆係邊項，睇完即刻返嚟打卡！"
],
},
{
id: "d04_flashsale", sprintDay: 4, cat: "spend", item: "smartphone", good: "no",
en: "Did a flash sale, “add HK$X for free shipping”, or buy-now-pay-later prompt talk you into an unplanned buy today?",
zh: "今日有冇俾限時優惠、「差少少免運費」或者先買後付廣告引到買咗原本唔打算買嘅嘢？",
yesText: ["Yes, got tempted", "有，忍唔住手"],
noText: ["No, dodged it!", "冇中伏！"],
tip: [
"“Free shipping” isn't free if you spend HK$120 extra to save HK$30. BNPL splits disguise the real price until next month's bill.",
"為慳HK$30運費而夾硬買多HK$120唔等使嘅嘢，其實使多咗；「先買後付」亦只係將張單推去下個月。"
],
rescue: [
"Turn off notifications for one shopping app right now, or put your next cart item on a 24-hour cooling-off wait.",
"而家熄咗其中一個網購App通知，或者將購物車件貨擺夠24小時冷靜期先決定，即刻打卡！"
],
},
{
id: "d05_subs", sprintDay: 5, cat: "spend", item: "calculator", good: "yes",
en: "Have you checked your active app subscriptions or free trials recently so nothing forgotten auto-renews?",
zh: "最近有冇檢查過手機訂閱（Streaming、App、免費試用），確保冇「忘記取消」嘅自動續費？",
yesText: ["Yes, all checked", "有，check清楚！"],
noText: ["Haven't checked", "仲未檢查"],
tip: [
"Two forgotten HK$68/month subscriptions quietly drain HK$1,632 a year without adding real value.",
"兩個唔記得cut嘅HK$68月費，一年就悄悄流走HK$1,632，仲要完全冇用過。"
],
rescue: [
"Open your phone's Subscriptions page (App Store / Google Play) right now and scan the active list for 15 seconds.",
"而家打開App Store或Google Play「訂閱項目」望15秒，睇清有冇唔想續期嘅試用，即刻打卡！"
],
},
{
id: "d06_seedpot", sprintDay: 6, cat: "save", item: "piggybank", good: "yes",
en: "This week, did you move even a tiny starter amount (HK$20–HK$50) into a separate savings pot or account?",
zh: "今個星期有冇試過將就算好細數目（例如HK$20–HK$50）轉入另一個獨立儲蓄戶口／錢罌？",
yesText: ["Yes, saved a bit!", "有，撥咗少少！"],
noText: ["Not yet this week", "今個星期未"],
tip: [
"Habit beats size. Separating savings from your daily spending account creates healthy friction before you spend it.",
"習慣大過銀碼。將儲蓄同日常消費戶口分開，使錢前就會多一層自然保護。"
],
rescue: [
"FPS or transfer HK$20 (the price of one milk tea) into a separate savings pot right now to start the snowball.",
"而家即刻FPS轉HK$20（一杯奶茶錢）去另一個儲蓄戶口當起動金，轉完即刻打卡！"
],
},
{
id: "d07_weekcap", sprintDay: 7, cat: "spend", item: "lunchbox", good: "yes",
en: "Halfway through the 14-day sprint! Do you have a clear 7-day pocket-money cap for food, transport & fun this week?",
zh: "來到14日衝刺一半！今個星期有冇為自己定一個清晰嘅「7日食買玩上限」？",
yesText: ["Yes, I have a cap", "有定上限！"],
noText: ["No number yet", "未定銀碼"],
tip: [
"A weekly budget beats a vague monthly one because a 7-day limit is short enough to adjust before payday.",
"定「每週上限」比籠統定「每月預算」易守得多，就算頭幾日使多咗，同一星期內都即刻追得返。"
],
rescue: [
"Write one realistic HK$ number in your phone notes right now for this week's flexible food + fun budget.",
"而家喺手機備忘錄寫低一個今個星期「食＋買＋玩」嘅實際銀碼上限，寫好即刻打卡！"
],
},
{
id: "d08_cc_autopay", sprintDay: 8, cat: "future", item: "passbook", good: "yes",
en: "Have you set up full-balance credit card autopay (or a 3-day-early alarm), or kept HK$0 card and BNPL debt?",
zh: "有冇設定信用卡「自動轉賬全數找清」（或到期前3日行事曆提醒），或者本身零卡數零先買後付？",
yesText: ["Yes, protected!", "有設定／零卡數！"],
noText: ["Not set up yet", "仲未設定"],
tip: [
"Hong Kong credit card interest often exceeds 30% APR. Paying only the minimum on HK$20,000 can drag on for years and cost thousands in interest.",
"香港信用卡實際年利率好多時超過30%。若果只還最低還款額，HK$20,000卡數可以滾成幾年債同幾千蚊利息。"
],
rescue: [
"Open your banking app's Autopay / eDDA menu right now, or add a recurring calendar alarm 3 days before your card due date.",
"而家打開銀行App睇吓自動轉賬找清卡數設定，或者即刻喺手機行事曆加個到期前3日每月提醒！"
],
},
{
id: "d09_scamcheck", sprintDay: 9, cat: "scam", item: "lemontea", good: "no",
en: "This week, did you click any unknown SMS/DM link, share an OTP, or entertain a “guaranteed return” investment tip?",
zh: "今個星期有冇撳過不明來歷短訊／DM連結、俾過OTP驗證碼，或者心動想試「保證回報」貼士？",
yesText: ["Yes, nearly/did", "有啲中招／差啲"],
noText: ["No, stayed sharp!", "完全冇，好清醒！"],
tip: [
"Check for Hong Kong's “#” Registered SMS Sender prefix, search the SFC Alert List, and call the Anti-Scam Helpline 18222 whenever in doubt.",
"認住香港已登記短訊發送人「#」字頭、上證監會警示名單查清楚，有懷疑即打防騙易18222！"
],
rescue: [
"Save “Anti-Scam 18222 防騙易” into your phone contacts right now so you can verify suspicious calls in one tap.",
"而家將「18222 防騙易」存入電話聯絡人，以後收到可疑電話或訊息一秒就查到！"
],
},
{
id: "d10_payday_auto", sprintDay: 10, cat: "save", item: "ricesack", good: "yes",
en: "Have you set up (or scheduled) an automatic transfer on payday/allowance day so 10%–20% moves to savings first?",
zh: "有冇設定出糧／收零用錢當日「自動轉賬先儲10%–20%」，等自己唔使靠意志力儲錢？",
yesText: ["Yes, automated!", "有，自動轉賬！"],
noText: ["Manual / not yet", "人手儲／未設定"],
tip: [
"Pay yourself first: HK$1,500 automated every month grows to HK$18,000 a year before you ever feel it missing.",
"先儲後使最易堅持：每月出糧自動撥走HK$1,500，一年不知不覺就儲到HK$18,000。"
],
rescue: [
"Set a standing instruction in your banking app right now, or schedule a recurring payday alert to transfer savings first.",
"而家喺銀行App設定每月定期轉賬，或者加一個每月出糧日「先儲後使」提醒，即刻做到！"
],
},
{
id: "d11_buffer_num", sprintDay: 11, cat: "save", item: "steamer", good: "yes",
en: "Do you know your Stage-1 Emergency Fund number (1 month of essential rent, food & bills, building toward 3–6 months)?",
zh: "你知唔知自己「第一階段應急錢」目標銀碼係幾多（先儲夠1個月基本開支，再慢慢儲到3–6個月）？",
yesText: ["Yes, I know it", "知道目標銀碼！"],
noText: ["Haven't calculated", "未計過"],
tip: [
"An emergency fund turns a sudden job gap or medical bill into a solvable hiccup instead of 30% credit card debt.",
"有筆應急錢傍身，就算突然轉工或者要睇醫生，都唔會被迫碌高息卡頂數。"
],
rescue: [
"Multiply your monthly bare-minimum living costs by 1 right now and write that Stage-1 buffer goal in your notes.",
"而家計一計自己1個月最基本必要開支（食、住、交通、電話費），寫低做第一階段目標即刻打卡！"
],
},
{
id: "d12_apr_rule", sprintDay: 12, cat: "future", item: "calculator", good: "yes",
en: "Before signing any phone plan, BNPL, or loan offer, do you know to check the APR (實際年利率) instead of “monthly flat rate”?",
zh: "揀手機分期、先買後付或借貸前，你記唔記得要睇「實際年利率 (APR)」而唔好淨睇「每月平息」？",
yesText: ["Yes, always check APR", "記得，一定睇APR！"],
noText: ["Need a refresher", "唔太清楚分別"],
tip: [
"A “0.5% monthly flat rate” sounds tiny, yet its real APR is roughly 11%+ because you keep paying interest on the original principal.",
"「每月平息0.5%」聽落好低，但因為本金一直扣減而利息照原數計，實際年利率往往高達11%以上！"
],
rescue: [
"Lock in this 10-second rule right now: Monthly flat rate × 1.9 ≈ rough APR; if an ad hides the APR, walk away.",
"而家記實呢條10秒口訣：「每月平息 × 1.9 ≈ 實際年利率；唔肯寫APR就唔好簽」，記好即刻打卡！"
],
},
{
id: "d13_mpf_long", sprintDay: 13, cat: "future", item: "textbooks", good: "yes",
en: "Have you checked your MPF / long-term investment fees, or kept long-term savings separate from daily spending?",
zh: "有冇睇過自己強積金／長線投資收費（或者將長線儲蓄同日常使費徹底分開戶口）？",
yesText: ["Yes, separated/checked", "有分開／有檢查！"],
noText: ["All mixed / unchecked", "未分開／未睇過"],
tip: [
"Over 35–40 years, a 1% lower annual fund fee can mean tens of thousands more HK$ waiting for you in retirement.",
"複利行35至40年，每年少1%基金收費，退休時可以多返一大筆真實回報。"
],
rescue: [
"Bookmark the MPFA Fund Platform right now, or rename one bank savings pot “Do Not Touch 長線基金” to separate it today.",
"而家Bookmark積金局基金平台，或者將其中一個儲蓄戶口改名為「長線唔郁得」，即刻打卡！"
],
},
{
id: "d14_keeper", sprintDay: 14, cat: "future", item: "laisee", good: "yes",
en: "Day 14 Sprint Finale! Have you kept at least ONE concrete money habit from the last two weeks running into next month?",
zh: "14日衝刺大結局！過去兩星期入面，你有冇至少建立到「一個」會繼續帶去下個月嘅理財習慣？",
yesText: ["Yes, I'm keeping it!", "有，繼續維持落去！"],
noText: ["Pick my #1 right now", "即刻揀定一個！"],
tip: [
"One automated transfer or full-balance autopay beats ten New Year resolutions. From Day 15 onward, every day keeps stacking your harbour!",
"一個自動轉賬或者全數自動找數，勝過十個空想目標。由第15日開始，每日繼續幫你座海傍疊高！"
],
rescue: [
"Choose your #1 keeper habit right now (e.g. full card autopay, payday auto-save, or weekly cap) and commit to it for 30 days.",
"而家喺心入面選定一個最啱你嘅習慣（自動找清卡數／出糧先儲／每週上限），即刻打卡完成14日衝刺！"
],
},
{
id: "inf01_water", sprintDay: null, cat: "spend", item: "lemontea", good: "yes",
en: "Did you bring your own water bottle or umbrella today instead of buying a convenience-store impulse extra?",
zh: "今日有冇自備水樽或者遮，慳返一筆便利店臨時補給費？",
yesText: ["Yes, brought my own", "有自備！"],
noText: ["Bought on the go", "臨急買咗"],
tip: [
"Small convenience markups add up: HK$14 bottled drinks × 20 days = HK$280/month — a whole weekend dinner.",
"便利店細額消費累積好快：每日HK$14飲品一個月就HK$280，夠食一餐好啲嘅飯。"
],
rescue: [
"Pack a reusable bottle or fold-up umbrella by your door or in your bag right now for tomorrow morning.",
"而家順手放定水樽或縮骨遮喺門口／袋入面，聽朝出門即刻用得着！"
],
},
{
id: "inf02_48h", sprintDay: null, cat: "spend", item: "handbag", good: "yes",
en: "For any non-essential item over HK$500 this week, did you apply a 48-hour cooling-off pause before buying?",
zh: "今個星期見到超過HK$500嘅非必要心頭好，有冇先冷靜48小時先決定買唔買？",
yesText: ["Yes, cooled off!", "有冷靜48小時！"],
noText: ["Bought right away", "即刻買咗"],
tip: [
"Most impulse cravings fade within 48 hours. Waiting turns “do I want a dopamine hit” into “will I use this next month?”.",
"大部分衝動購物慾望過48小時就會退燒，等一等即刻分清「想要」定「需要」。"
],
rescue: [
"Add a “48h Wish List” note on your phone right now and move the next non-essential item you're eyeing onto it.",
"而家喺手機開個「48小時願望清單」，將下一件想買嘅嘢放落去等兩日！"
],
},
{
id: "inf03_twodish", sprintDay: null, cat: "spend", item: "lunchbox", good: "yes",
en: "Did you choose a value meal (home lunch, canteen, or 兩餸飯) today instead of pricey delivery-app markups?",
zh: "今日有冇揀自備飯盒、飯堂或者兩餸飯，避開外賣平台加價同運費？",
yesText: ["Yes, ate smart!", "有，食得精明！"],
noText: ["Ordered pricey delivery", "叫咗貴外賣"],
tip: [
"Delivery fees + platform markups easily add 30%–45% per meal. Saving HK$45 per lunch twice a week frees HK$4,680 a year.",
"外賣加價加運費隨時貴三四成。每星期慳兩餐午餐HK$45，一年就多HK$4,680。"
],
rescue: [
"Plan tomorrow's budget-friendly lunch spot or prep ingredients tonight so you don't default to delivery when hungry.",
"而家揀定聽日午餐去邊間性價比高嘅餐廳或者準備帶飯，聽日肚餓時就唔使撳貴外賣！"
],
},
{
id: "inf04_fps_split", sprintDay: null, cat: "save", item: "transitcard", good: "yes",
en: "When friends split a meal or group gift recently, did you settle or collect FPS / PayMe shares promptly?",
zh: "最近同朋友夾錢食飯或買禮物，有冇盡快用FPS／PayMe找清或者收齊條數？",
yesText: ["Yes, settled cleanly", "有，數目分明！"],
noText: ["Still pending", "仲未找／未收齊"],
tip: [
"Unclaimed splits quietly eat your budget while awkwardness grows. Settling within 24 hours keeps friendships and cash flow clean.",
"夾錢唔好拖，24小時內過數或溫馨提示收返，對友情同自己現金流都最好。"
],
rescue: [
"Send one polite PayMe/FPS reminder or settle any pending split right now in 15 seconds.",
"而家花15秒過清未找嘅夾錢，或者禮貌傳個PayMe/FPS提示畀朋友！"
],
},
{
id: "inf05_taxi", sprintDay: null, cat: "spend", item: "taxi", good: "no",
en: "Did you hail a taxi or rideshare today purely out of rushing when an MTR/bus option was realistic?",
zh: "今日有冇只係因為遲出門口，而搭咗的士／網約車代替原本搭到嘅港鐵或巴士？",
yesText: ["Yes, took a cab", "有，趕時間搭咗"],
noText: ["No, took transit/walked", "冇，搭公共交通！"],
tip: [
"Five extra minutes out the door saves HK$70–HK$120 per trip — one of the highest hourly rates you'll ever pay yourself.",
"早5分鐘出門口就可以慳HK$70–HK$120車費，性價比高過好多兼職。"
],
rescue: [
"Set your morning alarm or departure reminder 10 minutes earlier right now for tomorrow's first trip.",
"而家將聽朝個鬧鐘或出門提醒校早10分鐘，即刻為聽日慳返程車錢！"
],
},
{
id: "inf06_unitprice", sprintDay: null, cat: "spend", item: "eggtart", good: "yes",
en: "On your latest grocery or online shop, did you check the unit price (per 100g / per piece) instead of just the big promo sticker?",
zh: "最近買日用品或零食，有冇望一望每100克／每件單價，而唔係淨睇「特價大牌」？",
yesText: ["Yes, compared unit price", "有計過單價！"],
noText: ["Just grabbed the promo", "淨睇特價買咗"],
tip: [
"“2-for-HK$40” packs sometimes cost more per gram than the regular shelf size. Unit pricing spots real bargains in 3 seconds.",
"「兩件優惠價」有時除返開反而貴過普通裝，3秒望吓淨重單價就唔會買錯。"
],
rescue: [
"Pick one household staple you buy often and check its price-per-unit online or on your last receipt right now.",
"而家揀一樣常用日用品（紙巾／米／飲品），望一望最近收據或網店每件單價！"
],
},
{
id: "inf07_util", sprintDay: null, cat: "future", item: "calculator", good: "yes",
en: "Is your total credit card balance currently below 30% of your credit limit (and payable in full this month)?",
zh: "你而家信用卡已用額度係咪保持喺信用額30%以下，而且今個月全數找得到？",
yesText: ["Yes, low & payable", "係，低使用率！"],
noText: ["Higher than 30% / tight", "超過30%／有啲緊"],
tip: [
"Keeping credit utilisation low protects your TransUnion (TU) credit score for future flat rentals, mortgages, and job checks.",
"維持低信貸使用率有助保持良好環聯(TU)信貸評級，將來租樓、按揭甚至部分工種都會睇。"
],
rescue: [
"Make a small early mid-month card payment right now or pause non-essential card swipes until statement day.",
"而家預先找少少卡數落去，或者呢幾日暫停非必要碌卡直到出結單！"
],
},
{
id: "inf08_tu_check", sprintDay: null, cat: "future", item: "passbook", good: "yes",
en: "Do you know you can check your credit report once a year (or via Credit Data Smart) to spot unauthorised loans early?",
zh: "你知唔知香港市民可以定期查閱自己「信資通」個人信貸報告，及早發現有冇被冒名借貸？",
yesText: ["Yes, aware / checked", "知道／查過！"],
noText: ["Didn't know that", "唔知有得查"],
tip: [
"Under Hong Kong's Credit Data Smart (信資通), you can request a free credit report every 12 months from each agency to verify accuracy.",
"透過「信資通」，每12個月可向各信貸資料服務機構免費索取一份個人信貸報告核對。"
],
rescue: [
"Search or bookmark “Credit Data Smart 信資通 HK” right now so you remember to do an annual credit check.",
"而家搜尋或Bookmark「信資通 Credit Data Smart」，記住每年免費檢查一次！"
],
},
{
id: "inf09_callverify", sprintDay: null, cat: "scam", item: "lemontea", good: "no",
en: "If someone called claiming to be a bank, courier, or official asking to move funds or install an APK, would you comply?",
zh: "如果有人自稱銀行、速遞或執法人員叫你轉錢去「安全戶口」或裝不明App，你會唔會跟住做？",
yesText: ["Might panic & follow", "驚起上嚟可能信"],
noText: ["Hang up & verify!", "即收線自己查證！"],
tip: [
"Real banks and police never ask for passwords, OTPs, or transfers to “safe accounts”. Hang up and dial the official number yourself.",
"真銀行同真警察永遠唔會叫你俾密碼、OTP或者轉錢去安全戶口。收線後自己打官方電話核實！"
],
rescue: [
"Use Scameter (防騙視伏器) or save 18222 right now, and tell one family member this hang-up rule today.",
"而家將「防騙視伏器 Scameter」加入書籤，或者同屋企人講一聲「叫轉錢即收線」！"
],
},
{
id: "inf10_2fa", sprintDay: null, cat: "scam", item: "passbook", good: "yes",
en: "Are your banking apps protected with biometric/2FA login and a sensible daily FPS transfer limit (not set to max)?",
zh: "你啲銀行App有冇開齊生物認證／雙重認證，同埋將每日FPS轉賬限額設喺合理夠用水平（唔係預設最高）？",
yesText: ["Yes, limits & 2FA set", "開齊兼限額合理！"],
noText: ["Default max / unsure", "預設最高／未睇過"],
tip: [
"Lowering your daily FPS / overseas ATM limit takes 30 seconds and caps worst-case loss if a phone or card is ever compromised.",
"調低每日轉賬同海外提款限額只需30秒，萬一手機或卡出事，最大風險即刻鎖細好多。"
],
rescue: [
"Open one banking app right now and inspect your Daily Transfer Limit — lower any unused sky-high limit.",
"而家打開常用銀行App睇一眼每日轉賬上限，將唔需要咁高嘅限額調低少少！"
],
},
{
id: "inf11_milktea", sprintDay: null, cat: "spend", item: "milktea", good: "no",
en: "Did you buy pricey specialty drinks or bubble tea multiple times this week out of stress or habit?",
zh: "今個星期有冇因為壓力大或者純粹順手，買咗好幾杯貴價手搖飲品／咖啡？",
yesText: ["Yes, habit crept up", "有，買密咗"],
noText: ["Kept it mindful!", "冇，有節制！"],
tip: [
"Treating yourself is fine when intentional! Try the “every other day” rule so treats stay special and cost half as much.",
"獎勵自己冇問題，只要有意識地揀：試吓「隔日一杯」法則，享受一樣但使少一半。"
],
rescue: [
"Swap tomorrow's specialty drink for home-brewed tea or café-free water and transfer that HK$35 straight to savings.",
"而家決定聽日飲水或自家沖茶，將慳返嗰HK$35即刻撥去儲蓄戶口！"
],
},
{
id: "inf12_networth", sprintDay: null, cat: "save", item: "piggybank", good: "yes",
en: "Do you do a quick 3-minute check of total cash minus total debt once a month so you always know your real net trend?",
zh: "有冇習慣每個月花3分鐘計一計「總現金減總欠款」，睇清自己身家係咪真係向上行？",
yesText: ["Yes, monthly check", "有每月盤點！"],
noText: ["Never tallied both", "未一齊計過"],
tip: [
"Income looks big on payday, but net worth (assets minus debt) tells the true story. Watching it climb is addictive!",
"出糧數字好睇唔等於留得住，每月睇實「資產減負債」，見到淨值慢慢升超有滿足感！"
],
rescue: [
"Do a 60-second tally right now: rough cash/savings total minus any card or BNPL balance owed today.",
"而家花60秒粗略計一計：手頭儲蓄減去所有卡數／分期欠款，睇清今日起點！"
],
},
{
id: "inf13_festival", sprintDay: null, cat: "save", item: "laisee", good: "yes",
en: "Do you set aside a little each month for upcoming big seasonal costs (birthdays, trips, tax, or lai see) instead of panic-spending?",
zh: "對於可預見嘅季節性大額開支（生日飯、旅行、稅項、利是），你有冇提早每月撥少少準備？",
yesText: ["Yes, sinking fund!", "有預早儲備！"],
noText: ["Handle it last minute", "到時先算"],
tip: [
"Birthdays, tax bills, and holidays aren't emergencies — they happen every year. Saving HK$300/month prevents December credit card shock.",
"交稅、生日同大時大節年年都有，唔算突發事；每月先儲HK$300做預備基金，到時就唔使肉痛。"
],
rescue: [
"Name your next upcoming big expense (trip, tax, or gift) and write down how many months away it is right now.",
"而家諗定下一個已知大開支（旅行／交稅／送禮），寫低仲有幾個月準備！"
],
},
{
id: "inf14_declutter", sprintDay: null, cat: "spend", item: "textbooks", good: "yes",
en: "Before buying new gear, clothes, or books lately, did you check what you already own or could buy second-hand?",
zh: "最近買新裝備、衫褲或書之前，有冇先睇吓屋企係咪已經有，或者可唔可以買二手？",
yesText: ["Yes, checked/reused", "有睇過先買！"],
noText: ["Bought brand new fast", "直接買咗全新"],
tip: [
"Buying second-hand textbooks, gadgets, or selling unused items on Carousell recovers cash and keeps clutter out of small HK flats.",
"買二手書同器材、或者放走屋企唔用嘅嘢，既慳空間又多一筆現金流。"
],
rescue: [
"Pick one item sitting unused in your room right now to list, donate, or replace a planned purchase.",
"而家望一望間房，揀一樣放咗喺度半年都冇用嘅嘢準備放售或送人，即刻打卡！"
],
},
{
id: "inf15_seppot", sprintDay: null, cat: "save", item: "ricesack", good: "yes",
en: "Is your Emergency Fund parked in a separate account (not linked to your everyday Octopus auto-reload or tap-to-pay card)?",
zh: "你筆應急錢係咪放喺獨立戶口，唔會同日常拍卡消費或八達通自動增值連埋一齊？",
yesText: ["Yes, kept separate", "係，分開擺！"],
noText: ["All in one account", "全部擺同一個戶口"],
tip: [
"Keeping your safety buffer in a separate high-interest or no-card account stops everyday spending from quietly nibbling into it.",
"將應急錢放喺唔連提款卡消費嘅高息儲蓄戶口，平時日常開支就唔會唔覺意咬蝕佢。"
],
rescue: [
"Check if your bank lets you open a free sub-account / Goal Savings pot right now so your buffer has its own home.",
"而家睇吓銀行App有冇免費開「目標儲蓄／子戶口」功能，幫應急錢搵個獨立屋企！"
],
},
{
id: "inf16_sfc_reg", sprintDay: null, cat: "scam", item: "calculator", good: "yes",
en: "Do you know how to verify whether an investment platform or “advisor” is actually licensed in Hong Kong?",
zh: "如果有人推介投資平台或做「理財顧問」，你知唔知點樣免費查證佢喺香港有冇攞牌？",
yesText: ["Yes, SFC register!", "知，上證監會公眾紀錄冊！"],
noText: ["Not sure where to check", "唔清楚去邊查"],
tip: [
"Always check the SFC Public Register of Licensed Persons & Registered Institutions — scammers copy real company names with fake URLs.",
"一定要上證監會「持牌人及註冊機構的公眾紀錄冊」核對全名同網址，騙徒好鍾意假冒真公司名！"
],
rescue: [
"Bookmark “SFC Public Register 證監會公眾紀錄冊” right now so you never rely on screenshots sent in chat groups.",
"而家搜尋並Bookmark「證監會公眾紀錄冊」，以後唔再只信群組Cap圖！"
],
},
{
id: "inf17_receipts", sprintDay: null, cat: "spend", item: "polobun", good: "yes",
en: "Did you glance at your receipts or e-wallet breakdown before tapping pay today so nothing was mischarged?",
zh: "今日埋單或者過數前，有冇望清楚銀碼同明細，確保冇計錯數或加多咗收費？",
yesText: ["Yes, checked totals", "有睇清楚銀碼！"],
noText: ["Tapped without looking", "冇睇就拍卡"],
tip: [
"Tap-to-pay feels painless, which makes double-charges and hidden service fees easy to miss. A 2-second check keeps money in your pocket.",
"手機拍卡太方便，好易睇漏加一或重複扣數；2秒望清楚銀碼先拍卡最穩陣。"
],
rescue: [
"Look at your very last digital receipt or Octopus tap amount right now to confirm it matched what you expected.",
"而家望一眼最近一筆電子消費紀錄，核對吓同你印象中嘅銀碼一唔一樣！"
],
},
{
id: "inf18_social", sprintDay: null, cat: "spend", item: "steamer", good: "yes",
en: "When friends invited you to an expensive hangout lately, did you feel comfortable suggesting a cheaper option instead?",
zh: "最近朋友約去貴價聚會時，你敢唔敢主動提議去平啲又一樣開心嘅地方（例如茶記／野餐）？",
yesText: ["Yes, spoke up!", "敢講，大家仲開心！"],
noText: ["Went along anyway", "唔好意思講，照去"],
tip: [
"Real friends want your company, not your credit limit. Chances are half the table is secretly relieved when someone suggests a lighter option!",
"真朋友重視一齊聚，唔係要你充大頭；好多時你主動提議食平啲，成枱人仲暗暗鬆一口氣！"
],
rescue: [
"Save two fun, affordable HK hangout spots (hiking + dim sum, harbour walk + egg tart) in your notes for the next invite.",
"而家喺備忘錄記低兩個好傾又唔貴嘅約會方案（海傍散步＋蛋撻／行山＋茶記），下次即刻用到！"
],
},
{
id: "inf19_insure_gap", sprintDay: null, cat: "scam", item: "umbrella", good: "yes",
en: "Do you know what basic medical / accident coverage you already have (school, company, or family) so you don't double-buy or stay exposed?",
zh: "你清唔清楚自己而家已經有咩基本醫療／意外保障（學校、公司團體保險或家人幫買），避免重複買又唔會零保障？",
yesText: ["Yes, know my cover", "清楚自己保障範圍！"],
noText: ["Have no idea", "完全唔知"],
tip: [
"Insurance isn't an investment — pure protection (like basic medical or term life when others depend on you) shields your tower from big shocks.",
"保險本質係轉移大風險；搞清楚自己已有邊啲基本醫療保障，先唔會俾人推銷買重疊或高費保單。"
],
rescue: [
"Send a quick message to HR, check your student portal, or ask family right now what basic medical cover you have.",
"而家問一問屋企人、睇吓公司／學生醫療福利頁，搞清楚自己基本保障！"
],
},
{
id: "inf20_compounding", sprintDay: null, cat: "future", item: "piggybank", good: "yes",
en: "Did you remind yourself today that starting small in your 20s beats saving triple the amount ten years later?",
zh: "今日有冇提自己：20歲頭早少少開始儲蓄同學習理財，威力大過30歲先儲三倍錢？",
yesText: ["Yes, time is my edge!", "記得，時間係最大本錢！"],
noText: ["Felt “too small to matter”", "覺得太細銀碼冇用"],
tip: [
"Time does the heavy lifting in compounding. Even HK$500/month started early beats waiting until your salary feels “big enough”.",
"複利靠時間滾大。就算每月只儲HK$500，早十年起步往往贏過遲起步儲幾倍。"
],
rescue: [
"Calculate 12 months × whatever small amount you can save weekly right now — see how fast small drops fill a bucket!",
"而家計一計「你每星期儲到嘅細銀碼 × 52個星期」，親眼睇吓一年原來儲到幾多！"
],
},
{
id: "inf21_card_perks", sprintDay: null, cat: "spend", item: "transitcard", good: "no",
en: "Did a credit card “cashback / miles tier” tempt you into spending extra money you wouldn't have spent otherwise?",
zh: "有冇試過為咗食信用卡迎新、回贈或者儲里數門檻，而專登使多咗原本唔使使嘅錢？",
yesText: ["Yes, chased points", "有，為儲分使多咗"],
noText: ["Only earn on real needs", "只喺必要消費先儲！"],
tip: [
"Spending HK$1,000 extra to earn 2% (HK$20) cashback means you're still HK$980 poorer. Never let rewards steer the cart.",
"為賺2%（HK$20）回贈而使多HK$1,000，淨計其實少咗HK$980；回贈只係順便，唔好倒果為因。"
],
rescue: [
"Check if any card you hold charges an annual fee soon and set a reminder to call for a fee waiver (or cancel).",
"而家睇吓自己張卡幾時收年費，加個提醒到時打去免年費或考慮取消唔用嘅卡！"
],
},
{
id: "inf22_side_tax", sprintDay: null, cat: "future", item: "passbook", good: "yes",
en: "When earning freelance, tutoring, or part-time income, do you set aside a slice for future expenses/tax instead of spending 100%?",
zh: "接到補習、Freelance或者兼職外快時，你有冇先撥起一成至兩成做儲備／稅款，而唔係100%即刻使晒？",
yesText: ["Yes, slice saved first!", "有先撥起一份！"],
noText: ["Spent the whole payout", "收到即刻使晒"],
tip: [
"Irregular income feels like bonus money, making it tempting to splurge. Treating 20% as untouchable builds stability fast.",
"兼職外快好易當咗「額外獎金」一次過使晒；先鎖起20%，收入唔穩定都可以好穩陣。"
],
rescue: [
"Write a simple “80/20 side-income rule” in your notes right now: 20% straight to savings before treating yourself.",
"而家記低自己嘅「外快80/20法則」：一收兼職錢先撥20%入儲蓄，剩低先獎勵自己！"
],
},
{
id: "inf23_mule_no", sprintDay: null, cat: "scam", item: "eggtart", good: "no",
en: "Would you ever lend, sell, or “rent” your bank account, PayMe, or SIM card even to someone claiming it's for harmless promo payouts?",
zh: "就算有人話「只係幫手收吓推廣費／借戶口用幾日」，你會唔會借出或租出自己銀行戶口、PayMe或電話卡？",
yesText: ["Wait, is it risky?", "唔係好清楚風險"],
noText: ["Never! Zero tolerance!", "絕對唔會！"],
tip: [
"Never lend an account or SIM. In Hong Kong, money laundering carries up to 14 years' imprisonment and freezes all your accounts.",
"租借賣戶口即係做傀儡戶口，香港洗黑錢最高可判監14年兼所有戶口被凍結，千萬唔好試！"
],
rescue: [
"Lock in the golden rule right now: Your bank account, FPS, and ID belong strictly to you — “No exceptions, not even for friends”.",
"而家記實呢條鐵律：「自己戶口同身份證一蚊都唔借、親朋戚友都唔例外」，記好即刻打卡！"
],
},
{
id: "inf24_goal_name", sprintDay: null, cat: "save", item: "piggybank", good: "yes",
en: "Does your main savings pot have a real name and target (e.g. “HK$10k Peace-of-Mind Fund” or “Grad Trip”) rather than just “extra cash”?",
zh: "你個儲蓄目標有冇明確名堂同銀碼（例如「HK$10,000安心基金」或「畢業旅行」），而唔係籠統叫「剩低嘅錢」？",
yesText: ["Yes, named & clear!", "有名有目標！"],
noText: ["Just nameless cash", "未定名堂同銀碼"],
tip: [
"Naming a savings goal makes you far less likely to raid it for random sales — you feel what you're trading away.",
"幫儲蓄改個具體名堂，想買嘢郁用之前就會諗到「我係拎緊旅行／安心錢去買」，自然忍得住手。"
],
rescue: [
"Give your savings goal a concrete name and HK$ target right now (in your banking app or in a quick phone note).",
"而家即刻幫你個儲蓄戶口或備忘錄寫個具體目標名稱同銀碼（例如：安心備用金 HK$10,000）！"
],
},
{
id: "inf25_bnpl", sprintDay: null, cat: "future", item: "smartphone", good: "no",
en: "Did you split an everyday purchase (food, clothes, concert ticket) into multi-month instalments or BNPL today?",
zh: "今日有冇將日常消費（衫褲、食飯、演唱會飛或Gadget）拆做幾個月「先買後付」或分期？",
yesText: ["Yes, split the bill", "有，揀咗分期"],
noText: ["No, paid in cash/full!", "冇，全數清／唔買！"],
tip: [
"If you need 4 instalments to afford an everyday item, today's budget is quietly telling you to pause and save first.",
"如果連日常消費都要分幾期先買到，其實即係提醒你要儲夠先買，唔好預支下個月人工。"
],
rescue: [
"List every active instalment / BNPL payment you currently owe and circle the month each one finishes.",
"而家寫低自己手上仲有幾多單分期未供完，睇清幾時正式清晒佢，即刻打卡！"
],
},
{
id: "inf26_teach_one", sprintDay: null, cat: "future", item: "laisee", good: "yes",
en: "Have you shared one practical money or anti-scam tip from 3 Fall Crab with a friend or family member this week?",
zh: "今個星期有冇同朋友或屋企人分享過一個喺3 Fall Crab學到嘅理財或防騙貼士？",
yesText: ["Yes, shared a tip!", "有同人分享！"],
noText: ["Haven't mentioned yet", "仲未同人講"],
tip: [
"Teaching one tip (like 18222 or checking APR) locks the habit in your own brain and protects the people you care about.",
"同身邊人講一次防騙18222或者點睇APR，既幫到屋企人朋友，亦令自己記得更牢！"
],
rescue: [
"Send a quick 1-line message to a friend or family group right now sharing one tip (e.g. “Save 18222 for scam checks!”).",
"而家喺WhatsApp家庭或朋友群組講一句貼士（例如「記得有可疑電話打18222查證」），即刻打卡！"
],
},
];
const PIER_MILESTONES = [
{ day: 1, prop: "piggy", en: "Pier Foundation & Piggy Bank", zh: "海傍地基＋小錢罌", descEn: "Your clay pier rises out of Victoria Harbour with a shiny starter piggy bank.", descZh: "維港海傍起好第一塊儲蓄地基，放上你隻開運小錢罌。" },
{ day: 2, prop: "bakery", en: "HK Bakery Cart (菠蘿包)", zh: "街坊麵包車（菠蘿包）", descEn: "A warm pineapple bun cart parks on the pier. Small daily swaps add up fast.", descZh: "暖笠笠菠蘿包車泊好碼頭，每日細細個理財替換慢慢儲大。" },
{ day: 3, prop: "kiosk", en: "Octopus & Passbook Kiosk", zh: "八達通與存摺小亭", descEn: "Your personal balance kiosk lights up so every dollar has a clear home.", descZh: "存摺小亭亮起燈，睇清出入數目自然更有安全感。" },
{ day: 4, prop: "floor1", en: "1/F Shopfront + Bamboo Scaffold", zh: "1樓店面＋竹棚架", descEn: "Hong Kong bamboo scaffolding hoists up 1/F of your Life Tower.", descZh: "香港師傅搭起竹棚，幫你座人生塔升上1樓。" },
{ day: 5, prop: "pantry", en: "Home Pantry & Rice Sack", zh: "自家糧倉（一包米）", descEn: "A plump clay rice sack and bamboo steamer anchor your kitchen floor.", descZh: "一包飽滿嘅米同蒸籠進駐1樓，基本生活穩穩陣陣。" },
{ day: 6, prop: "neon", en: "2/F Cha Chaan Teng Neon Sign", zh: "2樓茶餐廳霓虹招牌", descEn: "A glowing pink and teal neon sign joins 2/F of your growing HK tower.", descZh: "2樓掛起粉紅配湖水綠霓虹燈牌，港味十足。" },
{ day: 7, prop: "ferry", en: "Week 1 Insurance Net & Star Ferry", zh: "第1週保險網＋天星小輪", descEn: "A green-and-white harbour ferry cruises past and unlocks your Insurance Net shield.", descZh: "綠白小輪駛過海面，同時解鎖第一個防斷纜「保險網」。" },
{ day: 8, prop: "vault", en: "Autopay Gold Padlock Vault", zh: "自動轉賬金鎖寶庫", descEn: "A gleaming gold padlock secures your savings against card-interest traps.", descZh: "金色定期鎖穩陣鎖住儲蓄，唔怕卡數利息咬蝕。" },
{ day: 9, prop: "laundry", en: "3/F Dim Sum Terrace & Laundry Poles", zh: "3樓點心露台＋晾衫竹", descEn: "Classic HK bamboo laundry poles and dim sum steamers fill 3/F.", descZh: "3樓添置港式晾衫竹同點心蒸籠，生活煙火氣滿滿。" },
{ day: 10, prop: "lighthouse", en: "18222 Anti-Scam Lighthouse", zh: "18222防騙燈塔", descEn: "A bright harbour beacon watches over your pier to spot scams from afar.", descZh: "碼頭旁亮起防騙燈塔，遠遠照清所有可疑連結同電話。" },
{ day: 11, prop: "jack", en: "Jack Joins the Pier", zh: "Jack 登場陪你守塔", descEn: "Clay Jack arrives on the terrace cheering on your emergency fund.", descZh: "黏土Jack嚟到露台一齊幫手守住你筆應急基金。" },
{ day: 12, prop: "loft", en: "4/F Study Loft & Tangerine Pot", zh: "4樓書房閣樓＋大吉盆栽", descEn: "Your tower climbs to 4/F with a lucky tangerine tree and calculator desk.", descZh: "人生塔升上4樓！擺好大吉盆栽同計數機書枱，計清APR。" },
{ day: 13, prop: "junk", en: "Red-Sail Junk & Golden Sky", zh: "紅帆鴨靈船＋黃昏金光", descEn: "Victoria Harbour glows warm golden-hour pink as a red-sail junk glides by.", descZh: "紅帆中式帆船滑過維港，天空映出好靚嘅日落金光。" },
{ day: 14, prop: "sprint14", en: "5/F Rooftop + Jackie + Crab Halo", zh: "14日大滿貫：5樓天台＋Jackie＋蟹仔光環", descEn: "Starter Sprint done. Jackie arrives, the Crab earns a golden halo, and Infinite Mode begins.", descZh: "完成14日新手衝刺！Jackie會合、蟹仔戴上金色光環，無限擴建模式正式開啟。" },
{ day: 18, prop: "gulls", en: "Harbour Seagulls & Buoy Bell", zh: "維港海鷗＋浮標鐘", descEn: "Clay seagulls soar over the harbour as your tower rises past 6F.", descZh: "海鷗飛過維港上空，你座塔繼續一格格疊高過6樓。" },
{ day: 21, prop: "twilight", en: "Twilight Neon Skyline & Spire", zh: "夜幕霓虹燈光＋塔尖", descEn: "A 21-day habit streak lights up twilight beams across Victoria Harbour.", descZh: "21日習慣成型！維港兩岸夜幕亮起璀璨霓虹燈束。" },
{ day: 25, prop: "umbrella", en: "Tea Stall Parasol Deck", zh: "大排檔遮陽茶座", descEn: "A cheerful striped parasol deck opens on the pier.", descZh: "海傍多咗個色彩繽紛嘅茶座遮陽露台。" },
{ day: 30, prop: "tram", en: "Ding-Ding Tram Stop + Straw Hat", zh: "叮叮電車站＋蟹仔草帽", descEn: "One full month! A green HK tram rolls past the pier and the Crab gets a Sun Hat.", descZh: "滿一個月！港島叮叮電車經過海傍，蟹仔仲攞埋草帽造型。" },
{ day: 35, prop: "lanterns", en: "Festive Pier Lanterns", zh: "海傍節慶花燈", descEn: "Warm clay lanterns string across your terrace.", descZh: "天台同碼頭掛滿暖黃色節慶燈籠。" },
{ day: 45, prop: "clock", en: "Harbour Clock Tower", zh: "尖沙咀鐘樓", descEn: "An iconic red-brick clay Clock Tower rises beside your pier.", descZh: "經典紅磚海傍鐘樓矗立喺你座小天地隔離。" },
{ day: 60, prop: "treasure", en: "Two-Month Golden Junk", zh: "雙月招財寶船", descEn: "A golden dragon-sail boat joins the harbour fleet.", descZh: "一艘閃亮金色帆船加入維港船隊。" },
{ day: 75, prop: "lionrock", en: "Lion Rock Trail Pavilion", zh: "獅子山涼亭地標", descEn: "A clay pavilion crowns Lion Rock behind the skyline.", descZh: "背後獅子山頂起好小涼亭，守護成個海傍。" },
{ day: 90, prop: "peaktram", en: "Peak Sky Terrace (90 Days)", zh: "90日山頂凌霄觀景台", descEn: "Three months of steady habits, and your tower crowns the harbour skyline.", descZh: "堅持90日理財習慣，你座小天地已經成為維港最靚風景。" },
{ day: 100, prop: "centennial", en: "Day 100 Golden Crab Statue + Top Hat", zh: "百日金蟹像＋高帽禮服", descEn: "100 check-ins! A golden Crab monument and Top Hat celebrate your streak.", descZh: "第100日達成！海傍豎立金色蟹仔紀念像，蟹仔戴上高帽慶祝。" },
];
function milestoneFor(day) {
const d = Math.max(1, Math.floor(Number(day) || 1));
const exact = PIER_MILESTONES.find((m) => m.day === d);
if (exact) return exact;
if (d <= 14) return PIER_MILESTONES[d - 1];
if (d > 100 && (d - 100) % 14 === 0) {
const wing = Math.floor((d - 100) / 14);
return {
day: d,
prop: "wing_" + wing,
en: `Skyline Wing #${wing} (Day ${d})`,
zh: `天際新翼第${wing}座（第${d}日）`,
descEn: `${d} days of steady habits! A new golden skyline wing celebrates your consistency.`,
descZh: `已經堅持到第${d}日！維港天際線為你再加一座金色新翼。`,
};
}
return {
day: d,
prop: "brick_" + d,
en: `Saver Floor ${5 + (d - 14)}F`,
zh: `儲蓄第${5 + (d - 14)}層`,
descEn: `Every check-in stacks another solid clay saver floor onto your tower.`,
descZh: `每日打卡都令你座儲蓄塔穩穩地再高一層！`,
};
}
function nextMilestoneAfter(totalDays) {
const d = Math.max(0, Math.floor(Number(totalDays) || 0));
if (d < 14) return PIER_MILESTONES[d];
const fixed = PIER_MILESTONES.find((m) => m.day > d);
if (fixed) return fixed;
const nextWing = 100 + (Math.floor((Math.max(100, d) - 100) / 14) + 1) * 14;
return milestoneFor(nextWing);
}
function hashStr(s) {
let h = 2166136261;
for (let i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
}
return h >>> 0;
}
function pickQuestion(uid, totalDays, dateStr, recentQids) {
const done = Math.max(0, Math.floor(Number(totalDays) || 0));
if (done < SPRINT_DAYS) {
return QUESTIONS[done];
}
const pool = QUESTIONS.filter((q) => q.sprintDay == null);
const recent = new Set(Array.isArray(recentQids) ? recentQids.slice(-14) : []);
const avail = pool.filter((q) => !recent.has(q.id));
const list = avail.length ? avail : pool;
const idx = hashStr(String(uid || "crab") + "|" + String(dateStr || "")) % list.length;
return list[idx];
}
const byId = new Map(QUESTIONS.map((q) => [q.id, q]));
root.TFF_DAILY = {
SPRINT_DAYS,
MAX_SHIELDS,
SHIELD_EVERY,
CATEGORIES,
QUESTIONS,
PIER_MILESTONES,
questionById: (id) => byId.get(id) || null,
milestoneFor,
nextMilestoneAfter,
pickQuestion,
};
})(typeof globalThis !== "undefined" ? globalThis : window);
