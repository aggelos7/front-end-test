import { InMemoryDbService } from 'angular-in-memory-web-api';

// use of internal data for presentation purposes
export class InternalDataService implements InMemoryDbService {
    createDb() {
        return {
            'logged-in-user':
            {
                email: 'test@test.gr',
                password: '123456',
                username: 'tester',
                token: 'test'
            }

        }
    }
}
