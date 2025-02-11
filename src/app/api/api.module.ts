/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { VendaControllerService } from './services/venda-controller.service';
import { TipoComputadorControllerService } from './services/tipo-computador-controller.service';
import { ItemVendaControllerService } from './services/item-venda-controller.service';
import { ComputadorControllerService } from './services/computador-controller.service';
import { AuthApiService } from './services/auth-api.service';
import { FileUploadControllerService } from './services/file-upload-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    VendaControllerService,
    TipoComputadorControllerService,
    ItemVendaControllerService,
    ComputadorControllerService,
    AuthApiService,
    FileUploadControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
