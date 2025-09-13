import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../types';
import { Request } from 'express';



@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const data = next.handle().pipe(map(data => ({ data })));
        console.log("data =>", data)
        return data
        // const request: Request = context.switchToHttp().getRequest();
        // if()
    }
}
