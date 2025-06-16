import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useGlobalContext } from "../../../context/GlobalContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import clsx from "clsx";
import PageTitle from "../../../components/common/Title/PageTitle";
import SearchContent from "../../../components/common/Search/SearchContent";

const ManagePasswordPolicy = () => {

  const { showAlertConfirm, showAlertAfterConfirm } = useGlobalContext();

  const [searchTerm, setSearchTerm] = useState("");
  
  const { register, control, handleSubmit, formState: { errors }, clearErrors, watch } = useForm({
    defaultValues: {
      rows: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows"
  });

  const watchedRows = watch("rows");

  const filterPasswordPolicy = fields.filter((field, index) => {
    const row = watchedRows[index];
    return (
      row?.policy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getRealIndex = (id) => fields.findIndex(f => f.id === id);

  const removeRow = (index) => {
    showAlertConfirm(
      "Confirmation",
      "The data will be delete from your database.",
      () => {
        showAlertAfterConfirm(
          "Deleted!",
          "Data has been completely deleted.",
          () => {
            remove(index);
          }
        );
      }
    );
  }

  const onSubmit = (data) => {
    showAlertConfirm(
      "Confirmation",
      "The data will be updated to your database.",
      () => {
        showAlertAfterConfirm(
          "Updated!",
          "Data has been completely updated.",
          () => {
            console.log(data);
          }
        );
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="box-container">
          <div className="container-head has-content-between">
            <div className="title-left">
              <PageTitle title="Manage Password Policy" code="VRI-SC" />
            </div>
            <div className="title-right">
              <SearchContent onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="container-body">
            <div className="overflow-x-auto">
              <table className="table-list min-w-1024">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: "70px", maxWidth: "70px" }}>#</th>
                    <th className="text-center" style={{ width: "430px", maxWidth: "430px" }}>
                      Policy
                      <div className="icon-sort">
                        <MdKeyboardArrowUp />
                        <MdKeyboardArrowDown />
                      </div>
                    </th>
                    <th className="text-center" style={{ width: "600px", maxWidth: "600px" }}>
                      Description
                      <div className="icon-sort">
                        <MdKeyboardArrowUp />
                        <MdKeyboardArrowDown />
                      </div>
                    </th>
                    <th className="text-center" style={{ width: "300px", maxWidth: "300px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  { filterPasswordPolicy.map((field, index) => (
                    <tr key={field.id}>
                      <td className="align-top text-center">
                        <div className="mt-5px">{index + 1}</div>
                      </td>
                      <td className="align-top">
                        <input
                          {...register(`rows.${getRealIndex(field.id)}.policy`, {
                            required: "* Please specify policy",
                          })}
                          className={clsx("input-base w-full", { "input-error": errors?.rows?.[getRealIndex(field.id)]?.policy })}
                          placeholder="Please specify policy"
                        />
                        {errors?.rows?.[getRealIndex(field.id)]?.policy && (
                          <div className="text-error mt-5">{errors.rows[getRealIndex(field.id)].policy.message}</div>
                        )}
                      </td>
                      <td className="align-top">
                        <input
                          {...register(`rows.${getRealIndex(field.id)}.description`, {
                            required: "* Please specify description",
                          })}
                          className={clsx("input-base w-full", { "input-error": errors?.rows?.[getRealIndex(field.id)]?.description })}
                          placeholder="Please specify description"
                        />
                        {errors?.rows?.[getRealIndex(field.id)]?.description && (
                          <div className="text-error mt-5">{errors.rows[getRealIndex(field.id)].description.message}</div>
                        )}
                      </td>
                      <td className="align-top">
                        <div className="d-flex align-items-center gap-10">
                          <select
                            {...register(`rows.${getRealIndex(field.id)}.status`)}
                            className="select-base"
                            style={{ width: 'calc(100% - 40px)' }}
                          >
                            <option className="text-center" value="Active">Active</option>
                          </select>
                          {/* <RiDeleteBinLine className="table-icon" onClick={() => removeRow(index)}/> */}
                          <button type="button" className="button button-icon" onClick={() => removeRow(getRealIndex(field.id))} >
                            <RiDeleteBinLine className="table-icon"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button 
              type="button" 
              className="button button-add-row" 
              onClick={() => {
                append({ code: "", description: "", status: "Active" });
                // clearErrors("rows");
              }}
            >
              <FiPlus className="text-xs" />
              Add Policy
            </button>
          </div>
        </div>
        { fields.length > 0 && (
          <div className="button-container">
            <button type="submit" className="button button-green">Save</button>
            <button type="button" className="button button-red">Cancel</button>
          </div>
        )}
      </form>
    </>
  )

}

export default ManagePasswordPolicy;