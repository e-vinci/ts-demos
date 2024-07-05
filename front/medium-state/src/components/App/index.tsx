import "./App.css";
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";

function App() {
  return (
    <div className="page">
      <Header title="We love Pizza" version={0 + 1} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
