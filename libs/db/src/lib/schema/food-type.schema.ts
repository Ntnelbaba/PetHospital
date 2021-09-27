import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodTypeDocument = FoodTypeSchema & Document;
@Schema()
export class FoodTypeSchema {
    @Prop()
    petType: string;
    @Prop()
    foodType: string;
}
export const FoodTypeSchemaFactory = SchemaFactory.createForClass(FoodTypeSchema);