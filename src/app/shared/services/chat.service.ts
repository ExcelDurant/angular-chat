import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private dbPath = '/messages';
  messagesRef:AngularFireList<any> | undefined;

  constructor(private db: AngularFireDatabase) { 
    this.messagesRef = db.list(this.dbPath);
   }

   getAlMessages() {
     return this.messagesRef;
   }

   sendMessage(message:any) {
     this.messagesRef?.push(message);
   }
}
