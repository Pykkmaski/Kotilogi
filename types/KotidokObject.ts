type KotidokObject = {
  id: string;
  author: string;
  timestamp: number;
};

type Property = KotidokObject & {
  address: string;
  livingArea: number;
  roomCount: number;
  floorCount?: number;
};

type Appartment = KotidokObject & {
  aptNumber: number;
  floorCount: never;
};

export type KotidokHistory = KotidokObject & {
  reason: string;
  column: string;
  oldValue: string;
  newValue: string;
  targetId: string;
};
