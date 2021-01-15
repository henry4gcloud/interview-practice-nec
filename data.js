const  fs = require('fs');

module.exports = {
    organizations: JSON.parse(fs.readFileSync('./data/organizations.json', 'utf8')),
    users: JSON.parse(fs.readFileSync('./data/users.json', 'utf8')),
    tickets: JSON.parse(fs.readFileSync('./data/tickets.json', 'utf8'))
}