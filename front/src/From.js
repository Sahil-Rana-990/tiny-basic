import React, { useEffect, useState } from "react";
import { useQuery,useMutation, gql } from "@apollo/client";
import {NavLink} from 'react-router-dom'
const GET_QUREY = gql`
  mutation SETQUREY(
    $firstname: String
    $lastname: String
    $email: String
    $password: String
  ) {
    SinupUserDummy(
      firstName: $firstname
      lastName: $lastname
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

export default function From() {
  let [userdata, setuserdata] = useState({
    firstname: "user1",
    lastname: "user1",
    email: "user1user@gmail.com",
    password: "user1",
  });

  // load mutation
  const[ signupuser,{ loading, error, data }] =  useMutation(GET_QUREY);
  
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  
  
  const changeData = (e) => {
      const { name, value } = e.target;
      setuserdata({ ...userdata, [name]: value });
  };
  return (
    <div>
      <h1>Form using graphql</h1>
      <div>
        <div>
          firstName:-
          <input type="text" name="firstname" onChange={changeData} />
          <br />
          lastName:-
          <input type="text" name="lastname" onChange={changeData} />
          <br />
          email:-
          <input type="email" name="email" onChange={changeData} />
          <br />
          password:-
          <input type="password" name="password" onChange={changeData} />
          <br />
        </div>
        <div>
          <button onClick={() => signupuser({
            variables:userdata
          })}>Show Data</button>
        </div>
        <div>
            <button> <NavLink to="/login">Login In</NavLink></button>
        </div>
      </div>
    </div>
  );
}
