import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: process.env.NEXT_PUBLIC_APP_URL;

export function absoluteUrl(path: string) {
	return `${baseUrl}${path}`;
}

