import { AvailabilityForm } from "@/app/(pages)/(dashboard)/components/AvailabilityForm";

export default function AvailabilityPage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Disponibilidade</h1>
			<AvailabilityForm />
		</main>
	);
}
