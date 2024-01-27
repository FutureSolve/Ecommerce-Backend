import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { BaseModel } from './base.model';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class APIService {
    constructor(protected http: HttpService) {}

    get<T extends BaseModel>(url: string, data?: any, headers?: any, model?: new () => T): Observable<T> {
        Logger.log(`url: ${url}`);
        Logger.log(`data: ${JSON.stringify(data)}`);
        return this.http
            .get(url, {
                headers: this.makeHeaders(headers),
                params: data,
            })
            .pipe(
                map((res) => {
                    return res.data.data ? res.data.data : res.data;
                }),
                map((resData) => {
                    return this.mapToModel(model, resData);
                }),
                catchError((e) => {
                    throw this.handleErrors(e);
                }),
            );
    }

    post<T extends BaseModel>(url: string, data?: any, headers?: any, model?: new () => T): Observable<T> {
        Logger.log(`url: ${url}`);
        Logger.log(`data: ${JSON.stringify(data)}`);

        return this.http
            .post(url, data, {
                headers: this.makeHeaders(headers),
            })
            .pipe(
                map((res) => {
                    return res.data.data ? res.data.data : res.data;
                }),
                map((resData) => {
                    return this.mapToModel(model, resData);
                }),
                catchError((e) => {
                    Logger.log(`error: ${JSON.stringify(e)}`);
                    throw this.handleErrors(e);
                }),
            );
    }

    put<T extends BaseModel>(url: string, data?: any, headers?: any, model?: new () => T): Observable<T> {
        Logger.log(`attempt to put request:`);
        Logger.log(`url ${url}`);
        Logger.log(`data ${JSON.stringify(data)}`);

        return this.http
            .put(url, data, {
                headers: this.makeHeaders(headers),
            })
            .pipe(
                map((res) => {
                    return res.data.data ? res.data.data : res.data;
                }),
                map((resData) => {
                    return this.mapToModel(model, resData);
                }),
                catchError((e) => {
                    throw this.handleErrors(e);
                }),
            );
    }

    patch<T extends BaseModel>(url: string, data?: any, headers?: any, model?: new () => T): Observable<T> {
        Logger.log(`attempt to patch request:`);
        Logger.log(`url ${url}`);
        Logger.log(`data ${JSON.stringify(data)}`);

        return this.http
            .patch(url, data, {
                headers: this.makeHeaders(headers),
            })
            .pipe(
                map((res) => {
                    return res.data.data ? res.data.data : res.data;
                }),
                map((resData) => {
                    return this.mapToModel(model, resData);
                }),
                catchError((e) => {
                    throw this.handleErrors(e);
                }),
            );
    }

    delete(url: string, headers?: any): any {
        Logger.log(`url: ${url}`);

        return this.http
            .delete(url, {
                headers: this.makeHeaders(headers),
            })
            .pipe(
                map((res) => {
                    return res.data.data ? res.data.data : res.data;
                }),
                catchError((e) => {
                    throw this.handleErrors(e);
                }),
            );
    }

    private mapToModel(model: any, data: any): any {
        if (!model) {
            return data;
        }

        if (Array.isArray(data)) {
            return data.map((item) => new model(item));
        }

        return new model(data);
    }

    protected makeHeaders(headers?: any): any {
        return { ...headers };
    }

    private handleErrors(e): any {
        if (e.response) {
            return new HttpException(e.response.data, e.response.status);
        }
        return new HttpException('General error occurs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
