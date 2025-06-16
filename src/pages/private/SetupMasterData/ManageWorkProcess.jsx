import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { manageWorkProcess } from "../../../data/security";
import PageTitle from "../../../components/common/Title/PageTitle";
import SearchContent from "../../../components/common/Search/SearchContent";
import Pagination from "../../../components/common/Pagination/Pagination";
import NewModule from "./Modal/NewModule";

const ManageWorkProcess = () => {
  
  const { showLayoutBackdrop , setShowLayoutBackdrop, showAlertConfirm, showAlertAfterConfirm } = useGlobalContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const filterManageWorkProcess = manageWorkProcess.filter(item =>
    item.moduleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.moduleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.updatedAdmin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.updatedDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentItems = filterManageWorkProcess.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filterManageWorkProcess.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
  };

  const handleToggleDelete = () => {
    setIsDelete(!isDelete);
    setSelectedRows([]);
  }

  const handleDelete = () => {
    showAlertConfirm(
      "Are you sure?",
      "The data will be delete from your database.",
      () => {
        const selectedData = manageWorkProcess.filter((item) =>
          selectedRows.includes(item.moduleId)
        );
        showAlertAfterConfirm(
          "Deleted!",
          "Your data has been deleted.",
          () => {
            console.log(selectedData);
            handleToggleDelete();
          }
        );
      }
    );  
  }

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal);
    setShowLayoutBackdrop(!showLayoutBackdrop);
  }

  const handleCheckboxChange = (moduleId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(moduleId)
        ? prevSelected.filter((id) => id !== moduleId)
        : [...prevSelected, moduleId]
    );
  };

  const isChecked = (moduleId) => selectedRows.includes(moduleId);

  return (
    <>
      <div className="box-container">
        <div className="container-head has-content-between">
          <div className="title-left">
            <PageTitle title="Manage Work Process" code="VRI-SC" />
          </div>
          <div className="title-right">
            { !isDelete && 
              <>
                <button type="button" className="button button-red button-delete" onClick={handleToggleDelete}>
                  <RiDeleteBinLine />
                  Delete
                </button>
                <button type="button" className="button button-blue button-add" style={{marginLeft: 0}} onClick={handleToggleModal}>
                  <FiPlus />
                  Add New
                </button>
              </>
            }
            <SearchContent onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="container-body">
          <div className="overflow-x-auto">
            <table className="table-list min-w-1024">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "120px", maxWidth: "120px" }}>Action</th>
                  <th className="text-center" style={{ width: "280px", maxWidth: "280px" }}>
                    Modules ID
                    <div className="icon-sort">
                      <MdKeyboardArrowUp />
                      <MdKeyboardArrowDown />
                    </div>
                  </th>
                  <th className="text-center" style={{ width: "700px", maxWidth: "700px" }}>
                    Name
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
                        <div className="d-flex justify-content-center">  
                          { isDelete ? 
                            <input type="checkbox" checked={isChecked(item.moduleId)} onChange={() => handleCheckboxChange(item.moduleId)} /> 
                            :
                            <Link to={`/manage-work-process/${item.moduleId}`} state={{ moduleName: item.moduleName }}>
                              <LuSquareArrowOutUpRight className="table-icon" style={{ color: "#888888" }} />
                            </Link>  
                          }
                        </div>
                      </td>
                      <td className="text-center">{item.moduleId}</td>
                      <td>{item.moduleName}</td>
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
            totalItems={filterManageWorkProcess.length}
            onItemsPerPageChange={handleItemsPerPageChange}
            currentPage={currentPage}
          />
        )}
        { isDelete &&
          <div className="checklist-container">
            <div className="checklist-count">
              Delete {selectedRows.length} items
            </div>
            <div className="checklist-button">
              <button type="button" className="button button-green button-export" onClick={handleDelete}>Confirm</button>
              <button type="button" className="button button-red button-export" onClick={handleToggleDelete}>Cancel</button>
            </div>
          </div>
        } 
      </div>
      <NewModule isOpenModal={isOpenModal} handleToggleModal={handleToggleModal} />
    </>
  )

}

export default ManageWorkProcess;
