import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';
import { redirectUnauthorizedTo, redirectLoggedInTo, AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectLoggedInToItems = () => redirectLoggedInTo(['home']);

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
        // data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
        // canActivate: [AngularFireAuthGuard],
        // data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    {
        path: 'store',
        loadChildren: () => import('./modules/store/store.module').then((m) => m.StoreModule),
        // canActivate: [AngularFireAuthGuard],
        // data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    {
        path: 'me',
        loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
        // canActivate: [AngularFireAuthGuard],
        // data: { authGuardPipe: redirectLoggedInToItems },
    },
    { path: '**', redirectTo: '/home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
