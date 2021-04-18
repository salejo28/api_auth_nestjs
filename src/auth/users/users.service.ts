import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashPassword } from 'src/security/password';
import { registerDTO } from './user.dto';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('Users') private readonly userModel: Model<IUser>
    ) { }

    async register(user: registerDTO): Promise<IUser | any> {

        const email = await this.userModel.findOne({ email: user.email })
        if (email) {
            return {
                message: ["The email is already exist!"]
            }
        }

        const username = await this.userModel.findOne({ username: user.username })
        if (username) {
            return {
                message: ["The username is already exist!"]
            }
        }

        user.password = await HashPassword(user.password)

        return await new this.userModel({
            username: user.username,
            email: user.email,
            password: user.password
        }).save()
    }

    async findOne(username: string): Promise<IUser | undefined> {
        return this.userModel.findOne({ username })
    }

    async updateUsername(id: string, username: string) {
        await this.userModel.findByIdAndUpdate(id, { username });
        return {
            message: ["Updated Successfully"]
        }
    }

    async updateEmail(id: string, email: string) {
        const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        if (!validEmail) return {
            message: ["Invalid Email"]
        }

        await this.userModel.findByIdAndUpdate(id, { email });

        return {
            message: ["Updated Successfully"]
        }
    }

    async updatePassword(id: string, password: string) {

        if (password.length < 4) {
            return {
                message: ["Password must be 4 characteres"]
            }
        }

        password = await HashPassword(password)

        await this.userModel.findByIdAndUpdate(id, { password });

        return {
            message: ["Updated Successfully"]
        }
        
    }

    async deleteUser(id: string) {
        await this.userModel.findByIdAndDelete(id);
        return {
            message: ["Deleted Successfully"]
        }
    }

}
