import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockResponseData } from './data/mockResponseData';

export interface DateResponse {
  date: string
}

export interface TimeSlotResponse {
  date: string
  time: string
}

@Injectable({
  providedIn: 'root',
})
export class DmvSchedulerService {
  // static API_PREFIX = 'https://nysdmvqw.us.qmatic.cloud/qwebbook/rest/schedule';
  static API_PREFIX = '/api';

  constructor(private httpClient: HttpClient) {}

  async getDatesForService(
    branchId: string,
    serviceId: string
  ): Promise<DateResponse[]> {
    const unixTime = new Date().getTime();
    const requestUrl = `${DmvSchedulerService.API_PREFIX}/branches/${branchId}/services/${serviceId}/dates?_${unixTime}`;
    return this.httpClient
      .get<DateResponse[]>(requestUrl)
      .toPromise();
  }

  async getTimesForDateAndService(
    branchId: string,
    serviceId: string,
    date: string
  ): Promise<TimeSlotResponse[]> {
    const unixTime = new Date().getTime();
    const requestUrl = `${DmvSchedulerService.API_PREFIX}/branches/${branchId}/services/${serviceId}/dates/${date}/times?_${unixTime}`;
    return this.httpClient
      .get<TimeSlotResponse[]>(requestUrl)
      .toPromise();
  }
}
