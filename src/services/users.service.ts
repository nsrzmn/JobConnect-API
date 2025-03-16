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
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET || "defaultSecret",
      {
        expiresIn: "1d",
      }
    );

    return token;
  };
}
