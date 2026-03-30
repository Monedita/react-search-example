import { faker } from '@faker-js/faker';

import type { User } from '../types/User';

export default async function fetchFakeUsers(count: number = 100): Promise<User[]> {

  // Simula latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  return Array.from({ length: count }, (_, index) => {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = index % 2 === 0
      ? faker.internet.email({ firstName, lastName })
      : faker.internet.email();

    return {
      id: faker.database.mongodbObjectId(),
      fullName: `${firstName} ${lastName}`,
      email,
      img: faker.image.avatarGitHub(),
      jobArea: faker.person.jobArea(),
      jobType: faker.person.jobType(),
      bio: faker.person.bio(),
    };
    
  });
}
