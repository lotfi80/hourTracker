import { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import moment from "moment";
interface test{
    _id?:string;
    name?:string;
    
}
function FilterClientWork() {
    
  const { user } = useUser();

  const [formData, setFormData] = useState({
    clientId: "",
    name: "",
    start: "",
    end: "",
  });
  const [clients, setClients] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedClientName, setSelectedClientName] = useState< any>("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "clientId") {
      const selectedClient: test = clients.find((client:any) => client._id === value)||{};
      const name = selectedClient ? selectedClient.name : "";
      setSelectedClientName(selectedClient ? name  : "");
    }
  };

  const userId = user?._id;

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          `https://zeiterfassung-0uiy.onrender.com/user/${userId}/clients`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData.message);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchClients();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { clientId, start, end } = formData;
      const response = await fetch(
        `https://zeiterfassung-0uiy.onrender.com/timeEntry/${clientId}?start=${start}&end=${end}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          setTimeEntries(data);

          setMessage(`Found ${data.length} time entries.`);
        } else {
          console.error("Error:", data.message);
          setMessage("Error fetching time entries: " + data.message);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error, "Response Text:", text);
        setMessage("Error parsing response");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error fetching time entries: " + message);
    }
  };
  console.log(timeEntries);
  const calculateHoursForBlog = () => {
    let totalHours = 0;
    let totalMinutes = 0;

    timeEntries.forEach((entry: any) => {
      const startTime = entry.start_time.split(":");
      const endTime = entry.end_time.split(":");

      const beginTime = new Date(0, 0, 0, startTime[0], startTime[1], 0);
      const end = new Date(0, 0, 0, endTime[0], endTime[1], 0);

      const diff = end.getTime() - beginTime.getTime();
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / 1000 / 60);

      totalHours += hours;
      totalMinutes += minutes;
    });

    // minutes to hours and minutes 
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    return { hours: totalHours, minutes: totalMinutes };
  };

  const totalWorkTime = calculateHoursForBlog();

  return (
    <div className="p-6 mt-10 max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Filter Client Work</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="clientname" className="block text-blue-800 font-medium mb-2">
            Client
          </label>
          <select
            id="clientname"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a Client
            </option>
            {clients.map((client:any) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="start" className="block text-blue-800 font-medium mb-2">
            Start Date
          </label>
          <input
            type="date"
            id="start"
            name="start"
            value={formData.start}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="end" className="block text-blue-800 font-medium mb-2">
            End Date
          </label>
          <input
            type="date"
            id="end"
            name="end"
            value={formData.end}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Filter
        </button>
      </form>
      {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          Time Entries for Client: {selectedClientName}
        </h2>
        <ul className=" pl-5  space-y-5 list-none">
          {timeEntries.map((entry:any) => (
            <li key={entry._id} className="text-gray-700 py-3 border border-spacing-40 border-blue-500">
            <span className="font-medium">Date:</span> {moment(entry.date).format("YYYY-MM-DD")}, 
              <span className="font-medium text-green-500"> Start:</span> {entry.start_time},
              <span className="font-medium text-red-500"> End:</span> {entry.end_time}

            </li>
          ))}
        </ul>
      </div>
      <div className=" mt-8 ml-4 border border-spacing-36 border-black py-3 ">
      Total Work Time: <span className="font-semibold">{totalWorkTime.hours} hours</span> and <span className="font-semibold">{totalWorkTime.minutes} minutes</span>
      </div>
    </div>
  );
  
}

export default FilterClientWork;
