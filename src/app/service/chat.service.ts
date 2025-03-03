import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = "https://api.taqnyat.sa";
  public result:any;
  constructor(private http:HttpClient) { }
  async chatGetData(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatGetData.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatGetHistoryUser(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatGetHistoryUser.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatSearch(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatSearch.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatFastResponse(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatFastResponse.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatGetDataByNumber(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatGetHistoryData.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatHisByNumber(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatSearch.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async sendMessage(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatSendTxt.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatSeen(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatSeen.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async sendMessageTem(item:any){
    const params = new URLSearchParams(item).toString();
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatSendTemplate.php",params,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatClose(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatClose.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
  async chatAssign(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+"/chatAssign.php",JSON.stringify(item)).subscribe((data:any) => {
        return this.result = resolve(data);
      }, (err:any) => {
        console.log(err);
      });
    });
  }
}
