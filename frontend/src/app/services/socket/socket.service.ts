import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoginService } from './../login/login.service';
import { StompService } from 'ng2-stomp-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketService {


  private stompConfig: any = {
    host: "/db/socket?access_token=" + this.ls.getAccessToken().replace("Bearer ", ""),
    headers: {
      [this.ls.AUTHORIZATION_HEADER]: this.ls.getAccessToken()
    },
    queue: { "init": false }
  };

  private onConnect: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private data: BehaviorSubject<any> = new BehaviorSubject<any>(null);



  constructor(
    private stomp: StompService,
    private ls: LoginService
  ) {
    this.stomp.configure(this.stompConfig);
  }



  public connect(): Observable<any> {
    this.stomp.startConnect().then(() => this.onConnect.next(true));
    return this.onConnect.asObservable();
  }


  public listenData(destination: string): Observable<any> {
    this.stomp.startConnect().then(() => this.stomp.subscribe(destination, (res) => this.data.next(res)));

    return this.data.filter(res => res != null);
  }

  public sendData(desination: string, data: any): void {
    this.stomp.startConnect().then(() => this.stomp.send(desination, data));
  }

  public disconnect = () => this.stomp.disconnect();
}