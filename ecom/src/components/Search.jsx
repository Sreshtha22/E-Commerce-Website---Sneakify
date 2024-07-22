import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search-results?query=${searchQuery}`);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchQuery}
          onChange={handleChange}
          required
          style={{ borderColor: "black" }}
        />
        <label className="visually-hidden" htmlFor="search"></label>
        <button
          className="btn btn-primary text-white"
          type="submit"
          aria-label="Search"
          style={{ backgroundColor: "black", border: "1px solid black" }}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
