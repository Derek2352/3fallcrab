// ---------- flow ----------
function startGame(){
  clearTimeout(boothTimer);
  A.unlock(); A.sfx("go"); closeInfo(true); closePicker(true); closeRoll(true); closeFsModal("quiet");
  fsDismissed = false; fsPausedGame = false;
  pickFromEnd = false; pickReturnTo = null; rollFromEnd = false; rollReturnTo = null;
  hideIabTip();   // the tip is for the start
  if (root.classList.contains("title")){ played = true; root.classList.remove("title"); enterBrowserFs(false); lastFit = ""; resize(); }
  else if (fsOn && canBrowserFs() && !fsEl()){ enterBrowserFs(false); }
  played = true;
  if (BOOTH){ whoPicked = false; ssSet("tff_picked", ""); }
  flushRecord(S);   // the last game's quiz answers or habit may still be waiting to be saved
  S = newState(); S.camTop = camTarget(); makeEngine(); S.mode = "playing"; frenzyUI(); $("jpBan").hidden = true;
  takes++;   // the slate's TAKE: this visit's game number
  const cg = chalGhost(); GHOSTS = cg ? [cg] : []; loadGhosts();
  root.classList.remove("rotlock");
  S.persona = ROLL; rollKept = false; showWho();   // who this life is (rolled just before)
  if (firstQueue){ S.queue = firstQueue; S.lastId = firstQueue[2].id; S.jackpot = firstQueue.some(d => d.jackpot); firstQueue = null; }
  $("startOv").hidden = true; $("pauseOv").hidden = true; pauseInert(false); $("endModal").hidden = true; $("cardModal").hidden = true; $("seeOv").hidden = true; modalOpen(false);
  $("offerModal").hidden = true; $("reviveModal").hidden = true; $("pfChip").hidden = true; $("boardWrap").classList.remove("glitch"); planTrolls();
  A.stage(0); A.mode("normal"); A.start();
  renderLedger();
  crab("Steer each item into place, then let go. Flat things stack; round things roll.", "搵好位置先放手。扁嘅易疊，圓嘅會碌。");
  hush(); S.pb = lsGet("tff_pb", 0); quip(S.pb > 0 ? "startPb" : "start", 2, fmt(S.pb));
  nextPiece();   // last: a Jackpot crab as the very first item gets its own words in
  updateHUD(); setPauseUI(); $("board").focus({preventScroll:true});
  outfitKey = ""; prevLook = null; avFx.clear(); updateAvatar(true);   // a new game starts in the first outfit, no transition
  clipsSync();   // How to play's clips rest while a game is on
  syncFsPrompt();
}
function endGame(reason){
  if (S.mode === "over") return;
  closeFsModal("quiet");
  S.mode = "over"; S.over = reason; S.endAt = Date.now();
  try { S.sil = outlineOf(); } catch(e){}   // the tower's outline, for the next player's ghost
  if (S.frenzyUntil){ S.frenzyUntil = 0; frenzyUI(); }   // jackpot time ends with the game
  if (S.active){ S.active.tff.released = true; S.active = null; }
  if (S.card && S.card.flip && S.card.power && S.choices.length){
    const lastCh = S.choices[S.choices.length - 1];
    if (lastCh && lastCh.card === S.card.c.id && lastCh.pick === "wise") lastCh.power = S.card.power;
  }
  $("cardModal").hidden = true; S.card = null;
  if (S.offer){ $("offerModal").hidden = true; S.offer = null; modalOpen(false); }
  if (S.pf){ $("pfChip").hidden = true; S.pf = null; }
  if (S.troll.invest >= 2 && !S.troll.scamSaid){ S.troll.scamSaid = 1; S.falls.scam++; }   // the game ended before the scam showed itself
  A.mode("over"); setPauseUI(); clipsSync(); loadPoster(posterFor(S));   // the share card's poster, ready by the time it's made
  A.sfx(reason === "drops" ? "gameOver" : (S.stage === STAGES.length - 1 ? "win" : "timeUp"));
  haptic(reason === "drops" ? [60, 40, 100] : [35, 45, 55], 0.8, 0.65);
  mood(reason === "drops" ? "cover" : "happy", 4000);
  S.overKey = reason === "drops" ? "overDrops" : "over" + S.stage; quip(S.overKey, 3);
  if (S.score > lsGet("tff_pb", 0)) lsSet("tff_pb", Math.round(S.score));
  $("timeVal").classList.remove("urgent"); $("hudTime").classList.remove("urgent");
  updateHUD();
  setTimeout(reason === "drops" ? openRevive : showEnd, reason === "drops" ? 1000 : 700);   // the third drop: a revive is offered first
}
function modalOpen(on){ const set = document.querySelector(".set"); if (set) set.inert = !!on; }
function pauseInert(on){
  const set = document.querySelector(".set"), ov = $("pauseOv");
  if (!set || !ov) return;
  for (let cur = ov; cur && cur !== set; cur = cur.parentElement){
    const p = cur.parentElement;
    if (!p) break;
    for (const sib of p.children) if (sib !== cur) sib.inert = !!on;
  }
}
function setPauseUI(){ const pb = $("pauseBtn"); const live = S && (S.mode === "playing" || S.mode === "paused"); pb.disabled = !live; document.documentElement.classList.toggle("ingame", !!live); const p = !!(S && S.mode === "paused"); pb.setAttribute("aria-pressed", String(p)); }   // the label stays "Pause game": pressed = paused
function togglePause(){
  if (S.mode === "playing" || S.mode === "paused") A.sfx("uiToggle");
  if (S.mode === "playing"){ S.mode = "paused"; $("pauseOv").hidden = false; pauseInert(true); A.mode("paused"); $("resumeBtn").focus({preventScroll:true}); }
  else if (S.mode === "paused"){ S.mode = "playing"; $("pauseOv").hidden = true; pauseInert(false); A.resume(); A.mode(musicMode()); $("board").focus({preventScroll:true}); }
  setPauseUI();
}

// ---------- input ----------
const keys = {left:false, right:false};
let softHeld = false;
function act(a){
  if (!S || S.mode !== "playing") return;
  if (a.startsWith("rot") && S.rotLock > 0){   // the curse of putting off: too late to turn
    if (S.active){ A.sfx("uiNope"); haptic([25, 30, 35], 0.5, 0.4); if (S.play - S.rotSaid > 1500){ S.rotSaid = S.play; stamp("Too late to turn!", "遲咗，轉唔到！", "bad"); } }
    return;
  }
  if (a === "rotate") S.targetAngle += Math.PI/2;
  else if (a === "rotL") S.targetAngle -= Math.PI/12;
  else if (a === "rotR") S.targetAngle += Math.PI/12;
  else if (a === "drop") release(true);
  else if (a === "hold") doHold();
  if (S.active && a.startsWith("rot")){ A.sfx("rotate"); haptic(10, 0.18, 0.28); wantSprite(S.active.tff.def, qOf(S.targetAngle), 0); }   // the turn it's heading for
}
function setMuteUI(){ const m = String(A.muted()); $("muteBtn").setAttribute("aria-pressed", m); $("tsMute").setAttribute("aria-pressed", m); }
function toggleMute(){ A.unlock(); A.toggle(); setMuteUI(); A.sfx("uiToggle"); soundHint(); }   // heard only when sound comes back on
// ---------- full screen play ----------
// One tap (the ⛶ button, Full screen on the start card, or F) for just the game: the browser goes full screen where
// it can (iPhones can't: there, Add to Home Screen does it), and either way the page hides everything but the game
// and the board grows to fill the screen. A phone is held upright while full screen, where the browser allows it.
const root = document.documentElement;
// ---------- in-app browsers ----------
// A shared result card is mostly opened inside Instagram, Facebook, Threads, LINE, WeChat or TikTok. Their built-in
// browsers can't download a file, rarely go truly full screen, and on an iPhone follow the silent switch. There the
// game saves the picture by press-and-hold, offers the way out to the phone's own browser, and says how to get sound.
const UA = navigator.userAgent || "";
const IOS = /iPhone|iPad|iPod/.test(UA) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const ANDROID = /Android/i.test(UA);
const IAB = (() => {
  const apps = [["Instagram", /Instagram/i], ["Threads", /Barcelona/], ["Messenger", /Messenger|FBAN\/Messenger/], ["Facebook", /FBAN|FBAV|FB_IAB|FBIOS|FB4A/],
    ["LINE", /\bLine\//i], ["WeChat", /MicroMessenger/i], ["TikTok", /musical_ly|BytedanceWebview|TikTok/i], ["Snapchat", /Snapchat/i], ["LinkedIn", /LinkedInApp/i],
    ["X", /Twitter/i], ["Pinterest", /Pinterest/i], ["KakaoTalk", /KAKAOTALK/i], ["Weibo", /Weibo/i], ["Xiaohongshu", /xhsdiscover|XiaoHongShu/i]];
  for (const [n, re] of apps) if (re.test(UA)) return n;
  if (ANDROID && /; wv\)/.test(UA)) return "app";                    // an app's own web view
  if (IOS && !/Safari\//.test(UA) && !/CriOS|FxiOS|EdgiOS/.test(UA)) return "app";
  return "";
})();
if (IAB) root.classList.add("inapp");
const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement || null;
const fsApi = !!(root.requestFullscreen || root.webkitRequestFullscreen);
// Full screen is the default (the page opens in it); ⛶ switches to the page view and back, and that choice is
// remembered. Before the first game, full screen is a title screen (the "title" class): the scene covers the screen
// and the start card becomes a logo, a prize sign, a big Start button and a few pills.
let fsOn = false, played = false;
let fsPending = false, fsApiBlocked = false, fsDismissed = false, fsPausedGame = false, fsReturnTo = null, fsInertEl = null;
const isStandalone = () => !!(navigator.standalone || (typeof matchMedia === "function" && (matchMedia("(display-mode: standalone)").matches || matchMedia("(display-mode: fullscreen)").matches)));
const canBrowserFs = () => fsApi && document.fullscreenEnabled !== false && !IAB && !isStandalone() && !fsApiBlocked;
const isGameActive = () => !!(S && (S.mode === "playing" || S.mode === "paused" || S.mode === "card" || S.mode === "offer"));
const isNonFs = () => !fsOn || (canBrowserFs() && !fsEl());
function syncFsBtn(){ const b = $("fsBtn"); if (b) b.setAttribute("aria-pressed", String(fsOn && (!played || !canBrowserFs() || !!fsEl()))); }
function setFs(on){
  fsOn = on; root.classList.toggle("fs", on); root.classList.toggle("title", on && !played); needDraw = true;
  syncFsBtn();
  lastFit = ""; resize();
  if (on) window.scrollTo(0, 0);
}
function enterBrowserFs(fromPrompt){   // the browser's own full screen (needs a tap or a key); a phone is held upright
  if (!canBrowserFs() || fsEl()) return;
  try {
    fsPending = true;
    const p = root.requestFullscreen ? root.requestFullscreen({navigationUI: "hide"}) : root.webkitRequestFullscreen();
    Promise.resolve(p).then(() => {
      fsPending = false; syncFsBtn();
      if (Math.min(screen.width, screen.height) < 600 && screen.orientation && screen.orientation.lock) screen.orientation.lock("portrait").catch(() => {});
      if ($("fsModal") && !$("fsModal").hidden) closeFsModal("enable");
    }, () => {
      fsPending = false; syncFsBtn();
      if (fromPrompt) fsApiBlocked = true;
      else syncFsPrompt();
    });
  } catch(e){
    fsPending = false; syncFsBtn();
    if (fromPrompt) fsApiBlocked = true;
  }
}
function openFsModal(){
  const m = $("fsModal");
  if (!m || !m.hidden || !isGameActive() || !isNonFs() || fsDismissed || fsPending) return;
  if ($("igModal") && !$("igModal").hidden) return;
  fsReturnTo = document.activeElement;
  keys.left = keys.right = false; softHeld = false;
  if (typeof drag !== "undefined") drag = null;
  if (S) S.dragX = null;
  if (S.mode === "playing"){ S.mode = "paused"; fsPausedGame = true; setPauseUI(); }
  else fsPausedGame = false;
  A.mode("paused");
  for (const id of ["offerModal", "cardModal"]){
    const el = $(id);
    if (el && !el.hidden && !el.inert){ el.inert = true; fsInertEl = el; break; }
  }
  modalOpen(true); m.hidden = false; A.sfx("uiOpen");
  if ($("fsModalGo")) $("fsModalGo").focus({preventScroll: true});
}
function closeFsModal(reason){
  const m = $("fsModal"); if (!m || m.hidden) return;
  const quiet = reason === "quiet";
  if (reason === "skip"){ fsDismissed = true; if (!quiet) A.sfx("uiClose"); }
  m.hidden = true;
  if (fsInertEl){ fsInertEl.inert = false; fsInertEl = null; }
  const anyModal = ["igModal", "holdModal", "cardModal", "offerModal", "reviveModal", "pickModal", "rollModal", "infoModal", "endModal"].some(id => { const el = $(id); return el && !el.hidden; });
  if (!anyModal) modalOpen(false);
  const wasPausedByUs = fsPausedGame; fsPausedGame = false;
  const back = fsReturnTo; fsReturnTo = null;
  if (!quiet && wasPausedByUs && S && S.mode === "paused" && $("pauseOv").hidden){
    S.mode = "playing"; setPauseUI(); A.resume(); A.mode(musicMode()); $("board").focus({preventScroll: true});
  } else if (!quiet){
    if (S && S.mode === "card"){ A.resume(); A.mode("card"); }
    else if (S && S.mode === "offer"){ A.resume(); A.mode(musicMode()); }
    const fb = !$("pauseOv").hidden ? $("resumeBtn") : !$("cardModal").hidden ? $("cardSheet") : !$("offerModal").hidden ? $("offerSheet") : null;
    const tgt = (back && back.isConnected && back.focus && !back.closest("[hidden]") && !back.closest("[inert]")) ? back : fb;
    if (tgt && tgt.focus) tgt.focus({preventScroll: true});
  }
}
function syncFsPrompt(){
  syncFsBtn();
  if (!isGameActive() || !isNonFs()){
    if ($("fsModal") && !$("fsModal").hidden) closeFsModal("enable");
    return;
  }
  if (!fsPending && !fsDismissed) openFsModal();
}
function toggleFs(want){
  if (want === undefined) want = !(fsOn && (!played || !canBrowserFs() || !!fsEl()));
  if (want === fsOn && !!fsEl() === (want && canBrowserFs())) return;
  A.unlock(); A.sfx("uiToggle");
  lsSet("tff_fs", want);
  setFs(want);
  fsDismissed = false;
  if (want){ enterBrowserFs(false); if ($("fsModal") && !$("fsModal").hidden) closeFsModal("enable"); }
  else {
    if (fsEl()) try { Promise.resolve(document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen()).catch(() => {}); } catch(e){}
    syncFsPrompt();
  }
}
if ($("fsModalGo")) $("fsModalGo").addEventListener("click", () => { fsDismissed = false; A.unlock(); A.sfx("uiToggle"); lsSet("tff_fs", true); setFs(true); enterBrowserFs(true); closeFsModal("enable"); });
if ($("fsModalSkip")) $("fsModalSkip").addEventListener("click", () => closeFsModal("skip"));
// leaving the browser's full screen (Esc, the phone's back gesture) pauses the game and offers full screen again
for (const ev of ["fullscreenchange", "webkitfullscreenchange"]) document.addEventListener(ev, () => {
  lastFit = ""; resize();
  if (fsEl()){ fsPending = false; fsDismissed = false; syncFsBtn(); if ($("fsModal") && !$("fsModal").hidden) closeFsModal("enable"); }
  else syncFsPrompt();
});
let endShownAt = 0;
const DIALOG_IDS = ["igModal", "fsModal", "holdModal", "endModal", "rollModal", "pickModal", "infoModal", "reviveModal", "offerModal", "cardModal", "pauseOv"];
function activeDialog(){
  for (const id of DIALOG_IDS){
    const el = $(id);
    if (el && !el.hidden && !el.inert) return el;
  }
  return null;
}
function dialogTabbables(dlg){
  const raw = [...dlg.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')];
  const vis = raw.filter(el => {
    if (el.disabled || el.closest("[hidden]") || el.closest("[inert]")) return false;
    if (el.tabIndex < 0) return false;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return false;
    return el.getClientRects().length > 0;
  });
  const seenRadio = new Set(), out = [];
  for (const el of vis){
    if (el.tagName === "INPUT" && el.type === "radio" && el.name){
      if (seenRadio.has(el.name)) continue;
      seenRadio.add(el.name);
      const group = vis.filter(x => x.tagName === "INPUT" && x.type === "radio" && x.name === el.name);
      out.push(group.find(x => x.checked) || group[0]);
      continue;
    }
    out.push(el);
  }
  return out;
}
{
  const _openCard = openCard, _choose = choose;
  openCard = function(...args){
    $("cardModal").setAttribute("aria-labelledby", "cardTitle cardTitleZh");
    return _openCard.apply(this, args);
  };
  choose = function(...args){
    const res = _choose.apply(this, args);
    if (S && S.card && S.card.flip) $("cardModal").setAttribute("aria-labelledby", "ocHead cardTag");
    return res;
  };
}
document.addEventListener("keydown", e => {
  if (BOOTH) bumpBooth();
  if (e.key === "Tab"){
    const dlg = activeDialog();
    if (dlg){
      const list = dialogTabbables(dlg);
      if (!list.length){ e.preventDefault(); return; }
      const first = list[0], last = list[list.length - 1], cur = document.activeElement;
      if (!dlg.contains(cur)){ (e.shiftKey ? last : first).focus({preventScroll: true}); e.preventDefault(); return; }
      const idx = (cur && cur.tagName === "INPUT" && cur.type === "radio" && cur.name)
        ? list.findIndex(x => x.tagName === "INPUT" && x.type === "radio" && x.name === cur.name)
        : list.indexOf(cur);
      if (e.shiftKey){
        if (idx <= 0){ last.focus({preventScroll: true}); e.preventDefault(); }
      } else {
        if (idx === -1 || idx >= list.length - 1){ first.focus({preventScroll: true}); e.preventDefault(); }
      }
      return;
    }
  }
  if (!$("igModal").hidden){
    if (e.key === "Escape"){ closeIg(); e.preventDefault(); }
    return;
  }
  if (!$("fsModal").hidden){
    if (e.key === "Escape"){ closeFsModal("skip"); e.preventDefault(); }
    return;
  }
  if (!$("holdModal").hidden){
    if (e.key === "Escape"){ closeHold("cancel"); e.preventDefault(); }
    return;
  }
  if (!S) return;
  if (!$("rollModal").hidden){   // the roll: Enter or Space on its button, Esc goes back (the roll is kept)
    if (e.key === "Escape"){ closeRoll(); e.preventDefault(); }
    return;
  }
  if (!$("pickModal").hidden){   // choosing the player: arrows switch, Enter or Space on the Go button (or a player) goes, Esc goes back
    const k = e.key;
    if (k === "ArrowLeft" || k === "ArrowRight" || k === "ArrowUp" || k === "ArrowDown"){ setPick(pickSel === "jack" ? "jackie" : "jack"); document.querySelector('#pickModal .who[aria-checked="true"]').focus(); e.preventDefault(); }
    else if (k === "Escape"){ closePicker(); e.preventDefault(); }
    else if ((k === "Enter" || k === " ") && e.target && e.target.classList && e.target.classList.contains("who")){ setPick(e.target.dataset.who); pickGo(); e.preventDefault(); }
    return;
  }
  if (!$("infoModal").hidden){   // a sheet over the title: Esc closes it; Space and Enter only press its own buttons
    if (e.key === "Escape"){ closeInfo(); e.preventDefault(); }
    else if ((e.key === " " || e.key === "Enter") && !(e.target && e.target.closest && e.target.closest("button, a, input, label, [role=tab]"))) e.preventDefault();
    return;
  }
  if (!$("endModal").hidden){
    if ((e.key === " " || e.key === "Enter") && performance.now() - endShownAt < 900){ e.preventDefault(); return; }
    if (e.key === "Escape"){ $("closeEnd").click(); e.preventDefault(); return; }
  }
  if (!$("pauseOv").hidden && e.key === "Escape"){ togglePause(); e.preventDefault(); return; }
  const tag = (e.target && e.target.tagName) || "";
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  const k = e.key;
  if (k === "m" || k === "M"){ toggleMute(); e.preventDefault(); return; }
  if ((k === "f" || k === "F") && !e.ctrlKey && !e.metaKey && !e.altKey){ toggleFs(); e.preventDefault(); return; }
  if (S.revive){   // 1 revives, 2 or Esc gives up; Space or Enter mashed as the third item fell does nothing
    if (S.revive.phase === "ask"){
      if (k === "1"){ reviveAnswer(true); e.preventDefault(); }
      else if (k === "2" || k === "Escape"){ reviveAnswer(false); e.preventDefault(); }
      else if ((k === " " || k === "Enter") && S.revive.t < 600) e.preventDefault();
    } else if (S.revive.phase === "lesson" && (k === "Escape" || k === "1" || k === "2")){ $("rvGo").click(); e.preventDefault(); }
    return;
  }
  if (S.mode === "offer" && S.offer){   // 1: the first button, 2 or Esc: the second; Space or Enter only on a button in focus
    const onBtn = !!(e.target && e.target.closest && e.target.closest("#offerModal button"));
    if (k === "1"){ offerAnswer(true); e.preventDefault(); }
    else if (k === "2" || k === "Escape"){ offerAnswer($("offerNo").hidden); e.preventDefault(); }
    else if ((k === " " || k === "Enter") && (!onBtn || S.offer.t - S.offer.stepAt < 450)) e.preventDefault();
    return;
  }
  if (S.mode === "card" && S.card){
    if (!S.card.flip && (k === " " || k === "Enter") && !(e.target && e.target.classList && e.target.classList.contains("choice"))){ e.preventDefault(); return; }
    if (!S.card.flip && ["1","2","a","b","A","B"].includes(k)){
      const idx = (k === "1" || k.toLowerCase() === "a") ? 0 : 1;
      choose(S.card.order[idx] === "w" ? "wise" : "risky"); e.preventDefault();
    } else if (S.card.flip && (k === "Enter" || k === " ")){ if (!(e.target && e.target.classList && e.target.classList.contains("pw"))){ closeCard(); e.preventDefault(); } }
    else if (S.card.flip && S.card.powers && ["1", "2", "3"].includes(k)){
      const inPow = !!(e.target && e.target.closest && e.target.closest("#ocPowerRow"));
      pickPower(+k - 1, false, inPow); e.preventDefault();
    }
    else if (S.card.flip && S.card.powers && (k === "ArrowLeft" || k === "ArrowRight" || ((k === "ArrowUp" || k === "ArrowDown") && e.target && e.target.closest && e.target.closest("#ocPowerRow")))){
      const n = S.card.powers.length, i = S.card.powers.indexOf(S.card.power);
      const back = k === "ArrowLeft" || k === "ArrowUp";
      pickPower((i + (back ? n - 1 : 1)) % n, false, true); e.preventDefault();
    }
    return;
  }
  if (S.mode === "idle" && S.viewing && !$("seeOv").hidden && (k === "Escape" || k === "r" || k === "R")){ openResults(); e.preventDefault(); return; }
  const onControl = !!(e.target && e.target.closest && e.target.closest("button, a, label, [role=tab]"));   // it does its own thing
  if (S.mode === "idle" && (k === "Enter" || k === " ") && !onControl && (!$("startOv").hidden || !$("seeOv").hidden)){ if (!$("startOv").hidden) beginGame(); else if (S.flowDone) newLife(); else openResults(); e.preventDefault(); return; }
  if (k === "p" || k === "P" || k === "Escape"){ if (S.mode === "playing" || S.mode === "paused"){ togglePause(); e.preventDefault(); } return; }
  if (S.mode !== "playing") return;
  switch (k){
    case "ArrowLeft": setKey("left", true); S.dragX = null; e.preventDefault(); break;
    case "ArrowRight": setKey("right", true); S.dragX = null; e.preventDefault(); break;
    case "ArrowDown": softHeld = true; e.preventDefault(); break;
    case "ArrowUp": if (!e.repeat) act("rotate"); e.preventDefault(); break;
    case "z": case "Z": act("rotL"); e.preventDefault(); break;
    case "x": case "X": act("rotR"); e.preventDefault(); break;
    case " ": if (!e.repeat) act("drop"); e.preventDefault(); break;
    case "c": case "C": if (!e.repeat) act("hold"); e.preventDefault(); break;
  }
});
document.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
  if (e.key === "ArrowDown") softHeld = false;
});
window.addEventListener("blur", () => { keys.left = keys.right = false; softHeld = false; });
let igHiddenAt = 0;
document.addEventListener("visibilitychange", () => {
  if (document.hidden){
    igHiddenAt = performance.now();
    if (S && S.mode === "playing") togglePause();
    A.suspend(); flushRecord(S, true);
  } else {
    A.resume();
    syncFsPrompt();
    const away = igHiddenAt ? performance.now() - igHiddenAt : 0; igHiddenAt = 0;
    if (away > 1200 && performance.now() - outboundAt > 4000 && igEligible()) setTimeout(() => { if (!document.hidden && igEligible()) openIg(true); }, 220);
  }
});
$("pad").querySelectorAll("button").forEach(b => {
  const a = b.dataset.act;
  const down = e => { e.preventDefault(); if (S) S.dragX = null;
    if (a === "left") setKey("left", true); else if (a === "right") setKey("right", true); else if (a === "down") softHeld = true; else act(a); };
  const up = () => { if (a === "left") keys.left = false; if (a === "right") keys.right = false; if (a === "down") softHeld = false; };
  b.addEventListener("pointerdown", down);
  b.addEventListener("click", e => { if (e.detail === 0 && a !== "left" && a !== "right" && a !== "down") act(a); });
  b.addEventListener("pointerup", up); b.addEventListener("pointerleave", up); b.addEventListener("pointercancel", up);
  b.addEventListener("contextmenu", e => e.preventDefault());
});
// ---------- the player: Jack or Jackie ----------
// Picked once per visit after Start (the last pick comes up first). In the status bar (and in the crab's card on a
// big screen) the player is drawn full length (avatar.js) and dressed by the game: the life stage sets the clothes,
// money the extras (a patched knee, a watch, gold and sunglasses), the last money decision what's in hand, the
// moment the face. A new outfit pops in.
const AV = window.TFF_AVATAR, AV_IDS = ["hudAvatar", "cardAvatar"];
let WHO = lsGet("tff_who", "jack") === "jackie" ? "jackie" : "jack", whoPicked = ssGet("tff_picked") === "1", pickSel = WHO;   // asked once per tab: a reload doesn't ask again
const avKeys = new Map();
let lookKey = "", outfitKey = "", avTick = 0, prevLook = null;
const avFx = new Map();   // canvas -> its running outfit transition
function lookNow(){
  const sc = S.score, tier = sc < 2000 && S.play > 25000 ? 0 : sc < 20000 ? 1 : sc < 60000 ? 2 : 3;
  const md = S.mode === "over" ? (S.over === "drops" ? "worried" : "happy") : S.mood.until > S.play ? (S.mood.type === "happy" ? "happy" : S.mood.type === "idle" ? "idle" : "worried") : "idle";
  return {who: WHO, stage: S.stage, tier, hand: S.hand, mood: md, drops: Math.min(2, S.drops), boost: S.rate >= 2};
}
function paintAvatar(c, look){
  if (avFx.has(c)) return;   // mid-transition: it paints the new look when it ends
  const r = c.getBoundingClientRect(); if (!r.width) return;
  const dpr = Math.min(3, window.devicePixelRatio || 1), w = Math.round(r.width * dpr), h = Math.round(r.height * dpr), key = AV.keyOf(look) + "|" + w + "x" + h;
  if (avKeys.get(c) === key) return; avKeys.set(c, key);
  if (c.width !== w || c.height !== h){ c.width = w; c.height = h; }
  const g = c.getContext("2d"), s = Math.min(w / AV.W, h / AV.H);
  g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, w, h); g.setTransform(s, 0, 0, s, (w - AV.W * s) / 2, h - AV.H * s); AV.draw(g, look);
}
function updateAvatar(force){
  if (!S || !AV) return;
  const L = lookNow(), k = AV.keyOf(L);
  if (k === lookKey && !force) return; lookKey = k;
  const ok = [L.who, L.stage, L.tier, L.hand, L.drops, L.boost].join();   // the clothes and props, not the face
  if (ok !== outfitKey && outfitKey && prevLook && !reduceMotion){
    const kind = L.stage > prevLook.stage ? "level" : L.tier > prevLook.tier ? "rich" : (L.tier < prevLook.tier || L.drops > prevLook.drops) ? "down" : "swap";
    for (const id of AV_IDS) avTransition($(id), prevLook, L, kind);
    avBurst($("hudAvatar"), kind, L);
  }
  if (ok !== outfitKey){ outfitKey = ok; prevLook = {...L}; }
  for (const id of AV_IDS) paintAvatar($(id), L);
}
// A change of clothes or props (a new life stage, more or less money, something new in hand, a fall) is a little
// show: the old look flashes white and flips away, a puff of clay smoke, and the new look flips in with sparkles.
// A new life stage also gets "Level up!" over the dashboard. With reduced motion the look just changes.
const easeBack = p => 1 + 2.2 * Math.pow(p - 1, 3) + 1.2 * Math.pow(p - 1, 2);
function avTransition(c, from, to, kind){
  const r = c.getBoundingClientRect(); if (!r.width || !r.height) return;
  const dpr = Math.min(3, window.devicePixelRatio || 1), w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
  const shot = (look, white) => { const o = document.createElement("canvas"); o.width = w; o.height = h; const g = o.getContext("2d"), s = Math.min(w / AV.W, h / AV.H);
    g.setTransform(s, 0, 0, s, (w - AV.W * s) / 2, h - AV.H * s); AV.draw(g, look);
    if (white){ g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = "source-atop"; g.fillStyle = "#fff"; g.fillRect(0, 0, w, h); } return o; };
  const A0 = shot(from), W0 = shot(from, true), A1 = shot(to), W1 = shot(to, true);
  if (c.width !== w || c.height !== h){ c.width = w; c.height = h; }
  const fx = {t0: performance.now(), dur: kind === "level" ? 1000 : 720}; avFx.set(c, fx);
  const g = c.getContext("2d"), cx = w / 2, cy = h * 0.5, gold = kind === "level" || kind === "rich";
  const sparks = Array.from({length: 8}, (_, i) => ({a: i / 8 * Math.PI * 2 + 0.3, v: 0.7 + (i % 3) * 0.2}));
  const flip = (img, wimg, sx, white) => { g.save(); g.translate(cx, 0); g.scale(Math.max(0.03, sx), 1); g.translate(-cx, 0); g.drawImage(img, 0, 0); if (white > 0){ g.globalAlpha = white; g.drawImage(wimg, 0, 0); } g.restore(); };
  const star = (x, y, rr) => { g.beginPath(); for (let i = 0; i < 8; i++){ const a = i * Math.PI / 4, q = i % 2 ? rr * 0.38 : rr; g.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q); } g.closePath(); g.fill(); };
  const frame = now => {
    if (avFx.get(c) !== fx) return;
    const t = Math.min(1, (now - fx.t0) / fx.dur);
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, w, h);
    if (t < 0.42){ const p = t / 0.42; flip(A0, W0, Math.cos(p * Math.PI / 2), Math.min(1, p * 1.7)); }
    else { const p = Math.min(1, (t - 0.42) / 0.45); flip(A1, W1, easeBack(p), Math.max(0, 1 - p * 1.6)); }
    if (t > 0.3 && t < 0.8){   // the puff
      const p = (t - 0.3) / 0.5; g.globalAlpha = 0.9 * (1 - p); g.fillStyle = kind === "down" ? "#C9CED8" : "#fff";
      for (let i = 0; i < 7; i++){ const a = i / 7 * Math.PI * 2, d = w * (0.12 + 0.32 * p); g.beginPath(); g.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 1.5, w * (0.17 - 0.08 * p), 0, Math.PI * 2); g.fill(); }
      g.globalAlpha = 1; }
    if (t > 0.4 && kind !== "down"){   // the sparkles
      const p = (t - 0.4) / 0.6; g.globalAlpha = 1 - p * p; g.fillStyle = gold ? "#FFD23F" : "#FFFFFF";
      for (const s of sparks){ const d = w * (0.1 + 0.42 * p * s.v); star(cx + Math.cos(s.a) * d, cy + Math.sin(s.a) * d * 1.6, w * 0.085 * (1 - 0.4 * p)); }
      g.globalAlpha = 1; }
    if (t < 1) requestAnimationFrame(frame);
    else { avFx.delete(c); avKeys.delete(c); paintAvatar(c, S ? lookNow() : to); }
  };
  requestAnimationFrame(frame);
}
// ...and around the dashboard, where the canvas can't reach: a glow ring, a few stars and, for a new life stage or more
// money, a word that floats up. Decoration only (hidden from screen readers, which hear the stage change already).
function avBurst(c, kind, look){
  const r = c.getBoundingClientRect(); if (!r.width || kind === "swap") return;
  const d = document.createElement("div"); d.className = "avfx " + kind; d.setAttribute("aria-hidden", "true");
  const cx = r.left + r.width / 2; d.style.left = cx + "px"; d.style.top = (r.top + r.height / 2) + "px"; d.style.setProperty("--s", Math.max(r.width, r.height * 0.6) + "px");
  d.style.setProperty("--dx", Math.max(0, 60 - cx) + "px");   // the words stay on screen when the player is at its edge
  d.appendChild(document.createElement("i"));
  for (let i = 0; i < 6; i++){ const s = document.createElement("b"); s.style.setProperty("--a", (i * 60 + 15) + "deg"); d.appendChild(s); }
  const words = kind === "level" ? ["Level up!", "升級！"] : kind === "rich" ? ["Richer!", "身家升咗！"] : null;
  if (words){ const t = document.createElement("span"); t.className = "avfx-t"; t.textContent = words[0]; const z = document.createElement("small"); z.textContent = words[1]; t.appendChild(z); d.appendChild(t); }
  document.body.appendChild(d); setTimeout(() => d.remove(), 1500);
}
function setPick(who, quiet){
  if (!quiet && who !== pickSel) A.sfx("uiSelect");
  pickSel = who;
  for (const b of document.querySelectorAll("#pickModal .who")){ const on = b.dataset.who === who; b.setAttribute("aria-checked", String(on)); b.tabIndex = on ? 0 : -1; }
  for (const b of document.querySelectorAll("#pickModal .who")) paintAvatar(b.querySelector("canvas"), {who: b.dataset.who, stage: 0, tier: 1, hand: null, mood: b.dataset.who === who ? "happy" : "idle", drops: 0, boost: false});
}
let pickFromEnd = false, pickReturnTo = null;
function openPicker(){
  pickFromEnd = !$("endModal").hidden; $("endModal").hidden = true;
  pickReturnTo = !pickFromEnd && document.activeElement && document.activeElement !== document.body && !document.activeElement.closest("#pickModal") ? document.activeElement : null;
  hideIabTip();
  $("pickModal").hidden = false; modalOpen(true); setPick(WHO, true); A.sfx("uiOpen");
  fitLine($("pickTitle"));
  document.querySelector('#pickModal .who[aria-checked="true"]').focus({preventScroll: true});
}
function closePicker(quiet){
  if ($("pickModal").hidden) return;
  if (!quiet) A.sfx("uiClose"); $("pickModal").hidden = true; modalOpen(false);
  if ((pickFromEnd || ($("startOv").hidden && $("seeOv").hidden)) && !quiet && S && S.mode === "over"){
    $("endModal").hidden = false; modalOpen(true);
    $(S.step === 4 ? "againBtn" : STEP_FOCUS[S.step - 1]).focus({preventScroll: true});
  } else if (!quiet){
    if (!played) iabTip();
    const fb = !$("startOv").hidden ? $("startBtn") : !$("seeOv").hidden ? $("againBtn2") : null;
    const tgt = (pickReturnTo && pickReturnTo.isConnected && !pickReturnTo.closest("[hidden]") && pickReturnTo.getClientRects().length) ? pickReturnTo : fb;
    if (tgt) tgt.focus({preventScroll: true});
    else if (S && S.mode === "playing") $("board").focus({preventScroll: true});
  }
  pickFromEnd = false; pickReturnTo = null;
}
function pickGo(){
  const fromEnd = pickFromEnd, ret = pickReturnTo;
  WHO = pickSel; if (!BOOTH) lsSet("tff_who", WHO); whoPicked = true; ssSet("tff_picked", "1");
  closePicker(true);
  if (fromEnd) pickFromEnd = true;
  if (ret) pickReturnTo = ret;
  newLife();
}
// Start from the title or the start card: if traffic is surging, hold the player in line briefly (with an offline bypass)
let holdAdmitted = false, holdSkipped = false, holdTimer = 0, holdReadyCb = null, holdReturnTo = null;
const HOLD_CID = (() => { let c = ssGet("tff_cid"); if (!c){ c = "c" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36); ssSet("tff_cid", c); } return c; })();
function closeHold(mode){
  clearTimeout(holdTimer); holdTimer = 0;
  const cancel = mode === "cancel", skip = mode === true || mode === "skip";
  const m = $("holdModal"), cb = cancel ? null : holdReadyCb; holdReadyCb = null;
  if (!cancel){ if (skip) holdSkipped = true; else holdAdmitted = true; }
  if (m && !m.hidden){ m.hidden = true; modalOpen(false); }
  if ((skip || cancel) && typeof apiAllowed !== "undefined" && apiAllowed && !apiGone) try { fetch("/api/queue?leave=1&cid=" + encodeURIComponent(HOLD_CID), { keepalive: true }).catch(() => {}); } catch(e){}
  if (cb) cb();
  else {
    const tgt = (holdReturnTo && holdReturnTo.focus && !holdReturnTo.closest("[hidden]")) ? holdReturnTo : $("startBtn");
    if (tgt && tgt.focus && !tgt.closest("[hidden]")) tgt.focus({preventScroll: true});
  }
  holdReturnTo = null;
}
window.addEventListener("pagehide", () => {
  if (typeof apiAllowed !== "undefined" && apiAllowed && !apiGone && navigator.sendBeacon) try { navigator.sendBeacon("/api/queue?leave=1&cid=" + encodeURIComponent(HOLD_CID)); } catch(e){}
});
function openHold(onReady){
  const m = $("holdModal"); if (!m){ if (onReady) onReady(); return; }
  clearTimeout(holdTimer); holdReadyCb = onReady || null;
  holdReturnTo = document.activeElement;
  hideIabTip(); m.hidden = false; modalOpen(true); A.sfx("uiOpen");
  const posEl = $("holdPos"), etaEl = $("holdEta"), barEl = $("holdBar");
  if ($("holdSkipBtn")) $("holdSkipBtn").focus({preventScroll: true});
  const preview = /[?&]hold=1(&|$)/.test(location.search);
  let left = 3, pct = 25;
  const paint = (pos, eta, w) => { if (posEl) posEl.textContent = "#" + pos; if (etaEl) etaEl.textContent = "~" + eta + "s"; if (barEl) barEl.style.width = w + "%"; };
  const step = async () => {
    if (m.hidden) return;
    if (preview){
      paint(Math.max(1, left), left, Math.min(95, pct));
      if (left <= 0){ closeHold(false); return; }
      left--; pct += 25;
      holdTimer = setTimeout(step, 1000);
      return;
    }
    try {
      const r = await fetch("/api/queue?cid=" + encodeURIComponent(HOLD_CID), { cache: "no-store" });
      const j = await r.json();
      if (!j || !j.onHold){ closeHold(false); return; }
      pct = Math.min(92, pct + 18);
      paint(j.position || 1, j.etaSec || 2, pct);
      holdTimer = setTimeout(step, Math.max(1500, Math.min(5000, (j.retryAfter || 2) * 1000)));
    } catch(e){ closeHold(false); }
  };
  step();
}
if ($("holdSkipBtn")) $("holdSkipBtn").addEventListener("click", () => closeHold(true));
window.TFF_HOLD = { open: openHold, close: closeHold };
function proceedBeginGame(){
  if (root.classList.contains("title")) enterBrowserFs();   // on the tap itself: browsers allow it only then
  if (whoPicked) newLife(); else openPicker();
}
function beginGame(){
  if (!holdAdmitted && !holdSkipped && (/[?&]hold=1(&|$)/.test(location.search) || window.__tffServerHold)){
    openHold(proceedBeginGame);
    return;
  }
  proceedBeginGame();
}
for (const b of document.querySelectorAll("#pickModal .who")){
  b.addEventListener("click", () => setPick(b.dataset.who));
  b.addEventListener("dblclick", pickGo);
}
$("pickGo").addEventListener("click", pickGo);
if ($("pickClose")) $("pickClose").addEventListener("click", () => closePicker());

// ---------- who you are: the roll ----------
// Before every game (after Jack or Jackie, the first time), two reels decide what kind of uni student this life is:
// 家底 family money × 性格 personality (PERSONAS in content.js), 24 combinations, like being born in 80億分之1. The type
// only changes which Life Event cards come up (pickCard); the scoring is the same for all of them. There are no re-rolls:
// a roll is kept until it's played, even if the sheet is closed. ?roll=0 (or sessionStorage tff_roll_auto = "1") rolls
// quietly and starts straight away, for tests and booth staff in a hurry.
const PERSONAS = window.TFF_CONTENT.PERSONAS || {bg: {}, pe: {}, combos: {}};
const BG_KEYS = Object.keys(PERSONAS.bg), PE_KEYS = Object.keys(PERSONAS.pe), REPS = 6;
const ROLL_AUTO = /[?&]roll=0(&|$)/.test(location.search) || ssGet("tff_roll_auto") === "1";
const BOOTH = /[?&]booth=1(&|$)/.test(location.search) || ssGet("tff_booth") === "1";
if (/[?&]booth=1(&|$)/.test(location.search)) ssSet("tff_booth", "1");
let ROLL = null, rollKept = false, rollPhase = "", rollTimers = [], boothTimer = 0;
function bumpBooth(){
  clearTimeout(boothTimer);
  if (!BOOTH || !S || (S.mode !== "over" && !(S.mode === "idle" && S.viewing))) return;
  boothTimer = setTimeout(() => {
    if (!S || (S.mode !== "over" && !(S.mode === "idle" && S.viewing))) return;
    $("endModal").hidden = true; $("seeOv").hidden = true; $("pickModal").hidden = true; $("rollModal").hidden = true;
    modalOpen(false);
    played = false; whoPicked = false; ssSet("tff_picked", ""); rollKept = false; ROLL = null;
    sampleTower(); setFs(fsOn); $("startOv").hidden = false; setPauseUI(); updateHUD(); renderLedger(); drawPreviews(true); iabTip(); needDraw = true;
  }, 90000);
}
const rnd = n => Math.floor(Math.random() * n);
const personaKey = p => p ? p.bg + "+" + p.pe : "";
function personaOf(p){
  if (!p || !PERSONAS.bg[p.bg] || !PERSONAS.pe[p.pe]) return null;
  const b = PERSONAS.bg[p.bg], e = PERSONAS.pe[p.pe], c = PERSONAS.combos[personaKey(p)] || {en: "", zh: "", line: ["", ""]};
  return {key: personaKey(p), zh: b.zh + e.zh, en: b.en + " × " + e.en, b, e, c};
}
const rollDice = () => ({bg: BG_KEYS[rnd(BG_KEYS.length)], pe: PE_KEYS[rnd(PE_KEYS.length)]});
function newLife(){   // every game starts here: roll who you are, then play
  clearTimeout(boothTimer);
  if (S) S.replay = null;
  if (BOOTH && !whoPicked){ openPicker(); return; }
  if (!BG_KEYS.length || !PE_KEYS.length){ ROLL = null; startGame(); return; }
  if (ROLL_AUTO){ if (!rollKept) ROLL = rollDice(); startGame(); return; }
  openRoll();
}
function buildStrip(strip, keys, set){
  if (strip.children.length) return;
  for (let r = 0; r < REPS; r++) for (const k of keys){
    const t = document.createElement("div"); t.className = "rtile"; t.dataset.k = k;
    const cv = document.createElement("canvas"); cv.width = cv.height = 104;
    const tx = document.createElement("span"), b = document.createElement("b"), sm = document.createElement("small");
    b.lang = "zh-HK"; b.textContent = set[k].zh; sm.textContent = set[k].en; tx.append(b, sm); t.append(cv, tx); strip.appendChild(t);
  }
}
const tileH = strip => strip.firstElementChild ? strip.firstElementChild.getBoundingClientRect().height : 84;
function placeStrip(strip, keys, k, cycle){ strip.style.transition = "none"; strip.style.transform = "translateY(" + (-(cycle * keys.length + keys.indexOf(k)) * tileH(strip)) + "px)"; }
let rollFromEnd = false, rollReturnTo = null;   // the roll was opened by Play again on the statement: closing it without playing goes back there
function openRoll(){
  const ae = document.activeElement;
  const savedReturn = (ae && ae !== document.body && !ae.closest("#pickModal, #infoModal, #rollModal")) ? ae : pickReturnTo;
  const wasEnd = !$("endModal").hidden || pickFromEnd;
  closeInfo(true); closePicker(true); pickFromEnd = false; pickReturnTo = null; hideIabTip();
  rollFromEnd = wasEnd; $("endModal").hidden = true;   // the statement makes way (it was left on top of the roll)
  rollReturnTo = !rollFromEnd ? savedReturn : null;
  buildStrip($("stripBg"), BG_KEYS, PERSONAS.bg); buildStrip($("stripPe"), PE_KEYS, PERSONAS.pe);
  const m = $("rollModal"); m.hidden = false; modalOpen(true); A.sfx("uiOpen");
  paintAvatar($("rollAvatar"), {who: WHO, stage: 0, tier: 1, hand: null, mood: "happy", drops: 0, boost: false});
  for (const cv of m.querySelectorAll(".rtile canvas")){ const k = cv.parentNode.dataset.k, it = (PERSONAS.bg[k] || PERSONAS.pe[k] || {}).item, def = DEFS.find(d => d.id === it); if (def) previewInto(cv, def); }
  fitLine($("rollTitle"));
  const cs = $("chalSame"), cp = CHAL && CHAL.p ? CHAL.p.split("+") : null, cP = cp && personaOf({ bg: cp[0], pe: cp[1] });
  if (rollKept && ROLL){
    if (cs) cs.hidden = true;
    showRollResult(true);   // rolled already and not played yet: the same life, no re-roll
  } else {
    rollPhase = "ready"; $("rollRes").hidden = true; $("rollSay").textContent = "";
    for (const id of ["reelBg", "reelPe"]) $(id).classList.remove("landed");
    placeStrip($("stripBg"), BG_KEYS, BG_KEYS[rnd(BG_KEYS.length)], 0); placeStrip($("stripPe"), PE_KEYS, PE_KEYS[rnd(PE_KEYS.length)], 0);
    label($("rollGo"), ["Roll", "抽！"]);
    if (cs){
      cs.hidden = !cP;
      if (cP){
        label(cs, ["Same life: " + cP.en, "同命挑戰：" + cP.zh]);
        cs.onclick = () => { ROLL = { bg: cp[0], pe: cp[1] }; rollKept = true; A.sfx("uiSelect"); cs.hidden = true; showRollResult(true); };
      }
    }
  }
  $("rollGo").focus({preventScroll: true});
}
function closeRoll(quiet){
  if ($("rollModal").hidden) return;
  if (rollPhase === "spinning") rollFinish(true);   // closing mid-spin still keeps the roll
  if (!quiet) A.sfx("uiClose"); $("rollModal").hidden = true; modalOpen(false);
  if ((rollFromEnd || ($("startOv").hidden && $("seeOv").hidden)) && !quiet && S && S.mode === "over"){
    $("endModal").hidden = false; modalOpen(true);
    $(S.step === 4 ? "againBtn" : STEP_FOCUS[S.step - 1]).focus({preventScroll: true});
  } else if (!quiet){
    if (!played) iabTip();
    const fb = !$("startOv").hidden ? $("startBtn") : !$("seeOv").hidden ? $("againBtn2") : null;
    const tgt = (rollReturnTo && rollReturnTo.isConnected && !rollReturnTo.closest("[hidden]") && rollReturnTo.getClientRects().length) ? rollReturnTo : fb;
    if (tgt) tgt.focus({preventScroll: true});
    else if (S && S.mode === "playing") $("board").focus({preventScroll: true});
  }
  rollFromEnd = false; rollReturnTo = null;
}
function spinReel(reel, strip, keys, k, ms){
  const target = (REPS - 1) * keys.length + keys.indexOf(k), y = -target * tileH(strip);
  if (!ms){ placeStrip(strip, keys, k, REPS - 1); return; }
  void strip.offsetWidth; strip.style.transition = "transform " + ms + "ms cubic-bezier(.12,.72,.18,1)"; strip.style.transform = "translateY(" + y + "px)";
  let t = 0; for (let gap = 45; t < ms - 120; gap = Math.min(220, gap * 1.09)){ t += gap; rollTimers.push(setTimeout(() => { A.sfx("reel"); haptic(6, 0.08, 0.15); }, t)); }   // ticks that slow down
  rollTimers.push(setTimeout(() => { reel.classList.add("landed"); A.sfx("reelStop"); haptic(22, 0.45, 0.5); }, ms));
}
function rollSpin(){
  if (rollPhase !== "ready") return;
  if ($("chalSame")) $("chalSame").hidden = true;
  rollPhase = "spinning"; ROLL = rollDice(); rollKept = true;
  label($("rollGo"), ["Rolling…", "抽緊…"]);
  const ms = reduceMotion ? 0 : 1;
  spinReel($("reelBg"), $("stripBg"), BG_KEYS, ROLL.bg, ms && 1300); spinReel($("reelPe"), $("stripPe"), PE_KEYS, ROLL.pe, ms && 2100);
  rollTimers.push(setTimeout(() => showRollResult(), ms ? 2350 : 0));
}
function rollFinish(quiet){   // a tap while spinning: stop the reels now
  rollTimers.forEach(clearTimeout); rollTimers = [];
  placeStrip($("stripBg"), BG_KEYS, ROLL.bg, REPS - 1); placeStrip($("stripPe"), PE_KEYS, ROLL.pe, REPS - 1);
  $("reelBg").classList.add("landed"); $("reelPe").classList.add("landed");
  if (quiet){ rollPhase = "done"; return; }
  A.sfx("reelStop"); showRollResult();
}
function showRollResult(again){
  rollTimers.forEach(clearTimeout); rollTimers = [];
  rollPhase = "done"; const P = personaOf(ROLL); if (!P) return;
  if (again){ placeStrip($("stripBg"), BG_KEYS, ROLL.bg, REPS - 1); placeStrip($("stripPe"), PE_KEYS, ROLL.pe, REPS - 1); $("reelBg").classList.add("landed"); $("reelPe").classList.add("landed"); }
  $("rrName").textContent = P.zh; $("rrName").lang = "zh-HK";
  const nz = document.createElement("span"); nz.className = "zh"; nz.lang = "zh-HK"; nz.textContent = P.c.zh; $("rrNick").replaceChildren(P.c.en || P.en, nz);
  bi($("rrLine"), P.c.line[0], P.c.line[1]);
  $("rollRes").hidden = false;
  $("rollSay").textContent = "You rolled " + P.en + ": " + P.zh + ", " + (P.c.en || "") + ". " + P.c.line[0];
  label($("rollGo"), ["Start my life", "開始人生"]);
  if (!again){ A.sfx("rival"); haptic([20, 35, 35], 0.5, 0.6); }
  $("rollGo").focus({preventScroll: true});
}
$("rollGo").addEventListener("click", () => {
  if (rollPhase === "ready") rollSpin(); else if (rollPhase === "spinning") rollFinish(); else if (rollPhase === "done") startGame();
});
$("rollModal").addEventListener("click", e => { if (e.target === e.currentTarget) closeRoll(); });
if ($("rollClose")) $("rollClose").addEventListener("click", () => closeRoll());
// who this life is, while it's played: the laptop status card
function showWho(){
  const P = personaOf(S && S.persona), w = $("hudWho"); w.hidden = !P; if (P){ w.textContent = P.zh; w.title = P.en; }
}
$("pickModal").addEventListener("click", e => { if (e.target === e.currentTarget) closePicker(); });

// ---------- the title screen's sheets ----------
// Leaderboard, How to play and Privacy open in a sheet over the title: the page's own sections are moved into it (so
// they work as they do on the page) and put back when it closes.
const INFO = {lb: {t: ["Leaderboard", "排行榜"], q: [".lbx"]}, how: {t: ["How to play", "玩法"], q: [".howto", ".falls"]}, priv: {t: ["Privacy", "私隱聲明"], q: [".foot"]}, wear: {t: ["Crab wardrobe", "蟹仔衣櫃"], q: [".wardrobe"]}};
let infoOpen = null;
function openInfo(kind, from){
  closeInfo(true); hideIabTip();
  const k = INFO[kind], body = $("infoBody");
  infoOpen = {from, moved: k.q.map(sel => { const el = document.querySelector(sel), mark = document.createComment(sel); el.before(mark); body.appendChild(el); return [el, mark]; })};
  const t = $("infoTitle"), z = document.createElement("span"); z.className = "zh"; z.lang = "zh-HK"; z.textContent = k.t[1]; t.replaceChildren(k.t[0], z);
  $("infoModal").hidden = false; modalOpen(true); body.scrollTop = 0; $("infoClose").focus({preventScroll: true}); A.sfx("uiOpen");
  if (kind === "lb") refreshLB(true);
  if (kind === "wear") renderWardrobe();
}
// The wardrobe: None and the eight accessories. One that's been earned shows the crab wearing it and can be picked;
// a locked one says which title unlocks it.
function wearHat(id){
  HAT = id && hatOwned(id) ? id : null; lsSet("tff_hat", HAT);
  buildLayers(false, "crab"); drawCrabs(); talk.mood = null; needDraw = true;   // every crab on screen, again
}
function renderWardrobe(){
  const box = $("wardrobeList"); if (!box) return; box.replaceChildren();
  const have = earnedTitles(), n = HATS.filter(h => have.includes(h.title)).length;
  bi($("wardrobeNote"), n + " of " + HATS.length + " unlocked. Earn a title to unlock its look.", "已解鎖 " + n + "／" + HATS.length + "。攞到稱號，就解鎖佢嘅造型。");
  [{id: null, en: "None", zh: "冇"}, ...HATS].forEach(h => {
    const own = !h.id || have.includes(h.title), t = h.title && TITLES.find(x => x.id === h.title);
    const b = document.createElement("button"); b.type = "button"; b.className = "wtile" + (own ? "" : " locked"); b.setAttribute("role", "radio");
    const checked = (h.id || null) === HAT;
    b.setAttribute("aria-checked", String(checked)); b.tabIndex = checked ? 0 : -1; if (!own) b.setAttribute("aria-disabled", "true");
    const cv = document.createElement("canvas"); cv.width = 160; cv.height = 128; cv.setAttribute("aria-hidden", "true");
    const g = cv.getContext("2d"); g.setTransform(2, 0, 0, 2, 80, 64); crabArt(g, "happy", h.id);
    const nm = document.createElement("span"); nm.className = "wn"; const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = h.zh; nm.append(h.en, z);
    b.append(cv, nm);
    if (!own && t){ const w = document.createElement("span"); w.className = "ww"; const wz = document.createElement("small"); wz.lang = "zh-HK"; wz.textContent = "攞到「" + t.zh + "」解鎖"; w.append("Locked: earn " + t.en, wz); b.appendChild(w); }
    b.addEventListener("click", () => {
      if (!own){ A.sfx("uiNope"); return; }
      wearHat(h.id); A.sfx("uiSelect"); [...box.children].forEach(x => { const on = x === b; x.setAttribute("aria-checked", String(on)); x.tabIndex = on ? 0 : -1; });
    });
    box.appendChild(b);
  });
  if (box.children.length && ![...box.children].some(x => x.tabIndex === 0)) box.children[0].tabIndex = 0;
  if (!box.dataset.kb){
    box.dataset.kb = "1";
    box.addEventListener("keydown", e => {
      const tiles = [...box.children]; if (!tiles.length) return;
      const i = tiles.indexOf(document.activeElement); if (i < 0) return;
      let ni = -1;
      if (e.key === "ArrowRight") ni = (i + 1) % tiles.length;
      else if (e.key === "ArrowLeft") ni = (i - 1 + tiles.length) % tiles.length;
      else if (e.key === "ArrowDown") ni = i + 3 < tiles.length ? i + 3 : i % 3;
      else if (e.key === "ArrowUp") ni = i - 3 >= 0 ? i - 3 : i + Math.floor((tiles.length - 1 - i) / 3) * 3;
      else if (e.key === "Home") ni = 0;
      else if (e.key === "End") ni = tiles.length - 1;
      if (ni < 0) return;
      e.preventDefault();
      tiles.forEach((x, k) => { x.tabIndex = k === ni ? 0 : -1; });
      const next = tiles[ni];
      next.focus({preventScroll: true});
      if (!next.classList.contains("locked")) next.click();
    });
    box.addEventListener("focusout", e => {
      if (box.contains(e.relatedTarget)) return;
      const tiles = [...box.children];
      const chk = tiles.find(x => x.getAttribute("aria-checked") === "true") || tiles[0];
      tiles.forEach(x => { x.tabIndex = x === chk ? 0 : -1; });
    });
  }
  const wt = $("wardrobeTitles");
  if (wt){
    wt.replaceChildren();
    const pb = BOOTH ? 0 : (+lsGet("tff_pb", 0) || 0), gamesN = BOOTH ? 0 : localScores().length;
    const st = document.createElement("p"); st.className = "wt-stats";
    bi(st,
      "Titles collected: " + have.length + "/" + TITLES.length + (pb > 0 ? " · Best: " + fmt(pb) : "") + (gamesN ? " · Games on device: " + gamesN : ""),
      "稱號圖鑑：" + have.length + "／" + TITLES.length + (pb > 0 ? " · 最高紀錄：" + fmt(pb) : "") + (gamesN ? " · 本機局數：" + gamesN : ""));
    const grid = document.createElement("div"); grid.className = "wt-grid";
    TITLES.forEach(t => {
      const got = have.includes(t.id), d = document.createElement("div");
      d.className = "wt-chip " + (got ? "on" : "locked");
      const b = document.createElement("b"); b.textContent = got ? t.zh + " · " + t.en : "？？？ · Locked 未解鎖";
      const sm = document.createElement("small"); sm.textContent = got ? t.line[1] : t.line[0];
      d.append(b, sm); grid.appendChild(d);
    });
    wt.append(st, grid);
  }
}
function closeInfo(quiet){
  if (!infoOpen) return;
  if (!quiet) A.sfx("uiClose");
  for (const [el, mark] of infoOpen.moved) mark.replaceWith(el);
  const from = infoOpen.from; infoOpen = null;
  $("infoModal").hidden = true; modalOpen(false);
  if (!quiet && !played) iabTip();
  if (from && !from.closest("[hidden]")) from.focus({preventScroll: true});
}
$("infoClose").addEventListener("click", () => closeInfo());
$("infoModal").addEventListener("click", e => { if (e.target === e.currentTarget) closeInfo(); });
for (const [id, kind] of [["tsLb", "lb"], ["tsHow", "how"], ["tsPriv", "priv"], ["tsWear", "wear"]]) $(id).addEventListener("click", e => openInfo(kind, e.currentTarget));
$("tsStory").addEventListener("click", () => { if (window.TFF_INTRO && TFF_INTRO.replay){ A.sfx("uiOpen"); TFF_INTRO.replay(); } });
$("tsMute").addEventListener("click", toggleMute);
$("tsFs").addEventListener("click", () => toggleFs(false));

// ---------- Instagram follow prompt (manual buttons + gentle exit intent) ----------
const igPageAt = performance.now();
let igReturnTo = null, igWasEnd = false, igBackArmed = false, outboundAt = 0;
function igEligible(){
  if (BOOTH || lsGet("tff_ig_done", false) || ssGet("tff_ig_seen") === "1") return false;
  if (window.TFF_INTRO && TFF_INTRO.on()) return false;
  if (S && S.dragX != null) return false;
  for (const id of ["igModal", "fsModal", "holdModal", "cardModal", "offerModal", "reviveModal", "pickModal", "rollModal", "infoModal"]){
    const el = $(id); if (el && !el.hidden) return false;
  }
  return true;
}
function openIg(auto){
  const m = $("igModal"); if (!m || !m.hidden) return;
  if (auto && !igEligible()) return;
  hideIabTip();
  if (S && S.mode === "playing") togglePause();
  igReturnTo = document.activeElement;
  igWasEnd = !$("endModal").hidden;
  if (igWasEnd) $("endModal").inert = true;
  ssSet("tff_ig_seen", "1");
  m.hidden = false; modalOpen(true); A.sfx("uiOpen");
  ($("igGo") || $("igClose")).focus({preventScroll: true});
}
function closeIg(quiet){
  const m = $("igModal"); if (!m || m.hidden) return;
  if (!quiet) A.sfx("uiClose");
  m.hidden = true;
  if (igWasEnd) $("endModal").inert = false;
  const anyModal = ["fsModal", "holdModal", "cardModal", "offerModal", "reviveModal", "pickModal", "rollModal", "infoModal", "endModal"].some(id => { const el = $(id); return el && !el.hidden; });
  if (!anyModal) modalOpen(false);
  if (!quiet && !played && (!S || S.mode === "idle") && !anyModal) iabTip();
  const back = igReturnTo; igReturnTo = null; igWasEnd = false;
  if (back && back.focus && !back.closest("[hidden]") && !back.closest("[inert]")) back.focus({preventScroll: true});
  if (!quiet) syncFsPrompt();
}
for (const id of ["tsIg", "endIgBtn"]){ const b = $(id); if (b) b.addEventListener("click", () => openIg(false)); }
if ($("igClose")) $("igClose").addEventListener("click", () => closeIg());
if ($("igDismiss")) $("igDismiss").addEventListener("click", () => closeIg());
if ($("igModal")) $("igModal").addEventListener("click", e => { if (e.target === e.currentTarget) closeIg(); });
function markIgFollowed(){ outboundAt = performance.now(); lsSet("tff_ig_done", true); ssSet("tff_ig_seen", "1"); A.sfx("uiDone"); }
for (const id of ["igGo", "igQrLink"]){ const el = $(id); if (el) el.addEventListener("click", () => { markIgFollowed(); closeIg(true); }); }
if ($("footIg")) $("footIg").addEventListener("click", markIgFollowed);
document.addEventListener("click", e => {
  const a = e.target && e.target.closest && e.target.closest("#threadsBtn, #iabOpen, #igGo, #igQrLink, #footIg, a[target='_blank'], a[href^='mailto:']");
  if (a) outboundAt = performance.now();
}, {capture: true, passive: true});
function maybeExitIg(e){
  if (!e || typeof e.clientY !== "number" || e.clientY > 12) return;
  if (e.pointerType && e.pointerType !== "mouse") return;
  if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
  if (typeof matchMedia === "function" && !matchMedia("(hover: hover)").matches) return;
  if (S && S.mode === "playing" && e.clientX > window.innerWidth - 180) return;
  if (performance.now() - igPageAt < 1500) return;
  if (igEligible()) openIg(true);
}
document.addEventListener("mouseout", e => { if (!e.relatedTarget && !e.toElement) maybeExitIg(e); });
document.addEventListener("mouseleave", maybeExitIg);
function armExitBack(){
  if (igBackArmed || BOOTH || lsGet("tff_ig_done", false) || ssGet("tff_ig_seen") === "1") return;
  igBackArmed = true;
  try { if (!(history.state && history.state.tffExit)) history.pushState({tffExit: 1}, ""); } catch(e){}
}
for (const ev of ["pointerdown", "keydown"]) document.addEventListener(ev, armExitBack, {capture: true, once: true, passive: true});
window.addEventListener("popstate", () => {
  if (!$("igModal").hidden){ closeIg(true); return; }
  if (igEligible()) openIg(true);
});

// ---------- How to play: a short clip of each move, filmed from the game itself ----------
// tools/clips.mjs films them from real play (src/clips/). A clip loads when it first comes on screen, and whole (fetched
// into a blob): the host answers a range request with the full file, and Safari won't play a video from a server that
// does. It plays muted, on a loop, while it's on screen, and stops when it's off screen or a game is being played (so
// it never costs the game frames). With reduced motion it shows its still until played. Each has a pause / play button
// (moving pictures: WCAG 2.2.2); the clip's text is beside it, so the video itself is hidden from screen readers.
const gameOn = () => !!(S && (S.mode === "playing" || S.mode === "card" || S.mode === "offer"));
const clipIO = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { e.target.__vis = e.isIntersecting; clipSync(e.target); }), {rootMargin: "80px"}) : null;
const clipVids = [];
function clipAdd(box){
  const v = box.querySelector("video"), b = document.createElement("button"); b.type = "button"; b.className = "clip-pp";
  b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="i-pause" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/><path class="i-play" d="M8 5.5v13l10.5-6.5z"/></svg>';
  b.addEventListener("click", () => { v.__want = !box.dataset.playing; v.__vis = true; clipSync(v, true); });
  v.addEventListener("click", () => b.click());
  for (const ev of ["play", "playing", "pause", "ended"]) v.addEventListener(ev, () => clipUI(v));
  box.appendChild(b); v.__want = !reduceMotion; clipVids.push(v); clipUI(v);
  if (clipIO) clipIO.observe(v);
}
function clipUI(v){
  const box = v.parentNode, on = !v.paused && !v.ended, b = box.querySelector(".clip-pp");
  if (on) box.dataset.playing = "1"; else delete box.dataset.playing;
  b.setAttribute("aria-label", (on ? "Pause the clip: " : "Play the clip: ") + box.dataset.label);
}
function clipLoad(v){
  if (!v.__load) v.__load = fetch(v.dataset.src).then(r => { if (!r.ok) throw new Error(r.status); return r.blob(); })
    .then(b => { v.src = URL.createObjectURL(b); }).catch(() => { v.parentNode.classList.add("still"); });
  return v.__load;
}
function clipSync(v, asked){   // play if it's wanted and on screen (and no game is on, unless the player asked for it)
  if (!(v.__want && (v.__vis || !clipIO) && (asked || !gameOn()))){ if (!v.paused) v.pause(); return; }
  clipLoad(v).then(() => { if (v.src && v.__want && v.paused) v.play().catch(e => {   // a play cut short by a pause (scrolled away) isn't a "no"
    if (e && e.name === "NotAllowedError"){ v.__want = false; clipUI(v); } }); });   // the browser won't autoplay (e.g. iPhone Low Power Mode): wait for a tap
}
const clipsSync = () => clipVids.forEach(v => clipSync(v));
document.querySelectorAll(".howto .clip").forEach(clipAdd);

// ---------- game controller ----------
// Any standard pad (Xbox, PlayStation, Switch Pro and most others). In play: the D-pad or left stick moves, down (or
// RT) falls faster, A drops, B, Y or up turns, X holds, LB / RB fine-turn, Start pauses, Select (View) mutes. On a
// Life Event card X and Y pick the first or second choice, or the D-pad moves between them and A picks. On the start
// card, the pause card, the tower view and the statement the D-pad moves between the buttons, A presses the one in
// focus, B goes back and Start starts (or resumes). A browser shows a pad to the page once a button is pressed on it.
const GP = {on: 0, prev: {}, held: {}, repAt: 0};
function padState(gp){
  const b = i => { const x = gp.buttons[i]; return !!x && (x.pressed || x.value > 0.5); };
  const ax = gp.axes[0] || 0, ay = gp.axes[1] || 0;
  return {a: b(0), b: b(1), x: b(2), y: b(3), lb: b(4), rb: b(5), rt: b(7), sel: b(8), start: b(9),
    up: b(12) || ay < -0.6, down: b(13) || ay > 0.6, left: b(14) || ax < -0.5, right: b(15) || ax > 0.5};
}
const padTargets = box => [...box.querySelectorAll("button, input, a[href]")].filter(e => !e.disabled && !e.closest("[hidden]") && e.getClientRects().length && getComputedStyle(e).visibility !== "hidden");
function padMove(box, dir){   // the next (or previous) control in the box gets the focus
  const els = padTargets(box); if (!els.length) return;
  const i = els.indexOf(document.activeElement);
  els[i < 0 ? (dir > 0 ? 0 : els.length - 1) : clamp(i + dir, 0, els.length - 1)].focus();
}
function padPress(box){ const el = document.activeElement; if (el && padTargets(box).includes(el)){ el.click(); return true; } return false; }
function pollPad(now){
  let gp = null; for (const p of (navigator.getGamepads ? navigator.getGamepads() : [])) if (p && p.connected){ gp = p; break; }
  const cur = gp ? padState(gp) : {}, was = GP.prev; GP.prev = cur;
  const hit = k => cur[k] && !was[k];
  if (window.TFF_INTRO && TFF_INTRO.on()){ if (hit("a")) TFF_INTRO.next(); else if (hit("b") || hit("start")) TFF_INTRO.skip(); return; }   // the opening story
  // held moves: the pad lets go only of what it was holding, so a key held at the same time isn't cut off
  for (const k of ["left", "right", "soft"]){
    const on = k === "soft" ? !!(cur.down || cur.rt) : !!cur[k];
    if (on === !!GP.held[k]) continue;
    GP.held[k] = on; const v = on && !!S && S.mode === "playing";
    if (k === "soft") softHeld = v; else if (k === "left" || k === "right") setKey(k, v); else keys[k] = v;
    if (v) S.dragX = null;
  }
  if (!gp || !S) return;
  if (Object.keys(cur).some(hit)){ root.classList.add("padnav"); A.unlock(); }
  if (hit("sel")) toggleMute();
  // the D-pad between buttons: once per press, then again every 0.15 s after 0.4 s held
  const dir = cur.up || cur.left ? -1 : cur.down || cur.right ? 1 : 0;
  let nav = 0;
  if (dir && (hit("up") || hit("left") || hit("down") || hit("right"))){ nav = dir; GP.repAt = now + 400; }
  else if (dir && now >= GP.repAt){ nav = dir; GP.repAt = now + 150; }
  if (!$("igModal").hidden){
    if (nav) padMove($("igModal"), nav);
    if (hit("a")) padPress($("igModal"));
    if (hit("b") || hit("start")) closeIg();
    return;
  }
  if (!$("fsModal").hidden){
    if (nav) padMove($("fsModal"), nav);
    if (hit("a")) padPress($("fsModal"));
    if (hit("b") || hit("start")) closeFsModal("skip");
    return;
  }
  if (!$("endModal").hidden){   // the statement
    if (nav) padMove($("endModal"), nav);
    if (hit("a") && performance.now() - endShownAt > 900) padPress($("endModal"));
    if (hit("b")) $("closeEnd").click();
    else if (hit("start")){ if (S.step < 4){ if (!$("stNext").disabled) $("stNext").click(); } else newLife(); }
    return;
  }
  if (!$("rollModal").hidden){   // the roll: A or Start rolls (then starts); B: back
    if (hit("a") || hit("start")) $("rollGo").click(); else if (hit("b")) closeRoll();
    return;
  }
  if (!$("pickModal").hidden){   // left/right: Jack or Jackie; A or Start: go; B: back
    if (hit("left") || hit("right")) setPick(pickSel === "jack" ? "jackie" : "jack");
    else if (hit("a") || hit("start")) pickGo(); else if (hit("b")) closePicker();
    return;
  }
  if (!$("infoModal").hidden){
    if (hit("b") || hit("start")) closeInfo();
    else { if (nav) padMove($("infoModal"), nav); if (hit("a")) padPress($("infoModal")); }
    return;
  }
  if (S.revive){
    const r = S.revive;
    if (r.phase === "ask"){ if (hit("x")) reviveAnswer(true); else if (hit("y") || hit("b")) reviveAnswer(false); else { if (nav) padMove($("reviveModal"), nav); if (hit("a")) padPress($("reviveModal")); } }
    else if (r.phase === "lesson" && (hit("a") || hit("b") || hit("start"))) $("rvGo").click();
    return;
  }
  if (S.mode === "offer" && S.offer){
    if (hit("x")) offerAnswer(true); else if (hit("y") || hit("b")) offerAnswer($("offerNo").hidden);
    else { if (nav) padMove($("offerModal"), nav); if (hit("a") && !padPress($("offerModal")) && $("offerNo").hidden) offerAnswer(true); }
    return;
  }
  if (S.mode === "card" && S.card){
    if (!S.card.flip){
      if (S.card.t < 450) return;   // a press meant for the last item, as the card came up
      if (hit("x") || hit("y")) choose(S.card.order[hit("x") ? 0 : 1] === "w" ? "wise" : "risky");
      else { if (nav) padMove($("cardChoices"), nav); if (hit("a")) padPress($("cardChoices")); }
    } else if ((hit("a") || hit("b") || hit("start")) && S.card.t - S.card.flipAt >= 450) closeCard();
    else if (nav && S.card.powers){ const n = S.card.powers.length; pickPower((S.card.powers.indexOf(S.card.power) + (nav < 0 ? n - 1 : 1)) % n); }
    return;
  }
  if (S.mode === "paused"){
    if (hit("start") || hit("b")) togglePause();
    else { if (nav) padMove($("pauseOv"), nav); if (hit("a") && !padPress($("pauseOv"))) togglePause(); }
    return;
  }
  if (S.mode === "idle"){
    const box = !$("seeOv").hidden ? $("seeOv") : !$("startOv").hidden ? $("startOv") : null;
    if (!box) return;
    const go = box.id === "startOv" ? beginGame : S.flowDone ? newLife : openResults;
    if (hit("start")) go();
    else if (box.id === "seeOv" && hit("b")) openResults();
    else { if (nav) padMove(box, nav); if (hit("a") && !padPress(box)) go(); }
    return;
  }
  if (S.mode !== "playing") return;
  if (hit("start")){ togglePause(); return; }
  if (hit("a")) act("drop");
  if (hit("b") || hit("y") || hit("up")) act("rotate");
  if (hit("x")) act("hold");
  if (hit("lb")) act("rotL");
  if (hit("rb")) act("rotR");
}
window.addEventListener("gamepadconnected", () => {
  GP.on++; root.classList.add("gamepad");
  if (S && S.mode !== "over") stamp("Controller ready", "手掣已連接", "info");
});
window.addEventListener("gamepaddisconnected", () => {
  GP.on = Math.max(0, GP.on - 1);
  if (!GP.on){ root.classList.remove("gamepad"); pollPad(performance.now()); }   // lets go of anything it was holding
});
document.addEventListener("pointerdown", () => { root.classList.remove("padnav"); if (BOOTH) bumpBooth(); }, true);
const cv = $("board");
let drag = null;
function worldX(clientX, r){ r = r || cv.getBoundingClientRect(); return (clientX - r.left) / r.width * (W + 2 * XV) - XV; }
// Board gestures. The first clear movement decides what a touch is: sideways steers (the item follows the finger),
// downward doesn't (a slow drag down makes it fall faster while held). A swipe down drops the item, and so does a
// flick down at the end of steering; a short touch that barely moved turns it. So a swipe down that drifts a
// little no longer pulls the item across the board first, and a tap that rolls a few pixels still turns it.
// (The board's place on screen is measured once per touch: measuring can force a layout.)
const evT = e => e.timeStamp || performance.now();   // when the touch happened, not when the handler got to run
cv.addEventListener("pointerdown", e => { if (!S || S.mode !== "playing") return; const t = evT(e);
  drag = {x:e.clientX, y:e.clientY, t, axis:null, soft:false, r:cv.getBoundingClientRect(), pts:[[t, e.clientX, e.clientY]]}; try { cv.setPointerCapture(e.pointerId); } catch(_){} });
cv.addEventListener("pointermove", e => {
  if (!drag || !S || S.mode !== "playing") return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  drag.pts.push([evT(e), e.clientX, e.clientY]); if (drag.pts.length > 16) drag.pts.shift();
  if (!drag.axis){
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) drag.axis = "x";
    else if (dy > 10 && dy > Math.abs(dx) * 1.2) drag.axis = "y";
  }
  if (drag.axis === "x") S.dragX = worldX(e.clientX, drag.r);
  else if (drag.axis === "y" && dy > 28 && !drag.soft){ drag.soft = true; softHeld = true; haptic(10, 0.15, 0.25); }
});
const endDrag = e => {
  if (!drag) return;
  const now = evT(e), dt = now - drag.t, dy = e.clientY - drag.y, dx = e.clientX - drag.x;
  let p0 = drag.pts[drag.pts.length - 1];
  for (const q of drag.pts) if (now - q[0] <= 200){ p0 = q; break; }   // where the finger was 0.2 s ago
  const fy = e.clientY - p0[2], fx = e.clientX - p0[1];
  if (S && S.mode === "playing" && e.type === "pointerup"){
    const swipe = drag.axis !== "x" && dy > 45 && dy > Math.abs(dx) * 1.2 && dt < 450;
    const flick = drag.axis === "x" && fy > 30 && fy > Math.abs(fx) * 1.2;
    if (swipe || flick) act("drop");
    else if (!drag.axis && dt < 300 && Math.abs(dx) < 10 && Math.abs(dy) < 10) act("rotate");
  }
  if (drag.soft) softHeld = false;
  if (S) S.dragX = null; drag = null;
};
cv.addEventListener("pointerup", endDrag); cv.addEventListener("pointercancel", endDrag);
// Every press answers. What has a sound of its own (Start, steps, sheets, toggles, picks, the game's own moves) plays
// it where it happens, so keys and a controller get it too; any other button gets a tap. A locked button says no.
const OWN_SOUND = "#startBtn,#pickGo,#rollGo,#chalSame,#againBtn,#againBtn2,#replayBtn,#stNext,#stBack,#tsLb,#tsHow,#tsPriv,#tsWear,#tsStory,#tsIg,#endIgBtn,#igClose,#igGo,#igQrLink,#igDismiss,.wtile,#infoClose,.who,#tsMute,#muteBtn,#fsBtn,#tsFs,#fsStartBtn,#fsModalGo,#fsModalSkip,#pauseBtn,#resumeBtn,#resultsBtn,#closeEnd,.choice,.qopt,.pad button,#hudHoldBtn,label.habit,.ctime label";
document.addEventListener("click", e => { const t = e.target.closest && e.target.closest(".btn,.tab,.iconbtn,.ov-chip,.hbtn,button,[role=tab]"); if (t && !t.disabled && t.getAttribute("aria-disabled") !== "true"){ haptic(8, 0.12, 0.2); if (!t.closest(OWN_SOUND)) A.sfx("click"); } });
document.addEventListener("pointerdown", e => { const t = e.target.closest && e.target.closest("button:disabled,[aria-disabled=true]"); if (t){ A.unlock(); A.sfx("uiNope"); haptic([22, 30, 30], 0.45, 0.35); } });
// Sound from the first touch: a page may make sound only after a tap or a key, so the first one anywhere (the title
// included) switches it on, with the theme playing softer as menu music until a game starts. The title says so.
let audioOn = false;
function soundHint(){ const h = $("tsSound"); if (h) h.hidden = audioOn || A.muted(); const z = $("tsSilent"); if (z) z.hidden = !IOS; }
// The tip in an app's browser, on the start: open the game in the phone's own browser (Android: straight to Chrome;
// LINE: its own switch; elsewhere the app's ··· menu), or copy the link. Closed, it stays closed for the visit.
function hideIabTip(){
  const tip = $("iabTip");
  if (tip && !tip.hidden){ tip.hidden = true; root.style.setProperty("--iab-h", "0px"); root.classList.remove("iab-tight"); lastFit = ""; }
}
const iabRO = typeof ResizeObserver === "function" ? new ResizeObserver(() => {
  const tip = $("iabTip");
  if (tip && !tip.hidden && tip.offsetHeight) root.style.setProperty("--iab-h", tip.offsetHeight + "px");
}) : null;
if (iabRO && $("iabTip")) iabRO.observe($("iabTip"));
function iabTip(){
  const tip = $("iabTip"); if (!IAB || ssGet("tff_iab_x")){ tip.hidden = true; root.style.setProperty("--iab-h", "0px"); root.classList.remove("iab-tight"); return; }
  const isChalPath = location.pathname.replace(/\/+$/, "") === "/c";
  const hasChalQuery = /^-?\d{1,7}$/.test(new URLSearchParams(location.search).get("s") || "");
  const q = (isChalPath || CHAL || hasChalQuery) ? location.search : "";   // a friend's challenge goes along
  const url = location.origin + location.pathname + q, name = IAB === "app" ? "this app" : IAB, zh = IAB === "app" ? "呢個App" : IAB;
  let how = null;
  if (IAB === "LINE") how = () => { location.href = url + (q ? "&" : "?") + "openExternalBrowser=1"; };
  else if (ANDROID && IAB !== "WeChat") how = () => { location.href = "intent://" + location.host + location.pathname + q + "#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=" + encodeURIComponent(url) + ";end"; };
  const t = $("iabText"), dest = IAB === "LINE" ? ["your phone's browser", "手機瀏覽器"] : ["Chrome", "Chrome"];
  if (how) bi(t, "Best in " + dest[0] + ": full screen, sound, and saving your result.", "用" + dest[1] + "玩最好：全螢幕、有聲，仲儲到結果圖。");
  else bi(t, "Best in your browser: tap ··· (top right), then open in browser.", "用瀏覽器玩最好：撳右上角「···」，揀用瀏覽器開啟。");
  tip.setAttribute("aria-label", "You're in " + name + "'s browser 你而家用緊" + zh + "嘅瀏覽器");
  const ob = $("iabOpen"); ob.hidden = !how; if (how){ label(ob, IAB === "LINE" ? ["Open in browser", "用瀏覽器開"] : ["Open in Chrome", "用Chrome開"]); ob.onclick = how; }
  tip.hidden = false; root.classList.remove("iab-tight");
  requestAnimationFrame(() => { if (!tip.hidden && tip.offsetHeight) root.style.setProperty("--iab-h", tip.offsetHeight + "px"); });
}
$("iabClose").addEventListener("click", () => { ssSet("tff_iab_x", "1"); A.sfx("uiClose"); iabTip(); lastFit = ""; resize(); });
$("iabCopy").addEventListener("click", async () => {
  const isChalPath = location.pathname.replace(/\/+$/, "") === "/c";
  const hasChalQuery = /^-?\d{1,7}$/.test(new URLSearchParams(location.search).get("s") || "");
  const chalQuery = CHAL ? (() => { const qp = new URLSearchParams(); qp.set("s", String(CHAL.s)); if (CHAL.n) qp.set("n", CHAL.n); if (CHAL.v) qp.set("v", CHAL.v.id); if (CHAL.p) qp.set("p", CHAL.p); if (CHAL.sil && CHAL.sil.length <= 240) qp.set("sil", CHAL.sil); return "/c?" + qp.toString(); })() : "/";
  const u = location.origin + ((isChalPath || hasChalQuery) ? "/c" + location.search : chalQuery), st = $("iabStatus"); let done = false;
  try { await navigator.clipboard.writeText(u); done = true; } catch(e){
    const t = document.createElement("textarea"); t.value = u; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;top:0;opacity:0";
    document.body.appendChild(t); t.select(); try { done = document.execCommand("copy"); } catch(_){} t.remove(); }
  st.textContent = done ? "Link copied. Paste it in your browser. 已複製，貼去瀏覽器開啟。" : u;
  if (done) A.sfx("uiDone");
});
let soundHintT = 0;
function firstSound(e){
  A.unlock();
  const t = e && e.type;
  if (audioOn){
    if (t === "click" || t === "keydown"){ clearTimeout(soundHintT); soundHint(); }
    else if (t === "pointerup" || t === "touchend"){ clearTimeout(soundHintT); soundHintT = setTimeout(soundHint, 0); }
    return;
  }
  audioOn = true;
  if (t === "pointerup" || t === "touchend"){ clearTimeout(soundHintT); soundHintT = setTimeout(soundHint, 0); }
  else if (t !== "pointerdown") soundHint();
  if ((!S || S.mode !== "playing") && !(window.TFF_INTRO && TFF_INTRO.on())) menuMusic();   // the opening film has its own score
}
function menuMusic(){ A.stage(0); A.mode("menu"); A.start(); }
for (const ev of ["pointerdown", "pointerup", "touchend", "keydown", "click"]) document.addEventListener(ev, firstSound, {capture: true, passive: true});
soundHint(); iabTip();
window.TFF_ART = {sound: firstSound, music: () => { if (audioOn && (!S || S.mode !== "playing")) menuMusic(); if (!played && IAB && !ssGet("tff_iab_x")) setTimeout(() => { if (!played && (!S || S.mode === "idle")) iabTip(); }, 650); }, fs: () => { if (fsOn) enterBrowserFs(); }};   // for the opening film (src/intro.js)
setTimeout(resize, 800);   // an app's browser may settle its bars after the page loads
$("muteBtn").addEventListener("click", toggleMute);
$("fsBtn").addEventListener("click", () => toggleFs());
$("fsStartBtn").addEventListener("click", () => { toggleFs(true); beginGame(); });
$("pauseBtn").addEventListener("click", () => { if (S && (S.mode === "playing" || S.mode === "paused")) togglePause(); });
$("hudHoldBtn").addEventListener("click", () => act("hold"));
$("startBtn").addEventListener("click", beginGame);
$("resumeBtn").addEventListener("click", togglePause);
$("cardContinue").addEventListener("click", e => { if (!(S.card && tapTooSoon(e, S.card.flipAt))) closeCard(); });
$("againBtn").addEventListener("click", newLife);
// "See tower" hides the statement without resetting it; "Back to results" (or Esc / R) brings it back as it was.
let endScroll = 0;
function openResults(){
  if (!S || S.mode !== "idle" || !S.viewing) return;
  S.replay = null;
  $("seeOv").hidden = true; S.viewing = false; S.mode = "over"; A.sfx("uiOpen");
  $("endModal").hidden = false; $("stScroll").scrollTop = endScroll;
  endShownAt = performance.now(); modalOpen(true); setPauseUI();
  $(S.step === 4 ? "closeEnd" : STEP_FOCUS[S.step - 1]).focus({preventScroll:true});   // back on the step they left
}
$("resultsBtn").addEventListener("click", openResults);
$("replayBtn").addEventListener("click", () => {
  if (!S || !(S.viewing && S.mode === "idle")) return;
  const bodies = engine.world.bodies.filter(b => b.tff && b !== S.active).sort((a, b) => (a.tff.at || 0) - (b.tff.at || 0));
  S.replay = { t0: performance.now(), dur: Math.min(3200, Math.max(1200, bodies.length * 90)), bodies };
  S.camTop = camBase();
  A.sfx("uiSelect"); needDraw = true;
});
$("closeEnd").addEventListener("click", () => { A.sfx("uiClose"); endScroll = $("stScroll").scrollTop; $("endModal").hidden = true; modalOpen(false); S.viewing = true; S.mode = "idle"; S.queue = []; S.hold = null; drawPreviews(true); $("seeOv").hidden = false; setPauseUI(); $("againBtn2").hidden = !S.flowDone; ($("againBtn2").hidden ? $("resultsBtn") : $("againBtn2")).focus(); if (S.overKey) quip(S.overKey, 3); });
$("againBtn2").addEventListener("click", newLife);
cv.tabIndex = 0;

