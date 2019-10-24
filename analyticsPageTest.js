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
    async checkPieSalestest(country) {
        console.log("navigate to Analytics page")
        await this.AnalyticsPage.navigateToAnalyticsPage()
        console.log("choosing country and checking to see if pie chart appears")
        await this.AnalyticsPage.checkEmployeeSales(country) // 2
        await this.ActionPage.closing()

    }
    async sendEmailToClientTest(clientName, emailType) {
        console.log("Navigate to Analytics page")
        await this.AnalyticsPage.navigateToAnalyticsPage()
        console.log("Get sent email number")
        let sentEmailNumber = await this.AnalyticsPage.getEmailNum()
        console.log("Navigate to Action page")
        await this.ActionPage.navigateToActionPage()
        console.log("Changing the clients email type")
        await this.AnalyticsPage.sendEmailToClients(clientName, emailType)
        console.log("Navigate to Analytics page")
        await this.AnalyticsPage.navigateToAnalyticsPage()
        let newSentEmailNumber = await this.AnalyticsPage.getEmailNum()
        sentEmailNumber= parseInt(sentEmailNumber)
        newSentEmailNumber=parseInt(newSentEmailNumber)
        if (sentEmailNumber + 1 == newSentEmailNumber) {
            console.log("Email sent.")
        }
        else {
            console.log("Problem with sending Email.")
        }
        await this.AnalyticsPage.closing()
    }

}

let analyticsPageTest = new AnalyticsPageTest();

let testing = function () {
    // analyticsPageTest.StabilityTest()
    // analyticsPageTest.checkPieSalestest("Israel")
    analyticsPageTest.sendEmailToClientTest("Chen Ozeri", "A")
}

testing()

