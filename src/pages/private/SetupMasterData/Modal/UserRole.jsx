import  { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../../../context/GlobalContext";
import { IoIosCloseCircle } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { roleModuleList, roleFunctionList } from "../../../../data/security";
import CheckFuncItem from "./CheckFunctionItem";
import clsx from "clsx";

const UserRole = ({isOpenModal, handleToggleModal}) => {

  const { showAlertConfirm, showAlertAfterConfirm } = useGlobalContext();
  
  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  const [searchModule, setSearchModule] = useState("");
  const [searchFunc, setSearchFunc] = useState("");
  const [checkedModule, setCheckedModule] = useState(
    roleModuleList.reduce((acc, module) => ({ ...acc, [module]: false }), {})
  );
  const [checkedFuncs, setCheckedFuncs] = useState({});

  const isAllChecked = useMemo(() => {
    return roleModuleList.length > 0 && roleModuleList.every((m) => checkedModule[m]);
  }, [checkedModule]);

  const nameToFuncMap = {};
  const nameToParentMap = {};

  const buildMaps = (items, parent = null) => {
    for (const item of items) {
      nameToFuncMap[item.name] = item;
      if (parent) {
        nameToParentMap[item.name] = parent.name;
      }
      if (item.subFunction?.length) {
        buildMaps(item.subFunction, item);
      }
    }
  };
  buildMaps(roleFunctionList);

  const filteredModules = roleModuleList.filter((module) =>
    module.toLowerCase().includes(searchModule.toLowerCase())
  );

  const filterFuncRecursive = (items, keyword) => {
    return items
      .map((item) => {
        const match = item.name.toLowerCase().includes(keyword.toLowerCase());
        const subFunction = item.subFunction ? filterFuncRecursive(item.subFunction, keyword) : [];
        if (match || subFunction.length > 0) {
          return {
            ...item,
            subFunction,
          };
        }
        return null;
      })
      .filter(Boolean);
  };
  const filteredFuncs = filterFuncRecursive(roleFunctionList, searchFunc);

  const handleModuleChange = (label) => {
    if (label === "All") {
      const newValue = !isAllChecked;
      const newState = roleModuleList.reduce(
        (acc, m) => ({ ...acc, [m]: newValue }),
        {}
      );
      setCheckedModule(newState);
    } else {
      const newState = { ...checkedModule, [label]: !checkedModule[label] };
      setCheckedModule(newState);
    }
  };

  const getAllFuncNames = (items) => {
    let result = [];
    for (const item of items) {
      result.push(item.name);
      if (item.subFunction?.length > 0) {
        result = result.concat(getAllFuncNames(item.subFunction));
      }
    }
    return result;
  };

  const isAllFuncChecked = useMemo(() => {
    const allNames = getAllFuncNames(filteredFuncs);
    return allNames.length > 0 && allNames.every(name => checkedFuncs[name]);
  }, [filteredFuncs, checkedFuncs]);

  const handleToggleAllFuncs = () => {
    const allNames = getAllFuncNames(filteredFuncs);
    const newState = {};
    const newValue = !isAllFuncChecked;
    for (const name of allNames) {
      newState[name] = newValue;
    }
    setCheckedFuncs(prev => ({ ...prev, ...newState }));
  };

  const handleToggleFunc = useCallback((func) => {
    const allChildren = getAllChildrenNames(func);
    const shouldCheck = !checkedFuncs[func.name];
    const newState = { ...checkedFuncs };

    for (const name of allChildren) {
      newState[name] = shouldCheck;
    }

    const updateParents = (name) => {
      const parent = nameToParentMap[name];
      if (!parent) return;
      const parentFunc = nameToFuncMap[parent];
      const allSubNames = parentFunc.subFunction?.map(f => f.name) || [];
      const allChecked = allSubNames.every(sub => newState[sub]);
      newState[parent] = allChecked;
      updateParents(parent);
    };

    updateParents(func.name);
    setCheckedFuncs(newState);
  }, [checkedFuncs]);

  const getFuncAndAllChildrenNames = (func) => {
    let names = [func.name];
    if (func.subFunction?.length > 0) {
      for (const sub of func.subFunction) {
        names = names.concat(getFuncAndAllChildrenNames(sub));
      }
    }
    return names;
  };

  const getAllChildrenNames = (func) => {
    let result = [func.name];
    if (func.subFunction?.length) {
      for (const sub of func.subFunction) {
        result = result.concat(getAllChildrenNames(sub));
      }
    }
    return result;
  };

  const clearForm = () => {
    reset();
    setSearchFunc("");
    setSearchFunc("");
    setCheckedModule({});
    setCheckedFuncs({});
  }

  const buildSelectedFunctionTree = (items) => {
    const result = [];

    for (const item of items) {
      const isChecked = checkedFuncs[item.name];
      const selectedSub = item.subFunction?.length
        ? buildSelectedFunctionTree(item.subFunction)
        : [];

      const selectedSubNames = selectedSub.map((s) => s.name);

      if (isChecked || selectedSub.length > 0) {
        result.push({
          name: item.name,
          subFunction: selectedSubNames
        });
      }
    }

    return result;
  };

  const onSubmit = (data) => {

    const selectedModules = Object.entries(checkedModule)
      .filter(([_, isChecked]) => isChecked)
      .map(([name]) => name);

    const selectedFunctionTree = buildSelectedFunctionTree(roleFunctionList);

    const payload = {
      ...data,
      modules: selectedModules,
      functions: selectedFunctionTree,
    };

    showAlertConfirm(
      "Confirmation",
      "The data will be saved to your database.",
      () => {
        showAlertAfterConfirm(
          "Saved!",
          "Data has been completely saved.",
          () => {
            console.log(payload);
            reset();
            handleToggleModal(); 
          }
        );
      }
    );
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-container">
        <div className={`modal-popup modal-750 ${isOpenModal ? "open" : ""}`} style={{ maxHeight: "650px" }}>
          <div className="modal-header">
            <div className="breadcrumb">
              Setup Master Data <span className="mx-4">/</span> Manage User Role <span className="mx-1">/</span> <span className="title-active">New User Role</span>
            </div>
            <IoIosCloseCircle 
              className="icon-close" 
              onClick={() => {
                handleToggleModal();
                clearForm();
              }}
            />
          </div>
          <div className="modal-body height-540">
            <div className="form-group">
              <label>
                Group Name 
                <span className="text-red ml-4">*</span>
              </label>
              <input
                {...register("groupName", {
                  required: "* Please specify group name",
                })}
                className={clsx("input-base w-full", { "input-error": errors?.groupName })}
                placeholder="Please specify group name"
              />
              {errors?.groupName && (
                <div className="text-error mt-5">{errors.groupName.message}</div>
              )}
            </div>
            <div className="border-divider"></div>
            <div className="modal-body-topic">Modules/Function</div>
            <div className="select-role-function">
              <div className="box-select-function">
                <div className="box-title">Modules</div>
                <div className="box-search">
                  <LuSearch />
                  <input type="text" placeholder="Search function" value={searchModule} onChange={(e) => setSearchModule(e.target.value)} />
                </div>
                <div className="box-checklist">
                  { filteredModules.length > 0 ? (
                    <ul>
                      { filteredModules.length === roleModuleList.length && (
                        <li>
                          <div className="d-flex align-items-center gap-5">
                            <input
                              type="checkbox"
                              checked={isAllChecked}
                              onChange={() => handleModuleChange("All")}
                            />
                            All
                          </div>
                        </li>
                      )}
                      { filteredModules.map((module,index) => {
                        const isChecked = module in checkedModule ? checkedModule[module] : false;
                        return (
                          <li key={index}>
                            <div className="d-flex align-items-center gap-5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleModuleChange(module)}
                              />
                              {module}
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  ) : 
                    <div className="no-data">-- No Data --</div>
                  }
                </div>
              </div>
              <div className="box-select-function">
                <div className="box-title">Function</div>
                <div className="box-search">
                  <LuSearch />
                  <input type="text" placeholder="Search function" value={searchFunc} onChange={(e) => setSearchFunc(e.target.value)} />
                </div>
                <div className="box-checklist">
                  { filteredFuncs.length > 0 ? (
                    <ul>
                      { searchFunc.trim() === "" && (
                        <li>
                          <div className="d-flex align-items-center gap-5">
                            <input
                              type="checkbox"
                              checked={isAllFuncChecked}
                              onChange={handleToggleAllFuncs}
                            />
                            All
                          </div>
                        </li>
                      )}
                      { filteredFuncs.map((func, index) => (
                        <CheckFuncItem
                          key={index}
                          func={func}
                          checkedFuncs={checkedFuncs}
                          handleToggleFunc={handleToggleFunc}
                        />
                      ))}
                    </ul>
                  ) : 
                    <div className="no-data">-- No Data --</div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="button button-green">Save</button>
            <button 
              type="button" 
              className="button button-red" 
              onClick={() => {
                handleToggleModal();
                clearForm();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  )

}

export default UserRole;