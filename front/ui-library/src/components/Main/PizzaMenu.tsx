import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";

import { Pizza } from "../../types";

interface PizzaMenuProps {
  pizzas: Pizza[];
}
const PizzaMenu = ({ pizzas }: PizzaMenuProps) => {
  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 500,
          "& .MuiTableCell-head": {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
            fontWeight: "bold",
          },
          "& .MuiTableCell-body": {
            backgroundColor: theme.palette.primary.light,
            color: "white",
          },
          "& .MuiTableCell-root": {
            border: `1px solid ${theme.palette.secondary.main} `,
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Pizza</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pizzas.map((pizza) => (
            <TableRow key={pizza.id}>
              <TableCell>{pizza.title}</TableCell>
              <TableCell>{pizza.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PizzaMenu;
