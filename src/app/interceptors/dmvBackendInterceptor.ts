import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockResponseData } from '../data/mockResponseData';

const getDatesRegexp = /^.*\/branches\/(.*)\/services\/(.*)\/dates\?/;
const getTimesForDateRegexp =
  /^.*\/branches\/(.*)\/services\/(.*)\/dates\/(.*)\/times\?/;

@Injectable()
export class BackendHttpInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (getDatesRegexp.test(request.url)) {
      const matches = getDatesRegexp.exec(request.url);
      const branchId = matches ? matches[1] : '';
      const serviceId = matches ? matches[2] : '';
      return of(
        new HttpResponse<any>({
          status: 200,
          body: MockResponseData.getDates(branchId, serviceId),
        })
      );
    } else if (getTimesForDateRegexp.test(request.url)) {
      const matches = getTimesForDateRegexp.exec(request.url);
      const branchId = matches ? matches[1] : '';
      const serviceId = matches ? matches[2] : '';
      const date = matches ? matches[3] : '';

      return of(
        new HttpResponse<any>({
          status: 200,
          body: MockResponseData.getTimesForDate(branchId, serviceId, date),
        })
      );
    }

    return of(
      new HttpResponse<any>({
        status: 400,
        body: {},
      })
    );
  }
}
// https://nysdmvqw.us.qmatic.cloud/qwebbook/rest/schedule/branches/99f6c320206ee03f9dcce5b83eddcbfd30cd2e30bbe53c51d7116c2b33ce9ccd/services/4ec745aaba5800ddb8fea03c823118afe3a65f4635f12e8ec69b9df5d10a0eec/dates?_=1622326299437
// https://nysdmvqw.us.qmatic.cloud/qwebbook/rest/schedule/branches/99f6c320206ee03f9dcce5b83eddcbfd30cd2e30bbe53c51d7116c2b33ce9ccd/services/4ec745aaba5800ddb8fea03c823118afe3a65f4635f12e8ec69b9df5d10a0eec/dates/2021-06-16/times?_=1622326299438
