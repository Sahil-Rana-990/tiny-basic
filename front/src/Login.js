import React ,{useState} from 'react'
import {useMutation,gql} from "@apollo/client";
import axios from 'axios'
const GET_QUREY=gql`
mutation SETQUREY($email:String,$password:String){
    SigninUser(email:$email,password:$password){
        token
    } 
}
`
export default function Login() {
    const [setUserLogin,{loding,error,data}]=useMutation(GET_QUREY);
    const [logindata, setlogindata] = useState({
        email:"",
        password:"",
        image:"",
    });

    const changeData=(e)=>{
        const {name,value} = e.target;
        setlogindata({
            ...logindata,
            [name]:value
        })
    }

    const CheckUserLogin=async ()=>{
        // const res=await setUserLogin({
        //     variables:logindata
        // })
        // console.log(res.data.SigninUser.token);

        const result=await fetch("http://localhost:4000/api/getdata",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(logindata)
        })
        

    }
  return (
    <div>
          email:-
          <input type="email" name="email" onChange={changeData} />
          <br />
          password:-
          <input type="password" name="password" onChange={changeData} /><br/>
        Image:-
          <input type="file" name="image" onChange={changeData}/>
        <div>
            <button onClick={CheckUserLogin}>Login in</button>
        </div>
    </div>
  )
}
