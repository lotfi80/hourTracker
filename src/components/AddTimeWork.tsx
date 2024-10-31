import { useState, useEffect } from 'react';
import {useUser} from './UserContext';
 

function AddTimeWork() {
    const { user } = useUser();
 
    const [formData, setFormData] = useState({
        
        clientID: "",
        workdate: "",
        starttime: "",
        endtime: "",
        startbreak: "",
        endbreak: "",
        notes: "",
    });
    const [clients, setClients] = useState([]);
    const [message, setMessage] = useState("");


    const handleChange = (e:any) => {
        console.log("hello")
        const { name, value } = e.target;
        console.log(name, value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const userId = user?._id;
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`http://localhost:3007/user/${userId}/clients`, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setClients(data);

                }
                else {
                    const errorData = await response.json();
                    console.error("Error:", errorData.message);
                }
            }
            catch (err) {
                console.error("Error:", err);


        }
    }
    fetchClients();

    } , []);

    
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try{
            console.log(formData)
            const response = await fetch(`http://localhost:3007/timeEntry`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( { 
                    userId,
                    client : formData.clientID,
                    start_time: formData.starttime,
                    end_time: formData.endtime,
                    date: formData.workdate,
                    start_break: formData.startbreak,
                    end_break: formData.endbreak,
                    notes: formData.notes,  
                    }),
            });
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    clientID: formData.clientID,
                    workdate: "",
                    starttime: "",
                    endtime: "",
                    startbreak: "",
                    endbreak: "",
                    notes: "",
                });
                console.log(data);
                setMessage(data.message || "Time entry added successfully.");
            }
            else {
                const errorData = await response.json();
                console.error("Error:", errorData.message);
                setMessage("Error adding time entry: " + errorData.message);

            }
        }
        catch (err:any) {
            console.error("Error:", err);
            setMessage("Error adding time entry: " + err.message);

        }
        
        
    };

    return (
        <div className="p-6 mt-10 max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Add Time Work</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="clientname"
                        className="block text-blue-800 font-medium mb-2"
                    >
                        Client Name
                    </label>
                    <select
                        id="clientname"
                        name="clientID"
                        value={formData.clientID}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {(clients || []).map((client: any) => (
                            <option key={client._id} value={client._id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="workdate"
                        className="block text-blue-800 font-medium mb-2"
                    >
                        Work Date
                    </label>
                    <input
                        type="date"
                        id="workdate"
                        name="workdate"
                        value={formData.workdate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label
                        htmlFor="starttime"
                        className="block text-blue-800 font-medium mb-2"
                    >
                        Start Time
                    </label>
                    <input
                        type="time"
                        id="starttime"
                        name="starttime"
                        value={formData.starttime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label
                        htmlFor="endtime"
                        className="block text-blue-800 font-medium mb-2"
                    >
                        End Time
                    </label>
                    <input
                        type="time"
                        id="endtime"
                        name="endtime"
                        value={formData.endtime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                    Add Time Work
                </button>
            </form>
            {message && (
                <p className="mt-4 text-green-600 text-center">{message}</p>
            )}
        </div>
    );
    
}

export default AddTimeWork;
