'use client';

import { useParams, Link, Navigate } from "./routerShim";
import { CITY_REDIRECTS } from "../data/cityRedirects";
import { ArrowRight, CheckCircle, Star, Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CheckScoreButton } from "./CheckScoreModal";
import { SEOHead, ORG_SCHEMA, faqSchema, breadcrumbSchema } from "./SEOHead";
import { HowItWorks } from "./HowItWorks";

/* ── City data ──────────────────────────────────────────────── */
export const CITIES: Record<string, {
  name: string;
  state: string;
  headline: string;
  description: string;
  localFact: string;
  population: string;
  pincode: string;
  areas: string[];
  faqs: { q: string; a: string }[];
}> = {
  "bengaluru": {
    name: "Bengaluru", state: "Karnataka",
    headline: "Credit Consultant in Bengaluru — CIBIL Score Repair & Loan Advisory",
    description: "Bengaluru's most trusted credit repair and financial advisory service. We help IT professionals, startup founders and salaried individuals improve their CIBIL score and get the best loan deals.",
    localFact: "Bengaluru has one of India's highest concentrations of salaried IT professionals — yet many struggle with credit issues due to job changes or multiple loan enquiries.",
    population: "13 million+", pincode: "560001–560118",
    areas: ["Jayanagar", "Koramangala", "Indiranagar", "Whitefield", "HSR Layout", "Marathahalli", "JP Nagar", "Electronic City", "Yelahanka", "Rajajinagar"],
    faqs: [
      { q: "How long does CIBIL repair take in Bengaluru?", a: "Most Bengaluru clients see a score improvement of 80–150 points within 3–6 months of starting our program." },
      { q: "Can I get a home loan in Bengaluru with a low CIBIL score?", a: "Yes — we work with multiple lenders in Bengaluru who offer loans for scores as low as 650 with the right guidance." },
      { q: "Do you have a physical office in Bengaluru?", a: "Yes — our office is at 184, 15, 5th Main Rd, 4th Block, Jayanagar, Bengaluru 560011." },
    ],
  },
  "mumbai": {
    name: "Mumbai", state: "Maharashtra",
    headline: "Credit Consultant in Mumbai — CIBIL Score Improvement & Home Loan Advisory",
    description: "Mumbai's leading credit repair specialists. Whether you're in the financial district of BKC, the suburbs of Thane or Navi Mumbai, we help you achieve your credit goals and secure the best loan rates.",
    localFact: "Mumbai's high property prices mean home loan eligibility is critical — even a 50-point improvement in your CIBIL score can save you lakhs in interest.",
    population: "21 million+", pincode: "400001–400107",
    areas: ["Andheri", "Bandra", "Powai", "Thane", "Navi Mumbai", "Dadar", "Worli", "Borivali", "Malad", "Kurla"],
    faqs: [
      { q: "Can you help me get a home loan in Mumbai with a low score?", a: "Absolutely. We've helped hundreds of Mumbai clients secure home loans at competitive rates after improving their CIBIL scores." },
      { q: "How do I dispute errors in my CIBIL report in Mumbai?", a: "Our team handles the full dispute process with credit bureaus on your behalf — you don't need to visit any office." },
      { q: "Do you serve Navi Mumbai and Thane?", a: "Yes — we serve all Mumbai Metropolitan Region clients remotely with zero need for in-person visits." },
    ],
  },
  "delhi": {
    name: "Delhi", state: "Delhi NCR",
    headline: "Credit Consultant in Delhi — CIBIL Score Repair & Personal Loan Advisory",
    description: "Delhi NCR's trusted credit repair and loan advisory experts. From Connaught Place to Dwarka, Noida to Gurgaon — we help Delhi residents fix their credit and access the best financial products.",
    localFact: "Delhi NCR has one of the highest personal loan default rates in India — our advisors specialize in helping residents recover and rebuild their credit profiles.",
    population: "32 million+", pincode: "110001–110096",
    areas: ["Connaught Place", "Lajpat Nagar", "Dwarka", "Rohini", "Noida", "Gurgaon", "Faridabad", "Ghaziabad", "Saket", "Vasant Kunj"],
    faqs: [
      { q: "Can you fix my CIBIL score in Delhi NCR?", a: "Yes — our Delhi clients typically see improvements of 100–200 points within 6 months through our structured credit repair program." },
      { q: "Do you serve Noida and Gurgaon?", a: "Yes — we serve the entire NCR region including Noida, Gurgaon, Faridabad and Ghaziabad with remote advisory services." },
      { q: "What is the minimum CIBIL score for a home loan in Delhi?", a: "Most lenders require 700+ for best rates. We specialise in getting clients from below 650 to loan-eligible scores." },
    ],
  },
  "chennai": {
    name: "Chennai", state: "Tamil Nadu",
    headline: "Credit Consultant in Chennai — CIBIL Score Repair & Home Loan Experts",
    description: "Chennai's premier credit advisory service. We help government employees, IT professionals and business owners in Chennai repair their credit scores and access the best home and business loan products.",
    localFact: "Chennai has a high rate of home loan uptake — with properties in OMR, Anna Nagar and Velachery in high demand, a good CIBIL score is essential.",
    population: "11 million+", pincode: "600001–600130",
    areas: ["Anna Nagar", "T. Nagar", "Velachery", "OMR", "Adyar", "Porur", "Ambattur", "Chromepet", "Tambaram", "Perambur"],
    faqs: [
      { q: "How can I improve my CIBIL score in Chennai?", a: "Our Chennai advisors create a personalised plan addressing payment history, credit utilisation and error disputes — results in 90–180 days." },
      { q: "Do you help with business loans in Chennai?", a: "Yes — we help Chennai SMEs and proprietors build business credit profiles to access working capital and term loans." },
      { q: "Is your service available in areas like OMR and Velachery?", a: "Yes — our services are fully remote. Clients anywhere in Chennai can access our full advisory program online." },
    ],
  },
  "hyderabad": {
    name: "Hyderabad", state: "Telangana",
    headline: "Credit Consultant in Hyderabad — CIBIL Score Repair & Loan Advisory",
    description: "Hyderabad's trusted credit repair and financial planning experts. From HITEC City to Secunderabad, we help tech professionals and business owners improve their CIBIL scores and access the best loans.",
    localFact: "Hyderabad's booming real estate in Gachibowli, Kondapur and HITEC City has driven massive home loan demand — your CIBIL score determines your eligibility and interest rate.",
    population: "10 million+", pincode: "500001–500098",
    areas: ["HITEC City", "Gachibowli", "Kondapur", "Banjara Hills", "Jubilee Hills", "Secunderabad", "Kukatpally", "Madhapur", "Miyapur", "LB Nagar"],
    faqs: [
      { q: "Can I get a home loan in Hyderabad with a CIBIL score below 700?", a: "Yes — we work with lenders in Hyderabad who offer structured loan products for applicants with scores between 650–700." },
      { q: "How long does credit repair take in Hyderabad?", a: "Our Hyderabad clients typically see results in 3–5 months depending on the nature of their credit issues." },
      { q: "Do you help with IT professional loans in Hyderabad?", a: "Yes — we specialise in helping HITEC City and IT corridor professionals with quick personal and home loan approvals." },
    ],
  },
  "pune": {
    name: "Pune", state: "Maharashtra",
    headline: "Credit Consultant in Pune — CIBIL Score Improvement & Loan Experts",
    description: "Pune's leading credit repair specialists serving IT hubs, educational zones and manufacturing corridors. We help Pune residents achieve financial freedom through proven credit repair strategies.",
    localFact: "Pune's rapid growth in Hinjewadi, Wakad and Kharadi has created huge demand for home loans — a strong CIBIL score is your most valuable financial asset.",
    population: "7 million+", pincode: "411001–411062",
    areas: ["Hinjewadi", "Kharadi", "Wakad", "Baner", "Kothrud", "Viman Nagar", "Hadapsar", "Shivajinagar", "Deccan", "Aundh"],
    faqs: [
      { q: "Do you serve clients in Hinjewadi IT Park area?", a: "Yes — many of our Pune clients are IT professionals in Hinjewadi and Kharadi. We offer fully remote services." },
      { q: "How can I improve my credit score in Pune?", a: "We start with a free credit analysis, identify negative items and create a step-by-step improvement plan targeting 80–150 point gains." },
      { q: "Can you help with car loans in Pune?", a: "Yes — Pune has excellent car loan options and we help clients get approvals at the lowest rates through score improvement." },
    ],
  },
  "kolkata": {
    name: "Kolkata", state: "West Bengal",
    headline: "Credit Consultant in Kolkata — CIBIL Score Repair & Loan Advisory",
    description: "Kolkata's trusted credit repair and financial advisory experts. We help business owners, government employees and salaried professionals across Kolkata and West Bengal improve their credit profiles.",
    localFact: "Kolkata's growing real estate market in Newtown, Rajarhat and Salt Lake is driving home loan demand — your credit score is the key to unlocking the best rates.",
    population: "15 million+", pincode: "700001–700107",
    areas: ["Salt Lake", "Newtown", "Rajarhat", "Park Street", "Ballygunge", "Howrah", "Behala", "Dum Dum", "Jadavpur", "Alipore"],
    faqs: [
      { q: "Can you repair my CIBIL score in Kolkata?", a: "Yes — we help Kolkata clients recover from defaults, settlements and errors with a proven 3–6 month credit repair program." },
      { q: "Is there demand for business credit services in Kolkata?", a: "Yes — many Kolkata businesses use our services to build vendor credit and access working capital loans." },
      { q: "Do you serve clients in Howrah and Newtown?", a: "Yes — our fully remote service covers all Kolkata Metropolitan Area including Howrah, Salt Lake and Rajarhat." },
    ],
  },
  "ahmedabad": {
    name: "Ahmedabad", state: "Gujarat",
    headline: "Credit Consultant in Ahmedabad — CIBIL Score Repair & Business Loan Experts",
    description: "Ahmedabad's premier credit and business loan advisory service. We help Gujarat's thriving business community and professionals build strong credit profiles to fuel their growth.",
    localFact: "Ahmedabad's entrepreneurial spirit means business credit is in high demand — our specialists help Gujarat SMEs build credit profiles that unlock financing at the best rates.",
    population: "8 million+", pincode: "380001–382481",
    areas: ["SG Highway", "Bodakdev", "Prahlad Nagar", "Satellite", "Navrangpura", "CG Road", "Vastrapur", "Maninagar", "Gota", "Thaltej"],
    faqs: [
      { q: "How do I improve my CIBIL score for a business loan in Ahmedabad?", a: "We create a tailored plan including dispute resolution, utilisation management and bureau reporting to boost your score in 90–180 days." },
      { q: "Do you help Gujarati businesses with credit?", a: "Yes — we specialise in helping Ahmedabad and Gujarat SMEs, manufacturers and traders build business credit lines." },
      { q: "Can you help with home loans in Ahmedabad?", a: "Yes — we have partnerships with leading lenders in Ahmedabad offering competitive rates for buyers with good credit profiles." },
    ],
  },
  "jaipur": {
    name: "Jaipur", state: "Rajasthan",
    headline: "Credit Consultant in Jaipur — CIBIL Score Repair & Home Loan Advisory",
    description: "Jaipur's trusted credit repair and loan advisory specialists. Whether you're buying a home in Mansarovar, growing a business on MI Road or managing finances in Vaishali Nagar — we're here to help.",
    localFact: "Jaipur's real estate growth in areas like Mansarovar, Vaishali Nagar and Jagatpura is creating high loan demand — a good CIBIL score ensures the best interest rates.",
    population: "4 million+", pincode: "302001–303901",
    areas: ["Mansarovar", "Vaishali Nagar", "Malviya Nagar", "C-Scheme", "Bani Park", "Jagatpura", "Tonk Road", "Ajmer Road", "Sirsi Road", "Sanganer"],
    faqs: [
      { q: "Can I get a home loan in Jaipur with low CIBIL score?", a: "Our Jaipur clients have secured home loans after improving their scores by 80–150 points through our structured program." },
      { q: "Do you help traders and shopkeepers in Jaipur?", a: "Yes — we help Jaipur's trading community build business credit and access working capital at competitive rates." },
      { q: "How long does credit repair take in Jaipur?", a: "Typically 3–6 months for significant results, with some quick wins in the first 30–45 days through error removal." },
    ],
  },
  "lucknow": {
    name: "Lucknow", state: "Uttar Pradesh",
    headline: "Credit Consultant in Lucknow — CIBIL Score Repair & Loan Experts",
    description: "Lucknow's premier credit advisory service helping government employees, business owners and professionals improve their CIBIL scores and access the best home, personal and business loans.",
    localFact: "Lucknow's growing IT and real estate sectors have created significant loan demand — government employees especially benefit from credit repair to access the best housing loan rates.",
    population: "4 million+", pincode: "226001–226030",
    areas: ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Mahanagar", "Alambagh", "Vikas Nagar", "Chinhat", "Jankipuram", "Telibagh"],
    faqs: [
      { q: "Do you help government employees in Lucknow?", a: "Yes — many of our Lucknow clients are government employees who qualify for special home loan schemes once their CIBIL score is improved." },
      { q: "Can you dispute CIBIL errors for Lucknow residents?", a: "Yes — we handle the full dispute process remotely, covering all Lucknow residents without any office visits required." },
      { q: "What is the cost of credit repair in Lucknow?", a: "Our plans start at very competitive rates. Contact us for a free consultation and personalised quote." },
    ],
  },
  "kochi": {
    name: "Kochi", state: "Kerala",
    headline: "Credit Consultant in Kochi — CIBIL Score Repair & Loan Advisory",
    description: "Kochi's trusted credit repair experts helping NRIs, professionals and business owners across Kerala improve their credit scores and access the best loan products from top Indian banks.",
    localFact: "Kochi has a large NRI population with complex credit needs — our experts handle NRI credit profiles and help returning expats access home loans at the best rates.",
    population: "3 million+", pincode: "682001–682310",
    areas: ["Ernakulam", "Kakkanad", "Edapally", "Aluva", "Thripunithura", "Fort Kochi", "Vytila", "Palarivattom", "Thrikkakara", "Kalamassery"],
    faqs: [
      { q: "Do you help NRIs with credit issues in Kerala?", a: "Yes — we specialise in NRI credit profiles, helping returning expats and overseas Indians access home loans in Kochi and Kerala." },
      { q: "Can I improve my CIBIL score in Kochi?", a: "Yes — our Kochi clients see improvements of 80–150 points within 3–6 months through our structured credit repair program." },
      { q: "Do you serve clients in Thrissur and Calicut?", a: "Yes — our services cover all of Kerala remotely with no in-person visits required." },
    ],
  },
  "surat": {
    name: "Surat", state: "Gujarat",
    headline: "Credit Consultant in Surat — CIBIL Score Repair & Business Loan Experts",
    description: "Surat's diamond and textile businesses deserve the best financial products. Our credit experts help Surat's entrepreneurs and professionals build strong credit profiles to access business and home loans.",
    localFact: "Surat is India's diamond capital with booming textile and chemical industries — business credit building is essential for accessing the growth capital these industries need.",
    population: "7 million+", pincode: "395001–395023",
    areas: ["Adajan", "Vesu", "Pal", "Katargam", "Varachha", "Udhna", "Rander", "Piplod", "Dumas", "Athwa"],
    faqs: [
      { q: "Do you help diamond and textile businesses in Surat?", a: "Yes — we specialise in business credit for Surat's trading community, helping access working capital and trade finance." },
      { q: "How can I get a business loan in Surat?", a: "We build your business credit profile and connect you with Surat lenders offering the best working capital and term loan rates." },
      { q: "Can you help improve home loan eligibility in Surat?", a: "Yes — a 50–100 point CIBIL improvement can significantly change your loan eligibility and interest rate in Surat." },
    ],
  },
  "chandigarh": {
    name: "Chandigarh", state: "Punjab & Haryana",
    headline: "Credit Consultant in Chandigarh — CIBIL Score Repair & Loan Advisory",
    description: "Chandigarh's premier credit advisory service covering the tricity area of Chandigarh, Mohali and Panchkula. We help government employees, professionals and business owners achieve their credit goals.",
    localFact: "Chandigarh's tricity area has high home loan demand with properties in Mohali and Panchkula — a strong CIBIL score is critical for accessing the best bank rates.",
    population: "1.2 million+", pincode: "160001–160101",
    areas: ["Sector 17", "Sector 35", "Sector 43", "Mohali", "Panchkula", "Zirakpur", "Kharar", "Derabassi", "Manimajra", "IT Park"],
    faqs: [
      { q: "Do you serve Mohali and Panchkula?", a: "Yes — our advisory service covers the entire Chandigarh tricity region including Mohali, Panchkula and Zirakpur." },
      { q: "Can government employees in Chandigarh benefit from credit repair?", a: "Yes — even government employees can have CIBIL issues from past loans or errors. We help resolve them quickly." },
      { q: "How fast can I get a home loan in Chandigarh after credit repair?", a: "Most clients are loan-ready within 3–6 months of starting our program, with some getting approvals in as little as 60 days." },
    ],
  },
  "nagpur": {
    name: "Nagpur", state: "Maharashtra",
    headline: "Credit Consultant in Nagpur — CIBIL Score Repair & Loan Experts",
    description: "Nagpur's trusted credit repair specialists serving central India. We help Orange City residents improve their CIBIL scores and access the best home, business and personal loans available.",
    localFact: "Nagpur's status as India's zero mile city and MIHAN development has created strong real estate and business loan demand — credit score is your gateway to the best financing.",
    population: "3 million+", pincode: "440001–440035",
    areas: ["Sitabuldi", "Dharampeth", "Civil Lines", "Wardha Road", "Besa", "Hingna", "Manish Nagar", "Bajaj Nagar", "Sadar", "Pratap Nagar"],
    faqs: [
      { q: "Can you help with MIHAN project financing in Nagpur?", a: "Yes — we help Nagpur businesses and professionals access credit for MIHAN and MIDC area projects and properties." },
      { q: "How do I improve CIBIL score in Nagpur?", a: "Our Nagpur clients see 80–150 point improvements in 3–6 months through targeted credit repair and debt management." },
      { q: "Do you offer services in areas like Wardha Road and Besa?", a: "Yes — our fully remote service covers all Nagpur areas without any in-person visits required." },
    ],
  },
  "coimbatore": {
    name: "Coimbatore", state: "Tamil Nadu",
    headline: "Credit Consultant in Coimbatore — CIBIL Score Repair & Business Loan Advisory",
    description: "Coimbatore's Manchester of India deserves the best credit advisory. We help textile, manufacturing and IT businesses along with salaried professionals improve their credit and access growth capital.",
    localFact: "Coimbatore's textile and manufacturing industries rely heavily on business credit — our advisors specialise in building commercial credit profiles for Tamil Nadu's industrial heartland.",
    population: "2.5 million+", pincode: "641001–641062",
    areas: ["RS Puram", "Gandhipuram", "Peelamedu", "Saibaba Colony", "Singanallur", "Tidel Park", "Hopes College", "Kovaipudur", "Vadavalli", "Ondipudur"],
    faqs: [
      { q: "Do you help textile businesses in Coimbatore with credit?", a: "Yes — we specialise in business credit for Coimbatore's textile and manufacturing community, including trade credit and working capital." },
      { q: "Can you help with home loans in Coimbatore?", a: "Yes — Coimbatore's growing residential market offers great options for buyers with strong CIBIL scores that we help build." },
      { q: "How long does credit improvement take in Coimbatore?", a: "Typically 90–180 days for significant score improvements, with some dispute-based wins in the first 30–45 days." },
    ],
  },
  "visakhapatnam": {
    name: "Visakhapatnam", state: "Andhra Pradesh",
    headline: "Credit Consultant in Visakhapatnam — CIBIL Score Repair & Loan Advisory",
    description: "Vizag's trusted credit repair and financial advisory service. We help navy personnel, port workers, IT professionals and business owners across Visakhapatnam achieve their financial goals.",
    localFact: "Visakhapatnam's growth as Andhra Pradesh's industrial and IT hub means loan demand is high — a strong credit score opens doors to the best home and business loan products.",
    population: "2 million+", pincode: "530001–530053",
    areas: ["MVP Colony", "Madhurawada", "Gajuwaka", "Steel Plant Area", "Dwaraka Nagar", "Seethammadhara", "Rushikonda", "Bheemunipatnam", "Asilmetta", "Kommadi"],
    faqs: [
      { q: "Do you help defence personnel in Vizag with credit?", a: "Yes — we specialise in helping navy and army personnel in Vizag access the best defence housing loan schemes through credit improvement." },
      { q: "Can you help IT professionals in Rushikonda with loans?", a: "Yes — our Vizag IT corridor clients benefit from our personal and home loan advisory services." },
      { q: "How do I repair my CIBIL score in Visakhapatnam?", a: "Contact us for a free credit analysis — we create a personalised plan targeting 80–150 point improvements in 3–6 months." },
    ],
  },

  // ── NORTH ────────────────────────────────────────────────────
  "amritsar": {
    name: "Amritsar", state: "Punjab",
    headline: "Credit Consultant in Amritsar — CIBIL Score Repair & Loan Advisory",
    description: "Amritsar's trusted credit repair and loan advisory experts helping traders, business owners and salaried professionals improve their CIBIL scores and access the best financial products.",
    localFact: "Amritsar's thriving trade and tourism sector means business credit is essential — our advisors help local businesses access working capital and term loans at competitive rates.",
    population: "1.2 million+", pincode: "143001–143105",
    areas: ["Lawrence Road", "Ranjit Avenue", "Civil Lines", "GT Road", "Majitha Road", "Batala Road", "Green Avenue", "Sultanwind", "Chheharta", "Kot Khalsa"],
    faqs: [
      { q: "Can you repair my CIBIL score in Amritsar?", a: "Yes — our Amritsar clients typically see 80–140 point improvements in 3–5 months through our structured credit repair program." },
      { q: "Do you help traders and businesses in Amritsar?", a: "Yes — we specialise in building business credit for Amritsar's trading and manufacturing community." },
      { q: "Is your service available remotely in Amritsar?", a: "Yes — our full advisory service is available remotely with no office visit required." },
    ],
  },
  "ludhiana": {
    name: "Ludhiana", state: "Punjab",
    headline: "Credit Consultant in Ludhiana — CIBIL Score Repair & Business Loan Experts",
    description: "Ludhiana's leading credit advisory service. Punjab's industrial capital has a thriving business community that deserves the best financial products — we help you access them.",
    localFact: "Ludhiana is Punjab's industrial hub with major textile and manufacturing industries — business credit is critical for growth financing in this market.",
    population: "1.6 million+", pincode: "141001–141013",
    areas: ["Model Town", "Sarabha Nagar", "BRS Nagar", "Dugri", "Civil Lines", "Ferozepur Road", "Pakhowal Road", "Shaheed Bhagat Singh Nagar", "Bhai Randhir Singh Nagar", "Haibowal"],
    faqs: [
      { q: "Do you help Ludhiana manufacturers with business credit?", a: "Yes — we specialise in business credit profiles for Ludhiana's textile, hosiery and manufacturing sectors." },
      { q: "How can I get a home loan in Ludhiana?", a: "Improve your CIBIL score with our help and we'll connect you with lenders offering the best home loan rates in Punjab." },
      { q: "How long does CIBIL repair take in Ludhiana?", a: "Most Ludhiana clients see results in 90–150 days depending on their credit profile." },
    ],
  },
  "dehradun": {
    name: "Dehradun", state: "Uttarakhand",
    headline: "Credit Consultant in Dehradun — CIBIL Score Repair & Home Loan Advisory",
    description: "Dehradun's trusted credit advisory specialists helping government employees, IT professionals and real estate buyers access the best loan deals in Uttarakhand's growing capital city.",
    localFact: "Dehradun's rapid growth as an IT and education hub is driving real estate and personal loan demand — a strong CIBIL score is your key to the best rates.",
    population: "800,000+", pincode: "248001–248198",
    areas: ["Rajpur Road", "Clement Town", "Patel Nagar", "Vasant Vihar", "Dalanwala", "Saharanpur Road", "Indira Nagar", "Sewla Kalan", "Niranjanpur", "Ballupur"],
    faqs: [
      { q: "Do you help government employees in Dehradun?", a: "Yes — many of our Dehradun clients are government employees who qualify for HBA and other schemes after credit improvement." },
      { q: "Can I get a home loan in Dehradun with low CIBIL?", a: "We help Dehradun residents improve their scores to qualify for the best housing loan rates available." },
      { q: "Is your service available in Haridwar and Rishikesh?", a: "Yes — we serve all of Uttarakhand remotely including Haridwar, Rishikesh and Roorkee." },
    ],
  },
  "agra": {
    name: "Agra", state: "Uttar Pradesh",
    headline: "Credit Consultant in Agra — CIBIL Score Repair & Loan Advisory",
    description: "Agra's trusted credit repair specialists helping leather industry workers, traders and salaried professionals improve their credit scores and access affordable loans.",
    localFact: "Agra's leather and footwear industry is one of India's largest — business credit is essential for exporters and traders who need working capital financing.",
    population: "1.7 million+", pincode: "282001–282010",
    areas: ["Taj Nagri", "Kamla Nagar", "Sikandra", "Dayalbagh", "Shahganj", "Bodla", "Fatehabad Road", "Belanganj", "Lajpat Kunj", "Nai ki Mandi"],
    faqs: [
      { q: "Do you help leather exporters in Agra with business credit?", a: "Yes — we build business credit profiles for Agra's leather and footwear exporters to access trade finance and working capital." },
      { q: "Can you fix my CIBIL score in Agra?", a: "Yes — our Agra clients see improvements of 80–150 points in 3–6 months through our structured credit repair program." },
      { q: "Do you serve Mathura and Firozabad too?", a: "Yes — our remote service covers all of western UP including Mathura, Firozabad and Aligarh." },
    ],
  },
  "varanasi": {
    name: "Varanasi", state: "Uttar Pradesh",
    headline: "Credit Consultant in Varanasi — CIBIL Score Repair & Loan Advisory",
    description: "Varanasi's trusted credit advisory experts helping the city's silk weavers, traders, professionals and salaried individuals access the best credit repair and loan products.",
    localFact: "Varanasi's Banarasi silk industry and growing tourism economy create unique credit needs — our advisors specialise in helping local businesses and artisans access financing.",
    population: "1.4 million+", pincode: "221001–221011",
    areas: ["Lanka", "Sigra", "Nadesar", "BHU Campus Area", "Orderly Bazar", "Shivpur", "Sarnath", "Assi", "Godowlia", "Cantt Area"],
    faqs: [
      { q: "Do you help Banarasi silk weavers with credit?", a: "Yes — we help Varanasi's weaver community access MUDRA loans and business credit through proper credit profile building." },
      { q: "Can I improve my CIBIL score in Varanasi?", a: "Yes — our Varanasi clients see significant improvements in 90–180 days through our structured credit repair program." },
      { q: "Do you serve Allahabad/Prayagraj too?", a: "Yes — our remote service covers all of eastern UP including Prayagraj, Mirzapur and Gorakhpur." },
    ],
  },
  "jodhpur": {
    name: "Jodhpur", state: "Rajasthan",
    headline: "Credit Consultant in Jodhpur — CIBIL Score Repair & Loan Advisory",
    description: "Jodhpur's premier credit advisory service helping the Blue City's business owners, artisans and professionals repair their credit and access the best home and business loans.",
    localFact: "Jodhpur's handicraft and tourism industries drive significant business loan demand — our advisors help Rajasthani entrepreneurs build credit profiles that unlock growth financing.",
    population: "1.1 million+", pincode: "342001–342037",
    areas: ["Ratanada", "Paota", "Shastri Nagar", "Chopasni Housing Board", "Pal Road", "Residency Road", "Sojati Gate", "Sardarpura", "Mandore", "Basni"],
    faqs: [
      { q: "Can you help handicraft businesses in Jodhpur?", a: "Yes — we help Jodhpur's artisan and handicraft businesses access MUDRA and business loans through credit profile building." },
      { q: "How do I improve my CIBIL score in Jodhpur?", a: "Our Jodhpur advisors create a personalised plan to improve your score by 80–150 points in 3–6 months." },
      { q: "Do you serve Bikaner and Ajmer too?", a: "Yes — our remote service covers all of Rajasthan including Bikaner, Ajmer, Kota and Udaipur." },
    ],
  },

  // ── SOUTH ────────────────────────────────────────────────────
  "madurai": {
    name: "Madurai", state: "Tamil Nadu",
    headline: "Credit Consultant in Madurai — CIBIL Score Repair & Loan Advisory",
    description: "Madurai's trusted credit repair specialists helping the Temple City's traders, weavers and professionals improve their CIBIL scores and access affordable home and business loans.",
    localFact: "Madurai's textile and granite industries are among Tamil Nadu's largest — business credit is critical for accessing export financing and working capital.",
    population: "1.5 million+", pincode: "625001–625022",
    areas: ["Anna Nagar", "KK Nagar", "Tallakulam", "Thiruppalai", "Mattuthavani", "Pasumalai", "Iyer Bungalow", "Vilangudi", "Simmakkal", "Avaniyapuram"],
    faqs: [
      { q: "Can you help textile business owners in Madurai?", a: "Yes — we help Madurai's textile and weaving community access business loans and working capital through credit improvement." },
      { q: "How can I get a home loan in Madurai?", a: "Our Madurai clients improve their CIBIL scores by 80–150 points and then qualify for the best housing loan rates." },
      { q: "Do you serve Dindigul and Tirunelveli?", a: "Yes — our remote service covers all of southern Tamil Nadu." },
    ],
  },
  "mysuru": {
    name: "Mysuru", state: "Karnataka",
    headline: "Credit Consultant in Mysuru — CIBIL Score Repair & Home Loan Experts",
    description: "Mysuru's premier credit advisory service helping government employees, IT professionals and business owners in the Royal City improve their CIBIL scores and access the best loans.",
    localFact: "Mysuru's growing IT and tourism economy alongside strong government employment creates diverse credit needs — our advisors tailor solutions for every client profile.",
    population: "1 million+", pincode: "570001–570032",
    areas: ["Vijayanagar", "Kuvempunagar", "Saraswathipuram", "Hebbal", "Nazarbad", "Jayalakshmipuram", "Ittige Gudu", "Dattagalli", "N R Mohalla", "Gokulam"],
    faqs: [
      { q: "Do you help government employees in Mysuru?", a: "Yes — Mysuru has a large government workforce and we help them access the best housing and personal loan schemes." },
      { q: "Can I improve my credit score for a home in Mysuru?", a: "Yes — Mysuru's real estate is very affordable and a good CIBIL score ensures the lowest interest rates." },
      { q: "Do you serve Mandya and Hassan?", a: "Yes — our remote service covers all of south Karnataka." },
    ],
  },
  "thiruvananthapuram": {
    name: "Thiruvananthapuram", state: "Kerala",
    headline: "Credit Consultant in Thiruvananthapuram — CIBIL Score Repair & Loan Advisory",
    description: "Trivandrum's trusted credit repair and loan advisory specialists helping Kerala's capital city residents — government employees, IT professionals and NRIs — achieve their financial goals.",
    localFact: "Thiruvananthapuram's strong government and IT sector employment creates high loan demand — our advisors help residents access the best rates through credit improvement.",
    population: "1 million+", pincode: "695001–695585",
    areas: ["Kowdiar", "Vazhuthacaud", "Pattom", "Kesavadasapuram", "Kazhakootam", "Technopark", "Vattiyoorkavu", "Sreekaryam", "Ulloor", "Thiruvallam"],
    faqs: [
      { q: "Do you help Technopark IT employees in Trivandrum?", a: "Yes — many of our Trivandrum clients are IT professionals in Technopark who need personal and home loan advisory." },
      { q: "Can NRIs from Kerala use your service?", a: "Yes — we specialise in NRI credit profiles and help returning Keralites access home loans at the best rates." },
      { q: "Do you serve Kollam and Alappuzha?", a: "Yes — our remote service covers all of southern Kerala." },
    ],
  },
  "vijayawada": {
    name: "Vijayawada", state: "Andhra Pradesh",
    headline: "Credit Consultant in Vijayawada — CIBIL Score Repair & Loan Experts",
    description: "Vijayawada's trusted credit repair specialists helping the commercial capital of Andhra Pradesh's traders, real estate buyers and professionals improve their credit and access the best loans.",
    localFact: "Vijayawada is Andhra Pradesh's commercial hub with major trading and real estate activity — a strong CIBIL score is essential for accessing the best loan products.",
    population: "1.4 million+", pincode: "520001–520015",
    areas: ["Benz Circle", "Governorpet", "Labbipet", "Moghalrajpuram", "Gunadala", "Patamata", "Tadepalli", "Mangalagiri", "Ramavarappadu", "Ajit Singh Nagar"],
    faqs: [
      { q: "Can you help traders in Vijayawada with business credit?", a: "Yes — we help Vijayawada's trading community build business credit profiles to access working capital at the best rates." },
      { q: "How do I improve my CIBIL score in Vijayawada?", a: "Our Vijayawada advisors create personalised plans targeting 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Guntur and Eluru?", a: "Yes — our remote service covers all of Andhra Pradesh including Guntur, Tirupati and Nellore." },
    ],
  },
  "tirupati": {
    name: "Tirupati", state: "Andhra Pradesh",
    headline: "Credit Consultant in Tirupati — CIBIL Score Repair & Loan Advisory",
    description: "Tirupati's trusted credit advisory service helping pilgrims, traders and professionals in the temple town access the best credit repair and loan products.",
    localFact: "Tirupati's booming economy driven by pilgrimage tourism and growing industries creates strong demand for home and business loans — a good CIBIL score unlocks the best rates.",
    population: "500,000+", pincode: "517501–517520",
    areas: ["Balaji Nagar", "Leela Mahal Circle", "Karakambadi Road", "Renigunta", "Tiruchanoor", "Mangalam", "Alipiri", "Gandhi Nagar", "Bhavani Nagar", "Prakasam Nagar"],
    faqs: [
      { q: "Can you help hotel and tourism businesses in Tirupati?", a: "Yes — we help Tirupati's hospitality businesses access business loans and working capital through credit improvement." },
      { q: "How can I get a home loan in Tirupati?", a: "Our Tirupati clients improve their CIBIL scores and get connected with lenders offering the best home loan rates." },
      { q: "Do you serve Chittoor and Kadapa?", a: "Yes — our remote service covers all of Rayalaseema and south Andhra Pradesh." },
    ],
  },

  // ── EAST ────────────────────────────────────────────────────
  "patna": {
    name: "Patna", state: "Bihar",
    headline: "Credit Consultant in Patna — CIBIL Score Repair & Loan Advisory",
    description: "Patna's trusted credit repair and loan advisory service helping Bihar's capital city residents — government employees, students and business owners — improve their credit and access the best loans.",
    localFact: "Patna's growing economy and large government workforce create strong home and personal loan demand — our advisors help residents access the best rates through credit improvement.",
    population: "2 million+", pincode: "800001–800029",
    areas: ["Boring Road", "Bailey Road", "Fraser Road", "Kankarbagh", "Rajendra Nagar", "Danapur", "Saguna More", "Patliputra Colony", "Gandhi Maidan", "Rukanpura"],
    faqs: [
      { q: "Do you help government employees in Patna?", a: "Yes — Patna has a large state and central government workforce and we help them access the best housing and personal loan schemes." },
      { q: "Can you fix my CIBIL score in Patna?", a: "Yes — our Patna clients see 80–150 point improvements in 3–6 months through our structured credit repair program." },
      { q: "Do you serve Muzaffarpur and Gaya?", a: "Yes — our remote service covers all of Bihar and Jharkhand." },
    ],
  },
  "bhubaneswar": {
    name: "Bhubaneswar", state: "Odisha",
    headline: "Credit Consultant in Bhubaneswar — CIBIL Score Repair & Loan Advisory",
    description: "Bhubaneswar's premier credit advisory service helping Odisha's capital city residents — IT professionals, government employees and business owners — achieve their financial goals.",
    localFact: "Bhubaneswar's rapid growth as an IT and administrative hub is driving strong home loan demand in areas like Patia, Nayapalli and Chandrasekharpur.",
    population: "1 million+", pincode: "751001–751030",
    areas: ["Patia", "Nayapalli", "Chandrasekharpur", "Saheed Nagar", "VSS Nagar", "Jaydev Vihar", "Airfield Area", "Niladri Vihar", "Kalinga Nagar", "Mancheswar"],
    faqs: [
      { q: "How can I improve my CIBIL score in Bhubaneswar?", a: "Our Bhubaneswar advisors create personalised credit repair plans targeting 80–150 point improvements in 3–6 months." },
      { q: "Do you help IT professionals in Bhubaneswar?", a: "Yes — many of our Bhubaneswar clients are IT sector employees who need personal and home loan advisory." },
      { q: "Do you serve Cuttack and Rourkela?", a: "Yes — our remote service covers all of Odisha." },
    ],
  },
  "guwahati": {
    name: "Guwahati", state: "Assam",
    headline: "Credit Consultant in Guwahati — CIBIL Score Repair & Loan Advisory",
    description: "Guwahati's trusted credit repair specialists — the gateway to Northeast India. We help Assam's residents, tea industry professionals and business owners access the best financial products.",
    localFact: "Guwahati is the commercial hub of Northeast India — growing rapidly with new real estate, IT parks and businesses that all require strong credit profiles.",
    population: "1 million+", pincode: "781001–781040",
    areas: ["Dispur", "Ganeshguri", "Six Mile", "Geetanagar", "Beltola", "Narengi", "Hatigaon", "Jalukbari", "Bhangagarh", "Zoo Road"],
    faqs: [
      { q: "Can you help with home loans in Guwahati?", a: "Yes — Guwahati's real estate market is growing fast and a good CIBIL score ensures you get the best loan rates." },
      { q: "Do you serve the Northeast states?", a: "Yes — our remote service covers all of Assam, Meghalaya, Tripura and other northeastern states." },
      { q: "How long does credit repair take in Guwahati?", a: "Typically 3–6 months for significant improvements through our structured credit repair program." },
    ],
  },
  "ranchi": {
    name: "Ranchi", state: "Jharkhand",
    headline: "Credit Consultant in Ranchi — CIBIL Score Repair & Loan Advisory",
    description: "Ranchi's trusted credit advisory service helping Jharkhand's capital city professionals, government employees and business owners achieve their credit and loan goals.",
    localFact: "Ranchi's mining and manufacturing economy alongside a large government workforce creates strong loan demand — our advisors help residents unlock the best financial products.",
    population: "1.1 million+", pincode: "834001–834009",
    areas: ["Harmu", "Kanke Road", "Booty More", "Ratu Road", "Lalpur", "Doranda", "Ashok Nagar", "Hinoo", "Kokar", "Bariatu"],
    faqs: [
      { q: "Do you help mining sector employees in Ranchi?", a: "Yes — we help Jharkhand's mining and PSU sector employees access the best home and personal loan products." },
      { q: "Can you fix my CIBIL score in Ranchi?", a: "Yes — our Ranchi clients see 80–150 point improvements in 3–6 months through our structured credit repair program." },
      { q: "Do you serve Jamshedpur and Dhanbad?", a: "Yes — our remote service covers all of Jharkhand including Jamshedpur, Dhanbad and Bokaro." },
    ],
  },
  "raipur": {
    name: "Raipur", state: "Chhattisgarh",
    headline: "Credit Consultant in Raipur — CIBIL Score Repair & Loan Advisory",
    description: "Raipur's trusted credit repair and loan advisory specialists helping Chhattisgarh's capital city steel workers, traders and professionals access the best financial products.",
    localFact: "Raipur is India's steel city with a booming economy — business and home loan demand is high and a strong CIBIL score is essential for accessing the best rates.",
    population: "1.1 million+", pincode: "492001–492015",
    areas: ["Shankar Nagar", "Civil Lines", "Telibandha", "Pandri", "Amanaka", "Tatibandh", "Vidhan Sabha Road", "Fafadih", "New Rajendra Nagar", "Devendra Nagar"],
    faqs: [
      { q: "Do you help steel and industry workers in Raipur?", a: "Yes — we help Raipur's industrial workforce access home and personal loans through credit profile improvement." },
      { q: "Can you help with business loans in Raipur?", a: "Yes — we build business credit profiles for Raipur's trading and manufacturing community." },
      { q: "Do you serve Bilaspur and Bhilai?", a: "Yes — our remote service covers all of Chhattisgarh." },
    ],
  },

  // ── NORTH (additional) ───────────────────────────────────────
  "kanpur": {
    name: "Kanpur", state: "Uttar Pradesh",
    headline: "Credit Consultant in Kanpur — CIBIL Score Repair & Loan Advisory",
    description: "Kanpur's trusted credit repair specialists helping leather industry workers, textile manufacturers and salaried professionals improve their credit scores and access affordable loans.",
    localFact: "Kanpur is one of India's largest leather exporting cities — business credit is critical for exporters and manufacturers who need working capital and trade finance.",
    population: "3 million+", pincode: "208001–208027",
    areas: ["Civil Lines", "Kidwai Nagar", "Swaroop Nagar", "Arya Nagar", "Kakadeo", "Kalyanpur", "Govind Nagar", "Shyam Nagar", "Panki", "Barra"],
    faqs: [
      { q: "Do you help leather exporters in Kanpur?", a: "Yes — we build business credit profiles for Kanpur's leather and textile exporters to access trade finance at the best rates." },
      { q: "Can you fix my CIBIL score in Kanpur?", a: "Yes — our Kanpur clients see 80–150 point improvements in 3–6 months through our structured program." },
      { q: "Do you serve Unnao and Fatehpur?", a: "Yes — our remote service covers all of central UP." },
    ],
  },
  "prayagraj": {
    name: "Prayagraj", state: "Uttar Pradesh",
    headline: "Credit Consultant in Prayagraj — CIBIL Score Repair & Loan Advisory",
    description: "Prayagraj's trusted credit advisory experts helping government employees, legal professionals and business owners in the Sangam city improve their credit and access the best loans.",
    localFact: "Prayagraj has a large government and judiciary workforce with strong home loan demand — our advisors help residents access the best housing schemes through credit improvement.",
    population: "1.2 million+", pincode: "211001–211018",
    areas: ["Civil Lines", "George Town", "Mumfordganj", "Naini", "Phaphamau", "Jhunsi", "Allapur", "Colonelganj", "Kydganj", "Ashok Nagar"],
    faqs: [
      { q: "Do you help government employees in Prayagraj?", a: "Yes — Prayagraj has a large government and judiciary workforce and we help them access the best housing loan schemes." },
      { q: "Can you fix my CIBIL score in Prayagraj?", a: "Yes — our Prayagraj clients see 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Kaushambi and Pratapgarh?", a: "Yes — our remote service covers all of eastern UP." },
    ],
  },
  "meerut": {
    name: "Meerut", state: "Uttar Pradesh",
    headline: "Credit Consultant in Meerut — CIBIL Score Repair & Loan Advisory",
    description: "Meerut's leading credit advisory service helping sports goods manufacturers, traders and NCR professionals improve their CIBIL scores and access the best financial products.",
    localFact: "Meerut is famous for sports goods and scissors manufacturing — business credit is essential for its exporters and SMEs to access working capital and growth financing.",
    population: "1.4 million+", pincode: "250001–250110",
    areas: ["Shastri Nagar", "Ganga Nagar", "Saket", "Indirapuram Road", "Kanker Khera", "Brahmpuri", "Garh Road", "Mawana Road", "Delhi Road", "Hapur Road"],
    faqs: [
      { q: "Do you help sports goods manufacturers in Meerut?", a: "Yes — we build business credit profiles for Meerut's sports goods and manufacturing SMEs." },
      { q: "Can you help with home loans near Delhi NCR in Meerut?", a: "Yes — Meerut's proximity to Delhi makes it popular for home buyers and we help them get the best loan rates." },
      { q: "Do you serve Hapur and Ghaziabad?", a: "Yes — our remote service covers all of western UP and Delhi NCR satellite cities." },
    ],
  },
  "shimla": {
    name: "Shimla", state: "Himachal Pradesh",
    headline: "Credit Consultant in Shimla — CIBIL Score Repair & Loan Advisory",
    description: "Shimla's trusted credit repair and loan advisory specialists helping government employees, tourism businesses and professionals in Himachal Pradesh's capital achieve their financial goals.",
    localFact: "Shimla is Himachal Pradesh's capital with a large government workforce — housing loan demand is high and a good CIBIL score unlocks the best schemes for employees.",
    population: "200,000+", pincode: "171001–171012",
    areas: ["The Mall", "Lakkar Bazar", "Sanjauli", "Chhota Shimla", "New Shimla", "Vikasnagar", "Dhalli", "Kufri Road", "Panthaghati", "Shoghi"],
    faqs: [
      { q: "Do you help government employees in Shimla?", a: "Yes — Himachal Pradesh's government workforce benefits from our credit repair to access the best HBA and housing loan schemes." },
      { q: "Can you help tourism businesses in Shimla?", a: "Yes — we help Shimla's hospitality and tourism businesses access working capital and business loans." },
      { q: "Do you serve Solan and Mandi?", a: "Yes — our remote service covers all of Himachal Pradesh." },
    ],
  },
  "jammu": {
    name: "Jammu", state: "Jammu & Kashmir",
    headline: "Credit Consultant in Jammu — CIBIL Score Repair & Loan Advisory",
    description: "Jammu's trusted credit advisory experts helping government employees, traders and real estate buyers in the winter capital of J&K improve their CIBIL scores and access the best loans.",
    localFact: "Jammu's growing real estate market and large defence and government workforce create strong home loan demand — our advisors help residents unlock the best financial products.",
    population: "600,000+", pincode: "180001–180020",
    areas: ["Trikuta Nagar", "Gandhi Nagar", "Bakshi Nagar", "Shastri Nagar", "Talab Tillo", "Parade", "Bathindi", "Sainik Colony", "Nanak Nagar", "Channi Himmat"],
    faqs: [
      { q: "Do you help defence and government employees in Jammu?", a: "Yes — we help J&K's defence and government workforce access the best housing and personal loan schemes." },
      { q: "Can you fix my CIBIL score in Jammu?", a: "Yes — our Jammu clients see 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Srinagar and Kathua?", a: "Yes — our remote service covers all of J&K and Ladakh." },
    ],
  },
  "udaipur": {
    name: "Udaipur", state: "Rajasthan",
    headline: "Credit Consultant in Udaipur — CIBIL Score Repair & Loan Advisory",
    description: "Udaipur's premier credit advisory service helping the Lake City's marble industry workers, tourism businesses and professionals improve their credit scores and access affordable loans.",
    localFact: "Udaipur's marble industry and luxury tourism economy create unique credit needs — our advisors help local businesses and homebuyers access the best financial products.",
    population: "700,000+", pincode: "313001–313038",
    areas: ["Hiran Magri", "Sukhadia Circle", "Fateh Sagar", "Udaipur City", "Ambamata", "Shobhagpura", "Pratap Nagar", "Sector 4", "Sector 11", "Amba Mata"],
    faqs: [
      { q: "Do you help marble industry workers in Udaipur?", a: "Yes — we help Udaipur's marble and mining community access business and personal loans through credit improvement." },
      { q: "Can I get a home loan in Udaipur with low CIBIL?", a: "Yes — we help Udaipur residents improve their scores to qualify for the best housing loan rates available." },
      { q: "Do you serve Mount Abu and Chittorgarh?", a: "Yes — our remote service covers all of southern Rajasthan." },
    ],
  },

  // ── SOUTH (additional) ───────────────────────────────────────
  "mangaluru": {
    name: "Mangaluru", state: "Karnataka",
    headline: "Credit Consultant in Mangaluru — CIBIL Score Repair & Loan Advisory",
    description: "Mangaluru's trusted credit repair specialists helping NRIs, banking professionals and coastal Karnataka's business community improve their CIBIL scores and access the best loans.",
    localFact: "Mangaluru has a large NRI population with Gulf returnees — complex credit needs arise from overseas income and foreign currency loans that our specialists handle expertly.",
    population: "700,000+", pincode: "575001–575030",
    areas: ["Hampankatta", "Kadri", "Kankanady", "Bejai", "Urwa", "Balmatta", "Attavar", "Falnir", "Bondel", "Kulur"],
    faqs: [
      { q: "Do you help Gulf NRIs returning to Mangaluru?", a: "Yes — we specialise in NRI credit profiles and help returning Gulf expats access home loans at the best rates." },
      { q: "Can you fix my CIBIL score in Mangaluru?", a: "Yes — our Mangaluru clients see 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Udupi and Kundapur?", a: "Yes — our remote service covers all of coastal Karnataka." },
    ],
  },
  "kozhikode": {
    name: "Kozhikode", state: "Kerala",
    headline: "Credit Consultant in Kozhikode — CIBIL Score Repair & Loan Advisory",
    description: "Kozhikode's trusted credit advisory service helping Calicut's traders, NRIs and professionals improve their CIBIL scores and access the best home and business loan products.",
    localFact: "Kozhikode has a large NRI community with strong real estate investment demand — our advisors specialise in NRI credit profiles and returning expat home loan advisory.",
    population: "700,000+", pincode: "673001–673032",
    areas: ["Calicut Beach", "Palayam", "Nadakkavu", "Chevarambalam", "Kavoor", "Kunnamangalam", "Thiruvambady", "Westhill", "Mavoor Road", "Arayidathupalam"],
    faqs: [
      { q: "Do you help NRIs from the Gulf in Kozhikode?", a: "Yes — we specialise in NRI credit profiles and help returning Keralites access home loans at the best rates." },
      { q: "Can you fix my CIBIL score in Calicut?", a: "Yes — our Kozhikode clients see 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Malappuram and Kannur?", a: "Yes — our remote service covers all of north Kerala." },
    ],
  },
  "thrissur": {
    name: "Thrissur", state: "Kerala",
    headline: "Credit Consultant in Thrissur — CIBIL Score Repair & Loan Advisory",
    description: "Thrissur's leading credit advisory service — Kerala's cultural capital. We help gold jewellery businesses, NRIs and salaried professionals access the best credit repair and loan products.",
    localFact: "Thrissur is Kerala's gold jewellery hub with major lending activity — a strong CIBIL score is essential for jewellers and traders to access the best working capital rates.",
    population: "330,000+", pincode: "680001–680025",
    areas: ["Swaraj Round", "Ayyanthole", "Ollur", "Poothole", "Punkunnam", "Thrissur City", "Vadanapilly", "Irinjalakuda", "Chalakudy", "Kodungallur"],
    faqs: [
      { q: "Do you help gold jewellery businesses in Thrissur?", a: "Yes — we build business credit profiles for Thrissur's jewellery and trading community to access the best working capital." },
      { q: "Can you fix my CIBIL score in Thrissur?", a: "Yes — our Thrissur clients see 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Palakkad and Guruvayur?", a: "Yes — our remote service covers all of central Kerala." },
    ],
  },
  "salem": {
    name: "Salem", state: "Tamil Nadu",
    headline: "Credit Consultant in Salem — CIBIL Score Repair & Loan Advisory",
    description: "Salem's trusted credit repair and loan advisory experts helping Tamil Nadu's steel city residents, weavers and business owners improve their credit scores and access affordable loans.",
    localFact: "Salem is a major steel and textile producing city — business credit is essential for local manufacturers and traders to access working capital and growth financing.",
    population: "900,000+", pincode: "636001–636016",
    areas: ["Fairlands", "Swarnapuri", "Hasthampatti", "Suramangalam", "Alagapuram", "Kitchipalayam", "New Bus Stand Area", "Shevapet", "Kondalampatti", "Ammapet"],
    faqs: [
      { q: "Do you help steel and textile businesses in Salem?", a: "Yes — we build business credit profiles for Salem's steel and textile manufacturing community." },
      { q: "How can I improve my CIBIL score in Salem?", a: "Our Salem advisors create personalised plans targeting 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Namakkal and Erode?", a: "Yes — our remote service covers all of central Tamil Nadu." },
    ],
  },
  "tiruchirappalli": {
    name: "Tiruchirappalli", state: "Tamil Nadu",
    headline: "Credit Consultant in Tiruchirappalli — CIBIL Score Repair & Loan Advisory",
    description: "Trichy's premier credit advisory service helping BHEL workers, government employees and professionals in Tamil Nadu's rock fort city improve their credit and access the best loans.",
    localFact: "Trichy is home to BHEL and other major PSUs with a large government workforce — housing loan demand is high and a good CIBIL score unlocks the best rates.",
    population: "1 million+", pincode: "620001–620023",
    areas: ["Thillai Nagar", "KK Nagar", "Ariyamangalam", "Srirangam", "Woraiyur", "Cantonment", "Chatram Bus Stand", "Palakarai", "Tennur", "Bharathidasan University Area"],
    faqs: [
      { q: "Do you help BHEL employees in Trichy?", a: "Yes — we help BHEL and PSU sector employees in Trichy access the best housing and personal loan schemes." },
      { q: "Can you fix my CIBIL score in Tiruchirappalli?", a: "Yes — our Trichy clients see 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Karur and Thanjavur?", a: "Yes — our remote service covers all of central Tamil Nadu." },
    ],
  },

  // ── EAST (additional) ────────────────────────────────────────
  "jamshedpur": {
    name: "Jamshedpur", state: "Jharkhand",
    headline: "Credit Consultant in Jamshedpur — CIBIL Score Repair & Loan Advisory",
    description: "Jamshedpur's trusted credit advisory experts helping Tata Steel workers, auto industry employees and business owners in India's first planned industrial city access the best loans.",
    localFact: "Jamshedpur is India's steel city with Tata Steel employing thousands — workers and business owners here need strong credit profiles for home and personal loans.",
    population: "1.3 million+", pincode: "831001–832304",
    areas: ["Bistupur", "Sakchi", "Telco Colony", "Kadma", "Mango", "Jugsalai", "Golmuri", "Sitaramdera", "Baridih", "Sonari"],
    faqs: [
      { q: "Do you help Tata Steel employees in Jamshedpur?", a: "Yes — we help Jamshedpur's industrial workforce access home and personal loans at the best available rates." },
      { q: "Can you fix my CIBIL score in Jamshedpur?", a: "Yes — our Jamshedpur clients see 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Bokaro and Dhanbad?", a: "Yes — our remote service covers all of Jharkhand's industrial belt." },
    ],
  },
  "siliguri": {
    name: "Siliguri", state: "West Bengal",
    headline: "Credit Consultant in Siliguri — CIBIL Score Repair & Loan Advisory",
    description: "Siliguri's trusted credit repair and loan advisory specialists helping the gateway to Northeast India's traders, tea industry workers and professionals access the best financial products.",
    localFact: "Siliguri is the commercial hub connecting Bengal with the Northeast — its booming trade and real estate market make credit scores critical for accessing the best loans.",
    population: "700,000+", pincode: "734001–734015",
    areas: ["Sevoke Road", "Hill Cart Road", "Pradhan Nagar", "Bhaktinagar", "Matigara", "Bagdogra", "Naxalbari", "Champasari", "Dabgram", "Hakimpara"],
    faqs: [
      { q: "Do you help tea industry workers in Siliguri?", a: "Yes — we help Siliguri's tea industry and trading community access business and personal loans through credit improvement." },
      { q: "Can you fix my CIBIL score in Siliguri?", a: "Yes — our Siliguri clients see 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Darjeeling and Jalpaiguri?", a: "Yes — our remote service covers all of north Bengal and the Northeast gateway region." },
    ],
  },
  "durgapur": {
    name: "Durgapur", state: "West Bengal",
    headline: "Credit Consultant in Durgapur — CIBIL Score Repair & Loan Advisory",
    description: "Durgapur's leading credit advisory service helping steel plant workers, chemical industry employees and business owners in West Bengal's steel city access the best credit and loan products.",
    localFact: "Durgapur is West Bengal's industrial powerhouse with major steel plants — workers and business owners need strong credit profiles to access the best home and personal loan rates.",
    population: "600,000+", pincode: "713201–713216",
    areas: ["Bidhannagar", "City Centre", "Steel Township", "Benachity", "Bidhan Nagar", "Nachan Road", "Subhaspally", "Rajbandh", "Mithipur", "A-Zone"],
    faqs: [
      { q: "Do you help steel plant workers in Durgapur?", a: "Yes — we help Durgapur's industrial workforce access home and personal loans at the best available rates." },
      { q: "Can you fix my CIBIL score in Durgapur?", a: "Yes — our Durgapur clients see 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Asansol and Bardhaman?", a: "Yes — our remote service covers all of West Bengal's industrial belt." },
    ],
  },

  // ── WEST (additional) ────────────────────────────────────────
  "indore": {
    name: "Indore", state: "Madhya Pradesh",
    headline: "Credit Consultant in Indore — CIBIL Score Repair & Business Loan Experts",
    description: "Indore's premier credit advisory service — Madhya Pradesh's commercial capital. We help pharma companies, textile traders and IT professionals improve their credit and access the best loans.",
    localFact: "Indore is MP's cleanest and most commercially active city with a booming pharma and textile sector — business credit is essential for growth financing in this dynamic market.",
    population: "3 million+", pincode: "452001–452020",
    areas: ["Vijay Nagar", "Palasia", "New Palasia", "Scheme 54", "AB Road", "LIG Colony", "MG Road", "Rau", "Khajrana", "Bicholi Mardana"],
    faqs: [
      { q: "Do you help pharma and textile businesses in Indore?", a: "Yes — we build business credit profiles for Indore's pharma, textile and IT community to access growth financing." },
      { q: "How can I improve my CIBIL score in Indore?", a: "Our Indore advisors create personalised plans targeting 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Bhopal and Ujjain?", a: "Yes — our remote service covers all of Madhya Pradesh." },
    ],
  },
  "bhopal": {
    name: "Bhopal", state: "Madhya Pradesh",
    headline: "Credit Consultant in Bhopal — CIBIL Score Repair & Loan Advisory",
    description: "Bhopal's trusted credit repair specialists helping Madhya Pradesh's capital city government employees, IT professionals and business owners achieve their credit and loan goals.",
    localFact: "Bhopal's large government workforce alongside a growing IT sector creates strong home loan demand — our advisors help residents access the best housing schemes through credit improvement.",
    population: "2 million+", pincode: "462001–462047",
    areas: ["MP Nagar", "Arera Colony", "Shahpura", "Kolar Road", "Hoshangabad Road", "TT Nagar", "New Market", "Awadhpuri", "Misrod", "Chunabhatti"],
    faqs: [
      { q: "Do you help government employees in Bhopal?", a: "Yes — Bhopal has a large state government workforce and we help them access the best housing loan schemes." },
      { q: "Can you fix my CIBIL score in Bhopal?", a: "Yes — our Bhopal clients see 80–150 point improvements in 3–6 months through our structured program." },
      { q: "Do you serve Jabalpur and Gwalior?", a: "Yes — our remote service covers all of Madhya Pradesh." },
    ],
  },
  "gandhinagar": {
    name: "Gandhinagar", state: "Gujarat",
    headline: "Credit Consultant in Gandhinagar — CIBIL Score Repair & Loan Advisory",
    description: "Gandhinagar's trusted credit advisory experts helping Gujarat's capital city government employees, GIFT City professionals and real estate buyers access the best credit and loan products.",
    localFact: "Gandhinagar's GIFT City is India's first smart city and international financial hub — professionals working here need strong credit profiles to access the best loan products.",
    population: "300,000+", pincode: "382001–382051",
    areas: ["Sector 1", "Sector 7", "Sector 11", "Sector 16", "Sector 21", "Sector 28", "GIFT City", "Kudasan", "Pethapur", "Koba"],
    faqs: [
      { q: "Do you help GIFT City professionals in Gandhinagar?", a: "Yes — we specialise in helping GIFT City and fintech professionals access personal and home loans at the best rates." },
      { q: "Can you fix my CIBIL score in Gandhinagar?", a: "Yes — our Gandhinagar clients see 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Ahmedabad and Anand?", a: "Yes — our remote service covers all of central Gujarat." },
    ],
  },
  "kolhapur": {
    name: "Kolhapur", state: "Maharashtra",
    headline: "Credit Consultant in Kolhapur — CIBIL Score Repair & Loan Advisory",
    description: "Kolhapur's premier credit advisory service helping the city's foundry workers, sugar industry professionals and business owners improve their CIBIL scores and access affordable loans.",
    localFact: "Kolhapur is Maharashtra's foundry and sugar capital — business credit is essential for its industrial community to access the working capital that fuels growth.",
    population: "600,000+", pincode: "416001–416013",
    areas: ["Shivaji Park", "Rajarampuri", "Tarabai Park", "Shahupuri", "New Shahupuri", "Kasba Bawada", "Kothali", "Udyamnagar", "Gandhinagar", "Mangalwar Peth"],
    faqs: [
      { q: "Do you help foundry businesses in Kolhapur?", a: "Yes — we build business credit profiles for Kolhapur's foundry and manufacturing community to access growth financing." },
      { q: "How can I get a home loan in Kolhapur?", a: "Improve your CIBIL score with our help and get connected with lenders offering the best home loan rates in Maharashtra." },
      { q: "Do you serve Sangli and Satara?", a: "Yes — our remote service covers all of western Maharashtra." },
    ],
  },

  // ── WEST ────────────────────────────────────────────────────
  "nashik": {
    name: "Nashik", state: "Maharashtra",
    headline: "Credit Consultant in Nashik — CIBIL Score Repair & Loan Advisory",
    description: "Nashik's trusted credit repair specialists helping the wine capital's grape farmers, manufacturers, IT professionals and home buyers improve their CIBIL scores and access the best loans.",
    localFact: "Nashik's industrial and agricultural economy alongside fast-growing real estate creates strong home and business loan demand — a good CIBIL score unlocks the best products.",
    population: "1.5 million+", pincode: "422001–422222",
    areas: ["Gangapur Road", "College Road", "Panchavati", "Satpur", "Ambad", "Cidco", "Indira Nagar", "Trimbak Road", "Nashik Road", "Deolali"],
    faqs: [
      { q: "Do you help farmers and agri businesses in Nashik?", a: "Yes — we help Nashik's grape and onion farming community access KCC and agri-business loans through credit improvement." },
      { q: "Can you fix my CIBIL score in Nashik?", a: "Yes — our Nashik clients see 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Malegaon and Dhule?", a: "Yes — our remote service covers all of north Maharashtra." },
    ],
  },
  "vadodara": {
    name: "Vadodara", state: "Gujarat",
    headline: "Credit Consultant in Vadodara — CIBIL Score Repair & Business Loan Experts",
    description: "Vadodara's premier credit advisory service helping Baroda's chemical, manufacturing and IT professionals improve their CIBIL scores and access the best home and business loan products.",
    localFact: "Vadodara is Gujarat's cultural and industrial capital with major petrochemical and engineering industries — business credit is essential for accessing growth financing.",
    population: "2 million+", pincode: "390001–391760",
    areas: ["Alkapuri", "Manjalpur", "Gotri", "Waghodia Road", "Karelibaug", "Subhanpura", "Race Course", "Fatehgunj", "Sama", "Nizampura"],
    faqs: [
      { q: "Do you help chemical and engineering businesses in Vadodara?", a: "Yes — we build business credit profiles for Vadodara's industrial community to access the best working capital and term loans." },
      { q: "Can I get a home loan in Vadodara with a low CIBIL?", a: "We help Vadodara residents improve their scores and qualify for the best home loan rates from top lenders." },
      { q: "Do you serve Anand and Bharuch?", a: "Yes — our remote service covers all of central Gujarat." },
    ],
  },
  "rajkot": {
    name: "Rajkot", state: "Gujarat",
    headline: "Credit Consultant in Rajkot — CIBIL Score Repair & Business Loan Advisory",
    description: "Rajkot's trusted credit repair specialists helping Saurashtra's engineering, auto parts and SME businesses alongside salaried professionals access the best credit and loan products.",
    localFact: "Rajkot is one of India's fastest-growing cities with a thriving engineering and auto parts industry — business credit is the fuel that powers Rajkot's entrepreneurial spirit.",
    population: "1.4 million+", pincode: "360001–360590",
    areas: ["Kalawad Road", "University Road", "150 Feet Ring Road", "Kalavad Road", "Mavdi", "Raiya Road", "Bhaktinagar", "Aji Industrial Area", "Kotarpur", "Kuvadva Road"],
    faqs: [
      { q: "Do you help auto parts manufacturers in Rajkot?", a: "Yes — we build business credit profiles for Rajkot's engineering and auto parts SME community." },
      { q: "How can I improve my CIBIL score in Rajkot?", a: "Our Rajkot advisors create a personalised plan targeting 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Jamnagar and Junagadh?", a: "Yes — our remote service covers all of Saurashtra and Kutch." },
    ],
  },
  "aurangabad": {
    name: "Aurangabad", state: "Maharashtra",
    headline: "Credit Consultant in Aurangabad — CIBIL Score Repair & Loan Advisory",
    description: "Aurangabad's leading credit advisory service helping the City of Gates' auto industry workers, manufacturers and professionals repair their credit scores and access the best loan products.",
    localFact: "Aurangabad hosts major auto companies including Bajaj, Skoda and Wabco — workers and business owners here have strong loan needs that require excellent credit profiles.",
    population: "1.2 million+", pincode: "431001–431133",
    areas: ["Cidco", "Garkheda", "Pundliknagar", "Waluj", "Satara Parisar", "Nashik Road", "Gulmandi", "TV Centre", "Gut No Area", "Beed Bypass"],
    faqs: [
      { q: "Do you help auto industry workers in Aurangabad?", a: "Yes — we help Aurangabad's auto and manufacturing sector employees access home and personal loans at the best rates." },
      { q: "Can you fix my CIBIL score in Aurangabad?", a: "Yes — our Aurangabad clients see 80–150 point improvements in 3–6 months through our program." },
      { q: "Do you serve Jalgaon and Nanded?", a: "Yes — our remote service covers all of Marathwada and north Maharashtra." },
    ],
  },

  // ── MANUFACTURING CITIES ─────────────────────────────────────
  "panipat": {
    name: "Panipat", state: "Haryana",
    headline: "Credit Consultant in Panipat — CIBIL Score Repair & Business Loan Advisory",
    description: "Panipat's trusted credit advisory service helping textile mill workers, refinery employees and yarn traders improve their CIBIL scores and access the best business and home loans.",
    localFact: "Panipat is India's 'City of Weavers' and hosts one of India's largest oil refineries — business credit is essential for its textile and petrochemical industrial community.",
    population: "500,000+", pincode: "132103–132140",
    areas: ["Model Town", "Sector 12", "Sector 25", "Panipat Refinery Area", "Babail", "Sanoli Road", "Sewah", "Kabri", "GT Road", "Asan Kalan"],
    faqs: [
      { q: "Do you help textile mill owners in Panipat?", a: "Yes — we build business credit profiles for Panipat's textile and yarn trading community to access working capital at the best rates." },
      { q: "Can you help refinery employees with home loans?", a: "Yes — IOC refinery and industrial employees in Panipat benefit from our credit repair for the best housing loan approvals." },
      { q: "Do you serve Karnal and Sonipat?", a: "Yes — our remote service covers all of northern Haryana." },
    ],
  },
  "faridabad": {
    name: "Faridabad", state: "Haryana",
    headline: "Credit Consultant in Faridabad — CIBIL Score Repair & Loan Advisory",
    description: "Faridabad's premier credit repair service helping auto parts manufacturers, industrial workers and NCR professionals improve their CIBIL scores and access the best home and business loans.",
    localFact: "Faridabad is Haryana's largest city and one of NCR's biggest industrial hubs — producing auto parts, rubber goods and heavy machinery for national and global markets.",
    population: "1.8 million+", pincode: "121001–121010",
    areas: ["NIT Faridabad", "Sector 15", "Sector 21", "Old Faridabad", "Ballabhgarh", "Pali Gaon", "Neharpar", "Tigaon Road", "Mathura Road", "HSIDC Industrial Area"],
    faqs: [
      { q: "Do you help auto parts manufacturers in Faridabad?", a: "Yes — we specialise in business credit for Faridabad's auto, rubber and industrial manufacturing SMEs." },
      { q: "Can I get a home loan in Faridabad with a low CIBIL score?", a: "We help Faridabad residents improve their scores and qualify for the best NCR home loan rates." },
      { q: "Do you serve Ballabhgarh and Greater Faridabad?", a: "Yes — our remote service covers all of Faridabad and its industrial satellites." },
    ],
  },
  "hosur": {
    name: "Hosur", state: "Tamil Nadu",
    headline: "Credit Consultant in Hosur — CIBIL Score Repair & Loan Advisory",
    description: "Hosur's trusted credit advisory service helping EV manufacturers, auto workers and industrial professionals in Tamil Nadu's fastest-growing manufacturing city access the best loans.",
    localFact: "Hosur is India's emerging EV capital with Tata Motors, TVS, Ola Electric and BHEL — workers and business owners here need strong credit profiles for home and personal loans.",
    population: "350,000+", pincode: "635109–635126",
    areas: ["Hosur Town", "SIPCOT Phase 1", "SIPCOT Phase 2", "Mathigiri", "Rayakotta Road", "Kelamangalam Road", "Denkanikotta Road", "Thally Road", "Krishnagiri Road", "Shoolagiri"],
    faqs: [
      { q: "Do you help EV industry workers in Hosur?", a: "Yes — we help Tata Motors, Ola Electric and TVS employees in Hosur access home and personal loans at the best rates." },
      { q: "Can you fix my CIBIL score in Hosur?", a: "Yes — our Hosur clients see 80–150 point improvements in 3–6 months through our structured credit repair program." },
      { q: "Do you serve Krishnagiri and Dharmapuri?", a: "Yes — our remote service covers all of northern Tamil Nadu's industrial belt." },
    ],
  },
  "tirupur": {
    name: "Tirupur", state: "Tamil Nadu",
    headline: "Credit Consultant in Tirupur — CIBIL Score Repair & Business Loan Experts",
    description: "Tirupur's premier credit advisory service helping India's knitwear export capital — garment factory owners, exporters and workers — access the best business credit and loan products.",
    localFact: "Tirupur contributes over 50% of India's total knitwear exports — business credit is the backbone of this export-driven economy and our advisors specialise in helping it grow.",
    population: "900,000+", pincode: "641601–641652",
    areas: ["Kumaran Road", "Congress Road", "Avinashi Road", "Palladam Road", "Dharapuram Road", "Kangeyam Road", "Velampalayam", "Muthur", "Mangalam", "Rayapuram"],
    faqs: [
      { q: "Do you help garment exporters in Tirupur?", a: "Yes — we build business credit profiles for Tirupur's knitwear and textile exporters to access the best trade finance and working capital." },
      { q: "How can I improve my CIBIL score in Tirupur?", a: "Our Tirupur advisors create personalised plans targeting 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Erode and Karur?", a: "Yes — our remote service covers all of Tamil Nadu's textile corridor." },
    ],
  },
  "haridwar": {
    name: "Haridwar", state: "Uttarakhand",
    headline: "Credit Consultant in Haridwar — CIBIL Score Repair & Loan Advisory",
    description: "Haridwar's trusted credit repair specialists helping pharma workers, FMCG employees and industrial professionals in Uttarakhand's manufacturing hub access the best financial products.",
    localFact: "Haridwar's SIDCUL industrial estate hosts Hindustan Unilever, Patanjali, Nestle and hundreds of pharma companies — one of India's fastest-growing industrial corridors.",
    population: "300,000+", pincode: "249401–249411",
    areas: ["SIDCUL", "Ranipur", "Jwalapur", "Shivalik Nagar", "Bhel Township", "Patanjali Yogpeeth Area", "Kankhal", "Bahadrabad", "Roorkee Road", "Delhi Road"],
    faqs: [
      { q: "Do you help pharma and FMCG workers in Haridwar?", a: "Yes — we help SIDCUL industrial estate employees access home and personal loans at the best available rates." },
      { q: "Can you fix my CIBIL score in Haridwar?", a: "Yes — our Haridwar clients see 80–150 point improvements in 3–6 months through our structured program." },
      { q: "Do you serve Roorkee and Rishikesh?", a: "Yes — our remote service covers all of Uttarakhand's Ganga corridor." },
    ],
  },
  "bhilai": {
    name: "Bhilai", state: "Chhattisgarh",
    headline: "Credit Consultant in Bhilai — CIBIL Score Repair & Loan Advisory",
    description: "Bhilai's trusted credit advisory service helping SAIL steel plant workers, contractors and business owners in Chhattisgarh's steel capital access the best home and personal loans.",
    localFact: "Bhilai Steel Plant is one of India's largest integrated steel plants — thousands of employees and contractors here need strong credit profiles for home and family loans.",
    population: "600,000+", pincode: "490001–490026",
    areas: ["Sector 1", "Sector 5", "Sector 9", "Civic Centre", "Nehru Nagar", "Smriti Nagar", "Risali", "Bhilai 3", "Camp 2", "Steel Plant Township"],
    faqs: [
      { q: "Do you help SAIL Bhilai Steel Plant employees?", a: "Yes — we help BSP employees and contractors access home and personal loans at the best rates through credit improvement." },
      { q: "Can you fix my CIBIL score in Bhilai?", a: "Yes — our Bhilai clients see 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Durg and Rajnandgaon?", a: "Yes — our remote service covers all of Chhattisgarh's industrial belt." },
    ],
  },
  "rourkela": {
    name: "Rourkela", state: "Odisha",
    headline: "Credit Consultant in Rourkela — CIBIL Score Repair & Loan Advisory",
    description: "Rourkela's trusted credit repair specialists helping SAIL steel plant employees, industrial workers and business owners in Odisha's steel city access the best financial products.",
    localFact: "Rourkela Steel Plant is one of India's pioneering integrated steel plants — RSP employees and Rourkela's growing industrial community depend on strong credit profiles for loans.",
    population: "550,000+", pincode: "769001–769016",
    areas: ["Sector 1", "Sector 6", "Sector 20", "Chhend Colony", "Uditnagar", "Koelnagar", "Sundargarh Road", "Birsa Munda Area", "Civil Township", "Bondamunda"],
    faqs: [
      { q: "Do you help Rourkela Steel Plant employees?", a: "Yes — we help RSP and SAIL employees in Rourkela access home and personal loans at the best rates." },
      { q: "Can you fix my CIBIL score in Rourkela?", a: "Yes — our Rourkela clients see 80–150 point improvements in 3–6 months through our structured program." },
      { q: "Do you serve Sundargarh and Sambalpur?", a: "Yes — our remote service covers all of western Odisha." },
    ],
  },
  "vapi": {
    name: "Vapi", state: "Gujarat",
    headline: "Credit Consultant in Vapi — CIBIL Score Repair & Business Loan Experts",
    description: "Vapi's premier credit advisory service helping chemical, pharmaceutical and textile workers in South Gujarat's industrial powerhouse access the best business and home loan products.",
    localFact: "Vapi is one of India's top industrial clusters with over 2,500 chemical, pharma and textile units — business credit is critical for this export-driven manufacturing economy.",
    population: "250,000+", pincode: "396191–396195",
    areas: ["GIDC Vapi", "Kolak", "Saily", "Chala", "Chanod", "Sarigam", "Daman Road", "National Highway 48", "Rohit Nagar", "Panchal Society"],
    faqs: [
      { q: "Do you help chemical industry businesses in Vapi?", a: "Yes — we build business credit profiles for Vapi's chemical, pharma and textile exporters to access working capital at the best rates." },
      { q: "How can I improve my CIBIL score in Vapi?", a: "Our Vapi advisors create personalised plans targeting 80–150 point improvements in 3–6 months." },
      { q: "Do you serve Daman and Silvassa?", a: "Yes — our remote service covers south Gujarat and the Union Territories of Daman & Diu and Dadra & Nagar Haveli." },
    ],
  },
  "noida": {
    name: "Noida", state: "Uttar Pradesh",
    headline: "Credit Consultant in Noida — CIBIL Score Repair & Loan Advisory",
    description: "Noida's leading credit repair specialists helping IT professionals, auto workers and NCR residents in India's fastest-growing tech and manufacturing hub improve their CIBIL scores.",
    localFact: "Noida hosts Samsung, HCL, Infosys and hundreds of auto-ancillary manufacturers — its workforce has one of India's highest personal loan uptakes, making credit scores critical.",
    population: "700,000+", pincode: "201301–201310",
    areas: ["Sector 18", "Sector 62", "Sector 63", "Sector 137", "Greater Noida", "Noida Expressway", "Film City Area", "Sector 15", "Sector 44", "Knowledge Park"],
    faqs: [
      { q: "Do you help IT professionals in Noida with loans?", a: "Yes — we help Noida's IT sector employees access home and personal loans at the best available rates." },
      { q: "Can I get a home loan in Greater Noida with low CIBIL?", a: "We help Noida and Greater Noida residents improve their scores and qualify for the best home loan rates." },
      { q: "Do you serve Ghaziabad and Jewar?", a: "Yes — our remote service covers all of western UP's NCR belt including Ghaziabad, Greater Noida and Jewar." },
    ],
  },
};


export function CityPage() {
  const { city } = useParams<{ city: string }>();

  // 301-style redirect: old /:city → /individual/:region/:city
  const redirectTo = city ? CITY_REDIRECTS[city.toLowerCase()] : null;
  if (redirectTo) return <Navigate to={redirectTo} replace />;

  const data = city ? CITIES[city.toLowerCase()] : null;
  if (!data) return <Navigate to="/" replace />;

  const citySchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `https://creditconsultant.in/${city}`,
    "name": `Credit Consultant ${data.name}`,
    "description": data.description,
    "url": `https://creditconsultant.in/${city}`,
    "telephone": "+919538049888",
    "email": "accounts@creditconsultant.in",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.name,
      "addressRegion": data.state,
      "addressCountry": "IN",
    },
    "areaServed": { "@type": "City", "name": data.name },
    "serviceType": ["Credit Repair", "CIBIL Score Improvement", "Loan Advisory"],
    "parentOrganization": { "@id": "https://creditconsultant.in/#organization" },
  };

  return (
    <div className="w-full">
      <SEOHead
        title={data.headline}
        description={`${data.description} Free consultation for ${data.name} residents. Call +91 95380 49888.`}
        keywords={`credit consultant ${data.name.toLowerCase()}, CIBIL score repair ${data.name.toLowerCase()}, credit repair ${data.name.toLowerCase()}, home loan ${data.name.toLowerCase()}, personal loan ${data.name.toLowerCase()}`}
        canonical={`https://creditconsultant.in/${city}`}
        schema={[citySchema, faqSchema(data.faqs), breadcrumbSchema([{ name: "Home", path: "/" }, { name: data.name, path: `/${city}` }])]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[90px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-teal-200/80 text-xs font-semibold mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white font-bold">{data.name}</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Credit Advisory • {data.name}
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
              Credit Consultant in{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">{data.name}</span>
            </h1>
            <p className="text-base lg:text-xl text-teal-100/90 mb-8 leading-relaxed max-w-2xl font-normal">
              {data.description}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-xl shadow-amber-500/20 transition-all">
                  Free Consultation <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <CheckScoreButton variant="white" className="h-12 px-7 text-sm font-bold rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Local insight */}
      <section className="bg-teal-900/10 border-b border-teal-200/60 py-8 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-teal-600/30">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-base mb-1">Why {data.name} residents need credit advisory</p>
              <p className="text-slate-600 text-sm leading-relaxed">{data.localFact}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "10,000+", label: "Happy Clients Across India" },
              { value: "98%",     label: "Success Rate" },
              { value: "+150",    label: "Avg Score Improvement" },
              { value: "15+",     label: "Years of Experience" },
            ].map((s) => (
              <div key={s.label} className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/60 hover:shadow-lg transition-all duration-300">
                <p className="text-3xl lg:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 mb-1">{s.value}</p>
                <p className="text-xs font-bold text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — city specific */}
      <HowItWorks
        title="How It Works"
        cityName={data.name}
        subtitle={`Our credit repair process for ${data.name} clients follows the official CIBIL dispute methodology — every step managed by our certified experts.`}
        bg="gray"
        showCTA={true}
      />

      {/* Areas covered */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-slate-50/80 p-8 rounded-3xl border border-slate-200/80">
              <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Local Coverage</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Areas We Serve in {data.name}
              </h2>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Our advisory services cover all major localities in {data.name}, {data.state}.
                All services are available remotely — no office visit required.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {data.areas.map((area) => (
                  <span key={area} className="bg-white text-teal-900 text-xs font-bold px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:border-teal-400 hover:shadow-md transition-all">
                    📍 {area}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Why Choose Us in {data.name}?</h3>
              <div className="space-y-4">
                {[
                  `Free credit consultation for all ${data.name} residents`,
                  "Personalised CIBIL score improvement plan",
                  "Direct bureau dispute management",
                  "Loan matching with 50+ lenders",
                  "No upfront fees — pay only for results",
                  "24/7 advisor support via phone and WhatsApp",
                ].map((b) => (
                  <div key={b} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-slate-800 text-sm font-semibold">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-slate-50/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">City FAQs</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions — {data.name}
            </h2>
          </div>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <Card key={i} className="border border-slate-200/80 rounded-3xl bg-white shadow-sm overflow-hidden">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-base font-bold text-slate-900">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-teal-50 to-emerald-50 border border-teal-200/80 rounded-3xl p-10 text-center shadow-sm">
          <div className="flex justify-center gap-1.5 mb-4">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
          </div>
          <blockquote className="text-center text-lg lg:text-xl text-slate-800 font-extrabold leading-relaxed mb-4">
            "Credit Consultant helped me improve my CIBIL score by 140 points in just 5 months.
            I finally got my home loan approved in {data.name} at the best interest rate!"
          </blockquote>
          <p className="text-center text-xs font-bold text-teal-700 uppercase tracking-widest">— Verified Client from {data.name}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight">
            Ready to Improve Your Credit Score in {data.name}?
          </h2>
          <p className="text-teal-100/90 mb-8 max-w-xl mx-auto text-base leading-relaxed">
            Get a free consultation today. Our {data.name} credit advisors are available Mon–Fri 9 AM–6 PM and Sat 9 AM–2 PM.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+919538049888">
              <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 font-bold text-sm px-7 py-3 rounded-xl shadow-lg">
                <Phone className="mr-2 w-4 h-4 text-teal-700" /> Call +91 95380 49888
              </Button>
            </a>
            <a href="mailto:accounts@creditconsultant.in">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold text-sm px-7 py-3 rounded-xl">
                <Mail className="mr-2 w-4 h-4 text-teal-300" /> accounts@creditconsultant.in
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Hub links — internal linking to pillar pages */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Complete Guides for {data.name} Residents</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { to: "/cibil-score", title: "CIBIL Score Guide", desc: `Everything about your CIBIL score — check free, improve, dispute. Tailored for ${data.name} residents.`, color: "blue" },
              { to: "/credit-repair", title: "Credit Repair Guide", desc: `Remove write-offs, repair settlements and dispute bureau errors in ${data.name}.`, color: "purple" },
              { to: "/loans", title: "Loan Products", desc: `Best home, business, personal and car loan rates for ${data.name} borrowers.`, color: "green" },
            ].map((h) => (
              <Link key={h.to} to={h.to}
                className="block p-6 rounded-3xl border border-slate-200/80 bg-white hover:border-teal-300 hover:shadow-xl transition-all duration-300 group">
                <p className="font-extrabold text-slate-900 group-hover:text-teal-700 text-base mb-2">{h.title} →</p>
                <p className="text-xs text-slate-500 leading-relaxed">{h.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other cities */}
      <section className="py-14 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            We Also Serve
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {Object.entries(CITIES)
              .filter(([slug]) => slug !== city)
              .map(([slug, c]) => (
                <Link key={slug} to={`/${slug}`}
                  className="text-xs font-bold text-slate-600 bg-white hover:bg-teal-600 hover:text-white px-3.5 py-2 rounded-xl transition-all border border-slate-200 shadow-sm">
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
