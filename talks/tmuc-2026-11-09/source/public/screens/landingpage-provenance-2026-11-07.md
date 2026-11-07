# Herkunft: Landingpage-Entwurf „KI im TYPO3-Redaktionsalltag“

## Ergebnis

- Neuer Entwurf: Seite **UID 10114** „KI im TYPO3-Redaktionsalltag“, Seitentyp Standardseite.
- Elternseite: 10104 „[TUGLE-Demo] Agent-Test“ unter „Demo Project“. Unter derselben Elternseite liegt der ältere Entwurf 10110.
- Inhaltselemente: 10302 (Text & Medien, Einleitung mit Termin, Ort und Demo-Hinweis), 10303 (Erkenntnisse), 10304 (Programm als Tabelle), 10305 (Panel „Nächster Schritt“). Dazu kommt 10310 „[Animation Runtime]“ (Reines HTML), das der Generator für die Animationen selbst anlegt.
- Die Extension autotranslate hat beim Speichern zusätzlich die deutsche Übersetzung **UID 10115** der Seite angelegt. Diese Übersetzung wurde nicht bearbeitet und nicht aufgenommen.
- Vorschau-URL: https://typo3-demo.netresearch.de/ki-im-typo3-redaktionsalltag (nur mit Backend-Sitzung sichtbar)
- Seite 10110, frühere Belege und andere Datensätze wurden nicht verändert.

## Gemeinsamer Lauf

Alle drei Backend-Bilder stammen aus demselben Assistentenlauf (Lauf 5). Dieser Lauf hat Seite 10114 gespeichert. Die Vorschaubilder zeigen genau diese Seite.

| Zeit (MEZ, 2026-11-07) | Schritt |
| --- | --- |
| 12:45:39 | Modul „Landing Pages“ geöffnet, Vorlage „Event Promotion“ (UID 902) über „Landing Page erstellen“ gewählt. Das Modell erzeugt die Briefing-Fragen (`generate-briefing`). |
| 12:45:45 | Briefing ausgefüllt |
| 12:45:46 | Aufnahme `landingpage-briefing-original-2026-11-07.png`, danach „Weiter“ |
| 12:45:46–12:45:53 | Das Modell erzeugt die Seitenfelder (`generate-page-fields`). |
| 12:45:54 | Aufnahmen `landingpage-backend-original-2026-11-07.png` und `landingpage-backend-detail-2026-11-07.png` (unbearbeitete Modellausgabe), danach „Weiter“ |
| 12:45:54–12:46:25 | Das Modell erzeugt die Inhaltsabschnitte (`generate-content`). |
| 12:46:25–12:46:34 | Fachliche Prüfung des gesamten generierten Texts gegen das Briefing, danach Freigabe |
| 12:46:34–12:46:47 | Platzierung: Elternseite über den TYPO3-Seitenbrowser gewählt (Filter „Agent-Test“, Seite 10104), Titel und URL-Pfad unverändert übernommen |
| 12:46:47 | „Landing Page erstellen“ und Bestätigung „Soll die Landing Page jetzt erstellt werden?“ mit OK |
| 12:47:22 | Speicherantwort: `pageUid 10114`, `contentUids 10302–10305` |
| 12:48–12:49 | Korrektur der Reihenfolge der Inhaltselemente (siehe unten) |
| 12:49:50 | Aufnahmen `landingpage-preview-original-2026-11-07.png` und `landingpage-preview-detail-2026-11-07.png`, HTTP-Status 200 |

## Modellgenerierung

- Alle Texte in den Seitenfeldern und Inhaltsabschnitten stammen vom Sprachmodell der Instanz (nr-llm) über den Landingpage-Assistenten. Kein Text wurde von Hand eingetippt oder umformuliert.
- Der Assistent wurde ohne vorausgewählte Elternseite gestartet. Grund: Mit einer Elternseite setzt die Extension eine feste Sprachvorgabe aus der Standardsprache der Site, hier Englisch („Output MUSS in English sein“). Ohne Elternseite folgt das Modell dem deutschen Briefing. Die Elternseite 10104 wurde erst im Platzierungsschritt gewählt.
- Die Briefing-Fragen erzeugt das Modell bei jedem Lauf neu. Lauf 5 stellte 5 Pflichtfragen. Jede Antwort besteht ausschließlich aus Wortlaut des verbindlichen Briefings (`briefing.md`):

| Frage im Assistenten | Antwort |
| --- | --- |
| Titel / Thema | KI im TYPO3-Redaktionsalltag |
| Wen soll die Veranstaltung ansprechen und was brauchen diese Personen? | „Redaktion, Agentur und IT.“ und danach der vollständige verbindliche Briefingtext |
| Was macht die Veranstaltung besonders und welche drei konkreten Erkenntnisse nehmen Teilnehmende mit? | „Redaktion, Agentur und IT.“ |
| Wie können sich Interessierte anmelden und welche Bedingungen gelten? | „Keine echte Anmeldung, kein Anmeldeschluss, keine Teilnahmegebühr. Der Termin und der Ort sind erfundene Demoangaben; ein klarer kurzer Demo-Hinweis auf der Seite genügt.“ |
| Wann und wo findet die Veranstaltung statt? | „Donnerstag, 19. November 2026, 18:30–20:00 Uhr (fiktiver Demotermin). „Demo-Labor Leipzig, Raum 3“ – ausdrücklich ein fiktiver Veranstaltungsort.“ |
| Wie sieht das Programm aus und wer wirkt mit? | „Redaktion, Agentur und IT. Kurze Einführung, Programm mit vier Demonstrationen (Cowriter, AI Search, Repurpose, Backend-Agent im TYPO3-Alltag), Fragenrunde.“ |

## Abgleich mit dem Briefing

- Datum und Wochentag: Der 19. November 2026 ist ein Donnerstag (mit Python `datetime` geprüft). Die Seite nennt „Donnerstag, 19. November 2026 · 18:30–20:00 Uhr“.
- Ort: „Demo-Labor Leipzig, Raum 3“ steht im ersten Abschnitt und im letzten Abschnitt.
- Demo-Hinweis: „Diese Veranstaltung ist fiktiv. Termin und Veranstaltungsort sind erfundene Demoangaben.“
- Programm: Kurze Einführung (18:30), Cowriter, AI Search, Repurpose, Backend-Agent (je 15 Minuten), Fragenrunde (19:40–20:00).
- Zielgruppe Redaktion, Agentur und IT ist genannt.
- Ohne Treffer: Sprecher, Referenzen, Anmeldeformular, Anmeldeschluss, Teilnahmegebühr, „TT.MM.JJJJ“, offene Platzhalter, ein anderes Datum. Anmeldung, Anmeldeschluss und Gebühr kommen nur verneint vor („keine echte Anmeldung, kein Anmeldeschluss, keine Teilnahmegebühr“).
- Der Hinweis „Vor einer echten Veröffentlichung ist eine redaktionelle Prüfung erforderlich“ steht im letzten Abschnitt.
- Seitenfelder: SEO-Titel „KI im TYPO3-Redaktionsalltag | Fiktive Demo“, Meta-Beschreibung mit Datum, Uhrzeit, Ort und „Termin und Ort fiktiv“.

## Redaktionelle Korrektur

Eine Korrektur, nur an Entwurf 10114:

- **Reihenfolge der Inhaltselemente.** Der Generator hat jedes Element oben auf der Seite eingefügt. Die Seite begann deshalb mit „Nächster Schritt“ und endete mit der Einleitung. Im Modul „Datensätze“ wurde mit 6 Klicks auf „Nach oben verschieben“ die Reihenfolge 10302, 10303, 10304, 10305 hergestellt. Am Text wurde nichts geändert.
- Die Backend-Bilder zeigen die unbearbeitete Modellausgabe aus dem Assistenten. Die Vorschaubilder zeigen die Seite nach der Korrektur der Reihenfolge.
- Die Reihenfolge der Inhalte in der deutschen Übersetzung 10115 wurde nicht geprüft.

## Verborgener Zustand

- Die Vorlage „Event Promotion“ hat den Veröffentlichungsmodus `hidden`. Die Extension legt Seiten mit dieser Vorlage verborgen an.
- Nachweis auf zwei Wegen, nach dem Speichern:
  - Anonym ohne Sitzung (`curl`): `/ki-im-typo3-redaktionsalltag` liefert 404, `/de/ki-im-typo3-redaktionsalltag` liefert 404.
  - Mit Backend-Sitzung: `/ki-im-typo3-redaktionsalltag` liefert 200 mit dem Inhalt.
- Die Seite ist zusätzlich aus Menüs ausgeblendet und auf `noindex` gesetzt (Seiteneigenschaften).

## Vorherige Läufe ohne Speichern

Vor Lauf 5 gab es 4 Läufe und 1 Diagnoseaufruf. Keiner hat gespeichert:

- Diagnoseaufruf und Lauf 1: Das Skript fand den Assistenten-Dialog nicht (TYPO3 14 nutzt ein natives `<dialog>`). Lauf 1 erzeugte die Briefing-Fragen.
- Lauf 2: Die automatische Prüfung meldete verneinte Formulierungen wie „kein Anmeldeschluss“ als Treffer. Der Assistent wurde ohne Speichern geschlossen.
- Lauf 3 und Lauf 4: Die Elternseiten-Auswahl ist in der Live-Version ein Seitenbrowser statt eines Zahlenfelds. Das Skript scheiterte dort vor der Bestätigung.

Diese Läufe haben das Sprachmodell aufgerufen, aber keine Seite und keinen Datensatz angelegt. Kein Bild aus diesen Läufen ist geliefert.

## Technik und Datenschutz

- System: TYPO3 CMS 14.3.10 (Fenstertitel), Live-Demo https://typo3-demo.netresearch.de/typo3/. nr-landingpage laut `composer.lock` 0.3.21; die ausgelieferte JavaScript-Datei der Instanz ist neuer als dieser Tag (Seitenbrowser statt Zahlenfeld).
- Werkzeug: Playwright (Python) mit Google Chrome, headless. Backend-Viewport 1280 × 1000, Vorschau-Viewport 600 × 1000, jeweils Gerätefaktor 2, `prefers-reduced-motion: reduce`, damit Animationen keine leeren Abschnitte erzeugen.
- `landingpage-backend-detail-2026-11-07.png` ist eine Elementaufnahme des Formulars im Schritt „Seitenfelder“. `landingpage-preview-detail-2026-11-07.png` ist eine Elementaufnahme des Inhaltselements 10302. Kein Bildpunkt wurde nachträglich verändert, nichts im DOM wurde manipuliert.
- Zugang: vorhandener Demo-Benutzer `nr_admin` aus dem Team-Passwortmanager. Der Benutzername ist oben rechts in den Backend-Bildern sichtbar. Kein Passwort, Cookie oder Token steht in den Dateien. Die Sitzungsdatei wurde nach der Aufnahme gelöscht und der Passwortmanager gesperrt.
- Es wurden kein Code, keine Konfiguration, kein Konto und kein Passwort geändert. Das Repository wurde nicht bearbeitet.
