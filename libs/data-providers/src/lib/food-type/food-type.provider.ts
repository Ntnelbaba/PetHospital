import { Injectable } from '@nestjs/common';
import { FoodTypeDbService } from '@pet-hospital/db';
import { HttpService } from '@nestjs/axios';
import { FoodType } from '@pet-hospital/api-interfaces';

const BARCODE_LENGTH = 12;

@Injectable()
export class FoodTypeProvider {
  constructor(
    private readonly foodTypeDbService: FoodTypeDbService,
    private http: HttpService
  ) {}
  async getPetFoodTypes(petType: string): Promise<FoodType[]> {
    return await this.foodTypeDbService
      .findByPetType(petType)
      .then((res) => this.handleFoodTypeFromDb(petType, res))
      .catch((err) => this.handleErrorFromDb(petType, err));
  }
  handleFoodTypeFromDb(
    petType: string,
    foodTypes: FoodType[]
  ): Promise<FoodType[]> {
    if (foodTypes?.length > 0) {
      return Promise.resolve(foodTypes);
    }
    return this.registerNewPetTypeFood(petType);
  }
  handleErrorFromDb(petType: string, err): Promise<FoodType[]> {
    console.error(err);
    return this.registerNewPetTypeFood(petType);
  }
  async registerNewPetTypeFood(petType: string): Promise<FoodType[]> {
    const randomFoodTypes = this.makeRandomFoodTypes();
    const foodTypesCreated: FoodType[] = [];
    (await randomFoodTypes).forEach((foodType) =>
      this.foodTypeDbService
        .create({
          petType,
          barcode: foodType.barcode,
          genericName: foodType.genericName,
        })
        .then((res) => foodTypesCreated.push(new FoodType(res)))
    );
    return foodTypesCreated;
  }
  async makeRandomFoodTypes(): Promise<Partial<FoodType>[]> {
    const randArraySize = Math.floor(1 + Math.random() * 9);
    let retry = 5;
    const foodTypesArray: Partial<FoodType>[] = [];
    for (let i = 0; i < randArraySize && retry > 0; i++) {
      const randomBarcode = this.getRandomBarcode();
      await this.http
        .get(`https://world.openfoodfacts.org/code/${randomBarcode}.json`)
        .toPromise()
        .then((res) => {
          const givenFoodTypeId = res?.data?.products[0]?._id;
          if (!givenFoodTypeId) {
            i--;
            retry--;
            return;
          }
          this.http
            .get(
              `https://world.openfoodfacts.org/api/v0/product/${givenFoodTypeId}.json`
            )
            .toPromise()
            .then((res) => {
              foodTypesArray.push({
                barcode: givenFoodTypeId,
                genericName:
                  res.data?.product?.generic_name ??
                  res.data?.product?.product_name,
              });
            });
        });
    }
    return foodTypesArray;
  }
  
  private getRandomBarcode() {
    const barcodeBegining = Math.floor(100 + Math.random() * 900)
      .toString()
      .replace('.', '');
    const fill = 'x'.repeat(BARCODE_LENGTH - 3);
    const randomBarcode = barcodeBegining.concat(fill);
    return randomBarcode;
  }
}
