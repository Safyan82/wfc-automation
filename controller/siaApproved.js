const axios = require('axios');
const cheerio = require('cheerio');

async function getSIAApprovedAgencyDetail() {
      try {     
        const res = await axios.get("https://www.services.sia.homeoffice.gov.uk/Pages/acs-roac.aspx?all", null, true);
        // Process the API response here
        const $ = cheerio.load(res.data);
        const tableRows = $('tr');
        const tableData = [];

        tableRows.each((index, element) => {
            const tableCells = $(element).find('td');
            const rowData = [];

            tableCells.each((index, element) => {
                rowData.push($(element).text().trim());
            });

            tableData.push(rowData);
        });

        return tableData?.slice(1);

      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    }
  
    // https://www.services.sia.homeoffice.gov.uk/Pages/acs-roac.aspx?all#
module.exports = { getSIAApprovedAgencyDetail };

