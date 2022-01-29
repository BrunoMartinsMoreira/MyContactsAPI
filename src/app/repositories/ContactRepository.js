/* eslint-disable quotes */
const { v4 } = require('uuid');
const db = require('../../database/index');

let contacts = [
  {
    id: v4(),
    name: 'Bruno',
    email: 'contato@bruno.com',
    phone: '38988784515',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Benedita',
    email: 'contato@dita_do_bruno.com',
    phone: '38988784515',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Nicole',
    email: 'contato@nicole.com',
    phone: '38988784515',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Jao',
    email: 'contato.jao@mail.com',
    phone: '38988784515',
    category_id: v4(),
  },
];

class ContactRepository {
  async findAll(orderBy = 'ASC') {
    const order = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT * FROM contacts ORDER BY name ${order}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM contacts WHERE id = $1`, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`SELECT * FROM contacts WHERE email = $1`, [email]);
    return row;
  }

  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `, [name, email, phone, category_id]);

    return row;
  }

  async update(id, { name, email, phone, category_id }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
