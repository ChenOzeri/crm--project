const BasePage = require("./basePage");
const ClientsPage = require("./clientPage")
const ActionPage = require("./ActionPage")
const HomePage = require("./homepage")

class ClientsPageTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.ActionPage = new ActionPage(this.testSelenium)
        this.HomePage = new HomePage(this.testSelenium)
        }

    async searchAndValidateClientTest(input, value) {
        console.log("Trying to navigate to Clients page")
        await this.clientsPage.navigateToClientsPage()
        console.log("searching and validate client")
        await this.clientsPage.searchAndValidateClient(input, value) //1
        await this.clientsPage.closing()


    }
    async updateClientInfoTest(value, type, inputNewEmail, changedValue, sameType) {
        console.log("Trying to navigate to Clients page")
        await this.clientsPage.navigateToClientsPage()
        console.log("searching wanted client")
        await this.clientsPage.search(value, type) 
        console.log("updating client info")
        await this.clientsPage.updateClientInfo(inputNewEmail) //2 
        console.log("Trying to navigate to Clients page")
        await this.clientsPage.navigateToClientsPage()
        console.log ("validate client details changed")
        await this.clientsPage.searchAndValidateClient(changedValue, sameType) 
        await this.clientsPage.closing()

    }
    async changeToSoldTest(value, type, valueForChange, sameValue, sameType) {
        console.log("Trying to navigate to Clients page")
        await this.clientsPage.navigateToClientsPage() //3 
        console.log ("searching wanted client")
        await this.clientsPage.search(value, type)
        console.log ("searching if client sold or not")
        await this.clientsPage.soldOrNot()
        console.log("Trying to navigate to Action page")
        await this.ActionPage.navigateToActionPage() 
        console.log("start changing client to sold")
        await this.clientsPage.changeToSold(valueForChange)
        console.log("navigate back to Clients page")
        await this.clientsPage.navigateToClientsPage() 
        console.log ("searching wanted client")
        await this.clientsPage.search(sameValue, sameType)
        console.log ("searching to validate if client sold or not")
        await this.clientsPage.soldOrNot()
        await this.clientsPage.closing()
        // Implement the test here...

    }
}

let clientPageTest = new ClientsPageTest();

let testing = function () {
    // clientPageTest.searchAndValidateClientTest("chen@gmail.com", "Email");
    // clientPageTest.updateClientInfoTest("chen@gmail.com", "Email", "chenchange@gmail.com", "chenchange@gmail.com", "Email")
    clientPageTest.changeToSoldTest("Chen Ozeri1", "Name", "Chen Ozeri1", "Chen Ozeri1", "Name")
}

testing()
