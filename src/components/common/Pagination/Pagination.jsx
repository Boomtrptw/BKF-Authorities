import ReactPaginate from 'react-paginate';
import { MdKeyboardArrowLeft,  MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ pageCount, onPageChange, itemsPerPage, totalItems, onItemsPerPageChange, currentPage }) => {

  const start = totalItems === 0 ? 0 : currentPage * itemsPerPage + 1;
  const end = Math.min((currentPage + 1) * itemsPerPage, totalItems);

  return (
    <div className="pagination">
      <div className="pagination-left">
        Showing {start} to {end} of {totalItems} entries
        <select
          className="pagination-select"
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
        >
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={pageCount > 1 && currentPage < pageCount - 1 ? <MdKeyboardArrowRight /> : null}
        previousLabel={pageCount > 1 && currentPage > 0 ? <MdKeyboardArrowLeft /> : null}
        onPageChange={onPageChange}
        forcePage={currentPage}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        containerClassName="pagination-right"
        activeClassName="active"
      />
    </div>
  );
  
};

export default Pagination;