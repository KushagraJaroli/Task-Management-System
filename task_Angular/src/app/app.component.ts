import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router'; // ✅ Import RouterModule
import { MatToolbarModule } from '@angular/material/toolbar';
import { StorageService } from './auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatToolbarModule, CommonModule], // ✅ Add RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title  = 'task_manager';
  isEmployeeLoggedIn: boolean = StorageService.isEmployeeLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  private routerSubscription!: Subscription;

  constructor(private router: Router){}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {  // ✅ Update only on NavigationEnd
        this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
      }
    });
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {  
    this.routerSubscription.unsubscribe();  // Prevent memory leaks
  }
}

