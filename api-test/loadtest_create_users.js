import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// htmlReport will be imported dynamically in handleSummary
// textSummary will be imported dynamically in handleSummary


export const options = {
    stages: [
        { duration: '2s', target: 1 },
        // { duration: '2s', target: 3 },
        // { duration: '3s', target: 0 },
    ],
    thresholds: {
        // 'http_req_failed': ['rate<0.10'],
        'http_req_duration': ['p(95)<1000'], // 95 percent of response times must be below 1000ms
        'http_req_duration{status:200}': ['max>=0'],
        'http_req_duration{status:201}': ['max>=0'],
        'http_req_duration{status:400}': ['max>=0'],
        'http_req_duration{status:500}': ['max>=0'],
    },
    'summaryTrendStats': ['min', 'med', 'avg', 'p(90)', 'p(95)', 'max', 'count'],
};

const BASE_URL = 'https://reqres.in/api/users';
const users = [
    { name: 'Alice Smith', job: 'Developer' },
    { name: 'Bob Johnson', job: 'QA Engineer' },
    { name: 'Charlie Brown', job: 'Manager' },
    { name: 'Diana Prince', job: 'Designer' },
    { name: 'Ethan Hunt', job: 'DevOps' },
    { name: 'Fiona Gallagher', job: 'Product Owner' },
    { name: 'George Lucas', job: 'Architect' },
    { name: 'Hannah Lee', job: 'Scrum Master' },
    { name: 'Ian Fleming', job: 'Tester' },
    { name: 'Jane Doe', job: 'Support' }
];

export default function () {
    const user = users[Math.floor(Math.random() * users.length)];
    const payload = JSON.stringify(user);

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


export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}
