import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService, Translation } from './translation.service';

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
    accepted: true,
    dietaryPreferences: '',
    anmerkung: ''
  };
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
          // Set translation based on guest's language
          this.t = this.translationService.getTranslation(guest.language || 'de');
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
    if (!this.currentGuest) return this.t.attendanceQuestion.plural;
    return this.currentGuest.overallCount === 1 
      ? this.t.attendanceQuestion.singular
      : this.t.attendanceQuestion.plural;
  }

  protected getAcceptanceText(): string {
    if (!this.currentGuest) return this.t.acceptanceText.plural;
    return this.currentGuest.overallCount === 1
      ? this.t.acceptanceText.singular
      : this.t.acceptanceText.plural;
  }

  protected getDeclineText(): string {
    if (!this.currentGuest) return this.t.declineText.plural;
    return this.currentGuest.overallCount === 1
      ? this.t.declineText.singular
      : this.t.declineText.plural;
  }

  protected getDietaryIntroText(): string {
    if (!this.currentGuest) return this.t.dietaryIntroText.plural;
    return this.currentGuest.overallCount === 1
      ? this.t.dietaryIntroText.singular
      : this.t.dietaryIntroText.plural;
  }

  protected getCommentsPlaceholder(): string {
    if (!this.currentGuest) return this.t.commentsPlaceholder.plural;
    return this.currentGuest.overallCount === 1
      ? this.t.commentsPlaceholder.singular
      : this.t.commentsPlaceholder.plural;
  }

  protected getAlreadySubmittedText(): string {
    if (!this.currentGuest) return this.t.alreadySubmittedText.plural;
    return this.currentGuest.overallCount === 1
      ? this.t.alreadySubmittedText.singular
      : this.t.alreadySubmittedText.plural;
  }

  protected getResponseHeaderText(): string {
    if (!this.currentGuest) return this.t.responseHeaderText.plural;
    return this.currentGuest.overallCount === 1
      ? this.t.responseHeaderText.singular
      : this.t.responseHeaderText.plural;
  }

  protected getChangeNoticeText(): string {
    if (!this.currentGuest) return this.t.changeNoticeText.plural;
    return this.currentGuest.overallCount === 1
      ? this.t.changeNoticeText.singular
      : this.t.changeNoticeText.plural;
  }

  protected getSubmittedAcceptanceText(): string {
    if (!this.currentGuest) return this.rsvpData.accepted ? this.t.acceptanceText.plural : this.t.declineText.plural;
    if (this.currentGuest.overallCount === 1) {
      return this.rsvpData.accepted ? this.t.acceptanceText.singular : this.t.declineText.singular;
    } else {
      return this.rsvpData.accepted ? this.t.acceptanceText.plural : this.t.declineText.plural;
    }
  }

  protected getRsvpSubtitle(): string {
    if (!this.currentGuest) return this.t.rsvpSubtitle.plural;
    return this.currentGuest.overallCount === 1
      ? this.t.rsvpSubtitle.singular
      : this.t.rsvpSubtitle.plural;
  }

  protected getPleaseChoose(): string {
    if (!this.currentGuest) return this.t.pleaseChoose.plural;
    return this.currentGuest.overallCount === 1
      ? this.t.pleaseChoose.singular
      : this.t.pleaseChoose.plural;
  }

  protected getCommentsIntroText(): string {
    if (!this.currentGuest) return this.t.commentsIntroText.plural;
    return this.currentGuest.overallCount === 1
      ? this.t.commentsIntroText.singular
      : this.t.commentsIntroText.plural;
  }

  protected getDietaryPlaceholder(): string {
    if (!this.currentGuest) return this.t.dietaryPlaceholder.plural;
    return this.currentGuest.overallCount === 1
      ? this.t.dietaryPlaceholder.singular
      : this.t.dietaryPlaceholder.plural;
  }

  protected submitRsvp() {
    if (!this.currentGuest) {
      alert(this.t.errorNoGuestData);
      return;
    }

    if (this.hasAlreadySubmitted) {
      alert(this.t.errorAlreadySubmitted);
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
        alert(this.t.successMessage);
        this.backToInvitation();
      } else {
        alert(this.t.errorSaving);
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
      alert(this.t.errorSavingContactUs);
      document.head.removeChild(script);
      delete (window as any)[callbackName];
    };

    // Add script to head to trigger the request
    document.head.appendChild(script);
  }
}
