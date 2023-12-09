'use strict';
/**
 * @function
 * Generates a fake team object with random properties.
 *
 * @param {Object} user - The user object.
 *
 * @returns {Object} - A fake team object with random properties.
 */
module.exports = (user) => {
    const badgeClassList = ['badge bg-label-danger', 'badge bg-label-primary', 'badge bg-label-info', 'bg-label-secondary', 'bg-label-success', 'bg-label-warning'];

    // Generate a fake team object with random data
    const team = {
        user_id: user._id.toString(),
        members: [], // An array of member user IDs (currently empty).
        badge: faker.word.noun({ length: { min: 5, max: 10 }, strategy: "closest" }),
        badgeClass: badgeClassList[Math.floor(Math.random() * badgeClassList.length)],
        tags: [],
        name: faker.company.catchPhrase(),
        shortDescription: faker.lorem.paragraphs({ min: 1, max: 2 }),
        fullDescription: faker.lorem.paragraphs({ min: 1, max: 10 }),
        avatar: faker.image.url(),
        email: faker.internet.email(),
        displayName: faker.internet.displayName(),
        emoji: faker.internet.emoji(),
        terms: 'on',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isActive: true,
        isDeleted: false,
        background: false,
        status: 'current' || 'past' || 'pause' || 'abandoned', // Random status value.

        // You may want to adjust or customize the status property, as it currently takes random values.
    };

    return team;
};
