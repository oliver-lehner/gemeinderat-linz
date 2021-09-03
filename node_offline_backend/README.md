# Das "Backend"

Hier liegen die rohen Dateien und Scripte, aus denen die _gr-results.json_ entstanden ist.

## Web-Scraping

Das Scrapen passierte nicht programmatisch, ich habe dafür das FF Plugin [Web Scraper](https://www.webscraper.io) benutzt. Um selbst die Dateien zu scrapen kannst du die _sitemap.txt_ in das Plugin exportieren. Der Output aus dem Scrape-Vorgang ist _repair.csv_. Diese wiederum hab ich mit der VS Code Extension [JSON to CSV](https://marketplace.visualstudio.com/items?itemName=khaeransori.json2csv) in _repair.json_ umgewandelt, die den Input zum Node Script liefert. Ich wollte lange vermeiden, diese Datei manuell zu bearbeiten. Es blieb aber nicht aus, einige Tippfehler, "falsche" Leerzeichen und Formatierungen bei komplexeren Abstimmungen (zB Schreibweise bei NEOS-Alleingängen), musste ich händisch korrigieren, um mit den Regular Expressions nicht wahnsinnig zu werden. Wenn du dich um die Integrität der Daten sorgst, kannst du gerne deine eigene "repair.json" anfertigen und die Unterschiede zu meiner prüfen.

## Daten-Transformation

Die Magie passiert __natürlich__ in _index.ts._ Hier werden die unsauberen Daten in die _gr-results.json_ umgewandelt, das Rückgrat dieses Projekts. Dabei werden alle Datenpunkte durchgegangen und Infos zu den Abstimmungen mittels RegEx extrahiert.

