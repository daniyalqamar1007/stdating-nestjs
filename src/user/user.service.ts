// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { Types } from 'mongoose';
import { User } from './schema/user.schema';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class UserService {
  constructor(
    private readonly mailService: MailService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async sendOtp(email: string) {
    try {
      console.log('otp sent');
      // Check if user exists
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        return {
          success: false,
          msg: 'User already exists with this email',
        };
      }

      // Generate 4-digit OTP
      // const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const otp = '1111';
      // Send OTP to e mail
      await this.mailService.sendOtpEmail(email, otp);

      return {
        success: true,
        msg: 'OTP sent successfully',
        otpSentTo: email,
        otp: otp,
      };
    } catch (error) {
      return {
        success: false,
        msg: 'Failed to send OTP',
        error: error.message,
      };
    }
  }

  // Create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      console.log(createUserDto);
      const { password, ...userData } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new this.userModel({
        ...userData,
        password: hashedPassword,
      });
      return await user.save();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Get all users
  async findAll(): Promise<User[]> {
    try {
      return await this.userModel
        .find({ role: { $ne: 'admin' } }) // Exclude users with 'admin' role
        .select('-password') // Exclude the password field
        .exec();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Get user by ID
  async findOneById(id: string): Promise<any> {
    try {
      return await this.userModel
        .findById(id)
        .select('-password') // Exclude the password field
        .exec();
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  // Delete user
  async delete(id: string): Promise<void> {
    try {
      await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Update user
  async update(
    id: string,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<any> {
    try {
      return await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async comparePasswords(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }

  // user.service.ts
  async updateLastLogin(userId: Types.ObjectId, date: Date): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { lastLogin: date });
  }
}
