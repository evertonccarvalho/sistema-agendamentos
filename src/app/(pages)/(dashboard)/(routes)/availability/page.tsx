import { AvailabilityForm } from "@/app/(pages)/(dashboard)/components/AvailabilityForm";
import BreadCrumb from "@/components/breadcrumb";
import AvailabilityHeader from "./_components/AvailabilityHeader";
import ContainerWrapper from "@/components/containerWrapper";

export default function AvailabilityPage() {
	const breadcrumbItems = [{ title: "Disponibilidade", link: "/dashboard" }];

	return (
		<main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
			<BreadCrumb items={breadcrumbItems} />
			<AvailabilityHeader />
			<ContainerWrapper>

				<AvailabilityForm />
			</ContainerWrapper>
		</main>
	);
}
