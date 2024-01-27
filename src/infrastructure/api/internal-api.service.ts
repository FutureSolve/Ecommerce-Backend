import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { APIService } from './api.service';
import { HttpService } from '@nestjs/axios';

@Injectable({ scope: Scope.REQUEST })
export class InternalAPIService extends APIService {
    constructor(protected http: HttpService, @Inject(REQUEST) private readonly request: Request) {
        super(http);
    }

    protected makeHeaders(headers?: any): any {
        const { accept, authorization } = this.request.headers;
        return {
            accept,
            authorization,
            'content-type': this.request.headers['content-type'],
            ...headers,
        };
    }
}
