export type MyProfile = {
  id: string;
  username: string;
  balance: string;
  reputation: string;
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
  balance: string;
  interests: string;
  name: string;
  owner: string;
  reputation: string;
} | null;

export type ProfileDataAdapted = {
  balance: string;
  interests: string[];
  name: string;
  owner: string;
  reputation: string;
} | null;
