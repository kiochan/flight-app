import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../../model/flight';
import { ConfigService } from '../../shared/config.service';
import { FlightService } from './flight.service';

@Injectable()
export class DefaultFlightService implements FlightService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);

  flights = signal<Flight[]>([]);

  find(from: string, to: string): Observable<Flight[]> {
    const url = `${this.configService.config.baseUrl}/flight`;

    const headers = {
      Accept: 'application/json',
    };

    const params = { from, to };

    return this.http.get<Flight[]>(url, { headers, params });
  }

  load(from: string, to: string): void {
    this.find(from, to).subscribe((flights) => {
      this.flights.set(flights);
    });
  }

  findById(id: string): Observable<Flight> {
    const url = `${this.configService.config.baseUrl}/flight`;

    const headers = {
      Accept: 'application/json',
    };

    const params = { id };

    return this.http.get<Flight>(url, { headers, params });
  }

  delay(): void {
    const ONE_MINUTE = 1000 * 60;

    const oldFlights = this.flights();

    const oldFlight = oldFlights[0];
    const oldDate = new Date(oldFlight.date);
    const newDate = new Date(oldDate);
    newDate.setTime(oldDate.getTime() + 15 * ONE_MINUTE);
    const newFlight = { ...oldFlight, date: newDate.toISOString() };
    const newFilights = [newFlight, ...oldFlights.slice(1)];
    this.flights.set(newFilights);
  }
}
