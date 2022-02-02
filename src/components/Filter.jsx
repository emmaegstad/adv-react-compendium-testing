import React from 'react';

export default function Filter({ order, setOrder }) {
  return (
    <div className="Filter">
      <label htmlFor="select" className="filter-label">
        Sort By Date
      </label>
      <select
        id="select"
        className="search-select"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
