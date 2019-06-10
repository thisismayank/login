import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { users } from '../user.service';

@Component({
    selector : 'login-mak',
    templateUrl : './login.user.component.html',
    styleUrls : ['./login.user.component.css']
})

export class login
{
    service : users;

    constructor( service: users, private router: Router, private route : ActivatedRoute )
    {
        this.service = service;
    }

    name = '';
    email = '';
    password = '';

    errorStatus = false;
    error = '';
    timer = 0;
    message = '';

    onSave()
    {
        this.service.login(this.name, this.email, this.password).toPromise()
        .then((response: any)=>{
            if(JSON.parse(response['_body']).status === true) {
                this.router.navigate(['/data']);
            } else {
                var i = 0;
                setTimeout(()=>{
                    clearInterval(myTimer);
                    i = 0;
                    this.errorStatus = false;
                }, 6000);
                this.message = 'Reloading in: '
                var myTimer = setInterval(()=>{
                    this.timer = i;
                    i = i + 1;
                }, 1000);
                this.errorStatus = true;
                this.error = 'error = ' + JSON.parse(response['_body']).error;
            }
        });
    }

    onCancel()
    {
        this.name = '';
        this.email = '';
        this.password = '' ;
        this.router.navigate(['/login']);
    }
    
}