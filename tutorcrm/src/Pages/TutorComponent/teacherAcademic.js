import axios from "axios";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize toast notifications

export function TeacherAcademic({ initialData }) {
    const [teacherAcademic, setTeacherAcademic] = useState(initialData || {});
    const [academicAction, setAcademicAction] = useState("");
    const [academicRemark, setAcademicRemark] = useState("");
    const [editable, setEditable] = useState(false);
    const [statusOptions] = useState(["Approve", "Reject"]);
    const token = localStorage.getItem('token') || '';


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeacherAcademic((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAcademicActionChange = (e) => {
        setAcademicAction(e.target.value);
    };

    const handleAcademicRemarkChange = (e) => {
        setAcademicRemark(e.target.value);
    };

    const toggleEdit = () => {
        setTeacherAcademic((prevState) => ({
            ...prevState,
            editable: !prevState.editable,
        }));
        setEditable(!editable);
    };

    const toggleEditable = () => {
        setEditable(!editable);
    };

    const handleActionSave = async () => {
        const formData = new FormData();
        let teacherAction = '';

        // Set `teacherAction` based on the selected `academicAction`
        if (academicAction === "Approve") {
            teacherAction = "Active";
        } else if (academicAction === "Reject") {
            teacherAction = "Deactivated";
        } else {
            teacherAction = "Remark";
        }

        // Add data to FormData
        formData.append('teacher_id', teacherAcademic.teacher_id);
        formData.append('tutor_status', teacherAction);
        formData.append('remark', academicRemark ? academicRemark : '');
        formData.append('editable', "false");

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cms_tutor_academic`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.status === 200) {
                toast.success("Teacher academic status updated successfully!");
                setTeacherAcademic((prevState) => ({
                    ...prevState,
                    editable: false,
                }));
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            toast.error("Failed to update academic data. Please try again.");
            console.error("Error updating academic data:", error);
        }

        // Reset remark if action is not "Remark"
        if (academicAction !== "Remark") {
            setAcademicRemark('');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/teacher_update_academic`,
                teacherAcademic,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                toast.success("Teacher academic data updated successfully!");
                setTeacherAcademic((prevState) => ({
                    ...prevState,
                    editable: false,
                }));
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            toast.error("Failed to update academic data. Please try again.");
            console.error("Error updating academic data:", error);
        }
    };

    return (
        <div className="my-4 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-[#2C8E71] p-8 px-12">
            <h2 className="text-lg font-semibold text-white">Teacher Academic</h2>

            <div className="grid grid-cols-2 gap-6">
                {/* Fields for each data point */}
                {[
                    { label: "School Attended", name: "school_attended" },
                    { label: "Percentile", name: "percentile" },
                    { label: "Year of Achievement", name: "year_of_achievement" },
                    { label: "HSC Subjects", name: "hsc_subjects" },
                    { label: "Band Name", name: "band_name" },
                    { label: "Education Level IDs", name: "education_level_ids" },
                    { label: "HSC Subject Name", name: "hsc_subject_name" },
                    { label: "Education Levels", name: "education_levels" },
                    { label: "Tutor Status", name: "tutor_status" },
                    { label: "Remark", name: "remark" }
                ].map((field) => (
                    <div key={field.name} className="flex flex-col gap-2">
                        <label className="label-style text-white">{field.label}</label>
                        <input
                            type="text"
                            name={field.name}
                            value={teacherAcademic[field.name] || ""}
                            className="form-style"
                            onChange={handleInputChange}
                            disabled={!teacherAcademic.editable}
                        />
                    </div>
                ))}

                {/* Additional academic fields */}
                {/* <div className="flex flex-col gap-2">
                    <label className="label-style">Specialization Area</label>
                    <input
                        type="text"
                        name="area_special"
                        value={teacherAcademic.area_special || ""}
                        className="form-style"
                        onChange={handleInputChange}
                        disabled={!teacherAcademic.editable}
                    />
                </div> */}

                {/* <div className="flex flex-col gap-2">
                    <label className="label-style">Total Hours Taught</label>
                    <input
                        type="number"
                        name="hours_taught_total"
                        value={teacherAcademic.hours_taught_total || ""}
                        className="form-style"
                        onChange={handleInputChange}
                        disabled={!teacherAcademic.editable}
                    />
                </div> */}

                {/* Dropdown for actions */}
                <div className="flex flex-col gap-2 col-span-2">
                    <label className="label-style text-white">Academic Action</label>
                    <select
                        value={academicAction}
                        onChange={handleAcademicActionChange}
                        className="form-style"
                        disabled={!teacherAcademic.editable}
                    >
                        <option value="">--Select Action--</option>
                        {statusOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    {/* Remark field, displayed only when "Remark" is selected 
                   
                    {academicAction === "Remark" && (*/}
                        <div className="flex flex-col gap-2 col-span-2">
                            <label className="label-style text-white">Academic Remark</label>
                            <input
                                type="text"
                                value={academicRemark}
                                onChange={handleAcademicRemarkChange}
                                placeholder="Enter remark"
                                className="form-style"
                            />
                        </div>
                   {/* )} */}
                </div>

                {/* Toggle edit and update buttons */}
                <div className="flex gap-4 mt-4">
                    {
                         teacherAcademic.editable ?
                            <AiOutlineEdit
                                onClick={toggleEdit}
                                className="w-9 h-9 rounded-full p-1 cursor-pointer hover:text-red-800 hover:bg-red-300"
                                style={{
                                    fill: "blue",
                                }}
                            />
                            :
                            <FcCancel
                                onClick={toggleEdit}
                                className="w-9 h-9 rounded-full p-1 cursor-pointer hover:text-red-800 hover:bg-red-300"
                                style={{
                                    fill: "red",
                                }}
                            />

                    }
                    {teacherAcademic.editable && (
                        <>
                            <button
                                type="button"
                                onClick={handleUpdate}
                                className="p-2 bg-blue-500 text-white rounded-md w-32"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={handleActionSave}
                                className="p-2 bg-blue-500 text-white rounded-md w-32"
                            >
                                Update Action
                            </button>

                        </>

                    )}
                </div>
            </div>
        </div>
    );
}

