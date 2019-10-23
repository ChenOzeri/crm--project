//write down notes for each function for each page and test


class ActionPage {
    constructor(selenium) {
        this.selenium = selenium
    }
    async navigateToActionPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/actions")
    }
    
    //updateInfo updates existing client's Owner. 

    async updateInfo(inputClient, inputOwner) {
        try {
            await this.selenium.write(inputClient, "xpath", `//*[@id="root"]/div/div[4]/div[1]/table/div/input`)
            await this.selenium.write(inputOwner, "xpath", `//*[@id="root"]/div/div[4]/div[1]/table/table/tr[1]/th[2]/input`)
            await this.selenium.clickElement("css", `#root > div > div.actions-container > div.update-container > table > table > tr.change-owner > th:nth-child(3) > input[type=button]`)
            await this.selenium.sleep(2000)
            let checkSuccessPU = await this.selenium.isElementExists("css", ".success-pop-up")
            let checkErrorPU = await this.selenium.isElementExists("css", ".error-pop-up")
            if (checkErrorPU) {
                console.log("Error pop up. Client info is NOT updated")
            }
            else if (checkSuccessPU) {
                console.log("Success pop up. Client info is now updated!")
            }
            else {
                console.log("No pop up.")
            }
        } catch (error) {
            console.error("Error with updateInfo" + error)
        }
    }
    
    // addNewClient adding new client.

    async addNewClient(newClientFirstName, newClientLastName, newClientCountry, newClientOwner, newClientEmail) {
        try {
            await this.selenium.write(newClientFirstName, "id", "firstName")
            await this.selenium.write(newClientLastName, "id", "lastName")
            await this.selenium.write(newClientCountry, "id", "country")
            await this.selenium.write(newClientOwner, "css", `input[id="owner"]`)
            await this.selenium.write(newClientEmail, "id", "email")
            await this.selenium.clickElement("xpath", `//*[@id="root"]/div/div[4]/div[2]/div[2]/input`)
            await this.selenium.sleep(2000)
            let checkSuccessPU = await this.selenium.isElementExists("css", ".success-pop-up")
            let checkErrorPU = await this.selenium.isElementExists("css", ".error-pop-up")
            if (checkErrorPU) {
                console.log("Error pop up. No client added.")
            }
            else if (checkSuccessPU) {
                console.log("Success pop up. New client was added!")
            }
            else {
                console.log("No pop up.")
            }
            
        } catch (error) {
            console.error("Problem with addNewClient" + error)

        }
    }
    // searchClientAndChangeOwner search client and validates new Owner from the clients div.
    async searchClientAndValidateNewOwner(clientIdentifier, chooseWhichIdentifier) {
        try {
            await this.selenium.write(clientIdentifier, "xpath", `//*[@id="root"]/div/div[4]/div[1]/input`)
            await this.selenium.write(chooseWhichIdentifier, "css", "#root > div > div.clients-component > div.search-clients > select")
            const NewOwner = await this.selenium.getTextFromElement("xpath", `//*[@id="root"]/div/div[4]/table/tr[2]/th[5]`)
            return NewOwner
        } catch (error) {
            console.error("Problem with searchClientAndValidateNewOwner" + error)
        }
    }
    async closing() {
        await this.selenium.close()
    }
}

module.exports = ActionPage;
