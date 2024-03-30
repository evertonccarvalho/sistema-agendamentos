import { useEffect, useState } from "react";
import { Button, type buttonVariants } from "@/components/ui/button"; // Supondo que a importação do Button e suas variantes seja assim
import { Modal } from "./modal";

interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
	title: string;
	description: string;
	buttonVariant?: keyof typeof buttonVariants;
}

export const AlertModal: React.FC<AlertModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	loading,
	title,
	description,
	buttonVariant,
}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Modal
			title={title}
			description={description}
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="pt-6 space-x-2 flex items-center justify-end w-full">
				<Button disabled={loading} variant="outline" onClick={onClose}>
					Cancel
				</Button>
				<Button disabled={loading} variant={buttonVariant} onClick={onConfirm}>
					Continue
				</Button>
			</div>
		</Modal>
	);
};
