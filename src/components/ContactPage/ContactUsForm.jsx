import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import countryCode from '../../data/countryCode.json'

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
      console.log("Logging Contact us Data----", data);
      try {
        setLoading(true);
        // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data); 
        const response = {status: "ok"}
        console.log("Logging contact us response--", response)  ;
        setLoading(false) 
      } catch (error) {
        console.log("error in contact us form---", error.message);
        setLoading(false)   
      }
    }

    useEffect(() => {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }, [reset, isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

      <div className='flex flex-col gap-14'>
        <div className='flex gap-5'>
          {/* firstname */}
          <div className='flex flex-col'>
            <label htmlFor='firstname'>First Name</label>
            <input type="text" 
              name='firstname'
              id='firstname'
              placeholder='Enter first name'
              {...register("firstname", {required:true})}
            />
            {
              errors.firstname && (
                <span>
                  Please Enter Your Name
                </span>
              )
            }
          </div>

          {/* lastname */}
          <div className='flex flex-col'>
            <label htmlFor='firstname'>Last Name</label>
            <input type="text" 
              name='lastname'
              id='lastname'
              placeholder='Enter last name'
              {...register("lastname", {required:true})}
            />
            {
              errors.lastname && (
                <span>
                  Please Enter Your Name
                </span>
              )
            }
          </div>  
        </div>

        {/* email */}
        <div className='flex flex-col'>
          <label htmlFor="email">Email Address</label>
          <input type="email"
            name='email'  
            id='email'
            placeholder='Enter your email'
            {...register("email", {required:true})}
          />
          {
            errors.email && (
              <span>
                Please enter your email address
              </span>
            )
          }
        </div>

        {/* phoneNo */}
        <div className='flex flex-col gap-2 w-100 '>
          <label htmlFor="phoneNumber">Phone Number</label>
          <div className='flex flex-row gap-5'>
            {/* dropdown   */}
            <div className='flex'>
              <select name="dropdown"   
                id="dropdown"
                {...register("countrycode", {required: true})}>
                {
                  countryCode.map((element, index) => (
                    <option value={element.code} key={index}>
                      {element.code} - {element.country}
                    </option>
                  ))
                }
              </select>
            </div>

            <div>
              <input type="number"  
                name='phoneNumber'
                id='phoneNumber'
                placeholder='Enter Your Phone Number'
                {...register("phoneNo", {required: {value: true, message: "Please enter Phone Number"}, 
                maxLength: {value: 10, message: "Invalid phone number"},
                minLength: {value: 8, message: "Invalid Phone Number"}})} />
            </div>
          </div>

        </div>


        {/* message */}
        <div className='flex flex-col'>
          <label htmlFor="message">Message</label>
          <textarea name="message"    
            id="message"
            cols={30}
            rows={7}
            placeholder='Enter your message here'
            {...register("message", {required:true})}
          />
          {
            errors.message && (
              <span>Please enter your message</span>
            )
          }
        </div>

        <button type='submit' 
        className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black'>
            Send Message
        </button>
      </div>  

      
    </form>
  )
}

export default ContactUsForm
