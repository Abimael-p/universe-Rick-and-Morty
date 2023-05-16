import "./Location.css";

const Location = ({ name, type, dimension, residentCount }) => {
  return (
    <div className="details__location">
      <p className="p">
        <b className="b">name: </b> {name}
      </p>
      <p className="p">
        <b className="b">type: </b> {type}
      </p>
      <p className="p">
        <b className="b">dimension: </b> {dimension}
      </p>
      <p className="p">
        <b className="b">resident: </b> {residentCount}
      </p>
    </div>
  );
};

export default Location;
