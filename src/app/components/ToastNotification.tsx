// components/ToastNotification.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  FiCheckCircle, 
  FiX, 
  FiAlertCircle,
  FiAward,
  FiStar
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "level-up";
  duration?: number;
  onClose?: () => void;
}

const ToastNotification = ({ 
  message, 
  type = "success", 
  duration = 5000,
  onClose
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: <FiCheckCircle className="text-xl" />,
      bg: "bg-green-500",
      border: "border-green-400",
      progress: "bg-green-300"
    },
    error: {
      icon: <FiAlertCircle className="text-xl" />,
      bg: "bg-red-500",
      border: "border-red-400",
      progress: "bg-red-300"
    },
    info: {
      icon: <FiStar className="text-xl" />,
      bg: "bg-blue-500",
      border: "border-blue-400",
      progress: "bg-blue-300"
    },
    "level-up": {
      icon: <FaCrown className="text-xl" />,
      bg: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      border: "border-yellow-400",
      progress: "bg-yellow-300"
    }
  };

  const currentConfig = config[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`fixed bottom-6 right-6 ${currentConfig.bg} text-white rounded-lg shadow-xl border ${currentConfig.border} overflow-hidden z-50 min-w-[300px]`}
        >
          <div className="relative p-4 pr-8 flex items-start gap-3">
            <div className="pt-0.5">
              {currentConfig.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium">{message}</p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <FiX className="text-sm" />
            </button>
          </div>
          
          {/* Barra de progresso */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className={`h-1 ${currentConfig.progress}`}
          />
          
          {/* Efeito de brilho */}
          {type === "level-up" && (
            <motion.div
              animate={{
                x: [0, 300, 0],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute top-0 left-0 w-20 h-full bg-white/30 transform -skew-x-12"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;