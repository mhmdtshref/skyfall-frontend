import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router
  ) { }

  navigateToGame = () => {
    this.router.navigate(['game']);
  }

  navigateToHome = () => {
    this.router.navigate(['']);
  }
}
