import { useNavigate } from "react-router-dom";

const Button = ({ content, link }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/${link}`)}
      className="bg-blue-600 text-white rounded-lg px-6 py-2 font-semibold hover:bg-blue-700"
    >
      {content}
    </button>
  );
};

export default Button;
