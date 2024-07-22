import React, { lazy, Component } from "react";
import { Link } from "react-router-dom";
import { data } from "../data";
import { fetchProducts } from "../api.js";
const Banner = lazy(() => import("../components/carousel/Banner"));
const Carousel = lazy(() => import("../components/carousel/Carousel"));
const CardProductGrid = lazy(() =>
  import("../components/card/CardProductGrid")
);
class HomeView extends Component {
  state = {
    menProducts: [],
    womenProducts: [],
    kidsProducts: [],
  };

  async componentDidMount() {
    await this.fetchProductsByCategory("men", "menProducts");
    await this.fetchProductsByCategory("women", "womenProducts");
    await this.fetchProductsByCategory("kids", "kidsProducts");
  }

  fetchProductsByCategory = async (category, stateKey) => {
    const lowerCategory = category.toLowerCase();
    try {
      const products = await fetchProducts();
      const filteredProducts = products.filter(product => {
        return product.category.toLowerCase() === lowerCategory;
      });
      const limitedProducts = filteredProducts.slice(0, 6);
      this.setState({ [stateKey]: limitedProducts }, () => {
        console.log("Updated state:", this.state);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  render() {
    const { menProducts, womenProducts, kidsProducts } = this.state;
    const iconProducts = data.iconProducts;
    const rows = [...Array(Math.ceil(iconProducts.length / 4))];
    const productRows = rows.map((row, idx) =>
      iconProducts.slice(idx * 4, idx * 4 + 4)
    );
    const carouselContent = productRows.map((row, idx) => (
      <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
        <div className="row g-3">
          {row.map((product, idx) => {
            return (
              <div key={idx} className="col-md-3">
              </div>
            );
          })}
        </div>
      </div>
    ));
    return (
      <React.Fragment>
        <Banner className="mb-3" id="carouselHomeBanner" data={data.banner} />
        <div className="bg-gradient p-3 text-center mb-3" style={{ "background-color": "black", marginTop: '-16px' }}>
          <h3 className="m-0" style={{ "color": "white" }}>EXPLORE CATEGORIES</h3>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="text-center h3">
                <Link to="/category-1" className="text-decoration-none">
                  <img
                    src="../../images/men's.png"
                    className="img-fluid rounded-square"
                    alt="..."
                  />
                  <div className="text-center h3" style={{ "color": "black" }}>Men's Sneakers</div>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center h3">
                <Link to="/category-2" className="text-decoration-none">
                  <img
                    src="../../images/women's.png"
                    className="img-fluid rounded-square"
                    alt="..."
                  />
                  <div className="text-center h3" style={{ "color": "black" }}>Women's Sneakers</div>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center h3">
                <Link to="/category-3" className="text-decoration-none">
                  <img
                    src="../../images/kid.png"
                    className="img-fluid rounded-square"
                    alt="..."
                  />
                  <div className="text-center h3" style={{ "color": "black" }}>Kids' Sneakers</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br></br><br></br>
        <div className="bg-gradient p-3 text-center mb-3" style={{ "background-color": "black" }}>
          <h3 className="m-0" style={{ "color": "white" }}>FEATURED PRODUCTS</h3>
        </div>
        <br></br><div className="text h3" style={{ "margin-left": "60px", "color": "black" }}>Men's</div>
        <br></br>
        <div className="container" style={{ paddingTop: "20px", marginLeft: '148px' }}>
          <div className="row g-3">
            {menProducts.map((product) => (
              <div key={product.id} className="col-md-4">
                <CardProductGrid data={product} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '25px', textAlign: 'center' }}>
          <Link to="/category-1" style={{ backgroundColor: 'black', borderColor: 'black' }} className="btn btn-secondary">
            View All
          </Link></div>
        <br></br><br></br>
        <hr style={{ border: "none", backgroundColor: "black", height: "2px" }}></hr>
        <div className="text h3" style={{ "margin-left": "60px", "color": "black" }}>Women's</div><br></br>
        <div className="container" style={{ "paddingTop": "20px", marginLeft: '148px' }}>
          <div className="row g-3">
            {womenProducts.map((product) => (
              <div key={product.id} className="col-md-4">
                <CardProductGrid data={product} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '25px', textAlign: 'center' }}>
          <Link to="/category-2" style={{ backgroundColor: 'black', borderColor: 'black' }} className="btn btn-secondary">
            View All
          </Link></div>
        <br></br><br></br>
        <hr style={{ border: "none", backgroundColor: "black", height: "2px" }}></hr>
        <div className="text h3" style={{ "margin-left": "60px", "color": "black" }}>Kids'</div><br></br>
        <div className="container" style={{ "paddingTop": "0px", marginLeft: '148px' }}>
          <div className="row g-3">
            {kidsProducts.map((product) => (
              <div key={product.id} className="col-md-4">
                <CardProductGrid data={product} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '25px', textAlign: 'center' }}>
          <Link to="/category-3" style={{ backgroundColor: 'black', borderColor: 'black' }} className="btn btn-secondary">
            View All
          </Link></div>
        <br></br><br></br>
      </React.Fragment >
    );
  }
}
export default HomeView;