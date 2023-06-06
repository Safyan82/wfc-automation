const express = require('express');
const { getLicenceDetail } = require('./controller');

const app = express();
const port = 3000;


app.get('/api/users/:licenseNo', async(req, res) => {
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
  

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });