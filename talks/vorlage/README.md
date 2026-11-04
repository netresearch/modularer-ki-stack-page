# KI in TYPO3 – neutrale Vorlage

[Aktuelle Fassung](https://netresearch.github.io/modularer-ki-stack-page/vortraege/vorlage/)

Dies ist die fortlaufend verbesserte, veranstaltungsneutrale Hauptfassung.
Inhalte und Gestaltung werden in `source/` bearbeitet. Der erste Stand übernimmt
die TUGLE-Folien mit neutralem Titelblatt; die inhaltliche Nachbesprechung vom
4. November wird ausschließlich hier eingearbeitet.

Abschnitt 2 heißt „Fragen zum KI-Einsatz“. Das verworfene Wort „Einsatzfragen“
nicht als Abschnittsname verwenden.

Nach Änderungen aus dem Repository-Verzeichnis:

```sh
python3 scripts/prepare_talks.py
node scripts/build_talks.mjs
node scripts/verify_talk.mjs vorlage
node scripts/verify_talk.mjs tmuc-2026-11-09
python3 scripts/publish_talks.py
```

Der Build erstellt für jede aktive Fassung ein passendes PDF. Sprechernotizen
gehören nicht in diese öffentlich veröffentlichte Quelle.

Bis zum Freeze wird TMUC aus der Vorlage mit eigenem Veranstaltungstitel und
Datum erzeugt. Das bereits eingefrorene TUGLE-Archiv wird weder verändert noch
neu gebaut.
