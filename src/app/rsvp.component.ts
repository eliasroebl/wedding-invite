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
  protected rsvpData: any = {
    accepted: false,
    dietaryPreferences: '',
    anmerkung: ''
  };
  
  // Google Apps Script Web App URL
  private readonly GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwg6HfMZOpMochy4XM2pSf7pYMKztok46RVFsGZQMW90cp7wpW7u-LK2ATlByfp49ruRQ/exec';

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadGuestData();
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
        
        if (guest) {
          this.currentGuest = guest;
          this.initializeRsvpData();
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

  private initializeRsvpData() {
    if (this.currentGuest) {
      // Reset form data
      this.rsvpData.dietaryPreferences = '';
      this.rsvpData.anmerkung = '';
    }
  }

  protected backToInvitation() {
    this.router.navigate(['/'], { 
      queryParams: this.route.snapshot.queryParams 
    });
  }

  protected submitRsvp() {
    if (!this.currentGuest) {
      alert('Fehler: Keine Gästedaten gefunden.');
      return;
    }

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
      alert('Es gab ein Problem beim Speichern. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.');
      document.head.removeChild(script);
      delete (window as any)[callbackName];
    };
    
    // Add script to head to trigger the request
    document.head.appendChild(script);
  }
}