import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private dbPath = '/messages';
  messagesRef:AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { 
    this.messagesRef = db.list(this.dbPath);
   }

   getAllMessages() {
     return this.messagesRef;
   }

   sendMessage(message:Message) {
     this.messagesRef?.push(message);
   }
}
