import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  contentChildren,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFieldDirective } from './table-field.directive';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent {
  data = input<Array<any>>([]);

  fields = contentChildren(TableFieldDirective);
}
