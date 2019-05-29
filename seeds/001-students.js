
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'rowValue1', cohort_id: 'webpt1'},
        {name: 'rowValue2', cohort_id: 'webpt2'},
        {name: 'rowValue3', cohort_id: 'webpt3'}
      ]);
    });
};
