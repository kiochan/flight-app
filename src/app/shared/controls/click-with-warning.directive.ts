import { Dialog } from '@angular/cdk/dialog';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  output,
} from '@angular/core';
import { ConfirmComponent } from '../confirm/confirm.component';

@Directive({
  selector: '[appClickWithWarning]',
  exportAs: 'clickWithWarning',
  standalone: true,
})
export class ClickWithWarningDirective {
  elRef = inject(ElementRef);

  messege = input('Are you sure?');
  confirm = output<MouseEvent | void>();

  @HostBinding('class') classBinding = 'btn btn-danger';

  dialog = inject(Dialog);

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    const ref = this.dialog.open<boolean>(ConfirmComponent, {
      data: this.messege(),
    });
    ref.closed.subscribe((result) => {
      if (result) {
        this.confirm.emit(event);
      }
    });
  }
}
