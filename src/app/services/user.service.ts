import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:3000';
  httpClient = inject(HttpClient);

  getUsers() {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }
  updateUser(userId: string, updatedData: Partial<User>) {
    return this.httpClient.put<User>(
      `${this.apiUrl}/users/${userId}`,
      updatedData
    );
  }
  deleteUser(userId: string) {
    return this.httpClient.delete(`${this.apiUrl}/users/${userId}`);
  }
  getUser(id: string) {
    return this.httpClient.get<User>(this.apiUrl + '/users/' + id);
  }

  updUser(id: string, model: User) {
    return this.httpClient.put(this.apiUrl + '/users/' + id, model);
  }
  // addUser(user: Partial<User>) {
  //   return this.httpClient.post<User>(`${this.apiUrl}/users`, user);
  // }
  addUser(model: User) {
    return this.httpClient.post(this.apiUrl + '/users', model);
  }

  userDelete(id: string) {
    return this.httpClient.delete(this.apiUrl + '/users/' + id);
  }
}
