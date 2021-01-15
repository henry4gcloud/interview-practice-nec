


const {searchOrganizations, searchUsers, searchTickets} = require('./searching');
const {
    inputSearchingName,
    selectOrganizationSearchingProperty,
    selectUserSearchingProperty,
    selectTicketSearchingProperty,
    inputSearchingValue
} = require('./inputValue');

(async () => {
    let searchingFunction;
    let searchingField;
    let searchingValue;
    let dataName = await inputSearchingName();
    switch (dataName) {
        case 'Organizations':
            searchingFunction = searchOrganizations;
            searchingField = await selectOrganizationSearchingProperty();
            break;
        case'Users':
            searchingFunction = searchUsers;
            searchingField = await selectUserSearchingProperty();
            break;
        case'Tickets':
            searchingFunction = searchTickets;
            searchingField = await sselectTicketSearchingProperty();
            break;
    }

    searchingValue = await inputSearchingValue();

    let results = searchingFunction(searchingField, searchingValue);
    if(results && results.length > 0){
        console.log(JSON.stringify(results, undefined, 4));
    }else {
        console.log('No Results Found.');
    }

})();