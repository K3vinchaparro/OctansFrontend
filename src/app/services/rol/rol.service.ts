import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private API_SERVER = "http://localhost:8080/rol/";

  constructor(private httpClient: HttpClient) { }

  public getAllRoles(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }
}
