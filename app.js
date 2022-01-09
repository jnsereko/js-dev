const data = require('./data')
let command, commandVal // to store the argument and its value

process.argv.slice(2).reduce((processArgs, val) => {
    let [key, value] = val.split('=');
    command = key.trim(); // we are removing empty spaces
    commandVal = command === null ? '' : value;
    }, {})

if(command === '--filter'){ // user entered --filter
    /*
    This is really an overkill.  I tried using filters but recursive calling of the filter didnt allow me update the object
    Using native and manual for-loops could arithemetically work, but i think Javascript locks up when i try to maintain the for-loop-counter variable after
    deleting the empty objects form the array.
    */
    for (let k = 0; k < data.length; k++) { 
        const country = data[k];
        
        for (let j = 0; j < country.people.length; j++) {
            const person = country.people[j];

            for (let i = 0; i < person.animals.length; i++) {
                const animal = person.animals[i];
                if(!(animal.name.includes(commandVal))){
                    person.animals.splice(i, 1); 
                    i = i - 1;
                }
            }
            if(person.animals === undefined || person.animals.length == 0){
                country.people.slice(j, 1)
                j = j - 1;
            }
        }
        if(country.people === undefined || country.people.length == 0){
            country.people.slice(k, 1)
            k = k - 1;
        }
    };
    console.log(JSON.stringify(data, null, 1)) // transform data into a JSON object to view each content 

}else if(command === '--count'){ //user entered --count
    var countryCount = 1, peopleCount = 1;
    data.filter(element => {
        element.name = element.name + ' [' + countryCount++ + ']';
        element.people.filter(person =>{
            person.name = person.name + ' [' + peopleCount++ + ']';
        })
    });
    console.log(JSON.stringify(data, null, 1));
} else console.log('invald input accepted is --field and --count')