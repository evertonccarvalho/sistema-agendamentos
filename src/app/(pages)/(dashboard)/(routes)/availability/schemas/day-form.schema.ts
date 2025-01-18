import { z } from 'zod';
import { timeIntervalEndTimeSchema } from './time-interval-end-time.schema';
import { timeInterValStartTimeSchema } from './time-interval-start-time.schema';

export const intervalsSchema = z.object({
	id: z.string().uuid(),
	weekDay: z.number(),
	startTime: timeInterValStartTimeSchema,
	endTime: timeIntervalEndTimeSchema,
});

export type IntervalsDto = z.infer<typeof intervalsSchema>;

export const availabilityFormSchema = z.object({
	weekDay: z.number(),
	enabled: z.boolean(),
	intervals: z.array(intervalsSchema),
});

export type AvailabilityFormDto = z.infer<typeof availabilityFormSchema>;
