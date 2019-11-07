import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveContacts } from "../../actions/contacts.action";

const Home = props => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      const response = await fetch("/api/contacts");
      const data = await response.json();
      props.saveContacts(data)
      setData(data);
    }
    fetchContacts();
  }, []);

  const searchContact = e => {
    setSearch(e.target.value.toLowerCase());
  };
  return (
    <div className="container-home">
      <NavLink
        className="link-add"
        to="/add-new-contact"
      >{`> Add new phone number`}</NavLink>
      <div className="home-input-search">
        <input
          type="text"
          className="search"
          placeholder="Search"
          onChange={e => searchContact(e)}
        />
      </div>
      <table className="table">
        <thead className="table-head">
          <tr className="table-tr">
            <th>Name</th>
            <th>Phone number</th>
            <td>Update</td>
          </tr>
        </thead>
        <tbody className="table-body">
          {search === "" ? (
            <tr></tr>
          ) : (
            data
              .filter(select => {
                let name = `${select.last_name} ${select.firstname}`;
                return (
                  select.phone.includes(search) ||
                  (name.toLowerCase().includes(search) ||
                    search === undefined ||
                    search === "all")
                );
              })
              .map((person, index) => (
                <tr key={person.contact_id}>
                  <td>{`${person.last_name} ${person.firstname}`}</td>
                  <td>{person.phone}</td>
                  <td>
                    <NavLink
                      className="link"
                      to={`/update-contact/${person.contact_id}`}
                    >
                      Click
                    </NavLink>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ saveContacts }, dispatch);
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Home)
);
