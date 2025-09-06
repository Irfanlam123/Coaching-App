import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Top Section */}
        <div className="bg-white shadow rounded-2xl p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            We Would Love to Hear <span className="text-[#227472]">from You</span>  
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thank you for your interest in our mission to uplift underprivileged children. 
            We value your thoughts, questions, and feedback. Please don’t hesitate to reach out to us. 
            Our dedicated team is here to assist you.
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <a href="#" className="bg-lime-100 p-3 rounded-full text-gray-700 hover:bg-lime-500 hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-lime-100 p-3 rounded-full text-gray-700 hover:bg-lime-500 hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-lime-100 p-3 rounded-full text-gray-700 hover:bg-lime-500 hover:text-white transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Contact Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-start">
            <h3 className="text-gray-800 font-semibold">Address</h3>
            <p className="text-gray-600 text-sm mt-2">Somewhere in the World</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-start">
            <h3 className="text-gray-800 font-semibold">You Can Email Here</h3>
            <p className="text-gray-600 text-sm mt-2">support@forhelp.com</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-start">
            <h3 className="text-gray-800 font-semibold">Call us on</h3>
            <p className="text-gray-600 text-sm mt-2">+00 000 00 000</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 flex flex-col items-start">
            <h3 className="text-gray-800 font-semibold">Working Hours</h3>
            <p className="text-gray-600 text-sm mt-2">10:00 am – 6:00 pm</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Image + Info */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1581093588401-22b88c8b9a27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Helping Hands"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="bg-white shadow rounded-xl p-6">
              <h3 className="text-gray-800 font-semibold">Partnerships and Collaborations</h3>
              <p className="text-gray-600 text-sm mt-2">collabs@forhelp.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white shadow-lg rounded-xl p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows="4"
                placeholder="Enter your Message"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
              ></textarea>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="agree" className="w-4 h-4 text-lime-500 border-gray-300 rounded" />
              <label htmlFor="agree" className="text-sm text-gray-600">
                I agree with Terms of Use and Privacy Policy
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-lime-500 text-white font-semibold py-3 rounded-lg hover:bg-lime-600 transition"
            >
              Send your Message hkgkergggkjg
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
