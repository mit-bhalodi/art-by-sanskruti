import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
