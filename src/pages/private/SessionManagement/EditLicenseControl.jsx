import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import { tabLicense, licenseUser } from "../../../data/security";
import clsx from "clsx";

const EditLicenseControl = () => {

  const navigate = useNavigate();

  const { showAlertConfirm, showAlertAfterConfirm } = useGlobalContext();

  const [userIsChecked, setUserIsChecked] = useState([]);
  const [activeTab, setActiveTab] = useState(tabLicense[0].moduleId);

  const { register, reset, handleSubmit } = useForm();

  const defaultValues = {
    shortName: 'VRI',
    companyName: 'VR Intelligence Co., Ltd.',
    email: 'Info@vri.co.th',
    tel: '02 805 9096',
    address: 'Asoke Tower Building 10th floor, 219/34 Soi Asoke, Sukhumvit Road 21',
    subDistrict: 'Khlong Toei Nuea',
    district: 'Watthana',
    province: 'Bangkok',
    postCode: '10110',
    country: 'Thailand',
    licenseModule: '8',
    startLicense: '1/01/2025',
    endLicense: '01/01/2026',
    licenseAmount: '20',
    remaining: '10'
  };

  useEffect(() => {
    reset(defaultValues);
    setUserIsChecked(licenseUser.map((u) => u.userStatus));
  }, [reset]);

  const handleToggleAll = (checked) => {
    setUserIsChecked(licenseUser.map(() => checked));
  };

  const handleToggle = (index) => {
    setUserIsChecked((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const onSubmit = (data) => {

    const toggledUsers = licenseUser.map((user, index) => ({
      ...user,
      userStatus: userIsChecked[index],
    }));

    const payload = {
      // ...data,
      toggledUsers,
    };
    
    showAlertConfirm(
      "Confirmation",
      "The data will be updated to your database.",
      () => {
        showAlertAfterConfirm(
          "Updated!",
          "Data has been completely updated.",
          () => {
            console.log(payload);
            navigate("/license-control")
          }
        );
      }
    );

  };

  const tabContent = (moduleId) => {
    return (
      <div>
        <div className="box-container no-set-height">
          <h2>License Information</h2>
          <div className="row">
            <div className="col-lg-6 col-xl-6 col-xxl-3">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">Start License</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`startLicense`)}  
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">End License</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`endLicense`)}  
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6 col-xxl-3">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">License (Amount)</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`licenseAmount`)}  
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">Remaining</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`remaining`)}  
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="table-list min-w-1024">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "70px", maxWidth: "70px" }}>No.</th>
                  <th className="text-center" style={{ width: "150px", maxWidth: "150px" }}>Username</th>
                  <th className="text-center" style={{ width: "250px", maxWidth: "250px" }}>First Name</th>
                  <th className="text-center" style={{ width: "250px", maxWidth: "250px" }}>Last Name</th>
                  <th className="text-center" style={{ width: "250px", maxWidth: "250px" }}>Department</th>
                  <th className="text-center" style={{ width: "250px", maxWidth: "250px" }}>Position</th>
                  <th className="text-center" style={{ width: "350px", maxWidth: "350px" }}>Email</th>
                  <th style={{ width: "120px", maxWidth: "120px" }}>
                    <div className="d-flex align-items-center justify-content-center">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={userIsChecked.every((v) => v)}
                          onChange={(e) => handleToggleAll(e.target.checked)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div> 
                  </th>
                </tr>
              </thead>
              <tbody>
                { licenseUser.map((item, index) => (
                  <tr key={item.userName}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{item.userName}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td className="text-center">{item.department}</td>
                    <td className="text-center">{item.position}</td>
                    <td>{item.email}</td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={userIsChecked[index]}
                            onChange={() => handleToggle(index)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="box-container no-set-height" style={{paddingBottom: "5px"}}>
          <h2>General Information</h2>
          <div className="row">
            <div className="col-lg-6 col-xl-6 col-xxl-3">
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <div className="form-group mb-15">
                    <label className="font-normal">Short Name</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`shortName`)}  
                    />
                  </div>
                </div>
                <div className="col-md-6 col-lg-8">
                  <div className="form-group mb-15">
                    <label className="font-normal">Company Name</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`companyName`)}  
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6 col-xxl-3">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">Email</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`email`)}  
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">Tel.</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`tel`)}  
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-xxl-6">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-15">
                    <label className="font-normal">Address</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`address`)}  
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-xl-6 col-xxl-3">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">Sub District</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`subDistrict`)}  
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">District</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`district`)}  
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6 col-xxl-3">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">Province</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`province`)}  
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">Post Code</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`postCode`)}  
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6 col-xxl-3">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">Country</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`country`)}  
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">License (Modules)</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`licenseModule`)}  
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6 col-xxl-3">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-15">
                    <label className="font-normal">Start License</label>
                    <input 
                      className="input-base w-full"
                      disabled
                      {...register(`startLicense`)}  
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-container no-set-height">
          <ul className="nav nav-tabs button-tabs d-none d-sm-none d-md-flex">
            { tabLicense.map(tab => (
              <li className="nav-item" key={tab.moduleId}>
                <button
                  type="button"
                  className={clsx("nav-link", { active: activeTab === tab.moduleId, })}
                  onClick={() => setActiveTab(tab.moduleId)}
                >
                  [{tab.moduleId}] {tab.moduleName}
                </button>
              </li>
            ))}
          </ul>
          <select
            className="select-base w-full d-block d-sm-block d-md-none"
            value={activeTab}
            onChange={e => setActiveTab(e.target.value)}
          >
            { tabLicense.map(tab => (
              <option key={tab.moduleId} value={tab.moduleId}>
                [{tab.moduleId}] {tab.moduleName}
              </option>
            ))}
          </select>
        </div>
        <div className="tab-content mt-3">
          <div className="tab-pane fade show active">
            {tabContent(activeTab)}
          </div>
        </div>
        <div className="button-container">
          <button type="submit" className="button button-green">Save</button>
          <button type="button" className="button button-red" onClick={() => navigate("/license-control")}>Cancel</button>
        </div>
      </form>
    </>
  )
}

export default EditLicenseControl;