const Card = ({ character, onClick }) => {
  const randomImage = `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;

  return (
    <div className= "characterCards " >
    <div
      onClick={() => onClick(character)}
      className="bg-gray-800 rounded-lg shadow-lg p-4 hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="randomImage"> 
      <img
        src={randomImage}
        alt={character.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      </div>
      <div className="characterName">
      <h3 className="text-lg font-semibold text-center">{character.name}</h3>
    </div>
    </div>
    </div>
  );
}
export default Card;