const Filter = ({ searchQuery, handleSearchQueryChange }) => {
  return (
    <div>
      search: <input value={searchQuery} onChange={handleSearchQueryChange} />
    </div>
  );
};

export default Filter;
