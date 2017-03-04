import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Contact } from './contact';

@Injectable()
export class ContactsService {

  contactsChanged = new EventEmitter<Observable<Contact[]>>();

  private url: string = 'app/contacts';

  constructor(private http: Http) { }

  getAll(): Observable<Contact[]> {
    return this.http.get(this.url)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  get(id){
    return this.getAll()
      .map((list: any) => list.find(contact => contact.id == id))
      .catch(this.handleError);
  }

  add(record){
    return this.http.post(this.url, JSON.stringify(record),
        {headers: this.getHeaders()})
      .map(res => res.json().data)
      .do(data => this.contactsChanged.emit(this.getAll()))
      .catch(this.handleError);
  }

  update(record){
    return this.http.put(this.getUrl(record.id), JSON.stringify(record), {headers: this.getHeaders()})
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  remove(id){
    return this.http.delete(this.getUrl(id), {headers: this.getHeaders()})
      .map(res => res.json())
      .do(data => this.contactsChanged.emit(this.getAll()))
      .catch(this.handleError);
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  private handleError(error: any) {
    let erro = error.message || 'Server error';
    console.error('Ocorreu um erro', error);
    return Observable.throw(erro);
  }

  private getUrl(id){
    return `${this.url}/${id}`;
  }
}
