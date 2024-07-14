import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Event, Team} from "../types/events";
import {parse} from "date-fns";
import {LoadingStatuses} from "../types/loading";
import {NgxCsvParser} from "ngx-csv-parser";

const eventsApi = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSLnt3e8qGXsZb8vpVrKKGaABV1AGZDLAWblflGL9Lw0ZtpW59rk5fUnhBiHb6LejZpJmS3WOP4rM-o/pub?gid=0&single=true&output=csv'
const teamApi = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSLnt3e8qGXsZb8vpVrKKGaABV1AGZDLAWblflGL9Lw0ZtpW59rk5fUnhBiHb6LejZpJmS3WOP4rM-o/pub?gid=1073982170&single=true&output=csv'
const pageDataApi = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSLnt3e8qGXsZb8vpVrKKGaABV1AGZDLAWblflGL9Lw0ZtpW59rk5fUnhBiHb6LejZpJmS3WOP4rM-o/pub?gid=1452692267&single=true&output=csv'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Signals
  events = signal<Event[]>([]);
  eventsState = signal<LoadingStatuses>("loading");
  team = signal<Team[]>([]);
  teamState = signal<LoadingStatuses>("loading");
  pageData = signal<{ [key: string]: string }>({});
  pageDataState = signal<LoadingStatuses>("loading");
  allLoaded = computed(() => {
    if (this.eventsState() === "loaded" && this.teamState() === "loaded" && this.pageDataState() === "loaded") {
      return "loaded";
    }
    if (this.eventsState() === "error" || this.teamState() === "error" || this.pageDataState() === "error") {
      return "error";
    }
    return "loading";
  })
  // Deps
  private http = inject(HttpClient);
  private parser = inject(NgxCsvParser);

  // Functions
  updateData() {
    this.eventsState.set("loading");
    this.http.get(eventsApi, {
      responseType: 'arraybuffer'
    }).subscribe({
      next: (data) => {
        this.events.set(this.parseEventCSV(data));
        this.eventsState.set("loaded");
      },
      error: () => {
        this.eventsState.set("error");
      }
    });

    this.http.get(teamApi, {
      responseType: 'arraybuffer'
    }).subscribe({
      next: (data) => {
        this.team.set(this.parseTeamCSV(data));
        this.teamState.set("loaded");
      },
      error: () => {
        this.teamState.set("error");
      }
    });

    this.http.get(pageDataApi, {
      responseType: 'arraybuffer'
    }).subscribe({
      next: (data) => {
        const pageData = this.parsePageDataCSV(data);
        this.pageData.set(pageData);
        console.log(pageData);
        this.pageDataState.set("loaded");
      },
      error: () => {
        this.pageDataState.set("error");
      }
    });

  }

  private parseEventCSV(arrayBuffer: ArrayBuffer): (Event)[] {
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(new Uint8Array(arrayBuffer));
    const data = this.parser.csvStringToArray(csv, ',');
    const headers = this.parser.getHeaderArray(data);
    return data.slice(1).map((line) => {
      return {
        id: line[headers.indexOf('id')],
        name: line[headers.indexOf('name')],
        description: line[headers.indexOf('description')],
        dateTime: parse(line[headers.indexOf('date')] + " " + line[headers.indexOf('time')], 'dd/MM/yyyy HH:mm', new Date()),
        endDateTime: parse(line[headers.indexOf('endDate')] + " " + line[headers.indexOf('endTime')], 'dd/MM/yyyy HH:mm', new Date()),
        location: line[headers.indexOf('location')],
        image: line[headers.indexOf('image')],
        calendar: line[headers.indexOf('calendar')]
      };
    });
  }

  private parseTeamCSV(arrayBuffer: ArrayBuffer): (Team)[] {
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(new Uint8Array(arrayBuffer));
    const data = this.parser.csvStringToArray(csv, ',');
    const headers = this.parser.getHeaderArray(data);
    return data.slice(1).map((line) => {
      return {
        id: line[headers.indexOf('id')],
        name: line[headers.indexOf('name')],
        role: line[headers.indexOf('role')],
        image: line[headers.indexOf('image')] === '' ? undefined : line[headers.indexOf('image')],
        exec: line[headers.indexOf('exec')] === 'TRUE'
      };
    });
  }

  private parsePageDataCSV(arrayBuffer: ArrayBuffer): { [key: string]: string } {
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(new Uint8Array(arrayBuffer));
    const data = this.parser.csvStringToArray(csv, ',');
    const headers = this.parser.getHeaderArray(data);
    let pageData: { [key: string]: string } = {};
    data.slice(1).forEach((line) => {
      pageData[line[headers.indexOf('id')]] = line[headers.indexOf('data')];
    });
    return pageData;
  }

}
