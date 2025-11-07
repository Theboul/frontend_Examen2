import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4"
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click dentro
                        initial={{ y: -50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4 border-b pb-2">
                                <h2 className="text-xl font-bold text-[#2A3964]">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="text-2xl text-gray-400 hover:text-gray-700 transition leading-none"
                                >
                                    &times;
                                </button>
                            </div>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}