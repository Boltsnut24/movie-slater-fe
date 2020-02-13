import React, { useState, useEffect } from "react";

function SearchForm(props) {
  const handleChangeSearch = event => {
    props.setSearchParam(event.target.value);
  };

  return (
    <div className="searchForm">
      <form>
        <input
          className="fontAwesome"
          placeholder="&#xf002;  Search Movies"
          onChange={handleChangeSearch}
          value={props.searchParam}
        />
      </form>
    </div>
  );
}

export default SearchForm;
