import { z } from 'zod';
import { timeIntervalEndTimeSchema } from './time-interval-end-time.schema';
import { timeInterValStartTimeSchema } from './time-interval-start-time.schema';

export const newTimeIntervalSchema = z
	.object({
		weekDay: z.number(),
		startTime: timeInterValStartTimeSchema,
		endTime: timeIntervalEndTimeSchema,
	})
	.refine((data) => data.startTime < data.endTime, {
		message: 'A hora de início deve ser menor que a hora de término.',
		path: ['endTime'],
	});

export type NewTimeIntervalDto = z.infer<typeof newTimeIntervalSchema>;

