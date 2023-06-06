import { AuthController } from '../src/controllers/AuthController';
import { AuthRepository } from '../src/repositories/AuthRepository';
import { UserRepository } from '../src/repositories/UserRepository';
import { AuthService } from '../src/services/AuthService';
import { UserService } from '../src/services/UserService';

describe('Auth service test', () => {
	let userRepository: UserRepository;
	let userService: UserService;
	let authRepository: AuthRepository;
	let authService: AuthService;
	let authController: AuthController;

	let userCreated: any;

	beforeAll(async () => {
		userRepository = new UserRepository();
		userService = new UserService(userRepository, null);
		authRepository = new AuthRepository(userRepository);
		authService = new AuthService(authRepository);
		authController = new AuthController(authService);

		userCreated = await userService.createUser({
			name: 'teste',
			email: `teste${Math.random() * 1000}@teste.com`,
			password: '123456',
		});
	});

	it('should be able to sign in with email and password', async () => {
		const userCredencials = {
			email: 'teste99@teste.com',
			password: '123456',
		};

		const userLogged = await authService.signIn(userCredencials);

		expect(userLogged).toHaveProperty('token');
	});

	it('should be able to verify if token is valid', async () => {
		const { token } = userCreated;

		const tokenValid = await authService.verifyToken(token);

		expect(tokenValid?.name).toBe('teste');
	});

	it('should be able to verify if token is not valid', async () => {
		const token = 'non-existing-token';

		const tokenValid = await authService.verifyToken(token);

		expect(tokenValid).toBe(null);
	});
});
