# KI in TYPO3 – MTUG, 9. November 2026

[Veranstaltungsfassung](https://netresearch.github.io/modularer-ki-stack-page/vortraege/mtug-2026-11-09/)

Die korrigierte Abkürzung lautet **MTUG**. Bereits geteilte Links mit der alten
Schreibweise `tmuc-2026-11-09` bleiben einschließlich Folienpositionen und
PDF-Downloads erreichbar.

Bis zum Vortrag wird diese Fassung aus `talks/vorlage/source/` abgeleitet.
Inhaltliche Änderungen werden dort vorgenommen; `scripts/prepare_talks.py`
setzt hier den Veranstaltungstitel, das Datum und den eigenen PDF-Namen ein.

Am 9. November wird der abschließend geprüfte Vortragsstand ausdrücklich
eingefroren. Es gibt keinen vorgezogenen Freeze und keinen automatisch
gewählten Zeitpunkt um Mitternacht.

Nach dem letzten vollständigen Build und Browsercheck:

```sh
python3 scripts/freeze_talk.py mtug-2026-11-09
python3 scripts/publish_talks.py
```

Der Freeze erstellt `snapshot/`, `snapshot.sha256.json` und
`source.sha256.json`. Diese drei Archivteile zusammen mit den geprüften Quellen
versionieren. Ab dann wird die Veranstaltungsfassung bei neuen Veröffentlichungen
unverändert aus dem Snapshot ausgeliefert. Weitere Verbesserungen betreffen nur
die neutrale Vorlage.
