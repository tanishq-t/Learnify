import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            index: true
        },
        lastname: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: function(v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            validate: {
                validator: function(v) {
                    return /\d{10}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true
        },
        role: {
            type: String,
            required: [true, "Role is required"],
            trim: true,
            enum: ['mentor', 'mentee', 'admin']
        },
        coverImage: {
            type: String
        },
        dob: {
            type: String,
            trim: true
        },
        gender: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true,
        },
        pincode: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [4, 'Password must be at least 6 characters']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

userSchema.virtual('fullName').get(function() {
    return `${this.firstname} ${this.lastname}`;
});

userSchema.index({ email: 1 });

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model("User", userSchema);