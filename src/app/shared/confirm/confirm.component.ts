import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent {
  message = inject<string>(DIALOG_DATA);
  dialogRef = inject<DialogRef<boolean, ConfirmComponent>>(DialogRef);

  close(decision: boolean): void {
    this.dialogRef.close(decision);
  }
}
