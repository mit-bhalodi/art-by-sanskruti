import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import * as $ from 'jquery';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private matDialog: MatDialog,
        private productService: ProductService
    ) {}

    public isSuperUser = false;

    public products: any = [];

    ngOnInit(): void {
        this.authService
            .getUser()
            .pipe(take(1))
            .subscribe(() => {
                this.authService.isSuperUser$.pipe(take(1)).subscribe((isSuperUser) => {
                    this.isSuperUser = isSuperUser;
                    if (this.isSuperUser) {
                        this.getProductList();
                    }
                });
            });
    }

    addProduct() {
        const matDialogRef: MatDialogRef<AddProductComponent> = this.matDialog.open(AddProductComponent, {
            disableClose: false,
            autoFocus: false,
            panelClass: 'fix-max-width-dbox-712',
        });

        matDialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((response) => {
                if (response) {
                    this.productService
                        .addProduct(response)
                        .pipe(take(1))
                        .subscribe((response) => {
                            this.getProductList();
                        });
                }
            });
    }

    getProductList() {
        this.productService
            .getProducts()
            .pipe(take(1))
            .subscribe((response) => {
                this.products = response;
            });
    }
}
