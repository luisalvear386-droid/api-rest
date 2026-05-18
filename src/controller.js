import { pool } from "./database.js";

class libroController {
  async getOne(req, res) {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM libros WHERE id = ?", [
      id,
    ]);
    res.json(result);
  }
  async getAll(req, res) {
    const [result] = await pool.query("SELECT * FROM libros");
    res.json(result);
  }
  async add(req, res) {
    const { nombre, autor, categoria, año_publicacion, ISBN } = req.body;
    const [result] = await pool.query(
      "INSERT INTO libros (nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)",
      [nombre, autor, categoria, año_publicacion, ISBN],
    );
    res.json({ "Libro agregado correctamente": result.insertId });
  }
  async update(req, res) {
    const { libros } = req.body;
    const [result] = await pool.query(
      "UPDATE libros SET nombre = (?), autor = (?), categoria = (?), año_publicacion = (?), ISBN = (?) WHERE id = (?)",
      [nombre, autor, categoria, año_publicacion, ISBN, id],
    );
    res.json({ "Libro actualizado correctamente": result.changedRows });
  }
  async delete(req, res) {
    const { isbn } = req.params;
    const [result] = await pool.query("DELETE FROM libros WHERE ISBN = ?", [
      isbn,
    ]);

    res.json({
      message: "Libro eliminado correctamente",
    });
  }
}

export const libro = new libroController();
