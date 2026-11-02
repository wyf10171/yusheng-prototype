(() => {
  const page=document.body.dataset.page;
  const titles={index:"首页",community:"声音社区",studio:"声音工作台",publish:"发布作品",work:"作品详情",market:"接单大厅",demand:"需求详情","new-demand":"发布需求",bids:"需求方工作台",order:"订单履约",academy:"声音学院",course:"课程详情",lesson:"课程学习",homework:"作业与点评",live:"声播现场",room:"语音直播",broadcast:"主播中心",profile:"个人中心",wallet:"创作收益",messages:"消息中心",settings:"账户设置",activity:"声音企划",creator:"创作者主页",admin:"运营工作台"};
  const groups={work:"community",creator:"community",publish:"studio",demand:"market","new-demand":"market",order:"market",bids:"market",course:"academy",lesson:"academy",homework:"academy",room:"live",broadcast:"live",wallet:"profile",settings:"profile",messages:"profile"};
  const current=groups[page]||page;
  const brand=`<span class="brand-icon" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span><span class="brand-title">屿声映画</span><span class="brand-en" style="display:block">YUSHENG · VOICE & STORY</span></span>`;
  const navItem=(p,name,i)=>`<a href="${p}.html" class="nav-item ${current===p?"active":""}" ${current===p?'aria-current="page"':""}>${icon(i)}<span>${name}</span>${current===p?'<span class="nav-dot"></span>':""}</a>`;
  document.title=`${titles[page]||"首页"} · 屿声映画`;
  document.getElementById("app").innerHTML=`
    <aside class="sidebar"><a href="index.html" class="brand" aria-label="屿声映画首页">${brand}</a><nav class="nav">${navItem("index","首页","House")}${navItem("community","声音社区","Compass")}${navItem("studio","声音工作台","AudioLines")}${navItem("market","接单大厅","BriefcaseBusiness")}</nav><div class="nav-label">在声音里相遇</div><nav class="nav">${navItem("academy","声音学院","BookOpen")}${navItem("live","声播现场","Radio")}</nav><div class="sidebar-bottom">${navItem("profile","我的主页","UserRound")}<a href="settings.html" class="nav-item">${icon("Settings2")}<span>设置与帮助</span></a><a href="profile.html" class="user-mini">${img("avatar3","avatar","南屿")}<span><strong>${esc(state.nickname||"南屿")}</strong><span class="small muted" style="display:block">声音创作者</span></span>${icon("ChevronsUpDown")}</a></div></aside>
    <header class="topbar"><a class="mobile-brand" href="index.html">${brand}</a><div class="breadcrumb">声音创作空间 <span>/</span> <b>${titles[page]||"首页"}</b></div><div class="top-actions"><form class="global-search" id="global-search">${icon("Search")}<input type="search" name="q" placeholder="搜索作品、声音或需求" aria-label="全站搜索"></form><a href="messages.html" class="icon-btn" title="消息中心" aria-label="消息中心">${icon("Bell")}${!state.notificationsRead?'<span class="notification-dot"></span>':""}</a><span class="divider"></span><a href="profile.html" class="row gap8">${img("avatar3","avatar","南屿")}<span class="small top-user">${esc(state.nickname||"南屿")}</span></a><a href="studio.html" class="btn coral sm">${icon("Plus")}开始创作</a></div></header>
    <main class="content" data-screen-label="${titles[page]}">${pages[page]?pages[page]():pages.index()}<footer class="footer-note">${icon("AudioLines")}屿声映画 · VOICE MAKES A STORY<span style="margin-left:auto">交互原型 V1.0</span></footer></main>
    <nav class="mobile-nav" aria-label="主导航">${[["index","首页","House"],["community","社区","Compass"],["studio","创作","Plus"],["market","接单","BriefcaseBusiness"],["profile","我的","UserRound"]].map(([p,t,i])=>`<a href="${p}.html" class="${current===p?"active":""}">${p==="studio"?`<span class="create-icon">${icon(i)}</span>`:icon(i)}<span>${t}</span></a>`).join("")}</nav>`;
  let toastTimer,previousFocus=null,overlayCleanup=null;
  const $=(s)=>document.querySelector(s);
  const $$=(s)=>Array.from(document.querySelectorAll(s));
  const refreshIcons=()=>lucide.createIcons();
  const toast=(text)=>{const t=$("#toast");t.textContent=text;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),3200)};
  const modal=(title,body,large=false)=>{
    closeModal();
    previousFocus=document.activeElement;
    $("#overlay-root").innerHTML=`<div class="modal-backdrop"><section class="modal ${large?"large":""}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-header"><h2>${title}</h2><button class="icon-btn" data-action="close-modal" aria-label="关闭">${icon("X")}</button></div>${body}</section></div>`;
    document.body.style.overflow="hidden";refreshIcons();
    setTimeout(()=>$("#overlay-root input:not([type=file]),#overlay-root textarea,#overlay-root button")?.focus(),0);
  };
  function closeModal(){
    if(overlayCleanup){overlayCleanup();overlayCleanup=null}
    $("#overlay-root").innerHTML="";document.body.style.overflow="";
    if(previousFocus?.isConnected)previousFocus.focus();
  }
  const success=(title,detail,href,label="完成")=>modal(title,`<div class="success-content"><div class="success-icon">${icon("Check")}</div><h3>${title}</h3><p>${detail}</p>${href?`<a class="btn primary" href="${href}">${label}${icon("ArrowRight")}</a>`:`<button class="btn primary" data-action="close-modal">${label}</button>`}</div>`);
  const pay=(name,amount,callback)=>{
    modal("确认演示订单",`<p class="small muted" style="text-align:center">${esc(name)}</p><div class="price"><small>¥</small>${Number(amount).toFixed(2)}</div><div class="payment-note">当前为交互原型，确认后仅生成本地演示记录，不发起支付、不产生真实扣款。</div><label class="check-row mt16"><input type="checkbox" id="pay-agreement" required><span>确认订单内容与相关服务约定</span></label><p class="error-message" id="pay-error"></p><button class="btn primary wide mt8" id="pay-confirm">${icon("ShieldCheck")}确认演示订单</button>`);
    $("#pay-confirm").onclick=()=>{if(!$("#pay-agreement").checked){$("#pay-error").textContent="请先确认订单与服务约定";return}$("#pay-confirm").disabled=true;callback();saveState()};
  };
  let playing=false,playTimer=null,playPosition=0,mediaObject=null,uploadedFile=null,recording=false,recorder=null,recordStream=null,recordTimer=null,recordSeconds=0,recordChunks=[],generatedAudioURL=null;
  const narration=new Audio("assets/voice-demo.wav");
  narration.addEventListener("ended",()=>{
    playing=false;stopVisualPlayback();
    const lessonButton=$('[data-action="play-lesson"]'),liveButton=$('[data-action="live-listen"]');
    if(lessonButton){lessonButton.innerHTML=`${icon("Play")}再次试听`;$("#lesson-status").textContent="课程音频示例已结束"}
    if(liveButton)liveButton.innerHTML=`${icon("Headphones")}开始收听`;
    refreshIcons();
  });
  function stopVisualPlayback(){
    clearInterval(playTimer);$$(".wave").forEach(w=>w.classList.remove("playing"));
    $$('[data-action="play"] svg').forEach(i=>{i.outerHTML=icon("Play")});refreshIcons();
  }
  function stopAllAudio(){
    playing=false;narration.pause();if(mediaObject)mediaObject.pause();
    window.speechSynthesis?.cancel();stopVisualPlayback();
  }
  function speak(text,voiceId="v1"){
    stopAllAudio();
    narration.currentTime=0;narration.playbackRate={v1:1,v2:1.08,v3:.88,v4:1.12,v5:.94,v6:1.1,v7:.9,v8:1.02}[voiceId]||1;
    narration.play().catch(()=>toast("音频暂时无法播放，请稍后重试"));
  }
  function togglePlay(){
    if(playing){stopAllAudio();return}
    stopAllAudio();playing=true;
    const audio=mediaObject||narration;
    audio.muted=state.muted;
    audio.play().catch(()=>{playing=false;toast("请重新选择可播放的音频或视频")});
    $$(".wave").forEach(w=>w.classList.add("playing"));
    $$('[data-action="play"] svg').forEach(i=>{i.outerHTML=icon("Pause")});refreshIcons();
    playTimer=setInterval(()=>{playPosition=(playPosition+1)%16;if($("#preview-time"))$("#preview-time").textContent=`00:${String(playPosition).padStart(2,"0")}`;if($('[data-action="seek"]'))$('[data-action="seek"]').value=playPosition},1000);
  }
  function setStudioMode(mode){
    if(!$("#studio-video"))return;
    if(recording)finishRecording();
    $("#studio-video").hidden=mode==="text"||mode==="record";
    $("#studio-text").hidden=mode!=="text";
    $("#record-surface").classList.toggle("visible",mode==="record");
    $$(".editor-toolbar .btn").forEach(b=>{b.classList.toggle("soft",b.dataset.value===mode);b.classList.toggle("secondary",b.dataset.value!==mode)});
  }
  async function startRecording(){
    if(recording){finishRecording();return}
    if(!navigator.mediaDevices?.getUserMedia){toast("此浏览器无法录音，请使用上传音频");return}
    try{
      stopAllAudio();recordStream=await navigator.mediaDevices.getUserMedia({audio:true});
      recorder=new MediaRecorder(recordStream);recordChunks=[];recordSeconds=0;recording=true;
      recorder.ondataavailable=e=>{if(e.data.size)recordChunks.push(e.data)};
      recorder.onstop=()=>{const blob=new Blob(recordChunks,{type:recorder.mimeType});if(generatedAudioURL)URL.revokeObjectURL(generatedAudioURL);generatedAudioURL=URL.createObjectURL(blob);const a=$("#record-audio");if(a){a.src=generatedAudioURL;a.hidden=false}mediaObject=new Audio(generatedAudioURL);uploadedFile=new File([blob],"我的录音.webm",{type:blob.type});if($("#asset-label"))$("#asset-label").textContent=`已录制：${recordSeconds} 秒`};
      recorder.start();$("#record-btn").classList.add("recording");$("#record-btn").innerHTML=icon("Square");$("#record-hint").textContent="录音中，点击停止";
      $$("#record-surface .wave").forEach(w=>w.classList.add("playing"));refreshIcons();
      recordTimer=setInterval(()=>{recordSeconds++;$("#record-time").textContent=`${String(Math.floor(recordSeconds/60)).padStart(2,"0")}:${String(recordSeconds%60).padStart(2,"0")}`;if(recordSeconds>=(page==="broadcast"?5:180))finishRecording()},1000);
    }catch(error){toast("未获得麦克风权限，可以改用上传音频");}
  }
  function finishRecording(){
    if(!recording)return;recording=false;clearInterval(recordTimer);
    if(recorder?.state==="recording")recorder.stop();recordStream?.getTracks().forEach(t=>t.stop());
    if($("#record-btn")){$("#record-btn").classList.remove("recording");$("#record-btn").innerHTML=icon("Mic");$("#record-hint").textContent="录音已保存，可试听或重新录制";refreshIcons()}
    $$("#record-surface .wave").forEach(w=>w.classList.remove("playing"));
  }
  const filterLists={community:"works-list",market:"demands-list",academy:"courses-list",live:"rooms-list",messages:"messages-list",wallet:"earnings-list"};
  let activeFilter="全部",searchTerm="",sortValue="recommended";
  function applyFilter(){
    const list=document.getElementById(filterLists[page]);if(!list)return;
    const cards=Array.from(list.children).filter(c=>c.dataset.category);
    let count=0;
    for(const card of cards){
      let visible=["全部","全部课程","全部明细"].includes(activeFilter)||card.dataset.category===activeFilter;
      if(activeFilter==="我的课程"){
        const course=YS.courses.find(c=>c.title===card.dataset.title);visible=course&&state.purchases.includes(course.id);
      }
      const match=(card.dataset.title||card.textContent).toLowerCase().includes(searchTerm.toLowerCase());
      card.hidden=!(visible&&match);if(visible&&match)count++;
    }
    list.querySelector(".filter-empty")?.remove();
    if(!count)list.insertAdjacentHTML("beforeend",`<div class="empty filter-empty">${icon("Search")}<h3>还没有找到匹配的内容</h3><p>试试其他分类或关键词。</p></div>`);
    refreshIcons();
  }
  function showBid(id){
    const d=[...state.demands,...YS.demands].find(x=>x.id===id)||findDemand(),b=state.bids.find(x=>x.demand===d.id);
    modal(b?"我的投标":"提交干音试音",`<p class="small muted mb16">${esc(d.title)}</p><form id="bid-form"><input type="hidden" name="demand" value="${d.id}"><div class="form-grid"><label class="field"><span>我的报价（元）</span><input name="price" type="number" min="20" max="${d.price}" value="${b?.price||d.price}" required></label><label class="field"><span>预计制作（天）</span><input name="days" type="number" min="1" max="30" value="${b?.days||3}" required></label></div><label class="source-btn" for="bid-file" style="cursor:pointer">${icon("FileAudio")}选择干音试音<span id="bid-filename" class="tiny muted">${esc(b?.file||"MP3 / WAV / M4A · 最多 20 MB")}</span></label><input type="file" id="bid-file" accept="audio/*" hidden><label class="field mt16"><span>试音说明</span><textarea name="note" placeholder="说说你对角色的理解" maxlength="500">${esc(b?.note||"")}</textarea></label><label class="check-row"><input type="checkbox" required ${b?"checked":""}><span>理解需求与授权约定，试音仅用于本次选角。</span></label><div class="error-message"></div><button class="btn primary wide mt16" type="submit">${icon("Send")}${b?"更新投标":"提交试音"}</button></form>`);
  }
  function generate(){
    if(recording){toast("请先停止录音");return}
    if($("#studio-text")&&!$("#studio-text").hidden&&$("#tts-text").value.trim().length<2){toast("请填写至少 2 个字的配音文案");return}
    if(state.quota<=0){toast("今日免费额度已用完，可使用原声继续创作");return}
    state.draftTitle=state.draftTitle||"听，海风有话说";saveState();
    modal("声音正在准备中",`<div style="text-align:center"><div class="progress-ring"><span id="generation-percent">0%</span></div><h3 id="generation-label">校验素材与授权音色</h3><p class="small muted mt16">15 秒 · ${YS.voices.find(v=>v.id===state.voice).name} · 角色换声</p><p class="tiny muted mt8">音色合成演示，不调用真实 AI 服务</p><button class="btn secondary mt24" data-action="close-modal">取消生成</button></div>`);
    let percent=0;
    const timer=setInterval(()=>{
      percent+=20;const ring=$(".progress-ring");if(!ring){clearInterval(timer);return}
      ring.style.setProperty("--progress",`${percent}%`);$("#generation-percent").textContent=`${percent}%`;$("#generation-label").textContent=percent<40?"校验素材与授权音色":percent<80?"准备声音效果":"生成预览与合成标识";
      if(percent>=100){
        clearInterval(timer);overlayCleanup=null;state.quota--;saveState();
        modal("声音效果已准备好",`<div class="success-content"><div class="success-icon">${icon("AudioLines")}</div><h3>换一种声音，故事有了新情绪</h3><p>角色音色 · ${YS.voices.find(v=>v.id===state.voice).name}<br>AI 合成演示 · 00:15</p>${wave(45)}<div class="row" style="justify-content:center"><button class="btn secondary" data-action="sample" data-id="${state.voice}">${icon("Play")}试听示例</button><a class="btn primary" href="publish.html">去发布${icon("ArrowRight")}</a></div><a href="assets/voice-demo.wav" download="屿声映画_音频示例.wav" class="text-link mt24">${icon("Download")}下载音频示例</a></div>`);
      }
    },450);overlayCleanup=()=>clearInterval(timer);
  }
  function share(){
    modal("把好声音，分享给同频的人",`<div class="row">${img(page==="room"?findRoom().cover:findWork().cover,"avatar lg","分享封面")}<div><h3>${page==="room"?findRoom().title:findWork().title}</h3><p class="tiny muted">来自屿声映画</p></div></div><div class="payment-note mt24">分享链接将打开这段声音。只有公开、审核通过的作品可以被访问。</div><button class="btn primary wide mt24" data-action="copy-link">${icon("Link")}复制链接</button>`);
  }
  function report(){
    modal("举报与反馈",`<form id="report-form"><label class="field"><span>举报原因</span><select name="reason"><option>未经授权使用素材或声音</option><option>冒用他人身份</option><option>不适宜的内容</option><option>其他问题</option></select></label><label class="field"><span>补充说明</span><textarea name="note" minlength="5" maxlength="1000" placeholder="请描述具体问题，便于我们核实。" required></textarea></label><button class="btn primary wide" type="submit">提交举报</button></form>`);
  }
  function formError(form,text){form.querySelector(".error-message").textContent=text}
  document.addEventListener("click",async event=>{
    const backdrop=event.target.closest(".modal-backdrop");
    if(backdrop&&event.target===backdrop){closeModal();return}
    const el=event.target.closest("[data-action]");if(!el)return;
    const action=el.dataset.action,id=el.dataset.id,value=el.dataset.value;
    if(action==="close-modal"){closeModal();return}
    if(action==="filter"){
      $$(".tabs .tab").forEach(b=>{b.classList.toggle("active",b===el);b.setAttribute("aria-selected",String(b===el))});
      if(el.dataset.group==="admin"){$("#admin-content").innerHTML=adminContent(value);refreshIcons();return}
      activeFilter=value;applyFilter();return;
    }
    if(action==="sort"||action==="market-sort"){
      el.parentElement.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b===el));
      const list=$(action==="sort"?"#works-list":"#demands-list");
      if(list){
        const items=Array.from(list.children).filter(c=>c.dataset.category);
        if(value==="price")items.sort((a,b)=>Number(b.querySelector(".price").textContent.replace(/[^\d]/g,""))-Number(a.querySelector(".price").textContent.replace(/[^\d]/g,"")));
        else if(value==="latest")items.reverse();
        else items.sort((a,b)=>YS.works.findIndex(w=>w.title===a.dataset.title)-YS.works.findIndex(w=>w.title===b.dataset.title));
        items.forEach(i=>list.appendChild(i));applyFilter();
      }return;
    }
    if(action==="voice"){
      state.voice=id;saveState();$("#voice-list").innerHTML=voiceGrid();$("#selected-voice").textContent=`${YS.voices.find(v=>v.id===id).name} · 授权角色音`;refreshIcons();return;
    }
    if(action==="voice-filter"){
      $$("#voice-filters .chip").forEach(b=>b.classList.toggle("active",b===el));
      $$("#voice-list .voice").forEach(card=>card.hidden=value!=="全部"&&YS.voices.find(v=>v.id===card.dataset.voice).gender!==value);return;
    }
    if(action==="sample"){speak("风从海上来，故事从这里开始。",id);toast("正在试听声音示例");return}
    if(action==="play"){togglePlay();return}
    if(action==="mute"){state.muted=!state.muted;saveState();narration.muted=state.muted;if(mediaObject)mediaObject.muted=state.muted;el.innerHTML=icon(state.muted?"VolumeX":"Volume2");refreshIcons();return}
    if(action==="studio-mode"){stopAllAudio();setStudioMode(value);return}
    if(action==="record"){await startRecording();return}
    if(action==="upload"){
      $("#asset-input").accept=el.dataset.kind==="video"?"video/mp4,video/quicktime":"audio/*";$("#asset-input").click();return;
    }
    if(action==="save-draft"){
      const title=$('[name="title"]')?.value||state.draftTitle||"听，海风有话说";
      state.draftTitle=title;state.draftEffects={denoise:$("#denoise")?.checked??true,reverb:$("#reverb")?.value||"录音室",volume:$("#voice-volume")?.value||85,offset:$("#audio-offset")?.value||0};saveState();toast("草稿已保存");return;
    }
    if(action==="reset-effects"){$("#denoise").checked=true;$("#reverb").value="录音室";$("#voice-volume").value=85;$("#volume-value").textContent="85%";$("#audio-offset").value=0;$("#offset-value").textContent="0 ms";toast("已恢复默认音效");return}
    if(action==="generate"){generate();return}
    if(action==="like"){
      const index=state.likes.indexOf(id);if(index>=0)state.likes.splice(index,1);else state.likes.push(id);saveState();
      el.classList.toggle("liked",index<0);el.querySelector("span").textContent=findWork().likes+(index<0?1:0);return;
    }
    if(action==="share"){share();return}
    if(action==="copy-link"){
      try{await navigator.clipboard.writeText(location.href);toast("链接已复制")}catch{toast("当前环境无法复制，请在浏览器地址栏复制链接")}return;
    }
    if(action==="report"){report();return}
    if(action==="bid"){showBid(id);return}
    if(action==="select-bid"){pay(`与${el.dataset.name}的配音合作`,Number(el.dataset.price),()=>{state.orderStatus="IN_PROGRESS";state.orderDetails={title:YS.demands[0].title,buyer:YS.demands[0].company,creator:el.dataset.name,amount:Number(el.dataset.price)};delete state.deliveryName;delete state.deliveryNote;saveState();success("合作已确认","演示订单已创建，双方可以在订单中沟通和交付。","order.html","查看订单")});return}
    if(action==="deliver"){
      modal("提交作品交付",`<form id="delivery-form"><label class="source-btn" for="delivery-file" style="cursor:pointer">${icon("Upload")}上传交付文件<span id="delivery-filename" class="tiny muted">音频或压缩包 · 最多 500 MB</span></label><input type="file" id="delivery-file" accept="audio/*,video/*,.zip" hidden><label class="field mt16"><span>交付说明</span><textarea name="note" required minlength="5" placeholder="描述本次交付内容及需要说明的地方。"></textarea></label><div class="error-message"></div><button class="btn primary wide" type="submit">提交交付版本</button></form>`);return;
    }
    if(action==="accept-order"){
      modal("确认作品验收",`<p class="detail-copy">确认交付内容符合双方约定后，订单将完成验收并进入收益结算。</p><p class="payment-note mt16">演示订单金额 ¥${orderInfo().amount.toFixed(2)} · 预计创作收益 ¥${orderInfo().net.toFixed(2)}</p><button class="btn primary wide mt24" data-action="confirm-accept">${icon("CheckCheck")}确认验收通过</button>`);return;
    }
    if(action==="confirm-accept"){state.orderStatus="COMPLETED";saveState();location.reload();return}
    if(action==="revision"||action==="dispute"){
      modal(action==="revision"?"提出具体修改":"申请订单售后",`<form id="${action==="revision"?"revision":"dispute"}-form"><label class="field"><span>${action==="revision"?"修改意见":"问题与诉求"}</span><textarea name="note" required minlength="5" maxlength="1000" placeholder="请结合原约定，描述需要处理的具体问题。"></textarea></label>${action==="dispute"?'<div class="payment-note mb16">提交后冻结未结算款项，客服将核对合同、沟通和交付记录。</div>':""}<button class="btn primary wide" type="submit">提交${action==="revision"?"修改意见":"售后申请"}</button></form>`);return;
    }
    if(action==="contract"){
      const o=orderInfo();
      modal("合作合同快照",`<p class="tiny muted">YS20261102018 · 合同 V1 · 2026.11.02</p><h3 class="mt16">${esc(o.title)}</h3><div class="settings-row"><span>需求方 / 配音员</span><span>${esc(o.buyer)} / ${esc(o.creator)}</span></div><div class="settings-row"><span>成交金额 / 佣金</span><span>¥${o.amount.toFixed(2)} / ${o.rate*100}%</span></div><div class="settings-row"><span>交付规格</span><span>WAV · 48kHz · 单声道</span></div><div class="settings-row"><span>交付时间</span><span>2026.11.05 18:00</span></div><p class="detail-copy mt16">使用权：中国大陆网络内容传播，一年非独占。验收：无明显底噪、爆音、口误和漏字，按确认台词完成。含 2 轮约定范围内修改。双方沟通与交付均留存在订单中。</p>`);return;
    }
    if(action==="purchase-course"){
      const c=YS.courses.find(c=>c.id===id)||findCourse();
      if(state.purchases.includes(c.id)){location.href=link("lesson",c.id);return}
      if(!c.price){state.purchases.push(c.id);saveState();location.href=link("lesson",c.id);return}
      pay(c.title,c.price,()=>{state.purchases.push(c.id);saveState();success("课程已开通","演示学习权益已保存，可以开始课程与作业练习。",link("lesson",c.id),"开始学习")});return;
    }
    if(action==="course-tab"){
      el.parentElement.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b===el));$("#course-chapters").hidden=value!=="chapters";$("#course-intro").hidden=value!=="intro";return;
    }
    if(action==="play-lesson"){
      const c=findCourse(),chapter=Number(qs.get("chapter")||0);
      if(c.price&&!state.purchases.includes(c.id)&&chapter>0){toast("请先开通课程");return}
      if(playing){stopAllAudio();el.innerHTML=`${icon("Play")}继续播放`;$("#lesson-status").textContent="已暂停";refreshIcons();return}
      speak("让声音进入故事");playing=true;el.innerHTML=`${icon("Pause")}暂停播放`;$("#lesson-status").textContent="课程音频示例播放中";refreshIcons();
      playTimer=setInterval(()=>{const p=$("#lesson-progress");if(!p)return;p.value=Math.min(Number(p.value)+1,900);state.lessonPosition=Number(p.value);saveState();$("#lesson-time").textContent=`${String(Math.floor(p.value/60)).padStart(2,"0")}:${String(p.value%60).padStart(2,"0")}`},1000);return;
    }
    if(action==="live-listen"){
      if(playing){stopAllAudio();el.innerHTML=`${icon("Headphones")}开始收听`;$("#chat-messages").insertAdjacentHTML("beforeend",'<div class="chat-line muted">你已暂停收听。</div>')}
      else{speak("今晚，让声音慢下来");playing=true;el.innerHTML=`${icon("Pause")}暂停收听`}
      refreshIcons();return;
    }
    if(action==="gift"){
      modal("送一份声音的心意",`<p class="small muted">赠送给 ${findRoom().author}</p><div class="gift-grid">${[["Mic","好话筒",1],["LampDesk","爆灯",6],["AudioLines","声波",30]].map(([i,n,p],idx)=>`<button class="gift-option ${idx===0?"selected":""}" data-action="select-gift" data-name="${n}" data-price="${p}">${icon(i)}<span>${n}</span><small>¥${p.toFixed(2)}</small></button>`).join("")}</div><button class="btn primary wide" data-action="gift-pay">赠送好话筒 · ¥1.00</button>`);return;
    }
    if(action==="select-gift"){
      $$(".gift-option").forEach(b=>b.classList.toggle("selected",b===el));$('[data-action="gift-pay"]').textContent=`赠送${el.dataset.name} · ¥${Number(el.dataset.price).toFixed(2)}`;return;
    }
    if(action==="gift-pay"){
      const g=$(".gift-option.selected"),name=g.dataset.name,price=Number(g.dataset.price);
      pay(`向${findRoom().author}赠送${name}`,price,()=>{state.gifts.push({name,price,room:findRoom().id});saveState();closeModal();$("#chat-messages").insertAdjacentHTML("beforeend",`<div class="chat-line"><b>南屿</b>送出了 ${name}<span class="coral-text"> × 1</span></div>`);toast(`演示礼物「${name}」已送达`)});return;
    }
    if(action==="mic-test"){
      modal("麦克风试音",`<p class="small muted">点击下方开始录音，5 秒后自动结束。浏览器需要获得麦克风授权。</p><div class="record-surface visible" id="record-surface"><h2 id="record-time">00:00</h2>${wave(40)}<button class="record-button" data-action="record" id="record-btn" aria-label="开始试音">${icon("Mic")}</button><p class="small muted" id="record-hint">准备好后开始录音</p><audio id="record-audio" controls hidden style="max-width:100%;margin-top:12px"></audio></div>`);
      overlayCleanup=()=>{finishRecording()};return;
    }
    if(action==="read-all"){state.notificationsRead=true;saveState();$$(".unread-dot,.notification-dot").forEach(d=>d.remove());toast("全部消息已标为已读");return}
    if(action==="withdraw"){
      modal("申请收益提现",`<form id="withdraw-form"><div class="payment-note">可提现 ¥${state.balance.toFixed(2)} · 已认证收款账户<br>此处仅生成演示申请，不发起真实付款。</div><label class="field mt16"><span>提现金额（元）</span><input type="number" min="10" max="${state.balance}" step=".01" name="amount" placeholder="最低 10 元" required></label><div class="error-message"></div><button class="btn primary wide" type="submit">确认提现申请</button></form>`);return;
    }
    if(action==="policy"){
      modal("隐私与使用约定",`<p class="detail-copy">这是一份本地交互原型。资料、投标、课程权益和作品发布记录保存在当前浏览器的本地存储中。录音仅在你授权后采集，不会上传到第三方服务。<br><br>所有支付、AI 合成、声播连线和资金状态均为演示，不构成真实交易。你可以在设置中清除本地数据。</p>`);return;
    }
    if(action==="reset-demo"){
      modal("重置演示数据",`<p class="detail-copy">将清除当前浏览器中的点赞、投标、课程、作品、作业与其他演示记录。</p><button class="btn primary wide mt24" data-action="confirm-reset">${icon("RotateCcw")}确认重置</button>`);return;
    }
    if(action==="confirm-reset"){localStorage.removeItem("yusheng-prototype-v1");location.href="index.html";return}
    if(action==="approve"){
      const row=el.closest("tr");row.querySelector(".badge").textContent="审核通过";row.querySelector(".badge").className="badge";row.querySelector("td:last-child").textContent="已处理";toast("审核结果已保存至本次演示");return;
    }
    if(action==="reject"){
      const row=el.closest("tr");modal("填写驳回原因",`<form id="reject-form"><label class="field"><span>修改建议</span><textarea required minlength="5" placeholder="说明需要调整的具体内容。"></textarea></label><button type="submit" class="btn primary wide">确认驳回</button></form>`);$("#reject-form").onsubmit=e=>{e.preventDefault();row.querySelector(".badge").textContent="已驳回";row.querySelector("td:last-child").textContent="等待用户修改";closeModal();toast("审核意见已记录")};return;
    }
    if(action==="review-homework"){
      modal("给练习一个具体回应",`<form id="review-form"><label class="field"><span>文字点评</span><textarea required minlength="20" placeholder="从吐字、节奏、情绪或音质给出具体建议。"></textarea></label><label class="field"><span>点评结果</span><select><option>建议修改</option><option>通过</option></select></label><button type="submit" class="btn primary wide">提交讲师点评</button></form>`);return;
    }
    if(action==="end-room"){
      modal("直播巡查处置",`<p class="small muted">${esc(el.dataset.name)}</p><form id="room-moderation-form"><label class="field mt16"><span>处理方式</span><select><option>发送规范提醒</option><option>强制下播</option><option>暂停主播开播权限</option></select></label><label class="field"><span>处理依据</span><textarea required minlength="5" placeholder="记录具体问题与处置依据。"></textarea></label><button class="btn primary wide" type="submit">记录处置结果</button></form>`);return;
    }
    if(action==="export-reconciliation"){
      const csv="\ufeff业务类型,实收,退款,状态\n配音订单,1500,0,已对账\n付费课程,995,199,已对账\n礼物,45,0,已对账\n";
      const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download="屿声映画_演示对账单.csv";a.click();setTimeout(()=>URL.revokeObjectURL(url),500);toast("演示对账单已导出");return;
    }
  });
  document.addEventListener("submit",event=>{
    const form=event.target;if(!form.id||form.id==="reject-form")return;
    event.preventDefault();const data=new FormData(form),val=n=>String(data.get(n)||"").trim();
    if(form.id==="global-search"){location.href=`community.html?q=${encodeURIComponent(val("q"))}`;return}
    if(form.id==="comment-form"){
      const text=val("comment");if(!text)return;state.comments.push({work:findWork().id,user:state.nickname||"南屿",avatar:"avatar3",text});saveState();$("#comments-list").innerHTML=commentsHTML(findWork().id);form.reset();refreshIcons();return;
    }
    if(form.id==="chat-form"){
      const text=val("text");if(!text)return;$("#chat-messages").insertAdjacentHTML("beforeend",`<div class="chat-line"><b>南屿</b>${esc(text)}</div>`);$("#chat-messages").scrollTop=$("#chat-messages").scrollHeight;form.reset();return;
    }
    if(form.id==="bid-form"){
      const file=$("#bid-file").files[0],old=state.bids.find(b=>b.demand===val("demand")),d=YS.demands.find(d=>d.id===val("demand"))||findDemand();
      if(!file&&!old){formError(form,"请上传一份干音试音");return}
      if(file&&file.size>20*1024*1024){formError(form,"试音文件不能超过 20 MB");return}
      if(file&&!file.type.startsWith("audio/")){formError(form,"请选择可播放的音频文件");return}
      const bid={demand:val("demand"),title:d.title,price:Number(val("price")),days:Number(val("days")),note:val("note"),file:file?.name||old.file};
      state.bids=state.bids.filter(b=>b.demand!==bid.demand);state.bids.push(bid);saveState();success("试音已提交","需求方可以试听你的干音，你可在个人中心查看投标记录。","profile.html","查看我的投标");return;
    }
    if(form.id==="demand-form"){
      if(val("delivery")<=val("deadline")){formError(form,"预计交付日期需要晚于投标截止日期");return}
      state.demands.unshift({id:`local-${Date.now()}`,title:val("title"),company:state.nickname||"南屿",category:val("category"),price:Number(val("price")),voices:[val("voice"),"普通话"],duration:`约 ${val("duration")} 秒`,deadline:`${val("deadline")} 截止`,bids:0,icon:"Clapperboard",color:"green",description:val("description"),reviewStatus:"PENDING"});saveState();success("需求已提交审核","演示需求已保存。生产环境会在审核通过后开放投标。","market.html","返回接单大厅");return;
    }
    if(form.id==="publish-form"){
      state.published.unshift({title:val("title"),description:val("description"),category:val("category"),tag:val("tag"),visibility:val("visibility"),status:"PENDING"});saveState();success("作品已提交审核","这一段声音已经保存。审核通过后，将按你的可见范围展示。","profile.html","查看我的作品");return;
    }
    if(form.id==="delivery-form"){
      if(!$("#delivery-file").files.length){formError(form,"请先上传交付文件");return}
      if($("#delivery-file").files[0].size>500*1024*1024){formError(form,"交付文件不能超过 500 MB");return}
      state.orderStatus="DELIVERED";state.deliveryName=$("#delivery-file").files[0].name;state.deliveryNote=val("note");saveState();success("交付已提交","交付版本 V1 已保存，需求方可以验收或提出修改意见。","order.html","查看订单");return;
    }
    if(form.id==="revision-form"||form.id==="dispute-form"){
      state.orderStatus=form.id==="revision-form"?"REVISING":"DISPUTED";saveState();success(form.id==="revision-form"?"修改意见已提交":"售后申请已提交",form.id==="revision-form"?"配音员会在订单中收到具体修改意见。":"未结算款项已冻结，客服会核对双方记录。","order.html","查看订单进度");return;
    }
    if(form.id==="order-message-form"){
      const text=val("message");state.orderMessages=[...(state.orderMessages||[]),text];saveState();
      $("#order-messages").insertAdjacentHTML("beforeend",`<div class="comment-row">${img("avatar3","avatar","南屿")}<div><span class="small">南屿</span><p>${esc(text)}</p><span class="tiny muted">刚刚</span></div></div>`);form.reset();refreshIcons();return;
    }
    if(form.id==="question-form"){
      $("#question-result").insertAdjacentHTML("beforeend",`<p class="small muted mt16">南屿：${esc(val("question"))}</p><span class="tiny muted">问题已发出，等待需求方回应</span>`);form.reset();return;
    }
    if(form.id==="homework-form"){
      const file=$("#homework-file").files[0];
      if(!file){formError(form,"请选择作业音频或视频");return}
      if(state.submissions.length>=3){formError(form,"这项作业已达到 3 次提交上限");return}
      if(!file.type.startsWith("audio/")&&!file.type.startsWith("video/")){formError(form,"请选择音频或视频文件");return}
      if(file.size>(file.type.startsWith("video/")?200:100)*1024*1024){formError(form,"文件超过提交大小限制");return}
      state.submissions.push({file:file.name,note:val("note")});saveState();success("作业已提交","林知声老师将收到这次练习，点评完成后会通知你。","homework.html","查看提交记录");return;
    }
    if(form.id==="broadcast-form"){
      state.broadcastTitle=val("title");saveState();modal("声播准备就绪",`<div class="success-content"><div class="success-icon">${icon("Radio")}</div><h3>${esc(val("title"))}</h3><p>直播间交互演示已就绪。此原型不推流，也不会将你的声音传给其他人。</p><a href="room.html?id=r3" class="btn primary">进入直播间${icon("ArrowRight")}</a></div>`);return;
    }
    if(form.id==="withdraw-form"){
      const amount=Math.round(Number(val("amount"))*100)/100;
      if(!Number.isFinite(amount)||amount<10||amount>state.balance){formError(form,"请填写可提现范围内的金额");return}
      state.balance=Math.round((state.balance-amount)*100)/100;state.withdrawn=amount;saveState();success("提现演示申请已记录","这是一笔本地演示记录，不会发生真实资金划转。","wallet.html","查看收益记录");return;
    }
    if(form.id==="settings-form"){
      state.nickname=val("nickname");state.bio=val("bio");saveState();toast("个人资料已保存");return;
    }
    if(form.id==="report-form"){success("举报已记录","演示工单已创建。实际产品会核对你提供的内容与证据。");return}
    if(form.id==="review-form"){success("点评已记录","本次演示点评已提交，实际产品将通知对应学员。");return}
    if(form.id==="room-moderation-form"){success("巡查记录已保存","处置意见已记录至本次演示。");return}
  });
  document.addEventListener("change",event=>{
    const input=event.target,file=input.files?.[0];
    const labels={"bid-file":"bid-filename","homework-file":"homework-filename","delivery-file":"delivery-filename"};
    if(labels[input.id]&&file){document.getElementById(labels[input.id]).textContent=file.name;return}
    if(input.id==="asset-input"&&file){
      if(!file.type.startsWith("audio/")&&!file.type.startsWith("video/")){toast("请选择音频或视频文件");return}
      if(file.size>(file.type.startsWith("video/")?200:50)*1024*1024){toast("文件超过上传大小限制");return}
      stopAllAudio();uploadedFile=file;$("#uploaded-name").textContent=`已选择：${file.name}`;$("#asset-label").textContent="已载入本地素材";
      const url=URL.createObjectURL(file);
      if(file.type.startsWith("video/")){
        setStudioMode("video");const holder=$(".preview-image");holder.querySelector("img,video")?.remove();const video=document.createElement("video");video.src=url;video.playsInline=true;video.style.cssText="position:absolute;inset:0;width:100%;height:100%;object-fit:contain";holder.prepend(video);mediaObject=video;
      }else mediaObject=new Audio(url);
      toast("素材已载入本机预览");return;
    }
    if(input.id==="reverb")toast(`混响预设：${input.value}`);
  });
  document.addEventListener("input",event=>{
    const el=event.target;
    if(el.dataset.search){searchTerm=el.value;applyFilter()}
    if(el.id==="voice-volume"){$("#volume-value").textContent=`${el.value}%`;narration.volume=el.value/100;if(mediaObject)mediaObject.volume=el.value/100}
    if(el.id==="audio-offset")$("#offset-value").textContent=`${el.value>0?"+":""}${el.value} ms`;
    if(el.dataset.action==="seek"){playPosition=Number(el.value);$("#preview-time").textContent=`00:${String(playPosition).padStart(2,"0")}`;const media=mediaObject||narration;if(Number.isFinite(media.duration))media.currentTime=Math.min(playPosition,media.duration)}
    if(el.id==="lesson-progress"){state.lessonPosition=Number(el.value);saveState();$("#lesson-time").textContent=`${String(Math.floor(el.value/60)).padStart(2,"0")}:${String(el.value%60).padStart(2,"0")}`}
    if(el.id==="playback-rate")narration.playbackRate=Number(el.value);
  });
  document.addEventListener("keydown",event=>{
    if(event.key==="Escape"){closeModal();return}
    if(event.key==="Tab"&&$(".modal")){
      const focusable=Array.from($(".modal").querySelectorAll('a[href],button:not([disabled]),input:not([type="hidden"]):not([type="file"]),textarea,select'));
      if(!focusable.length)return;
      if(event.shiftKey&&document.activeElement===focusable[0]){event.preventDefault();focusable.at(-1).focus()}
      else if(!event.shiftKey&&document.activeElement===focusable.at(-1)){event.preventDefault();focusable[0].focus()}
    }
  });
  window.addEventListener("pagehide",()=>{finishRecording();stopAllAudio()});
  if(page==="academy"&&qs.get("view")==="mine"){activeFilter="我的课程";applyFilter()}
  if(page==="community"&&qs.get("q")){searchTerm=qs.get("q");$('[data-search="works"]').value=searchTerm;applyFilter()}
  if(page==="studio"&&state.draftEffects){const e=state.draftEffects;$("#denoise").checked=e.denoise;$("#reverb").value=e.reverb;$("#voice-volume").value=e.volume;$("#volume-value").textContent=`${e.volume}%`;$("#audio-offset").value=e.offset;$("#offset-value").textContent=`${e.offset} ms`}
  refreshIcons();
})();
