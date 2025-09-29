
export interface GeneralData {
  name: string;
  links: {
    github: string;
    contact: string;
  };
}

export interface Project {
  name: string;
  url: string;
}

export interface PortfolioData {
  project: Project[];
}