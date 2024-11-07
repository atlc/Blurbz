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

export interface Payload {
  id: number;
  email: string;
}



// ONLY do if you're using auth from scratch
/*
declare global {
  namespace Express {
    export interface Request {
      user: Payload
    }
  }
}
*/

// ONLY do if you're using Passport
declare global {
  namespace Express {
    export interface User extends Payload {}
  }
}