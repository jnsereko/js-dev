const data = require('./data')
let command, commandVal // to store the argument and its value

process.argv.slice(2).reduce((processArgs, val) => {
    let [key, value] = val.split('=');
    command = key.trim(); // we are removing empty spaces
    commandVal = command === null ? '' : value;
    }, {})

if(command === '--filter'){ // user entered --filter
    for (const [index, country] of data.entries()) { 
        for (let j = 0; j < country.people.length; j++) {
            const person = country.people[j];

            // filter animals array to match those having a word commandVal in their name values.
            person.animals = person.animals.filter(animalName =>{
                return animalName.name.includes(commandVal)
            })
            if(person.animals === undefined || person.animals.length == 0){
                // if the animals list is empty, delete the whole object at this index
                country.people.splice(j,1)
                j = j - 1 // after deletion, keep the counter value constant.  This was a difficult catch
            }
        }
    };

    let information = data.filter(element => { //filter the array again to remove empty people arrays
        return(element.people !== undefined && element.people.length > 0)
    })
    console.log(JSON.stringify(information, null, 1)) // transform data into a JSON object to view each content 

}else if(command === '--count'){ //user entered --count
    var countryCount = 1, peopleCount = 1;
    data.filter(element => {

        let countryName = element.name
        switch(countryName) { 
            //initiate counter of people each new country
            case "Tohabdal": case "Uzuzozne": case "Zuhackog": case "Satanwi":
                peopleCount = 1;
        }
        countryName = countryName + ' [' + countryCount++ + ']';
        element.people.filter(person =>{
            person.name = person.name + ' [' + peopleCount++ + ']';
        })
    });
    console.log(JSON.stringify(data, null, 1));
} else console.log('invald input accepted is --field and --count')