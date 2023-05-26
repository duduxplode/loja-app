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

import { ComputadorDto } from '../models/computador-dto';

@Injectable({
  providedIn: 'root',
})
export class ComputadorControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation obterPorId
   */
  static readonly ObterPorIdPath = '/api/v1/computador/{id}';

  /**
   * Obter os dados completos de um computador pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ComputadorDto>> {

    const rb = new RequestBuilder(this.rootUrl, ComputadorControllerService.ObterPorIdPath, 'get');
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
        return r as StrictHttpResponse<ComputadorDto>;
      })
    );
  }

  /**
   * Obter os dados completos de um computador pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `obterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<ComputadorDto> {

    return this.obterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<ComputadorDto>) => r.body as ComputadorDto)
    );
  }

  /**
   * Path part for operation alterar
   */
  static readonly AlterarPath = '/api/v1/computador/{id}';

  /**
   * Método utilizado para altlerar os dados de um computador
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar$Response(params: {
    id: number;
    body: ComputadorDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ComputadorDto>> {

    const rb = new RequestBuilder(this.rootUrl, ComputadorControllerService.AlterarPath, 'put');
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
        return r as StrictHttpResponse<ComputadorDto>;
      })
    );
  }

  /**
   * Método utilizado para altlerar os dados de um computador
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar(params: {
    id: number;
    body: ComputadorDto
  },
  context?: HttpContext

): Observable<ComputadorDto> {

    return this.alterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<ComputadorDto>) => r.body as ComputadorDto)
    );
  }

  /**
   * Path part for operation remover
   */
  static readonly RemoverPath = '/api/v1/computador/{id}';

  /**
   * Método utililzado para remover um computador pelo Id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `remover()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ComputadorDto>> {

    const rb = new RequestBuilder(this.rootUrl, ComputadorControllerService.RemoverPath, 'delete');
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
        return r as StrictHttpResponse<ComputadorDto>;
      })
    );
  }

  /**
   * Método utililzado para remover um computador pelo Id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `remover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<ComputadorDto> {

    return this.remover$Response(params,context).pipe(
      map((r: StrictHttpResponse<ComputadorDto>) => r.body as ComputadorDto)
    );
  }

  /**
   * Path part for operation listAll
   */
  static readonly ListAllPath = '/api/v1/computador';

  /**
   * Listagem Geral de computadores
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ComputadorDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ComputadorControllerService.ListAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ComputadorDto>>;
      })
    );
  }

  /**
   * Listagem Geral de computadores
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll(params?: {
  },
  context?: HttpContext

): Observable<Array<ComputadorDto>> {

    return this.listAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ComputadorDto>>) => r.body as Array<ComputadorDto>)
    );
  }

  /**
   * Path part for operation incluir
   */
  static readonly IncluirPath = '/api/v1/computador';

  /**
   * Método utilizado para realizar a inclusão de um computador
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `incluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir$Response(params: {
    body: ComputadorDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ComputadorDto>> {

    const rb = new RequestBuilder(this.rootUrl, ComputadorControllerService.IncluirPath, 'post');
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
        return r as StrictHttpResponse<ComputadorDto>;
      })
    );
  }

  /**
   * Método utilizado para realizar a inclusão de um computador
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `incluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir(params: {
    body: ComputadorDto
  },
  context?: HttpContext

): Observable<ComputadorDto> {

    return this.incluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<ComputadorDto>) => r.body as ComputadorDto)
    );
  }

}
