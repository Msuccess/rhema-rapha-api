import { DepartmentRepository } from './department.repository';
import { DepartmentDto } from './dto/department.dto';
import { QueryModel } from 'src/shared/model/query.model';
export declare class DepartmentService {
    private readonly departmentRepository;
    constructor(departmentRepository: DepartmentRepository);
    getDepartments(query: QueryModel): Promise<any>;
    getDepartment(id: string): Promise<any>;
    addDepartment(newDepartment: DepartmentDto): Promise<any>;
    updateDepartment(id: string, newDepartment: DepartmentDto): Promise<any>;
    deleteDepartment(id: string): Promise<any>;
}
