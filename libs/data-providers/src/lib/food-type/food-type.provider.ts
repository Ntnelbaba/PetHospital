import { Injectable } from '@nestjs/common';
import { FoodType, FoodTypeDbService } from '@pet-hospital/db';
import { HttpService } from '@nestjs/axios';

const BARCODE_LENGTH = 12;

@Injectable()
export class FoodTypeProvider {
  constructor(
    private readonly foodTypeDbService: FoodTypeDbService,
    private http: HttpService
  ) {}
  getPetFoodTypes(petType: string): Promise<string[]> {
    return this.foodTypeDbService
      .findIdsByPetType(petType)
      .then((res) => this.handleFoodTypeFromDb(petType, res))
      .catch((err) => this.handleErrorFromDb(petType, err));
  }

  async handleFoodTypeFromDb(
    petType: string,
    foodTypes: string[]
  ): Promise<string[]> {
    if (foodTypes?.length > 0) {
      return Promise.resolve(foodTypes);
    }
    const registeredIds = await this.registerNewPetTypeFood(petType);
    return registeredIds;
  }
  async handleErrorFromDb(petType: string, err): Promise<string[]> {
    console.error(err?.message ?? 'Error from db and no food types received. Create new food types');
    const registeredIds = await this.registerNewPetTypeFood(petType);
    return registeredIds;
  }
  async registerNewPetTypeFood(petType: string): Promise<string[]> {
    const randomFoodTypes = await this.makeRandomFoodTypes();
    const foodTypesCreated: string[] = [];
    for (let i = 0; i < randomFoodTypes.length; i++) {
      const foodType = randomFoodTypes[i];
      await this.foodTypeDbService
        .create({
          petType,
          barcode: foodType.barcode,
          genericName: foodType.genericName,
        })
        .then((res) => foodTypesCreated.push(res._id.toHexString()));
    }
    return foodTypesCreated;
  }
  async makeRandomFoodTypes(): Promise<Partial<FoodType>[]> {
    const randArraySize = Math.floor(1 + Math.random() * 9);
    let retry = 5;
    const foodTypesArray: Partial<FoodType>[] = [];
    for (let i = 0; i < randArraySize && retry > 0; i++) {
      const randomBarcode = this._getRandomBarcode();
      ({ i, retry } = await this.extractFoodType(randomBarcode, i, retry, foodTypesArray));
    }
    return foodTypesArray;
  }

  async extractFoodType(randomBarcode: string, i: number, retry: number, foodTypesArray: Partial<FoodType>[]) {
    await this.http
      .get(`https://world.openfoodfacts.org/code/${randomBarcode}.json`)
      .toPromise()
      .then(async (res) => {
        const givenFoodTypeId: number = +res?.data?.products[0]?._id;
        if (!givenFoodTypeId) {
          i--;
          retry--;
          return;
        }
        await this.getFoodTypeDetails(givenFoodTypeId, foodTypesArray);
      });
    return { i, retry };
  }

  private async getFoodTypeDetails(givenFoodTypeId: number, foodTypesArray: Partial<FoodType>[]) {
    await this.http
      .get(
        `https://world.openfoodfacts.org/api/v0/product/${givenFoodTypeId}.json`
      )
      .toPromise()
      .then((res) => {
        foodTypesArray.push({
          barcode: `${givenFoodTypeId}`,
          genericName: res.data?.product?.generic_name ??
            res.data?.product?.product_name,
        });
      });
  }

  _getRandomBarcode() {
    const barcodeBeginning = Math.floor(100 + Math.random() * 900)
      .toString()
      .replace('.', '');
    const fill = 'x'.repeat(BARCODE_LENGTH - 3);
    const randomBarcode = barcodeBeginning.concat(fill);
    return randomBarcode;
  }
}
