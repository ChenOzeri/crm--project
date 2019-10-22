const BasePage = require("./basePage");
const ClientsPage = require("./clientPage")
const ActionPage = require("./ActionPage")
const HomePage = require("./homepage")
const AnalyticsPage = require("./AnalyticsPage")

class AnalyticsPageTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.AnalyticsPage = new AnalyticsPage(this.testSelenium)
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.ActionPage = new ActionPage(this.testSelenium)
        this.HomePage = new HomePage(this.testSelenium)
    }

    async StabilityTest() {
        console.log("Trying to navigate to Analytics page")
        await this.AnalyticsPage.navigateToAnalyticsPage()
        console.log("Loading the page 10 times and checking stability")
        await this.AnalyticsPage.checkStability() //1
        await this.ActionPage.closing()

    }
    async checkPieSalestest() {
        console.log("navigate to Analytics page")
        await this.AnalyticsPage.navigateToAnalyticsPage()
        console.log("choosing country and checking to see if pie chart appears")
        await this.AnalyticsPage.checkEmployeeSales("Israel") // 2
        await this.ActionPage.closing()

    }
    async sendEmailToClientTest() {
        console.log("Navigate to Analytics page")
        await this.AnalyticsPage.navigateToAnalyticsPage()
        console.log("Changing the clients email type in Action and checking if it changed on Analytics.")
        await this.AnalyticsPage.sendEmailtoClient("Chen Ozeri", "A") // 3
        await this.ActionPage.closing()
    }

}

let analyticsPageTest = new AnalyticsPageTest();

let testing = function () {
    // analyticsPageTest.StabilityTest()
    // analyticsPageTest.checkPieSalestest()
    analyticsPageTest.sendEmailToClientTest()
}

testing()

