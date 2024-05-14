import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from '../shared/controls/tab/tab.component';
import { TabbedPaneComponent } from '../shared/controls/tabbed-pane/tabbed-pane.component';
import { ClickWithWarningDirective } from '../shared/controls/click-with-warning.directive';
import { Router } from '@angular/router';
import { TooltipDirective } from '../shared/tooltip.directive';
import { TableFieldDirective } from '../shared/controls/data-table/table-field.directive';
import { DataTableComponent } from '../shared/controls/data-table/data-table.component';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  imports: [
    CommonModule,
    TabComponent,
    TabbedPaneComponent,
    ClickWithWarningDirective,
    TooltipDirective,
    DataTableComponent,
    TableFieldDirective,
  ],
})
export class AboutComponent {
  router = inject(Router);

  data: Array<{ id: number; key: string; value: string }> = [
    {
      id: 1,
      key: 'a',
      value: 'alpha',
    },
    {
      id: 2,
      key: 'b',
      value: 'beta',
    },
    {
      id: 3,
      key: 'c',
      value: 'gamma',
    },
  ];

  warn(): void {
    this.router.navigate(['/']);
  }
}
