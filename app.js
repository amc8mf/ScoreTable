const data = require('./data.json');
const Backbone = require('backbone');
const Backgrid = require('backgrid');
const $ = require('jquery');
const Moment = require('moment');

var calculateAverageScore = (userId) => {
  // First step is to filter scores based on the user id, then grab the score value from the object, 
  // and finally reduce the array to be a single value representing the total.
  let userScores = data.scores.filter((scoreObj) => {
    return scoreObj.user_id === userId;
  });

  if (userScores) { 
    let scoreTotal = userScores.map((scoreObj) => {
      return scoreObj.score;
    }).reduce((acc, scoreValue) => {
      return acc + scoreValue;
    })
    return scoreTotal / userScores.length;
  }
};

//Define collection that will be used to populate grid
var usersCollection = new Backbone.Collection();
data.users.forEach((user) => {
  if (user.active === "true") usersCollection.add(user);
})
usersCollection.forEach((user) => {
  user.set('averageScore', calculateAverageScore(user.id));
  let date = Moment(user.get('created_at'));
  if (date.isValid()) {
    user.set('created_at', Moment(user.get('created_at')).format('MMMM D, YYYY'));
  } else {
    user.set('created_at', '')
  }
});


const columns = [{
    name: 'id',
    label: 'ID',
    editable: false,
    cell: 'string'
	},
	{
    name: 'name',
    label: 'Name',
    editable: false,
    cell: 'string'
	},
    {
    name: 'created_at',
    label: 'Created Date',
    editable: false,
    cell: 'string'
  },
	{
    name: 'averageScore',
    label: 'Average Score',
    editable: false,
    cell: 'number'
	}
];


const grid = new Backgrid.Grid({
  columns: columns,
  collection: usersCollection
});

$(document).ready(function() {
	$('.grid').append(grid.render().el);
  // adding some bootstrap classes for styling
  $('button').addClass('btn-xs btn-primary');
});




