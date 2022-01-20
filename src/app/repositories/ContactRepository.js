const { v4 } = require('uuid');

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
  // listar todos os registros
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
