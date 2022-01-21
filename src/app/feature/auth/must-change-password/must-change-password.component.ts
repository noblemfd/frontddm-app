import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/shared/validators/must-match-validator';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Component({
  selector: 'app-must-change-password',
  templateUrl: './must-change-password.component.html',
  styleUrls: ['./must-change-password.component.scss']
})
export class MustChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  isLoading = false;
  isSubmitted = false;
  // CurrentPassword!: FormControl;
  // NewPassword!: FormControl;
  // ConfirmNewPassword!: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    const formOptions: AbstractControlOptions = { validators: MustMatch('NewPassword', 'ConfirmNewPassword') };
    this.changePasswordForm = this.fb.group({
      CurrentPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      NewPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      ConfirmNewPassword: ['', [Validators.required]]
    }, formOptions);
  }

  get f() { return this.changePasswordForm.controls; }

  onSubmit() {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }

    const formData = this.changePasswordForm.getRawValue();

    const CurrentPassword = formData.CurrentPassword;
    const NewPassword = formData.NewPassword;
    const ConfirmNewPassword = formData.ConfirmNewPassword;

    this.isLoading = true;
    this.authService.mustChangePassword(CurrentPassword, NewPassword, ConfirmNewPassword).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.router.navigateByUrl('/auth');
      },
      error: (error) => {
        this.toastr.error(error.message);
      }
    })
  }
}
