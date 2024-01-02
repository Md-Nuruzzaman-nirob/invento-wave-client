import PropTypes from "prop-types";

const Container = ({ children, className }) => {
  return (
    <div className={`max-w-[1250px] mx-5 md:mx-10 xl:mx-auto ${className}`}>
      {children}
    </div>
  );
};
Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
export default Container;
