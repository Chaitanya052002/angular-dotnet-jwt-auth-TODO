import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TodoItem {
    id: number;
    title: string;
    description: string;
    status: string;
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'https://localhost:7225/api/Tasks'; // Replace with your API endpoint

    private http = inject(HttpClient);

    getTasks(): Observable<TodoItem[]> {
        return this.http.get<TodoItem[]>(this.apiUrl);
    }

    getTask(id: number): Observable<TodoItem> {
        return this.http.get<TodoItem>(`${this.apiUrl}/${id}`);
    }

    createTask(task: Omit<TodoItem, 'id'>): Observable<TodoItem> {
        return this.http.post<TodoItem>(this.apiUrl, task);
    }

    updateTask(id: number, task: Omit<TodoItem, 'id'>): Observable<TodoItem> {
        return this.http.put<TodoItem>(`${this.apiUrl}/${id}`, task);
    }

    deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}