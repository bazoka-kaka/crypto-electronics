import Card from "./Card";

const Cards = ({ tagName, products }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {/* card */}
      {products.map((product) =>
        tagName ? (
          product.tags.indexOf(tagName) !== -1 && (
            <Card product={product} key={product.id} />
          )
        ) : (
          <Card product={product} key={product.id} />
        )
      )}
    </div>
  );
};

export default Cards;
