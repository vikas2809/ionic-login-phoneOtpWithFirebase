import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatePipe } from '@angular/common';
import { Injectable } from "@angular/core";

@Injectable()
export class UserService{

    public url:string='http://192.168.12.73:7500/api/';
    headers: Headers;
    options: RequestOptions;
    constructor(private http: Http,private datePipe:DatePipe){}

    addUser(userInfo){
        console.log(userInfo);
        return this.http.post(this.url+"v1/user/createUser ",userInfo,this.options)
        .map(res=>res.json())
    }

    authenticateUser(validUser){
        console.log(validUser);
        return this.http.post(this.url+"v1/user/authenticateUser",validUser,this.options).map(res=>res.json());
    }

    transformDate(myDate) {
        return this.datePipe.transform(myDate, 'yyyy-MM-dd hh:mm:ss');
      }

}