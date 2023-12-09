'use strict';
/**
 * @function
 * Generates a fake team object with random properties.
 *
 * @param {Object} user - The user object.
 * @param {Object} leader - The leader object.
 *
 * @returns {Object} - A fake team object with random properties.
 */
module.exports = (user, leader) => {
    const badgeClassList = ['badge bg-label-danger', 'badge bg-label-primary', 'badge bg-label-info', 'bg-label-secondary', 'bg-label-success', 'bg-label-warning'];

    // Generate a fake team object with random data
    const team = {
        user_id: user._id.toString(),
        team: [], // An array of team members (currently empty).
        badge: faker.word.noun({ length: { min: 5, max: 10 }, strategy: "closest" }),
        badgeClass: badgeClassList[Math.floor(Math.random() * badgeClassList.length)],
        tags: [],
        client: faker.person.fullName(),
        start_date: faker.date.past({ years: 1 }),
        deadline: faker.date.future({ years: 10 }),
        tasks: faker.number.int({ min: 10, max: 500 }),
        completedTasks: faker.number.int({ min: 1, max: 250 }),
        hours: faker.number.int({ min: 10, max: 700 }),
        completedHours: faker.number.int({ min: 2, max: 400 }),
        status: faker.number.int({ min: 0, max: 100 }),
        leader_id: leader ? leader._id.toString() : '', // Leader's user ID.
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
        // status: 'current' || 'past' || 'pause' || 'abandoned', // You may want to adjust or customize the status property.
    };

    return team;
};
