/**
 * Election Process Assistant
 * Powered by Google Gemini API
 */

// ── Election timeline data ────────────────────────────────────────────────────
const ELECTION_TIMELINE = [
  {
    phase: "Pre-Election",
    label: "Announcement & Filing",
    desc: "Candidates officially declare and file paperwork",
    status: "done",
    detail:
      "Candidates announce their candidacy, meet eligibility requirements, and file official paperwork with election authorities. Campaign finance rules apply from this point.",
  },
  {
    phase: "Pre-Election",
    label: "Voter Registration",
    desc: "Citizens register to vote (deadlines vary by state)",
    status: "done",
    detail:
      "Eligible citizens must register to vote before the registration deadline (typically 15–30 days before an election). Many states also allow same-day registration.",
  },
  {
    phase: "Primary Season",
    label: "Primary Elections",
    desc: "Parties choose their nominees through primaries/caucuses",
    status: "current",
    detail:
      "Each major party holds primary elections or caucuses in every state to select their presidential (or other office) nominee. Delegates are awarded proportionally or winner-take-all depending on state rules.",
  },
  {
    phase: "Conventions",
    label: "Party Conventions",
    desc: "Delegates officially nominate candidates",
    status: "upcoming",
    detail:
      "Delegates gather at national party conventions to officially nominate presidential and vice-presidential candidates and ratify the party platform.",
  },
  {
    phase: "Campaign",
    label: "General Campaign",
    desc: "Nominees campaign nationwide for votes",
    status: "upcoming",
    detail:
      "Nominated candidates campaign across the country, participate in presidential debates, hold rallies, run advertisements, and make their case to voters.",
  },
  {
    phase: "Election Day",
    label: "Election Day Voting",
    desc: "Citizens cast their ballots",
    status: "upcoming",
    detail:
      "On the first Tuesday after the first Monday in November, polling places open. Voters cast ballots in person or via mail-in/absentee ballots previously submitted.",
  },
  {
    phase: "Post-Election",
    label: "Vote Counting & Certification",
    desc: "Ballots are tallied and results certified",
    status: "upcoming",
    detail:
      "Election officials count all ballots (including mail-in), certify results at the county and state level, and publish official tallies. Recounts may be triggered if margins are narrow.",
  },
  {
    phase: "Electoral College",
    label: "Electoral College Vote",
    desc: "Electors cast formal votes for President",
    status: "upcoming",
    detail:
      "In December, each state's appointed electors meet to cast their official Electoral College votes. A candidate needs 270 of 538 electoral votes to win the presidency.",
  },
  {
    phase: "Certification",
    label: "Congress Certifies Results",
    desc: "Joint session of Congress counts electoral votes",
    status: "upcoming",
    detail:
      "On January 6th, a joint session of Congress meets to count and certify the Electoral College results, officially confirming the election winner.",
  },
  {
    phase: "Inauguration",
    label: "Inauguration Day",
    desc: "Winner is sworn into office on January 20th",
    status: "upcoming",
    detail:
      "On January 20th, the President-elect takes the oath of office and is inaugurated as President of the United States, completing the election cycle.",
  },
];

// ── Built-in election knowledge base (used in demo mode) ─────────────────────
const ELECTION_KNOWLEDGE = {
  overview: `The U.S. election process follows these major stages:

**1. Candidate Filing & Announcement**
Candidates formally declare their candidacy, meet eligibility requirements (age, citizenship, residency), and register with election authorities.

**2. Voter Registration**
Citizens must register to vote, usually 15–30 days before an election. Requirements vary by state; some allow same-day registration.

**3. Primary Elections & Caucuses**
Each party holds primaries or caucuses to choose their nominee. States award delegates proportionally or winner-take-all. The candidate who wins a majority of delegates secures the nomination.

**4. Party Conventions**
Delegates officially nominate presidential and vice-presidential candidates and adopt the party platform.

**5. General Election Campaign**
Nominees campaign nationwide, participate in debates, run ads, and seek voter support.

**6. Election Day**
On the first Tuesday after the first Monday in November, voters cast ballots in person or by mail/absentee.

**7. Vote Counting & Certification**
Election officials count ballots, certify results at county and state levels, and publish official tallies. Recounts can occur for close races.

**8. Electoral College Vote (Presidential)**
In December, each state's electors cast Electoral College votes. 270 of 538 votes are needed to win the presidency.

**9. Congressional Certification**
On January 6th, Congress meets in joint session to certify Electoral College results.

**10. Inauguration**
On January 20th, the President-elect takes the oath of office.`,

  registration: `**Voter Registration Guide**

To register to vote in the United States:

• **Eligibility**: U.S. citizen, at least 18 years old on or before Election Day, meet your state's residency requirements.

• **How to Register**:
  - Online at vote.gov or your state's election website
  - By mail using the National Voter Registration Form
  - In person at your local election office, DMV, or other government agencies

• **Deadlines**: Most states require registration 15–30 days before Election Day. About 20 states plus DC offer same-day registration. North Dakota has no registration requirement.

• **What You'll Need**: Name, address, date of birth, and ID number (SSN or state ID).

• **Check Your Registration**: Verify your registration status at vote.gov or your state's election website.`,

  electoral_college: `**The Electoral College Explained**

The Electoral College is the system used to elect the U.S. President and Vice President.

**How It Works**:
1. Each state gets a number of electors equal to its total Congressional representation (House seats + 2 Senate seats).
2. Washington D.C. gets 3 electors (23rd Amendment).
3. Total: **538 electors**. A candidate needs **270 to win**.

**Winner-Take-All (Most States)**:
In 48 states and D.C., the candidate who wins the popular vote in that state receives ALL of its electoral votes.

**Proportional Allocation**:
Maine and Nebraska allocate electoral votes by congressional district.

**The Process**:
- Election Day: Voters cast ballots for a "ticket" (President + Vice President).
- Mid-November: Each state certifies its results and determines which electors will vote.
- Mid-December: Electors meet in their state capitals to cast official votes.
- January 6: Congress counts and certifies electoral votes.
- If no candidate reaches 270, the House elects the President (contingent election).`,

  primary: `**Primary Elections & Caucuses**

**Primary Elections**:
A primary is a preliminary election where voters choose their party's candidate for the general election.

- **Closed Primary**: Only registered party members can vote.
- **Open Primary**: Any registered voter can participate regardless of party.
- **Semi-closed Primary**: Registered party members vote in their party's primary; independents may choose which party's primary to enter.

**Caucuses**:
An older form of selecting nominees where voters gather in public meetings to debate and vote. Iowa is famous for holding the first caucus. Caucuses are generally less common and more time-consuming than primaries.

**Delegates**:
Primary/caucus winners earn "delegates" — representatives who will vote for them at the party convention. Each party has its own rules for awarding delegates:
- Democrats: Mostly proportional (if you get 15%+ of votes, you get delegates).
- Republicans: Mix of winner-take-all and proportional depending on state.

**Superdelegates** (Democratic Party): Party officials and elected leaders who can support any candidate, though since 2020 they cannot vote on the first ballot unless a candidate already has a majority of pledged delegates.`,

  election_day: `**Election Day: What to Expect**

**When**: First Tuesday after the first Monday in November.

**Polling Hours**: Typically 6 AM – 8 PM local time (varies by state). If you're in line when polls close, you have the right to vote.

**What to Bring**:
- Photo ID (required in most states; some states accept non-photo ID or no ID)
- Voter registration card (optional but helpful)
- Your polling place address (find it at vote.gov)

**Voting Process**:
1. Check in at your polling place — poll workers verify your registration.
2. Receive your ballot.
3. Mark your choices privately in a voting booth.
4. Insert your ballot into the scanning machine or ballot box.
5. Receive your "I Voted" sticker!

**Mail-In / Absentee Voting**:
- Request a mail ballot by your state's deadline (often 1–2 weeks before Election Day).
- Fill it out and return it by mail or drop it off at an official drop box or election office.
- Some states require a witness signature.

**Provisional Ballots**:
If there's a question about your eligibility on Election Day, you can cast a provisional ballot that is verified after Election Day.`,

  counting: `**Vote Counting & Certification**

**How Votes Are Counted**:
1. **In-Person Votes**: Scanned electronically on Election Night; machines tabulate results.
2. **Mail-In/Absentee Ballots**: Signature verification occurs first; ballots are opened and scanned separately. Many states cannot process mail-in ballots until Election Day, causing delays.
3. **Provisional Ballots**: Counted after Election Day once eligibility is confirmed (usually 1–2 weeks).

**Reporting Results**:
- County election offices report preliminary (unofficial) results as counting progresses.
- Media organizations call race projections based on statistics — these are not official results.

**Certification**:
- **County Certification**: County boards certify local results (typically within 1–2 weeks).
- **State Certification**: State election officials certify statewide results (within weeks of Election Day).
- **Federal Certification (Presidential)**: Congress certifies Electoral College results on January 6th.

**Recounts**:
Triggered automatically when margins are within a threshold (often 0.5%) or requested by candidates. Recounts can be manual hand counts or machine recounts.

**Audits**:
Post-election audits verify that counting equipment worked correctly and results are accurate.`,

  disputes: `**Election Disputes, Challenges & Recounts**

**Contesting Results**:
Candidates or parties can challenge election results through:
- **Administrative Challenges**: Filing complaints with state election boards.
- **Legal Challenges**: Filing lawsuits in state or federal courts alleging election law violations, fraud, or irregularities.
- **Congressional Challenges** (Presidential): Members of Congress can object to Electoral College results during the January 6th certification session, though both chambers must agree to sustain any objection.

**Recounts**:
- **Automatic Recounts**: Triggered when margins fall below a state-set threshold (commonly 0.5%).
- **Requested Recounts**: Candidates can request a recount, sometimes paying a fee.
- **Hand Recounts vs. Machine Recounts**: Courts or state rules determine the recount method.

**Fraud vs. Irregularities**:
Election fraud (intentional illegal voting or vote manipulation) is rare and prosecuted as a federal/state crime. Irregularities (clerical or administrative errors) are far more common and generally corrected during canvassing.

**Safe Harbor Deadline**:
In presidential elections, states have a "safe harbor" deadline by which certified results are considered final and Congress must accept them.`,

  running: `**How to Run for Office**

**Step 1: Check Eligibility**
Requirements vary by office:
- **U.S. President**: 35+ years old, natural-born citizen, 14+ years resident.
- **U.S. Senator**: 30+ years old, 9-year citizen, state resident.
- **U.S. Representative**: 25+ years old, 7-year citizen, state resident.
- State/local offices have their own requirements.

**Step 2: File Candidacy Papers**
- File a "Statement of Candidacy" or equivalent form with the relevant election authority.
- Pay a filing fee OR gather a required number of voter signatures on a petition.

**Step 3: Form a Campaign Committee**
- Legally required once you receive/spend over a threshold amount.
- Appoint a campaign treasurer.
- Register with the FEC (federal offices) or state election board.

**Step 4: Follow Campaign Finance Rules**
- Report all contributions and expenditures.
- Follow contribution limits (individuals, PACs, etc.).
- Coordinate legally with party organizations.

**Step 5: Campaign!**
- Build your platform, fundraise, organize volunteers, reach voters through events, media, and advertising.

**Step 6: Win the Primary**
- For major-party candidates, win the primary election or caucus to become the official party nominee.

**Step 7: General Election Campaign**
- Compete in the general election against other parties' nominees.`,
};

// ── App state ─────────────────────────────────────────────────────────────────
let geminiApiKey = "";
let isDemoMode = false;
let conversationHistory = []; // For Gemini multi-turn context

// ── DOM refs ──────────────────────────────────────────────────────────────────
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const apiModal = document.getElementById("apiModal");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveApiBtn = document.getElementById("saveApiBtn");
const skipApiBtn = document.getElementById("skipApiBtn");
const apiStatusBtn = document.getElementById("apiStatusBtn");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const timelineEl = document.getElementById("timeline");

// ── Render sidebar timeline ───────────────────────────────────────────────────
function renderTimeline() {
  timelineEl.innerHTML = "";
  ELECTION_TIMELINE.forEach((item, i) => {
    const isLast = i === ELECTION_TIMELINE.length - 1;
    const stepNum = i + 1;

    const div = document.createElement("div");
    div.className = `timeline-item${item.status === "current" ? " active" : ""}`;
    div.dataset.q = `Tell me about the "${item.label}" stage of the election process`;

    const dotIcon = item.status === "done" ? "✓" : item.status === "current" ? stepNum : stepNum;

    div.innerHTML = `
      <div class="timeline-line">
        <div class="timeline-dot ${item.status}">${dotIcon}</div>
        ${!isLast ? `<div class="timeline-connector ${item.status === "done" ? "done" : ""}"></div>` : ""}
      </div>
      <div class="timeline-content">
        <div class="timeline-phase ${item.status}">${item.phase}</div>
        <div class="timeline-label">${item.label}</div>
        <div class="timeline-desc">${item.desc}</div>
      </div>
    `;
    timelineEl.appendChild(div);
  });

  // Click to ask
  document.querySelectorAll(".timeline-item").forEach((el) => {
    el.addEventListener("click", () => sendMessage(el.dataset.q));
  });
}

// ── API key management ────────────────────────────────────────────────────────
function showApiModal() {
  apiModal.classList.remove("hidden");
  apiKeyInput.focus();
}

function hideApiModal() {
  apiModal.classList.add("hidden");
}

function setApiKey(key) {
  geminiApiKey = key.trim();
  isDemoMode = false;
  statusDot.classList.add("connected");
  statusText.textContent = "AI Connected";
}

function activateDemoMode() {
  isDemoMode = true;
  geminiApiKey = "";
  statusDot.classList.remove("connected");
  statusText.textContent = "Demo Mode";
}

saveApiBtn.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    apiKeyInput.style.borderColor = "#ea4335";
    return;
  }
  setApiKey(key);
  hideApiModal();
});

skipApiBtn.addEventListener("click", () => {
  activateDemoMode();
  hideApiModal();
});

apiStatusBtn.addEventListener("click", () => {
  apiKeyInput.value = geminiApiKey;
  showApiModal();
});

apiKeyInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") saveApiBtn.click();
  apiKeyInput.style.borderColor = "";
});

// ── Message rendering ─────────────────────────────────────────────────────────
function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function appendMessage(role, htmlContent) {
  const msg = document.createElement("div");
  msg.className = `message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = role === "user" ? "👤" : "🗳️";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.innerHTML = htmlContent;

  const time = document.createElement("div");
  time.className = "message-time";
  time.textContent = formatTime();

  const wrap = document.createElement("div");
  wrap.style.display = "flex";
  wrap.style.flexDirection = "column";
  wrap.appendChild(bubble);
  wrap.appendChild(time);

  msg.appendChild(avatar);
  msg.appendChild(wrap);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

function showTyping() {
  const msg = document.createElement("div");
  msg.className = "message assistant";
  msg.id = "typingIndicator";

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = "🗳️";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble typing-indicator";
  bubble.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;

  msg.appendChild(avatar);
  msg.appendChild(bubble);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById("typingIndicator");
  if (el) el.remove();
}

// ── Simple Markdown → HTML converter ─────────────────────────────────────────
function mdToHtml(text) {
  return text
    // Headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h3>$1</h3>")
    .replace(/^# (.+)$/gm, "<h3>$1</h3>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Bullet lists
    .replace(/^[•\-] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]+?<\/li>)/g, (m) => `<ul>${m}</ul>`)
    // Numbered lists (basic)
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Line breaks
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/^(.+)$/, "<p>$1</p>");
}

// ── Demo mode: keyword-based response ────────────────────────────────────────
function getDemoResponse(question) {
  const q = question.toLowerCase();

  if (q.includes("overview") || q.includes("entire") || q.includes("full process") || q.includes("main steps") || q.includes("all steps")) {
    return mdToHtml(ELECTION_KNOWLEDGE.overview);
  }
  if (q.includes("register") || q.includes("registration") || q.includes("eligible") || q.includes("eligibility")) {
    return mdToHtml(ELECTION_KNOWLEDGE.registration);
  }
  if (q.includes("electoral college") || q.includes("270") || q.includes("electors")) {
    return mdToHtml(ELECTION_KNOWLEDGE.electoral_college);
  }
  if (q.includes("primary") || q.includes("caucus") || q.includes("nominee") || q.includes("delegate")) {
    return mdToHtml(ELECTION_KNOWLEDGE.primary);
  }
  if (q.includes("election day") || q.includes("voting") || q.includes("polling") || q.includes("ballot") || q.includes("vote on")) {
    return mdToHtml(ELECTION_KNOWLEDGE.election_day);
  }
  if (q.includes("count") || q.includes("certif") || q.includes("recount") || q.includes("audit") || q.includes("result")) {
    return mdToHtml(ELECTION_KNOWLEDGE.counting);
  }
  if (q.includes("dispute") || q.includes("challenge") || q.includes("fraud") || q.includes("contest")) {
    return mdToHtml(ELECTION_KNOWLEDGE.disputes);
  }
  if (q.includes("run for") || q.includes("candidate") || q.includes("candidacy") || q.includes("campaign for office")) {
    return mdToHtml(ELECTION_KNOWLEDGE.running);
  }

  // Find relevant timeline item
  for (const item of ELECTION_TIMELINE) {
    if (q.includes(item.label.toLowerCase()) || q.includes(item.phase.toLowerCase())) {
      return mdToHtml(`**${item.label}** (${item.phase})\n\n${item.detail}`);
    }
  }

  return mdToHtml(
    `I can help you understand the election process! Here are some topics I cover:\n\n` +
    `• **Overview** of the complete election process\n` +
    `• **Voter registration** requirements and deadlines\n` +
    `• **Primary elections** and caucuses\n` +
    `• **Electoral College** explained\n` +
    `• **Election Day** voting procedures\n` +
    `• **Vote counting** and certification\n` +
    `• **Election disputes** and recounts\n` +
    `• **Running for office** — candidacy process\n\n` +
    `Try clicking a quick question in the sidebar, or ask me anything specific!`
  );
}

// ── Gemini API call ───────────────────────────────────────────────────────────
async function callGemini(userMessage) {
  const systemPrompt = `You are an expert, friendly election process assistant. Your role is to help users understand:
- How elections work (voter registration, primaries, general elections, Electoral College, certification, inauguration)
- Key timelines and deadlines in the election process
- How to participate in democracy (voting, running for office)
- How votes are counted and certified
- How election disputes and recounts work

Keep responses clear, well-structured, and easy to follow. Use bullet points and numbered lists when appropriate.
Provide accurate, non-partisan, factual information. If asked about specific current candidates or partisan topics, redirect to the process rather than taking sides.
Format responses with markdown: use **bold** for key terms, bullet points for lists, and headers (##) for multi-section answers.`;

  // Build conversation for multi-turn
  conversationHistory.push({ role: "user", parts: [{ text: userMessage }] });

  const body = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: conversationHistory,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  const assistantText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response. Please try again.";

  // Add assistant response to history for multi-turn
  conversationHistory.push({ role: "model", parts: [{ text: assistantText }] });

  return mdToHtml(assistantText);
}

// ── Send message ──────────────────────────────────────────────────────────────
async function sendMessage(text) {
  const question = (text || userInput.value).trim();
  if (!question) return;

  userInput.value = "";
  autoResizeTextarea();
  sendBtn.disabled = true;

  // Show user message
  appendMessage("user", escapeHtml(question));

  // Show typing
  showTyping();

  try {
    let responseHtml;

    if (isDemoMode || !geminiApiKey) {
      // Simulate short delay for demo
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
      responseHtml = getDemoResponse(question);
    } else {
      responseHtml = await callGemini(question);
    }

    removeTyping();
    appendMessage("assistant", responseHtml);
  } catch (err) {
    removeTyping();
    let errMsg = err.message || "An unexpected error occurred.";
    if (errMsg.includes("API_KEY_INVALID") || errMsg.includes("invalid")) {
      errMsg = "Invalid API key. Please click <strong>Configure AI</strong> to enter a valid key, or use Demo Mode.";
    } else if (errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED")) {
      errMsg = "API quota exceeded. Please try again later or switch to Demo Mode.";
    }
    appendMessage(
      "assistant",
      `<span style="color:#ea4335">⚠️ ${errMsg}</span>`
    );
  }

  sendBtn.disabled = false;
  userInput.focus();
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function escapeHtml(text) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(text));
  return d.innerHTML;
}

function autoResizeTextarea() {
  userInput.style.height = "auto";
  userInput.style.height = Math.min(userInput.scrollHeight, 120) + "px";
}

// ── Event listeners ───────────────────────────────────────────────────────────
sendBtn.addEventListener("click", () => sendMessage());

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

userInput.addEventListener("input", autoResizeTextarea);

// Quick question buttons (sidebar)
document.querySelectorAll(".quick-btn").forEach((btn) => {
  btn.addEventListener("click", () => sendMessage(btn.dataset.q));
});

// Welcome chips
document.querySelectorAll(".welcome-chip").forEach((chip) => {
  chip.addEventListener("click", () => sendMessage(chip.dataset.q));
});

// ── Init ──────────────────────────────────────────────────────────────────────
renderTimeline();
showApiModal(); // Prompt for API key on load
