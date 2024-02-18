import cyber from "../2-utils/cyber";
import { ValidationError } from "../3-models/client-errors";
import { IUserModel, UserModel } from "../3-models/user-model";

// Create new user on the db & generate JWT:
async function register(user: IUserModel): Promise<string> {
    try {
        console.log(user.password);
        
        if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(user.password)) {
            throw new ValidationError('Password should contain at least 1 uppercase letter and 1 special character.');
        }
        user.password = cyber.hashedPassword(user.password);
        const registeredUser = await UserModel.create(user);
        console.log(user);
        const token = cyber.getNewToken(registeredUser);
        return token;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new ValidationError(error.message);
        } else {
            console.log("Error during user registration:", error);
            throw error;
        }
    }
}

export default {
    register
}