import {Component, ViewChild} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {NavigationEnd, Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {delay, filter} from "rxjs/operators";
import {SecurityService} from "../../arquitetura/security/security.service";
import {MessageService} from "../../arquitetura/message/message.service";

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private mensageService: MessageService,
    private securityService: SecurityService) {
  }

  ngOnInit(): void {
    if (this.securityService.credential.login !== 'admin') {
      this.router.navigate(['/']);
      this.mensageService.addConfirmOk(`Você não tem acesso a essa área`);
    }
    if (!this.securityService.isValid())
      this.router.navigate(['/acesso']);
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  sair() {
    this.securityService.invalidate();
    this.router.navigate(['/acesso']);
  }
}
