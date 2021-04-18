import { Body, Controller, Get, Post, Request, UseGuards, Put, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductDTO } from './products.dto';
import { IProduct } from './products.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get() 
    async getProducts(): Promise<IProduct[]> {
        return this.productsService.getProducts();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/almacen')
    async createProduct(@Body() product: ProductDTO, @Request() req): Promise<IProduct> {
        product.user_id = req.user.userId
        return await this.productsService.createProduct(product);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':productId')
    async updateProduct(@Body() product: ProductDTO, @Request() req, @Param('productId') id: string): Promise<IProduct> {
        product.user_id = req.user.userId
        return await this.productsService.updateProduct(id, product);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':productId')
    async deleteProduct(@Param('productId') id: string) {
        return await this.productsService.deleteProduct(id);
    }

}
