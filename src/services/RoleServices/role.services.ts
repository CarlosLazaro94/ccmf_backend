import { Role } from "../../core/domain/Role/role.entity";
import { RoleRepository } from "../../repository/RoleRepository/role.repository";
import { ServerException } from "../../core/exceptions/ServerException";

export class RoleServices {
  constructor(private roleRepository: RoleRepository) {}

  async create(role: Role): Promise<string> {
    try{
      return await this.roleRepository.create(role[0]) ? "CREATE OK" : "NOT CREATE";
    }catch (e) {
      throw new ServerException(e.message);
    }
  }

  async get():Promise<Role[]>{
    try {
      return await this.roleRepository.find();
    }catch (e) {
      throw new ServerException(e.message);
    }
  }

  async getOne(params: any):Promise<Role[]>{
    try{
      return await this.roleRepository.findOne(params.id);
    }catch (e) {
      throw new ServerException(e.message);
    }
  }

  async edit(role:Role): Promise<string>{
    try{
      return await this.roleRepository.edit(role[0]) ? "UPDATE OK" : "NOT UPDATE";
    }catch (e) {
      throw new ServerException(e.message);
    }
  }

  async delete(params: any): Promise<string>{
    try{
      const result =  await this.roleRepository.delete(params.id)
      return result.affectedRows == 1 ? "DELETE OK" : "NOT DELETE";
    }catch (e) {
      throw new ServerException(e.message);
    }
  }
}
