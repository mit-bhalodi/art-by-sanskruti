import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './components/store/store.component';
import { StoreRoutingModule } from './store-routing.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [StoreComponent, AddProductComponent],
    imports: [CommonModule, StoreRoutingModule, MatDialogModule, MatInputModule, ReactiveFormsModule, FormsModule],
})
export class StoreModule {}
