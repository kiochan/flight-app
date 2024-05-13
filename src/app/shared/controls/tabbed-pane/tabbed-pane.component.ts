import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  signal,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { TabNavigatorComponent } from '../tab-navigator/tab-navigator.component';

@Component({
  selector: 'app-tabbed-pane',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  templateUrl: './tabbed-pane.component.html',
  styleUrl: './tabbed-pane.component.css',
  imports: [TabNavigatorComponent],
})
export class TabbedPaneComponent implements AfterContentInit {
  activeTab = signal<TabComponent | undefined>(undefined);
  tabs = contentChildren(TabComponent);
  currentPage = signal(0);

  ngAfterContentInit(): void {
    if (this.tabs().length > 0) {
      this.activate(this.tabs()[0]);
    }
  }

  activate(active: TabComponent): void {
    this.tabs().forEach((tab, index) => {
      tab.visible.set(tab === active);
      if (tab === active) {
        this.currentPage.set(index);
      }
    });
    this.activeTab.set(active);
  }

  pageChange(page: number): void {
    this.currentPage.set(page);
    this.activate(this.tabs()[page]);
  }
}
