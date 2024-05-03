"use client";

import React, { useState } from "react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


const crimes = [
  { 
    type: "Pickpocket", 
    date: "April 1st, 2024", 
    time: "11:12 PM", 
    description: "The suspect was wearing a black hoodie and blue jeans. The individual was seen approaching tourists in crowded areas and was caught on CCTV removing wallets from bags and pockets."
  },
  { 
    type: "Assault", 
    date: "April 2nd, 2024", 
    time: "1:02 PM", 
    description: "The suspect was a tall man with a beard, observed shouting at a pedestrian before physically assaulting them. The altercation occurred outside a local bar, and several witnesses have provided statements."
  },
  { 
    type: "Theft", 
    date: "Mar 30th, 2024", 
    time: "9:53 AM", 
    description: "The suspect was seen lingering near a parked bicycle at the shopping mall's parking area. Security footage shows the individual cutting the bike lock and fleeing the scene with the bicycle."
  },
  { 
    type: "Vandalism", 
    date: "April 5th, 2024", 
    time: "6:38 PM",
    description: "The suspect was captured by street cameras spray painting graffiti on the side of a newly renovated storefront. The graffiti included large letters and symbols, causing significant property damage."
  },
  { 
    type: "Robbery", 
    date: "April 5th, 2024", 
    time: "8:12 PM", 
    description: "During the late evening, a masked suspect entered a convenience store, threatening the clerk with a knife and demanding money. The suspect took cash from the register and several packs of cigarettes before fleeing on foot."
  },
  { 
    type: "Pickpocket", 
    date: "April 6th, 2024", 
    time: "3:12 PM", 
    description: "Another incident involving pickpocketing occurred near the city museum where a suspect distracted a couple by pretending to ask for directions while an accomplice removed valuables from their backpack."
  },
  { 
    type: "Public Nuisance", 
    date: "April 6th, 2024", 
    time: "5:12 PM", 
    description: "A group of individuals were reported causing a disturbance in the central park area. They were playing loud music, consuming alcohol in public, and engaging in aggressive behavior towards other park-goers."
  }
];


const AnalyticsPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState({});
  const [loading, setLoading] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [displaySummary, setDisplaySummary] = useState("");
  const [isTyping, setIsTyping] = useState(false);  

  const fullSummary = `
    <p><strong>Crime Report Summary</strong></p>
    <p>This report summarizes a series of crimes occurring between March 30th, 2024 and April 6th, 2024, based on descriptions from various sources such as witness statements and security footage.</p>
    <br />
    <p><strong><u>Recurring Incidents</strong></u></p>
    <ul>
      <li><strong>Pickpocketing:</strong> Two separate incidents of pickpocketing targeted tourists in crowded areas. Suspects employed distraction techniques, such as bumping into victims or asking for directions, while accomplices stole wallets and valuables.</li>
      <li><strong>Public Nuisance:</strong> A group of individuals caused a disturbance in the central park area, engaging in loud music, public alcohol consumption, and aggressive behavior towards others.</li>
    </ul>
    <br />
    <p><strong><u>Other Notable Crimes</u></strong></p>
    <ul>
      <li><strong>Assault:</strong> Two separate incidents of pickpocketing targeted tourists in crowded areas. Suspects employed distraction techniques, such as bumping into victims or asking for directions, while accomplices stole wallets and valuables.</li>
      <li><strong>Theft:</strong> A bicycle was stolen from the shopping mall parking area. Security footage captured the suspect cutting the bike lock and fleeing the scene.</li>
      <li><strong>Vandalism:</strong> A newly renovated storefront was vandalized with spray-painted graffiti, causing significant property damage. Street cameras recorded the incident.</li>
      <li><strong>Robbery:</strong> A masked individual armed with a knife robbed a convenience store, taking cash and cigarettes before escaping on foot.</li>
    </ul>
    <br />
    <p><strong><u>Recommendations</strong></u></p>
    <ul>
      <li><strong>Increased Security Presence:</strong> More patrols in crowded tourist areas and the central park could deter pickpocketing and public nuisance activities.</li>
      <li><strong>Public Awareness Campaigns:</strong> Educating the public about common pickpocket tactics and encouraging vigilance can help prevent future incidents.</li>
      <li><strong>Improved Security Measures:</strong> Enhanced security measures, such as additional cameras and improved lighting, may deter theft and vandalism.</li>
      <li><strong>Investigation and Apprehension:</strong> Continued investigation into the assault, robbery, and vandalism cases is crucial to identify and apprehend the suspects.</li>
    </ul>
    <br />
    <p><strong><u>Conclusion</strong></u></p>
    <p>Overall, these incidents highlight the need for increased vigilance and security measures in public spaces. Addressing the recurring issues of pickpocketing and public nuisance requires a multi-pronged approach involving law enforcement, public awareness, and community engagement.</p>
  `;



  const handleCardClick = (crime) => {
    setSelectedCrime(crime);
    setModalShow(true);
  };

  const handleGenerateSummary = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsTyping(true);
      setDisplaySummary("");  
      setSummaryText(fullSummary);
      displayTextByLetter(fullSummary, 0);
    }, 2000);
  };


  const chunkSize = 3;
  const displayTextByLetter = (text, index) => {
    if (index < text.length) {
      const nextIndex = index + chunkSize;
      const textToAdd = text.slice(index, nextIndex);
      setTimeout(() => {
        setDisplaySummary((prev) => prev + textToAdd);
        displayTextByLetter(text, nextIndex);
      }, 1);
    } else {
      setIsTyping(false);
      setLoading(false);
    }
  };


  return (
    <div className="relative">
      <Header />

      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8 min-h-screen pt-28">
        <Card className="p-6 pb-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Crime Reports</h1>
            <p className="text-gray-500 dark:text-gray-400">All the crime reports from the past seven days in store, generated by Gemini.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {crimes.map((crime, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => handleCardClick(crime)}>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{crime.type}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{crime.date}</p>
                  <p className="text-gray-500 dark:text-gray-400">{crime.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 pb-8 mt-10 mb-20">
          <div className="">
            <h1 className="text-3xl font-bold">Crime Reports Summary</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Generate a summary of the crime reports above, 
              using Gemini, which includes the most common type of crime, the trend of crime reports, and more.
            </p>
          </div>
          <div className="text-gray-700 my-4 font-semibold" dangerouslySetInnerHTML={{ __html: displaySummary }}></div>
          <Button onClick={handleGenerateSummary} disabled={loading || isTyping}>
            {loading || isTyping ? "Generating..." : "Generate Summary"}
          </Button>
        </Card>
      </main>

      <Modal show={modalShow} onClose={() => setModalShow(false)} crime={selectedCrime} />

      <Footer />
    </div>
  );
};

export default AnalyticsPage;


const Modal = ({ show, onClose, crime }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center px-4 py-8 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-800 dark:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">{crime.type}</h3>
          <p className="text-sm text-gray-600">Date: {crime.date} | Time: {crime.time}</p>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Details of the Incident:</h4>
          <p className="text-gray-700 dark:text-gray-300">
            {crime.description || "No detailed description available."}
          </p>
        </div>
      </div>
    </div>
  );

};