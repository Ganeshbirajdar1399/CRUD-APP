import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import User from '../types/user';
import { UserService } from '../services/user.service';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userService = inject(UserService);
  dialog = inject(MatDialog);

  newUser: Partial<User> = {
    name: '',
    email: '',
    age: 0,
    address: '',
    password: '',
  };

  constructor() {}

  ngOnInit() {
    this.fetchUsers();
  }

  resetForm() {
    this.newUser = {
      name: '',
      email: '',
      age: 0,
      address: '',
      password: '',
    };
  }

  // Fetch users from the backend
  fetchUsers() {
    this.userService.getUsers().subscribe(
      (result) => {
        this.users = result;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  //add user

  // addUser() {
  //   console.log('User to be added:', this.newUser); // Log the user object
  //   this.userService.addUser(this.newUser).subscribe(
  //     (result) => {
  //       console.log('User added response:', result);
  //       this.fetchUsers()
  //     },
  //     (error) => {
  //       console.error('Error adding user:', error);
  //     }
  //   );

  // }

  //add user end

  // Open the dialog to update a user
  openUpdateDialog(user: User) {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      width: '400px',
      data: { ...user }, // Pass a copy of the user to the dialog
    });

    dialogRef.afterClosed().subscribe((updatedUser) => {
      if (updatedUser) {
        this.updateUser(user._id, updatedUser);
      }
    });
  }

  // Update user in the backend and refresh the table
  updateUser(userId: string, updatedData: Partial<User>) {
    this.userService.updateUser(userId, updatedData).subscribe(
      (result) => {
        // Option 1: Refresh table by fetching users again
        this.fetchUsers();

        // Option 2: Update the data in-memory (comment the above line if using this)
        // const index = this.users.findIndex((user) => user._id === userId);
        // if (index !== -1) {
        //   this.users[index] = result;
        // }

        alert('User updated successfully!');
      },
      (error) => {
        console.error('Error updating user:', error);
        alert('Failed to update user.');
      }
    );
  }

  // Delete user from the backend and refresh the table
  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          // Refresh table by fetching users again
          this.fetchUsers();

          alert('User deleted successfully!');
        },
        (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user.');
        }
      );
    }
  }
  delete(id: string) {
    const ok = confirm('Are you sure want to delete user');
    if (ok) {
      this.userService.userDelete(id).subscribe((result) => {
        alert('user deleted successfully');
        this.users = this.users.filter((u) => u._id != id);
      });
    }
  }
}
