import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdOutlineEdit,
} from "react-icons/md";
import { userManagement } from "../../../data/security";
import PageTitle from "../../../components/common/Title/PageTitle";
import SearchContent from "../../../components/common/Search/SearchContent";
import Pagination from "../../../components/common/Pagination/Pagination";

const UserManagement = () => {
  const navigate = useNavigate();
  const {
    showAlertConfirm,
    showAlertAfterConfirm,
    showLayoutBackdrop,
    setShowLayoutBackdrop,
  } = useGlobalContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const filterUserManagement = userManagement.filter(
    (item) =>
      item.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentItems = filterUserManagement.slice(
    offset,
    offset + itemsPerPage
  );
  const pageCount = Math.ceil(filterUserManagement.length / itemsPerPage);

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
  };

  const handleDelete = () => {
    showAlertConfirm(
      "Confirmation",
      "The data will be delete from your database.",
      () => {
        const selectedData = employeeId.filter((item) =>
          selectedRows.includes(item.employeeId)
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
  };

  const handleCheckboxChange = (employeeId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(employeeId)
        ? prevSelected.filter((id) => id !== employeeId)
        : [...prevSelected, employeeId]
    );
  };

  const isChecked = (employeeId) => selectedRows.includes(employeeId);

  const handleAddClick = async (id) => {
    navigate("/create-user-profile", {
      state: { userid: id },
    });
  };

  return (
    <>
      <div className="box-container">
        <div className="container-head has-content-between">
          <div className="title-left">
            <PageTitle title="User Management" code="VRI-SC" />
          </div>
          <div className="title-right">
            {!isDelete && (
              <>
                <button
                  type="button"
                  className="button button-red button-delete"
                  onClick={handleToggleDelete}
                >
                  <RiDeleteBinLine />
                  Delete
                </button>
                <button
                  type="button"
                  className="button button-blue button-add"
                  style={{ marginLeft: 0 }}
                  onClick={() => handleAddClick("0")} //ตั้ง id ของปุ่ม Add New
                >
                  <FiPlus />
                  Add New
                </button>
              </>
            )}
            <SearchContent onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="container-body">
          <div className="overflow-x-auto">
            <table className="table-list min-w-1199">
              <thead>
                <tr>
                  <th
                    className="text-center"
                    style={{ width: "80px", maxWidth: "80px" }}
                  >
                    Action
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "100px", maxWidth: "100px" }}
                  >
                    Photo
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "150px", maxWidth: "150px" }}
                  >
                    Employee ID
                    <div className="icon-sort">
                      <MdKeyboardArrowUp />
                      <MdKeyboardArrowDown />
                    </div>
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "250px", maxWidth: "250px" }}
                  >
                    First Name
                    <div className="icon-sort">
                      <MdKeyboardArrowUp />
                      <MdKeyboardArrowDown />
                    </div>
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "250px", maxWidth: "250px" }}
                  >
                    Last Name
                    <div className="icon-sort">
                      <MdKeyboardArrowUp />
                      <MdKeyboardArrowDown />
                    </div>
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "250px", maxWidth: "250px" }}
                  >
                    Company
                    <div className="icon-sort">
                      <MdKeyboardArrowUp />
                      <MdKeyboardArrowDown />
                    </div>
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "200px", maxWidth: "200px" }}
                  >
                    Email
                    <div className="icon-sort">
                      <MdKeyboardArrowUp />
                      <MdKeyboardArrowDown />
                    </div>
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "170px", maxWidth: "170px" }}
                  >
                    Phone Number
                    <div className="icon-sort">
                      <MdKeyboardArrowUp />
                      <MdKeyboardArrowDown />
                    </div>
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "150px", maxWidth: "150px" }}
                  >
                    Role
                    <div className="icon-sort">
                      <MdKeyboardArrowUp />
                      <MdKeyboardArrowDown />
                    </div>
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "150px", maxWidth: "150px" }}
                  >
                    Status
                    <div className="icon-sort">
                      <MdKeyboardArrowUp />
                      <MdKeyboardArrowDown />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        <div className="d-flex justify-content-center">
                          {isDelete ? (
                            <input
                              type="checkbox"
                              checked={isChecked(item.employeeId)}
                              onChange={() =>
                                handleCheckboxChange(item.employeeId)
                              }
                            />
                          ) : (
                            <button
                              type="button"
                              className="button button-icon"
                              onClick={() => handleAddClick(item.employeeId)}
                            >
                              <MdOutlineEdit
                                className="table-icon"
                                style={{ color: "#888888" }}
                              />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="text-center">
                        {item.photo ? (
                          <img src={item.photo} alt="" className="image-w35" />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="text-center">{item.employeeId}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td className="text-center">{item.company}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneNumber}</td>
                      <td className="text-center">{item.role}</td>
                      <td className="text-center">
                        <label
                          className={`label-status ${
                            item.status === "active"
                              ? "status-active"
                              : "status-inactive"
                          }`}
                        >
                          <BsDot className="bullet" />
                          {item.status}
                        </label>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      -- No data --
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {currentItems.length > 0 && (
          <Pagination
            pageCount={pageCount}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filterUserManagement.length}
            onItemsPerPageChange={handleItemsPerPageChange}
            currentPage={currentPage}
          />
        )}
        {isDelete && (
          <div className="checklist-container">
            <div className="checklist-count">
              Delete {selectedRows.length} items
            </div>
            <div className="checklist-button">
              <button
                type="button"
                className="button button-green button-export"
                onClick={handleDelete}
              >
                Confirm
              </button>
              <button
                type="button"
                className="button button-red button-export"
                onClick={handleToggleDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserManagement;
