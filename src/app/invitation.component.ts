import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule]
})
export class InvitationComponent implements OnInit, OnDestroy {
  private countdownInterval: any;
  protected personalizedGreeting = '';
  protected showPersonalizedContent = false;
  protected currentGuest: any = null;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.startCountdown();
    this.loadGuestData();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private startCountdown() {
    // Wedding date: September 6, 2025 at 14:00
    const weddingDate = new Date('2025-09-06T14:00:00').getTime();

    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');

        if (daysElement) daysElement.textContent = days.toString();
        if (hoursElement) hoursElement.textContent = hours.toString();
        if (minutesElement) minutesElement.textContent = minutes.toString();
      } else {
        // Wedding day has arrived!
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');

        if (daysElement) daysElement.textContent = '0';
        if (hoursElement) hoursElement.textContent = '0';
        if (minutesElement) minutesElement.textContent = '0';

        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  private loadGuestData() {
    this.http.get<any[]>('/guest-list.json').subscribe({
      next: (guestList) => {
        // Get inviteeId from URL query parameter
        const inviteeId = this.route.snapshot.queryParams['inviteeId'];
        
        let guest;
        if (inviteeId) {
          // Find guest by inviteeId
          guest = guestList.find(g => g.inviteeId === inviteeId);
        }
        
        // Only show personalized content if guest is found
        if (guest) {
          this.personalizedGreeting = this.generateGreeting(guest);
          this.showPersonalizedContent = true;
          this.currentGuest = guest;
        } else {
          this.showPersonalizedContent = false;
        }
      },
      error: (error) => {
        console.error('Could not load guest list:', error);
        this.showPersonalizedContent = false;
      }
    });
  }

  private generateGreeting(guest: any): string {
    const maleInvitees = guest.invitees.filter((inv: any) => inv.gender === 'Male');
    const femaleInvitees = guest.invitees.filter((inv: any) => inv.gender === 'Female');
    
    let greeting = '';
    
    // Add female greetings
    if (femaleInvitees.length > 0) {
      const femaleNames = femaleInvitees.map((inv: any) => inv.inviteeName.split(' ')[0]);
      greeting += `Liebe ${femaleNames.join(', ')}`;
    }
    
    // Add male greetings
    if (maleInvitees.length > 0) {
      const maleNames = maleInvitees.map((inv: any) => inv.inviteeName.split(' ')[0]);
      if (greeting) greeting += ', ';
      greeting += `Lieber ${maleNames.join(', ')}`;
    }
    
    // Add children if any
    let childrenText = '';
    if (guest.children && guest.children.length > 0) {
      const childrenFirstNames = guest.children.map((child: string) => child.split(' ')[0]);
      if (childrenFirstNames.length === 1) {
        childrenText = ` sowie ${childrenFirstNames[0]}`;
      } else if (childrenFirstNames.length === 2) {
        childrenText = ` sowie ${childrenFirstNames.join(' und ')}`;
      } else {
        const lastChild = childrenFirstNames.pop();
        childrenText = ` sowie ${childrenFirstNames.join(', ')} und ${lastChild}`;
      }
    }
    
    const pronoun = guest.overallCount === 1 ? 'dich' : 'euch';
    return `${greeting},\nhiermit laden wir ${pronoun}${childrenText} herzlich zu unserer Hochzeit ein.`;
  }

  protected goToRsvp() {
    // Navigate to RSVP with current query parameters
    this.router.navigate(['/rsvp'], { 
      queryParams: this.route.snapshot.queryParams 
    });
  }
}