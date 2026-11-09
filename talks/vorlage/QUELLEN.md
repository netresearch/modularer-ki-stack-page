# Quellenstand und Reichweite der Aussagen

Geprüft am **6. November 2026**. Die technischen nr-llm-Aussagen der aktiven
Vorlage beziehen sich auf [v0.43.19](https://github.com/netresearch/t3x-nr-llm/releases/tag/v0.43.19),
Commit [`5b6fca6de8d9593638486c0baca9424934bdc231`](https://github.com/netresearch/t3x-nr-llm/tree/5b6fca6de8d9593638486c0baca9424934bdc231).
Das war das bei dieser Prüfung zuletzt veröffentlichte Release. Die Angabe ist
ein datierter Prüfstand und wird nicht automatisch mit jedem Release geändert.

Der Release-Abgleich am **7. November 2026** bestätigt weiterhin v0.43.19.
Die vier ergänzenden Übersichtsfolien verwenden denselben Quellstand.

## Ergänzende Maßnahmen in den vier Themenfeldern

Die Übersichten bündeln vorhandene und ergänzende Funktionen. Ihre technischen
Voraussetzungen bleiben unterschiedlich: verpflichtende Schlüsselmaskierung,
konfigurierte Rechte und Budgets, optionale Vieraugenfreigabe und ausdrücklich
einzubindende fachliche Prüfungen.

- **Daten und Vorgaben:** [Schlüsselmaskierung](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Guardrail/SecretRedactionInputGuardrail.php),
  [Maskierung in Antwort und Thinking](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Guardrail/SecretRedactionGuardrail.php),
  [Vault-Referenzen](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/ext_conf_template.txt),
  [Web-Werkzeug mit Adressprüfung und Zustimmung](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr202APublicWebPageThroughAnAddressGuard.rst),
  [Protokollumfang und Löschlauf](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/DataRetention.rst).
  nr-vault besitzt Geheimnisspeicherung, Zugriffsrechte und den verwendeten
  sicheren HTTP-Client; nr-llm bindet diesen Baustein ein. Die Maskierung erkennt
  bekannte Muster, nicht beliebige sensible Inhalte; Toolargumente und Embeddings
  sind ausgenommen. Die Web-Regeln betreffen das entsprechende Werkzeug, nicht
  sämtliche HTTP-Aufrufe einer Anwendung. Chatverläufe und verschlüsselte
  Hintergrundantworten haben dokumentierte Aufbewahrungsausnahmen.
- **Aufwand und Betrieb:** [Circuit Breaker und Konfiguration](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/ext_conf_template.txt),
  [Provider-Fallbacks](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr063ProviderResilience.rst).
  Ein Fallback wird nur bei geeigneten Fehlern versucht. Vorab geprüfte Budgets
  garantieren bei parallelen Aufrufen keine harte Kostengrenze.
- **Qualität:** [Begriffslisten mit Geltungsbereich und Ausnahmen](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/TermLists.rst),
  [DecisionService](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Api/DecisionService.rst),
  [Qualitätsevaluation](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Developer/QualityEvaluation.rst).
  Begriffslisten erkennen keine Umschreibungen. Bewertungen brauchen eine
  ausdrückliche Einbindung und passende Kriterien. Die fachliche Freigabe bleibt
  Aufgabe der Anwendung und ihrer Nutzer.
- **Kontrolle und Verantwortung:** [optionale Vieraugenregel](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr172FourEyesApprovalPerConfiguration.rst),
  [Bindung an den Werkzeugschritt und gespeichertes Audit](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr132ApprovalAuditAndTurnBinding.rst),
  [Bindung an die angezeigte Vorschau](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr184ApprovalBindsToTheStateItShowed.rst),
  [anwendungsspezifische Regeln vor Werkzeugaufrufen](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Api/ToolInvocationPolicy.rst).
  Die Zustandsbindung setzt eine erfolgreiche Werkzeugvorschau voraus;
  fachliche Regeln muss die Anwendung implementieren.

Die kleinen Detailverweise im Hauptteil führen zu passenden bestehenden
Reservefolien. Sie sind Bedienhilfen für den Vortrag und werden im PDF
ausgeblendet; sie enthalten keine privaten Notizen.

## Vorgaben und Informationszugriff getrennt erklären

Die am **9. November 2026** überarbeiteten Übersichten verwenden denselben
gepinnten nr-llm-Quellstand. Die Übersicht nach dem Beispiel zu gemeinsamen
Vorgaben behandelt Arbeitsanweisungen. Die Übersicht nach dem Kontextbeispiel
behandelt ausgewählte Inhalte und erlaubte Informationszugriffe. MCP wird hier
ausdrücklich für lesende Abfragen eingesetzt; schreibende Aktionen gehören zum
späteren Themenblock über Kontrolle und Verantwortung.

- **Konfigurationen:** [Gemeinsame Vorgaben](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/Configurations.rst)
  verbinden Modellwahl, System-Prompt und Generierungsparameter. Anwendungen
  können dieselbe benannte Konfiguration verwenden.
- **Tasks:** [Wiederverwendbare Einzelaufrufe](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/Tasks.rst)
  verbinden eine Konfiguration mit einer Prompt-Vorlage und ihrer Eingabe.
  Das sind keine mehrstufigen Agentenläufe.

- **Prompt-Snippets:** [Wiederverwendbare Prompttexte](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/PromptSnippets.rst)
  werden beispielsweise über Tags in Konfigurationen eingebunden. Ein eigener
  System-Prompt des Aufrufers ersetzt grundsätzlich den Konfigurations-Prompt
  samt Snippets; die dokumentierte Ausnahme braucht ausdrücklich markierte
  Snippets und eine dafür freigeschaltete Konfiguration.
- **Skills:** [Aufgabenbezogene Skilltexte und Freigaben](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/Skills.rst)
  können an Aufgaben oder Konfigurationen hängen. Aktivierung und Freigabe als
  System-Anweisung sind unterschiedliche Schritte. Nur freigegebene, dafür
  zugeordnete Skills können in Agentenläufen bei Bedarf geladen werden;
  Einmalaufrufe laden sie nicht auf diesem Weg. Skill-Skripte und referenzierte
  Begleitdateien werden nicht ausgeführt oder automatisch nachgeladen.
- **Ausgewählte Inhalte und Wissenssuche:** Die Anwendung stellt ihre Eingabe
  zusammen. Das vorhandene Werkzeug
  [site_rag_query](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Tool/Builtin/SiteRagQueryTool.php)
  liefert Quellenauszüge aus öffentlichen Website-Inhalten über vorhandene
  Suchindizes oder einen Datenbank-Fallback. Das ist kein automatischer Zugriff
  auf sämtliche TYPO3-Daten und keine eigenständige Pflege eines Wissensindex.
- **MCP-Werkzeuge:** [Externe Server anbinden und Werkzeuge importieren](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/McpServers.rst)
  erfordert Einrichtung, Katalogimport und die Freischaltung einzelner
  Werkzeuge. Importierte Werkzeuge starten deaktiviert. Die Folie nennt das
  Abfragen als Beispiel; MCP ist weder selbst eine Wissensquelle noch eine
  automatische Berechtigung zum Zugriff auf externe Systeme.

- **Lesende Werkzeuge:** Ein Agent kann freigeschaltete Werkzeuge zur Abfrage
  verwenden. Das aufgezeichnete Chatbeispiel zeigt unter anderem `read_records`.
  Die Folie verspricht keinen automatischen Zugriff auf alle Datensätze.

Die Detailverweise führen zu vorhandenen Vertiefungen über Skills, Kontext,
Wissenssuche, MCP und Werkzeugrechte. Beide Übersichten ergänzen die vier
Sicherheitsfragenfelder. Die Themenzeilen im Antwort-Abschnitt benennen acht
aufeinanderfolgende Themen: gemeinsame Basis, Entkopplung, Vorgaben,
Informationen, Ergebnisprüfung, Aufwand/Kosten, Daten und Kontrolle.
Die Qualitätsfolie führt ausdrücklich vom erzeugten Entwurf zur Prüfung von
Format und Aussagen; der belegte Schema-Lauf und die zusätzliche Modellbewertung
bleiben dabei klar getrennt.

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

Screenshots illustrieren die Oberfläche zum tatsächlichen Aufnahmezeitpunkt.
Die Aufnahmedaten sind in den Bildnachweisen dokumentiert; die sichtbaren
Bildunterschriften erklären den Inhalt für das Publikum. Die Aktualisierung der
Quellenbasis auf v0.43.19 macht daraus keine neuen Aufnahmen und keinen Beleg,
dass die dargestellte Instanz dieses Release verwendet.

## Warum vorher v0.35.0 zugrunde lag

Der [erste TUGLE-Commit vom 3. November](https://github.com/netresearch/modularer-ki-stack-page/commit/4a1655f120d6dfe80e15d34281282cc78296bad3)
legte v0.35.0 als Demo-Quellstand fest. Beim
[Trennen von Archiv, Vorlage und MTUG am 4. November](https://github.com/netresearch/modularer-ki-stack-page/commit/9929b2a88039fe2ce73ac2e84baeca777b762fb9)
übernahm die aktive Vorlage diese Referenz. Die
[Überarbeitung am 5. November](https://github.com/netresearch/modularer-ki-stack-page/commit/46973b0603372e4bc50a26e0d1a5ae7eb1ab27de)
ergänzte ein neues Schema-Beispiel und die Erklärung zur Versandprüfung, ohne
die Quellenbasis zu aktualisieren.

Damit wurde eine historische Demo-Referenz in der fortlaufenden Vorlage
weitergeführt. Ein technischer Zwang zu v0.35.0 ist daraus nicht ersichtlich.
Das eingefrorene TUGLE-Archiv behält seinen damaligen Stand; Aktualisierungen
gehören in die aktive Vorlage und die daraus abgeleitete MTUG-Fassung.

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
4. MTUG mit `python3 scripts/prepare_talks.py` aus der Vorlage ableiten. Beide
   aktiven Fassungen mit `node scripts/build_talks.mjs` einschließlich ihrer PDFs
   bauen und mit `node scripts/verify_talk.mjs vorlage` sowie
   `node scripts/verify_talk.mjs mtug-2026-11-09` im Browser prüfen.
5. Mit `python3 scripts/publish_talks.py` die Veröffentlichung zusammenstellen.
   Das eingefrorene TUGLE-Archiv einschließlich PDF und Prüfsummen unverändert
   lassen; seine Quellen und seinen Snapshot nicht neu erzeugen.

## Vertiefungen im Anhang, ergänzt am 7. November 2026

Die folgenden sechs Reservefolien ergänzen die Übersichten. Alle Belege wurden
im oben genannten Quellstand geprüft.

### 60: Begriffslisten

Quelle: [TermLists.rst](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/TermLists.rst).

Die zugeordnete Konfiguration bestimmt die Geltung; Fallback ändert diese ursprüngliche Zuordnung nicht. Ein Verstoß blockiert Ausgabe, Cache und betroffenen Werkzeugaufruf. „Rabatt*“ ist das dokumentierte Beispiel für das Sternsuffix. Synonyme, Schreibfehler und Umschreibungen werden nicht erkannt. Pflichtwörter gelten u. a. nicht für Antworten unter 30 Wörtern, JSON oder Agentenläufe. Agentenläufe prüfen Sperrbegriffe in Schreibargumenten; der Chattext bleibt frei. Ein importiertes MCP-Werkzeug zählt in diesem Mechanismus als schreibend, auch wenn es eine Suche anbietet. Optionaler Site-/Sprachbezug hat weitere dokumentierte Metadatenregeln. Bei noch fehlender Datenbanktabelle wird die Prüfung mit Warnung übergangen; andere Prüfungsfehler blockieren. Diese seltenen Betriebsausnahmen sind nicht als universelle Garantie auf der Folie verallgemeinert.

### 61: Circuit Breaker und Fallback

Quellen: [ADR-063](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr063ProviderResilience.rst), [Voreinstellungen](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/ext_conf_template.txt), [gemeinsamer FailureClassifier](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Provider/Middleware/FailureClassifier.php), [FallbackMiddleware](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Provider/Middleware/FallbackMiddleware.php).

`circuitBreaker.enabled=1`, Fehlergrenze 5, Pause 30 Sekunden. Verbindungsfehler, 429 und 5xx sind relevante Ausfallklassen; ein offener Circuit Breaker ist für Fallback geeignet. Anmelde- und Konfigurationsfehler rechtfertigen keinen Fallback. Der Breaker sitzt innerhalb der Fallback-Schleife. Die Probe nach der Pause ist cachebasiert, Fehlerzählung und Probezugang sind nicht atomar: parallele Fehler können den Zeitpunkt verschieben und mehrere Proben zulassen. Die Folie nennt daher Voreinstellungen und keine harte Verfügbarkeits- oder Zählgarantie. Die gesundheitsabhängige Umsortierung von Fallbacks ist gesondert optional und standardmäßig aus; sie wird nicht als automatische Voreinstellung behauptet.

### 62: Geheimnismaskierung und nr-vault

Quellen: [Vault-Einbindung](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr030SpecializedServicesVaultMigration.rst), [SecretRedactionInputGuardrail](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Guardrail/SecretRedactionInputGuardrail.php), [SecretRedactionGuardrail](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Guardrail/SecretRedactionGuardrail.php), [Grenzen der Maskierung](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr089GuardrailBoundaryCompleteness.rst), [Musterkatalog und Fehlerverhalten](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr123OneSecretShapeCatalogue.rst).

Zugänge werden über Vault-Kennungen konfiguriert und für HTTP-Aufrufe eingebunden. Ein- und ausgehende Geheimnismaskierung erklären sich als verpflichtend; die Ausgabeseite erfasst Antwort und Thinking, ausdrücklich nicht Toolargumente. Embeddings sind ebenfalls ausgenommen. Die Maskierung erkennt Muster, keine beliebigen vertraulichen oder personenbezogenen Inhalte. Der Musterkatalog beschreibt die Textmaskierung als Best Effort und bei Regexfehlern als offen; die Folie behauptet keine lückenlose Verhinderung von Geheimnisabfluss. Vault-Speicherung und Textmaskierung sind verschiedene Schutzmechanismen.

### 63: Externe Webseiten

Quelle: [ADR-202](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr202APublicWebPageThroughAnAddressGuard.rst).

`fetch_external_url` ist standardmäßig deaktiviert. Nach Aktivierung fordert jeder Aufruf grundsätzlich Zustimmung; nur eine ausdrücklich konfigurierte Ausnahme mit nicht leerer Allowlist hebt sie auf. Start-URL und jeder Redirect durchlaufen die Adressprüfung, eine Host-Allowlist hebt die Privatrangensperre nicht auf. Die normalen Verbindungen werden an geprüfte Adressen gebunden; die explizite Proxy-Ausnahme hat einen anderen Vertrauensbereich. Rückgabe: begrenzter Text, als nicht vertrauenswürdig gekennzeichnet; keine JavaScript-Ausführung, keine Formulare oder übertragenen Zugangsdaten. Eine zugelassene URL kann über Query-Parameter Informationen nach außen tragen. Öffentlich adressierte interne Dienste bleiben Betreiberaufgabe und brauchen gezielte Listenregeln. Die Folie verspricht keine allgemeine Absicherung beliebiger HTTP-Aufrufe und keinen vollständigen Prompt-Injection-Schutz.

### 64: Vieraugenregel, Aufruf-/Vorschaubindung, Audit

Quellen: [ADR-172](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr172FourEyesApprovalPerConfiguration.rst), [ADR-184](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr184ApprovalBindsToTheStateItShowed.rst), [ADR-132](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr132ApprovalAuditAndTurnBinding.rst).

Vieraugenregel pro Konfiguration, standardmäßig aus. Bei Aktivierung darf der auslösende Backend-Nutzer nicht selbst zustimmen, auch nicht als Administrator; Selbstablehnung bleibt möglich. Service Accounts sind nicht mit erfasst. Die Aufrufbindung gilt für den ganzen anstehenden Turn. Eine erfolgreich angezeigte Vorschau wird vor Ausführung erneut gebildet und verglichen; Änderung führt zu erneuter Freigabe mit aktueller Vorschau. Keine Bindung an eine fehlende oder bei Suspend fehlgeschlagene Vorschau, kein allgemeines optimistisches Sperren aller TYPO3-Daten. Vor schreibenden Turns muss das APPROVAL-Ereignis gespeichert werden; lesende Turns und Ablehnungen haben andere Audit-Ausfallregeln. Die Folie beschränkt ihre Zusage entsprechend auf Schreibfreigaben.

### 65: Anwendungsspezifische Werkzeugregeln

Quelle: [ToolInvocationPolicy.rst](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Api/ToolInvocationPolicy.rst).

Die Anwendung implementiert `ToolInvocationRuleInterface`; ohne Implementierung keine zusätzliche fachliche Beschränkung. Grundberechtigung wird zuerst geprüft. Die eigenen Regeln erhalten endgültige Argumente, Konfiguration, handelnde Person und Laufkontext; Zielangaben erfordern bei Bedarf einen Resolver. Auch nach menschlicher Freigabe greift die Regel unmittelbar vor Ausführung. Erste Ablehnung stoppt, eine Regel-Exception ebenfalls. Ein fehlendes Ziel wird nicht pauschal automatisch abgelehnt: Die darauf angewiesene eigene Regel muss dies tun. Wer vollständige Historie benötigt, muss dies deklarieren; unvollständig nachgewiesene Historie führt dann zur Ablehnung. Das Beispiel mit einem erlaubten Seitenbereich ist ausdrücklich eine mögliche Projektregel, keine fertige Standardfunktion.


## Ergänzende Demo-Einsatzfälle in Abschnitt 1

Die neue Folie 9 bündelt eingerichtete Möglichkeiten; sie behauptet keinen
frischen erfolgreichen Modellaufruf für jede Funktion. Grundlage ist der
[Demo-Stand `54656cc`](https://github.com/netresearch/typo3-demo/tree/54656cc6a107af0f801c5cc1f51df300f9fc5eb4),
dessen Update-Deployment am 7. November 2026 erfolgreich abgeschlossen wurde.

- **Fehleranalyse:** Die [Agent-Demo](https://typo3-demo.netresearch.de/extensions/ai-agent)
  beschreibt den Zugriff auf Logs. Die Demo-Konfiguration weist den Agenten
  an, Fehlerfragen durch Logabfragen zu bearbeiten. Eine neue erfolgreiche
  Loganalyse ist für diese Folie nicht aufgezeichnet.
- **Systemrecherche:** Der vorhandene Screenshot
  `20-agent-02-lesen-c-aktivitaet.png` zeigt die tatsächlich ausgeführte Suche
  nach den drei neuesten News-Beiträgen samt Werkzeugverlauf.
- **Externe Systeme:** Die [DeepWiki-Konfiguration](https://github.com/netresearch/typo3-demo/blob/54656cc6a107af0f801c5cc1f51df300f9fc5eb4/data/seed-extensions.sql#L7933)
  enthält den externen MCP-Server und dokumentiert den Import von
  `read_wiki_structure` und `read_wiki_contents`. Der damalige Import übersprang
  `ask_question`; diese Funktion wird nicht zugesagt. Ein neuer erfolgreicher
  Remote-Aufruf wurde für die Folie nicht durchgeführt.
- **Bilder, Alttexte und Übersetzung:** Die [Demo-Dokumentation](https://github.com/netresearch/typo3-demo/blob/54656cc6a107af0f801c5cc1f51df300f9fc5eb4/README.md)
  und die [Startkonfiguration](https://github.com/netresearch/typo3-demo/blob/54656cc6a107af0f801c5cc1f51df300f9fc5eb4/docker/web/entrypoint.sh)
  belegen Cowriter-Bilderzeugung, Alttexte mit `ai_filemetadata` auf Englisch
  und Deutsch sowie Datensatzübersetzung mit `autotranslate` über nr-llm.
  `ai_filemetadata` nutzt seine eigene Anbindung; die Folie behauptet keine
  gemeinsame nr-llm-Anbindung für alle genannten Funktionen.
- **Formularassistenz:** Die [öffentliche Wetter-Demo](https://typo3-demo.netresearch.de/extensions/browser-ai-form-assistant)
  ist vorhanden. Die KI-Ausführung benötigt einen unterstützten Browser mit
  lokalem Modell. Browser AI ist ein eigener Baustein und nutzt hierfür nicht
  nr-llm; die Wetterabfrage greift auf einen externen Datendienst zu.


## Bildnachweise

Die verwendeten Bilder sind unveränderte Browseraufnahmen. Die acht
Backend-Motive wurden am **9. November 2026 im echten hellen Farbschema** neu
aufgenommen. Die beiden bereits hellen Frontendbilder bleiben erhalten.
Bildunterschriften und Alttexte beschreiben den Inhalt für das Publikum;
Aufnahmedaten und Grenzen stehen ausschließlich hier im Nachweis.

Auf der Folie wird ein proportionaler Ausschnitt gezeigt. Die Bildansicht
öffnet die vollständige verwendete Bilddatei. Details zur Aufnahme und
zusätzliche vollständige Browseransichten stehen im
[Aufnahmenachweis vom 9. November](source/public/screens/light-captures-provenance-2026-11-09.md).
Keine Aufnahme belegt allein den installierten nr-llm-Versionsstand oder die
allgemeine Wirksamkeit einer Sicherheitsfunktion.

| Folie | Verwendetes Bild | Aufnahme | Inhalt / Darstellung |
|---|---|---|---|
| 4 | [KI-Werkzeuge im Texteditor](source/public/screens/cowriter-editor-light-2026-11-09.png) | 9.11.2026 | Echte helle Editoransicht, Inhaltselement 30 |
| 4 | [Drei deutsche Vorschläge für den SEO-Titel](source/public/screens/cowriter-seo-light-2026-11-09.png) | 9.11.2026 | Neu angeforderte Vorschläge für Seite 9102; nichts übernommen |
| 5 | [Suchantwort mit Website-Quelle](source/public/screens/04-ai-search-02-antwort-quellen.png) | 2.11.2026 | Bereits helle Frontendaufnahme, vergrößerter Ausschnitt |
| 6 | [Repurpose-Auftrag mit Quelle und Podcast](source/public/screens/repurpose-light-2026-11-09.png) | 9.11.2026 | Bestehender Auftrag 3; keine neue Generierung oder Freigabe |
| 7 | [Auftrag für einen Seitenentwurf und Rückmeldung des Agenten](source/public/screens/agent-chat-light-2026-11-09.png) | 9.11.2026 | Gespeicherter Verlauf aus Konversation 293 vom 2. November |
| 8 | [Gespeicherte SEO-Felder des Entwurfs 10114](source/public/screens/landingpage-backend-light-2026-11-09.png) | 9.11.2026 | Bestehende Felder mit konkretem fiktivem Datum und Ort |
| 8 | [Vorschau des Demoentwurfs 10114](source/public/screens/landingpage-preview-detail-2026-11-07.png) | 7.11.2026 | Bereits helle Frontendaufnahme desselben Entwurfs |
| 22 | [Kosten, Anfragen und Tokenverbrauch](source/public/screens/analytics-light-2026-11-09.png) | 9.11.2026 | Anzeige für 11. Oktober bis 9. November; geschätzte Kosten |
| 26 | [Freigabe einer SEO-Titeländerung](source/public/screens/approval-seo-light-2026-11-09.png) | 9.11.2026 | Vorhandene offene Karte aus Konversation 200; keine Freigabe ausgelöst |
| 27 | [Modell- und Werkzeugaufrufe im KI-Chat](source/public/screens/tool-trace-light-2026-11-09.png) | 9.11.2026 | Gespeicherte Aktivität aus Konversation 292 vom 2. November |

Der Repurpose-Auftrag zeigt vorhandene Artefakte, deren fachliche Freigabe in
der Aufnahme noch aussteht. Die Kostenübersicht enthält Schätzwerte des Moduls;
sie wurden nicht unabhängig nachgerechnet. Die Chatansichten sind neue
Aufnahmen gespeicherter Vorgänge, keine neu ausgeführten Agentenaufgaben.

Die frühere Freigabekarte zur Seitenanlage ist nach der bereits erteilten
Freigabe nicht mehr als offene Karte abrufbar. Folie 26 verwendet deshalb eine
echte noch offene Karte zur Änderung des SEO-Titels von Seite 9101. Die
Bildunterschrift beschreibt allgemein die konkrete Seitenänderung; der Alttext
benennt die SEO-Titeländerung. Es wurde keine neue Schreibaktion erzeugt und
keine vorhandene Freigabe bestätigt.

Auf Folie 8 gehören Backend und Vorschau weiterhin zum Entwurf **UID 10114**,
der am 7. November erzeugt wurde. Die neue Backendaufnahme zeigt seine
**gespeicherten Seiteneigenschaften**, nicht einen erneut ausgeführten
Landingpage-Assistenten. Das ausdrücklich fiktive Briefing nennt Donnerstag,
**19. November 2026, 18:30–20:00 Uhr**, und **„Demo-Labor Leipzig, Raum 3“**.
Die Seite bleibt verborgen. Der
[ursprüngliche Generierungsnachweis](source/public/screens/landingpage-provenance-2026-11-07.md)
dokumentiert den Lauf und die damaligen redaktionellen Korrekturen.

Für die SEO-Aufnahme auf Folie 4 wurden am 9. November im laufenden Backend
drei neue deutsche Titelvorschläge für „KI-Cowriter“ (UID 9102) angefordert.
Kein Vorschlag wurde übernommen und keine Seitenänderung gespeichert. Die
sichtbare Auswahl belegt diesen Bedienablauf, keine allgemeine
Qualitätsgarantie. Die früheren Aufnahmen vom 7. November bleiben als
historisches Material erhalten und werden auf dieser Folie nicht mehr gezeigt.
