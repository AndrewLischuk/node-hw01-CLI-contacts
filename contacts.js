const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(data);
  return result;
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const contact = contactList.find((item) => Number(item.id) === contactId);
  if (!contact) {
    console.log(`There's no contact with ID ${contactId}`);
    return null;
  }
  return contact;
};

const updateContacts = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf8");
};

const removeContact = async (contactId) => {
  const contact = await getContactById(contactId);

  if (contact) {
    const contactList = await listContacts();
    const contacts = contactList.filter(
      (item) => Number(item.id) !== contactId
    );
    await updateContacts(contacts);
    return contacts;
  }
};

const addContact = async (name, email, phone) => {
  const contactList = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contactList.push(newContact);
  await updateContacts(contactList);
  return contactList;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
