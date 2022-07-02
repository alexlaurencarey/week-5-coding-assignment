const prompt = require("prompt-sync")( { sigint: true});

class Country {
    constructor(name, capital) {
        this.name = name;
        this.capital = capital;
    }

    describe() {
        return `The capital of ${name} is ${capital}.`
    }
}

class Continent {
    constructor(name) {
        this.name = name;
        this.countries = [];
    }


addCountry(country) {
    if (country instanceof Country) {
        this.countries.push(country);
    } else {
        throw new Error(`You can only add an instance of Country. Argument is not a Country: ${country}`);
    }
  }

    describe () {
    return `${this.countries.length} countries.`;
  }
}

class Menu {
    constructor() {
        this.continents = [];
        this.selectedContinent = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createContinent();
                    break;
                case '2':
                    this.viewContinent();
                    break;
                case '3':
                    this.deleteContinent();
                    break;
                case '4':
                    this.displayContinents();
                    break;
                default:
                    selection = 0;
        }
        selection = this.showMainMenuOptions();
     }

     alert('Bye!');
  }
  showMainMenuOptions() {
    return prompt(`
    0) exit
    1) create new continent
    2) view continent
    3) delete continent
    4) display all continents
    `);
  }

  showContinentMenuOptions(continentInfo) {
    return prompt(`
    0) back
    1) create country
    2) delete country
    ---------------------
    ${continentInfo}
    `);
  }

  displayContinents() {
    let continentString = '';
    for (let i=0; i < this.continents.length; i++) {
        continentString += i + ') ' + this.continents[i].name + '\n';
    }
    alert(continentString);
  }
  createContinent() {
    let name = prompt('Enter name for new continent:');
    this.continents.push(new Continent(name));
  }

  viewContinent() {
    let index = prompt('Enter the index of the continent you wish to view:');
    if (index > -1 && index < this.continents.length) {
        this.selectedContinent = this.continents[index];
        let description = 'Continent Name: ' + this.selectedContinent.name + '\n';

        for(let i = 0; i < this.selectedContinent.countries.length; i++) {
            description += i + ') ' + this.selectedContinent.countries[i].name
             + ' - ' + this.selectedContinent.countries[i].capital + '\n';
        }

        let selection = this.showContinentMenuOptions(description);
        switch (selection) {
            case '1':
                this.createCountry();
                break;
            case '2':
                this.deleteCountry();
        }
    }
  }

  deleteContinent() {
    let index = prompt('Enter the index of the continent you wish to delete:');
    if (index > -1 && index < this.continents.length) {
        this.continents.splice(index, 1);
    }
  }

  createCountry() {
    let name = prompt('Enter name for new country:');
    let capital = prompt('Enter capital for new country');
    this.selectedContinent.countries.push(new Country(name, capital));
  }

  deleteCountry() {
    let index = prompt('Enter the index of the country you with to delete:');
    if(index > -1 && index < this.selectedContinent.countries.length) {
        this.selectedContinent.countries.splice(index, 1);
    }
  }
}

let menu = new Menu();
menu.start();
