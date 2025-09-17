import User from "../models/user.js"
import bcrypt from "bcrypt"

const registerUser = async(request, response) => {
    try {
        const { email, name, password } = request.body

        const existingUser = await User.findOne({ email })

        if(existingUser) {
            return response.status(400).json({ message: "Email address already in use"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        })

        response.status(201).json({ message: "Verification email sent to your email. Please check and verify your account."})
    } catch (error) {
        console.log(error)

        response.status(500).json({message: "Internal server error"})
    }
}

const loginUser = async(request, response) => {
    try {
        const {email, password} = request.body

        const user = await User.findOne({ email }).select("+password")

        if(!user) {
            return response.status(400).json({ message: "Invalid email or password" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            return response.status(400).json({ message: "Invalid email or password" })
        }

        // const token = jwt.sign(
        //     { userId: user._id, purpose: "login" },
        //     process.env.JWT_SECRET,
        //     { expiresIn: "7d" }
        // )

        user.lastLogin = new Date()
        await user.save()

        const userData = user.toObject()
        delete userData.password
        
        response.status(200).json({
            message: "Login Successful",
            user: userData
        })
        
    } catch (error) {
        console.log(error)

        response.status(500).json({message: "Internal server error"})
    }
}

export { registerUser, loginUser }