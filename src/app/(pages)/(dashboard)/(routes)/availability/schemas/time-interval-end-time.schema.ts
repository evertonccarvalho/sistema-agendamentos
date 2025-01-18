import { z } from 'zod';

export const timeIntervalEndTimeSchema = z
	.string()
	.regex(/^\d{2}:\d{2}$/, 'Hora inválida, formato esperado: HH:mm');
