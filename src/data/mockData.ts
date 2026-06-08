import { Promoter, SessionResult, HistoricalSession, Language, countFillerWords } from '../types';

export const currentUser = {
  id: 'u-001',
  name: 'Arjun Mehta',
  role: 'Sales Promoter',
  avatar: '🧑🏽',
  store: 'Croma Phoenix Mall',
  region: 'Mumbai West',
  joinDate: '2024-08-15',
  language: 'en' as const,
  overallScore: 82,
  rank: 7,
  totalPromoters: 248,
  streak: 12,
  sessionsThisWeek: 14,
  sessionsTarget: 20,
  daysActiveThisWeek: 5,
  daysTarget: 7,
  badges: ['Quick Learner', 'Objection Master', 'Top 10 — West']
};

export const promoters: Promoter[] = [
  {
    id: 'p1', name: 'Kavya Nair', avatar: '👩🏽',
    region: 'Bangalore South', store: 'Reliance Digital Forum',
    overallScore: 94, sessionsCompleted: 87, badge: 'Gold', language: 'en',
    weeklyTrend: [78, 82, 85, 88, 90, 92, 94]
  },
  {
    id: 'p2', name: 'Rohit Yadav', avatar: '🧑🏾',
    region: 'Delhi NCR', store: 'Croma Saket',
    overallScore: 91, sessionsCompleted: 76, badge: 'Gold', language: 'hi',
    weeklyTrend: [80, 83, 84, 87, 89, 90, 91]
  },
  {
    id: 'p3', name: 'Sneha Patil', avatar: '👩🏻',
    region: 'Pune', store: 'Vijay Sales Wakad',
    overallScore: 89, sessionsCompleted: 92, badge: 'Gold', language: 'en',
    weeklyTrend: [82, 85, 86, 87, 88, 88, 89]
  },
  {
    id: 'p4', name: 'Karthik Raman', avatar: '🧑🏽',
    region: 'Chennai', store: 'Croma Anna Nagar',
    overallScore: 88, sessionsCompleted: 71, badge: 'Silver', language: 'ta',
    weeklyTrend: [75, 78, 80, 83, 85, 86, 88]
  },
  {
    id: 'p5', name: 'Pooja Desai', avatar: '👩🏽',
    region: 'Ahmedabad', store: 'Reliance Digital CG Road',
    overallScore: 86, sessionsCompleted: 64, badge: 'Silver', language: 'en',
    weeklyTrend: [70, 74, 78, 80, 83, 85, 86]
  },
  {
    id: 'p6', name: 'Mohammed Asif', avatar: '🧔🏽',
    region: 'Hyderabad', store: 'Bajaj Electronics Banjara',
    overallScore: 84, sessionsCompleted: 58, badge: 'Silver', language: 'en',
    weeklyTrend: [72, 75, 77, 80, 82, 83, 84]
  },
  {
    id: 'p7', name: 'Arjun Mehta', avatar: '🧑🏽',
    region: 'Mumbai West', store: 'Croma Phoenix Mall',
    overallScore: 82, sessionsCompleted: 49, badge: 'Silver', language: 'en',
    weeklyTrend: [68, 72, 75, 77, 79, 81, 82]
  },
  {
    id: 'p8', name: 'Divya Krishnan', avatar: '👩🏽',
    region: 'Kochi', store: 'Reliance Digital Lulu',
    overallScore: 79, sessionsCompleted: 53, badge: 'Bronze', language: 'en',
    weeklyTrend: [65, 68, 71, 74, 76, 78, 79]
  },
  {
    id: 'p9', name: 'Ravi Shankar', avatar: '🧑🏼',
    region: 'Kolkata', store: 'Croma Acropolis',
    overallScore: 77, sessionsCompleted: 41, badge: 'Bronze', language: 'en',
    weeklyTrend: [62, 66, 69, 72, 74, 76, 77]
  },
  {
    id: 'p10', name: 'Anita Joshi', avatar: '👩🏻',
    region: 'Jaipur', store: 'Vijay Sales MGF',
    overallScore: 74, sessionsCompleted: 38, badge: 'Rising', language: 'hi',
    weeklyTrend: [58, 62, 66, 69, 71, 73, 74]
  }
];

export const historicalSessions: HistoricalSession[] = [
  {
    id: 'sess-001',
    date: '2026-05-21',
    scenarioId: 'space-constraint',
    scenarioTitle: 'The Small Kitchen Challenge',
    customerName: 'Priya Sharma',
    customerAvatar: '👩🏽',
    duration: '5:42',
    durationSec: 342,
    language: 'hi',
    overallScore: 86,
    breakdown: {
      pitchQuality: 88, productKnowledge: 85, objectionHandling: 90,
      clarity: 84, empathy: 89, closingStrength: 80
    },
    transcript: [
      { speaker: 'customer', text: 'नमस्ते, मुझे ये AO Smith X8 मॉडल बहुत पसंद है, लेकिन सच कहूं तो मेरी रसोई बहुत छोटी है। काउंटर सिर्फ 14 इंच गहरा है।', timestamp: 0 },
      { speaker: 'promoter', text: 'मैडम, मैं आपकी चिंता पूरी तरह समझता हूं। X8 का स्लिम वॉल-माउंट डिज़ाइन है — सिर्फ 12 इंच डीप। दीवार पर माउंट हो सकता है, पूरा काउंटर फ्री हो जाएगा।', timestamp: 22 },
      { speaker: 'customer', text: 'वॉल माउंट? लेकिन क्या ये बदसूरत नहीं दिखेगा? और सर्विसिंग का क्या?', timestamp: 48 },
      { speaker: 'promoter', text: 'बिल्कुल नहीं मैडम। ग्लॉसी व्हाइट फिनिश है जो किचन टाइल्स के साथ ब्लेंड होती है। 3 साल की फ्री एनुअल सर्विस भी मिलती है, और फिल्टर कार्ट्रिज सामने से निकलता है — डिसमाउंट की कोई ज़रूरत नहीं।', timestamp: 65 },
      { speaker: 'customer', text: 'ठीक है। लेकिन कीमत 18,000 है - पड़ोसी ने Kent 12,000 में लिया था।', timestamp: 102 },
      { speaker: 'promoter', text: 'सर ये अच्छी तुलना है। X8 में 8-स्टेज प्यूरिफिकेशन है, साइड-स्ट्रीम RO टेक्नोलॉजी के साथ — 70% कम पानी वेस्ट करता है। 3 साल में लगभग ₹6,000 की बचत वॉटर बिल में। प्लस मिनरलाइज़्ड एल्कलाइन वॉटर सेहत के लिए बेहतर है।', timestamp: 124 },
      { speaker: 'customer', text: 'दिलचस्प है। क्या मैं सोचकर अगले हफ्ते आ सकती हूं?', timestamp: 178 },
      { speaker: 'promoter', text: 'बिल्कुल मैडम। बस इतना बता दूं — इस हफ्ते हमारा एक्सचेंज ऑफर है, ₹2,000 ऑफ पुराना प्यूरिफायर एक्सचेंज पर, प्लस फ्री इंस्टॉलेशन किट ₹1,500 की। ऑफर रविवार तक है। एक यूनिट आपके नाम पर ब्लॉक कर दूं? कोई पेमेंट नहीं, कल कन्फर्म कर दीजिएगा।', timestamp: 195 }
    ],
    idealComparisons: [
      { turnId: 't1', you: 'मैडम, मैं आपकी चिंता पूरी तरह समझता हूं। X8 का स्लिम वॉल-माउंट डिज़ाइन है — सिर्फ 12 इंच डीप।', ideal: 'मैडम, मैं आपकी चिंता समझता हूं। X8 का स्लिम वॉल-माउंट डिज़ाइन है — सिर्फ 12 इंच डीप। दीवार पर इंस्टॉल होकर पूरा काउंटर फ्री कर देता है।', score: 92 },
      { turnId: 't2', you: 'ग्लॉसी व्हाइट फिनिश है जो किचन टाइल्स के साथ ब्लेंड होती है। 3 साल की फ्री एनुअल सर्विस भी मिलती है।', ideal: 'बढ़िया सवाल! X8 की ग्लॉसी व्हाइट फिनिश ज़्यादातर किचन टाइल्स के साथ ब्लेंड होती है। हमारे टेक्निशियन वॉल इंस्टॉलेशन में ट्रेंड हैं और 3 साल फ्री एनुअल सर्विस मिलती है।', score: 88 },
      { turnId: 't3', you: 'X8 में 8-स्टेज प्यूरिफिकेशन है, साइड-स्ट्रीम RO टेक्नोलॉजी के साथ — 70% कम पानी वेस्ट करता है। 3 साल में लगभग ₹6,000 की बचत।', ideal: 'बिल्कुल सही तुलना है। X8 8-स्टेज प्यूरिफिकेशन यूज़ करता है, साइड-स्ट्रीम RO के साथ जो 70% कम पानी वेस्ट करती है। 3 साल में ~₹6,000 की बचत वॉटर बिल में।', score: 85 },
      { turnId: 't4', you: 'इस हफ्ते हमारा एक्सचेंज ऑफर है, ₹2,000 ऑफ, प्लस फ्री इंस्टॉलेशन किट। एक यूनिट आपके नाम पर ब्लॉक कर दूं?', ideal: 'बिल्कुल मैडम। इस हफ्ते हमारा एक्सचेंज ऑफर है — ₹2,000 ऑफ + फ्री इंस्टॉलेशन किट ₹1,500 की। रविवार को खत्म होता है। एक यूनिट आपके नाम पर ब्लॉक कर दूं?', score: 79 }
    ],
    fillerWords: 2,
    wordsPerMinute: 138,
    talkTimeRatio: 52,
    sentenceClarity: 87,
    strengths: [
      'Acknowledged customer concern empathetically before pitching',
      'Used ROI math effectively to justify the ₹6,000 premium',
      'Strong close with urgency through the exchange offer'
    ],
    improvements: [
      'Could mention specific certifications (NABL, ISI) for credibility',
      'Sentence structure varied well but transition between turns could be smoother'
    ]
  },
  {
    id: 'sess-002',
    date: '2026-05-20',
    scenarioId: 'maintenance-fear',
    scenarioTitle: 'The Service Cost Question',
    customerName: 'Vikram Singh',
    customerAvatar: '🧔🏽',
    duration: '4:18',
    durationSec: 258,
    language: 'en',
    overallScore: 79,
    breakdown: {
      pitchQuality: 78, productKnowledge: 82, objectionHandling: 81,
      clarity: 76, empathy: 80, closingStrength: 77
    },
    transcript: [
      { speaker: 'customer', text: 'My friend told me water purifiers are a trap — you pay for the machine, then keep paying for filters, service, and repairs. What is the real total cost over 5 years for this X2?', timestamp: 0 },
      { speaker: 'promoter', text: 'Sir, that is a fair point. Let me give you complete transparency. The X2 costs ₹12,500 upfront. AMC is ₹2,800 per year, covers 3 services and pre-filter changes. UV lamp is ₹600 yearly. Over 5 years total is around ₹26,500.', timestamp: 28 },
      { speaker: 'customer', text: 'And what if something major breaks? Like the motor or board?', timestamp: 72 },
      { speaker: 'promoter', text: 'Good question. X2 has 1-year comprehensive warranty, 4 years on pump. Our Total Protection Plan is ₹3,500 per year — covers every part, even physical damage. So max spend yearly is capped.', timestamp: 88 },
      { speaker: 'customer', text: 'Comparing to boiling water — that\'s free. Is the purifier really worth ₹442 monthly?', timestamp: 138 },
      { speaker: 'promoter', text: 'Boiling kills bacteria but does not remove dissolved impurities or heavy metals. Plus gas cylinder for daily boiling is around ₹350 per month. So actually X2 is cheaper than boiling and gives you safer water.', timestamp: 152 },
      { speaker: 'customer', text: 'Okay, I\'m convinced. But what if I want to cancel AMC after year 2?', timestamp: 210 },
      { speaker: 'promoter', text: 'AMC is yearly, no lock-in. You can cancel anytime. If you pay 3 years upfront, fourth year is free. Saves you ₹2,800.', timestamp: 225 }
    ],
    idealComparisons: [
      { turnId: 't1', you: 'The X2 costs ₹12,500 upfront. AMC is ₹2,800 per year. UV lamp is ₹600 yearly. Over 5 years total is around ₹26,500.', ideal: 'X2 costs ₹12,500 upfront. AMC ₹2,800/year. UV lamp ₹600. Total over 5 years: ₹26,500. That\'s ₹442/month.', score: 82 },
      { turnId: 't2', you: 'X2 has 1-year warranty, 4 years on pump. Total Protection Plan covers every part at ₹3,500/year.', ideal: '1-year comprehensive warranty, 4 years on pump. Total Protection Plan ₹3,500/year covers everything.', score: 80 },
      { turnId: 't3', you: 'Boiling doesn\'t remove dissolved impurities. Gas cylinder for daily boiling is ₹350/month.', ideal: 'Boiling kills bacteria but doesn\'t remove dissolved impurities, heavy metals, or chemicals. Gas cylinder for boiling: ₹350/month.', score: 76 },
      { turnId: 't4', you: 'AMC is yearly, no lock-in. Pay 3 years upfront, 4th year is free.', ideal: 'AMC is yearly, never locked. Pay 3 years upfront for the 4th year free — saves ₹2,800.', score: 78 }
    ],
    fillerWords: 4,
    wordsPerMinute: 145,
    talkTimeRatio: 58,
    sentenceClarity: 79,
    strengths: [
      'Maintained calm, transparent tone throughout the cost breakdown',
      'Used ROI comparison vs boiling effectively'
    ],
    improvements: [
      'Talk ratio slightly high — let the customer ask more follow-up questions',
      'Mention the 90-day workmanship warranty when discussing AMC services',
      'Use customer\'s name 1-2 times for rapport building'
    ]
  },
  {
    id: 'sess-003',
    date: '2026-05-20',
    scenarioId: 'budget-comparison',
    scenarioTitle: 'Beating the Local Brand',
    customerName: 'Rajesh Kumar',
    customerAvatar: '👨🏽',
    duration: '3:55',
    durationSec: 235,
    language: 'hi',
    overallScore: 91,
    breakdown: {
      pitchQuality: 92, productKnowledge: 90, objectionHandling: 93,
      clarity: 90, empathy: 91, closingStrength: 89
    },
    transcript: [
      { speaker: 'customer', text: 'मैं इस Pureit Copper को देख रहा हूं, लेकिन एक लोकल ब्रांड आधे दाम पर वही फीचर्स दे रहा है। मैं 16,000 क्यों दूं जब 8,000 में मिल रहा है?', timestamp: 0 },
      { speaker: 'promoter', text: 'सर ये बहुत स्मार्ट सवाल है। फीचर्स पेपर पर सिमिलर दिख सकते हैं, लेकिन Pureit HUL का ब्रांड है — Hindustan Unilever। लोकल ब्रांड्स की मेम्ब्रेन 6 महीने में रिप्लेस करनी पड़ती है, हमारी जर्मन-टेक मेम्ब्रेन 1 साल चलती है। 5 साल में लोकल ब्रांड एक्चुअली ज़्यादा महंगा पड़ता है।', timestamp: 18 },
      { speaker: 'customer', text: 'लेकिन मेरे पड़ोसी 2 साल से लोकल ब्रांड बिना दिक्कत के इस्तेमाल कर रहे हैं।', timestamp: 62 },
      { speaker: 'promoter', text: 'अच्छी बात है सर। लेकिन मॉलिक्युलर लेवल पर प्योरिटी चेक करना ज़रूरी है। हमारी कॉपर चार्ज टेक्नोलॉजी 99.9% प्योर कॉपर ऐड करती है जो इम्यूनिटी बूस्ट करता है। NABL सर्टिफाइड है। फैमिली की हेल्थ के लिए ₹8,000 का डिफरेंस मंथली ₹130 के बराबर है 5 साल में।', timestamp: 80 },
      { speaker: 'customer', text: 'ठीक है, सर्विस का क्या? आप बड़ी कंपनी हैं, सर्विस की चिंता है।', timestamp: 138 },
      { speaker: 'promoter', text: 'सर ये वैलिड पॉइंट है। Pureit के 1,500+ शहरों में सर्विस इंजीनियर हैं। ऐप से 30 सेकंड में सर्विस रिक्वेस्ट होती है, SLA 24 घंटे। लोकल ब्रांड टेक्निशियन एक आदमी है — कल अगर शहर छोड़कर चला गया, तो आप अटक जाएंगे। हम कहीं नहीं जा रहे।', timestamp: 152 },
      { speaker: 'customer', text: 'ठीक है, मैं समझ गया। लेकिन क्या मैं आज घर ले जा सकता हूं?', timestamp: 192 },
      { speaker: 'promoter', text: 'बिल्कुल सर। रेडी स्टॉक है, इंस्टॉलेशन टीम आज शाम 7 बजे तक आपके घर आ जाएगी। EMI ₹1,200 प्रति महीने से, या Pureit Pay-Later — 6 महीने 0% इंट्रेस्ट, सिर्फ आधार चाहिए। पेपरवर्क शुरू करूं?', timestamp: 208 }
    ],
    idealComparisons: [
      { turnId: 't1', you: 'Pureit HUL का ब्रांड है। जर्मन-टेक मेम्ब्रेन 1 साल चलती है। 5 साल में लोकल ब्रांड महंगा पड़ता है।', ideal: 'Pureit HUL का ब्रांड है — Hindustan Unilever। जर्मन-टेक मेम्ब्रेन 1 साल चलती है vs जेनेरिक की 6 महीने। 5 साल में लोकल ब्रांड रिप्लेसमेंट में महंगा पड़ता है।', score: 94 },
      { turnId: 't2', you: 'कॉपर चार्ज टेक्नोलॉजी 99.9% प्योर कॉपर ऐड करती है। NABL सर्टिफाइड। ₹8,000 का डिफरेंस मंथली ₹130 है 5 साल में।', ideal: 'कॉपर चार्ज टेक्नोलॉजी 99.9% प्योर कॉपर ऐड करती है, इम्यूनिटी बूस्ट करता है, NABL सर्टिफाइड। ₹8,000 = ₹130/महीना 5 साल में।', score: 93 },
      { turnId: 't3', you: 'Pureit के 1,500+ शहरों में सर्विस इंजीनियर। ऐप से 30 सेकंड में सर्विस रिक्वेस्ट, SLA 24 घंटे।', ideal: 'Pureit के 1,500+ शहरों में सर्विस इंजीनियर हैं। ऐप से 30 सेकंड में सर्विस रिक्वेस्ट, SLA 24 घंटे।', score: 90 },
      { turnId: 't4', you: 'रेडी स्टॉक, आज इंस्टॉलेशन। EMI ₹1,200/महीना से, या Pureit Pay-Later 0% इंट्रेस्ट।', ideal: 'रेडी स्टॉक, आज इंस्टॉलेशन। EMI ₹1,200/महीने से, या Pureit Pay-Later 0% इंट्रेस्ट। पेपरवर्क शुरू करूं?', score: 87 }
    ],
    fillerWords: 1,
    wordsPerMinute: 142,
    talkTimeRatio: 54,
    sentenceClarity: 92,
    strengths: [
      'Excellent use of HUL brand credibility without disparaging competitor',
      'Sharp ROI math broken down monthly — easy for customer to digest',
      'Smooth close with clear payment options and immediate fulfillment',
      'Clean speech with minimal filler words'
    ],
    improvements: [
      'Could have asked discovery questions about family size and water TDS earlier'
    ]
  },
  {
    id: 'sess-004',
    date: '2026-05-19',
    scenarioId: 'tds-concern',
    scenarioTitle: 'The TDS Worry',
    customerName: 'Dr. Anand Iyer',
    customerAvatar: '👨🏾',
    duration: '6:30',
    durationSec: 390,
    language: 'en',
    overallScore: 68,
    breakdown: {
      pitchQuality: 70, productKnowledge: 64, objectionHandling: 72,
      clarity: 71, empathy: 68, closingStrength: 65
    },
    transcript: [
      { speaker: 'customer', text: 'I\'ve read that RO removes essential minerals and the WHO recommends TDS between 150-300. What\'s the TDS output of this Z9 model and does it add back minerals?', timestamp: 0 },
      { speaker: 'promoter', text: 'Doctor, yes you are right. Pure RO has TDS below 50. The Z9 has MineralPro technology which adds back minerals, brings TDS to around 150-200.', timestamp: 25 },
      { speaker: 'customer', text: 'And the input TDS? My building gets borewell water — sometimes TDS reaches 1500. Will this still work?', timestamp: 58 },
      { speaker: 'promoter', text: 'Yes sir, Z9 can handle high TDS. The membrane is good for borewell water also. Output will be safe.', timestamp: 72 },
      { speaker: 'customer', text: 'But what specifically is the input TDS limit? You\'re being vague.', timestamp: 105 },
      { speaker: 'promoter', text: 'Sorry sir, let me check — it is up to 2000 ppm. So 1500 is within range. The membrane is 100 GPD with 96% rejection.', timestamp: 118 },
      { speaker: 'customer', text: 'And the hot water feature — is it actually safe? I\'ve heard about lead leaching from hot pipes.', timestamp: 168 },
      { speaker: 'promoter', text: 'Z9 uses stainless steel tank, BPA-free piping. It is ISI certified. Temperature 45 to 80 degrees, kills microbes.', timestamp: 182 },
      { speaker: 'customer', text: 'What grade stainless steel? And NSF certification?', timestamp: 228 },
      { speaker: 'promoter', text: 'It is food-grade stainless steel sir. NSF certified also yes.', timestamp: 240 },
      { speaker: 'customer', text: 'Impressive. What\'s the warranty and AMC structure?', timestamp: 282 },
      { speaker: 'promoter', text: '1 year warranty, AMC starts year 2. Subscription model also available 999 monthly.', timestamp: 295 }
    ],
    idealComparisons: [
      { turnId: 't1', you: 'The Z9 has MineralPro which adds minerals, brings TDS to 150-200.', ideal: 'Pure RO has TDS below 50, suboptimal per WHO. Z9 has patented MineralPro™ — adds calcium, magnesium, potassium back to 150-200 range, pH 7.4 alkaline.', score: 62 },
      { turnId: 't2', you: 'Z9 can handle high TDS. Membrane is good for borewell water also.', ideal: 'Z9 rated for input TDS up to 2000 ppm. 100 GPD membrane, 96% rejection. Recovery rate 35% via Side-Stream tech.', score: 48 },
      { turnId: 't3', you: 'Z9 uses stainless steel tank, BPA-free piping. ISI certified.', ideal: 'Food-grade SS-304 stainless steel, BPA-free piping. Heats on-demand, not storage. ISI + NSF certified. 80°C kills 99.99% microbes.', score: 70 },
      { turnId: 't4', you: '1 year warranty, AMC starts year 2. Subscription 999 monthly.', ideal: '1-year comprehensive + 5-year extended on RO membrane. AMC ₹3,500/year. Or subscription model ₹999/month with purifier included.', score: 68 }
    ],
    fillerWords: 7,
    wordsPerMinute: 118,
    talkTimeRatio: 38,
    sentenceClarity: 70,
    strengths: [
      'Recovered well after being called out for vagueness'
    ],
    improvements: [
      'Memorize specific technical specs — TDS limits, GPD ratings, certifications',
      'Reduce filler words (7 detected — "you know", "actually", "basically")',
      'Lead with specific numbers rather than general statements',
      'For technical buyers like doctors, prepare data sheets in advance'
    ]
  },
  {
    id: 'sess-005',
    date: '2026-05-18',
    scenarioId: 'upgrade-existing',
    scenarioTitle: 'The Upgrade Pitch',
    customerName: 'Meera Reddy',
    customerAvatar: '👩🏾',
    duration: '4:02',
    durationSec: 242,
    language: 'en',
    overallScore: 84,
    breakdown: {
      pitchQuality: 85, productKnowledge: 80, objectionHandling: 86,
      clarity: 83, empathy: 88, closingStrength: 82
    },
    transcript: [
      { speaker: 'customer', text: 'I\'ve had my Pureit Ultima for 5 years. Came in for filter change but technician suggested newer models. Mine still works fine — why upgrade?', timestamp: 0 },
      { speaker: 'promoter', text: 'Ma\'am, great to see a loyal customer! Your Ultima has served well — that\'s our quality. But the new Eco Water Saver wastes only 1 litre per 3 litres purified vs the old 1:3 ratio. Family of 4, that\'s 15,000 litres saved yearly — almost ₹3,500 in water bills.', timestamp: 20 },
      { speaker: 'customer', text: 'Sounds nice but I just spent on a filter change. Another big expense?', timestamp: 68 },
      { speaker: 'promoter', text: 'Totally understand. We have a loyalty exchange — bring your Ultima, get ₹3,000 off. We\'ll also credit the filter cost you paid. So effective cost is ₹9,500 with 1 year free service.', timestamp: 82 },
      { speaker: 'customer', text: 'Hmm, the exchange is tempting. Will family notice difference in water quality?', timestamp: 135 },
      { speaker: 'promoter', text: 'Absolutely ma\'am. The Eco model adds copper and zinc through Mineral Charger — boosts immunity, improves digestion. Has a digital display showing real-time purity and filter life. Your old model didn\'t have these.', timestamp: 148 },
      { speaker: 'customer', text: 'Alright, prepare the paperwork. When can your team install?', timestamp: 192 },
      { speaker: 'promoter', text: 'Excellent decision ma\'am! Team can be at your home tomorrow 10 AM to 12 PM. Installation takes 45 minutes, we\'ll dispose of your Ultima responsibly. Free water test at home, and we\'ll connect to Pureit app on your phone. Welcome to the new family!', timestamp: 208 }
    ],
    idealComparisons: [
      { turnId: 't1', you: 'New Eco Water Saver wastes only 1 litre per 3 litres. Family of 4 = 15,000 litres saved yearly, ₹3,500 in water bills.', ideal: 'Eco Water Saver has 1:1 wastage vs old 1:3. Family of 4 saves 15,000 litres/year, ~₹3,500 annually in water bills.', score: 88 },
      { turnId: 't2', you: 'Loyalty exchange — bring Ultima, get ₹3,000 off. Credit filter cost. Effective ₹9,500 with 1 year free service.', ideal: 'Loyalty exchange ₹3,000 off + credit the filter cost paid today. Effective ₹9,500, 1 year free service.', score: 86 },
      { turnId: 't3', you: 'Eco model adds copper and zinc through Mineral Charger. Digital display shows real-time purity.', ideal: 'Eco model adds copper and zinc via Mineral Charger — immunity boost, better digestion. Digital display for real-time purity and filter life.', score: 84 },
      { turnId: 't4', you: 'Team at home tomorrow 10-12 AM. 45 min install. Free water test, connect to Pureit app.', ideal: 'Install tomorrow 10-12 AM. 45 min. Dispose old Ultima, free water test at home, connect to Pureit app. Just need 2-min KYC.', score: 78 }
    ],
    fillerWords: 3,
    wordsPerMinute: 148,
    talkTimeRatio: 56,
    sentenceClarity: 85,
    strengths: [
      'Excellent empathy — acknowledged customer loyalty before pitching',
      'Strong ROI math with concrete water + bill savings',
      'Closed with bundled value (free test, app connection, install) creating "welcome" feel'
    ],
    improvements: [
      'Mention 2-minute KYC requirement during close to set expectations',
      'Could include the Pureit Pay-Later option for customers wanting flexibility'
    ]
  }
];

historicalSessions.push(
  {
    id: 'sess-006',
    date: '2026-05-14',
    scenarioId: 'online-price-hunter',
    scenarioTitle: 'The Online Price Hunter',
    customerName: 'Karthik Subramanian',
    customerAvatar: '🧑🏽‍💻',
    duration: '4:45',
    durationSec: 285,
    language: 'en',
    overallScore: 73,
    breakdown: {
      pitchQuality: 74, productKnowledge: 70, objectionHandling: 75,
      clarity: 76, empathy: 72, closingStrength: 71
    },
    transcript: [
      { speaker: 'customer', text: 'I saw this exact Pureit on Amazon for ₹2,200 less. Why buy from here at full price?', timestamp: 0 },
      { speaker: 'promoter', text: 'Sir, our price includes free installation worth ₹1,500. Plus free water quality test and 6 months pre-filter.', timestamp: 22 },
      { speaker: 'customer', text: 'But ₹2,200 is still more than your freebies. Convince me.', timestamp: 75 },
      { speaker: 'promoter', text: 'Sir, breakdown is — install ₹1,500, pre-filter ₹800, water test ₹500. That is ₹2,800 value. Plus when service is needed in year 2, you get priority because you are in our system. Online buyers wait days.', timestamp: 90 },
      { speaker: 'customer', text: 'Can you match the Amazon price?', timestamp: 178 },
      { speaker: 'promoter', text: 'Sir, I can offer ₹1,500 exchange credit on old appliance and 6 months free AMC extension. Net effective price difference becomes ₹800. Fair?', timestamp: 195 }
    ],
    idealComparisons: [
      { turnId: 't1', you: 'Our price includes free installation worth ₹1,500. Plus free water quality test and 6 months pre-filter.', ideal: 'Store price includes free installation (₹1,500), water quality test, pre-filter (6 mo). Warranty starts from install date — 30+ extra days coverage.', score: 72 },
      { turnId: 't2', you: 'Install ₹1,500, pre-filter ₹800, water test ₹500. ₹2,800 value. Priority service for store buyers.', ideal: 'Install ₹1,500, pre-filter ₹800, water test ₹500 = ₹2,800 value. Store buyers get priority service via local records.', score: 76 },
      { turnId: 't3', you: '₹1,500 exchange credit on old appliance and 6 months free AMC. Net difference ₹800.', ideal: '₹1,500 exchange credit + 6 months free AMC (₹1,400). Effective difference just ₹800 with all store advantages.', score: 71 }
    ],
    fillerWords: 5,
    wordsPerMinute: 132,
    talkTimeRatio: 51,
    sentenceClarity: 76,
    strengths: ['Clear value breakdown with concrete numbers', 'Did not match price head-on, bundled non-cash value instead'],
    improvements: ['Mention DOA / 5-minute replacement policy for stronger trust', 'Skipped the warranty-start-date point — strong differentiator vs online']
  },
  {
    id: 'sess-007',
    date: '2026-05-08',
    scenarioId: 'geyser-size',
    scenarioTitle: 'The Geyser Size Question',
    customerName: 'Vikash Tiwari',
    customerAvatar: '👨🏻',
    duration: '3:22',
    durationSec: 202,
    language: 'hi',
    overallScore: 88,
    breakdown: {
      pitchQuality: 90, productKnowledge: 87, objectionHandling: 85,
      clarity: 88, empathy: 92, closingStrength: 86
    },
    transcript: [
      { speaker: 'customer', text: 'हम चार लोगों का परिवार है। मेरा पुराना 10 लीटर का गीजर बेकार था - दूसरे व्यक्ति को ही ठंडा पानी मिलने लगता था।', timestamp: 0 },
      { speaker: 'promoter', text: 'सर थम्ब रूल सिंपल है — 6 लीटर हॉट वॉटर प्रति व्यक्ति। फैमिली ऑफ 4 के लिए 25 लीटर मिनिमम। HSE-VAS-X 25L आपके लिए परफेक्ट है — बैक-टू-बैक बाथिंग, कोई कोल्ड वॉटर नहीं।', timestamp: 25 },
      { speaker: 'customer', text: '25 लीटर तो बड़ा है। बिजली बहुत खाएगा क्या?', timestamp: 72 },
      { speaker: 'promoter', text: 'स्मार्ट कंसर्न सर। 25L HSE-VAS-X 5-स्टार BEE रेटेड है — हाईएस्ट एफिशिएंसी। स्मार्ट थर्मोस्टैट कंटीन्यूअस हीटिंग से बचाता है। मंथली बिल ₹280-350 — आपके पुराने 10L के बराबर!', timestamp: 88 },
      { speaker: 'customer', text: 'सुबह गर्म होने में कितना समय?', timestamp: 138 },
      { speaker: 'promoter', text: 'बढ़िया पॉइंट। कोल्ड से 65 डिग्री में 12-15 मिनट लगते हैं। SmartConnect टाइमर फीचर से अलार्म से 30 मिनट पहले ऑटो-स्टार्ट हो जाता है। बूस्ट मोड भी है अनएक्सपेक्टेड गेस्ट्स के लिए।', timestamp: 152 },
      { speaker: 'customer', text: 'वारंटी और इंस्टॉलेशन का क्या? मेरी फ्लैट 7वीं मंजिल पर है।', timestamp: 175 },
      { speaker: 'promoter', text: 'सर 7 साल टैंक पर, 4 साल हीटिंग एलिमेंट पर वारंटी। इंस्टॉलेशन पूरे इंडिया में फ्री — हाई-राइज भी। टोटल इंस्टॉल टाइम 1 घंटा। SmartConnect ऐप का डेमो भी देंगे। मूव-इन डे पर इंस्टॉल कर दूं?', timestamp: 188 }
    ],
    idealComparisons: [
      { turnId: 't1', you: 'थम्ब रूल सिंपल है — 6 लीटर हॉट वॉटर प्रति व्यक्ति। फैमिली ऑफ 4 के लिए 25 लीटर मिनिमम।', ideal: '6 लीटर हॉट वॉटर प्रति व्यक्ति का रूल। 4 लोगों के लिए 25 लीटर मिनिमम। HSE-VAS-X 25L बिल्कुल सही।', score: 92 },
      { turnId: 't2', you: '5-स्टार BEE रेटेड। स्मार्ट थर्मोस्टैट। मंथली बिल ₹280-350।', ideal: '5-स्टार BEE रेटेड, स्मार्ट थर्मोस्टैट टेक्नोलॉजी। मंथली ₹280-350 — आपके पुराने 10L के बराबर लेकिन ज़्यादा हॉट वॉटर।', score: 88 },
      { turnId: 't3', you: '12-15 मिनट। SmartConnect टाइमर ऑटो-स्टार्ट। बूस्ट मोड गेस्ट्स के लिए।', ideal: 'कोल्ड से 65°C तक 12-15 मिनट। SmartConnect टाइमर ऑटो-स्टार्ट। बूस्ट मोड 20% फास्टर हीट करता है।', score: 90 },
      { turnId: 't4', you: '7 साल टैंक, 4 साल एलिमेंट। पूरे इंडिया में फ्री इंस्टॉल, हाई-राइज भी। ऐप डेमो। मूव-इन डे इंस्टॉल।', ideal: '7 साल टैंक, 4 साल एलिमेंट पर वारंटी। पूरे इंडिया में फ्री इंस्टॉलेशन, हाई-राइज भी। 1 घंटा इंस्टॉल + ऐप डेमो।', score: 82 }
    ],
    fillerWords: 1,
    wordsPerMinute: 152,
    talkTimeRatio: 55,
    sentenceClarity: 89,
    strengths: ['Connected size recommendation to family-of-4 specifically', 'Empathy — reassured the old 10L issue was sizing, not their fault', 'Strong close with move-in date install slot'],
    improvements: ['Could mention the boost mode percentage (20% faster) more confidently']
  },
  {
    id: 'sess-008',
    date: '2026-04-28',
    scenarioId: 'new-mother',
    scenarioTitle: 'The New Mother',
    customerName: 'Anjali Verma',
    customerAvatar: '👩🏻',
    duration: '5:08',
    durationSec: 308,
    language: 'hi',
    overallScore: 76,
    breakdown: {
      pitchQuality: 75, productKnowledge: 78, objectionHandling: 74,
      clarity: 77, empathy: 82, closingStrength: 70
    },
    transcript: [
      { speaker: 'customer', text: 'मेरा बच्चा पाँच महीने का है। क्या आपका प्यूरीफायर फॉर्मूला बनाने के लिए सुरक्षित है?', timestamp: 0 },
      { speaker: 'promoter', text: 'मैडम कंग्रेचुलेशन्स! ProPlanet P5 में MineralPro टेक्नोलॉजी है — कैल्शियम, मैग्नीशियम, ज़िंक ऐड करता है सेफ पीडियाट्रिक लेवल्स पर। WHO इन्फेंट गाइडलाइन्स मीट करता है।', timestamp: 22 },
      { speaker: 'customer', text: 'लेकिन बैक्टीरिया और वायरस का क्या?', timestamp: 95 },
      { speaker: 'promoter', text: 'अच्छा सवाल मैडम। P5 में 6-स्टेज प्यूरिफिकेशन है UV चेम्बर के साथ — 99.99% बैक्टीरिया और वायरस किल करता है। E. coli, रोटावायरस इन्क्लूडेड। बॉइल करने की ज़रूरत नहीं।', timestamp: 108 },
      { speaker: 'customer', text: 'अगर UV लैंप खराब हो जाए बिना मुझे पता चले?', timestamp: 175 },
      { speaker: 'promoter', text: 'P5 में UV-फेल अलार्म है। अगर UV फेल हो जाए तो प्यूरिफायर पानी डिस्पेन्स करना स्टॉप कर देता है। रेड इंडिकेटर। कंटैमिनेटेड वॉटर साइलेंटली नहीं देगा।', timestamp: 192 },
      { speaker: 'customer', text: 'कीमत और इंस्टॉलेशन?', timestamp: 252 },
      { speaker: 'promoter', text: 'P5 ₹17,990 है, 1 साल वारंटी के साथ। इंस्टॉलेशन कल सुबह फ्री, 40 मिनट लगेंगे।', timestamp: 265 }
    ],
    idealComparisons: [
      { turnId: 't1', you: 'P5 में MineralPro है — कैल्शियम, मैग्नीशियम, ज़िंक ऐड करता है पीडियाट्रिक लेवल्स पर। WHO गाइडलाइन्स।', ideal: 'प्लेन RO सबऑप्टिमल है — आप सही हैं। ProPlanet P5 में MineralPro™ है जो कैल्शियम, मैग्नीशियम, ज़िंक ऐड करता है पीडियाट्रिक-सेफ लेवल्स पर। WHO इन्फेंट गाइडलाइन्स मीट करता है।', score: 80 },
      { turnId: 't2', you: '6-स्टेज प्यूरिफिकेशन। UV चेम्बर 99.99% बैक्टीरिया और वायरस किल करता है। E. coli, रोटावायरस।', ideal: '6-स्टेज प्यूरिफिकेशन UV चेम्बर के साथ, 99.99% बैक्टीरिया और वायरस किल करता है E. coli, रोटावायरस सहित। AIIMS Delhi पीडियाट्रिशियन्स रेकमेंड करते हैं।', score: 78 },
      { turnId: 't3', you: 'UV-फेल अलार्म। प्यूरिफायर डिस्पेन्स स्टॉप कर देता है अगर UV फेल हो। रेड इंडिकेटर।', ideal: 'UV-फेल अलार्म — अगर UV लैंप डिम/फेल हो तो प्यूरिफायर डिस्पेंस स्टॉप कर देता है। रेड इंडिकेटर। 6,000 घंटे लैंप लाइफ, ऐप 30 दिन पहले रिप्लेसमेंट रिमाइंडर भेजता है।', score: 76 },
      { turnId: 't4', you: 'P5 ₹17,990, 1 साल वारंटी। इंस्टॉलेशन कल फ्री, 40 मिनट।', ideal: '₹17,990, 1 साल कॉम्प्रिहेन्सिव वारंटी। नए पेरेंट्स के लिए "फर्स्ट ईयर फ्री" सर्विस प्लान। फ्री इंस्टॉल कल 40 मिनट + बेबी सिप्पी बॉटल + वॉटर टेस्ट।', score: 62 }
    ],
    fillerWords: 6,
    wordsPerMinute: 122,
    talkTimeRatio: 47,
    sentenceClarity: 78,
    strengths: ['Connected empathetically with new-mother concerns', 'Used credibility anchors (WHO, AIIMS)'],
    improvements: ['Missed the "First Year Free" service offer in closing — key for new parents', 'Mention the free sippy bottle bundle — emotional close for moms', 'Closing was rushed compared to the strong middle of the conversation']
  },
  {
    id: 'sess-009',
    date: '2026-04-15',
    scenarioId: 'space-constraint',
    scenarioTitle: 'The Small Kitchen Challenge',
    customerName: 'Priya Sharma',
    customerAvatar: '👩🏽',
    duration: '6:12',
    durationSec: 372,
    language: 'en',
    overallScore: 71,
    breakdown: {
      pitchQuality: 72, productKnowledge: 70, objectionHandling: 73,
      clarity: 68, empathy: 71, closingStrength: 72
    },
    transcript: [
      { speaker: 'customer', text: 'I like the X8 but my kitchen counter is only 14 inches deep. I don\'t think it will fit.', timestamp: 0 },
      { speaker: 'promoter', text: 'Yes ma\'am, the X8 has wall-mount design. It is slim, only 12 inches deep. Can be mounted on wall.', timestamp: 28 },
      { speaker: 'customer', text: 'But won\'t wall mount look ugly? And servicing?', timestamp: 88 },
      { speaker: 'promoter', text: 'No ma\'am, glossy white finish, blends with tiles. Our technicians can service wall installations. Free service for some years.', timestamp: 102 },
      { speaker: 'customer', text: 'Price is 18,000 which is high compared to Kent at 12,000.', timestamp: 165 },
      { speaker: 'promoter', text: 'Yes ma\'am, 8-stage purification, RO technology, mineral water. Better quality. Pays off over time.', timestamp: 180 },
      { speaker: 'customer', text: 'Can I think about it?', timestamp: 232 },
      { speaker: 'promoter', text: 'Sure ma\'am, we have exchange offer this week, 2000 off if you bring old purifier.', timestamp: 245 }
    ],
    idealComparisons: [
      { turnId: 't1', you: 'X8 has wall-mount design. Slim, 12 inches deep. Can be mounted on wall.', ideal: 'I understand. X8 has slim wall-mount design, only 12 inches deep. Frees up your entire counter.', score: 72 },
      { turnId: 't2', you: 'Glossy white finish, blends with tiles. Technicians service wall installations. Free service for some years.', ideal: 'Glossy white finish blends with tiles. Technicians trained for wall. Free annual service 3 years. Filter slides out from front.', score: 70 },
      { turnId: 't3', you: '8-stage purification, RO technology, mineral water. Better quality.', ideal: '8-stage with Side-Stream RO — wastes 70% less water. Saves ₹6,000 in bills over 3 years. Mineralized alkaline = better health.', score: 65 },
      { turnId: 't4', you: 'Exchange offer this week, 2000 off if you bring old purifier.', ideal: 'Exchange offer ₹2,000 off + free installation kit ₹1,500. Ends Sunday. Block one in your name, no payment, confirm tomorrow.', score: 77 }
    ],
    fillerWords: 8,
    wordsPerMinute: 110,
    talkTimeRatio: 42,
    sentenceClarity: 70,
    strengths: ['Covered the main points of the pitch', 'Acknowledged price concern without panicking'],
    improvements: ['Lacked specific numbers — "some years" instead of "3 years free service"', 'Talk ratio too low — let too much silence between turns', '8 filler words — significantly above average', 'Missed the ROI math entirely on the price objection', 'Could not articulate specific savings or warranty terms']
  }
);

export const recentSessions = historicalSessions.map(s => ({
  date: s.date, scenario: s.scenarioTitle, score: s.overallScore, duration: s.duration
}));

export const teamPerformanceData = [
  { week: 'W1', avgScore: 68, sessions: 142 },
  { week: 'W2', avgScore: 71, sessions: 168 },
  { week: 'W3', avgScore: 74, sessions: 195 },
  { week: 'W4', avgScore: 76, sessions: 211 },
  { week: 'W5', avgScore: 79, sessions: 234 },
  { week: 'W6', avgScore: 82, sessions: 256 },
  { week: 'W7', avgScore: 84, sessions: 278 }
];

export const categoryBreakdown = [
  { category: 'Objection Handling', score: 84, sessions: 312 },
  { category: 'Product Knowledge', score: 71, sessions: 218 },
  { category: 'Comparison', score: 79, sessions: 187 },
  { category: 'Closing', score: 88, sessions: 156 }
];

export const skillRadarData = [
  { skill: 'Pitch Quality', value: 82 },
  { skill: 'Product Knowledge', value: 75 },
  { skill: 'Objection Handling', value: 88 },
  { skill: 'Clarity', value: 91 },
  { skill: 'Empathy', value: 78 },
  { skill: 'Closing', value: 84 }
];

export const generateSessionResult = (
  scenarioId: string,
  transcript: { speaker: 'customer' | 'promoter'; text: string; timestamp: number }[],
  durationSec: number,
  idealComparisons: { turnId: string; you: string; ideal: string; score: number }[],
  language: Language = 'en'
): SessionResult => {
  const promoterEntries = transcript.filter(t => t.speaker === 'promoter');
  const totalWords = promoterEntries.reduce((sum, e) => sum + e.text.split(/\s+/).length, 0);
  const avgScore = idealComparisons.length
    ? Math.round(idealComparisons.reduce((s, c) => s + c.score, 0) / idealComparisons.length)
    : 75;

  const fillerCount = promoterEntries.reduce((sum, e) => sum + countFillerWords(e.text, language), 0);

  return {
    scenarioId,
    overallScore: avgScore,
    breakdown: {
      pitchQuality: Math.min(100, avgScore + Math.floor(Math.random() * 8 - 4)),
      productKnowledge: Math.min(100, avgScore + Math.floor(Math.random() * 10 - 5)),
      objectionHandling: Math.min(100, avgScore + Math.floor(Math.random() * 8 - 4)),
      clarity: Math.min(100, avgScore + Math.floor(Math.random() * 12 - 4)),
      empathy: Math.min(100, avgScore + Math.floor(Math.random() * 10 - 6)),
      closingStrength: Math.min(100, avgScore + Math.floor(Math.random() * 14 - 7))
    },
    talkTimeRatio: Math.min(75, Math.max(35, Math.round((totalWords * 0.45) / Math.max(1, durationSec / 60) / 2.5))),
    fillerWords: fillerCount,
    wordsPerMinute: Math.round(totalWords / Math.max(1, durationSec / 60)),
    sentenceClarity: Math.min(100, 70 + Math.floor(Math.random() * 25)),
    transcript,
    idealResponses: idealComparisons,
    strengths: generateStrengths(avgScore, fillerCount),
    improvements: generateImprovements(avgScore, fillerCount, idealComparisons),
    durationSec
  };
};

function generateStrengths(score: number, fillers: number): string[] {
  const all = [
    'Strong product knowledge — mentioned key technical specs accurately',
    'Excellent empathy — acknowledged customer concerns before pitching',
    'Used ROI math effectively to justify premium pricing',
    'Confident closing with clear next steps',
    'Maintained professional tone throughout',
    'Asked discovery questions to understand customer needs',
    'Successfully addressed objection without disparaging competitor',
    'Used social proof effectively (HUL/AO Smith brand reputation)'
  ];
  const count = score >= 85 ? 4 : score >= 70 ? 3 : 2;
  if (fillers < 3) all.unshift('Clean speech — minimal filler words used');
  return all.slice(0, count);
}

function generateImprovements(
  score: number,
  fillers: number,
  comparisons: { score: number }[]
): string[] {
  const all: string[] = [];
  if (fillers > 5) all.push(`Reduce filler words — detected ${fillers} instances of "um", "like", "you know"`);
  if (score < 80) all.push('Mention specific product features more confidently (TDS, GPD ratings, certifications)');
  if (comparisons.some(c => c.score < 60)) all.push('Strengthen objection handling — practice the LAARC framework');
  if (score < 75) all.push('Include a clear call-to-action in your closing statement');
  all.push('Try varying sentence structure for better engagement');
  all.push('Use customer\'s name 2-3 times during the conversation to build rapport');
  return all.slice(0, score >= 85 ? 2 : 4);
}

export const ICONS = {
  empty: '○'
};
