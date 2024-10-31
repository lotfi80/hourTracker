import { useState   } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from './UserContext';



function Login() {
    const navigate = useNavigate();
    const [formdata, setFormData] = useState({
      username: "",
      password: "",
    });
    const [formSuccess, setFormSuccess] = useState(false);
    const [formError, setFormError] = useState("");
    const { setUser } = useUser();
        const handelchange = (e:any) => {
      setFormData({ ...formdata, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:3007/auth/login", {
          method: "POST",credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
  
          if (data.token) {
            // document.cookie = `jwt=${data.token}; path=/; secure; samesite=lax`;
            
            const userId = data.user._id;
           
            const user = setUser(data.user);
                 console.log(user);
            setFormSuccess(true);
            navigate(`/home/${userId}`);
          } else {
            setFormError("Login failed: No token received");
          }
        } else {
          const errorData = await response.json();
          setFormError(errorData.message || "Login failed");
        }
      } catch (err) {
        setFormError("An error occurred during login");
        console.error(err);
      } finally {
        setFormData({
          username: "",
          password: "",
        });
      }
    };
    const handleToRegister = () => {
        navigate("/register");
    };
    return (
      <div>
  
    <h1 className="text-3xl font-bold text-center my-8">Welcome to the Work Hours Freelancer Tracker Page</h1>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 w-full max-w-md mx-6">
            <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

            {formSuccess && <p className="text-green-600 text-center mb-4">Login successful!</p>}
            {formError && <p className="text-red-600 text-center mb-4">Login failed. Please try again.</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formdata.username}
                        placeholder="Enter your username"
                        onChange={handelchange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formdata.password}
                        placeholder="Enter your password"
                        onChange={handelchange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
                <button
                    type="button"
                    onClick={handleToRegister}
                    className="w-full mt-4 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
                >
                    Register
                </button>
            </form>
        </div>
    </div>
</div>

        
    );
}

export default Login;
