
export type UserProfessional = {
  profession: number;
  yearsOfExp: number;
  openToDiffRole: boolean;
  preferenceToWork: number[];
  skillRank: {
    skillId: number;
    yearsOfExp: number;
  }[];
};

export type UserRelocation = {
  openToRemote: boolean;
  relocateOptions: string;
  cadSalaryExpect: number;
  canadianVisa: number;
  usdSalaryExpect: number;
  validPassport: boolean;
  companySize: string[];
  activelyLooking: boolean;
  noticePeriod: number;
};

export type UserType = {
  name: string;
  username: string;
  email: string;
  picture: string;
  passwordHash: string;
  id: string;
  accessCount: number;
  jobsApplied: number[];
  general: {
    citizenship_code: string;
    gender: string;
    currentLocation: string;
    phone: string;
  };
  professional: UserProfessional;
  relocation: UserRelocation;
};
