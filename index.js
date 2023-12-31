const contacts = require('./contacts')


const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.table(allContacts)
      break;

    case 'get':
      const searchContact = await contacts.getContactById(id);
      console.log(searchContact)
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone)
      console.log(newContact)
      break;

    case 'remove':
      const removedContact = await contacts.removeContact(id)
      console.log(removedContact)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

