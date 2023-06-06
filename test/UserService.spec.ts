import { User } from '../src/entities/User';
import { UserRepository } from '../src/repositories/UserRepository';
import { UserService } from '../src/services/UserService';

describe('UserService', () => {
	let userRepository: UserRepository;
	let userService: UserService;

	let id: string;

	beforeAll(() => {
		userRepository = new UserRepository();
		userService = new UserService(userRepository, null);
	});

	it('should be able to create an user', async () => {
		const userCreated = await userService.createUser({
			name: 'teste',
			email: `teste${Math.random() * 1000}@teste.com`,
			password: '123456',
		});

		id = userCreated.id;

		expect(userCreated).toHaveProperty('id');
		expect(userCreated).toBeInstanceOf(User);
	});

	it('should be able to find the user by id', async () => {
		const user = await userService.getUser(id);

		expect(user?.name).toBe('teste');
		expect(user).toBeInstanceOf(User);
	});

	it('should be able to update user', async () => {
		const userUpdated = await userService.updateUser({
			id,
			name: 'name2',
			email: 'email2',
			password: 'password2',
		});

		expect(userUpdated.name).toBe('name2');
		expect(userUpdated).toBeInstanceOf(User);
	});

	it('should not be able to update user without id', async () => {
		await expect(async () => {
			await userService.updateUser({
				id: '',
				name: 'name3',
				email: 'email3',
				password: 'password3',
			});
		}).rejects.toThrowError('ID was not informed!');
	});

	it('should not be able to update user that does not exists', async () => {
		await expect(async () => {
			await userService.updateUser({
				id: 'non-existing-id',
				name: 'name3',
				email: 'email3',
				password: 'password3',
			});
		}).rejects.toThrowError('User does not exist!');
	});
});
