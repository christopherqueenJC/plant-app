import Header from "./components/Header";
import Navigation from "./components/Navigation";
import PlantList from "./components/PlantList";
import Footer from "./components/Footer";

function App() {
  return (
    <div id="home">
      <Header />
      <Navigation />
      <PlantList />
      <Footer />
    </div>
  );
}

export default App;