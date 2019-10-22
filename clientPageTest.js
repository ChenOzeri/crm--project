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
        // if your test uses more pages, you will have to inisiate them here, in the constractor
    }
    async searchAndValidateClientTest() {
        console.log("Trying to navigate to Clients page")
        await this.clientsPage.navigateToClientsPage()
        console.log("searching and validate client")
        await this.clientsPage.searchAndValidateClient("chen@gmail.com", "Email") //1
        await this.clientsPage.closing()


    }
    async updateClientInfoTest() {
        console.log("Trying to navigate to Clients page")
        await this.clientsPage.navigateToClientsPage()
        console.log("searching wanted client")
        await this.clientsPage.search("chen@gmail.com", "Email")
        console.log("updating client info")
        await this.clientsPage.updateClientInfo("chenchange@gmail.com") //2 
        await this.clientsPage.closing()

    }
    async changeToSoldTest() {
        console.log("Trying to navigate to Clients page")
        await this.clientsPage.navigateToClientsPage() //3 
        console.log ("searching wanted client")
        await this.clientsPage.search("Chen Ozeri1", "Name")
        console.log ("searching if client sold or not - should be no")
        await this.clientsPage.soldOrNot()
        console.log("Trying to navigate to Action page")
        await this.ActionPage.navigateToActionPage() 
        console.log("start changing client to sold")
        await this.clientsPage.changeToSold("Chen Ozeri1")
        await this.clientsPage.closing()
        // Implement the test here...

    }
}

let clientPageTest = new ClientsPageTest();

let testing = function () {
    // clientPageTest.searchAndValidateClientTest();
    // clientPageTest.updateClientInfoTest()
    clientPageTest.changeToSoldTest()
}

testing()
