# Election Process Assistant 🗳️

An interactive web assistant that helps users understand the election process, key timelines, and every step from voter registration through inauguration — powered by Google Gemini AI.

## Features

- **Interactive chat interface** — ask anything about elections in plain language
- **Visual election timeline sidebar** — click any stage to learn more about it
- **10-step election process coverage**: filing, registration, primaries, conventions, campaigns, Election Day, vote counting, Electoral College, certification, and inauguration
- **Quick-question buttons** for common topics
- **Google Gemini AI integration** for intelligent, multi-turn conversation
- **Demo mode** — works without an API key using a built-in election knowledge base

## Getting Started

### Option 1: Open directly in a browser (no server needed)

```bash
open index.html
# or on Linux:
xdg-open index.html
```

### Option 2: Serve with a local web server

```bash
# Python 3
python3 -m http.server 8080
# Then visit http://localhost:8080
```

## Using the App

1. **Configure AI** (optional): When the app loads, enter a [Google Gemini API key](https://aistudio.google.com/app/apikey) to enable AI-powered answers. Click **Skip / Demo Mode** to use the built-in knowledge base without a key.

2. **Ask questions** using the chat input or click any of the:
   - **Welcome chips** for common starting points
   - **Quick Questions** in the sidebar
   - **Timeline steps** to learn about a specific election stage

3. **Explore the timeline** on the left to see all stages of the election process at a glance.

## Project Structure

```
├── index.html   # Main application page
├── style.css    # UI styling (Google Material Design inspired)
├── app.js       # Application logic, Gemini API integration, knowledge base
└── README.md    # This file
```

## Topics Covered

| Topic | Description |
|-------|-------------|
| Overview | End-to-end election process summary |
| Voter Registration | How and when to register, eligibility requirements |
| Primary Elections | Primaries, caucuses, delegates, party conventions |
| Electoral College | How electors are chosen and how 270 votes wins |
| Election Day | Polling, mail-in voting, provisional ballots |
| Vote Counting | Counting process, certification timeline, recounts |
| Disputes & Recounts | How results are challenged or contested |
| Running for Office | Candidacy filing, campaign finance, eligibility |

## Technology

- **Frontend**: Vanilla HTML, CSS, JavaScript (no framework dependencies)
- **AI**: [Google Gemini 2.0 Flash API](https://ai.google.dev/) via REST
- **Fallback**: Built-in keyword-matched knowledge base for demo mode
