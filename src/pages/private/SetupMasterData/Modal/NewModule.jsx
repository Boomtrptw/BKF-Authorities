import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../../../context/GlobalContext";
import { IoIosCloseCircle } from "react-icons/io";
import clsx from "clsx";

const NewModule = ({isOpenModal, handleToggleModal}) => {

  const { showAlertConfirm, showAlertAfterConfirm } = useGlobalContext();

  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {

    showAlertConfirm(
      "Confirmation",
      "The data will be saved to your database.",
      () => {
        showAlertAfterConfirm(
          "Saved!",
          "Data has been completely saved.",
          () => {
            console.log(data);
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
        <div className={clsx("modal-popup modal-750", { open: isOpenModal })}>
          <div className="modal-header">
            <div className="breadcrumb">
              Setup Master Data <span className="mx-4">/</span> Manage User Role <span className="mx-1">/</span> <span className="title-active">New User Role</span>
            </div>
            <IoIosCloseCircle className="icon-close" onClick={handleToggleModal} />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label>
                    Modules ID
                    <span className="text-red ml-4">*</span>
                  </label>
                  <input
                    {...register("moduleId", {
                      required: "* Please specify module id",
                    })}
                    className={clsx("input-base w-full", { "input-error": errors?.moduleId })}
                    placeholder="Please specify module id"
                  />
                  {errors?.moduleId && (
                    <div className="text-error mt-5">{errors.moduleId.message}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-8">
                <div className="form-group">
                  <label>
                    Name 
                    <span className="text-red ml-4">*</span>
                  </label>
                  <input
                    {...register("moduleName", {
                      required: "* Please specify name",
                    })}
                    className={clsx("input-base w-full", { "input-error": errors?.moduleName })}
                    placeholder="Please specify name"
                  />
                  {errors?.moduleName && (
                    <div className="text-error mt-5">{errors.moduleName.message}</div>
                  )}
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
                reset();
              }}>
                Cancel
              </button>
          </div>    
        </div>
      </div>
    </form>
  )

}

export default NewModule