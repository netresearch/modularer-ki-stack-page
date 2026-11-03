# KI in TYPO3 – TUGLE, 3. November 2026

Sebastian Mendel · Netresearch

[Präsentation öffnen](https://netresearch.github.io/modularer-ki-stack-page/vortraege/tugle-2026-11-03/) · [PDF](source/public/TUGLE-KI-in-TYPO3.pdf) · [Quellen](QUELLEN.md)

23 Vortragsfolien in fünf Abschnitten, zwei Referenzfolien, eine Themenübersicht und 17 Erklärfolien für Rückfragen. Die Fortschrittsanzeige zählt nur den Hauptvortrag. Pfeiltasten oder Mausrad blättern; Sprungschaltflächen öffnen gezielt Reservefolien. Über die Slidev-Werkzeugleiste lässt sich das PDF herunterladen.

## Bearbeiten und bauen

Node.js 22.12 oder neuer. Im Ordner `source/`:

```sh
npm ci --ignore-scripts
npm run dev
# Nach Änderungen:
npm run build
```

Inhalte: `source/slides.md`; Gestaltung: `source/style.css`; Komponenten: `source/components/`. `npm run build` erzeugt `site/` mit relativen Pfaden und ohne Sprechernotizen. Der fertige Build benötigt keinen TYPO3-Server und lädt alle Bilder und Schriften lokal. Demo- und Quellenlinks führen zu externen Angeboten. Das PDF in `source/public/` muss nach Inhaltsänderungen ebenfalls aktualisiert werden (`npm run export`, benötigt einen kompatiblen Chromium-Browser).

Die Demoaufnahmen stammen vom 2. November 2026. Technische nr-llm-Erklärungen beziehen sich auf v0.35.0; sie sind keine Zusage für alle späteren Versionen. Der Vortrag enthält keine privaten Regieunterlagen.

Originales Netresearch-Symbol aus dem Netresearch-Branding-Skill: CC BY-SA 4.0 mit Markenregeln. Raleway und Open Sans liegen lokal bei; Schriftlizenzen unter `source/public/fonts/`.
