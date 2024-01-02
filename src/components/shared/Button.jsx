import PropTypes from "prop-types";

const Button = ({ children, className, ...restProps }) => {
  return (
    <button
      className={`btn btn-sm font-Fira font-medium rounded-md whitespace-nowrap bg-pink-600 hover:bg-pink-700 text-white border-none ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  restProps: PropTypes.array,
};

export default Button;
