import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole!: string[];
  user!: IUser | null;

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      // clear view if no roles
      if (!this.user?.roles || this.user == null) {
        this.viewContainerRef.clear();
        return;
      }

      if (this.user?.roles?.some(r => this.appHasRole.includes(r))) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    })
  }
}
