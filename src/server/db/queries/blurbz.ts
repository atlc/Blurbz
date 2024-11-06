import { Query } from "../connection";
import { CreatableBlurb, Blurb } from "../../types";

const getAll = () => Query<Blurb[]>('SELECT * FROM Blurbz');
const getOne = (id: number) => Query<Blurb[]>("SELECT * FROM Blurbz WHERE id=?", [id]);
const create = (newBlurb: CreatableBlurb) => Query("INSERT INTO Blurbz  SET ?", [newBlurb]);
const update = (content: string, id: number) => Query("UPDATE Blurbz SET content=? WHERE id=?", [content, id]);
const destroy = (id: number) => Query("DELETE FROM Blurbz WHERE id=?", [id]);

export default {
  getAll,
  getOne,
  create,
  update,
  destroy
}