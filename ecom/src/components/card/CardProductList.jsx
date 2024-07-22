import { Link } from "react-router-dom";
const CardProductList = (props) => {
  const product = props.data;
  const renderImage = (imageData) => {
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    return <img src={imageUrl} alt="Product" style={{ width: "200px",height: "150px"}} />;
  };
  return (
    <div className="card" style={{ borderColor: "black" }}>
      <div className="row g-0">
        <div className="col-lg-3 col-md-4 col-sm-6 col-10 text-center" style={{padding:"20px"}}>
        <Link to={`/product/detail/${product.id}`}>
            {renderImage(product.image)}
          </Link>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-6 col-12">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link
                to={`/product/detail/${product.id}`}
                className="text-decoration-none"
                style={{ color: "black", fontWeight: "bold" }}
              >
                {product.name}
              </Link>
            </h6>
            {product.pdesc &&
            product.pdesc.includes("|") === false ? (
              <Link
                to={`/product/detail/${product.id}`}
                className="text-decoration-none mt-15"
                style={{
                  textAlign: "justify",
                  color: "black",
                  fontSize: "18px",
                }}
              >
                <p className="small mt-2">{product.pdesc}</p>
              </Link>
            ) : (
              <ul className="mt-2">
                {product.pdesc.split("|").map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12 col-12" style={{ marginTop: "50px" }}>
          <div className="card-body">
            <div className="mb-2">
              <span className="fw-bold h5">₹{product.discountedPrice}</span>
              {product.originalPrice > 0 && (
                <del className="text-muted ms-2">
                  ₹{product.originalPrice}
                </del>
              )}
              {product.discountPercentage > 0 && (
                <span
                  className={`rounded p-1 bg-dark ms-2 small`}
                  style={{ color: "white" }}
                >
                  -
                  {product.discountPercentage > 0
                    ? product.discountPercentage + "%"
                    : "₹" + product.discountedPrice}
                </span>
              )}
            </div>
              <p className="text small mb-2">
                <i className="bi bi-truck"  style = {{color : "black"}}/> Free Shipping
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardProductList;