const BasePage = require("./basePage");
const ClientsPage = require("./clientPage")
const ActionPage = require ("./ActionPage")
const HomePage = require ("./homepage")

class ActionPageTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.ActionPage = new ActionPage(this.testSelenium)
        this.HomePage = new HomePage (this.testSelenium)
    }

    async updateOwnerTest (name, owner){
        console.log ("Trying to navigate to Action page")
        await this.ActionPage.navigateToActionPage()
        console.log ("Updating info for existing client and checking what pop up pops.")
        await this.ActionPage.updateInfo (name, owner) // 1 - Negative Test
        await this.ActionPage.closing()

    }
    async addNewClientTest (inputName, inputLastName, inputCountry, inputOwner, inputEmail){
        console.log ("Trying to navigate to Action page")
        await this.ActionPage.navigateToActionPage()
        console.log ("Adding new client and checking which pop up pops.")
        await this.ActionPage.addNewClient (inputName, inputLastName, inputCountry, inputOwner, inputEmail) // 2 - functionlity Test
        await this.ActionPage.closing()

    }
    
    async changeOwner (inputName, inputOwner, inputSameName, value){
        console.log ("Opened Action page")
        await this.ActionPage.navigateToActionPage ()
        console.log ("Updating info for existing client and checking if changed.")
        await this.ActionPage.updateInfo (inputName, inputOwner) // 3 - Functionality Test
        console.log ("opened Clients page")
        await this.clientsPage.navigateToClientsPage ()
        console.log ("searching client, going to action to change owner and then validate.")
        let changedValue = await this.ActionPage.searchClientAndValidateNewOwner (inputSameName, value)
        if (changedValue === inputOwner) {
            console.log("Success - the owner was changed ")
        } else {
            console.log("Error - the owner was NOT changed ")
        }
        await this.ActionPage.closing()
    }

}

let actionTest = new ActionPageTest();

let testing = function (){
    // actionTest.updateOwnerTest("Chen Ozeri", "Leila Howe")
    // actionTest.addNewClientTest("Chen", "Ozeri1", "France", "Emily Durham", "chenfrance@gmail.com")
    // actionTest.changeOwner("Chen Ozeri", "Leila Howe", "Chen Ozeri", "Name")
}

testing ()