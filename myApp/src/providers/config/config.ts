import { Injectable } from '@angular/core';

let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: "",
    username: ""
  }

  constructor() {
    
  }

  //retreives information from local storage.
  getConfigData(): any{
      return localStorage.getItem(config_key_name);
  }

  //Saves information in local storage. ? means that the field is optional (it can be null).
  setConfigData(showSlide?: boolean, name?: string, username?: string){
     let config = {
      showSlide: false,
      name: "",
      username: ""
     }

     if(showSlide){
       config.showSlide = showSlide;
     }

     if(name){
       config.name = name;
     }

     if(username){
       config.username = username;
     }

     localStorage.setItem(config_key_name,JSON.stringify(config));

  }
  
}
