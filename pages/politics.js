import { useState } from 'react';

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);

  const accordionItems = [
    {
      title: 'Campaign Finance',
      content: "Everyone's absolute priority should be cleaning up our elections. No one should vote for a candidate who doesn't support and vote for serious campaign finance reforms.  Some examples:",
      bullet1: "Regulation: AI, Crypto, Brain-Computer Interfaces... the octogenarians running the country are too far behind and apparently unable to do their job in the modern world.  We are at a turning point for humanity where progress is basically logarithmic, we must get a grip on that."
    },
    {
      title: 'Economics: Need to Restore Innovation Economy',
      content: "The stock market is unhinged from fundamentals and currently provides no benefit to many Americans. Management practices are a sham, and inequality is far beyond any logical boundary. Just look at Jeff Bezos trying to copy everyone... Alexa (from Google voice), Blue Origin (from SpaceX), and trying to make a Fire phone that failed for the exact same reaosn the Windows phone failed.  These people are not geniuses and to allow wealth to concentrate this much and be spent on their vanity projects is insane and insanely wasteful.",
      bullet1: 'Redistribution, No ceiling but 100% Estate Tax, Limited Profits, Strong Anti-Trust particularly in vulnerable industries like cloud computing and telecoms (though maybe not defense?), Thomas Picketty (Anti-Trickle Down), Strong Unions and Labor Rights (PTO), Limit CEO Pay.  Where do GOPers think trickle-down and perpetually growing inequality will take us?'
    },
    {
      title: 'Social',
      content: 'Content for section 3'
    },
    {
      title: 'Foreign Policy',
      content: 'Divide and conquer, innovate at home, selectively share patents with the global south.  Be the anti Belt+Road Initiative, be generous.'
    }
  ];

  return (
    <>
      <header className="bg-blue-500 text-white pt-20 pl-10 pr-10">
        <h1 className="text-2xl">My Politics</h1>
        <p className="pt-4">As the founder of a news website, I think it's important that you're aware of my personal ideology. While I certainly strive to provide objective information, biases creep in and by providing this information you can be more informed and understand where any perceived biases are coming from.</p>
        <p className="pt-4">My politics are driven by what I feel would get us to a society where a majority-middle class can afford annual vacations abroad and preventive care doctors visits.</p>
      </header>

      <main className="p-10 h-[75vh]" >
        {accordionItems.map((item, index) => (
          <div key={index} className="mb-4 rounded-md shadow-md overflow-hidden">
            <button
              className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none flex items-center justify-between"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {item.title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="16"
                height="16"
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? 'rotate-90' : ''
                }`}
              >
                <path d="M7,24a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l8.17-8.17a3,3,0,0,0,0-4.24L6.29,1.71A1,1,0,0,1,7.71.29l8.17,8.17a5,5,0,0,1,0,7.08L7.71,23.71A1,1,0,0,1,7,24Z"/>
              </svg>
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white">{item.content},<li className="pt-2">{item.bullet1}</li></div>
            )}
          </div>
        ))}
      </main>
    </>
   );
}