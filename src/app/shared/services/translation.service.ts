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
        about: {
          title: 'About me',
          description:
            'Passionate about frontend development, I work with HTML, CSS, JavaScript, TypeScript, and other technologies. Coding inspires me because it allows me to turn creative ideas into real projects. I am motivated by constant learning and the challenge to grow with every new technology.',
          points: {
            location:
              'Based in Dinslaken, I am open to remote work and value employers who support flexible collaboration. Passionate about clean code and modern frontend development, I stay motivated by continuous learning and teamwork.',
            passion:
              'Openness and curiosity drive me. I enjoy exploring new technologies, trying modern tools, and continuously expanding my knowledge to achieve better results in every project.',
            collaboration:
              'I see challenges as opportunities to grow. With analytical thinking, creativity, perseverance, and strong collaboration, I create efficient, elegant, and sustainable solutions that provide valuable lessons for future projects.',
          },
        },
        skills: {
          title: 'Skills',
          description:
            'I have worked with HTML, CSS, JavaScript, and TypeScript on various projects. Open to new tools and frameworks, I value continuous learning to keep up with the fast pace of web development.',
          subtitle: "Technologies I've been working with recently",
          learning: {
            title: 'Looking for',
            highlight: 'another skill',
            description:
              'Enthusiastic about learning new technologies and frameworks.',
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
          description: "Let’s connect and explore how I can bring your ideas to life. Whether you’re planning a new project or need support solving a challenge, I’m ready to collaborate and create effective solutions.",
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
        },
      },
      toast: {
        success: {
          message: 'Thank you for your message! I will get back to you shortly.',
          button: 'Got it'
        },
        error: {
          message: 'Error sending message. Please try again.',
          button: 'Try again'
        }
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
            'My personal pokedex-app showcasing my skills with fetching API. You can search for all 151 original pokemons and get detailed information about them.',
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
      privacy: {
        title: 'Privacy Policy',
        effectiveDate: 'Effective Date',
        dataController: {
          title: 'Data Controller',
          content: 'Stefan Helldobler',
          email: 'info@stefan-helldobler.de'
        },
        collectedData: {
          title: 'Collected Data',
          contactForm: {
            title: 'Contact form data:',
            name: 'Name',
            email: 'Email',
            message: 'Message'
          },
          technical: {
            title: 'Technical data (anonymized):',
            browserType: 'Browser type',
            operatingSystem: 'Operating system',
            accessTimes: 'Access times'
          }
        },
        purposeAndUse: {
          title: 'Purpose & Use',
          responding: 'Responding to inquiries',
          functionality: 'Site functionality & security',
          compliance: 'Compliance with legal requirements'
        },
        dataRetention: {
          title: 'Data Retention',
          contactForm: 'Contact form: up to 3 years',
          technicalData: 'Technical data: 30 days'
        },
        thirdPartyServices: {
          title: 'Third-Party Services',
          googleFonts: 'Google Fonts (Typography)',
          hostingProvider: 'Hosting provider'
        },
        cookiesAndStorage: {
          title: 'Cookies & Local Storage',
          content: 'No tracking cookies. LocalStorage only for essential functionality (language, scroll).'
        },
        yourRights: {
          title: 'Your Rights',
          content: 'Access, rectification, erasure, restriction, portability, objection, withdraw consent.',
          contact: 'Contact:'
        }
      },
      legalNotice: {
        title: 'Legal Notice',
        information: {
          title: 'Information according to § 5 TMG',
          name: 'Stefan Helldobler',
          profession: 'Freelance Frontend Developer'
        },
        contact: {
          title: 'Contact',
          email: 'Email: info@stefan-helldobler.de',
          website: 'Website: www.stefan-helldobler.de'
        },
        euDispute: {
          title: 'EU Dispute Resolution',
          content: 'The European Commission provides a platform for online dispute resolution (ODR):',
          linkText: 'https://ec.europa.eu/consumers/odr/',
          additionalInfo: 'Our email address can be found above in the legal notice.'
        },
        consumerDispute: {
          title: 'Dispute Resolution Proceedings in front of a Consumer Arbitration Board',
          content: 'We are not willing or obliged to participate in dispute resolution proceedings in front of a consumer arbitration board.'
        },
        liability: {
          contentsTitle: 'Liability for Contents',
          contentsText: 'As service providers, we are liable for our own contents of these websites according to Sec. 7, Para. 1 German Telemedia Act (TMG). However, pursuant to Secs. 8 to 10 German Telemedia Act (TMG), we as service providers are not under obligation to monitor submitted or stored information or to research circumstances pointing to illegal activity.',
          linksTitle: 'Liability for Links',
          linksText: 'Our offer includes links to external third party websites. We have no influence on the contents of those websites, therefore we cannot guarantee for those contents. Providers or administrators of linked websites are always responsible for their own contents.'
        },
        copyright: {
          title: 'Copyright',
          content: 'Contents and compilations published on these websites by the providers are subject to German copyright laws. Reproduction, editing, distribution as well as the use of any kind outside the scope of the copyright law require a written permission of the author or originator.'
        }
      }
    },
    DE: {
      navigation: {
        aboutMe: 'Über mich',
        skills: 'Fähigkeiten',
        portfolio: 'Portfolio',
      },
      sections: {
        about: {
          title: 'About me',
          description:
            'Leidenschaftlich im Frontend-Development setze ich HTML, CSS, JavaScript, TypeScript und andere Technologien ein. Programmieren begeistert mich, weil ich kreative Ideen in reale Projekte verwandeln kann. Ständiges Lernen und neue Technologien motivieren mich, immer weiter zu wachsen.',
          points: {
            location:
              'Ich lebe in Dinslaken und bin offen für Remote-Arbeit. Besonders schätze ich Arbeitgeber, die flexible Zusammenarbeit ermöglichen. Meine Leidenschaft gilt sauberem Code und moderner Frontend-Entwicklung. Ständiges Lernen und Teamarbeit motivieren mich, immer besser zu werden.',
            passion:
              'Offenheit und Neugier treiben mich an. Ich entdecke gerne neue Technologien, probiere moderne Tools aus und erweitere stetig mein Wissen, um in jedem Projekt bessere Ergebnisse zu erzielen.',
            collaboration:
              'Herausforderungen betrachte ich als Chancen zum Wachsen. Durch analytisches Denken, Kreativität, Ausdauer und konstruktive Zusammenarbeit entwickle ich effiziente, elegante und nachhaltige Lösungen, aus denen ich für zukünftige Projekte weiterlerne.',
          },
        },
        skills: {
          title: 'Skills',
          description:
            'Ich habe mit HTML, CSS, JavaScript und TypeScript an verschiedenen Projekten gearbeitet. Offen für neue Tools und Frameworks lege ich Wert auf kontinuierliches Lernen, um mit der schnellen Entwicklung im Web Schritt zu halten.',
          subtitle:
            'Technologien, mit denen ich in letzter Zeit gearbeitet habe',
          learning: {
            title: 'Suchen Sie nach',
            highlight: 'einer anderen Fähigkeit',
            description:
              'Begeistert davon, neue Technologien und Frameworks zu lernen.',
            contactBtn: 'Kontaktieren',
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
          title: 'Contact',
          description:'Lassen Sie uns in Kontakt treten und gemeinsam herausfinden, wie ich Ihre Ideen umsetzen kann. Ob Sie ein neues Projekt planen oder Unterstützung bei einer Herausforderung brauchen – ich freue mich auf die Zusammenarbeit.',
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
        },
      },
      toast: {
        success: {
          message: 'Danke für Ihre Nachricht! Ich melde mich zeitnah zurück.',
          button: 'Verstanden'
        },
        error: {
          message: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
          button: 'Erneut versuchen'
        }
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
            'Meine persönliche Pokedex-App, die meine Fähigkeiten mit API-Abrufen zeigt. Sie können alle 151 originalen Pokémon suchen und detaillierte Informationen über sie erhalten.',
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
      privacy: {
        title: 'Datenschutzerklärung',
        effectiveDate: 'Gültig ab',
        dataController: {
          title: 'Verantwortlicher',
          content: 'Stefan Helldobler',
          email: 'info@stefan-helldobler.de'
        },
        collectedData: {
          title: 'Erhobene Daten',
          contactForm: {
            title: 'Kontaktformular-Daten:',
            name: 'Name',
            email: 'E-Mail',
            message: 'Nachricht'
          },
          technical: {
            title: 'Technische Daten (anonymisiert):',
            browserType: 'Browsertyp',
            operatingSystem: 'Betriebssystem',
            accessTimes: 'Zugriffszeiten'
          }
        },
        purposeAndUse: {
          title: 'Zweck & Verwendung',
          responding: 'Beantwortung von Anfragen',
          functionality: 'Funktionalität & Sicherheit der Webseite',
          compliance: 'Einhaltung gesetzlicher Vorgaben'
        },
        dataRetention: {
          title: 'Aufbewahrung',
          contactForm: 'Kontaktformular: bis zu 3 Jahre',
          technicalData: 'Technische Daten: 30 Tage'
        },
        thirdPartyServices: {
          title: 'Drittanbieter',
          googleFonts: 'Google Fonts (Typografie)',
          hostingProvider: 'Hosting-Provider'
        },
        cookiesAndStorage: {
          title: 'Cookies & Lokaler Speicher',
          content: 'Keine Tracking-Cookies. LocalStorage nur für notwendige Funktionen (Sprache, Scroll).'
        },
        yourRights: {
          title: 'Ihre Rechte',
          content: 'Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Widerruf.',
          contact: 'Kontakt:'
        }
      },
      legalNotice: {
        title: 'Impressum',
        information: {
          title: 'Angaben gemäß § 5 TMG',
          name: 'Stefan Helldobler',
          profession: 'Freiberuflicher Frontend-Entwickler'
        },
        contact: {
          title: 'Kontakt',
          email: 'E-Mail: info@stefan-helldobler.de',
          website: 'Website: www.stefan-helldobler.de'
        },
        euDispute: {
          title: 'EU-Streitschlichtung',
          content: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:',
          linkText: 'https://ec.europa.eu/consumers/odr/',
          additionalInfo: 'Unsere E-Mail-Adresse finden Sie oben im Impressum.'
        },
        consumerDispute: {
          title: 'Verbraucherstreitbeilegung',
          content: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
        },
        liability: {
          contentsTitle: 'Haftung für Inhalte',
          contentsText: 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
          linksTitle: 'Haftung für Links',
          linksText: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
        },
        copyright: {
          title: 'Urheberrecht',
          content: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.'
        }
      }
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
