import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts.component';
import { ContactStartComponent } from './contact-start.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactFormGuard } from './contact-form/contact-form.guard';

const CONTACTS_ROUTES: Routes = [
  { path: '', component: ContactsComponent, children: [
      { path: '', component: ContactStartComponent },
      { path: 'new', component: ContactFormComponent ,
        canDeactivate: [ContactFormGuard]},
      { path: ':id', component: ContactDetailComponent },
      { path: ':id/edit', component: ContactFormComponent,
        canDeactivate: [ContactFormGuard]}
  ]}
];

export const contactsRouting = RouterModule.forChild(CONTACTS_ROUTES);
