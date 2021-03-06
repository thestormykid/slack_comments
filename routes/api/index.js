var Todo = require('../../models/todoList');
var User = require('../../models/user');

module.exports = {

	listtodos : function (req, res) {

		var team = req.body.team_domain;
		var channel_id  = req.body.channel_id;

		// used to get the whole todo list
		Todo.find({ team: team, channel_id: channel_id }, {_id: 0, text: 1}).exec(function(err, todoList) {
			if (err) {
				console.log(err);
				res.status(500).json('something went wrong');
				return;
			}

			if (todoList.length == 0) {
				return res.status(200).json('NO TODO');

			} else {

				var todoListNeedToBeSend = {
					attachments: todoList,
					text: "Here are the list of todo's",
					response_type: "in_channel"
				};

				return res.status(200).json(todoListNeedToBeSend);
			}
		})
	},

	addTodo: function(req, res) {

		if (!req.body.text) {
			return res.status(200).json('please add some body to the todo');

		}

		var todoObject = {
			text: req.body.text.trim(),
			createdBy: req.body.user_id,
			team: req.body.team_domain,
			teamId: req.body.team_id,
			channel_id: req.body.channel_id,
			channel_name: req.body.channel_name
		}

		// first check whether the todo is present or not, If it is then return otherwise add the todo
		Todo.find({ $and: [{team: todoObject.team}, {channel_id: todoObject.channel_id}, {text: todoObject.text}] }, function(err, checkIfToDoContainsOrNot) {
			if (err) {
				console.log(err);
				return res.status(500).json('something went wrong');
			}

			console.log(checkIfToDoContainsOrNot);

			if (checkIfToDoContainsOrNot.length != 0) {
				console.log()
				return res.status(200).json('this todo is already present!!!')
			}

			Todo.create(todoObject, function(err, data) {
			 	if (err) {
			 		console.log(err);
			 		return res.status(500).json('something went wrong');
			 	}

			 	var dataNeedToBeSend = {
			 		text: 'This todo added in the list',
			 		attachments: [{ text: todoObject.text}],
			 	}

			 	return res.status(200).json(dataNeedToBeSend);
			})

		})
	},

	markTodo: function(req, res) {
		// var id = "";
		if (!req.body.text) {
			return res.status(200).json('please add the todo');
		}

		var text = req.body.text.trim();
		console.log(req.body);

		Todo.deleteOne({ team: req.body.team_domain, channel_id: req.body.channel_id ,  text: text }, function(err, deletedTodo) {
			if (err) {
				console.log(err);
				return res.status(500).json('something went wrong');

			}

			if (deletedTodo.deletedCount == 0) {
				return res.status(200).json("this todo was not present, why won't you create one");

			}

		 	var dataNeedToBeSend = {
		 		text: 'This todo deleted successfully',
		 		attachments: [{ text: text }],
		 	}

			return res.status(200).json(dataNeedToBeSend);
		})
	},

	editTodo: function(req, res) {

		var team = req.body.team_domain;
		var channel_id = req.body.channel_id;
		var text = req.body.text.split("@");
		var previousText = text[1].trim();
		var updatedText = text[2].trim();

		Todo.find({team: team, channel_id: channel_id, text: updatedText}, function(err, checkIfTheUpdatedTaskIsPresentOrNot) {
			if (err) {
				console.log(err);
				return res.status(500).json('something went wrong');
			}

			if (checkIfTheUpdatedTaskIsPresentOrNot.length == 0) {

				Todo.update({ team: team, channel_id: channel_id, text: previousText }, {text: updatedText}, function(err, updatedTodo) {
					if (err) {
						console.log(err);
						return res.status(500).json('something went wrong');

					}

					return res.status(200).json('todo updated successfully');
				})

			} else {
				res.status(200).json('this <' + updatedText + '> todo cannot be updated as it is already present');

			}
		})
	}
}
