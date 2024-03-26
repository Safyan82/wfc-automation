const express = require('express');
const cors = require('cors');
const { getLicenceDetail } = require('./controller');
const { getCompanyDetail } = require('./controller/company');
const { getSIAApprovedAgencyDetail } = require('./controller/siaApproved');

const app = express();
const port = 3500;

app.use(cors());

app.get('/getlicensedetail/:licenseNo', async(req, res) => {
    const LicenseNo = req.params.licenseNo;
    if(LicenseNo.length==16){

        const data = await getLicenceDetail(LicenseNo)
        if(Object.values(data).length>2){
            res.status(200).json({data});
        }else{
            res.status(404).json({message:"License number is not correct "});
            
        }
    }else{
        res.status(400).json({message:"License number is not valid"})
    }
});

app.get('/getcompanydetail/:companyname', async(req, res) => {
    const companyname = req.params.companyname;
    if(companyname.length>1){

        const data = await getCompanyDetail(companyname)
        if(data?.length>0){
            res.status(200).json({data});
        }else{
            res.status(404).json({message:"company name is not found "});
            
        }
    }else{
        res.status(400).json({message:"company name is not valid"})
    }
});

app.get('/getSIAApprovedAgencyDetail', async(req, res) => {

        const data = await getSIAApprovedAgencyDetail();
        // if(data?.length>0){
            res.status(200).json({data});
        // }else{
        //     res.status(404).json({message:"company name is not found "});
            
        // }

});

// getSIAApprovedAgencyDetail
  

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });