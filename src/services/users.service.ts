import { User } from "@src/models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UsersService {
  public register = async (data: any): Promise<any> => {
    // Register user
    const { email, password, firstName, lastName, role } = data;
    // Check if the user already exists
    const user = await User.findOne({
      email,
    });
    // If the user exists, return an error
    if (user) {
      throw new Error("User already exists");
    }
    // If the user does not exist, save the user
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      email,
      password: encryptedPassword,
      firstName,
      lastName,
      role: role || 3, // Default role is 3 ( User )
    });
    await newUser.save();
    // Return JWT token
    const token = await this.tokenGenerate(newUser._id as string, newUser.email as string);

    return token;
  };

  public login = async (data: any): Promise<any> => {
    // Login user
    const { email, password } = data;
    // Check if the user exists
    const user = await User.findOne({
        email,  
    });
    // If the user does not exist, return an error
    if (!user) {
        throw new Error("User not found");
        }
    // If the user exists, check the password
    if (!user.password) {
        throw new Error("User password is undefined");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // If the password is invalid, return an error
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const token = this.tokenGenerate(user._id as string, user.email as string);
    return token;
};

 public getUserProfile = async (data: any): Promise<any> => {
    // Get user profile
    const { email } = data;
    // Check if the user exists
    const userExists = await User.findOne({
        email,
    }).select('firstName lastName role');
    // If the user does not exist, return an error
    if (!userExists) {
        throw new Error("User not found");
    }
    // If the user exists, return the user profile
    return userExists;
};



 tokenGenerate(_id: string, email: string) {
    if (!process.env.JWT_SECRET) {
        throw new Error("Set JWT Secrect First");
    }
    const token = jwt.sign(
        {
            id: _id,
            email: email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return token;
    
}   

}
