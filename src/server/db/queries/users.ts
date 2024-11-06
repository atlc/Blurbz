import { Query } from "../connection";
import { User, CreatableUser } from "../../types";

const register = (newUser: CreatableUser) => Query('INSERT INTO Users SET ?', [newUser]);
const find = (email: string) => Query<User[]>('SELECT * FROM Users WHERE email=?', [email]);

export default {
  register,
  find
}