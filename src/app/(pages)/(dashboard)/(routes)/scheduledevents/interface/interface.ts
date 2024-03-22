import type { EventType, SchedulingStatus } from "@prisma/client";

export interface IScheduling {
  id: string;
  email: string;
  phone: string;
  message: string;
  eventType: EventType;
  status: SchedulingStatus;
  userId: string;
  eventId: string;
  date: Date;
  user: {
    name: string | null,
    image: string | null,
    email: string | null,
  }
}
