import Card from "./Card";

const Cards = ({ tagName, products, filterName }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {/* card */}
      {products?.length ? (
        products.map((product) =>
          tagName ? (
            product?.tags?.includes(tagName.toLowerCase()) && (
              <Card product={product} key={product._id} />
            )
          ) : filterName?.length ? (
            product?.name
              ?.toLowerCase()
              ?.includes(filterName?.toLowerCase()) && (
              <Card product={product} key={product._id} />
            )
          ) : (
            <Card product={product} key={product._id} />
          )
        )
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default Cards;
