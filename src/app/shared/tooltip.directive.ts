import {
  Directive,
  EmbeddedViewRef,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
  HostListener,
  signal,
  AfterViewInit,
  effect,
  input,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  viewContainer = inject(ViewContainerRef);
  viewRef: EmbeddedViewRef<unknown> | undefined;

  appTooltip = input<TemplateRef<unknown> | undefined>();

  hidden = signal(true);

  constructor() {
    effect(() => {
      this.viewRef?.rootNodes.forEach((nativeElement) => {
        nativeElement.hidden = this.hidden();
      });
    });
  }

  ngOnInit(): void {
    if (!this.appTooltip()) {
      return;
    }
    this.viewRef = this.viewContainer.createEmbeddedView(this.appTooltip()!);

    this.hidden.set(true);
  }

  @HostListener('mouseover')
  mouseover() {
    this.hidden.set(false);
  }

  @HostListener('mouseout')
  mouseout() {
    this.hidden.set(true);
  }
}
