// Game content shared by the game page and the leaderboard API: life stages, the 3 Falls, the Life Event cards,
// the end-of-game quiz and the habit pledges. The API checks quiz answers against `a` and labels the survey
// analysis in /admin with these texts, so when you change what a question or card asks, give it a new id
// instead of reusing the old one (otherwise old answers get counted under the new wording).
// Loaded as a plain script by index.html (sets window.TFF_CONTENT) and imported by server/api.js.
(function (root) {
"use strict";

const STAGES = [
  {at:0, en:"University", zh:"大學"},
  {at:3, en:"First job", zh:"第一份工"},
  {at:6, en:"Family", zh:"成家"},
  {at:10, en:"Retirement", zh:"退休"}
];

// eff: what a Fall does, in the 3 Falls panel; hit: the same as two short lines (English, Cantonese) for the card
// result ({loss} is filled in with the money lost)
const TRAPS = {
  spend: {en:"Overspending", zh:"過度消費", d:"Credit cards & buy-now-pay-later 信用卡、先買後付",
          eff:"A heavy debt ball and chain crashes onto your tower, followed by awkward shapes. 一個好重嘅債務鐵球會跌落你座塔度，跟住嚟嘅都係奇形怪狀嘅嘢。",
          hit:["A debt ball is coming · awkward shapes next · savings boost −0.2", "債務鐵球跌緊落嚟・跟住啲嘢奇形怪狀・儲蓄加成−0.2"]},
  scam:  {en:"Scams", zh:"騙局", d:"Fake tips, “renting” your account 貼士股、租戶口",
          eff:"You lose HK$5,000. Slippery, bouncy scam items come next, and Hold is locked. 蝕咗HK$5,000，之後跌落嚟嘅騙局物件又滑又彈，仲會鎖住暫存。",
          hit:["{loss} · slippery, bouncy items next · Hold locked", "{loss}・跟住啲嘢又滑又彈・暫存鎖住"]},
  delay: {en:"Putting off saving", zh:"拖延儲錢", d:"“I'll start next year” 「明年先儲」",
          eff:"Time speeds up for 20s and your savings boost drops back to ×1.0. 時間加速20秒，儲蓄加成打回×1.0。",
          hit:["Time speeds up for 20 s · savings boost back to ×1.0", "時間加速20秒・儲蓄加成打回×1.0"]}
};

// tag: short label for the analysis tables in /admin (also shown on the card once it's answered)
const CARDS = [
  {id:"newphone", st:0, tag:["New phone model","新款手機"], en:"Your phone still works, but the new model just launched.", zh:"部手機仲用得，但新款啱啱出咗。",
   w:["Keep it and save HK$300 a month","繼續用住先，每個月儲HK$300"], r:["Get it today with buy-now-pay-later","先買後付，即刻換機"], trap:"spend",
   tip:["Buy-now-pay-later plans stack up fast, and a missed payment can land on your credit report.","「先買後付」好易一單疊一單，遲還一期都可能影響信貸紀錄。"]},
  {id:"cards", st:0, tag:["Credit card sign-up gifts","開卡送禮"], en:"A campus booth gives a free gift for every credit card you sign up for.", zh:"校園有個攤位話，每開一張信用卡就送份禮物。",
   w:["Get one card and autopay the full balance","只開一張，設定自動找清卡數"], r:["Sign up for three and pay the minimum","一次開三張，每月只還最低還款額"], trap:"spend",
   tip:["Card interest often runs above 30% a year. Paying only the minimum lets a small balance drag on for years.","信用卡實際年利率好多時超過30%。淨係還最低還款額，細數都可以拖成幾年。"]},
  {id:"mule", st:0, tag:["“Rent” your bank account","租戶口"], en:"A stranger on Instagram offers HK$3,000 to “rent” your bank account.", zh:"IG有個陌生人出HK$3,000，想「租」你個銀行戶口。",
   w:["Refuse and report it to 18222","拒絕，打去18222防騙易熱線"], r:["Easy money. Hand it over","咁易賺，借畀佢用"], trap:"scam",
   tip:["Lending your account makes you a money mule. Money laundering in Hong Kong carries up to 14 years in prison.","借出戶口即係做「傀儡戶口」，洗黑錢最高可判監14年。"]},
  {id:"tutor", st:0, tag:["Tutoring income","補習收入"], en:"You earn HK$4,000 from part-time tutoring.", zh:"做補習賺到HK$4,000。",
   w:["Save 20% first, then spend the rest","先儲起20%，剩低先用"], r:["Spend now, save whatever is left later","照用先，剩幾多先儲幾多"], trap:"delay",
   tip:["Pay yourself first. Money saved on payday is money you can't spend by accident.","先儲後使：一收錢就儲起，就唔會唔覺意洗晒。"]},
  {id:"salary", st:1, tag:["First salary","第一份人工"], en:"First salary: HK$18,000.", zh:"第一份人工：HK$18,000。",
   w:["Save 20% (HK$3,600) automatically on payday","出糧自動儲起20%（HK$3,600）"], r:["Buy the latest phone on instalments","分期買最新款手機"], trap:"spend",
   tip:["Automating savings on payday is the easiest habit to keep. HK$3,600 a month is HK$43,200 a year.","出糧自動轉賬儲錢，最易堅持。每個月HK$3,600，一年就有HK$43,200。"]},
  {id:"crypto", st:1, tag:["“Guaranteed” crypto returns","炒幣「保證」回報"], en:"A coworker's group chat promises a “guaranteed” 30% a month on crypto.", zh:"同事個群組話炒幣「保證」每月賺30%。",
   w:["Check the SFC alert list and walk away","上證監會警示名單查吓，唔好理佢"], r:["Put in HK$10,000 before it's too late","即刻入HK$10,000，遲咗就冇"], trap:"scam",
   tip:["Nobody can guarantee high returns. The SFC keeps a Suspicious Investment Products Alert List you can search.","冇人可以保證高回報。證監會有「可疑投資產品警示名單」，隨時可以上網查。"]},
  {id:"mpf", st:1, tag:["MPF fund choice","揀強積金基金"], en:"Your MPF account is open and the fund choice is up to you.", zh:"強積金戶口開咗，揀咩基金由你話事。",
   w:["Compare funds and fees on the MPFA platform","上積金局平台比較基金同收費"], r:["Ignore it until you're 40","40歲先理"], trap:"delay",
   tip:["You and your employer each put in 5% of your salary. Fees and fund choice compound over 40 years.","你同僱主每月各供人工嘅5%。收費高低同揀邊隻基金，影響會累積40年。"]},
  {id:"trip", st:1, tag:["Japan trip","去日本旅行"], en:"Friends are planning a HK$15,000 trip to Japan next month.", zh:"朋友約你下個月去日本，要HK$15,000。",
   w:["Start a travel fund and go in six months","開個旅行基金，半年後先去"], r:["Put it all on the credit card","全部碌卡先算"], trap:"spend",
   tip:["A trip carried on a card at 30%+ interest can end up costing more than the flight and hotel.","碌卡旅行再慢慢還，利息隨時貴過機票酒店。"]},
  {id:"wedding", st:2, tag:["Wedding banquet","擺酒結婚"], en:"You're planning your wedding banquet.", zh:"準備擺酒結婚。",
   w:["Keep it within what you've saved","量力而為，唔好超出儲蓄"], r:["Take a personal loan for 30 tables","借私人貸款擺30圍"], trap:"spend",
   tip:["Borrowing for one big day can mean years of repayments while you start a family.","借錢擺酒，一日風光可能要還好多年。"]},
  {id:"buffer", st:2, tag:["Emergency fund","應急錢"], en:"Your household has no emergency fund yet.", zh:"屋企仲未有應急錢。",
   w:["Build up 3 to 6 months of expenses","儲起3至6個月生活費"], r:["Start next year, maybe","明年先算啦"], trap:"delay",
   tip:["An emergency fund turns a job loss or a medical bill into a setback instead of a debt spiral.","有應急錢，就算失業或者要睇醫生，都唔使借錢度日。"]},
  {id:"call", st:2, tag:["Fake police call","假公安來電"], en:"A caller claims to be mainland police: your ID is linked to a crime, so move your money to a “safe account”.", zh:"有人自稱內地公安，話你身份涉案，要將錢轉去「安全戶口」。",
   w:["Hang up and call 18222","即刻收線，打18222問清楚"], r:["Transfer it to clear your name","轉錢證明清白"], trap:"scam",
   tip:["Real police never ask you to transfer money. Hang up and check with the Anti-Scam Helpline 18222.","真警察唔會叫你轉錢。收線後可以打防騙易熱線18222查詢。"]},
  {id:"insure", st:2, tag:["Baby on the way: insurance","BB出世前買保險"], en:"A baby is on the way.", zh:"BB就快出世。",
   w:["Get basic medical and term life cover","買基本醫療同定期人壽保險"], r:["Skip insurance. Nothing will happen","唔買保險，唔會咁大鑊嘅"], trap:"delay",
   tip:["Basic cover is cheapest when you're young and healthy. Waiting raises the price and the risk.","後生又健康嗰陣買基本保障最平，拖得越耐越貴。"]},
  {id:"lump", st:3, tag:["MPF withdrawal at 65","65歲攞強積金"], en:"You can withdraw your MPF at 65.", zh:"65歲可以攞返強積金。",
   w:["Stay invested and draw down a little each year","繼續投資，每年攞少少"], r:["Put it all into a WhatsApp group's hot tip","全部買晒WhatsApp群組啲貼士股"], trap:"scam",
   tip:["Retirees are prime targets for “hot tip” groups. Withdrawing in stages also spreads your risk.","退休人士係貼士群組騙徒嘅頭號目標。分開幾次攞，亦可以分散風險。"]},
  {id:"romance", st:3, tag:["Online friend asks for money","網友借錢"], en:"An online friend you've never met urgently needs HK$50,000.", zh:"網上識咗個朋友，從未見過面，佢急住要HK$50,000。",
   w:["Say no and talk it over with family","拒絕，同屋企人傾吓先"], r:["Send it. They seem so sincere","佢咁有誠意，過數畀佢"], trap:"scam",
   tip:["Romance scams build trust for months before asking for money. Never pay someone you haven't met.","網上情緣騙案會花幾個月建立信任先開口借錢。未見過面就唔好過數。"]},
  {id:"reno", st:3, tag:["Flat renovation","大裝修"], en:"The flat needs a full renovation.", zh:"層樓要大裝修。",
   w:["Pay from savings and do it in phases","用儲蓄，分階段慢慢裝"], r:["Do it all now on card instalments","一次過碌卡分期"], trap:"spend",
   tip:["On a fixed retirement income, new debt is much harder to clear.","退休後收入有限，再借錢就好難還得清。"]},
  {id:"will", st:3, tag:["Will and retirement budget","遺囑同退休預算"], en:"Your kids ask about your plans for later life.", zh:"仔女問你晚年有咩打算。",
   w:["Write a will and a retirement budget now","而家立遺囑、做退休預算"], r:["Deal with it someday","第日先算"], trap:"delay",
   tip:["A will and a budget protect your family from guesswork and disputes later.","立好遺囑、做好預算，屋企人第日就唔使估估吓，亦少啲爭拗。"]}
];

// Shown at the end of every game. id: stable key stored with each answer; a: index of the right option;
// why: shown straight after the player answers.
const QUIZ = [
  {id:"mule", q:["Someone offers HK$3,000 to “rent” your bank account. This is…","有人出HK$3,000「租」你個銀行戶口，呢個係…"],
   o:[["Easy side income","輕鬆外快"],["Money laundering. You could go to prison","洗黑錢，隨時要坐監"],["Fine if it's a friend","朋友嘅話冇問題"]], a:1,
   why:["Lending your account makes you a money mule, even for a friend. Money laundering carries up to 14 years in prison.","借出戶口即係做「傀儡戶口」，就算係朋友都唔得。洗黑錢最高可判監14年。"]},
  {id:"minpay", q:["If you only pay the minimum on your credit card…","如果信用卡只還最低還款額…"],
   o:[["Interest keeps growing on the rest","未還嘅錢會繼續滾利息"],["You pay no interest","唔使畀利息"],["Your credit score improves","信貸評分會變好"]], a:0,
   why:["Card interest often runs above 30% a year on everything you haven't paid off, so even a small balance can drag on for years.","信用卡實際年利率好多時超過30%，未還嘅錢全部計息，細數都可以拖成幾年。"]},
  {id:"early", q:["The best time to start saving is…","最好幾時開始儲錢？"],
   o:[["After your first promotion","第一次升職之後"],["When MPF starts","有強積金先算"],["Now, even a small amount","而家，少少都好"]], a:2,
   why:["The earlier you start, the longer your money has to grow. A little now beats a lot “someday”.","越早開始，啲錢就有越長時間增值。而家儲少少，好過等「第日」先儲一大筆。"]}
];

const HABITS = [
  {id:"save20", en:"Save 20% of my pay on payday", zh:"出糧先儲20%"},
  {id:"payfull", en:"Pay my credit card in full every month", zh:"每月找清卡數"},
  {id:"check", en:"Never lend my account; check before I invest", zh:"唔借戶口，投資前先查證"},
  {id:"track", en:"Track my spending for 30 days", zh:"記賬30日"}
];

// What the crab by the harbour says in its speech bubble during a game: it cheers good choices and teases bad ones.
// Keep lines short (it's a bubble). One key per moment; a line is picked at random, not the same twice in a row.
// {n} is filled in by the game (an amount).
const QUIPS = {
  start:     [["Let's build your future!", "一齊起你嘅未來！"], ["Flat things at the bottom. Trust me.", "平嘅放底，信我！"], ["Three minutes. No pressure!", "得三分鐘，唔使驚！"]],
  startPb:   [["Your best is {n}. Beat it!", "你最高紀錄係{n}，破佢！"]],
  steady:    [["Nice and steady!", "穩陣！"], ["Look at that stack!", "疊得好靚喎！"], ["Growing like compound interest!", "好似複利咁越疊越高！"]],
  floor:     [["Higher and higher!", "越疊越高！"], ["Up we go!", "再上一層！"], ["The view's getting better!", "風景越嚟越靚！"]],
  stage1:    [["First job! Save before you spend.", "第一份工！先儲後使！"]],
  stage2:    [["Family time! Bills get bigger.", "成家喇！使費都大咗！"]],
  stage3:    [["Retirement! You made it!", "退休喇！你做到喇！"]],
  drop:      [["Splash! Money down the drain.", "撲通！啲錢落咗海！"], ["The fish say thanks!", "啲魚多謝你！"], ["Gravity wins that round.", "地心吸力贏咗一仗。"]],
  lastDrop:  [["Careful! One more and it's over.", "小心！再跌一件就玩完！"]],
  wise:      [["Smart move!", "醒目！"], ["Future you says thanks!", "將來嘅你多謝你！"], ["That's how savings grow.", "錢就係咁儲返嚟。"]],
  wise3:     [["Three wise picks in a row!", "連續三次明智！"]],
  boost:     [["Savings boost maxed: ×2!", "儲蓄加成爆燈：×2！"]],
  spend:     [["Ka-ching! Here comes the debt.", "使咗錢，債就嚟喇！"], ["Buy now, cry later.", "而家買，遲啲喊。"]],
  scam:      [["Too good to be true? It was.", "好到唔似真？真係假㗎！"], ["Scammed! Never lend your account.", "中伏！戶口唔好借人！"]],
  delay:     [["Later never comes.", "遲啲即係唔做。"], ["Tick tock… time flies!", "嘀嗒嘀嗒…時間飛走喇！"]],
  shockOk:   [["Phew! Emergency fund to the rescue.", "好彩有應急錢！"]],
  shockBad:  [["No safety net! Hold on!", "冇應急錢，頂住呀！"], ["Wobble wobble!", "震呀震！"]],
  noFund:    [["No emergency fund… feeling lucky?", "冇應急錢…靠好彩？"]],
  rich:      [["{n}! A tower of money!", "{n}！錢都疊成塔！"]],
  pb:        [["New personal best!", "破咗你嘅紀錄！"]],
  poor:      [["Living on instant noodles?", "食緊公仔麵呀？"]],
  clean:     [["Not one drop yet. Steady hands!", "一件都未跌，手好穩！"]],
  hurry:     [["Final push! Stack it high!", "衝呀！疊高佢！"]],
  overDrops: [["Game over… the harbour's richer.", "玩完…個海仲有錢過你。"]],
  over0:     [["Time! Still at uni… go again?", "夠鐘！仲喺大學…再嚟？"]],
  over1:     [["Time! A solid first job.", "夠鐘！第一份工都唔錯。"]],
  over2:     [["Time! Family and savings, nice.", "夠鐘！成家又有錢，叻！"]],
  over3:     [["Retired rich. Legend!", "退休富翁，傳奇！"]]
};

root.TFF_CONTENT = {STAGES, TRAPS, CARDS, QUIZ, HABITS, QUIPS};
})(typeof window !== "undefined" ? window : globalThis);
