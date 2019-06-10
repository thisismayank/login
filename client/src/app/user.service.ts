import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class users
{
    baseUrl = 'http://localhost:3000/api/app-users/login';
    getUrl = 'http://localhost:3000/api/app-users'
    http : Http;

    constructor( http : Http )
    {
        this.http = http;
    }

    public getUsers()
    {
        return this.http.get(this.getUrl);
    }

    public login(name, email, password)
    {
        const query = `?name=${name}&email=${email}&password=${password}`;
        return this.http.post(this.baseUrl + query, '');
    }

    // public deletePlayer(id)
    // {
    //     return this.http.delete(this.baseUrl + '/' + id);
    // }

    // public getById(id)
    // {
    //     return this.http.get(this.baseUrl + '/' + id);
    // }
}
