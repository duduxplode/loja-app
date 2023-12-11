import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ApiModule} from "./api/api.module";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatDialogModule} from "@angular/material/dialog";
import {ComputadorModule} from "./pages/computador/computador.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LoaderModule} from "./arquitetura/loader/loader.module";
import {LoaderDialogComponent} from "./arquitetura/loader-dialog/loader-dialog.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AutenticacaoModule} from "./arquitetura/autenticacao/autenticacao.module";
import {SecurityModule} from "./arquitetura/security/security.module";
import {SecurityInterceptor} from "./arquitetura/security/security.interceptor";
import {MessageModule} from "./arquitetura/message/message.module";
import {AppInterceptor} from "./arquitetura/app.interceptor";
import {VendaModule} from "./pages/venda/venda.module";
import {TipoComputadorModule} from "./pages/tipo-computador/tipo-computador.module";
import { CarrinhoComponent } from './pages/loja/carrinho/carrinho.component';
import {ValidationResourceProvider} from "./adminmodule/shared/validation/validation.resource";
import {AppMessage} from "./adminmodule/app.message";
import {LojaModule} from "./pages/loja/loja.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoaderDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApiModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    LoaderModule,
    MatDialogModule,
    ComputadorModule,
    VendaModule,
    LojaModule,
    TipoComputadorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AutenticacaoModule,
    MessageModule.forRoot(),
    SecurityModule,//TODO conferir a configuração
    SecurityModule.forRoot({
      nameStorage: 'portalSSOSecurityStorage',
      loginRouter: '/acesso/login'
    }),
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
    {
      provide: ValidationResourceProvider,
      useValue: AppMessage,
    },
    {
      provide: LOCALE_ID, useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
