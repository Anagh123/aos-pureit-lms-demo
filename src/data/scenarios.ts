import { Scenario } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 'space-constraint',
    title: 'The Small Kitchen Challenge',
    category: 'Objection Handling',
    difficulty: 'Intermediate',
    duration: '4-6 min',
    description: 'Customer loves the AO Smith X8 but is worried it won\'t fit in her compact 1BHK kitchen. Handle the space objection without losing the sale.',
    customerPersona: {
      name: 'Priya Sharma',
      avatar: '👩🏽',
      background: 'Working professional, lives in a 1BHK apartment in Bangalore, kitchen counter is just 14 inches deep.'
    },
    product: 'AO Smith X8 Green RO',
    opening: 'Hi, I really like this AO Smith X8 model but honestly my kitchen is very small. The counter is barely 14 inches deep. I don\'t think it will fit. Can you show me something smaller?',
    completions: 1284,
    avgScore: 78,
    supportedLanguages: ['en', 'hi', 'ta', 'bn'],
    turns: [
      {
        id: 't1',
        customerSays: 'Hi, I really like this AO Smith X8 model but honestly my kitchen is very small. The counter is barely 14 inches deep. I don\'t think it will fit. Can you show me something smaller?',
        customerSaysHi: 'नमस्ते, मुझे ये AO Smith X8 मॉडल बहुत पसंद है, लेकिन सच कहूं तो मेरी रसोई बहुत छोटी है। काउंटर सिर्फ 14 इंच गहरा है। मुझे नहीं लगता ये फिट होगा। क्या आप कुछ छोटा दिखा सकते हैं?',
        customerSaysTa: 'வணக்கம், எனக்கு இந்த AO Smith X8 மாடல் ரொம்ப பிடிக்கும், ஆனால் என் சமையலறை ரொம்ப சின்னது. காவுன்டர் வெறும் 14 இன்ச் ஆழம்தான். இது பொருந்தாது என்று நினைக்கிறேன். ஏதாவது சின்னது காட்டுவீர்களா?',
        customerSaysBn: 'নমস্কার, আমার এই AO Smith X8 মডেলটি খুব ভালো লেগেছে, কিন্তু সত্যি বলতে আমার রান্নাঘর অনেক ছোট। কাউন্টার মাত্র ১৪ ইঞ্চি গভীর। আমার মনে হয় না এটা ফিট হবে। আপনি কি ছোট কিছু দেখাতে পারবেন?',
        idealResponse: 'I completely understand your concern, ma\'am. The X8 actually has a slim wall-mount design — it\'s only 12 inches deep and can be installed on the wall, freeing up your entire counter. Would you like me to show you the wall-mount installation option?',
        idealResponseHi: 'मैडम, मैं आपकी चिंता पूरी तरह समझता हूं। X8 का स्लिम वॉल-माउंट डिज़ाइन है — सिर्फ 12 इंच डीप। दीवार पर इंस्टॉल होकर पूरा काउंटर फ्री कर देता है। क्या मैं वॉल-माउंट इंस्टॉलेशन का ऑप्शन दिखाऊं?',
        idealResponseTa: 'மேடம், உங்கள் கவலையை நான் முழுமையாக புரிந்துகொள்கிறேன். X8-க்கு ஒரு மெல்லிய சுவர்-மவுன்ட் வடிவமைப்பு உள்ளது — வெறும் 12 இன்ச் ஆழம்தான். சுவரில் நிறுவி, உங்கள் முழு கவுன்டரையும் காலியாக்கும்.',
        idealResponseBn: 'ম্যাডাম, আমি আপনার উদ্বেগ সম্পূর্ণরূপে বুঝতে পারছি। X8-এর একটি সরু ওয়াল-মাউন্ট ডিজাইন আছে — মাত্র ১২ ইঞ্চি গভীর। দেওয়ালে ইনস্টল করে আপনার পুরো কাউন্টার ফ্রি হয়ে যাবে।',
        keywords: ['wall', 'mount', 'slim', 'space', 'install', 'fit', '12 inch', 'compact', 'दीवार', 'सुविधा', 'சுவர்', 'দেওয়াল'],
        hint: 'Acknowledge her concern first, then pivot to the wall-mount feature.'
      },
      {
        id: 't2',
        customerSays: 'Wall mount? But won\'t that look ugly? And what about servicing — will the technician be able to reach it?',
        customerSaysHi: 'वॉल माउंट? लेकिन क्या ये बदसूरत नहीं दिखेगा? और सर्विसिंग का क्या - क्या टेक्निशियन उस तक पहुंच पाएगा?',
        customerSaysTa: 'வால் மவுன்ட்? ஆனால் அது அசிங்கமாக தெரியாதா? மற்றும் சர்வீஸ் பற்றி என்ன - டெக்னீஷியனால் அதை எட்ட முடியுமா?',
        customerSaysBn: 'ওয়াল মাউন্ট? কিন্তু এটা কি দেখতে খারাপ লাগবে না? আর সার্ভিসিং এর কী হবে — টেকনিশিয়ান কি সেখানে পৌঁছাতে পারবে?',
        idealResponse: 'Great question! The X8 has a sleek glossy white finish that blends with most kitchen tiles. For servicing, our technicians are trained specifically for wall installations, and we provide free annual service for 3 years. Plus, the filter cartridge slides out from the front, so no dismounting is ever needed.',
        idealResponseHi: 'बढ़िया सवाल! X8 की ग्लॉसी व्हाइट फिनिश ज़्यादातर किचन टाइल्स के साथ ब्लेंड होती है। हमारे टेक्निशियन वॉल इंस्टॉलेशन में ट्रेंड हैं और 3 साल फ्री एनुअल सर्विस मिलती है। फिल्टर कार्ट्रिज सामने से स्लाइड होकर निकलता है — डिसमाउंट की कभी ज़रूरत नहीं।',
        idealResponseTa: 'நல்ல கேள்வி! X8-க்கு பளபளப்பான வெள்ளை ஃபினிஷ் இருக்கிறது, இது பெரும்பாலான சமையலறை ஓடுகளுடன் கலந்துவிடும். எங்கள் டெக்னீஷியன்கள் சுவர் நிறுவலுக்காக பயிற்சி பெற்றவர்கள், 3 ஆண்டுகள் இலவச ஆண்டு சேவை வழங்குகிறோம்.',
        idealResponseBn: 'দুর্দান্ত প্রশ্ন! X8-এর একটি মসৃণ চকচকে সাদা ফিনিশ আছে যা বেশিরভাগ রান্নাঘরের টাইলসের সাথে মিশে যায়। আমাদের টেকনিশিয়ানরা ওয়াল ইনস্টলেশনে প্রশিক্ষিত, এবং আমরা ৩ বছর বিনামূল্যে বার্ষিক সার্ভিস দিই।',
        keywords: ['service', 'design', 'finish', 'free', 'warranty', 'technician', 'front', 'cartridge', 'easy', 'मुफ्त', 'इलेकेबल', 'இலவசம்', 'ফ্রি', 'বিনামূল্যে'],
        hint: 'Address both the aesthetic and serviceability concerns with specific facts.'
      },
      {
        id: 't3',
        customerSays: 'Okay that sounds reasonable. But the price is 18,000 — that\'s much higher than the Kent model my neighbour bought for 12,000. Why the difference?',
        customerSaysHi: 'ठीक है, ये समझ में आ रहा है। लेकिन कीमत 18,000 है - मेरे पड़ोसी ने Kent मॉडल 12,000 में खरीदा था। इतना अंतर क्यों है?',
        customerSaysTa: 'சரி, அது நியாயமாக இருக்கிறது. ஆனால் விலை 18,000 — என் அண்டை வீட்டார் Kent மாடலை 12,000-க்கு வாங்கினார். ஏன் இவ்வளவு வித்தியாசம்?',
        customerSaysBn: 'ঠিক আছে, এটা যুক্তিসঙ্গত মনে হচ্ছে। কিন্তু দাম ১৮,০০০ — আমার পাশের বাড়ির লোক Kent মডেল কিনেছে ১২,০০০ টাকায়। এত পার্থক্য কেন?',
        idealResponse: 'That\'s a fair comparison. The X8 uses 8-stage purification including our patented Side-Stream RO technology, which wastes 70% less water than standard RO. Over 3 years, you save approximately ₹6,000 in water bills alone. Plus you get mineralized alkaline water which is better for health. The extra ₹6,000 actually pays for itself.',
        idealResponseHi: 'बिल्कुल सही तुलना है। X8 में 8-स्टेज प्यूरिफिकेशन है, हमारी पेटेंटेड साइड-स्ट्रीम RO टेक्नोलॉजी के साथ, जो स्टैंडर्ड RO से 70% कम पानी वेस्ट करती है। 3 साल में लगभग ₹6,000 की बचत वॉटर बिल में। साथ ही मिनरलाइज़्ड एल्कलाइन वॉटर सेहत के लिए बेहतर है। एक्स्ट्रा ₹6,000 खुद वसूल हो जाते हैं।',
        idealResponseTa: 'நியாயமான ஒப்பீடு. X8 8-நிலை சுத்திகரிப்பைப் பயன்படுத்துகிறது, எங்கள் காப்புரிமை பெற்ற Side-Stream RO தொழில்நுட்பத்துடன், இது வழக்கமான RO-ஐ விட 70% குறைவாக தண்ணீரை வீணாக்குகிறது. 3 ஆண்டுகளில் ~₹6,000 சேமிப்பு.',
        idealResponseBn: 'এটা ন্যায্য তুলনা। X8 ৮-স্তরের পিউরিফিকেশন ব্যবহার করে, আমাদের পেটেন্ট করা Side-Stream RO প্রযুক্তি সহ, যা স্ট্যান্ডার্ড RO-এর তুলনায় ৭০% কম জল অপচয় করে। ৩ বছরে আনুমানিক ₹৬,০০০ সাশ্রয়।',
        keywords: ['8-stage', 'side-stream', 'water', 'save', 'waste', 'mineral', 'alkaline', 'health', 'bill', 'long', 'roi', 'बचत', 'मिनरल', 'மினரல்', 'சேமிப்பு', 'সাশ্রয়', 'মিনারেল'],
        hint: 'Justify the premium with ROI math and unique tech, not just feature lists.'
      },
      {
        id: 't4',
        customerSays: 'Hmm, that\'s interesting. Can I think about it and come back next week?',
        customerSaysHi: 'हम्म, दिलचस्प है। क्या मैं सोचकर अगले हफ्ते वापस आ सकती हूं?',
        customerSaysTa: 'ம்ம், சுவாரஸ்யமாக இருக்கிறது. நான் சிந்தித்து அடுத்த வாரம் திரும்பி வரலாமா?',
        customerSaysBn: 'হুম, আকর্ষণীয় শোনাচ্ছে। আমি কি ভেবে আগামী সপ্তাহে আবার আসতে পারি?',
        idealResponse: 'Of course, ma\'am. Just so you know, we have a special exchange offer this week — ₹2,000 off if you bring your old purifier, plus a free installation kit worth ₹1,500. The offer ends Sunday. Would you like me to block one unit in your name? No payment needed, you can confirm by tomorrow.',
        idealResponseHi: 'बिल्कुल मैडम। बस यह जान लीजिए — इस हफ्ते हमारा एक्सचेंज ऑफर है — ₹2,000 ऑफ अगर आप पुराना प्यूरिफायर लाएं, प्लस फ्री इंस्टॉलेशन किट ₹1,500 की। ऑफर रविवार को खत्म होता है। एक यूनिट आपके नाम पर ब्लॉक कर दूं? कोई पेमेंट नहीं चाहिए, कल कन्फर्म कर दीजिएगा।',
        idealResponseTa: 'நிச்சயமாக மேடம். ஒரு விஷயம் சொல்கிறேன் — இந்த வாரம் எங்கள் சிறப்பு பரிமாற்ற சலுகை — பழைய சுத்திகரிப்பாளரை கொண்டு வந்தால் ₹2,000 தள்ளுபடி, மற்றும் ₹1,500 மதிப்புள்ள இலவச நிறுவல் கிட். ஞாயிறு வரை மட்டுமே. உங்கள் பெயரில் ஒன்றை வைத்திருக்கட்டுமா?',
        idealResponseBn: 'অবশ্যই ম্যাডাম। শুধু জানিয়ে রাখি — এই সপ্তাহে আমাদের বিশেষ এক্সচেঞ্জ অফার চলছে — পুরনো পিউরিফায়ার আনলে ₹২,০০০ ছাড়, প্লাস ₹১,৫০০ মূল্যের ফ্রি ইনস্টলেশন কিট। অফার রবিবার শেষ হবে। আপনার নামে একটি ব্লক করে রাখব?',
        keywords: ['offer', 'exchange', 'discount', 'block', 'reserve', 'today', 'this week', 'free', 'installation', 'sunday', 'ऑफर', 'छूट', 'ஆஃபர்', 'இலவசம்', 'অফার', 'ছাড়'],
        hint: 'Create urgency with a genuine offer and a low-commitment close.'
      }
    ]
  },
  {
    id: 'budget-comparison',
    title: 'Beating the Local Brand',
    category: 'Comparison',
    difficulty: 'Beginner',
    duration: '4-5 min',
    description: 'Customer is comparing the Pureit Copper+ Mineral RO with a cheaper local brand. Establish Pureit\'s value without disparaging competitors.',
    customerPersona: {
      name: 'Rajesh Kumar',
      avatar: '👨🏽',
      background: 'Middle-class family man from Pune, very price-conscious, has done online research.'
    },
    product: 'Pureit Copper+ Mineral RO',
    opening: 'I\'ve been looking at this Pureit Copper one, but there\'s a local brand giving the same features at half the price. Why should I pay 16,000 when I can get a similar product for 8,000?',
    completions: 967,
    avgScore: 72,
    supportedLanguages: ['en', 'hi'],
    turns: [
      {
        id: 't1',
        customerSays: 'I\'ve been looking at this Pureit Copper one, but there\'s a local brand giving the same features at half the price. Why should I pay 16,000 when I can get a similar product for 8,000?',
        customerSaysHi: 'मैं इस Pureit Copper को देख रहा हूं, लेकिन एक लोकल ब्रांड आधे दाम पर वही फीचर्स दे रहा है। मैं 16,000 क्यों दूं जब 8,000 में मिल रहा है?',
        idealResponse: 'That\'s a smart question, sir. The features may look similar on paper, but Pureit is owned by HUL — Hindustan Unilever. Local brands often use generic membranes that need replacement every 6 months versus our 1-year German-tech membrane. Over 5 years, the local brand actually costs more in replacements.',
        idealResponseHi: 'सर ये बहुत स्मार्ट सवाल है। फीचर्स पेपर पर सिमिलर दिख सकते हैं, लेकिन Pureit HUL का ब्रांड है — Hindustan Unilever। लोकल ब्रांड्स की मेम्ब्रेन हर 6 महीने में रिप्लेस करनी पड़ती है, हमारी जर्मन-टेक मेम्ब्रेन 1 साल चलती है। 5 साल में लोकल ब्रांड एक्चुअली ज़्यादा महंगा पड़ता है।',
        keywords: ['hul', 'unilever', 'trust', 'crore', 'membrane', 'german', 'replacement', '5 year', 'reliable', 'brand', 'विश्वसनीय', 'जर्मन']
      },
      {
        id: 't2',
        customerSays: 'But my neighbour has been using a local brand for 2 years without issues. So is the difference really worth 8,000?',
        customerSaysHi: 'लेकिन मेरे पड़ोसी 2 साल से लोकल ब्रांड बिना किसी दिक्कत के इस्तेमाल कर रहे हैं। तो क्या ये अंतर वाकई 8,000 के लायक है?',
        idealResponse: 'I\'m glad it\'s working for your neighbour. But here\'s what most people don\'t check — water purity at the molecular level. Our copper charge technology adds 99.9% pure copper to water, which boosts immunity. Independent NABL labs have certified our 100% RO water quality. Local brands rarely have such certifications. For your family\'s health, that ₹8,000 difference is just ₹130 per month over 5 years.',
        idealResponseHi: 'अच्छी बात है सर। लेकिन मॉलिक्युलर लेवल पर प्योरिटी चेक करना ज़रूरी है। हमारी कॉपर चार्ज टेक्नोलॉजी 99.9% प्योर कॉपर ऐड करती है, जो इम्यूनिटी बूस्ट करता है। NABL लैब्स ने हमारी 100% RO वॉटर क्वालिटी सर्टिफाई की है। लोकल ब्रांड्स के पास ऐसे सर्टिफिकेशन कम होते हैं। फैमिली की हेल्थ के लिए ₹8,000 का डिफरेंस सिर्फ ₹130/महीना है 5 साल में।',
        keywords: ['copper', 'immunity', 'nabl', 'certified', 'health', 'family', 'monthly', 'per month', 'molecular', 'pure', '99.9', 'तांबा', 'स्वास्थ्य', 'प्रमाणित']
      },
      {
        id: 't3',
        customerSays: 'Okay but what about service? Local brand guy comes within 2 hours, you guys are a big company — I worry about service.',
        customerSaysHi: 'ठीक है, लेकिन सर्विस का क्या? लोकल ब्रांड वाला 2 घंटे में आ जाता है, आप एक बड़ी कंपनी हैं - मुझे सर्विस की चिंता है।',
        idealResponse: 'Excellent point, sir. Pureit has service engineers across 1,500+ cities. Our app books a service request in 30 seconds and our SLA is 24 hours, not 2 hours. But we also offer the Pureit Auto-Fill Smart Tank that gives you a 30-day water reserve. And here\'s the key — your local brand technician is one person. If he leaves the city, you\'re stuck. We are not going anywhere.',
        idealResponseHi: 'बहुत वैलिड पॉइंट सर। Pureit के 1,500+ शहरों में सर्विस इंजीनियर हैं। हमारे ऐप से 30 सेकंड में सर्विस रिक्वेस्ट होती है और SLA 24 घंटे है, 2 घंटे नहीं। साथ ही हम Pureit Auto-Fill Smart Tank देते हैं जो 30 दिन का वॉटर रिज़र्व देता है। और मुख्य बात — लोकल ब्रांड टेक्निशियन एक आदमी है। अगर वो शहर छोड़कर चला गया, तो आप अटक जाएंगे। हम कहीं नहीं जा रहे।',
        keywords: ['engineer', 'app', 'service', 'sla', '24 hour', 'reliable', 'auto-fill', 'reserve', '1500 cities', 'सर्विस', 'भरोसा']
      },
      {
        id: 't4',
        customerSays: 'Okay, I\'m convinced. But can I take it home today? My old purifier died last week and we\'re using bottled water.',
        customerSaysHi: 'ठीक है, मैं समझ गया। लेकिन क्या मैं इसे आज घर ले जा सकता हूं? मेरा पुराना प्यूरीफायर पिछले हफ्ते खराब हो गया और हम बोतलबंद पानी पी रहे हैं।',
        idealResponse: 'Absolutely, sir — we have ready stock and the installation team can be at your home today before 7 PM. We accept all cards, UPI, EMI from ₹1,200/month, or our Pureit Pay-Later option lets you take the purifier home today and pay over 6 months at zero interest. I\'ll just need your address and a quick KYC — shall I start the paperwork?',
        idealResponseHi: 'बिल्कुल सर — रेडी स्टॉक है और इंस्टॉलेशन टीम आज शाम 7 बजे तक आपके घर आ सकती है। हम सभी कार्ड, UPI, EMI ₹1,200/महीने से एक्सेप्ट करते हैं, या Pureit Pay-Later ऑप्शन से आज प्यूरिफायर घर ले जाइए और 6 महीने में 0% इंट्रेस्ट पर पे कीजिए। बस आपका पता और क्विक KYC चाहिए — पेपरवर्क शुरू करूं?',
        keywords: ['stock', 'install', 'today', 'emi', 'finance', 'pay later', '0', 'zero', 'kyc', 'paperwork', 'order', 'आज', 'इंस्टॉल', 'ईएमआई'],
        hint: 'Close with a clear payment path and immediate delivery options.'
      }
    ]
  },
  {
    id: 'tds-concern',
    title: 'The TDS Worry',
    category: 'Product Knowledge',
    difficulty: 'Advanced',
    duration: '5-7 min',
    description: 'Technically-savvy customer asks deep questions about TDS, mineralization, and pH. Demonstrate expert product knowledge.',
    customerPersona: {
      name: 'Dr. Anand Iyer',
      avatar: '👨🏾',
      background: 'Doctor from Chennai, very informed, has read about RO water health concerns online.'
    },
    product: 'AO Smith Z9 Hot+',
    opening: 'I\'ve read that RO removes essential minerals and the WHO recommends TDS between 150-300. What\'s the TDS output of this Z9 model and does it add back minerals?',
    completions: 542,
    avgScore: 68,
    supportedLanguages: ['en', 'ta'],
    turns: [
      {
        id: 't1',
        customerSays: 'I\'ve read that RO removes essential minerals and the WHO recommends TDS between 150-300. What\'s the TDS output of this Z9 model and does it add back minerals?',
        customerSaysTa: 'நான் படித்தேன் RO அத்தியாவசிய தாதுக்களை நீக்குகிறது மற்றும் WHO TDS-ஐ 150-300-க்கு இடையில் பரிந்துரைக்கிறது. இந்த Z9 மாடலின் TDS வெளியீடு என்ன, மற்றும் அது மினரல்களை மீண்டும் சேர்க்கிறதா?',
        idealResponse: 'Excellent question, doctor. You\'re right — pure RO water has TDS below 50 which the WHO considers suboptimal. The Z9 has our patented MineralPro™ technology — after RO purification, water passes through a mineral cartridge that adds back calcium, magnesium and potassium, restoring TDS to 150-200 range. It also balances pH to 7.4, slightly alkaline.',
        idealResponseTa: 'சிறந்த கேள்வி டாக்டர். நீங்கள் சொல்வது சரிதான் — தூய RO தண்ணீரின் TDS 50-க்கும் கீழ் இருக்கும், அதை WHO குறையானதாக கருதுகிறது. Z9-இல் எங்கள் காப்புரிமை பெற்ற MineralPro™ தொழில்நுட்பம் உள்ளது — RO சுத்திகரிப்புக்குப் பிறகு, தண்ணீர் ஒரு மினரல் கார்ட்ரிட்ஜ் வழியாக செல்கிறது, இது கால்சியம், மக்னீசியம் மற்றும் பொட்டாசியத்தை மீட்டெடுக்கிறது, TDS-ஐ 150-200 வரம்பிற்கு கொண்டு வருகிறது. pH-ஐயும் 7.4 ஆல்கலைனாக சமன்படுத்துகிறது.',
        keywords: ['mineralpro', 'mineral', 'calcium', 'magnesium', 'potassium', '150', '200', 'ph', 'alkaline', '7.4', 'restore', 'cartridge', 'மினரல்', 'கால்சியம்']
      },
      {
        id: 't2',
        customerSays: 'And the input TDS? My building gets borewell water — sometimes TDS reaches 1500. Will this still work?',
        customerSaysTa: 'மற்றும் உள்ளீட்டு TDS? என் கட்டிடம் போர்வெல் தண்ணீர் பெறுகிறது — சில நேரம் TDS 1500 எட்டுகிறது. இது இன்னும் வேலை செய்யுமா?',
        idealResponse: 'The Z9 is rated for input TDS up to 2000 ppm, so 1500 is well within range. It uses a high-rejection 100 GPD membrane with 96% rejection rate. Recovery rate is 35% with our Side-Stream technology — better than the typical 25%. For 1500 input TDS, output will be around 50, then mineralized back to 180. Want me to show you the lab report?',
        idealResponseTa: 'Z9 இன்புட் TDS 2000 ppm வரை மதிப்பிடப்பட்டுள்ளது, எனவே 1500 வரம்பிற்குள்ளேயே. இது 96% நிராகரிப்பு விகிதத்துடன் ஹை-ரிஜெக்ஷன் 100 GPD மென்படலத்தை பயன்படுத்துகிறது. Side-Stream தொழில்நுட்பத்துடன் மீட்பு விகிதம் 35% — வழக்கமான 25% ஐ விட சிறந்தது. 1500 இன்புட் TDS-க்கு, அவுட்புட் சுமார் 50 ஆக இருக்கும், பின்னர் 180-க்கு மினரலைஸ் செய்யப்படும். ஆய்வக அறிக்கையை காட்டட்டுமா?',
        keywords: ['2000', 'ppm', '100 gpd', 'rejection', 'membrane', 'recovery', 'side-stream', 'lab', 'report', 'borewell', 'மென்பிரேன்']
      },
      {
        id: 't3',
        customerSays: 'And what about the hot water feature — is it actually safe? I\'ve heard about lead leaching from hot pipes.',
        customerSaysTa: 'மற்றும் சூடான தண்ணீர் வசதி பற்றி என்ன — அது உண்மையில் பாதுகாப்பானதா? சூடான குழாய்களில் இருந்து லீட் வெளியேறுவது பற்றி கேள்விப்பட்டிருக்கிறேன்.',
        idealResponse: 'Very valid concern, doctor. The Z9 uses food-grade SS-304 stainless steel tank and BPA-free piping throughout the hot water path. It heats only the output water on-demand, not the storage. We have ISI and NSF certification. Temperature is adjustable from 45°C to 80°C — 80°C kills 99.99% of remaining microbes. No lead, no BPA, completely safe.',
        idealResponseTa: 'மிகவும் சரியான கவலை டாக்டர். Z9 உணவு-தர SS-304 துருப்பிடிக்காத எஃகு தொட்டியையும், சூடான தண்ணீர் பாதை முழுவதும் BPA-இல்லாத குழாய்களையும் பயன்படுத்துகிறது. சேமிப்பகத்தை அல்ல, ஆர்டர் செய்தபடி அவுட்புட் தண்ணீரை மட்டுமே சூடாக்குகிறது. எங்களிடம் ISI மற்றும் NSF சான்றிதழ் உள்ளது. வெப்பநிலை 45°C முதல் 80°C வரை சரிசெய்யக்கூடியது — 80°C 99.99% மீதமுள்ள கிருமிகளை கொல்லுகிறது. ஈயம் இல்லை, BPA இல்லை, முற்றிலும் பாதுகாப்பானது.',
        keywords: ['ss-304', 'stainless', 'bpa-free', 'isi', 'nsf', 'certified', 'safe', 'food grade', 'on-demand', 'kill', 'microbe', 'பாதுகாப்பு', 'சான்றிதழ்']
      },
      {
        id: 't4',
        customerSays: 'Impressive. What\'s the warranty and AMC structure?',
        customerSaysTa: 'அருமை. வாரண்டி மற்றும் AMC கட்டமைப்பு என்ன?',
        idealResponse: 'Z9 comes with a 1-year comprehensive warranty plus a 5-year extended warranty on the RO membrane — that\'s industry-leading. AMC starts from year 2 at ₹3,500/year covering 3 services and all consumables except the membrane. Or you can opt for our subscription model at ₹999/month — purifier included, zero upfront cost. Which suits you better?',
        idealResponseTa: 'Z9 1-வருட விரிவான வாரண்டியுடன் வருகிறது, மேலும் RO மென்படலத்தில் 5-வருட நீட்டிக்கப்பட்ட வாரண்டி — இது தொழில்துறை முன்னணி. AMC 2-ஆம் ஆண்டு முதல் ₹3,500/ஆண்டு என ஆரம்பிக்கிறது, 3 சேவைகள் மற்றும் மென்படலம் தவிர எல்லா நுகர்பொருட்களையும் உள்ளடக்கும். அல்லது எங்கள் சந்தா மாதிரியை ₹999/மாதம் தேர்வு செய்யலாம் — சுத்திகரிப்பான் உள்ளடங்கியது, பூஜ்ஜிய முன் செலவு. எது உங்களுக்கு பொருத்தம்?',
        keywords: ['1 year', '5 year', 'warranty', 'amc', '3500', '3 service', 'subscription', '999', 'monthly', 'consumable', 'membrane', 'வாரண்டி', 'சந்தா']
      }
    ]
  },
  {
    id: 'upgrade-existing',
    title: 'The Upgrade Pitch',
    category: 'Closing',
    difficulty: 'Beginner',
    duration: '4-5 min',
    description: 'Existing Pureit customer (5 years old model) is in for a service and is considering an upgrade. Convert the service visit into a new sale.',
    customerPersona: {
      name: 'Meera Reddy',
      avatar: '👩🏾',
      background: 'Loyal Pureit customer for 5 years, in the store for a filter replacement.'
    },
    product: 'Pureit Eco Water Saver',
    opening: 'I\'ve had my Pureit Ultima for 5 years now. I came in for a filter change but the technician suggested I look at the newer models. Honestly mine still works fine — why should I upgrade?',
    completions: 723,
    avgScore: 81,
    supportedLanguages: ['en'],
    turns: [
      {
        id: 't1',
        customerSays: 'I\'ve had my Pureit Ultima for 5 years now. I came in for a filter change but the technician suggested I look at the newer models. Honestly mine still works fine — why should I upgrade?',
        idealResponse: 'It\'s great to see a loyal customer, ma\'am! Your Ultima has served you well — that\'s our quality. But our new Eco Water Saver wastes only 1 litre per 3 litres purified, compared to the old 1:3 wastage ratio. For a family of 4, that\'s about 15,000 litres of water saved per year — almost ₹3,500 in water bills annually.',
        keywords: ['eco', 'water saver', 'save', 'wastage', 'ratio', 'family', 'bill', 'litre', 'loyalty', '5 year']
      },
      {
        id: 't2',
        customerSays: 'That sounds nice but I just spent on a filter change. New purifier means another big expense.',
        idealResponse: 'Totally understand, ma\'am. That\'s why we have an exclusive loyalty exchange — bring your 5-year-old Ultima and get ₹3,000 off the Eco model. Plus, we\'ll credit the filter cost you just paid against the new purchase. So your effective cost is just ₹9,500 for a brand new purifier with 1 year free service. Sound fair?',
        keywords: ['exchange', 'loyalty', '3000', 'discount', 'credit', 'effective', 'free', 'service', 'brand new', 'offer']
      },
      {
        id: 't3',
        customerSays: 'Hmm, the exchange is tempting. Will my family even notice a difference in water quality?',
        idealResponse: 'Absolutely, ma\'am. The Eco model adds copper and zinc through our Mineral Charger — proven to boost immunity and improve digestion. It also has a digital display showing real-time water purity and filter life. Your old model didn\'t have these. We can install it tomorrow and you\'ll start seeing the savings in your next water bill.',
        keywords: ['copper', 'zinc', 'mineral', 'immunity', 'digital', 'display', 'install', 'tomorrow', 'savings']
      },
      {
        id: 't4',
        customerSays: 'Alright, prepare the paperwork. When can your team install it?',
        idealResponse: 'Excellent decision, ma\'am! Our team can be at your home tomorrow between 10 AM and 12 PM. Installation takes 45 minutes, and we\'ll dispose of your old Ultima responsibly. The technician will also run a free water quality test at your home and connect the new purifier to our Pureit app on your phone. Let me start the exchange paperwork — just need your address and a 2-minute KYC.',
        keywords: ['tomorrow', 'install', '45 minute', 'dispose', 'water test', 'paperwork', 'kyc', 'address', 'app', 'welcome'],
        hint: 'Lock in the install slot and reinforce all the value-adds they get.'
      }
    ]
  },
  {
    id: 'maintenance-fear',
    title: 'The Service Cost Question',
    category: 'Objection Handling',
    difficulty: 'Intermediate',
    duration: '5-6 min',
    description: 'First-time buyer is worried about recurring maintenance costs and complexity. Reassure with transparent cost breakdown.',
    customerPersona: {
      name: 'Vikram Singh',
      avatar: '🧔🏽',
      background: 'First-time water purifier buyer, retired teacher, very cost-conscious about hidden expenses.'
    },
    product: 'AO Smith X2 UV Plus',
    opening: 'My friend told me water purifiers are a trap — you pay for the machine, then keep paying for filters, service, and repairs. What is the real total cost over 5 years for this X2?',
    completions: 856,
    avgScore: 74,
    supportedLanguages: ['en'],
    turns: [
      {
        id: 't1',
        customerSays: 'My friend told me water purifiers are a trap — you pay for the machine, then keep paying for filters, service, and repairs. What is the real total cost over 5 years for this X2?',
        idealResponse: 'Your friend raises a fair point, sir. Let me be completely transparent. X2 costs ₹12,500 upfront. AMC is ₹2,800/year covering all 3 services plus pre-filter changes. The main UV lamp lasts 1 year and costs ₹600. So over 5 years: 12,500 + (2,800 × 4) + (600 × 4) = ₹26,500 total. That\'s ₹442 per month for safe drinking water for the whole family.',
        keywords: ['transparent', '12500', 'amc', '2800', 'upfront', 'total', '5 year', '442', 'per month', 'breakdown']
      },
      {
        id: 't2',
        customerSays: 'And what if something major breaks? Like the motor or board fails?',
        idealResponse: 'Good question, sir. The X2 has a 1-year comprehensive warranty covering everything, then 4 years on the pump and electronics. If you opt for our Total Protection Plan at ₹3,500/year, it covers EVERY part — motor, board, sensors, even physical damage. So even worst case, your max yearly spend is capped at ₹3,500. No surprises.',
        keywords: ['warranty', 'comprehensive', 'total protection', '3500', 'cap', 'no surprise', 'motor', 'board', 'cover']
      },
      {
        id: 't3',
        customerSays: 'Comparing to boiling water — that\'s free. Is the purifier really worth the ₹442 monthly?',
        idealResponse: 'Excellent comparison, sir. Boiling kills bacteria but doesn\'t remove dissolved impurities, heavy metals, or chemicals. Plus, gas cylinder cost for boiling 15 litres daily for a family is about ₹350/month. So you save ₹90 monthly even versus boiling, AND you get safer water. Bottled water for the same family would be ₹3,000/month. The X2 pays for itself in 4 months versus bottled.',
        keywords: ['boiling', 'bacteria', 'dissolved', 'gas', 'cylinder', '350', 'bottled', '3000', 'pay', 'safer', 'compare']
      },
      {
        id: 't4',
        customerSays: 'Okay, I\'m convinced. But what about the AMC — what if I want to cancel after year 2 if I\'m not happy?',
        idealResponse: 'Completely fair, sir. AMC is yearly, never locked in — you can cancel any year. We also offer a 90-day workmanship warranty on every AMC service, so if something we replace fails within 90 days, free re-service. And here\'s a tip — if you pay 3 years AMC upfront, you get the 4th year free. Saves you ₹2,800. Want me to lock that in along with the purifier?',
        keywords: ['cancel', 'yearly', 'lock', 'flexible', '90 day', 'warranty', '3 year', 'upfront', 'free', 'save', 'lock in'],
        hint: 'Reassure on flexibility, then offer a small commitment upgrade that creates value.'
      }
    ]
  },
  {
    id: 'new-mother',
    title: 'The New Mother',
    category: 'Product Knowledge',
    difficulty: 'Intermediate',
    duration: '4-5 min',
    description: 'A new mother is worried about water safety for her 5-month-old baby. She\'s read scary articles online about RO water and infants. Educate without being condescending.',
    customerPersona: {
      name: 'Anjali Verma',
      avatar: '👩🏻',
      background: 'New mother, baby is 5 months old, will be starting formula feeding soon. Has read mixed information online about RO water for infants.'
    },
    product: 'AO Smith ProPlanet P5',
    opening: 'I just had a baby five months ago. I need to know — is your purifier safe for making formula? I\'ve read online that RO water is bad for babies because it has no minerals.',
    completions: 612,
    avgScore: 76,
    supportedLanguages: ['en', 'hi'],
    turns: [
      {
        id: 't1',
        customerSays: 'I just had a baby five months ago. I need to know — is your purifier safe for making formula? I\'ve read online that RO water is bad for babies because it has no minerals.',
        customerSaysHi: 'मेरा बच्चा पाँच महीने का है। मुझे जानना है कि क्या आपका प्यूरीफायर फॉर्मूला बनाने के लिए सुरक्षित है? मैंने ऑनलाइन पढ़ा है कि RO का पानी बच्चों के लिए हानिकारक है क्योंकि उसमें मिनरल्स नहीं होते।',
        idealResponse: 'Congratulations, ma\'am! You\'re asking exactly the right question. Plain RO water is suboptimal because it strips minerals — you\'re absolutely correct. But the ProPlanet P5 has our MineralPro™ technology that adds back calcium, magnesium and zinc to safe paediatric levels. The output meets WHO guidelines for infant-safe drinking water. We can show you the certification report.',
        idealResponseHi: 'बधाई हो मैडम! आप बिल्कुल सही सवाल पूछ रही हैं। प्लेन RO पानी सबऑप्टिमल है क्योंकि वो मिनरल्स हटा देता है — आप बिल्कुल सही हैं। लेकिन ProPlanet P5 में हमारी MineralPro™ टेक्नोलॉजी है जो कैल्शियम, मैग्नीशियम और ज़िंक को सेफ पीडियाट्रिक लेवल्स पर वापस ऐड करती है। आउटपुट WHO इन्फेंट गाइडलाइन्स मीट करता है। हम आपको सर्टिफिकेशन रिपोर्ट भी दिखा सकते हैं।',
        keywords: ['mineral', 'calcium', 'magnesium', 'zinc', 'mineralpro', 'who', 'paediatric', 'safe', 'baby', 'infant', 'certification', 'मिनरल', 'सुरक्षित', 'बच्चा']
      },
      {
        id: 't2',
        customerSays: 'But what about bacteria and viruses? I keep boiling water because I read RO doesn\'t kill germs.',
        customerSaysHi: 'लेकिन बैक्टीरिया और वायरस का क्या? मैं अभी भी पानी उबालती हूं क्योंकि मैंने पढ़ा था कि RO कीटाणु नहीं मारता।',
        idealResponse: 'Excellent concern. The P5 has a 6-stage purification including a UV chamber that kills 99.99% of bacteria and viruses, including E. coli and rotavirus — the common ones that cause infant diarrhoea. So you get the RO benefit of removing heavy metals AND the UV benefit of killing germs. You don\'t need to boil. AIIMS Delhi paediatricians recommend this combination for infants.',
        idealResponseHi: 'बहुत वैलिड कंसर्न है मैडम। P5 में 6-स्टेज प्यूरिफिकेशन है UV चेम्बर के साथ जो 99.99% बैक्टीरिया और वायरस किल करता है, जिसमें E. coli और रोटावायरस शामिल हैं — ये कॉमन कीटाणु जो बच्चों में डायरिया करते हैं। तो आपको RO का बेनिफिट मिलता है हेवी मेटल्स हटाने का, और UV का बेनिफिट कीटाणु मारने का। बॉइल करने की ज़रूरत नहीं। AIIMS Delhi के पीडियाट्रिशियन्स यही कॉम्बिनेशन इन्फेंट्स के लिए रेकमेंड करते हैं।',
        keywords: ['uv', 'bacteria', 'virus', '99.99', 'e. coli', 'rotavirus', 'boil', 'aiims', 'paediatric', '6-stage', 'germ', 'कीटाणु', 'यूवी']
      },
      {
        id: 't3',
        customerSays: 'And what if the UV lamp burns out without me knowing? My baby could get sick.',
        customerSaysHi: 'और अगर UV लैंप मुझे बिना पता चले खराब हो जाए तो? मेरा बच्चा बीमार हो सकता है।',
        idealResponse: 'Critical point, ma\'am. The P5 has a UV-Fail alarm — if the UV lamp dims or fails, the purifier stops dispensing water completely and the indicator goes red. It will not give you contaminated water silently. The UV lamp lasts 6,000 hours, about 1 year, and our app sends you a reminder 30 days before replacement. Total peace of mind for a new parent.',
        idealResponseHi: 'बहुत क्रिटिकल पॉइंट मैडम। P5 में UV-फेल अलार्म है — अगर UV लैंप डिम हो या फेल हो जाए तो प्यूरिफायर पानी डिस्पेंस करना पूरी तरह स्टॉप कर देता है और इंडिकेटर रेड हो जाता है। कंटैमिनेटेड पानी साइलेंटली कभी नहीं देगा। UV लैंप 6,000 घंटे चलता है, लगभग 1 साल, और हमारा ऐप आपको रिप्लेसमेंट से 30 दिन पहले रिमाइंडर भेजता है। नए पेरेंट्स के लिए टोटल पीस ऑफ माइंड।',
        keywords: ['uv-fail', 'alarm', 'stop', 'dispense', 'red', 'indicator', 'app', 'reminder', '6000 hour', '1 year', 'peace of mind', 'अलार्म', 'सूचना']
      },
      {
        id: 't4',
        customerSays: 'This sounds reassuring. What about the price and installation?',
        customerSaysHi: 'ये सुनकर तसल्ली हुई। कीमत और इंस्टॉलेशन के बारे में बताइए?',
        idealResponse: 'The P5 is ₹17,990 with a 1-year comprehensive warranty. For new parents we have a special "First Year Free" service plan — zero AMC for the first year. Installation tomorrow morning, free, takes 40 minutes. We also include a baby-safe sippy bottle and a free water quality report from your tap. Shall I block one for you?',
        idealResponseHi: 'P5 ₹17,990 है, 1 साल की कॉम्प्रिहेन्सिव वारंटी के साथ। नए पेरेंट्स के लिए हमारा स्पेशल "फर्स्ट ईयर फ्री" सर्विस प्लान है — पहले साल ज़ीरो AMC। इंस्टॉलेशन कल सुबह फ्री, 40 मिनट लगते हैं। एक बेबी-सेफ सिप्पी बॉटल भी इन्क्लूड है, और आपके नल का फ्री वॉटर क्वालिटी रिपोर्ट भी। एक यूनिट आपके लिए ब्लॉक कर दूं?',
        keywords: ['17990', '1 year', 'warranty', 'first year free', 'amc', 'free', 'install', 'tomorrow', 'sippy', 'report', 'block', 'मुफ्त', 'इंस्टॉलेशन'],
        hint: 'Reinforce the new-parent peace of mind with bundled value, then close gently.'
      }
    ]
  },
  {
    id: 'online-price-hunter',
    title: 'The Online Price Hunter',
    category: 'Comparison',
    difficulty: 'Beginner',
    duration: '3-5 min',
    description: 'Customer has been comparing prices online and has found the same Pureit model cheaper on Amazon. Establish the in-store value proposition.',
    customerPersona: {
      name: 'Karthik Subramanian',
      avatar: '🧑🏽‍💻',
      background: 'IT professional from Bangalore, very comfortable with online shopping, in the store only to inspect the product before buying online.'
    },
    product: 'Pureit Copper+ Mineral RO',
    opening: 'I saw this exact same Pureit model on Amazon for ₹2,200 less. Honestly I came to your store just to see it physically. Why would I buy from here at full price?',
    completions: 1142,
    avgScore: 71,
    supportedLanguages: ['en'],
    turns: [
      {
        id: 't1',
        customerSays: 'I saw this exact same Pureit model on Amazon for ₹2,200 less. Honestly I came to your store just to see it physically. Why would I buy from here at full price?',
        idealResponse: 'Completely fair question, sir. Let me show you why. Our store price includes free professional installation worth ₹1,500 — online sellers charge extra or expect you to arrange it. We also give you a free in-home water quality test, free pre-filter for 6 months, and the warranty starts from installation date, not from delivery — so you actually get 30+ extra days of coverage.',
        keywords: ['installation', '1500', 'free', 'water test', 'pre-filter', 'warranty', 'cover', 'extra', 'amazon', 'online']
      },
      {
        id: 't2',
        customerSays: 'But ₹2,200 is a lot. The installation discount and freebies don\'t add up to that, do they?',
        idealResponse: 'Let me lay it out. Installation: ₹1,500. Pre-filter set: ₹800. Water test: ₹500. That\'s ₹2,800 of value right there — already more than your savings. But here\'s the bigger reason: when the purifier needs service in year 2 or 3, online buyers wait days for service because there\'s no purchase record at the local centre. Store buyers get priority because you\'re already in our system. That convenience is invaluable.',
        keywords: ['installation', '1500', 'pre-filter', '800', 'water test', '500', '2800', 'priority', 'service', 'record', 'system']
      },
      {
        id: 't3',
        customerSays: 'Okay that\'s convincing. But what if Amazon also offers installation through Pureit?',
        idealResponse: 'Good question — Amazon does offer Pureit installation, but it\'s scheduled by their algorithm, often 4-7 days later. Here, I can have a Pureit technician at your home today or tomorrow morning. Also, if there\'s any DOA (dead on arrival) issue, online means courier pickup, refund, re-order — easily 10 days without water. Here, we swap it on the spot. That\'s our 5-Minute Replacement Policy for in-store purchases.',
        keywords: ['amazon', '4-7 day', 'today', 'tomorrow', 'doa', 'replacement', '5 minute', 'spot', 'swap', 'courier']
      },
      {
        id: 't4',
        customerSays: 'Alright you\'ve convinced me. Can you match the Amazon price?',
        idealResponse: 'I appreciate that, sir. I can\'t match the listed price, but I can offer you a ₹1,500 exchange credit even on a small old appliance, plus stretch your AMC by 6 months free — that\'s ₹1,400 worth. Effective price difference becomes just ₹800, and you keep all the local-store advantages. Better deal than Amazon, fair? Shall I bill it?',
        keywords: ['exchange', '1500', 'credit', 'amc', '6 month', 'free', '1400', 'effective', '800', 'bill', 'deal'],
        hint: 'Don\'t match the price head-on — bundle non-cash value to bridge the gap.'
      }
    ]
  },
  {
    id: 'hard-water-crisis',
    title: 'The Hard Water Crisis',
    category: 'Objection Handling',
    difficulty: 'Advanced',
    duration: '5-6 min',
    description: 'Customer from a Tier-2 city has extremely hard borewell water (TDS over 1800) and has had three purifiers fail in three years. Convince them this one will survive.',
    customerPersona: {
      name: 'Sunil Patil',
      avatar: '🧑🏾',
      background: 'Lives in Solapur, Maharashtra. Borewell water TDS over 1800, has had 3 purifiers fail in 3 years. Deeply skeptical.'
    },
    product: 'AO Smith Z9 Hot+',
    opening: 'My borewell water TDS is 1800. I\'ve already burnt through three purifiers in three years — Kent, Eureka Forbes, and a local brand. All membranes died in 8-10 months. What makes you think yours will survive?',
    completions: 389,
    avgScore: 64,
    supportedLanguages: ['en', 'hi'],
    turns: [
      {
        id: 't1',
        customerSays: 'My borewell water TDS is 1800. I\'ve already burnt through three purifiers in three years — Kent, Eureka Forbes, and a local brand. All membranes died in 8-10 months. What makes you think yours will survive?',
        customerSaysHi: 'मेरे बोरवेल पानी का TDS 1800 है। मैंने तीन साल में तीन प्यूरीफायर बदल दिए हैं - Kent, Eureka Forbes, और एक लोकल ब्रांड। सब के मेंब्रेन 8-10 महीने में खराब हो गए। आपको क्यों लगता है कि आपका टिकेगा?',
        idealResponse: 'I completely understand your frustration, sir. The reason those failed isn\'t the membranes — it\'s that they had no pre-treatment for high TDS water. The Z9 is built specifically for tough water: it has a triple sediment filter, an anti-scalant pre-filter, AND a high-rejection 100 GPD membrane rated for input TDS up to 2000 ppm. We pair it with our HardWater Pro pre-treatment system — a one-time add-on that protects the main RO.',
        idealResponseHi: 'सर मैं आपकी फ्रस्ट्रेशन पूरी तरह समझता हूं। वो फेल इसलिए नहीं हुए कि मेम्ब्रेन खराब थी — बल्कि उनमें हाई TDS वॉटर के लिए कोई प्री-ट्रीटमेंट नहीं था। Z9 स्पेसिफिकली टफ वॉटर के लिए बनाया गया है: इसमें ट्रिपल सेडिमेंट फिल्टर है, एक एंटी-स्केलेंट प्री-फिल्टर है, और एक हाई-रिजेक्शन 100 GPD मेम्ब्रेन जो इनपुट TDS 2000 ppm तक के लिए रेटेड है। हम इसे HardWater Pro प्री-ट्रीटमेंट सिस्टम के साथ पेयर करते हैं — एक वन-टाइम ऐड-ऑन जो मेन RO को प्रोटेक्ट करता है।',
        keywords: ['pre-treatment', 'sediment', 'anti-scalant', '100 gpd', '2000', 'ppm', 'hardwater', 'protect', 'tough', 'tds', 'प्री-ट्रीटमेंट', 'सुरक्षा']
      },
      {
        id: 't2',
        customerSays: 'Pre-treatment add-on? That sounds like another expense. How much extra?',
        customerSaysHi: 'प्री-ट्रीटमेंट ऐड-ऑन? ये तो एक और खर्चा लगता है। कितना अतिरिक्त?',
        idealResponse: 'The HardWater Pro is a one-time ₹2,800 add-on. But here\'s the math — without it, your membrane dies in 10 months at ₹3,500 replacement. With it, the membrane lasts the full 2-3 years rated lifespan. You actually save ₹4,000+ over 3 years. Plus, I\'ll be honest with you, sir — if I sold you the purifier alone without warning you about pre-treatment, you\'d be back here in a year angry. I\'d rather lose ₹2,800 in upfront sale than lose you as a customer.',
        idealResponseHi: 'HardWater Pro एक वन-टाइम ₹2,800 का ऐड-ऑन है। लेकिन मैथ देखिए — इसके बिना आपकी मेम्ब्रेन 10 महीने में डाई हो जाएगी, ₹3,500 रिप्लेसमेंट। इसके साथ मेम्ब्रेन पूरे 2-3 साल की रेटेड लाइफस्पैन चलती है। आप एक्चुअली 3 साल में ₹4,000+ बचाते हैं। प्लस सर मैं आपसे ईमानदारी से कहूं — अगर मैं प्यूरिफायर अकेला बेच दूं प्री-ट्रीटमेंट के बारे में बिना बताए, तो आप एक साल में यहाँ वापस आएंगे गुस्से में। मैं ₹2,800 अपफ्रंट सेल लूज़ करना पसंद करूंगा बजाय आपको कस्टमर के रूप में लूज़ करने के।',
        keywords: ['2800', 'one-time', '10 month', '3500', 'membrane', '2-3 year', 'save', '4000', 'honest', 'warning', 'trust', 'ईमानदार']
      },
      {
        id: 't3',
        customerSays: 'That\'s actually refreshing — most salespeople would have just sold me the machine. What about warranty if it still fails?',
        customerSaysHi: 'ये अलग बात है - ज्यादातर सेल्समैन तो बस मशीन बेचकर भाग जाते हैं। अगर फिर भी फेल हो जाए तो वारंटी क्या है?',
        idealResponse: 'Thank you, sir. Because we know hard water is harsh, the Z9 + HardWater Pro combo comes with a 2-year extended membrane warranty, double the standard 1 year. If the membrane fails before 24 months due to TDS damage, we replace it free. Documented in writing. Also, our service engineer in Solapur is a senior technician with 8 years experience — not a new trainee. You\'ll be in good hands.',
        idealResponseHi: 'धन्यवाद सर। क्योंकि हम जानते हैं हार्ड वॉटर हार्श है, Z9 + HardWater Pro कॉम्बो 2-साल की एक्सटेंडेड मेम्ब्रेन वारंटी के साथ आता है, स्टैंडर्ड 1 साल का डबल। अगर TDS डैमेज से 24 महीने पहले मेम्ब्रेन फेल हो जाए, हम फ्री में रिप्लेस करते हैं। राइटिंग में डॉक्युमेंटेड। साथ ही, हमारे सोलापुर वाले सर्विस इंजीनियर एक सीनियर टेक्निशियन हैं — 8 साल का एक्सपीरियंस, कोई नया ट्रेनी नहीं। आप अच्छे हाथों में रहेंगे।',
        keywords: ['2-year', 'extended', 'warranty', 'membrane', '24 month', 'free', 'writing', 'engineer', 'solapur', '8 year', 'senior', 'वारंटी']
      },
      {
        id: 't4',
        customerSays: 'Okay, you\'ve earned my trust. What\'s the total cost out the door?',
        customerSaysHi: 'ठीक है, आपने मेरा विश्वास जीत लिया। टोटल कीमत क्या निकलेगी?',
        idealResponse: 'Z9 with the Hot+ feature: ₹24,990. HardWater Pro add-on: ₹2,800. Installation: free. First-year AMC: included. Total: ₹27,790. I can offer ₹2,500 exchange on any old purifier — even a non-working one — bringing it to ₹25,290. EMI from ₹2,100/month over 12 months at zero interest. Shall I prepare the invoice and book the installation for tomorrow?',
        idealResponseHi: 'Z9 Hot+ फीचर के साथ: ₹24,990। HardWater Pro ऐड-ऑन: ₹2,800। इंस्टॉलेशन: फ्री। फर्स्ट-ईयर AMC: इन्क्लूडेड। टोटल: ₹27,790। मैं ₹2,500 का एक्सचेंज ऑफर कर सकता हूं किसी भी पुराने प्यूरिफायर पर — चाहे वो काम न कर रहा हो — कुल ₹25,290। EMI ₹2,100/महीना 12 महीने के लिए, 0% इंट्रेस्ट पर। मैं इन्वॉइस तैयार करूं और कल के लिए इंस्टॉलेशन बुक करूं?',
        keywords: ['24990', '2800', '27790', 'exchange', '2500', '25290', 'emi', '2100', 'zero', 'install', 'tomorrow', 'invoice', 'ईएमआई'],
        hint: 'Break down the total transparently — this customer values honesty over discounts.'
      }
    ]
  },
  {
    id: 'geyser-size',
    title: 'The Geyser Size Question',
    category: 'Product Knowledge',
    difficulty: 'Beginner',
    duration: '3-4 min',
    description: 'Family of four is moving into a new flat and unsure about water heater capacity. Recommend the right size with clear logic.',
    customerPersona: {
      name: 'Vikash Tiwari',
      avatar: '👨🏻',
      background: 'Family of 4 (2 adults, 2 kids age 8 and 12), moving into a new 3BHK flat in Noida. Old geyser was 10L and family complained of cold water.'
    },
    product: 'AO Smith HSE-VAS-X 25L',
    opening: 'We\'re a family of four moving into a new flat. I have no idea what size geyser to buy. My old 10L one was a disaster — by the second person, only cold water. What size do I actually need?',
    completions: 894,
    avgScore: 83,
    supportedLanguages: ['en', 'hi', 'bn'],
    turns: [
      {
        id: 't1',
        customerSays: 'We\'re a family of four moving into a new flat. I have no idea what size geyser to buy. My old 10L one was a disaster — by the second person, only cold water. What size do I actually need?',
        customerSaysHi: 'हम चार लोगों का परिवार है, नई फ्लैट में शिफ्ट हो रहे हैं। मुझे नहीं पता कौन सा साइज गीजर लेना चाहिए। मेरा पुराना 10 लीटर का गीजर बेकार था - दूसरे व्यक्ति को ही ठंडा पानी मिलने लगता था। मुझे कौन सा साइज चाहिए?',
        customerSaysBn: 'আমরা চারজনের পরিবার, নতুন ফ্ল্যাটে শিফট হচ্ছি। আমার ধারণাই নেই কোন সাইজের গিজার কিনব। আমার পুরানো ১০ লিটারের গিজারটা ছিল একদম বাজে — দ্বিতীয় জনের সময়ই ঠান্ডা জল চলে আসত। আসলে আমার কোন সাইজ দরকার?',
        idealResponse: 'Easy decision, sir. The thumb rule is 6 litres of hot water per person for a comfortable bucket bath. For 4 people, you need 25 litres minimum. The HSE-VAS-X 25L is exactly right for your family — gives back-to-back bathing without anyone getting cold water. Your 10L was undersized; not your fault, that\'s why you struggled.',
        idealResponseHi: 'आसान डिसीज़न सर। थम्ब रूल है 6 लीटर हॉट वॉटर प्रति व्यक्ति आरामदायक बकेट बाथ के लिए। 4 लोगों के लिए आपको मिनिमम 25 लीटर चाहिए। HSE-VAS-X 25L आपकी फैमिली के लिए बिल्कुल सही है — बैक-टू-बैक बाथिंग देता है, किसी को ठंडा पानी नहीं मिलेगा। आपका 10L अंडरसाइज़्ड था; आपकी ग़लती नहीं, इसीलिए स्ट्रगल हुआ।',
        idealResponseBn: 'সহজ সিদ্ধান্ত স্যার। থাম্ব রুল হল আরামদায়ক বালতি স্নানের জন্য প্রতি ব্যক্তিকে ৬ লিটার গরম জল। ৪ জনের জন্য আপনার ন্যূনতম ২৫ লিটার দরকার। HSE-VAS-X 25L আপনার পরিবারের জন্য একদম সঠিক — কেউ ঠান্ডা জল না পেয়ে ব্যাক-টু-ব্যাক স্নান করতে পারবেন। আপনার ১০L আন্ডারসাইজ্ড ছিল; এটা আপনার দোষ নয়, তাই আপনি সমস্যায় পড়েছিলেন।',
        keywords: ['25 litre', '6 litre', 'per person', 'thumb rule', 'back-to-back', 'comfortable', 'undersized', 'family', '4 people', 'bath', 'परिवार', 'लीटर', 'পরিবার', 'লিটার']
      },
      {
        id: 't2',
        customerSays: '25L sounds big. Won\'t it use a lot of electricity? My current bill is already high.',
        customerSaysHi: '25 लीटर तो बड़ा है। ये बिजली बहुत खाएगा क्या? मेरा बिल पहले से ही ज्यादा है।',
        customerSaysBn: '২৫ লিটার তো অনেক বড়। এটা কি বেশি বিদ্যুৎ খাবে? আমার বিল এমনিতেই অনেক বেশি।',
        idealResponse: 'Smart concern, sir. The 25L HSE-VAS-X is 5-star BEE rated — the highest efficiency level. It uses smart thermostat technology that maintains temperature without continuous heating. Average monthly electricity cost is ₹280-350 for a family of 4 using daily — same as your old 10L but with way more hot water. Bigger doesn\'t mean costlier when efficiency is high.',
        idealResponseHi: 'स्मार्ट कंसर्न सर। 25L HSE-VAS-X 5-स्टार BEE रेटेड है — सबसे हाई एफिशिएंसी लेवल। स्मार्ट थर्मोस्टैट टेक्नोलॉजी यूज़ करता है जो टेम्परेचर मेंटेन करता है बिना कंटीन्यूअस हीटिंग के। एवरेज मंथली इलेक्ट्रिसिटी कॉस्ट ₹280-350 है फैमिली ऑफ 4 के डेली यूज़ के लिए — आपके पुराने 10L के बराबर लेकिन ज़्यादा हॉट वॉटर। बिगर का मतलब महंगा नहीं जब एफिशिएंसी हाई हो।',
        idealResponseBn: 'স্মার্ট উদ্বেগ স্যার। 25L HSE-VAS-X ৫-স্টার BEE রেটেড — সর্বোচ্চ দক্ষতার মাত্রা। এটি স্মার্ট থার্মোস্ট্যাট প্রযুক্তি ব্যবহার করে যা ক্রমাগত হিটিং ছাড়াই তাপমাত্রা বজায় রাখে। ৪ জনের পরিবার দৈনিক ব্যবহারে গড় মাসিক বিদ্যুৎ খরচ ₹২৮০-৩৫০ — আপনার পুরানো 10L এর সমান কিন্তু অনেক বেশি গরম জল। দক্ষতা বেশি হলে বড় মানে ব্যয়বহুল নয়।',
        keywords: ['5-star', 'bee', 'rated', 'efficient', 'thermostat', '280', '350', 'monthly', 'electricity', 'efficiency', 'बिजली', '5 स्टार', 'বিদ্যুৎ']
      },
      {
        id: 't3',
        customerSays: 'And how long does it take to heat up in the morning? My kids are always rushing for school.',
        customerSaysHi: 'और सुबह गर्म होने में कितना समय लगता है? मेरे बच्चे स्कूल के लिए हमेशा जल्दी में रहते हैं।',
        customerSaysBn: 'আর সকালে গরম হতে কতক্ষণ লাগে? আমার বাচ্চারা স্কুলের জন্য সবসময় তাড়াহুড়োয় থাকে।',
        idealResponse: 'Great point. 25L heats from cold to 65°C in approximately 12-15 minutes. With our SmartConnect timer feature, you can set it to auto-start 30 minutes before alarm — so hot water is ready when you wake up. There\'s also a Boost mode that heats 20% faster when guests arrive unexpectedly. Your morning rush won\'t be an issue.',
        idealResponseHi: 'बढ़िया पॉइंट। 25L कोल्ड से 65°C तक हीट होने में लगभग 12-15 मिनट लेता है। हमारी SmartConnect टाइमर फीचर के साथ आप इसे अलार्म से 30 मिनट पहले ऑटो-स्टार्ट सेट कर सकते हैं — तो हॉट वॉटर तैयार होगा जब आप उठते हैं। एक बूस्ट मोड भी है जो 20% तेज़ी से हीट करता है जब अनएक्सपेक्टेड गेस्ट्स आते हैं। आपकी मॉर्निंग रश की कोई दिक्कत नहीं होगी।',
        idealResponseBn: 'দুর্দান্ত পয়েন্ট। 25L ঠান্ডা থেকে ৬৫°C পর্যন্ত প্রায় ১২-১৫ মিনিটে গরম হয়। আমাদের SmartConnect টাইমার ফিচার দিয়ে, আপনি অ্যালার্মের ৩০ মিনিট আগে অটো-স্টার্ট সেট করতে পারেন — তাই আপনি যখন জাগেন তখন গরম জল প্রস্তুত। একটি বুস্ট মোডও আছে যা অপ্রত্যাশিত অতিথি এলে ২০% দ্রুত গরম হয়। আপনার সকালের তাড়াহুড়ো কোনো সমস্যা হবে না।',
        keywords: ['15 minute', 'heat', 'smartconnect', 'timer', 'auto', 'boost', 'morning', '65', 'fast', 'ready', 'तेज', 'टाइमर', 'টাইমার']
      },
      {
        id: 't4',
        customerSays: 'What about the warranty and installation? My new flat is on the 7th floor.',
        customerSaysHi: 'वारंटी और इंस्टॉलेशन का क्या? मेरी नई फ्लैट 7वीं मंजिल पर है।',
        customerSaysBn: 'ওয়ারেন্টি আর ইনস্টলেশনের কী হবে? আমার নতুন ফ্ল্যাট সাত তলায়।',
        idealResponse: 'The HSE-VAS-X comes with 7 years on the tank, 4 years on the heating element — industry-leading. Installation is free across India including high-rise flats — our team carries it up via lift or stairs, no extra charge. Total install time is 1 hour, includes wall mounting, plumbing, and a 15-minute demo of the SmartConnect app. Shall I schedule installation for the day you move in?',
        idealResponseHi: 'HSE-VAS-X 7 साल टैंक पर वारंटी देता है, 4 साल हीटिंग एलिमेंट पर — इंडस्ट्री-लीडिंग। इंस्टॉलेशन पूरे इंडिया में फ्री है, हाई-राइज फ्लैट्स भी इन्क्लूडेड — हमारी टीम लिफ्ट या सीढ़ियों से ऊपर ले जाती है, कोई एक्स्ट्रा चार्ज नहीं। टोटल इंस्टॉल टाइम 1 घंटा है, इसमें वॉल माउंटिंग, प्लंबिंग, और SmartConnect ऐप का 15-मिनट डेमो शामिल है। आपके मूव-इन डे पर इंस्टॉलेशन शेड्यूल कर दूं?',
        idealResponseBn: 'HSE-VAS-X ট্যাঙ্কে ৭ বছর, হিটিং এলিমেন্টে ৪ বছর ওয়ারেন্টি দেয় — ইন্ডাস্ট্রি-লিডিং। উঁচু ফ্ল্যাট সহ পুরো ভারতে ইনস্টলেশন ফ্রি — আমাদের টিম লিফট বা সিঁড়ি দিয়ে উপরে নিয়ে যায়, কোনো অতিরিক্ত চার্জ নেই। মোট ইনস্টল সময় ১ ঘণ্টা, এতে ওয়াল মাউন্টিং, প্লাম্বিং, এবং SmartConnect অ্যাপের ১৫-মিনিটের ডেমো অন্তর্ভুক্ত। আপনার মুভ-ইন দিনে ইনস্টলেশন শিডিউল করব?',
        keywords: ['7 year', 'tank', '4 year', 'element', 'warranty', 'free', 'install', '7th floor', 'high-rise', 'demo', 'move in', 'schedule', 'मुफ्त', 'इंस्टॉल', 'ওয়ারেন্টি', 'ইনস্টল'],
        hint: 'Lock in the install date around their move-in to add convenience value.'
      }
    ]
  },
  {
    id: 'solar-pitch',
    title: 'The Solar Geyser Pitch',
    category: 'Closing',
    difficulty: 'Advanced',
    duration: '5-7 min',
    description: 'Eco-conscious retired engineer wants a solar water heater but is concerned the upfront cost (₹45,000+) is triple an electric one. Justify with ROI and reliability.',
    customerPersona: {
      name: 'Sridhar Iyengar',
      avatar: '🧓🏾',
      background: 'Retired electrical engineer from Coimbatore, environmentally conscious, owns an independent home with rooftop access.'
    },
    product: 'AO Smith Solar Sunbliss 200L',
    opening: 'I want a solar water heater for my house. But the price is ₹45,000 — three times an electric one. How do you justify spending ₹30,000 extra for hot water?',
    completions: 234,
    avgScore: 69,
    supportedLanguages: ['en', 'ta'],
    turns: [
      {
        id: 't1',
        customerSays: 'I want a solar water heater for my house. But the price is ₹45,000 — three times an electric one. How do you justify spending ₹30,000 extra for hot water?',
        customerSaysTa: 'எனக்கு வீட்டிற்கு சூரிய சக்தி வாட்டர் ஹீட்டர் வேண்டும். ஆனால் விலை ₹45,000 — மின்சாரம் ஒன்றை விட மூன்று மடங்கு. எப்படி ₹30,000 கூடுதலாக செலவிடுவதை நியாயப்படுத்துகிறீர்கள்?',
        idealResponse: 'Excellent question, sir, and the answer is pure ROI. A 25L electric geyser for a family costs you about ₹4,500-5,000 in electricity annually. The Solar Sunbliss 200L uses zero electricity for hot water — saves you ₹4,500 every year. Over the geyser\'s 15-year life, that\'s ₹67,500 in electricity savings. Net savings even after the ₹30,000 extra: ₹37,500. Plus zero carbon footprint.',
        idealResponseTa: 'சிறந்த கேள்வி சார், பதில் தூய ROI. ஒரு குடும்பத்திற்கான 25L மின்சார ஹீட்டர் ஆண்டுக்கு சுமார் ₹4,500-5,000 மின்சாரத்தில் செலவாகும். Solar Sunbliss 200L சூடான தண்ணீருக்கு பூஜ்ஜிய மின்சாரம் பயன்படுத்துகிறது — ஒவ்வொரு ஆண்டும் ₹4,500 சேமிக்கிறது. ஹீட்டரின் 15 ஆண்டு ஆயுளில், அது ₹67,500 மின்சார சேமிப்பு. ₹30,000 கூடுதலுக்குப் பிறகு கூட நிகர சேமிப்பு: ₹37,500. மேலும் பூஜ்ஜிய கார்பன் தடம்.',
        keywords: ['roi', '4500', '5000', 'electricity', 'zero', 'saving', '15 year', '67500', '37500', 'carbon', 'environment', 'மின்சாரம்', 'சேமிப்பு']
      },
      {
        id: 't2',
        customerSays: 'But what about cloudy days and monsoon? Coimbatore monsoon is unpredictable.',
        customerSaysTa: 'மேக நாட்கள் மற்றும் மழைக்காலம் பற்றி என்ன? கோயம்புத்தூர் மழைக்காலம் கணிக்க முடியாதது.',
        idealResponse: 'Smart concern, sir. The Sunbliss has a 2 kW electric backup heater built into the same tank. On cloudy days, it activates automatically — uses only 30-40% of a regular geyser\'s electricity because the water is already partially warm from residual solar storage. The vacuum tube technology retains heat 48 hours without sun. Even during 5-day monsoon stretches, you\'re comfortable.',
        idealResponseTa: 'புத்திசாலித்தனமான கவலை சார். Sunbliss-இல் அதே தொட்டியில் 2 kW மின்சார பேக்அப் ஹீட்டர் கட்டப்பட்டுள்ளது. மேக நாட்களில், அது தானாக செயல்படுத்தப்படும் — வழக்கமான ஹீட்டரின் மின்சாரத்தில் 30-40% மட்டுமே பயன்படுத்துகிறது, ஏனெனில் தண்ணீர் ஏற்கனவே மீதமுள்ள சூரிய சேமிப்பில் இருந்து ஓரளவு சூடாக உள்ளது. வெற்றிட குழாய் தொழில்நுட்பம் சூரியன் இல்லாமல் 48 மணி நேரம் வெப்பத்தை தக்க வைத்துக் கொள்கிறது. 5-நாள் மழைக்கால நீட்டிப்புகளின் போதும் நீங்கள் வசதியாக இருப்பீர்கள்.',
        keywords: ['backup', '2 kw', 'electric', 'auto', 'cloudy', 'vacuum', 'tube', '48 hour', 'monsoon', 'residual', 'storage', 'மழை']
      },
      {
        id: 't3',
        customerSays: 'Maintenance? Solar systems are known to be high-maintenance.',
        customerSaysTa: 'பராமரிப்பு என்ன? சூரிய சக்தி அமைப்புகள் அதிக பராமரிப்புக்கு தெரிந்தவை.',
        idealResponse: 'A myth, sir. The Sunbliss uses ETC vacuum tubes — no glass to break, no pumps, no electrical parts on the roof. Maintenance is one annual cleaning at ₹500 — that\'s it. We provide a 10-year warranty on the tank, 5 years on tubes, and the roof structure. Compare that to an electric geyser where the heating element fails every 4-5 years at ₹2,500 each. Solar actually costs less to maintain.',
        idealResponseTa: 'ஒரு கட்டுக்கதை சார். Sunbliss ETC வெற்றிட குழாய்களைப் பயன்படுத்துகிறது — உடைக்க கண்ணாடி இல்லை, பம்புகள் இல்லை, கூரை மீது மின் பகுதிகள் இல்லை. பராமரிப்பு ஆண்டுக்கு ஒரு முறை சுத்தம் செய்தல் ₹500 — அவ்வளவுதான். தொட்டிக்கு 10-ஆண்டு வாரண்டி, குழாய்களுக்கு 5-ஆண்டு, மற்றும் கூரை அமைப்புக்கும் வழங்குகிறோம். மின்சார ஹீட்டருடன் ஒப்பிடுங்கள், இதில் ஹீட்டிங் எலிமெண்ட் ஒவ்வொரு 4-5 ஆண்டுகளிலும் ₹2,500-க்கு செயலிழக்கிறது. சூரிய பராமரிப்பு குறைவாக செலவாகிறது.',
        keywords: ['etc', 'vacuum', 'tube', 'no pump', 'no electrical', '500', 'annual', '10 year', 'tank', '5 year', 'maintenance', 'பராமரிப்பு']
      },
      {
        id: 't4',
        customerSays: 'And what about government subsidy? I heard solar gets a subsidy.',
        customerSaysTa: 'அரசு மானியம் பற்றி என்ன? சூரிய சக்தி மானியம் பெறும் என்று கேள்விப்பட்டேன்.',
        idealResponse: 'You\'re absolutely right, sir. Under the MNRE scheme, you can claim a 30% subsidy on solar water heaters in residential homes — that\'s ₹13,500 back. We handle the entire subsidy paperwork for you free of cost. So your effective price is ₹31,500, not ₹45,000. Now the ROI is even better — you break even in just 6-7 years and the next 8-9 years are pure savings. Shall we proceed with the subsidy application?',
        idealResponseTa: 'நீங்கள் முற்றிலும் சரிதான் சார். MNRE திட்டத்தின் கீழ், குடியிருப்பு வீடுகளில் சூரிய தண்ணீர் ஹீட்டர்களுக்கு 30% மானியம் கோரலாம் — அது ₹13,500 திரும்பப் பெறுதல். முழு மானியம் காகித வேலையையும் இலவசமாக கையாள்கிறோம். எனவே உங்கள் பயனுள்ள விலை ₹31,500, ₹45,000 அல்ல. இப்போது ROI இன்னும் சிறந்தது — 6-7 ஆண்டுகளில் சம நிலையை அடைந்து அடுத்த 8-9 ஆண்டுகள் தூய சேமிப்பு. மானிய விண்ணப்பத்துடன் தொடரலாமா?',
        keywords: ['mnre', 'subsidy', '30%', '13500', 'effective', '31500', 'paperwork', 'free', 'break even', '6-7 year', 'proceed', 'மானியம்'],
        hint: 'Closing turn — make the subsidy the killer hook that flips the price math.'
      }
    ]
  },
  {
    id: 'festival-close',
    title: 'The Festival Closing',
    category: 'Closing',
    difficulty: 'Intermediate',
    duration: '4-5 min',
    description: 'Family has done their research and decided on the Z9 model. They\'re ready to buy during Diwali festive period but want the absolute best deal.',
    customerPersona: {
      name: 'Amit & Neha Kapoor',
      avatar: '👨‍👩',
      background: 'Couple, both working professionals from Gurgaon. Done all their research over 3 weeks, ready to buy this week during Diwali sale.'
    },
    product: 'AO Smith Z9 Hot+',
    opening: 'We\'ve done our homework and decided on the Z9. The MRP is ₹35,000 which is at our upper limit. Since it\'s Diwali, give us your best price — your competitor across the road is offering ₹32,000.',
    completions: 678,
    avgScore: 79,
    supportedLanguages: ['en', 'hi', 'bn'],
    turns: [
      {
        id: 't1',
        customerSays: 'We\'ve done our homework and decided on the Z9. The MRP is ₹35,000 which is at our upper limit. Since it\'s Diwali, give us your best price — your competitor across the road is offering ₹32,000.',
        customerSaysHi: 'हमने पूरी रिसर्च कर ली है और Z9 ही लेना तय किया है। MRP ₹35,000 है जो हमारी अधिकतम सीमा है। दिवाली है, अपना बेस्ट प्राइस दीजिए - सामने वाला कंपीटिटर ₹32,000 दे रहा है।',
        customerSaysBn: 'আমরা পুরো রিসার্চ করে Z9 কিনতে ঠিক করেছি। MRP ₹৩৫,০০০, যা আমাদের সর্বোচ্চ সীমা। যেহেতু দীপাবলি চলছে, আপনার সেরা দাম দিন — রাস্তার ওপারের প্রতিযোগী ₹৩২,০০০ অফার করছে।',
        idealResponse: 'I appreciate that you\'ve done your research, sir. Our Diwali festival pricing on the Z9 is ₹32,500 — already lower than MRP. Plus, this week only, we\'re giving a free Pureit Auto-Fill Smart Tank worth ₹3,500 with every Z9 purchase. So at ₹32,500 you\'re getting ₹36,000 worth of value, which beats the competitor by ₹500 net.',
        idealResponseHi: 'बहुत अच्छा सर कि आपने रिसर्च कर ली। Z9 पर हमारी दिवाली फेस्टिवल प्राइसिंग ₹32,500 है — पहले से ही MRP से कम। प्लस सिर्फ इस हफ्ते, हम हर Z9 पर्चेज़ के साथ ₹3,500 का Pureit Auto-Fill Smart Tank फ्री दे रहे हैं। तो ₹32,500 में आपको ₹36,000 की वैल्यू मिल रही है, जो कम्पीटिटर से ₹500 ज़्यादा है नेट में।',
        idealResponseBn: 'আপনি গবেষণা করেছেন তার জন্য প্রশংসা করি স্যার। Z9-এ আমাদের দীপাবলি উৎসব মূল্য ₹৩২,৫০০ — ইতিমধ্যে MRP-এর চেয়ে কম। প্লাস, শুধুমাত্র এই সপ্তাহে, আমরা প্রতিটি Z9 কেনার সাথে ₹৩,৫০০ মূল্যের একটি ফ্রি Pureit Auto-Fill Smart Tank দিচ্ছি। তাই ₹৩২,৫০০-এ আপনি ₹৩৬,০০০ মূল্যের ভ্যালু পাচ্ছেন, যা প্রতিযোগীকে নেটে ₹৫০০ ছাড়িয়ে যায়।',
        keywords: ['32500', 'festival', 'diwali', 'pricing', 'free', 'auto-fill', '3500', 'smart tank', 'value', 'beat', 'दिवाली', 'मुफ्त', 'দীপাবলি', 'ফ্রি']
      },
      {
        id: 't2',
        customerSays: 'The auto-fill tank is nice but we don\'t really need it. Can you give us a cash discount instead?',
        customerSaysHi: 'ऑटो-फिल टैंक अच्छा है लेकिन हमें इसकी जरूरत नहीं है। क्या आप कैश डिस्काउंट दे सकते हैं इसकी जगह?',
        customerSaysBn: 'অটো-ফিল ট্যাঙ্কটা ভালো কিন্তু আমাদের এটার দরকার নেই। এর বদলে কি আপনি ক্যাশ ডিসকাউন্ট দিতে পারবেন?',
        idealResponse: 'Totally understand, ma\'am. I can\'t convert the bundle into pure cash discount because the tank is from a different manufacturer offer. But I can offer you ₹1,500 in store credit redeemable against future AMC, filters, or any AO Smith product. Plus I\'ll throw in a 2-year extended warranty on the Z9 — that itself is worth ₹3,000. Effective price: ₹32,500 with ₹4,500 of usable value.',
        idealResponseHi: 'बिल्कुल समझता हूं मैडम। मैं बंडल को प्योर कैश डिस्काउंट में कन्वर्ट नहीं कर सकता क्योंकि टैंक एक डिफरेंट मैन्युफैक्चरर ऑफर से है। लेकिन मैं आपको ₹1,500 का स्टोर क्रेडिट ऑफर कर सकता हूं जो फ्यूचर AMC, फिल्टर्स, या किसी भी AO Smith प्रोडक्ट पर रिडीम हो सकता है। प्लस मैं Z9 पर 2-साल की एक्सटेंडेड वारंटी देता हूं — वो खुद ₹3,000 की है। एफेक्टिव प्राइस: ₹32,500 के साथ ₹4,500 की यूज़ेबल वैल्यू।',
        idealResponseBn: 'সম্পূর্ণরূপে বুঝতে পারছি ম্যাডাম। আমি বান্ডিলটিকে বিশুদ্ধ নগদ ছাড়ে পরিবর্তন করতে পারি না কারণ ট্যাঙ্কটি একটি ভিন্ন প্রস্তুতকারক অফার থেকে। কিন্তু আমি আপনাকে ভবিষ্যতের AMC, ফিল্টার, বা যেকোনো AO Smith পণ্যের বিরুদ্ধে রিডিমযোগ্য ₹১,৫০০ স্টোর ক্রেডিট অফার করতে পারি। প্লাস আমি Z9-এ একটি ২-বছরের এক্সটেন্ডেড ওয়ারেন্টি যোগ করব — যা নিজেই ₹৩,০০০ মূল্যের। কার্যকর মূল্য: ₹৩২,৫০০ এবং ₹৪,৫০০ ব্যবহারযোগ্য মূল্য।',
        keywords: ['store credit', '1500', 'amc', 'filter', '2-year', 'extended warranty', '3000', 'effective', '32500', '4500', 'क्रेडिट', 'छूट', 'ক্রেডিট', 'ছাড়']
      },
      {
        id: 't3',
        customerSays: 'Okay that\'s reasonable. What about EMI options? We don\'t want to pay everything upfront.',
        customerSaysHi: 'ठीक है, ये ठीक है। EMI के क्या ऑप्शन हैं? हम सब एक साथ नहीं देना चाहते।',
        customerSaysBn: 'ঠিক আছে, এটা যুক্তিসঙ্গত। EMI অপশন কী আছে? আমরা একসাথে সব দিতে চাই না।',
        idealResponse: 'Of course, sir. On the Z9 we have multiple EMI options: ₹2,710/month for 12 months at zero interest with HDFC, ICICI, or SBI cards. Or our Pureit Pay-Later option — ₹3,250/month for 10 months, no card needed, only Aadhaar + PAN, approval in 5 minutes. Or full upfront with an additional 2% cashback. Which works best for you?',
        idealResponseHi: 'बिल्कुल सर। Z9 पर हमारे पास मल्टीपल EMI ऑप्शन्स हैं: HDFC, ICICI, या SBI कार्ड्स पर ₹2,710/महीने 12 महीने के लिए ज़ीरो इंट्रेस्ट पर। या हमारा Pureit Pay-Later ऑप्शन — ₹3,250/महीने 10 महीने के लिए, कोई कार्ड नहीं चाहिए, सिर्फ आधार + पैन, 5 मिनट में अप्रूवल। या फुल अपफ्रंट 2% एक्स्ट्रा कैशबैक के साथ। आपके लिए कौन सा सही रहेगा?',
        idealResponseBn: 'অবশ্যই স্যার। Z9-এ আমাদের একাধিক EMI অপশন আছে: HDFC, ICICI, বা SBI কার্ডে ১২ মাসের জন্য ₹২,৭১০/মাস শূন্য সুদে। অথবা আমাদের Pureit Pay-Later অপশন — ১০ মাসের জন্য ₹৩,২৫০/মাস, কোনো কার্ড দরকার নেই, শুধুমাত্র আধার + PAN, ৫ মিনিটে অনুমোদন। অথবা অতিরিক্ত ২% ক্যাশব্যাক সহ পূর্ণ আপফ্রন্ট। আপনার জন্য কোনটি সেরা?',
        keywords: ['emi', '2710', '12 month', 'zero interest', 'hdfc', 'icici', 'sbi', 'pay later', '3250', 'aadhaar', 'cashback', 'ईएमआई', 'आधार', 'কিস্তি', 'আধার']
      },
      {
        id: 't4',
        customerSays: 'Let\'s go with the 12-month EMI on HDFC. When can you install it?',
        customerSaysHi: 'चलिए HDFC के 12 महीने वाली EMI पर लेते हैं। इंस्टॉल कब कर सकते हैं?',
        customerSaysBn: 'চলুন HDFC-এর ১২ মাসের EMI-তেই নিই। ইনস্টল কবে করতে পারবেন?',
        idealResponse: 'Excellent choice, ma\'am! Installation tomorrow morning between 9 and 11 AM, since you\'re on the Diwali priority list. I\'ll start the HDFC EMI application — instant approval in 90 seconds, you\'ll get an SMS to confirm. After that I\'ll generate the invoice with all the freebies and warranty extension included. Will need your HDFC card and Aadhaar — let\'s get this done in 10 minutes so you can enjoy your Diwali!',
        idealResponseHi: 'बढ़िया चॉइस मैडम! इंस्टॉलेशन कल सुबह 9 से 11 बजे के बीच, क्योंकि आप दिवाली प्रायोरिटी लिस्ट पर हैं। मैं HDFC EMI एप्लिकेशन स्टार्ट करता हूं — 90 सेकंड में इंस्टेंट अप्रूवल, आपको कन्फर्म करने के लिए SMS मिलेगा। उसके बाद मैं इन्वॉइस जनरेट करूंगा जिसमें सारे फ्रीबीज़ और वारंटी एक्सटेंशन इन्क्लूडेड होंगे। आपका HDFC कार्ड और आधार चाहिए — चलिए 10 मिनट में ये कर लेते हैं ताकि आप दिवाली एन्जॉय कर सकें!',
        idealResponseBn: 'চমৎকার পছন্দ ম্যাডাম! ইনস্টলেশন আগামীকাল সকাল ৯ থেকে ১১টার মধ্যে, যেহেতু আপনি দীপাবলি অগ্রাধিকার তালিকায় আছেন। আমি HDFC EMI আবেদন শুরু করব — ৯০ সেকেন্ডে তাৎক্ষণিক অনুমোদন, নিশ্চিত করতে আপনি একটি SMS পাবেন। তারপর আমি সমস্ত ফ্রিবি এবং ওয়ারেন্টি এক্সটেনশন সহ ইনভয়েস তৈরি করব। আপনার HDFC কার্ড এবং আধার দরকার হবে — আসুন ১০ মিনিটে এটি শেষ করি যাতে আপনি আপনার দীপাবলি উপভোগ করতে পারেন!',
        keywords: ['tomorrow', '9', 'install', 'priority', 'hdfc', '90 second', 'sms', 'invoice', 'aadhaar', '10 minute', 'diwali', 'इंस्टॉल', 'কাল', 'ইনস্টল'],
        hint: 'High-confidence close — move quickly to fulfillment, customer has already committed.'
      }
    ]
  }
];

export const getScenarioById = (id: string) => scenarios.find(s => s.id === id);
