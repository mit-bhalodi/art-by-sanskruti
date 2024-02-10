import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
    public productAddForm!: FormGroup;

    constructor(private dialogRef: MatDialogRef<AddProductComponent>, private authService: AuthService) {
        this.productAddForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            quantity_available: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        this.authService.getUser().pipe().subscribe();
    }

    saveDetails() {
        if (this.productAddForm?.valid) {
            this.dialogRef.close(this.productAddForm.getRawValue());
        }
    }
}
