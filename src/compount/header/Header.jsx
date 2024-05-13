import {Logo,Container, LogoutBtn} from "../index"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authSlice from "../../store/authSlice";
function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  console.log(authStatus);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authSlice,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authSlice,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authSlice,
    },

    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authSlice,
    },
  ];

  return (
    <header>
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
            <ul className="flex ml-auto">
              {navItems.map((item) =>
                item ? (
                  <li key={item.name}>
                    <button onClick={() => navigate}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full *: "
                    >{item.name}</button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <LogoutBtn/>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
