const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  // método que vai listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

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
  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ Error: 'Name is required' });
    }

    const contactExists = await ContactRepository.findByEmail(email);
    if (contactExists) {
      return response.status(400).json({ Error: 'This e-mail is already in use.' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  // Editar um registro
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return response.status(400).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ Error: 'Name is required' });
    }

    const contactEmailExists = await ContactRepository.findByEmail(email);
    if (contactEmailExists && contactEmailExists.id !== id) {
      return response.status(400).json({ Error: 'This e-mail is already in use.' });
    }

    const contact = await ContactRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
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
