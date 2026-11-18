function PlantCard(props) {
  return (
    <div className="plant-card">
      <h3>{props.name}</h3>
      <p><em>{props.scientificName}</em></p>
      <p>Height: {props.height}</p>
      <p>Sunlight: {props.sunlight}</p>
      <p>Soil Type: {props.soilType}</p>
      <p>Bloom Season: {props.season}</p>

      <button
        type="button"
        onClick={props.onEdit}
      >
        Edit
      </button>

      <button
        type="button"
        onClick={props.onDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default PlantCard;