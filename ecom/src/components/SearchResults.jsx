import React, { lazy, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchProducts } from "../api.js";
const CardProductGrid = lazy(() =>
    import("../components/card/CardProductGrid")
);
const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await searchProducts(query);
                setSearchResults(data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        if (query) {
            fetchData();
        } else {
            setSearchResults([]);
        }
    }, [query]);

    return (
        <React.Fragment>
            <div
                className="p-5 bg-black bs-cover"
            >
                <div className="container text-center">
                    <span className="display-5 px-3 bg-white rounded shadow">
                        Search Results
                    </span>
                </div>
            </div>
            <div className="container-fluid mb-3">
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-7" style={{marginTop:"20px"}}>
                            <span className="align-middle fw" >
                                    {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found for{" "}
                                    <span className="text-black fw-bold">"{query}"</span>
                                </span>
                            </div>
                            <hr style={{marginTop:"20px"}}/>
                            <div className="row g-3">
                                {searchResults.length === 0 && <h3 className="text-center">No results found</h3>}
                                {searchResults.map((product) => (
                                    <div key={product.id} className="col-md-4">
                                        <CardProductGrid data={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SearchResults;
