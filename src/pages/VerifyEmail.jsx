import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OtpInput from 'react-otp-input';
import { useNavigate, Link } from 'react-router-dom';
import { signUp, sendOtp } from '../services/operation/authAPI';

const VerifyEmail = () => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData, loading} = useSelector( (state) => state.auth);

    useEffect( () => {
        if(!signupData) {
            navigate('/signup');
        }
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType, 
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        
        dispatch(signUp(accountType, 
            firstName,
            lastName,
            email,
            password,
            confirmPassword, otp, navigate));
    }

  return (
    <div className='text-white'>
      {
        loading ? (
            <div>Loading...</div>
        ) : (
            <div>
                <h1>Verify Email</h1>
                <p>A verification code has been sent to you. Enter the code below.</p>
                <form onSubmit={handleOnSubmit}>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span className='mx-2'>-</span>}
                    renderInput={(props) => (
                        <input
                        {...props}
                        style={{
                            width: '40px',        // adjust width as needed
                            height: '40px',       // adjust height as needed
                            fontSize: '20px',     // make the text visible and readable
                            textAlign: 'center',  // center the text in the input
                            border: '1px solid #ccc',
                            color: '#fff',        // ensure text color is visible
                        }}
                        />
                    )}
                    />

                <button type='submit'>
                    Verify Email
                </button>
                </form>

                <div>
                    <div>
                        <Link to='/login'>
                            Back to Login
                        </Link>
                    </div>

                    <button onClick={() => dispatch(sendOtp(signupData.email))}>    
                        Resent it
                    </button>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
