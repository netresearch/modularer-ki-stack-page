# Quellen zum Vortrag

Sebastian Mendel · Netresearch · TUGLE · 3. November 2026

Die technischen nr-llm-Erklärungen beziehen sich auf v0.35.0. Die Demoaufnahmen stammen vom 2. November 2026. Andere Projekte werden anhand ihrer Dokumentation eingeordnet.

## Folie 5: Ein Inhalt, mehrere Formate

- [Ausgangsartikel des Demo-Auftrags](https://www.netresearch.de/blog/ki-kennzeichnung-auf-websites-was-jetzt-wirklich-gekennzeichnet-werden-muss/)

## Folie 12: Fünf Anwendungen, eine KI-Anbindung

- [nr-llm: Demo-Quellstand v0.35.0](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/README.md)

## Folie 13: Anbieter, Modell und Aufgabe trennen

- [nr-llm: Demo-Quellstand v0.35.0](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/README.md)

## Folie 14: Wiederkehrende Aufgaben, gemeinsame Regeln

- [Tasks](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Tasks.rst)
- [Prompt-Snippets](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/PromptSnippets.rst)

## Folie 15: Die Anwendung liefert den Kontext

- [Prompt-Snippets](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/PromptSnippets.rst)
- [Kontextaufbau als Integrationspunkt](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Adr/Adr139ContextAssemblyIsASeam.rst)

## Folie 17: Kosten schätzen und Nutzung begrenzen

- [Analytics](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Analytics.rst)
- [Grenzen der Benutzerbudgets](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/UserBudgets.rst#L102)

## Folie 18: Welche Daten gehen an welchen Anbieter?

- [nr-llm: Demo-Quellstand v0.35.0](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/README.md)

## Folie 19: Werkzeugzugriff und Schreibfreigaben

- [Standardwerkzeuge und Schreibfreigaben](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Tools.rst#L292)

## Folie 20: Was hat der Agent tatsächlich getan?

- [Bindung von Audit, Freigabe und Agentenschritt](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Adr/Adr132ApprovalAuditAndTurnBinding.rst#L68)

## Folie 22: Wie kann ein Agent mit TYPO3 arbeiten?

- [MCP-Client in nr-llm](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/McpServers.rst)
- [MCP: Architektur von Client und Server](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture)

## Folie 23: A2A: Ein Agent beauftragt einen anderen

- [Offizielle Einordnung von A2A und MCP](https://a2a-protocol.org/latest/topics/a2a-and-mcp/)

## Folie 25: KI-Schichten und MCP-Server für TYPO3

- [Netresearch · nr-llm](https://github.com/netresearch/t3x-nr-llm)
- [b13 · AiM](https://github.com/b13/aim)
- [NITSAN / T3Planet · AI Foundation](https://docs.typo3.org/p/nitsan/ns-t3af/main/en-us/Index.html)
- [hauptsache.net · TYPO3 MCP Server](https://github.com/hauptsacheNet/typo3-mcp-server)
- [Marek Skopal · TYPO3 MCP Server](https://github.com/marekskopal/typo3-mcp-server)
- [AutoDudes · AI Suite MCP (Zusatz)](https://github.com/autodudesde/ai-suite#mcp-server-optional-sub-extension)
- [Netresearch · nr-llm](https://github.com/netresearch/t3x-nr-llm)
- [b13 · AiM (Alpha)](https://github.com/b13/aim)
- [NITSAN / T3Planet · AI Foundation](https://docs.typo3.org/p/nitsan/ns-t3af/main/en-us/Index.html)
- [hauptsache.net · TYPO3 MCP Server](https://github.com/hauptsacheNet/typo3-mcp-server)
- [Marek Skopal · TYPO3 MCP Server](https://github.com/marekskopal/typo3-mcp-server)
- [AutoDudes · AI Suite MCP (Zusatz)](https://github.com/autodudesde/ai-suite#mcp-server-optional-sub-extension)

## Folie 27: Welche Fragen sind noch offen?

- [nr-llm: Demo-Quellstand v0.35.0](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/README.md)
- [TYPO3-Demo](https://typo3-demo.netresearch.de/)

## Folie 28: Links zu Demos und Anwendungen

- [Öffentliche TYPO3-Demo](https://typo3-demo.netresearch.de/)
- [TYPO3-Backend · Anmeldung nötig](https://typo3-demo.netresearch.de/typo3/main)
- [AI Search · Backend-Vorschau](https://typo3-demo.netresearch.de/extensions/ai-search)
- [Landingpage-Entwurf · Backend-Vorschau](https://typo3-demo.netresearch.de/?id=10110)
- [Ausgangsartikel des Repurpose-Beispiels](https://www.netresearch.de/blog/ki-kennzeichnung-auf-websites-was-jetzt-wirklich-gekennzeichnet-werden-muss/)
- [Cowriter](https://github.com/netresearch/t3x-cowriter)
- [AI Search · Demo-Übersicht](https://typo3-demo.netresearch.de/extensions)
- [Repurpose](https://github.com/netresearch/t3x-nr-repurpose)
- [Backend-Agent](https://github.com/netresearch/t3x-nr-mcp-agent)
- [Landingpage](https://github.com/netresearch/nr-landingpage)

## Folie 29: Quellen zu KI-Grundlagen und MCP

- [Modularer KI-Stack · Module und Voraussetzungen](https://netresearch.github.io/modularer-ki-stack-page/)
- [nr-llm · Projekt und Dokumentation](https://github.com/netresearch/t3x-nr-llm)
- [nr-llm · für die Folien geprüfter Quellstand](https://github.com/netresearch/t3x-nr-llm/tree/6afad3444ceb0ef3f206f6687df8d23eb881f496)
- [MCP · Architektur von Client und Server](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture)
- [A2A und MCP · offizielle Einordnung](https://a2a-protocol.org/latest/topics/a2a-and-mcp/)
- [Symfony AI Platform · PHP-Unterbau](https://symfony.com/doc/current/ai/components/platform.html)
- [b13 AiM · TYPO3-KI-Schicht](https://github.com/b13/aim)
- [NITSAN / T3Planet · AI Foundation](https://docs.typo3.org/p/nitsan/ns-t3af/main/en-us/Index.html)
- [hauptsache.net · TYPO3 MCP Server](https://github.com/hauptsacheNet/typo3-mcp-server)
- [Marek Skopal · TYPO3 MCP Server](https://github.com/marekskopal/typo3-mcp-server)
- [AutoDudes · AI Suite MCP (Zusatz)](https://github.com/autodudesde/ai-suite#mcp-server-optional-sub-extension)

## Folie 31: Formale Vorgaben werden maschinell geprüft

- [Strukturierte Ausgabe mit lokaler Prüfung und einem Reparaturversuch](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Feature/CompletionService.php#L105-L165)
- [Strikter Schema-Validator: Typen, Werte, Textlängen](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Schema/JsonSchemaValidator.php#L125-L224)

## Folie 32: Qualität wird an Beispielaufgaben gemessen

- [Qualitäts-Evaluation: Testsets, Bewertungsverfahren und Regressionen](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Developer/QualityEvaluation.rst#L9-L150)

## Folie 33: Skills werden als Prompt-Kontext eingebunden

- [Skills: Quellen, Freigabe, Zuordnung und Einbindung](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Skills.rst#L8-L226)
- [SkillComposer: Prüfsumme und begrenzter Kontextblock](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Skill/SkillComposer.php#L45-L132)
- [Einbindung am Anfang des Tool-Loops](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Tool/ToolLoopService.php#L854-L875)

## Folie 34: MCP verbindet den Agenten mit Werkzeugen

- [MCP-Verbindung, Import und Grenzen](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/McpServers.rst#L8-L142)
- [MCP tools/call und Textresultat](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Tool/Mcp/McpClient.php#L172-L204)
- [MCP-Werkzeuge setzen Administratorrechte voraus](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Tool/Mcp/McpTool.php#L137-L140)

## Folie 35: Ein Agent arbeitet in einer begrenzten Schleife

- [Tool-Loop: Modellrunde, Freigabe, Ergebnis und Grenzen](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Tool/ToolLoopService.php#L330-L522)
- [Freigabe und Fortsetzung eines Agentenlaufs](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/AgentRuns.rst#L125-L160)
- [Backend-Agent delegiert an nr-llm AgentRuntime](https://github.com/netresearch/t3x-nr-mcp-agent/blob/22c2ec8a119da00c39c6ae0062d7378dd2d2b7c5/Classes/Service/ChatService.php#L220-L262)

## Folie 36: Wie bindet eine eigene Extension nr-llm ein?

- [Öffentliches CompletionServiceInterface](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Feature/CompletionServiceInterface.php#L17-L98)
- [DI-Alias für CompletionServiceInterface](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Configuration/Services.yaml#L159-L168)
- [Task-Aufruf und Verantwortung des Aufrufers](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Task/TaskExecutionServiceInterface.php#L15-L42)
- [Task-Prompt, Konfiguration, Skills und Ergebnis](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Task/TaskExecutionService.php#L47-L134)

## Folie 37: Woher kommen Kontext und Wissen?

- [Suchwerkzeug: Evidenz mit Titel, URL und Auszug](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Tool/Builtin/SiteRagQueryTool.php#L26-L110)
- [Suchkaskade und leeres Ergebnis](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Retrieval/RetrievalService.php#L14-L81)
- [Grenze zwischen nr-llm und dauerhaftem Vektorindex](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Adr/Adr050RetrievalAndEmbeddingScopeBoundary.rst#L54-L132)
- [Öffentlicher Zugriffskontext der Retrieval-Adapter](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Retrieval/AccessContext.php#L15-L25)

## Folie 38: Was passiert bei Fehlern oder zu viel Kontext?

- [Begrenzte Transportwiederholung und Timeout-Verhalten](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Provider/AbstractProvider.php#L346-L406)
- [Fallback bei passenden Fehlerklassen](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Provider/Middleware/FallbackMiddleware.php#L22-L44)
- [Kontext: alte vollständige Runden entfernen](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Context/ContextWindowManager.php#L313-L338)
- [Normaler Prompt-Überlauf wird gemeldet, nicht heimlich gekürzt](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/LlmServiceManager.php#L354-L432)
- [Streaming-Fallback nur vor dem ersten Chunk](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/LlmServiceManager.php#L1490-L1500)

## Folie 39: Ein Modellwechsel braucht einen Eignungstest

- [Benannte Konfiguration, Modell und Parameter](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Configurations.rst#L9-L12)
- [Deklarierte Fähigkeiten und Auswahlkriterien](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Models.rst#L76-L175)
- [Rückfall nur bei passenden Fehlerklassen](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Provider/Middleware/FallbackMiddleware.php#L85-L118)
- [Fehlertaxonomie für Rückfall](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Provider/Middleware/FallbackMiddleware.php#L209-L215)

## Folie 40: Werkzeugzugriff braucht mehrere Freigaben

- [Prüfung von Aktivierung, Adminpflicht, Konfiguration und Vertrauenszone](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/Tool/ToolCallPolicy.php#L52-L99)
- [Werkzeuggruppen auf drei Ebenen](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Tools.rst#L683-L701)
- [Eingebaute Schreibwerkzeuge: Freigabe und TYPO3-Rechte](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Tools.rst#L287-L315)
- [Getrennte Ausführungs- und Freigaberechte](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Permissions.rst#L36-L88)
- [Fortsetzen unter der Identität des Eigentümers](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/AgentRuns.rst#L15-L21)

## Folie 41: Betrieb braucht Messwerte und Löschroutinen

- [Nutzungskennzahlen, Kosten und Aufschlüsselung](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Analytics.rst#L60-L144)
- [Kosten sind Schätzungen](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/Analytics.rst#L254-L264)
- [Run-Timeline und Sichtbarkeit](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/AgentRuns.rst#L78-L112)
- [Fortsetzungszustand wartender Agentenläufe](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/AgentRuns.rst#L199-L218)
- [Speicherumfang, Fristen und geplanter Purge](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/DataRetention.rst#L15-L114)

## Folie 42: Wann lohnt sich eine gemeinsame KI-Grundlage?

- [Modularer KI-Stack: Aufgaben, Module und Voraussetzungen (aktueller Überblick)](https://netresearch.github.io/modularer-ki-stack-page/)
- [nr-llm v0.35.0: Beispielaufgaben bewerten und Läufe vergleichen](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Developer/QualityEvaluation.rst#L9-L18)

## Folie 43: Wie begrenzen wir Kosten?

- [BudgetService: zwei Budgetebenen und Grenze bei parallelen Aufrufen](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Service/BudgetService.php#L20-L46)
- [Budget-Vorabprüfung: Nutzerzuordnung, Plankosten und Rückfallkonfiguration](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Provider/Middleware/BudgetMiddleware.php#L17-L59)
- [Nutzungserfassung: geschätzte Kosten aus Antwort oder Modellpreis](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Classes/Provider/Middleware/UsageMiddleware.php#L191-L219)

## Folie 44: Was muss vor dem produktiven Einsatz geklärt sein?

- [Modularer KI-Stack: Datenverarbeitung und Zuständigkeiten (aktueller Überblick)](https://netresearch.github.io/modularer-ki-stack-page/)
- [nr-llm v0.35.0: lokale Speicherung und Aufbewahrungsfristen](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/DataRetention.rst#L9-L68)
- [nr-llm v0.35.0: Werkzeugaufrufe prüfen und einen Turn freigeben](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Administration/AgentRuns.rst#L117-L134)
- [nr-llm v0.35.0: ausdrücklich gestartete Qualitätstests](https://github.com/netresearch/t3x-nr-llm/blob/6afad3444ceb0ef3f206f6687df8d23eb881f496/Documentation/Developer/QualityEvaluation.rst#L9-L18)

## Folie 45: Welche gemeinsame KI-Schicht passt zur Integration?

- [nr-llm – geprüfter Demo-Quellstand](https://github.com/netresearch/t3x-nr-llm/tree/6afad3444ceb0ef3f206f6687df8d23eb881f496)
- [b13 AiM – Konzept und Provider-Bridges](https://github.com/b13/aim)
- [AI Foundation – eigene Extension anbinden](https://docs.typo3.org/p/nitsan/ns-t3af/main/en-us/DeveloperGuide/ExtensionIntegration/Index.html)
- [Symfony AI Platform – PHP-Unterbau](https://symfony.com/doc/current/ai/components/platform.html)
- [AutoDudes – optionaler MCP-Server](https://github.com/autodudesde/ai-suite#mcp-server-optional-sub-extension)

## Folie 46: MCP-Server: welcher Zugang zu TYPO3?

- [hauptsache.net: Projekt und Betriebsmodell](https://github.com/hauptsacheNet/typo3-mcp-server/blob/058602609d372b34d35ec9e3410e2d4594b36c82/README.md)
- [hauptsache.net: erweiterbare Werkzeugregistrierung](https://github.com/hauptsacheNet/typo3-mcp-server/blob/058602609d372b34d35ec9e3410e2d4594b36c82/Classes/MCP/ToolRegistry.php)
- [Marek Skopal: direkter Betrieb, optionale Workspaces und eigene Tools](https://github.com/marekskopal/typo3-mcp-server/blob/35aa29329edb708afac0d23b445ba29cb4fcff7e/README.md)
- [AutoDudes: MCP-Server als optionale Suite-Erweiterung](https://github.com/autodudesde/ai-suite/blob/4dc57e5d09aed931c4f2ef46e59ba9bf5d5727c0/README.md#L501-L507)

## Folie 47: Welche Grundlagen gibt es für eigene Wissenssuche?

- [EXT:index: Indexierungsframework](https://github.com/lochmueller/index)
- [seal_ai: Symfony AI, Vektorsuche und MCP-Suche](https://github.com/lochmueller/seal_ai)
- [smart_search: Dienste und Alpha-Status](https://github.com/boehmmatthias/smart-search)
