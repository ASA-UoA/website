import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Event } from "../types/events";
import { parse } from "date-fns";

const apiUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSLnt3e8qGXsZb8vpVrKKGaABV1AGZDLAWblflGL9Lw0ZtpW59rk5fUnhBiHb6LejZpJmS3WOP4rM-o/pub?gid=0&single=true&output=csv'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Deps
  http = inject(HttpClient);

  // Signals
  events = signal<Event[]>([]);

  // Functions
  updateEvents() {
    this.http.get(apiUrl,{
      responseType: 'arraybuffer'
    }).subscribe((data) => {
      this.events.set(this.parseCSV(data));
      console.log('Events:', this.events())
    });
  }


  private parseCSV(data: ArrayBuffer): Event[] {
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(new Uint8Array(data));
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map((line) => {
      const split = line.split(',');
      const event: Event = {
        id: split[headers.indexOf('id')],
        name: split[headers.indexOf('name')],
        description: split[headers.indexOf('description')],
        dateTime: parse(split[headers.indexOf('date')], 'dd/MM/yyyy', new Date()),
        location: split[headers.indexOf('location')],
        image: split[headers.indexOf('image')],
      };
      return event;
    });
  }
}
