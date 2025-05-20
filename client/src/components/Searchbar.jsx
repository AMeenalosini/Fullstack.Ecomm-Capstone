export default function Searchbar(props) {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={props.searchParameter}
            onChange={(event) => props.setSearchParameter(event.target.value)}
      />
    </div>
  );
  }

