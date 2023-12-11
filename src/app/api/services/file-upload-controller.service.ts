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
   * Path part for operation fileUploadControllerHandleFileRenameUpload
   */
  static readonly FileUploadControllerHandleFileRenameUploadPath = '/api/v1/arquivo/{filename}';

  /**
   * Adiciona um arquivo renomeado no storage
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileUploadControllerHandleFileRenameUpload()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  fileUploadControllerHandleFileRenameUpload$Response(params: {
    filename: string;
    body?: {
'file': Blob;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Blob>>> {

    const rb = new RequestBuilder(this.rootUrl, FileUploadControllerService.FileUploadControllerHandleFileRenameUploadPath, 'post');
    if (params) {
      rb.path('filename', params.filename, {});
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
   * Adiciona um arquivo renomeado no storage
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fileUploadControllerHandleFileRenameUpload$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  fileUploadControllerHandleFileRenameUpload(params: {
    filename: string;
    body?: {
'file': Blob;
}
  },
  context?: HttpContext

): Observable<Array<Blob>> {

    return this.fileUploadControllerHandleFileRenameUpload$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Blob>>) => r.body as Array<Blob>)
    );
  }

  /**
   * Path part for operation fileUploadControllerListUploadedFiles
   */
  static readonly FileUploadControllerListUploadedFilesPath = '/api/v1/arquivo/';

  /**
   * Listagem Geral de arquivos
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileUploadControllerListUploadedFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileUploadControllerListUploadedFiles$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Blob>>> {

    const rb = new RequestBuilder(this.rootUrl, FileUploadControllerService.FileUploadControllerListUploadedFilesPath, 'get');
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
   * To access the full response (for headers, for example), `fileUploadControllerListUploadedFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileUploadControllerListUploadedFiles(params?: {
  },
  context?: HttpContext

): Observable<Array<Blob>> {

    return this.fileUploadControllerListUploadedFiles$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Blob>>) => r.body as Array<Blob>)
    );
  }

  /**
   * Path part for operation fileUploadControllerHandleFileUpload
   */
  static readonly FileUploadControllerHandleFileUploadPath = '/api/v1/arquivo/';

  /**
   * Adiciona um arquivo no storage
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileUploadControllerHandleFileUpload()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  fileUploadControllerHandleFileUpload$Response(params?: {
    body?: {
'file': Blob;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Blob>>> {

    const rb = new RequestBuilder(this.rootUrl, FileUploadControllerService.FileUploadControllerHandleFileUploadPath, 'post');
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
   * To access the full response (for headers, for example), `fileUploadControllerHandleFileUpload$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  fileUploadControllerHandleFileUpload(params?: {
    body?: {
'file': Blob;
}
  },
  context?: HttpContext

): Observable<Array<Blob>> {

    return this.fileUploadControllerHandleFileUpload$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Blob>>) => r.body as Array<Blob>)
    );
  }

  /**
   * Path part for operation fileUploadControllerServeFile
   */
  static readonly FileUploadControllerServeFilePath = '/api/v1/arquivo/files/{filename}';

  /**
   * Busca um arquivo especifico
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileUploadControllerServeFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileUploadControllerServeFile$Response(params: {
    filename: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Blob>>> {

    const rb = new RequestBuilder(this.rootUrl, FileUploadControllerService.FileUploadControllerServeFilePath, 'get');
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
   * To access the full response (for headers, for example), `fileUploadControllerServeFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileUploadControllerServeFile(params: {
    filename: string;
  },
  context?: HttpContext

): Observable<Array<Blob>> {

    return this.fileUploadControllerServeFile$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Blob>>) => r.body as Array<Blob>)
    );
  }

}
