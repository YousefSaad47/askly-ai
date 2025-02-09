import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const AnimatedTypingText = ({
  texts,
  className,
}: {
  texts: string[];
  className?: string;
}) => {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const targetText = texts[textIndex];
    const typingSpeed = isDeleting ? 100 : 150;
    const pauseDuration = 1000;

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < targetText.length) {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, textIndex, isDeleting, isPaused, texts]);

  const renderTypedText = () => {
    const fullText = texts[textIndex];
    if (fullText.includes('Askly AI')) {
      const parts = fullText.split('Askly AI');
      const prefix = parts[0];
      const gradientWord = 'Askly AI';

      const prefixLength = prefix.length;
      const typedPrefix = currentText.slice(0, prefixLength);
      let typedGradient = '';
      let typedSuffix = '';

      if (currentText.length > prefixLength) {
        typedGradient = currentText.slice(prefixLength);
      }
      typedGradient = gradientWord.slice(0, typedGradient.length);

      if (currentText.length > prefixLength + gradientWord.length) {
        typedSuffix = currentText.slice(prefixLength + gradientWord.length);
      }

      return (
        <>
          {typedPrefix}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            {typedGradient}
          </span>
          {typedSuffix}
        </>
      );
    }
    return currentText;
  };

  return (
    <div className="min-h-[80px] flex items-center justify-center">
      <h2 className={className}>
        {renderTypedText()}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="inline-block w-1 h-8 ml-1 bg-indigo-600 dark:bg-indigo-400"
        />
      </h2>
    </div>
  );
};
