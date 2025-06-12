import {useForm} from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Registert() {
  const {register,handleSubmit} = useForm();
  const navigate = useNavigate();
  const [submittedName, setSubmittedName] = useState('');

  async function handleRegister(e) {
    setSubmittedName(e.tutorname);
    
    axios.post('http://localhost:7878/tutor-api/tutor', e)
      .then((response) => {
        console.log(response.data);
        alert('Registration successful');
        navigate("/logint");
      })
      .catch((error) => {
        console.error('There was an error registering!', error);
        alert('Registration failed');
      });
  }

  return (
    <div>
        <form className="container w-50 mt-5"onSubmit={handleSubmit(handleRegister)}>
          <div>
            <label>Tutor Name:</label>
            <input type="text" {...register('tutorname')} className="form-control mb-3 mt-2" />
          </div>
          <div>
            <label>Class:</label>
            <input type="text" {...register('class')} className="form-control mb-3 mt-2" />
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="text" {...register('phno')} className="form-control mb-3 mt-2" />
          </div>
          <div>
            <label>Academy Name:</label>
            <input type="text" {...register('academyname')} className="form-control mb-3 mt-2" />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" {...register('address')} className="form-control mb-3 mt-2" />
          </div>
          <div>
            <label>Mode:</label>
                <select {...register('mode')} className="form-control mb-3 mt-2">
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="both">Both</option>
                </select>
          </div>
          <div>
            <label>Password:</label>
            <input type="text" {...register('password')} className="form-control mb-3 mt-2" />
          </div>
          <button className="btn btn-primary">Register</button>
            <p className='mt-5'>If already registered, <Link to="../logint">click here to login</Link></p>
        </form>
    </div>
  )
}

export default Registert
