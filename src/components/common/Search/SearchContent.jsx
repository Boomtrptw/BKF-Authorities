import { IoIosSearch } from "react-icons/io";

const SearchContent = ({onChange}) => {
  return (
    <div className="search-content">
      <IoIosSearch />
      <input
        type="text"
        placeholder="Search"
        className="input-search"
        onChange={onChange}
      />
    </div> 
  )
}

export default SearchContent;