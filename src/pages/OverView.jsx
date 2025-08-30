import React, { useState } from "react";
import { ExamList } from "../components/ExamList";
import { Header } from "../components/Header";
import DonateBottomRight from "../components/DonateBottomRight";

export default function OverView() {
	const [showExams, setShowExams] = useState(true);

	const preExams = Array.from({ length: 12 }, (_, i) => ({
		id: i + 1,
		title: `Examen ${i + 1}`,
		completed:
			JSON.parse(localStorage.getItem(`exam_${i + 1}`)) &&
			JSON.parse(localStorage.getItem(`exam_${i + 1}`)).finished,
		score:
			JSON.parse(localStorage.getItem(`exam_${i + 1}`)) &&
			JSON.parse(localStorage.getItem(`exam_${i + 1}`)).finished
				? JSON.parse(localStorage.getItem(`exam_${i + 1}`)).score
				: null,
		startedAt:
			JSON.parse(localStorage.getItem(`exam_${i + 1}`)) &&
			JSON.parse(localStorage.getItem(`exam_${i + 1}`)).startedAt
				? new Date(
						JSON.parse(
							localStorage.getItem(`exam_${i + 1}`)
						).startedAt
				  )
				: null,
	}));

	const examTitles = [
		{ title: "Aanhangwagen", amount: 2 },
		{ title: "Afstand en snelheid", amount: 2 },
		{ title: "Autosnelweg en autoweg", amount: 2 },
		{ title: "Bestuurder", amount: 2 },
		{ title: "Bewust rijden", amount: 2 },
		{ title: "Cijfers en feiten", amount: 2 },
		{ title: "Gedrag", amount: 2 },
		{ title: "Inzicht", amount: 2 },
		{ title: "Jouw auto", amount: 2 },
		{ title: "Kennis", amount: 3 },
		{ title: "Manoevres", amount: 2 },
		{ title: "Moeilijke vragen", amount: 2 },
		{ title: "Ongevallen en pech", amount: 2 },
		{ title: "Situaties", amount: 2 },
		{ title: "Stilstaan en parkeren", amount: 2 },
		{ title: "Techniek", amount: 2 },
		{ title: "Uitstekende lading", amount: 2 },
		{ title: "Verkeersregelaar", amount: 2 },
		{ title: "Verkeerstekens", amount: 2 },
		{ title: "Verlichting", amount: 2 },
		{ title: "Voorrang", amount: 2 },
		{ title: "Voorrangsituaties", amount: 2 },
		{ title: "Weer", amount: 2 },
		{ title: "Wegen en weggedeelten", amount: 2 },
		{ title: "Weggebruikers", amount: 2 },
		{ title: "Wettelijk", amount: 2 },
		{ title: "Willekeurige verkeersborden", amount: 2 },
	];

	function getExamData(title, amount) {
		return Array.from({ length: amount }, (_, i) => {
			const key = `exam_${title.toLowerCase().replace(/ /g, "_")}_${
				i + 1
			}`;
			const saved = JSON.parse(localStorage.getItem(key));

			return {
				completed: saved?.finished || false,
				score: saved?.finished ? saved.score : null,
				startedAt: saved?.startedAt ? new Date(saved.startedAt) : null,
			};
		});
	}

	const [exams, setExams] = useState(
		examTitles.map((obj, index) => ({
			id: index + 1,
			title: obj.title,
			amount: obj.amount,
			exams: getExamData(obj.title, obj.amount),
		}))
	);

	return (
		<div className="bg-gray-50 min-h-screen">
			<DonateBottomRight />
			<Header />
			<div className="sticky top-0 z-40 bg-gray-50">
				<div className="w-full grid grid-cols-2">
					<div
						onClick={() => {
							setShowExams(true);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
						className={
							"text-center p-2 border-b-2 hover:cursor-pointer " +
							(showExams
								? "border-b-orange-500 bg-orange-500 text-white"
								: "border-b-gray-200")
						}
					>
						<p>Examens</p>
					</div>
					<div
						onClick={() => {
							setShowExams(false);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
						className={
							"text-center p-2 border-b-2 hover:cursor-pointer " +
							(!showExams
								? "border-b-orange-500 bg-orange-500 text-white"
								: "border-b-gray-200")
						}
					>
						<p>Categorieën</p>
					</div>
				</div>
			</div>
			<main className="container mx-auto px-4">
				{showExams && (
					<div className="py-8">
						<h1 className="text-2xl font-bold text-gray-800 mb-2">
							Examens
						</h1>
						<p className="text-gray-500 text-md max-w-[600px]">
							Elk examen bestaat uit 50 vragen. Je hebt 30 minuten
							om het examen te voltooien. Je kunt het examen
							onbeperkt opnieuw maken.
						</p>
					</div>
				)}

				<ExamList
					preExams={preExams}
					exams={exams}
					showExams={showExams}
				/>
			</main>
			<div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
				<div className="p-4 border-t border-white border-opacity-20">
					<p className="text-orange-100 text-center">
						© {new Date().getFullYear()} Auto Theorie Voor Niks —
						Toegankelijke theorie-oefening voor iedereen
					</p>
					<p className="mt-1 text-center">
						Vragen of suggesties? mail ons{" "}
						<a
							href="mailto:info@autotheorievoorniks.nl"
							className="text-blue-200 hover:underline hover:cursor-pointer"
						>
							info@autotheorievoorniks.nl
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
