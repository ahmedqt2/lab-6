export default function FilterForm({ filter, onFilterChange }) {
  return (
    <form className="filter-form" role="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="title-filter">Filter posts by title</label>
      <div className="filter-controls">
        <input
          id="title-filter"
          type="search"
          placeholder="Search for a title..."
          value={filter}
          onChange={(event) => onFilterChange(event.target.value)}
          aria-describedby="filter-help"
        />
        <button type="button" onClick={() => onFilterChange('')} disabled={!filter}>
          Clear
        </button>
      </div>
      <p id="filter-help">Results update as you type. Search ignores letter case.</p>
    </form>
  );
}
