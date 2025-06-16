import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../../context/GlobalContext";
import { v4 as uuidv4 } from 'uuid';
import { IoMdArrowDropup } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { PiFolderSimplePlus } from "react-icons/pi";
import { FiPlus, FiPlusCircle } from "react-icons/fi";
import PageTitle from "../../../components/common/Title/PageTitle";

const CreateModuleFunction = () => {

  const { moduleId } = useParams();

  const location = useLocation();
  const moduleName = location.state?.moduleName;

  const navigate = useNavigate();

  const { showAlertConfirm, showAlertAfterConfirm } = useGlobalContext();

  const { register, handleSubmit, watch } = useForm();
  const watchAllFields = watch();

  const [boxFunctionGroups, setBoxFunctionGroups] = useState([
    { id: uuidv4(), moduleFunctions: [] }
  ]);

  const handleAddBoxFunctionGroup = () => {
    setBoxFunctionGroups(prev => [...prev, { id: uuidv4(), moduleFunctions: [] }]);
  };

  const handleDeleteBoxFunctionGroup = (groupId) => {
    setBoxFunctionGroups(prev => prev.filter(group => group.id !== groupId));
  };

  const handleAddFunction = (groupId) => {
    setBoxFunctionGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? { ...group, moduleFunctions: [...group.moduleFunctions, { id: uuidv4(), subFunctions: [] }] }
          : group
      )
    );
  };

  const handleDeleteFunction = (groupId, functionId) => {
    setBoxFunctionGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? { ...group, moduleFunctions: group.moduleFunctions.filter(fn => fn.id !== functionId) }
          : group
      )
    );
  };

  const handleAddSubFunction = (groupId, parentId, level) => {
    if (level > 3) return;

    const addNestedSubFunction = (functions) =>
      functions.map(fn =>
        fn.id === parentId
          ? { ...fn, subFunctions: [...fn.subFunctions, { id: uuidv4(), subFunctions: [] }] }
          : { ...fn, subFunctions: addNestedSubFunction(fn.subFunctions) }
      );

    setBoxFunctionGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? { ...group, moduleFunctions: addNestedSubFunction(group.moduleFunctions) }
          : group
      )
    );
  };

  const handleDeleteSubFunction = (groupId, parentId, subId) => {
    const deleteNestedSubFunction = (functions) =>
      functions.map(fn =>
        fn.id === parentId
          ? { ...fn, subFunctions: fn.subFunctions.filter(subFn => subFn.id !== subId) }
          : { ...fn, subFunctions: deleteNestedSubFunction(fn.subFunctions) }
      );

    setBoxFunctionGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? { ...group, moduleFunctions: deleteNestedSubFunction(group.moduleFunctions) }
          : group
      )
    );
  };

  const isAnyValueFilled =
    Object.keys(watchAllFields?.moduleName || {}).some(key => watchAllFields.moduleName[key]) ||
    Object.values(watchAllFields?.moduleFunctions || {}).some(group =>
      Object.values(group || {}).some(value => value)
  );

  const onSubmit = (data) => {

    const mapFunction = (fn, data, groupId) => ({
      id: fn.id,
      name: data.moduleFunctions?.[groupId]?.[fn.id] || "",
      subFunctions: fn.subFunctions.map(subFn => mapFunction(subFn, data, groupId))
    });

    const payload = boxFunctionGroups.map(group => ({
      groupId: group.id,
      moduleName: data.moduleName?.[group.id] || "",
      moduleFunctions: group.moduleFunctions.map(fn => mapFunction(fn, data, group.id))
    }));

    showAlertConfirm(
      "Confirmation",
      "The data will be saved to your database.",
      () => {
        showAlertAfterConfirm(
          "Saved!",
          "Data has been completely saved.",
          () => {
            console.log(payload);
          }
        );
      }
    );
  }

  useEffect(() => {
    setTimeout(() => {
      const containers = document.querySelectorAll('.module-name');
      containers.forEach(container => {
        const firstModuleFunction = container.querySelector('.module-function');
        if (firstModuleFunction) {
          firstModuleFunction.classList.add('first-after');
        }

        const allInputModules = container.querySelectorAll('.input-module');
        allInputModules.forEach((inputModule) => {
          const currentModuleFunc = inputModule.closest('.module-function');
          if (!currentModuleFunc) return;

          const siblings = Array.from(currentModuleFunc.parentNode.children).filter(el =>
            el.classList.contains('module-function')
          );

          const index = siblings.indexOf(currentModuleFunc);
          const prevModuleFunc = siblings[index - 1];

          if (prevModuleFunc) {
            const prevHeight = prevModuleFunc.offsetHeight + 10;
            const prevTranslate = ((-prevHeight) + 79);

            inputModule.classList.add('fixed-sub-height');
            inputModule.style.setProperty('--sub-height', `${prevHeight}px`);

            if (prevHeight > 79) {
              inputModule.classList.add('fixed-sub-height');
              inputModule.style.setProperty('--translateY', `${prevTranslate}px`);
            } else {
              inputModule.classList.remove('fixed-sub-height');
              inputModule.style.removeProperty('--translateY');
            }
          }
        });

        const directModuleFunctions = Array.from(container.children).filter(el =>
          el.classList.contains('module-function')
        );

        if (directModuleFunctions.length > 1) {
          const lastModuleFunction = directModuleFunctions[directModuleFunctions.length - 2];
          const height = lastModuleFunction.offsetHeight;

          container.classList.add('fixed-main-height');
          container.style.setProperty('--main-height', `${height}px`);
        } else {
          container.classList.remove('fixed-main-height');
          container.style.removeProperty('--main-height');
        }
      });
    }, 0);
  }, [boxFunctionGroups, onSubmit]);

  const ModuleFunctionItem = ({ fn, parentId, level, groupId }) => (
    <div className="module-function">
      <div className="group-add-function">
        <div className="input-module">
          <select 
            className="select-base" 
            {...register(`moduleFunctions.${groupId}.${fn.id}`)}
          >
            <option value={""}>Please select function name</option>
            <option value={"Setup Master Data"}>Setup Master Data</option>
            <option value={"Instructor Information"}>Instructor Information</option>
            <option value={"Manage Part  No. Relation"}>Manage Part  No. Relation</option>
            <option value={"Manage Machine Skill"}>Manage Machine Skill</option>
            <option value={"Example Sub Function Management Skill"}>Example Sub Function Management Skill</option>
            <option value={"Manage Course"}>Manage Course</option>
            <option value={"Manage Plan"}>Manage Plan</option>
            <option value={"Training Results"}>Training Results</option>
            <option value={"Report"}>Report</option>
          </select>
          <button type="button" className="button button-icon" onClick={() => {
            if (parentId) {
              handleDeleteSubFunction(groupId, parentId, fn.id);
            } else {
              handleDeleteFunction(groupId, fn.id);
            }
          }}>
            <RiDeleteBinLine />
          </button> 
        </div>
        { level < 3 && (
          <div className="add-sub-function" onClick={() => handleAddSubFunction(groupId, fn.id, level + 1)}>
            <PiFolderSimplePlus />
            Add Sub Function
          </div>
        )}
      </div>
      { fn.subFunctions.map(subFn => (
        <ModuleFunctionItem
          key={subFn.id}
          fn={subFn}
          parentId={fn.id}
          level={level + 1}
          groupId={groupId}
        />
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="box-container">
        <div className="container-head has-content-between">
          <div className="title-left">
            <PageTitle title={`[${moduleId}] ${moduleName}`} />
          </div>
        </div>
        <div className="container-body">
          { boxFunctionGroups.map(group => (
            <div className="content-function" key={group.id}>
              <div className="box-function">
                <div className="module-name">
                  <div className="toggle-button">
                    <IoMdArrowDropup />
                  </div>
                  <div className="input-module">
                    <input
                      {...register(`moduleName.${group.id}`)}
                    />
                    <button type="button" className="button button-icon" onClick={() => handleDeleteBoxFunctionGroup(group.id)}>
                      <RiDeleteBinLine />
                    </button> 
                  </div>
                  { group.moduleFunctions.map(fn => (
                    <ModuleFunctionItem
                      key={fn.id}
                      fn={fn}
                      level={1}
                      groupId={group.id}
                    />
                  ))}
                </div>
              </div>
              <div className="add-function">
                <button
                  type="button"
                  className="button button-add-row no-border"
                  style={{ width: "130px" }}
                  onClick={() => handleAddFunction(group.id)}
                >
                  <FiPlusCircle className="text-xs" />
                  Add Function
                </button>
              </div>
            </div>
          ))}
          <div className='mt-15'>
            <button 
              type="button" 
              className="button button-add-row"
              onClick={handleAddBoxFunctionGroup}
            >
              <FiPlus className="text-xs" />
              Add Sub Modules
            </button>
          </div>  
        </div>
      </div>
      <div className="button-container">
        { isAnyValueFilled && <button type="submit" className="button button-green">Save</button> }
        <button type="button" className="button button-red" onClick={() => navigate("/manage-work-process")}>Cancel</button>
      </div>
    </form>
  )
  
}

export default CreateModuleFunction;