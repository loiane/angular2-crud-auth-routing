import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs/Rx';

import { ContactsService } from '../contacts.service';
import { Contact } from '../contact';
import { BasicValidators } from '../../shared/basic-validators';
import { ComponentCanDeactivate } from './contact-form.guard';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  form: FormGroup;
  private contactIndex: number;
  private title: string;
  private isNew: boolean = true;
  private contact: Contact;
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contactsService: ContactsService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.contactIndex = +params['id'];
          this.contactsService.get(this.contactIndex)
          .subscribe(data => this.contact = data);
          this.title = 'Edit contact';
        } else {
          this.isNew = true;
          this.contact = new Contact();
          this.title = 'New contact';
        }
        this.initForm();
      }
    );
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        BasicValidators.email
        //Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      phone: this.formBuilder.group({
        phoneNumber: []
      })
    });
  }

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigate(['/contacts']);
  }

  onSave() {
    const contactValue = this.form.value;
    let result;

    if (this.isNew){
      result = this.contactsService.update(contactValue);
    } else {
      result = this.contactsService.add(contactValue);
    }

    this.form.reset();

    result.subscribe(data => this.navigateBack(),
    err => {
      alert("An error occurred.");
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      return confirm('Do you want to leave this page?');
    }
    return true;
  }
}
