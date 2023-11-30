import PropTypes from "prop-types";

const Button = ({ onClick, disabled, children, className }) => {
  return (
    <button
      className={`btn btn-sm font-Fira font-medium rounded-md whitespace-nowrap bg-pink-600 hover:bg-pink-700 text-white border-none ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
