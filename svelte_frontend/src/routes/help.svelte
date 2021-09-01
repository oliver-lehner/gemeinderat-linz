<script lang="ts">
	import type { Motion } from '$lib/types';
	import Card from '$lib/Card/index.svelte';
	import Pie from '$lib/PieChart/pie.svelte';

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

<div>
	<div class="w-full sticky p-2 sm:p-4 top-16 sm:top-10 z-40 bg-gray-800">
		<h1 class="text-amber-400">Wie wird ein Antrag dargestellt?</h1>
	</div>
	<div class="grid grid-cols-2 sm:grid-cols-3 max-w-3xl">
		<div class="sm:col-span-1">
			<Card motion={example} />
		</div>
		<div class="sm:col-span-2 text-gray-100">
			<div class="m-1 p-2 sm:m-2 sm:p-4 flex flex-col">
				<div
					class="border-1 border-gray-300 -mx-2 -mt-2 sm:-mx-4 sm:-mt-4 px-2 sm:px-4 py-1 h-10 text-sm leading-4 rounded-t flex flex-row shadow-md hyphens-auto"
				>
					<p class="line-clamp-2">
						Sitzungsnummer & -datum, sowie der Tagesordnungspunkt des Antrags stehen ganz oben.
					</p>
				</div>
				<div class="line-clamp-6 h-24 my-2">
					<h2 class="hover:text-blue-200 active:text-blue-300 hyphens-auto">
						Ein Klick auf den Antragstitel öffnet die Wortmeldung auf der Seite der Stadt Linz.
					</h2>
				</div>
				<div class="relative text-sm leading-4">
					<p>So werden die Abstimmungsergebnisse angezeigt:</p>
					<div class="grid grid-cols-5 my-2 gap-2 gap-x-4">
						<div class="col-span-1 w-12 min-h-12 relative flex items-start">
							<Pie parties={undefined} type={'pro'} />
						</div>
						<div class="col-span-4">
							<p>Das Diagramm auf der Spitze der Pyramide zeigt die Stimmen dafür.</p>
						</div>
						<div
							class="col-span-1 w-12 min-h-12 relative flex flex-col items-start justify-start justify-items-start content-start"
						>
							<Pie parties={undefined} type={'withheld'} />
						</div>
						<div class="col-span-4">
							<p>
								Die Linzer Torte links unten zeigt die Enthaltungen. Also Parteien die "nicht dafür"
								sind und den Antrag damit zwar blockieren, aber auch nicht "dagegen" sind.
								Vielleicht lohnt es sich dem Link zur Wortmeldung zu folgen.
							</p>
						</div>
						<div class="col-span-1 w-12 min-h-12 relative">
							<Pie parties={undefined} type={'contra'} />
						</div>
						<div class="col-span-4">
							<p>Das Diagramm rechts unten zeigt die Gegenstimmen an.</p>
						</div>
					</div>
					<p>
						Gab es für den Antrag mehrere Abstimmungen, zB weil Zusatzanträge oder Änderungen
						eingebracht wurden, kannst du diese mittels des Plus Buttons anzeigen.
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="w-full sticky p-2 sm:p-4 top-16 sm:top-12 z-40 bg-gray-800">
		<h1 class="text-amber-400">"Rechtliches"</h1>
		<p class="max-w-prose">
			Die Daten wurden automatisiert verarbeitet und können trotz gründlicher Prüfung fehlerhaft sein. Wie die Datenbasis
			zustande gekommen ist, wird näher im <a
				href="https://github.com/oliver-lehner/gemeinderat-linz">Github-Repository</a
			>
			erklärt. Falls dir ein Fehler auffallen sollte oder du fragen hast, schreib mir doch eine
			<a href="mailto:oliver.r.lehner@gmail.com">Email</a>. Es werden keine personenbezogenen Daten verarbeitet und auch keine Cookies gesetzt.
		</p>
	</div>
  <div class="w-full sticky p-2 sm:p-4 top-16 sm:top-12 z-40 bg-gray-800">
		<h1 class="text-amber-400">Impressum</h1>
		<p class="whitespace-pre-line">
			Für den Inhalt dieser Seite verantwortlich:
      Oliver Lehner
      Leibnizstraße 17a
      4020 Linz
		</p>
	</div>
</div>
