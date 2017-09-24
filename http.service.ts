import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class HttpService {
  urlUserDetail: string = "http://jsonplaceholder.typicode.com/users/1";
  urlUserPost: string = "http://jsonplaceholder.typicode.com/posts?userId=1";

  constructor(public http:Http) { }

  getUserDetail(){
    return this.http.get(this.urlUserDetail);
  }

  getUserPosts(){
    return this.http.get(this.urlUserPost);
  }

} 
