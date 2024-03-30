"use client";
import axios from "axios";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import PricingCardSubscriber from "@/app/(pages)/(dashboard)/(routes)/dashboard/_components/PricingCardSubscriber";
import { pricingList } from "@/lib/const";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}
export const ProModal = ({ isOpen, onClose }: ModalProps) => {
	const [loading, setloading] = useState(false);

	const onChange = (open: boolean) => {
		if (!open) {
			onClose();
		}
	};

	const onSubscribe = async () => {
		try {
			setloading(true);
			const response = await axios.get("/api/stripe");

			window.location.href = response.data.url;
		} catch (error) {
			toast.error("Something went wrong.");
		} finally {
			setloading(false);
		}
	};

	return (
		<div>
			<Dialog open={isOpen} onOpenChange={onChange}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
							<div className="flex items-center  gap-x-2 font-bold py-1">
								Atualize
							</div>
						</DialogTitle>
						<DialogDescription className="pt-2 space-y-2 text-foreground font-medium">
							<PricingCardSubscriber pricing={pricingList[1]} />
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							disabled={loading}
							onClick={onSubscribe}
							size="lg"
							variant="premium"
							className="w-full"
						>
							Atualizar
							<Zap className="w-4 h-4 ml-2 fill-white" />
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};
