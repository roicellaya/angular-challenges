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
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ITodo } from './models/todo';
import { TodoService } from './services/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  selector: 'app-root',
  template: `
    <app-spinner></app-spinner>
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
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

  delete(todo: ITodo) {
    this.todoService
      .deleteTodo(todo)
      .pipe(
        tap(() => {
          this.todos.update(() => this.todos().filter((t) => t.id !== todo.id));
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
