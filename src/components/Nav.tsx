// import { NavLink } from "react-router-dom";

// function Nav() {
//   return (
//     <div>
//       <NavLink
//         className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 mx-5 my-10 text-blue-700 font-semibold"
//         to="/addtimework"
//       >
//         Add Time work
//       </NavLink>
//       <NavLink
//         className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 mx-5 my-10 text-blue-700 font-semibold"
//         to="/filter"
//       >
//         Filter
//       </NavLink>
//       <NavLink
//         className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 mx-5 my-10 text-blue-700 font-semibold"
//         to="/filter-client-work"
//       >
//         Filter Work per Client
//       </NavLink>
//       <NavLink
//         className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 mx-5 my-10 text-blue-700 font-semibold"
//         to="/addclient"
//       >
//         Add Client 
//       </NavLink>
//       <NavLink className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 mx-5 my-10 text-blue-700 font-semibold" to="/login">
//         Logout
//         </NavLink>
//     </div>
//   );
// }

// export default Nav;

// components/Navigation.js
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-gray-100 py-6">
      <ul className="flex justify-center space-x-6 ">
        <li>
          <Link
            to="/home/:userid"
            className="bg-white border border-gray-300 rounded-lg py-3 px-6 text-blue-800 font-bold text-lg hover:bg-blue-200 hover:text-blue-900 transition duration-300 transform hover:scale-105"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/addclient"
            className="bg-white border border-gray-300 rounded-lg py-3 px-6 text-blue-800 font-bold text-lg hover:bg-blue-200 hover:text-blue-900 transition duration-300 transform hover:scale-105"
          >
            Add Client
          </Link>
        </li>
        <li>
          <Link
            to="/addtimework"
            className="bg-white border border-gray-300 rounded-lg py-3 px-6 text-blue-800 font-bold text-lg hover:bg-blue-200 hover:text-blue-900 transition duration-300 transform hover:scale-105"
          >
            Add Time Work
          </Link>
        </li>
        <li>
          <Link
            to="/filter-client-work"
            className="bg-white border border-gray-300 rounded-lg py-3 px-6 text-blue-800 font-bold text-lg hover:bg-blue-200 hover:text-blue-900 transition duration-300 transform hover:scale-105"
          >
            Filter Client Work
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="bg-white border border-gray-300 rounded-lg py-3 px-6 text-blue-800 font-bold text-lg hover:bg-blue-200 hover:text-blue-900 transition duration-300 transform hover:scale-105"
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
  
  
}

export default Navigation;


