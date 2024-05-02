import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

/////// REGISTER NEW USER ///////

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    try {
        const newUser = User({
            username: username,
            email: email,
            password: encryptedPassword,
        })

        await newUser.save();
        res.status(200).json({success: 'true', message: "User Successfully Created"})

    } catch (error) {
        res.status(200).json({success: 'false', message: "Failed to Create a User"})

    }
}

////// LOGIn EXISTIN USER /////////
export const login = async (req, res) => {
    // const {email, password} = req.body;
    const email = req.body.email;
    try {
        const user = await User.findOne({ email });

        // IF USER NOT EXIST
        if (!user) {
            return res.status(404).json({ success: false, message: "User not Found" });
        }

        // IF USER EXIST THEN CHECK THE PASSWORD
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

        // IF PASSWORD IS INCORRECT
        if (!checkCorrectPassword) {
            return res.status(404).json({ success: false, message: "Password is Incorrect" });
        }

        const { password, role, ...rest } = user._doc

        //CREATE JWT TOKEN

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });

        //SET TOKEN IN BROWSER COOKIE

        res.cookie("accessToken", token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({
            token, role, data: { ...rest },

        })

    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to Login" });
    }
}