# Component Lab

Interactive Untitled UI components (Buttons + Toggles) pulled from Figma via MCP,
housed so every pull request gets a Vercel preview URL.

- Tokens from Untitled UI PRO v3.1 (`src/styles/tokens.css`)
- Button: seven hierarchies, five sizes, destructive, dot-leading
- Toggle: sm/md, label + supporting text, `role="switch"`
- GOV.UK theme scope: same components, swapped token layer

Live lab: [component-lab-gamma.vercel.app](https://component-lab-gamma.vercel.app)

Companion tutorial: [Make Your Figma Buttons Actually Clickable](https://elliotrylands.com/notes/figma-design-system-to-react-library-with-prs)

## Run locally

```bash
npm install
npm run dev
```

## Stack

- Vite + React
- CSS custom properties for design tokens
- No component library dependency

## Deploy

Connect this repo to Vercel. Every push to `main` deploys production. Every pull
request gets a preview URL.
