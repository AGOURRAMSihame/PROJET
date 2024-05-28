import React, { useState } from 'react';
import { Alert } from 'flowbite-react';
import ContactImage from '../assets/img/contact.png';
const Contact = () => {
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [message, setMsg] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMsg({ ...message, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!message.name || !message.email || !message.message) {
        setMessageError("please fill all fields");
        setMessageSuccess(null);
      }
      else {

        const res = await fetch('http://localhost:3000/message', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(message)
        });

        if (res.ok) {
          setMessageSuccess("Message sent successfully");
          setMessageError(null);
          setMsg({
            name: "",
            email: "",
            message: ""
          });
        } else {
          setMessageError(res.err);
          setMessageSuccess(null);
        }
      }
    } catch (err) {
      console.log("Error during sending:", err);
      setMessageError(err);
      setMessageSuccess(null);
    }
  };

  return (
    <section id="contact" className="py-5">
      <div className="container mx-auto">
        <div className="text-center mb-5">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <h1 className="text-3xl font-bold mb-4">Have Some <span className="text-blue-500">Questions?</span></h1>
          <hr className="w-20 mx-auto border-t-2 border-blue-500" />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex justify-center items-center lg:w-1/2">
            <img src={ContactImage} alt="contact" className="w-75 lg:w-full" />
          </div>
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">Your Name</label>
                <input type="text" id="name" name="name" value={message.name} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">Your Email</label>
                <input type="email" id="email" name="email" value={message.email} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 font-medium">Your Message</label>
                <textarea id="message" name="message" rows="5" value={message.message} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"></textarea>
              </div>
              <button type="submit" className="block w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300">
                Send Message <i className="fa fa-paper-plane ms-2"></i>
              </button>
            </form>
            {messageSuccess && (
              <Alert color="success" className='mt-2'>{messageSuccess}</Alert>
            )}
            {messageError && (
              <Alert color="failure" className='mt-2'>{messageError}</Alert>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
