export const SlidingCard = ({ cards = [] }) => {
  return (
    <div>
      {cards.map((card, idx) => (
        <div
          key={card.id}
          className={`border mb-10 border-[#A4F200] rounded-2xl p-8 sm:p-10 ${
            idx % 2 === 0 ? "-rotate-2" : "rotate-2"
          }`}
        >
          <p className="text-[#A4F200] text-5xl xl:text-7xl font-medium mb-2">
            {card.id}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{card.heading}</h2>
          <p className="text-lg mb-3">{card.desc}</p>
        </div>
      ))}
    </div>
  );
};
