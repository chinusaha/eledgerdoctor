import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';

@Component({templateUrl: 'pregister.component.html'})
export class PRegisterComponent implements OnInit {
    pregisterForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.pregisterForm = this.formBuilder.group({
            
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.pregisterForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.pregisterForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.pregisterForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
