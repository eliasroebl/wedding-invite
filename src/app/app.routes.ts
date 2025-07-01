import { Routes } from '@angular/router';
import { InvitationComponent } from './invitation.component';
import { RsvpComponent } from './rsvp.component';

export const routes: Routes = [
  { path: '', component: InvitationComponent },
  { path: 'rsvp', component: RsvpComponent },
  { path: '**', redirectTo: '' }
];
