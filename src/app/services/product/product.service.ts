import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private http: HttpClient) {}

    public addProduct(sendJson: any) {
        return this.http.post<any>(`${environment.api}/add-product`, sendJson, { withCredentials: true }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    public getProducts() {
        return this.http.get<any>(`${environment.api}/get-products`).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }
}
