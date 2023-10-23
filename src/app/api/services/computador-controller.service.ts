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
   * Path part for operation computadorControllerObterPorId
   */
  static readonly ComputadorControllerObterPorIdPath = '/api/v1/computador/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `computadorControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  computadorControllerObterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ComputadorControllerService.ComputadorControllerObterPorIdPath, 'get');
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
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `computadorControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  computadorControllerObterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.computadorControllerObterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation computadorControllerAlterar
   */
  static readonly ComputadorControllerAlterarPath = '/api/v1/computador/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `computadorControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  computadorControllerAlterar$Response(params: {
    id: number;
    body: ComputadorDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ComputadorControllerService.ComputadorControllerAlterarPath, 'put');
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
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `computadorControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  computadorControllerAlterar(params: {
    id: number;
    body: ComputadorDto
  },
  context?: HttpContext

): Observable<any> {

    return this.computadorControllerAlterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation computadorControllerRemover
   */
  static readonly ComputadorControllerRemoverPath = '/api/v1/computador/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `computadorControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  computadorControllerRemover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ComputadorControllerService.ComputadorControllerRemoverPath, 'delete');
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
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `computadorControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  computadorControllerRemover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.computadorControllerRemover$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation computadorControllerListAll
   */
  static readonly ComputadorControllerListAllPath = '/api/v1/computador';

  /**
   * Listagem Geral de computadores
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `computadorControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  computadorControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ComputadorDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ComputadorControllerService.ComputadorControllerListAllPath, 'get');
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
   * To access the full response (for headers, for example), `computadorControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  computadorControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<Array<ComputadorDto>> {

    return this.computadorControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ComputadorDto>>) => r.body as Array<ComputadorDto>)
    );
  }

  /**
   * Path part for operation computadorControllerIncluir
   */
  static readonly ComputadorControllerIncluirPath = '/api/v1/computador';

  /**
   * Método utilizado para realizar a inclusão de um computador
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `computadorControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  computadorControllerIncluir$Response(params: {
    body: ComputadorDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ComputadorControllerService.ComputadorControllerIncluirPath, 'post');
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
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para realizar a inclusão de um computador
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `computadorControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  computadorControllerIncluir(params: {
    body: ComputadorDto
  },
  context?: HttpContext

): Observable<any> {

    return this.computadorControllerIncluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
