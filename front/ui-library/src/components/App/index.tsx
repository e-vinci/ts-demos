import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";
import { useState } from "react";
import pizza from "../../assets/images/pizza.jpg";
import { Box } from "@mui/material";


function App() {
  const [actionToBePerformed, setActionToBePerformed] = useState(false);

  const handleHeaderClick = () => {
    setActionToBePerformed(true);
  };

  const clearActionToBePerformed = () => {
    setActionToBePerformed(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundImage: `url(${pizza})`,
      backgroundSize: 'cover',
    }}>
      
      

      <Header
        title="We love Pizza"
        version={0 + 1}
        handleHeaderClick={handleHeaderClick}
      />
      <Main
        actionToBePerformed={actionToBePerformed}
        clearActionToBePerformed={clearActionToBePerformed}
      />
      
      <Footer />
    </Box>
  );
}

export default App;
