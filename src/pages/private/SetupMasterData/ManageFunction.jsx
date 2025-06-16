import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useGlobalContext } from "../../../context/GlobalContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import clsx from "clsx";
import PageTitle from "../../../components/common/Title/PageTitle";
import SearchContent from "../../../components/common/Search/SearchContent";

const ManageFunction = () => {

  const { showAlertConfirm, showAlertAfterConfirm } = useGlobalContext();

  const [searchTerm, setSearchTerm] = useState("");

  const { register, reset, control, handleSubmit, formState: { errors }, clearErrors, watch } = useForm({
    defaultValues: {
      rows: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows"
  });

  const watchedRows = watch("rows");

  const filterManageFunction = fields.filter((field, index) => {
    const row = watchedRows[index];
    return (
      row?.functionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row?.functionNameEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row?.functionNameTh?.toLowerCase().includes(searchTerm.toLowerCase())
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
            reset();
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
              <PageTitle title="Manage Function" code="VRI-SC" />
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
                    <th className="text-center" style={{ width: "430px", maxWidth: "430px" }}>Function ID</th>
                    <th className="text-center">
                      Function Name <span className="text-small">(EN)</span>
                    </th>
                    <th className="text-center">
                      Function Name <span className="text-small">(TH)</span>
                    </th>
                    <th className="text-center" style={{ width: "300px", maxWidth: "300px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  { filterManageFunction.map((field, index) => (
                    <tr key={field.id}>
                      <td className="align-top text-center">
                        <div className="mt-5">{index + 1}</div>
                      </td>
                      <td className="align-top">
                        <input
                          {...register(`rows.${getRealIndex(field.id)}.functionId`, {
                            required: "* Please specify function id",
                          })}
                          className={clsx("input-base w-full text-center", { "input-error": errors?.rows?.[getRealIndex(field.id)]?.functionId })}
                          placeholder="Please specify function id"
                        />
                        {errors?.rows?.[getRealIndex(field.id)]?.functionId && (
                          <div className="text-error mt-5">{errors.rows[getRealIndex(field.id)].functionId.message}</div>
                        )}
                      </td>
                      <td className="align-top">
                        <input
                          {...register(`rows.${getRealIndex(field.id)}.functionNameEn`, {
                            required: "* Please specify function name (EN)",
                          })}
                          className={clsx("input-base w-full", { "input-error": errors?.rows?.[getRealIndex(field.id)]?.functionNameEn })}
                          placeholder="Please specify function name (EN)"
                        />
                        {errors?.rows?.[getRealIndex(field.id)]?.functionNameEn && (
                          <div className="text-error mt-5px">{errors.rows[getRealIndex(field.id)].functionNameEn.message}</div>
                        )}
                      </td>
                      <td className="align-top">
                        <input
                          {...register(`rows.${getRealIndex(field.id)}.functionNameTh`, {
                            required: "* Please specify function name (TH)",
                          })}
                          className={clsx("input-base w-full", { "input-error": errors?.rows?.[getRealIndex(field.id)]?.functionNameTh })}
                          placeholder="Please specify function name (TH)"
                        />
                        {errors?.rows?.[getRealIndex(field.id)]?.functionNameTh && (
                          <div className="text-error mt-5px">{errors.rows[getRealIndex(field.id)].functionNameTh.message}</div>
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
                          <button type="button" className="button button-icon" onClick={() => removeRow(getRealIndex(field.id))}>
                            <RiDeleteBinLine className="table-icon" />
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
                append({ functionId: "", functionNameEn: "", functionNameTh: "", status: "Active" });
                // clearErrors("rows");
              }}
            >
              <FiPlus className="text-xs" />
              Add Function
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

export default ManageFunction;