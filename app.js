const data = require('./data.json');
const Backbone = require('backbone');
const Backgrid = require('backgrid');
const $ = require('jquery');

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
});

Backgrid.CustomHeaderCell = Backgrid.HeaderCell.extend({
 className: 'custom-html-header-cell',
 render: function() {
   this.$el.empty();
   var column = this.column;
   var sortable = Backgrid.callByNeed(column.sortable(), column, this.collection);
   var label;
   if(sortable){
     label = $("<button>").html(column.get("label")).append("<span class='sort-caret' aria-hidden='true'></span>");
   } else {
     label = document.createTextNode(column.get("label"));
   }
   this.$el.append(label);
   this.$el.addClass(column.get("name"));
   this.$el.addClass(column.get("direction"));
   this.delegateEvents();
   return this;
 }
})

const columns = [{
    name: 'id',
    label: 'ID',
    editable: false,
    cell: 'string',
    headerCell: 'custom'
	},
	{
    name: 'name',
    label: 'Name',
    editable: false,
    cell: 'string',
    headerCell: 'custom'
	},
	{
    name: 'averageScore',
    label: 'Average Score',
    editable: false,
    cell: 'number',
    headerCell: 'custom'
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




