export interface CreatableUser {
  email: string;
  password: string;
}

export interface User extends CreatableUser {
  id: number;
  created_at: Date;
}


export interface CreatableBlurb {
  user_id: number;
  content: string;
}

export interface Blurb {
  id: number;
  created_at: Date;
  edited_at?: Date;
}