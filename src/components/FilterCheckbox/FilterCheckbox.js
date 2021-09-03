import './FilterCheckbox.css';

function FilterCheckbox({onFilter}) {
  function handleOnChange(evt) {
    onFilter(evt.target.checked)
  }
  return (
    <label className="search-form__filter" htmlFor="filter">
    <input 
      id="filter" 
      className="search-form__checkbox" 
      type="checkbox"
      onChange={handleOnChange}
    />
    </label>
  );
}
export default FilterCheckbox;