import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X, Upload, Award, User, Calendar, LogOut, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminSidebar = ({ isOpen, onClose, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Add this

  const menuItems = [
    { path: "/admin/upload-materials", label: "Upload Materials", icon: <Upload size={18} /> },
    { path: "/admin/add-results", label: "Add Results", icon: <Award size={18} /> },
    { path: "/admin/get-info", label: "Get Info", icon: <User size={18} /> },
    { path: "/admin/add-schedule", label: "Add Schedule", icon: <Calendar size={18} /> },
  ];

  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "spring", damping: 25, stiffness: 120 } },
    exit: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15 } }
  };

  const handleLogout = () => {
    onLogout();      // clear user/auth state
    onClose();       // close sidebar
    navigate("/");   // redirect to Home
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-[#065666] to-[#0a7c74] shadow-2xl p-6 flex flex-col justify-between z-50"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>

            {/* Header */}
            <motion.div className="mt-12 mb-6 flex items-center gap-3" variants={itemVariants}>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Admin Panel</h2>
                <p className="text-teal-200 text-sm">Manage Platform</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.li key={item.path} variants={itemVariants}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 relative overflow-hidden ${
                        location.pathname === item.path 
                          ? "bg-white/25 text-white shadow-inner" 
                          : "text-teal-100 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">{item.icon}</span>
                      <span className="relative z-10 flex-1 font-medium">{item.label}</span>
                      <ChevronRight size={16} className="text-white/70" />
                      {location.pathname === item.path && (
                        <motion.div
                          className="absolute left-0 w-1 h-8 bg-white rounded-r-md"
                          layoutId="activeIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Logout */}
            <motion.div className="pt-4" variants={itemVariants}>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/20 hover:bg-red-500 text-white font-medium transition-all duration-200"
              >
                <LogOut size={18} />
                Logout
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
