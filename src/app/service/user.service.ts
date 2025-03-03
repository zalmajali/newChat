import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "https://api.taqnyat.sa";
  public result:any;
  constructor(private http:HttpClient) { }
  async login(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatLogin.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        return resolve(err); 
      });
    });
  }
  async changeStatus(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatUserStatus.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatSetMobileInfo(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatSetMobileInfo.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatGetMobileInfo(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatGetMobileInfo.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatGetUser(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatGetUser.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatGetDepartment(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatGetDepartment.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatGetTemplate(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatGetTemplate.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
}
