import { createUserDto } from './dto/create-user.dto';
import { RegService } from './reg.service';
import { Reg } from './schemas/reg.schema';
export declare class RegController {
    private readonly regService;
    constructor(regService: RegService);
    getAllUsers(): Promise<Reg[]>;
    create(createUserDto: createUserDto): Promise<Reg>;
    removeUsers(): Promise<Reg[]>;
}
