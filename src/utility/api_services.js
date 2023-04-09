import axios from "axios";

const url = `${process.env.REACT_APP_API}/contacts`;

export async function getContacts() {
  return await axios.get(url);
}
export async function addContacts(contact) {
  return await axios.put(url, { contact });
}
export async function deleteContact(id) {
  return await axios.delete(`${url}?id=${id}`);
}
