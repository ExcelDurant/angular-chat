import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ChatService } from '../../shared/services/chat.service';
import { Message } from '../../shared/services/message';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  messages:Message[] | undefined;
  myDate = new Date();
  time:any;

  messageForm = new FormGroup({
    message: new FormControl(''),
  });

  constructor(public authService:AuthService,
    public chatService:ChatService, private datePipe: DatePipe) { 
     }

  ngOnInit(): void {
    this.getMessages();
    // console.log((new Date()).transform(this.myDate, 'M/d/yy, h:mm a');
    setInterval(() => {
      this.myDate = new Date();
      this.time = this.datePipe.transform(this.myDate, 'M/d/yy, h:mm a');
   }, 1000);
  }

  sendMessage() {
    const msg = this.messageForm.value.message;
    var newMessage = {
      author:this.authService.userData.displayName,
      text:msg,
      time:this.time
    };
    this.chatService.sendMessage(newMessage);
    this.messageForm.setValue({
      message:''
    })
  }

  getMessages(): void {
    this.chatService.getAllMessages().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data);
      this.messages = data;
    });
  }

  // getTime() {
  //   var date = new Date();
  //   var time;
  //   time = date.transform(date, 'M/d/yy, h:mm a');
  // }

}
