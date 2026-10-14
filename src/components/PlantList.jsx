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
    }
  ];

  return (
    <main>
      <h2>Our Plants</h2>

      <div className="plant-list">
        {plants.map(function (plant) {
          return (
            <PlantCard
              key={plant.id}
              name={plant.name}
              height={plant.height}
              sunlight={plant.sunlight}
              season={plant.season}
            />
          );
        })}
      </div>
    </main>
  );
}

export default PlantList;