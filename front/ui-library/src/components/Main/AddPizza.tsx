import { useState, SyntheticEvent } from "react";

import { NewPizza } from "../../types";
import { Box, Button, TextField, useTheme } from "@mui/material";

interface AddPizzaProps {
  addPizza: (pizza: NewPizza) => void;
}

const AddPizza = ({ addPizza }: AddPizzaProps) => {
  const theme = useTheme();
  const [pizza, setPizza] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addPizza({ title: pizza, content: description });
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
    <Box
      sx={{
        marginTop: 2,
        padding: 3,
        backgroundColor: "secondary.light",
        borderRadius: 4,
        boxShadow: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="pizza"
            name="pizza"
            label="Pizza"
            variant="outlined"
            value={pizza}
            onChange={handlePizzaChange}
            required
            color="primary"
            sx={{
              input: { color: theme.palette.secondary.contrastText },
            }}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
            required
            color="primary"
            sx={{
              input: { color: theme.palette.secondary.contrastText },
            }}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Ajouter
        </Button>
      </form>
    </Box>
  );
};

export default AddPizza;
