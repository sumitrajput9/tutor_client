import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ParentProfile() {
    const [tutors, setTutors] = useState([]);
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [tutorDetails, setTutorDetails] = useState({});
    const [status, setStatus] = useState('');
    const [remark, setRemark] = useState('');

    // Fetch users (tutors) when the component mounts
    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await axios.post('https://testapi.tutorgator.com.au/get_users', {}, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NjgsImlhdCI6MTcyODA1MzE4OSwiZXhwIjoxNzMwNDcyMzg5fQ.iANsAux00eVz5LBPe-rlPsXJiZw_s8WVBcfOfm4wzVg`
                    },
                });
                const filteredTutors = response.data.data.filter(tutor => tutor.user_type === 'client');
                console.log(response.data.data,"123");
                
                console.log(filteredTutors);

                setTutors(filteredTutors);
            } catch (error) {
                console.error('Error fetching tutors:', error);
            }
        };
        fetchTutors();
    }, []);

    // Fetch tutor details when a tutor is selected
    const handleTutorSelect = async (teacherId) => {
        console.log(teacherId, "teacherId");
        try {
            const response = await axios.post(
                'https://testapi.tutorgator.com.au/get_teacher_info',
                { teacher_id: teacherId }, // Data payload
                { // Third parameter for config
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NjgsImlhdCI6MTcyODA1MzE4OSwiZXhwIjoxNzMwNDcyMzg5fQ.iANsAux00eVz5LBPe-rlPsXJiZw_s8WVBcfOfm4wzVg`
                    }
                }
            );
            console.log(response?.data?.data);

            setTutorDetails(response?.data?.data);
            setSelectedTutor(teacherId);
        } catch (error) {
            console.error('Error fetching tutor details:', error);
        }
    };

    // Handle approval/rejection
    const handleApproval = async (action,event) => {
        event.preventDefault();
        console.log(action);
        console.log(remark);
        const formData = new FormData();
        formData.append("teacher_id", selectedTutor);
        formData.append("tutor_status", action);
        formData.append("remark", remark);
        formData.append("editable", "false");
        try {
            const response = await axios.post(
                'https://testapi.tutorgator.com.au/cms_tutor_profile',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6NjgsImlhdCI6MTcyNzg4NDcyOSwiZXhwIjoxNzMwMzAzOTI5fQ.ySshr5ms1gwZ63gsWypcMPqiXf369JHY6VZY1uxGyiw`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log(response);
            
            alert(response.data.message);
            setStatus(''); // Reset status
            setRemark(''); // Reset remark
        } catch (error) {
            console.error('Error updating tutor status:', error);
        }
    };

    const statusOptions = ['profile incomplete', 'pending activation', 'active', 'suspended', 'inactive'];
    const filteredTutors = tutors.filter(tutor => tutor.status === status);

    return (
        <div className="flex flex-col">
            {/* Header */}
            <header className="bg-richblack-900 text-white p-4 m-0">
                <h1 className="text-xl font-bold">Parent Approval</h1>
            </header>
            {/* Main Content */}
            <main className="p-4">
                <h2>Welcome to the Parent Dashboard</h2>
                <div className='flex'>
                    <div>
                        <label htmlFor="statusSelect" className="block mb-2">Select Status:</label>
                        <select
                            id="statusSelect"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border p-2"
                        >
                            <option value="">--Select Status--</option>
                            {statusOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        {status && (
                            <div className="ms-2">
                                <label htmlFor="tutorSelect" className="block mb-2">Select Parent:</label>
                                <select
                                    id="tutorSelect"
                                    onChange={(e) => handleTutorSelect(e.target.value)}
                                    className="border p-2"
                                >
                                    <option value="">--Select Parent--</option>
                                    {filteredTutors.map((tutor) => (
                                        <option key={tutor.id} value={tutor.id}>
                                            {tutor.first_name} {tutor.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
                {selectedTutor && (
                    <div className="mt-4">
                        <h3 className="font-bold">Parent Details</h3>
                        <form>
                            {/* Profile Information */}
                            <div className="my-4 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                                <h2 className="text-lg font-semibold text-richblack-5">
                                    Profile Information
                                </h2>
                                <div className="flex flex-col gap-5 lg:flex-row">
                                    <div className="flex flex-col gap-2 lg:w-[48%]">
                                        <label htmlFor="firstName" className="lable-style">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="firstName"
                                            value={tutorDetails?.teacher_info?.first_name}
                                            placeholder="Enter first name"
                                            className="form-style"
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 lg:w-[48%]">
                                        <label htmlFor="lastName" className="lable-style">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="lastName"
                                            value={tutorDetails?.teacher_info?.last_name}
                                            placeholder="Enter last name"
                                            className="form-style"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 lg:flex-row">
                                    <div className="flex flex-col gap-2 lg:w-[48%]">
                                        <label htmlFor="Mobile" className="lable-style">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="text"
                                            name="mobile"
                                            id="Mobile"
                                            value={tutorDetails?.teacher_info?.mobile}
                                            placeholder="Enter mobile number"
                                            className="form-style"
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 lg:w-[48%]">
                                        <label htmlFor="email" className="lable-style">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={tutorDetails?.teacher_info?.email}
                                            placeholder="Enter email"
                                            className="form-style"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 lg:flex-row">
                                    <div className="flex flex-col gap-2 lg:w-[48%]">
                                        <label htmlFor="price" className="lable-style">
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            name="price"
                                            id="Price"
                                            value={tutorDetails?.teacher_info?.price}
                                            placeholder="Enter Price"
                                            className="form-style"
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 lg:w-[48%]">
                                        <label htmlFor="statusSelect" className="lable-style">
                                            Status
                                        </label>
                                        <select
                                            id="statusSelect"
                                            name="status"
                                            value={tutorDetails?.teacher_info?.status}
                                            onChange={(e) => {
                                                // setStatus(e.target.value);
                                            }}
                                            className="form-style"
                                        >
                                            <option value="">--Select Status--</option>
                                            {statusOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='flex'>
                                <button onClick={(event) => handleApproval('Active',event)} className="mt-4 p-2 bg-blue-500 text-white rounded-md w-1/6">Approve</button>
                                <button onClick={(event) => handleApproval('Inactive',event)} className="mt-4 ms-2  p-2 bg-red-900 text-white rounded-md w-1/6" style={{backgroundColor:"red"}}>Reject</button>
                                <button onClick={(event) => handleApproval('Pending',event)} className="mt-4 ms-2  p-2 bg-red-900 text-white rounded-md w-1/6" style={{backgroundColor:"skyblue"}}>Remarks</button>
                                </div>
                                {/* <button className="mt-4 p-2 bg-blue-500 text-white rounded-md w-1/6">Update</button> */}
                                </div>
                                {/* Teacher Academic Section */}
                                <div className="my-4 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                                    <h2 className="text-lg font-semibold text-richblack-5">
                                        Academic Information
                                    </h2>
                                    {tutorDetails?.teachers_education?.map((education) => (
                                        <div className="flex flex-col gap-5 lg:flex-row" key={education.id}>
                                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                                <label htmlFor={`education-${education.id}`} className="lable-style">
                                                    Education Level
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`education-${education.id}`}
                                                    id={`education-${education.id}`}
                                                    value={education.education_level_name}
                                                    placeholder="Enter education level"
                                                    className="form-style"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                                <label htmlFor={`attended-${education.id}`} className="lable-style">
                                                    Attended
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`attended-${education.id}`}
                                                    id={`attended-${education.id}`}
                                                    value={education.attended}
                                                    placeholder="Enter institution name"
                                                    className="form-style"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <button className="mt-4 p-2 bg-blue-500 text-white rounded-md w-1/6">Update</button>
                                </div>

                                {/* Teacher Employment Section */}
                                <div className="my-4 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                                    <h2 className="text-lg font-semibold text-richblack-5">
                                        Employment Information
                                    </h2>
                                    <div className="flex flex-col gap-5 lg:flex-row">
                                        <div className="flex flex-col gap-2 lg:w-[48%]">
                                            <label htmlFor="commitmentForYear" className="lable-style">
                                                Commitment for Year
                                            </label>
                                            <input
                                                type="text"
                                                name="commitment_for_year"
                                                id="commitmentForYear"
                                                value={tutorDetails?.teacher_employment?.commitment_for_year}
                                                placeholder="Enter commitment for year"
                                                className="form-style"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 lg:w-[48%]">
                                            <label htmlFor="capableWorkingStudents" className="lable-style">
                                                Capable Working Students
                                            </label>
                                            <input
                                                type="number"
                                                name="capable_working_students"
                                                id="capableWorkingStudents"
                                                value={tutorDetails?.teacher_employment?.capable_working_students}
                                                placeholder="Enter number of students"
                                                className="form-style"
                                            />
                                        </div>
                                    </div>
                                    <button className="mt-4 p-2 bg-blue-500 text-white rounded-md w-1/6">Update</button>
                                </div>
                            

                        </form>
                        {/* <div className="overflow-y-scroll h-64 border p-2 bg-gray-100 rounded-md">
                            <p><strong>First Name:</strong> {tutorDetails?.teacher_info?.first_name}</p>
                            <p><strong>Last Name:</strong> {tutorDetails?.teacher_info?.last_name}</p>
                            <p><strong>Status:</strong> {tutorDetails?.teacher_info?.status}</p>
                            <p><strong>Mobile:</strong> {tutorDetails?.teacher_info?.mobile}</p>
                            <p><strong>Email:</strong> {tutorDetails?.teacher_info?.email || 'Not provided'}</p>
                            <p><strong>Price:</strong> ${tutorDetails?.teacher_info?.tutoring_price}</p>
                            <p><strong>Bio:</strong> {tutorDetails?.teacher_bio || 'Not provided'}</p>
                            <p><strong>Academic:</strong> {tutorDetails?.teacher_academic || 'Not provided'}</p>
                            <p><strong>Education:</strong> {tutorDetails?.teachers_education || 'Not provided'}</p>
                            <p><strong>Employment:</strong> {tutorDetails?.teacher_employment || 'Not provided'}</p>
                        </div> */}
                        {/* <div className="mt-4">
              <label htmlFor="remark" className="block mb-2">Remarks:</label>
              <textarea
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="border p-2 w-full"
                rows="3"
                placeholder="Add remarks here..."
              ></textarea>
            </div> */}
                        <div className="mt-4">
                            <button onClick={(e) => handleApproval('approved',e)} className="bg-green-500 text-white px-4 py-2 mr-2">
                                Approve
                            </button>
                            <button onClick={(e) => handleApproval('rejected',e)} className="bg-red-500 text-white px-4 py-2 mr-2">
                                Reject
                            </button>
                            <button onClick={(e) => handleApproval('edit',e)} className="bg-yellow-500 text-white px-4 py-2">
                               Save
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
