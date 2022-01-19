class ContactController {
  // método que vai listar todos os registros
  index(request, response) {
    response.send('Send from Contact Controller/index');
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
