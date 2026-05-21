# AquaCoach AI — AO Smith Pureit Sales Training Mockup

High-fidelity interactive demo of an AI-powered sales training LMS for AO Smith Pureit retail promoters. Built as a client-facing prototype for evaluation against CUEBO and other agencies.

## What's inside

- **Login** — branded sign-in
- **Promoter Dashboard** — your score, weekly goal, skill radar, recent sessions, recommended scenarios
- **Scenario Library** — 5 fully-scripted scenarios across Objection Handling, Product Knowledge, Comparison, Closing
- **AI Roleplay Simulator (HERO)** — live voice-driven customer roleplay with:
  - Browser-native text-to-speech (AI customer voice)
  - Live mic input via Web Speech API
  - Animated waveform during speak/listen
  - Real-time scoring with keyword analysis
  - Hints, text fallback, language switching
- **Session Feedback** — overall score gauge, skill breakdown chart, sentence-level analysis, side-by-side comparison of your response vs. ideal, full transcript
- **Manager Dashboard** — team trend, category pie, promoter roster with sparklines, top performers, attention list
- **Leaderboard** — national podium + ranked list
- **Reports** — session history

## Languages supported
English (en-IN) · Hindi (hi-IN) · Tamil (ta-IN) — switchable from the header.

## Tech
- Vite + React 18 + TypeScript
- Tailwind CSS for styling
- Recharts for dashboards
- Lucide icons
- Web Speech API (built into Chrome/Edge/Safari) — no backend, no API keys

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 — sign in (any credentials, it's a mockup) and explore.

> **Best experience in Chrome or Edge** — voice recognition requires WebKit Speech API.

## Deploy to StackBlitz (for client sharing)

**Option 1 — Drag & drop**
1. Zip this entire folder
2. Go to https://stackblitz.com → New project → Upload zip

**Option 2 — From GitHub**
1. Push this folder to a GitHub repo
2. Open `https://stackblitz.com/github/YOUR_USER/YOUR_REPO`
3. StackBlitz auto-installs and runs

**Option 3 — Direct import**
1. Go to https://stackblitz.com/fork/vitejs-vite-react-ts
2. Replace files with these
3. Save and share the URL

The shared StackBlitz link gives the client a fully-running browser preview — no installs, no setup.

## Demo flow for the client meeting

1. **Login** → mention SSO with Pureit ID is supported
2. **Dashboard** → "this is what a promoter sees every morning"
3. **Scenarios** → "library curated by training team, filtered by product/skill"
4. **Start AI Roleplay** (use "The Small Kitchen Challenge") → speak naturally into the mic
5. **Finish session** → walk through the scoring screen, especially the "vs. Ideal Response" tab
6. **Manager Dashboard** → "this is what Sanjeev/zonal managers see"
7. **Language switcher** → flip to Hindi to show multilingual support

## Important notes

- Voice recognition needs Chrome/Edge and microphone permission. If denied, the "Type" mode works as fallback.
- Scoring uses local keyword-matching for the demo. Production version will use real LLM evaluation.
- All data is mock data — no backend calls anywhere. Safe to share with client.
