import { Component, OnInit } from '@angular/core';

import { ContactsService } from '../contacts.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getAll()
    .subscribe(data => this.contacts = data,err => {
      alert('Aconteceu um erro!');
    });

    this.contactsService.contactsChanged.subscribe(
      (observable: any) => observable.subscribe(
        data => this.contacts = data
      )
    );
  }

}
