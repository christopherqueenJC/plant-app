import { useState } from "react";
import PlantCard from "./PlantCard";

function PlantList() {
  const plants = [
    {
      id: 1,
      name: "Sunflower",
      height: "6 feet",
      sunlight: "Full Sun",
      season: "Summer"
    },
    {
      id: 2,
      name: "Rose",
      height: "3 feet",
      sunlight: "Full Sun",
      season: "Spring"
    },
    {
      id: 3,
      name: "Tulip",
      height: "1 foot",
      sunlight: "Partial Sun",
      season: "Spring"
    },
    {
      id: 4,
      name: "Lavender",
      height: "2 feet",
      sunlight: "Full Sun",
      season: "Summer"
    },
    {
      id: 5,
      name: "Daisy",
      height: "1 foot",
      sunlight: "Full Sun",
      season: "Summer"
    },
    {
      id: 6,
      name: "Hydrangea",
      height: "5 feet",
      sunlight: "Partial Sun",
      season: "Summer"
    },
    {
      id: 7,
      name: "Daffodil",
      height: "1 foot",
      sunlight: "Full Sun",
      season: "Spring"
    },
    {
      id: 8,
      name: "Peony",
      height: "3 feet",
      sunlight: "Full Sun",
      season: "Spring"
    },
    {
      id: 9,
      name: "Marigold",
      height: "1 foot",
      sunlight: "Full Sun",
      season: "Summer"
    },
    {
      id: 10,
      name: "Chrysanthemum",
      height: "3 feet",
      sunlight: "Full Sun",
      season: "Fall"
    }
  ];

  const [search, setSearch] = useState("");
  const [sunlight, setSunlight] = useState("All");
  const [season, setSeason] = useState("All");

  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  let filteredPlants = plants.filter(function (plant) {
    const matchesSearch = plant.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSunlight =
      sunlight === "All" || plant.sunlight === sunlight;

    const matchesSeason =
      season === "All" || plant.season === season;

    return matchesSearch && matchesSunlight && matchesSeason;
  });

  if (sortAlphabetically) {
    filteredPlants = [...filteredPlants].sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  function clearFilters() {
    setSearch("");
    setSunlight("All");
    setSeason("All");
    setSortAlphabetically(false);
  }

  return (
    <main id="plants">
      <h2>Our Plants</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search plants..."
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

        <button
          onClick={function () {
            setSortAlphabetically(!sortAlphabetically);
          }}
        >
          {sortAlphabetically ? "Original Order" : "Sort A-Z"}
        </button>

        <button onClick={clearFilters}>
          Clear Filters
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
                height={plant.height}
                sunlight={plant.sunlight}
                season={plant.season}
              />
            );
          })
        ) : (
          <p>No plants found. Try changing your search or filters.</p>
        )}
      </div>
    </main>
  );
}

export default PlantList;