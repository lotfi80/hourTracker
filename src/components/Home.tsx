// import Nav from "./Nav"
import { useUser } from './UserContext';



function Home() {
    const { user } = useUser();
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
          {/* <Nav /> */}
          <div className="bg-white border mt-40 border-gray-300 rounded-lg shadow-lg p-8 w-full max-w-2xl mx-4">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
              Welcome, <span className="text-blue-600">{user?.username}</span> to your profile page
            </h1>
            <p className="text-xl text-gray-600 text-center leading-relaxed">
              We're thrilled to have you back. Feel free to explore and manage your dashboard. If you have any questions or need assistance, don't hesitate to reach out.
            </p>
          </div>
        </div>
      );
    
}

export default Home