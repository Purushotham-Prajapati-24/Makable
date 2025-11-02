import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ words, className }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingDelay = 100; // Delay between each character typing
    const deletingDelay = 50; // Delay between each character deletion
    const wordDelay = 2000; // Delay before starting to delete the word

    const type = () => {
      const currentWord = words[currentWordIndex];
      
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), wordDelay);
          return;
        }
      }
    };

    const timeout = setTimeout(type, isDeleting ? deletingDelay : typingDelay);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterEffect;