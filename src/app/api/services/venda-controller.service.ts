/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { VendaDto } from '../models/venda-dto';

@Injectable({
  providedIn: 'root',
})
export class VendaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation vendaControllerObterPorId
   */
  static readonly VendaControllerObterPorIdPath = '/api/v1/venda/{id}';

  /**
   * Obter os dados completos de uma venda pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `vendaControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  vendaControllerObterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<VendaDto>> {

    const rb = new RequestBuilder(this.rootUrl, VendaControllerService.VendaControllerObterPorIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VendaDto>;
      })
    );
  }

  /**
   * Obter os dados completos de uma venda pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `vendaControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  vendaControllerObterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<VendaDto> {

    return this.vendaControllerObterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<VendaDto>) => r.body as VendaDto)
    );
  }

  /**
   * Path part for operation vendaControllerAlterar
   */
  static readonly VendaControllerAlterarPath = '/api/v1/venda/{id}';

  /**
   * Método utilizado para altlerar os dados de uma venda
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `vendaControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  vendaControllerAlterar$Response(params: {
    id: number;
    body: VendaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<VendaDto>> {

    const rb = new RequestBuilder(this.rootUrl, VendaControllerService.VendaControllerAlterarPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VendaDto>;
      })
    );
  }

  /**
   * Método utilizado para altlerar os dados de uma venda
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `vendaControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  vendaControllerAlterar(params: {
    id: number;
    body: VendaDto
  },
  context?: HttpContext

): Observable<VendaDto> {

    return this.vendaControllerAlterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<VendaDto>) => r.body as VendaDto)
    );
  }

  /**
   * Path part for operation vendaControllerRemover
   */
  static readonly VendaControllerRemoverPath = '/api/v1/venda/{id}';

  /**
   * Método utililzado para remover uma venda pelo Id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `vendaControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  vendaControllerRemover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<VendaDto>> {

    const rb = new RequestBuilder(this.rootUrl, VendaControllerService.VendaControllerRemoverPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VendaDto>;
      })
    );
  }

  /**
   * Método utililzado para remover uma venda pelo Id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `vendaControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  vendaControllerRemover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<VendaDto> {

    return this.vendaControllerRemover$Response(params,context).pipe(
      map((r: StrictHttpResponse<VendaDto>) => r.body as VendaDto)
    );
  }

  /**
   * Path part for operation vendaControllerListAll
   */
  static readonly VendaControllerListAllPath = '/api/v1/venda';

  /**
   * Listagem Geral de vendas
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `vendaControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  vendaControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<VendaDto>>> {

    const rb = new RequestBuilder(this.rootUrl, VendaControllerService.VendaControllerListAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<VendaDto>>;
      })
    );
  }

  /**
   * Listagem Geral de vendas
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `vendaControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  vendaControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<Array<VendaDto>> {

    return this.vendaControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<VendaDto>>) => r.body as Array<VendaDto>)
    );
  }

  /**
   * Path part for operation vendaControllerIncluir
   */
  static readonly VendaControllerIncluirPath = '/api/v1/venda';

  /**
   * Método utilizado para realizar a inclusão de uma venda
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `vendaControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  vendaControllerIncluir$Response(params: {
    body: VendaDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<VendaDto>> {

    const rb = new RequestBuilder(this.rootUrl, VendaControllerService.VendaControllerIncluirPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VendaDto>;
      })
    );
  }

  /**
   * Método utilizado para realizar a inclusão de uma venda
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `vendaControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  vendaControllerIncluir(params: {
    body: VendaDto
  },
  context?: HttpContext

): Observable<VendaDto> {

    return this.vendaControllerIncluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<VendaDto>) => r.body as VendaDto)
    );
  }

}
