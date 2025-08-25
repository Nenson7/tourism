import { useState } from "react";
import { motion } from 'framer-motion'
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

// Sample blog posts data (you'll need to define this)
const BLOG_POSTS = [
  {
    id: 1,
    title: "अलाउद्दीनको बत्ती, चियाको पत्ती र भालुढुङ्गा कस्ती ?",
    excerpt: "Journey through the tea gardens and pristine landscapes of Nepal's eastern district.",
    author: "रामकुमार शाह",
    date: "२०६९ मंसिर ३",
    readTime: "5 min read",
    image: "Tea Gardens",
    content: `प्रिय जय, यस पटकको दशैं बिदाका बेला इलाम बजारदेखि आधा घण्टाको समयमा पैदलै हिडेर पुगिने भालुढुङ्गातिर घुम्न गएको थिए । चियाबारी बीचमा रेलिङ्गबाटो हुँदै दायाँबायाँ चियाका पत्तीहरूको सुगन्धित र मनमोहक वातावरणमा रम्दै जाँदा अझ रमाइलो हुन्छ ।  यहाँ अजङ्गको विशाल गोलो आकारको ढुङ्गा रहेको छ । यस ढुङ्गालाई भालुढुङ्गा भन्ने गरिएको हुनाले सो ढुङ्गा रहेको स्थान वरिपरिको ठाउँलाई नै भालुढुङ्गा भन्ने गरिएको छ । करिब १३ हेक्टर क्षेत्रफल ओगटेको भालुढुङ्गा क्षेत्र जङ्गलले ढाकिएकोे छ । यस भालुढुङ्गाको माथिल्लो भागबाट पश्चिमतर्पm हेर्दा पुवाखोलाको नागवेली दृश्य मनमोहक देखिन्छ भने पारिपटिृको तोरीबारी क्षेत्रको दृश्य पनि राम्रो देखिन्छ । पर्यटकहरूको सुविधाका लागि गोलो आकारको चौतारो पनि बनाइएको छ । यहाँबाट १५ मिनेटमा चुरघाँटी हुँदै धेछेन छ्योग ग्युरलिङ्ग गुम्वा पुग्न सकिन्छ ।
यस भालुढुङ्गाको तत्लो भागमा गुफा रहेको छ । गुफा भित्र पस्ने द्वार साँगुरो भए पनि भित्र फराकिलो छ । वरिपरि विभिन्न प्रजाति सल्ला, धुपी, चिलाउने जस्ता वनस्पति रहेको यस ठाउँमा विभिन्न प्रजातिका चराचुरुङ्गीको मधुरो ध्वनि सुन्न सकिन्छ । जेहोस् इलामबजारदेखि नजिकै रहेको यस स्थललाई एउटा पर्यटकीय स्थल बनाउनका लागि भालुढुङ्गा सामुदायिक वन उपभोक्ता समूहले पहल गरिरहेको छ । 
भालुढुङ्गा सामुदायिक वन उपभोक्ता समूहले आप्mनो क्षेत्रबाट पहल गरिरहे पनि अहिलेको अवस्थामा त्यो पर्याप्त छैन । यसका लागि उपभोक्ता समूहले सर्वप्रथम भालुढुङ्गा क्षेत्रको विस्तृत अध्ययन गराई गुरुयोजना तयार गर्नु पर्छ । सो गुरुयोजना तयार भएपछि मात्र सो ठाउँलाई कस्तो बनाउने भन्ने कुराको निक्र्यौल गर्न सकिन्छ । यद्यपि गुरुयोजनाको तयारीमा छलफल गर्दा उपयुक्त हुने केही सुझावहरू उल्लेख गरेको छु ।
प्रिय जय, भालुढुङ्गा क्षेत्रलाई पर्यटकहरूको लागि एउटा आकर्षकको केन्द्र बनाउन वर्तमानमा त्यहाँ भएका पूर्वाधारहरू अपर्याप्त छन् । सबै भन्दा पहिलो सो ठाउँमा रहेको चौतारोलाई पुनः निर्माण गरेर आकर्षक चौतारो बनाई भालुढुङ्गाको माथिल्लो भागमा फलामे रेलिङ्ग लगाउनु पर्छ । सो ढुङ्गादेखि तलसम्म जङ्गलैजङ्गल भएकोले आकर्षक ढङ्गले जङ्गलको बीच भाग पारेर पर्यटक हिडने सिढी र सो सिढीको दायाँबायाँ फलामे रेलिङ्ग लगाउनु पर्छ र सो रेलिङ्गको ठाउँ ठाउँमा जङ्गलको पर्यावरणलाई असर नपारी ससाना चौतारा अर्थात सेडहरू आकर्षक तथा कलात्मक शैलीमा निर्माण गर्नु पर्दछ । यस्ता सेडहरू बनाउने ठाउँ चयन गर्दा खुला रहेको ठाउँ चयन गर्नु उपयुक्त हुनेछ । गुफाको मुखलाई खुला राख्नु भन्दा यहाँ फलामे ढोका बनाउनु उचित हुनेछ ।
	भालुढुङ्गादेखि उत्तर पश्चिम कुनोतिर केही फराकिलो अवस्थामा रहेको जमिनलाई व्यवस्थापन गरी बालबालिकाहरूको लागि पार्क बनाउन सकिन्छ । सो पार्कमा बालबालिकाहरूको लागि चिप्लेटी जस्ता खेल्न सकिने ठाउँ बनाउनु पर्छ । यसैगरी हालको जङ्गलको स्वरूपलाई असर नगरी केही ठाउँ लिएर वरिपरि कम्तीमा १० फुटको गेवियन जालीले घेराबारा गरेर सो ठाउँमा दुईचार वटा मृगहरू राखिदिएमा त्यस ठाउँले एउटा सानो मसिनो चिडियाखानाको आवश्यकता पूरा गर्न सक्छ । 
	जङ्गलमा थप विभिन्न प्रजातिका बोटविरुवा लगाउनु पर्छ, सडकको दायाँबायाँ मौसम अनुसार फलपूmलका विरुवाहरू लगाएमा यसले थप आकर्षण दिन्छ । जङ्गलमा रहेका ठूला ठूला बोटहरूमा सो बोटको वैज्ञानिक नाम, स्थानीय नाम उल्लेख गरिएको ट्याग लगाइएमा जिज्ञासुहरूलाई यसले स्वतः सूचना दिन्छ । भालुढुङ्गा क्षेत्रको गुरुयोजना तयार गर्दा नजिकै रहेको धेछेन छ्योग ग्युरलिङ्ग गुम्वा, बालनगाउँको लिम्बु संस्कृति अवलोकन क्षेत्र र तोरीबारीस्थित गुरुकुललाई पनि समेटेर बनाइएमा गुरुयोजनाको क्षेत्र व्यापक हुन्छ । तोरीबारीस्थित गुरुकुल पूर्वीय वाङ्मय÷साहित्य अध्ययन र धेछेन छ्योग ग्युरलिङ्ग गुम्वामा बौद्ध दर्शनको साहित्य अध्ययनका लागि एउटा आकर्षणको केन्द्र हुन सक्छ ।
भालुढुङ्गा क्षेत्रलाई पर्यटकको लागि आकर्षणको स्थल बनाउने र यसलाई आर्थिक उपार्जनको एउटा स्रोत बनाउने कार्य निश्चय पनि सजिलो कार्य छैन । न त भालुढुङ्गा सामुदायिक वन उपभोक्ता समिति एक्लैले यसलाई तयार गर्न सक्छ, यसका लागि सरोकारवाला सबै क्षेत्रको यसमा सहयोग जुटाउनु महत्वपूर्ण हुनेछ ।  यस पटकको भालुढुङ्गा अवलोकनमा भाइ कृष्ण शाहसँगै थिए । गढीगाउँ बाटामा भालुढुङ्गा सामुदायिक वन उपभोक्ता समूहका अध्यक्ष कृष्ण कडेल र सिंगफ्रिङ्ग खुलालगाउँका गणेश राउत पनि हामीसँगै भए, भालुढुङ्गा क्षेत्रको पर्यटकीय विकासका लागि गर्नु पर्ने र गर्न सकिने कामहरूका बारेमा कुराकानी गर्दै फर्कदा ३ घण्टा बितेको पत्तै भएन ।
भालुढुङ्गा सामुदायिक वन उपभोक्ता समूहले सर्वप्रथम गुरुयोजना बनाउने कार्यको थालनी गर्नु पर्छ, इलाम घुम्न आउने पर्यटकहरूलाई घुमाउनका लागि लैजानु पर्छ, बसपार्कमा रहेको पर्यटन सूचना केन्द्रमा प्रचारप्रसार सामग्री राख्नु पर्छ । इलामका होटल व्यवसायीहरूलाई भालुढुङ्गा क्षेत्रमा भेला गरेर पर्यटक पठाउन उत्प्रेरित गर्नु पर्दछ । भालुढुङ्गा क्षेत्रको वन वनस्पति, चराचुरुङ्गी तथा जीवजन्तुहरूको संरक्षण गर्नु पर्छ । बालनगाउँमा ‘होम स्टे’ लाई प्रवद्र्धन गर्नु पर्छ । विकास अभियानका अभियन्ताहरूको सहयोग जुटाउनु पर्छ । यस्तैयस्तै गर्न सकिने कुरा धेरै गर्नु पर्छ । यति गर्न सकिए नेपालको सबेैभन्दा पुरानो चियाबारी अवलोकन गर्दा १ घण्टा बिताउने पर्यटकलाई इलाम बजारको सेरोफेरोमा थप ३।४ घण्टा भुल्याउन सकिनेछ । यसै बीच सिंगफ्रिङ्ग खुलालगाउँका गणेश राउत भन्दै थिए, “हामी पनि महभिरलाई पर्यटकको आकर्षणको केन्द्र बनाउन छलफल गर्दैछौ” ।`
  }
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackToBlog = () => {
    setSelectedPost(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // If a post is selected, show the full article
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navigation
          isHeroVisible={false}
          activeSection=""
          handleNavClick={() => {}}
        />

        <section className="section-padding bg-white pt-20">
          <div className="container mx-auto px-2 sm:px-3 md:px-4 py-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={handleBackToBlog}
                className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm flex items-center"
              >
                ← Back to Blog
              </button>

              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                  {selectedPost.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                  <span>By {selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                  <span>•</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {selectedPost.category}
                  </span>
                </div>
              </div>

              <div className="prose max-w-none">
                {selectedPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </div>
    );
  }

  // Main blog listing page
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation
        isHeroVisible={false}
        activeSection=""
        handleNavClick={() => {}}
      />

      <section id="blog" className="section-padding bg-gray-50 relative pt-20">
        <div className="container mx-auto px-2 sm:px-3 md:px-4 py-10">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Discover Ilam</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Stories, experiences, and insights from Nepal's beautiful eastern district
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            {BLOG_POSTS.map((post, index) => (
              <motion.div
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="h-64 bg-gradient-to-br from-green-400 to-blue-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <span className="text-white text-xs px-2 py-1 bg-black bg-opacity-50 rounded">
                      Image: {post.image}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}