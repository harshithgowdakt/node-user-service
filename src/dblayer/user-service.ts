import { IUser } from "./models/Users"
import { dbLayer } from "./Connection"
class UserService {

	public async getUserByEmailId(emailId: string) {
		try {
			const collection = await dbLayer.getCollection('users')
			return await collection.findOne({ emailId: emailId });
		} catch (error) {
			throw error;
		}
	}

	public async getUserById(id: string) {
		try {
			const collection = await dbLayer.getCollection('users')
			return await collection.findOne({ _id: id });
		} catch (error) {
			throw error;
		}
	}

	public async createUser(user: IUser) {
		try {
			const collection = await dbLayer.getCollection('users')
			return await collection.insertOne(user);
		} catch (error) {
			return error;
		}
	}

	public async deleteUserByEmailId(emailId: string) {
		const collection = await dbLayer.getCollection('users');
		return await collection.deleteOne({ emailId: emailId });
	}

	public async updateUser(emailId: string, user: IUser) {
		try {
			const collection = await dbLayer.getCollection('users');
			const result = await collection.updateOne({ emailId: emailId }, user);
			console.log(result)
			return result;
		} catch (error) {
			throw error
		}
	}
}

export const userService = new UserService();
