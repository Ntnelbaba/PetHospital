export interface IFoodType {
  barcode: string;
  genericName: string;
}
export class FoodType {
  constructor(foodTypeObject: Partial<IFoodType>) {
    this.barcode = foodTypeObject.barcode;
    this.genericName = foodTypeObject.genericName;
  }
  barcode: string;
  genericName: string;
}
