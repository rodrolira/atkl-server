// server/test/createToken.test.js
import { createToken, findAdmin, createAdmin, loginAdmin, findAdminByUsername, findAdminByEmail } from '../src/controllers/admin.controller.js';
import Admin from '../src/models/admin.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

jest.mock('bcryptjs');

jest.mock('../src/models/admin.model.js', () => ({
  findOne: jest.fn(),
  create: jest.fn()
}));

dotenv.config();

describe('createToken', () => {
  it('should create valid JWT token when given valid adminId', () => {
    const token = createToken('12345'); // Asegúrate de pasar un adminId válido
    expect(typeof token).toBe('string');
    const decoded = jwt.verify(token, process.env.SECRET);
    expect(decoded).toHaveProperty('adminId', '12345');
    expect(decoded).toHaveProperty('role', 'admin');
  });

  it('should throw an error when adminId is undefined', () => {
    expect(() => createToken(undefined)).toThrow('adminId is required'); // Verifica que se lance el error
  });
});


describe('createAdmin', () => {
  const validAdminData = {
    username: 'testadmin',
    email: 'admin@example.com',
    password: 'securePassword123'
  };

  test('successfully creates admin with valid data', async () => {
    // Arrange
    const mockHashedPassword = 'hashedPassword123';
    const mockCreatedAdmin = { ...validAdminData, password: mockHashedPassword };
    bcrypt.hash.mockResolvedValue(mockHashedPassword);
    Admin.create.mockResolvedValue(mockCreatedAdmin);

    // Act
    const result = await createAdmin(validAdminData);

    // Assert
    expect(bcrypt.hash).toHaveBeenCalledWith(validAdminData.password, 10);
    expect(Admin.create).toHaveBeenCalledWith({
      username: validAdminData.username,
      email: validAdminData.email,
      password: mockHashedPassword
    });
    expect(result).toEqual(mockCreatedAdmin);
  });

  test('throws error when admin creation fails', async () => {
    // Arrange
    const mockError = new Error('Duplicate key');
    const mockHashedPassword = 'hashedPassword123';
    bcrypt.hash.mockResolvedValue(mockHashedPassword);
    Admin.create.mockRejectedValue(mockError);

    // Act & Assert
    await expect(createAdmin(validAdminData)).rejects.toThrow('Error creating admin: Duplicate key');
  });

  test('handles bcrypt hashing failure', async () => {
    // Arrange
    const hashError = new Error('Error creating admin: Hashing failed');
    bcrypt.hash.mockRejectedValue(hashError);

    // Act & Assert
    await expect(createAdmin(validAdminData)).rejects.toThrow('Error creating admin: Hashing failed');
  });
});




describe('Admin functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAdmin', () => {
    test('finds admin by criteria successfully', async () => {
      const mockAdmin = { id: 1, email: 'test@example.com' };
      const searchCriteria = { email: 'test@example.com' };

      Admin.findOne.mockResolvedValue(mockAdmin);
      const result = await findAdmin(searchCriteria);

      expect(result).toEqual(mockAdmin);
    });
  });

  describe('findAdminByEmail', () => {
    test('finds admin by email successfully', async () => {
      const mockAdmin = { id: 1, email: 'test@example.com' };
      Admin.findOne.mockResolvedValue(mockAdmin);

      const result = await findAdminByEmail('test@example.com');

      expect(Admin.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }
      });
      expect(result).toEqual(mockAdmin);
    });

    test('throws error when admin not found', async () => {
      Admin.findOne.mockResolvedValue(null);

      await expect(findAdminByEmail('nonexistent@example.com'))
        .rejects
        .toThrow('Error finding admin by email: Admin not found');
    });
  });

  describe('findAdminByUsername', () => {
    test('finds admin by username successfully', async () => {
      const mockAdmin = { id: 2, username: 'testuser' };
      Admin.findOne.mockResolvedValue(mockAdmin);

      const result = await findAdminByUsername('testuser');

      expect(Admin.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' }
      });
      expect(result).toEqual(mockAdmin);
    });
  });
});




describe('loginAdmin', () => {
  const mockAdmin = { 
    id: 2, 
    username: 'testuser'
  };

  test('successful admin login', async () => {
    Admin.findOne.mockResolvedValue(mockAdmin);
    bcrypt.compare.mockResolvedValue(true);
    const token = createToken(mockAdmin.id);

    const result = await loginAdmin(mockAdmin.username, 'correctPassword');
    expect(result).toEqual({ token, admin: mockAdmin });
  });

  test('throws error when admin not found', async () => {
    Admin.findOne.mockResolvedValue(null);

    await expect(loginAdmin('nonexistentadmin', 'anypassword'))
      .rejects
      .toThrow('Admin not found');
  });

  test('throws error when password does not match', async () => {
    Admin.findOne.mockResolvedValue(mockAdmin);
    bcrypt.compare.mockResolvedValue(false);

    await expect(loginAdmin(mockAdmin.username, 'incorrectPassword'))
      .rejects
      .toThrow('Invalid credentials');
  });

  test('handles unexpected errors during login process', async () => {
    Admin.findOne.mockRejectedValue(new Error('Unexpected error'));

    await expect(loginAdmin(mockAdmin.username, 'anypassword'))
      .rejects
      .toThrow('Error logging in admin: Unexpected error');
  });
});