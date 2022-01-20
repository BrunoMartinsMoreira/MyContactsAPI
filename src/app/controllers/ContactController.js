const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  // método que vai listar todos os registros
  async index(request, response) {
    const contacts = await ContactRepository.findAll();

    response.json(contacts);
  }

  // obter um registro
  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found!' });
    }

    return response.json(contact);
  }

  // criar um novo registro
  store() {

  }

  // Editar um registro
  update() {

  }

  // Deletar um registro
  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found!' });
    }

    await ContactRepository.delete(id);
    response.sendStatus(204);
  }
}

// singleton
module.exports = new ContactController();
