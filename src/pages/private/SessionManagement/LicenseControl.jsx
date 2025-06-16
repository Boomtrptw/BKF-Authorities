import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { licenseControl } from "../../../data/security";
import { MdOutlineEdit, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import PageTitle from "../../../components/common/Title/PageTitle";
import SearchContent from "../../../components/common/Search/SearchContent";
import Pagination from "../../../components/common/Pagination/Pagination";

const LicenseControl = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const filterLicenseControl = licenseControl.filter(item =>
    item.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.startLicense.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentItems = filterLicenseControl.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filterLicenseControl.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
  };

  return (
    <div className="box-container">
      <div className="container-head has-content-between">
        <div className="title-left">
          <PageTitle title="License Control" code="VRI-SC" />
        </div>
        <div className="title-right">
          <SearchContent onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="container-body">
        <div className="overflow-x-auto">
          <table className="table-list min-w-1280">
            <thead>
              <tr>
                <th className="text-center" style={{ width: "70px", maxWidth: "70px" }}>Action</th>
                <th className="text-center" style={{ width: "150px", maxWidth: "150px" }}>
                  Short Name
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
                <th className="text-center" style={{ width: "500px", maxWidth: "500px" }}>
                  Company Name
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
                <th className="text-center" style={{ width: "150px", maxWidth: "150px" }}>
                  Start License
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
                <th className="text-center" style={{ width: "350px", maxWidth: "350px" }}>
                  Email
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
                <th className="text-center" style={{ width: "250px", maxWidth: "250px" }}>
                  Tel.
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
                <th className="text-center" style={{ width: "130px", maxWidth: "130px" }}>
                  License<br/>
                  <span className="text-small">(Modules)</span>
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
                <th className="text-center" style={{ width: "170px", maxWidth: "170px" }}>
                  Country
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
                      <Link to={`/license-control/${item.shortName}`}>
                        <MdOutlineEdit className="table-icon" style={{ color: "#888888" }} />
                      </Link>  
                    </td>
                    <td className="text-center">{item.shortName}</td>
                    <td>{item.companyName}</td>
                    <td className="text-center">{item.startLicense}</td>
                    <td>{item.email}</td>
                    <td>{item.tel}</td>
                    <td className="text-center">{item.license}</td>
                    <td className="text-center">{item.country}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
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
          totalItems={licenseControl.length}
          onItemsPerPageChange={handleItemsPerPageChange}
          currentPage={currentPage}
        />
      )}
    </div>
  )

}

export default LicenseControl;