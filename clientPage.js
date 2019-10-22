class ClientsPage {
    constructor(selenium) {
        this.selenium = selenium
    }
    async navigateToClientsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/client")
    }
    /*This method gets an input to search and the field to search by
    searchBy can be: Name, Country, Email, Owner, Sold, EmailType
    Return value: true if client exist, false otherwise
    */
    async searchAndValidateClient(input, searchBy) {
        try {
            await this.selenium.write(input, "xpath", "//*[@id='root']/div/div[4]/div[1]/input")
            await this.selenium.write(searchBy, "className", "select-css")
            console.log("Searched client.")
            let checkIfFound = await this.selenium.getTextFromElement("xpath", `//*[@id="root"]/div/div[4]/table/tr[2]/th[4]`);
            console.log(checkIfFound)
            if (checkIfFound == input) {
                console.log(true + " Client was found.")
            }
            else {
                console.log(false + " Client wasn't found.")
            }


        } catch (error) {
            console.error("Probelm with SearchAndValidateClient function" + error)
        }
    }

    async updateClientInfo(inputForUpdate) {
        try {
            await this.selenium.clickElement("xpath", "//*[@id='root']/div/div[4]/table/tr[2]")
            await this.selenium.clearElementField("id", "email")
            await this.selenium.write(inputForUpdate, "id", "email")
            await this.selenium.clickElement("xpath", "//*[@id='root']/div/div[4]/div[4]/div/div[2]/input[1]")
            let checkIfFound = await this.selenium.getTextFromElement("xpath", "//*[@id='root']/div/div[4]/table/tr[2]/th[4]");
            console.log(checkIfFound)
            console.log(inputForUpdate)
            let ifChanged = await this.selenium.isElementExists("css", ".success-pop-up")
            console.log(ifChanged)
            if (ifChanged = true) {
                console.log(`Client's info is now updated.`)
            }

            else {
                console.log(false + `Client's info didn't updated.`)
            }

        } catch (error) {
            console.error(`Error with ${inputForUpdate} function "` + error)

        }
    }

    async search(inputForSearch, SearchByforSearch) {
        try {
            await this.selenium.write(inputForSearch, "xpath", "//*[@id='root']/div/div[4]/div[1]/input")
            await this.selenium.write(SearchByforSearch, "className", "select-css")
        }
        catch (error) {
            console.error(`Error with ${this.search} function" ` + error)
        }
    }

    async soldOrNot(){
        try {
            let text = await this.selenium.getTextFromElement ("css", "#root > div > div.clients-component > table > tr:nth-child(2) > th:nth-child(6)")
            console.log (text)
        } catch (error) {
            console.error (`Problem with ${this.getText} function ` +error)
        }
    }

    async changeToSold(input) {
        try {
            await this.selenium.write(input, "xpath", `//*[@id="root"]/div/div[4]/div[1]/table/div/input`)
            await this.selenium.clickElement("xpath", `//*[@id="root"]/div/div[4]/div[1]/table/table/tr[3]/th[2]/input`)
            let checkSold = await this.selenium.getTextFromElement("css", ".success-pop-up") 
            console.log(checkSold)

        } catch (error) {
            console.error(`Error with ${this.changeToSold} function`)

        }
    }
    
    async closing (){
        await this.selenium.close ()
    }

}
module.exports = ClientsPage;
