import "./searchbar.scss";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ onSearch }) => {
  return (
    <>
      <input
        type="text"
        className="search"
        placeholder="Search products"
        onChange={(e) => onSearch(e.target.value)}
      />
    </>
  );
};

export default SearchBar;
