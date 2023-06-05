import axios from '../../../axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function VerifyOtp() {


    const [otp, setOtp ] = useState()
    const mobile = useSelector((state) => {
        return state.mobile
    })

    const navigate = useNavigate()

    const handleOtp = (e) => {
        setOtp(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp === '') {
            SpeechSynthesisErrorEvent(true)
        } else {
            axios.post(`user/verify-otp/`, {
                otp : otp,
                mobile : mobile
            }).then((res) => {
                if (res.data.is_verified) {
                    navigate('/signin')

                }
                else{
                }
            })
        }
    }

  return (
    <div>
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-2xl sm:rounded-lg">
          <div className="py-10">
            <a href="/">
              <h3 className="text-4xl font-bold text-center">Verify OTP</h3>
            </a>
          </div>
          <form className="px-5 pb-10" onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="otp"
                className="block text-lg font-medium text-gray-700 undefined"
              >
                OTP
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="number"
                  name="otp"
                  onChange={handleOtp}
                    value={otp}
                  className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end mt-4">
              
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-myBlue border border-transparent rounded-md active:bg-gray-900 false"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default VerifyOtp