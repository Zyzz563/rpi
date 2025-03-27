export default function AboutPage() {
  return (
    <div className="text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-mono font-bold mb-2 text-center">About KIP BANK</h1>
        <h2 className="text-xl text-kip-green text-center mb-12">The Most Ridiculous Bank in Crypto</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <h3 className="text-2xl font-mono text-kip-green mb-6">Our "Story"</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                In a world full of serious financial institutions making empty promises, 
                we decided to create a bank that makes ridiculous promises we openly admit we might not keep.
              </p>
              <p>
                KIP BANK was founded in 2024 by a group of developers who had no idea what they were doing, 
                and frankly, still don't. But that's what makes us special!
              </p>
              <p>
                Our mission is simple: we'll figure it out somehow. Whether it's blockchain technology, 
                financial services, or just keeping the website running, we approach everything with the 
                same level of chaotic optimism.
              </p>
              <p>
                Unlike traditional banks that pretend to know what they're doing while causing global financial 
                crises, we're upfront about our confusion. At least we're honest!
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="cyber-border p-px">
              <div className="bg-gray-900 p-6">
                <h3 className="text-2xl font-mono text-kip-green mb-6">Our "Values"</h3>
                <ul className="space-y-6">
                  <li>
                    <h4 className="text-xl mb-2 flex items-center">
                      <span className="text-kip-green mr-2">01.</span> Transparency
                    </h4>
                    <p className="text-gray-400">
                      We're completely transparent about the fact that we have no idea what we're doing. 
                      Other banks hide their incompetence behind fancy terms like "market volatility" 
                      and "economic factors." We just say, "Oops, our bad!"
                    </p>
                  </li>
                  <li>
                    <h4 className="text-xl mb-2 flex items-center">
                      <span className="text-kip-green mr-2">02.</span> Innovation
                    </h4>
                    <p className="text-gray-400">
                      We innovate by trying random things and seeing what sticks. Sometimes our innovations 
                      are mistaken for bugs, but we prefer to call them "unexpected features."
                    </p>
                  </li>
                  <li>
                    <h4 className="text-xl mb-2 flex items-center">
                      <span className="text-kip-green mr-2">03.</span> Community
                    </h4>
                    <p className="text-gray-400">
                      We believe in the power of community because it's easier to blame collective 
                      decision-making when things go wrong. Join our community and share the blame!
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-black border border-kip-green flex items-center justify-center">
              <span className="text-kip-green font-mono">KIP</span>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h3 className="text-2xl font-mono text-kip-green text-center mb-8">Meet Our "Team"</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-24 h-24 mx-auto mb-4 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-kip-green to-kip-green-dark rounded-full flex items-center justify-center text-black text-3xl font-bold">
                  C
                </div>
              </div>
              <h4 className="text-xl text-center mb-1">Crypto Chad</h4>
              <p className="text-kip-green text-center text-sm mb-4">CEO & Chief Meme Officer</p>
              <p className="text-gray-400 text-sm text-center">
                Has been in crypto since yesterday. Believes that "diamond hands" is a personality trait.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-24 h-24 mx-auto mb-4 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-kip-green to-kip-green-dark rounded-full flex items-center justify-center text-black text-3xl font-bold">
                  D
                </div>
              </div>
              <h4 className="text-xl text-center mb-1">Dev Dude</h4>
              <p className="text-kip-green text-center text-sm mb-4">CTO & Stack Overflow Searcher</p>
              <p className="text-gray-400 text-sm text-center">
                Builds all our tech by copying and pasting from GitHub. Once accidentally deployed our private keys.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-24 h-24 mx-auto mb-4 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-kip-green to-kip-green-dark rounded-full flex items-center justify-center text-black text-3xl font-bold">
                  M
                </div>
              </div>
              <h4 className="text-xl text-center mb-1">Marketing Maven</h4>
              <p className="text-kip-green text-center text-sm mb-4">CMO & Social Media Wizard</p>
              <p className="text-gray-400 text-sm text-center">
                Believes any publicity is good publicity. Strategy includes posting memes and hoping for viral content.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-mono text-kip-green mb-6">Our "Office"</h3>
          <div className="max-w-2xl mx-auto cyber-border p-1 mb-4">
            <div className="bg-black bg-opacity-50 p-6">
              <p className="text-gray-400 text-sm">
                KIP BANK is proudly headquartered in a Discord server and occasionally someone's basement when the WiFi is good. 
                We hold our board meetings in Minecraft because it's more secure than Zoom.
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            If you'd like to visit us in person, just spin around three times, close your eyes, and imagine a really cool office with lots of green lights and unnecessary computer screens. That's us!
          </p>
        </div>
      </div>
    </div>
  );
} 