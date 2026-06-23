# Projektbrief: Modularer KI-Stack

## Ziel

Die Website visualisiert den Stack `nr-vault | nr-llm | nr-repurpose` als aufeinander aufbauenden Wertstrom. Die Darstellung erklärt nicht nur einzelne Module, sondern zeigt, welche Problemlösung durch welche Ausbaustufe entsteht.

## Leitidee

Der Stack wächst mit dem Problem: von sicherer KI-Governance über Content-Produktion bis zur automatisierten Channel-Bespielung.

## Wertstrom

1. Wissen sichern
2. KI kontrolliert auf dieses Wissen zugreifen lassen
3. Inhalte erzeugen, umwandeln und strukturieren
4. Inhalte veröffentlichen und Kanäle bedienen

## Ausbaustufen

| Stack | Problemlösung | Zielgruppen |
| --- | --- | --- |
| `nr-vault` + `nr-llm` + optional lokales LLM | Unternehmenswissen sicher nutzbar machen, KI kontrollierbar einsetzen und Governance-Anforderungen erfüllen. | Controlling, Audit, Governance, Compliance |
| `nr-vault` + `nr-llm` + `nr-repurpose` | Bestehendes Wissen in CMS-fähige Inhalte, Varianten und Textbausteine umwandeln. | Redaktion, Marketing, CMS-Teams, Knowledge Management |
| `nr-vault` + `nr-llm` + `nr-repurpose` + `typo3-ext-linked-poster` | Inhalte kanalübergreifend ausspielen und Publishing-Prozesse anbinden. | Social Media, Corporate Communications, Content Operations, TYPO3-Teams |

## Seitenlogik

Die Seite startet mit den Problemen, nicht mit der Tool-Liste:

- Lässt sich KI sicher und kontrolliert nutzen?
- Lässt sich bestehendes Wissen schneller in Content verwandeln?
- Lässt sich dieser Content effizient über Kanäle ausspielen?

Die Antwort ist ein modularer Stack, der je nach Bedarf erweitert wird. Jede Ebene zeigt nur die neu hinzukommende Komponente; der bestehende Unterbau wird im Detailpanel sichtbar.

## Visualisierung

Die Seite nutzt eine vertikale Layer-Logik:

1. `nr-vault` und `nr-llm` bilden die KI-Basis.
2. `nr-repurpose` ergänzt die Content-Schicht.
3. `typo3-ext-linked-poster` ergänzt die Distribution-Schicht.

Dadurch entsteht ein Schaubild, das den Weg von Wissen über KI und Content bis zu den Kanälen nachvollziehbar macht.
