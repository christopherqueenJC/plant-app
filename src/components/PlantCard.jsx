function PlantCard(props) {
  return (
    <div className="plant-card">
      <h2>{props.name}</h2>
      <p>Height: {props.height}</p>
      <p>Sunlight: {props.sunlight}</p>
      <p>Season: {props.season}</p>
    </div>
  );
}

export default PlantCard;