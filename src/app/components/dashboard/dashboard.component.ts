import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ChatService } from '../../shared/services/chat.service';
import { Message } from '../../shared/services/message';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  messages:Message[] | undefined;

  constructor(public authService:AuthService,
    public chatService:ChatService) { }

  ngOnInit(): void {
    this.getMessages();
  }

  sendMessage(message:string) {
    var newMessage = {
      author:this.authService.userData.displayName,
      text:message
    };
    this.chatService.sendMessage(newMessage);
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

}
