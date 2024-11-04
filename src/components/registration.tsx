import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
    const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handelChange = (e: any) => {
setFormData({...formdata, [e.target.name]: e.target.value})
  
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("https://zeiterfassung-0uiy.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
      
    });
    setFormData({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password : ""
    });
    navigate("/");
  };
  const handleToLogin = () => {
    navigate("/");
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
<h1 className="text-xl text-red-300 pb-20">Please register and create your profile to proceed.</h1>
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 w-full max-w-lg mx-4">
            <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>

           

            <form action="" onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={formdata.username}
                        onChange={handelChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="firstname" className="block text-gray-700 font-medium mb-1">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder="Enter your first name"
                        value={formdata.firstname}
                        onChange={handelChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastname" className="block text-gray-700 font-medium mb-1">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Enter your last name"
                        value={formdata.lastname}
                        onChange={handelChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formdata.email}
                        onChange={handelChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formdata.password}
                        onChange={handelChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
                <button
                        type="button"
                        onClick={handleToLogin}
                        className="w-full bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200 mt-4"
                    >
                        Already have an account? Login
                    </button>
            </form>
        </div>
    </div>
);
}

export default Registration;
