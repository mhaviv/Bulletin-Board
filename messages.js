var Sequelize = require('sequelize');

var config = {
    "username": "mhaviv",
    "password": null,
    "database": "bulletinboard",
    "host": "127.0.0.1",
    "dialect": "postgres"
  };
var sequelize = new Sequelize(config);


var Message = sequelize.define('message', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    user: {
        type:Sequelize.STRING(100),
        allowNull: false
    },

    post: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
});
// Message.sync()
// .then(function() {
//     Message.create({
//         title: 'test',
//         user: 'bilbo baggins',
//         post: 'what kind of name is bilbo?...'
//         })
//     });

module.exports = {
	sequelize,
	Message: Message
}

