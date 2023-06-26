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

@Injectable({
  providedIn: 'root',
})
export class FileUploadControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listUploadedFiles
   */
  static readonly ListUploadedFilesPath = '/api/v1/arquivo/';

  /**
   * Listagem Geral de arquivos
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listUploadedFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  listUploadedFiles$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Blob>>> {

    const rb = new RequestBuilder(this.rootUrl, FileUploadControllerService.ListUploadedFilesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'multipart/form-data',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Blob>>;
      })
    );
  }

  /**
   * Listagem Geral de arquivos
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listUploadedFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listUploadedFiles(params?: {
  },
  context?: HttpContext

): Observable<Array<Blob>> {

    return this.listUploadedFiles$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Blob>>) => r.body as Array<Blob>)
    );
  }

  /**
   * Path part for operation handleFileUpload
   */
  static readonly HandleFileUploadPath = '/api/v1/arquivo/';

  /**
   * Adiciona um arquivo no storage
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `handleFileUpload()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  handleFileUpload$Response(params?: {
    body?: {
'file': Blob;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Blob>>> {

    const rb = new RequestBuilder(this.rootUrl, FileUploadControllerService.HandleFileUploadPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'multipart/form-data',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Blob>>;
      })
    );
  }

  /**
   * Adiciona um arquivo no storage
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `handleFileUpload$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  handleFileUpload(params?: {
    body?: {
'file': Blob;
}
  },
  context?: HttpContext

): Observable<Array<Blob>> {

    return this.handleFileUpload$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Blob>>) => r.body as Array<Blob>)
    );
  }

  /**
   * Path part for operation serveFile
   */
  static readonly ServeFilePath = '/api/v1/arquivo/files/{filename}';

  /**
   * Busca um arquivo especifico
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `serveFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  serveFile$Response(params: {
    filename: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Blob>>> {

    const rb = new RequestBuilder(this.rootUrl, FileUploadControllerService.ServeFilePath, 'get');
    if (params) {
      rb.path('filename', params.filename, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'multipart/form-data',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Blob>>;
      })
    );
  }

  /**
   * Busca um arquivo especifico
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `serveFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  serveFile(params: {
    filename: string;
  },
  context?: HttpContext

): Observable<Array<Blob>> {

    return this.serveFile$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Blob>>) => r.body as Array<Blob>)
    );
  }

}
