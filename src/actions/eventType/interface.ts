

export interface IEventType {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  active: boolean;
  duration: number;
  locationType: string | null
  address: string | null;
  capacity: number | null;
  arrivalInfo: string | null;
  creator: {
    name: string | null,
    image: string | null,
    email: string | null,
  }
}