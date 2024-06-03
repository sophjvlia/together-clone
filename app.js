const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
const winston = require('winston');
const FormData = require('form-data');
const multer = require('multer');
const { Redirect } = require('react-router-dom/cjs/react-router-dom.min');

const JWT_SECRET = 'soindfbhnikowefuenwioiub432io34bhb';
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
    ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    ],
});
const upload = multer();


//extract custid
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.custid = decoded.custid;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};


//signup
  app.post('/signup', async (req, res) => {
    try {
      // Log the request for test purposes
      logger.info('Received a request to /signup');
      logger.info('Request body:', req.body);
  
      const { fname, lname, promo, pass, phone, phone_country } = req.body;
  
      // Encode the data in x-www-form-urlencoded format
      const encodedBody = `fname=${encodeURIComponent(fname)}&lname=${encodeURIComponent(lname)}&promo=${encodeURIComponent(promo)}&pass=${encodeURIComponent(pass)}&phone=${encodeURIComponent(phone)}&phone_country=${encodeURIComponent(phone_country)}`;
  
      logger.info(`Encoded body: ${encodedBody}`);

      // Post the encoded data to the API
      const response = await fetch('https://demo.fireworksmedia.com/loyalty/api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        body: encodedBody,
      });


      const responseText = await response.text(); // Read the response as text
      logger.info('API response status:', response.status);
      logger.info('API response headers:', response.headers.raw());
      logger.info('API response text:', responseText); // Log the raw response text

      let result;
      if (responseText) {
        try {
          result = JSON.parse(responseText); // Attempt to parse as JSON
        } catch (parseError) {
          logger.error('Error parsing JSON response:', parseError);
          result = { error: 'Failed to parse JSON response from API' };
        }
      } else {
        result = { error: 'Empty response from API' };
      }

      res.status(response.status).json(result);
  
    } catch (error) {
      logger.error(`Error in /signup route: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
});


//login
app.post('/login', async (req, res) => {
  try {
    // Log the request for test purposes
    logger.info('Received a request to /login');
    logger.info('Request body:', req.body);

    const { isAjax, phone, phone_country, password } = req.body;

    // Encode the data in x-www-form-urlencoded format
    const encodedBody = `isAjax=${encodeURIComponent(isAjax)}&phone=${encodeURIComponent(phone)}&phone_country=${encodeURIComponent(phone_country)}&password=${encodeURIComponent(password)}&`;

    logger.info(`Encoded body: ${encodedBody}`);

    // Post the encoded data to the API
    const response = await fetch('https://demo.fireworksmedia.com/loyalty/api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      body: encodedBody,
    });


    const responseText = await response.text(); // Read the response as text
    logger.info('API response status:', response.status);
    logger.info('API response headers:', response.headers.raw());
    logger.info('API response text:', responseText); // Log the raw response text

    let result;
    if (responseText) {
      try {
        result = JSON.parse(responseText); // Attempt to parse as JSON
      } catch (parseError) {
        logger.error('Error parsing JSON response:', parseError);
        result = { error: 'Failed to parse JSON response from API' };
      }
    } else {
      result = { error: 'Empty response from API' };
    }

    res.status(response.status).json(result);

  } catch (error) {
    logger.error(`Error in /login route: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//logout
app.get('/logout', async (req, res) => {
  try {
    // Log the request for test purposes
    logger.info('Received a request to /logout');

    const response = await fetch('https://demo.fireworksmedia.com/loyalty/api/logout.php');

    if (response.ok) {
      res.status(response.status).json('Logout success');
    } else {
      res.status(response.status).json({ error: 'Failed to logout' });
    }

  } catch (error) {
    logger.error(`Error in /login route: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 



//checkReferral
app.get('/checkReferral', async (req, res) => {
  try {
    const referralCode = req.query.value;
    const response = await fetch(`https://app.tgt.wtf/loyalty/api/checkReferral.php?code=${referralCode}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//getprice
app.get('/checkPrice', async (req, res) => {
  try {
    const referralCode = req.query.value;
    const response = await fetch(`https://app.tgt.wtf/loyalty/api/getPrice.php`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//checkEmail
app.get('/checkEmail', async (req, res) => {
  try {
    const email = req.query.value;
    const response = await fetch(`https://app.tgt.wtf/loyalty/api/checkEmail.php?email=${email}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Register
app.post('/register', async (req, res) => {
  try {
    const { email, pass, fname, lname, referral_code, walletname, walletType, socialmediatype, socialmediatoken, package_id } = req.body;

    const encodedBody = `email=${encodeURIComponent(email)}&pass=${encodeURIComponent(pass)}&fname=${encodeURIComponent(fname)}&lname=${encodeURIComponent(lname)}&referral_code=${encodeURIComponent(referral_code)}&walletname=${encodeURIComponent(walletname)}&walletType=issolana&socialmediatype=${encodeURIComponent(socialmediatype)}&socialmediatoken=${encodeURIComponent(socialmediatoken)}&package_id=${encodeURIComponent(package_id)}`;

    logger.info(`Attempting registration for email: ${email}`);

    const response = await fetch('https://app.tgt.wtf/loyalty/api/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodedBody,
    });

    if (!response.ok) {
      throw new Error('Failed to register');
    }

    const responseData = await response.json();

    if (responseData.status === 'fail') {
      logger.warn(`Registration failed for email: ${email}, Reason: Invalid credentials`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    logger.info(`Registration successful for email: ${email}, custid: ${responseData.custid}`);
    //set token
    fetch(`https://app.tgt.wtf/loyalty/api/tog_addWalletAuto.php?custid=${responseData.custid}&type=issolana&near_wallet=${walletname}`);
    const token = jwt.sign({ custid: responseData.custid }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await fetch('https://app.tgt.wtf/loyalty/api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const responseData = await response.json();

    if (responseData.status === 'fail') {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      const token = jwt.sign({ custid: responseData.custid }, JWT_SECRET, { expiresIn: '30d' });
      res.json({ token });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// for google apple facebook
app.post('/loginsocial',upload.none(), async (req, res) => {
  try {
    const { socialmediatoken, socialmediatype } = req.body;

    logger.info(`Attempting social media login for type: ${socialmediatype}, token: ${socialmediatoken}`);

    const formData = new FormData();
    formData.append('socialmediatoken', socialmediatoken);
    formData.append('socialmediatype', socialmediatype);

    const response = await fetch('https://app.tgt.wtf/loyalty/api/login.php', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const responseData = await response.json();

    if (responseData.status === 'fail') {
      logger.warn(`Social media login failed for type: ${socialmediatype}, token: ${socialmediatoken}, Reason: Invalid credentials`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    //patch and get wallet
    const fetchwallet = await fetch(`https://app.tgt.wtf/loyalty/api/tog_addWalletAuto.php?custid=${responseData.custid}`);
    const fetchwallets = await fetchwallet.json();
    //get the purchase status
    const custresponse = await fetch(`https://app.tgt.wtf/loyalty/api/tog_getPurchaseStatus.php?wallet=${fetchwallets.wallet}`);
    const custdata = await custresponse.json();

    logger.info(`Social media login successful for type: ${socialmediatype}, token: ${socialmediatoken}, custid: ${responseData.custid}`);
    
    const token = jwt.sign({ custid: responseData.custid }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, custdata });
  } catch (error) {
    logger.error(`Error logging in with social media: ${error.message}`);
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// for order detail pages
app.get('/api/getCustDetail', verifyToken, async (req, res) => {
  try {
    const custid = req.custid;
    logger.info(`Fetching customer details for custid: ${custid}`);

    const response = await fetch(`https://app.tgt.wtf/loyalty/api/getCustDetail.php?custid=${custid}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    logger.info(`Customer details fetched successfully for custid: ${custid}`);

    res.json(data);
  } catch (error) {
    logger.error(`Error fetching customer details: ${error.message}`);
    console.error('Error fetching customer details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//after payment to uodate session
app.get('/session', verifyToken, async (req, res) => {
  try {
    const startTime = new Date();
    const custid = req.custid;
    const sessionId = req.query.session_id;
    const spackage = req.query.package;
    const gift = req.query.gift;
    const series = req.query.series;
    logger.info(`[${startTime.toISOString()}] Fetching session details for custid: ${custid}, session_id: ${sessionId}`);
    const response = await fetch(`https://app.tgt.wtf/buy/session.php?session_id=${sessionId}&custid=${custid}&package=${spackage}&gift=${gift}&series=${series}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }else{
      const responseData = await response.json();
      res.json(responseData);
    }
  } catch (error) {
    logger.error(`Error: ${error.message}.`);
    console.error('Error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//after payment to uodate session
app.get('/session2', verifyToken, async (req, res) => {
  try {
    const startTime = new Date();
    const custid = req.custid;
    const sessionId = req.query.session_id;
    const spackage = req.query.package;
    const gift = req.query.gift;
    const series = req.query.series;
    logger.info(`[${startTime.toISOString()}] Fetching session details for custid: ${custid}, session_id: ${sessionId}`);
    const response = await fetch(`https://app.tgt.wtf/buy/session2.php?session_id=${sessionId}&custid=${custid}&package=${spackage}&gift=${gift}&series=${series}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }else{
      const responseData = await response.json();
      res.json(responseData);
    }
  } catch (error) {
    logger.error(`Error: ${error.message}.`);
    console.error('Error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/session2', verifyToken, async (req, res) => {
  try {
    const startTime = new Date();
    const custid = req.custid;
    const sessionId = req.query.session_id;
    const spackage = req.query.package;
    const gift = req.query.gift;
    const series = req.query.series;
    logger.info(`[${startTime.toISOString()}] Fetching session details for custid: ${custid}, session_id: ${sessionId}`);
    const response = await fetch(`https://app.tgt.wtf/buy/session2.php?session_id=${sessionId}&custid=${custid}&package=${spackage}&gift=${gift}&series=${series}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }else{
      const responseData = await response.json();
      res.json(responseData);
    }
  } catch (error) {
    logger.error(`Error: ${error.message}.`);
    console.error('Error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//checknft rebirth view on marketplace
app.get('/checkNFT', async (req, res) => {
  try {
    const code = req.query.code;
    const response = await fetch(`https://paras.id/token/x.paras.near::506165/${code}`);

    if (response.status === 200) {
      res.json(response.status);
    } else {
      res.status(404).json({ error: 'not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

//checknft lucky view on marketplace
app.get('/checkNFTs', async (req, res) => {
  try {
    const code = req.query.code;
    const response = await fetch(`https://paras.id/token/x.paras.near::506166/${code}`);

    if (response.status === 200) {
      res.json(response.status);
    } else {
      res.status(404).json({ error: 'not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

//transfer nft
app.post('/transferNFT', async (req, res) => {
  try {
    const startTime = new Date();
    const { account, savedtgtWallet, savedTokenid } = req.body;
    logger.info(`[${startTime.toISOString()}] Initiating NFT transfer from wallet ${savedtgtWallet} to account ${account} for token ID ${savedTokenid}`);

    const transfer = await fetch(`https://rpc.tgt.wtf/api/transferNFT?wallet=${account}&from_wallet=${savedtgtWallet}&tokenid=${savedTokenid}`);
    const data = await transfer.text();
    const endTime = new Date();
    const executionTime = (endTime - startTime) / 1000;
    logger.info(`[${endTime.toISOString()}] NFT transfer successful for token ID ${savedTokenid}. Total execution time: ${executionTime} seconds`);
    res.send(data);
  } catch (error) {
    const endTime = new Date();
    const executionTime = (endTime - startTime) / 1000;
    logger.error(`[${endTime.toISOString()}] Error transferring NFT: ${error.message}. Total execution time: ${executionTime} seconds`);
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//update the customer after tranfer ntf success
app.get('/change', verifyToken, async (req, res) => {
  try {
    const custid = req.custid;
    const hashto = req.query.hashto;
    const hashtransfer = req.query.hashtransfer;
    const response = await fetch(`https://app.tgt.wtf/loyalty/api/updateCustDetail.php?custid=${custid}&hashto=${hashto}&hashtransfer=${hashtransfer}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching customer details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get customer details
app.get('/search', verifyToken, async (req, res) => {
 try {
  const custid = req.custid;
  const response = await fetch(`https://app.tgt.wtf/loyalty/api/profile.php?custid=${custid}&mainnet=1`);

  if (!response.ok) {
   throw new Error('Network response was not ok');
 }
 const getProfile = await response.json();
 res.json(getProfile);

} catch (error) {
 console.error('Error fetching customer details:', error);
 res.status(500).json({ error: 'Internal server error' });
}
});
// get customer details
app.get('/search_dev', verifyToken, async (req, res) => {
 try {
  const custid = req.custid;
  const response = await fetch(`https://app.tgt.wtf/loyalty/api/profile.php?custid=${custid}&mainnet=0`);

  if (!response.ok) {
   throw new Error('Network response was not ok');
 }
 const getProfile = await response.json();
 res.json(getProfile);

} catch (error) {
 console.error('Error fetching customer details:', error);
 res.status(500).json({ error: 'Internal server error' });
}
});
//get packages datas
app.get('/package', async (req, res) => {
  try {
    const response = await fetch(`https://app.tgt.wtf/loyalty/api/package.php`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching customer details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//update address based on custid
app.post('/updateCust', verifyToken, async (req, res) => {
  try {
    const custid = req.custid;
    const { address1, address2, city, state, postcode } = req.body;
    const response = await fetch('https://app.tgt.wtf/loyalty/api/updateProfile.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `custid=${encodeURIComponent(custid)}&address1=${encodeURIComponent(address1)}&address2=${encodeURIComponent(address2)}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&postcode=${encodeURIComponent(postcode)}`,
    });

    if (!response.ok) {
      throw new Error('Failed to update customer profile');
    }

    const responseData = await response.json();

    if (responseData.status === 'fail') {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      res.json(responseData);
    }
  } catch (error) {
    console.error('Error updating customer profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//update address based on custid
app.post('/updateName', verifyToken, async (req, res) => {
  try {
    const custid = req.custid;
    const { fname, lname, email} = req.body;
    const response = await fetch('https://app.tgt.wtf/loyalty/api/updateProfile.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `custid=${encodeURIComponent(custid)}&fname=${encodeURIComponent(fname)}&email=${encodeURIComponent(email)}&lname=${encodeURIComponent(lname)}`,
    });
    if (!response.ok) {
      throw new Error('Failed to update customer profile');
    }

    const responseData = await response.json();

    if (responseData.status === 'fail') {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      res.json(responseData);
    }
  } catch (error) {
    console.error('Error updating customer profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//Retry Status when the minting fail
app.get('/checkStatus', verifyToken, async (req, res) => {
  try {
    const custid = req.custid;
    const custresponse = await fetch(`https://app.tgt.wtf/loyalty/api/tog_addWalletAuto.php?custid=${custid}`);
    const custdata = await custresponse.json();
    
    if (custdata.status == "success") {
      const response1 = await fetch(`https://app.tgt.wtf/loyalty/api/getCustDetail.php?custid=${custid}`);
      const data = await response1.json();
      
      const walletName = data.tgtwallet;
      const walletType = data.walletype;
      const plan = data.package_detail.id;
      const series = data.package_detail.series;

      const mintStartTime = new Date();
      try {
        const mintNFTResponse = await fetch(`https://rpc.tgt.wtf/api/mintNFT?receiver_full_address=${walletName}&receiver=&series=${series}`);
        const mintEndTime = new Date();
        const mintExecutionTime = (mintEndTime - mintStartTime) / 1000;
        const mintData = await mintNFTResponse.json();

        if (mintData.success) {
          const hash = mintData.data.hash;
          const tokenid = mintData.data.tokenid;

          logger.info(`NFT minted successfully for custid: ${custid}, WalletID: ${walletName}, hash: ${hash}, tokenid: ${tokenid}. Mint execution time: ${mintExecutionTime} seconds`);

          const savedStartTime = new Date();
          const savedResponse = await fetch(`https://app.tgt.wtf/loyalty/api/updateCustDetail.php?custid=${custid}&hash=${hash}&tokenid=${tokenid}`);
          const savedEndTime = new Date();
          const savedExecutionTime = (savedEndTime - savedStartTime) / 1000;

        } else {
          res.json({ status: mintData }); 
          return; 
        }
      } catch (error) {
        res.json({ status: mintData });
        return; 
      }
    }
    res.json({ status: mintData });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' }); 
  }
});

app.get('/getMintStatus', async (req, res) => {
  const wallet = req.query.wallet;
  const custresponse = await fetch(`https://app.tgt.wtf/loyalty/api/tog_getPurchaseStatus.php?wallet=${wallet}`);
  const custdata = await custresponse.json();
  res.json(custdata);
});

app.get('/getPayment', verifyToken, async (req, res) => {
 try {
  const custid = req.custid;
  const response = await fetch(`https://app.tgt.wtf/loyalty/api/tog_payment_check.php?custid=${custid}`);

  if (!response.ok) {
   throw new Error('Network response was not ok');
 }
 const getProfile = await response.json();
 res.json(getProfile);

} catch (error) {
 console.error('Error fetching customer details:', error);
 res.status(500).json({ error: 'Internal server error' });
}
});
app.get('/getHistory', verifyToken, async (req, res) => {
 try {
  const custid = req.custid;
  const response = await fetch(`https://app.tgt.wtf/loyalty/api/tog_payment_transaction.php?custid=${custid}`);

  if (!response.ok) {
   throw new Error('Network response was not ok');
 }
 const getProfile = await response.json();
 res.json(getProfile);

} catch (error) {
 console.error('Error fetching customer details:', error);
 res.status(500).json({ error: 'Internal server error' });
}
});

app.get('/getHistorydev', verifyToken, async (req, res) => {
 try {
  const custid = req.custid;
  const response = await fetch(`https://app.tgt.wtf/loyalty/api/tog_payment_transaction_dev.php?custid=${custid}`);

  if (!response.ok) {
   throw new Error('Network response was not ok');
 }
 const getProfile = await response.json();
 res.json(getProfile);

} catch (error) {
 console.error('Error fetching customer details:', error);
 res.status(500).json({ error: 'Internal server error' });
}
});

app.get('/getWalletList', verifyToken, async (req, res) => {
 try {
  const response = await fetch(`https://app.tgt.wtf/loyalty/api/tog_wallet.php`);

  if (!response.ok) {
   throw new Error('Network response was not ok');
 }
 const getProfile = await response.json();
 res.json(getProfile);

} catch (error) {
 console.error('Error fetching customer details:', error);
 res.status(500).json({ error: 'Internal server error' });
}
});

app.get('/getTribeTransactionmain', verifyToken, async (req, res) => {
 try {
  const custid = req.custid;
  const response = await fetch(`https://app.tgt.wtf/loyalty/api/tog_ref_payment.php?custid=${custid}&mainnet=1`);

  if (!response.ok) {
   throw new Error('Network response was not ok');
 }
 const getProfile = await response.json();
 res.json(getProfile);

} catch (error) {
 console.error('Error fetching customer details:', error);
 res.status(500).json({ error: 'Internal server error' });
}
});
app.get('/getTribeTransactiondev', verifyToken, async (req, res) => {
 try {
  const custid = req.custid;
  const response = await fetch(`https://app.tgt.wtf/loyalty/api/tog_ref_payment.php?custid=${custid}&mainnet=0`);

  if (!response.ok) {
   throw new Error('Network response was not ok');
 }
 const getProfile = await response.json();
 res.json(getProfile);

} catch (error) {
 console.error('Error fetching customer details:', error);
 res.status(500).json({ error: 'Internal server error' });
}
});
app.get('/getBonus', verifyToken, async (req, res) => {
 try {
  const custid = req.custid;
  const response = await fetch(`https://app.tgt.wtf/loyalty/api/tog_ref_bonus.php?custid=${custid}`);

  if (!response.ok) {
   throw new Error('Network response was not ok');
 }
 const getProfile = await response.json();
 res.json(getProfile);

} catch (error) {
 console.error('Error fetching customer details:', error);
 res.status(500).json({ error: 'Internal server error' });
}
});
app.get('/getBonusList', verifyToken, async (req, res) => {
 try {
  const custid = req.custid;
  const response = await fetch(`https://app.tgt.wtf/loyalty/api/tribe_ref.php?custid=${custid}`);

  if (!response.ok) {
   throw new Error('Network response was not ok');
 }
 const getProfile = await response.json();
 res.json(getProfile);

} catch (error) {
 console.error('Error fetching customer details:', error);
 res.status(500).json({ error: 'Internal server error' });
}
});
app.post('/confirmPayment',verifyToken, async (req, res) => {
  try {
    const custid = req.custid;
    const { walletAddress,type } = req.body;
    const response = await fetch('https://app.tgt.wtf/loyalty/api/create_transaction.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `custid=${encodeURIComponent(custid)}&wallet_from=${encodeURIComponent(walletAddress)}&type=${encodeURIComponent(type)}`,
    });
    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }
    const responseData = await response.json();
    res.json(responseData);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
