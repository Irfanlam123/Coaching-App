import { FaFacebookF, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Top Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-[#208884] to-teal-700 shadow-lg rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full"></div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
            We Would Love to Hear <span className="text-teal-200">from You</span>  
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto relative z-10">
            Thank you for your interest in our mission to uplift underprivileged children. 
            We value your thoughts, questions, and feedback. Please don't hesitate to reach out to us. 
            Our dedicated team is here to assist you.
          </p>
          <div className="flex justify-center space-x-4 mt-6 relative z-10">
            <motion.a 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="bg-white/20 p-3 rounded-full text-white hover:bg-white hover:text-[#208884] transition-all duration-300"
            >
              <FaFacebookF />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="bg-white/20 p-3 rounded-full text-white hover:bg-white hover:text-[#208884] transition-all duration-300"
            >
              <FaTwitter />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="bg-white/20 p-3 rounded-full text-white hover:bg-white hover:text-[#208884] transition-all duration-300"
            >
              <FaLinkedinIn />
            </motion.a>
          </div>
        </motion.div>

        {/* Contact Info Boxes */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { icon: <FaMapMarkerAlt className="text-xl" />, title: "Address", content: "Chausa Bazar Chausa", color: "bg-red-500" },
            { icon: <FaEnvelope className="text-xl" />, title: "You Can Email Here", content: "VirramVaani@forhelp.com", color: "bg-blue-500" },
            { icon: <FaPhoneAlt className="text-xl" />, title: "Call us on", content: "+91-9304024338", color: "bg-green-500" },
            { icon: <FaClock className="text-xl" />, title: "Working Hours", content: "10:00 am – 6:00 pm", color: "bg-purple-500" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-start hover:shadow-xl transition-all duration-300 group border border-gray-100"
            >
              <div className={`p-3 rounded-full ${item.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-gray-800 font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{item.content}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          {/* Left Image + Info */}
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src="./src/assets/contact.jpeg"
                alt="Helping Hands"
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-gradient-to-r from-[#208884] to-teal-700 shadow-lg rounded-xl p-6 text-white"
            >
              <div className="flex items-center">
                <div className="p-3 bg-white/20 rounded-full mr-4">
                  <FaHandshake className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Partnerships and Collaborations</h3>
                  <p className="text-sm mt-1 text-white/90">collabs@forhelp.com</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.form 
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white shadow-lg rounded-xl p-8 space-y-6 border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#208884] focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#208884] focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#208884] focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#208884] focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows="4"
                placeholder="Enter your Message"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#208884] focus:border-transparent transition-all duration-300"
              ></textarea>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="agree" 
                className="w-4 h-4 text-[#208884] border-gray-300 rounded focus:ring-[#208884]" 
              />
              <label htmlFor="agree" className="text-sm text-gray-600">
                I agree with Terms of Use and Privacy Policy
              </label>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-[#208884] to-teal-700 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md"
            >
              Send your Message 
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-6 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Find Us Here</h2>
          <div className="h-64 bg-gradient-to-br from-[#208884]/20 to-teal-700/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaMapMarkerAlt className="text-4xl text-[#208884] mx-auto mb-2" />
              <p className="text-gray-700">Chausa Bazar Chausa</p>
              <p className="text-sm text-gray-500 mt-1">View on Google Maps</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}