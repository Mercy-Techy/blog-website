const Button = ({ children, onClickFunction }) => (
  <button
    onClick={onClickFunction}
    className="mx-2 px-4 py-3 bg-black text-white rounded hover:bg-dark"
  >
    {children}
  </button>
);

export default Button;
