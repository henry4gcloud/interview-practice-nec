
const searchingDataNames = ['Organizations', 'Users', 'Tickets'];
const organizationSeachableProperties = ['_id', 'url', 'external_id','name','domain_names','created_at',
    'details', 'shared_tickets', 'tags'];
const userSeachableProperties = ["_id","url", "external_id","name"," alias", "created_at", "active",
    "verified",    "shared", "locale", "timezone", "last_login_at", "email","phone", "signature",
    "organization_id", "tags", "suspended", "role"];
const ticketSeachableProperties = ['_id', 'url', 'external_id', 'created_at', 'type', 'subject',  'description',
    'priority','status', 'submitter_id', 'assignee_id', 'organization_id', 'tags'];




// console.log(JSON.stringify(searchOrganizations( '_id', '102'), undefined, 4))
// console.log(JSON.stringify(searchUsers( '_id', '1'), undefined, 4))
// console.log(JSON.stringify(searchTickets( 'tags', 'Ohio'), undefined, 4))
const inquirer = require('inquirer');


async function inputSearchingName (){
    return new Promise(resolve=>{
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'selected',
                    message: 'Select Search Options',
                    choices: searchingDataNames,
                },
            ])
            .then(answers => {
                resolve(answers.selected);
            });
    });
}

async function selectSearchProperty (seachableProperties){
    return new Promise(resolve=>{
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'selected',
                    message: 'Select Search Term',
                    choices: seachableProperties,
                },
            ])
            .then(answers => {
                resolve(answers.selected);
            });
    });
}

async function inputSearchingValue (){
    return new Promise(resolve=>{
        inquirer
            .prompt([
                {
                    name: 'inputed',
                    message: 'Input Searching Value'
                },
            ])
            .then(answers => {
                resolve(answers.inputed);
            });
    });
}

module.exports = {
    inputSearchingName: inputSearchingName,
    selectOrganizationSearchingProperty: () => {return selectSearchProperty(organizationSeachableProperties);},
    selectUserSearchingProperty: () => {return selectSearchProperty(userSeachableProperties);},
    selectTicketSearchingProperty: () => {return selectSearchProperty(ticketSeachableProperties);},
    inputSearchingValue: inputSearchingValue
}