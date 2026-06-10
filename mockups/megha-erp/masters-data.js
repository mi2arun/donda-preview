/* =====================================================================
   MEGHA ERP — Masters registry (mockup data)
   One entry per master: columns (with render hint) + sample rows.
   render: 'text' (default) | 'mono' | 'chip' | 'status'
   Grouped to match the production module menu.
   ===================================================================== */
const MASTER_GROUPS = [
  { group:'Organization', icon:'🏢', masters:[
    { key:'group-company', title:'Group Company', singular:'Company', icon:'🏢',
      columns:[{l:'Code',r:'mono'},{l:'Company Name'},{l:'Country'},{l:'Base Currency',r:'chip'},{l:'Tax Reg No',r:'mono'},{l:'City'},{l:'Status',r:'status'}],
      rows:[
        ['RGHK','Rainbow Gems (HK) Ltd','Hong Kong','USD','BR 12345678','Hong Kong','Active'],
        ['DEXP','Donda Exports','India','INR','GSTIN 24ABCDE1234F1Z5','Surat','Active'],
        ['DBVB','Donda BVBA','Belgium','EUR','BE 0123.456.789','Antwerp','Active'],
        ['DDMC','Donda DMCC','UAE','USD','DMCC-145789','Dubai','Inactive']
      ]},
    { key:'supplier', title:'Supplier', singular:'Supplier', icon:'🚚',
      columns:[{l:'Supplier Name'},{l:'Display Name'},{l:'Country'},{l:'Type',r:'chip'},{l:'Payment Terms'},{l:'Currency',r:'chip'},{l:'Status',r:'status'}],
      rows:[
        ['Bonas Couzyn (Antwerp) NV','Bonas Couzyn','Belgium','Expo / Tender','NET5','USD','Active'],
        ['De Beers Global Sightholder','De Beers GSS','United Kingdom','Sightholder','NET30','USD','Active'],
        ['ALROSA Auction House','ALROSA','Russia','Tender','NET7','USD','Active'],
        ['Arctic Canadian Diamond Co.','Arctic Canadian','Canada','Mine / Tender','NET10','USD','Active'],
        ['Petra Diamonds Ltd','Petra Diamonds','South Africa','Tender','NET15','USD','Active'],
        ['RVD Rough Exports','RVD Exports','India','Third-Party','NET30','INR','Active'],
        ['Surat Diam Traders','Surat Diam','India','Third-Party','On receipt','INR','Active']
      ]},
    { key:'customer', title:'Customer', singular:'Customer', icon:'👥',
      columns:[{l:'Customer Name'},{l:'Display Name'},{l:'Group'},{l:'Official Contact',r:'mono'},{l:'Type',r:'chip'},{l:'Category'},{l:'Currency',r:'chip'},{l:'Status',r:'status'}],
      rows:[
        ['Rainbow Gems (HK) Ltd','Rainbow Gems','Inter-Company','+852 2522 1268','Sister Co.','Group','USD','Active'],
        ['AMC Diamonds','AMC Diamonds','Gold Buyers','1023568462','Local','Trade','INR','Active'],
        ['VK Traders','VK Traders','Gold Buyers','222825683','Local','Trade','INR','Active'],
        ['Soundmonk Music','Soundmonk','Soundmonk Music','9863528812','Export','Trade','USD','Active'],
        ['INI Systems','INI Systems','Gold Buyers','09500057978','Local','Trade','INR','Active'],
        ['Global Traders FZE','Global Traders','Export','9800098000','Export','Trade','USD','Active']
      ]},
    { key:'transport', title:'Transport Company', singular:'Transport Co.', icon:'✈️',
      columns:[{l:'Code',r:'mono'},{l:'Name'},{l:'Country'},{l:'IATA',r:'mono'},{l:'Contact',r:'mono'},{l:'Status',r:'status'}],
      rows:[
        ['FERR','Ferrari Belgium BVBA','Belgium','724','+32 3 220 7575','Active'],
        ['MALC','Malca-Amit','Hong Kong','—','+852 2117 1338','Active'],
        ['BRNK','Brinks Global Services','United Kingdom','—','+44 20 7025 7000','Active'],
        ['SEQL','Sequel Logistics','India','—','+91 22 6177 0000','Active']
      ]}
  ]},

  { group:'Trading', icon:'🛒', masters:[
    { key:'expense-type', title:'Expense Type', singular:'Expense Type', icon:'💸',
      columns:[{l:'Code',r:'mono'},{l:'Name'},{l:'Default Account',r:'mono'},{l:'Allocation Basis',r:'chip'},{l:'Status',r:'status'}],
      rows:[
        ['FRT','Freight Charges','5010 · Freight','By Value','Active'],
        ['DUTY','Import Duty','5020 · Duty','By Value','Active'],
        ['INS','Insurance','5030 · Insurance','By Value','Active'],
        ['BRK','Brokerage','5040 · Brokerage','By Value','Active'],
        ['OTH','Other','5090 · Other','By Value','Active']
      ]},
    { key:'payment-terms', title:'Payment Terms', singular:'Payment Term', icon:'📅',
      columns:[{l:'Code',r:'mono'},{l:'Description'},{l:'Days',r:'mono'},{l:'Status',r:'status'}],
      rows:[
        ['NET5','5 working days from invoice','5','Active'],
        ['NET7','7 days from invoice','7','Active'],
        ['NET30','30 days from invoice','30','Active'],
        ['COD','On receipt','0','Active'],
        ['ADV','Advance payment','-','Active']
      ]},
    { key:'currency', title:'Currency', singular:'Currency', icon:'💱',
      columns:[{l:'Code',r:'mono'},{l:'Name'},{l:'Symbol',r:'mono'},{l:'Rate → USD',r:'mono'},{l:'Status',r:'status'}],
      rows:[
        ['USD','US Dollar','$','1.0000','Active'],
        ['EUR','Euro','€','1.0850','Active'],
        ['HKD','Hong Kong Dollar','HK$','0.1280','Active'],
        ['INR','Indian Rupee','₹','0.0120','Active'],
        ['ZAR','South African Rand','R','0.0540','Active'],
        ['GBP','Pound Sterling','£','1.2700','Active']
      ]},
    { key:'hs-code', title:'HS / HSN Code', singular:'HS Code', icon:'🏷️',
      columns:[{l:'Code',r:'mono'},{l:'Description'},{l:'GST Rate',r:'mono'},{l:'Status',r:'status'}],
      rows:[
        ['7102.10','Diamonds, unsorted','0.25%','Active'],
        ['7102.21','Industrial, unworked','0.25%','Active'],
        ['7102.31','Non-industrial, unworked','0.25%','Active'],
        ['7102.39','Other non-industrial','1.50%','Active']
      ]}
  ]},

  { group:'Mining', icon:'⛏️', masters:[
    { key:'country', title:'Country / Origin', singular:'Country', icon:'🌍',
      columns:[{l:'Code',r:'mono'},{l:'Name'},{l:'ISO-2',r:'mono'},{l:'KP Member',r:'chip'},{l:'Status',r:'status'}],
      rows:[
        ['LS','Lesotho','LS','Yes','Active'],['CA','Canada','CA','Yes','Active'],
        ['ZA','South Africa','ZA','Yes','Active'],['BW','Botswana','BW','Yes','Active'],
        ['RU','Russia','RU','Yes','Active'],['BE','Belgium','BE','Yes','Active'],
        ['IN','India','IN','Yes','Active']
      ]},
    { key:'mine', title:'Mine', singular:'Mine', icon:'⛏️',
      columns:[{l:'Code',r:'mono'},{l:'Mine Name'},{l:'Country'},{l:'Mining Company'},{l:'Status',r:'status'}],
      rows:[
        ['KAO','KAO Mine','Lesotho','Storm Mountain Diamonds','Active'],
        ['GK','Gahcho Kué','Canada','Mountain Province','Active'],
        ['DIA','Diavik','Canada','Arctic Canadian','Active'],
        ['CUL','Cullinan','South Africa','Petra Diamonds','Active'],
        ['JWN','Jwaneng','Botswana','Debswana','Active'],
        ['MIR','Mirny','Russia','ALROSA','Active']
      ]}
  ]},

  { group:'Grading', icon:'💎', masters:[
    { key:'stone-type', title:'Stone Type', singular:'Stone Type', icon:'◈',
      columns:[{l:'Code',r:'mono'},{l:'Name'},{l:'Status',r:'status'}],
      rows:[['SINGLE','Single','Active'],['PARCEL','Parcel','Active']]},
    { key:'shape', title:'Shape', singular:'Shape', icon:'🔷',
      columns:[{l:'Code',r:'mono'},{l:'Name'},{l:'Group',r:'chip'},{l:'Status',r:'status'}],
      rows:[
        ['RD','Round','Popular','Active'],['OV','Oval','Popular','Active'],['PR','Pear','Popular','Active'],
        ['CU','Cushion','Popular','Active'],['EM','Emerald','Popular','Active'],['MQ','Marquise','Fancy','Active'],
        ['HT','Heart','Fancy','Active'],['MC','Macle','Rough','Active'],['SW','Sawable','Rough','Active'],
        ['MKE','Makeable','Rough','Active'],['IR','Irregular','Rough','Active']
      ]},
    { key:'color', title:'Color', singular:'Color', icon:'🎨',
      columns:[{l:'Code',r:'mono'},{l:'Name'},{l:'Group',r:'chip'},{l:'Status',r:'status'}],
      rows:[
        ['D','D','Colorless','Active'],['E','E','Colorless','Active'],['F','F','Colorless','Active'],
        ['G','G','Near Colorless','Active'],['H','H','Near Colorless','Active'],['I','I','Near Colorless','Active'],
        ['K','K','Faint','Active'],['FY','Fancy Yellow','Fancy','Active'],['FP','Fancy Pink','Fancy','Active'],
        ['FB','Fancy Blue','Fancy','Active']
      ]},
    { key:'clarity', title:'Clarity', singular:'Clarity', icon:'🔍',
      columns:[{l:'Code',r:'mono'},{l:'Name'},{l:'Group',r:'chip'},{l:'Status',r:'status'}],
      rows:[
        ['FL','Flawless','Flawless','Active'],['IF','Internally Flawless','Flawless','Active'],
        ['VVS1','VVS1','VV Slight','Active'],['VVS2','VVS2','VV Slight','Active'],
        ['VS1','VS1','V Slight','Active'],['VS2','VS2','V Slight','Active'],
        ['SI1','SI1','Slight','Active'],['SI2','SI2','Slight','Active'],
        ['I1','I1','Included','Active'],['I2','I2','Included','Active']
      ]}
  ]},

  { group:'Config', icon:'⚙️', masters:[
    { key:'lot-numbering', title:'Lot Numbering', singular:'Sequence', icon:'🔢',
      columns:[{l:'Sequence'},{l:'Pattern',r:'mono'},{l:'Scope',r:'chip'},{l:'Next No',r:'mono'},{l:'Reset'},{l:'Status',r:'status'}],
      rows:[
        ['Rough Lot','{seq}-{yy}','Group (all companies)','2-26','Yearly','Active'],
        ['Sub-Lot','{lot}-{A}','Per lot','A','—','Active'],
        ['Purchase Invoice','PI-{yy}-{0000}','Per company','PI-26-0007','Yearly','Active'],
        ['Sales Invoice','SI-{yy}-{0000}','Per company','SI-26-0003','Yearly','Active']
      ]}
  ]}
];
