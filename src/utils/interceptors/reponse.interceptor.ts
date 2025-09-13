import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ResponseModel } from "../responseModel";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseModel<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseModel<T>> {
    return next.handle().pipe(
      map((data) => ({
        message: 'Request successful',
        success: true,
        data,
      })),
    );
  }
}
