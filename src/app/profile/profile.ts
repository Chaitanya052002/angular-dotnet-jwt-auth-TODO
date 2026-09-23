import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {
  profile: any = null;
  message = '';

  constructor(private authService: AuthService,
              private router: Router,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        console.log('PROFILE RESPONSE:', response);
        this.profile = response;
        this.cdr.detectChanges();
      },
      error: () => {
        this.message = 'Unable to load profile';
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
