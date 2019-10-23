class AnalyticsPage {
    constructor(selenium) {
        this.selenium = selenium
    }
    async navigateToAnalyticsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/analytics")
    }

    // checkStability loads the page x times to check if clashes. 

    async checkStability() {
        try {
            for (let i = 0; i <= 10; i++) {
                await this.selenium.getURL("https://lh-crm.herokuapp.com/analytics")
                console.log("done " + i)
            }
        }
        catch (error) {
            console.error("Problem with checkStability function" + error)
        }
    }

    // checkEmployeeSales input country and checks if a specific div which hold the pie chart shows up.
    async checkEmployeeSales(input) {
        try {
            await this.selenium.clickElement("css", "#root > div > div.analytics > div.charts > div.employees-sales-by-country-chart > div.employees-sales-by-country-input > select")
            await this.selenium.write(input, "css", `div[class="employees-sales-by-country-input"]>select[class="select-css"]`)
            await this.selenium.sleep(2000)
            const checkResult = await this.selenium.isElementExists("css", `#root > div > div.analytics > div.charts > div.employees-sales-by-country-chart > div.recharts-responsive-container > div.recharts-wrapper > svg > g > g:nth-child(1)`)
            console.log(checkResult)
            if (checkResult) {
                console.log("Found pie sales.")
            }
            else {
                console.log("No div found. No pie sales.")
            }
        } catch (error) {
            console.error("Problem with checkEmployeeSales function" + error)
        }
    }

    // getEmailNum takes the string number for emails sent.
    async getEmailNum(){
        try {
            await this.selenium.sleep(3000)
            let currentNum =await this.selenium.getTextFromElement("css", "#root > div > div.analytics > div.badges > div:nth-child(2) > div.badge-val")
            console.log(currentNum)
        } catch (error) {
            console.error("Problem with getEmailNum function" + error)
            
        }
    }

    //sendEmailToClients sends email type to client.
    async sendEmailToClients(ClientName, EmailType){
        try {
            await this.selenium.write(ClientName, "xpath", `//*[@id="root"]/div/div[4]/div[1]/table/div/input`)
            await this.selenium.write(EmailType, "xpath", `//*[@id="change-email-type"]/th[2]/input`)
            await this.selenium.clickElement("xpath", `//*[@id="change-email-type"]/th[3]/input`)
            await this.selenium.sleep(2000)
            let checkSuccessPU = await this.selenium.isElementExists("className", "success-pop-up")
            let checkErrorPU = await this.selenium.isElementExists("css", ".error-pop-up")
            if (checkErrorPU) {
                console.log("Error pop up. Email Was NOT sent.")
            }
            else if (checkSuccessPU) {
                console.log("Success pop up. Email sent!")
            }
            else {
                console.log("No pop up.")
            }
        } catch (error) {
            console.error("Problem with sendEmailToClients function" + error)

        }
    }

    async closing() {
        await this.selenium.close()
    }

    // async sendEmailtoClient(ClientName, EmailType) {
    //     try {
    //         await this.selenium.sleep(3000)
    //         let previousNum = await this.selenium.getTextFromElement("css", "#root > div > div.analytics > div.badges > div:nth-child(2) > div.badge-val")
    //         console.log(previousNum)
    //         await this.selenium.clickElement("xpath", `//*[@id="root"]/div/div[2]/a[3]/input`) //action 
    //         await this.selenium.write(ClientName, "xpath", `//*[@id="root"]/div/div[4]/div[1]/table/div/input`)
    //         await this.selenium.write(EmailType, "xpath", `//*[@id="change-email-type"]/th[2]/input`)
    //         await this.selenium.clickElement("xpath", `//*[@id="change-email-type"]/th[3]/input`)
    //         const validateSuccess = await this.selenium.isElementExists("className", "success-pop-up")
    //         console.log(validateSuccess)
    //         await this.selenium.clickElement("xpath", `//*[@id="root"]/div/div[2]/a[2]/input`) //back to analytics.
    //         await this.selenium.sleep(3000)
    //         let currentNum = await this.selenium.getTextFromElement("css", "#root > div > div.analytics > div.badges > div:nth-child(2) > div.badge-val")
    //         console.log(currentNum)

    //         if (previousNum + 1 == currentNum) {
    //             console.log(`${currentNum} > ${previousNum}. Email sent.`)
    //         }
    //         else {
    //             console.log("Problem with sending Email.")
    //         }
    //     } catch (error) {
    //         console.error("Problem with checkEmail function" + error)
    //     }
    // }

}

module.exports = AnalyticsPage;
