import React, { useState, useEffect } from 'react';
import DataFirstLesson from './../../data/firstLesson.json';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button';

export default function FirstLesson() {
  const [textIndex, setTextIndex] = useState(0);
  const [lang, setLang] = useState('en-US');
  const [rate, setRate] = useState(1);
  const [dataFirst, setDataFirst] = useState([]);
  const [progress, setProgress] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [englishAnswer, setEnglishAnswer] = useState(false);

  useEffect(() => {
    setDataFirst(DataFirstLesson);
    setTotalWords(DataFirstLesson.length);
  }, []);

  const speakText = () => {
    const currentText = dataFirst[textIndex]?.english || '';
    const utterance = new SpeechSynthesisUtterance(currentText);
    utterance.lang = lang;
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  };

  const handleNextWord = () => {
    setTextIndex((prevIndex) => (prevIndex + 1) % dataFirst.length);
  };

  const handleKnowWord = () => {
    setEnglishAnswer(false);
    setProgress((prevProgress) => prevProgress + 1);
    setDataFirst((prevData) => prevData.filter((_, index) => index !== textIndex));
    handleNextWord();
  };

  const handleUnknownWord = () => {
    setEnglishAnswer(false);
    handleNextWord();
  };

  const checkAnswer = () => {
    setEnglishAnswer(true);
  };

  return (
    <div>
      {
        progress === totalWords ? 
        (
          <span> - Umiesz wszystkie słówka na dziś!</span>
        )
        :
        (
          <Card sx={{ maxWidth: 345 }}>
          <CardHeader title={dataFirst[textIndex]?.polish || ''} />
          <CardMedia
            component="img"
            height="194"
            image={dataFirst[textIndex]?.image || ''}
            alt={dataFirst[textIndex]?.english}
          />
          
  
          {
          englishAnswer && <p>
            <VolumeUpIcon onClick={speakText} />
            {dataFirst[textIndex]?.english}</p>}
          <Button 
          variant='outlined'
          onClick={checkAnswer}>Pokaż odpowiedź</Button>
  
          <div>
            <Button
              style={{ backgroundColor: 'red' }}
              onClick={handleUnknownWord}
              variant="contained"
            >
              Nie wiedziałem
            </Button>
  
            <Button
              style={{ backgroundColor: 'green' }}
              onClick={handleKnowWord}
              variant="contained"
            >
              Wiedziałem
            </Button>
          </div>
          <p>
            Postęp: {progress}/{totalWords}

          </p>
        </Card>
        )
      }
    </div>
  );
}
