import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {
  
  constructor(
    private readonly ProductsServices: ProductsService,
    
  ) {}


  async runSeed() {
    await this.insertNewProducts();

    return "Seed Executed"
  }

  private async insertNewProducts() {
      await this.ProductsServices.deleteAllProducts();
      const products = initialData.products;

      const insertPromises = [];

      products.forEach(product => {
        insertPromises.push(this.ProductsServices.create(product))
      });

      await Promise.all(insertPromises)


      return true;

  }

}