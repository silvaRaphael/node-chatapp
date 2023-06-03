import { User } from '../entities/User';
import { transporter } from '../providers/emailProvider';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';

describe('UserService', () => {
	let userRepository: UserRepository;
	let userService: UserService;

	beforeAll(() => {
		userRepository = new UserRepository();
		userService = new UserService(userRepository, transporter);
	});

	it('should be able to create an user', async () => {
		const userCreated = await userService.createUser({
			name: 'name',
			email: 'email',
			password: 'password',
		});

		expect(userCreated).toHaveProperty('id');
		expect(userCreated).toBeInstanceOf(User);
	});

	it('should be able to find the user by id', async () => {
		const id = 'meu-id';

		const user = await userService.getUser(id);

		expect(user?.name).toBe('name');
		expect(user).toBeInstanceOf(User);
	});

	it('should be able to update user', async () => {
		const userUpdated = await userService.updateUser({
			id: 'meu-id',
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
