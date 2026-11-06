# Quellenstand und Reichweite der Aussagen

Geprüft am **6. November 2026**. Die technischen nr-llm-Aussagen der aktiven
Vorlage beziehen sich auf [v0.43.19](https://github.com/netresearch/t3x-nr-llm/releases/tag/v0.43.19),
Commit [`5b6fca6de8d9593638486c0baca9424934bdc231`](https://github.com/netresearch/t3x-nr-llm/tree/5b6fca6de8d9593638486c0baca9424934bdc231).
Das war das bei dieser Prüfung zuletzt veröffentlichte Release. Die Angabe ist
ein datierter Prüfstand und wird nicht automatisch mit jedem Release geändert.

## Formale und inhaltliche Prüfung

Ein JSON-Schema prüft Struktur, Datentypen, erlaubte Werte und unterstützte
Längenregeln. Es gleicht eine Aussage nicht mit einem Briefing ab. Das
[ausführbare Schema-Beispiel](source/public/pruefbeispiel/index.html) zeigt genau
diese Grenze: Eine erfundene Frist kann formal gültig sein. Im Beispiel werden
die originalen PHP-Klassen lokal ausgeführt; es finden keine Modellaufrufe
statt. Ein Ergebnis einer semantischen Prüfung wird damit nicht nachgewiesen.

nr-llm stellt zusätzlich den **DecisionService** bereit. Die Anwendung liefert
Auftrag, Antwortentwurf und Belege sowie ein Prüfprofil. Ein Modell bewertet die
festgelegten Kriterien. Schwellenwerte, Überarbeitung und Freigabe bestimmt die
Anwendung. Sie muss diesen Schritt ausdrücklich einbinden; er läuft nicht
automatisch bei jeder Generierung. Auch eine Modellbewertung kann irren und
ersetzt keine erforderliche fachliche Freigabe.

Separat gestartete Qualitätsevaluationen vergleichen Antworten auf Beispielaufgaben.
Bereits v0.35.0 enthielt dafür den optionalen `LlmJudgeGrader`. Der allgemeine
DecisionService kam mit v0.39.0 hinzu. Im aktuellen Stand verwendet der
`DecisionGrader` diesen Dienst für Evaluationen. Eine laufende Quellenprüfung
im Anwendungsablauf und ein Evaluationstest mit Beispielen sind unterschiedliche
Einbindungen derselben Bewertungsgrundlage.

Quellen zum geprüften Stand:

- [Öffentliche CompletionService-API und strukturierte Ausgabe](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Api/CompletionService.rst)
- [Lokaler Schema-Validator](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Schema/JsonSchemaValidator.php)
- [DecisionService: Auftrag, Entwurf, Belege und Prüfprofil](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Api/DecisionService.rst)
- [Qualitätsevaluation und ihre gesonderte Ausführung](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Developer/QualityEvaluation.rst)
- [DecisionGrader als Nutzer des Bewertungsdienstes](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Evaluation/Grader/DecisionGrader.php)
- [Versionsgeschichte einschließlich v0.39.0](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/CHANGELOG.md)

## AI Search und Repurpose

Für AI Search ist eine Anti-Halluzinationsprüfung dokumentiert. Welchen
nr-llm-Dienst sie intern aufruft, wurde für diese Folien nicht verifiziert.
Daraus lässt sich weder eine bestätigte DecisionService-Anbindung noch die
Aussage ableiten, nur AI Search verwende eine inhaltliche Prüfung.

Die Repurpose-Aussage bezieht sich gesondert auf
[v0.14.0, Commit `09bc94e4deae0870b76671647b15cddf94998fb5`](https://github.com/netresearch/t3x-nr-repurpose/tree/09bc94e4deae0870b76671647b15cddf94998fb5).
In den geprüften Erzeugungspfaden sind Schema-Prüfung, Prompt-Vorgaben und
redaktionelle Freigabe vorhanden; ein zusätzlicher semantischer Quellenabgleich
ist dort nicht eingebunden.

Die Erweiterung ist inzwischen in **[PR 205](https://github.com/netresearch/t3x-nr-repurpose/pull/205)
implementiert**, aber noch nicht zusammengeführt und nicht veröffentlicht.
Bei aktivierter Quellenprüfung gleicht sie zuerst das gemeinsame Briefing mit
dem Originalmaterial ab, danach jeden fertigen Formattext erneut mit dem Original.
Kürzungen erfolgen vor der zweiten Prüfung; Sprachsynthese und Medienproduktion
beginnen danach. Automatische Bewertung und menschliche Freigabe haben getrennte
Zustände. Eine ausgefallene oder nicht durchgeführte Prüfung ist kein bestandenes
Ergebnis. Die Voreinstellung bleibt ausgeschaltet. Die Aussage über die fehlende
Einbindung in Release 0.14.0 bleibt davon unberührt.

- [Repurpose: Analyse des Ausgangsmaterials](https://github.com/netresearch/t3x-nr-repurpose/blob/09bc94e4deae0870b76671647b15cddf94998fb5/Classes/Understanding/DocumentAnalyzer.php)
- [Repurpose: gemeinsamer Textgenerator](https://github.com/netresearch/t3x-nr-repurpose/blob/09bc94e4deae0870b76671647b15cddf94998fb5/Classes/Generator/AbstractTextGenerator.php)
- [Repurpose: redaktionelle Freigabe](https://github.com/netresearch/t3x-nr-repurpose/blob/09bc94e4deae0870b76671647b15cddf94998fb5/Classes/Review/ArtifactReviewService.php)

## Datenklassen, Provider-Zonen und Werkzeugzugriff

Die Versandprüfung beruht auf **deklarierten** Datenklassen und Provider-Zonen.
Sie erkennt sensible Inhalte nicht selbstständig. Für berücksichtigte
Prompt-Quellen gilt die höchste deklarierte Datenklasse; erreichbare Fallbacks
gehen in die Prüfung der Provider-Zone ein. `enforce` blockiert einen Verstoß,
`observe` protokolliert ihn und lässt den Aufruf weiterlaufen. Bei importierten
MCP-Werkzeugen wird die Datenklassengrenze dagegen in beiden Modi durchgesetzt.

Prompt-Quellen und Werkzeuge haben unterschiedliche Vorgaben:

- Unklassifizierte Prompt-Quellen setzen in diesem Mechanismus keine zusätzliche
  Grenze. Freie Nutzereingaben werden dadurch nicht automatisch klassifiziert.
- Unbekannte Werkzeuggruppen ohne ausdrückliche Einstufung fallen auf die
  strengste Datenklasse zurück. Bei importierten MCP-Werkzeugen gilt die
  Datenklasse des Servers; ohne gültige Einstufung stellt dieser Importpfad
  keine Werkzeuge bereit.
- `read_source` und `search_code` gehören zur Gruppe `code` und damit zu
  `sourceCode`. Unter `externalGlobal` und `enforce` werden sie auch für
  Administratoren gesperrt. Entscheidend ist die Provider-Zone, nicht der
  Modellname. Diese Einstufung unterscheidet nicht zwischen öffentlichem
  Extension-Code und vertraulichem Projektcode.

Falsche Deklarationen werden nicht anhand des Inhalts korrigiert. Eine
Provider-Zone ist ebenfalls eine Betreiberangabe, kein technischer Nachweis des
tatsächlichen Verarbeitungsorts. Die feste Zuordnung der Klassen zu Zonen bildet
Vertraulichkeit, Personenbezug und zulässigen Rechtsraum nicht unabhängig
voneinander ab.

Bei dynamischer Modellwahl bleibt außerdem der konkrete Aufrufpfad relevant:
Manche Pfade können für Prüfung und Versand getrennt auflösen. Pfade mit
übergebener `ModelResolution`, darunter der DecisionService, binden beides an
dieselbe Auflösung. Eine pauschale Zusage für alle Aufrufpfade wäre daher zu weit.

- [Klassifizierung des eingebundenen Prompt-Kontexts](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Context/InputContextClassifier.php)
- [Versandprüfung](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Context/InputContextTrustGate.php)
- [Provider-Zonen und feste Zuordnung](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Domain/Enum/TrustZone.php)
- [Werkzeuggruppen und Datenklassen](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Tool/ToolDataClassResolver.php)
- [Prüfung der Werkzeugberechtigung](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Tool/ToolCallPolicy.php)
- [Klassifizierung beim MCP-Import](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Tool/Mcp/McpToolProvider.php)
- [Aktuelle Aufrufpfade und übergebene Modellauflösung](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/LlmServiceManager.php)
- [Tests für getrennte und gemeinsam verwendete Modellauflösung](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Tests/Unit/Service/Context/InputContextTrustGateEntryPointTest.php)
- [Architekturentscheidung zum weiterhin vorhandenen Pfad mit getrennter Modellwahl](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr149CriteriaModeZoneFromTheResolvedModel.rst)

## Was die Nachweise nicht belegen

Die Prüfung der Folienaussagen beruht auf Quellcode und Dokumentation des
genannten Releases. Das Schema-Beispiel ist ein lokaler PHP-Lauf. Eine Prüfung
dieser Daten- und Werkzeugregeln auf der laufenden TYPO3-Demo ist hier nicht
belegt; insbesondere wurden deren aktuell wirksame Provider-Zone,
Durchsetzungsmodus und installierter Stand nicht durch diese Folienkorrektur
ermittelt.

Screenshots behalten ihr tatsächliches Aufnahmedatum, etwa 2. oder 5. November
2026. Sie illustrieren die damalige Oberfläche. Die Aktualisierung der
Quellenbasis auf v0.43.19 macht daraus keine neuen Aufnahmen und keinen Beleg,
dass die dargestellte Instanz dieses Release verwendet.

## Warum vorher v0.35.0 zugrunde lag

Der [erste TUGLE-Commit vom 3. November](https://github.com/netresearch/modularer-ki-stack-page/commit/4a1655f120d6dfe80e15d34281282cc78296bad3)
legte v0.35.0 als Demo-Quellstand fest. Beim
[Trennen von Archiv, Vorlage und TMUC am 4. November](https://github.com/netresearch/modularer-ki-stack-page/commit/9929b2a88039fe2ce73ac2e84baeca777b762fb9)
übernahm die aktive Vorlage diese Referenz. Die
[Überarbeitung am 5. November](https://github.com/netresearch/modularer-ki-stack-page/commit/46973b0603372e4bc50a26e0d1a5ae7eb1ab27de)
ergänzte ein neues Schema-Beispiel und die Erklärung zur Versandprüfung, ohne
die Quellenbasis zu aktualisieren.

Damit wurde eine historische Demo-Referenz in der fortlaufenden Vorlage
weitergeführt. Ein technischer Zwang zu v0.35.0 ist daraus nicht ersichtlich.
Das eingefrorene TUGLE-Archiv behält seinen damaligen Stand; Aktualisierungen
gehören in die aktive Vorlage und die daraus abgeleitete TMUC-Fassung.

## Aktualisierung vor der nächsten Verwendung

1. Das zuletzt veröffentlichte nr-llm-Release prüfen und seinen Tag auf einen
   konkreten Commit auflösen. Version, Commit und Prüfdatum gemeinsam festhalten.
2. Die betroffenen Aussagen anhand von Dokumentation, Implementierung und
   vorhandenen Tests dieses Commits prüfen. Quellenverweise und Folientext
   gemeinsam ändern; Versionsnummern nicht ohne fachlichen Abgleich ersetzen.
3. Das Schema-Beispiel mit den unveränderten Originalklassen des neuen Stands
   erneut ausführen. Ergebnisdaten, eingebettete Daten der Prüfseite, ZIP-Paket,
   Originalquellen und Prüfsummen müssen denselben Lauf und Quellstand belegen.
   Ein Quellenabgleich mit einem Modell darf nur als ausgeführt bezeichnet
   werden, wenn dafür ein eigener nachvollziehbarer Lauf vorliegt.
4. TMUC mit `python3 scripts/prepare_talks.py` aus der Vorlage ableiten. Beide
   aktiven Fassungen mit `node scripts/build_talks.mjs` einschließlich ihrer PDFs
   bauen und mit `node scripts/verify_talk.mjs vorlage` sowie
   `node scripts/verify_talk.mjs tmuc-2026-11-09` im Browser prüfen.
5. Mit `python3 scripts/publish_talks.py` die Veröffentlichung zusammenstellen.
   Das eingefrorene TUGLE-Archiv einschließlich PDF und Prüfsummen unverändert
   lassen; seine Quellen und seinen Snapshot nicht neu erzeugen.
