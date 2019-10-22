class HomePage {
    constructor(selenium) {
        this.selenium = selenium
    }

    async navigateToHomePage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com")


    }

    async navigateToClientsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/client")
        await this.selenium.validURL("client")
    }


    async navigateToActionsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/actions")
        await this.selenium.validURL("actions")
    }


    async navigateToAnalyticsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/analytics")
        await this.selenium.validURL("analytics")
    }
}

module.exports = HomePage