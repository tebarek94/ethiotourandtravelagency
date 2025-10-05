import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { CreateUserRequest, CreateUserData, LoginRequest, User, JWTPayload } from '../types';
import { createError } from '../middlewares/errorHandler';

export class UserService {
  static async register(userData: CreateUserRequest): Promise<{ user: User; token: string }> {
    try {
      console.log('UserService.register called with:', { ...userData, password: '[HIDDEN]' });
      
      // Check if email already exists
      const existingUser = await UserModel.findByEmail(userData.email);
      if (existingUser) {
        throw createError('Email already registered', 400);
      }

      // Hash password
      const saltRounds = 12;
      const password_hash = await bcrypt.hash(userData.password, saltRounds);

      // Create user
      const userDataWithHash: CreateUserData = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password_hash,
        role: userData.role || 'user'
      };
      
      console.log('Creating user with data:', { ...userDataWithHash, password_hash: '[HIDDEN]' });
      const user = await UserModel.create(userDataWithHash);
      console.log('User created successfully:', { user_id: user.user_id, email: user.email });

      // Generate JWT token
      const token = this.generateToken(user);

      return { user, token };
    } catch (error) {
      console.error('UserService.register error:', error);
      throw error;
    }
  }

  static async login(loginData: LoginRequest): Promise<{ user: User; token: string }> {
    // Find user by email
    const user = await UserModel.findByEmail(loginData.email);
    if (!user) {
      throw createError('Invalid email or password', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password_hash);
    if (!isPasswordValid) {
      throw createError('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return { user, token };
  }

  static async getAllUsers(): Promise<User[]> {
    return UserModel.findAll();
  }

  static async getUserById(id: number): Promise<User> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw createError('User not found', 404);
    }
    return user;
  }

  static async updateUser(id: number, updateData: Partial<User>, currentUserId: number): Promise<User> {
    // Check if user exists
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      throw createError('User not found', 404);
    }

    // Non-admin users can only update their own profile
    if (currentUserId !== id) {
      const currentUser = await UserModel.findById(currentUserId);
      if (!currentUser || currentUser.role !== 'admin') {
        throw createError('Access denied', 403);
      }
    }

    // Check if email is being updated and if it already exists
    if (updateData.email && updateData.email !== existingUser.email) {
      const emailExists = await UserModel.emailExists(updateData.email, id);
      if (emailExists) {
        throw createError('Email already registered', 400);
      }
    }

    // Hash password if being updated
    if (updateData.password_hash) {
      const saltRounds = 12;
      updateData.password_hash = await bcrypt.hash(updateData.password_hash, saltRounds);
    }

    const updatedUser = await UserModel.update(id, updateData);
    if (!updatedUser) {
      throw createError('Failed to update user', 500);
    }

    return updatedUser;
  }

  static async deleteUser(id: number, currentUserId: number): Promise<void> {
    // Check if user exists
    const user = await UserModel.findById(id);
    if (!user) {
      throw createError('User not found', 404);
    }

    // Only admin can delete users, and admin cannot delete themselves
    if (currentUserId === id) {
      throw createError('Cannot delete your own account', 400);
    }

    const currentUser = await UserModel.findById(currentUserId);
    if (!currentUser || currentUser.role !== 'admin') {
      throw createError('Access denied', 403);
    }

    const deleted = await UserModel.delete(id);
    if (!deleted) {
      throw createError('Failed to delete user', 500);
    }
  }

  private static generateToken(user: User): string {
    const payload: JWTPayload = {
      userId: user.user_id,
      email: user.email,
      role: user.role
    };

    const secret = process.env.JWT_SECRET || 'supersecretkey';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
  }
}
