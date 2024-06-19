import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { ITodo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  public getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  public updateTodo(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        id: todo.id,
        title: randText(),
        completed: todo.completed,
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }
}
