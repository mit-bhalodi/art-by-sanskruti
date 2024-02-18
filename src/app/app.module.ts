import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
// import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule, BrowserAnimationsModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        // {
        //     provide: 'SocialAuthServiceConfig',
        //     useValue: {
        //         autoLogin: false,
        //         providers: [
        //             {
        //                 id: GoogleLoginProvider.PROVIDER_ID,
        //                 provider: new GoogleLoginProvider(
        //                     '330040351024-dohm32ci3no2ok2o1v11e726jrhini6a.apps.googleusercontent.com'
        //                 ),
        //             },
        //         ],
        //         onError: (err) => {
        //             console.error(err);
        //         },
        //     } as SocialAuthServiceConfig,
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
