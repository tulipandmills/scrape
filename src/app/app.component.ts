import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'scrape';

  constructor(private primengConfig: PrimeNGConfig, private router: Router) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  navHome() {
    this.router.navigateByUrl('/');
  }

  navigate(url: string) {
    setTimeout(() => { this.router.navigate([url]) }, 1)
    return true;
  }
}
