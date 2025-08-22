import http from 'k6/http';
import { check, sleep } from 'k6';
import { faker } from '@faker-js/faker';

export const options = {
  vus: 10, // number of virtual users
  duration: '30s', // test duration
};

const BASE_URL = 'https://reqres.in/api/users';

export default function () {
  const payload = JSON.stringify({
    name: faker.person.fullName(),
    job: faker.person.jobTitle(),
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(BASE_URL, payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
    'response has id': (r) => JSON.parse(r.body).id !== undefined,
    'response has createdAt': (r) => JSON.parse(r.body).createdAt !== undefined,
  });

  sleep(1);
}
