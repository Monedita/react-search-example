import { faker } from '@faker-js/faker';

import type { User } from '../types/User';

export default async function fetchFakeUsers(count: number = 100): Promise<User[]> {
  // Simula latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Array.from({ length: count }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      id: faker.database.mongodbObjectId(),
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      img: faker.image.avatarGitHub(),
      jobArea: faker.person.jobArea(),
      jobType: faker.person.jobType(),
      bio: faker.person.bio(),
    };
  });
}
