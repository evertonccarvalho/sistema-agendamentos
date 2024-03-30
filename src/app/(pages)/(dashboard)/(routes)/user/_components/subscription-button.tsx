'use client';

import axios from 'axios';
import { useState } from 'react';
import { Zap } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

interface SubscriptionButtonProps {
	isPro: boolean | null;
}
export const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
	const [loading, setLoading] = useState(false);

	const onClick = async () => {
		try {
			setLoading(true);

			const response = await axios.get('/api/stripe');
			// const url = response.data.url;
			// window.open(url, '_blank');
			window.location.href = response.data.url;
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			variant={isPro ? 'default' : 'premium'}
			disabled={loading}
			onClick={onClick}
		>
			{isPro ? 'Gerenciar assinatura' : 'Atualizar'}
			{!isPro && <Zap className="w-4 h-4 ml-2 fill-white " />}
		</Button>
	);
};