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
  async findAll() {
    const rows = await db.query(`
      SELECT * FROM contacts
    `);
    return rows;
  }

  async findById(id) {
    const row = await db.query(`
      SELECT * FROM contacts WHERE id = $1
    `, [id]);
    return row;
  }

  async findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING  *
      `, [name, email, phone, category_id]);

    return row;
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));
      resolve(updatedContact);
    });
  }
}

module.exports = new ContactRepository();
