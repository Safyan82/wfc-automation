const axios = require('axios');
const cheerio = require('cheerio');

async function getCompanyDetail(companyname) {
      try {     
        const res = await axios.get("https://find-and-update.company-information.service.gov.uk/search/companies?q="+companyname);
        // Process the API response here
        console.log(res.data.items, "res.data")
        return res?.data?.items;
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    }
  
    // https://www.services.sia.homeoffice.gov.uk/Pages/acs-roac.aspx?all#
module.exports = { getCompanyDetail };

