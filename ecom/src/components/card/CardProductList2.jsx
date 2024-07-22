import { Link } from "react-router-dom";
const CardProductList2 = (props) => {
  const product = props.data;
  return (
    <div className="card" style={{ borderColor: "black" }}>
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={product.img} className="img-fluid" alt="..." style={{ width: '276px', height: '185px', padding: '20px' }} />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h4 className="card-subtitle me-2 d-inline">
              <Link to={product.link} className="text-decoration-none text-black">
                {product.name}
              </Link>
            </h4>
          </div>
          <div className="card-" style={{ paddingLeft: "17px" }}>
            <div className="mb-2">
              <span className="fw-bold h4 me-2">₹{product.price}</span>
              {product.originPrice > 0 && (
                <del className="small text-muted me-2">
                  ₹{product.originPrice}
                </del>
              )}
              {(product.discountPercentage > 0 ||
                product.discountPrice > 0) && (
                  <span className={`rounded p-1 bg-black text-white me-2 small`}>
                    -
                    {product.discountPercentage > 0
                      ? product.discountPercentage + "%"
                      : "₹" + product.discountPrice}
                  </span>
                )}
              {product.isFreeShipping && (
                <span className="text small mb-2">
                  <i className="bi bi-truck"  style = {{color : "black"}}/> Free shipping
                </span>
              )}
            </div>
            <div className="btn-group d-flex" role="group" style={{padding:'20px', marginLeft:'-18px'}}>
              <button
                type="button"
                className="btn btn-sm btn-primary bg-black border-black"
                title="Add to cart"
                style={{ height: "40px", paddingLeft: "15px", paddingRight: "15px", outline: 'none', borderRadius:'10px' }}
              >
                <i className="bi bi-cart-plus" />
              </button>
              <div className="spacer" style={{ paddingLeft: "15px" }}></div>
              <button
                type="button"
                className="btn  btn-outline-danger"
                title="Remove from wishlist"
                style={{ borderColor: 'red', paddingLeft: "13px", paddingRight: "13px", outline: 'none',borderRadius:'10px' }}
              >
                <i className="bi bi-trash" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default CardProductList2;