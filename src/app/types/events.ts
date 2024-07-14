export type Event = {
  id: string;
  name?: string;
  description?: string;
  dateTime: Date;
  endDateTime?: Date;
  location?: string;
  image?: string;
  calendar?: string;
};

export type Team = {
  id: string;
  name: string;
  role: string;
  image?: string;
  exec: boolean;
};
