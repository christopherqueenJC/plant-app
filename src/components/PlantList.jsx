import { useState } from "react";
import PlantCard from "./PlantCard";

function PlantList() {
  const plants = [
    {
      id: 1,
      name: "Sunflower",
      scientificName: "Helianthus annuus",
      height: "6 feet",
      sunlight: "Full Sun",
      soilType: "Well-drained",
      season: "Summer"
    },
    {
      id: 2,
      name: "Rose",
      scientificName: "Rosa",
      height: "3 feet",
      sunlight: "Full Sun",
      soilType: "Loamy",
      season: "Spring"
    },
    {
      id: 3,
      name: "Tulip",
      scientificName: "Tulipa",
      height: "1 foot",
      sunlight: "Partial Sun",
      soilType: "Well-drained",
      season: "Spring"
    },
    {
      id: 4,
      name: "Lavender",
      scientificName: "Lavandula",
      height: "2 feet",
      sunlight: "Full Sun",
      soilType: "Sandy",
      season: "Summer"
    },
    {
      id: 5,
      name: "Daisy",
      scientificName: "Bellis perennis",
      height: "1 foot",
      sunlight: "Full Sun",
      soilType: "Loamy",
      season: "Summer"
    },
    {
      id: 6,
      name: "Hydrangea",
      scientificName: "Hydrangea macrophylla",
      height: "5 feet",
      sunlight: "Partial Sun",
      soilType: "Moist",
      season: "Summer"
    },
    {
      id: 7,
      name: "Daffodil",
      scientificName: "Narcissus",
      height: "1 foot",
      sunlight: "Full Sun",
      soilType: "Well-drained",
      season: "Spring"
    },
    {
      id: 8,
      name: "Peony",
      scientificName: "Paeonia",
      height: "3 feet",
      sunlight: "Full Sun",
      soilType: "Loamy",
      season: "Spring"
    },
    {
      id: 9,
      name: "Marigold",
      scientificName: "Tagetes",
      height: "1 foot",
      sunlight: "Full Sun",
      soilType: "Sandy",
      season: "Summer"
    },
    {
      id: 10,
      name: "Chrysanthemum",
      scientificName: "Chrysanthemum",
      height: "3 feet",
      sunlight: "Full Sun",
      soilType: "Loamy",
      season: "Fall"
    }
  ];

  const [search, setSearch] = useState("");
  const [sunlight, setSunlight] = useState("All");
  const [soilType, setSoilType] = useState("All");
  const [season, setSeason] = useState("All");

  const filteredPlants = plants.filter(function (plant) {
    const searchText = search.toLowerCase();

    const matchesName =
      plant.name.toLowerCase().includes(searchText) ||
      plant.scientificName.toLowerCase().includes(searchText);

    const matchesSunlight =
      sunlight === "All" || plant.sunlight === sunlight;

    const matchesSoil =
      soilType === "All" || plant.soilType === soilType;

    const matchesSeason =
      season === "All" || plant.season === season;

    return (
      matchesName &&
      matchesSunlight &&
      matchesSoil &&
      matchesSeason
    );
  });

  function resetFilters() {
    setSearch("");
    setSunlight("All");
    setSoilType("All");
    setSeason("All");
  }

  return (
    <main id="plants">
      <h2>Plant Directory</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search common or scientific name..."
          value={search}
          onChange={function (event) {
            setSearch(event.target.value);
          }}
        />

        <select
          value={sunlight}
          onChange={function (event) {
            setSunlight(event.target.value);
          }}
        >
          <option value="All">All Sunlight</option>
          <option value="Full Sun">Full Sun</option>
          <option value="Partial Sun">Partial Sun</option>
        </select>

        <select
          value={soilType}
          onChange={function (event) {
            setSoilType(event.target.value);
          }}
        >
          <option value="All">All Soil Types</option>
          <option value="Well-drained">Well-drained</option>
          <option value="Loamy">Loamy</option>
          <option value="Sandy">Sandy</option>
          <option value="Moist">Moist</option>
        </select>

        <select
          value={season}
          onChange={function (event) {
            setSeason(event.target.value);
          }}
        >
          <option value="All">All Seasons</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
        </select>

        <button onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      <p>
        Showing {filteredPlants.length} of {plants.length} plants
      </p>

      <div className="plant-list">
        {filteredPlants.length > 0 ? (
          filteredPlants.map(function (plant) {
            return (
              <PlantCard
                key={plant.id}
                name={plant.name}
                scientificName={plant.scientificName}
                height={plant.height}
                sunlight={plant.sunlight}
                soilType={plant.soilType}
                season={plant.season}
              />
            );
          })
        ) : (
          <p>No plants found. Try different search terms or filters.</p>
        )}
      </div>
    </main>
  );
}

export default PlantList;