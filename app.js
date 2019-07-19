const data = require('./data.json');
const Backbone = require('backbone');
const Backgrid = require('backgrid');
const $ = require('jquery');
const Moment = require('moment');
const swal = require('sweetalert2');

$(document).ready(function() {
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
      name : 'id',
      label : 'ID',
      editable : false,
      cell : 'string',
      index : 1
  	},
  	{
      name : 'name',
      label : 'Name',
      editable : false,
      cell : 'string',
      index : 2
  	},
      {
      name : 'created_at',
      label : 'Created Date',
      editable : false,
      cell: 'string',
      index : 3
    },
  	{
      name : 'averageScore',
      label : 'Average Score',
      editable : false,
      cell: 'number',
      index : 4
  	}
  ];


  const scoreGrid = new Backgrid.Grid({
    columns : columns,
    collection : usersCollection
  });

  const removeColumn = (nameParam) => {
    if (scoreGrid.columns.length === 1) {
      swal({title : 'Error', position : 'bottom-end', text : "You have hidden the maximum amount of columns allowed", timer : 2000, type : 'error', toast : true, showConfirmButton : false});
    } else {
      scoreGrid.removeColumn(scoreGrid.columns.where({name : nameParam}))
    }
  }

  const addColumn = (nameParam) => {
    let newColumn;
    let newColumnIndex;
    let columnIndexes = [];

    // look through our array of columns to find the column to add to the grid
    columns.forEach((column, index) => {
      if(column.name === nameParam) {
        newColumn = column;
        newColumnIndex = column.index;
      }
    });

    // get indexes of all columns currently in the grid.
    scoreGrid.columns.forEach((column) => {
      columnIndexes.push(column.get('index'));
    })

    // determine where our column should be placed relative to other columns.
    columnPlacement = determineColumnPlacement(columnIndexes, newColumnIndex)
    scoreGrid.insertColumn(newColumn, {at : columnPlacement});
    //reapply bootsrap classes to newly rendered column header
    $('button').addClass('btn-xs btn-primary');
  }

  const determineColumnPlacement = (colIndexArray, currentColIndex) => {
    // For the column we are about to add, take its index and put it in the array of other column indexes.
    // Then, sort our array and see where the column we are about to add is.
    colIndexArray.push(currentColIndex);
    colIndexArray.sort();
    return colIndexArray.indexOf(currentColIndex);
  }


	$('.grid').append(scoreGrid.render().el);
  // adding some bootstrap classes for styling
  $('button').addClass('btn-xs btn-primary');
  $('.dropdown-item').click(function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      addColumn(this.id);
    } else {
      if (scoreGrid.columns.length > 1) $(this).addClass('active');
      removeColumn(this.id);
    }
  })
});




