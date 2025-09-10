export interface Translation {
  navigation: {
    aboutMe: string;
    skills: string;
    portfolio: string;
  };
  sections: {
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
    };
  };
  toast: {
    success: {
      message: string;
      button: string;
    };
    error: {
      message: string;
      button: string;
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

   privacy: {
    title: string;
    effectiveDate: string;
    dataController: {
      title: string;
      content: string;
      email: string;
    };
    collectedData: {
      title: string;
      contactForm: {
        title: string;
        name: string;
        email: string;
        message: string;
      };
      technical: {
        title: string;
        browserType: string;
        operatingSystem: string;
        accessTimes: string;
      };
    };
    purposeAndUse: {
      title: string;
      responding: string;
      functionality: string;
      compliance: string;
    };
    dataRetention: {
      title: string;
      contactForm: string;
      technicalData: string;
    };
    thirdPartyServices: {
      title: string;
      googleFonts: string;
      hostingProvider: string;
    };
    cookiesAndStorage: {
      title: string;
      content: string;
    };
    yourRights: {
      title: string;
      content: string;
      contact: string;
    };
  };

    legalNotice: {
    title: string;
    information: {
      title: string;
      name: string;
      profession: string;
    };
    contact: {
      title: string;
      email: string;
      website: string;
    };
    euDispute: {
      title: string;
      content: string;
      linkText: string;
      additionalInfo: string;
    };
    consumerDispute: {
      title: string;
      content: string;
    };
    liability: {
      contentsTitle: string;
      contentsText: string;
      linksTitle: string;
      linksText: string;
    };
    copyright: {
      title: string;
      content: string;
    };
  };
}



export type Language = 'EN' | 'DE';