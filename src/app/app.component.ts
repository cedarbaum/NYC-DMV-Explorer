import { Component, ViewChild } from '@angular/core';
import { SelectItemGroup } from 'primeng/api/selectitemgroup';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import * as _ from 'lodash';
import { DateResponse, DmvSchedulerService, TimeSlotResponse } from './dmv-scheduler.service';
import { result } from 'lodash';
import { DmvInfo } from './data/dmvInfo';

import * as moment from "moment";
import { FullCalendar } from 'primeng/fullcalendar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'nyc-dmv-scheduler';

  options: any;

  dmvBranches: any[];

  selectedBranches: any;

  services: any[];

  selectedService: any = DmvInfo.SERVICES[0].publicId;

  value: number = 0;

  valueTimes: number = 0;

  loading: boolean = false;

  haveResults: boolean = false;

  events!: any[];

  selectedAptHeader: string = '';

  selectedBranchId: string = '';

  selectedBranchSlotId: number = -1;

  selectedTimerange: string = '';
  
  static readonly API_CALL_DELAY_MS = 2000;
  
  @ViewChild('fc')
  fc!: FullCalendar;

  constructor(private dmvScheduler: DmvSchedulerService) {
    this.services = DmvInfo.SERVICES;
    this.dmvBranches = DmvInfo.BRANCHES;
  }

  async handleSubmit(event: any) {
    if (!this.selectedBranches) {
      return;
    }

    this.loading = true;
    const results = await this.loadAllTimesForSelectedBranches(
      this.selectedBranches,
      this.selectedService
    );

    this.loading = false;

    if (results[0] != undefined) {
      this.haveResults = true
      this.setupCalendar(results[0], results[1]);
    }
  }

  bookApt(event: any) {
    window.open('https://nysdmvqw.us.qmatic.cloud/naoa/index.jsp', '_blank')
  }

  async loadAllTimesForSelectedBranches(
    branchIds: string[],
    serviceId: string
  ): Promise<[moment.Moment | undefined, Map<string, moment.Moment[]>]> {
    const results = new Map<string, moment.Moment[]>();
    this.value = 0;
    let minDate: undefined | moment.Moment = undefined;

    for (var idx = 0; idx < branchIds.length; idx++) {
      const branchId = branchIds[idx];
      const dates = await this.dmvScheduler
        .getDatesForService(branchId, serviceId)
        .then((data) => {
          return data.map(r => r.date);
        })
        .catch((error) => {
          console.error(`Error ${error} when querying dates for ${branchId}`)
          return [] as string[];
        });

      const allDateTimes: moment.Moment[] = [];
      this.valueTimes = 0;

      for (var dateIdx = 0; dateIdx < dates.length; dateIdx++) {
        const dateTimes = await this.dmvScheduler.getTimesForDateAndService(
          branchId,
          serviceId,
          dates[dateIdx]
        )
        .then((dateTimes) => {
          return dateTimes.map((dt: TimeSlotResponse) => moment(`${dt.date} ${dt.time}`));
        })
        .catch((error) => {
          console.error(`Error ${error} when querying times for date ${dates[dateIdx]} for ${branchId}`)
          return [] as moment.Moment[];
        });

        dateTimes.forEach((date, slotIdx) => {
          if (minDate == undefined || date < minDate) {
            minDate = date;
            this.selectTimeslot(branchId, slotIdx, this.selectedService, date);
          }

          allDateTimes.push(date);
        });

        this.valueTimes = Math.round(100 * ((dateIdx + 1) / dates.length));
        await this.delay(AppComponent.API_CALL_DELAY_MS);
      }

      results.set(branchId, allDateTimes);

      this.value = Math.round(100 * ((idx + 1) / branchIds.length));
      
      if (idx < branchIds.length - 1) {
          await this.delay(AppComponent.API_CALL_DELAY_MS);
      }
    }

    return [minDate, results];
  }

  setupCalendar(minimumDate: moment.Moment, allDates: Map<string, moment.Moment[]>) {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: minimumDate.toISOString(),
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      eventBackgroundColor: 'var(--blue-300)',
      eventBorderColor: 'var(--blue-300)',
      eventClick: (info: any) => {
        const branchSlots = allDates.get(info.event.extendedProps.branchId)
        const startTime = branchSlots ? branchSlots[info.event.extendedProps.branchSlotId] : undefined
        this.selectTimeslot(
          info.event.extendedProps.branchId,
          info.event.extendedProps.branchSlotId,
          this.selectedService,
          startTime
        );

        this.fc.getCalendar().rerenderEvents()
      },
      eventRender: (info: any) => {
        if (
          info.event.extendedProps.branchId == this.selectedBranchId &&
          info.event.extendedProps.branchSlotId == this.selectedBranchSlotId
        ) {
          info.el.style.backgroundColor = 'var(--blue-500)';
          info.el.style.borderColor = 'var(--blue-500)';
        } else {
          info.el.style.backgroundColor = 'var(--blue-300)';
          info.el.style.borderColor = 'var(--blue-300)';
        }
      },
    };

    if (allDates) {
      const newEvents: any[] = [];

      let globalId = 0;
      allDates.forEach((dateTimes, branchId) => {
        dateTimes.forEach((dateTime, branchSlotId) => {
          newEvents.push({
            id: globalId++,
            branchSlotId: branchSlotId,
            branchId: branchId,
            start: moment(dateTime).toISOString(),
            end: moment(dateTime).add(DmvInfo.getDurationForServiceInMins(this.selectedService), 'minute').toISOString(),
          });
        });
      });

      this.events = newEvents;
    }
  }

  private selectTimeslot(branchId: string, slotIdx: number, serviceId: string, startTime: moment.Moment | undefined) {
    this.selectedBranchId = branchId;
    this.selectedBranchSlotId = slotIdx;
    this.selectedAptHeader = DmvInfo.getBranchNameById(branchId) ?? '';

    const durationMins = DmvInfo.getDurationForServiceInMins(serviceId) ?? 15;

    if (startTime) {
      const start = startTime.format('dddd, MMMM Do YYYY, h:mma');
      const end = moment(startTime).add(durationMins, 'minute').format('h:mma');
      this.selectedTimerange = `${start} - ${end}`;
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
