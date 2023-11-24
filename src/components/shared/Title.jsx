import PropTypes from "prop-types";

const Title = ({ section, title, subTitle, className }) => {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-sky-500/90 font-bold text-sm">{section}</p>
      <h2 className="text-3xl font-bold py-3 opacity-95">{title}</h2>
      <h4 className="font-medium opacity-60 md:w-11/12 lg:w-4/6 mx-auto text-justify sm:text-center">
        {subTitle}
      </h4>
    </div>
  );
};

Title.propTypes = {
  section: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  className: PropTypes.string,
};

export default Title;
