import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Comparison } from "../components/Comparison";
import { CallToAction } from "../components/CallToAction";
import DonateBottomRight from "../components/DonateBottomRight";

export default function HomePage() {
	const exam1 = localStorage.getItem("exam_1");

	return (
		<div className="min-h-screen bg-white">
			<Hero />
			<Features />
			<Comparison />
			<CallToAction />
			{exam1 && <DonateBottomRight />}
		</div>
	);
}
