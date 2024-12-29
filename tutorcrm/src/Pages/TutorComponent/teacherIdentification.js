import { useState } from "react";

export function TeacherIdentifications({ initialData, editable }) {
    const [teacherIdentifications, setTeacherIdentifications] = useState(initialData || {});
    const [academicAction, setAcademicAction] = useState("");
    const [academicRemark, setAcademicRemark] = useState("");
    const [statusOptionss] = useState(["Approve", "Reject", "Remark"]);
    const [profileAction, setProfileAction] = useState('');
    const [profileRemark, setProfileRemark] = useState('');
    const handleFileChange = (e, field) => {
        const files = Array.from(e.target.files);
        setTeacherIdentifications(prevState => ({
            ...prevState,
            [field]: files // Store files array
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeacherIdentifications(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAcademicActionChange = (e) => {
        setAcademicAction(e.target.value);
    };

    const handleAcademicRemarkChange = (e) => {
        setAcademicRemark(e.target.value);
    };

    const toggleEdit = () => {
        setTeacherIdentifications(prevState => ({ ...prevState, editable: !prevState.editable }));
    };

    const handleUpdate = () => {
        console.log(teacherIdentifications);
    };


    const handleProfileActionChange = (e) => {
        const action = e.target.value;
        setProfileAction(action);

        if (action === "Remark") {
            // setProfileAction(""); // Reset tutor status if "Remark" is selected
        } else if (action === "Approved") {
            setProfileAction("Active");
        } else if (action === "Rejected") {
            setProfileAction("Deactivated");
        }

        // Clear profileRemark if action is not "Remark"
        if (action !== "Remark") {
            setProfileRemark('');
        }
    };
    const handleProfileRemarkChange = (e) => {
        setProfileRemark(e.target.value);
    };
    return (
        <div className="my-4 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-[#2C8E71] p-8 px-12">
            <h2 className="text-lg font-semibold text-black">Teacher Identifications</h2>

            <div className="flex flex-col gap-4">
                {["wwcc", "license", "passport", "covid_certificate", "nsq_photo_id"].map((field) => (
                    <div key={field} className="flex flex-col gap-2">
                        <label className="label-style">{field.replace('_', ' ').toUpperCase()}</label>
                        <input
                            type="file"
                            name={field}
                            className="form-style"
                            onChange={(e) => handleFileChange(e, field)}
                            disabled={!teacherIdentifications.editable}
                        />
                        {teacherIdentifications[field] && (
                            <img
                                src={typeof teacherIdentifications[field] === 'string' ? teacherIdentifications[field] : URL.createObjectURL(teacherIdentifications[field][0])}
                                alt={`${field} preview`}
                                className="w-[250px] h-[250px] object-cover mt-2"
                            />
                        )}
                    </div>
                ))}

                <div className="flex flex-col gap-2">
                    <label className="label-style">LinkedIn</label>
                    <input
                        type="url"
                        name="linkedin"
                        value={teacherIdentifications.linkedin || ""}
                        className="form-style"
                        onChange={handleInputChange}
                        disabled={!teacherIdentifications.editable}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="label-style">Bank Details</label>
                    <input
                        type="text"
                        name="bank_details"
                        value={teacherIdentifications.bank_details || ""}
                        className="form-style"
                        onChange={handleInputChange}
                        disabled={!teacherIdentifications.editable}
                    />
                </div>

                {/* Additional fields here... */}

                <div className="flex flex-col gap-2">
                    <label className="label-style">Action</label>
                    <select
                        id="academicAction"
                        value={academicAction}
                        onChange={handleAcademicActionChange}
                        className="form-style"
                        disabled={!teacherIdentifications.editable}
                    >
                        <option value="">--Select Action--</option>
                        {statusOptionss.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col lg:flex-row gap-5 lg:mt-5">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="actionSelect" className="label-style">Action</label>
                        <select
                            id="profileAction"
                            value={profileAction}
                            onChange={handleProfileActionChange}
                            className="form-style"
                        >
                            <option value="">--Select Action--</option>
                            {statusOptionss.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    {profileAction === "Remark" && (
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="profileRemark" className="label-style">Remark</label>
                            <input
                                type="text"
                                id="profileRemark"
                                value={profileRemark}
                                onChange={handleProfileRemarkChange}
                                placeholder="Enter your remark"
                                className="form-style"
                            />
                        </div>
                    )}
                </div>

                {/* <div className="flex gap-4 mt-4">
                    {teacherIdentifications.editable ? (
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="p-2 bg-blue-500 text-white rounded-md w-32"
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={toggleEdit}
                            className="p-2 bg-blue-500 text-white rounded-md w-32"
                        >
                            Edit
                        </button>
                    )}
                </div> */}
                <div className="flex gap-4 mt-4">
                    <div>
                        <button
                            type="button"
                            // onClick={handleProfile}
                            className="p-2 bg-blue-500 text-white rounded-md w-32"
                        // disabled={!editable}
                        >
                            Save
                        </button>
                    </div>
                    <div>
                        {teacherIdentifications.editable ? (
                            <button
                                type="button"
                                onClick={handleUpdate}
                                className="p-2 bg-blue-500 text-white rounded-md w-32"
                            >
                                Update
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={toggleEdit}
                                className="p-2 bg-blue-500 text-white rounded-md w-32"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
