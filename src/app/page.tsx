"use client"

import {AnimatedBackground} from "@/components/animated-background";
import {HotTakesLogo} from "@/components/hot-takes-logo";
import {LoginForm} from "@/components/login-form";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <>
            <AnimatedBackground/>
            <div
                className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-md mx-auto">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <HotTakesLogo className="mb-4"/>
                    </motion.div>
                    <motion.div 
                        className="w-full p-8 bg-card border rounded-lg shadow-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                        whileHover={{ 
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                            scale: 1.01,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <motion.h1 
                            className="text-2xl font-bold text-center mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            Welcome Back
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <LoginForm/>
                        </motion.div>
                    </motion.div>
                </main>
                <motion.footer
                    className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <p>&copy; 2025 hot takes. moderated by AI.</p>
                </motion.footer>
            </div>
        </>
    );
}
