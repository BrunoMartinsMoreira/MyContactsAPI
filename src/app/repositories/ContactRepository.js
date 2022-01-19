const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Bruno',
    email: 'contato@bruno.com',
    phone: '38988784515',
    category_id: uuid(),
  },
];

class ContactRepository {
  // listar todos os registros
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactRepository();
