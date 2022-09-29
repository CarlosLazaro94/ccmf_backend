import { Role } from "../../core/domain/Role/role.entity";
import { RoleRepository } from "../../repository/RoleRepository/role.repository";

export class RoleServices {
  constructor(private roleRepository: RoleRepository) {}

  async create(role: Role): Promise<string> {
    return await this.roleRepository.create(role[0]) ? "CREATE OK" : "NOT CREATE";
  }

  async get():Promise<Role[]>{
    return await this.roleRepository.find();
  }

  async getOne(params: any):Promise<Role[]>{
    return await this.roleRepository.findOne(params.id);
  }

  async edit(role:Role): Promise<string>{
    return await this.roleRepository.edit(role[0]) ? "UPDATE OK" : "NOT UPDATE";
  }

  async delete(params: any): Promise<string>{
    const result =  await this.roleRepository.delete(params.id)
    return result.affectedRows == 1 ? "DELETE OK" : "NOT DELETE";
  }
}
