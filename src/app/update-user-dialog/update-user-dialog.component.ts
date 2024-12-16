import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import User from '../types/user';

@Component({
  selector: 'app-update-user-dialog',
  standalone: false,
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css'],
})
export class UpdateUserDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User, // Inject data from parent
    private dialogRef: MatDialogRef<UpdateUserDialogComponent> // Reference to close dialog
  ) {}

  save() {
    this.dialogRef.close(this.data); // Return updated data
  }

  cancel() {
    this.dialogRef.close(null); // Close dialog without changes
  }
}
