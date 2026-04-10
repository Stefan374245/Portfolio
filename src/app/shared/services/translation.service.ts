import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Translation, Language, BaseLanguage, LanguageOption } from '../interfaces/translation.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly STORAGE_KEY = 'selectedLanguage';
  private readonly TRANSLATE_ENDPOINT = this.getTranslateEndpoint();
  private readonly http = inject(HttpClient);

  readonly supportedLanguages: LanguageOption[] = [
    { code: 'DE', label: 'Deutsch' },
    { code: 'EN', label: 'English' },
  ];

  private readonly supportedLanguageCodes = new Set<Language>(
    this.supportedLanguages.map((language) => language.code)
  );

  private readonly runtimeTranslations = new Map<Language, Translation>();
  private readonly loadingLanguages = new Set<Language>();

  private translations: Record<BaseLanguage, Translation> = {
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
            'I help startups, restaurants, and small businesses across Europe build modern websites that attract more inquiries and customers. From strategy to launch, I deliver reliable, conversion-focused web solutions tailored to real business goals.',
          points: {
            location:
              'Based in Germany, I work remotely with clients across Europe. Clear communication, transparent timelines, and practical solutions are the foundation of every project.',
            passion:
              'My focus is business impact: fast, responsive, and user-friendly websites that build trust and turn visitors into leads.',
            collaboration:
              'I offer complete website packages including planning, design implementation, development, optimization, and post-launch support.',
          },
        },
        skills: {
          title: 'Skills',
          description:
            'I combine strong frontend engineering with practical business thinking to build websites that are fast, maintainable, and ready for growth.',
          subtitle: "Technologies I've been working with recently",
          learning: {
            title: 'Looking for',
            highlight: 'another skill',
            description:
              'Need a complete website package for your business? Let’s discuss your goals.',
            contactBtn: 'Get in touch',
          },
        },
        portfolio: {
          title: 'Portfolio',
          description:
            'These projects show how I build modern, user-focused web experiences with clean implementation and measurable results. My service combines design quality, technical performance, and business-oriented execution.',
          viewProject: 'View Project',
          liveDemo: 'Live Test',
          sourceCode: 'Github',
        },
        contact: {
          title: 'Contact',
          description: 'Tell me about your business and your goals. I will provide a clear proposal for a website solution that fits your budget, timeline, and market.',
          subtitle: 'Need a website that brings real inquiries?',
          form: {
            name: 'Your name',
            email: 'Your email',
            message: 'Your message',
            send: 'Send message',
            sending: 'Sending...',
            success: 'Message sent successfully!',
            error: 'Error sending message. Please try again.',
            contactBtn: 'Book a free call!',
            ctaText: 'Looking for a freelance web developer in Europe?',
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
            'Join is a modern, Angular-based Kanban project management tool that combines intuitive drag-and-drop task organization with powerful n8n workflow automation.',
        },
        elPolloLoco: {
          description:
            'A simple Jump-and-Run game based on an object-oriented approach in JavaScript. Help Pepe collect coins and salsa bottles to fight against the crazy enemies while exploring different levels.',
        },
        pokedex: {
          description:
            'My Pokédex app showcases my skills with APIs and dynamic data. Pokémon can be filtered by name, type, or generation, creating a complete interactive experience.',
        },
        travel2speak: {
          description:
            'AI-powered language learning app with multi-language support, real-time voice input/output, AI image analysis, spaced repetition flashcards, and interactive travel diary with map integration.',
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
          profession: 'Freelance Web Developer'
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
        skills: 'Skills',
        portfolio: 'Portfolio',
      },
      sections: {
        about: {
          title: 'Über mich',
          description:
            'Ich unterstütze Startups, Restaurants und kleine Unternehmen in Europa mit modernen Websites, die mehr Anfragen und Kunden bringen. Von der Strategie bis zum Livegang liefere ich zuverlässige, conversion-orientierte Weblösungen für echte Geschäftsziele.',
          points: {
            location:
              'Mit Sitz in Deutschland arbeite ich remote mit Kundinnen und Kunden in ganz Europa. Klare Kommunikation, transparente Abläufe und praxisnahe Lösungen stehen im Mittelpunkt.',
            passion:
              'Mein Fokus liegt auf Geschäftsnutzen: schnelle, nutzerfreundliche Websites, die Vertrauen schaffen und Besucher in qualifizierte Anfragen verwandeln.',
            collaboration:
              'Ich biete komplette Website-Pakete: Planung, Design-Umsetzung, Entwicklung, Optimierung und Support nach dem Launch.',
          },
        },
        skills: {
          title: 'Skills',
          description:
            'Ich kombiniere saubere Frontend-Entwicklung mit unternehmerischem Denken, damit Websites schnell, wartbar und skalierbar wachsen können.',
          subtitle:
            'Technologien, mit denen ich in letzter Zeit gearbeitet habe',
          learning: {
            title: 'Suchen Sie nach',
            highlight: 'einer anderen Fähigkeit',
            description:
              'Sie möchten ein komplettes Website-Paket für Ihr Unternehmen? Sprechen wir über Ihre Ziele.',
            contactBtn: 'Kontaktieren',
          },
        },
        portfolio: {
          title: 'Portfolio',
          description:
            'Diese Projekte zeigen, wie ich moderne und nutzerzentrierte Web-Erlebnisse mit sauberer Umsetzung und messbaren Ergebnissen entwickle. Mein Angebot verbindet Designqualität, technische Performance und geschäftsorientierte Umsetzung.',
          viewProject: 'Projekt ansehen',
          liveDemo: 'Live Test',
          sourceCode: 'Github',
        },
        contact: {
          title: 'Kontakt',
          description:'Erzählen Sie mir kurz von Ihrem Unternehmen und Ihren Zielen. Sie erhalten von mir einen klaren Vorschlag für eine Website-Lösung, die zu Budget, Zeitplan und Markt passt.',
          subtitle: 'Sie möchten eine Website, die echte Anfragen bringt?',
          form: {
            name: 'Ihr Name',
            email: 'Ihre E-Mail',
            message: 'Ihre Nachricht',
            send: 'Nachricht senden',
            sending: 'Wird gesendet...',
            success: 'Nachricht erfolgreich gesendet!',
            error: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
            contactBtn: 'Kostenloses Erstgespräch buchen!',
            ctaText: 'Suchen Sie einen freiberuflichen Web-Entwickler für den europäischen Markt?',
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
            'Join ist ein modernes, auf Angular basierendes Kanban-Projektmanagement-Tool, das intuitive Drag-and-Drop-Aufgabenorganisation mit leistungsstarker n8n-Workflow-Automatisierung kombiniert.',
        },
        elPolloLoco: {
          description:
            'Ein einfaches Jump-and-Run-Spiel, das auf einem objektorientierten Ansatz in JavaScript basiert. Hilf Pepe dabei, Münzen und Salsa-Flaschen zu sammeln, um gegen verrückte Gegner zu kämpfen und verschiedene Level zu erkunden.',
        },
        pokedex: {
          description:
            'Meine Pokédex-App zeigt meine Fähigkeiten im Umgang mit APIs und dynamischen Daten. Pokémon lassen sich nach Namen, Typ oder Generation filtern – für ein vollständiges, interaktives Erlebnis.',
        },
        travel2speak: {
          description:
            'KI-gestützte Sprachlern-App mit Mehrsprachenunterstützung, Echtzeit-Spracheingabe/-ausgabe, KI-Bildanalyse, Karteikarten mit Leitner-System und interaktivem Reisetagebuch mit Kartenintegration.',
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
        title: 'Datenschutz<br>erklärung',
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
          profession: 'Freiberuflicher Web-Entwickler'
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
  public currentLanguage = signal<Language>(this.getInitialLanguage());

  constructor() {
    this.setLanguage(this.currentLanguage());
  }

  /**
   * Sprache umschalten
   */
  setLanguage(lang: Language): void {
    if (!this.isSupportedLanguage(lang)) {
      lang = 'EN';
    }

    this.currentLanguage.set(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);

    if (lang !== 'EN' && lang !== 'DE') {
      void this.ensureRuntimeTranslation(lang);
    }
  }

  isSupportedLanguage(language: string): language is Language {
    return this.supportedLanguageCodes.has(language as Language);
  }

  /**
   * Aktuell gespeicherte Sprache aus LocalStorage laden
   */
  private getStoredLanguage(): Language | null {
    const stored = localStorage.getItem(this.STORAGE_KEY) as Language;
    if (stored && this.isSupportedLanguage(stored)) {
      return stored;
    }

    return null;
  }

  private getInitialLanguage(): Language {
    const storedLanguage = this.getStoredLanguage();
    if (storedLanguage) {
      return storedLanguage;
    }

    const browserLanguage = this.mapBrowserLanguage();
    return browserLanguage ?? 'EN';
  }

  private mapBrowserLanguage(): Language | null {
    if (typeof navigator === 'undefined') {
      return null;
    }

    const preferredLanguages = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    for (const rawLanguage of preferredLanguages) {
      const normalized = rawLanguage.toLowerCase();

      if (normalized.startsWith('de')) return 'DE';
      if (normalized.startsWith('en')) return 'EN';
      if (normalized.startsWith('fr')) return 'FR';
      if (normalized.startsWith('es')) return 'ES';
      if (normalized.startsWith('it')) return 'IT';
      if (normalized.startsWith('nl')) return 'NL';
      if (normalized.startsWith('pl')) return 'PL';
      if (normalized.startsWith('pt')) return 'PT-PT';
      if (normalized.startsWith('ro')) return 'RO';
      if (normalized.startsWith('cs')) return 'CS';
      if (normalized.startsWith('sk')) return 'SK';
      if (normalized.startsWith('sl')) return 'SL';
      if (normalized.startsWith('sv')) return 'SV';
      if (normalized.startsWith('da')) return 'DA';
      if (normalized.startsWith('fi')) return 'FI';
      if (normalized.startsWith('et')) return 'ET';
      if (normalized.startsWith('lv')) return 'LV';
      if (normalized.startsWith('lt')) return 'LT';
      if (normalized.startsWith('hu')) return 'HU';
      if (normalized.startsWith('bg')) return 'BG';
      if (normalized.startsWith('el')) return 'EL';
      if (normalized.startsWith('hr')) return 'HR';
    }

    return null;
  }

  /**
   * Übersetzung für den aktuellen Sprachkey holen
   */
  getTranslation(key: string): string {
    const keys = key.split('.');
    let result: any = this.getCurrentTranslations();

    for (const k of keys) {
      result = result?.[k];
    }

    return result || key;
  }

  /**
   * Alle Übersetzungen für die aktuelle Sprache
   */
  getCurrentTranslations(): Translation {
    const currentLanguage = this.currentLanguage();

    if (currentLanguage === 'EN' || currentLanguage === 'DE') {
      return this.translations[currentLanguage];
    }

    const runtimeTranslation = this.runtimeTranslations.get(currentLanguage);
    if (runtimeTranslation) {
      return runtimeTranslation;
    }

    return this.translations.EN;
  }

  private async ensureRuntimeTranslation(language: Language): Promise<void> {
    if (language === 'EN' || language === 'DE') {
      return;
    }

    if (this.runtimeTranslations.has(language) || this.loadingLanguages.has(language)) {
      return;
    }

    this.loadingLanguages.add(language);

    try {
      const sourceTranslation = this.translations.EN;
      const paths = this.collectStringPaths(sourceTranslation);
      const texts = paths.map((entry) => entry.value);

      const response = await firstValueFrom(
        this.http.post(
          this.TRANSLATE_ENDPOINT,
          {
            sourceLang: 'EN',
            targetLang: language,
            texts,
          },
          {
            responseType: 'text',
          }
        )
      );

      const translatedTexts = this.parseTranslatedTexts(response);

      if (!translatedTexts || translatedTexts.length !== texts.length) {
        console.warn(`Runtime translation returned invalid payload for ${language}. Falling back to English.`);
        return;
      }

      const translatedObject = this.applyTranslatedStrings(sourceTranslation, paths, translatedTexts);
      this.runtimeTranslations.set(language, translatedObject as Translation);
      this.currentLanguage.update((current) => current);
    } catch (error) {
      console.warn(`Runtime translation failed for ${language}. Falling back to English.`, error);
    } finally {
      this.loadingLanguages.delete(language);
    }
  }

  private collectStringPaths(
    value: unknown,
    path: string[] = []
  ): Array<{ path: string[]; value: string }> {
    if (typeof value === 'string') {
      return [{ path, value }];
    }

    if (!value || typeof value !== 'object') {
      return [];
    }

    return Object.entries(value).flatMap(([key, nestedValue]) =>
      this.collectStringPaths(nestedValue, [...path, key])
    );
  }

  private applyTranslatedStrings(
    baseObject: unknown,
    paths: Array<{ path: string[]; value: string }>,
    translatedValues: string[]
  ): unknown {
    const cloned = JSON.parse(JSON.stringify(baseObject));

    paths.forEach((entry, index) => {
      this.setNestedValue(cloned, entry.path, translatedValues[index]);
    });

    return cloned;
  }

  private setNestedValue(target: any, path: string[], value: string): void {
    if (!target || path.length === 0) {
      return;
    }

    const [current, ...rest] = path;

    if (rest.length === 0) {
      target[current] = value;
      return;
    }

    if (target[current] && typeof target[current] === 'object') {
      this.setNestedValue(target[current], rest, value);
    }
  }

  private parseTranslatedTexts(rawResponse: string): string[] | null {
    const parsed = this.safeParseJson(rawResponse);
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    const translations = (parsed as { translations?: unknown }).translations;
    if (!Array.isArray(translations) || !translations.every((entry) => typeof entry === 'string')) {
      return null;
    }

    return translations;
  }

  private safeParseJson(raw: string): unknown {
    const direct = this.tryParse(raw);
    if (direct !== null) {
      return direct;
    }

    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      return null;
    }

    return this.tryParse(raw.slice(firstBrace, lastBrace + 1));
  }

  private tryParse(value: string): unknown {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  private getTranslateEndpoint(): string {
    if (typeof window === 'undefined') {
      return '/api/translate';
    }

    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return '/api/translate';
    }

    return '/translate.php';
  }
}
