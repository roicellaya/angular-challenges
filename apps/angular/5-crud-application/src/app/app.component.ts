import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { ITodo } from './models/todo';
import { TodoService } from './services/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos: WritableSignal<ITodo[]> = signal([]);
  private readonly todoService = inject(TodoService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.todoService
      .getTodos()
      .pipe(
        tap((todos) => this.todos.update(() => [...todos])),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  update(todo: ITodo) {
    this.todoService
      .updateTodo(todo)
      .pipe(
        tap((todoUpdated) => {
          this.todos.update(() =>
            this.todos().map((todo) => {
              if (todo.id !== todoUpdated.id) {
                return todo;
              }
              return todoUpdated;
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
