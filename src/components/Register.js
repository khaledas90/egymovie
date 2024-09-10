import "semantic-ui-css/semantic.min.css";
import React, { useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { AddUser } from "../Redux/MovieSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const LoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.movie.User);

  const handleRegister = (e) => {
    e.preventDefault();
    if (name && email && phone && password) {
      dispatch(
        AddUser({
          Name: name,
          Email: email,
          Phone: phone,
          Password: password,
        })
      );
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      console.log(state);
      Swal.fire({
        title: "Successfully registered",
        text: "Do you want to continue",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Profile");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Please enter your data correctly",
        text: "Something went wrong!",
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <Grid textAlign="center" style={{ height: "90vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 500 }}>
        <Header as="h2" color="teal" textAlign="center">
          Sign Up
        </Header>
        <Form size="large" onSubmit={handleRegister}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              icon="phone"
              iconPosition="left"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button color="teal" fluid size="large">
              Register
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
