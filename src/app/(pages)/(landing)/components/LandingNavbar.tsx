'use client';

import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {

	return (
		<nav className="p-4 bg-transparen border-1 border-b  ">
			<div className='container flex items-center justify-between '>

				<Link href="/" className="flex items-center">
					<div className="relative h-8 w-20 mr-4">
						<Image fill alt="logo" src="/logo.png" />
					</div>
					<h1
						className={cn('text-2xl font-bold text-foreground', font.className)}
					>
						AgendaÊ
					</h1>
				</Link>
				<div className="flex items-center gap-x-2">
					<Link href={'/login'}>
						<Button variant="ghost" >
							Entrar
						</Button>
					</Link>
					<Link href={'/register'}>
						<Button variant="default" >
							Registro
						</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
