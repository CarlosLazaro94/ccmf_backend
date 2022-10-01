import { Injectable } from '@nestjs/common';
import { User } from 'src/core/domain/User/user.entity';
import { UserRepository } from 'src/repository/UserRepository/User.repository';
import { ServerException } from "../../core/exceptions/ServerException";

@Injectable()
export class UserServices {
  constructor(private userRepository: UserRepository) {}

  /**
   * @Description ~ method for create user
   * @param user 
   * @returns ~ "CREATE OK" or "NOT CREATE"
   */
  async createUser(user: User): Promise<string> {
    return await this.userRepository.createUser(user[0])? "CREATE OK" : "NOT CREATE";
  }

  /**
   * @returns return all user in database
   */
  async getUsers(): Promise<User[]> {
    try{
      return await this.userRepository.findAllUser();
    }catch (e) {
      throw new ServerException(e.message);
    }
  }

  /**
   * @param params ~ Type request express for get id 
   * @returns user
   */
  async getByIdUser(params: any): Promise<User[]> {
    try{
      return await this.userRepository.findByIdUser(params.id);
    }catch (e) {
      throw new ServerException(e.message);
    }
  }

  /**
   * @param user 
   * @returns ~ "UPDATE OK" or "NOT UPDATE"
   */
  async editUser(user: User): Promise<string> {
    try{
      const result = await this.userRepository.editUser(user[0]);
      return result ? "UPDATE OK" : "NOT UPDATE";
    }catch (e) {
      throw new ServerException(e.message);
    }
  }

  /**
   * @param params ~ Type request express for get id
   * @returns ~ "DELETE OK" or "NOT DELETE"
   */
  async deleteUser(params: any): Promise<string> {
    try{
      const result = await this.userRepository.deleteUser(params.id);
      return result.affectedRows == 1 ? "DELETE OK" : "NOT DELETE";
    }catch (e) {
      throw new ServerException(e.message);
    }
  }
}
