import { Component } from '@angular/core';
import { users } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { resolve } from 'url';

@Component({
    selector : 'user-list-mak',
    templateUrl : './user.list.component.html'
})

export class getUser{

    service : users;
    products : any[];
    name = '';
    email = '';
    password = '*********';
    loginRetryCount = 0;

    constructor( service : users, private router : Router )
    {
        this.service = service;
        this.reloadProducts();
    }

    reloadProducts(){
        this.service.getUsers().toPromise()
        .then((response)=>{
                const result_returned = response.json()[0];
                // debugger;
               this.name = result_returned.name;
               this.email = result_returned.email;
               this.loginRetryCount = result_returned.loginRetryCount;
        })
        .catch((error)=>{
            return resolve(error, 'error');
        });
    }
}