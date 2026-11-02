window.pages = {};

function pageHeader(eyebrow, title, subtitle = "", action = "") {
  return `<div class="page-header"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1>${subtitle ? `<p>${subtitle}</p>` : ""}</div>${action}</div>`;
}
function sectionHead(title, target, text = "查看全部", count = "") {
  return `<div class="section-head"><h2>${title}${count ? `<span class="count">${count}</span>` : ""}</h2>${target ? `<a class="text-link" href="${target}">${text}${icon("ArrowUpRight")}</a>` : ""}</div>`;
}
function workCard(w) {
  return `<article class="work-card" data-category="${w.category}" data-title="${esc(w.title)}"><a href="${link("work", w.id)}" class="work-cover">${img(w.cover, "", w.title)}<span class="cover-label badge light">${w.ai ? "AI 声演" : w.category}</span><span class="cover-play">${icon("Play")} ${w.likes > 300 ? "1.2k" : "826"}</span><span class="cover-time">${w.duration}</span></a><h3><a href="${link("work", w.id)}">${esc(w.title)}</a></h3><div class="work-author"><a href="creator.html">${img(w.avatar, "avatar", w.author)}</a><a href="creator.html">${w.author}</a><span class="likes">${icon("Heart")}${w.likes + (state.likes.includes(w.id) ? 1 : 0)}</span></div></article>`;
}
function demandCard(d) {
  return `<a class="demand-card" href="${link("demand", d.id)}" style="display:block" data-category="${d.category}" data-title="${esc(d.title)}"><div class="row between"><div class="row"><span class="demand-icon ${d.color}">${icon(d.icon)}</span><div><h3>${esc(d.title)}</h3><div class="company">${esc(d.company)} <span class="badge neutral">${d.category}</span></div></div></div><div class="price"><small>¥</small>${d.price}</div></div><div class="chips mt16">${d.voices.map(t => `<span class="tag">${t}</span>`).join("")}</div><div class="demand-meta"><span>${icon("Clock3")}${d.duration}</span><span>${icon("CalendarDays")}${d.deadline}</span><span style="margin-left:auto">${d.bids} 人试音 ${icon("ChevronRight")}</span></div></a>`;
}
function courseCard(c) {
  return `<article class="course-card" data-category="${c.price === 0 ? "免费课程" : "付费课程"}" data-title="${c.title}"><a class="course-cover" href="${link("course", c.id)}">${img(c.cover, "", c.title)}<span class="badge light">${c.level}</span><strong>${c.tag}</strong></a><h3><a href="${link("course", c.id)}">${c.title}</a></h3><p>${c.lessons} 节课程 · ${c.length}</p><div class="course-info"><span class="row gap6">${img(c.avatar, "avatar sm", c.teacher)}${c.teacher}</span><span class="${c.price ? "price" : "accent"}" style="font-size:${c.price ? 20 : 13}px">${c.price ? `<small>¥</small>${c.price}` : "免费学习"}</span></div></article>`;
}
function roomCard(r) {
  return `<article data-category="${r.category}" data-title="${r.title}"><a class="room-cover" href="${link("room", r.id)}" style="display:block">${img(r.cover, "", r.title)}<span class="live-badge badge live">${icon("AudioLines")}直播中</span><div class="room-caption"><h3>${r.title}</h3><p>${r.subtitle}</p></div></a><div class="row between mt16 small"><a href="creator.html" class="row gap8">${img(r.avatar, "avatar sm", r.author)}${r.author}</a><span class="row gap6 muted">${icon("Headphones")}${r.listeners} 人在听</span></div></article>`;
}
function tabs(items, group = "category", selected = items[0]) {
  return `<div class="tabs" role="tablist">${items.map(t => `<button class="tab ${t === selected ? "active" : ""}" role="tab" aria-selected="${t === selected}" data-action="filter" data-group="${group}" data-value="${t}">${t}</button>`).join("")}</div>`;
}
function empty(text, href = "studio.html", label = "开始创作") {
  return `<div class="empty">${icon("AudioLines")}<h3>${text}</h3><p class="mt8">新的故事，等待你的声音。</p><a class="btn soft sm mt16" href="${href}">${label}${icon("ArrowRight")}</a></div>`;
}
function voiceGrid() {
  return `<div class="voice-grid">${YS.voices.map(v => `<div class="voice ${state.voice === v.id ? "selected" : ""}" data-voice="${v.id}"><button class="row gap8 wide" style="text-align:left;padding:0" data-action="voice" data-id="${v.id}" aria-label="选择${v.name}"><span class="voice-avatar ${v.color}">${v.initial}</span><span><strong>${v.name}</strong><small>${v.type}</small></span></button>${state.voice === v.id ? icon("CircleCheck", "selected-check") : ""}<button class="icon-btn sample-btn" title="试听${v.name}" aria-label="试听${v.name}" data-action="sample" data-id="${v.id}">${icon("Volume2")}</button></div>`).join("")}</div>`;
}
pages.index = () => `
${pageHeader("声音日常 / DAILY INSPIRATION", "下午好，南屿", "让每一个好声音，找到属于自己的故事。", `<div class="date-desktop small muted row gap8">${icon("CalendarDays")}11 月 02 日 · 星期一</div>`)}
<div class="home-layout">
  <div>
    <a class="feature" style="display:block" href="activity.html">
      ${img("studio", "", "录音棚内的专业话筒与声音设备")}
      <div class="feature-copy"><div class="kicker">${icon("AudioLines")}本周声音企划 · VOL.01</div><h2>一人分饰两角<br>好戏，听你的</h2><p>换一种声音，走进另一个角色。</p><span class="btn">参与声音挑战${icon("ArrowRight")}</span></div>
      <span class="feature-number">01 — 03</span>
    </a>
    <div class="shortcut-grid">
      <a class="shortcut green" href="studio.html"><span class="tile-icon">${icon("WandSparkles")}</span><span><b>AI 声音创作</b><small>换声 · 配音</small></span></a>
      <a class="shortcut coral" href="market.html"><span class="tile-icon">${icon("BriefcaseBusiness")}</span><span><b>配音接单</b><small>发现好机会</small></span></a>
      <a class="shortcut blue" href="academy.html"><span class="tile-icon">${icon("BookOpen")}</span><span><b>声音学院</b><small>练好每一句</small></span></a>
      <a class="shortcut yellow" href="live.html"><span class="tile-icon">${icon("Radio")}</span><span><b>声播现场</b><small>此刻有人在听</small></span></a>
    </div>
    ${sectionHead("值得被听见", "community.html", "发现更多", "编辑精选")}
    <div class="work-grid">${YS.works.slice(0,3).map(workCard).join("")}</div>
    <div class="home-bottom">${sectionHead("在声音里，慢慢成长", "academy.html", "去学院")}<div class="mini-course">${img("mic", "", "录音话筒")}<div><span class="badge neutral">免费入门课</span><h3 class="mt8">录好第一条干音</h3><p class="small">周予安 · 6 节课 · 零基础</p><a class="text-link accent mt8" href="course.html?id=c2">开始学习${icon("ArrowRight")}</a></div></div></div>
  </div>
  <aside class="rail">
    <section>${sectionHead("继续创作", "studio.html", "草稿箱")}<div class="draft-preview"><div class="row">${img("ocean", "thumb", "海边配音草稿")}<div><h3>${esc(state.draftTitle || "听，海风有话说")}</h3><span class="small">今天 14:20 保存 · 00:15</span></div></div>${wave(45)}<a href="studio.html" class="btn soft wide sm">继续编辑${icon("ArrowUpRight")}</a></div><div class="quota">${icon("Sparkles")}今日 AI 免费额度<span class="accent">${state.quota} / 3 次</span></div></section>
    <section class="rail-section">${sectionHead("适合你的悬赏", "market.html", "更多")}${YS.demands.slice(0,2).map(d => `<a class="rail-demand" href="${link("demand",d.id)}"><h3>${d.title}</h3><div class="row between"><span class="price"><small>¥</small>${d.price}</span><span class="small muted">${d.bids} 人试音 · ${d.deadline}</span></div></a>`).join("")}</section>
    <section class="rail-section">${sectionHead("此刻，有人在听", "live.html", "去听听")}<a class="mentor-strip" href="room.html?id=r1">${img("avatar4","avatar","鹿与晚风")}<div><h3>今晚，让声音慢下来</h3><p class="row gap6">${icon("AudioLines")}鹿与晚风 · 128 人在听</p></div></a></section>
  </aside>
</div>`;

pages.community = () => `
${pageHeader("声音社区 / COMMUNITY", "每一种声音，都值得被听见", "在这里，遇见作品，也遇见同频的人。", `<a href="studio.html" class="btn primary">${icon("Plus")}发布作品</a>`)}
${tabs(["全部","短剧","漫剧","广播剧"])}
<div class="filter-bar"><div class="chips"><button class="chip active" data-action="sort" data-value="recommended">编辑推荐</button><button class="chip" data-action="sort" data-value="latest">最新发布</button><a href="activity.html" class="chip"># 一人分饰两角</a></div><label class="search-field">${icon("Search")}<input type="search" placeholder="搜索作品或创作者" data-search="works" aria-label="搜索作品"></label></div>
<div class="work-grid community-grid" id="works-list">${YS.works.map(workCard).join("")}</div>`;

pages.studio = () => `
${pageHeader("声音工作台 / STUDIO", "声音工作台", "", `<button class="btn secondary" data-action="save-draft">${icon("Save")}保存草稿</button>`)}
<div class="studio-layout">
  <div>
    <div class="editor-toolbar"><button class="btn soft active" data-action="studio-mode" data-value="video">${icon("WandSparkles")}AI 视频换声</button><button class="btn secondary" data-action="studio-mode" data-value="text">${icon("Type")}文字配音</button><button class="btn secondary" data-action="studio-mode" data-value="record">${icon("Mic")}录音配音</button></div>
    <div id="studio-video">
      <div class="studio-preview"><div class="preview-image">${img("ocean","","海边短片预览")}<span class="watermark">屿声映画 · AI 合成</span><button class="center-play" data-action="play" title="播放片段" aria-label="播放片段">${icon("Play")}</button><p class="preview-subtitle">「风从海上来，故事从这里开始。」</p></div><div class="player-controls"><button class="icon-btn" data-action="play" aria-label="播放或暂停">${icon("Play")}</button><span id="preview-time">00:00</span><input type="range" min="0" max="15" value="0" aria-label="片段播放进度" data-action="seek"><span>00:15</span><button class="icon-btn" data-action="mute" aria-label="静音">${icon("Volume2")}</button></div></div>
      <div class="timeline"><div class="timeline-ruler"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span></div><div class="timeline-track"><span class="label">${icon("AudioLines")} 原始音轨</span>${wave(55)}</div></div>
    </div>
    <div id="studio-text" hidden><label class="field"><span>配音文案</span><textarea id="tts-text" maxlength="300" rows="7">风从海上来，故事从这里开始。把想说的话，慢慢说给世界听。</textarea><span class="hint">最多 300 字</span></label></div>
    <div class="record-surface" id="record-surface"><p class="small muted">录音素材</p><h2 id="record-time" class="mt8">00:00</h2>${wave(45)}<button class="record-button" data-action="record" id="record-btn" aria-label="开始录音">${icon("Mic")}</button><p class="small muted" id="record-hint">准备好后，录下你的声音</p><audio id="record-audio" controls hidden style="max-width:100%;margin-top:12px"></audio></div>
    <div class="section-head mt24"><h2 style="font-size:14px">选择素材</h2><span class="small muted" id="asset-label">已载入：海边独白 · 15 秒</span></div>
    <div class="source-buttons"><button class="source-btn" data-action="upload" data-kind="video">${icon("Film")}上传视频</button><button class="source-btn" data-action="upload" data-kind="audio">${icon("FileAudio")}上传音频</button><button class="source-btn" data-action="studio-mode" data-value="record">${icon("Mic")}录制声音</button></div><input type="file" id="asset-input" accept="audio/*,video/*" hidden><div class="upload-name" id="uploaded-name"></div>
    <div class="section-head mt24"><h2 style="font-size:14px">基础音效</h2><button class="text-link" data-action="reset-effects">恢复默认${icon("RotateCcw")}</button></div>
    <div class="settings-row"><span>智能降噪</span><label class="switch"><input type="checkbox" id="denoise" checked aria-label="智能降噪"><span class="track"></span></label></div>
    <div class="settings-row"><span>空间混响</span><select class="select" id="reverb" aria-label="空间混响"><option>录音室</option><option>关闭</option><option>小厅堂</option></select></div>
    <div class="settings-row"><span>配音音量</span><input type="range" value="85" min="0" max="100" style="width:150px" aria-label="配音音量" id="voice-volume"><span class="small muted" id="volume-value">85%</span></div>
    <div class="settings-row"><span>声音偏移</span><input type="range" min="-2000" max="2000" step="20" value="0" style="width:150px" aria-label="声音偏移" id="audio-offset"><span class="small muted" id="offset-value">0 ms</span></div>
  </div>
  <aside>
    <div class="section-head"><h2 style="font-size:15px">选择一个声音</h2><span class="badge neutral">${icon("ShieldCheck")}授权音色</span></div>
    <div class="chips mb16" id="voice-filters">${["全部","男声","女声","少年"].map((t,i)=>`<button class="chip ${i===0?"active":""}" data-action="voice-filter" data-value="${t}">${t}</button>`).join("")}</div>
    <div id="voice-list">${voiceGrid()}</div>
    <div class="section-band"><div class="row between small"><span class="muted">当前音色</span><strong id="selected-voice">${YS.voices.find(v=>v.id===state.voice)?.name||"青川"} · 授权角色音</strong></div><div class="row between mt16 small"><span class="muted">本次消耗</span><span>1 次免费额度</span></div><div class="row between mt8 small"><span class="muted">今日剩余</span><span class="accent">${state.quota} 次</span></div></div>
    <button class="btn primary wide mt24" data-action="generate">${icon("Sparkles")}生成声音</button>
    <a href="publish.html" class="btn secondary wide mt8">${icon("ArrowUpRight")}使用原声并发布</a>
    <p class="tiny muted mt16" style="line-height:1.9">音色用于角色演绎。生成作品保留 AI 合成标识。</p>
  </aside>
</div>`;

pages.work = () => {
  const w = findWork(), liked = state.likes.includes(w.id);
  return `<a href="community.html" class="back-link">${icon("ArrowLeft")}返回声音社区</a><div class="two-col"><div><div class="work-detail-media">${img(w.cover,"",w.title)}<span class="cover-label badge light">${w.ai ? "AI 合成" : w.category}</span><button class="center-play" data-action="play" aria-label="播放作品">${icon("Play")}</button><p class="caption">${w.subtitle}</p></div><div class="work-actions"><button class="action-link ${liked?"liked":""}" data-action="like" data-id="${w.id}">${icon("Heart")}<span>${w.likes + (liked?1:0)}</span></button><a href="#comments" class="action-link">${icon("MessageCircle")}评论</a><button class="action-link" data-action="share">${icon("Share2")}分享</button><button class="action-link" style="margin-left:auto" data-action="report">${icon("Flag")}举报</button></div><h1 class="detail-title">${w.title}</h1><p class="small muted">#${w.tag}　#${w.category}</p><div id="comments" class="mt32">${sectionHead("声音的回响", "", "", "")}<form id="comment-form" class="chat-input"><input name="comment" maxlength="300" placeholder="把想说的话，留在这里" aria-label="评论内容" required><button class="btn primary sm" type="submit">发送</button></form><div id="comments-list">${commentsHTML(w.id)}</div></div></div><aside><a href="creator.html" class="row section-band">${img(w.avatar,"avatar lg",w.author)}<div><h3>${w.author}</h3><p class="small muted">用声音收藏生活</p><span class="badge mt8">声音创作者</span></div></a><div class="mt24">${sectionHead("也许你还想听", "community.html", "更多")}<div class="stack">${YS.works.filter(x=>x.id!==w.id).slice(0,2).map(x=>`<a class="mini-course" href="${link("work",x.id)}">${img(x.cover,"",x.title)}<div><h3>${x.title}</h3><p class="small muted">${x.author}</p><span class="badge neutral mt8">${x.duration}</span></div></a>`).join("")}</div></div></aside></div>`;
};
function commentsHTML(id) {
  const items = [{ user:"林间来客", text:"最后一句的停顿好动人，仿佛真的听见了海风。", avatar:"avatar2" },{user:"知夏",text:"温柔的声音，很适合今晚听。",avatar:"avatar1"}, ...state.comments.filter(c=>c.work===id)];
  return items.map(c=>`<div class="comment-row">${img(c.avatar||"avatar3","avatar",c.user)}<div><span class="small">${esc(c.user)}</span><p>${esc(c.text)}</p><span class="tiny muted">刚刚 · 来自声音社区</span></div></div>`).join("");
}
pages.profile = () => `
${pageHeader("我的声音 / MY SPACE","个人中心","",`<a class="btn secondary" href="settings.html">${icon("Settings2")}个人设置</a>`)}
<div class="profile-top">${img("avatar3","avatar xl","南屿")}<div><div class="row"><h1>${esc(state.nickname||"南屿")}</h1><span class="badge">${icon("BadgeCheck")}已认证配音员</span></div><p class="small muted mt8">${esc(state.bio||"声音里有山海，也有生活。")}</p><div class="profile-stats"><span><strong>${12+state.published.length}</strong><small>发布作品</small></span><span><strong>326</strong><small>收到喜欢</small></span><span><strong>18</strong><small>完成订单</small></span></div></div></div>
<div class="profile-summary"><a href="order.html" class="summary-item">${icon("BriefcaseBusiness")}<span><strong>${state.orderStatus==="COMPLETED"?"0":"1"}</strong><small>进行中订单</small></span></a><a href="academy.html?view=mine" class="summary-item">${icon("BookOpen")}<span><strong>${2+state.purchases.length}</strong><small>我的课程</small></span></a><a href="homework.html" class="summary-item">${icon("FileAudio")}<span><strong>${state.submissions.length||1}</strong><small>我的作业</small></span></a><a href="wallet.html" class="summary-item">${icon("Wallet")}<span><strong>¥${state.balance.toFixed(2)}</strong><small>可提现收益</small></span></a></div>
<div class="two-col"><div>${sectionHead("我的作品", "studio.html","创作新作品")}<div class="work-grid">${state.published.map(p=>`<article class="work-card"><div class="work-cover">${img("ocean","",p.title)}<span class="cover-label badge coral">审核中</span><span class="cover-time">00:15</span></div><h3>${esc(p.title)}</h3><p class="tiny muted">刚刚提交 · 审核后公开</p></article>`).join("")}${YS.works.filter(w=>w.author==="南屿"||w.id==="wave").map(workCard).join("")}</div><div class="mt32">${sectionHead("我的投标", "market.html","寻找新机会")}${state.bids.length?state.bids.map(b=>`<a class="list-row" href="demand.html?id=${b.demand}"><span>${esc(b.title)}<small class="muted" style="display:block">报价 ¥${b.price} · ${b.days} 天交付</small></span><span class="badge">已投标</span></a>`).join(""):empty("还没有提交试音","market.html","发现悬赏")}</div></div><aside><h2 style="font-size:16px">创作者服务</h2>${[["Radio","我的声播","broadcast"],["FileCheck2","需求方工作台","bids"],["MessageSquareText","消息中心","messages"],["ShieldCheck","认证与账号","settings"],["LayoutDashboard","运营工作台","admin"]].map(([i,t,p])=>`<a href="${p}.html" class="list-row"><span class="row">${icon(i)}${t}</span>${icon("ChevronRight")}</a>`).join("")}</aside></div>`;

pages.messages = () => `
${pageHeader("消息中心 / INBOX","声音有回应","",`<button class="btn secondary" data-action="read-all">${icon("CheckCheck")}全部已读</button>`)}
${tabs(["全部","订单","作品","学习","资金"],"messages")}
<div id="messages-list">${[
  ["订单","BriefcaseBusiness","你的配音订单等待交付","《城市品牌片 · 沉稳旁白》将于 11 月 5 日交付。","order","14:30"],
  ["学习","BookOpen","林知声老师点评了你的作业","「气息很稳，试着在第二句前留出一点停顿。」","homework","12:08"],
  ["作品","Heart","你的作品收到新的喜欢","听海的阿眠喜欢了《第一次配音，就爱上了开口》。","work?id=mic","10:26"],
  ["资金","Wallet","订单收益已结算","一笔配音订单已完成，¥255.00 已进入可提现收益。","wallet","昨天"],
].map(([cat,i,t,desc,p,time])=>`<a href="${p.includes("?")?p.replace("?id=",".html?id="):p+".html"}" class="message-row" data-category="${cat}"><span class="message-icon">${icon(i)}</span><div style="flex:1"><div class="row between"><h3>${t}</h3><span class="tiny muted">${time}</span></div><p>${desc}</p></div>${!state.notificationsRead?'<span class="dot coral-text unread-dot"></span>':""}</a>`).join("")}</div>`;

pages.wallet = () => `
${pageHeader("创作收益 / EARNINGS","每一份认真，都有回响","",`<button class="btn primary" data-action="withdraw">${icon("ArrowUpRight")}申请提现</button>`)}
<div class="wallet-summary"><div><span class="small muted">可提现收益</span><div class="money-display">¥${state.balance.toFixed(2)}</div><span class="badge">${icon("ShieldCheck")}已完成收款认证</span></div><div><span class="small muted">待结算收益</span><div class="money-display" style="font-size:27px">¥425.00</div><span class="tiny muted">订单验收后进入结算</span></div><div><span class="small muted">累计创作收益</span><div class="money-display" style="font-size:27px">¥3,860.00</div><span class="tiny muted">订单及声播收益</span></div></div>
${tabs(["全部明细","配音订单","声播礼物","提现"],"earnings")}
<div id="earnings-list">${[
["配音订单","治愈系短剧配音 · 结算","11 月 01 日 · 订单 YS20261101008","+ ¥255.00","已结算"],
["声播礼物","夜读声播 · 礼物分成","10 月 30 日 · 场次 YS-LIVE-018","+ ¥86.00","已结算"],
["提现","收益提现","10 月 28 日 · 原收款账户","- ¥500.00","已到账"],
["配音订单","城市纪录片旁白 · 结算","10 月 26 日 · 订单 YS20261026012","+ ¥640.00","已结算"],
].map(([c,t,d,m,s])=>`<div class="list-row" data-category="${c}"><div><h3 style="font-size:13px">${t}</h3><p class="tiny muted">${d}</p></div><div style="text-align:right"><strong style="font-size:16px;font-weight:500" class="${m.startsWith("+")?"accent":""}">${m}</strong><p class="tiny muted">${s}</p></div></div>`).join("")}${state.withdrawn?`<div class="list-row" data-category="提现"><div><h3 style="font-size:13px">收益提现</h3><p class="tiny muted">刚刚申请 · 演示记录</p></div><div><strong>- ¥${state.withdrawn.toFixed(2)}</strong><p class="tiny muted">审核中</p></div></div>`:""}</div>`;

pages.settings = () => `
${pageHeader("账户设置 / SETTINGS","留一点声音，给自己")}
<div style="max-width:650px"><form id="settings-form"><label class="field"><span>昵称</span><input name="nickname" value="${esc(state.nickname||"南屿")}" minlength="2" maxlength="20" required></label><label class="field"><span>个人简介</span><textarea name="bio" maxlength="200">${esc(state.bio||"声音里有山海，也有生活。")}</textarea></label><button class="btn primary" type="submit">${icon("Check")}保存资料</button><div class="error-message"></div></form><div class="mt32"><div class="list-row"><span>接单与收款认证</span><span class="badge">${icon("ShieldCheck")}已认证</span></div><div class="list-row"><span>消息提醒</span><label class="switch"><input type="checkbox" checked aria-label="消息提醒"><span class="track"></span></label></div><div class="list-row"><span>自动播放作品</span><label class="switch"><input type="checkbox" aria-label="自动播放作品"><span class="track"></span></label></div><button class="list-row wide" data-action="policy"><span>隐私政策与用户协议</span>${icon("ChevronRight")}</button><button class="list-row wide" data-action="reset-demo"><span>重置本地演示数据</span>${icon("RotateCcw")}</button></div></div>`;

pages.creator = () => `
<a class="back-link" href="community.html">${icon("ArrowLeft")}返回社区</a><div class="profile-top">${img("avatar1","avatar xl","听海的阿眠")}<div><div class="row"><h1>听海的阿眠</h1><span class="badge">声音创作者</span></div><p class="small muted mt8">用声音，收藏所有平凡而温柔的瞬间。</p><div class="profile-stats"><span><strong>28</strong><small>公开作品</small></span><span><strong>1,286</strong><small>收到喜欢</small></span><span><strong>16</strong><small>完成订单</small></span></div></div></div><div class="section-head mt32"><h2>她的声音作品</h2><span class="small muted">广播剧 / 治愈独白</span></div><div class="work-grid community-grid">${[YS.works[0],YS.works[4],YS.works[5]].map(workCard).join("")}</div>`;

pages.activity = () => `
<a class="back-link" href="index.html">${icon("ArrowLeft")}返回首页</a><div class="feature" style="height:280px">${img("studio","","录音棚中的话筒")}<div class="feature-copy"><div class="kicker">声音企划 · 11.02 — 11.16</div><h2>一人分饰两角<br>好戏，听你的</h2><p>同一段台词，两种角色，一次声音的相遇。</p><a href="studio.html?activity=two-roles" class="btn">参与声音挑战${icon("ArrowRight")}</a></div></div><div class="two-col mt32"><div>${sectionHead("用声音，接住这场戏", "")}<p class="detail-copy">选择一段 5—15 秒的原创台词，分别演绎两个角色。可以用自己的声音，也可以搭配授权角色音色。发布时带上「一人分饰两角」标签，让我们听见你的新故事。</p><div class="quote mt24">「如果明天就要分别，你还会来见我吗？」<br>「会。无论多远，我都会来。」</div><h2 class="mt32 mb16" style="font-size:17px">已经开场的好声音</h2><div class="work-grid">${YS.works.slice(1,4).map(workCard).join("")}</div></div><aside class="panel" style="align-self:start"><h3>活动约定</h3><p class="small muted mt16">使用原创或已获授权的素材。AI 创作作品保留合成标识。通过审核后，作品将进入活动页面。</p><a href="studio.html?activity=two-roles" class="btn primary wide mt24">${icon("Mic")}我的角色，即将开场</a></aside></div>`;
