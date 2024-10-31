

import { useState } from 'react';
import { useUser } from './UserContext';

function AddClient() {
  const { user } = useUser();

  const [formdata, setFormData] = useState({
    name: ""
  });

  const [clientname, setClientname] = useState("");

  const handelChange = (e: any) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Submitting form with User ID:', user?._id);
    console.log('Form Data:', formdata);

    try {
      const response = await fetch(`http://localhost:3007/user/${user?._id}/addclient`, {
        method: "POST",credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setClientname(data.name);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 p-4">
      <div className="bg-white border mt-20 border-gray-300 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Add Client</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-blue-800 mb-2">
              Client Name
            </label>
            <input
              type="text"
              placeholder="Enter client name"
              name="name"
              value={formdata.name}
              onChange={handelChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Add Client
          </button>
        </form>
        {clientname && (
          <p className="mt-6 text-green-600 text-center text-lg">Client added: {clientname}</p>
        )}
      </div>
    </div>
  );
  
}

export default AddClient;
