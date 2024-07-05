interface DrinkCardProps {
  title: string;
  image: string;
  children: React.ReactNode;
}

const DrinkCard = (props: DrinkCardProps) => {
  return (
    <div className="drink-card">
      <img src={props.image} alt={props.title} className="drink-image" width="50"/>
      <h2>{props.title}</h2>
      <div className="drink-details">{props.children}</div>
    </div>
  );
};

export default DrinkCard;
