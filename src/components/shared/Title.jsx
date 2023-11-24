import PropTypes from "prop-types";

const Title = ({ section, title, subTitle }) => {
  return (
    <div className="text-center">
      <p className="text-sky-400/90 font-bold text-sm">{section}</p>
      <h2 className="text-3xl font-bold my-3 opacity-95">{title}</h2>
      <h4 className="font-medium opacity-60 md:w-11/12 lg:w-4/6 mx-auto text-justify sm:text-center">
        {subTitle}
      </h4>
    </div>
  );
};

Title.propTypes = {
  section: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default Title;
