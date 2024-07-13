import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Event, Team} from "../types/events";
import {parse} from "date-fns";
import {LoadingStatuses} from "../types/loading";

const eventsApi = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSLnt3e8qGXsZb8vpVrKKGaABV1AGZDLAWblflGL9Lw0ZtpW59rk5fUnhBiHb6LejZpJmS3WOP4rM-o/pub?gid=0&single=true&output=csv'
const teamApi = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSLnt3e8qGXsZb8vpVrKKGaABV1AGZDLAWblflGL9Lw0ZtpW59rk5fUnhBiHb6LejZpJmS3WOP4rM-o/pub?gid=1073982170&single=true&output=csv'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Deps
  http = inject(HttpClient);

  // Signals
  events = signal<Event[]>([]);
  eventsState = signal<LoadingStatuses>("loading");
  team = signal<Team[]>([]);
  teamState = signal<LoadingStatuses>("loading");

  allLoaded = computed(() => {
    if (this.eventsState() === "loaded" && this.teamState() === "loaded") {
      return "loaded";
    }
    if (this.eventsState() === "error" || this.teamState() === "error") {
      return "error";
    }
    return "loading";
  })

  // Functions
  updateEvents() {
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
  }

  private parseEventCSV(data: ArrayBuffer): (Event)[] {
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(new Uint8Array(data));
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map((line) => {
      const split = line.split(',');
      return {
        id: split[headers.indexOf('id')],
        name: split[headers.indexOf('name')],
        description: split[headers.indexOf('description')],
        dateTime: parse(split[headers.indexOf('date')], 'dd/MM/yyyy', new Date()),
        location: split[headers.indexOf('location')],
        image: split[headers.indexOf('image')],
      };
    });
  }

  private parseTeamCSV(data: ArrayBuffer): (Team)[] {
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(new Uint8Array(data));
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map((line) => {
      const split = line.split(',');
      console.log(split, headers)
      return {
        id: split[headers.indexOf('id')],
        name: split[headers.indexOf('name')],
        role: split[headers.indexOf('role')],
        image: split[headers.indexOf('image')],
      };
    });
  }


}
