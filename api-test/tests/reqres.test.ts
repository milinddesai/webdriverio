import reqresClient from '../src/clients/reqresClient';
import { userListSchema } from '../src/validations/userListSchema';
import { createdUserSchema } from '../src/validations/createdUserSchema';
import Ajv from 'ajv';
import { faker } from '@faker-js/faker';

const ajv = new Ajv();

describe('Reqres.in API', () => {
  it('GET a list of users and validate schema + response data', async () => {
    const res = await reqresClient.getUsers(1);
    expect(res.status).toBe(200);
    expect(ajv.validate(userListSchema, res.data)).toBe(true);
    expect(Array.isArray(res.data.data)).toBe(true);
    expect(res.data.data.length).toBeGreaterThan(0);
  });

  it.only('POST a new user and validate response', async () => {
    const payload = { name: faker.person.firstName(), job: faker.person.jobTitle() };
    const res = await reqresClient.createUser(payload);
    expect(res.status).toBe(201);
    expect(ajv.validate(createdUserSchema, res.data)).toBe(true);
    expect(res.data).toHaveProperty('name', payload.name);
    expect(res.data).toHaveProperty('job', payload.job);
    expect(res.data).toHaveProperty('id');
    expect(res.data).toHaveProperty('createdAt');
  });

  it('Negative test: send malformed payload and assert error response', async () => {
    const payload = { invalidField: 'bad' };
    const res = await reqresClient.createUser(payload);
    // reqres.in accepts any payload, so we check for 201 but missing expected fields
    expect(res.status).toBe(201);
    expect(res.data).not.toHaveProperty('name');
    expect(res.data).not.toHaveProperty('job');
  });
});
