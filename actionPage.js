class ActionPage {
    constructor(selenium) {
        this.selenium = selenium
    }
    async navigateToActionPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/actions")
    }
    async updateInfo(inputClient, inputOwner) {
        try {
            await this.selenium.write(inputClient, "xpath", `//*[@id="root"]/div/div[4]/div[1]/table/div/input`)
            await this.selenium.write(inputOwner, "xpath", `//*[@id="root"]/div/div[4]/div[1]/table/table/tr[1]/th[2]/input`)
            await this.selenium.clickElement("css", `#root > div > div.actions-container > div.update-container > table > table > tr.change-owner > th:nth-child(3) > input[type=button]`)
            await this.selenium.sleep(2000)
            let checkResult = await this.selenium.isElementExists("css", ".error-pop-up")
            if(checkResult) {
                console.log ("Error pop up.")
            }
            else {
                console.log ("Success pop up.")
            }
        } catch (error) {
            console.error(`Error with ${this.updateInfo}` + error)
        }
    }

    async addNewClient(newClientFirstName, newClientLastName, newClientCountry, newClientOwner, newClientEmail) {
        try {
            await this.selenium.write(newClientFirstName, "id", "firstName")
            await this.selenium.write(newClientLastName, "id", "lastName")
            await this.selenium.write(newClientCountry, "id", "country")
            await this.selenium.write(newClientOwner, "css", `input[id="owner"]`)
            await this.selenium.write(newClientEmail, "id", "email")
            await this.selenium.clickElement("xpath", `//*[@id="root"]/div/div[4]/div[2]/div[2]/input`)
            await this.selenium.sleep(2000)
            let ifAdded = await this.selenium.isElementExists("css", ".success-pop-up") 
            console.log(ifAdded)
            if (ifAdded){
                await this.selenium.getTextFromElement ("css", ".success-pop-up")
                console.log ("New client was added.")
            }
        } catch (error) {
            console.error(`Problem with ${this.addNewClient}` + error)

        }
    }
    async searchClientAndChangeOwner(clientIdentifier, chooseWhichIdentifier) {
        try {
            await this.selenium.write(clientIdentifier, "xpath", `//*[@id="root"]/div/div[4]/div[1]/input`)
            await this.selenium.write(chooseWhichIdentifier, "xpath", "//*[@id='root']/div/div[4]/div[1]/table/table/tr[1]/th[2]/input")
            const isOwnerChanged = await this.selenium.getTextFromElement("xpath", `//*[@id="root"]/div/div[4]/table/tr[2]/th[5]`)
            console.log(isOwnerChanged)

        } catch (error) {
            console.error(`Problem with ${this.searchClientAndChangeOwner}` + error)
        }
    }
    async closing() {
        await this.selenium.close()
    }
}

module.exports = ActionPage;
