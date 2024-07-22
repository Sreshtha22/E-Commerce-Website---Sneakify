import React, { lazy, Component } from "react";
import { fetchProducts } from "../../api.js";
const Breadcrumb = lazy(() => import("../../components/Breadcrumb3"));
const CardProductGrid = lazy(() =>
  import("../../components/card/CardProductGrid")
);
const CardProductList = lazy(() =>
  import("../../components/card/CardProductList")
);
class ProductListView extends Component {
  state = {
    currentProducts: [],
    totalItems: 0,
    view: "list",
    sortBy: ""
  };
  componentDidMount() {
    this.fetchProductsByCategory("Kids");
  }
  fetchProductsByCategory = async (category) => {
    try {
      const products = await fetchProducts(); 
      const filteredProducts = products.filter(product => product.category === category);
      const totalItems = filteredProducts.length;
      this.setState({ currentProducts: filteredProducts, totalItems });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  onChangeView = (view) => {
    this.setState({ view });
  };
  handleSortChange = (event) => {
    const sortBy = event.target.value;
    this.setState({ sortBy }, () => {
      this.sortProducts(); 
    });
  };
  sortProducts = () => {
    const { sortBy, currentProducts } = this.state;
    let sortedProducts = [...currentProducts];
    if (sortBy === "lowToHigh") {
      sortedProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortBy === "highToLow") {
      sortedProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }
    this.setState({ currentProducts: sortedProducts });
  };
  render() {
    return (
      <React.Fragment>
        <div
          className="p-5 bg-black bs-cover"
        >
          <div className="container text-center">
            <span className="display-5 px-3 bg-white rounded shadow">
              Kids
            </span>
          </div>
        </div>
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-7">
                  <span className="align-middle fw-">
                    {this.state.totalItems} results for{" "}
                    <span className="text-black fw-bold">"Kids Sneakers"</span>
                  </span>
                </div>
                <div className="col-5 d-flex justify-content-end">
                  <select
                    className="form-select mw-180 float-start"
                    aria-label="Sort by"
                    style={{ borderColor: "black" }}
                    onChange={this.handleSortChange}

                  >
                    <option value="">Sort By</option>
                    <option value="lowToHigh">Price low to high</option>
                    <option value="highToLow">Price high to low</option>
                  </select>
                  <div className="btn-group ms-3" role="group">
                    <button
                      aria-label="Grid"
                      type="button"
                      onClick={() => this.onChangeView("grid")}
                      className={`btn ${this.state.view === "grid"
                        ? "btn-dark"
                        : "btn-outline-dark"
                        }`}
                    >
                      <i className="bi bi-grid" />
                    </button>
                    <button
                      aria-label="List"
                      type="button"
                      onClick={() => this.onChangeView("list")}
                      className={`btn ${this.state.view === "list"
                        ? "btn-dark"
                        : "btn-outline-dark"
                        }`}
                    >
                      <i className="bi bi-list" />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row g-3">
                {this.state.view === "grid" &&
                  this.state.currentProducts.map((filteredProducts, idx) => {
                    return (
                      <div key={idx} className="col-md-4">
                          <CardProductGrid data={filteredProducts} />
                      </div>
                    );
                  })}
                {this.state.view === "list" &&
                  this.state.currentProducts.map((filteredProducts, idx) => {
                    return (
                      <div key={idx} className="col-md-12">
                        <CardProductList data={filteredProducts} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ProductListView;