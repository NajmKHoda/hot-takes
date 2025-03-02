"use client"

import type React from "react"
import {useState} from "react"
import Link from "next/link"
import {Eye, EyeOff} from "lucide-react"
import { motion } from "framer-motion"

import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {handleLogin} from "@/lib/auth";

// Animation variants for staggered animations
const formVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24
        }
    }
};

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget;
        const username = form["username"].value;
        const password = form["password"].value;

        if (password.length < 8) {
            alert("password must be at least 8 characters long.");
            return;
        }
        if (username < 3 || username > 16 || username.includes(" ")) {
            alert("username must be between 3 and 16 characters long and cannot contain spaces.");
            return;
        }
        setIsLoading(true)
        const error = await handleLogin(username, password);
        setIsLoading(false)
        let errorMessage;
        switch (error) {
            case "invalid-credentials":
                errorMessage = "invalid credentials. please try again!";
                break;
            case "server-error":
                errorMessage = "sorry, something went wrong on our server. try again later!";
                break;
        }
        alert(errorMessage)
    }

    return (
        <div className="space-y-6">
            <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-4"
                variants={formVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="username">username</Label>
                    <Input 
                        id="username" 
                        placeholder="enter your username" 
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">password</Label>
                    </div>
                    <div className="relative">
                        <Input 
                            id="password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="enter your password"
                            required
                            className="transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground"/>
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground"/>
                            )}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                    </div>
                </motion.div>
                <motion.div className="flex items-center space-x-2" variants={itemVariants}>
                    <Checkbox id="remember"/>
                    <Label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        remember me
                    </Label>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.5)] hover:shadow-[0_0_25px_rgba(249,115,22,0.7)] focus:shadow-[0_0_30px_rgba(249,115,22,0.8)]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <motion.span 
                                    className="flex items-center"
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    signing in...
                                </motion.span>
                            ) : "sign in"}
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.form>
            <motion.div 
                className="text-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <p className="text-muted-foreground">
                    care to join us?{" "}
                    <Link href="/signup" className="text-primary underline-offset-4 hover:underline relative group">
                        sign up
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}
