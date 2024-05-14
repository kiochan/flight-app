import { Directive, inject, input, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableField]',
  standalone: true,
})
export class TableFieldDirective {
  appTableFieldAs = input('');

  propName = this.appTableFieldAs
  templateRef = inject(TemplateRef) as TemplateRef<unknown>;
}
