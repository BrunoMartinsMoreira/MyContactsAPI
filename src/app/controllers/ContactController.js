const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  // método que vai listar todos os registros
  async index(request, response) {
    const contacts = await ContactRepository.findAll();

    response.json(contacts);
  }

  // obter um registro
  show() {

  }

  // criar um novo registro
  store() {

  }

  // Editar um registro
  update() {

  }

  // Deletar um registro
  delete() {

  }
}

// singleton
module.exports = new ContactController();
