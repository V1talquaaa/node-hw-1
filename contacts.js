
const fs = require('fs/promises')
const path = require('path')
const {nanoid} = require('nanoid')

const contactsPath = path.resolve(__dirname, 'db/contacts.json')

async function listContacts() {
    // ...твій код. Повертає масив контактів.
    const result = await fs.readFile(contactsPath, "utf-8")
    return JSON.parse(result)
  }
  
  async function getContactById(contactId) {
      // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const findContactById = contacts.find((contact) => contact.id === contactId);
    return findContactById || null
  }
  
  async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if(index === -1) return null
    const updatedContacts = contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return updatedContacts || null
  }
  
  async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту.
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(), 
      name, 
      email, 
      phone,
    }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact

  }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}