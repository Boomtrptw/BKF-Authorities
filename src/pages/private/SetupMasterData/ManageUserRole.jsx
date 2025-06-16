import { useState, useEffect } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { userRole } from "../../../data/security";
import PageTitle from "../../../components/common/Title/PageTitle";
import SearchContent from "../../../components/common/Search/SearchContent";
import Pagination from "../../../components/common/Pagination/Pagination";
import ModalUserRole from "./Modal/UserRole";

const ManageUserRole = () => {

  const { showAlertConfirm, showAlertAfterConfirm, showLayoutBackdrop , setShowLayoutBackdrop } = useGlobalContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const filterUserRole = userRole.filter(item =>
    item.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.updatedAdmin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.updatedDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentItems = filterUserRole.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filterUserRole.length / itemsPerPage);

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
      "Confirmation",
      "The data will be delete from your database.",
      () => {
        const selectedData = userRole.filter((item) =>
          selectedRows.includes(item.roleName)
        );
        showAlertAfterConfirm(
          "Deleted!",
          "Data has been completely deleted.",
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

  const handleCheckboxChange = (roleName) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(roleName)
        ? prevSelected.filter((id) => id !== roleName)
        : [...prevSelected, roleName]
    );
  };

  const isChecked = (roleName) => selectedRows.includes(roleName);

  return (
    <>
      <div className="box-container">
        <div className="container-head has-content-between">
          <div className="title-left">
            <PageTitle title="Manage User Role" code="VRI-SC" />
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
                  <th className="text-center" style={{ width: "700px", maxWidth: "700px" }}>
                    Role Name
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
                            <input type="checkbox" checked={isChecked(item.roleName)} onChange={() => handleCheckboxChange(item.roleName)} /> 
                            : 
                            <button type="button" className="button button-icon" onClick={handleToggleModal}>
                              <MdOutlineEdit className="table-icon" style={{ color: "#888888" }} /> 
                            </button>
                          }
                        </div>
                      </td>
                      <td>{item.roleName}</td>
                      <td>{item.updatedAdmin}<br />{item.updatedDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
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
            totalItems={filterUserRole.length}
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
      <ModalUserRole isOpenModal={isOpenModal} handleToggleModal={handleToggleModal} />
    </>
  )

}

export default ManageUserRole;