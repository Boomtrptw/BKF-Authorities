import { useState } from "react";
import IconFilter from "../../../assets/icons/icon-filter.png";
import { IoStarOutline, IoStar } from "react-icons/io5";

const PageTitle = ({title, code=null}) => {

  const [isBookMark, setIsBookmark] = useState(false);

  const handleBookmark = () => {
    setIsBookmark(!isBookMark);
  }

  return (
    <>
      <button className="bookmark-icon" onClick={handleBookmark} >
        { !isBookMark ? 
          <IoStarOutline className="text-xl text-code" /> 
          :
          <IoStar className="text-xl text-yellow" />
        }
      </button>
      <img alt="" src={IconFilter} className="w-26 cursor-pointer" />
      <h2>
        {title}
        {code && (<span>({code})</span>) }
      </h2>
    </>
  )
}

export default PageTitle;