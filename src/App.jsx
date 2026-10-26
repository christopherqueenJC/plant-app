import Header from "./components/Header";
import Navigation from "./components/Navigation";
import PlantList from "./components/PlantList";
import NativePlantApi from "./components/NativePlantApi";
import Footer from "./components/Footer";

function App() {
  return (
    <div id="home">
      <Header />
      <Navigation />
      <PlantList />
      <NativePlantApi />
      <Footer />
    </div>
  );
}

export default App;