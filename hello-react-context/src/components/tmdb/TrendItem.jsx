const TrendItem = ({ items }) => {
  return (
    <>
      {items.map((movie) => (
        <>
          <img src={movie.poster} />
          <div>{movie.id}</div>
        </>
      ))}
    </>
  );
};

export default TrendItem;
