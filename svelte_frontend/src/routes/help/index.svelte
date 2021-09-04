<script lang="ts">
	import type { Motion } from '$lib/types';
	import Card from '$lib/Card/index.svelte';
	import Pie from '$lib/PieChart/pie.svelte';
	import Personals from './personals.svelte';

	const example: Motion = {
		title: 'Hier steht der Titel des Antrags',
		id: '00A0',
		submitter: 'SPÖ',
		url: 'TopId=XXXX',
		meta: {
			date: '2021-09-01T13:00:00.000Z',
			agendaText: 'Tagesordnungspunkt',
			meetingUrl: 'GrId=84',
			meetingNo: 42,
			index: 5,
			agendaItem: 'D'
		},
		votes: [
			{
				subject: 'Abstimmung',
				passed: true,
				meta: ['grün heißt: angenommen!'],
				withheld: ['Die Grünen', 'NEOS'],
				contra: ['KPÖ']
			},
			{
				subject: 'Zusätzliche Abstimmung (Kapitel, Zusatz, Änderung...)',
				passed: false,
				meta: ['rot heißt: abgelehnt!', 'grau heißt: Zusatzinfo! (Befangenheit, Abwesenheit,...)'],
				withheld: ['SPÖ', 'FPÖ', 'ÖVP'],
				contra: ['KPÖ']
			}
		]
	};
</script>

<div class="text-sm text-gray-100">
<section class="">
	<h1 class="sticky-header">Wie wird ein Antrag dargestellt?</h1>
	<div class="grid grid-cols-1 sm:grid-cols-3 max-w-3xl">
		<div class="sm:col-span-1">
			<Card motion={example} />
		</div>

			<div class="flex flex-col gap-y-2">
			<h3>Kopf- und Titelzeile</h3>
				<p>Sitzungsnummer & -datum, sowie der Tagesordnungspunkt des Antrags stehen ganz oben.</p>
				<p>Ein Klick auf den Antragstitel öffnet die Wortmeldung auf der Seite der Stadt Linz.</p>
				<h3>Abstimmung(en)</h3>
				<p>
					Die Hintergrundfarbe entspricht der Farbe jener Partei, die den Antrag einbringt bzw. als
					Berichterstatterin aufscheint.
				</p>
				<div class="flex flex-col">
					<div class="flex-1 flex flex-row items-start mt-4">
						<div class="w-12 h-12 relative">
							<Pie parties={undefined} type={'pro'} />
						</div>
						<p class="flex-1">Das Diagramm auf der Spitze der Pyramide zeigt die Stimmen dafür.</p>
					</div>
					<div class="flex-1 flex flex-row items-start">
						<div class="w-12 h-12 relative">
							<Pie parties={undefined} type={'withheld'} />
						</div>
						<p class="flex-1">
							Die Linzer Torte links unten zeigt die Enthaltungen. Also Parteien die "nicht dafür"
							sind und den Antrag damit zwar blockieren, aber auch nicht "dagegen" sind. Vielleicht
							lohnt es sich dem Link zur Wortmeldung zu folgen.
						</p>
					</div>
					<div class="flex-1 flex flex-row items-start">
							<div class="w-12 h-12 relative">
								<Pie parties={undefined} type={'contra'} />
							</div>
							<p class="flex-1">Das Diagramm rechts unten zeigt die Gegenstimmen an.</p>
						</div>
				</div>
				<p>
					Gab es für den Antrag mehrere Abstimmungen, zB weil Zusatzanträge oder Änderungen
					eingebracht wurden, kannst du diese mit dem <span class="text-green-500 text-lg leading-5">+</span> Button anzeigen.
				</p>
	
			</div>
	</div>
</section>
<section class="min-h-full">
	<h1 class="sticky-header">"Rechtliches"</h1>
	<p class="max-w-prose">
		Die Daten wurden automatisiert verarbeitet und können trotz gründlicher Prüfung fehlerhaft sein.
		Wie die Datenbasis zustande gekommen ist, wird näher im <a
			href="https://github.com/oliver-lehner/gemeinderat-linz">Github-Repository</a
		>
		erklärt. Falls dir ein Fehler auffallen sollte oder du fragen hast, schreib mir doch eine
		<a href="mailto:oliver.r.lehner@gmail.com">Email</a>.
	</p>
</section>
<section class="">
	<h1 class="sticky-header">DSGVO & Cookies</h1>
	<p class="max-w-prose">
		Ich benutze <a href="https://www.goatcounter.com/">Goat Counter</a> um Besuchende zu zählen. Dabei
		werden keine personenbezogenen Daten verarbeitet und auch keine Cookies gesetzt.
	</p>
</section>

<section class="">
	<h1 class="sticky-header">Impressum</h1>
	<p>Für den Inhalt dieser Seite verantwortlich:</p>
	<Personals />
</section>
</div>
<style lang="postcss">
	.sticky-header {
		@apply w-full sticky py-2 top-0 z-40 bg-gray-800 text-amber-400;
	}
</style>
