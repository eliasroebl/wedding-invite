import { Injectable } from '@angular/core';

export interface Translation {
  // Main page
  weAreGettingMarried: string;
  when: string;
  where: string;
  kletzmayrHof: string;
  address: string;
  respond: string;
  downloadInvitation: string;
  
  // Countdown
  days: string;
  hours: string;
  minutes: string;
  
  // Personalized greeting
  dear: {
    male: string;
    female: string;
  };
  and: string;
  asWellAs: string;
  invitationText: {
    singular: string;
    plural: string;
  };
  
  // RSVP
  rsvpTitle: string;
  rsvpSubtitle: {
    singular: string;
    plural: string;
  };
  alreadySubmittedTitle: string;
  backToInvitation: string;
  pleaseChoose: {
    singular: string;
    plural: string;
  };
  attendanceQuestion: {
    singular: string;
    plural: string;
  };
  acceptanceText: {
    singular: string;
    plural: string;
  };
  declineText: {
    singular: string;
    plural: string;
  };
  dietaryTitle: string;
  dietaryIntroText: {
    singular: string;
    plural: string;
  };
  dietaryPlaceholder: {
    singular: string;
    plural: string;
  };
  commentsTitle: string;
  commentsIntroText: {
    singular: string;
    plural: string;
  };
  commentsPlaceholder: {
    singular: string;
    plural: string;
  };
  alreadySubmittedText: {
    singular: string;
    plural: string;
  };
  responseHeaderText: {
    singular: string;
    plural: string;
  };
  changeNoticeText: {
    singular: string;
    plural: string;
  };
  attendanceLabel: string;
  dietaryLabel: string;
  commentsLabel: string;
  optional: string;
  sendingLabel: string;
  sendResponse: string;
  secureTransmission: string;
  
  // Thank you messages
  thankYouMessage: {
    singular: string;
    plural: string;
  };
  lookingForward: {
    singular: string;
    plural: string;
  };
  sadCantCome: {
    singular: string;
    plural: string;
  };
  
  // Errors and alerts
  errorNoGuestData: string;
  errorAlreadySubmitted: string;
  successMessage: string;
  errorSaving: string;
  errorSavingContactUs: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [key: string]: Translation } = {
    de: {
      weAreGettingMarried: 'Wir heiraten',
      when: 'Wann?',
      where: 'Wo?',
      kletzmayrHof: 'Kletzmayr Hof',
      address: 'Niederschöfring 22, 4502 St.Marien',
      respond: 'Antworten',
      downloadInvitation: 'Einladung herunterladen',
      
      days: 'Tage',
      hours: 'Stunden',
      minutes: 'Minuten',
      
      dear: {
        male: 'Lieber',
        female: 'Liebe'
      },
      and: 'und',
      asWellAs: 'sowie',
      invitationText: {
        singular: 'hiermit laden wir dich herzlich zu unserer Hochzeit ein.',
        plural: 'hiermit laden wir euch herzlich zu unserer Hochzeit ein.'
      },
      
      rsvpTitle: 'RSVP',
      rsvpSubtitle: {
        singular: 'Deine Antwort auf unsere Hochzeitseinladung',
        plural: 'Eure Antwort auf unsere Hochzeitseinladung'
      },
      alreadySubmittedTitle: 'Antwort bereits gesendet',
      backToInvitation: 'Zurück zur Einladung',
      pleaseChoose: {
        singular: 'Bitte wähle eine Option',
        plural: 'Bitte wählt eine Option'
      },
      attendanceQuestion: {
        singular: 'Kannst du an unserer Hochzeit teilnehmen?',
        plural: 'Könnt ihr an unserer Hochzeit teilnehmen?'
      },
      acceptanceText: {
        singular: 'Ja, ich komme gerne!',
        plural: 'Ja, wir kommen gerne!'
      },
      declineText: {
        singular: 'Leider kann ich nicht kommen',
        plural: 'Leider können wir nicht kommen'
      },
      dietaryTitle: 'Besondere Ernährungswünsche',
      dietaryIntroText: {
        singular: 'Falls du besondere Ernährungswünsche hast, teile sie uns gerne mit:',
        plural: 'Falls ihr besondere Ernährungswünsche habt, teilt sie uns gerne mit:'
      },
      dietaryPlaceholder: {
        singular: 'z.B. Ich bin Vegetarier...',
        plural: 'z.B. Ich bin Vegetarier, die Kinder essen nur Nudeln ohne Soße...'
      },
      commentsTitle: 'Anmerkungen',
      commentsIntroText: {
        singular: 'Hast du noch etwas, das du uns mitteilen möchtest?',
        plural: 'Habt ihr noch etwas, das ihr uns mitteilen möchtet?'
      },
      commentsPlaceholder: {
        singular: 'Hier kannst du uns alles mitteilen, was du uns wissen lassen möchtest...',
        plural: 'Hier könnt ihr uns alles mitteilen, was ihr uns wissen lassen möchtet...'
      },
      alreadySubmittedText: {
        singular: 'Vielen Dank! Du hast bereits eine Antwort auf unsere Hochzeitseinladung gesendet.',
        plural: 'Vielen Dank! Ihr habt bereits eine Antwort auf unsere Hochzeitseinladung gesendet.'
      },
      responseHeaderText: {
        singular: 'Deine Antwort:',
        plural: 'Eure Antwort:'
      },
      changeNoticeText: {
        singular: 'Falls du Änderungen vornehmen möchtest, kontaktiere uns bitte direkt.',
        plural: 'Falls ihr Änderungen vornehmen möchtet, kontaktiert uns bitte direkt.'
      },
      attendanceLabel: 'Teilnahme',
      dietaryLabel: 'Ernährungswünsche',
      commentsLabel: 'Anmerkungen',
      optional: 'Optional',
      sendingLabel: 'Wird gesendet...',
      sendResponse: 'Antwort senden',
      secureTransmission: 'Eure Antwort wird sicher übertragen und gespeichert',
      
      thankYouMessage: {
        singular: '✓ Danke für deine Rückmeldung!',
        plural: '✓ Danke für eure Rückmeldung!'
      },
      lookingForward: {
        singular: 'Wir freuen uns auf dich!',
        plural: 'Wir freuen uns auf euch!'
      },
      sadCantCome: {
        singular: 'Schade, dass du nicht kommen kannst.',
        plural: 'Schade, dass ihr nicht kommen könnt.'
      },
      
      errorNoGuestData: 'Fehler: Keine Gästedaten gefunden.',
      errorAlreadySubmitted: 'Sie haben bereits eine Antwort gesendet. Wenn Sie Änderungen vornehmen möchten, kontaktieren Sie uns bitte direkt.',
      successMessage: 'Vielen Dank für Ihre Antwort! Ihre RSVP wurde erfolgreich gespeichert.',
      errorSaving: 'Es gab ein Problem beim Speichern. Bitte versuchen Sie es erneut.',
      errorSavingContactUs: 'Es gab ein Problem beim Speichern. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.'
    },
    
    en: {
      weAreGettingMarried: 'We are getting married',
      when: 'When?',
      where: 'Where?',
      kletzmayrHof: 'Kletzmayr Hof',
      address: 'Niederschöfring 22, 4502 St.Marien',
      respond: 'Respond',
      downloadInvitation: 'Download invitation',
      
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      
      dear: {
        male: 'Dear',
        female: 'Dear'
      },
      and: 'and',
      asWellAs: 'as well as',
      invitationText: {
        singular: 'we hereby cordially invite you to our wedding.',
        plural: 'we hereby cordially invite you to our wedding.'
      },
      
      rsvpTitle: 'RSVP',
      rsvpSubtitle: {
        singular: 'Your response to our wedding invitation',
        plural: 'Your response to our wedding invitation'
      },
      alreadySubmittedTitle: 'Response already sent',
      backToInvitation: 'Back to invitation',
      pleaseChoose: {
        singular: 'Please choose an option',
        plural: 'Please choose an option'
      },
      attendanceQuestion: {
        singular: 'Can you attend our wedding?',
        plural: 'Can you attend our wedding?'
      },
      acceptanceText: {
        singular: 'Yes, I would love to come!',
        plural: 'Yes, we would love to come!'
      },
      declineText: {
        singular: 'Unfortunately, I cannot come',
        plural: 'Unfortunately, we cannot come'
      },
      dietaryTitle: 'Special dietary requirements',
      dietaryIntroText: {
        singular: 'If you have special dietary requirements, please let us know:',
        plural: 'If you have special dietary requirements, please let us know:'
      },
      dietaryPlaceholder: {
        singular: 'e.g. I am vegetarian...',
        plural: 'e.g. I am vegetarian, the children only eat plain pasta...'
      },
      commentsTitle: 'Comments',
      commentsIntroText: {
        singular: 'Do you have anything else you would like to tell us?',
        plural: 'Do you have anything else you would like to tell us?'
      },
      commentsPlaceholder: {
        singular: 'Here you can tell us anything you would like us to know...',
        plural: 'Here you can tell us anything you would like us to know...'
      },
      alreadySubmittedText: {
        singular: 'Thank you! You have already sent a response to our wedding invitation.',
        plural: 'Thank you! You have already sent a response to our wedding invitation.'
      },
      responseHeaderText: {
        singular: 'Your response:',
        plural: 'Your response:'
      },
      changeNoticeText: {
        singular: 'If you would like to make changes, please contact us directly.',
        plural: 'If you would like to make changes, please contact us directly.'
      },
      attendanceLabel: 'Attendance',
      dietaryLabel: 'Dietary requirements',
      commentsLabel: 'Comments',
      optional: 'Optional',
      sendingLabel: 'Sending...',
      sendResponse: 'Send response',
      secureTransmission: 'Your response will be transmitted and stored securely',
      
      thankYouMessage: {
        singular: '✓ Thank you for your response!',
        plural: '✓ Thank you for your response!'
      },
      lookingForward: {
        singular: 'We look forward to seeing you!',
        plural: 'We look forward to seeing you!'
      },
      sadCantCome: {
        singular: 'We are sorry that you cannot come.',
        plural: 'We are sorry that you cannot come.'
      },
      
      errorNoGuestData: 'Error: No guest data found.',
      errorAlreadySubmitted: 'You have already sent a response. If you would like to make changes, please contact us directly.',
      successMessage: 'Thank you for your response! Your RSVP has been successfully saved.',
      errorSaving: 'There was a problem saving. Please try again.',
      errorSavingContactUs: 'There was a problem saving. Please try again or contact us directly.'
    },
    
    ro: {
      weAreGettingMarried: 'Ne căsătorim',
      when: 'Când?',
      where: 'Unde?',
      kletzmayrHof: 'Kletzmayr Hof',
      address: 'Niederschöfring 22, 4502 St.Marien',
      respond: 'Răspunde',
      downloadInvitation: 'Descarcă invitația',
      
      days: 'Zile',
      hours: 'Ore',
      minutes: 'Minute',
      
      dear: {
        male: 'Dragă',
        female: 'Dragă'
      },
      and: 'și',
      asWellAs: 'precum și',
      invitationText: {
        singular: 'prin aceasta te invităm cu drag la nunta noastră.',
        plural: 'prin aceasta vă invităm cu drag la nunta noastră.'
      },
      
      rsvpTitle: 'RSVP',
      rsvpSubtitle: {
        singular: 'Răspunsul tău la invitația noastră de nuntă',
        plural: 'Răspunsul vostru la invitația noastră de nuntă'
      },
      alreadySubmittedTitle: 'Răspuns deja trimis',
      backToInvitation: 'Înapoi la invitație',
      pleaseChoose: {
        singular: 'Te rog să alegi o opțiune',
        plural: 'Vă rugăm să alegeți o opțiune'
      },
      attendanceQuestion: {
        singular: 'Poți participa la nunta noastră?',
        plural: 'Puteți participa la nunta noastră?'
      },
      acceptanceText: {
        singular: 'Da, vin cu plăcere!',
        plural: 'Da, venim cu plăcere!'
      },
      declineText: {
        singular: 'Din păcate nu pot veni',
        plural: 'Din păcate nu putem veni'
      },
      dietaryTitle: 'Cerințe alimentare speciale',
      dietaryIntroText: {
        singular: 'Dacă ai cerințe alimentare speciale, te rog să ne anunți:',
        plural: 'Dacă aveți cerințe alimentare speciale, vă rugăm să ne anunțați:'
      },
      dietaryPlaceholder: {
        singular: 'ex. Sunt vegetarian...',
        plural: 'ex. Sunt vegetarian, copiii mănâncă doar paste simple...'
      },
      commentsTitle: 'Comentarii',
      commentsIntroText: {
        singular: 'Mai ai ceva ce vrei să ne spui?',
        plural: 'Mai aveți ceva ce vreți să ne spuneți?'
      },
      commentsPlaceholder: {
        singular: 'Aici ne poți spune tot ce vrei să știm...',
        plural: 'Aici ne puteți spune tot ce vreți să știm...'
      },
      alreadySubmittedText: {
        singular: 'Mulțumim! Ai trimis deja un răspuns la invitația noastră de nuntă.',
        plural: 'Mulțumim! Ați trimis deja un răspuns la invitația noastră de nuntă.'
      },
      responseHeaderText: {
        singular: 'Răspunsul tău:',
        plural: 'Răspunsul vostru:'
      },
      changeNoticeText: {
        singular: 'Dacă vrei să faci modificări, te rog să ne contactezi direct.',
        plural: 'Dacă vreți să faceți modificări, vă rugăm să ne contactați direct.'
      },
      attendanceLabel: 'Participare',
      dietaryLabel: 'Cerințe alimentare',
      commentsLabel: 'Comentarii',
      optional: 'Opțional',
      sendingLabel: 'Se trimite...',
      sendResponse: 'Trimite răspuns',
      secureTransmission: 'Răspunsul tău va fi transmis și stocat în siguranță',
      
      thankYouMessage: {
        singular: '✓ Mulțumim pentru răspuns!',
        plural: '✓ Mulțumim pentru răspuns!'
      },
      lookingForward: {
        singular: 'Ne bucurăm să te vedem!',
        plural: 'Ne bucurăm să vă vedem!'
      },
      sadCantCome: {
        singular: 'Ne pare rău că nu poți veni.',
        plural: 'Ne pare rău că nu puteți veni.'
      },
      
      errorNoGuestData: 'Eroare: Nu s-au găsit date despre oaspete.',
      errorAlreadySubmitted: 'Ai trimis deja un răspuns. Dacă vrei să faci modificări, te rog să ne contactezi direct.',
      successMessage: 'Mulțumim pentru răspuns! RSVP-ul tău a fost salvat cu succes.',
      errorSaving: 'A fost o problemă la salvare. Te rog să încerci din nou.',
      errorSavingContactUs: 'A fost o problemă la salvare. Te rog să încerci din nou sau să ne contactezi direct.'
    }
  };

  getTranslation(language: string): Translation {
    return this.translations[language] || this.translations['de'];
  }

  getLanguages(): string[] {
    return Object.keys(this.translations);
  }
}