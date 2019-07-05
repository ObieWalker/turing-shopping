import faker from 'faker';

export const users = [
{
  "email": faker.internet.email(),
  "first_name":  faker.name.findName(),
  "id": 3,
  "last_name":  faker.name.findName(),
  "phone_number": null,
  "properties": "All Properties",
  "role": "Super Admin",
  "status": "active"
},
{
  "email": faker.internet.email(),
  "first_name":  faker.name.findName(),
  "id": 36,
  "last_name":  faker.name.findName(),
  "phone_number": null,
  "properties": "All Properties",
  "role": "Company Admin",
  "status": "active"
},
{
  "email": faker.internet.email(),
  "first_name":  faker.name.findName(),
  "id": 80,
  "last_name":  faker.name.findName(),
  "phone_number": null,
  "properties": ["Turing"],
  "role": "Consultant",
  "status": "suspended"
}]

export const cartId = faker.random.uuid