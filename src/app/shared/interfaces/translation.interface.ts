export interface Translation {
  navigation: {
    aboutMe: string;
    skills: string;
    portfolio: string;
  };
  sections: {
    hero: {
      greeting: string;
      name: string;
      role: string;
      description: string;
      contactBtn: string;
    };
    about: {
      title: string;
      description: string;
      points: {
        location: string;
        passion: string;
        collaboration: string;
      };
    };
    skills: {
      title: string;
      description: string;
      subtitle: string;
      learning: {
        title: string;
        highlight: string;
        description: string;
        contactBtn: string;
      };
    };
    portfolio: {
      title: string;
      description: string;
      viewProject: string;
      liveDemo: string;
      sourceCode: string;
    };
    contact: {
      title: string;
      description: string;
      subtitle: string;
      form: {
        name: string;
        email: string;
        message: string;
        send: string;
        sending: string;
        success: string;
        error: string;
        contactBtn: string;
        ctaText: string;
        privacyText: string;
        privacyLink: string;
        privacyAgreement: string;
        errors: {
          nameRequired: string;
          emailRequired: string;
          messageRequired: string;
        };
      };
      info: {
        email: string;
        phone: string;
        location: string;
      };
    };
  };
  projects: {
    join: {
      description: string;
    };
    elPolloLoco: {
      description: string;
    };
    pokedex: {
      description: string;
    };
  };
  reviews: {
    review1: {
      text: string;
    };
    review2: {
      text: string;
    };
    review3: {
      text: string;
    };
  };
}

export type Language = 'EN' | 'DE';