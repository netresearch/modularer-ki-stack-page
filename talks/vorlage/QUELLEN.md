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

## Vertiefungen im Anhang, ergänzt am 7. November 2026

Die folgenden sechs Reservefolien ergänzen die Übersichten. Alle Belege wurden
im oben genannten Quellstand geprüft.

### 58: Begriffslisten

Quelle: [TermLists.rst](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Administration/TermLists.rst).

Die zugeordnete Konfiguration bestimmt die Geltung; Fallback ändert diese ursprüngliche Zuordnung nicht. Ein Verstoß blockiert Ausgabe, Cache und betroffenen Werkzeugaufruf. „Rabatt*“ ist das dokumentierte Beispiel für das Sternsuffix. Synonyme, Schreibfehler und Umschreibungen werden nicht erkannt. Pflichtwörter gelten u. a. nicht für Antworten unter 30 Wörtern, JSON oder Agentenläufe. Agentenläufe prüfen Sperrbegriffe in Schreibargumenten; der Chattext bleibt frei. Ein importiertes MCP-Werkzeug zählt in diesem Mechanismus als schreibend, auch wenn es eine Suche anbietet. Optionaler Site-/Sprachbezug hat weitere dokumentierte Metadatenregeln. Bei noch fehlender Datenbanktabelle wird die Prüfung mit Warnung übergangen; andere Prüfungsfehler blockieren. Diese seltenen Betriebsausnahmen sind nicht als universelle Garantie auf der Folie verallgemeinert.

### 59: Circuit Breaker und Fallback

Quellen: [ADR-063](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr063ProviderResilience.rst), [Voreinstellungen](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/ext_conf_template.txt), [gemeinsamer FailureClassifier](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Provider/Middleware/FailureClassifier.php), [FallbackMiddleware](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Provider/Middleware/FallbackMiddleware.php).

`circuitBreaker.enabled=1`, Fehlergrenze 5, Pause 30 Sekunden. Verbindungsfehler, 429 und 5xx sind relevante Ausfallklassen; ein offener Circuit Breaker ist für Fallback geeignet. Anmelde- und Konfigurationsfehler rechtfertigen keinen Fallback. Der Breaker sitzt innerhalb der Fallback-Schleife. Die Probe nach der Pause ist cachebasiert, Fehlerzählung und Probezugang sind nicht atomar: parallele Fehler können den Zeitpunkt verschieben und mehrere Proben zulassen. Die Folie nennt daher Voreinstellungen und keine harte Verfügbarkeits- oder Zählgarantie. Die gesundheitsabhängige Umsortierung von Fallbacks ist gesondert optional und standardmäßig aus; sie wird nicht als automatische Voreinstellung behauptet.

### 60: Geheimnismaskierung und nr-vault

Quellen: [Vault-Einbindung](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr030SpecializedServicesVaultMigration.rst), [SecretRedactionInputGuardrail](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Guardrail/SecretRedactionInputGuardrail.php), [SecretRedactionGuardrail](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Classes/Service/Guardrail/SecretRedactionGuardrail.php), [Grenzen der Maskierung](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr089GuardrailBoundaryCompleteness.rst), [Musterkatalog und Fehlerverhalten](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr123OneSecretShapeCatalogue.rst).

Zugänge werden über Vault-Kennungen konfiguriert und für HTTP-Aufrufe eingebunden. Ein- und ausgehende Geheimnismaskierung erklären sich als verpflichtend; die Ausgabeseite erfasst Antwort und Thinking, ausdrücklich nicht Toolargumente. Embeddings sind ebenfalls ausgenommen. Die Maskierung erkennt Muster, keine beliebigen vertraulichen oder personenbezogenen Inhalte. Der Musterkatalog beschreibt die Textmaskierung als Best Effort und bei Regexfehlern als offen; die Folie behauptet keine lückenlose Verhinderung von Geheimnisabfluss. Vault-Speicherung und Textmaskierung sind verschiedene Schutzmechanismen.

### 61: Externe Webseiten

Quelle: [ADR-202](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr202APublicWebPageThroughAnAddressGuard.rst).

`fetch_external_url` ist standardmäßig deaktiviert. Nach Aktivierung fordert jeder Aufruf grundsätzlich Zustimmung; nur eine ausdrücklich konfigurierte Ausnahme mit nicht leerer Allowlist hebt sie auf. Start-URL und jeder Redirect durchlaufen die Adressprüfung, eine Host-Allowlist hebt die Privatrangensperre nicht auf. Die normalen Verbindungen werden an geprüfte Adressen gebunden; die explizite Proxy-Ausnahme hat einen anderen Vertrauensbereich. Rückgabe: begrenzter Text, als nicht vertrauenswürdig gekennzeichnet; keine JavaScript-Ausführung, keine Formulare oder übertragenen Zugangsdaten. Eine zugelassene URL kann über Query-Parameter Informationen nach außen tragen. Öffentlich adressierte interne Dienste bleiben Betreiberaufgabe und brauchen gezielte Listenregeln. Die Folie verspricht keine allgemeine Absicherung beliebiger HTTP-Aufrufe und keinen vollständigen Prompt-Injection-Schutz.

### 62: Vieraugenregel, Aufruf-/Vorschaubindung, Audit

Quellen: [ADR-172](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr172FourEyesApprovalPerConfiguration.rst), [ADR-184](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr184ApprovalBindsToTheStateItShowed.rst), [ADR-132](https://github.com/netresearch/t3x-nr-llm/blob/5b6fca6de8d9593638486c0baca9424934bdc231/Documentation/Adr/Adr132ApprovalAuditAndTurnBinding.rst).

Vieraugenregel pro Konfiguration, standardmäßig aus. Bei Aktivierung darf der auslösende Backend-Nutzer nicht selbst zustimmen, auch nicht als Administrator; Selbstablehnung bleibt möglich. Service Accounts sind nicht mit erfasst. Die Aufrufbindung gilt für den ganzen anstehenden Turn. Eine erfolgreich angezeigte Vorschau wird vor Ausführung erneut gebildet und verglichen; Änderung führt zu erneuter Freigabe mit aktueller Vorschau. Keine Bindung an eine fehlende oder bei Suspend fehlgeschlagene Vorschau, kein allgemeines optimistisches Sperren aller TYPO3-Daten. Vor schreibenden Turns muss das APPROVAL-Ereignis gespeichert werden; lesende Turns und Ablehnungen haben andere Audit-Ausfallregeln. Die Folie beschränkt ihre Zusage entsprechend auf Schreibfreigaben.

### 63: Anwendungsspezifische Werkzeugregeln

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

Die Originalbilder wurden nicht verändert. Die Bildunterschriften und Alttexte
beschreiben den sichtbaren Inhalt; Aufnahmedaten und Ausschnittangaben stehen
hier getrennt davon. Die folgende Übersicht gilt für Vorlage und TMUC. Die
Bildansicht öffnet jeweils das vollständige Original. Die Aufnahmen sind
keine neuen Ausführungstests und kein Nachweis des heute installierten Stands.

| Folie | Bild / Original | Aufnahme | Darstellung auf der Folie |
|---|---|---|---|
| 4 | [KI-Werkzeuge in der Symbolleiste des Texteditors](source/public/screens/cowriter-ckeditor-toolbar-2026-11-05.png) | 5.11.2026 | Vollständige Aufnahme |
| 4 | [KI-Aktionen an den Feldern für SEO-Titel und Beschreibung](source/public/screens/cowriter-page-seo-2026-11-05.png) | 5.11.2026 | Vollständige Aufnahme |
| 5 | [Suchantwort mit einem Link zur verwendeten Website-Quelle](source/public/screens/04-ai-search-02-antwort-quellen.png) | 2.11.2026 | Vergrößerter Ausschnitt |
| 6 | [Repurpose-Auftrag mit Ausgangsquelle, Podcast und Schaubild](source/public/screens/05-repurpose-job-3-detail.png) | 2.11.2026 | Vollständige Aufnahme |
| 7 | [Chatverlauf mit einem Auftrag für einen Seitenentwurf und der Rückmeldung des Agenten](source/public/screens/agent-chat-2026-11-05.png) | 5.11.2026 | Vollständige Aufnahme |
| 8 | [Vorschau des oberen Seitenbereichs eines generierten Entwurfs](source/public/screens/07-landingpage-07-ergebnis-vorschau-10110.png) | 2.11.2026 | Vergrößerter Ausschnitt |
| 20 | [Kostenübersicht mit Anfragen, Tokenverbrauch und geschätzten Kosten](source/public/screens/17-nr-llm-07-analyse-kosten.png) | 2.11.2026 | Vergrößerter Ausschnitt |
| 24 | [Freigabekarte für die geplante Seitenanlage durch den Agenten](source/public/screens/06-agent-03-schreiben-b-freigabekarte.png) | 2.11.2026 | Vergrößerter Ausschnitt |
| 25 | [Chatantwort mit sichtbarem Verlauf der Modell- und Werkzeugaufrufe](source/public/screens/20-agent-02-lesen-c-aktivitaet.png) | 2.11.2026 | Vergrößerter Ausschnitt |

Beim Chatbild auf Folie 7 ist ein vorhandener Gesprächsverlauf abgebildet.
Der Repurpose-Auftrag auf Folie 6 zeigt erzeugte Artefakte, deren fachliche
Freigabe in der Aufnahme noch aussteht. Die Kosten auf Folie 20 sind eine
historische Anzeige mit Schätzwerten.
