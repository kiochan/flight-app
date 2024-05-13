import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../../model/flight';
import { FormsModule } from '@angular/forms';
import { FlightService } from './flight.service';
import { CityPipe } from '../../shared/city.pipe';
import { FlightCardComponent } from '../flight-card/flight-card.component';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [CommonModule, FormsModule, CityPipe, FlightCardComponent],
})
export class FlightSearchComponent {
  from = signal('London');
  to = signal('Paris');
  selectedFlight = signal<Flight | undefined>(undefined);
  message = signal('');

  basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  private flightService = inject(FlightService);

  flights = this.flightService.flights;

  search(): void {
    // Reset properties
    this.message.set('');
    this.selectedFlight.set(undefined);
    this.flightService.load(this.from(), this.to());
  }

  select(f: Flight): void {
    this.selectedFlight.set({ ...f });
  }

  delay(): void {
    this.flightService.delay();
  }
}
