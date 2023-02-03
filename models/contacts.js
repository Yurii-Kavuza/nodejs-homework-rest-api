const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateData = async (newContacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  searchedContact = contacts.find((contact) => contact.id === id);
  return searchedContact || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((contact) => contact.id !== id);
  await updateData(newContacts);
  return contacts[idx];
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  await updateData(contacts);
  return newContact;
};

const updateContactsById = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }

   const existName = contacts[index].name;
   const existEmail = contacts[index].email;
   const existPhone = contacts[index].phone;

  contacts[idx] = {
    id,
    name: data.name ?? existName,
    email: data.email ?? existEmail,
    phone: String(data.phone ?? existPhone),
  };
  await updateData(contacts);

  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactsById,
};
