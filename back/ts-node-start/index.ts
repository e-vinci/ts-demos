interface Car {
  brand: string;
  model: string;
  id: number | undefined;
  getDescription: () => string;
}

const dacia: Car = {
  brand: "Dacia",
  model: "Sandero",
  id: undefined,
  getDescription: function () {
    return `${this.id} ${this.brand} ${this.model}`;
  },
};

console.log(dacia.getDescription());

dacia.id = Math.random();

console.log(dacia.getDescription());
