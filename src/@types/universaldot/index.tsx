export type MyProfile = {
  id: string;
  cover: string;
  position: string;
  quote: string;
  country: string;
  email: string;
  company: string;
  school: string;
  role: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
};

export type ProfileState = {
  data: ProfileDataAdapted;
};

export type ProfileDataSubstrate = {
  owner: string;
  name: string;
  interests: string;
  balance: string;
  reputation: string;
  availableHoursPerWeek: string;
  additionalInformation: string;
} | null;

export type ProfileDataAdapted = {
  owner: string;
  name: string;
  interests: string[];
  balance: string;
  reputation: string;
  availableHoursPerWeek: string;
  additionalInformation: string;
} | null;
