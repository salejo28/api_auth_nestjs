import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IProduct } from './products.interface';
import { ProductDTO } from './products.dto';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel('Products') private readonly productsModel: Model<IProduct>,
    ) {  }

    async getProducts(): Promise<IProduct[]> {
        return await this.productsModel.find();
    }

    async getProduct(_id: string): Promise<IProduct> {
        return await this.productsModel.findById(_id);
    }

    async createProduct(product: ProductDTO): Promise<IProduct> {
        return await new this.productsModel(product).save();
    }

    async updateProduct(_id: string, product: ProductDTO): Promise<IProduct> {
        return await this.productsModel.findByIdAndUpdate(_id, product);
    }

    async deleteProduct(_id: string): Promise<any> {
        await this.productsModel.findByIdAndDelete(_id);
        return {
            message: ["Deleted Successfully"]
        }
    }

}
