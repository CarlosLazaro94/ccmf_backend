import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/core/domain/Role/role.entity';
import { DuplicateKeyException } from 'src/core/exceptions/DuplicateKeyException';
import { DATA_QUERY } from 'src/core/querys/querys.constants';
import { Repository } from 'typeorm';

export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly role: Repository<Role>,
  ) {}

  async create(role: Role): Promise<string> {
    try {
      return this.role.query(DATA_QUERY.CREATE_ROLE, [role.name, role.status]);
    } catch (e) {
      if ((e.code == 'ER_DUP_ENTRY')) {
        throw new DuplicateKeyException();
      }
      throw new e();
    }
  }

  async edit(role: Role): Promise<Boolean>{
    try {
      return await this.role.query(DATA_QUERY.UPDATE_USER, [
        role.name,
        role.status,
        role.id]) == 1;
    } catch (e) {
      throw new e;
    }
  }

  async find(): Promise<Role[]> {
    try {
      return this.role.query(DATA_QUERY.FIND_ROLE);
    }catch (e) {
      throw new e;
    }
  }

  async findOne(id: string): Promise<Role[]> {
    try {
      return this.role.query(DATA_QUERY.FIND_ROLE_ID,[id]);
    }catch (e) {
      throw new e;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return this.role.query(DATA_QUERY.DELETE_ROLE_ID,[id]);
    }catch (e) {
      throw new e;
    }
  }
}
