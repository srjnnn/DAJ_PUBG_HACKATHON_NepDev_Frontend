import { Link } from "react-router-dom";
import MenuBar from "../components/svgs/Menu-bar";
const Header = ({ id }) => {
  return (
    <div className="flex items-center justify-between">
      <Link
        to={
          id === "user"
            ? "/explore"
            : "/vol-explore"
        }
        className="text-center flex flex-col items-center"
      >
        <img src="/logo.png" alt="mero-sathi-logo" className="h-5 w-auto" />
      </Link>
      <div className="group inline-block">
        <MenuBar className="text-black w-12 h-12" />
      </div>
    </div>
  );
};
export default Header;
