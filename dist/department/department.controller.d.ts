import { DepartmentService } from './department.service';
import { QueryModel } from '../shared/model/query.model';
import { DepartmentDto } from './dto/department.dto';
import { Response } from 'express';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    getDepartments(res: Response, query: QueryModel): Promise<any>;
    getById(id: string, res: Response): Promise<any>;
    create(patient: DepartmentDto, res: Response): Promise<any>;
    update(id: string, patient: DepartmentDto, res: Response): Promise<any>;
    delete(id: string, res: Response): Promise<any>;
}
