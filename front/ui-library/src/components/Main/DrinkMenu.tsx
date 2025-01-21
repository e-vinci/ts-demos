import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid2,
  useTheme,
} from "@mui/material";
import { Drink } from "../../types";

interface DrinkMenuProps {
  title: string;
  drinks: Drink[];
}

const DrinkMenu = ({ title, drinks }: DrinkMenuProps) => {
  const theme = useTheme();
  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: theme.palette.primary.contrastText,
          textAlign: "center",
          marginTop: 2,
        }}
      >
        {title}
      </Typography>
      <Grid2 container spacing={3}>
        {drinks.map((drink, index) => (
          <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
            <Card>
              <CardMedia
                component="img"
                image={drink.image}
                alt={drink.title}
                style={{ objectFit: "contain", height: "200px" }} // Ensure image is fully visible
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {drink.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {drink.volume}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Prix: {drink.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default DrinkMenu;
