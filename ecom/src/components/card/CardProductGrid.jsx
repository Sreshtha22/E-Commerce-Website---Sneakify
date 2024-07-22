import { Link } from "react-router-dom";

const CardProductGrid = (props) => {
  const product = props.data;
  const renderImage = (imageData) => {
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    return <img src={imageUrl} alt="Product" style={{ width: "200px", height: "150px" }} />;
  };
  return (
    <div className="card" style={{ width: '340px', height: '300px', borderColor: "black" }}>
      <div className="text-center" style={{ padding: "20px" }}>
        <Link to={`/product/detail/${product.id}`}>
          <center>{renderImage(product.image)}</center>
        </Link>
      </div>

      {product.discountPercentage > 0 && (
        <span
          className={`rounded position-absolute p-2 bg-dark  ms-2 small ${product.isNew ? "mt-5" : "mt-2"
            }`}
          style={{ color: 'white' }}>
          -
          {product.discountPercentage > 0
            ? product.discountPercentage + "%"
            : "₹" + product.discountedPrice}
        </span>
      )}
      <div className="card-body">
        <h6 className="card-subtitle mb-2">
          <Link to={`/product/detail/${product.id}`} className="text-decoration-none" style={{ color: 'black' }}>
            {product.name}
          </Link>
        </h6>
        <div className="my-2">
          <del className="text-muted ms-2">
            ₹{product.originalPrice}
          </del>
          <span className="fw-bold h5" style={{ marginLeft: "10px" }}>₹{product.discountedPrice}</span>
          {product.originPrice > 0 && (
            <del className="small text-muted ms-2">₹{product.originalPrice}</del>
          )}

        </div>
        <p className="text small mb-2">
          <i className="bi bi-truck"  style = {{color : "black"}}/> Free Shipping
        </p>
      </div>
    </div>
  );
};
export default CardProductGrid;