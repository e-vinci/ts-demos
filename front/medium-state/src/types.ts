interface Pizza {
  id: number;
  title: string;
  content: string;
}

type NewPizza = Omit<Pizza, "id">;

export type { Pizza, NewPizza };
