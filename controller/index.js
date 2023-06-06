const axios = require('axios');
const cheerio = require('cheerio');

async function getLicenceDetail(LicenseNo) {
      try {        
        const formData = {
            LicenseNo
        };
        const res = await axios.post("https://services.sia.homeoffice.gov.uk/PublicRegister/SearchPublicRegisterByLicence", formData);
        // Process the API response here
        const userData={};
        let currentIndex=0;
        const $ = cheerio.load(res.data.slice(res.data.length-10500, res.data.length-6200));
        const title = $(`span.ax_paragraph`);
        const names = $(`div.ax_h5`);
        const values = $(`div.ax_h4`);
        const status = $(`span.ax_h4_green`);
        let propTitle=[];
        title.each((index, element) => {
            propTitle.push($(element).text().replace(/[^\w\s]/gi, '').replace(/\s+/g, ''));
        });
        names.each((index, element) => {
            userData[propTitle[index]]=($(element).text().replace(/[^\w\s]/gi, '').replace(/\s+/g, ''));
            currentIndex=currentIndex+index;
        });
        values.each((index, element) => {
            currentIndex=currentIndex+1;
            userData[propTitle[currentIndex]]=($(element).text().replace(/[^\w\s]/gi, '').replace(/\s+/g, ''));
        });
        userData[propTitle[currentIndex+1]]=$(status).text().replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
        return userData;
        
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    }
  

module.exports = { getLicenceDetail };

