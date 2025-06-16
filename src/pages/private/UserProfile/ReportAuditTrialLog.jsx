import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { reportAuditTrialLog } from "../../../data/security";
import { LuCalendarDays } from "react-icons/lu";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import DatePicker from 'react-datepicker';
import PageTitle from "../../../components/common/Title/PageTitle";
import SearchContent from "../../../components/common/Search/SearchContent";
import clsx from "clsx";
import 'react-datepicker/dist/react-datepicker.css';

const ReportAuditTrialLog = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [toggleSearchInfo, setToggleSearchInfo] = useState(true);
  const [toggleData, setToggleData] = useState(false);

  const { register, reset, handleSubmit} = useForm();

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const filterAuditTrailLog = reportAuditTrialLog.filter(item => {
    return (
      item.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatDuration = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0 && mins > 0) return `${hrs} hrs ${mins} min`;
    if (hrs > 0) return `${hrs} hrs`;
    return `${mins} min`;
  };

  const onSubmit = (data) => {
    // console.log("formData:", data);
    // console.log("StartDate:", selectedStartDate);
    // console.log("EndDate:", selectedEndDate);
    setToggleSearchInfo(!toggleSearchInfo);
    setToggleData(true);
  };

  const handleClear = () => {
    reset();
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setFilteredData([]);
  };
  
  return (
    <div className="box-container">
      <div className={clsx("box-search-information", { open: toggleSearchInfo })}>
        <div className="box-title">Search Information</div>
        <div className="box-body">
          <form className="form-search" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="font-normal">Employee ID</label>
              <select
                {...register(`employeeId`)}
                className="select-base w-full"
              >
                <option value="">Please select employee id</option>
              </select>
            </div>
            <div className="form-group">
              <label className="font-normal">Name</label>
              <select
                {...register(`employeeName`)}
                className="select-base w-full"
              >
                <option value="">Please select name</option>
              </select>
            </div>
            <div className="form-group">
              <label className="font-normal">Company</label>
              <select
                {...register(`company`)}
                className="select-base w-full"
              >
                <option value="">Please select company</option>
              </select>
            </div>
            <div className="form-group">
              <label className="font-normal">Start Date</label>
                <div className="position-relative">
                  <LuCalendarDays className="icon-calendar" onClick={() => startDateRef.current?.setFocus()} />
                  <DatePicker
                    ref={startDateRef}
                    className="input-base w-full"
                    selected={selectedStartDate}
                    onChange={(date) => setSelectedStartDate(date)}
                    dateFormat="dd/MM/yy"
                    isClearable
                    placeholderText="DD/MM/YY"
                  />
                </div>
            </div>
            <div className="form-group">
              <label className="font-normal">End Date</label>
              <div className="position-relative">
                <LuCalendarDays className="icon-calendar" onClick={() => endDateRef.current?.setFocus()} />
                <DatePicker
                  ref={endDateRef}
                  className="input-base w-full"
                  selected={selectedEndDate}
                  onChange={(date) => setSelectedEndDate(date)}
                  dateFormat="dd/MM/yy"
                  isClearable
                  placeholderText="DD/MM/YY"
                />
              </div>
            </div>
            <div className="button-search">
              <button type="submit" className="button button-primary">Search</button>
              <button type="reset" className="button button-secondary" onClick={handleClear}>Clear</button>
            </div>
          </form>
        </div>
      </div>
      <div className="container-head has-content-between flex-wrap">
        <div className="title-left">
          <PageTitle title="Report Audit Trail Log changes User Profile" code="VRI-SC" />
        </div>
        <div className="title-right">
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
        { toggleData && 
          <div className="filter-search">
            <span className="text-red">*</span> Search by : 
            Company : VRI
          </div>
        }
      </div>
      <div className="container-body">
        <div className="overflow-x-auto">
          <table className="table-list min-w-1280">
            <thead>
              <tr>
                <th className="text-center" style={{ width: "100px", maxWidth: "100px" }}>Photo</th>
                <th className="text-center" style={{ width: "150px", maxWidth: "150px" }}>
                  Employee ID
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
                <th className="text-center" style={{ width: "200px", maxWidth: "200px" }}>
                  First Name
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
                <th className="text-center" style={{ width: "200px", maxWidth: "200px" }}>
                  Last Name
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
                <th className="text-center" style={{ width: "160px", maxWidth: "160px" }}>
                  Company
                  <div className="icon-sort">
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                  </div>
                </th>
                <th className="text-center" style={{ width: "130px", maxWidth: "130px" }}>Date</th>
                <th className="text-center" style={{ width: "50px", maxWidth: "50px" }}>#</th>
                <th className="text-center" style={{ width: "250px", maxWidth: "250px" }}>Detail</th>
                <th className="text-center" style={{ width: "190px", maxWidth: "190px" }}>Updated By</th>
                <th className="text-center" style={{ width: "100px", maxWidth: "100px" }}>Time</th>
              </tr>
            </thead>
            <tbody>
              { toggleData && filterAuditTrailLog.length > 0 ? (
                filterAuditTrailLog.map((employee) =>
                  Object.entries(employee.loginByDate).map(([date, sessions], dateIndex) =>
                    sessions.map((session, sessionIndex) => {
                      const showDate = sessionIndex === 0;
                      const totalSessions = Object.values(employee.loginByDate).reduce((sum, arr) => sum + arr.length, 0);
                      const currentRowIndex = Object.entries(employee.loginByDate)
                        .slice(0, dateIndex)
                        .reduce((sum, [, arr]) => sum + arr.length, 0) + sessionIndex;
                      const isLastRowOfEmployee = currentRowIndex === totalSessions - 1;
                      return (
                        <tr key={`${employee.employeeId}-${date}-${session.session}`}>
                          { dateIndex === 0 && sessionIndex === 0 ? (
                            <td className="text-center align-top" rowSpan={
                              Object.values(employee.loginByDate).reduce((sum, arr) => sum + arr.length, 0)
                            }>
                              {employee.photo ? <img src={employee.photo} alt="" className="image-w35" /> : "-"}
                            </td>
                          ) : null}
                          { dateIndex === 0 && sessionIndex === 0 ? (
                            <td className="text-center align-top" rowSpan={
                              Object.values(employee.loginByDate).reduce((sum, arr) => sum + arr.length, 0)
                            }>
                              {employee.employeeId}
                            </td>
                          ) : null}
                          { dateIndex === 0 && sessionIndex === 0 ? (
                            <td className="align-top" rowSpan={
                              Object.values(employee.loginByDate).reduce((sum, arr) => sum + arr.length, 0)
                            }>
                              {employee.firstName}
                            </td>
                          ) : null}
                          { dateIndex === 0 && sessionIndex === 0 ? (
                            <td className="align-top" rowSpan={
                              Object.values(employee.loginByDate).reduce((sum, arr) => sum + arr.length, 0)
                            }>
                              {employee.lastName}
                            </td>
                          ) : null}
                          { dateIndex === 0 && sessionIndex === 0 ? (
                            <td className="text-center align-top" rowSpan={
                              Object.values(employee.loginByDate).reduce((sum, arr) => sum + arr.length, 0)
                            }>
                              {employee.company}
                            </td>
                          ) : null}
                          <td className={clsx("text-center", { "no-border-bottom": !isLastRowOfEmployee })}>{showDate ? formatDate(date) : ""}</td>
                          <td className={clsx("text-center", { "no-border-bottom": !isLastRowOfEmployee })}>{session.session}</td>
                          <td className={clsx({ "no-border-bottom": !isLastRowOfEmployee })}>{session.updateDetail}</td>
                          <td className={clsx({ "no-border-bottom": !isLastRowOfEmployee })}>{session.updateBy}</td>
                          <td className={clsx("text-center", { "no-border-bottom": !isLastRowOfEmployee })}>{session.activeTime}</td>
                        </tr>
                      )
                    })
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
    </div>
  )

}

export default ReportAuditTrialLog
