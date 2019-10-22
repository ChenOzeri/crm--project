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

    async negativeUpdateTest (){
        console.log ("Trying to navigate to Action page")
        await this.ActionPage.navigateToActionPage()
        console.log ("Updating info for existing client and checking if changed.")
        await this.ActionPage.updateInfo ("Chen Ozeri") // 1 - Negative Test - Should pop up error. 
        await this.ActionPage.closing()

    }
    async addNewClientTest (){
        console.log ("Trying to navigate to Action page")
        await this.ActionPage.navigateToActionPage()
        console.log ("Adding new client.")
        await this.ActionPage.addNewClient ("Chen", "Ozeri1", "France", "Emily Durham", "chenfrance@gmail.com") // 2 - functionlity Test
        await this.ActionPage.closing()

    }
    
    async changeOwner (){
        console.log ("Opened Action page")
        await this.ActionPage.navigateToActionPage ()
        console.log ("Updating info for existing client and checking if changed.")
        await this.ActionPage.updateInfo ("Chen Ozeri", "Leila Howe") // 3 - Functionality Test
        console.log ("opened Clients page")
        await this.clientsPage.navigateToClientsPage ()
        console.log ("search client on Clients, going to action to change owner and then validate.")
        await this.ActionPage.searchClientAndChangeOwner ("Chen Ozeri", "Name")
        await this.ActionPage.closing()
    }

}

let actionTest = new ActionPageTest();

let testing = function (){
    // actionTest.negativeUpdateTest()
    actionTest.addNewClientTest()
    // actionTest.changeOwner()
}

testing ()