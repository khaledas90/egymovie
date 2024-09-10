import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { LogOutUser, UpdateUser } from "../Redux/MovieSlice";

export default function Profile() {
  const user = useSelector((state) => state.movie.User[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [DataUser, setDataUser] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
  });

  useEffect(() => {
    if (user) {
      setDataUser(user);
    }
  }, [user]);

  const handleUpdate = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
    dispatch(UpdateUser(DataUser));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser({ ...DataUser, [name]: value });
  };

  const handleLogOut = () => {
    navigate("/");
    dispatch(LogOutUser());
  };

  if (!user) {
    return null;
  }

  return (
    <Fragment>
      <div className="Profile">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Card style={{ width: "60rem", margin: "25px auto " }}>
                <Card.Header>
                  <Card.Title className="text-center">Profile</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <div className="forms">
                      <div className="Name">
                        <Form.Label htmlFor="inputPassword5">Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="Name"
                          id="inputPassword5"
                          value={DataUser.Name}
                          aria-describedby="passwordHelpBlock"
                          onChange={handleChange}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="Email">
                        <Form.Label htmlFor="inputPassword5">Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="Email"
                          id="inputPassword5"
                          aria-describedby="passwordHelpBlock"
                          onChange={handleChange}
                          value={DataUser.Email}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="Phone">
                        <Form.Label htmlFor="inputPassword5">Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          name="Phone"
                          id="inputPassword5"
                          aria-describedby="passwordHelpBlock"
                          onChange={handleChange}
                          value={DataUser.Phone}
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="password">
                        <Form.Label htmlFor="inputPassword5">
                          password
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="Password"
                          id="inputPassword5"
                          aria-describedby="passwordHelpBlock"
                          onChange={handleChange}
                          value={DataUser.Password}
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div className="btns d-flex justify-content-around">
                    <Button
                      variant="success"
                      disabled={!isEditMode}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="primary"
                      disabled={isEditMode}
                      onClick={handleUpdate}
                    >
                      Update
                    </Button>
                    <Button variant="danger" onClick={handleLogOut}>
                      LogOut
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
