import { QuestionItem } from '../types/question';

export const mainsDescriptiveQuestions: QuestionItem[] = [
  // =========================================================================
  // 1. WBPSC CLERKSHIP MAINS 2023-24 (SL/II/23/A & SL/II/23/B)
  // File: /assets/aistudio/Clerkship-Mains-Question-Paper_32ff6d8a.pdf
  // Official Parent Questions: 6 (Group-A: Q.1 [1A, 1B], Q.2, Q.3 [3a, 3b] | Group-B: Q.1 [1ক, 1খ], Q.2, Q.3)
  // =========================================================================
  {
    id: 'mains-2024-q1',
    paperId: 'mains-2024',
    paperShortTitle: 'Mains 2023–24 (SL/II/23)',
    pdfUrl: '/assets/aistudio/Clerkship-Mains-Question-Paper_32ff6d8a.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-A · Q.1 (Sub-parts 1A & 1B)',
    seriesNumbers: { A: 1, B: 1, C: 1, D: 1 },
    pdfPages: { A: 1, B: 1, C: 1, D: 1 },
    category: 'Descriptive & Translation',
    subTopic: 'English Report Writing (Group-A)',
    questionEn:
      '1. Answer any one of the following within 200 words (15 Marks):\n(A) Write a report on the awareness camp held in your neighbouring locality by an NGO, "Dog Lovers\' Society". [Date, place and time — Mission of the NGO — Treatment to stray dogs — Need to stop cruelty during festival days — Vaccination drive — Free distribution of fodder and medicines — Conclusion]\n(B) Recently as a team leader of your school you participated in a Science and Technology Exhibition. Write a report on the event. [Date, venue, time — Participants — Inauguration — Exhibits — Response — Results]',
    directAnswerSummary:
      'Parent Question 1 organized with both official sub-parts: 1(A) NGO Stray Dog Welfare Camp Report and 1(B) Inter-School Science & Technology Exhibition Report.',
    keyFormulaOrConcept: 'Format: Headline + Byline + Dateline (Place, Date) + 3-Paragraph Body (Within 200 words | 15 Marks)',
    descriptiveGuide: {
      formatType: 'Report Writing',
      marks: 15,
      wordLimitOrTarget: 'Within 200 words per sub-part (1A: ~175 words | 1B: ~180 words)',
      outlineStructure: [
        'Sub-Part 1(A) Headline & Lead: Catchy newspaper heading + Byline ("By a Staff Reporter") + Dateline introducing the day-long camp by "Dog Lovers\' Society".',
        'Sub-Part 1(A) Body & Conclusion: Humane treatment of strays, stopping festival firecracker cruelty, anti-rabies vaccination drive, and free fodder/medicine distribution.',
        'Sub-Part 1(B) Heading & Attribution: Institutional report title + "By XYZ, Student Team Leader" + Date, venue, inauguration by senior scientist, and 25+ participating schools.',
        'Sub-Part 1(B) Exhibits & Results: Working models on renewable energy/IoT irrigation, visitor response, and prize distribution.',
      ],
      keyThemesAndArguments: [
        '1(A): Compassionate coexistence with community animals, sensitization against festive noise trauma, and preventive anti-rabies vaccination.',
        '1(B): Fostering scientific temper, green technology innovation, and collaborative teamwork among school students.',
      ],
      sampleAnswerTitle: 'Sub-Part 1(A): Dog Lovers\' Society Holds Stray Welfare and Vaccination Camp',
      sampleAnswerBody: `By a Staff Reporter

Kolkata, November 12: With the noble mission of promoting compassionate coexistence between citizens and community animals, a prominent non-governmental organization, 'Dog Lovers' Society', organized a day-long awareness and veterinary camp at Deshapriya Park in our neighbouring locality yesterday from 10:00 a.m. to 4:00 p.m.

Addressing the gathering of residents and students, veterinary experts and activists from the NGO highlighted the urgent need for humane treatment of stray dogs. Speakers expressed grave concern over the trauma, burns, and cruelty inflicted on street dogs during festival days—particularly through high-decibel firecrackers—and urged citizens to create safe neighbourhood shelters.

A major highlight of the programme was an intensive anti-rabies vaccination and deworming drive, during which over eighty stray dogs from adjacent lanes were inoculated by certified veterinarians. Additionally, the organization conducted a free distribution of nutritious dog fodder, antiseptic lotions, and essential medicines among local animal caregivers.

The camp concluded on an inspiring note as scores of local residents and youth volunteers pledged to monitor stray welfare and prevent animal cruelty in their respective wards.`,
      secondarySampleBody: `Sub-Part 1(B): Report on Inter-School Science and Technology Exhibition

By XYZ, Student Team Leader

Kolkata, November 14: An inspiring two-day Inter-School Science and Technology Exhibition was held on November 11 and 12 from 10:00 a.m. to 5:00 p.m. at the Science City Convention Hall, Kolkata. Over twenty-five leading schools from across the district participated in the prestigious event, where I had the privilege of leading our five-member school science team.

The exhibition was formally inaugurated by Dr. S. K. Sen, Senior Scientist at ISRO, who encouraged young innovators to harness science for sustainable development. The exhibition hall buzzed with creativity as student teams displayed working prototypes ranging from solar-powered water purifiers and automated railway-crossing sensors to biodegradable plastics and AI-driven waste sorters. Our school team presented an "IoT-Based Smart Drip Irrigation System" designed to conserve agricultural water.

The event received an overwhelming response from visiting students, teachers, and science enthusiasts, who eagerly interacted with the participants. In the valedictory session, the panel of judges praised the originality of the exhibits. Our school secured the Second Prize in the Sustainable Innovation category, making the event a memorable learning milestone.`,
    },
    subParts: [
      {
        partId: '1A',
        partLabel: 'Sub-Part 1(A)',
        promptEn:
          'Write a report on the awareness camp held in your neighbouring locality by an NGO, "Dog Lovers\' Society". [Date, place and time — Mission of the NGO — Treatment to stray dogs — Need to stop cruelty during festival days — Vaccination drive — Free distribution of fodder and medicines — Conclusion]',
        descriptiveGuide: {
          formatType: 'Report Writing',
          marks: 15,
          wordLimitOrTarget: 'Within 200 words (~175 words)',
          outlineStructure: [
            'Headline: Catchy, title-case newspaper heading summarizing the NGO camp and its core mission.',
            'Byline & Dateline: "By a Staff Reporter" followed by Locality/City and Date in past tense.',
            'Lead Paragraph (What, When, Where, Why): Introduce the day-long awareness camp organized by "Dog Lovers\' Society" in the neighbouring locality.',
            'Body Paragraph (Key Activities & Welfare Drive): Detail humane treatment of stray dogs, appeal against firecracker cruelty during festivals, on-spot anti-rabies vaccination, and free distribution of fodder and veterinary medicines.',
            'Conclusion (Public Response): Highlight enthusiastic participation by local youth and residents pledging community care.',
          ],
          keyThemesAndArguments: [
            'Compassionate coexistence with community/stray animals in urban neighbourhoods.',
            'Sensitization against noise and firecracker trauma inflicted on street dogs during festive seasons.',
            'Preventive public health through mass anti-rabies vaccination and basic veterinary aid.',
          ],
          sampleAnswerTitle: 'Dog Lovers\' Society Holds Stray Welfare and Vaccination Camp',
          sampleAnswerBody: `By a Staff Reporter

Kolkata, November 12: With the noble mission of promoting compassionate coexistence between citizens and community animals, a prominent non-governmental organization, 'Dog Lovers' Society', organized a day-long awareness and veterinary camp at Deshapriya Park in our neighbouring locality yesterday from 10:00 a.m. to 4:00 p.m.

Addressing the gathering of residents and students, veterinary experts and activists from the NGO highlighted the urgent need for humane treatment of stray dogs. Speakers expressed grave concern over the trauma, burns, and cruelty inflicted on street dogs during festival days—particularly through high-decibel firecrackers—and urged citizens to create safe neighbourhood shelters.

A major highlight of the programme was an intensive anti-rabies vaccination and deworming drive, during which over eighty stray dogs from adjacent lanes were inoculated by certified veterinarians. Additionally, the organization conducted a free distribution of nutritious dog fodder, antiseptic lotions, and essential medicines among local animal caregivers.

The camp concluded on an inspiring note as scores of local residents and youth volunteers pledged to monitor stray welfare and prevent animal cruelty in their respective wards.`,
        },
      },
      {
        partId: '1B',
        partLabel: 'Sub-Part 1(B)',
        promptEn:
          'Recently as a team leader of your school you participated in a Science and Technology Exhibition. Write a report on the event. [Date, venue, time — Participants — Inauguration — Exhibits — Response — Results]',
        descriptiveGuide: {
          formatType: 'Report Writing',
          marks: 15,
          wordLimitOrTarget: 'Within 200 words (~180 words)',
          outlineStructure: [
            'Heading: Clear institutional report title mentioning the Inter-School Science and Technology Exhibition.',
            'Attribution & Dateline: "By XYZ, Student Team Leader" with Date and Venue.',
            'Inauguration & Participation: Mention date, time (10 a.m.), venue (Science City Hall), inaugurator, and number of participating schools.',
            'Key Exhibits & Our Team\'s Model: Describe working models on renewable energy, robotics, rainwater harvesting, and IoT smart irrigation.',
            'Visitor Response & Final Results: Note the judges\' appreciation, interactive Q&A, and prize distribution.',
          ],
          keyThemesAndArguments: [
            'Fostering scientific temper and practical innovation among secondary school students.',
            'Application of green technology and sustainable engineering to real-world civic problems.',
            'Collaborative teamwork and clear scientific demonstration.',
          ],
          sampleAnswerTitle: 'Report on Inter-School Science and Technology Exhibition',
          sampleAnswerBody: `By XYZ, Student Team Leader

Kolkata, November 14: An inspiring two-day Inter-School Science and Technology Exhibition was held on November 11 and 12 from 10:00 a.m. to 5:00 p.m. at the Science City Convention Hall, Kolkata. Over twenty-five leading schools from across the district participated in the prestigious event, where I had the privilege of leading our five-member school science team.

The exhibition was formally inaugurated by Dr. S. K. Sen, Senior Scientist at ISRO, who encouraged young innovators to harness science for sustainable development. The exhibition hall buzzed with creativity as student teams displayed working prototypes ranging from solar-powered water purifiers and automated railway-crossing sensors to biodegradable plastics and AI-driven waste sorters. Our school team presented an "IoT-Based Smart Drip Irrigation System" designed to conserve agricultural water.

The event received an overwhelming response from visiting students, teachers, and science enthusiasts, who eagerly interacted with the participants. In the valedictory session, the panel of judges praised the originality of the exhibits. Our school secured the Second Prize in the Sustainable Innovation category, making the event a memorable learning milestone.`,
        },
      },
    ],
    steps: [
      {
        title: 'Parent Question Organization',
        explanation:
          'Sub-parts 1(A) and 1(B) are organized under Parent Question 1 so the master question index accurately reflects the 3 Group-A questions on the exam sheet.',
      },
    ],
  },
  {
    id: 'mains-2024-q2',
    paperId: 'mains-2024',
    paperShortTitle: 'Mains 2023–24 (SL/II/23)',
    pdfUrl: '/assets/aistudio/Clerkship-Mains-Question-Paper_32ff6d8a.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-A · Q.2',
    seriesNumbers: { A: 2, B: 2, C: 2, D: 2 },
    pdfPages: { A: 1, B: 1, C: 1, D: 1 },
    category: 'Descriptive & Translation',
    subTopic: 'English Précis / Summary (Group-A)',
    questionEn:
      '2. Summarize the following passage into one-third of its length (15 Marks): "Most of the things we hold in our short-term memory are forgotten right after and never make it into our long-term memory. The amount of information we can hold in our short-term memory is very limited... In a famous paper published in 1956, psychologist George A. Miller suggested that the capacity of our short-term memory is about seven chunks of information... Today researchers believe that the capacity might even be slightly lower than Miller suggested and is probably around four or five chunks..." (Original passage: ~210 words)',
    directAnswerSummary:
      'One-third summary (~70 words) with an appropriate title focusing on the limited capacity of Short-Term Memory, chunking, and its vulnerability to Alzheimer\'s disease.',
    keyFormulaOrConcept: 'One-Third Rule: ~210 Original Words → ~70 Summary Words + Suitable Title (15 Marks)',
    descriptiveGuide: {
      formatType: 'Précis / Summary Writing',
      marks: 15,
      wordLimitOrTarget: '~68–72 words (One-third of ~210 words)',
      outlineStructure: [
        'Title: Concise, centered heading reflecting the central theme ("Nature and Capacity of Short-Term Memory").',
        'Core Point 1 (Limited Retention): Short-term memory (STM) retains information only briefly, discarding most before it enters long-term memory.',
        'Core Point 2 (Chunking Capacity): While Miller estimated STM capacity at seven chunks, modern researchers place it at four to five meaningful units grouped via "chunking".',
        'Core Point 3 (Clinical Vulnerability): Neurodegenerative conditions like Alzheimer\'s severely impair STM while leaving older long-term memories intact.',
      ],
      keyThemesAndArguments: [
        'Omit specific phone-number examples ("20121994" vs "20", "12", "19", "94") and dates ("1956").',
        'Retain the core psychological concept of "chunking" and the contrast between STM and LTM in Alzheimer\'s patients.',
        'Use third-person objective language without copying verbatim sentences.',
      ],
      sampleAnswerTitle: 'Title: Nature and Capacity of Short-Term Memory',
      sampleAnswerBody: `Short-term memory (STM) temporarily holds a strictly limited amount of information, most of which is quickly forgotten rather than transferred to long-term memory. Although psychologist George Miller estimated STM capacity at seven units, modern research suggests a limit of four to five "chunks." However, grouping data into meaningful patterns, called chunking, improves retention. Finally, neurodegenerative disorders like Alzheimer's disease primarily damage short-term memory while sparing remote long-term memories. (68 words)`,
    },
    steps: [
      {
        title: 'Compression Strategy',
        explanation:
          'Remove the numerical illustration of the 8-digit phone number and compress the 3 paragraphs into a single cohesive 68-word paragraph.',
      },
    ],
  },
  {
    id: 'mains-2024-q3',
    paperId: 'mains-2024',
    paperShortTitle: 'Mains 2023–24 (SL/II/23)',
    pdfUrl: '/assets/aistudio/Clerkship-Mains-Question-Paper_32ff6d8a.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-A · Q.3 (Sub-parts 3a & 3b)',
    seriesNumbers: { A: 3, B: 3, C: 3, D: 3 },
    pdfPages: { A: 2, B: 2, C: 2, D: 2 },
    category: 'Descriptive & Translation',
    subTopic: 'Vernacular to English Translation (Group-A)',
    questionEn:
      '3. Translate into English from any one of the following languages (20 Marks):\n(a) Bengali: "আমরা সকলে রাজনৈতিক নেতা হতে পারি না অথবা লক্ষ লক্ষ মানুষকে পরিচালনা করতে পারি না। আমরা সকলে নায়ক হতে পারি না এবং নিপীড়িত মানুষের মুক্তিসংগ্রামে ঝাঁপিয়ে পড়তে পারি না। কিন্তু আমরা সকলেই আমাদের চারপাশের মানুষদের সুখী করতে পারি। আমরা প্রত্যেকেই আমাদের প্রতিবেশীর সেবা করতে পারি— যাদের আমরা চিনি এবং যারা আমাদের কাছাকাছি বাস করে। আমাদের জীবনের ছোটো গণ্ডির মধ্যেও আমরা আমাদের চারপাশের জগৎকে আরও একটু সুখের করতে পারি। আর যদি আমরা সকলেই তা করি, তবে লক্ষ লক্ষ ছোটো ছোটো প্রচেষ্টার মধ্য দিয়ে সমগ্র পৃথিবীটাই অনেক বেশি সুন্দর হয়ে উঠবে।"\n(b) Hindi: "प्रकृति मनुष्य को ईश्वर का अनुपम वरदान है। कोयल के सुमधुर कुहू रव, नदियों के कलकल निंसृत स्वर... प्रकृति और मनुष्य के बीच का सुमधुर सामंजस्य प्रदूषण के कारण बिगड़ता चला गया।"',
    directAnswerSummary:
      'Parent Question 3 organized with both vernacular-to-English translation sub-parts: 3(a) Bengali (Everyday Civic Kindness) and 3(b) Hindi (Harmony Between Nature and Mankind).',
    keyFormulaOrConcept: 'Sense-for-Sense Literary Translation (20 Marks)',
    descriptiveGuide: {
      formatType: 'Translation',
      marks: 20,
      wordLimitOrTarget: 'Complete faithful translation of the chosen source passage',
      outlineStructure: [
        'Sub-Part 3(a) [From Bengali]: Use parallel negative modals ("All of us cannot become political leaders...") transitioning into positive civic duty ("However, all of us can make the people around us happy").',
        'Sub-Part 3(a) Closure: Translate "জীবনের ছোটো গণ্ডির মধ্যেও" as "Even within the small sphere of our own lives" and conclude with the cumulative impact of millions of small efforts.',
        'Sub-Part 3(b) [From Hindi]: Render the lyrical imagery of nature as God\'s peerless gift to mankind and contrast it with environmental degradation caused by human selfishness.',
      ],
      keyThemesAndArguments: [
        'Translate "নিপীড়িত মানুষের মুক্তিসংগ্রাম" as "struggle for the liberation of the oppressed".',
        'Translate "জীবনের ছোটো গণ্ডির মধ্যেও" idiomatically as "even within the small sphere of our own lives".',
        'Maintain parallel rhythm across sentences to reflect the rhetorical beauty of the original prose.',
      ],
      sampleAnswerTitle: 'Sub-Part 3(a): Model English Translation (From Bengali)',
      sampleAnswerBody: `All of us cannot become political leaders or lead millions of people. We cannot all be heroes and plunge into the struggle for the liberation of the oppressed. However, all of us can make the people around us happy. Each one of us can serve our neighbours—those whom we know and who live near us. Even within the small sphere of our own lives, we can make the world around us a little happier. And if we all do so, the entire world will become much more beautiful through millions of such small efforts.`,
      secondarySampleBody: `Sub-Part 3(b): Model English Translation (From Hindi)

Nature is God's peerless gift to mankind. Hearing the melodious cooing of the cuckoo, the murmuring flow of rivers, the captivating fragrance of blooming flowers, and the chirping of birds, the human heart begins to dance with joy like a peacock. Nature inspires humanity toward the motto of 'Live and let live'. Yet the sweet harmony between nature and man has steadily deteriorated due to pollution. Today, human beings are destroying nature for their own selfish ends.`,
    },
    subParts: [
      {
        partId: '3a',
        partLabel: 'Sub-Part 3(a) — Bengali to English',
        promptEn:
          'Translate into English: "আমরা সকলে রাজনৈতিক নেতা হতে পারি না অথবা লক্ষ লক্ষ মানুষকে পরিচালনা করতে পারি না... লক্ষ লক্ষ ছোটো ছোটো প্রচেষ্টার মধ্য দিয়ে সমগ্র পৃথিবীটাই অনেক বেশি সুন্দর হয়ে উঠবে।"',
        descriptiveGuide: {
          formatType: 'Translation',
          marks: 20,
          wordLimitOrTarget: 'Full passage translation (6 sentences)',
          outlineStructure: [
            'Sentence 1–2 (Parallel Negative Modals): "All of us cannot become political leaders..." and "plunge into the struggle for the liberation of the oppressed."',
            'Sentence 3–4 (Everyday Duty): "However, all of us can make the people around us happy" and "serve our neighbours—those whom we know and who live near us."',
            'Sentence 5–6 (Collective Impact): "Even within the small sphere of our own lives..." concluding with millions of small efforts transforming the world.',
          ],
          keyThemesAndArguments: [
            'পরিচালনা করা = lead/guide | নিপীড়িত মানুষ = oppressed people | মুক্তিসংগ্রাম = struggle for liberation | ছোটো গণ্ডি = small sphere.',
          ],
          sampleAnswerTitle: 'Model English Translation (From Bengali — Q.3a)',
          sampleAnswerBody: `All of us cannot become political leaders or lead millions of people. We cannot all be heroes and plunge into the struggle for the liberation of the oppressed. However, all of us can make the people around us happy. Each one of us can serve our neighbours—those whom we know and who live near us. Even within the small sphere of our own lives, we can make the world around us a little happier. And if we all do so, the entire world will become much more beautiful through millions of such small efforts.`,
        },
      },
      {
        partId: '3b',
        partLabel: 'Sub-Part 3(b) — Hindi to English',
        promptEn:
          'Translate into English: "प्रकृति मनुष्य को ईश्वर का अनुपम वरदान है। कोयल के सुमधुर कुहू रव, नदियों के कलकल निंसृत स्वर... आज मनुष्य अपने स्वार्थ के लिए प्रकृति का हनन कर रहा है।"',
        descriptiveGuide: {
          formatType: 'Translation',
          marks: 20,
          wordLimitOrTarget: 'Full passage translation',
          outlineStructure: [
            'Opening: Nature as God\'s peerless boon ("अनुपम वरदान") to humanity.',
            'Sensory Imagery: Melodious cooing of the cuckoo, murmuring rivers, fragrant flowers, and chirping birds making the human heart dance like a peacock.',
            'Moral Contrast: Nature teaches "Live and let live", yet pollution and human selfishness have disrupted this harmony.',
          ],
          keyThemesAndArguments: [
            'अनुपम वरदान = peerless gift/boon | सुमधुर सामंजस्य = sweet harmony | हनन = destruction/exploitation.',
          ],
          sampleAnswerTitle: 'Model English Translation (From Hindi — Q.3b)',
          sampleAnswerBody: `Nature is God's peerless gift to mankind. Hearing the melodious cooing of the cuckoo, the murmuring flow of rivers, the captivating fragrance of blooming flowers, and the chirping of birds, the human heart begins to dance with joy like a peacock. Nature inspires humanity toward the motto of 'Live and let live'. Yet the sweet harmony between nature and man has steadily deteriorated due to pollution. Today, human beings are destroying nature for their own selfish ends.`,
        },
      },
    ],
    steps: [
      {
        title: 'Key Vocabulary Mapping',
        explanation:
          'পরিচালনা করা = lead/guide | নিপীড়িত মানুষ = oppressed people | মুক্তিসংগ্রাম = struggle for liberation | ছোটো গণ্ডি = small/humble sphere.',
      },
    ],
  },
  {
    id: 'mains-2024-gb-q1',
    paperId: 'mains-2024',
    paperShortTitle: 'Mains 2023–24 (SL/II/23)',
    pdfUrl: '/assets/aistudio/Clerkship-Mains-Question-Paper_32ff6d8a.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-B · Q.1 (Sub-parts ১ক & ১খ)',
    seriesNumbers: { A: 4, B: 4, C: 4, D: 4 },
    pdfPages: { A: 3, B: 3, C: 3, D: 3 },
    category: 'Descriptive & Translation',
    subTopic: 'Bengali Report Writing / বাংলা প্রতিবেদন (Group-B)',
    questionEn:
      '১। যে-কোনো একটি বিষয়ে অনধিক ২০০ শব্দে প্রতিবেদন রচনা করুন (১৫ নম্বর):\n(ক) পশ্চিমবঙ্গে কলকাতা-সহ বেশ কয়েকটি জেলায় পানীয় জলে আর্সেনিক দূষণ নিয়ন্ত্রণে সরকারি উদ্যোগ বিষয়ে একটি প্রতিবেদন রচনা করুন।\n(খ) কোনো এক ট্যাক্সি-ড্রাইভার বিপুল অঙ্কের টাকা প্রকৃত মালিককে ফিরিয়ে দিলেন— এ বিষয়ে একটি প্রতিবেদন রচনা করুন।',
    directAnswerSummary:
      'সংবাদপত্রের উপযুক্ত শিরোনাম, নিজস্ব সংবাদদাতা, স্থান ও তারিখসহ প্রশ্ন ১-এর দুটি বিকল্পেরই (১ক: আর্সেনিক দূষণ নিয়ন্ত্রণ ও ১খ: ট্যাক্সিচালকের সততা) পূর্ণাঙ্গ বাংলা প্রতিবেদন।',
    keyFormulaOrConcept: 'শিরোনাম + নিজস্ব সংবাদদাতা + স্থান ও তারিখ + ৩ অনুচ্ছেদে মূল প্রতিবেদন (অনধিক ২০০ শব্দ | ১৫ নম্বর)',
    descriptiveGuide: {
      formatType: 'Report Writing',
      marks: 15,
      wordLimitOrTarget: 'অনধিক ২০০ শব্দ (প্রতিটি নমুনা ~১৭০ শব্দ)',
      outlineStructure: [
        'শিরোনাম: সংক্ষিপ্ত, আকর্ষণীয় ও বিষয়ানুগ সংবাদ শিরোনাম।',
        'সূত্র ও স্থান-কাল: "নিজস্ব সংবাদদাতা, কলকাতা, ১২ নভেম্বর:"।',
        'প্রথম অনুচ্ছেদ (মূল ঘটনা): আর্সেনিক দূষণ রোধে জনস্বাস্থ্য কারিগরি দপ্তরের নতুন মেগা জলপ্রকল্প (১ক) / কলকাতার রাজপথে ট্যাক্সি চালকের অনন্য সততার নজির (১খ)।',
        'দ্বিতীয় অনুচ্ছেদ (বিস্তারিত বিবরণ): ক্ষতিগ্রস্ত জেলাগুলিতে আর্সেনিকমুক্ত পরিস্রুত পানীয় জল সরবরাহ / যাত্রী ভুল করে ফেলে যাওয়া টাকার ব্যাগ থানায় জমা দেওয়া।',
        'উপসংহার: জনস্বাস্থ্য সুরক্ষায় প্রশাসনিক নজরদারি / পুলিশ প্রশাসনের পক্ষ থেকে সৎ চালককে সংবর্ধনা।',
      ],
      keyThemesAndArguments: [
        '১(ক): উত্তর ও দক্ষিণ ২৪ পরগনা, নদিয়া, মুর্শিদাবাদ ও কলকাতার কিছু অংশে ভূগর্ভস্থ জলে আর্সেনিক সমস্যা এবং সারফেস ওয়াটার ভিত্তিক প্রকল্পের গুরুত্ব।',
        '১(খ): আর্থিক অনটনের মধ্যেও একজন সাধারণ শ্রমজীবী মানুষের অটুট নৈতিকতা ও সততার সামাজিক মূল্য।',
      ],
      sampleAnswerTitle: 'বিকল্প ১(ক): রাজ্যে পানীয় জলে আর্সেনিক দূষণ নিয়ন্ত্রণে ব্যাপক সরকারি উদ্যোগ',
      sampleAnswerBody: `নিজস্ব সংবাদদাতা, কলকাতা, ১২ নভেম্বর: পশ্চিমবঙ্গে কলকাতা-সহ আর্সেনিকপ্রবণ জেলাগুলিতে নিরাপদ ও পরিস্রুত পানীয় জল পৌঁছে দিতে একগুচ্ছ সদর্থক পদক্ষেপ গ্রহণ করল রাজ্য জনস্বাস্থ্য কারিগরি দপ্তর। মূলত উত্তর ও দক্ষিণ ২৪ পরগনা, নদিয়া, মুর্শিদাবাদ এবং মালদহ জেলার বিস্তীর্ণ অঞ্চলে ভূগর্ভস্থ জলে মাত্রাতিরিক্ত আর্সেনিকের উপস্থিতি দীর্ঘদিন ধরেই জনস্বাস্থ্যের ক্ষেত্রে বড় উদ্বেগের কারণ হয়ে দাঁড়িয়েছিল।

সরকারি সূত্রের খবর, ভূগর্ভস্থ জলের ওপর নির্ভরতা কমিয়ে গঙ্গা ও অন্যান্য প্রধান নদীর জল শোধন করে পাইপলাইনের মাধ্যমে বাড়ি বাড়ি পৌঁছে দেওয়ার মেগা সারফেস ওয়াটার প্রকল্পের কাজ দ্রুতগতিতে এগিয়ে চলেছে। ইতিমধ্যে ক্ষতিগ্রস্ত ব্লকগুলিতে সৌরচালিত আর্সেনিক রিমুভাল প্ল্যান্ট এবং ওয়াটার এটিএম বসানো হয়েছে। পাশাপাশি, প্রতিটি গ্রাম পঞ্চায়েতে জলের গুণমান নিয়মিত পরীক্ষার জন্য বিশেষ ওয়াটার টেস্টিং ল্যাবরেটরি ও সচেতনতা শিবির চালু করা হয়েছে।

বিশেষজ্ঞদের মতে, এই সমন্বিত সরকারি উদ্যোগ সফলভাবে রূপায়িত হলে আগামী কয়েক বছরের মধ্যেই রাজ্যের লক্ষ লক্ষ মানুষ আর্সেনিকজনিত দুরারোগ্য ব্যাধির হাত থেকে স্থায়ী সুরক্ষা পাবেন।`,
      secondarySampleBody: `বিকল্প ১(খ): রাজপথে সততার উজ্জ্বল নজির: লক্ষাধিক টাকা প্রকৃত মালিককে ফেরালেন ট্যাক্সিচালক

নিজস্ব সংবাদদাতা, কলকাতা, ১২ নভেম্বর: চরম মূল্যবৃদ্ধি ও জীবনযাত্রার কঠিন সংগ্রামের মধ্যেও মানবিকতা ও সততা যে আজও অমলিন, তা আবারও প্রমাণ করলেন কলকাতার এক সাধারণ ট্যাক্সিচালক। গতকাল সন্ধ্যায় নিজের ট্যাক্সিতে যাত্রীর ফেলে যাওয়া নগদ পাঁচ লক্ষ টাকা ও গুরুত্বপূর্ণ নথিপত্র ভর্তি একটি ব্যাগ প্রকৃত মালিকের হাতে ফিরিয়ে দিয়ে দৃষ্টান্ত স্থাপন করলেন চালক মহম্মদ রফিকুল ইসলাম।

পুলিশ সূত্রে জানা গিয়েছে, গতকাল বিকেলে হাওড়া স্টেশন থেকে গড়িয়াহাটগামী এক প্রবীণ ব্যক্তি নিজের মেয়ের চিকিৎসার জন্য সংগৃহীত টাকা নিয়ে রফিকুলের ট্যাক্সিতে ওঠেন। গন্তব্যে নেমে তাড়াহুড়োয় তিনি পিছনের সিটেই টাকার ব্যাগটি ফেলে যান। কিছুক্ষণ পর গাড়ি পরিষ্কার করতে গিয়ে ব্যাগটি নজরে আসে রফিকুলের। এক মুহূর্তও দ্বিধা না করে তিনি সোজা গড়িয়াহাট থানায় গিয়ে ব্যাগটি জমা দেন।

পুলিশের তৎপরতায় মাত্র দু-ঘণ্টার মধ্যেই ওই প্রবীণ যাত্রীর পরিচয় শনাক্ত করে তাঁর হাতে সম্পূর্ণ টাকা তুলে দেওয়া হয়। ট্যাক্সিচালকের এই অসামান্য সততাকে কুর্নিশ জানিয়ে কলকাতা পুলিশের পক্ষ থেকে তাঁকে বিশেষ শংসাপত্র ও পুরস্কারে সংবর্ধিত করা হয়েছে।`,
    },
    subParts: [
      {
        partId: '1ka',
        partLabel: 'বিকল্প ১(ক) — আর্সেনিক দূষণ নিয়ন্ত্রণ',
        promptEn:
          'পশ্চিমবঙ্গে কলকাতা-সহ বেশ কয়েকটি জেলায় পানীয় জলে আর্সেনিক দূষণ নিয়ন্ত্রণে সরকারি উদ্যোগ বিষয়ে একটি প্রতিবেদন রচনা করুন। (অনধিক ২০০ শব্দে)',
        descriptiveGuide: {
          formatType: 'Report Writing',
          marks: 15,
          wordLimitOrTarget: 'অনধিক ২০০ শব্দ (~১৬৫ শব্দ)',
          outlineStructure: [
            'শিরোনাম: রাজ্যে পানীয় জলে আর্সেনিক দূষণ নিয়ন্ত্রণে ব্যাপক সরকারি উদ্যোগ।',
            'সূত্রাপাত: আর্সেনিকপ্রবণ জেলাগুলিতে (উঃ ও দঃ ২৪ পরগনা, নদিয়া, মুর্শিদাবাদ, মালদহ ও কলকাতা) জনস্বাস্থ্য কারিগরি দপ্তরের নতুন পদক্ষেপ।',
            'প্রকল্পের বিবরণ: নদীর জল শোধন করে পাইপলাইনে সরবরাহ, সৌরচালিত আর্সেনিক রিমুভাল প্ল্যান্ট ও জল পরীক্ষাগার স্থাপন।',
          ],
          keyThemesAndArguments: [
            'ভূগর্ভস্থ জলের পরিবর্তে নদীভিত্তিক পরিস্রুত পানীয় জল প্রকল্পের স্থায়ী সুফল।',
          ],
          sampleAnswerTitle: 'রাজ্যে পানীয় জলে আর্সেনিক দূষণ নিয়ন্ত্রণে ব্যাপক সরকারি উদ্যোগ',
          sampleAnswerBody: `নিজস্ব সংবাদদাতা, কলকাতা, ১২ নভেম্বর: পশ্চিমবঙ্গে কলকাতা-সহ আর্সেনিকপ্রবণ জেলাগুলিতে নিরাপদ ও পরিস্রুত পানীয় জল পৌঁছে দিতে একগুচ্ছ সদর্থক পদক্ষেপ গ্রহণ করল রাজ্য জনস্বাস্থ্য কারিগরি দপ্তর। মূলত উত্তর ও দক্ষিণ ২৪ পরগনা, নদিয়া, মুর্শিদাবাদ এবং মালদহ জেলার বিস্তীর্ণ অঞ্চলে ভূগর্ভস্থ জলে মাত্রাতিরিক্ত আর্সেনিকের উপস্থিতি দীর্ঘদিন ধরেই জনস্বাস্থ্যের ক্ষেত্রে বড় উদ্বেগের কারণ হয়ে দাঁড়িয়েছিল।

সরকারি সূত্রের খবর, ভূগর্ভস্থ জলের ওপর নির্ভরতা কমিয়ে গঙ্গা ও অন্যান্য প্রধান নদীর জল শোধন করে পাইপলাইনের মাধ্যমে বাড়ি বাড়ি পৌঁছে দেওয়ার মেগা সারফেস ওয়াটার প্রকল্পের কাজ দ্রুতগতিতে এগিয়ে চলেছে। ইতিমধ্যে ক্ষতিগ্রস্ত ব্লকগুলিতে সৌরচালিত আর্সেনিক রিমুভাল প্ল্যান্ট এবং ওয়াটার এটিএম বসানো হয়েছে। পাশাপাশি, প্রতিটি গ্রাম পঞ্চায়েতে জলের গুণমান নিয়মিত পরীক্ষার জন্য বিশেষ ওয়াটার টেস্টিং ল্যাবরেটরি ও সচেতনতা শিবির চালু করা হয়েছে।

বিশেষজ্ঞদের মতে, এই সমন্বিত সরকারি উদ্যোগ সফলভাবে রূপায়িত হলে আগামী কয়েক বছরের মধ্যেই রাজ্যের লক্ষ লক্ষ মানুষ আর্সেনিকজনিত দুরারোগ্য ব্যাধির হাত থেকে স্থায়ী সুরক্ষা পাবেন।`,
        },
      },
      {
        partId: '1kha',
        partLabel: 'বিকল্প ১(খ) — ট্যাক্সি-ড্রাইভারের সততা',
        promptEn:
          'কোনো এক ট্যাক্সি-ড্রাইভার বিপুল অঙ্কের টাকা প্রকৃত মালিককে ফিরিয়ে দিলেন— এ বিষয়ে একটি প্রতিবেদন রচনা করুন। (অনধিক ২০০ শব্দে)',
        descriptiveGuide: {
          formatType: 'Report Writing',
          marks: 15,
          wordLimitOrTarget: 'অনধিক ২০০ শব্দ (~১৭৫ শব্দ)',
          outlineStructure: [
            'শিরোনাম: রাজপথে সততার উজ্জ্বল নজির: লক্ষাধিক টাকা প্রকৃত মালিককে ফেরালেন ট্যাক্সিচালক।',
            'ঘটনার বিবরণ: হাওড়া থেকে গড়িয়াহাটগামী প্রবীণ যাত্রীর মেয়ের চিকিৎসার ৫ লক্ষ টাকার ব্যাগ ট্যাক্সিতে ফেলে যাওয়া।',
            'সততা ও সম্মাননা: চালকের তৎপরতায় গড়িয়াহাট থানায় ব্যাগ জমা এবং পুলিশের পক্ষ থেকে সংবর্ধনা।',
          ],
          keyThemesAndArguments: [
            'সাধারণ শ্রমজীবী মানুষের অটুট নৈতিকতা ও মানবিক মূল্যবোধ।',
          ],
          sampleAnswerTitle: 'রাজপথে সততার উজ্জ্বল নজির: লক্ষাধিক টাকা প্রকৃত মালিককে ফেরালেন ট্যাক্সিচালক',
          sampleAnswerBody: `নিজস্ব সংবাদদাতা, কলকাতা, ১২ নভেম্বর: চরম মূল্যবৃদ্ধি ও জীবনযাত্রার কঠিন সংগ্রামের মধ্যেও মানবিকতা ও সততা যে আজও অমলিন, তা আবারও প্রমাণ করলেন কলকাতার এক সাধারণ ট্যাক্সিচালক। গতকাল সন্ধ্যায় নিজের ট্যাক্সিতে যাত্রীর ফেলে যাওয়া নগদ পাঁচ লক্ষ টাকা ও গুরুত্বপূর্ণ নথিপত্র ভর্তি একটি ব্যাগ প্রকৃত মালিকের হাতে ফিরিয়ে দিয়ে দৃষ্টান্ত স্থাপন করলেন চালক মহম্মদ রফিকুল ইসলাম।

পুলিশ সূত্রে জানা গিয়েছে, গতকাল বিকেলে হাওড়া স্টেশন থেকে গড়িয়াহাটগামী এক প্রবীণ ব্যক্তি নিজের মেয়ের চিকিৎসার জন্য সংগৃহীত টাকা নিয়ে রফিকুলের ট্যাক্সিতে ওঠেন। গন্তব্যে নেমে তাড়াহুড়োয় তিনি পিছনের সিটেই টাকার ব্যাগটি ফেলে যান। কিছুক্ষণ পর গাড়ি পরিষ্কার করতে গিয়ে ব্যাগটি নজরে আসে রফিকুলের। এক মুহূর্তও দ্বিধা না করে তিনি সোজা গড়িয়াহাট থানায় গিয়ে ব্যাগটি জমা দেন।

পুলিশের তৎপরতায় মাত্র দু-ঘণ্টার মধ্যেই ওই প্রবীণ যাত্রীর পরিচয় শনাক্ত করে তাঁর হাতে সম্পূর্ণ টাকা তুলে দেওয়া হয়। ট্যাক্সিচালকের এই অসামান্য সততাকে কুর্নিশ জানিয়ে কলকাতা পুলিশের পক্ষ থেকে তাঁকে বিশেষ শংসাপত্র ও পুরস্কারে সংবর্ধিত করা হয়েছে।`,
        },
      },
    ],
    steps: [
      {
        title: 'প্রতিবেদন রচনার কৌশল',
        explanation:
          'চলিত গদ্যরীতি, স্পষ্ট অনুচ্ছেদ বিভাজন এবং সংবাদপত্রের নিরপেক্ষ ভাষা বজায় রাখা উচ্চ নম্বর পাওয়ার মূল চাবিকাঠি।',
      },
    ],
  },
  {
    id: 'mains-2024-gb-q2',
    paperId: 'mains-2024',
    paperShortTitle: 'Mains 2023–24 (SL/II/23)',
    pdfUrl: '/assets/aistudio/Clerkship-Mains-Question-Paper_32ff6d8a.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-B · Q.2',
    seriesNumbers: { A: 5, B: 5, C: 5, D: 5 },
    pdfPages: { A: 4, B: 4, C: 4, D: 4 },
    category: 'Descriptive & Translation',
    subTopic: 'Bengali Précis / সারসংক্ষেপ (Group-B)',
    questionEn:
      '২। নীচের অনুচ্ছেদটির সারসংক্ষেপ করুন (১৫ নম্বর): "বহুর মধ্যে ঐক্য উপলব্ধি, বিচিত্রের মধ্যে ঐক্যস্থাপন— ইহাই ভারতবর্ষের অন্তর্নিহিত ধর্ম। ভারতবর্ষ নিজের এই স্বভাবটিকে সর্বদা অক্ষুণ্ণ রাখিয়া চলিতে পারিয়াছে বলিয়াই ইতিহাসের ধারায় সে আজও বাঁচিয়া আছে। পরকে সে কখনো বাহির করিয়া দেয় নাই, অনার্যকে সে আর্য করিয়া লইয়াছে, বিরোধকে সে সমন্বয়ের দ্বারা মিটাইয়াছে। ভারতবর্ষের এই মহৎ স্বভাবটি আমাদের মনে রাখিতে হইবে।"',
    directAnswerSummary:
      'ভারতবর্ষের বৈচিত্র্যের মধ্যে ঐক্য সাধনা ও সমন্বয়ধর্মিতা বিষয়ে উপযুক্ত শিরোনামসহ এক-তৃতীয়াংশ সারসংক্ষেপ।',
    keyFormulaOrConcept: 'শিরোনাম + এক-তৃতীয়াংশ শব্দসংখ্যায় মূলভাব সংহতি (১৫ নম্বর)',
    descriptiveGuide: {
      formatType: 'Précis / Summary Writing',
      marks: 15,
      wordLimitOrTarget: '~৪০–৪৫ শব্দ (মূল অনুচ্ছেদের এক-তৃতীয়াংশ)',
      outlineStructure: [
        'শিরোনাম: "ভারতবর্ষের ঐক্যসাধনা" বা "বৈচিত্র্যের মধ্যে ভারতের মিলনধর্ম"।',
        'মূলভাব ১: পরকে বর্জন না করে সকল বৈচিত্র্য ও বিরোধকে আত্মসাৎ করে মহত্তর ঐক্য প্রতিষ্ঠাই ভারতবর্ষের চিরন্তন ধর্ম।',
        'মূলভাব ২: এই উদার সমন্বয়শক্তির জোরেই ভারত ইতিহাসের বহু সংঘাতের মধ্যেও নিজের অস্তিত্ব রক্ষা করেছে।',
      ],
      keyThemesAndArguments: [
        'মূল অনুচ্ছেদের সাধু ভাষার পরিবর্তে আধুনিক চলিত ভাষা ও নিজস্ব বাক্যগঠন ব্যবহার করা বাঞ্ছনীয়।',
        'কোনো দৃষ্টান্ত বা অলংকারের পুনরাবৃত্তি না করে কেবল নির্যাসটুকু একটি অনুচ্ছেদে লিখতে হবে।',
      ],
      sampleAnswerTitle: 'শিরোনাম: ভারতবর্ষের ঐক্যসাধনা',
      sampleAnswerBody: `বৈচিত্র্যের মধ্যে ঐক্য প্রতিষ্ঠাই ভারতবর্ষের অন্তর্নিহিত ধর্ম। কোনো ভিন্নতা বা বিরোধকে বর্জন না করে সকলকে এক বিরাট ব্যবস্থার মধ্যে গ্রহণ করার উদার শক্তির জোরেই ভারত ইতিহাসের বহু সংঘাতের মধ্যেও নিজের আত্মাকে রক্ষা করেছে। ভারতের এই সর্বজনীন মিলনধর্মকে আমাদের সর্বদা স্মরণে রাখতে হবে। (৪২ শব্দ)`,
    },
    steps: [
      {
        title: 'সারসংক্ষেপের নিয়মাবলি',
        explanation:
          'উপমা ও পুনরুক্তি বর্জন করে মূল অনুচ্ছেদের এক-তৃতীয়াংশ দৈর্ঘ্যে সহজ চলিত গদ্যে মূল বক্তব্যটি উপস্থাপন করা হয়েছে।',
      },
    ],
  },
  {
    id: 'mains-2024-gb-q3',
    paperId: 'mains-2024',
    paperShortTitle: 'Mains 2023–24 (SL/II/23)',
    pdfUrl: '/assets/aistudio/Clerkship-Mains-Question-Paper_32ff6d8a.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-B · Q.3',
    seriesNumbers: { A: 6, B: 6, C: 6, D: 6 },
    pdfPages: { A: 4, B: 4, C: 4, D: 4 },
    category: 'Descriptive & Translation',
    subTopic: 'English to Bengali Translation / বঙ্গানুবাদ (Group-B)',
    questionEn:
      '৩। চলিত বাংলায় অনুবাদ করুন (২০ নম্বর): "When Rahamat had come to Calcutta from Afghanistan, he had brought with him the impress of his little daughter Rabeya\'s palm on a piece of paper. He always carried it with great care close to his heart. In Calcutta, Rahamat made friends with Mini, a little girl of five. Mini\'s laughter and talk reminded Rahamat of his own daughter. Looking at the paper, Rahamat would forget that he was a poor pathseller in a distant land; he felt as if he were in the company of his dear daughter. Following a bloody clash, Rahamat was imprisoned for several years. On being released from jail, he came to Mini\'s house to see her. But Mini was getting married that evening. Mini\'s father blessed Rahamat with some money so that he could go back to his own country and meet his daughter. Wishing Mini a happy conjugal life, Rahamat left for his homeland."',
    directAnswerSummary:
      'রবীন্দ্রনাথ ঠাকুরের "কাবুলিওয়ালা" গল্পাশ্রিত ইংরেজি অনুচ্ছেদটির স্বাভাবিক ও প্রাঞ্জল চলিত বাংলা অনুবাদ।',
    keyFormulaOrConcept: 'ভাবানুবাদ ও প্রামাণ্য চলিত বাংলা বাক্যরীতি (২০ নম্বর)',
    descriptiveGuide: {
      formatType: 'Translation',
      marks: 20,
      wordLimitOrTarget: 'সম্পূর্ণ অনুচ্ছেদের চলিত বাংলা অনুবাদ',
      outlineStructure: [
        'প্রথম অংশ (আফগানিস্তান থেকে আগমন ও স্মৃতিচিহ্ন): রহমতের কলকাতায় আগমন এবং কন্যা রাবেয়ার হাতের ছাপ বুকের কাছে সযত্নে রাখা।',
        'দ্বিতীয় অংশ (মিনির সাথে সখ্য): পাঁচ বছরের ছোট্ট মিনির হাসি ও কথায় নিজের কন্যার স্মৃতি রোমন্থন।',
        'তৃতীয় অংশ (কারাবাস ও বিদায়): রক্তক্ষয়ী সংঘর্ষে কারাদণ্ড, মুক্তির পর মিনির বিয়ের সন্ধ্যায় আগমন, মিনির বাবার অর্থসাহায্য এবং স্বদেশে প্রত্যাবর্তন।',
      ],
      keyThemesAndArguments: [
        '"impress of his little daughter\'s palm" = "ছোট্ট মেয়ের হাতের ছাপ"।',
        '"poor pathseller in a distant land" = "সুদূর প্রবাসের রাস্তায় ঘুরে বেড়ানো এক দরিদ্র ফেরিওয়ালা"।',
        '"happy conjugal life" = "সুখী দাম্পত্য জীবন"।',
      ],
      sampleAnswerTitle: 'চলিত বাংলায় আদর্শ অনুবাদ (কাবুলিওয়ালা অনুচ্ছেদ)',
      sampleAnswerBody: `রহমত যখন আফগানিস্তান থেকে কলকাতায় এসেছিল, তখন সে একটুকরো কাগজের ওপর তার ছোট্ট মেয়ে রাবেয়ার হাতের ছাপ সঙ্গে করে নিয়ে এসেছিল। সে এই ছাপটিকে অত্যন্ত যত্নে তার হৃদয়ের কাছে রেখে দিত। কলকাতায় এসে রহমতের সাথে পাঁচ বছরের ছোট্ট মেয়ে মিনির বন্ধুত্ব গড়ে ওঠে। মিনির হাসি ও কথাবার্তা রহমতের মনে তার নিজের মেয়ের স্মৃতি জাগিয়ে তুলত। কাগজটির দিকে তাকিয়ে রহমত ভুলে যেত যে সে সুদূর প্রবাসের রাস্তায় ঘুরে বেড়ানো এক দরিদ্র ফেরিওয়ালা; তার মনে হতো সে যেন তার প্রিয় কন্যার সান্নিধ্যেই রয়েছে। এক রক্তক্ষয়ী সংঘর্ষের ঘটনায় রহমতের কয়েক বছরের কারাদণ্ড হয়। জেল থেকে ছাড়া পেয়ে সে মিনির সাথে দেখা করতে তার বাড়িতে আসে। কিন্তু সেদিন সন্ধ্যায় মিনির বিয়ে হতে চলেছে। মিনির বাবা রহমতকে কিছু টাকা দিয়ে আশীর্বাদ করেন, যাতে সে নিজের দেশে ফিরে গিয়ে মেয়ের সাথে দেখা করতে পারে। মিনির সুখী দাম্পত্য জীবন কামনা করে রহমত নিজের দেশের উদ্দেশে যাত্রা করল।`,
    },
    steps: [
      {
        title: 'মূল্যায়ন নির্দেশিকা',
        explanation:
          'আক্ষরিক অনুবাদের পরিবর্তে ভাবানুবাদ ও স্বাভাবিক বাংলা বাক্যরীতি অনুসরণ করা হয়েছে।',
      },
    ],
  },

  // =========================================================================
  // 2. WBPSC CLERKSHIP MAINS 2020 (REGULAR — FCP/I/19 & FCP/II/19)
  // Files:
  // - Combined Booklet (Set-3): /assets/aistudio/WBPSC-Clerkship-2019-Set-3_64e0f90e.pdf (6 Parent Qs)
  // - Standalone Group-A Sheet: /assets/aistudio/WBPSC-Clerkship-Mains-2020-Group-A_df628fec.pdf (3 Parent Qs)
  // - Standalone Group-B Sheet: /assets/aistudio/WBPSC-Clerkship-Mains-Question-Paper-2020-Group-B_d16875e1.pdf (3 Parent Qs)
  // =========================================================================
  {
    id: 'mains-2020-reg-q1',
    paperId: 'mains-2020-group-a',
    alsoInPaperIds: ['mains-2020-set3'],
    paperShortTitle: 'Mains 2020 Regular (FCP/I/19 · Group-A)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Mains-2020-Group-A_df628fec.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-A · Q.1 (Sub-parts 1a & 1b)',
    seriesNumbers: { A: 1, B: 1, C: 1, D: 1 },
    pdfPages: { A: 1, B: 1, C: 1, D: 1 },
    category: 'Descriptive & Translation',
    subTopic: 'English Report Writing (Group-A)',
    questionEn:
      '1. Answer any one of the following in about 150 words (15 Marks):\n(a) Write a report on the precautionary measures taken by shops and markets in your area to prevent the spread of coronavirus infection. [Threat of infection when people crowd at shops and markets — instructions issued by administrative authorities — steps taken by shopkeepers and market committees — reactions of customers — conclusion]\n(b) Write a report on a devastating fire which broke out in the godown of a local factory. [Place and time of the fire — articles stored in the godown — how the fire was noticed — steps taken by the Fire Brigade — damage caused — investigation into the cause of the fire]',
    directAnswerSummary:
      'Parent Question 1 organized with both sub-parts: 1(a) Market COVID-19 Precautionary Protocols Report and 1(b) Factory Godown Fire Incident Report.',
    keyFormulaOrConcept: 'Newspaper Report Format | Target: ~150 Words | 15 Marks',
    descriptiveGuide: {
      formatType: 'Report Writing',
      marks: 15,
      wordLimitOrTarget: 'About 150 words per sub-part (1a: ~152 words | 1b: ~155 words)',
      outlineStructure: [
        'Sub-Part 1(a) [Market COVID Precautions]: Headline + Dateline + Administrative directives + Chalk-circle social distancing, thermal screening, "No Mask, No Goods" rule + Customer cooperation.',
        'Sub-Part 1(b) [Factory Godown Fire]: Headline + Lead (Howrah Industrial Estate, 2:30 a.m.) + Inflammable stock noticed by night guards + 8 fire tenders battling for 4 hours + ₹60 lakh damage & forensic probe.',
      ],
      keyThemesAndArguments: [
        '1(a): Balancing essential commodity supply with strict public health containment in local marketplaces.',
        '1(b): Crisp past-tense incident reporting covering firefighting response, property loss, and fire-safety investigation.',
      ],
      sampleAnswerTitle: 'Sub-Part 1(a): Local Markets Enforce Strict Precautionary Measures Against Coronavirus',
      sampleAnswerBody: `By a Staff Reporter

Kolkata, December 6: Amid growing concern over the rapid spread of coronavirus infection through crowded public spaces, shops and market committees in our locality have implemented stringent safety protocols following directives issued by the municipal and police authorities.

To prevent overcrowding, local market associations at Lake Market and Gariahat have demarcated chalk circles spaced six feet apart outside grocery and vegetable stalls. Entry gates have been equipped with pedal-operated hand sanitizers and thermal scanners. Shopkeepers have strictly enforced a "No Mask, No Goods" policy, while nylon nets and plastic shields have been installed across shop counters to prevent direct contact. Additionally, the market complex is sanitized twice weekly with sodium hypochlorite solution.

Although customers initially faced minor delays due to regulated entry and queue systems, residents have overwhelmingly welcomed these disciplined measures as essential safeguards to protect the community while purchasing daily necessities.`,
      secondarySampleBody: `Sub-Part 1(b): Devastating Fire Guts Factory Godown in Howrah

By a Staff Reporter

Howrah, December 6: A devastating fire broke out in the storage godown of a private garment and packaging factory at Baltikuri Industrial Estate in Howrah around 2:30 a.m. today, reducing goods worth lakhs of rupees to ashes.

The godown was packed with highly inflammable synthetic fabrics, cardboard cartons, and chemical dyes. Night-shift security guards first noticed thick black smoke billowing from the rear ventilator and immediately raised an alarm while alerting the Fire Brigade. Eight fire tenders rushed to the spot and battled the raging flames for nearly four hours before bringing the blaze under control at daybreak, preventing it from spreading to adjacent residential quarters.

While no casualties or injuries were reported as the premises were unoccupied at night, raw materials and machinery worth over Rs. 60 lakh were completely destroyed. Police and forensic experts have initiated an investigation, suspecting an electrical short-circuit as the primary cause.`,
    },
    subParts: [
      {
        partId: '1a',
        partLabel: 'Sub-Part 1(a) — Market Coronavirus Precautions',
        promptEn:
          'Write a report in about 150 words on the precautionary measures taken by shops and markets in your area to prevent the spread of coronavirus infection. [Threat of infection when people crowd at shops and markets — instructions issued by administrative authorities — steps taken by shopkeepers and market committees — reactions of customers — conclusion]',
        descriptiveGuide: {
          formatType: 'Report Writing',
          marks: 15,
          wordLimitOrTarget: 'About 150 words (~152 words)',
          outlineStructure: [
            'Headline: Emphasize strict COVID-19 precautionary norms in local markets.',
            'Opening: High risk of viral transmission in crowded marketplaces and civic directives.',
            'Body: Chalk-circle social distancing, mandatory masks ("No Mask, No Goods"), thermal screening, and sanitization.',
            'Conclusion: Initial queue delays followed by widespread public cooperation.',
          ],
          keyThemesAndArguments: [
            'Proactive role of local market committees and civic administration in public health containment.',
          ],
          sampleAnswerTitle: 'Local Markets Enforce Strict Precautionary Measures Against Coronavirus',
          sampleAnswerBody: `By a Staff Reporter

Kolkata, December 6: Amid growing concern over the rapid spread of coronavirus infection through crowded public spaces, shops and market committees in our locality have implemented stringent safety protocols following directives issued by the municipal and police authorities.

To prevent overcrowding, local market associations at Lake Market and Gariahat have demarcated chalk circles spaced six feet apart outside grocery and vegetable stalls. Entry gates have been equipped with pedal-operated hand sanitizers and thermal scanners. Shopkeepers have strictly enforced a "No Mask, No Goods" policy, while nylon nets and plastic shields have been installed across shop counters to prevent direct contact. Additionally, the market complex is sanitized twice weekly with sodium hypochlorite solution.

Although customers initially faced minor delays due to regulated entry and queue systems, residents have overwhelmingly welcomed these disciplined measures as essential safeguards to protect the community while purchasing daily necessities.`,
        },
      },
      {
        partId: '1b',
        partLabel: 'Sub-Part 1(b) — Factory Godown Fire',
        promptEn:
          'Write a report in about 150 words on a devastating fire which broke out in the godown of a local factory. [Place and time of the fire — articles stored in the godown — how the fire was noticed — steps taken by the Fire Brigade — damage caused — investigation into the cause of the fire]',
        descriptiveGuide: {
          formatType: 'Report Writing',
          marks: 15,
          wordLimitOrTarget: 'About 150 words (~155 words)',
          outlineStructure: [
            'Headline: Action-oriented headline stating the location and scale of the godown blaze.',
            'Lead Paragraph: State place (Howrah Industrial Estate), time (2:30 a.m.), and nature of the facility.',
            'Middle Paragraph: Inflammable stock inside, night guards noticing smoke, and 8 fire tenders battling for 4 hours.',
            'Conclusion: Zero casualties, ₹60 lakh property loss, and forensic investigation into suspected short-circuit.',
          ],
          keyThemesAndArguments: [
            'Use objective journalistic phrasing ("gutted in a devastating blaze", "brought under control").',
          ],
          sampleAnswerTitle: 'Devastating Fire Guts Factory Godown in Howrah',
          sampleAnswerBody: `By a Staff Reporter

Howrah, December 6: A devastating fire broke out in the storage godown of a private garment and packaging factory at Baltikuri Industrial Estate in Howrah around 2:30 a.m. today, reducing goods worth lakhs of rupees to ashes.

The godown was packed with highly inflammable synthetic fabrics, cardboard cartons, and chemical dyes. Night-shift security guards first noticed thick black smoke billowing from the rear ventilator and immediately raised an alarm while alerting the Fire Brigade. Eight fire tenders rushed to the spot and battled the raging flames for nearly four hours before bringing the blaze under control at daybreak, preventing it from spreading to adjacent residential quarters.

While no casualties or injuries were reported as the premises were unoccupied at night, raw materials and machinery worth over Rs. 60 lakh were completely destroyed. Police and forensic experts have initiated an investigation, suspecting an electrical short-circuit as the primary cause.`,
        },
      },
    ],
    steps: [
      {
        title: 'Parent Question Organization',
        explanation:
          'Sub-parts 1(a) and 1(b) are grouped under Parent Question 1 of FCP/I/19 (shared across Set-3 and Group-A sheet).',
      },
    ],
  },
  {
    id: 'mains-2020-reg-q2',
    paperId: 'mains-2020-group-a',
    alsoInPaperIds: ['mains-2020-set3'],
    paperShortTitle: 'Mains 2020 Regular (FCP/I/19 · Group-A)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Mains-2020-Group-A_df628fec.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-A · Q.2',
    seriesNumbers: { A: 2, B: 2, C: 2, D: 2 },
    pdfPages: { A: 2, B: 2, C: 2, D: 2 },
    category: 'Descriptive & Translation',
    subTopic: 'English Précis Writing (Group-A)',
    questionEn:
      '2. Write a précis of the following passage and add a suitable title (15 Marks): "What I have most wanted to do throughout the past ten years is to make political writing into an art. My starting point is always a feeling of partisanship, a sense of injustice. When I sit down to write a book, I do not say to myself, \'I am going to produce a work of art.\' I write it because there is some lie that I want to expose, some fact to which I want to draw attention, and my initial concern is to get a hearing. But I could not do the work of writing a book, or even a long magazine article, if it were not also an aesthetic experience..." (George Orwell, "Why I Write" — ~195 words)',
    directAnswerSummary:
      'One-third précis (~64 words) synthesizing George Orwell\'s fusion of political purpose (exposing injustice) with aesthetic craftsmanship.',
    keyFormulaOrConcept: 'One-Third Précis + Title | Target: ~65 Words | 15 Marks',
    descriptiveGuide: {
      formatType: 'Précis / Summary Writing',
      marks: 15,
      wordLimitOrTarget: '~64 words (One-third of ~195 words)',
      outlineStructure: [
        'Title: "Reconciling Political Purpose with Literary Art".',
        'Point 1 (Moral Impulse): The author\'s primary aim is to elevate political writing into an art form, driven by a sense of injustice and a desire to expose falsehoods.',
        'Point 2 (Aesthetic Craft): Yet serious writing is also an aesthetic experience requiring rhythmic prose, precise diction, and structural harmony.',
        'Point 3 (Synthesis): Instead of suppressing either side, the writer strives to reconcile moral conviction with artistic excellence.',
      ],
      keyThemesAndArguments: [
        'Convert Orwell\'s first-person ("I") narrative into third-person indirect précis style ("The author/writer...").',
        'Capture the central harmony between political commitment and aesthetic pleasure.',
      ],
      sampleAnswerTitle: 'Title: Reconciling Political Purpose with Literary Art',
      sampleAnswerBody: `The author's foremost ambition has been to elevate political writing into a true art form. Although his writing is initially motivated by a strong sense of injustice and an urgent desire to expose falsehoods, he cannot write without experiencing aesthetic fulfilment. He values rhythmic prose, precise diction, and structural beauty. Consequently, his literary work seeks to harmonize his political convictions with his artistic sensibilities. (64 words)`,
    },
    steps: [
      {
        title: 'First-Person to Third-Person Rule',
        explanation:
          'In classical WBPSC précis writing, first-person passages ("I") must be rendered in third person ("The author/writer").',
      },
    ],
  },
  {
    id: 'mains-2020-reg-q3',
    paperId: 'mains-2020-group-a',
    alsoInPaperIds: ['mains-2020-set3'],
    paperShortTitle: 'Mains 2020 Regular (FCP/I/19 · Group-A)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Mains-2020-Group-A_df628fec.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-A · Q.3 (Sub-part 3a)',
    seriesNumbers: { A: 3, B: 3, C: 3, D: 3 },
    pdfPages: { A: 2, B: 2, C: 2, D: 2 },
    category: 'Descriptive & Translation',
    subTopic: 'Vernacular to English Translation (Group-A)',
    questionEn:
      '3.(a) Translate into English (20 Marks): "গিরিডিতে বেড়াবার কথা বললে উশ্রীর ধারটাই মনে হয়, কিন্তু অবিনাশবাবু দেখেই চলেছেন উল্টোদিকে। যেদিকটায় শহর ছাড়ালেই কেবল মাঠ আর মাঠ। আর ছোটো ছোটো টিলা। রাঙা মাটির পথ। দূরে একটা নদী, তার নামটিও বেশ— শাঁখের নদী। অধ্যাপক মানুষটি যে কী কারণে সমস্ত জায়গা ছেড়ে ওই দিকেই রোজ বেড়াতে যান তা একমাত্র উনিই জানেন। আজ সকালে অবিনাশবাবু দরজা খুলেই দেখেন যে তাঁর বাংলোর সামনেই দাঁড়িয়ে আছে বছর দশ-বারোর একটি ছেলে। গায়ের রং কালো, মাথার চুল উস্কোখুস্কো, পরনে একটি ময়লা হাফপ্যান্ট। ছেলেটি অবিনাশবাবুকে দেখেই একগাল হেসে বলল, \'বাবু, আজ একটা খেলনা পেয়েছি। সেটা আপনাকে দেখাব।\'"',
    directAnswerSummary:
      'Faithful literary translation of the narrative passage on Professor Abinash Babu in Giridih (inspired by Satyajit Ray\'s Professor Shonku stories).',
    keyFormulaOrConcept: 'Narrative Literary Translation into English (20 Marks)',
    descriptiveGuide: {
      formatType: 'Translation',
      marks: 20,
      wordLimitOrTarget: 'Full passage translation',
      outlineStructure: [
        'Setting the Scene: Contrast the popular banks of the Usri River in Giridih with Abinash Babu\'s preference for the opposite direction.',
        'Landscape Description: Render "কেবল মাঠ আর মাঠ", "ছোটো ছোটো টিলা", "রাঙা মাটির পথ", and "শাঁখের নদী" vividly.',
        'Character & Encounter: Describe the professor\'s solitary habit and his morning encounter with the dishevelled ten-or-twelve-year-old boy holding a newfound toy.',
      ],
      keyThemesAndArguments: [
        'Use narrative present/past consistently ("Whenever one talks of going for a stroll in Giridih...").',
        'Translate "রাঙা মাটির পথ" as "red-earth path", "উস্কোখুস্কো চুল" as "dishevelled hair", and "একগাল হেসে" as "with a broad smile".',
      ],
      sampleAnswerTitle: 'Model English Translation (Giridih & Abinash Babu Passage)',
      sampleAnswerBody: `Whenever one talks of going for a stroll in Giridih, the banks of the Usri river immediately come to mind; yet Abinash Babu keeps walking in the opposite direction—where, just beyond the town, there are only endless open fields, small hillocks, and a red-earth path. In the distance flows a river with a charming name—the Shankh River. Why a professor like him leaves all other places to walk in that particular direction every day is known only to him. This morning, as soon as Abinash Babu opened the door, he saw a boy of about ten or twelve standing right in front of his bungalow. He was dark-complexioned, with dishevelled hair, and wore a soiled pair of shorts. The moment the boy saw Abinash Babu, he beamed with a broad smile and said, "Babu, I have found a toy today. I will show it to you."`,
    },
    steps: [
      {
        title: 'Idiomatic Nuances',
        explanation:
          'Preserve the warm storytelling tone and direct speech at the end ("Babu, I have found a toy today. I will show it to you.").',
      },
    ],
  },
  {
    id: 'mains-2020-reg-gb-q1',
    paperId: 'mains-2020-group-b',
    alsoInPaperIds: ['mains-2020-set3'],
    paperShortTitle: 'Mains 2020 Regular (FCP/II/19 · Group-B)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Mains-Question-Paper-2020-Group-B_d16875e1.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-B · Q.1 (Sub-parts ১ক & ১খ)',
    seriesNumbers: { A: 4, B: 4, C: 4, D: 4 },
    pdfPages: { A: 1, B: 1, C: 1, D: 1 },
    category: 'Descriptive & Translation',
    subTopic: 'Bengali Report Writing / বাংলা প্রতিবেদন (Group-B)',
    questionEn:
      '১। যে-কোনো একটি বিষয়ে প্রায় ১৫০ শব্দে প্রতিবেদন রচনা করুন (১৫ নম্বর):\n(ক) লকডাউন পরিস্থিতিতে পরিযায়ী শ্রমিকদের বাড়ি ফেরার সমস্যা বিষয়ে একটি রিপোর্ট লিখুন।\n(খ) করোনা সংক্রমণ প্রতিরোধে মাস্ক পরা নিয়ে সাধারণ মানুষের মধ্যে সচেতনতার অভাব বিষয়ে একটি প্রতিবেদন রচনা করুন।',
    directAnswerSummary:
      'প্রশ্ন ১-এর দুটি বিকল্পেরই (১ক: পরিযায়ী শ্রমিকদের ঘরে ফেরার সংকট ও ১খ: মাস্ক পরা নিয়ে জনসচেতনতার অভাব) পূর্ণাঙ্গ বাংলা প্রতিবেদন।',
    keyFormulaOrConcept: 'বাংলা সংবাদপত্র প্রতিবেদন | প্রায় ১৫০ শব্দ | ১৫ নম্বর',
    descriptiveGuide: {
      formatType: 'Report Writing',
      marks: 15,
      wordLimitOrTarget: 'প্রায় ১৫০ শব্দ (প্রতিটি বিকল্প)',
      outlineStructure: [
        'বিকল্প ১(ক) [পরিযায়ী শ্রমিক]: আকস্মিক লকডাউনে কর্মহীনতা, গণপরিবহন বন্ধ থাকায় পায়ে হেঁটে ফেরার দুর্ভোগ, শ্রমিক স্পেশাল ট্রেন ও সরকারি কোয়ারান্টাইন/ত্রাণ ব্যবস্থা।',
        'বিকল্প ১(খ) [মাস্ক সচেতনতা]: সংক্রমণ বৃদ্ধি সত্ত্বেও বাজার ও গণপরিবহনে মাস্ক না পরার প্রবণতা, থুতনিতে মাস্ক ঝুলিয়ে রাখা, পুলিশি ধরপাকড় ও জনসচেতনতা বৃদ্ধির প্রয়োজনীয়তা।',
      ],
      keyThemesAndArguments: [
        '১(ক): সংবেদনশীল অথচ তথ্যনিষ্ঠ ভাষায় পরিযায়ী শ্রমিকদের মানবিক সংকট ও সরকারি পদক্ষেপের বিবরণ।',
        '১(খ): প্রশাসনিক জরিমানার পাশাপাশি নাগরিকদের স্বতঃস্ফূর্ত সচেতনতাই অতিমারি রোধের প্রধান উপায়।',
      ],
      sampleAnswerTitle: 'বিকল্প ১(ক): লকডাউনে পরিযায়ী শ্রমিকদের ঘরে ফেরার সংকট ও সরকারি উদ্যোগ',
      sampleAnswerBody: `নিজস্ব সংবাদদাতা, কলকাতা, ৬ ডিসেম্বর: দেশজুড়ে আকস্মিক লকডাউন ঘোষিত হওয়ার পর ভিনরাজ্যে কর্মরত লক্ষ লক্ষ পরিযায়ী শ্রমিকের ঘরে ফেরা নিয়ে এক নজিরবিহীন মানবিক সংকটের সৃষ্টি হয়। কারখানা, নির্মাণশিল্প ও অসংগঠিত ক্ষেত্রে কাজ হারিয়ে অসংখ্য শ্রমিক চরম আর্থিক অনিশ্চয়তা ও খাদ্যসংকটের মুখে পড়েন।

গণপরিবহন ও দূরপাল্লার ট্রেন চলাচল সম্পূর্ণ বন্ধ থাকায় বহু শ্রমিক পরিবার ও শিশুদের নিয়ে শত শত মাইল পথ পায়ে হেঁটে বা পণ্যবাহী ট্রাকে চড়ে বাড়ির উদ্দেশে রওনা দিতে বাধ্য হন। পথে রোদ, ক্ষুধা ও ক্লান্তিতে অনেকেরই চরম দুর্ভোগ ঘটে। পরিস্থিতি মোকাবিলায় কেন্দ্র ও রাজ্য সরকারগুলির যৌথ উদ্যোগে ‘শ্রমিক স্পেশাল’ ট্রেন চালু করা হয়। রাজ্যে ফিরে আসা শ্রমিকদের স্টেশনে স্বাস্থ্য পরীক্ষা, কোয়ারান্টাইন সেন্টারে থাকা-খাওয়ার ব্যবস্থা এবং গ্রামীণ কর্মসংস্থান প্রকল্পে কাজের সুযোগ করে দেওয়া হয়।`,
      secondarySampleBody: `বিকল্প ১(খ): করোনা আবহেও মাস্ক ব্যবহারে চরম উদাসীনতা, বাড়ছে সংক্রমণের ঝুঁকি

নিজস্ব সংবাদদাতা, কলকাতা, ৬ ডিসেম্বর: মারণ করোনাভাইরাসের সংক্রমণ রুখতে চিকিৎসক ও স্বাস্থ্য বিশেষজ্ঞরা বারবার মাস্ক পরার ওপর জোর দিলেও, সাধারণ মানুষের একাংশের মধ্যে এখনও চরম উদাসীনতা লক্ষ্য করা যাচ্ছে। শহর ও শহরতলির বাজার, চায়ের দোকান এবং গণপরিবহনে প্রতিদিনই মাস্কহীন মানুষের ভিড় উদ্বেগ বাড়াচ্ছে।

সরেজমিনে দেখা যাচ্ছে, অনেকেই কেবল পুলিশি জরিমানা এড়াতে মুখের বদলে থুতনিতে বা গলায় মাস্ক ঝুলিয়ে রাখছেন। ভিড় বাসে বা বাজারে নাক-মুখ ঢেকে মাস্ক পরার সাধারণ স্বাস্থ্যবিধিটুকুও অনেকে মানছেন না। এর ফলে উপসর্গহীন বাহকদের মাধ্যমে সংক্রমণ দ্রুত ছড়িয়ে পড়ার আশঙ্কা তৈরি হয়েছে। কলকাতা ও রাজ্য পুলিশের পক্ষ থেকে নিয়মিত সচেতনতা প্রচার, মাইকিং এবং আইন অমান্যকারীদের বিরুদ্ধে জরিমানা করা হলেও নাগরিকদের নিজস্ব সচেতনতা ছাড়া এই বিপদ কাটানো অসম্ভব বলে মনে করছেন চিকিৎসকমহল।`,
    },
    subParts: [
      {
        partId: '2020-gb-1a',
        partLabel: 'বিকল্প ১(ক) — পরিযায়ী শ্রমিকদের সংকট',
        promptEn:
          'লকডাউন পরিস্থিতিতে পরিযায়ী শ্রমিকদের বাড়ি ফেরার সমস্যা বিষয়ে একটি রিপোর্ট লিখুন। (প্রায় ১৫০ শব্দে)',
        descriptiveGuide: {
          formatType: 'Report Writing',
          marks: 15,
          wordLimitOrTarget: 'প্রায় ১৫০ শব্দ',
          outlineStructure: [
            'শিরোনাম: লকডাউনে পরিযায়ী শ্রমিকদের ঘরে ফেরার সংকট ও সরকারি উদ্যোগ।',
            'মূল অনুচ্ছেদ: কাজ হারিয়ে অনিশ্চয়তা, যানবাহন বন্ধ থাকায় পায়ে হেঁটে যাত্রা এবং শ্রমিক স্পেশাল ট্রেনের ব্যবস্থা।',
          ],
          keyThemesAndArguments: [
            'পরিযায়ী শ্রমিকদের মানবিক দুর্ভোগ ও গ্রামীণ কর্মসংস্থান প্রকল্পে পুনর্বাসন।',
          ],
          sampleAnswerTitle: 'লকডাউনে পরিযায়ী শ্রমিকদের ঘরে ফেরার সংকট ও সরকারি উদ্যোগ',
          sampleAnswerBody: `নিজস্ব সংবাদদাতা, কলকাতা, ৬ ডিসেম্বর: দেশজুড়ে আকস্মিক লকডাউন ঘোষিত হওয়ার পর ভিনরাজ্যে কর্মরত লক্ষ লক্ষ পরিযায়ী শ্রমিকের ঘরে ফেরা নিয়ে এক নজিরবিহীন মানবিক সংকটের সৃষ্টি হয়। কারখানা, নির্মাণশিল্প ও অসংগঠিত ক্ষেত্রে কাজ হারিয়ে অসংখ্য শ্রমিক চরম আর্থিক অনিশ্চয়তা ও খাদ্যসংকটের মুখে পড়েন।

গণপরিবহন ও দূরপাল্লার ট্রেন চলাচল সম্পূর্ণ বন্ধ থাকায় বহু শ্রমিক পরিবার ও শিশুদের নিয়ে শত শত মাইল পথ পায়ে হেঁটে বা পণ্যবাহী ট্রাকে চড়ে বাড়ির উদ্দেশে রওনা দিতে বাধ্য হন। পথে রোদ, ক্ষুধা ও ক্লান্তিতে অনেকেরই চরম দুর্ভোগ ঘটে। পরিস্থিতি মোকাবিলায় কেন্দ্র ও রাজ্য সরকারগুলির যৌথ উদ্যোগে ‘শ্রমিক স্পেশাল’ ট্রেন চালু করা হয়। রাজ্যে ফিরে আসা শ্রমিকদের স্টেশনে স্বাস্থ্য পরীক্ষা, কোয়ারান্টাইন সেন্টারে থাকা-খাওয়ার ব্যবস্থা এবং গ্রামীণ কর্মসংস্থান প্রকল্পে কাজের সুযোগ করে দেওয়া হয়।`,
        },
      },
      {
        partId: '2020-gb-1b',
        partLabel: 'বিকল্প ১(খ) — মাস্ক পরা নিয়ে সচেতনতার অভাব',
        promptEn:
          'করোনা সংক্রমণ প্রতিরোধে মাস্ক পরা নিয়ে সাধারণ মানুষের মধ্যে সচেতনতার অভাব বিষয়ে একটি প্রতিবেদন রচনা করুন। (প্রায় ১৫০ শব্দে)',
        descriptiveGuide: {
          formatType: 'Report Writing',
          marks: 15,
          wordLimitOrTarget: 'প্রায় ১৫০ শব্দ',
          outlineStructure: [
            'শিরোনাম: করোনা আবহেও মাস্ক ব্যবহারে চরম উদাসীনতা, বাড়ছে সংক্রমণের ঝুঁকি।',
            'মূল অনুচ্ছেদ: বাজার ও রাস্তায় মাস্কহীন ভিড়, থুতনিতে মাস্ক ঝুলিয়ে রাখার প্রবণতা এবং পুলিশি অভিযান ও স্বাস্থ্যবিধি।',
          ],
          keyThemesAndArguments: [
            'প্রশাসনিক কড়াকড়ির পাশাপাশি জনসাধারণের আত্মসচেতনতার অপরিহার্যতা।',
          ],
          sampleAnswerTitle: 'করোনা আবহেও মাস্ক ব্যবহারে চরম উদাসীনতা, বাড়ছে সংক্রমণের ঝুঁকি',
          sampleAnswerBody: `নিজস্ব সংবাদদাতা, কলকাতা, ৬ ডিসেম্বর: মারণ করোনাভাইরাসের সংক্রমণ রুখতে চিকিৎসক ও স্বাস্থ্য বিশেষজ্ঞরা বারবার মাস্ক পরার ওপর জোর দিলেও, সাধারণ মানুষের একাংশের মধ্যে এখনও চরম উদাসীনতা লক্ষ্য করা যাচ্ছে। শহর ও শহরতলির বাজার, চায়ের দোকান এবং গণপরিবহনে প্রতিদিনই মাস্কহীন মানুষের ভিড় উদ্বেগ বাড়াচ্ছে।

সরেজমিনে দেখা যাচ্ছে, অনেকেই কেবল পুলিশি জরিমানা এড়াতে মুখের বদলে থুতনিতে বা গলায় মাস্ক ঝুলিয়ে রাখছেন। ভিড় বাসে বা বাজারে নাক-মুখ ঢেকে মাস্ক পরার সাধারণ স্বাস্থ্যবিধিটুকুও অনেকে মানছেন না। এর ফলে উপসর্গহীন বাহকদের মাধ্যমে সংক্রমণ দ্রুত ছড়িয়ে পড়ার আশঙ্কা তৈরি হয়েছে। কলকাতা ও রাজ্য পুলিশের পক্ষ থেকে নিয়মিত সচেতনতা প্রচার, মাইকিং এবং আইন অমান্যকারীদের বিরুদ্ধে জরিমানা করা হলেও নাগরিকদের নিজস্ব সচেতনতা ছাড়া এই বিপদ কাটানো অসম্ভব বলে মনে করছেন চিকিৎসকমহল।`,
        },
      },
    ],
    steps: [
      {
        title: 'Parent Question Organization',
        explanation:
          'বিকল্প ১(ক) এবং ১(খ) মূল প্রশ্ন ১-এর অধীনে একত্রে সুবিন্যস্ত করা হয়েছে।',
      },
    ],
  },
  {
    id: 'mains-2020-reg-gb-q2',
    paperId: 'mains-2020-group-b',
    alsoInPaperIds: ['mains-2020-set3'],
    paperShortTitle: 'Mains 2020 Regular (FCP/II/19 · Group-B)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Mains-Question-Paper-2020-Group-B_d16875e1.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-B · Q.2',
    seriesNumbers: { A: 5, B: 5, C: 5, D: 5 },
    pdfPages: { A: 2, B: 2, C: 2, D: 2 },
    category: 'Descriptive & Translation',
    subTopic: 'Bengali Précis / সারাংশ লিখন (Group-B)',
    questionEn:
      '২। নীচের অনুচ্ছেদটির সারাংশ লিখুন (১৫ নম্বর): "মানুষ বাড়ছে তাই প্রয়োজন বাড়ছে। কাজেই বিজ্ঞাপন বাড়ছে। খবরের কাগজ খুললেই বিজ্ঞাপন, রাস্তায় বেরোলেই বিজ্ঞাপন, দেওয়ালে দেওয়ালে বিজ্ঞাপন। হাজার জিনিসের হাজার বিজ্ঞাপন। প্রত্যেকেই বলছে— ‘আমাকে কেনো, আমাকে কেনো’। এত ভিড়ের মধ্যে নিজের জিনিসটির দিকে লোকের চোখ টানতে হলে গলাবাজি করতেই হয়।"',
    directAnswerSummary:
      'জনসংখ্যা ও চাহিদা বৃদ্ধির সাথে সাথে আধুনিক জীবনে বিজ্ঞাপনের সর্বগ্রাসী দাপট বিষয়ে সারাংশ।',
    keyFormulaOrConcept: 'শিরোনাম + এক-তৃতীয়াংশ শব্দে মূলভাব (১৫ নম্বর)',
    descriptiveGuide: {
      formatType: 'Précis / Summary Writing',
      marks: 15,
      wordLimitOrTarget: '~৪০ শব্দ',
      outlineStructure: [
        'শিরোনাম: "আধুনিক জীবনে বিজ্ঞাপনের দাপট"।',
        'মূল বক্তব্য: জনসংখ্যা ও চাহিদা বৃদ্ধির ফলে বাণিজ্যিক প্রতিযোগিতা তীব্রতর হয়েছে এবং ক্রেতা আকর্ষণের জন্য সর্বত্র বিজ্ঞাপনের সমারোহ দেখা দিয়েছে।',
      ],
      keyThemesAndArguments: [
        'খবরের কাগজ, রাস্তা ও দেওয়ালের উদাহরণগুলি বর্জন করে মূল বাণিজ্যিক প্রতিযোগিতার কথাটি সংক্ষেপে প্রকাশ করতে হবে।',
      ],
      sampleAnswerTitle: 'শিরোনাম: আধুনিক জীবনে বিজ্ঞাপনের দাপট',
      sampleAnswerBody: `মানুষ ও তার প্রয়োজন বৃদ্ধির সঙ্গে সঙ্গে কর্মক্ষেত্রের প্রতিটি শাখায় তীব্র প্রতিযোগিতা শুরু হয়েছে। ফলে ক্রেতার দৃষ্টি আকর্ষণ করতে চারপাশ জুড়ে আজ বিজ্ঞাপনের সর্বগ্রাসী সমারোহ। অগণিত পণ্যের ভিড়ে প্রতিটি প্রস্তুতকারকই চটকদার বিজ্ঞাপনের মাধ্যমে নিজের পণ্যটি বিক্রির জন্য অবিরাম আহ্বান জানাচ্ছে। (৪১ শব্দ)`,
    },
    steps: [
      {
        title: 'সারাংশ লেখার নিয়ম',
        explanation:
          'উদাহরণ ও পুনরুক্তি বাদ দিয়ে মূল বক্তব্যটি সহজ চলিত ভাষায় সংক্ষেপে প্রকাশ করা হয়েছে।',
      },
    ],
  },
  {
    id: 'mains-2020-reg-gb-q3',
    paperId: 'mains-2020-group-b',
    alsoInPaperIds: ['mains-2020-set3'],
    paperShortTitle: 'Mains 2020 Regular (FCP/II/19 · Group-B)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-Mains-Question-Paper-2020-Group-B_d16875e1.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-B · Q.3',
    seriesNumbers: { A: 6, B: 6, C: 6, D: 6 },
    pdfPages: { A: 2, B: 2, C: 2, D: 2 },
    category: 'Descriptive & Translation',
    subTopic: 'English to Bengali Translation / বঙ্গানুবাদ (Group-B)',
    questionEn:
      '৩। বাংলায় অনুবাদ করুন (২০ নম্বর): "A patriot is a man who loves his country, works for it and is willing to fight and die for it. Every soldier is bound to do his duty, but the best soldiers do more than this. They put their hearts into their work, and that is why they find joy in it, because they love their country. All those who work silently and selflessly for the safety and welfare of our country are true patriots."',
    directAnswerSummary:
      'প্রকৃত দেশপ্রেমিক ও শ্রেষ্ঠ সৈনিকের নিঃস্বার্থ দেশসেবা বিষয়ক ইংরেজি অনুচ্ছেদটির প্রাঞ্জল বঙ্গানুবাদ।',
    keyFormulaOrConcept: 'ভাবানুবাদ ও চলিত বাংলা গদ্যরীতি (২০ নম্বর)',
    descriptiveGuide: {
      formatType: 'Translation',
      marks: 20,
      wordLimitOrTarget: 'সম্পূর্ণ অনুচ্ছেদের বাংলা অনুবাদ',
      outlineStructure: [
        'বাক্য ১: দেশপ্রেমিকের সংজ্ঞা— যিনি দেশকে ভালোবাসেন, দেশের জন্য কাজ করেন এবং জীবন উৎসর্গ করতেও প্রস্তুত থাকেন।',
        'বাক্য ২–৩: সাধারণ কর্তব্যের ঊর্ধ্বে উঠে শ্রেষ্ঠ সৈনিকদের হৃদয় ঢেলে কাজ করা ও আনন্দ লাভ।',
        'বাক্য ৪: দেশের নিরাপত্তা ও কল্যাণে নীরবে ও নিঃস্বার্থভাবে কর্মরত প্রতিটি মানুষই প্রকৃত দেশপ্রেমিক।',
      ],
      keyThemesAndArguments: [
        '"bound to do his duty" = "কর্তব্য পালনে দায়বদ্ধ" | "put their hearts into their work" = "নিজেদের কাজে হৃদয় ঢেলে দেন"।',
      ],
      sampleAnswerTitle: 'বাংলায় আদর্শ অনুবাদ (A patriot is a man...)',
      sampleAnswerBody: `দেশপ্রেমিক হলেন এমন একজন মানুষ যিনি নিজের দেশকে ভালোবাসেন, দেশের জন্য কাজ করেন এবং দেশের জন্য লড়াই করতে ও জীবন উৎসর্গ করতেও প্রস্তুত থাকেন। প্রত্যেক সৈনিকই তাঁর কর্তব্য পালনে দায়বদ্ধ, কিন্তু শ্রেষ্ঠ সৈনিকেরা তার চেয়েও বেশি কিছু করেন। তাঁরা নিজেদের কাজে হৃদয় ঢেলে দেন এবং সেটুকুতেই তাঁরা আনন্দ খুঁজে পান, কারণ তাঁরা নিজেদের দেশকে গভীরভাবে ভালোবাসেন। আমাদের দেশের সুরক্ষা ও মঙ্গলের জন্য যাঁরা নীরবে ও নিঃস্বার্থভাবে কাজ করে চলেছেন, তাঁরা সকলেই প্রকৃত দেশপ্রেমিক।`,
    },
    steps: [
      {
        title: 'অনুবাদ শৈলী',
        explanation:
          'ইংরেজি বাক্যের গঠনকে অক্ষুণ্ণ রেখে স্বাভাবিক ও প্রাঞ্জল চলিত বাংলায় রূপান্তর করা হয়েছে।',
      },
    ],
  },

  // =========================================================================
  // 3. WBPSC CLERKSHIP MAINS 2020 (SUPPLEMENTARY / SET-4 — SFCP/I/19 & SFCP/II/19)
  // File: /assets/aistudio/WBPSC-Clerkship-2019-Set-4_199741ce.pdf
  // Official Parent Questions: 6 (Group-A: Q.1 [1a, 1b], Q.2, Q.3 | Group-B: Q.1 [1ক, 1খ], Q.2, Q.3)
  // =========================================================================
  {
    id: 'mains-2020-supp-q1',
    paperId: 'mains-2020-set4',
    paperShortTitle: 'Mains 2020 Supp. (SFCP/19)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-2019-Set-4_199741ce.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-A · Q.1 (Sub-parts 1a & 1b)',
    seriesNumbers: { A: 1, B: 1, C: 1, D: 1 },
    pdfPages: { A: 1, B: 1, C: 1, D: 1 },
    category: 'Descriptive & Translation',
    subTopic: 'English Report Writing (Group-A)',
    questionEn:
      '1. Answer any one of the following within 200 words (15 Marks):\n(a) Write a report on the impact of the Covid-19 on the school-going children. [Closure of schools due to the pandemic — Holding of online classes to arrest academic loss — Impact on the social and psychological aspects of children — Remedial measures]\n(b) Write a report on the environmental pollution caused by burning of fire crackers. [Occasions of burning of fire crackers — Types of pollution caused — Impact on the elderly people, children and pets — Measures to stop burning of fire crackers]',
    directAnswerSummary:
      'Parent Question 1 organized with both sub-parts: 1(a) Impact of Covid-19 on School-Going Children and 1(b) Environmental Pollution Caused by Burning of Firecrackers.',
    keyFormulaOrConcept: 'Analytical Civic Report | Within 200 Words | 15 Marks',
    descriptiveGuide: {
      formatType: 'Report Writing',
      marks: 15,
      wordLimitOrTarget: 'Within 200 words per sub-part (1a: ~178 words | 1b: ~175 words)',
      outlineStructure: [
        'Sub-Part 1(a) [Covid-19 & School Children]: Headline + School closures & shift to online classes + Digital divide, screen fatigue & psychological isolation + Remedial counselling and bridge courses.',
        'Sub-Part 1(b) [Firecracker Pollution]: Headline + Festive occasions (Diwali, Kali Puja, weddings) + Toxic PM2.5 air & high-decibel noise pollution + Distress to elderly, children & pets + Judicial ban enforcement.',
      ],
      keyThemesAndArguments: [
        '1(a): Schools are vital spaces for peer socialization and emotional growth; remedial steps must pair counselling with bridge courses.',
        '1(b): Chemical fumes and acoustic shock severely harm vulnerable citizens and animals, requiring strict civic enforcement.',
      ],
      sampleAnswerTitle: 'Sub-Part 1(a): Pandemic Lockdowns Leave Deep Academic and Psychological Impact on School Children',
      sampleAnswerBody: `By a Staff Reporter

Kolkata, December 15: The prolonged closure of schools across the country due to the Covid-19 pandemic has profoundly disrupted the academic routine and emotional well-being of millions of school-going children.

To arrest academic loss during the lockdown, educational institutions swiftly shifted to online classes via smartphones and computers. While virtual classrooms helped maintain syllabus continuity for urban students, they also exposed a stark digital divide among underprivileged learners lacking internet access. More alarmingly, child psychologists and paediatricians have raised concern over the severe social and psychological impact of home confinement. Deprived of classroom interaction, outdoor sports, and peer companionship, many children have experienced heightened anxiety, irritability, excessive screen addiction, and disrupted sleep cycles.

Educationists and mental health experts have urged schools and parents to adopt urgent remedial measures. These include interactive co-curricular sessions, regular psychological counselling helplines, reduced screen hours, and structured bridge courses to help students readjust smoothly when physical classrooms reopen.`,
      secondarySampleBody: `Sub-Part 1(b): Rampant Bursting of Firecrackers Triggers Severe Air and Noise Pollution

By a Staff Reporter

Kolkata, November 18: The indiscriminate bursting of firecrackers during festivals such as Kali Puja, Diwali, New Year celebrations, and wedding processions continues to pose a grave threat to public health and the urban environment.

Environmental monitoring agencies report that burning chemical crackers releases dense clouds of toxic pollutants—including sulphur dioxide, nitrous oxide, and fine particulate matter (PM 2.5)—while generating deafening noise far exceeding permissible decibel limits. This twin menace of air and noise pollution inflicts acute distress on vulnerable groups. Elderly citizens suffering from cardiac ailments, patients with asthma or bronchitis, and newborn infants experience severe breathing difficulties and sleeplessness, while domestic pets and street animals suffer extreme trauma and panic.

To curb this seasonal hazard, pollution control boards and courts have mandated strict bans on toxic and high-decibel crackers. Experts emphasize that stringent police patrolling, heavy penalties against illegal manufacturing, and sustained community awareness campaigns are essential to celebrate festivals with eco-friendly lights rather than hazardous smoke.`,
    },
    subParts: [
      {
        partId: 'supp-1a',
        partLabel: 'Sub-Part 1(a) — Impact of Covid-19 on School Children',
        promptEn:
          'Write a report on the impact of the Covid-19 on the school-going children, using the following points (within 200 words): [Closure of schools due to the pandemic — Holding of online classes to arrest academic loss — Impact on the social and psychological aspects of children — Remedial measures]',
        descriptiveGuide: {
          formatType: 'Report Writing',
          marks: 15,
          wordLimitOrTarget: 'Within 200 words (~178 words)',
          outlineStructure: [
            'Headline: Highlight the academic and psychological toll of COVID-19 on school children.',
            'Paragraph 1: Nationwide school closures and transition to online classes.',
            'Paragraph 2: Digital divide, isolation from peers, screen fatigue, and anxiety.',
            'Paragraph 3: Tele-counselling, reduced screen hours, and academic bridge courses.',
          ],
          keyThemesAndArguments: [
            'Schools provide essential peer socialization alongside classroom learning.',
          ],
          sampleAnswerTitle: 'Pandemic Lockdowns Leave Deep Academic and Psychological Impact on School Children',
          sampleAnswerBody: `By a Staff Reporter

Kolkata, December 15: The prolonged closure of schools across the country due to the Covid-19 pandemic has profoundly disrupted the academic routine and emotional well-being of millions of school-going children.

To arrest academic loss during the lockdown, educational institutions swiftly shifted to online classes via smartphones and computers. While virtual classrooms helped maintain syllabus continuity for urban students, they also exposed a stark digital divide among underprivileged learners lacking internet access. More alarmingly, child psychologists and paediatricians have raised concern over the severe social and psychological impact of home confinement. Deprived of classroom interaction, outdoor sports, and peer companionship, many children have experienced heightened anxiety, irritability, excessive screen addiction, and disrupted sleep cycles.

Educationists and mental health experts have urged schools and parents to adopt urgent remedial measures. These include interactive co-curricular sessions, regular psychological counselling helplines, reduced screen hours, and structured bridge courses to help students readjust smoothly when physical classrooms reopen.`,
        },
      },
      {
        partId: 'supp-1b',
        partLabel: 'Sub-Part 1(b) — Firecracker Pollution Report',
        promptEn:
          'Write a report on the environmental pollution caused by burning of fire crackers, using the following points (within 200 words): [Occasions of burning of fire crackers — Types of pollution caused — Impact on the elderly people, children and pets — Measures to stop burning of fire crackers]',
        descriptiveGuide: {
          formatType: 'Report Writing',
          marks: 15,
          wordLimitOrTarget: 'Within 200 words (~175 words)',
          outlineStructure: [
            'Headline: Toxic air and noise pollution triggered by festive firecrackers.',
            'Paragraph 1: Bursting of crackers during Diwali, Kali Puja, weddings, and New Year.',
            'Paragraph 2: PM2.5 fumes and deafening decibels harming elderly citizens, children, and pets.',
            'Paragraph 3: Strict police enforcement of judicial bans and community awareness.',
          ],
          keyThemesAndArguments: [
            'Twin hazard of toxic particulate matter and acoustic trauma.',
          ],
          sampleAnswerTitle: 'Rampant Bursting of Firecrackers Triggers Severe Air and Noise Pollution',
          sampleAnswerBody: `By a Staff Reporter

Kolkata, November 18: The indiscriminate bursting of firecrackers during festivals such as Kali Puja, Diwali, New Year celebrations, and wedding processions continues to pose a grave threat to public health and the urban environment.

Environmental monitoring agencies report that burning chemical crackers releases dense clouds of toxic pollutants—including sulphur dioxide, nitrous oxide, and fine particulate matter (PM 2.5)—while generating deafening noise far exceeding permissible decibel limits. This twin menace of air and noise pollution inflicts acute distress on vulnerable groups. Elderly citizens suffering from cardiac ailments, patients with asthma or bronchitis, and newborn infants experience severe breathing difficulties and sleeplessness, while domestic pets and street animals suffer extreme trauma and panic.

To curb this seasonal hazard, pollution control boards and courts have mandated strict bans on toxic and high-decibel crackers. Experts emphasize that stringent police patrolling, heavy penalties against illegal manufacturing, and sustained community awareness campaigns are essential to celebrate festivals with eco-friendly lights rather than hazardous smoke.`,
        },
      },
    ],
    steps: [
      {
        title: 'Parent Question Organization',
        explanation:
          'Sub-parts 1(a) and 1(b) are organized under Parent Question 1 of SFCP/I/19.',
      },
    ],
  },
  {
    id: 'mains-2020-supp-q2',
    paperId: 'mains-2020-set4',
    paperShortTitle: 'Mains 2020 Supp. (SFCP/19)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-2019-Set-4_199741ce.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-A · Q.2',
    seriesNumbers: { A: 2, B: 2, C: 2, D: 2 },
    pdfPages: { A: 2, B: 2, C: 2, D: 2 },
    category: 'Descriptive & Translation',
    subTopic: 'English Summary / Précis (Group-A)',
    questionEn:
      '2. Condense the following passage into one-third of its length and add a suitable title (15 Marks): "The hunter-gatherer lifestyle was what all human beings followed before the agricultural revolution. Early humans were neither the fastest nor the strongest creatures, yet they possessed remarkable endurance. Through \'persistence hunting\', they tracked and chased prey over long distances in the midday heat until the animal collapsed from exhaustion. Today, surviving tribes like the Kalahari Bushmen still practice this ancient skill, though their traditional way of life is rapidly vanishing due to modern encroachment..."',
    directAnswerSummary:
      'One-third summary (~63 words) with title on the endurance-based persistence hunting of early and surviving hunter-gatherers.',
    keyFormulaOrConcept: 'One-Third Précis + Suitable Title (15 Marks)',
    descriptiveGuide: {
      formatType: 'Précis / Summary Writing',
      marks: 15,
      wordLimitOrTarget: '~63 words',
      outlineStructure: [
        'Title: "The Vanishing Lifestyle of Hunter-Gatherers".',
        'Core Point 1: Prior to agriculture, early humans survived as hunter-gatherers using superior stamina rather than speed or brute force.',
        'Core Point 2: Through "persistence hunting," they pursued prey until exhaustion.',
        'Core Point 3: Today, surviving groups like the Kalahari Bushmen face cultural extinction as modern civilization encroaches on their habitats.',
      ],
      keyThemesAndArguments: [
        'Highlight the contrast between ancient endurance hunting and modern habitat encroachment.',
      ],
      sampleAnswerTitle: 'Title: The Vanishing Lifestyle of Hunter-Gatherers',
      sampleAnswerBody: `Before the agricultural revolution, all humans subsisted as hunter-gatherers. Lacking swiftness or sharp claws, early humans relied on superior endurance and "persistence hunting," chasing animals for hours until they collapsed from exhaustion. Today, surviving hunter-gatherers like the Kalahari Bushmen still practice this ancient skill, though their traditional way of life is rapidly vanishing due to modern encroachment on their forest homes. (63 words)`,
    },
    steps: [
      {
        title: 'Précis Structure',
        explanation:
          'Separated as Parent Question 2 (distinct from Question 3 Translation) to match the official SFCP/I/19 question sheet.',
      },
    ],
  },
  {
    id: 'mains-2020-supp-q3',
    paperId: 'mains-2020-set4',
    paperShortTitle: 'Mains 2020 Supp. (SFCP/19)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-2019-Set-4_199741ce.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-A · Q.3 (Sub-part 3a)',
    seriesNumbers: { A: 3, B: 3, C: 3, D: 3 },
    pdfPages: { A: 2, B: 2, C: 2, D: 2 },
    category: 'Descriptive & Translation',
    subTopic: 'Vernacular to English Translation (Group-A)',
    questionEn:
      '3.(a) Translate into English (20 Marks): "ছাত্রজীবন থেকেই শ্রীঅরবিন্দ যথেষ্ট কষ্ট করেছেন। কারাজীবনের কষ্ট সেখানে হয়ত সিন্ধুতে বিন্দুর মতো। তাঁর বাবা তাঁকে বিলাতে পাঠিয়েছিলেন আই.সি.এস. পড়ার জন্য, কিন্তু টাকার অভাবে তিনি অনেক সময় ঠিকমতো খেতেও পেতেন না। সেই শীতের দেশে ওভারকোট ছাড়াই তাঁকে শীতকাল কাটাতে হতো। প্রায় প্রতি সপ্তাহেই একাদশী ঘটত। এই অভ্যাসের ফলে আলিপুর জেলের কষ্টকে তাঁর কখনোই অসহ্য বলে মনে হয়নি।"',
    directAnswerSummary:
      'Biographical translation into English detailing Sri Aurobindo\'s austerity in England while studying for the I.C.S. and his stoic endurance in Alipore Jail.',
    keyFormulaOrConcept: 'Biographical Literary Translation (20 Marks)',
    descriptiveGuide: {
      formatType: 'Translation',
      marks: 20,
      wordLimitOrTarget: 'Full passage translation',
      outlineStructure: [
        'Opening Comparison: Hardships from student days vs. prison sufferings ("like a drop in the ocean" for "সিন্ধুতে বিন্দুর মতো").',
        'Student Life in England: Sent by his father to study for the I.C.S., enduring acute scarcity of funds, winter without an overcoat, and weekly forced fasting ("একাদশী").',
        'Conclusion: How lifelong austerity made the rigours of Alipore Jail bearable.',
      ],
      keyThemesAndArguments: [
        'Translate "সিন্ধুতে বিন্দুর মতো" idiomatically as "like a drop in the ocean".',
        'Translate "একাদশী ঘটত" contextually as "days of forced fasting occurred" rather than a literal religious gloss.',
      ],
      sampleAnswerTitle: 'Model English Translation (Sri Aurobindo Passage — Q.3a)',
      sampleAnswerBody: `Right from his student days, Sri Aurobindo had endured considerable hardship. Compared to that, the sufferings of his prison life were perhaps like a drop in the ocean. His father had sent him to England to study for the I.C.S., but owing to a shortage of funds, he often could not even get proper meals. In that bitterly cold country, he had to pass the winter days without an overcoat. Days of forced fasting occurred almost every week. Because of such lifelong adversity, the hardships of Alipore Jail never seemed unbearable to him.`,
    },
    steps: [
      {
        title: 'Idiomatic Precision',
        explanation:
          'Note how "সিন্ধুতে বিন্দুর মতো" is rendered naturally as "like a drop in the ocean".',
      },
    ],
  },
  {
    id: 'mains-2020-supp-gb-q1',
    paperId: 'mains-2020-set4',
    paperShortTitle: 'Mains 2020 Supp. (SFCP/19)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-2019-Set-4_199741ce.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-B · Q.1 (Sub-parts ১ক & ১খ)',
    seriesNumbers: { A: 4, B: 4, C: 4, D: 4 },
    pdfPages: { A: 4, B: 4, C: 4, D: 4 },
    category: 'Descriptive & Translation',
    subTopic: 'Bengali Report Writing / বাংলা প্রতিবেদন (Group-B)',
    questionEn:
      '১। যে-কোনো একটি বিষয়ে অনধিক ২০০ শব্দে প্রতিবেদন রচনা করুন (১৫ নম্বর):\n(ক) লকডাউনে বিশ্ববিদ্যালয়ের ছাত্র ও গবেষকদের উদ্যোগে দরিদ্র মানুষের জন্য কমিউনিটি কিচেন (যৌথ রান্নাঘর) পরিচালনা বিষয়ে প্রতিবেদন।\n(খ) দুর্গাপুজোর জাঁকজমকের খরচ বাঁচিয়ে আমপান বিধ্বস্ত অঞ্চলের মানুষের পাশে দাঁড়ানো বিষয়ে একটি প্রতিবেদন।',
    directAnswerSummary:
      'প্রশ্ন ১-এর দুটি বিকল্পেরই (১ক: ছাত্র-গবেষকদের কমিউনিটি কিচেন এবং ১খ: পুজোর খরচ বাঁচিয়ে আমপান বিধ্বস্তদের ত্রাণ) পূর্ণাঙ্গ বাংলা প্রতিবেদন।',
    keyFormulaOrConcept: 'বাংলা সংবাদপত্র প্রতিবেদন | অনধিক ২০০ শব্দ | ১৫ নম্বর',
    descriptiveGuide: {
      formatType: 'Report Writing',
      marks: 15,
      wordLimitOrTarget: 'অনধিক ২০০ শব্দ (প্রতিটি বিকল্প)',
      outlineStructure: [
        'বিকল্প ১(ক) [কমিউনিটি কিচেন]: লকডাউনে কাজ হারানো অসহায় মানুষের পাশে বিশ্ববিদ্যালয়ের ছাত্র ও গবেষকরা— বৃত্তির ও টিউশনির টাকা জমিয়ে যৌথ রান্নাঘর পরিচালনা ও প্রতিদিন ৫০০ মানুষের অন্নসংস্থান।',
        'বিকল্প ১(খ) [আমপান ত্রাণে পুজো কমিটি]: দুর্গাপুজোর আলোকসজ্জা ও আড়ম্বরের বাজেট ছাঁটাই করে সুন্দরবনের আমপান-বিধ্বস্ত গ্রামে ত্রিপল, পানীয় জল, বইখাতা ও নতুন বস্ত্র বিতরণ।',
      ],
      keyThemesAndArguments: [
        '১(ক): যুবসমাজের সামাজিক দায়বদ্ধতা ও মানবিক উদ্যোগ।',
        '১(খ): উৎসবের বাহ্যিক আড়ম্বরের চেয়ে আর্ত মানুষের সেবাই প্রকৃত মানবধর্ম।',
      ],
      sampleAnswerTitle: 'বিকল্প ১(ক): লকডাউনে ক্ষুধার্ত মানুষের পাশে ছাত্র-গবেষকদের ‘কমিউনিটি কিচেন’',
      sampleAnswerBody: `নিজস্ব সংবাদদাতা, কলকাতা, ১৫ ডিসেম্বর: অতিমারি ও লকডাউনের জেরে কাজ হারানো অসংখ্য দিনমজুর, রিকশাচালক ও ফুটপাতবাসীর মুখে প্রতিদিন দু-বেলা অন্ন তুলে দিতে এগিয়ে এলেন শহরের নামী বিশ্ববিদ্যালয়ের ছাত্রছাত্রী ও গবেষকেরা। নিজেদের বৃত্তির টাকা, টিউশনির সামান্য আয় এবং এলাকার সহৃদয় মানুষদের অনুদান একত্রিত করে তাঁরা গড়ে তুলেছেন ‘যৌথ রান্নাঘর’ বা কমিউনিটি কিচেন।

গত দুই মাস ধরে যাদবপুর ও সংলগ্ন এলাকার একটি পরিত্যক্ত ক্লাবঘরে স্বাস্থ্যবিধি ও শারীরিক দূরত্ব বজায় রেখে প্রতিদিন সকালে এই রান্নার কর্মযজ্ঞ শুরু হচ্ছে। ছাত্র-গবেষকেরা নিজেরাই বাজার করা, সবজি কাটা, রান্না এবং প্যাকেটজাত করার দায়িত্ব সামলাচ্ছেন। প্রতিদিন দুপুরে প্রায় পাঁচশো দুস্থ মানুষ ও শিশুর হাতে গরম ভাত, ডাল, সবজি ও ডিমের পুষ্টিকর খাবার তুলে দেওয়া হচ্ছে। পাশাপাশি বয়স্ক ও অসুস্থ মানুষদের বাড়িতেও খাবার পৌঁছে দিচ্ছেন স্বেচ্ছাসেবকেরা। ছাত্রসমাজের এই নিঃস্বার্থ মানবিক উদ্যোগ সর্বস্তরের মানুষের অকুণ্ঠ প্রশংসা কুড়িয়েছে।`,
      secondarySampleBody: `বিকল্প ১(খ): পুজোর জাঁকজমক ছেঁটে আমপান-বিধ্বস্ত সুন্দরবনের পাশে শহরের পুজো কমিটি

নিজস্ব সংবাদদাতা, কলকাতা, ১৫ ডিসেম্বর: বিধ্বংসী ঘূর্ণিঝড় আমপানের তাণ্ডবে ঘরবাড়ি ও জীবিকা হারানো সুন্দরবনের প্রান্তিক মানুষদের পাশে দাঁড়াতে এ বছর এক অনন্য মানবিক নজির গড়ল দক্ষিণ কলকাতার একাধিক সর্বজনীন দুর্গাপুজো কমিটি। থিমের জাঁকজমক ও চন্দননগরের আলোকসজ্জার বিপুল খরচ কাটছাঁট করে সেই অর্থ সরাসরি ত্রাণ ও পুনর্নির্মাণের কাজে ব্যয় করার সিদ্ধান্ত নিয়েছেন উদ্যোক্তারা।

গত রবিবার পুজো কমিটির সদস্যদের একটি প্রতিনিধি দল উত্তর ও দক্ষিণ ২৪ পরগনার সন্দেশখালি ও গোসাবার প্রত্যন্ত গ্রামগুলিতে পৌঁছে পাঁচ শতাধিক ক্ষতিগ্রস্ত পরিবারের হাতে ত্রিপল, শুকনো খাবার, শিশুখাদ্য, নতুন বস্ত্র এবং ছাত্রছাত্রীদের জন্য বই-খাতা তুলে দেন। এছাড়া নোনা জলে প্লাবিত এলাকায় মিষ্টি পানীয় জলের দুটি নলকূপও সংস্কার করে দেওয়া হয়েছে। উৎসবের আড়ম্বরের চেয়ে বিপন্ন মানুষের মুখে হাসি ফোটানোই যে মা দুর্গার প্রকৃত আরাধনা, তা প্রমাণ করলেন পুজো উদ্যোক্তারা।`,
    },
    subParts: [
      {
        partId: 'supp-gb-1a',
        partLabel: 'বিকল্প ১(ক) — ছাত্র-গবেষকদের কমিউনিটি কিচেন',
        promptEn:
          'লকডাউনে বিশ্ববিদ্যালয়ের ছাত্র ও গবেষকদের উদ্যোগে দরিদ্র মানুষের জন্য কমিউনিটি কিচেন পরিচালনা বিষয়ে প্রতিবেদন রচনা করুন।',
        descriptiveGuide: {
          formatType: 'Report Writing',
          marks: 15,
          wordLimitOrTarget: 'অনধিক ২০০ শব্দ',
          outlineStructure: [
            'শিরোনাম: লকডাউনে ক্ষুধার্ত মানুষের পাশে ছাত্র-গবেষকদের ‘কমিউনিটি কিচেন’।',
            'বিবরণ: বৃত্তির টাকা ও অনুদানে যৌথ রান্নাঘর এবং প্রতিদিন পাঁচশো দুস্থ মানুষকে খাদ্য বিতরণ।',
          ],
          keyThemesAndArguments: ['ছাত্র ও গবেষকদের সামাজিক দায়বদ্ধতা।'],
          sampleAnswerTitle: 'লকডাউনে ক্ষুধার্ত মানুষের পাশে ছাত্র-গবেষকদের ‘কমিউনিটি কিচেন’',
          sampleAnswerBody: `নিজস্ব সংবাদদাতা, কলকাতা, ১৫ ডিসেম্বর: অতিমারি ও লকডাউনের জেরে কাজ হারানো অসংখ্য দিনমজুর, রিকশাচালক ও ফুটপাতবাসীর মুখে প্রতিদিন দু-বেলা অন্ন তুলে দিতে এগিয়ে এলেন শহরের নামী বিশ্ববিদ্যালয়ের ছাত্রছাত্রী ও গবেষকেরা। নিজেদের বৃত্তির টাকা, টিউশনির সামান্য আয় এবং এলাকার সহৃদয় মানুষদের অনুদান একত্রিত করে তাঁরা গড়ে তুলেছেন ‘যৌথ রান্নাঘর’ বা কমিউনিটি কিচেন।

গত দুই মাস ধরে যাদবপুর ও সংলগ্ন এলাকার একটি পরিত্যক্ত ক্লাবঘরে স্বাস্থ্যবিধি ও শারীরিক দূরত্ব বজায় রেখে প্রতিদিন সকালে এই রান্নার কর্মযজ্ঞ শুরু হচ্ছে। ছাত্র-গবেষকেরা নিজেরাই বাজার করা, সবজি কাটা, রান্না এবং প্যাকেটজাত করার দায়িত্ব সামলাচ্ছেন। প্রতিদিন দুপুরে প্রায় পাঁচশো দুস্থ মানুষ ও শিশুর হাতে গরম ভাত, ডাল, সবজি ও ডিমের পুষ্টিকর খাবার তুলে দেওয়া হচ্ছে। পাশাপাশি বয়স্ক ও অসুস্থ মানুষদের বাড়িতেও খাবার পৌঁছে দিচ্ছেন স্বেচ্ছাসেবকেরা। ছাত্রসমাজের এই নিঃস্বার্থ মানবিক উদ্যোগ সর্বস্তরের মানুষের অকুণ্ঠ প্রশংসা কুড়িয়েছে।`,
        },
      },
      {
        partId: 'supp-gb-1b',
        partLabel: 'বিকল্প ১(খ) — পুজোর খরচ বাঁচিয়ে আমপান ত্রাণ',
        promptEn:
          'দুর্গাপুজোর জাঁকজমকের খরচ বাঁচিয়ে আমপান বিধ্বস্ত অঞ্চলের মানুষের পাশে দাঁড়ানো বিষয়ে একটি প্রতিবেদন রচনা করুন।',
        descriptiveGuide: {
          formatType: 'Report Writing',
          marks: 15,
          wordLimitOrTarget: 'অনধিক ২০০ শব্দ',
          outlineStructure: [
            'শিরোনাম: পুজোর জাঁকজমক ছেঁটে আমপান-বিধ্বস্ত সুন্দরবনের পাশে শহরের পুজো কমিটি।',
            'বিবরণ: আলোকসজ্জা ও থিমের খরচ বাঁচিয়ে সুন্দরবনের ক্ষতিগ্রস্ত গ্রামে ত্রাণ ও নলকূপ সংস্কার।',
          ],
          keyThemesAndArguments: ['আড়ম্বরের চেয়ে মানবসেবাই শ্রেষ্ঠ উৎসব।'],
          sampleAnswerTitle: 'পুজোর জাঁকজমক ছেঁটে আমপান-বিধ্বস্ত সুন্দরবনের পাশে শহরের পুজো কমিটি',
          sampleAnswerBody: `নিজস্ব সংবাদদাতা, কলকাতা, ১৫ ডিসেম্বর: বিধ্বংসী ঘূর্ণিঝড় আমপানের তাণ্ডবে ঘরবাড়ি ও জীবিকা হারানো সুন্দরবনের প্রান্তিক মানুষদের পাশে দাঁড়াতে এ বছর এক অনন্য মানবিক নজির গড়ল দক্ষিণ কলকাতার একাধিক সর্বজনীন দুর্গাপুজো কমিটি। থিমের জাঁকজমক ও চন্দননগরের আলোকসজ্জার বিপুল খরচ কাটছাঁট করে সেই অর্থ সরাসরি ত্রাণ ও পুনর্নির্মাণের কাজে ব্যয় করার সিদ্ধান্ত নিয়েছেন উদ্যোক্তারা।

গত রবিবার পুজো কমিটির সদস্যদের একটি প্রতিনিধি দল উত্তর ও দক্ষিণ ২৪ পরগনার সন্দেশখালি ও গোসাবার প্রত্যন্ত গ্রামগুলিতে পৌঁছে পাঁচ শতাধিক ক্ষতিগ্রস্ত পরিবারের হাতে ত্রিপল, শুকনো খাবার, শিশুখাদ্য, নতুন বস্ত্র এবং ছাত্রছাত্রীদের জন্য বই-খাতা তুলে দেন। এছাড়া নোনা জলে প্লাবিত এলাকায় মিষ্টি পানীয় জলের দুটি নলকূপও সংস্কার করে দেওয়া হয়েছে। উৎসবের আড়ম্বরের চেয়ে বিপন্ন মানুষের মুখে হাসি ফোটানোই যে মা দুর্গার প্রকৃত আরাধনা, তা প্রমাণ করলেন পুজো উদ্যোক্তারা।`,
        },
      },
    ],
    steps: [
      {
        title: 'Parent Question Organization',
        explanation:
          'বিকল্প ১(ক) ও ১(খ) মূল প্রশ্ন ১-এর অধীনে একত্রে সুবিন্যস্ত করা হয়েছে।',
      },
    ],
  },
  {
    id: 'mains-2020-supp-gb-q2',
    paperId: 'mains-2020-set4',
    paperShortTitle: 'Mains 2020 Supp. (SFCP/19)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-2019-Set-4_199741ce.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-B · Q.2',
    seriesNumbers: { A: 5, B: 5, C: 5, D: 5 },
    pdfPages: { A: 4, B: 4, C: 4, D: 4 },
    category: 'Descriptive & Translation',
    subTopic: 'Bengali Précis / সারসংক্ষেপ (Group-B)',
    questionEn:
      '২। নীচের অনুচ্ছেদটির সারসংক্ষেপ করুন (১৫ নম্বর): "লোকে নানা কারণে বই পড়ে। কেউ পড়ে মনের আনন্দে, কেউ পড়ে জ্ঞানীর খ্যাতি পাওয়ার লোভে, আবার কেউ পড়ে কেবল পরীক্ষায় পাশ করার তাগিদে। পাঠক হিসেবে আমরা প্রায় সকলেই খানিকটা ভণ্ড। সাহিত্যের প্রতি এই কৃত্রিম ও উদ্দেশ্যপ্রণোদিত মনোভাবের কারণেই অধিকাংশ পাঠক গ্রন্থপাঠের প্রকৃত রসাস্বাদন থেকে বঞ্চিত হয়।"',
    directAnswerSummary:
      'লোকদেখানো খ্যাতি বা পরীক্ষায় পাশের তাগিদে বই পড়ার ফলে প্রকৃত সাহিত্যরস থেকে বঞ্চিত হওয়া বিষয়ে সারসংক্ষেপ।',
    keyFormulaOrConcept: 'শিরোনাম + এক-তৃতীয়াংশ শব্দে মূলভাব (১৫ নম্বর)',
    descriptiveGuide: {
      formatType: 'Précis / Summary Writing',
      marks: 15,
      wordLimitOrTarget: '~৩৮–৪২ শব্দ',
      outlineStructure: [
        'শিরোনাম: "পাঠকের ভণ্ডামি ও প্রকৃত গ্রন্থপাঠ"।',
        'মূল বক্তব্য: নিছক আনন্দের পরিবর্তে খ্যাতি অর্জন বা পরীক্ষায় উত্তীর্ণ হওয়ার স্বার্থে বই পড়ার কৃত্রিম প্রবণতা অধিকাংশ পাঠককে সাহিত্যের প্রকৃত আনন্দ থেকে বঞ্চিত করে।',
      ],
      keyThemesAndArguments: [
        'নিঃস্বার্থ ও অকৃত্রিম সাহিত্যপাঠই প্রকৃত আনন্দ দেয়।',
      ],
      sampleAnswerTitle: 'শিরোনাম: পাঠকের ভণ্ডামি ও প্রকৃত গ্রন্থপাঠ',
      sampleAnswerBody: `মানুষ কেবল আনন্দের জন্য নয়, বরং অনেক সময় জ্ঞানীর খ্যাতি অর্জন, সামাজিক মর্যাদা বৃদ্ধি কিংবা পরীক্ষায় উত্তীর্ণ হওয়ার বাধ্যবাধকতা থেকে বই পড়ে। সাহিত্যের প্রতি এই কৃত্রিম ও উদ্দেশ্যপ্রণোদিত মনোভাবের কারণেই অধিকাংশ পাঠক বই পড়ে পরিপূর্ণ আনন্দ লাভে ব্যর্থ হয়। (৪০ শব্দ)`,
    },
    steps: [
      {
        title: 'সারসংক্ষেপ নির্দেশিকা',
        explanation:
          'প্রশ্নপত্রের ক্রম অনুযায়ী ২ নম্বর প্রশ্ন হিসেবে স্বতন্ত্রভাবে সূচিবদ্ধ করা হয়েছে।',
      },
    ],
  },
  {
    id: 'mains-2020-supp-gb-q3',
    paperId: 'mains-2020-set4',
    paperShortTitle: 'Mains 2020 Supp. (SFCP/19)',
    pdfUrl: '/assets/aistudio/WBPSC-Clerkship-2019-Set-4_199741ce.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-B · Q.3',
    seriesNumbers: { A: 6, B: 6, C: 6, D: 6 },
    pdfPages: { A: 5, B: 5, C: 5, D: 5 },
    category: 'Descriptive & Translation',
    subTopic: 'English to Bengali Translation / বঙ্গানুবাদ (Group-B)',
    questionEn:
      '৩। চলিত বাংলায় অনুবাদ করুন (২০ নম্বর): "Ishwar Chandra Vidyasagar was always vocal about the women who were subjected to oppression by society at that time. Because of this, he became unpopular with the conservative section of society. Yet despite such opposition, he continued his struggle for the welfare of women. He realized that without spreading education, it was impossible to remove social superstitions and improve the condition of women. Therefore, he established numerous girls\' schools across Bengal and ran them at his own expense. At the same time, he made tireless efforts to legalize the remarriage of widows."',
    directAnswerSummary:
      'ঈশ্বরচন্দ্র বিদ্যাসাগরের নারীশিক্ষা বিস্তার ও বিধবাবিবাহ আন্দোলন বিষয়ক অনুচ্ছেদের প্রামাণ্য চলিত বাংলা অনুবাদ।',
    keyFormulaOrConcept: 'চলিত বাংলা গদ্যে ভাবানুবাদ (২০ নম্বর)',
    descriptiveGuide: {
      formatType: 'Translation',
      marks: 20,
      wordLimitOrTarget: 'সম্পূর্ণ অনুচ্ছেদের চলিত বাংলা অনুবাদ',
      outlineStructure: [
        'প্রথম অংশ: সমাজ-নিপীড়িত নারীদের অধিকার রক্ষায় বিদ্যাসাগরের সরব ভূমিকা এবং রক্ষণশীল সমাজের বিরোধিতা।',
        'দ্বিতীয় অংশ: কুসংস্কার দূরীকরণে নারীশিক্ষার অপরিহার্যতা উপলব্ধি এবং নিজ ব্যয়ে বালিকা বিদ্যালয় প্রতিষ্ঠা।',
        'উপসংহার: বিধবাবিবাহ আইনসিদ্ধ করার নিরলস সংগ্রাম।',
      ],
      keyThemesAndArguments: [
        '"subjected to oppression" = "চরম নিপীড়নের শিকার" | "conservative section" = "রক্ষণশীল অংশ" | "tireless efforts" = "নিরলস প্রচেষ্টা"।',
      ],
      sampleAnswerTitle: 'চলিত বাংলায় আদর্শ অনুবাদ (Ishwar Chandra Vidyasagar Passage)',
      sampleAnswerBody: `তৎকালীন সমাজে যেসব নারী চরম নিপীড়নের শিকার হতেন, তাঁদের অধিকার রক্ষায় ঈশ্বরচন্দ্র বিদ্যাসাগর সর্বদাই সরব ছিলেন। এই কারণে সমাজের রক্ষণশীল অংশের মানুষের কাছে তিনি অপ্রিয় হয়ে উঠেছিলেন। কিন্তু সেই বিরোধিতা সত্ত্বেও তিনি নারীদের কল্যাণে নিজের সংগ্রাম চালিয়ে যান। তিনি উপলব্ধি করেছিলেন যে শিক্ষার প্রসার ঘটানো ছাড়া সমাজের কুসংস্কার দূর করা এবং নারীদের অবস্থার উন্নতি ঘটানো সম্ভব নয়। তাই তিনি বাংলা জুড়ে অসংখ্য বালিকা বিদ্যালয় প্রতিষ্ঠা করেন এবং নিজের খরচে সেগুলি পরিচালনা করতে থাকেন। একইসঙ্গে বিধবাদের পুনর্বিবাহ আইনসিদ্ধ করার জন্যও তিনি নিরলস প্রচেষ্টা চালিয়েছিলেন।`,
    },
    steps: [
      {
        title: 'চলিত বাংলা গদ্যশৈলী',
        explanation:
          'বিদ্যাসাগর অনুচ্ছেদটি সহজ, মার্জিত ও প্রামাণ্য চলিত বাংলা গদ্যে অনুবাদ করা হয়েছে।',
      },
    ],
  },

  // =========================================================================
  // 4. WBPSC CLERKSHIP MAINS 2015 (GROUP-A & GROUP-B)
  // File: /assets/aistudio/WBPSC_Clerkship_Main_Question_Paper_2015_e5c710a1.pdf
  // Official Parent Questions: 6 (Group-A: Q.1, Q.2, Q.3 | Group-B: Q.1, Q.2, Q.3)
  // =========================================================================
  {
    id: 'mains-2015-q1',
    paperId: 'mains-2015',
    paperShortTitle: 'Mains 2015 (Group A & B)',
    pdfUrl: '/assets/aistudio/WBPSC_Clerkship_Main_Question_Paper_2015_e5c710a1.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-A · Q.1',
    seriesNumbers: { A: 1, B: 1, C: 1, D: 1 },
    pdfPages: { A: 1, B: 1, C: 1, D: 1 },
    category: 'Descriptive & Translation',
    subTopic: 'English Report Writing (2015 Group-A)',
    questionEn:
      '1. Write a newspaper report based on the following hints (20 Marks): [Incident: Boat capsized in the Hooghly — Date & Place: 10th Sept 2012, Haldia, Kukrahati, Midnapore — Casualties: 32 feared dead, 10 bodies recovered — Cause: Overloaded country boat in rough tide — Effect: Local agitation, highway blocked]',
    directAnswerSummary:
      'Newspaper incident report covering the overloaded boat capsize tragedy in the Hooghly river near Kukrahati jetty, rescue operations, and highway blockade.',
    keyFormulaOrConcept: 'Newspaper Incident Report | ~160 Words | 20 Marks',
    descriptiveGuide: {
      formatType: 'Report Writing',
      marks: 20,
      wordLimitOrTarget: '~160 words',
      outlineStructure: [
        'Headline: "Overloaded Boat Capsizes in Hooghly at Kukrahati; 32 Feared Dead".',
        'Lead Paragraph: Date (Sept 10, 2012), location (Kukrahati jetty, Haldia, East Midnapore), and core tragedy.',
        'Body Paragraph: Overloaded motorized country boat carrying 60+ passengers caught in rough tidal waves; 10 bodies recovered by disaster management divers.',
        'Conclusion: Local agitation against unlicenced boats, 4-hour blockade on Haldia-Mecheda Highway, and administrative assurance.',
      ],
      keyThemesAndArguments: [
        'Use crisp past-tense journalistic reporting integrating all 5 prompt hints seamlessly.',
      ],
      sampleAnswerTitle: 'Overloaded Boat Capsizes in Hooghly at Kukrahati; 32 Feared Dead',
      sampleAnswerBody: `By a Staff Reporter

Haldia (East Midnapore), September 11, 2012: In a grim river tragedy, at least thirty-two passengers were feared drowned after an overloaded motorized country boat capsized midstream in the Hooghly river near Kukrahati jetty in Haldia yesterday afternoon.

According to eyewitnesses, the ill-fated vessel was carrying over sixty passengers along with bicycles and goods—far exceeding its safe capacity—when it was caught in a violent whirlpool and high tidal waves. While local fishermen managed to rescue several swimmers, ten bodies, including those of women and children, have been recovered so far by disaster management divers.

Following the tragedy, irate locals staged a massive demonstration and blocked the Haldia-Mecheda State Highway for four hours, alleging administrative apathy, lack of life-jackets, and unchecked plying of unlicenced country boats. Senior district officials rushed to the spot, announced ex-gratia compensation for the victims' families, and ordered a magisterial inquiry.`,
    },
    steps: [
      {
        title: 'Parent Question 1 (2015 Group-A)',
        explanation:
          'Individually indexed as Q.1 (20 Marks) of the 2015 Group-A English paper.',
      },
    ],
  },
  {
    id: 'mains-2015-q2',
    paperId: 'mains-2015',
    paperShortTitle: 'Mains 2015 (Group A & B)',
    pdfUrl: '/assets/aistudio/WBPSC_Clerkship_Main_Question_Paper_2015_e5c710a1.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-A · Q.2',
    seriesNumbers: { A: 2, B: 2, C: 2, D: 2 },
    pdfPages: { A: 1, B: 1, C: 1, D: 1 },
    category: 'Descriptive & Translation',
    subTopic: 'English Précis Writing (2015 Group-A)',
    questionEn:
      '2. Write a précis of the following passage and add a suitable title (15 Marks): Passage contrasting the unjust concentration of wealth among a handful of millionaires in modern capitalist society with genuine national welfare defined by equitable distribution and the greater good of the greatest number.',
    directAnswerSummary:
      'One-third précis (~52 words) with title explaining that true national prosperity lies in equitable distribution rather than concentrated wealth.',
    keyFormulaOrConcept: 'One-Third Précis + Suitable Title (15 Marks)',
    descriptiveGuide: {
      formatType: 'Précis / Summary Writing',
      marks: 15,
      wordLimitOrTarget: '~52 words',
      outlineStructure: [
        'Title: "Wealth Distribution and True Human Welfare".',
        'Point 1: In capitalist societies, wealth is concentrated among a privileged few while the working majority endures hardship.',
        'Point 2: Genuine national progress is measured not by the count of millionaires, but by equitable distribution ensuring the greatest good for all citizens.',
      ],
      keyThemesAndArguments: [
        'Contrast concentration of capital with utilitarian social welfare.',
      ],
      sampleAnswerTitle: 'Title: Wealth Distribution and True Human Welfare',
      sampleAnswerBody: `In modern capitalist societies, wealth is unjustly concentrated in the hands of a privileged few while the working masses suffer in poverty. True national prosperity cannot be measured merely by a handful of millionaires; rather, genuine economic progress lies in equitable distribution that secures the greatest good for the largest number of citizens. (53 words)`,
    },
    steps: [
      {
        title: 'Parent Question 2 (2015 Group-A)',
        explanation:
          'Individually indexed as Q.2 (15 Marks) of the 2015 Group-A English paper.',
      },
    ],
  },
  {
    id: 'mains-2015-q3',
    paperId: 'mains-2015',
    paperShortTitle: 'Mains 2015 (Group A & B)',
    pdfUrl: '/assets/aistudio/WBPSC_Clerkship_Main_Question_Paper_2015_e5c710a1.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-A · Q.3',
    seriesNumbers: { A: 3, B: 3, C: 3, D: 3 },
    pdfPages: { A: 2, B: 2, C: 2, D: 2 },
    category: 'Descriptive & Translation',
    subTopic: 'Bengali to English Translation (2015 Group-A)',
    questionEn:
      '3. Translate into English (15 Marks): "বিজ্ঞান-পাঠ এখন ছাত্রদের কাছে একটি উন্মাদনা। উচ্চমাধ্যমিক স্তরে যে-কোনো মূল্যেই হোক বিজ্ঞান পড়ার সুযোগ পেতেই হবে। কিন্তু এই উন্মাদনার পিছনে বিশুদ্ধ বিজ্ঞানের প্রতি প্রকৃত ভালোবাসা খুব কমই দেখা যায়। অধিকাংশ ছাত্র ও অভিভাবকের কাছে বিজ্ঞান পড়া হলো ডাক্তারি বা ইঞ্জিনিয়ারিং কলেজে ঢোকার সিঁড়ি মাত্র। ফলে যাদের বিজ্ঞানে প্রকৃত প্রবণতা নেই তারাও বিজ্ঞানের ক্লাসে ভিড় জমাচ্ছে, আর সাহিত্য ও মানবিকী বিদ্যা অবহেলিত হচ্ছে।"',
    directAnswerSummary:
      'Idiomatic English translation of the Bengali passage on students\' utilitarian obsession with studying science merely as a stepping stone to medical or engineering careers.',
    keyFormulaOrConcept: 'Expository Bengali-to-English Translation (15 Marks)',
    descriptiveGuide: {
      formatType: 'Translation',
      marks: 15,
      wordLimitOrTarget: 'Full passage translation (5 sentences)',
      outlineStructure: [
        'Sentence 1–2: Science education as a "craze/obsession" ("উন্মাদনা") at the Higher Secondary level.',
        'Sentence 3–4: Lack of genuine love for pure science; treating science merely as a "stepping stone" ("সিঁড়ি মাত্র") to medical or engineering colleges.',
        'Sentence 5: Overcrowding by students lacking aptitude and consequent neglect of humanities and literature.',
      ],
      keyThemesAndArguments: [
        'উন্মাদনা = craze/obsession | বিশুদ্ধ বিজ্ঞান = pure science | সিঁড়ি মাত্র = merely a stepping stone | প্রকৃত প্রবণতা = real aptitude.',
      ],
      sampleAnswerTitle: 'Model English Translation (Science Craze Passage — 2015 Q.3)',
      sampleAnswerBody: `Studying science has now become a craze among students. At the Higher Secondary level, one must secure an opportunity to study science at any cost. Yet behind this obsession, there is scarcely any genuine love for pure science. For most students and their guardians, studying science is merely a stepping stone to entering medical or engineering colleges. Consequently, those who lack any real aptitude for science are also crowding into science streams, while humanities and literature subjects are being neglected.`,
    },
    steps: [
      {
        title: 'Parent Question 3 (2015 Group-A)',
        explanation:
          'Individually indexed as Q.3 (15 Marks) of the 2015 Group-A English paper.',
      },
    ],
  },
  {
    id: 'mains-2015-gb-q1',
    paperId: 'mains-2015',
    paperShortTitle: 'Mains 2015 (Group A & B)',
    pdfUrl: '/assets/aistudio/WBPSC_Clerkship_Main_Question_Paper_2015_e5c710a1.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-B · Q.1',
    seriesNumbers: { A: 4, B: 4, C: 4, D: 4 },
    pdfPages: { A: 3, B: 3, C: 3, D: 3 },
    category: 'Descriptive & Translation',
    subTopic: 'English to Bengali Translation / বঙ্গানুবাদ (2015 Group-B)',
    questionEn:
      '১। বাংলায় অনুবাদ করুন (১৫ নম্বর): "In Indian economy agriculture is a major source of national income. Till 1950 it contributed more than 50 percent to the national income. Even today, though the share of industry and service sectors has increased, the majority of Indians still depend on agriculture for their livelihood. Moreover, major industries of our country like cotton, sugar and jute depend on agriculture for their raw materials."',
    directAnswerSummary:
      'ভারতীয় অর্থনীতিতে কৃষির অবদান, জীবিকা ও শিল্পের কাঁচামালের উৎস বিষয়ক অনুচ্ছেদের প্রামাণ্য বঙ্গানুবাদ।',
    keyFormulaOrConcept: 'ইংরেজি থেকে চলিত বাংলা অনুবাদ (১৫ নম্বর)',
    descriptiveGuide: {
      formatType: 'Translation',
      marks: 15,
      wordLimitOrTarget: 'সম্পূর্ণ অনুচ্ছেদের বাংলা অনুবাদ',
      outlineStructure: [
        'বাক্য ১–২: জাতীয় আয়ের প্রধান উৎস হিসেবে কৃষি এবং ১৯৫০ সাল পর্যন্ত ৫০ শতাংশের অধিক অবদান।',
        'বাক্য ৩–৪: সংখ্যাগরিষ্ঠ ভারতীয়ের জীবিকার ভিত্তি এবং বস্ত্র, চিনি ও পাট শিল্পের কাঁচামালের জোগানদার।',
      ],
      keyThemesAndArguments: [
        '"national income" = "জাতীয় আয়" | "raw materials" = "কাঁচামাল"।',
      ],
      sampleAnswerTitle: 'বাংলায় আদর্শ অনুবাদ (Indian Agriculture Passage — 2015 Group-B Q.1)',
      sampleAnswerBody: `ভারতীয় অর্থনীতিতে কৃষি হলো জাতীয় আয়ের এক প্রধান উৎস। ১৯৫০ সাল পর্যন্ত জাতীয় আয়ে কৃষির অবদান ছিল ৫০ শতাংশেরও বেশি। বর্তমানে শিল্প ও পরিষেবা ক্ষেত্রের প্রসারের ফলে এই অনুপাত কিছুটা হ্রাস পেলেও, ভারতের সংখ্যাগরিষ্ঠ মানুষ আজও জীবনধারণের জন্য কৃষির ওপরেই নির্ভরশীল। এছাড়া আমাদের দেশের বস্ত্র, চিনি ও পাট শিল্পের মতো প্রধান শিল্পগুলির প্রয়োজনীয় কাঁচামালও এই কৃষিক্ষেত্র থেকেই পাওয়া যায়।`,
    },
    steps: [
      {
        title: 'Parent Question 1 (2015 Group-B)',
        explanation:
          '২০১৫ মেইনস গ্রুপ-বি (বাংলা)-র ১ নম্বর প্রশ্ন হিসেবে স্বতন্ত্রভাবে সূচিবদ্ধ।',
      },
    ],
  },
  {
    id: 'mains-2015-gb-q2',
    paperId: 'mains-2015',
    paperShortTitle: 'Mains 2015 (Group A & B)',
    pdfUrl: '/assets/aistudio/WBPSC_Clerkship_Main_Question_Paper_2015_e5c710a1.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-B · Q.2',
    seriesNumbers: { A: 5, B: 5, C: 5, D: 5 },
    pdfPages: { A: 3, B: 3, C: 3, D: 3 },
    category: 'Descriptive & Translation',
    subTopic: 'Bengali Report Writing / বাংলা প্রতিবেদন (2015 Group-B)',
    questionEn:
      '২। সংবাদপত্রে প্রকাশের উপযোগী একটি প্রতিবেদন রচনা করুন (২০ নম্বর): "কলিকাতার হকারদের উপযুক্ত পুনর্বাসনের প্রয়োজনীয়তা"।',
    directAnswerSummary:
      'কলকাতার ফুটপাতে হকার সমস্যা, পথচারীদের দুর্ভোগ এবং উচ্ছেদের পরিবর্তে মানবিক ও পরিকল্পিত পুনর্বাসনের প্রয়োজনীয়তা বিষয়ে বাংলা প্রতিবেদন।',
    keyFormulaOrConcept: 'বাংলা সংবাদপত্র প্রতিবেদন | ~১৭০ শব্দ | ২০ নম্বর',
    descriptiveGuide: {
      formatType: 'Report Writing',
      marks: 20,
      wordLimitOrTarget: '~১৭০ শব্দ',
      outlineStructure: [
        'শিরোনাম: কলকাতায় হকার সমস্যার স্থায়ী সমাধানে প্রয়োজন পরিকল্পিত পুনর্বাসন।',
        'প্রথম অনুচ্ছেদ: ধর্মতলা, গড়িয়াহাট, হাতিবাগান ও স্টেশন চত্বরে ফুটপাত জবরদখল এবং পথচারীদের ঝুঁকি ও যানজট।',
        'দ্বিতীয় অনুচ্ছেদ: লক্ষাধিক শ্রমজীবী মানুষের রুটিরুজির দিকটি বিবেচনা করে সুনির্দিষ্ট হকার জোন, বহুতল হকার মার্কেট ও পরিচয়পত্র প্রদানের মাধ্যমে পরিকল্পিত পুনর্বাসন।',
      ],
      keyThemesAndArguments: [
        'বলপূর্বক উচ্ছেদ নয়, বরং সুনির্দিষ্ট হকার জোন ও পরিকল্পিত পুনর্বাসনই নাগরিক স্বাচ্ছন্দ্য ও জীবিকার মধ্যে ভারসাম্য আনতে পারে।',
      ],
      sampleAnswerTitle: 'কলকাতায় হকার সমস্যার স্থায়ী সমাধানে প্রয়োজন পরিকল্পিত পুনর্বাসন',
      sampleAnswerBody: `নিজস্ব সংবাদদাতা, কলকাতা: মহানগরী কলকাতার রাজপথ, ফুটপাত ও শহরতলির রেলস্টেশন চত্বর আজ হকারদের পসরায় প্রায় অবরুদ্ধ। ধর্মতলা, গড়িয়াহাট, হাতিবাগান থেকে শুরু করে শিয়ালদহ ও হাওড়া স্টেশন সংলগ্ন এলাকায় ফুটপাতের সিংহভাগই হকারদের দখলে চলে যাওয়ায় সাধারণ পথচারীদের জীবনের ঝুঁকি নিয়ে মূল রাস্তা দিয়ে চলাচল করতে হচ্ছে। এর ফলে নিত্যদিন যানজট ও দুর্ঘটনার আশঙ্কা বাড়ছে।

তবে এই সমস্যার অপর পিঠে রয়েছে লক্ষাধিক শ্রমজীবী মানুষের রুটিরুজির প্রশ্ন। কর্মসংস্থানের অভাবে অসংখ্য মানুষ ক্ষুদ্র হকারি পেশার ওপর নির্ভরশীল। তাই বলপূর্বক উচ্ছেদ কখনোই এই জটিল আর্থ-সামাজিক সমস্যার স্থায়ী সমাধান হতে পারে না। অর্থনীতিবিদ ও নগর-পরিকল্পনাবিদদের মতে, পথচারীদের চলাচলের অধিকার অক্ষুণ্ণ রেখেই হকারদের জন্য উপযুক্ত পুনর্বাসন ও সুনির্দিষ্ট ‘হকার জোন’ গড়ে তোলা জরুরি। ফুটপাতের নির্দিষ্ট অংশ চিহ্নিতকরণ, বহুতল হকার মার্কেট নির্মাণ এবং পরিচয়পত্র প্রদানের মাধ্যমেই শহরের যানজট মুক্তি ও হকারদের জীবিকা সুরক্ষা— দুই-ই নিশ্চিত করা সম্ভব।`,
    },
    steps: [
      {
        title: 'Parent Question 2 (2015 Group-B)',
        explanation:
          '২০১৫ মেইনস গ্রুপ-বি (বাংলা)-র ২ নম্বর প্রশ্ন হিসেবে স্বতন্ত্রভাবে সূচিবদ্ধ।',
      },
    ],
  },
  {
    id: 'mains-2015-gb-q3',
    paperId: 'mains-2015',
    paperShortTitle: 'Mains 2015 (Group A & B)',
    pdfUrl: '/assets/aistudio/WBPSC_Clerkship_Main_Question_Paper_2015_e5c710a1.pdf',
    autoType: 'descriptive-model-guide',
    parentQuestionLabel: 'Group-B · Q.3',
    seriesNumbers: { A: 6, B: 6, C: 6, D: 6 },
    pdfPages: { A: 4, B: 4, C: 4, D: 4 },
    category: 'Descriptive & Translation',
    subTopic: 'Bengali Précis / সারসংক্ষেপ (2015 Group-B)',
    questionEn:
      '৩। সারসংক্ষেপ করুন (১৫ নম্বর): "গ্রন্থপাঠ আমাদের মহত্তর সুন্দরতর জীবন-রচনার অপরিহার্য অঙ্গ। বই পড়ার মধ্য দিয়াই মানুষ নিজের ক্ষুদ্র গণ্ডি অতিক্রম করিয়া বিশ্বমানবের চিন্তার সহিত যুক্ত হয়। মনে রাখিতে হইবে, যে জাতির জ্ঞানের ভাণ্ডার শূন্য সে জাতির ধনের ভাঁড়েও ভবানী।" (প্রমথ চৌধুরী)',
    directAnswerSummary:
      'প্রমথ চৌধুরীর গ্রন্থপাঠ ও জ্ঞানচর্চার গুরুত্ব বিষয়ক অনুচ্ছেদের এক-তৃতীয়াংশ সারসংক্ষেপ।',
    keyFormulaOrConcept: 'শিরোনাম + এক-তৃতীয়াংশ সারসংক্ষেপ (১৫ নম্বর)',
    descriptiveGuide: {
      formatType: 'Précis / Summary Writing',
      marks: 15,
      wordLimitOrTarget: '~৩৫–৪০ শব্দ',
      outlineStructure: [
        'শিরোনাম: "জাতীয় জীবনে গ্রন্থপাঠ ও জ্ঞানচর্চার গুরুত্ব"।',
        'মূল বক্তব্য: সুন্দর জীবন গঠন ও মনের সংকীর্ণতা মুক্তির জন্য গ্রন্থপাঠ অপরিহার্য; জ্ঞানচর্চার সমৃদ্ধি ছাড়া কোনো জাতির বৈষয়িক উন্নতি সম্ভব নয়।',
      ],
      keyThemesAndArguments: [
        '"যে জাতির জ্ঞানের ভাণ্ডার শূন্য সে জাতির ধনের ভাঁড়েও ভবানী" প্রবচনটির মূল অর্থ সহজ চলিত ভাষায় প্রকাশ করতে হবে।',
      ],
      sampleAnswerTitle: 'শিরোনাম: জাতীয় জীবনে গ্রন্থপাঠ ও জ্ঞানচর্চার গুরুত্ব',
      sampleAnswerBody: `সুন্দর ও মহৎ জীবন গঠনের জন্য গ্রন্থপাঠ অপরিহার্য। বই পড়ার মাধ্যমেই মানুষের মনের সংকীর্ণতা দূর হয় এবং সুপ্ত চিন্তাশক্তির বিকাশ ঘটে। প্রকৃতপক্ষে, যে জাতির জ্ঞানের ভাণ্ডার শূন্য, সে জাতি কখনোই আর্থিক ও বৈষয়িক সমৃদ্ধি অর্জন করতে পারে না। (৩৯ শব্দ)`,
    },
    steps: [
      {
        title: 'Parent Question 3 (2015 Group-B)',
        explanation:
          '২০১৫ মেইনস গ্রুপ-বি (বাংলা)-র ৩ নম্বর প্রশ্ন হিসেবে স্বতন্ত্রভাবে সূচিবদ্ধ।',
      },
    ],
  },
];
