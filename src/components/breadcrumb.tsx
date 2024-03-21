import { cn } from '@/lib/utils';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Separator } from './ui/separator';

type BreadCrumbType = {
	title: string;
	link: string;
};

type BreadCrumbPropsType = {
	items: BreadCrumbType[];
};

export default function BreadCrumb({ items }: BreadCrumbPropsType) {
	return (
		<>
			<div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
				<Link
					href={'/dashboard'}
					className="overflow-hidden text-muted font-semibold text-lg text-ellipsis whitespace-nowrap"
				>
					Inicio
				</Link>
				{items?.map((item: BreadCrumbType, index: number) => (
					<React.Fragment key={item.title}>
						<ChevronRightIcon className="h-4 w-4" />
						<Link
							href={item.link}
							className={cn(
								'font-semibold text-lg',
								index === items.length - 1
									? 'text-foreground pointer-events-none'
									: 'text-muted-foreground'
							)}
						>
							{item.title}
						</Link>
					</React.Fragment>
				))}
			</div>
			<Separator />
		</>
	);
}
