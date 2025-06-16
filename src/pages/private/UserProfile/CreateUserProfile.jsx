import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { useGlobalContext } from "../../../context/GlobalContext";
import IconUpload from "../../../assets/icons/icon-upload.png";
import IconNoImage from "../../../assets/icons/icon-no-image.png";
import IconAction from "../../../assets/icons/icon-action.png";
import IconBin from "../../../assets/icons/icon-bin.png";
import IconExpand from "../../../assets/icons/icon-expand.png";
import IconCollapse from "../../../assets/icons/icon-collapse.png";
import IconAddFunc from "../../../assets/icons/icon-add-function.png";
import IconCheck from "../../../assets/icons/icon-true.png";
import IconCancel from "../../../assets/icons/icon-false.png";
const CreateUserProfile = () => {
  //รับข้อมูลจาก User Management
  const location = useLocation();
  const userid = location.state?.userid || "";
  console.log("User ID:", userid);
  
  const { showAlertConfirm, showAlertAfterConfirm } = useGlobalContext();
  const [DataList, setFunctionList] = useState([]);
  const [DataRole, setSelectedRole] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModule, setIsModule] = useState(false);
  const [selectAllRead, setSelectAllRead] = useState(false);
  const [selectAllFull, setSelectAllFull] = useState(false);
  const readRef = useRef();
  const fullRef = useRef();
  const [optionValue, setOptionValue] = useState("");
  const [moduleData, setModuleData] = useState([
    { id: 1, module: "[PPS] Production Planning" },
  ]);
  const [addingRow, setAddingRow] = useState(false);
  const [newModuleValue, setNewModuleValue] = useState(null);
  const [addingFunctionRow, setAddingFunctionRow] = useState(false);
  const [newFunctionValue, setNewFunctionValue] = useState(null);
  const [addingSubRow, setAddingSubRow] = useState(false);
  const [newSubModuleValue, setNewSubModuleValue] = useState(null);

  const functionOptions = [
    { value: "Setup Master Data", label: "Setup Master Data" },
    { value: "Manage Course", label: "Manage Course" },
    { value: "Manage Plan", label: "Manage Plan" },
    { value: "Training Result", label: "Training Result" },
  ];

  useEffect(() => {
    const readValues = DataList.map((d) => d.readAccess);
    const fullValues = DataList.map((d) => d.fullAccess);

    const allRead = readValues.every((v) => v === true);
    const someRead = readValues.some((v) => v === true);

    const allFull = fullValues.every((v) => v === true);
    const someFull = fullValues.some((v) => v === true);

    setSelectAllRead(allRead);
    setSelectAllFull(allFull);

    if (readRef.current) readRef.current.indeterminate = !allRead && someRead;
    if (fullRef.current) fullRef.current.indeterminate = !allFull && someFull;
  }, [DataList]);

  useEffect(() => {
    if (readRef.current) {
      readRef.current.indeterminate = true;
    }
  }, []);

  const handleSelectAll = (key, checked) => {
    const updated = DataList.map((item) => ({
      ...item,
      [key]: checked,
    }));
    setFunctionList(updated);

    if (key === "readAccess") setSelectAllRead(checked);
    if (key === "fullAccess") setSelectAllFull(checked);
  };

  const options = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const moduleOptions = [
    { value: "[PPS] Production Planning", label: "[PPS] Production Planning" },
    { value: "[WIP] Material Flow", label: "[WIP] Material Flow" },
    { value: "[QMS] Quality Check", label: "[QMS] Quality Check" },
  ];

  const DataByModuleId = {
    1: [
      { function: "Setup Master Data", readAccess: true, fullAccess: false },
      { function: "Manage Course", readAccess: false, fullAccess: true },
      { function: "Manage Plan", readAccess: true, fullAccess: false },
      { function: "Training Result", readAccess: false, fullAccess: true },
    ],
    2: [
      { function: "Setup Master Data", readAccess: false, fullAccess: false },
      { function: "Manage Course", readAccess: false, fullAccess: false },
    ],
  };

  const subModuleOptions = [
    { value: "Skill Matrix", label: "Skill Matrix" },
    { value: "Training Result", label: "Training Result" },
    { value: "Planning Module", label: "Planning Module" },
  ];
  const [subModules, setSubModules] = useState([]);

  const addSubModule = () => {
    setAddingSubRow(true);
    setNewSubModuleValue(null);
  };

  const confirmAddSubModule = () => {
    if (!newSubModuleValue) return;

    const newId = subModules.length + 1;
    const newSub = {
      id: newId,
      title: newSubModuleValue.label,
      expanded: true,
      addingFunctionRow: false,
      newFunctionValue: null,
      functions: [],
    };

    setSubModules([...subModules, newSub]);
    setAddingSubRow(false);
  };

  const cancelAddSubModule = () => {
    setAddingSubRow(false);
    setNewSubModuleValue(null);
  };

  const addFunctionToSubModule = (id) => {
    setSubModules((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, addingFunctionRow: true } : sub
      )
    );
  };

  const toggleExpandSubModule = (id) => {
    setSubModules((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, expanded: !sub.expanded } : sub
      )
    );
  };

  const confirmAddFunctionToSubModule = (id) => {
    setSubModules((prev) =>
      prev.map((sub) => {
        if (sub.id === id && sub.newFunctionValue) {
          return {
            ...sub,
            functions: [
              ...sub.functions,
              {
                function: sub.newFunctionValue.label,
                readAccess: false,
                fullAccess: false,
              },
            ],
            addingFunctionRow: false,
            newFunctionValue: null,
          };
        }
        return sub;
      })
    );
  };

  const cancelAddFunctionToSubModule = (id) => {
    setSubModules((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? { ...sub, addingFunctionRow: false, newFunctionValue: null }
          : sub
      )
    );
  };

  const updateFunctionValue = (id, value) => {
    setSubModules((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, newFunctionValue: value } : sub
      )
    );
  };

  const addModules = () => {
    setAddingRow(true);
    setNewModuleValue(null);
  };

  const confirmAddModule = () => {
    if (!newModuleValue) return;

    showAlertConfirm(
      "Are you sure?",
      "The data will be saved to your database.",
      () => {
        const newRow = {
          id: moduleData.length + 1,
          module: newModuleValue.label,
        };
        setModuleData([...moduleData, newRow]);
        setAddingRow(false);

        showAlertAfterConfirm(
          "Save Successfully",
          "Data has been completely saved!.",
          ""
        );
      }
    );
  };

  const addFunction = () => {
    setAddingFunctionRow(true);
    setNewFunctionValue(null);
  };

  const confirmAddFunction = () => {
    if (!newFunctionValue) return;

    showAlertConfirm(
      "Are you sure?",
      "The data will be saved to your database.",
      () => {
        const newItem = {
          function: newFunctionValue.label,
          readAccess: false,
          fullAccess: false,
        };
        setFunctionList([...DataList, newItem]);
        setAddingFunctionRow(false);

        showAlertAfterConfirm(
          "Save Successfully",
          "Data has been completely saved!.",
          ""
        );
      }
    );
  };

  // ✅ ฟังก์ชันคลิก Module
  const ClickModule = (id) => {
    const functions = DataByModuleId[id] || [];
    setFunctionList(functions.map((item) => ({ ...item })));
    setIsModule(true);
  };

  // ✅ แก้ไขค่า checkbox
  const handleCheckboxChange = (index, key) => {
    const updatedList = [...DataList];
    updatedList[index][key] = !updatedList[index][key];
    setFunctionList(updatedList);
  };
  return (
    <div className="container-fluid p-0">
      <div className="w-100 bg-white rounded-3 p-3">
        <span className="fs-4 fw-bold">User Account</span>
        <div className="d-flex mt-3">
          <div className="rounded-circle border border-secondary img-profile">
            <img src={IconNoImage} className="w-100" />
          </div>
          <div class="text-center group-upload-file">
            <label for="upload" class="btn btn-primary button-upload-file">
              <img src={IconUpload} className="img-icon" />
              Upload Picture
            </label>
            <input type="file" id="upload" class="d-none" accept="image/*" />
            <label class="text-gray">
              Please upload a .jpg or .png file with a minimum dimension 512 x
              512 not exceeding 5 MB.
            </label>
          </div>
        </div>
        <div className="d-flex group-input-col-4">
          <div className="group-input-lable">
            <span className="title-lable">
              Username <span className="text-require">*</span>
            </span>
            <input
              type="text"
              className="bd-input"
              placeholder="Please specify username"
            />
          </div>
          <div className="group-input-lable">
            <span className="title-lable">Email</span>
            <input
              type="text"
              className="bd-input"
              placeholder="Please specify username"
            />
          </div>
          <div className="group-input-lable">
            <span className="title-lable">Password</span>
            <input
              type="text"
              className="bd-input disabled"
              placeholder="********"
              disabled
            />
          </div>
          <div className="group-input-lable">
            <span className="title-lable">Status</span>
            <div className="d-flex group-input-radio">
              <label className="d-flex align-items-center cursor-pointer">
                <input type="radio" name="status" value="active" />
                <span className="ms-2 text-span-status">Active</span>
              </label>
              <label className="d-flex align-items-center ms-5 cursor-pointer">
                <input type="radio" name="status" value="inactive" />
                <span className="ms-2 text-span-status">Inactive</span>
              </label>
            </div>
          </div>
        </div>
        <div className="border-layer"></div>
        <span className="fs-4 fw-bold">User Profile</span>
        <div className="d-flex group-input-col-4">
          <div className="group-input-lable">
            <span className="title-lable">
              Employee ID <span className="text-require">*</span>
            </span>
            <Select
              options={options}
              placeholder="Please select employee id"
              classNamePrefix="react-select"
            />
          </div>
          <div className="group-input-lable">
            <span className="title-lable">First Name</span>
            <input type="text" className="bd-input" disabled />
          </div>
          <div className="group-input-lable">
            <span className="title-lable">Last Name</span>
            <input type="text" className="bd-input disabled" disabled />
          </div>
          <div className="group-input-lable">
            <span className="title-lable">Company</span>
            <input type="text" className="bd-input disabled" disabled />
          </div>
        </div>
        <div className="d-flex group-input-col-4">
          <div className="group-input-lable">
            <span className="title-lable">Department</span>
            <input type="text" className="bd-input" disabled />
          </div>
          <div className="group-input-lable">
            <span className="title-lable">Position</span>
            <input type="text" className="bd-input" disabled />
          </div>
          <div className="group-input-lable">
            <span className="title-lable">Email</span>
            <input type="text" className="bd-input disabled" disabled />
          </div>
          <div className="group-input-lable">
            <span className="title-lable">Phone Number</span>
            <input type="text" className="bd-input disabled" disabled />
          </div>
        </div>
        <div className="d-flex group-input-col-4">
          <div className="group-input-lable">
            <span className="title-lable">
              User Role <span className="text-require">*</span>
            </span>
            <Select
              options={options}
              placeholder="Please select user role"
              classNamePrefix="react-select"
              value={DataRole}
              onChange={(option) => setSelectedRole(option)}
            />
          </div>
          {DataRole ? (
            <div className="group-input-lable">
              <span className="title-lable">Option</span>
              <div className="d-flex group-input-radio">
                <label className="d-flex align-items-center cursor-pointer">
                  <input
                    type="radio"
                    name="option"
                    value="standard"
                    checked={optionValue === "standard"}
                    onChange={(e) => setOptionValue(e.target.value)}
                  />
                  <span className="ms-2 text-span-status">Standard</span>
                </label>
                <label className="d-flex align-items-center ms-5 cursor-pointer">
                  <input
                    type="radio"
                    name="option"
                    value="customize"
                    checked={optionValue === "customize"}
                    onChange={(e) => setOptionValue(e.target.value)}
                  />
                  <span className="ms-2 text-span-status">Customize</span>
                </label>
              </div>
            </div>
          ) : (
            <div className="group-input-lable">
              <span className="title-lable text-span-option disabled-group">
                Option
              </span>
              <div className="d-flex group-input-radio">
                <div className="d-flex">
                  <input type="radio" className="disabled-group" disabled />
                  <span className="ms-2 text-span-status disabled-group">
                    Standard
                  </span>
                </div>
                <div className="d-flex ms-5">
                  <input type="radio" className="disabled-group" disabled />
                  <span className="ms-2 text-span-status disabled-group">
                    Customize
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="group-input-lable"></div>
          <div className="group-input-lable"></div>
        </div>
        <div className="d-flex gap-3 mt-3">
          {/* ตารางฝั่งซ้าย */}
          <div className="w-50 rounded table-shadow">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th
                    className="text-center text-title-table bg-header-tr bd-right"
                    style={{ width: "5%" }}
                  >
                    #
                  </th>
                  <th className="text-center text-title-table bg-header-tr bd-right">
                    Modules
                  </th>
                  <th
                    className="text-center text-title-table bg-header-tr"
                    style={{ width: "15%" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {DataRole &&
                  optionValue &&
                  moduleData.map((item, index) => (
                    <tr key={index} data-id={item.id}>
                      <td className="text-center bg-header-td">{index + 1}</td>
                      <td className="bg-header-td">{item.module}</td>
                      <td className="text-center bg-header-td">
                        <img
                          className="cspt icon-action"
                          src={IconAction}
                          alt="Action"
                          onClick={() => ClickModule(item.id)}
                        />
                        {optionValue === "customize" && (
                          <img
                            src={IconBin}
                            className="cspt icon-action ms-2"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                {/* แถวเพิ่ม module */}
                {addingRow && (
                  <tr>
                    <td className="text-center bg-header-td align-middle">
                      {moduleData.length + 1}
                    </td>
                    <td className="bg-header-td align-middle">
                      <div style={{ paddingRight: "8px" }}>
                        <Select
                          options={moduleOptions}
                          placeholder="Please select modules"
                          value={newModuleValue}
                          onChange={(val) => setNewModuleValue(val)}
                          styles={{
                            control: (base) => ({
                              ...base,
                              minHeight: 30,
                              height: 30,
                              fontSize: "0.85rem",
                              boxShadow: "none",
                              display: "flex",
                              alignItems: "center",
                            }),
                            valueContainer: (base) => ({
                              ...base,
                              padding: "0 8px",
                              height: "30px",
                            }),
                            dropdownIndicator: (base) => ({
                              ...base,
                              padding: 4,
                            }),
                            indicatorsContainer: (base) => ({
                              ...base,
                              height: 30,
                            }),
                            placeholder: (base) => ({
                              ...base,
                              margin: 0,
                            }),
                            singleValue: (base) => ({
                              ...base,
                              margin: 0,
                            }),
                          }}
                        />
                      </div>
                    </td>
                    <td className="text-center bg-header-td">
                      <img
                        src={IconCheck}
                        className="cspt icon-action-table me-2"
                        onClick={confirmAddModule}
                      />
                      <img
                        src={IconCancel}
                        className="cspt icon-action-table"
                        onClick={() => setAddingRow(false)}
                      />
                    </td>
                  </tr>
                )}

                {!addingRow && DataRole && optionValue === "customize" && (
                  <tr>
                    <td colSpan={3}>
                      <div
                        className="text-center py-2 cursor-pointer bt-add-modules"
                        onClick={addModules}
                      >
                        + Add modules
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ตารางฝั่งขวา */}
          <div className="w-50 rounded table-shadow">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th
                    className="text-center text-title-table bg-header-tr bd-right"
                    style={{ width: "5%" }}
                  >
                    #
                  </th>
                  <th className="text-center text-title-table bg-header-tr bd-right">
                    Function
                  </th>
                  <th
                    className="text-center text-title-table bg-header-tr bd-right"
                    style={{ width: "15%" }}
                  >
                    Read Access
                  </th>
                  <th
                    className="text-center text-title-table bg-header-tr bd-right"
                    style={{ width: "15%" }}
                  >
                    Full Access
                  </th>
                  <th
                    className="text-center text-title-table bg-header-tr"
                    style={{ width: "15%" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* แถว Skill Matrix */}

                {isModule && DataRole && optionValue ? (
                  <tr
                    style={{
                      backgroundColor: "rgba(223, 230, 234, 1)",
                      fontWeight: "bold",
                    }}
                  >
                    <td className="text-center bg-header-td">
                      <img
                        src={isExpanded ? IconExpand : IconCollapse}
                        alt="toggle"
                        className="cursor-pointer icon-action"
                        onClick={() => setIsExpanded(!isExpanded)}
                      />
                    </td>
                    <td className="bg-header-td">Skill Matrix</td>
                    <td className="text-center bg-header-td">
                      {optionValue !== "standard" && (
                        <input
                          ref={readRef}
                          type="checkbox"
                          className="checkbox-custom"
                          checked={selectAllRead}
                          onChange={(e) =>
                            handleSelectAll("readAccess", e.target.checked)
                          }
                        />
                      )}
                    </td>

                    <td className="text-center bg-header-td">
                      {optionValue !== "standard" && (
                        <input
                          ref={fullRef}
                          type="checkbox"
                          className="checkbox-custom"
                          checked={selectAllFull}
                          onChange={(e) =>
                            handleSelectAll("fullAccess", e.target.checked)
                          }
                        />
                      )}
                    </td>
                    <td className="text-center bg-header-td">
                      {optionValue === "customize" && (
                        <img
                          src={IconBin}
                          alt="delete"
                          className="cursor-pointer icon-action"
                        />
                      )}
                    </td>
                  </tr>
                ) : (
                  <tr></tr>
                )}

                {/* รายการ Function */}
                {DataRole &&
                  isExpanded &&
                  DataList.map((f, i) => (
                    <tr key={i}>
                      <td className="text-center">{i + 1}</td>
                      <td>{f.function}</td>
                      <td className="text-center">
                        {optionValue === "standard" ? (
                          f.readAccess ? (
                            <input
                              type="checkbox"
                              className="checkbox-custom"
                              checked={true}
                            />
                          ) : null
                        ) : (
                          <input
                            type="checkbox"
                            className="checkbox-custom"
                            checked={f.readAccess}
                            onChange={() =>
                              handleCheckboxChange(i, "readAccess")
                            }
                          />
                        )}
                      </td>

                      <td className="text-center">
                        {optionValue === "standard" ? (
                          f.fullAccess ? (
                            <input
                              type="checkbox"
                              className="checkbox-custom"
                              checked={true}
                            />
                          ) : null
                        ) : (
                          <input
                            type="checkbox"
                            className="checkbox-custom"
                            checked={f.fullAccess}
                            onChange={() =>
                              handleCheckboxChange(i, "fullAccess")
                            }
                          />
                        )}
                      </td>
                      <td className="text-center">
                        {optionValue === "customize" && (
                          <img src={IconBin} className="cspt icon-action" />
                        )}
                      </td>
                    </tr>
                  ))}
                {addingFunctionRow && (
                  <tr>
                    <td className="text-center align-middle">
                      {DataList.length + 1}
                    </td>
                    <td className="align-middle">
                      <Select
                        options={functionOptions}
                        placeholder="Please select function"
                        value={newFunctionValue}
                        onChange={(val) => setNewFunctionValue(val)}
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: 30,
                            height: 30,
                            fontSize: "0.85rem",
                            boxShadow: "none",
                            display: "flex",
                            alignItems: "center",
                          }),
                          valueContainer: (base) => ({
                            ...base,
                            padding: "0 8px",
                            height: "30px",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            padding: 4,
                          }),
                          indicatorsContainer: (base) => ({
                            ...base,
                            height: 30,
                          }),
                          placeholder: (base) => ({
                            ...base,
                            margin: 0,
                          }),
                          singleValue: (base) => ({
                            ...base,
                            margin: 0,
                          }),
                        }}
                      />
                    </td>
                    <td className="text-center align-middle">
                      <input type="checkbox" className="checkbox-custom" />
                    </td>
                    <td className="text-center align-middle">
                      <input type="checkbox" className="checkbox-custom" />
                    </td>
                    <td className="text-center align-middle">
                      <img
                        src={IconCheck}
                        className="cspt icon-action-table me-2"
                        onClick={confirmAddFunction}
                      />
                      <img
                        src={IconCancel}
                        className="cspt icon-action-table"
                        onClick={() => setAddingFunctionRow(false)}
                      />
                    </td>
                  </tr>
                )}
                {isModule &&
                  !addingFunctionRow &&
                  DataRole &&
                  isExpanded &&
                  optionValue === "customize" && (
                    <tr>
                      <td colSpan={5}>
                        <div
                          className="text-center py-2 cursor-pointer bt-add-func"
                          onClick={addFunction}
                        >
                          <img
                            src={IconAddFunc}
                            className="me-1"
                            style={{ width: "15px" }}
                            alt="Add"
                          />
                          Add Function
                        </div>
                      </td>
                    </tr>
                  )}
                {subModules.map((sub) => (
                  <React.Fragment key={sub.id}>
                    {/* Header */}
                    <tr
                      style={{
                        backgroundColor: "rgba(223, 230, 234, 1)",
                        fontWeight: "bold",
                      }}
                    >
                      <td className="text-center bg-header-td">
                        <img
                          src={sub.expanded ? IconExpand : IconCollapse}
                          alt="toggle"
                          className="cursor-pointer icon-action"
                          onClick={() => toggleExpandSubModule(sub.id)}
                        />
                      </td>
                      <td className="bg-header-td">{sub.title}</td>
                      <td className="text-center bg-header-td">
                        <input
                          type="checkbox"
                          className="checkbox-custom"
                          checked={
                            sub.functions.length > 0 &&
                            sub.functions.every((f) => f.readAccess)
                          }
                          indeterminate={
                            sub.functions.some((f) => f.readAccess) &&
                            !sub.functions.every((f) => f.readAccess)
                          }
                          onChange={(e) => {
                            const value = e.target.checked;
                            setSubModules((prev) =>
                              prev.map((s) =>
                                s.id === sub.id
                                  ? {
                                      ...s,
                                      functions: s.functions.map((f) => ({
                                        ...f,
                                        readAccess: value,
                                      })),
                                    }
                                  : s
                              )
                            );
                          }}
                        />
                      </td>

                      <td className="text-center bg-header-td">
                        <input
                          type="checkbox"
                          className="checkbox-custom"
                          checked={
                            sub.functions.length > 0 &&
                            sub.functions.every((f) => f.fullAccess)
                          }
                          indeterminate={
                            sub.functions.some((f) => f.fullAccess) &&
                            !sub.functions.every((f) => f.fullAccess)
                          }
                          onChange={(e) => {
                            const value = e.target.checked;
                            setSubModules((prev) =>
                              prev.map((s) =>
                                s.id === sub.id
                                  ? {
                                      ...s,
                                      functions: s.functions.map((f) => ({
                                        ...f,
                                        fullAccess: value,
                                      })),
                                    }
                                  : s
                              )
                            );
                          }}
                        />
                      </td>
                      <td className="text-center bg-header-td">
                        {optionValue === "customize" && (
                          <img
                            src={IconBin}
                            className="cursor-pointer icon-action"
                          />
                        )}
                      </td>
                    </tr>

                    {/* Function List */}
                    {sub.expanded &&
                      sub.functions.map((f, i) => (
                        <tr key={i}>
                          <td className="text-center">{i + 1}</td>
                          <td>{f.function}</td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              checked={f.readAccess}
                              className="checkbox-custom"
                            />
                          </td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              checked={f.fullAccess}
                              className="checkbox-custom"
                            />
                          </td>
                          <td className="text-center">
                            {optionValue === "customize" && (
                              <img src={IconBin} className="cspt icon-action" />
                            )}
                          </td>
                        </tr>
                      ))}

                    {/* Add Function Row */}
                    {sub.addingFunctionRow && (
                      <tr>
                        <td className="text-center align-middle">
                          {sub.functions.length + 1}
                        </td>
                        <td className="align-middle">
                          <Select
                            options={functionOptions}
                            placeholder="Please select function"
                            value={sub.newFunctionValue}
                            onChange={(val) => updateFunctionValue(sub.id, val)}
                            styles={{
                              control: (base) => ({
                                ...base,
                                minHeight: 30,
                                height: 30,
                                fontSize: "0.85rem",
                                boxShadow: "none",
                                display: "flex",
                                alignItems: "center",
                              }),
                              valueContainer: (base) => ({
                                ...base,
                                padding: "0 8px",
                                height: "30px",
                              }),
                              dropdownIndicator: (base) => ({
                                ...base,
                                padding: 4,
                              }),
                              indicatorsContainer: (base) => ({
                                ...base,
                                height: 30,
                              }),
                              placeholder: (base) => ({
                                ...base,
                                margin: 0,
                              }),
                              singleValue: (base) => ({
                                ...base,
                                margin: 0,
                              }),
                            }}
                          />
                        </td>
                        <td className="text-center align-middle">
                          <input type="checkbox" className="checkbox-custom" />
                        </td>
                        <td className="text-center align-middle">
                          <input type="checkbox" className="checkbox-custom" />
                        </td>
                        <td className="text-center align-middle">
                          <img
                            src={IconCheck}
                            className="cspt icon-action-table me-2"
                            onClick={() =>
                              confirmAddFunctionToSubModule(sub.id)
                            }
                          />
                          <img
                            src={IconCancel}
                            className="cspt icon-action-table"
                            onClick={() => cancelAddFunctionToSubModule(sub.id)}
                          />
                        </td>
                      </tr>
                    )}

                    {/* Add Function Button */}
                    {sub.expanded &&
                      !sub.addingFunctionRow &&
                      optionValue === "customize" && (
                        <tr>
                          <td colSpan={5}>
                            <div
                              className="text-center py-2 cursor-pointer bt-add-func"
                              onClick={() => addFunctionToSubModule(sub.id)}
                            >
                              <img
                                src={IconAddFunc}
                                className="me-1"
                                style={{ width: "15px" }}
                                alt="Add"
                              />
                              Add Function
                            </div>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                ))}
                {addingSubRow && (
                  <tr>
                    <td className="text-center align-middle bg-header-td"></td>
                    <td className="align-middle bg-header-td">
                      <Select
                        options={subModuleOptions} // เช่น Skill Matrix, Training Plan
                        placeholder="Please select sub module"
                        value={newSubModuleValue}
                        onChange={(val) => setNewSubModuleValue(val)}
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: 30,
                            height: 30,
                            fontSize: "0.85rem",
                            boxShadow: "none",
                            display: "flex",
                            alignItems: "center",
                          }),
                          valueContainer: (base) => ({
                            ...base,
                            padding: "0 8px",
                            height: "30px",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            padding: 4,
                          }),
                          indicatorsContainer: (base) => ({
                            ...base,
                            height: 30,
                          }),
                          placeholder: (base) => ({
                            ...base,
                            margin: 0,
                          }),
                          singleValue: (base) => ({
                            ...base,
                            margin: 0,
                          }),
                        }}
                      />
                    </td>
                    <td className="text-center align-middle bg-header-td">
                      <input type="checkbox" className="checkbox-custom" />
                    </td>
                    <td className="text-center align-middle bg-header-td">
                      <input type="checkbox" className="checkbox-custom" />
                    </td>
                    <td className="text-center align-middle bg-header-td">
                      <img
                        src={IconCheck}
                        className="cspt icon-action-table me-2"
                        onClick={confirmAddSubModule}
                      />
                      <img
                        src={IconCancel}
                        className="cspt icon-action-table"
                        onClick={cancelAddSubModule}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
              {isModule && DataRole && optionValue === "customize" && (
                <tr>
                  <td colSpan={5}>
                    <div
                      className="text-center mt-2 py-2 cursor-pointer bt-add-modules"
                      onClick={addSubModule}
                    >
                      + Add Sub Modules
                    </div>
                  </td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </div>
      <div className="w-100">
        <div className="d-flex justify-content-end align-items-center h-100 p-2">
          <button className="btn btn-success text-white d-flex align-items-center justify-content-center wh-75-35">
            Save
          </button>
          <button className="btn btn-danger text-white d-flex align-items-center justify-content-center wh-75-35 ms-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserProfile;
