import { Modal } from "@/components/modal";
import type { ReactNode } from "react";

interface FormModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
	children?: ReactNode; // Accept any form component as children
	description?: string;
	title?: string;
}

export const FormModal: React.FC<FormModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	loading,
	children,
	description,
	title,
}) => {
	return (
		<Modal
			title={title || ""}
			description={description || ""}
			isOpen={isOpen}
			onClose={onClose}
		>
			{children}
		</Modal>
	);
};
