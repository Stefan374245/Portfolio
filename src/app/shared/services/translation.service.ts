import { Injectable, signal } from '@angular/core';
import { Translation, Language } from '../interfaces/translation.interface';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly STORAGE_KEY = 'selectedLanguage';

  private translations: Record<Language, Translation> = {
    EN: {
      navigation: {
        aboutMe: 'About me',
        skills: 'Skills',
        portfolio: 'Portfolio',
      },
      sections: {
        hero: {
          greeting: "Hello, I'm",
          name: 'Stefan',
          role: 'Frontend Developer',
          description:
            'I am a passionate frontend developer who loves creating amazing user experiences with modern web technologies.',
          contactBtn: 'Contact me',
        },
        about: {
          title: 'About me',
          description:
            'I am a passionate frontend developer with a strong foundation in modern web technologies. My journey in programming started with curiosity and has grown into a dedication to creating exceptional user experiences. I love solving complex problems and turning creative ideas into functional, beautiful applications.',
          points: {
            location:
              'Where are you located? Are you open to different ways of working, such as working remotely or even relocating?',
            passion:
              'Show that you are open-minded. Are you enthusiastic about learning new technologies and continually improving your skills?',
            collaboration:
              'A brief description of your problem-solving approach. Do you learnfrom each challenge as you search for the most efficient or elegantsolution? You can include some keywords like: analytical thinking, creativity, persistence and collaboration.',
          },
        },
        skills: {
          title: 'Skills',
          description:
            'Highlight your experience of working on different projects using different front-end technologies (such as HTML, CSS, JavaScript, etc.) and emphasise your openness to learning and adapting to new technologies. Mention the importance of continuing education to keep up with the rapid changes in web development.',
          subtitle: "Technologies I've been working with recently",
          learning: {
            title: 'Looking for',
            highlight: 'another skill',
            description:
              'Reveal enthusiasm for learning new technologies and frameworks.',
            contactBtn: 'Get in touch',
          },
        },
        portfolio: {
          title: 'Portfolio',
          description:
            'Explore some of my recent projects that showcase my skills and creativity.',
          viewProject: 'View Project',
          liveDemo: 'Live Test',
          sourceCode: 'Github',
        },
        contact: {
          title: 'Contact',
          description: "Let's get in touch and discuss your project ideas.",
          subtitle: 'Got a problem to solve?',
          form: {
            name: 'Your name',
            email: 'Your email',
            message: 'Your message',
            send: 'Send message',
            sending: 'Sending...',
            success: 'Message sent successfully!',
            error: 'Error sending message. Please try again.',
            contactBtn: 'Contact me!',
            ctaText: 'Need a Frontend developer?',
            privacyText: "I've read the",
            privacyLink: 'privacy policy',
            privacyAgreement:
              'and agree to the processing of my data as outlined.',
            errors: {
              nameRequired: 'Your name is required',
              emailRequired: 'Please enter a valid email',
              messageRequired: 'Your message is required',
            },
          },
          info: {
            email: 'hello@stefan-dev.com',
            phone: '+49 123 456 7890',
            location: 'Berlin, Germany',
          },
        },
      },
      projects: {
        join: {
          description:
            'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
        },
        elPolloLoco: {
          description:
            'A simple Jump-and-Run game based on an object-oriented approach. Help Pepe to find coins and salsa bottles to fight against the crazy hen.',
        },
        pokedex: {
          description:
            'My personal pokedex-app showcasing my skills with fetching API.',
        },
      },
      reviews: {
        review1: {
          text: "Michael really kept the team together with his great organization and clear communication. We wouldn't have got this far without his commitment.",
        },
        review2: {
          text: 'Outstanding technical skills and ability to solve complex problems efficiently.',
        },
        review3: {
          text: 'A reliable team member who always delivers high-quality work on time.',
        },
      },
    },
    DE: {
      navigation: {
        aboutMe: 'Über mich',
        skills: 'Fähigkeiten',
        portfolio: 'Portfolio',
      },
      sections: {
        hero: {
          greeting: 'Hallo, ich bin',
          name: 'Stefan',
          role: 'Frontend Entwickler',
          description:
            'Ich bin ein leidenschaftlicher Frontend-Entwickler, der großartige Benutzererfahrungen mit modernen Web-Technologien schafft.',
          contactBtn: 'Kontakt',
        },
        about: {
          title: 'Über mich',
          description:
            'Hallo, ich bin Stefan! Seit meinen ersten Zeilen HTML hat mich die Welt des Codings in ihren Bann gezogen. Mich fasziniert, wie aus Ideen und Codezeilen interaktive Erlebnisse entstehen, die Menschen begeistern und den Alltag erleichtern. Meine Motivation schöpfe ich aus der ständigen Weiterentwicklung digitaler Technologien und der Möglichkeit, mit meinen Projekten echten Mehrwert zu schaffen.',
          points: {
            location:
              'Ich lebe aktuell in Deutschland und bin flexibel, was meine Arbeitsweise angeht – egal ob remote, hybrid oder vor Ort. Für spannende und zukunftsorientierte Projekte bin ich auch offen für einen Standortwechsel, um im direkten Austausch mit dem Team zu arbeiten.',
            passion:
              'Offenheit und Neugier sind meine treibenden Kräfte. Ich begeistere mich dafür, neue Technologien zu entdecken, moderne Tools auszuprobieren und mein Wissen kontinuierlich zu vertiefen, um bei jedem Projekt noch bessere Ergebnisse zu erzielen.',
            collaboration:
              'Herausforderungen sind für mich Chancen, zu wachsen. Mit analytischem Denken, Kreativität, Ausdauer und guter Zusammenarbeit finde ich stets effiziente, elegante und nachhaltige Lösungen, aus denen ich für zukünftige Projekte lerne.',
          },
        },
        skills: {
          title: 'Fähigkeiten',
          description:
            'Hier sind die Technologien und Tools, mit denen ich Ideen zum Leben erwecke.',
          subtitle:
            'Technologien, mit denen ich in letzter Zeit gearbeitet habe',
          learning: {
            title: 'Suchen Sie nach',
            highlight: 'einer anderen Fähigkeit',
            description:
              'Zeigen Sie Begeisterung für das Erlernen neuer Technologien und Frameworks.',
            contactBtn: 'Kontakt aufnehmen',
          },
        },
        portfolio: {
          title: 'Portfolio',
          description:
            'Entdecken Sie einige meiner neuesten Projekte, die meine Fähigkeiten und Kreativität zeigen.',
          viewProject: 'Projekt ansehen',
          liveDemo: 'Live Test',
          sourceCode: 'Github',
        },
        contact: {
          title: 'Kontakt',
          description:
            'Lassen Sie uns in Kontakt treten und Ihre Projektideen besprechen.',
          subtitle: 'Haben Sie ein Problem zu lösen?',
          form: {
            name: 'Ihr Name',
            email: 'Ihre E-Mail',
            message: 'Ihre Nachricht',
            send: 'Nachricht senden',
            sending: 'Wird gesendet...',
            success: 'Nachricht erfolgreich gesendet!',
            error: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
            contactBtn: 'Kontaktieren Sie mich!',
            ctaText: 'Brauchen Sie einen Frontend-Entwickler?',
            privacyText: 'Ich habe die',
            privacyLink: 'Datenschutzerklärung',
            privacyAgreement:
              'gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.',
            errors: {
              nameRequired: 'Ihr Name ist erforderlich',
              emailRequired: 'Bitte geben Sie eine gültige E-Mail ein',
              messageRequired: 'Ihre Nachricht ist erforderlich',
            },
          },
          info: {
            email: 'info@stefan-helldobler.de',
            phone: '+49 1732534290',
            location: 'Dinslaken, Deutschland',
          },
        },
      },
      projects: {
        join: {
          description:
            'Task-Manager inspiriert vom Kanban-System. Erstellen und organisieren Sie Aufgaben mit Drag-and-Drop-Funktionen, weisen Sie Benutzer und Kategorien zu.',
        },
        elPolloLoco: {
          description:
            'Ein einfaches Jump-and-Run-Spiel basierend auf einem objektorientierten Ansatz. Helfen Sie Pepe, Münzen und Salsa-Flaschen zu finden, um gegen das verrückte Huhn zu kämpfen.',
        },
        pokedex: {
          description:
            'Meine persönliche Pokedex-App, die meine Fähigkeiten mit API-Abrufen zeigt.',
        },
      },
      reviews: {
        review1: {
          text: 'Michael hat das Team wirklich mit seiner großartigen Organisation und klaren Kommunikation zusammengehalten. Ohne sein Engagement wären wir nicht so weit gekommen.',
        },
        review2: {
          text: 'Hervorragende technische Fähigkeiten und die Fähigkeit, komplexe Probleme effizient zu lösen.',
        },
        review3: {
          text: 'Ein zuverlässiger Teammitglied, der immer qualitativ hochwertige Arbeit pünktlich liefert.',
        },
      },
    },
  };

  // Signal für reactive Sprachumschaltung
  public currentLanguage = signal<Language>(this.getStoredLanguage());

  constructor() {
    // Initial language laden
    this.setLanguage(this.currentLanguage());
  }

  /**
   * Sprache umschalten
   */
  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  /**
   * Aktuell gespeicherte Sprache aus LocalStorage laden
   */
  private getStoredLanguage(): Language {
    const stored = localStorage.getItem(this.STORAGE_KEY) as Language;
    return stored && ['EN', 'DE'].includes(stored) ? stored : 'EN';
  }

  /**
   * Übersetzung für den aktuellen Sprachkey holen
   */
  getTranslation(key: string): string {
    const keys = key.split('.');
    let result: any = this.translations[this.currentLanguage()];

    for (const k of keys) {
      result = result?.[k];
    }

    return result || key;
  }

  /**
   * Alle Übersetzungen für die aktuelle Sprache
   */
  getCurrentTranslations(): Translation {
    return this.translations[this.currentLanguage()];
  }
}
