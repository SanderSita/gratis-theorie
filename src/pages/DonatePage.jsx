import DonateSection from "../components/DonateSection";

export default function DonatePage() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-blue-100 py-20 px-4 sm:min-h-screen">
        <DonateSection onClose={null} />
    </div>
  );
}
