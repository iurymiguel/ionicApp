import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3";
  private apiKey = "babec8854042a28106af77ad1a947677";

  constructor(public http: HttpClient) {
    console.log('Hello MoovieProvider Provider');
  }

  getLatestMovies(){
    return this.http.get(this.baseApiPath + "/movie/popular?api_key=" + this.apiKey);
  }

}
