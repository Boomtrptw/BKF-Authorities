import { useState, useEffect } from "react";
// import { useGlobalContext } from "../../../context/GlobalContext";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { reportWorkProcess } from "../../../data/security";
import PageTitle from "../../../components/common/Title/PageTitle";
import SearchContent from "../../../components/common/Search/SearchContent";
import Pagination from "../../../components/common/Pagination/Pagination";

const ReportWorkProcess = () => {

  // const { showAlertConfirm, showAlertAfterConfirm } = useGlobalContext();

  const [searchTerm, setSearchTerm] = useState("");
  // const [isExport, setIsExport] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const filterWorkProcess = reportWorkProcess.filter(item =>
    item.modulesId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.modules.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.updatedAdmin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.updatedDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentItems = filterWorkProcess.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filterWorkProcess.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
  };

  // const handleToggleExport = () => {
  //   setIsExport(!isExport);
  //   setSelectedRows([]);
  //   setSelectAll(false);
  // }

  // const handleExport = () => {
  //   showAlertConfirm(
  //     "Confirmation",
  //     "These data will be export.",
  //     () => {
  //       const selectedData = reportWorkProcess.filter((item) =>
  //         selectedRows.includes(item.modulesId)
  //       );
  //       showAlertAfterConfirm(
  //         "Export!",
  //         "Data has been completely exported.",
  //         () => {
  //           console.log(selectedData);
  //           handleToggleExport();
  //         }
  //       );
  //     }
  //   );
  // }

  // const handleSelectAllChange = () => {
  //   if (selectAll) {
  //     setSelectedRows([]);
  //   } else {
  //     setSelectedRows(reportWorkProcess.map((item) => item.modulesId));
  //   }
  //   setSelectAll(!selectAll);
  // };

  // const handleCheckboxChange = (modulesId) => {
  //   setSelectedRows((prevSelected) =>
  //     prevSelected.includes(modulesId)
  //       ? prevSelected.filter((id) => id !== modulesId)
  //       : [...prevSelected, modulesId]
  //   );
  // };

  // const isChecked = (modulesId) => selectedRows.includes(modulesId);

  return (
    <div className="box-container">
      <div className="container-head has-content-between">
        <div className="title-left">
          <PageTitle title="Report Work Process" code="VRI-SC" />
        </div>
        <div className="title-right">
          {/* { !isExport && <button type="button" className="button button-blue button-export" onClick={handleToggleExport}>Export</button> } */}
          <div className="dropdown">
            <button className="button button-blue button-export dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Export
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item text-center" href="#">Excel</a></li>
              <li><a className="dropdown-item text-center" href="#">PDF</a></li>
            </ul>
          </div>
          <SearchContent onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="container-body">
        <div className="overflow-x-auto">
          <table className="table-list min-w-1024">
            <thead>
              <tr>
                <th className="text-center" style={{ width: "70px", maxWidth: "70px" }}>
                  {/* { isExport ? <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} /> : "#" } */}
                  #
                </th>
                <th className="text-center" style={{ width: "300px", maxWidth: "300px" }}>
                  Modules ID
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
                <th className="text-center" style={{ width: "700px", maxWidth: "700px" }}>
                  Modules
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
                <th className="text-center" style={{ width: "350px", maxWidth: "350px" }}>
                  Updated Date
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              { currentItems.length > 0 ? (
                currentItems.map((item,index) => (
                  <tr key={index}>
                    <td className="text-center">
                      {/* { isExport ? <input type="checkbox" checked={isChecked(item.modulesId)} onChange={() => handleCheckboxChange(item.modulesId)}   /> : index + 1 } */}
                      {offset + index + 1}
                    </td>
                    <td className="text-center">{item.modulesId}</td>
                    <td>{item.modules}</td>
                    <td>{item.updatedAdmin}<br />{item.updatedDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    -- No data --
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      { currentItems.length > 0 && (
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={filterWorkProcess.length}
          onItemsPerPageChange={handleItemsPerPageChange}
          currentPage={currentPage}
        />
      )}
      {/* { isExport &&
        <div className="checklist-container">
          <div className="checklist-count">
            Export in {selectedRows.length} items
          </div>
          <div className="checklist-button">
            <button type="button" className="button button-blue button-export" onClick={handleExport}>Export</button>
            <button type="button" className="button button-red button-export" onClick={handleToggleExport}>Cancel</button>
          </div>
        </div>
      } */}
    </div>
  )

}

export default ReportWorkProcess;