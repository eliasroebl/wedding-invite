import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RsvpComponent implements OnInit {
  protected currentGuest: any = null;
  protected hasAlreadySubmitted: boolean = false;
  protected isSubmitting: boolean = false;
  protected rsvpData: any = {
    accepted: false,
    dietaryPreferences: '',
    anmerkung: ''
  };

  // Google Apps Script Web App URL
  private readonly GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjJN8k-qcZzVUX3uBtZLy-DPoGaSRD6pmfgXD6j9qV_6DdJhIixhCNMyzlEgvMOgXNOg/exec';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadGuestData();
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

        if (guest) {
          this.currentGuest = guest;
          this.checkExistingSubmission();
        } else {
          // If no guest found, redirect back to invitation
          this.router.navigate(['/'], {
            queryParams: this.route.snapshot.queryParams
          });
        }
      },
      error: (error) => {
        console.error('Could not load guest list:', error);
        // If error loading guest data, redirect back to invitation
        this.router.navigate(['/'], {
          queryParams: this.route.snapshot.queryParams
        });
      }
    });
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
        // Optionally load existing data to show what they submitted
        if (response.data) {
          this.rsvpData.accepted = response.data.accepted === 'Ja';
          this.rsvpData.dietaryPreferences = response.data.dietaryPreferences || '';
          this.rsvpData.anmerkung = response.data.anmerkung || '';
        }
      } else {
        this.hasAlreadySubmitted = false;
        this.initializeRsvpData();
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
      this.initializeRsvpData();
      document.head.removeChild(script);
      delete (window as any)[callbackName];
    };

    // Add script to head to trigger the request
    document.head.appendChild(script);
  }

  private initializeRsvpData() {
    if (this.currentGuest) {
      // Set default values
      this.rsvpData.accepted = true;
      this.rsvpData.dietaryPreferences = '';
      this.rsvpData.anmerkung = '';
    }
  }

  protected backToInvitation() {
    this.router.navigate(['/'], {
      queryParams: this.route.snapshot.queryParams
    });
  }

  protected getAttendanceQuestion(): string {
    if (!this.currentGuest) return 'Könnt ihr an unserer Hochzeit teilnehmen?';
    return this.currentGuest.overallCount === 1 
      ? 'Kannst du an unserer Hochzeit teilnehmen?'
      : 'Könnt ihr an unserer Hochzeit teilnehmen?';
  }

  protected getAcceptanceText(): string {
    if (!this.currentGuest) return 'Ja, wir kommen gerne!';
    return this.currentGuest.overallCount === 1
      ? 'Ja, ich komme gerne!'
      : 'Ja, wir kommen gerne!';
  }

  protected getDeclineText(): string {
    if (!this.currentGuest) return 'Leider können wir nicht kommen';
    return this.currentGuest.overallCount === 1
      ? 'Leider kann ich nicht kommen'
      : 'Leider können wir nicht kommen';
  }

  protected getDietaryIntroText(): string {
    if (!this.currentGuest) return 'Falls ihr besondere Ernährungswünsche habt, teilt sie uns gerne mit:';
    return this.currentGuest.overallCount === 1
      ? 'Falls du besondere Ernährungswünsche hast, teile sie uns gerne mit:'
      : 'Falls ihr besondere Ernährungswünsche habt, teilt sie uns gerne mit:';
  }

  protected getCommentsPlaceholder(): string {
    if (!this.currentGuest) return 'Hier könnt ihr uns alles mitteilen, was ihr uns wissen lassen möchtet...';
    return this.currentGuest.overallCount === 1
      ? 'Hier kannst du uns alles mitteilen, was du uns wissen lassen möchtest...'
      : 'Hier könnt ihr uns alles mitteilen, was ihr uns wissen lassen möchtet...';
  }

  protected getAlreadySubmittedText(): string {
    if (!this.currentGuest) return 'Vielen Dank! Ihr habt bereits eine Antwort auf unsere Hochzeitseinladung gesendet.';
    return this.currentGuest.overallCount === 1
      ? 'Vielen Dank! Du hast bereits eine Antwort auf unsere Hochzeitseinladung gesendet.'
      : 'Vielen Dank! Ihr habt bereits eine Antwort auf unsere Hochzeitseinladung gesendet.';
  }

  protected getResponseHeaderText(): string {
    if (!this.currentGuest) return 'Eure Antwort:';
    return this.currentGuest.overallCount === 1
      ? 'Deine Antwort:'
      : 'Eure Antwort:';
  }

  protected getChangeNoticeText(): string {
    if (!this.currentGuest) return 'Falls ihr Änderungen vornehmen möchtet, kontaktiert uns bitte direkt.';
    return this.currentGuest.overallCount === 1
      ? 'Falls du Änderungen vornehmen möchtest, kontaktiere uns bitte direkt.'
      : 'Falls ihr Änderungen vornehmen möchtet, kontaktiert uns bitte direkt.';
  }

  protected getSubmittedAcceptanceText(): string {
    if (!this.currentGuest) return this.rsvpData.accepted ? 'Ja, wir kommen gerne!' : 'Leider können wir nicht kommen';
    if (this.currentGuest.overallCount === 1) {
      return this.rsvpData.accepted ? 'Ja, ich komme gerne!' : 'Leider kann ich nicht kommen';
    } else {
      return this.rsvpData.accepted ? 'Ja, wir kommen gerne!' : 'Leider können wir nicht kommen';
    }
  }

  protected submitRsvp() {
    if (!this.currentGuest) {
      alert('Fehler: Keine Gästedaten gefunden.');
      return;
    }

    if (this.hasAlreadySubmitted) {
      alert('Sie haben bereits eine Antwort gesendet. Wenn Sie Änderungen vornehmen möchten, kontaktieren Sie uns bitte direkt.');
      return;
    }

    if (this.isSubmitting) {
      return; // Prevent double submission
    }

    // Set loading state
    this.isSubmitting = true;

    // Prepare the data to send
    const submitData = {
      guest: this.currentGuest,
      rsvpData: this.rsvpData
    };

    console.log('Submitting RSVP:', submitData);

    // Use JSONP approach with dynamic script tag to bypass CORS
    const callbackName = 'rsvpCallback' + Date.now();

    // Create global callback function
    (window as any)[callbackName] = (response: any) => {
      console.log('RSVP successfully submitted:', response);
      this.isSubmitting = false; // Reset loading state
      
      if (response.status === 'success') {
        alert('Vielen Dank für Ihre Antwort! Ihre RSVP wurde erfolgreich gespeichert.');
        this.backToInvitation();
      } else {
        alert('Es gab ein Problem beim Speichern. Bitte versuchen Sie es erneut.');
      }
      // Clean up
      document.head.removeChild(script);
      delete (window as any)[callbackName];
    };

    // Create script element
    const script = document.createElement('script');
    const params = new URLSearchParams();
    params.append('inviteeId', this.currentGuest.inviteeId);
    params.append('guestNames', this.currentGuest.invitees.map((inv: any) => inv.inviteeName).join(', '));
    params.append('children', this.currentGuest.children ? this.currentGuest.children.join(', ') : '');
    params.append('overallCount', this.currentGuest.overallCount.toString());
    params.append('accepted', this.rsvpData.accepted ? 'Ja' : 'Nein');
    params.append('dietaryPreferences', this.rsvpData.dietaryPreferences || '');
    params.append('anmerkung', this.rsvpData.anmerkung || '');
    params.append('callback', callbackName);

    script.src = `${this.GOOGLE_SCRIPT_URL}?${params.toString()}`;
    script.onerror = () => {
      this.isSubmitting = false; // Reset loading state on error
      alert('Es gab ein Problem beim Speichern. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.');
      document.head.removeChild(script);
      delete (window as any)[callbackName];
    };

    // Add script to head to trigger the request
    document.head.appendChild(script);
  }
}
