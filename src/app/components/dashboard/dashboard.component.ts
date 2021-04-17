import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ChatService } from '../../shared/services/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService:AuthService,
    public chatService:ChatService) { }

  ngOnInit(): void {
  }

  sendMessage(message:any) {
    this.chatService.sendMessage(message);
  }

}
