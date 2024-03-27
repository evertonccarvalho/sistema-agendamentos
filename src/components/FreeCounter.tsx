'use client';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import { MAX_FREE_COUNTS } from '@/lib/const';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { ProModal } from './ProModal';

interface FreeCounterProps {
	apiLimitCount: number;
	isPro: boolean;
}
export const FreeCounter = ({ apiLimitCount, isPro }: FreeCounterProps) => {
	// const proModal = useProModal();
	const [mounted, setMounted] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	if (isPro) {
		return null;
	}

	return (
		<>
			<div className="px-3">
				<Card className="bg-secondary border-0">
					<CardContent className="py-6">
						<div className="text-center text-sm text-foreground mb-4 space-y-2">
							<p>
								{apiLimitCount} / {MAX_FREE_COUNTS} Tipos de Serviços
							</p>
							<Progress
								className="h-3"
								value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
							/>
						</div>
						<Button
							onClick={() => setOpen(true)}
							variant={'premium'}
							className="w-full"
						>
							Atualizar <Zap className="w-4 h-4 fill-white" />
						</Button>
					</CardContent>
					<ProModal isOpen={open} onClose={() => setOpen(false)} />
				</Card>
			</div>
		</>
	);
};
