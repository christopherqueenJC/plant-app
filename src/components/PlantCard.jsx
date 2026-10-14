
function PlantCard(props) {
  return (
    <div className="plant-card">
      <h3>{props.name}</h3>
      <p>Height: {props.height}</p>
      <p>Sunlight: {props.sunlight}</p>
      <p>Bloom Season: {props.season}</p>
    </div>
  );
}

export default PlantCard;