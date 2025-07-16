import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService, Translation } from './translation.service';

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
  protected hasAlreadySubmitted = false;
  protected rsvpResponse: any = null;
  protected t: Translation;
  
  // Google Apps Script Web App URL
  private readonly GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjJN8k-qcZzVUX3uBtZLy-DPoGaSRD6pmfgXD6j9qV_6DdJhIixhCNMyzlEgvMOgXNOg/exec';

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    private translationService: TranslationService
  ) {
    this.t = this.translationService.getTranslation('de'); // Default to German
  }

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
    this.http.get<any[]>('guest-list.json').subscribe({
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
          // Set translation based on guest's language
          this.t = this.translationService.getTranslation(guest.language || 'de');
          this.personalizedGreeting = this.generateGreeting(guest);
          this.showPersonalizedContent = true;
          this.currentGuest = guest;
          this.checkExistingSubmission();
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
      greeting += `${this.t.dear.female} ${femaleNames.join(', ')}`;
    }
    
    // Add male greetings
    if (maleInvitees.length > 0) {
      const maleNames = maleInvitees.map((inv: any) => inv.inviteeName.split(' ')[0]);
      if (greeting) greeting += ', ';
      greeting += `${this.t.dear.male} ${maleNames.join(', ')}`;
    }
    
    // Add children if any
    let childrenText = '';
    if (guest.children && guest.children.length > 0) {
      const childrenFirstNames = guest.children.map((child: string) => child.split(' ')[0]);
      if (childrenFirstNames.length === 1) {
        childrenText = ` ${this.t.asWellAs} ${childrenFirstNames[0]}`;
      } else if (childrenFirstNames.length === 2) {
        childrenText = ` ${this.t.asWellAs} ${childrenFirstNames.join(` ${this.t.and} `)}`;
      } else {
        const lastChild = childrenFirstNames.pop();
        childrenText = ` ${this.t.asWellAs} ${childrenFirstNames.join(', ')} ${this.t.and} ${lastChild}`;
      }
    }
    
    const invitationText = guest.overallCount === 1 ? this.t.invitationText.singular : this.t.invitationText.plural;
    return `${greeting},\n${invitationText}${childrenText}`;
  }

  private checkExistingSubmission() {
    if (!this.currentGuest) return;
    
    // Check if this guest has already submitted an RSVP
    const callbackName = 'checkRsvpCallback' + Date.now();
    
    // Create global callback function
    (window as any)[callbackName] = (response: any) => {
      console.log('RSVP check response:', response);
      if (response.status === 'exists') {
        this.hasAlreadySubmitted = true;
        this.rsvpResponse = response.data;
      } else {
        this.hasAlreadySubmitted = false;
        this.rsvpResponse = null;
      }
      // Clean up
      document.head.removeChild(script);
      delete (window as any)[callbackName];
    };
    
    // Create script element for checking existing submission
    const script = document.createElement('script');
    const params = new URLSearchParams();
    params.append('action', 'check');
    params.append('inviteeId', this.currentGuest.inviteeId);
    params.append('callback', callbackName);
    
    script.src = `${this.GOOGLE_SCRIPT_URL}?${params.toString()}`;
    script.onerror = () => {
      console.error('Error checking existing RSVP');
      // If we can't check, assume they haven't submitted yet
      this.hasAlreadySubmitted = false;
      document.head.removeChild(script);
      delete (window as any)[callbackName];
    };
    
    // Add script to head to trigger the request
    document.head.appendChild(script);
  }

  protected goToRsvp() {
    // Navigate to RSVP with current query parameters
    this.router.navigate(['/rsvp'], { 
      queryParams: this.route.snapshot.queryParams 
    });
  }

  protected getThankYouMessage(): string {
    if (!this.currentGuest || !this.rsvpResponse) {
      return this.currentGuest?.overallCount === 1 
        ? this.t.thankYouMessage.singular
        : this.t.thankYouMessage.plural;
    }

    const isAccepted = this.rsvpResponse.accepted === 'Ja';
    const isSingular = this.currentGuest.overallCount === 1;
    
    let thankYouText = isSingular 
      ? this.t.thankYouMessage.singular
      : this.t.thankYouMessage.plural;
    
    if (isAccepted) {
      thankYouText += '\n' + (isSingular 
        ? this.t.lookingForward.singular
        : this.t.lookingForward.plural);
    } else {
      thankYouText += '\n' + (isSingular
        ? this.t.sadCantCome.singular
        : this.t.sadCantCome.plural);
    }
    
    return thankYouText;
  }
}