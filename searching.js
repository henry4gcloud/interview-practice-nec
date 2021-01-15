const  fs = require('fs');

const {organizations, users, tickets} = require('./data');

function search(sources, propertyName, searchValue){
    let targets = sources.filter(source=> {
        let propertyValue = source[propertyName];
        if(Array.isArray(propertyValue)){
            return propertyValue.includes(searchValue);
        } else {
            switch (typeof propertyValue) {
                case "boolean": return propertyValue === JSON.parse(searchValue.toLowerCase());
                case "number": return propertyValue === + searchValue;
                default: return propertyValue === searchValue;
            }
        }
    });
    return targets;
}

function searchOrganizations(propertyName, searchValue){
    let targets = search(organizations, propertyName, searchValue)
        .map(organization => {
            organization.users = search(users, 'organization_id', organization._id).map(user => user.name);
            organization.tickets = search(tickets, 'organization_id', organization._id).map(ticket => ticket.subject);
            return organization;
        });
    return targets;
}

function searchUsers(propertyName, searchValue){
    let targets = search(users, propertyName, searchValue)
        .map(user => {
            user.organization_name = organizations.find(organization => organization._id === user.organization_id)?.name;
            user.assignee_tickets = search(tickets, 'assignee_id', user._id).map(ticket => ticket.subject);
            user.submitter_tickets = search(tickets, 'submitter_id', user._id).map(ticket => ticket.subject);
            return user;
        });
    return targets;
}

function searchTickets(propertyName, searchValue){
    let targets = search(tickets, propertyName, searchValue)
        .map(ticket => {
            ticket.organization_name = organizations.find(organization => organization._id === ticket.organization_id)?.name;
            ticket.assignee_name = users.find(user => user._id === ticket.assignee_id)?.name;
            ticket.submitter_name = users.find(user => user._id === ticket.submitter_id)?.name;
            return ticket;
        });
    return targets;
}


module.exports = {
    searchOrganizations: searchOrganizations,
    searchUsers: searchUsers,
    searchTickets: searchTickets
}