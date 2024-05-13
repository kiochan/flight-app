import { AfterContentInit, Component, contentChildren } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { TabNavigatorComponent } from "../tab-navigator/tab-navigator.component";

@Component({
    selector: 'app-tabbed-pane',
    standalone: true,
    templateUrl: './tabbed-pane.component.html',
    styleUrl: './tabbed-pane.component.css',
    imports: [TabNavigatorComponent]
})
export class TabbedPaneComponent implements AfterContentInit {
  activeTab: TabComponent | undefined;
  tabs = contentChildren(TabComponent);
  currentPage = 0;

  ngAfterContentInit(): void {
    if (this.tabs().length > 0) {
      this.activate(this.tabs()[0]);
    }
  }

  activate(active: TabComponent): void {
    this.tabs().forEach((tab) => {
      tab.visible = tab === active;
    });
    this.activeTab = active;
  }

  pageChange(page: number): void {
    this.activate(this.tabs()[page]);
  }
}
