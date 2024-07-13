export type Event = {
  id: string;
  name?: string;
  description?: string;
  dateTime?: Date;
  location?: string;
  image?: string;
};

export type Team = {
  id: string;
  name?: string;
  role?: string;
  image?: string;
};
