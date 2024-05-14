import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Input,
  model,
  NgZone,
  output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { initFlight } from '../../model/flight';
import { CityPipe } from '../../shared/city.pipe';
import { StatusToggleComponent } from '../../shared/status-toggle/status-toggle.component';
import { FlightEditReactiveComponent } from '../flight-edit-reactive/flight-edit-reactive.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CityPipe, StatusToggleComponent, RouterLink],
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent {
  private dialog = inject(MatDialog);
  private element = inject(ElementRef);
  private zone = inject(NgZone);

  item = input(initFlight);
  selected = model(false);
  // selected = input(false);
  // selectedChange = output();

  ngOnInit() {}

  select() {
    this.selected.set(true);
  }

  deselect() {
    this.selected.set(false);
  }

  edit() {
    this.dialog.open(FlightEditReactiveComponent, {
      data: { flight: this.item },
    });
  }

  blink() {
    // Dirty Hack used to visualize the change detector
    this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = 'white';
      }, 1000);
    });

    return null;
  }
}
