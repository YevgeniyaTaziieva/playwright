import { test } from '@playwright/test';
import { loginFixture } from '../fixtures/login_fixtures';

const loginData = [
    {
        email: 'studigradilyagmail.com',
        pass: '1w24r231jr',
        result: 'Invalid email address',
        locator: 'invalidEmail',
    },
    {
        email: 'studigradilya@gmail.com',
        pass: '1w24r231jr',
        result: 'Incorrect email or password',
        locator: 'incorrectPassword',
    },
];

for (const data of loginData) {
    test(`Login Test - ${data.email}`, async () => {
        await loginFixture(data);
    });
}
