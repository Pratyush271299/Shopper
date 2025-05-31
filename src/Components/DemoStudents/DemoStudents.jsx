import React, { useState } from 'react'

export const DemoStudents = () => {

    const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

    const [students, setStudents] = useState(null);
    const [student, setStudent] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState(null);

    const Login = async() => {
        setLoading(true);
        setErrors(null);
        setCurrentUser(null);
        const payload = {
            'username' : 'Pratyush',
            'password' : 'Pratyush1234',
            'policy' : "Local"
        }

        try {
            const response = await fetch (BASE_API_URL + 'Login', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                },
                body : JSON.stringify(payload)
            });
    
            if (!response.ok) {
                throw new Error("This error is from Local");
            }

            const data = await response.json();
            localStorage.setItem("jwt", data.token);
            console.log(data.username);
            setCurrentUser(data.username);
        } catch (error) {
            console.log(error.message);
            setErrors(error.message);
        } finally {
            setLoading(false);
        }
    }

    const FetchGoogle = async() => {
        setLoading(true);
        setErrors(null);
        setStudent(null);
        setStudents(null);

        const token = localStorage.getItem("jwt");

        try {
            const response = await fetch(BASE_API_URL + 'Google', {
                method: 'GET',
                headers: {
                    'Accept' : 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!response.ok) throw new Error("This error is from Google");

            const data = await response.json();
            console.log(data.data);
        } catch (error) {
            setErrors(error.message);
        } finally {
            setLoading(false);
        }
    }

    const FetchStudents = async() => {
        setLoading(true);
        setErrors(null);
        setStudents(null);
        setStudent(null);

        const token = localStorage.getItem("jwt");
        
        try {
            const response = await fetch(`${BASE_API_URL}Demo/All`, {
                method : 'GET',
                headers : {
                    'Accept' : 'application/json',
                    'Authorization' : 'Bearer ' + token
                }
            });

            console.log(response);
    
            if (!response.ok) throw new Error('Failed to fetch students ❌');
    
            const data = await response.json();
            setStudents(data.data);
        } catch (error) {
            setErrors(error.message);
        } finally {
            setLoading(false);
        }
    }

    const FetchStudentFromId = async() => {
        setLoading(true);
        setErrors(null);
        setStudents(null);
        setStudent(null);

        const token = localStorage.getItem("jwt");
        
        try {
            const response = await fetch(`${BASE_API_URL}Demo/${id}`, {
                method : 'GET',
                headers : {
                    'Accept' : 'application/json',
                    'Authorization' : 'Bearer ' + token
                }
            });
    
            if (!response.ok) throw new Error(`Failed to fetch student with ID: ${id} ❌`);
    
            const data = await response.json();
            setStudent(data.data.name);
        } catch (error) {
            setErrors(error.message);
        } finally {
            setLoading(false);
        }
    }

    const AddStudent = async(e) => {

        e.preventDefault();
        setLoading(true);
        setErrors(null);
        setStudents(null);
        setStudent(null);

        const payload = {
            "name": name,
            "email": email,
            "address": address,
            "dob": dob
        }

        const token = localStorage.getItem("jwt");

        try {
            const response = await fetch(`${BASE_API_URL}Demo/create-students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(payload)
            });
    
            if (!response.ok) throw new Error("This error is from AddStudent ❌");
    
            const data = await response.json();
            setStudent(data.data.name);
            setName('');
            setEmail('');
            setAddress('');
            setDob('');

        } catch (error) {
            setErrors(error.message);
        } finally {
            setLoading(false);
        }
    }

    if(loading) return (<h1 style={{color : 'green'}}>Loading.....</h1>)

  return (
    <div>
        <h2>{currentUser ? currentUser : 'No user Found'}</h2>
        <button onClick={Login}>Login</button><br />
        <button onClick={FetchStudents}>Get Students</button> <br />
        <input value={id} onChange={e => setId(e.target.value)} placeholder='Enter Student ID' autoFocus></input>
        <button onClick={FetchStudentFromId}>Fetch Student</button> <br />
        <button onClick={FetchGoogle}>Fetch Google</button> <br />
        <form onSubmit={AddStudent}>
            <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} /> <br />
            <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} /> <br />
            <input type="text" placeholder='Address' value={address} onChange={e => setAddress(e.target.value)} /> <br />
            <input type="text" placeholder='1999-12-27T00:00:00' value={dob} onChange={e => setDob(e.target.value)} /> <br />
            <button type='submit'>CreateStudent</button>
        </form>
        
        <h3>{errors ? errors : 'All Good! ✅'}</h3>
        <h3>{student && `We have fetched ${student}.`}</h3>
        <ul>
            {students && students.map((student) => (
                <li key={student.id} style={{color: 'blue'}}>
                    {student.name} --- {student.email}
                </li>
            ))}
        </ul>
    </div>
  )
}
