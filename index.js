import { program } from "commander";
import * as contacts from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list": {
      const allContacts = await contacts.readContacts();
      console.table(allContacts);
      break;
    }
    case "get": {
      const found = await contacts.getContactById(id);
      if (found) {
        console.log("Contact found:", found);
      } else {
        console.log("No contact with such id");
      }
      break;
    }
    case "add": {
      const created = await contacts.addContact(name, email, phone);
      console.log("Contact added:", created);
      break;
    }
    case "remove": {
      const removed = await contacts.removeContact(id);
      if (removed) {
        console.log("Contact removed:", removed);
      } else {
        console.log("No contact with such id");
      }
      break;
    }
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
