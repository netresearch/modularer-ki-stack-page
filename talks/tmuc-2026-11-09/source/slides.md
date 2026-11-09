---
theme: default
layout: nr
class: nr-cover
section: 0
sectionTitle: "Auftakt"
sectionDivider: false
talkPage: 1
talkTotal: 35
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
section: 0
sectionTitle: "Auftakt"
sectionDivider: false
talkPage: 2
talkTotal: 35
appendix: ""
title: "Was euch heute erwartet"
---
<div class="nr-kicker">45 Minuten · Vom Beispiel zum eigenen Einsatz</div>

# Was euch heute erwartet

<ul class="nr-points"><li><NrJump :page="3" quiet><span class="nr-number">01</span><span>Möglichkeiten: fünf Anwendungen erleben</span></NrJump></li><li><NrJump :page="10" quiet><span class="nr-number">02</span><span>Fragen zum KI-Einsatz: Qualität, Aufwand, Daten und Verantwortung</span></NrJump></li><li><NrJump :page="13" quiet><span class="nr-number">03</span><span>Antworten und Grenzen: am Beispiel nr-llm</span></NrJump></li><li><NrJump :page="29" quiet><span class="nr-number">04</span><span>Agentenwege: intern und extern vergleichen</span></NrJump></li><li><NrJump :page="32" quiet><span class="nr-number">05</span><span>Einordnung: andere Grundlagen und Austausch</span></NrJump></li></ul>

<div class="nr-controls"></div>


---
layout: nr
class: nr-section-divider
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: true
talkPage: 3
talkTotal: 35
appendix: ""
title: "Was ist mit KI in TYPO3 möglich?"
---
<div class="nr-section-number" aria-label="Abschnitt 1">01</div>

# Was ist mit KI in TYPO3 möglich?


---
layout: nr
class: nr-screen-slide nr-editor-slide
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 4
talkTotal: 35
appendix: ""
title: "KI direkt beim Bearbeiten nutzen"
---
<div class="nr-kicker">01 · Cowriter · Kurze Wege im Redaktionsalltag</div>

# KI direkt beim Bearbeiten nutzen

<div class="nr-editor-demos"><figure><h2>Im Editor</h2><NrImage focus="0% 0%" file="screens/cowriter-editor-light-2026-11-09.png" alt="KI-Werkzeuge in der Symbolleiste des Texteditors"/><figcaption>Die KI-Werkzeuge lassen sich direkt im Texteditor aufrufen.</figcaption><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/record/edit?edit%5Btt_content%5D%5B30%5D=edit">Editor öffnen</NrLink></div></figure><figure><h2>An Seitenfeldern</h2><NrImage focus="0% 0%" file="screens/cowriter-seo-light-2026-11-09.png" alt="Drei deutsche KI-Vorschläge für den SEO-Titel der Seite KI-Cowriter"/><figcaption>Für den SEO-Titel stehen mehrere Vorschläge zur Auswahl.</figcaption><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/record/edit?edit%5Bpages%5D%5B9102%5D=edit">Seitenfelder öffnen</NrLink></div></figure></div>


---
layout: nr
class: nr-screen-slide
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 5
talkTotal: 35
appendix: ""
title: "Antworten aus Website-Inhalten"
---
<div class="nr-kicker">02 · AI Search</div>

# Antworten aus Website-Inhalten

<div class="nr-demo"><figure><NrImage :zoom="2.28" focus="33% 86%" file="screens/04-ai-search-02-antwort-quellen.png" alt="Suchantwort mit einem Link zur verwendeten Website-Quelle"/><figcaption>Die Antwort verlinkt die verwendete Quelle zum Nachlesen.</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Antwort mit Quelle nachvollziehen</span></li><li><span class="nr-number">02</span><span>Quelltreffer öffnen</span></li><li><span class="nr-number">03</span><span>Zeigen, wenn die Quellen keine Antwort liefern</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/extensions/ai-search">AI Search · Vorschau</NrLink></div></div></div>


---
layout: nr
class: nr-screen-slide
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 6
talkTotal: 35
appendix: ""
title: "Ein Inhalt, mehrere Formate"
---
<div class="nr-kicker">03 · Repurpose</div>

# Ein Inhalt, mehrere Formate

<div class="nr-demo" style="grid-template-columns:minmax(0,700px) minmax(0,1fr)"><figure><NrImage focus="0% 0%" file="screens/repurpose-light-2026-11-09.png" alt="Repurpose-Auftrag mit Ausgangsquelle, angeforderten Formaten und Podcast-Artefakt"/><figcaption>Podcast und Schaubild nutzen dieselbe verlinkte Ausgangsquelle.</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Ausgangsquelle bleibt nachvollziehbar</span></li><li><span class="nr-number">02</span><span>Schaubild und Podcast als Ergebnisse</span></li><li><span class="nr-number">03</span><span>Jedes Artefakt einzeln prüfen</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/web/nr-repurpose">Repurpose öffnen</NrLink></div></div></div>


---
layout: nr
class: nr-screen-slide
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 7
talkTotal: 35
appendix: ""
title: "Mit TYPO3 sprechen und Aufgaben erledigen lassen"
---
<div class="nr-kicker">04 · Backend-Agent · Der Chat als Arbeitsoberfläche</div>

# Mit TYPO3 sprechen und Aufgaben erledigen lassen

<div class="nr-demo"><figure><NrImage style="height:324px" focus="0% 0%" file="screens/agent-chat-light-2026-11-09.png" alt="Chatverlauf mit einem Auftrag für einen Seitenentwurf und der Rückmeldung des Agenten"/><figcaption>Der Chat zeigt Auftrag und Rückmeldung zum Seitenentwurf.</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Fragen zu Inhalten in TYPO3 stellen</span></li><li><span class="nr-number">02</span><span>Änderungen in natürlicher Sprache beauftragen</span></li><li><span class="nr-number">03</span><span>Zum Beispiel einen Seitenentwurf anlegen lassen</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/nr/mcp/agent/chat/conversation">KI-Chat öffnen</NrLink></div></div></div>


---
layout: nr
class: nr-screen-slide
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 8
talkTotal: 35
appendix: ""
title: "Vom Briefing zum Seitenentwurf"
---
<div class="nr-kicker">05 · Landingpage</div>

# Vom Briefing zum Seitenentwurf

<div class="nr-editor-demos" style="--nr-pair-image-height:300px"><figure><h2>Im Backend</h2><NrImage focus="0% 0%" file="screens/landingpage-backend-light-2026-11-09.png" alt="Gespeicherte SEO-Felder des generierten Seitenentwurfs mit konkretem Datum und Ort"/><figcaption>Die erzeugten Seitenfelder bleiben im Backend bearbeitbar.</figcaption></figure><figure><h2>In der Vorschau</h2><NrImage :zoom="1.6" focus="50% 0%" file="screens/landingpage-preview-detail-2026-11-07.png" alt="Vorschau des oberen Seitenbereichs eines generierten Entwurfs"/><figcaption>Die Vorschau macht den Seitenentwurf redaktionell prüfbar.</figcaption></figure></div>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/?id=10114">Entwurf in Vorschau</NrLink></div></div>


---
layout: nr
class: nr-overview-slide
section: 1
sectionTitle: "Möglichkeiten"
sectionDivider: false
talkPage: 9
talkTotal: 35
appendix: ""
title: "Weitere Möglichkeiten in unserer Demo"
---
<div class="nr-kicker">Weitere Einsatzfälle · Redaktion, Betrieb und Integration</div>

# Weitere Möglichkeiten in unserer Demo

<dl class="nr-feature-overview">
<div><dt>Fehler analysieren</dt><dd>Logs im Chat untersuchen und mögliche Ursachen eingrenzen.</dd></div>
<div><dt>Im System recherchieren</dt><dd>Fragen zu Inhalten, Datensätzen und Konfiguration stellen.</dd></div>
<div><dt>Externe Systeme einbinden</dt><dd>Über MCP Informationen und Werkzeuge nutzen – etwa DeepWiki.</dd></div>
<div><dt>Bilder und Alttexte</dt><dd>Bilder erzeugen und Alttexte auf Deutsch und Englisch ergänzen.</dd></div>
<div><dt>Inhalte übersetzen</dt><dd>Auch ganze TYPO3-Datensätze in eine andere Sprache übertragen.</dd></div>
<div><dt>Formulare bedienen</dt><dd>Eine Wetterabfrage in natürlicher Sprache formulieren – mit Browser AI.</dd></div>
</dl>

<div class="nr-detail-links" aria-label="Demo und Quellen"><NrLink screen-only class="nr-jump" href="https://typo3-demo.netresearch.de/typo3/module/nr/mcp/agent/chat/conversation">KI-Chat</NrLink><NrLink screen-only class="nr-jump" href="https://github.com/netresearch/typo3-demo/blob/54656cc6a107af0f801c5cc1f51df300f9fc5eb4/data/seed-extensions.sql#L7933">MCP-Beispiel</NrLink><NrLink screen-only class="nr-jump" href="https://typo3-demo.netresearch.de/extensions/browser-ai-form-assistant">Formular-Demo</NrLink></div>


---
layout: nr
class: nr-section-divider
section: 2
sectionTitle: "Fragen zum KI-Einsatz"
sectionDivider: true
talkPage: 10
talkTotal: 35
appendix: ""
title: "Fragen zum KI-Einsatz"
---
<div class="nr-section-number" aria-label="Abschnitt 2">02</div>

# Fragen zum KI-Einsatz


---
layout: nr
class: nr-explanation-slide nr-question-focus-slide
section: 2
sectionTitle: "Fragen zum KI-Einsatz"
sectionDivider: false
talkPage: 11
talkTotal: 35
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
talkPage: 12
talkTotal: 35
appendix: ""
title: "Vier Felder für unsere Fragen"
---
<div class="nr-kicker">Fragen zum KI-Einsatz · Vier Felder für die Diskussion</div>

# Vier Felder für unsere Fragen

<div class="nr-question-grid">
<section><NrIcon name="quality"/><h2>Qualität</h2><p>Welche Fehler lassen sich automatisch erkennen? Was müssen Menschen prüfen?</p></section>
<section><NrIcon name="operations"/><h2>Aufwand und Betrieb</h2><p>Was müssen wir integrieren und betreiben? Was kostet das?</p></section>
<section><NrIcon name="data"/><h2>Daten und Vorgaben</h2><p>Welche Inhalte dürfen wohin? Welche rechtlichen und betrieblichen Vorgaben gelten?</p></section>
<section><NrIcon name="responsibility"/><h2>Kontrolle und Verantwortung</h2><p>Wer darf ändern, wer gibt frei und wer verantwortet das Ergebnis?</p></section>
</div>

<div class="nr-controls"></div>


---
layout: nr
class: nr-section-divider
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: true
talkPage: 13
talkTotal: 35
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
talkPage: 14
talkTotal: 35
appendix: ""
title: "Die KI-Anbindung in jeder Extension neu bauen?"
---
<div class="nr-kicker">Antworten · 1/8 Gemeinsame Basis</div>

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
talkPage: 15
talkTotal: 35
appendix: ""
title: "Modell wechseln, ohne die Anwendung neu zu bauen?"
---
<div class="nr-kicker">Antworten · 2/8 Fachfunktion und Technik trennen</div>

# Modell wechseln, ohne die Anwendung neu zu bauen?

<div class="nr-config-chain">
<section><span class="nr-step-label">Anwendung</span><h2>SEO-Text erzeugen</h2><p>Ruft eine benannte Konfiguration auf.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span>
<section class="nr-emphasis"><span class="nr-step-label">Konfiguration</span><h2>Vorgaben festlegen</h2><p>Vorgaben, Parameter und Modellwahl.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span>
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
talkPage: 16
talkTotal: 35
appendix: ""
title: "Wie verwenden Aufgaben dieselben Vorgaben?"
---
<div class="nr-kicker">Antworten · 3/8 Vorgaben wiederverwenden</div>

# Wie verwenden Aufgaben dieselben Vorgaben?

<div class="nr-rule-example">
<section class="nr-rule-task"><span class="nr-step-label">Beispielaufgabe</span><h2>Absatz kürzen</h2><p>Bei jedem Aufruf kommt ein anderer Text dazu.</p></section>
<section class="nr-rule-prompt"><span class="nr-step-label">Zentrale Anweisung in der Konfiguration</span><blockquote>Sprache beibehalten.<br>Keine neuen Fakten ergänzen.</blockquote><p>Gemeinsame Textbausteine ergänzen z. B. Tonalität oder Zielgruppe.</p></section>
</div>

<p class="nr-takeaway">Die Aufgabe verbindet Eingabe und Konfiguration; gemeinsame Anweisungen werden wiederverwendet.</p>
<p class="nr-limit">Eine Prompt-Anweisung ist noch kein Nachweis, dass das Ergebnis sie einhält.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/nrllm/configurations">Konfigurationen öffnen</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/Tasks.rst">Tasks: Eingabe und Konfiguration</NrLink></div></div>


---
layout: nr
class: nr-explanation-slide nr-overview-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 17
talkTotal: 35
appendix: ""
title: "Welche Bausteine machen Vorgaben wiederverwendbar?"
---
<div class="nr-kicker">Antworten · 3/8 Vorgaben wiederverwenden</div>

# Welche Bausteine machen Vorgaben wiederverwendbar?

<dl class="nr-feature-overview">
<div><dt>Konfigurationen</dt><dd>System-Anweisung und Modellparameter zentral festlegen.</dd></div>
<div><dt>Tasks</dt><dd>Eine Prompt-Vorlage mit Eingabe und Konfiguration verbinden.</dd></div>
<div><dt>Prompt-Snippets</dt><dd>Gemeinsame Vorgaben für Tonalität, Zielgruppe oder Format einbinden.</dd></div>
<div><dt>Skills</dt><dd>Wiederverwendbare Arbeitsanweisungen passend zur Aufgabe einbinden.</dd></div>
</dl>

<p class="nr-overview-limit">Gemeinsame Vorgaben müssen eingebunden sein; ihre Einhaltung bleibt zu prüfen.</p>
<p class="nr-project-decision">Im Projekt festlegen: Welche Vorgaben gelten gemeinsam, welche nur für einzelne Aufgaben?</p>
<div class="nr-detail-links" aria-label="Detailfolien im Anhang"><NrJump :page="41">Skills</NrJump></div>


---
layout: nr
class: nr-explanation-slide nr-context-flow-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 18
talkTotal: 35
appendix: ""
title: "Woher kennt die KI unsere Inhalte?"
---
<div class="nr-kicker">Antworten · 4/8 Informationen bereitstellen</div>

# Woher kennt die KI unsere Inhalte?

<div class="nr-context-flow">
<section><span class="nr-step-label">In TYPO3</span><h2>Benötigte Quelle</h2><p>Zum Beispiel der ausgewählte Absatz im Editor.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span>
<section class="nr-emphasis"><span class="nr-step-label">In der Anwendung</span><h2>Kontext zusammenstellen</h2><p>Den ausgewählten Absatz zum Auftrag hinzufügen.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span>
<section><span class="nr-step-label">Beim Modell</span><h2>Mit diesem Inhalt arbeiten</h2><p>Für die aktuelle Anfrage.</p></section>
</div>

<p class="nr-takeaway">Das Modell erhält den zusammengestellten Kontext, nicht automatisch das gesamte TYPO3.</p>
<p class="nr-limit">Eine Suche liefert gefundene Inhalte; ein Agent kann über erlaubte Werkzeuge weitere Informationen laden.</p>


<div class="nr-detail-links" aria-label="Detailfolien im Anhang"><NrJump :page="45">Kontext und Wissen</NrJump></div>


---
layout: nr
class: nr-explanation-slide nr-overview-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 19
talkTotal: 35
appendix: ""
title: "Wie erhält die KI passende Informationen?"
---
<div class="nr-kicker">Antworten · 4/8 Informationen bereitstellen</div>

# Wie erhält die KI passende Informationen?

<dl class="nr-feature-overview">
<div><dt>Ausgewählte Inhalte</dt><dd>Gezielt Absätze oder Datensätze aus der Anwendung mitgeben.</dd></div>
<div><dt>Wissenssuche</dt><dd>Quellenauszüge aus öffentlichen Website-Inhalten nachladen.</dd></div>
<div><dt>Lesende Werkzeuge</dt><dd>Bei Bedarf weitere Datensätze aus TYPO3 abrufen.</dd></div>
<div><dt>Externe Systeme (MCP)</dt><dd>Über freigeschaltete MCP-Werkzeuge externe Informationen abfragen.</dd></div>
</dl>

<p class="nr-overview-limit">Erreichbare Quellen hängen von Einbindung, Werkzeugfreischaltung und Rechten ab.</p>
<p class="nr-project-decision">Im Projekt festlegen: Welche Informationen braucht die Aufgabe, welche Zugriffe sind erlaubt?</p>
<div class="nr-detail-links" aria-label="Detailfolien im Anhang"><NrJump :page="45">Kontext und Wissen</NrJump><NrJump :page="55">Wissenssuche</NrJump><NrJump :page="42">MCP</NrJump><NrJump :page="48">Werkzeugrechte</NrJump></div>


---
layout: nr
class: nr-explanation-slide nr-quality-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 20
talkTotal: 35
appendix: ""
title: "Was lässt sich automatisch prüfen?"
---
<div class="nr-kicker">Antworten · 5/8 Ergebnisse prüfen</div>

# Was lässt sich automatisch prüfen?

<p class="nr-quality-context">Der Entwurf liegt vor. Stimmen Format und Aussagen?</p>

<div class="nr-quality-grid"><section><h2>Format prüfen</h2><p>Entspricht die Antwort der verlangten Struktur und Länge?</p><div class="nr-proof-result"><strong>Im Beispiel ausgeführt</strong><span>Eine erfundene Frist ist formal gültig.</span></div></section><section><h2>Aussagen abgleichen</h2><p>DecisionService: Ist der Anmeldeschluss im Briefing belegt?</p><div class="nr-proof-result"><strong>Zusätzliche Bewertung</strong><span>Auftrag, Entwurf und Quellen mitgeben.</span></div></section></div>

<p class="nr-takeaway">Form und Quellentreue getrennt prüfen; das Ergebnis fachlich freigeben.</p><p class="nr-limit">Hier ist nur das Schema ausgeführt. Die Anwendung muss die Quellenbewertung aufrufen; sie kann irren.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="pruefbeispiel/index.html" print-href="https://netresearch.github.io/modularer-ki-stack-page/vortraege/tmuc-2026-11-09/pruefbeispiel/index.html">Ausgeführtes Schema-Beispiel</NrLink></div>
<div class="nr-detail-links" aria-label="Detailfolien im Anhang"><NrJump :page="56">Wie Quellenprüfung ergänzt wird</NrJump></div></div>


---
layout: nr
class: nr-explanation-slide nr-overview-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 21
talkTotal: 35
appendix: ""
title: "Welche Prüfungen ergänzen sich?"
---
<div class="nr-kicker">Antworten · 5/8 Ergebnisse prüfen</div>

# Welche Prüfungen ergänzen sich?

<dl class="nr-feature-overview"><div><dt>Struktur prüfen</dt><dd>Struktur, Pflichtfelder und erlaubte Werte prüfen.</dd></div><div><dt>Begriffe prüfen</dt><dd>Konfigurationsgebundene Sperr- und Pflichtwörter prüfen.</dd></div><div><dt>Quellen bewerten</dt><dd>DecisionService: Entwürfe mit Quellen und Prüffragen bewerten.</dd></div><div><dt>Varianten vergleichen</dt><dd>Varianten an festen Beispielaufgaben vergleichen.</dd></div><div><dt>Fachlich freigeben</dt><dd>Menschen prüfen in der Anwendung das fertige Ergebnis.</dd></div></dl>

<p class="nr-overview-limit">Welche Prüfungen laufen, hängt von der Anwendung ab. Modellurteile und Stichproben können irren.</p>
<p class="nr-project-decision">Im Projekt festlegen: Was muss vor Verwendung oder Veröffentlichung ein Mensch prüfen?</p>
<div class="nr-detail-links" aria-label="Detailfolien im Anhang"><NrJump :page="39">Schema</NrJump><NrJump :page="60">Begriffe</NrJump><NrJump :page="56">Quellenprüfung</NrJump><NrJump :page="40">Evaluation</NrJump><NrJump :page="59">Anwendung</NrJump></div>


---
layout: nr
class: nr-screen-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 22
talkTotal: 35
appendix: ""
title: "Wie behalten wir Verbrauch und Kosten im Blick?"
---
<div class="nr-kicker">Antworten · 6/8 Aufwand und Kosten</div>

# Wie behalten wir Verbrauch und Kosten im Blick?

<div class="nr-demo"><figure><NrImage style="height:332px" focus="0% 0%" file="screens/analytics-light-2026-11-09.png" alt="Kostenübersicht mit Anfragen, Tokenverbrauch und geschätzten Kosten"/><figcaption>Die Übersicht zeigt Anfragen, Tokenverbrauch und geschätzte Kosten.</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Aufrufe und Tokens aufschlüsseln</span></li><li><span class="nr-number">02</span><span>Kosten anhand hinterlegter Preise schätzen</span></li><li><span class="nr-number">03</span><span>Konfigurierte Budgets vor weiteren Aufrufen prüfen</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/nrllm/analytics">Kostenübersicht öffnen</NrLink></div></div></div>

<div class="nr-detail-links" aria-label="Detailfolien im Anhang"><NrJump :page="51">Budgetgrenzen</NrJump></div>


---
layout: nr
class: nr-explanation-slide nr-overview-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 23
talkTotal: 35
appendix: ""
title: "Welche Dienste unterstützen den Betrieb?"
---
<div class="nr-kicker">Antworten · 6/8 Aufwand und Kosten</div>

# Welche Dienste unterstützen den Betrieb?

<dl class="nr-feature-overview"><div><dt>Anbindung teilen</dt><dd>Provider und Konfigurationen in mehreren Anwendungen nutzen.</dd></div><div><dt>Fehlerpause</dt><dd>Circuit Breaker: Nach wiederholten Anbieterfehlern vorübergehend abbrechen.</dd></div><div><dt>Ausweichziel</dt><dd>Fallback: Konfigurierte Ausweichziele bei geeigneten Fehlern versuchen.</dd></div><div><dt>Budgets prüfen</dt><dd>Konfigurierte Grenzen vor weiteren Anfragen prüfen.</dd></div><div><dt>Verbrauch auswerten</dt><dd>Aufrufe und Tokens erfassen; Kosten anhand hinterlegter Preise schätzen.</dd></div></dl>

<p class="nr-overview-limit">Parallele Aufrufe können Budgetgrenzen überschreiten. Kosten bleiben Schätzwerte.</p>
<p class="nr-project-decision">Im Pilot messen: Integration, laufende Betreuung, Ergebnisqualität und Nacharbeit.</p>
<div class="nr-detail-links" aria-label="Detailfolien im Anhang"><NrJump :page="44">Integration</NrJump><NrJump :page="61">Ausfälle</NrJump><NrJump :page="50">Nutzen und Aufwand</NrJump><NrJump :page="51">Budgets</NrJump></div>


---
layout: nr
class: nr-explanation-slide nr-code-gate-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 24
talkTotal: 35
appendix: ""
title: "Darf der Agent Quellcode an diesen Anbieter senden?"
---
<div class="nr-kicker">Antworten · 7/8 Daten schützen</div>

# Darf der Agent Quellcode an diesen Anbieter senden?

<p class="nr-code-task"><strong>Auftrag</strong> „Erkläre mir diese TYPO3-Klasse.“</p>
<div class="nr-code-gate"><section><span class="nr-step-label">Werkzeug</span><h2>Quellcode lesen</h2><p><code>read_source</code><br>greift auf Projektcode zu.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span><section class="nr-emphasis"><span class="nr-step-label">Datenklasse</span><h2>Quellcode</h2><p><code>sourceCode</code><br>ist am Werkzeug hinterlegt.</p></section><span class="nr-flow-arrow" aria-hidden="true">→</span><section><span class="nr-step-label">Provider-Zone</span><h2>Globaler Anbieter</h2><p><code>externalGlobal</code><br>ist dafür nicht zulässig.</p></section></div>
<p class="nr-code-result"><strong>STOPP</strong><span>Bei <b>enforce</b> wird der Werkzeugaufruf blockiert.<br>Das gilt auch für Administratoren.</span></p>
<p class="nr-code-limit">Beispiel: fest zugeordneter Provider, korrekt deklarierte Zone.<br>Freitext erhält nicht automatisch eine Datenklasse.</p>
<div class="nr-detail-links" aria-label="Detailfolien im Anhang"><NrJump :page="57">Datenklassen</NrJump><NrJump :page="58">Grenzen</NrJump><NrJump :page="48">Werkzeugrechte</NrJump></div>


---
layout: nr
class: nr-explanation-slide nr-overview-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 25
talkTotal: 35
appendix: ""
title: "Was schützt Daten zusätzlich?"
---
<div class="nr-kicker">Antworten · 7/8 Daten schützen</div>

# Was schützt Daten zusätzlich?

<dl class="nr-feature-overview"><div><dt>Schlüssel maskieren</dt><dd>Erkennbare Geheimnismuster in Prompt- und Antworttext ersetzen.</dd></div><div><dt>Zugänge schützen</dt><dd>nr-vault: API-Zugänge über geschützte Referenzen beziehen.</dd></div><div><dt>Web-Werkzeug absichern</dt><dd>Ziele und Weiterleitungen prüfen; standardmäßig Zustimmung verlangen.</dd></div><div><dt>Werkzeugzugriff begrenzen</dt><dd>Gruppen, einzelne Werkzeuge und Nutzerrechte einschränken.</dd></div><div><dt>Run-Protokolle begrenzen</dt><dd>Speicherumfang und Fristen wählen; Löschlauf einrichten.</dd></div></dl>

<p class="nr-overview-limit">Maskierung erkennt keine beliebigen sensiblen Inhalte. Toolargumente und Embeddings sind ausgenommen.</p>
<p class="nr-project-decision">Im Projekt klären: erlaubte Nutzung, Anbietervereinbarungen und Aufbewahrung.</p>
<div class="nr-detail-links" aria-label="Detailfolien im Anhang"><NrJump :page="57">Datenklassen</NrJump><NrJump :page="58">Grenzen</NrJump><NrJump :page="62">Geheimnisse</NrJump><NrJump :page="63">Web-Werkzeug</NrJump><NrJump :page="48">Werkzeugrechte</NrJump><NrJump :page="49">Aufbewahrung</NrJump></div>


---
layout: nr
class: nr-screen-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 26
talkTotal: 35
appendix: ""
title: "Wer darf Änderungen ausführen?"
---
<div class="nr-kicker">Antworten · 8/8 Kontrolle und Verantwortung</div>

# Wer darf Änderungen ausführen?

<div class="nr-demo"><figure><NrImage focus="0% 0%" file="screens/approval-seo-light-2026-11-09.png" alt="Freigabekarte für die geplante Änderung eines SEO-Titels durch den Agenten"/><figcaption>Der Agent legt die geplante Seitenänderung zur Freigabe vor.</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Lesende und schreibende Werkzeuge unterscheiden</span></li><li><span class="nr-number">02</span><span>Backend-Agent: konkrete Änderung vorab freigeben</span></li><li><span class="nr-number">03</span><span>Schreibende Standardwerkzeuge prüfen TYPO3-Rechte</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/nrllm/tools">Werkzeuge öffnen</NrLink></div></div></div>


---
layout: nr
class: nr-screen-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 27
talkTotal: 35
appendix: ""
title: "Was hat der Agent tatsächlich getan?"
---
<div class="nr-kicker">Antworten · 8/8 Kontrolle und Verantwortung</div>

# Was hat der Agent tatsächlich getan?

<div class="nr-demo"><figure><NrImage focus="0% 0%" file="screens/tool-trace-light-2026-11-09.png" alt="Aufgeklappter Verlauf der Modell- und Werkzeugaufrufe im KI-Chat"/><figcaption>Werkzeugaufrufe machen den Weg zur Antwort nachvollziehbar.</figcaption></figure><div class="nr-demo-copy"><ul class="nr-points"><li><span class="nr-number">01</span><span>Werkzeug, Argumente und Ergebnis ansehen</span></li><li><span class="nr-number">02</span><span>Freigaben und ausgeführte Schritte nachvollziehen</span></li><li><span class="nr-number">03</span><span>Aus Protokollen gezielt Fehler untersuchen</span></li></ul><div class="nr-action-links"><NrLink href="https://typo3-demo.netresearch.de/typo3/module/nr/mcp/agent/chat/conversation">KI-Chat öffnen</NrLink></div></div></div>


---
layout: nr
class: nr-explanation-slide nr-overview-slide
section: 3
sectionTitle: "Antworten und Grenzen"
sectionDivider: false
talkPage: 28
talkTotal: 35
appendix: ""
title: "Welche Sicherungen ergänzen die Freigabe?"
---
<div class="nr-kicker">Antworten · 8/8 Kontrolle und Verantwortung</div>

# Welche Sicherungen ergänzen die Freigabe?

<dl class="nr-feature-overview"><div><dt>Rechte prüfen</dt><dd>Eingebaute Werkzeuge prüfen die Rechte des handelnden Nutzers.</dd></div><div><dt>Vieraugenfreigabe</dt><dd>Optional einen anderen Backend-Nutzer freigeben lassen.</dd></div><div><dt>Vorschau binden</dt><dd>Aufruf und angezeigte Werkzeugvorschau vor Ausführung erneut prüfen.</dd></div><div><dt>Freigabe protokollieren</dt><dd>Schreibfreigaben nur mit gespeichertem Freigabeereignis ausführen.</dd></div><div><dt>Eigene Regeln</dt><dd>Fachliche Bedingungen unmittelbar vor Werkzeugaufrufen prüfen.</dd></div></dl>

<p class="nr-overview-limit">Die Zustandsbindung braucht eine erfolgreiche Vorschau; eigene Regeln ergänzt die Anwendung.</p>
<p class="nr-project-decision">Im Projekt festlegen: Wer erlaubt Aktionen, prüft Ergebnisse und verantwortet die Veröffentlichung?</p>
<div class="nr-detail-links" aria-label="Detailfolien im Anhang"><NrJump :page="48">Werkzeugrechte</NrJump><NrJump :page="64">Freigaben</NrJump><NrJump :page="65">Eigene Regeln</NrJump><NrJump :page="49">Protokolle</NrJump><NrJump :page="52">Produktivstart</NrJump></div>


---
layout: nr
class: nr-section-divider
section: 4
sectionTitle: "Agentenwege"
sectionDivider: true
talkPage: 29
talkTotal: 35
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
talkPage: 30
talkTotal: 35
appendix: ""
title: "Wie kann ein Agent mit TYPO3 arbeiten?"
---
<div class="nr-kicker">Zwei Zugangswege im Vergleich</div>

# Wie kann ein Agent mit TYPO3 arbeiten?

<div class="nr-columns nr-columns-2"><section><h2>Im TYPO3-Backend</h2><p>Auftrag im Backend<br>↓ Agent in TYPO3<br>↓ TYPO3-Werkzeuge</p><p class="nr-limit">Für Arbeit direkt in TYPO3.</p></section><section><h2>Im eigenen Assistenten</h2><p>Auftrag im externen Assistenten<br>↓ Agent und TYPO3-MCP-Server<br>↓ TYPO3-Werkzeuge</p><p class="nr-limit">Für Abläufe im vorhandenen Assistenten.</p></section></div>

<p class="nr-takeaway">MCP standardisiert den Werkzeugzugriff.</p>
<p class="nr-limit">Welche Rechte und Freigaben greifen, hängt von Agent und MCP-Server ab.</p>

<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture">MCP-Architektur nachlesen</NrLink><NrLink href="https://github.com/hauptsacheNet/typo3-mcp-server">Beispiel: TYPO3 MCP Server</NrLink></div></div>


---
layout: nr
class: nr-flow-slide
section: 4
sectionTitle: "Agentenwege"
sectionDivider: false
talkPage: 31
talkTotal: 35
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
talkPage: 32
talkTotal: 35
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
talkPage: 33
talkTotal: 35
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


<div class="nr-detail-links" aria-label="Detailfolien im Anhang"><NrJump :page="53">KI-Schichten im Vergleich</NrJump><NrJump :page="54">MCP-Server im Vergleich</NrJump><NrJump :page="55">Such- und RAG-Grundlagen</NrJump></div>


---
layout: nr
class: nr-technical-slide nr-closing-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 34
talkTotal: 35
appendix: ""
title: "Vier Antworten für den eigenen Einstieg"
---
<div class="nr-kicker">Vom Vortrag ins eigene Projekt</div>

# Vier Antworten für den eigenen Einstieg

<div class="nr-columns nr-columns-4"><section><h2>Qualität</h2><p>Automatische Prüfungen und menschliche Freigabe kombinieren. Kriterien je Aufgabe festlegen.</p></section><section><h2>Aufwand und Betrieb</h2><p>Integration, Betrieb und Nacharbeit im Pilot messen. Tokenkosten sind nur ein Teil.</p></section><section><h2>Daten und Vorgaben</h2><p>Erlaubte Datenwege, Anbieter und Aufbewahrung festlegen. Technische Sperren gezielt nutzen.</p></section><section><h2>Kontrolle und Verantwortung</h2><p>Rechte und Freigaben festlegen. Verantwortliche für Ergebnis und Veröffentlichung benennen.</p></section></div>
<p class="nr-takeaway">Eine Aufgabe wählen, mit Beispielen prüfen und erst bei messbarem Nutzen erweitern.</p>



<div class="nr-controls"></div>


---
layout: nr
class: nr-text-slide nr-discussion
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: ""
title: "Welche Fragen sind noch offen?"
---
<div class="nr-kicker">Diskussion</div>

# Welche Fragen sind noch offen?



<ul class="nr-points"><li><span class="nr-number">01</span><span>Welche eurer gesammelten Fragen ist noch offen?</span></li><li><span class="nr-number">02</span><span>Wo bleiben Zweifel oder konkrete Hürden?</span></li><li><span class="nr-number">03</span><span>Welche Aufgabe würdet ihr als Erstes ausprobieren?</span></li></ul>



<div class="nr-detail-links" aria-label="Detailfolien im Anhang"><NrJump :page="38">Reservefolien für Rückfragen</NrJump><NrJump :page="36">Links &amp; Quellen</NrJump></div>


---
layout: nr
class: nr-resources-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "references"
title: "Links zu Demos und Anwendungen"
---
<div class="nr-kicker">Zum Ausprobieren und Nachlesen</div>

# Links zu Demos und Anwendungen

<div class="nr-resources"><section><h2>Präsentation und Demo</h2><ul class="nr-resource-links"><li><NrLink href="https://netresearch.github.io/modularer-ki-stack-page/vortraege/vorlage/">Aktuelle neutrale Präsentation</NrLink></li><li><NrLink href="https://github.com/netresearch/modularer-ki-stack-page/blob/main/talks/vorlage/QUELLEN.md#bildnachweise">Bildnachweise und Aufnahmedaten</NrLink></li><li><NrLink href="https://typo3-demo.netresearch.de/">Öffentliche TYPO3-Demo</NrLink></li><li><NrLink href="https://typo3-demo.netresearch.de/typo3/main">TYPO3-Backend · Anmeldung nötig</NrLink></li><li><NrLink href="https://typo3-demo.netresearch.de/extensions/ai-search">AI Search · Backend-Vorschau</NrLink></li><li><NrLink href="https://typo3-demo.netresearch.de/?id=10114">Landingpage-Entwurf · Backend-Vorschau</NrLink></li><li><NrLink href="https://www.netresearch.de/blog/ki-kennzeichnung-auf-websites-was-jetzt-wirklich-gekennzeichnet-werden-muss/">Ausgangsartikel des Repurpose-Beispiels</NrLink></li></ul></section><section><h2>Anwendungen und Beschreibungen</h2><ul class="nr-resource-links"><li><NrLink href="https://github.com/netresearch/t3x-cowriter">Cowriter</NrLink></li><li><NrLink href="https://typo3-demo.netresearch.de/extensions">AI Search · Demo-Übersicht</NrLink></li><li><NrLink href="https://github.com/netresearch/t3x-nr-repurpose">Repurpose</NrLink></li><li><NrLink href="https://github.com/netresearch/t3x-nr-mcp-agent">Backend-Agent</NrLink></li><li><NrLink href="https://github.com/netresearch/nr-landingpage">Landingpage</NrLink></li></ul></section></div><div class="nr-controls"></div>


---
layout: nr
class: nr-resources-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "references"
title: "Quellen zu KI-Grundlagen und MCP"
---
<div class="nr-kicker">Zum Vergleichen und Vertiefen</div>

# Quellen zu KI-Grundlagen und MCP

<div class="nr-resources"><section><h2>Technische Grundlage</h2><ul class="nr-resource-links"><li><NrLink href="https://netresearch.github.io/modularer-ki-stack-page/">Modularer KI-Stack · Module und Voraussetzungen</NrLink></li><li><NrLink href="https://github.com/netresearch/t3x-nr-llm">nr-llm · Projekt und Dokumentation</NrLink></li><li><NrLink href="https://github.com/netresearch/t3x-nr-llm/tree/5b6fca6de8d9593638486c0baca9424934bdc231">nr-llm 0.43.19 · geprüft am 6.11.2026</NrLink></li><li><NrLink href="https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture">MCP · Architektur von Client und Server</NrLink></li><li><NrLink href="https://a2a-protocol.org/latest/topics/a2a-and-mcp/">A2A und MCP · offizielle Einordnung</NrLink></li><li><NrLink href="https://symfony.com/doc/current/ai/components/platform.html">Symfony AI Platform · PHP-Unterbau</NrLink></li></ul></section><section><h2>KI-Schichten und MCP-Server</h2><ul class="nr-resource-links"><li><NrLink href="https://github.com/b13/aim">b13 AiM · TYPO3-KI-Schicht</NrLink></li><li><NrLink href="https://docs.typo3.org/p/nitsan/ns-t3af/main/en-us/Index.html">NITSAN / T3Planet · AI Foundation</NrLink></li><li><NrLink href="https://www.louis.info/leistungen/technologien/typo3-extensions/">LOUIS INTERNET · LIA Middleware AI</NrLink></li><li><NrLink href="https://docs.typo3.org/p/madj2k/t3-ai-assistant/main/en-us/Introduction/ArchitectureOverview.html">Madj2k AI Core + TYPO3 AI Assistant</NrLink></li><li><NrLink href="https://github.com/hauptsacheNet/typo3-mcp-server">hauptsache.net · TYPO3 MCP Server</NrLink></li><li><NrLink href="https://github.com/marekskopal/typo3-mcp-server">Marek Skopal · TYPO3 MCP Server</NrLink></li><li><NrLink href="https://github.com/autodudesde/ai-suite#mcp-server-optional-sub-extension">AutoDudes · AI Suite MCP (Zusatz)</NrLink></li></ul></section></div><div class="nr-controls"></div>


---
layout: nr
class: nr-reserve-index
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Rückfragen: die passende Erklärung öffnen"
---
<div class="nr-kicker">Reserve · nach Zielgruppe und Fragestellung</div>

# Rückfragen: die passende Erklärung öffnen

<div class="nr-reserve-menu"><section><h2>Entwicklung</h2><ul><li><NrJump :page="39" print-label>Formale Vorgaben</NrJump><span class="nr-reserve-page">37</span></li><li><NrJump :page="56" print-label>Quellenprüfung</NrJump><span class="nr-reserve-page">54</span></li><li><NrJump :page="60" print-label>Begriffslisten</NrJump><span class="nr-reserve-page">58</span></li><li><NrJump :page="41" print-label>Skills einbinden</NrJump><span class="nr-reserve-page">39</span></li><li><NrJump :page="44" print-label>Eigene Extension</NrJump><span class="nr-reserve-page">42</span></li><li><NrJump :page="45" print-label>Kontext und Wissen</NrJump><span class="nr-reserve-page">43</span></li><li><NrJump :page="47" print-label>Modellwechsel</NrJump><span class="nr-reserve-page">45</span></li><li><NrJump :page="55" print-label>Such- und RAG-Grundlagen</NrJump><span class="nr-reserve-page">53</span></li><li><NrJump :page="59" print-label>AI Search und Repurpose</NrJump><span class="nr-reserve-page">57</span></li></ul></section><section><h2>Integration</h2><ul><li><NrJump :page="42" print-label>MCP-Werkzeuge</NrJump><span class="nr-reserve-page">40</span></li><li><NrJump :page="46" print-label>Fehler und Kontextgrenzen</NrJump><span class="nr-reserve-page">44</span></li><li><NrJump :page="61" print-label>Circuit Breaker und Fallback</NrJump><span class="nr-reserve-page">59</span></li><li><NrJump :page="57" print-label>Datenklassen</NrJump><span class="nr-reserve-page">55</span></li><li><NrJump :page="58" print-label>Grenzen der Datenprüfung</NrJump><span class="nr-reserve-page">56</span></li><li><NrJump :page="62" print-label>Maskierung und Vault</NrJump><span class="nr-reserve-page">60</span></li><li><NrJump :page="63" print-label>Web-Werkzeug</NrJump><span class="nr-reserve-page">61</span></li><li><NrJump :page="49" print-label>Protokolle und Löschfristen</NrJump><span class="nr-reserve-page">47</span></li><li><NrJump :page="53" print-label>KI-Schichten vergleichen</NrJump><span class="nr-reserve-page">51</span></li></ul></section><section><h2>Entscheidung</h2><ul><li><NrJump :page="40" print-label>Qualität evaluieren</NrJump><span class="nr-reserve-page">38</span></li><li><NrJump :page="43" print-label>Agentenablauf</NrJump><span class="nr-reserve-page">41</span></li><li><NrJump :page="48" print-label>Werkzeugrechte</NrJump><span class="nr-reserve-page">46</span></li><li><NrJump :page="64" print-label>Gebundene Freigaben</NrJump><span class="nr-reserve-page">62</span></li><li><NrJump :page="65" print-label>Eigene Regeln</NrJump><span class="nr-reserve-page">63</span></li><li><NrJump :page="50" print-label>Nutzen und Aufwand</NrJump><span class="nr-reserve-page">48</span></li><li><NrJump :page="51" print-label>Kosten und Budgets</NrJump><span class="nr-reserve-page">49</span></li><li><NrJump :page="52" print-label>Produktivstart</NrJump><span class="nr-reserve-page">50</span></li><li><NrJump :page="54" print-label>MCP-Server vergleichen</NrJump><span class="nr-reserve-page">52</span></li></ul></section></div>



<div class="nr-controls"><div class="nr-jump-links"><NrJump :page="35" back>Zurück zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Formale Vorgaben werden maschinell geprüft"
---
<div class="nr-kicker">Reserve · Entwicklung · nr-llm v0.43.19</div>

# Formale Vorgaben werden maschinell geprüft

<ol class="nr-flow" style="--steps:4"><li><span class="nr-flow-number">01</span><h2>Schema festlegen</h2><p>Pflichtfelder, Datentypen, erlaubte Werte und Längen definieren.</p></li><li><span class="nr-flow-number">02</span><h2>Antwort erzeugen</h2><p>Die Anwendung übergibt das Schema an <code>completeStructured()</code>.</p></li><li><span class="nr-flow-number">03</span><h2>Lokal prüfen</h2><p>nr-llm prüft die Antwort gegen das unterstützte Schema.</p></li><li><span class="nr-flow-number">04</span><h2>Nur bei Fehlern</h2><p>Ein Reparaturversuch; danach gültiges Ergebnis oder Fehler.</p></li></ol><p class="nr-flow-note">Prüfbeispiel: erlaubte Statuswerte und höchstens 160 Zeichen für die Beschreibung.</p>



<p class="nr-takeaway">Ein gültiges Format belegt noch keine korrekte Aussage.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="pruefbeispiel/index.html" print-href="https://netresearch.github.io/modularer-ki-stack-page/vortraege/tmuc-2026-11-09/pruefbeispiel/index.html">Ausgeführtes Prüfbeispiel</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Feature/CompletionService.php">Funktionsweise und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Qualität wird an Beispielaufgaben gemessen"
---
<div class="nr-kicker">Reserve · Entscheidung · nr-llm v0.43.19</div>

# Qualität wird an Beispielaufgaben gemessen

<ol class="nr-flow" style="--steps:3"><li><span class="nr-flow-number">01</span><h2>Testfälle festlegen</h2><p>Typische Aufgaben, erwartete Aussagen und Referenzantworten sammeln.</p></li><li><span class="nr-flow-number">02</span><h2>Antworten bewerten</h2><p>Feste Regeln prüfen; optional bewertet der DecisionGrader über den DecisionService.</p></li><li><span class="nr-flow-number">03</span><h2>Läufe vergleichen</h2><p>Bestehensquote und Bewertungen machen Verschlechterungen sichtbar.</p></li></ol><p class="nr-flow-note">Beispiel: Enthält die Antwort die belegten Öffnungszeiten und das erwartete Format?</p>



<p class="nr-takeaway">Evaluationen laufen gesondert. Eine Prüfung im Arbeitsablauf muss die Anwendung zusätzlich einbinden.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Developer/QualityEvaluation.rst">Funktionsweise und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Skills werden als Prompt-Kontext eingebunden"
---
<div class="nr-kicker">Reserve · Entwicklung · nr-llm v0.43.19</div>

# Skills werden als Prompt-Kontext eingebunden

<ol class="nr-flow" style="--steps:4"><li><span class="nr-flow-number">01</span><h2>Quelle laden</h2><p>Skill im Backend pflegen oder aus GitHub synchronisieren; Version festhalten.</p></li><li><span class="nr-flow-number">02</span><h2>Inhalt freigeben</h2><p>Version und Herkunft prüfen; gewünschte Skills freigeben.</p></li><li><span class="nr-flow-number">03</span><h2>Aufgabe zuordnen</h2><p>Skills zuordnen oder freigegebene Skills bei Bedarf laden.</p></li><li><span class="nr-flow-number">04</span><h2>Text einfügen</h2><p>Freigegeben + vertrauenswürdig: Systemnachricht. Ungeprüfte Always-Skills: User-Kontext.</p></li></ol><p class="nr-flow-note">Auf Abruf zugeordnete Skills benötigen Freigabe; Prozessskills einen ausdrücklichen Aufruf.</p>



<p class="nr-takeaway">Skill-Text liefert Kontext. Zugehörige Skripte und Dateien werden nicht ausgeführt oder nachgeladen.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/Skills.rst">Funktionsweise und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "MCP verbindet den Agenten mit Werkzeugen"
---
<div class="nr-kicker">Reserve · Integration · nr-llm v0.43.19</div>

# MCP verbindet den Agenten mit Werkzeugen

<ol class="nr-flow" style="--steps:4"><li><span class="nr-flow-number">01</span><h2>Modell schlägt vor</h2><p>Wählt ein angebotenes Werkzeug und formuliert seine Argumente.</p></li><li><span class="nr-flow-number">02</span><h2>nr-llm prüft</h2><p>Nur Backend-Administratoren; zusätzliche Rechte und Freigaben begrenzen den Aufruf.</p></li><li><span class="nr-flow-number">03</span><h2>MCP-Client ruft auf</h2><p>Sendet den Werkzeugaufruf per HTTP an den externen Server.</p></li><li><span class="nr-flow-number">04</span><h2>Ergebnis fließt zurück</h2><p>Textresultat oder Fehler wird Kontext für den nächsten Modellschritt.</p></li></ol><p class="nr-flow-note">Vorher: Server konfigurieren, Werkzeugkatalog importieren und einzelne Werkzeuge aktivieren.</p>



<p class="nr-takeaway">In diesem Ablauf ist TYPO3 der MCP-Client. Der externe Server führt das Werkzeug aus.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/McpServers.rst">Funktionsweise und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Ein Agent arbeitet in einer begrenzten Schleife"
---
<div class="nr-kicker">Reserve · Entwicklung · nr-llm v0.43.19</div>

# Ein Agent arbeitet in einer begrenzten Schleife

<ol class="nr-flow" style="--steps:5"><li><span class="nr-flow-number">01</span><h2>Auftrag</h2><p>Ziel, Konfiguration, Skills und erlaubte Werkzeuge zusammenstellen.</p></li><li><span class="nr-flow-number">02</span><h2>Modell</h2><p>Antwortet direkt oder schlägt einen Werkzeugaufruf vor.</p></li><li><span class="nr-flow-number">03</span><h2>Freigabe</h2><p>Bei freigabepflichtigen Aufrufen pausieren und Entscheidung abwarten.</p></li><li><span class="nr-flow-number">04</span><h2>Werkzeug</h2><p>Zulässigen Aufruf ausführen und Ergebnis zum Verlauf ergänzen.</p></li><li><span class="nr-flow-number">05</span><h2>Nächste Runde</h2><p>Modell erhält das Ergebnis und bestimmt den nächsten Schritt.</p></li></ol><p class="nr-flow-note">↶ Das Werkzeugergebnis geht zurück an die Modellentscheidung – bis zur Antwort oder einer Grenze.</p>



<p class="nr-takeaway">Das Modell schlägt Schritte vor; nr-llm steuert Ausführung, Pausen und Grenzen.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Tool/ToolLoopService.php">Funktionsweise und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Wie bindet eine eigene Extension nr-llm ein?"
---
<div class="nr-kicker">Entwicklerfragen · nr-llm v0.43.19</div>

# Wie bindet eine eigene Extension nr-llm ein?

<ol class="nr-flow" style="--steps:4"><li><span class="nr-flow-number">01</span><h2>Service injizieren</h2><p>Passendes nr-llm-Interface über TYPO3 Dependency Injection verwenden.</p></li><li><span class="nr-flow-number">02</span><h2>Aufruf vorbereiten</h2><p>Eingaben, Berechtigungen und die gewünschte Konfiguration bestimmen.</p></li><li><span class="nr-flow-number">03</span><h2>Ergebnis anfordern</h2><p>Direkter Feature-Service oder wiederkehrender Task mit Prompt-Vorlage.</p></li><li><span class="nr-flow-number">04</span><h2>Ergebnis verarbeiten</h2><p>Fehler behandeln, Ausgabe prüfen und fachliche Freigabe umsetzen.</p></li></ol><p class="nr-flow-note">Beispiel: completeForConfiguration($prompt, $configuration) liefert eine CompletionResponse.</p>



<p class="nr-takeaway">nr-llm übernimmt die Modellanbindung. Die Extension gestaltet den fachlichen Ablauf.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Feature/CompletionServiceInterface.php">Schnittstellen und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Woher kommen Kontext und Wissen?"
---
<div class="nr-kicker">Entwicklerfragen · nr-llm v0.43.19</div>

# Woher kommen Kontext und Wissen?

<div class="nr-columns nr-columns-3"><section><h2>Mitgegeben</h2><p>Prompt, aktuelle Inhalte und Skilltexte kommen aus der Anwendung.</p></section><section><h2>Nachgeschlagen</h2><p>Suchwerkzeuge liefern Auszüge mit Quellen aus vorhandenen TYPO3-Suchen.</p></section><section><h2>Separat gepflegt</h2><p>Indexaktualisierung und dauerhafte Vektorsuche bleiben eigene Integrationsaufgaben.</p></section></div>



<p class="nr-takeaway">Das Modell sieht bereitgestellte oder abgerufene Quellen – keinen automatischen Wissensbestand.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Tool/Builtin/SiteRagQueryTool.php">Schnittstellen und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Was passiert bei Fehlern oder zu viel Kontext?"
---
<div class="nr-kicker">Entwicklerfragen · nr-llm v0.43.19</div>

# Was passiert bei Fehlern oder zu viel Kontext?

<div class="nr-columns nr-columns-3"><section><h2>Verbindung gestört</h2><p>Begrenzt erneut versuchen; je nach Fehler eine konfigurierte Ersatzverbindung nutzen.</p></section><section><h2>Zugriff falsch</h2><p>Authentifizierung und Konfiguration korrigieren; Fehler an die Anwendung melden.</p></section><section><h2>Kontext zu groß</h2><p>Alte Chat-Runden können entfallen. Einen Einzelprompt muss die Anwendung passend aufteilen.</p></section></div>



<p class="nr-takeaway">Die Anwendung braucht einen Fehlerpfad; Wiederholung und Fallback lösen nicht jedes Problem.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Provider/AbstractProvider.php">Schnittstellen und Quellbeleg</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Ein Modellwechsel braucht einen Eignungstest"
---
<div class="nr-kicker">Reserve · Integration · nr-llm v0.43.19</div>

# Ein Modellwechsel braucht einen Eignungstest

<div class="nr-columns nr-columns-3"><section><h2>Anbindung wechseln</h2><p>Die Anwendung nutzt eine benannte Konfiguration. Dahinter lassen sich Modell und Anbieter ändern.</p></section><section><h2>Eignung prüfen</h2><p>Benötigte Fähigkeiten, Kontextgröße und Parameter prüfen; typische Aufgaben erneut testen.</p></section><section><h2>Rückfall erproben</h2><p>Ersatzkonfigurationen bei Ausfällen testen. Datenziel, Qualität und Kosten jedes Ersatzes prüfen.</p></section></div>



<p class="nr-takeaway">Eine gemeinsame Schnittstelle macht Modelle nicht fachlich austauschbar.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/Models.rst">Modellwahl und Fähigkeiten</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Provider/Middleware/FallbackMiddleware.php">Rückfall im Quellcode</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Werkzeugzugriff braucht mehrere Freigaben"
---
<div class="nr-kicker">Reserve · Integration · nr-llm v0.43.19</div>

# Werkzeugzugriff braucht mehrere Freigaben

<ol class="nr-flow" style="--steps:4"><li><span class="nr-flow-number">01</span><h2>Werkzeug aktivieren</h2><p>Gruppe und einzelnes Werkzeug zentral freischalten.</p></li><li><span class="nr-flow-number">02</span><h2>Aufgabe begrenzen</h2><p>Gruppen je Konfiguration und Lauf begrenzen; einzelne Werkzeuge ausschließen.</p></li><li><span class="nr-flow-number">03</span><h2>Nutzerrechte prüfen</h2><p>Je Werkzeug: Adminpflicht oder konkrete TYPO3-Rechte prüfen.</p></li><li><span class="nr-flow-number">04</span><h2>Änderung bestätigen</h2><p>Bei den eingebauten Schreibwerkzeugen die geplante Änderung vorab freigeben.</p></li></ol><p class="nr-flow-note">Zusätzlich gelten Datenklasse und Provider-Zone: read_source wird bei externalGlobal + enforce gesperrt.</p>



<p class="nr-takeaway">Eine Zustimmung ersetzt weder Nutzerrechte noch Werkzeug- und Datengrenzen.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Tool/ToolCallPolicy.php">Werkzeugrechte im Quellcode</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/Tools.rst">Schreibrechte und Freigaben</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Betrieb braucht Messwerte und Löschroutinen"
---
<div class="nr-kicker">Reserve · Integration · nr-llm v0.43.19</div>

# Betrieb braucht Messwerte und Löschroutinen

<div class="nr-columns nr-columns-3"><section><h2>Nutzung auswerten</h2><p>Anfragen, Tokens und geschätzte Kosten nach Anbieter, Modell und Nutzer ansehen.</p></section><section><h2>Läufe nachvollziehen</h2><p>Metadaten zu Status, Schritten, Modellaufrufen und Entscheidungen in der Run-Timeline prüfen.</p></section><section><h2>Aufbewahrung betreiben</h2><p>Speicherumfang und Fristen wählen. Den Löschlauf regelmäßig ausführen lassen.</p></section></div>



<p class="nr-takeaway">Kosten sind Schätzungen. Eine Löschfrist wirkt erst durch einen geplanten Löschlauf.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/AgentRuns.rst">Run-Timeline und Grenzen</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/DataRetention.rst">Aufbewahrung und Löschlauf</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Wann lohnt sich eine gemeinsame KI-Grundlage?"
---
<div class="nr-kicker">Entscheidung · Kriterien für einen Pilot</div>

# Wann lohnt sich eine gemeinsame KI-Grundlage?

<div class="nr-columns nr-columns-3"><section><h2>Wiederkehrende Arbeit</h2><p>Eine konkrete Aufgabe fällt regelmäßig an. Inhalte und Arbeitsablauf liegen bereits in TYPO3.</p></section><section><h2>Gemeinsame Steuerung</h2><p>Mehrere Anwendungen brauchen dieselben Anbieter, Modelle, Budgets oder Freigaberegeln.</p></section><section><h2>Messbarer Nutzen</h2><p>Im Pilot Zeit inklusive Nacharbeit, Ergebnisqualität und laufende Kosten mit dem bisherigen Ablauf vergleichen.</p></section></div>



<p class="nr-takeaway">Einführen, wenn der gemessene Nutzen Integration und Betrieb rechtfertigt.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://netresearch.github.io/modularer-ki-stack-page/">Module und Voraussetzungen vergleichen</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Wie begrenzen wir Kosten?"
---
<div class="nr-kicker">Entscheidung · nr-llm v0.43.19 · geprüfte Funktionen</div>

# Wie begrenzen wir Kosten?

<div class="nr-columns nr-columns-3"><section><h2>Vor dem Aufruf</h2><p>nr-llm prüft konfigurierte Nutzer- und Konfigurationslimits. Übergebene Plankosten fließen in die Prüfung ein.</p></section><section><h2>Nach dem Aufruf</h2><p>nr-llm erfasst die gemeldete Nutzung. Geschätzte Kosten stammen aus der Antwort oder den Modellpreisen.</p></section><section><h2>Im Betrieb ergänzen</h2><p>Preise und Anbieterrechnung abgleichen. Für eine harte Kostengrenze zusätzlich eine Reservierung oder Sperre einplanen.</p></section></div>



<p class="nr-takeaway">Parallele Aufrufe können das Budget überschreiten. Die Vorabprüfung garantiert keine harte Kostengrenze.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/UserBudgets.rst">Budgets und ihre Grenzen</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Was muss vor dem produktiven Einsatz geklärt sein?"
---
<div class="nr-kicker">Entscheidung · Einführungsempfehlung</div>

# Was muss vor dem produktiven Einsatz geklärt sein?

<div class="nr-columns nr-columns-4"><section><h2>Datenfluss</h2><p>Welche Daten gehen wohin? Anbieter, Region und Aufbewahrung für Modell, Ersatzpfad und Werkzeuge festlegen.</p></section><section><h2>Rechte und Freigabe</h2><p>Wer darf lesen, schreiben und veröffentlichen? Zuständige Person und Freigabeschritt je Ablauf benennen.</p></section><section><h2>Qualität</h2><p>Typische Aufgaben und kritische Fehler testen. Vorab festlegen, welche Ergebnisse Menschen prüfen müssen.</p></section><section><h2>Betrieb</h2><p>Verantwortung für Kosten, Protokolle und Updates zuweisen. Abschaltung und Ablauf bei Ausfall festlegen.</p></section></div>



<p class="nr-takeaway">Produktiv starten, wenn Datenwege, Freigaben, Qualitätsmaßstab und Betriebsverantwortung feststehen.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://netresearch.github.io/modularer-ki-stack-page/">Datenflüsse und Verantwortung im Überblick</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide nr-foundation-comparison
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
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
<div class="nr-controls"><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "MCP-Server: welcher Zugang zu TYPO3?"
---
<div class="nr-kicker">Reserve · Integration · öffentlich geprüfte Projektquellen</div>

# MCP-Server: welcher Zugang zu TYPO3?

<div class="nr-columns nr-columns-3"><section><h2>hauptsache.net</h2><p>Eigenständiger Server.<br>Datensätze über Workspaces bearbeiten; eigene PHP-Werkzeuge ergänzen.</p></section><section><h2>Marek Skopal</h2><p>Eigenständiger Server.<br>Direkte Verwaltung als Hauptmodus; Workspaces optional und TCA-Werkzeuge erweiterbar.</p></section><section><h2>AutoDudes MCP</h2><p>Zusatz zur AI Suite.<br>TYPO3-Inhalte und ausgewählte KI-Funktionen über die Dienste und Rechte der Suite anbieten.</p></section></div>



<p class="nr-takeaway">MCP gibt Assistenten Werkzeugzugriff. KI-Anbindung, Rechte und Freigaben bleiben eigene Entscheidungen.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/hauptsacheNet/typo3-mcp-server">hauptsache.net · MCP-Server</NrLink><NrLink href="https://github.com/marekskopal/typo3-mcp-server">Marek Skopal · MCP-Server</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Welche Grundlagen gibt es für eigene Wissenssuche?"
---
<div class="nr-kicker">Reserve · Entwicklung · Such- und RAG-Infrastruktur</div>

# Welche Grundlagen gibt es für eigene Wissenssuche?

<div class="nr-columns nr-columns-3"><section><h2>EXT:index</h2><p>Indexierungsframework für TYPO3-Inhalte: Aufbereitung und Weitergabe über Ereignisse oder Webhooks.</p></section><section><h2>SEAL + seal_ai</h2><p>Suchabstraktion, Embeddings und Vektorspeicher; optional lesender MCP-Suchzugang. seal_ai: Proof of Concept.</p></section><section><h2>smart_search</h2><p>Dienste für Vektoren, semantische Suche und RAG in eigenen Extensions. Als Alpha gekennzeichnet.</p></section></div>



<p class="nr-takeaway">Diese Bausteine kümmern sich um Wissenszugriff. Eine KI-Schicht allein pflegt noch keinen Suchindex.</p><div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/lochmueller/index">Indexierungsframework</NrLink><NrLink href="https://github.com/lochmueller/seal_ai">SEAL / Symfony AI</NrLink><NrLink href="https://github.com/boehmmatthias/smart-search">RAG-Bausteine</NrLink></div><div class="nr-jump-links"><NrJump :page="38">Themenübersicht</NrJump><NrJump :page="35" back>Zur Diskussion</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Wie prüft nr-llm die Treue zur Quelle?"
---
<div class="nr-kicker">Reserve · nr-llm 0.43.19 · geprüft am 6.11.2026</div>

# Wie prüft nr-llm die Treue zur Quelle?

<ol class="nr-flow" style="--steps:3"><li><span class="nr-flow-number">01</span><h2>Anwendung liefert</h2><p>Auftrag, fertigen Entwurf und Originalquellen; dazu konkrete Prüffragen.</p></li><li><span class="nr-flow-number">02</span><h2>nr-llm bewertet</h2><p>Der DecisionService lässt ein Modell die Kriterien bewerten und liefert ein strukturiertes Ergebnis.</p></li><li><span class="nr-flow-number">03</span><h2>Anwendung entscheidet</h2><p>Schwellenwerte, Überarbeitung und menschliche Freigabe bleiben Teil des Arbeitsablaufs.</p></li></ol>
<p class="nr-flow-note">Beispiel: „Ist der 4. November in der Quelle belegt?“ Im Schema-Beispiel wurde diese Bewertung nicht ausgeführt.</p>
<p class="nr-takeaway">Seit 0.39 als allgemeiner Dienst verfügbar. Auch ein Prüfergebnis ist kein Wahrheitsbeweis.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Api/DecisionService.rst">DecisionService und Einbindung</NrLink></div><div class="nr-jump-links"><NrJump :page="59">AI Search und Repurpose</NrJump><NrJump :page="20" back>Zurück zur Qualitätsfrage</NrJump><NrJump :page="38">Themenübersicht</NrJump></div></div>


---
layout: nr
class: nr-technical-slide nr-policy-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Welche Daten dürfen zu welchem Anbieter?"
---
<div class="nr-kicker">Reserve · nr-llm 0.43.19 · geprüft am 6.11.2026</div>

# Welche Daten dürfen zu welchem Anbieter?

<table class="nr-policy-table"><thead><tr><th>Datenklasse</th><th>Global extern</th><th>EU extern</th><th>Privat gehostet</th><th>Lokal</th></tr></thead><tbody>
<tr><td>Öffentliche Inhalte</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Redaktionelle Inhalte</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Quellcode</td><td>Nein</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Interne Konfiguration</td><td>Nein</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Betriebsdaten / Logs</td><td>Nein</td><td>Nein</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Zugangsdatennahe Daten</td><td>Nein</td><td>Nein</td><td>Nein</td><td>Ja</td></tr>
</tbody></table>
<p class="nr-flow-note">Festgelegte Policy: read_source und search_code gehören zur Klasse sourceCode. Bei externalGlobal + enforce sind sie auch für Admins gesperrt.</p>
<p class="nr-limit">Der Modellname entscheidet nicht über die Zone. Lokaler Open-Source-Code wird dabei genauso eingestuft wie vertraulicher Projektcode.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Domain/Enum/TrustZone.php">Zonen und Zuordnung</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Tool/ToolDataClassResolver.php">Werkzeugklassen</NrLink></div><div class="nr-jump-links"><NrJump :page="58">Grenzen verstehen</NrJump><NrJump :page="24" back>Zurück zur Datenfrage</NrJump><NrJump :page="38">Themenübersicht</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Wo liegen die Grenzen der Datenprüfung?"
---
<div class="nr-kicker">Reserve · nr-llm 0.43.19 · geprüft am 6.11.2026</div>

# Wo liegen die Grenzen der Datenprüfung?

<div class="nr-columns nr-columns-3"><section><h2>Deklaration</h2><p>Freitext wird nicht automatisch klassifiziert. Falsche Angaben zu Datenklasse oder Provider-Zone werden nicht inhaltlich erkannt.</p></section><section><h2>Werkzeuge</h2><p>Eigene Deklaration vor Gruppenklasse; sonst strengste Klasse. MCP übernimmt die Serverklasse und erzwingt sie auch bei observe.</p></section><section><h2>Tatsächliches Ziel</h2><p>Fallbacks zählen mit. Bei dynamischer Modellwahl können manche Aufrufpfade für Prüfung und Versand getrennt wählen.</p></section></div>
<p class="nr-flow-note">Pfade mit übergebener ModelResolution, darunter der DecisionService, binden Prüfung und Versand an dieselbe Auflösung.</p>
<p class="nr-takeaway">Ohne gültige Datenklasse kein MCP-Import. Die Policy erkennt weder sensible Inhalte noch den tatsächlichen Datenstandort.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr149CriteriaModeZoneFromTheResolvedModel.rst">Dynamische Modellwahl</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Tool/Mcp/McpToolProvider.php">MCP-Klassifizierung</NrLink></div><div class="nr-jump-links"><NrJump :page="24" back>Zurück zur Datenfrage</NrJump><NrJump :page="38">Themenübersicht</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Wie nutzen Anwendungen die Quellenprüfung?"
---
<div class="nr-kicker">Reserve · nr-llm 0.43.19 · geprüft am 6.11.2026</div>

# Wie nutzen Anwendungen die Quellenprüfung?

<div class="nr-columns nr-columns-3"><section><h2>AI Search</h2><p>Eine Anti-Halluzinationsprüfung ist dokumentiert. Welchen nr-llm-Dienst sie intern aufruft, ist hier nicht verifiziert.</p></section><section><h2>Repurpose: Prüfpunkte</h2><p>PR 205: Briefing gegen das Original prüfen. Danach jeden fertigen Formattext erneut gegen das Original abgleichen.</p></section><section><h2>Repurpose: Ablauf</h2><p>Nach Kürzungen prüfen, vor Audio- und Medienproduktion. Automatische Bewertung getrennt von der redaktionellen Freigabe führen.</p></section></div>
<p class="nr-flow-note">Im veröffentlichten Repurpose 0.14.0 fehlt der semantische Quellenabgleich. PR 205 implementiert ihn, ist aber noch nicht zusammengeführt oder veröffentlicht.</p>
<p class="nr-takeaway">„Nicht geprüft“ und „Prüfung fehlgeschlagen“ dürfen nicht wie ein bestandenes Ergebnis erscheinen.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-repurpose/tree/09bc94e4deae0870b76671647b15cddf94998fb5">Repurpose 0.14.0 · geprüfter Stand</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-repurpose/pull/205">PR 205 · Implementierung</NrLink></div><div class="nr-jump-links"><NrJump :page="56">Bewertungsdienst</NrJump><NrJump :page="38">Themenübersicht</NrJump></div></div>

---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Was können Begriffslisten prüfen?"
---
<div class="nr-kicker">Reserve · Qualität · nr-llm 0.43.19</div>

# Was können Begriffslisten prüfen?

<div class="nr-columns nr-columns-3"><section><h2>Geltung festlegen</h2><p>Listen den gewünschten Konfigurationen zuordnen. Ohne Zuordnung prüft diese Liste den Aufruf nicht.</p></section><section><h2>Begriffe abgleichen</h2><p>Sperrbegriffe dürfen nicht vorkommen. Pflichtbegriffe müssen in geeigneten Textantworten enthalten sein.</p></section><section><h2>Ausgabe stoppen</h2><p>Ein Verstoß blockiert die geprüfte Ausgabe. Im Agentenlauf wird ein betroffener Schreibaufruf nicht angeboten oder ausgeführt.</p></section></div>
<p class="nr-flow-note">Beispiel: „Rabatt*“ erfasst auch „Rabattaktion“. Pflichtwörter gelten nicht für Kurztexte unter 30 Wörtern oder JSON.</p>
<p class="nr-limit">Grenze: Keine Erkennung von Umschreibungen. Im Agentenlauf werden Schreibargumente geprüft; Chattext und Pflichtwörter sind ausgenommen.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/TermLists.rst">Begriffslisten und Ausnahmen</NrLink></div><div class="nr-jump-links"><NrJump :page="21" back>Zur Qualitätsübersicht</NrJump><NrJump :page="38">Themenübersicht</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Was passiert, wenn ein Anbieter ausfällt?"
---
<div class="nr-kicker">Reserve · Aufwand und Betrieb · nr-llm 0.43.19</div>

# Was passiert, wenn ein Anbieter ausfällt?

<div class="nr-columns nr-columns-3"><section><h2>Fehlerpause</h2><p>Der Circuit Breaker zählt geeignete Anbieterfehler. Nach der eingestellten Schwelle brechen weitere Aufrufe vorübergehend schnell ab.</p></section><section><h2>Ersatzweg</h2><p>Ein konfigurierter Fallback versucht ein anderes Ziel bei Verbindungsfehlern, Überlastung, Serverfehlern oder offenem Circuit Breaker.</p></section><section><h2>Erholung prüfen</h2><p>Nach der Pause wird ein Probeaufruf zugelassen. Erfolg schließt die Sperre; ein erneuter Fehler öffnet sie wieder.</p></section></div>
<p class="nr-flow-note">Voreinstellung: nach fünf passenden Fehlern eine Pause von 30 Sekunden. Ausweichziele müssen eingerichtet sein.</p>
<p class="nr-limit">Grenze: Keine Verfügbarkeitsgarantie. Anmelde- und Konfigurationsfehler lösen keinen automatischen Ersatzweg aus.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr063ProviderResilience.rst">Circuit Breaker und Fallback</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/ext_conf_template.txt">Voreinstellungen</NrLink></div><div class="nr-jump-links"><NrJump :page="23" back>Zur Betriebsübersicht</NrJump><NrJump :page="38">Themenübersicht</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Wie werden Zugangsdaten geschützt?"
---
<div class="nr-kicker">Reserve · Daten und Vorgaben · nr-llm 0.43.19</div>

# Wie werden Zugangsdaten geschützt?

<div class="nr-columns nr-columns-3"><section><h2>Im Vault ablegen</h2><p>Eingerichtete API-Zugänge verweisen auf ein Geheimnis in nr-vault. In der Konfiguration steht dessen Kennung.</p></section><section><h2>Beim Aufruf einsetzen</h2><p>Der sichere HTTP-Client setzt den Zugang für den Dienstaufruf ein. Der Schlüssel gehört nicht in die Modellanweisung.</p></section><section><h2>Text maskieren</h2><p>nr-llm ersetzt erkennbare Geheimnismuster in Prompt, Antwort und Thinking. Diese Maskierung ist verpflichtend.</p></section></div>
<p class="nr-flow-note">Beispiel: Den API-Schlüssel als Vault-Referenz hinterlegen, statt ihn in den Systemprompt zu kopieren.</p>
<p class="nr-limit">Grenze: Nur bekannte Muster werden erkannt. Toolargumente und Embeddings sind ausgenommen; personenbezogene Inhalte werden nicht allgemein erkannt.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr030SpecializedServicesVaultMigration.rst">Zugänge über nr-vault</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr089GuardrailBoundaryCompleteness.rst">Maskierung und Grenzen</NrLink></div><div class="nr-jump-links"><NrJump :page="25" back>Zur Datenübersicht</NrJump><NrJump :page="38">Themenübersicht</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Wie liest der Agent eine externe Webseite?"
---
<div class="nr-kicker">Reserve · Daten und Vorgaben · nr-llm 0.43.19</div>

# Wie liest der Agent eine externe Webseite?

<div class="nr-columns nr-columns-3"><section><h2>Bewusst aktivieren</h2><p>Das Web-Werkzeug ist zunächst ausgeschaltet. Nach Aktivierung verlangt ein Aufruf standardmäßig menschliche Zustimmung.</p></section><section><h2>Adresse prüfen</h2><p>Startadresse und jede Weiterleitung durchlaufen die Adressprüfung. Private Zieladressen werden auch mit Hostfreigabe abgewiesen.</p></section><section><h2>Text begrenzen</h2><p>Das Werkzeug liefert begrenzten Text und kennzeichnet ihn als nicht vertrauenswürdiges Material. Es führt kein Webseiten-JavaScript aus.</p></section></div>
<p class="nr-flow-note">Beispiel: Eine öffentliche Produktseite lesen; deren Weiterleitung auf eine private Netzwerkadresse wird abgewiesen.</p>
<p class="nr-limit">Grenze: Auch URL-Parameter können Daten übertragen. Öffentlich erreichbare interne Dienste brauchen zusätzliche Sperrregeln; der Schutz gilt für dieses Werkzeug.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr202APublicWebPageThroughAnAddressGuard.rst">Web-Werkzeug und Adressprüfung</NrLink></div><div class="nr-jump-links"><NrJump :page="25" back>Zur Datenübersicht</NrJump><NrJump :page="38">Themenübersicht</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Woran ist eine Schreibfreigabe gebunden?"
---
<div class="nr-kicker">Reserve · Kontrolle und Verantwortung · nr-llm 0.43.19</div>

# Woran ist eine Schreibfreigabe gebunden?

<div class="nr-columns nr-columns-3"><section><h2>Andere Person</h2><p>Bei aktivierter Vieraugenregel darf der auslösende Backend-Nutzer nicht selbst freigeben. Das gilt auch für Administratoren.</p></section><section><h2>Geprüfter Stand</h2><p>Die Freigabe muss zu den anstehenden Aufrufen passen. Eine inzwischen geänderte Vorschau verlangt eine neue Entscheidung.</p></section><section><h2>Gespeicherter Nachweis</h2><p>Vor einem Schreibschritt muss das Freigabeereignis gespeichert sein. Misslingt das, wird der freigegebene Schritt nicht ausgeführt.</p></section></div>
<p class="nr-flow-note">Beispiel: Ein angezeigter Ausgangswert ändert sich während der Freigabe. Der Agent wartet mit einer neuen Vorschau erneut.</p>
<p class="nr-limit">Grenze: Vieraugen gilt für Backend-Nutzer. Die Zustandsbindung braucht eine erfolgreiche Werkzeugvorschau; Freigabe ersetzt keine fachliche Prüfung.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr172FourEyesApprovalPerConfiguration.rst">Vieraugenregel</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr184ApprovalBindsToTheStateItShowed.rst">Vorschaubindung</NrLink><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr132ApprovalAuditAndTurnBinding.rst">Aufruf und Audit</NrLink></div><div class="nr-jump-links"><NrJump :page="28" back>Zur Kontrollübersicht</NrJump><NrJump :page="38">Themenübersicht</NrJump></div></div>


---
layout: nr
class: nr-technical-slide
section: 5
sectionTitle: "Einordnung & Austausch"
sectionDivider: false
talkPage: 35
talkTotal: 35
appendix: "technical"
title: "Wie ergänzt das Projekt eigene Werkzeugregeln?"
---
<div class="nr-kicker">Reserve · Kontrolle und Verantwortung · nr-llm 0.43.19</div>

# Wie ergänzt das Projekt eigene Werkzeugregeln?

<ol class="nr-flow" style="--steps:3"><li><span class="nr-flow-number">01</span><h2>Regel entwickeln</h2><p>Die Anwendung implementiert eine eigene fachliche Bedingung über die Schnittstelle für Werkzeugregeln.</p></li><li><span class="nr-flow-number">02</span><h2>Vor Ausführung prüfen</h2><p>Die Regel bewertet endgültige Argumente, handelnden Nutzer und Ziel. Auch nach menschlicher Freigabe wird erneut geprüft.</p></li><li><span class="nr-flow-number">03</span><h2>Entscheidung anwenden</h2><p>Eine ablehnende Regel verhindert den Aufruf. Fehler in einer Regel führen ebenfalls zur Ablehnung.</p></li></ol>
<p class="nr-flow-note">Projektbeispiel: Diese Automatisierung darf nur Datensätze im freigegebenen Seitenbereich ändern.</p>
<p class="nr-limit">Grenze: Ohne eigene Regel entsteht keine zusätzliche Fachprüfung. Benötigte, aber fehlende Zielangaben muss die Regel ausdrücklich ablehnen.</p>
<div class="nr-controls"><div class="nr-action-links"><NrLink href="https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Api/ToolInvocationPolicy.rst">Eigene Werkzeugregeln</NrLink></div><div class="nr-jump-links"><NrJump :page="28" back>Zur Kontrollübersicht</NrJump><NrJump :page="38">Themenübersicht</NrJump></div></div>
