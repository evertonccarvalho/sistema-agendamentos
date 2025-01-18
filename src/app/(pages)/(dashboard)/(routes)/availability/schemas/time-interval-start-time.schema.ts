import { z } from 'zod';

export const timeInterValStartTimeSchema = z
	.string()
	.regex(/^\d{2}:\d{2}$/, 'Hora inválida, formato esperado: HH:mm');
