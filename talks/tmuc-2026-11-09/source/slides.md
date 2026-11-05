---
theme: default
layout: nr
class: nr-cover
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 1
talkTotal: 27
appendix: ""
title: "KI in TYPO3"
author: "Sebastian Mendel · Netresearch"
info: |
  KI in TYPO3: Anwendungen, gemeinsame KI-Grundlagen und Agenten. TMUC · TYPO3 User Group München · 9. November 2026.
aspectRatio: 16/9
canvasWidth: 1280
colorSchema: light
fonts:
  sans: Open Sans
  provider: none
  local:
    - Raleway
    - Open Sans
lang: de
favicon: ./netresearch-symbol.svg
presenter: false
download: ./TMUC-KI-in-TYPO3.pdf
browserExporter: dev
record: false
wakeLock: false
drawings:
  enabled: false
monaco: false
remoteAssets: false
routerMode: hash
transition: none
duration: 45min
timer: countdown
exportFilename: TMUC-KI-in-TYPO3
export:
  format: pdf
  withClicks: false
  timeout: 30000
---
<div class="nr-kicker">TMUC · 9. November 2026</div>

# KI in TYPO3

<div class="nr-subtitle">Probleme, Fragen und Anforderungen</div>

<div class="nr-topics"><span>Erfahrungen mit nr-llm und darauf aufbauenden Anwendungen</span></div>

<div class="nr-author">Sebastian Mendel · Netresearch<br>9. November 2026</div>

<div class="nr-motif" aria-hidden="true"><i></i><i></i><i></i></div>


---
layout: nr
class: nr-text-slide
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 2
talkTotal: 27
appendix: ""
title: "Was euch heute erwartet"
---

<div class="nr-kicker">45 Minuten · Vom Beispiel zum eigenen Einsatz</div>

# Was euch heute erwartet

<ul class="nr-points"><li><span class="nr-number">01</span><span>Möglichkeiten: fünf Anwendungen erleben</span></li><li><span class="nr-number">02</span><span>Fragen zum KI-Einsatz: Daten, Vorgaben, Aufwand und Kontrolle</span></li><li><span class="nr-number">03</span><span>Antworten und Grenzen: am Beispiel nr-llm</span></li><li><span class="nr-number">04</span><span>Agentenwege: intern und extern vergleichen</span></li><li><span class="nr-number">05</span><span>Einordnung: andere Grundlagen und Austausch</span></li></ul>

<div class="nr-controls"></div>

---
layout: nr
class: nr-screen-slide nr-editor-slide
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 3
talkTotal: 27
appendix: ""
title: "KI direkt beim Bearbeiten nutzen"
---

<div class="nr-kicker">01 · Cowriter · Kurze Wege im Redaktionsalltag</div>

# KI direkt beim Bearbeiten nutzen

<div class="nr-editor-demos"><figure><h2>Im Editor</h2><NrImage file="screens/cowriter-ckeditor-toolbar-2026-11-05.png" alt="KI-Knöpfe direkt im CKEditor · 5.11.2026"/><figcaption>Text kürzen, überarbeiten oder übersetzen · Aufnahme 5.11.2026</figcaption><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/record/edit?edit%5Btt_content%5D%5B30%5D=edit">Editor öffnen</NrLink><NrLink href="./screens/cowriter-ckeditor-toolbar-2026-11-05.png">Bild vergrößern</NrLink></div></figure><figure><h2>An Seitenfeldern</h2><NrImage file="screens/cowriter-page-seo-2026-11-05.png" alt="Direkte KI-Aktionen an SEO-Titel und Beschreibung · 5.11.2026"/><figcaption>Direkt am Feld: Vorschläge für Titel und Beschreibung.<small>Aktuelle Oberfläche · Aufnahme 5.11.2026</small></figcaption><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/record/edit?edit%5Bpages%5D%5B10077%5D=edit">Seitenfelder öffnen</NrLink><NrLink href="./screens/cowriter-page-seo-2026-11-05.png">Bild vergrößern</NrLink></div></figure></div>

---
layout: nr
class: nr-screen-slide
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 4
talkTotal: 27
appendix: ""
title: "Antworten aus Website-Inhalten"
---
<div class="nr-kicker">02 · AI Search</div>

# Antworten aus Website-Inhalten

<div class="nr-demo"><figure><NrImage file="screens/04-ai-search-02-antwort-quellen.png" alt="Antwort mit Quelltreffern · Aufnahme vom 2.11.2026"/><figcaption>Antwort mit Quelltreffern · Aufnahme vom 2.11.2026</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Antwort mit Quelle nachvollziehen</span></li><li><span class="nr-number">02</span><span>Quelltreffer öffnen</span></li><li><span class="nr-number">03</span><span>Zeigen, wenn die Quellen keine Antwort liefern</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/extensions/ai-search">AI Search · Vorschau</NrLink><NrLink href="./screens/04-ai-search-02-antwort-quellen.png">Bild vergrößern</NrLink></div></div></div>


---
layout: nr
class: nr-screen-slide
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 5
talkTotal: 27
appendix: ""
title: "Ein Inhalt, mehrere Formate"
---
<div class="nr-kicker">03 · Repurpose</div>

# Ein Inhalt, mehrere Formate

<div class="nr-demo"><figure><NrImage file="screens/05-repurpose-job-3-detail.png" alt="Vorbereiteter Auftrag 3 · Aufnahme vom 2.11.2026"/><figcaption>Vorbereiteter Auftrag 3 · Aufnahme vom 2.11.2026</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Ausgangsquelle bleibt nachvollziehbar</span></li><li><span class="nr-number">02</span><span>Schaubild und Podcast als Ergebnisse</span></li><li><span class="nr-number">03</span><span>Jedes Artefakt einzeln prüfen</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/web/nr-repurpose">Repurpose öffnen</NrLink><NrLink href="./screens/05-repurpose-job-3-detail.png">Bild vergrößern</NrLink></div></div></div>


---
layout: nr
class: nr-screen-slide
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 6
talkTotal: 27
appendix: ""
title: "Mit TYPO3 sprechen und Aufgaben erledigen lassen"
---

<div class="nr-kicker">04 · Backend-Agent · Der Chat als Arbeitsoberfläche</div>

# Mit TYPO3 sprechen und Aufgaben erledigen lassen

<div class="nr-demo"><figure><NrImage file="screens/agent-chat-2026-11-05.png" alt="Aktuelle Chat-Oberfläche mit vorhandenem Demo-Verlauf · Aufnahme 5.11.2026"/><figcaption>Aktuelle Chat-Oberfläche · vorhandener Verlauf · Aufnahme 5.11.2026</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Fragen zu Inhalten in TYPO3 stellen</span></li><li><span class="nr-number">02</span><span>Änderungen in natürlicher Sprache beauftragen</span></li><li><span class="nr-number">03</span><span>Zum Beispiel einen Seitenentwurf anlegen lassen</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/nr/mcp/agent/chat/conversation">KI-Chat öffnen</NrLink><NrLink href="./screens/agent-chat-2026-11-05.png">Bild vergrößern</NrLink></div></div></div>

---
layout: nr
class: nr-screen-slide
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 7
talkTotal: 27
appendix: ""
title: "Vom Briefing zum Seitenentwurf"
---
<div class="nr-kicker">05 · Landingpage</div>

# Vom Briefing zum Seitenentwurf

<div class="nr-demo"><figure><NrImage file="screens/07-landingpage-07-ergebnis-vorschau-10110.png" alt="Oberer Seitenbereich des Demo-Entwurfs · 2.11.2026"/><figcaption>Oberer Seitenbereich des Demo-Entwurfs · 2.11.2026</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Briefing und Struktur vorgeben</span></li><li><span class="nr-number">02</span><span>Generierte Seite als Entwurf prüfen</span></li><li><span class="nr-number">03</span><span>Auch Metadaten brauchen Kontrolle</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/?id=10110">Entwurf in Vorschau</NrLink><NrLink href="./screens/07-landingpage-07-ergebnis-vorschau-10110.png">Bild vergrößern</NrLink></div></div></div>


---
layout: nr
class: nr-section-divider
section: 2
sectionTitle: "Fragen zum KI-Einsatz"
sectionDivider: true
talkPage: 8
talkTotal: 27
appendix: ""
title: "Was müssen wir für den KI-Einsatz klären?"
---

<div class="nr-section-number" aria-label="Abschnitt 2">02</div>

# Was müssen wir für den KI-Einsatz klären?

---
layout: nr
class: nr-explanation-slide nr-question-focus-slide
section: 2
sectionTitle: "Fragen zum KI-Einsatz"
sectionDivider: false
talkPage: 9
talkTotal: 27
appendix: ""
title: "Was müssten wir vor dem Einsatz im eigenen TYPO3 klären?"
---

<div class="nr-kicker">Fragen zum KI-Einsatz</div>

<div class="nr-question-focus">
<h1>Was müssten wir vor dem Einsatz im eigenen TYPO3 klären?</h1>
<div class="nr-discussion-origins"><p>Aus den gerade gezeigten Beispielen</p><p>Aus euren bisherigen Projekten</p></div>
</div>

<div class="nr-controls"></div>

---
layout: nr
class: nr-explanation-slide nr-question-grid-slide
section: 2
sectionTitle: "Fragen zum KI-Einsatz"
sectionDivider: false
talkPage: 10
talkTotal: 27
appendix: ""
title: "Welche Fragen müssen wir beantworten?"
---

<div class="nr-kicker">Fragen zum KI-Einsatz · Vier Felder für die Diskussion</div>

# Welche Fragen müssen wir beantworten?

<div class="nr-question-grid">
<section><NrIcon name="data"/><h2>Daten und Vorgaben</h2><p>Welche Inhalte dürfen wohin? Welche rechtlichen und betrieblichen Vorgaben gelten?</p></section>
<section><NrIcon name="operations"/><h2>Aufwand und Betrieb</h2><p>Was müssen wir integrieren und betreiben? Was kostet das?</p></section>
<section><NrIcon name="quality"/><h2>Qualität</h2><p>Welche Fehler lassen sich automatisch erkennen? Was müssen Menschen prüfen?</p></section>
<section><NrIcon name="responsibility"/><h2>Kontrolle und Verantwortung</h2><p>Wer darf ändern, wer gibt frei und wer verantwortet das Ergebnis?</p></section>
</div>

<div class="nr-controls"></div>

---
layout: nr
class: nr-section-divider
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: true
talkPage: 11
talkTotal: 27
appendix: ""
title: "Antworten und Grenzen"
---
<div class="nr-section-number" aria-label="Abschnitt 3">03</div>

# Antworten und Grenzen



---
layout: nr
class: nr-explanation-slide nr-shared-basis-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 12
talkTotal: 27
appendix: ""
title: "Die KI-Anbindung in jeder Extension neu bauen?"
---

<div class="nr-kicker">Aufwand · Gemeinsame Aufgaben einmal lösen</div>

# Die KI-Anbindung in jeder Extension neu bauen?

<div class="nr-shared-basis">
<div class="nr-app-row"><span>Cowriter</span><span>AI Search</span><span>Repurpose</span><span>Landingpage</span><span>Backend-Agent</span></div>
<p class="nr-flow-label">Integrierte Anwendungen nutzen dieselbe technische Grundlage.</p>
<section class="nr-shared-core"><h2>nr-llm</h2><div class="nr-shared-services"><span>Provider und Zugänge</span><span>Konfigurationen und Aufgaben</span><span>Nutzung und Kontrolle</span></div></section>
<div class="nr-provider-row">Modellanbieter und Modelle</div>
<p class="nr-ownership">Die Fachfunktion und ihr Ablauf bleiben in der jeweiligen Extension.</p>
</div>

<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://netresearch.github.io/modularer-ki-stack-page/">Modularer KI-Stack im Überblick</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm">nr-llm: Projekt und Dokumentation</NrLink></div></div>

---
layout: nr
class: nr-explanation-slide nr-config-chain-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 13
talkTotal: 27
appendix: ""
title: "Modell wechseln, ohne die Anwendung neu zu bauen?"
---

<div class="nr-kicker">Modellwahl · Fachfunktion und Anbieter trennen</div>

# Modell wechseln, ohne die Anwendung neu zu bauen?

<div class="nr-config-chain">
<section><span class="nr-step-label">Anwendung</span><h2>SEO-Text erzeugen</h2><p>Ruft eine benannte Konfiguration auf.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span>
<section class="nr-emphasis"><span class="nr-step-label">Konfiguration</span><h2>Aufgabe festlegen</h2><p>Vorgaben, Parameter und Modellwahl.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span>
<section><span class="nr-step-label">Modell</span><h2>Fähigkeiten wählen</h2><p>Passend zur Aufgabe.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span>
<section><span class="nr-step-label">Provider</span><h2>Dienst anbinden</h2><p>Endpunkt und Zugang.</p></section>
</div>

<p class="nr-takeaway">Die Anwendung behält ihre Schnittstelle; die Modellwahl wird zentral geändert.</p>
<p class="nr-limit">Beim Wechsel benötigte Fähigkeiten, Datenweg und Ergebnisqualität erneut prüfen.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/nrllm/configurations">Konfigurationen öffnen</NrLink></div></div>

---
layout: nr
class: nr-explanation-slide nr-rule-example-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 14
talkTotal: 27
appendix: ""
title: "Wie verwenden Aufgaben dieselben Vorgaben?"
---

<div class="nr-kicker">Wiederverwendung · Anweisungen zentral pflegen</div>

# Wie verwenden Aufgaben dieselben Vorgaben?

<div class="nr-rule-example">
<section class="nr-rule-task"><span class="nr-step-label">Beispielaufgabe</span><h2>Absatz kürzen</h2><p>Bei jedem Aufruf kommt ein anderer Text dazu.</p></section>
<section class="nr-rule-prompt"><span class="nr-step-label">Zentrale Anweisung in der Konfiguration</span><blockquote>Sprache beibehalten.<br>Keine neuen Fakten ergänzen.</blockquote><p>Gemeinsame Textbausteine ergänzen z. B. Tonalität oder Zielgruppe.</p></section>
</div>

<p class="nr-takeaway">Die Aufgabe verbindet Eingabe und Konfiguration; gemeinsame Anweisungen werden wiederverwendet.</p>
<p class="nr-limit">Eine Prompt-Anweisung ist noch kein Nachweis, dass das Ergebnis sie einhält.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/nrllm/configurations">Konfigurationen öffnen</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Tasks.rst">Tasks: Eingabe und Konfiguration</NrLink></div></div>

---
layout: nr
class: nr-explanation-slide nr-context-flow-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 15
talkTotal: 27
appendix: ""
title: "Woher kennt die KI unsere Inhalte?"
---

<div class="nr-kicker">Kontext · Die Anwendung wählt Informationen aus</div>

# Woher kennt die KI unsere Inhalte?

<div class="nr-context-flow">
<section><span class="nr-step-label">In TYPO3</span><h2>Benötigte Quelle</h2><p>Zum Beispiel der ausgewählte Absatz im Editor.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span>
<section class="nr-emphasis"><span class="nr-step-label">In der Anwendung</span><h2>Kontext zusammenstellen</h2><p>Absatz + Auftrag + passende Anweisungen.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span>
<section><span class="nr-step-label">Beim Modell</span><h2>Mit diesem Inhalt arbeiten</h2><p>Für die aktuelle Anfrage.</p></section>
</div>

<p class="nr-takeaway">Das Modell erhält den zusammengestellten Kontext, nicht automatisch das gesamte TYPO3.</p>
<p class="nr-limit">Eine Suche liefert gefundene Inhalte; ein Agent kann über erlaubte Werkzeuge weitere Informationen laden.</p>
<div class="nr-controls"><div class="nr-jump-links"><NrJump :page="37">Reserve: Kontext und Wissen</NrJump></div></div>

---
layout: nr
class: nr-explanation-slide nr-quality-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 16
talkTotal: 27
appendix: ""
title: "Was lässt sich automatisch prüfen?"
---

<div class="nr-kicker">Qualität · Prüfbeispiel mit nr-llm 0.35.0</div>

# Was lässt sich automatisch prüfen?

<div class="nr-quality-grid"><section><NrIcon name="quality"/><h2>Formale Regeln</h2><p>Erlaubte Statuswerte und maximal 160 Zeichen sind im Schema festgelegt.</p><div class="nr-proof-result"><strong>Abgelehnt</strong><span>Unerlaubter Status oder 161 Zeichen</span></div></section><section><NrIcon name="responsibility"/><h2>Inhaltliche Aussagen</h2><p>„Meldet euch bis 4. November an.“<br>Im Briefing steht keine Frist.</p><div class="nr-proof-result nr-proof-caution"><strong>Formal akzeptiert</strong><span>Die Frist wird nicht mit Quellen abgeglichen.</span></div></section></div>

<p class="nr-takeaway">Ein gültiges Format belegt keine wahre Aussage. Fachliche Prüfung bleibt nötig.</p><p class="nr-limit">Mit dem Original-Prüfcode ausgeführt. Keine automatische Faktenwarnung belegt.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="pruefbeispiel/index.html" print-href="https://netresearch.github.io/modularer-ki-stack-page/vortraege/tmuc-2026-11-09/pruefbeispiel/index.html">Prüfbeispiel und Ergebnisse öffnen</NrLink></div><div class="nr-jump-links"><NrJump :page="31">Reserve: Wie die Prüfung funktioniert</NrJump></div></div>

---
layout: nr
class: nr-screen-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 17
talkTotal: 27
appendix: ""
title: "Wie behalten wir Verbrauch und Kosten im Blick?"
---
<div class="nr-kicker">Betrieb</div>

# Wie behalten wir Verbrauch und Kosten im Blick?

<div class="nr-demo"><figure><NrImage file="screens/17-nr-llm-07-analyse-kosten.png" alt="Historische Analyse der Demo-Instanz · 2.11.2026"/><figcaption>Historische Analyse der Demo-Instanz · 2.11.2026</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Aufrufe und Tokens aufschlüsseln</span></li><li><span class="nr-number">02</span><span>Kosten anhand hinterlegter Preise schätzen</span></li><li><span class="nr-number">03</span><span>Konfigurierte Budgets vor weiteren Aufrufen prüfen</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/nrllm/analytics">Kostenübersicht öffnen</NrLink><NrLink href="./screens/17-nr-llm-07-analyse-kosten.png">Bild vergrößern</NrLink><NrJump :page="43">Reserve: Budgetgrenzen</NrJump></div></div></div>


---
layout: nr
class: nr-explanation-slide nr-data-gate-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 18
talkTotal: 27
appendix: ""
title: "Wie begrenzen wir, welche Daten wohin gelangen?"
---

<div class="nr-kicker">Daten und Vorgaben · Deklarierte Grenzen technisch prüfen</div>

# Wie begrenzen wir, welche Daten wohin gelangen?

<div class="nr-data-gate">
<section class="nr-data-source"><span class="nr-step-label">Vorbereiten</span><h2>Quellen klassifizieren</h2><p>Systemprompt, Textbausteine und Skills erhalten eine Datenklasse.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span>
<section class="nr-emphasis"><span class="nr-step-label">Vor dem Versand</span><h2>Datenklasse prüfen</h2><p>Gegen die hinterlegte Provider-Zone – einschließlich Fallbacks.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span>
<section class="nr-data-outcomes"><span class="nr-step-label">Bei aktiver Durchsetzung</span><p><strong>Passt:</strong> Aufruf zulassen.</p><p><strong>Passt nicht:</strong> Aufruf stoppen.</p></section>
</div>

<p class="nr-limit"><strong>Grenze:</strong> Freie Eingaben werden nicht automatisch klassifiziert. Unklassifizierte Quellen setzen hier keine Beschränkung.</p>
<p class="nr-takeaway">Das Projekt legt die Datenfreigabe fest; nr-llm prüft die hinterlegten Grenzen. Das ersetzt keine rechtliche Prüfung.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Context/InputContextTrustGate.php">Prüfung vor dem Versand</NrLink></div></div>

---
layout: nr
class: nr-screen-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 19
talkTotal: 27
appendix: ""
title: "Wer darf Änderungen ausführen?"
---
<div class="nr-kicker">Kontrolle</div>

# Wer darf Änderungen ausführen?

<div class="nr-demo"><figure><NrImage file="screens/06-agent-03-schreiben-b-freigabekarte.png" alt="Schreibfreigabe im Backend-Agenten · Aufnahme vom 2.11.2026"/><figcaption>Schreibfreigabe im Backend-Agenten · Aufnahme vom 2.11.2026</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Lesende und schreibende Werkzeuge unterscheiden</span></li><li><span class="nr-number">02</span><span>Backend-Agent: konkrete Änderung vorab freigeben</span></li><li><span class="nr-number">03</span><span>Schreibende Standardwerkzeuge prüfen TYPO3-Rechte</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/nrllm/tools">Werkzeuge öffnen</NrLink><NrLink href="./screens/06-agent-03-schreiben-b-freigabekarte.png">Bild vergrößern</NrLink></div></div></div>


---
layout: nr
class: nr-screen-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 20
talkTotal: 27
appendix: ""
title: "Was hat der Agent tatsächlich getan?"
---
<div class="nr-kicker">Audit und Fehleranalyse</div>

# Was hat der Agent tatsächlich getan?

<div class="nr-demo"><figure><NrImage file="screens/20-agent-02-lesen-c-aktivitaet.png" alt="Lesender Werkzeugverlauf · Aufnahme vom 2.11.2026"/><figcaption>Lesender Werkzeugverlauf · Aufnahme vom 2.11.2026</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Werkzeug, Argumente und Ergebnis ansehen</span></li><li><span class="nr-number">02</span><span>Freigaben und ausgeführte Schritte nachvollziehen</span></li><li><span class="nr-number">03</span><span>Aus Protokollen gezielt Fehler untersuchen</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/nr/mcp/agent/chat/conversation">KI-Chat öffnen</NrLink><NrLink href="./screens/20-agent-02-lesen-c-aktivitaet.png">Bild vergrößern</NrLink></div></div></div>


---
layout: nr
class: nr-section-divider
section: 4
sectionTitle: "Agentenwege"
sectionDivider: true
talkPage: 21
talkTotal: 27
appendix: ""
title: "Agentenwege"
---
<div class="nr-section-number" aria-label="Abschnitt 4">04</div>

# Agentenwege



---
layout: nr
class: nr-column-slide nr-comparison
section: 4
sectionTitle: "Agentenwege"
sectionDivider: false
talkPage: 22
talkTotal: 27
appendix: ""
title: "Wie kann ein Agent mit TYPO3 arbeiten?"
---
<div class="nr-kicker">Zwei Zugangswege im Vergleich</div>

# Wie kann ein Agent mit TYPO3 arbeiten?

<div class="nr-columns nr-columns-2"><section><h2>Im TYPO3-Backend</h2><p>Auftrag im Backend<br>↓<br>Agent in TYPO3<br>↓<br>TYPO3-Werkzeuge</p></section><section><h2>Aus einem externen Assistenten</h2><p>Auftrag im eigenen Assistenten<br>↓<br>Externer Agent → TYPO3-MCP-Server<br>↓<br>TYPO3-Werkzeuge</p></section></div>

<ul class="nr-points"><li><span class="nr-number">01</span><span>MCP verbindet Agenten und Werkzeuge nach einem gemeinsamen Standard. Rechte und Freigaben bleiben nötig.</span></li></ul>

<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture">MCP-Architektur nachlesen</NrLink><NrLink href="https://github.com/hauptsacheNet/typo3-mcp-server">Beispiel: TYPO3 MCP Server</NrLink></div></div>


---
layout: nr
class: nr-flow-slide
section: 4
sectionTitle: "Agentenwege"
sectionDivider: false
talkPage: 23
talkTotal: 27
appendix: ""
title: "A2A: Ein Agent beauftragt einen anderen"
---
<div class="nr-kicker">A2A · Ausblick</div>

# A2A: Ein Agent beauftragt einen anderen

<ol class="nr-flow" style="--steps:3"><li><span class="nr-flow-number">01</span><h2>Auftrag übergeben</h2><p>Der Benutzer-Agent beauftragt einen TYPO3-Agenten.</p></li><li><span class="nr-flow-number">02</span><h2>Aufgabe bearbeiten</h2><p>Der TYPO3-Agent arbeitet im eigenen Zuständigkeitsbereich.</p></li><li><span class="nr-flow-number">03</span><h2>Ergebnis zurückgeben</h2><p>Der beauftragende Agent erhält eine Rückmeldung.</p></li></ol><p class="nr-flow-note">Ausblick: Identität, Rechte und Rückmeldung müssen zwischen den Agenten geklärt sein.</p>



<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://a2a-protocol.org/latest/topics/a2a-and-mcp/">A2A und MCP: Einordnung lesen</NrLink></div></div>


---
layout: nr
class: nr-section-divider
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: true
talkPage: 24
talkTotal: 27
appendix: ""
title: "Einordnung & Austausch"
---
<div class="nr-section-number" aria-label="Abschnitt 5">05</div>

# Einordnung & Austausch



---
layout: nr
class: nr-resources-slide nr-foundation-map
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 25
talkTotal: 27
appendix: ""
title: "Welche weiteren Grundlagen gibt es für TYPO3?"
---

<div class="nr-kicker">Ökosystem · Bausteine für eigene Integrationen</div>

# Welche weiteren Grundlagen gibt es für TYPO3?

<div class="nr-resources nr-ecosystem-grid">
<section><h2>KI-Schicht für Extensions</h2><p class="nr-resource-description">Gemeinsame Anbindung für eigene KI-Funktionen.</p><ul class="nr-resource-links"><li><NrLink href="https://github.com/netresearch/t3x-nr-llm">Netresearch · nr-llm</NrLink></li><li><NrLink href="https://github.com/b13/aim">b13 · AiM (Alpha)</NrLink></li><li><NrLink href="https://docs.typo3.org/p/nitsan/ns-t3af/main/en-us/Index.html">NITSAN / T3Planet · AI Foundation</NrLink></li><li><NrLink href="https://www.louis.info/leistungen/technologien/typo3-extensions/">LOUIS INTERNET · LIA Middleware AI</NrLink><span class="nr-resource-meta">Für Extensions und Eigenentwicklungen · kommerziell</span></li></ul></section>
<section><h2>MCP-Zugang zu TYPO3</h2><p class="nr-resource-description">TYPO3-Werkzeuge für externe Assistenten.</p><ul class="nr-resource-links"><li><NrLink href="https://github.com/hauptsacheNet/typo3-mcp-server">hauptsache.net · TYPO3 MCP Server</NrLink></li><li><NrLink href="https://github.com/marekskopal/typo3-mcp-server">Marek Skopal · TYPO3 MCP Server</NrLink></li><li><NrLink href="https://github.com/autodudesde/ai-suite#mcp-server-optional-sub-extension">AutoDudes · AI Suite MCP (Zusatz)</NrLink></li></ul></section>
</div>

<p class="nr-takeaway">KI-Anbindung und Agentenzugriff sind unterschiedliche Aufgaben; beide Bausteine können sich ergänzen.</p>
<div class="nr-controls"><div class="nr-jump-links"><NrJump :page="45">KI-Schichten im Vergleich</NrJump><NrJump :page="46">MCP-Server im Vergleich</NrJump><NrJump :page="47">Such- und RAG-Grundlagen</NrJump></div></div>

---
layout: nr
class: nr-flow-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 26
talkTotal: 27
appendix: ""
title: "Eine Aufgabe wählen und ihren Nutzen prüfen"
---
<div class="nr-kicker">Vom Vortrag ins eigene Projekt</div>

# Eine Aufgabe wählen und ihren Nutzen prüfen

<ol class="nr-flow" style="--steps:4"><li><span class="nr-flow-number">01</span><h2>Aufgabe wählen</h2><p>Einen konkreten Arbeitsablauf für den Einstieg auswählen.</p></li><li><span class="nr-flow-number">02</span><h2>Maßstab festlegen</h2><p>Beispielinputs und passende Qualitätskriterien vorbereiten.</p></li><li><span class="nr-flow-number">03</span><h2>Einsatz klären</h2><p>Datenweg, Kosten und Freigaben prüfen.</p></li><li><span class="nr-flow-number">04</span><h2>Nutzen bewerten</h2><p>Ergebnisse und Nacharbeit bewerten, dann gezielt erweitern.</p></li></ol>



<div class="nr-controls"></div>


---
layout: nr
class: nr-text-slide nr-discussion
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: ""
title: "Welche Fragen sind noch offen?"
---
<div class="nr-kicker">Diskussion</div>

# Welche Fragen sind noch offen?



<ul class="nr-points"><li><span class="nr-number">01</span><span>Welche unserer Fragen sind beantwortet?</span></li><li><span class="nr-number">02</span><span>Wo bleiben Zweifel oder konkrete Hürden?</span></li><li><span class="nr-number">03</span><span>Welche Aufgabe würdet ihr als Erstes ausprobieren?</span></li></ul>

<div class="nr-controls"><div class="nr-jump-links"><NrJump :page="30">Reservefolien für Rückfragen</NrJump><NrJump :page="28">Links &amp; Quellen</NrJump></div></div>


---
layout: nr
class: nr-resources-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "references"
title: "Links zu Demos und Anwendungen"
---

<div class="nr-kicker">Zum Ausprobieren und Nachlesen</div>

# Links zu Demos und Anwendungen

<div class="nr-resources"><section><h2>Präsentation und Demo</h2><ul class="nr-resource-links"><li><NrLink href="https://netresearch.github.io/modularer-ki-stack-page/vortraege/vorlage/">Aktuelle neutrale Präsentation</NrLink></li><li><NrLink href="https://typo3-demo.netresearch.de/">Öffentliche TYPO3-Demo</NrLink></li><li><NrLink href="https://typo3-demo.netresearch.de/typo3/main">TYPO3-Backend · Anmeldung nötig</NrLink></li><li><NrLink href="https://typo3-demo.netresearch.de/extensions/ai-search">AI Search · Backend-Vorschau</NrLink></li><li><NrLink href="https://typo3-demo.netresearch.de/?id=10110">Landingpage-Entwurf · Backend-Vorschau</NrLink></li><li><NrLink href="https://www.netresearch.de/blog/ki-kennzeichnung-auf-websites-was-jetzt-wirklich-gekennzeichnet-werden-muss/">Ausgangsartikel des Repurpose-Beispiels</NrLink></li></ul></section><section><h2>Anwendungen und Beschreibungen</h2><ul class="nr-resource-links"><li><NrLink href="https://github.com/netresearch/t3x-cowriter">Cowriter</NrLink></li><li><NrLink href="https://typo3-demo.netresearch.de/extensions">AI Search · Demo-Übersicht</NrLink></li><li><NrLink href="https://github.com/netresearch/t3x-nr-repurpose">Repurpose</NrLink></li><li><NrLink href="https://github.com/netresearch/t3x-nr-mcp-agent">Backend-Agent</NrLink></li><li><NrLink href="https://github.com/netresearch/nr-landingpage">Landingpage</NrLink></li></ul></section></div><div class="nr-controls"></div>

---
layout: nr
class: nr-resources-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "references"
title: "Quellen zu KI-Grundlagen und MCP"
---

<div class="nr-kicker">Zum Vergleichen und Vertiefen</div>

# Quellen zu KI-Grundlagen und MCP

<div class="nr-resources"><section><h2>Technische Grundlage</h2><ul class="nr-resource-links"><li><NrLink href="https://netresearch.github.io/modularer-ki-stack-page/">Modularer KI-Stack · Module und Voraussetzungen</NrLink></li><li><NrLink href="https://github.com/netresearch/t3x-nr-llm">nr-llm · Projekt und Dokumentation</NrLink></li><li><NrLink href="https://github.com/netresearch/t3x-nr-llm/tree/6afad3444ceb0ef3f206f6687df8d23eb881f496">nr-llm · für die Folien geprüfter Quellstand</NrLink></li><li><NrLink href="https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture">MCP · Architektur von Client und Server</NrLink></li><li><NrLink href="https://a2a-protocol.org/latest/topics/a2a-and-mcp/">A2A und MCP · offizielle Einordnung</NrLink></li><li><NrLink href="https://symfony.com/doc/current/ai/components/platform.html">Symfony AI Platform · PHP-Unterbau</NrLink></li></ul></section><section><h2>KI-Schichten und MCP-Server</h2><ul class="nr-resource-links"><li><NrLink href="https://github.com/b13/aim">b13 AiM · TYPO3-KI-Schicht</NrLink></li><li><NrLink href="https://docs.typo3.org/p/nitsan/ns-t3af/main/en-us/Index.html">NITSAN / T3Planet · AI Foundation</NrLink></li><li><NrLink href="https://www.louis.info/leistungen/technologien/typo3-extensions/">LOUIS INTERNET · LIA Middleware AI</NrLink></li><li><NrLink href="https://docs.typo3.org/p/madj2k/t3-ai-assistant/main/en-us/Introduction/ArchitectureOverview.html">Madj2k AI Core + TYPO3 AI Assistant</NrLink></li><li><NrLink href="https://github.com/hauptsacheNet/typo3-mcp-server">hauptsache.net · TYPO3 MCP Server</NrLink></li><li><NrLink href="https://github.com/marekskopal/typo3-mcp-server">Marek Skopal · TYPO3 MCP Server</NrLink></li><li><NrLink href="https://github.com/autodudesde/ai-suite#mcp-server-optional-sub-extension">AutoDudes · AI Suite MCP (Zusatz)</NrLink></li></ul></section></div><div class="nr-controls"></div>

---
layout: nr
class: nr-reserve-index
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Rückfragen: die passende Erklärung öffnen"
---
<div class="nr-kicker">Reserve · nach Zielgruppe und Fragestellung</div>

# Rückfragen: die passende Erklärung öffnen

<div class="nr-reserve-menu"><section><h2>Entwicklung</h2><ul><li><NrJump :page="31" print-label>Formale Vorgaben prüfen</NrJump><span class="nr-reserve-page">31</span></li><li><NrJump :page="33" print-label>Skills einbinden</NrJump><span class="nr-reserve-page">33</span></li><li><NrJump :page="35" print-label>Agentenablauf verstehen</NrJump><span class="nr-reserve-page">35</span></li><li><NrJump :page="36" print-label>Eigene Extension anbinden</NrJump><span class="nr-reserve-page">36</span></li><li><NrJump :page="37" print-label>Kontext und Wissen liefern</NrJump><span class="nr-reserve-page">37</span></li><li><NrJump :page="38" print-label>Fehler und Kontextgrenzen</NrJump><span class="nr-reserve-page">38</span></li><li><NrJump :page="47" print-label>Such- und RAG-Grundlagen</NrJump><span class="nr-reserve-page">47</span></li></ul></section><section><h2>Integration</h2><ul><li><NrJump :page="34" print-label>MCP-Werkzeuge anbinden</NrJump><span class="nr-reserve-page">34</span></li><li><NrJump :page="39" print-label>Anbieter und Modell wechseln</NrJump><span class="nr-reserve-page">39</span></li><li><NrJump :page="40" print-label>Werkzeuge und Rechte begrenzen</NrJump><span class="nr-reserve-page">40</span></li><li><NrJump :page="41" print-label>Protokolle und Löschfristen</NrJump><span class="nr-reserve-page">41</span></li><li><NrJump :page="45" print-label>KI-Schichten vergleichen</NrJump><span class="nr-reserve-page">45</span></li><li><NrJump :page="46" print-label>TYPO3-MCP-Server vergleichen</NrJump><span class="nr-reserve-page">46</span></li></ul></section><section><h2>Entscheidung</h2><ul><li><NrJump :page="32" print-label>Qualität an Beispielen testen</NrJump><span class="nr-reserve-page">32</span></li><li><NrJump :page="42" print-label>Nutzen und Aufwand abwägen</NrJump><span class="nr-reserve-page">42</span></li><li><NrJump :page="43" print-label>Kosten und Budgets begrenzen</NrJump><span class="nr-reserve-page">43</span></li><li><NrJump :page="44" print-label>Produktivstart vorbereiten</NrJump><span class="nr-reserve-page">44</span></li></ul></section></div>



<div class="nr-controls"><div class="nr-jump-links"><NrJump :page="27">Zurück zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Formale Vorgaben werden maschinell geprüft"
---
<div class="nr-kicker">Reserve · Entwicklung · nr-llm v0.35.0</div>

# Formale Vorgaben werden maschinell geprüft

<ol class="nr-flow" style="--steps:4"><li><span class="nr-flow-number">01</span><h2>Schema festlegen</h2><p>Pflichtfelder, Datentypen, erlaubte Werte und Längen definieren.</p></li><li><span class="nr-flow-number">02</span><h2>Antwort erzeugen</h2><p>Die Anwendung übergibt das Schema an <code>completeStructured()</code>.</p></li><li><span class="nr-flow-number">03</span><h2>Lokal prüfen</h2><p>nr-llm prüft die Antwort gegen das unterstützte Schema.</p></li><li><span class="nr-flow-number">04</span><h2>Nur bei Fehlern</h2><p>Ein Reparaturversuch; danach gültiges Ergebnis oder Fehler.</p></li></ol><p class="nr-flow-note">Prüfbeispiel: erlaubte Statuswerte und höchstens 160 Zeichen für die Beschreibung.</p>



<p class="nr-takeaway">Ein gültiges Format belegt noch keine korrekte Aussage.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="pruefbeispiel/index.html" print-href="https://netresearch.github.io/modularer-ki-stack-page/vortraege/tmuc-2026-11-09/pruefbeispiel/index.html">Ausgeführtes Prüfbeispiel</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Feature/CompletionService.php#L105-L165">Funktionsweise und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Qualität wird an Beispielaufgaben gemessen"
---
<div class="nr-kicker">Reserve · Entscheidung · nr-llm v0.35.0</div>

# Qualität wird an Beispielaufgaben gemessen

<ol class="nr-flow" style="--steps:3"><li><span class="nr-flow-number">01</span><h2>Testfälle festlegen</h2><p>Typische Aufgaben, erwartete Aussagen und Referenzantworten sammeln.</p></li><li><span class="nr-flow-number">02</span><h2>Antworten bewerten</h2><p>Feste Regeln prüfen; optional bewertet ein weiteres Modell.</p></li><li><span class="nr-flow-number">03</span><h2>Läufe vergleichen</h2><p>Bestehensquote und Bewertungen machen Verschlechterungen sichtbar.</p></li></ol><p class="nr-flow-note">Beispiel: Enthält die Antwort die belegten Öffnungszeiten und das erwartete Format?</p>



<p class="nr-takeaway">Ein eigener Testlauf prüft Beispiele. Die Redaktion prüft den konkreten Entwurf.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Developer/QualityEvaluation.rst#L9-L150">Funktionsweise und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Skills werden als Prompt-Kontext eingebunden"
---
<div class="nr-kicker">Reserve · Entwicklung · nr-llm v0.35.0</div>

# Skills werden als Prompt-Kontext eingebunden

<ol class="nr-flow" style="--steps:4"><li><span class="nr-flow-number">01</span><h2>Quelle laden</h2><p>SKILL.md aus GitHub synchronisieren; den Commit festhalten.</p></li><li><span class="nr-flow-number">02</span><h2>Inhalt freigeben</h2><p>Administratoren prüfen und aktivieren die gewünschten Skills.</p></li><li><span class="nr-flow-number">03</span><h2>Aufgabe zuordnen</h2><p>Skills an Konfiguration und gegebenenfalls Aufgabe anhängen.</p></li><li><span class="nr-flow-number">04</span><h2>Text einfügen</h2><p>Geprüften Skill-Text vor dem Modellaufruf in den User-Prompt einfügen.</p></li></ol><p class="nr-flow-note">Beispiel: Gemeinsame Sprachregeln in der Konfiguration, Zusatzregeln an der Aufgabe.</p>



<p class="nr-takeaway">Skill-Text liefert Kontext. Zugehörige Skripte und Dateien werden nicht ausgeführt oder nachgeladen.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Skills.rst#L8-L226">Funktionsweise und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "MCP verbindet den Agenten mit Werkzeugen"
---
<div class="nr-kicker">Reserve · Integration · nr-llm v0.35.0</div>

# MCP verbindet den Agenten mit Werkzeugen

<ol class="nr-flow" style="--steps:4"><li><span class="nr-flow-number">01</span><h2>Modell schlägt vor</h2><p>Wählt ein angebotenes Werkzeug und formuliert seine Argumente.</p></li><li><span class="nr-flow-number">02</span><h2>nr-llm prüft</h2><p>Nur Backend-Administratoren; zusätzliche Rechte und Freigaben begrenzen den Aufruf.</p></li><li><span class="nr-flow-number">03</span><h2>MCP-Client ruft auf</h2><p>Sendet den Werkzeugaufruf per HTTP an den externen Server.</p></li><li><span class="nr-flow-number">04</span><h2>Ergebnis fließt zurück</h2><p>Textresultat oder Fehler wird Kontext für den nächsten Modellschritt.</p></li></ol><p class="nr-flow-note">Vorher: Server konfigurieren, Werkzeugkatalog importieren und einzelne Werkzeuge aktivieren.</p>



<p class="nr-takeaway">In diesem Ablauf ist TYPO3 der MCP-Client. Der externe Server führt das Werkzeug aus.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/McpServers.rst#L8-L142">Funktionsweise und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Ein Agent arbeitet in einer begrenzten Schleife"
---
<div class="nr-kicker">Reserve · Entwicklung · nr-llm v0.35.0</div>

# Ein Agent arbeitet in einer begrenzten Schleife

<ol class="nr-flow" style="--steps:5"><li><span class="nr-flow-number">01</span><h2>Auftrag</h2><p>Ziel, Konfiguration, Skills und erlaubte Werkzeuge zusammenstellen.</p></li><li><span class="nr-flow-number">02</span><h2>Modell</h2><p>Antwortet direkt oder schlägt einen Werkzeugaufruf vor.</p></li><li><span class="nr-flow-number">03</span><h2>Freigabe</h2><p>Bei freigabepflichtigen Aufrufen pausieren und Entscheidung abwarten.</p></li><li><span class="nr-flow-number">04</span><h2>Werkzeug</h2><p>Zulässigen Aufruf ausführen und Ergebnis zum Verlauf ergänzen.</p></li><li><span class="nr-flow-number">05</span><h2>Nächste Runde</h2><p>Modell erhält das Ergebnis und bestimmt den nächsten Schritt.</p></li></ol><p class="nr-flow-note">↶ Das Werkzeugergebnis geht zurück an die Modellentscheidung – bis zur Antwort oder einer Grenze.</p>



<p class="nr-takeaway">Das Modell schlägt Schritte vor; nr-llm steuert Ausführung, Pausen und Grenzen.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Tool/ToolLoopService.php#L330-L522">Funktionsweise und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Wie bindet eine eigene Extension nr-llm ein?"
---
<div class="nr-kicker">Entwicklerfragen · nr-llm v0.35.0</div>

# Wie bindet eine eigene Extension nr-llm ein?

<ol class="nr-flow" style="--steps:4"><li><span class="nr-flow-number">01</span><h2>Service injizieren</h2><p>Passendes nr-llm-Interface über TYPO3 Dependency Injection verwenden.</p></li><li><span class="nr-flow-number">02</span><h2>Aufruf vorbereiten</h2><p>Eingaben, Berechtigungen und die gewünschte Konfiguration bestimmen.</p></li><li><span class="nr-flow-number">03</span><h2>Ergebnis anfordern</h2><p>Direkter Feature-Service oder wiederkehrender Task mit Prompt-Vorlage.</p></li><li><span class="nr-flow-number">04</span><h2>Ergebnis verarbeiten</h2><p>Fehler behandeln, Ausgabe prüfen und fachliche Freigabe umsetzen.</p></li></ol><p class="nr-flow-note">Beispiel: completeForConfiguration($prompt, $configuration) liefert eine CompletionResponse.</p>



<p class="nr-takeaway">nr-llm übernimmt die Modellanbindung. Die Extension gestaltet den fachlichen Ablauf.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Feature/CompletionServiceInterface.php#L17-L98">Schnittstellen und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Woher kommen Kontext und Wissen?"
---
<div class="nr-kicker">Entwicklerfragen · nr-llm v0.35.0</div>

# Woher kommen Kontext und Wissen?

<div class="nr-columns nr-columns-3"><section><h2>Mitgegeben</h2><p>Prompt, aktuelle Inhalte und Skilltexte kommen aus der Anwendung.</p></section><section><h2>Nachgeschlagen</h2><p>Suchwerkzeuge liefern Auszüge mit Quellen aus vorhandenen TYPO3-Suchen.</p></section><section><h2>Separat gepflegt</h2><p>Indexaktualisierung und dauerhafte Vektorsuche bleiben eigene Integrationsaufgaben.</p></section></div>



<p class="nr-takeaway">Das Modell sieht bereitgestellte oder abgerufene Quellen – keinen automatischen Wissensbestand.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Tool/Builtin/SiteRagQueryTool.php#L26-L110">Schnittstellen und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Was passiert bei Fehlern oder zu viel Kontext?"
---
<div class="nr-kicker">Entwicklerfragen · nr-llm v0.35.0</div>

# Was passiert bei Fehlern oder zu viel Kontext?

<div class="nr-columns nr-columns-3"><section><h2>Verbindung gestört</h2><p>Begrenzt erneut versuchen; je nach Fehler eine konfigurierte Ersatzverbindung nutzen.</p></section><section><h2>Zugriff falsch</h2><p>Authentifizierung und Konfiguration korrigieren; Fehler an die Anwendung melden.</p></section><section><h2>Kontext zu groß</h2><p>Alte Chat-Runden können entfallen. Einen Einzelprompt muss die Anwendung passend aufteilen.</p></section></div>



<p class="nr-takeaway">Die Anwendung braucht einen Fehlerpfad; Wiederholung und Fallback lösen nicht jedes Problem.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Provider/AbstractProvider.php#L346-L406">Schnittstellen und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Ein Modellwechsel braucht einen Eignungstest"
---
<div class="nr-kicker">Reserve · Integration · nr-llm v0.35.0</div>

# Ein Modellwechsel braucht einen Eignungstest

<div class="nr-columns nr-columns-3"><section><h2>Anbindung wechseln</h2><p>Die Anwendung nutzt eine benannte Konfiguration. Dahinter lassen sich Modell und Anbieter ändern.</p></section><section><h2>Eignung prüfen</h2><p>Benötigte Fähigkeiten, Kontextgröße und Parameter prüfen; typische Aufgaben erneut testen.</p></section><section><h2>Rückfall erproben</h2><p>Ersatzkonfigurationen bei Ausfällen testen. Datenziel, Qualität und Kosten jedes Ersatzes prüfen.</p></section></div>



<p class="nr-takeaway">Eine gemeinsame Schnittstelle macht Modelle nicht fachlich austauschbar.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Models.rst#L76-L175">Modellwahl und Fähigkeiten</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Provider/Middleware/FallbackMiddleware.php#L85-L118">Rückfall im Quellcode</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Werkzeugzugriff braucht mehrere Freigaben"
---
<div class="nr-kicker">Reserve · Integration · nr-llm v0.35.0</div>

# Werkzeugzugriff braucht mehrere Freigaben

<ol class="nr-flow" style="--steps:4"><li><span class="nr-flow-number">01</span><h2>Werkzeug aktivieren</h2><p>Gruppe und einzelnes Werkzeug zentral freischalten.</p></li><li><span class="nr-flow-number">02</span><h2>Aufgabe begrenzen</h2><p>Werkzeuggruppen je Konfiguration und Lauf einschränken.</p></li><li><span class="nr-flow-number">03</span><h2>Nutzerrechte prüfen</h2><p>Je Werkzeug: Adminpflicht oder konkrete TYPO3-Rechte prüfen.</p></li><li><span class="nr-flow-number">04</span><h2>Änderung bestätigen</h2><p>Bei den eingebauten Schreibwerkzeugen die geplante Änderung vorab freigeben.</p></li></ol><p class="nr-flow-note">Prüfbeispiel: Redaktion darf einen Seitentitel ändern, aber keine Systemdaten auslesen.</p>



<p class="nr-takeaway">Eine Zustimmung ersetzt weder TYPO3-Rechte noch die erlaubte Werkzeugauswahl.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Tool/ToolCallPolicy.php#L52-L99">Werkzeugrechte im Quellcode</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Tools.rst#L287-L315">Schreibrechte und Freigaben</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Betrieb braucht Messwerte und Löschroutinen"
---
<div class="nr-kicker">Reserve · Integration · nr-llm v0.35.0</div>

# Betrieb braucht Messwerte und Löschroutinen

<div class="nr-columns nr-columns-3"><section><h2>Nutzung auswerten</h2><p>Anfragen, Tokens und geschätzte Kosten nach Anbieter, Modell und Nutzer ansehen.</p></section><section><h2>Läufe nachvollziehen</h2><p>Metadaten zu Status, Schritten, Modellaufrufen und Entscheidungen in der Run-Timeline prüfen.</p></section><section><h2>Aufbewahrung betreiben</h2><p>Speicherumfang und Fristen wählen. Den Löschlauf regelmäßig ausführen lassen.</p></section></div>



<p class="nr-takeaway">Kosten sind Schätzungen. Eine Löschfrist wirkt erst durch einen geplanten Löschlauf.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/AgentRuns.rst#L78-L112">Run-Timeline und Grenzen</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/DataRetention.rst#L15-L114">Aufbewahrung und Löschlauf</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Wann lohnt sich eine gemeinsame KI-Grundlage?"
---
<div class="nr-kicker">Entscheidung · Kriterien für einen Pilot</div>

# Wann lohnt sich eine gemeinsame KI-Grundlage?

<div class="nr-columns nr-columns-3"><section><h2>Wiederkehrende Arbeit</h2><p>Eine konkrete Aufgabe fällt regelmäßig an. Inhalte und Arbeitsablauf liegen bereits in TYPO3.</p></section><section><h2>Gemeinsame Steuerung</h2><p>Mehrere Anwendungen brauchen dieselben Anbieter, Modelle, Budgets oder Freigaberegeln.</p></section><section><h2>Messbarer Nutzen</h2><p>Im Pilot Zeit inklusive Nacharbeit, Ergebnisqualität und laufende Kosten mit dem bisherigen Ablauf vergleichen.</p></section></div>



<p class="nr-takeaway">Einführen, wenn der gemessene Nutzen Integration und Betrieb rechtfertigt.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://netresearch.github.io/modularer-ki-stack-page/">Module und Voraussetzungen vergleichen</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Wie begrenzen wir Kosten?"
---
<div class="nr-kicker">Entscheidung · Funktionen im Demo-Quellstand v0.35.0</div>

# Wie begrenzen wir Kosten?

<div class="nr-columns nr-columns-3"><section><h2>Vor dem Aufruf</h2><p>nr-llm prüft konfigurierte Nutzer- und Konfigurationslimits. Übergebene Plankosten fließen in die Prüfung ein.</p></section><section><h2>Nach dem Aufruf</h2><p>nr-llm erfasst die gemeldete Nutzung. Geschätzte Kosten stammen aus der Antwort oder den Modellpreisen.</p></section><section><h2>Im Betrieb ergänzen</h2><p>Preise und Anbieterrechnung abgleichen. Für eine harte Kostengrenze zusätzlich eine Reservierung oder Sperre einplanen.</p></section></div>



<p class="nr-takeaway">Parallele Aufrufe können das Budget überschreiten. Die Vorabprüfung garantiert keine harte Kostengrenze.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/UserBudgets.rst">Budgets und ihre Grenzen</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Was muss vor dem produktiven Einsatz geklärt sein?"
---
<div class="nr-kicker">Entscheidung · Einführungsempfehlung</div>

# Was muss vor dem produktiven Einsatz geklärt sein?

<div class="nr-columns nr-columns-4"><section><h2>Datenfluss</h2><p>Welche Daten gehen wohin? Anbieter, Region und Aufbewahrung für Modell, Ersatzpfad und Werkzeuge festlegen.</p></section><section><h2>Rechte und Freigabe</h2><p>Wer darf lesen, schreiben und veröffentlichen? Zuständige Person und Freigabeschritt je Ablauf benennen.</p></section><section><h2>Qualität</h2><p>Typische Aufgaben und kritische Fehler testen. Vorab festlegen, welche Ergebnisse Menschen prüfen müssen.</p></section><section><h2>Betrieb</h2><p>Verantwortung für Kosten, Protokolle und Updates zuweisen. Abschaltung und Ablauf bei Ausfall festlegen.</p></section></div>



<p class="nr-takeaway">Produktiv starten, wenn Datenwege, Freigaben, Qualitätsmaßstab und Betriebsverantwortung feststehen.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://netresearch.github.io/modularer-ki-stack-page/">Datenflüsse und Verantwortung im Überblick</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide nr-foundation-comparison
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Welche gemeinsame KI-Schicht passt zur Integration?"
---

<div class="nr-kicker">Reserve · Gemeinsame Dienste mit unterschiedlichen Schwerpunkten</div>

# Welche gemeinsame KI-Schicht passt zur Integration?

<table class="nr-foundation-table"><thead><tr><th>Grundlage</th><th>Schwerpunkt</th><th>Für die Auswahl prüfen</th></tr></thead><tbody>
<tr><td><NrLink href="https://github.com/netresearch/t3x-nr-llm">Netresearch nr-llm</NrLink></td><td>Dienste, Konfigurationen, Tasks und Werkzeuge</td><td>Passende API und Regeln für die eigene Anwendung</td></tr>
<tr><td><NrLink href="https://github.com/b13/aim">b13 AiM · Alpha</NrLink></td><td>KI-Proxy, Routing und Regeln; Symfony-AI-Bridges</td><td>Benötigte Bridges und Änderungen der Alpha-API</td></tr>
<tr><td><NrLink href="https://docs.typo3.org/p/nitsan/ns-t3af/main/en-us/DeveloperGuide/ExtensionIntegration/Index.html">T3Planet AI Foundation</NrLink></td><td>Service-API, Provider, Prompts, Kontext und MCP</td><td>Integration der eigenen Extension und Betriebsmodell</td></tr>
<tr><td><NrLink href="https://www.louis.info/leistungen/technologien/typo3-extensions/">LIA Middleware AI</NrLink></td><td>Zentrale KI-Anbindung für Extensions und Eigenentwicklungen</td><td>Kommerziell; API und Lizenz beim Hersteller klären</td></tr>
<tr><td><NrLink href="https://docs.typo3.org/p/madj2k/t3-ai-assistant/main/en-us/Introduction/ArchitectureOverview.html">Madj2k AI Core + AI Assistant</NrLink></td><td>PHP-Kern und TYPO3-Integration für Assistenz, Pipelines und RAG</td><td>Passung zum eigenen Such- oder Assistenzablauf</td></tr>
</tbody></table>

<p class="nr-takeaway">An einer konkreten Aufgabe vergleichen: Schnittstelle, Datenweg, Rechte, Kosten und Wartung.</p>
<div class="nr-controls"><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>

---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "MCP-Server: welcher Zugang zu TYPO3?"
---
<div class="nr-kicker">Reserve · Integration · öffentlich geprüfte Projektquellen</div>

# MCP-Server: welcher Zugang zu TYPO3?

<div class="nr-columns nr-columns-3"><section><h2>hauptsache.net</h2><p>Eigenständiger Server.<br>Datensätze über Workspaces bearbeiten; eigene PHP-Werkzeuge ergänzen.</p></section><section><h2>Marek Skopal</h2><p>Eigenständiger Server.<br>Direkte Verwaltung als Hauptmodus; Workspaces optional und TCA-Werkzeuge erweiterbar.</p></section><section><h2>AutoDudes MCP</h2><p>Zusatz zur AI Suite.<br>TYPO3-Inhalte und ausgewählte KI-Funktionen über die Dienste und Rechte der Suite anbieten.</p></section></div>



<p class="nr-takeaway">MCP gibt Assistenten Werkzeugzugriff. KI-Anbindung, Rechte und Freigaben bleiben eigene Entscheidungen.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/hauptsacheNet/typo3-mcp-server">hauptsache.net · MCP-Server</NrLink><NrLink href="https://github.com/marekskopal/typo3-mcp-server">Marek Skopal · MCP-Server</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 27
talkTotal: 27
appendix: "technical"
title: "Welche Grundlagen gibt es für eigene Wissenssuche?"
---
<div class="nr-kicker">Reserve · Entwicklung · Such- und RAG-Infrastruktur</div>

# Welche Grundlagen gibt es für eigene Wissenssuche?

<div class="nr-columns nr-columns-3"><section><h2>EXT:index</h2><p>Indexierungsframework für TYPO3-Inhalte: Aufbereitung und Weitergabe über Ereignisse oder Webhooks.</p></section><section><h2>SEAL + seal_ai</h2><p>Suchabstraktion, Embeddings und Vektorspeicher; optional lesender MCP-Suchzugang. seal_ai: Proof of Concept.</p></section><section><h2>smart_search</h2><p>Dienste für Vektoren, semantische Suche und RAG in eigenen Extensions. Als Alpha gekennzeichnet.</p></section></div>



<p class="nr-takeaway">Diese Bausteine kümmern sich um Wissenszugriff. Eine KI-Schicht allein pflegt noch keinen Suchindex.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/lochmueller/index">Indexierungsframework</NrLink><NrLink href="https://github.com/lochmueller/seal_ai">SEAL / Symfony AI</NrLink><NrLink href="https://github.com/boehmmatthias/smart-search">RAG-Bausteine</NrLink></div><div class="nr-jump-links"><NrJump :page="30">Themenübersicht</NrJump><NrJump :page="27">Zur Diskussion</NrJump></div></div>
