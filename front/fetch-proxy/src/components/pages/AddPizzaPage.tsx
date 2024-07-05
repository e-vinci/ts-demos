import { useState, SyntheticEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./AddPizzaPage.css";
import { PizzeriaContext } from "../../types";

const AddPizzaPage = () => {
  const { addPizza }: PizzeriaContext = useOutletContext();

  const navigate = useNavigate();
  const [pizza, setPizza] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addPizza({ title: pizza, content: description });
    navigate("/");
  };

  const handlePizzaChange = (e: SyntheticEvent) => {
    const pizzaInput = e.target as HTMLInputElement;
    console.log("change in pizzaInput:", pizzaInput.value);
    setPizza(pizzaInput.value);
  };

  const handleDescriptionChange = (e: SyntheticEvent) => {
    const descriptionInput = e.target as HTMLInputElement;
    console.log("change in descriptionInput:", descriptionInput.value);
    setDescription(descriptionInput.value);
  };

  return (
    <div>
      <h1>Ajoutez une pizza</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pizza">Pizza</label>
        <input
          value={pizza}
          type="text"
          id="pizza"
          name="pizza"
          onChange={handlePizzaChange}
          required
        />
        <label htmlFor="description">Description</label>
        <input
          value={description}
          type="text"
          id="description"
          name="description"
          onChange={handleDescriptionChange}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddPizzaPage;
