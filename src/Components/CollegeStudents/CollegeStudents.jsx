import React, { useState, useEffect } from 'react';

function CollegeStudents() {
  const [students, setStudents] = useState([]); // State to store students
  const [loading, setLoading] = useState(false); // Loading state
  const [errors, setErrors] = useState(null); // Error state
  const [status, setStatus] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [id, setId] = useState(null);
  const [student, setStudent] = useState(null);

  const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

  const GetStudentsAsync = async() =>{
    setLoading(true);
    setErrors(null);
    const token = localStorage.getItem("jwt");
    console.log(token ? token : "no token found");

    try {
      console.log(BASE_API_URL);
      const response = await fetch(`${BASE_API_URL}`, {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = (await response.json()).data;
      console.log(data);
      setStudents(data); // Set fetched data to state
    } catch (error) {
      console.log(error);
      setErrors("backend me problem hai"); // Handle error
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  }

  const GetStudentFromID = async() => {
    setLoading(true);
    setErrors(null);
    setStudent(null);
    const token = localStorage.getItem("jwt");
    console.log(token ? token : "no token found");

    try {
      const response = await fetch(`${BASE_API_URL}/${id}`, {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + token
        }
      });

      

      if (!response.ok) {
        console.log('printing response');
        const notFound = (await response.text());
        throw new Error(notFound);
      } else {
        const data = (await response.json()).data;
        console.log(data);
        setStudent(data);
      } 
    } catch (error) {
        console.log(error.message);
        setErrors(error.message);
    } finally {
        setLoading(false);
    }

  }


  const UpdateStudentAsync = async() => {
    setLoading(true);
    try{
      const response = await fetch(`${BASE_API_URL}/update-student`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: 5,
          name: "Vikas Bihari Babu",
          email: "vikas@kumarjha.com",
          address: "Dharbhanga",
          dob: "17-01-1999"
        })
      });

      if (response.ok) {
        const result = await response.json();
        setStatus("Update successful");
      } else {
        setStatus("Update failed");
      }
    } catch (error) {
        setStatus("An Error occured");
        console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const LoginFromGoogle = async() => {
    setLoading(true);
    setErrors(null);

    const token = localStorage.getItem("jwt");

    try{
      const response = await fetch("https://localhost:7104/api/Google", {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data);

    } catch(error) {
        console.log(error);
        setErrors("this error is from GoogleLogin"); 
    } finally{
      setLoading(false);
    }
  }

  const GetJWT = async() => {
    setLoading(true);
    let payload = {
      username : "Pratyush",
      password : "Pratyush1234",
      policy: "Local"
    };

    try{
      const response = await fetch("https://localhost:7104/api/Login", {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok){
        const result = await response.json();
        console.log(result);
        localStorage.setItem("jwt", result.token);
        setCurrentUser(result.username);
        setStatus("Login Successful");
      }
      else {
        setStatus("Login Failed because response was not 200");
      }
    } catch(error) {
        setStatus("Login Failed");
        console.error(error);
    } finally {
      setLoading(false); 
    }
  }

  // Handling loading, error, and data display
  if (loading) return <p style={{color: 'green'}}>Loading students...</p>;

  return (
    <div>
      <button onClick={GetStudentsAsync}>GetAllStudents</button>
      <button onClick={UpdateStudentAsync}>Update Student</button> {/* Added button to trigger update */}
      <button onClick={GetJWT}>Login</button>
      <button onClick={LoginFromGoogle}>GoogleLogin</button>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder='Enter Student ID'/>
      <button onClick={GetStudentFromID}>Fetch Student</button>
      {student && (
        <div>
          <p>{student.id}</p>
          <p>{student.name}</p>
          <p>{student.email}</p>
          <p>{student.address}</p>
        </div>
      )}
      {status && <p>{status}</p>} {/* Display the status message */}
      <p>{errors ? errors : "filhat to sab theek hai"}</p>
      <h1>College Students</h1>
      <p>{currentUser? currentUser : "No user found"}</p>
      <ul>
        {students.map((student) => (
          <li key={student.id} style={{color: 'purple'}}>
            {student.name} {student.dob}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollegeStudents;