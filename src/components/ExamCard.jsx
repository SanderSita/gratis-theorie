import React from "react";
import { CheckCircleIcon, ClipboardListIcon, PlayIcon } from "lucide-react";

export const ExamCard = ({ exam }) => {
	const cleanTitle = exam.title;
	const formattedTitle = cleanTitle.toLowerCase().replace(/ /g, "_");

	const getCurrentlyStarted = () => {
		const startedAt = exam.startedAt;
		if (!startedAt) return false;
		const now = new Date();
		const timeDiff = now - startedAt;
		const minutesDiff = Math.floor(timeDiff / 1000 / 60);
		return minutesDiff < 30; // Check if started within the last 40 minutes
	};

	const currentlyStarted = getCurrentlyStarted();

	const goToExam = (num) => {
		if (!currentlyStarted || exam.completed)
			localStorage.removeItem("exam_" + formattedTitle + "_" + num); // Clear any previous exam data
		window.location.assign("/examen/" + formattedTitle + "_" + num);
	};

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
			<div className="h-48 overflow-hidden">
				<img
					src={
						"/data/questions/examen_" +
						formattedTitle +
						"_1/cover.jpg"
					}
					alt={exam.title}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="p-6 flex flex-col flex-1">
				<div className="flex justify-between items-start mb-4">
					<h3 className="text-lg font-semibold text-gray-800">
						{exam.title}
					</h3>
					{exam.completed && (
						<div className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full flex items-center">
							<CheckCircleIcon size={16} className="mr-1" />
							<span>Voltooid</span>
						</div>
					)}
				</div>
				{exam.completed && (
					<div className="mb-4">
						<p className="text-gray-600">
							<span className="font-medium">Score:</span>{" "}
							{exam.score}
						</p>
					</div>
				)}

				<div className="mt-auto flex flex-col justify-end gap-3 pt-4">
					{exam.exams.map((item, i) => {
						const passed =
							typeof item.score === "string" &&
							item.score.includes(" ") &&
							parseFloat(item.score.split(" ")[0]) >= 7;
						return (
							<div className="w-full" key={i}>
								{item.completed ? (
									<div className="grid grid-cols-2">
										<button
											onClick={() => goToExam(i + 1)}
											className="bg-[#FF7A30] text-white px-4 py-2 rounded-l-lg font-medium hover:bg-[#e66e29] transition-colors flex items-center"
										>
											<PlayIcon
												size={18}
												className="mr-2"
											/>
											Oefen vragen {i + 1}
										</button>
										<button
											onClick={() =>
												window.location.assign(
													"/examen/" +
														formattedTitle +
														"_" +
														(i + 1) +
														"/resultaat"
												)
											}
											className={`flex items-center px-4 py-2 rounded-r-lg font-medium transition-colors ${
												passed
													? "bg-green-100 hover:bg-green-200 text-green-800"
													: "bg-red-100 hover:bg-red-200 text-red-800"
											}`}
										>
											<ClipboardListIcon
												size={18}
												className="mr-2"
											/>
											Bekijk Resultaten
										</button>
									</div>
								) : (
									<button
										onClick={() => goToExam(i + 1)}
										className="bg-[#FF7A30] text-white w-full px-4 py-2 rounded-lg font-medium hover:bg-[#e66e29] transition-colors flex items-center"
									>
										<PlayIcon size={18} className="mr-2" />
										Oefen vragen {i + 1}
									</button>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
