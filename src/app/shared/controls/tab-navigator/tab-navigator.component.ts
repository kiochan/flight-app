import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-navigator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './tab-navigator.component.html',
  styleUrls: ['./tab-navigator.component.css'],
})
export class TabNavigatorComponent {
  page = input(0);
  pageCount = input(0);
  pageChange = output<number>();

  prev(): void {
    let page = this.page();
    page--;
    if (page < 0) {
      page = this.pageCount() - 1;
    }
    this.pageChange.emit(page);
  }

  next(): void {
    let page = this.page();
    page++;
    if (page >= this.pageCount()) {
      page = 0;
    }
    this.pageChange.emit(page);
  }
}
