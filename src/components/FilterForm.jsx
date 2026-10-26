export default function FilterForm({ filter, onFilterChange }) {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input
        type="text"
        placeholder="Filter posts by title"
        value={filter}
        onChange={(event) => onFilterChange(event.target.value)}
      />
    </form>
  );
}
