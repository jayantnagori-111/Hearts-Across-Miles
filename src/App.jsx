/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const PremiumBirthdayExperience = () => {
  const [currentSection, setCurrentSection] = useState('landing');
  const [showImages, setShowImages] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noStyle, setNoStyle] = useState({});
  const [currentMessage, setCurrentMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [timelineActive, setTimelineActive] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showHeartExplosion, setShowHeartExplosion] = useState(false);
  const [personalNotes, setPersonalNotes] = useState({
    love: '',
    memory: '',
    mushy: '',
    wish: ''
  });
  const [countdownActive, setCountdownActive] = useState(false);
  const [birthdayCountdown, setBirthdayCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showLoveLetters, setShowLoveLetters] = useState(false);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [showWishingWell, setShowWishingWell] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [newWish, setNewWish] = useState('');
  const [flippedIndices, setFlippedIndices] = useState([])
const [gameCards, setGameCards] = useState([]);
const [flippedCardIds, setFlippedCardIds] = useState([]); // Renamed from flippedCards to avoid confusion
const [matchedCardIds, setMatchedCardIds] = useState([]);

  const audioRef = useRef(null)

// Initialize audio when component mounts
useEffect(() => {
  // This helps with autoplay policies
  const handleFirstInteraction = () => {
    document.removeEventListener('click', handleFirstInteraction);
  };
  document.addEventListener('click', handleFirstInteraction);

  return () => {
    // Cleanup
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    document.removeEventListener('click', handleFirstInteraction);
  };
}, []);

  const noTexts = [
    'No',
    'Are you absolutely sure?',
    'Really? On your birthday?',
    'How can you be so wrong? 😅',
    'Wrong again 😑',
    'Stop it, you know you do!',
    'You need help 😂',
    'Seriously? Try harder.',
    'Giving up already?',
    'This is painful to watch 😔',
    'Sigh... I\'ll wait forever 🥲',
    'My heart is breaking 💔',
    'Fine, I\'ll make this easier...',
    'Last chance before I cry!',
    'You\'re being ridiculous now 🙄'
  ];

  const romanticMessages = [
    'You light up my world like nobody else 💫',
    'Every moment with you is a memory worth framing 🖼️',
    'Falling for you wasn\'t a choice... it was destiny ✨',
    'If I could wish for one thing — it would still be you, every time ❤️',
    'You make love look so effortless 💕',
    'Four years later and you still give me butterflies 🦋',
    'This site is cheesy, but so is my heart for you 🧀💘',
    'You\'re not just my girlfriend, you\'re my best friend 👫',
    'Every day with you feels like the first day of forever 🌟',
    'You\'re the plot twist I never saw coming 📚💝'
  ];

  const memoryTimeline = [
    { year: '2023', title: 'First Meeting', description: 'The day everything changed...', emoji: '💫' },
    { year: '2024', title: 'First Anniversary', description: 'One year of pure magic', emoji: '🎂' },
    { year: '2024', title: 'Adventures Together', description: 'Creating memories between lakes and palaces', emoji: '🌍' },
    { year: '2025', title: 'Growing Stronger', description: 'Through every challenge, together', emoji: '💪' },
    { year: '2025', title: 'Present Day', description: 'Still falling for you every day', emoji: '💕' },
    { year: '2025', title: 'Forever Ahead', description: 'Can\'t wait to see what comes next', emoji: '🚀' }
  ];

  const loveQuotes = [
    "In a sea of people, my eyes will always search for you 👀💕",
    "You're my favorite notification 📱💖",
    "I love you more than pizza... and that's saying something 💝",
    "You're the reason I look down at my phone and smile 😊",
    "Home isn't a place, it's a person. You're my home 🏠❤️"
  ];

  const birthdayPhotos = [
    'pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg',
    'pic6.jpg', 'pic7.jpg', 'pic8.jpg', 'pic9.jpg', 'pic10.jpg',
    'pic11.jpg','pic12.jpg'
  ];
  const memoryGameImages = [
  { id: 1, image: '/game1.jpg' },
  { id: 2, image: '/game1.jpg' }, // Pair 1
  { id: 3, image: '/game2.jpg' },
  { id: 4, image: '/game2.jpg' }, // Pair 2
  { id: 5, image: '/game3.jpg' },
  { id: 6, image: '/game3.jpg' }, // Pair 3
  { id: 7, image: '/game4.jpg' },
  { id: 8, image: '/game4.jpg' }  // Pair 4
];
useEffect(() => {
  if (showMemoryGame) {
    const shuffledCards = [...memoryGameImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, matched: false }));
    setGameCards(shuffledCards);
    setFlippedCardIds([]);
    setMatchedCardIds([]);
    setGameScore(0);
  }
}, [showMemoryGame]);
const handleMemoryGame = (cardId) => {
  // Prevent action if already flipped 2 cards or card is already matched/flipped
  if (flippedCardIds.length === 2 || 
      matchedCardIds.includes(cardId) || 
      flippedCardIds.includes(cardId)) {
    return;
  }

  const newFlippedCards = [...flippedCardIds, cardId];
  setFlippedCardIds(newFlippedCards);

  if (newFlippedCards.length === 2) {
    const [firstId, secondId] = newFlippedCards;
    const firstCard = gameCards.find(c => c.id === firstId);
    const secondCard = gameCards.find(c => c.id === secondId);

    if (firstCard.image === secondCard.image) {
      // Match found
      setMatchedCardIds([...matchedCardIds, firstId, secondId]);
      setGameScore(gameScore + 10);
      setFlippedCardIds([]);
    } else {
      // No match - flip back after delay
      setTimeout(() => {
        setFlippedCardIds([]);
      }, 1000);
    }
  }
};

const [flippedCards, setFlippedCards] = useState(Array(birthdayPhotos.length).fill(false));

  const handleFlip = (index) => {
  const newFlippedCards = [...flippedCards];
  newFlippedCards[index] = !newFlippedCards[index];
  setFlippedCards(newFlippedCards);
};
const toggleFlip = (index) => {
  setFlippedIndices(prev => 
    prev.includes(index) 
      ? prev.filter(i => i !== index) 
      : [...prev, index]
  );
};

  // Initialize countdown
  useEffect(() => {
    const targetDate = new Date('2025-06-20T00:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setBirthdayCountdown({ hours, minutes, seconds });
      } else {
        setBirthdayCountdown({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Rotating messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(romanticMessages[Math.floor(Math.random() * romanticMessages.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Rotating quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % loveQuotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleYes = () => {
    setShowImages(true);
    setShowConfetti(true);
    setShowHeartExplosion(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowHeartExplosion(false);
    }, 8000);
  };

  const handleNo = () => {
    setNoClickCount((prev) => prev + 1);
    const size = Math.min(100 + noClickCount * 15, 200);
    const randomX = Math.floor(Math.random() * (window.innerWidth - 200)) - (window.innerWidth / 2);
    const randomY = Math.floor(Math.random() * (window.innerHeight - 100)) - (window.innerHeight / 2);
    
    setNoStyle({
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: `translate(${randomX}px, ${randomY}px) scale(${size/100})`,
      fontSize: `${Math.min(size, 150)}%`,
      transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      zIndex: 1000
    });

    // Reset position after animation
    setTimeout(() => {
      setNoStyle({});
    }, 2000);
  };

  const toggleMusic = () => {
  if (!audioRef.current) return;

  if (musicPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play()
      .then(() => {
        setMusicPlaying(true);
      })
      .catch(error => {
        console.error("Audio playback failed:", error);
        // Show user-friendly message
        alert("Please click anywhere on the page first to enable audio playback");
      });
  }
  setMusicPlaying(!musicPlaying);
};

  // const handleMemoryGame = (cardId) => {
  //   if (flippedCards.length === 2) return;
    
  //   const newCards = gameCards.map(card => 
  //     card.id === cardId ? { ...card, flipped: true } : card
  //   );
  //   setGameCards(newCards);
    
  //   const newFlipped = [...flippedCards, cardId];
  //   setFlippedCards(newFlipped);
    
  //   if (newFlipped.length === 2) {
  //     const [first, second] = newFlipped;
  //     const firstCard = gameCards.find(c => c.id === first);
  //     const secondCard = gameCards.find(c => c.id === second);
      
  //     if (firstCard.emoji === secondCard.emoji) {
  //       setGameScore(gameScore + 10);
  //       setTimeout(() => {
  //         setGameCards(prev => prev.map(card => 
  //           card.id === first || card.id === second 
  //             ? { ...card, matched: true }
  //             : card
  //         ));
  //         setFlippedCards([]);
  //       }, 1000);
  //     } else {
  //       setTimeout(() => {
  //         setGameCards(prev => prev.map(card => 
  //           card.id === first || card.id === second 
  //             ? { ...card, flipped: false }
  //             : card
  //         ));
  //         setFlippedCards([]);
  //       }, 1000);
  //     }
  //   }
  // };

  const addWish = () => {
    if (newWish.trim()) {
      setWishes([...wishes, { text: newWish, timestamp: new Date() }]);
      setNewWish('');
    }
  };

  const floatingHearts = Array.from({ length: 30 }, (_, i) => i);
  const explosionHearts = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 100 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 100 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: 360,
                scale: [1, 0.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Heart Explosion */}
      {showHeartExplosion && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {explosionHearts.map((i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 1.5, 0],
                rotate: 360,
                x: (Math.random() - 0.5) * 1000,
                y: (Math.random() - 0.5) * 1000,
              }}
              transition={{
                duration: 2,
                delay: i * 0.05,
              }}
            >
              💖
            </motion.div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-pink-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Happy 21st Birthday! 🎉
          </h1>
          <div className="flex gap-4">
            <button
  onClick={toggleMusic}
  className={`px-4 py-2 rounded-full transition-colors ${
    musicPlaying 
      ? 'bg-green-500 hover:bg-green-600 text-white' 
      : 'bg-pink-500 hover:bg-pink-600 text-white'
  }`}
>
  {musicPlaying ? (
    <>
      <span className="mr-2">🔊</span> Music Playing
    </>
  ) : (
    <>
      <span className="mr-2">🔇</span> Play Music
    </>
  )}
</button>
            <button
              onClick={() => setShowPhotoGallery(!showPhotoGallery)}
              className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/40 rounded-full transition-colors"
            >
              📸 Gallery
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Countdown Timer */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl mb-4 text-pink-300">Birthday Countdown</h2>
            <div className="flex justify-center gap-6 text-4xl font-bold">
              <div className="text-center">
                <div className="bg-pink-500/20 rounded-lg p-4 min-w-20">
                  {birthdayCountdown.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-sm mt-2">Hours</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-500/20 rounded-lg p-4 min-w-20">
                  {birthdayCountdown.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-sm mt-2">Minutes</div>
              </div>
              <div className="text-center">
                <div className="bg-indigo-500/20 rounded-lg p-4 min-w-20">
                  {birthdayCountdown.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-sm mt-2">Seconds</div>
              </div>
            </div>
          </motion.div>

          {/* Main Question */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h1
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              My Beautiful Birthday Girl 💖
            </motion.h1>
            
            <motion.p
              className="text-2xl mb-8 text-pink-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Do you love me as much as I love you? 
              <br />
              <span className="text-lg text-purple-300">(Your entire birthday celebration depends on this! 😏)</span>
            </motion.p>

            {/* Rotating Love Messages */}
            <motion.div
              className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-6 mb-8 backdrop-blur-sm border border-pink-500/30"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <p className="text-xl text-center font-medium">
                {currentMessage}
              </p>
            </motion.div>

            {/* Rotating Quotes */}
            <motion.div
              className="mb-8"
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-pink-300 italic">
                "{loveQuotes[currentQuote]}"
              </p>
            </motion.div>

            {/* Buttons */}
<div className="flex justify-center gap-8 mb-12 relative z-50"> {/* Added z-50 */}
  <motion.button
    className="px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-full text-2xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 relative z-50"
    onClick={() => {
      console.log("Yes button clicked"); // Debugging
      handleYes();
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    animate={{ 
      boxShadow: [
        '0 0 20px rgba(34, 197, 94, 0.3)',
        '0 0 40px rgba(34, 197, 94, 0.6)',
        '0 0 20px rgba(34, 197, 94, 0.3)'
      ]
    }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    YES! 💕
  </motion.button>

  <motion.button
    className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full text-xl font-bold shadow-2xl relative z-50"
    onClick={() => {
      console.log("No button clicked"); // Debugging
      handleNo();
    }}
    style={noStyle}
    whileHover={{ rotate: [0, 5, -5, 0] }}
    whileTap={{ scale: 1.2 }}
  >
    {noTexts[Math.min(noClickCount, noTexts.length - 1)]}
  </motion.button>
</div>
          </motion.div>

          {/* Success Section */}
          <AnimatePresence>
            {showImages && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.h2
                  className="text-4xl font-bold mb-8 text-pink-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  I KNEW IT! 🎉 Here's to us being absolutely perfect together! 💑
                </motion.h2>

                {/* Interactive Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  <motion.div
                    className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl p-6 backdrop-blur-sm border border-pink-500/30 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setTimelineActive(!timelineActive)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">📅 Our Journey</h3>
                    <p className="text-pink-200">Relive our beautiful timeline together</p>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 backdrop-blur-sm border border-purple-500/30 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setShowLoveLetters(!showLoveLetters)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">💌 Love Letters</h3>
                    <p className="text-purple-200">Read my heart in every word</p>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl p-6 backdrop-blur-sm border border-indigo-500/30 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setShowMemoryGame(!showMemoryGame)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">🎮 Memory Game</h3>
                    <p className="text-indigo-200">Match the memories we've made</p>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl p-6 backdrop-blur-sm border border-green-500/30 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setShowWishingWell(!showWishingWell)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">💫 Wishing Well</h3>
                    <p className="text-green-200">Make a wish for your special day</p>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 backdrop-blur-sm border border-yellow-500/30 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setShowPhotoGallery(!showPhotoGallery)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">📸 Photo Gallery</h3>
                    <p className="text-yellow-200">Our cutest moments captured</p>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl p-6 backdrop-blur-sm border border-red-500/30"
                  >
                    <h3 className="text-2xl font-bold mb-4">🎵 Our Playlist</h3>
                    <p className="text-red-200">Songs that remind me of you</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span>🎶 "Tum Se Hi" - Mohit Chauhan</span>
                        <span className="text-pink-300">5:38</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>🎶 "Tera Hone Laga Hoon" - Atif Aslam</span>
                        <span className="text-pink-300">4:58</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>🎶 "Sajna " - Darshan Raval</span>
                        <span className="text-pink-300">4:08</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline */}
                <AnimatePresence>
                  {timelineActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-12 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-8 border border-pink-500/20"
                    >
                      <h3 className="text-3xl font-bold mb-8 text-center">Our Love Story Timeline 💕</h3>
                      <div className="space-y-6">
                        {memoryTimeline.map((memory, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-6 p-4 bg-white/5 rounded-lg"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                          >
                            <div className="text-4xl">{memory.emoji}</div>
                            <div>
                              <div className="text-2xl font-bold text-pink-300">{memory.year}</div>
                              <div className="text-xl font-semibold">{memory.title}</div>
                              <div className="text-pink-200">{memory.description}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Love Letters */}
                <AnimatePresence>
                  {showLoveLetters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20"
                    >
                      <h3 className="text-3xl font-bold mb-8 text-center">Letters From My Heart 💌</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            title: "What I Love Most About You",
                            content: "Literally SabKuch Tumhara बात-बात पर रूठ जाना LEKIN फिर जल्दी से मान जाना,Tumhari Care and Obviously Tumhare gifts hehe...lekin the thing I love the most is that You will be staying by my side now and forever<3.Tumhara ख़याल रखने का जो तरीका है ना… Aur mere लिए जो इतने सारे sacrifices किए — specially वो Chemistry वाला exam 😭😂 "
                          },
                          {
                            title: "My Favorite Memory",
                            content: "Pata hai meri fav memory kaunsi hai?Wo din jab tumne mera birthday itna special bana diya tha… honestly, maine us din feel kiya ki koi itna effort mere liye kar sakta hai. That shit hit different.Aur McD ka wo moment bhool hi nahi sakta 😭Tu poora Coke gira ke table aur apni pant भिगो दी थी — aur fir dono hass hass ke pagal ho gaye the. Log dekh rahe the fir bhi kya फ़र्क पड़ता है😄Tumhare अनाड़ीपन se Tum saath ho toh ya to sab kuch cute hota hai… ya total disaster —  पर दोनों ही तरीकों से एकदम परफ़ेक्ट।."
                          },
                          {
                            title: "Why I'm Grateful",
                            content: "Main kabhi-kabhi itna ज़िद्दी aur rude हो जाता हूँ… और फिर भी तुम हर बार सब्र से handle करती हो, मुझे माफ़ कर देती हो।Tumने मुझे बार-बार feel कराया कि कैसे कोई एक अजनबी इंसान, धीरे-धीरे ज़िंदगी का ऐसा हिस्सा बन जाता है… जिसके बिना अब जीना मुश्किल लगता है।You taught me what real love and care feels like.You didn’t just love me — you changed me.Tumne mujhe वो इंसान बना दिया जो शायद मैं कभी सोच भी नहीं सकता था कि बन पाऊँगा।And for that… I’ll always be yours. ❤️"
                          },
                          {
                            title: "My Promise to You",
                            content: "To love you on your worst days, celebrate you on your best days, and choose you every single day in between. To be your biggest fan, your safe space, and your partner in all of life's adventures."
                          }
                        ].map((letter, index) => (
                          <motion.div
                            key={index}
                            className="bg-white/10 rounded-lg p-6 backdrop-blur-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.3 }}
                          >
                            <h4 className="text-xl font-bold mb-4 text-pink-300">{letter.title}</h4>
                            <p className="text-white/90 leading-relaxed">{letter.content}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Memory Game */}
                <AnimatePresence>
                {showMemoryGame && (
  <motion.div 
    className="mb-12 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-2xl p-6 border border-indigo-500/20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h3 className="text-2xl font-bold mb-4 text-center">Memory Match</h3>
    <p className="text-center mb-4 text-blue-200">Score: {gameScore}</p>
    
    <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
      {gameCards.map((card) => (
        <motion.div
          key={card.id}
          className={`aspect-square rounded-lg cursor-pointer overflow-hidden relative ${
            matchedCardIds.includes(card.id) ? 'ring-2 ring-green-400' : ''
          }`}
          onClick={() => handleMemoryGame(card.id)}
          whileHover={{ scale: 1.05 }}
          animate={{ 
            rotateY: flippedCardIds.includes(card.id) || matchedCardIds.includes(card.id) ? 0 : 180,
            scale: matchedCardIds.includes(card.id) ? 0.95 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Card Back */}
          {!(flippedCardIds.includes(card.id) || matchedCardIds.includes(card.id)) && (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center">
              <span className="text-3xl">?</span>
            </div>
          )}
          
          {/* Card Front */}
          {(flippedCardIds.includes(card.id) || matchedCardIds.includes(card.id)) && (
            <img 
              src={card.image} 
              alt="Memory card"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
)}
                </AnimatePresence>

                {/* Wishing Well */}
                <AnimatePresence>
                  {showWishingWell && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-12 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-2xl p-8 border border-green-500/20"
                    >
                      <h3 className="text-3xl font-bold mb-6 text-center">Birthday Wishing Well 💫</h3>
                      <div className="max-w-2xl mx-auto">
                        <div className="flex gap-4 mb-6">
                          <input
                            type="text"
                            value={newWish}
                            onChange={(e) => setNewWish(e.target.value)}
                            placeholder="Make a birthday wish..."
                            className="flex-1 px-4 py-3 bg-white/10 rounded-lg border border-green-400/30 text-white placeholder-white/60 focus:outline-none focus:border-green-400"
                            onKeyPress={(e) => e.key === 'Enter' && addWish()}
                          />
                          <button
                            onClick={addWish}
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-colors"
                          >
                            ✨ Wish
                          </button>
                        </div>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {wishes.map((wish, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
                            >
                              <p className="text-green-200">💫 {wish.text}</p>
                              <p className="text-xs text-green-300 mt-2">
                                {wish.timestamp.toLocaleTimeString()}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Photo Gallery */}
                <AnimatePresence>
                  {showPhotoGallery && (
  <motion.div
    className="mb-12 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-8 border border-yellow-500/20"
  >
    <h3 className="text-3xl font-bold mb-8 text-center">Our Photo Gallery 📸</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {birthdayPhotos.map((photo, index) => (
        <div 
          key={index}
          className="aspect-square cursor-pointer perspective-1000"
          onClick={() => toggleFlip(index)}
        >
          {/* Card container */}
          <motion.div
            className="relative w-full h-full preserve-3d"
            animate={{ rotateY: flippedIndices.includes(index) ? 180 : 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Front side (Heart) */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-lg flex items-center justify-center text-6xl backface-hidden">
              <img src="/cover.jpg" className="w-full h-full object-cover" alt="" srcset="" />
            </div>
            
            {/* Back side (Photo) */}
            <div className="absolute inset-0 bg-white rounded-lg backface-hidden rotate-y-180 overflow-hidden">
              <img 
                src={photo} 
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  </motion.div>
)}
                </AnimatePresence>

                {/* Personal Notes Section */}
                <motion.div
                  className="mb-12 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-8 border border-pink-500/20"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <h3 className="text-3xl font-bold mb-8 text-center">Write Your Heart Out 💭</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <textarea
                        placeholder="What I love most about you..."
                        value={personalNotes.love}
                        onChange={(e) => setPersonalNotes({...personalNotes, love: e.target.value})}
                        className="w-full h-32 px-4 py-3 bg-white/10 rounded-lg border border-pink-400/30 text-white placeholder-white/60 resize-none focus:outline-none focus:border-pink-400 backdrop-blur-sm"
                      />
                      <textarea
                        placeholder="That one memory I'll never forget..."
                        value={personalNotes.memory}
                        onChange={(e) => setPersonalNotes({...personalNotes, memory: e.target.value})}
                        className="w-full h-32 px-4 py-3 bg-white/10 rounded-lg border border-purple-400/30 text-white placeholder-white/60 resize-none focus:outline-none focus:border-purple-400 backdrop-blur-sm"
                      />
                    </motion.div>
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <textarea
                        placeholder="Okay this is where I turn into a complete mess..."
                        value={personalNotes.mushy}
                        onChange={(e) => setPersonalNotes({...personalNotes, mushy: e.target.value})}
                        className="w-full h-32 px-4 py-3 bg-white/10 rounded-lg border border-indigo-400/30 text-white placeholder-white/60 resize-none focus:outline-none focus:border-indigo-400 backdrop-blur-sm"
                      />
                      <textarea
                        placeholder="A secret wish for your future..."
                        value={personalNotes.wish}
                        onChange={(e) => setPersonalNotes({...personalNotes, wish: e.target.value})}
                        className="w-full h-32 px-4 py-3 bg-white/10 rounded-lg border border-green-400/30 text-white placeholder-white/60 resize-none focus:outline-none focus:border-green-400 backdrop-blur-sm"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Birthday Wishes from Friends */}
                <motion.div
                  className="mb-12 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-blue-500/20"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <h3 className="text-3xl font-bold mb-8 text-center">Messages from Your Loved Ones 💌</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: "Mom", message: "Happy birthday meri lado🎂🎂🎂🎂Jeevan ki har kushi mile tujhe , tu hamesha kush rahe love you😘😘😘😘😘❤❤💕", avatar: "👩‍💼" },
                      { name: "Acsah", message: "I'm so grateful for every year we've known each other, and I hope this new year of your life brings you laughter, success, and all the happiness you deserve.Keep shining, keep being the most beautiful person you are Ab bhi tere saath bench per bethna  humara ladna sab yaad aata \n\nMiss you jald he milenge!! 🥳", avatar: "👯‍♀️" },
                      { name: "Aditi", message: "Happy Birthday Sam🥹♥ Another year of you! You've been my safe space, my chaos partner, and one of the most genuine souls I know.I hope that you have an amazing amazing dayy and yearr! :)I'm so grateful to have you bro, I miss you very much and I love you, I hope you know that. Lately we haven't talked much but I want you to know that you still hold the same place in my heart as the 7th standard Sam did and always will. Always stay in touch, I'm just a call/text away. Keep smiling, keep growing, keep shining!! You deserve all the good things you never even ask for.♥All my love.👑", avatar: "👨‍💼" },
                      { name: "Anannya", message: "Happy Birthdayyy Bacchaaaa! 🥳😂❤Teri vibe bohot acchi h sach m, simple, sweet aur full positive energyyy. Nagori jitna pagal hai tu utni hi shaant, perfect combo.It's really cute the things u do for him and send him and he shows us like a happy little kid and i genuinely believe that jab se tu aai hai jayant has become a lot more career driven and focussed that's a very special thing.Bas aise hi rehna—real, fun aur full of good vibes and pls jaldi se bangalore aao bohot saari baatein karni hain jayant ki bhi taang kheechni hai saath m aur ladko ko chd ke apan khoob maze karenge trust me u'll have the time of your life so meet sooooooon😎😎It's your day and you deserve all things good, mast pamper karva khud ko, eat yummy yummy food have lotssss of fun and always stay happy!!!!Once again, happy birthday BACCHAAA😘😘! Love you🫶❤🌟", avatar: "👵" },
                      { name: "Kuch Aur SubhChintak", message: "Happy birthday samiksha 🫶Enjoy your day 💕 have a blast✨ bhot saare gifts lo jayant se \nHappy birthday Sam 😇 May you keep tolerating him 😂for many more years to come. Anyways Partyy??🤡😌\n\nHappiest bday bhabhi jiii I mean samikshaa jii May all your dreams come true Have a great day Khoob kharcha karwana in bhaisahab se And partyy dueee rahii🥳🎉🍾🍾\n\nHappy birthday samiksha 🎉I hope your day is filled with laughter, fun and good vibes and Enjoy your engineering journey😘", avatar: "👭" },
                      { name: "College Friends", message: "Happy birthday hmare group ka chota or khota bccha....❤🙂Khuda apko apke KABADIWALE se jld hi milai👉👈Mai to best hu hi uper wala tuje mere jesa best banai 😂✨Ye dosti or bhi gehri ho jese apka or sir (vishal, boiler) ka rishta gehra h🤣🤣Happiest Birthday dude✨✨\n\nWish you a Very Happy Birthday Little Baby🐥🎊🥳🎉😘❤Enjoy your day with full happiness and excitement🧿✨Hope you'll get you Mr. Kabadiwala soon gurl (it's a secret though😂)🤭🫶😉Party will be due babe🤩Love uhhhhh💕🎉", avatar: "🎓" }
                    ].map((wish, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/10 rounded-lg p-6 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
    delay: 1.8 + index * 0.2,
    type: "spring", // Makes the animation snappier
    stiffness: 300, // Higher = faster/snappier
    damping: 10,    // Lower = more bounce
    default: { duration: 0.15 }
  }}
  whileHover={{ 
    scale: 1.05,
    transition: {
      duration: 0.15, // Much faster hover animation
      ease: "easeOut"  // Smoother quick movement
    } 
  }}
  whileTap={{ 
    scale: 0.98,      // Subtle press effect
    transition: { duration: 0.1 }
  }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl">{wish.avatar}</span>
                          <span className="font-bold text-blue-300">{wish.name}</span>
                        </div>
                        <p className="text-white/90 italic" style={{ whiteSpace: 'pre-line' }}>"{wish.message}"</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Birthday Statistics */}
                <motion.div
                  className="mb-12 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl p-8 border border-emerald-500/20"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                >
                  <h3 className="text-3xl font-bold mb-8 text-center">Your Life in Numbers 📊</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { number: "21", label: "Years of Amazing", icon: "🎂" },
                      { number: "7,665", label: "Days of Being Awesome", icon: "✨" },
                      { number: "183,960", label: "Hours of Pure Joy", icon: "😊" },
                      { number: "1,000,000+", label: "Smiles You've Given", icon: "😄" },
                      { number: "4+", label: "Years of Us Together", icon: "💕" },
                      { number: "∞", label: "Reasons I Love You", icon: "💖" },
                      { number: "365", label: "Days I Think About You", icon: "💭" },
                      { number: "1", label: "Most Important Person", icon: "👑" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center bg-white/10 rounded-lg p-4"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.2 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-4xl mb-2">{stat.icon}</div>
                        <div className="text-2xl font-bold text-emerald-300">{stat.number}</div>
                        <div className="text-sm text-emerald-200">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Future Dreams */}
                <motion.div
                  className="mb-12 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl p-8 border border-violet-500/20"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4 }}
                >
                  <h3 className="text-3xl font-bold mb-8 text-center">Our Future Adventures 🚀</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-violet-300">Places We'll Go Together</h4>
                      {[
                        "🗼 Paris - Just us, the Eiffel Tower, and a moment that'll last forever.",
                        "🗻 Mountain hiking adventures",
                        "🌸 Cherry blossom season in Japan",
                        "🎡 European city hopping",
                        "🏖️ Road trip across the country-The long drive you are waiting for"
                      ].map((dream, index) => (
                        <motion.div
                          key={index}
                          className="bg-white/10 rounded-lg p-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2.6 + index * 0.1 }}
                        >
                          {dream}
                        </motion.div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-purple-300">Dreams We'll Achieve</h4>
                      {[
                        "🏠 Our perfect little home together",
                        "🐕 Getting that dog you keep talking about",
                        "💍 Taking the next big step (when you're ready!)",
                        "👶 Building a beautiful family someday",
                        "💝 Growing old and gray together"
                      ].map((dream, index) => (
                        <motion.div
                          key={index}
                          className="bg-white/10 rounded-lg p-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2.8 + index * 0.1 }}
                        >
                          {dream}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Final Message */}
                <motion.div
                  className="text-center bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-12 border-2 border-pink-500/40"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3 }}
                >
                  <motion.h2
                    className="text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Happy 21st Birthday, My Everything! 🎉💖
                  </motion.h2>
                  <p className="text-xl text-pink-200 leading-relaxed mb-8">
                    You're not just turning 21 - you're stepping into the most amazing chapter of your life. 
                    And I'm so grateful I get to be part of your story. Here's to more adventures, 
                    more laughter, more inside jokes, and more reasons to fall deeper in love with you every single day.
                  </p>
                  <motion.p
                    className="text-2xl font-bold text-white"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    I love you to the moon and back, and then some more! 🌙✨
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {floatingHearts.map((i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              color: ['#ff69b4', '#ff1493', '#dc143c', '#b22222'][Math.floor(Math.random() * 4)]
            }}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: '-10vh', opacity: [0, 1, 0] }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'linear'
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Audio element (hidden) */}
      <audio 
  ref={audioRef} 
  loop
  onEnded={() => setMusicPlaying(false)}
  onPause={() => setMusicPlaying(false)}
  onPlay={() => setMusicPlaying(true)}
>
  <source src="/romantic-song.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
    </div>
  );
};

export default PremiumBirthdayExperience;