"use client"

import type React from "react"
import {useState} from "react"
import Link from "next/link"
import {Eye, EyeOff} from "lucide-react"
import { motion } from "framer-motion"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {handleSignup} from "@/lib/auth";

// Animation variants
const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.2
        } 
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1,
        transition: { duration: 0.4 }
    }
};

export function SignupForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // API call
        const form = e.currentTarget;
        const email = form["email"].value;
        const username = form["username"].value;
        if (username.length > 16 || username.length < 3 || username.includes(" ")) {
            alert("username must be between 3 and 16 characters long and cannot contain spaces.");
            return;
        }
        const password = form["password"].value;
        const confirmPassword = form["confirm-password"].value;
        if (password !== confirmPassword) {
            alert("please match your passwords.");
            return;
        }
        if (password.length < 8) {
            alert("password must be at least 8 characters long.");
            return;
        }
        setIsLoading(true)
        const error = await handleSignup(username, password, email)
        setIsLoading(false)
        let errorMessage;
        switch (error) {
            case "username-taken":
                errorMessage = "sorry, but this username is already taken!";
                break;
            case "email-taken":
                errorMessage = "an account with this email already exists!";
                break;
            case "server-error":
                errorMessage = "sorry, something went wrong on our server. try again later!";
                break;
        }
        if (errorMessage)
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
                    <Label htmlFor="email">email</Label>
                    <Input id="email" type="email" placeholder="enter your email" required/>
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="username">username</Label>
                    <Input id="username" placeholder="choose a username" required/>
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="password">password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="create a password"
                            required
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
                <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="confirm-password">confirm password</Label>
                    <div className="relative">
                        <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="confirm your password"
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground"/>
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground"/>
                            )}
                            <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                    </div>
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
                                    creating account...
                                </motion.span>
                            ) : "create account"}
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.form>
            <motion.div 
                className="text-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <p className="text-muted-foreground">
                    already know us?{" "}
                    <Link href="/" className="text-primary underline-offset-4 hover:underline">
                        sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}
