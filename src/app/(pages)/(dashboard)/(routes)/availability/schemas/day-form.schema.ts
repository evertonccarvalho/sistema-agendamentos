import { z } from 'zod';
import { timeIntervalEndTimeSchema } from './time-interval-end-time.schema';
import { timeInterValStartTimeSchema } from './time-interval-start-time.schema';

export const timeIntervalSchema = z.object({
	id: z.string().optional(),
	startTime: timeInterValStartTimeSchema,
	endTime: timeIntervalEndTimeSchema,
});

export type TimeIntervalDto = z.infer<typeof timeIntervalSchema>;

export const dayFormSchema = z.object({
	id: z.string().uuid(),
	weekDay: z.number(),
	intervals: z.array(timeIntervalSchema),
	enabled: z.boolean(),
});

export type DayFormDto = z.infer<typeof dayFormSchema>;
