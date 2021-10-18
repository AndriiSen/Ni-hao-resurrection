import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RegController } from "./reg.controller";
import { RegService } from "./reg.service";
import { Reg, RegSchema } from "./schemas/reg.schema";

@Module({
providers: [RegService],
controllers:[RegController],
imports: [MongooseModule.forFeature([{name: Reg.name, schema: RegSchema}])]
})

export class RegModule {

}