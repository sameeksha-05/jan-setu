// Demo scheme data. Keep this in sync with the backend's schemes.json later.
//
// weights: how strongly each detected "profile" (farmer, student, ...) points to this scheme.
//   3 = the scheme is built for this person, 2 = a strong hint, 1 = a weak hint.
//   A scheme is shown when its total score is 2 or more.
// needs: only show the scheme when this profile was detected (used for state-specific schemes).
// Details change over time, so the app always tells people to confirm on the official site.

export const SCHEMES = [
  {
    id: 'pm-kisan',
    level: 'central',
    url: 'https://pmkisan.gov.in',
    name: {
      en: 'PM-KISAN',
      hi: 'पीएम-किसान सम्मान निधि',
      kn: 'ಪಿಎಂ-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ',
    },
    benefit: {
      en: '₹6,000 a year, paid in three instalments, directly to the bank accounts of eligible farmer families.',
      hi: 'पात्र किसान परिवारों के बैंक खाते में सीधे साल में ₹6,000, तीन किस्तों में।',
      kn: 'ಅರ್ಹ ರೈತ ಕುಟುಂಬಗಳ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ವರ್ಷಕ್ಕೆ ₹6,000, ಮೂರು ಕಂತುಗಳಲ್ಲಿ ನೇರವಾಗಿ.',
    },
    how: {
      en: 'Register on the PM-KISAN portal or at a Common Service Centre, then link your Aadhaar and bank account.',
      hi: 'पीएम-किसान पोर्टल या कॉमन सर्विस सेंटर पर पंजीकरण करें, फिर आधार और बैंक खाता जोड़ें।',
      kn: 'ಪಿಎಂ-ಕಿಸಾನ್ ಪೋರ್ಟಲ್ ಅಥವಾ ಕಾಮನ್ ಸರ್ವಿಸ್ ಸೆಂಟರ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ, ನಂತರ ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆ ಜೋಡಿಸಿ.',
    },
    docs: ['aadhaar', 'land', 'bank', 'mobile'],
    weights: { farmer: 3 },
  },
  {
    id: 'pmfby',
    level: 'central',
    url: 'https://pmfby.gov.in',
    name: {
      en: 'PM Fasal Bima Yojana',
      hi: 'प्रधानमंत्री फसल बीमा योजना',
      kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ',
    },
    benefit: {
      en: 'Insurance that pays farmers when crops are lost to natural calamities, pests or diseases.',
      hi: 'प्राकृतिक आपदा, कीट और रोग से फसल को हुए नुकसान पर बीमा सुरक्षा।',
      kn: 'ನೈಸರ್ಗಿಕ ವಿಕೋಪ, ಕೀಟ ಮತ್ತು ರೋಗಗಳಿಂದ ಬೆಳೆ ನಷ್ಟವಾದರೆ ವಿಮಾ ರಕ್ಷಣೆ.',
    },
    how: {
      en: "Apply through your bank, a Common Service Centre or the PMFBY portal before the crop season's last date.",
      hi: 'बैंक, कॉमन सर्विस सेंटर या पीएमएफबीवाई पोर्टल से फसल सीज़न की अंतिम तिथि से पहले आवेदन करें।',
      kn: 'ಬೆಳೆ ಋತುವಿನ ಕೊನೆಯ ದಿನಾಂಕದೊಳಗೆ ಬ್ಯಾಂಕ್, ಕಾಮನ್ ಸರ್ವಿಸ್ ಸೆಂಟರ್ ಅಥವಾ ಪಿಎಂಎಫ್‌ಬಿವೈ ಪೋರ್ಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    },
    docs: ['aadhaar', 'land', 'bank', 'sowing'],
    weights: { farmer: 3 },
  },
  {
    id: 'kcc',
    level: 'central',
    url: 'https://www.myscheme.gov.in',
    name: {
      en: 'Kisan Credit Card',
      hi: 'किसान क्रेडिट कार्ड',
      kn: 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್',
    },
    benefit: {
      en: 'Low-interest, easy credit for seeds, fertiliser and other farming needs.',
      hi: 'बीज, खाद और खेती की ज़रूरतों के लिए कम ब्याज पर आसान कर्ज़।',
      kn: 'ಬೀಜ, ಗೊಬ್ಬರ ಮತ್ತು ಕೃಷಿ ಅಗತ್ಯಗಳಿಗೆ ಕಡಿಮೆ ಬಡ್ಡಿಯ ಸುಲಭ ಸಾಲ.',
    },
    how: {
      en: 'Visit your bank branch with your land papers and ask for a Kisan Credit Card application.',
      hi: 'ज़मीन के कागज़ात लेकर अपनी बैंक शाखा जाएँ और किसान क्रेडिट कार्ड का फ़ॉर्म माँगें।',
      kn: 'ಜಮೀನಿನ ದಾಖಲೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಶಾಖೆಗೆ ಹೋಗಿ, ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಅರ್ಜಿ ಕೇಳಿ.',
    },
    docs: ['aadhaar', 'land', 'bank', 'photo'],
    weights: { farmer: 3 },
  },
  {
    id: 'ayushman',
    level: 'central',
    url: 'https://pmjay.gov.in',
    name: {
      en: 'Ayushman Bharat PM-JAY',
      hi: 'आयुष्मान भारत पीएम-जेएवाई',
      kn: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಪಿಎಂ-ಜೆಎವೈ',
    },
    benefit: {
      en: 'Free treatment up to ₹5 lakh per family each year at listed hospitals. Now extended to everyone aged 70 and above.',
      hi: 'सूचीबद्ध अस्पतालों में हर परिवार को सालाना ₹5 लाख तक का मुफ़्त इलाज; 70 वर्ष से अधिक के बुज़ुर्ग भी शामिल।',
      kn: 'ಪಟ್ಟಿಯಲ್ಲಿರುವ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ವರ್ಷಕ್ಕೆ ₹5 ಲಕ್ಷದವರೆಗೆ ಉಚಿತ ಚಿಕಿತ್ಸೆ; 70 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಹಿರಿಯರಿಗೂ ಅನ್ವಯ.',
    },
    how: {
      en: 'Check your name on the PM-JAY site or at a Common Service Centre. If eligible, get your Ayushman card made.',
      hi: 'पीएम-जेएवाई साइट या कॉमन सर्विस सेंटर पर अपना नाम जाँचें; पात्र हों तो आयुष्मान कार्ड बनवाएँ।',
      kn: 'ಪಿಎಂ-ಜೆಎವೈ ವೆಬ್‌ಸೈಟ್ ಅಥವಾ ಕಾಮನ್ ಸರ್ವಿಸ್ ಸೆಂಟರ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರು ಪರಿಶೀಲಿಸಿ; ಅರ್ಹರಾಗಿದ್ದರೆ ಆಯುಷ್ಮಾನ್ ಕಾರ್ಡ್ ಮಾಡಿಸಿ.',
    },
    docs: ['aadhaar', 'ration', 'mobile'],
    weights: { health: 3, senior: 2, poor: 2 },
  },
  {
    id: 'nsp',
    level: 'central',
    url: 'https://scholarships.gov.in',
    name: {
      en: 'National Scholarship Portal',
      hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल',
      kn: 'ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್',
    },
    benefit: {
      en: 'Central and state scholarships for school, college and professional students, all applied for on one portal.',
      hi: 'स्कूल, कॉलेज और प्रोफ़ेशनल कोर्स के छात्रों के लिए केंद्र और राज्य की छात्रवृत्तियाँ, एक ही पोर्टल पर आवेदन।',
      kn: 'ಶಾಲೆ, ಕಾಲೇಜು ಮತ್ತು ವೃತ್ತಿಪರ ಕೋರ್ಸ್ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಸರ್ಕಾರದ ವಿದ್ಯಾರ್ಥಿವೇತನ, ಒಂದೇ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ.',
    },
    how: {
      en: 'Register on the National Scholarship Portal, fill in the form, upload your documents and submit before the deadline.',
      hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल पर पंजीकरण करें, फ़ॉर्म भरें, दस्तावेज़ अपलोड करें और अंतिम तिथि से पहले जमा करें।',
      kn: 'ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ, ಅರ್ಜಿ ಭರ್ತಿ ಮಾಡಿ, ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ಕೊನೆಯ ದಿನಾಂಕದೊಳಗೆ ಸಲ್ಲಿಸಿ.',
    },
    docs: ['aadhaar', 'bank', 'marks', 'income', 'bonafide', 'caste'],
    weights: { student: 3 },
  },
  {
    id: 'jan-dhan',
    level: 'central',
    url: 'https://pmjdy.gov.in',
    name: {
      en: 'PM Jan Dhan Yojana',
      hi: 'प्रधानमंत्री जन धन योजना',
      kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಜನ್ ಧನ್ ಯೋಜನೆ',
    },
    benefit: {
      en: 'A zero-balance bank account with a RuPay debit card and accident insurance.',
      hi: 'ज़ीरो बैलेंस बैंक खाता, रुपे डेबिट कार्ड और दुर्घटना बीमा के साथ।',
      kn: 'ಶೂನ್ಯ ಬಾಕಿ ಬ್ಯಾಂಕ್ ಖಾತೆ, ರುಪೇ ಡೆಬಿಟ್ ಕಾರ್ಡ್ ಮತ್ತು ಅಪಘಾತ ವಿಮೆ.',
    },
    how: {
      en: 'Walk into any bank branch or Bank Mitra point with your Aadhaar and ask to open a Jan Dhan account.',
      hi: 'आधार लेकर किसी भी बैंक शाखा या बैंक मित्र के पास जाएँ और जन धन खाता खुलवाएँ।',
      kn: 'ಆಧಾರ್ ತೆಗೆದುಕೊಂಡು ಯಾವುದೇ ಬ್ಯಾಂಕ್ ಶಾಖೆ ಅಥವಾ ಬ್ಯಾಂಕ್ ಮಿತ್ರ ಕೇಂದ್ರಕ್ಕೆ ಹೋಗಿ ಜನ್ ಧನ್ ಖಾತೆ ತೆರೆಯಿರಿ.',
    },
    docs: ['aadhaar', 'photo', 'address'],
    weights: { bank: 3, poor: 2, worker: 1 },
  },
  {
    id: 'ration-card',
    level: 'central',
    url: 'https://nfsa.gov.in',
    name: {
      en: 'Ration Card (food security)',
      hi: 'राशन कार्ड (खाद्य सुरक्षा)',
      kn: 'ಪಡಿತರ ಚೀಟಿ (ಆಹಾರ ಭದ್ರತೆ)',
    },
    benefit: {
      en: 'Subsidised food grains every month for eligible households.',
      hi: 'पात्र परिवारों को हर महीने रियायती दर पर अनाज।',
      kn: 'ಅರ್ಹ ಕುಟುಂಬಗಳಿಗೆ ಪ್ರತಿ ತಿಂಗಳು ಸಬ್ಸಿಡಿ ದರದಲ್ಲಿ ಆಹಾರ ಧಾನ್ಯ.',
    },
    how: {
      en: 'Apply through your state food department portal or the local ration office, with the documents listed.',
      hi: 'अपने राज्य के खाद्य विभाग के पोर्टल या स्थानीय राशन कार्यालय में ये दस्तावेज़ देकर आवेदन करें।',
      kn: 'ನಿಮ್ಮ ರಾಜ್ಯದ ಆಹಾರ ಇಲಾಖೆಯ ಪೋರ್ಟಲ್ ಅಥವಾ ಸ್ಥಳೀಯ ಪಡಿತರ ಕಚೇರಿಯಲ್ಲಿ ಈ ದಾಖಲೆಗಳೊಂದಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    },
    docs: ['aadhaar', 'address', 'income', 'photo'],
    weights: { food: 3, poor: 2 },
  },
  {
    id: 'old-age-pension',
    level: 'central',
    url: 'https://nsap.nic.in',
    name: {
      en: 'Indira Gandhi National Old Age Pension',
      hi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन',
      kn: 'ಇಂದಿರಾ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ವೃದ್ಧಾಪ್ಯ ವೇತನ',
    },
    benefit: {
      en: 'A monthly pension for older people from poor households. The amount varies by state.',
      hi: 'गरीब परिवारों के बुज़ुर्गों के लिए मासिक पेंशन; राशि राज्य के अनुसार अलग-अलग।',
      kn: 'ಬಡ ಕುಟುಂಬಗಳ ಹಿರಿಯರಿಗೆ ಮಾಸಿಕ ಪಿಂಚಣಿ; ಮೊತ್ತ ರಾಜ್ಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಬದಲಾಗುತ್ತದೆ.',
    },
    how: {
      en: 'Apply at your gram panchayat, taluk office or the state pension portal with age and income proof.',
      hi: 'उम्र और आय के प्रमाण के साथ ग्राम पंचायत, तालुका कार्यालय या राज्य पेंशन पोर्टल पर आवेदन करें।',
      kn: 'ವಯಸ್ಸು ಮತ್ತು ಆದಾಯದ ಪುರಾವೆಯೊಂದಿಗೆ ಗ್ರಾಮ ಪಂಚಾಯಿತಿ, ತಾಲ್ಲೂಕು ಕಚೇರಿ ಅಥವಾ ರಾಜ್ಯ ಪಿಂಚಣಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    },
    docs: ['aadhaar', 'age', 'bpl', 'bank'],
    weights: { senior: 3, poor: 2 },
  },
  {
    id: 'atal-pension',
    level: 'central',
    url: 'https://www.jansuraksha.gov.in',
    name: {
      en: 'Atal Pension Yojana',
      hi: 'अटल पेंशन योजना',
      kn: 'ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆ',
    },
    benefit: {
      en: 'A guaranteed monthly pension of ₹1,000 to ₹5,000 after age 60, for workers who join between 18 and 40.',
      hi: '18 से 40 वर्ष में जुड़ने वाले कामगारों को 60 वर्ष के बाद ₹1,000 से ₹5,000 मासिक पेंशन की गारंटी।',
      kn: '18 ರಿಂದ 40 ವರ್ಷದೊಳಗೆ ಸೇರುವ ಕಾರ್ಮಿಕರಿಗೆ 60 ವರ್ಷದ ನಂತರ ತಿಂಗಳಿಗೆ ₹1,000 ರಿಂದ ₹5,000 ಖಚಿತ ಪಿಂಚಣಿ.',
    },
    how: {
      en: 'Open it through your bank or post office savings account. The monthly amount is deducted automatically.',
      hi: 'बैंक या डाकघर के बचत खाते से खोलें; मासिक किस्त अपने आप कट जाती है।',
      kn: 'ಬ್ಯಾಂಕ್ ಅಥವಾ ಅಂಚೆ ಕಚೇರಿ ಉಳಿತಾಯ ಖಾತೆಯ ಮೂಲಕ ತೆರೆಯಿರಿ; ಮಾಸಿಕ ಕಂತು ತಾನಾಗಿ ಕಡಿತವಾಗುತ್ತದೆ.',
    },
    docs: ['aadhaar', 'bank', 'mobile'],
    weights: { worker: 3, business: 1, bank: 1 },
  },
  {
    id: 'e-shram',
    level: 'central',
    url: 'https://eshram.gov.in',
    name: {
      en: 'e-Shram Card',
      hi: 'ई-श्रम कार्ड',
      kn: 'ಇ-ಶ್ರಮ್ ಕಾರ್ಡ್',
    },
    benefit: {
      en: 'Free registration for unorganised workers, with accident insurance and access to welfare schemes.',
      hi: 'असंगठित कामगारों के लिए मुफ़्त पंजीकरण, दुर्घटना बीमा और कल्याण योजनाओं का लाभ।',
      kn: 'ಅಸಂಘಟಿತ ಕಾರ್ಮಿಕರಿಗೆ ಉಚಿತ ನೋಂದಣಿ, ಅಪಘಾತ ವಿಮೆ ಮತ್ತು ಕಲ್ಯಾಣ ಯೋಜನೆಗಳ ಲಾಭ.',
    },
    how: {
      en: 'Register free on the e-Shram portal or at a Common Service Centre, using your Aadhaar-linked mobile number.',
      hi: 'आधार से जुड़े मोबाइल नंबर से ई-श्रम पोर्टल या कॉमन सर्विस सेंटर पर मुफ़्त पंजीकरण करें।',
      kn: 'ಆಧಾರ್‌ಗೆ ಜೋಡಿಸಿದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಇ-ಶ್ರಮ್ ಪೋರ್ಟಲ್ ಅಥವಾ ಕಾಮನ್ ಸರ್ವಿಸ್ ಸೆಂಟರ್‌ನಲ್ಲಿ ಉಚಿತವಾಗಿ ನೋಂದಾಯಿಸಿ.',
    },
    docs: ['aadhaar', 'mobile', 'bank'],
    weights: { worker: 3, poor: 1 },
  },
  {
    id: 'ujjwala',
    level: 'central',
    url: 'https://www.pmuy.gov.in',
    name: {
      en: 'PM Ujjwala Yojana',
      hi: 'प्रधानमंत्री उज्ज्वला योजना',
      kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಉಜ್ವಲ ಯೋಜನೆ',
    },
    benefit: {
      en: 'A free LPG gas connection for women from poor households.',
      hi: 'गरीब परिवारों की महिलाओं को मुफ़्त एलपीजी गैस कनेक्शन।',
      kn: 'ಬಡ ಕುಟುಂಬಗಳ ಮಹಿಳೆಯರಿಗೆ ಉಚಿತ ಎಲ್‌ಪಿಜಿ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ.',
    },
    how: {
      en: 'Apply at a nearby LPG distributor or on the Ujjwala portal.',
      hi: 'नज़दीकी एलपीजी वितरक या उज्ज्वला पोर्टल पर आवेदन करें।',
      kn: 'ಹತ್ತಿರದ ಎಲ್‌ಪಿಜಿ ವಿತರಕರ ಬಳಿ ಅಥವಾ ಉಜ್ವಲ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    },
    docs: ['aadhaar', 'ration', 'bpl', 'bank'],
    weights: { gas: 3, poor: 2, woman: 1 },
  },
  {
    id: 'pmay',
    level: 'central',
    url: 'https://pmaymis.gov.in',
    name: {
      en: 'PM Awas Yojana',
      hi: 'प्रधानमंत्री आवास योजना',
      kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ',
    },
    benefit: {
      en: 'Financial help to build or buy a pucca house for families who do not have one.',
      hi: 'बिना पक्के घर वाले परिवारों को घर बनाने या खरीदने के लिए आर्थिक सहायता।',
      kn: 'ಪಕ್ಕಾ ಮನೆ ಇಲ್ಲದ ಕುಟುಂಬಗಳಿಗೆ ಮನೆ ಕಟ್ಟಲು ಅಥವಾ ಖರೀದಿಸಲು ಆರ್ಥಿಕ ನೆರವು.',
    },
    how: {
      en: 'Apply through your gram panchayat or urban local body, or on the PMAY website.',
      hi: 'ग्राम पंचायत या नगर निकाय के माध्यम से, या पीएमएवाई वेबसाइट पर आवेदन करें।',
      kn: 'ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ಅಥವಾ ನಗರ ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ ಮೂಲಕ, ಅಥವಾ ಪಿಎಂಎವೈ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    },
    docs: ['aadhaar', 'income', 'bank', 'nohouse'],
    weights: { houseless: 3, poor: 1 },
  },
  {
    id: 'mudra',
    level: 'central',
    url: 'https://www.mudra.org.in',
    name: {
      en: 'PM MUDRA Yojana',
      hi: 'प्रधानमंत्री मुद्रा योजना',
      kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಮುದ್ರಾ ಯೋಜನೆ',
    },
    benefit: {
      en: 'Loans without collateral to start or grow a small business.',
      hi: 'छोटा व्यवसाय शुरू करने या बढ़ाने के लिए बिना गारंटी के कर्ज़।',
      kn: 'ಸಣ್ಣ ವ್ಯಾಪಾರ ಆರಂಭಿಸಲು ಅಥವಾ ವಿಸ್ತರಿಸಲು ಜಾಮೀನು ಇಲ್ಲದ ಸಾಲ.',
    },
    how: {
      en: 'Take a simple business plan to a bank, NBFC or microfinance lender and ask for a Mudra loan.',
      hi: 'सरल व्यवसाय योजना के साथ बैंक, एनबीएफ़सी या माइक्रोफ़ाइनेंस संस्था से मुद्रा ऋण माँगें।',
      kn: 'ಸರಳ ವ್ಯಾಪಾರ ಯೋಜನೆಯೊಂದಿಗೆ ಬ್ಯಾಂಕ್, ಎನ್‌ಬಿಎಫ್‌ಸಿ ಅಥವಾ ಮೈಕ್ರೋಫೈನಾನ್ಸ್ ಸಂಸ್ಥೆಯಲ್ಲಿ ಮುದ್ರಾ ಸಾಲ ಕೇಳಿ.',
    },
    docs: ['aadhaar', 'pan', 'business', 'bank'],
    weights: { business: 3 },
  },
  {
    id: 'sukanya',
    level: 'central',
    url: 'https://www.nsiindia.gov.in',
    name: {
      en: 'Sukanya Samriddhi Yojana',
      hi: 'सुकन्या समृद्धि योजना',
      kn: 'ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ ಯೋಜನೆ',
    },
    benefit: {
      en: 'A savings account for a girl child under 10, with higher interest and tax benefits, to fund her future.',
      hi: '10 वर्ष से कम की बेटी के भविष्य के लिए ऊँचे ब्याज और कर लाभ वाला बचत खाता।',
      kn: '10 ವರ್ಷದೊಳಗಿನ ಹೆಣ್ಣು ಮಗುವಿನ ಭವಿಷ್ಯಕ್ಕಾಗಿ ಹೆಚ್ಚಿನ ಬಡ್ಡಿ ಮತ್ತು ತೆರಿಗೆ ಲಾಭದ ಉಳಿತಾಯ ಖಾತೆ.',
    },
    how: {
      en: "Open the account at any post office or authorised bank with the girl's birth certificate.",
      hi: 'बेटी के जन्म प्रमाण पत्र के साथ किसी भी डाकघर या अधिकृत बैंक में खाता खोलें।',
      kn: 'ಹೆಣ್ಣು ಮಗುವಿನ ಜನನ ಪ್ರಮಾಣಪತ್ರದೊಂದಿಗೆ ಯಾವುದೇ ಅಂಚೆ ಕಚೇರಿ ಅಥವಾ ಅಧಿಕೃತ ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ ಖಾತೆ ತೆರೆಯಿರಿ.',
    },
    docs: ['birth', 'aadhaar', 'address', 'photo'],
    weights: { girlChild: 3 },
  },
  {
    id: 'gruha-lakshmi',
    level: 'karnataka',
    needs: 'karnataka',
    url: 'https://sevasindhu.karnataka.gov.in',
    name: {
      en: 'Gruha Lakshmi (Karnataka)',
      hi: 'गृह लक्ष्मी योजना (कर्नाटक)',
      kn: 'ಗೃಹ ಲಕ್ಷ್ಮಿ ಯೋಜನೆ',
    },
    benefit: {
      en: 'Monthly financial help for the woman who heads a family in Karnataka.',
      hi: 'कर्नाटक में परिवार की मुखिया महिला को मासिक आर्थिक सहायता।',
      kn: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಕುಟುಂಬದ ಯಜಮಾನಿ ಮಹಿಳೆಗೆ ತಿಂಗಳಿಗೆ ಆರ್ಥಿಕ ನೆರವು.',
    },
    how: {
      en: 'Apply on the Seva Sindhu portal or at a Karnataka One / Grama One centre.',
      hi: 'सेवा सिंधु पोर्टल या कर्नाटक वन / ग्राम वन केंद्र पर आवेदन करें।',
      kn: 'ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್ ಅಥವಾ ಕರ್ನಾಟಕ ಒನ್ / ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರದಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    },
    docs: ['aadhaar', 'ration', 'bank'],
    weights: { woman: 3 },
  },
]

export const SCHEMES_BY_ID = Object.fromEntries(SCHEMES.map((s) => [s.id, s]))
