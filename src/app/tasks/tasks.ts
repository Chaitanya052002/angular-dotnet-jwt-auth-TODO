import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { TaskService, TodoItem } from '../services/task.service';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [ReactiveFormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {

  isLoading = true;
  isAdding = false;
  isEditing = false;
  editingTaskId: number | null = null;
  
  private taskService = inject(TaskService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  taskForm = this.fb.nonNullable.group({
  title: ['', Validators.required],
  description: ['', Validators.required],
  status: ['Pending', Validators.required]
});

  tasks: TodoItem[] = [];
  message = '';

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;

    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasks = response;
        this.isLoading = false; 
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.message = 'Unable to load tasks';
        this.cdr.detectChanges();
      }
    });
  }

  addTask() {
    console.log('Add Task button clicked');
    this.isAdding = true;
  }

  cancelAdd() {
  this.isAdding = false;
  this.isEditing = false;
  this.editingTaskId = null;

  this.taskForm.reset({
    title: '',
    description: '',
    status: 'Pending'
  });
  }

  createTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.taskService.createTask(
      this.taskForm.getRawValue()
    ).subscribe({
      next: (response) => {
        this.tasks.push(response);
        this.cancelAdd();
        this.cdr.detectChanges();
      },
      error: () => {
        this.message = 'Unable to create task';
        this.cdr.detectChanges();
      }
    });
  }

  editTask(task: TodoItem) {
  this.isEditing = true;
  this.isAdding = false;
  this.editingTaskId = task.id;

  this.taskForm.patchValue({
    title: task.title,
    description: task.description,
    status: task.status
  });
  }

  updateTask() {
  if (this.taskForm.invalid || this.editingTaskId === null) {
    this.taskForm.markAllAsTouched();
    return;
  }

  this.taskService.updateTask(
    this.editingTaskId,
    this.taskForm.getRawValue()
  ).subscribe({
    next: (updatedTask) => {

      const index = this.tasks.findIndex(
        task => task.id === this.editingTaskId
      );

      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }

      this.cancelAdd();
      this.cdr.detectChanges();
    },
    error: () => {
      this.message = 'Unable to update task';
      this.cdr.detectChanges();
    }
  });
}

deleteTask(id: number) {
  this.taskService.deleteTask(id).subscribe({
    next: () => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.cdr.detectChanges();
    },
    error: () => {
      this.message = 'Unable to delete task';
      this.cdr.detectChanges();
    }
  });
}

}