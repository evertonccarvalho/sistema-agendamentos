import type { EventType, SchedulingStatus } from "@prisma/client";

export interface IScheduling {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  eventType: EventType;
  status: SchedulingStatus;
  userId: string;
  eventId: string;
  date: Date;
  created_at: Date | null;
  user: {
    name: string | null;
    image: string | null;
    email: string | null;
  };
}
