import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { ContactsService } from '../contacts.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit, OnDestroy {

  selectedContact: Contact;
  private contactIndex: number;
  private subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contactsService: ContactsService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.contactIndex = params['id'];
        this.contactsService.get(this.contactIndex)
        .subscribe(data => this.selectedContact = data);
      }
    );
  }

  onEdit() {
    this.router.navigate(['/contacts', this.contactIndex, 'edit']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(){
    if (confirm("Are you sure you want to delete " + this.selectedContact.name + "?")) {
      this.contactsService.remove(this.selectedContact.id)
        .subscribe(
          data => this.router.navigate(['/contacts']),
          err => {
            alert("Contato não removido.");
          });
    }
  }
}
