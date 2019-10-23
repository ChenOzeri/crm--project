class ClientsPage {
    constructor(selenium) {
        this.selenium = selenium
    }
    async navigateToClientsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/client")
    }
    
    // searchAndValidateClient searches client and validates if client was found.

    async searchAndValidateClient(value, type) {
        try {
            await this.selenium.write(value, "xpath", "//*[@id='root']/div/div[4]/div[1]/input")
            await this.selenium.write(type, "className", "select-css")
            console.log("Searched client.")
            let checkEmail = await this.selenium.getTextFromElement("xpath", `//*[@id="root"]/div/div[4]/table/tr[2]/th[4]`);
            console.log(checkEmail)
            if (checkEmail == value) {
                console.log(true + ", client was found.")
            }
            else {
                console.log(false + " client wasn't found.")
            }


        } catch (error) {
            console.error("Probelm with SearchAndValidateClient function" + error)
        }
    }

    // updateClientInfo clicks on the first client (div) on Client Page. since Email address should be unique, the result
    // would most probably be just the one client we've searched. 

    async updateClientInfo(inputNewEmail) {
        try {
            await this.selenium.clickElement("xpath", "//*[@id='root']/div/div[4]/table/tr[2]")
            await this.selenium.clearElementField("id", "email")
            await this.selenium.write(inputNewEmail, "id", "email")
            await this.selenium.clickElement("xpath", "//*[@id='root']/div/div[4]/div[4]/div/div[2]/input[1]")
            let clientsEmail = await this.selenium.getTextFromElement("xpath", "//*[@id='root']/div/div[4]/table/tr[2]/th[4]");
            console.log(clientsEmail) 
            console.log(inputNewEmail)
            let checkSuccessPU = await this.selenium.isElementExists("css", ".success-pop-up")
            let checkErrorPU = await this.selenium.isElementExists("css", ".error-pop-up")
            if (checkErrorPU) {
                console.log("Error pop up. Client's info didn't updated.")
            }
            else if (checkSuccessPU) {
                console.log("Success pop up. Client's info is now updated.")
            } 
            else {
                console.log("No pop up.")
            }

        } catch (error) {
            console.error(`Error with inputForUpdate function "` + error)

        }
    }

    // Search just searches for client.

    async search(inputForSearch, SearchByforSearch) {
        try {
            await this.selenium.write(inputForSearch, "xpath", "//*[@id='root']/div/div[4]/div[1]/input")
            await this.selenium.write(SearchByforSearch, "className", "select-css")
        }
        catch (error) {
            console.error(`Error with search function" ` + error)
        }
    }

    //soldOrNot get texts from clients tab and checks in the tab whether client was sold or not (YES/NO).

    async soldOrNot(){
        try {
            let text = await this.selenium.getTextFromElement ("css", "#root > div > div.clients-component > table > tr.clientDetails > th:nth-child(6)")
            console.log (text)
            if (text == "NO"){
                console.log ("Client is NOT sold!")
            }
            else if (text == "YES"){
                console.log ("Client is sold!")
            }
        } catch (error) {
            console.error (`Problem with soldOrNot function ` +error)
        }
    }

    //changeToSold inserting clients name and clicks on the "sold" button.
    async changeToSold(input) {
        try {
            await this.selenium.write(input, "xpath", `//*[@id="root"]/div/div[4]/div[1]/table/div/input`)
            await this.selenium.clickElement("css", `#root > div > div.actions-container > div.update-container > table > table > tr.change-sold > th:nth-child(2) > input[type=button]`)
            await this.selenium.sleep(2000)
            let checkSuccessPU = await this.selenium.isElementExists("css", ".success-pop-up") 
            let checkErrorPU = await this.selenium.isElementExists("css", ".error-pop-up")
            if (checkErrorPU) {
                console.log("Error pop up. Client is NOT sold.")
            }
            else if (checkSuccessPU) {
                console.log("Success pop up. Client is now sold.")
            } 
            else {
                console.log("No pop up.")
            }
        } catch (error) {
            console.error(`Error with changeToSold function`)

        }
    }
    
    async closing (){
        await this.selenium.close ()
    }

}
module.exports = ClientsPage;
