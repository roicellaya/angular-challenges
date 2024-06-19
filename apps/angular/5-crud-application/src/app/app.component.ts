import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
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

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos.update(() => [...todos]);
    });
  }

  update(todo: ITodo) {
    this.todoService.updateTodo(todo).subscribe((todoUpdated: ITodo) => {
      this.todos.update(() => [
        ...this.todos().filter((t) => t.id !== todoUpdated.id),
        todoUpdated,
      ]);
    });
  }
}
