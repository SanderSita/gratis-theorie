import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
  HelpCircleIcon,
} from 'lucide-react'
import { FinishConfirm } from '../components/FinishConfirm'

export default function ExamPage() {
  const { examId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionData, setCurrentQuestionData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState({ data: {} });

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [finishedExam, setFinishedExam] = useState(null);
  const [topQuestion, setTopQuestion] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!startTime) return;
      const end = new Date(startTime).getTime() + 40 * 60 * 1000; // 40 minutes later
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft("Tijd om!");
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    fetch(`/data/questions/examen_${examId}.json`)
      .then(res => res.json())
      .then(questionData => {
        setTotalQuestions(questionData.length)
        let startTime = null;

        const examExists = localStorage.getItem(`exam_${examId}`);
        if (examExists) {
          const examData = JSON.parse(examExists);
          startTime = examData.startedAt;
          setFinishedExam(examData.finished);
          setWrongAnswers(examData.wrongAnswerIds || []);

          // refresh if the exam was abandoned
          if (!examData.finished) {
            // check if the time is up
            const endTime = new Date(startTime).getTime() + 40 * 60 * 1000; // 40 minutes later
            const now = new Date().getTime();
            if (now >= endTime) {
              localStorage.removeItem(`exam_${examId}`);
              window.location.reload();
            }
          }

          // change the order of questions based on the stored order
          questionData.sort((a, b) => {
            const aIndex = examData.order.indexOf(a.id);
            const bIndex = examData.order.indexOf(b.id);
            return aIndex - bIndex;
          });
          setQuestions(questionData)

          if (questionData.length == examData.answers.length) {
            setCurrentQuestion(examData.answers.length);
            setCurrentQuestionData(questionData[examData.answers.length - 1])
            setSelectedAnswer(examData.answers[examData.answers.length - 1]);
            setTopQuestion(examData.answers.length)
          } else {
            setCurrentQuestion(examData.answers.length + 1);
            setCurrentQuestionData(questionData[examData.answers.length])
            setSelectedAnswer(null);
            setTopQuestion(examData.answers.length + 1)
          }
        } else {
          // randomize the questions
          // questionData.sort(() => Math.random() - 0.5);
          const questionIds = questionData.map(q => q.id);
          setQuestions(questionData);
          startTime = new Date().toISOString();
          localStorage.setItem(`exam_${examId}`, JSON.stringify({
            answers: [],
            startedAt: startTime,
            finished: false,
            order: questionIds
          }));
          setCurrentQuestionData(questionData[0])
        }

        setStartTime(startTime);
      });
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestion > totalQuestions) return;

    if (finishedExam != null && finishedExam === true && currentQuestion == totalQuestions) {
      // If the exam is already finished, redirect to results
      window.location.assign(`/overzicht`);
      return;
    }

    if (topQuestion != null && currentQuestion + 1 > topQuestion) {
      setTopQuestion(currentQuestion + 1);
    }

    if (!finishedExam) {
      updateAnswerInLocalStorage(selectedAnswer);
    }

    // If this is the last question, show confirmation
    if (currentQuestion == totalQuestions) {
      setShowConfirm(true)
      return;
    };

    setCurrentQuestionData(questions[currentQuestion])
    setCurrentQuestion(currentQuestion + 1)

    const nextAnswerData = JSON.parse(localStorage.getItem(`exam_${examId}`));
    if (nextAnswerData && nextAnswerData.answers && nextAnswerData.answers.length > currentQuestion) {
      setSelectedAnswer(nextAnswerData.answers[currentQuestion]);
    } else {
      setSelectedAnswer(null);
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion <= 1) return;
    // load the selected answer for the previous question from local storage
    const nextAnswerData = JSON.parse(localStorage.getItem(`exam_${examId}`));
    if (nextAnswerData && nextAnswerData.answers && nextAnswerData.answers.length >= currentQuestion - 1) {
      setSelectedAnswer(nextAnswerData.answers[currentQuestion - 2]);
    } else {
      setSelectedAnswer(null);
    }
    
    setCurrentQuestionData(questions[currentQuestion - 2])
    setCurrentQuestion(currentQuestion - 1)
  }

  const handleSelectAnswer = (type, data) => {
    if (finishedExam) return;

    if (type === 'multiple_response') {
      // If multiple response, toggle the selection
      setSelectedAnswer(prev => {
        const newData = prev && prev["data"] ? [...prev["data"]] : [];
        if (newData.includes(data)) {
          newData.splice(newData.indexOf(data), 1);
        } else {
          newData.push(data);
        }
        updateAnswerInLocalStorage({"data": newData});
        return {"data": newData};
      });
    } else {
      setSelectedAnswer({"data": data})
      updateAnswerInLocalStorage({"data": data});
    }
  }

  function isAnswerComplete(selectedAnswer, currentQuestionData) {
    if (selectedAnswer == null || selectedAnswer.data == null) return false;
  
    const { type, items } = currentQuestionData || {};
    const data = selectedAnswer.data;
  
    if (type === 'drag_order') {
      if (!items || items.length === 0) return false;
      if (!data || typeof data !== 'object') return false;
      return items.every((_, idx) => data[idx] !== undefined && data[idx] !== null);
    }

    if (typeof data === 'string') return data.trim() !== '';
    if (Array.isArray(data)) return data.length > 0;
    if (typeof data === 'object') return Object.keys(data).length > 0;
    if (typeof data === 'number') return true;
  
    return false;
  }

  // function 
  function getCorrectAnswer(question) {
    console.log(question)
    if (question.type === 'ja/nee') {
      console.log(question.answer)
      return question.answer;
    } else if (question.type === 'invulvraag') {
      return question.answer;
    } else if (question.type === 'multiple_response') {
      return question.answer.map(ans => question.options[ans]);
    } else if (question.type === 'drag_order') {
      return question.correct_order
    }
    return null;
  }

  function updateAnswerInLocalStorage(answer) {
    console.log("Updating answer in local storage", answer, currentQuestionData);
    const examData = JSON.parse(localStorage.getItem(`exam_${examId}`));
    const updatedAnswers = [...examData.answers];

    if (currentQuestion - 1 < updatedAnswers.length) {
      updatedAnswers[currentQuestion - 1] = answer;
    } else {
      updatedAnswers.push(answer);
    }

    localStorage.setItem(`exam_${examId}`, JSON.stringify({
      answers: updatedAnswers,
      startedAt: examData.startedAt,
      finished: currentQuestion >= totalQuestions,
      order: examData.order
    }));
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showConfirm &&
        <FinishConfirm
          onConfirm={() => {
            // calculate score and save exam
            const examData = JSON.parse(localStorage.getItem(`exam_${examId}`));
            const answers = examData.answers;
            let wrongAnswers = [];
            const correctAnswers = questions.reduce((count, question, index) => {
              if (question.type === 'ja/nee' && question.answer === question.options[answers[index]?.data]) {
                return count + 1;
              } else if (question.type === 'invulvraag' && question.answer.toLowerCase() === answers[index]?.data.toLowerCase()) {
                return count + 1;
              } else if (
                question.type === 'multiple_response' &&
                Array.isArray(answers[index]?.data)
              ) {
                const selectedOptions = answers[index].data.map(i => question.options[i]);
                const correctAnswers = question.answer;
              
                const isCorrect =
                  selectedOptions.length === correctAnswers.length &&
                  correctAnswers.every(ans => selectedOptions.includes(ans));
              
                if (isCorrect) {
                  return count + 1;
                }
              } else if (question.type === 'drag_order') {
                const correctOrder = question.correct_order;
                const userOrder = Object.values(answers[index]?.data || {});
                // get the draggedItemId list from userOrder in order of order_index
                let draggedItemIds = userOrder
                  .slice() // make a shallow copy so original isn't mutated
                  .sort((a, b) => a.order_index - b.order_index)
                  .map(item => item?.draggedItemId)

                if (JSON.stringify(correctOrder) === JSON.stringify(draggedItemIds)) {
                  return count + 1;
                }
              }

              // Answer is incorrect
              wrongAnswers.push(question.id);

              return count;
            }, 0);

            const score = `${correctAnswers} / ${totalQuestions}`
            const timeTakenMs = new Date().getTime() - new Date(examData.startedAt).getTime();
            const minutes = Math.floor(timeTakenMs / 60000);
            const seconds = Math.floor((timeTakenMs % 60000) / 1000);
            const timeTaken = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            localStorage.setItem(`exam_${examId}`, JSON.stringify({
              answers: examData.answers,
              startedAt: examData.startedAt,
              finished: true,
              score: score,
              correctAnswers: correctAnswers,
              totalQuestions: totalQuestions,
              timeTaken: timeTaken,
              incorrectAnswers: totalQuestions - correctAnswers,
              order: examData.order,
              wrongAnswerIds: wrongAnswers
            }));
            window.location.assign(`/examen/${examId}/resultaat`);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      }

      {/* Header with exam info */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div onClick={() => window.location.assign('/')} className="flex items-center gap-4 cursor-pointer">
            <img
              src="https://uploadthingy.s3.us-west-1.amazonaws.com/ekwuapqFGkAUsQe1QsFHqR/icon_%281%29.png"
              alt="Gratis Auto Theorie Logo"
              className="w-10 h-10 rounded-xl"
            />
            <h1 className="text-xl font-semibold text-gray-800">
              Auto Theorie Examen
            </h1>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            {finishedExam != null && finishedExam == false &&
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-orange-500" />
                <span>
                  {timeLeft}
                </span>
              </div>
            }
            {finishedExam && 
              <div className="bg-gray-500 text-white font-medium py-1 px-3 rounded-full cursor-pointer" onClick={() => window.location.assign('/overzicht')}>
                Naar Overzicht
              </div>
            }
            <div className="bg-orange-100 text-orange-800 font-medium py-1 px-3 rounded-full">
              {currentQuestion} van {totalQuestions}
            </div>
          </div>
        </div>
      </header>
      {/* Main exam content */}
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Question */}
          <div
            className={
              `bg-white rounded-2xl shadow-md overflow-hidden mb-6 ` +
              (finishedExam === true
                ? currentQuestionData && wrongAnswers.includes(currentQuestionData.id)
                  ? 'shadow-red-300'
                  : 'shadow-green-300'
                : '')
            }
          >
            <div className="bg-orange-50 p-4 border-b border-orange-100">
              <h2 className="text-xl font-medium text-gray-800">
                {finishedExam ? `${currentQuestion}. ` : ''}
                {currentQuestionData ? currentQuestionData.question : '...'}
              </h2>
            </div>
            {/* Question content - Image and answers */}
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Left side - Image */}
              <div className="bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center min-h-[400px]">
                {(currentQuestionData && currentQuestionData.image.url) ? (
                  <div className="relative w-full max-w-[800px]">
                    <img
                      src={"/assets/img/questions/" + currentQuestionData.image.url}
                      alt="Verkeerssituatie"
                      className="w-full h-auto object-contain"
                    />

                    {/* De rode cirkels */}
                    {currentQuestionData.type === 'drag_order' && currentQuestionData.items ? (
                      currentQuestionData.items.map((option, dropIndex) => {
                        let displayIndex = '';
                        let isFilled = false;

                        if (finishedExam && currentQuestionData.correct_order) {
                          const correctId = currentQuestionData.correct_order[dropIndex];
                          const correctIndex = currentQuestionData.items.findIndex(item => item.id === correctId);
                          displayIndex = correctIndex + 1;
                          isFilled = true;
                        } else {
                          const filledItems = selectedAnswer?.data || {};
                          const currentItem = filledItems[dropIndex];

                          if (currentItem) {
                            displayIndex = parseInt(currentItem.order_index) + 1;
                            isFilled = true;
                          }
                        }
                return (
                  <div
                    key={dropIndex}
                    className={`absolute size-0 p-5 z-50 rounded-full flex items-center justify-center text-black font-bold transition-all ${
                      isFilled ? 'bg-orange-500 text-white' : 'bg-orange-200 cursor-pointer hover:bg-orange-300'
                    }`}
                    style={{
                      top: option.style.top,
                      left: option.style.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={() => {
                      if (!finishedExam && selectedAnswer?.data?.[dropIndex] !== undefined) {
                        const updated = { ...selectedAnswer.data };
                        delete updated[dropIndex];
                        setSelectedAnswer({ data: updated });
                      }
                    }}
                    onDragOver={(e) => !finishedExam && e.preventDefault()}
                    onDrop={(e) => {
                      if (finishedExam) return;

                      const draggedIndex = e.dataTransfer.getData('text/plain');
                      if (!draggedIndex || selectedAnswer?.data?.[dropIndex] !== undefined) return;

                      const draggedItemId = currentQuestionData.items[dropIndex]?.id;
                      if (!draggedItemId) return;

                      const updated = {
                        ...(selectedAnswer?.data || {}),
                        [dropIndex]: { draggedItemId, order_index: draggedIndex },
                      };

                      setSelectedAnswer({ data: updated });
                    }}
                  >
                            {displayIndex}
                          </div>
                        );
                      })
                    ) : null}
                  </div>
                ) : (
                  <img src="/assets/svg/gray-car.svg" className="size-24" />
                )}
              </div>

              {/* Right side - Answers */}
              <div className="flex flex-col gap-4">
                {!finishedExam ? (
                  <p className="text-gray-600 mb-2">{currentQuestionData && currentQuestionData.type == 'drag_order' ? 'Kies de juiste volgorde:' : 'Kies het juiste antwoord:'}</p>
                ) : (
                  <p className="text-gray-600 mb-2">Jouw antwoord</p>
                )}
                {
                  currentQuestionData ? (
                    {
                      'ja/nee': (
                        currentQuestionData.options?.map((option, index) => {
                          const isSelected = selectedAnswer?.data === index;
                          const isCorrect = currentQuestionData.answer === option;
                          const isFinished = finishedExam === true;

                          let borderClass = 'border-gray-200 hover:border-orange-300 hover:bg-orange-50';
                          let backgroundClass = '';
                          let textClass = 'text-gray-800';
                          let letterClass = 'bg-gray-100 text-gray-500';

                          if (isFinished) {
                            if (isCorrect) {
                              borderClass = 'border-green-500';
                              backgroundClass = 'bg-green-50';
                              textClass = 'text-green-900';
                              if (isSelected) letterClass = 'bg-green-500 text-white';
                            }
                            if (isSelected && !isCorrect) {
                              borderClass = 'border-red-500';
                              backgroundClass = 'bg-red-50';
                              textClass = 'text-red-900';
                              letterClass = 'bg-red-500 text-white';
                            }
                          } else if (isSelected) {
                            borderClass = 'border-orange-500';
                            backgroundClass = 'bg-orange-50';
                            textClass = 'text-orange-900';
                            letterClass = 'bg-orange-500 text-white';
                          }

                          return (
                            <button
                              key={index}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${borderClass} ${backgroundClass} ${textClass}`}
                              onClick={() => handleSelectAnswer('ja/nee', index)}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${letterClass}`}>
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <span>{option}</span>
                              </div>
                            </button>
                          );
                        })
                      ),
                      'invulvraag':
                      currentQuestionData.type == 'invulvraag' ? (
                        <div className="flex flex-col gap-2">
                          <input
                            type="text"
                            placeholder="Typ je antwoord hier..."
                            value={selectedAnswer?.data || ''}
                            className={`p-4 rounded-xl border-2 text-gray-800 focus:outline-none transition-all
                              ${
                                finishedExam
                                  ? selectedAnswer?.data?.toLowerCase() === currentQuestionData.answer.toLowerCase()
                                    ? 'border-green-500 bg-green-50 text-green-900'
                                    : 'border-red-500 bg-red-50 text-red-900'
                                  : selectedAnswer?.data
                                  ? 'border-orange-500 bg-orange-50'
                                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                              }`}
                            onChange={(e) => handleSelectAnswer('invulvraag', e.target.value.trim())}
                            disabled={finishedExam} // optional: disable input during review
                          />
                        </div>
                      ): null,
                      'drag_order': (
                        <div className='flex flex-wrap gap-4'>
                          {currentQuestionData.items && currentQuestionData.items.map((option, index) => {
                            let isDropped = false;
                            if (selectedAnswer && selectedAnswer["data"]) {
                              for (const [key, value] of Object.entries(selectedAnswer?.data)) {
                                if (value && value.order_index == index) {
                                  isDropped = true;
                                  break;
                                }
                              }
                            }
                            
                            if (isDropped) return null;
                            
                            return (
                              <div 
                                key={index} 
                                className='flex justify-center items-center size-0 p-5 rounded-full border-2 text-left transition-all cursor-grab hover:border-orange-300 hover:bg-orange-50 active:cursor-grabbing'
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData('text/plain', index);
                                  const dragImage = document.createElement('div');
                                  dragImage.style.width = '40px';
                                  dragImage.style.height = '40px';
                                  dragImage.classList.add('border-orange-300', 'bg-orange-50', 'border-2');
                                  dragImage.style.backgroundColor = 'white';
                                  dragImage.style.borderRadius = '50%';
                                  dragImage.style.display = 'flex';
                                  dragImage.style.alignItems = 'center';
                                  dragImage.style.justifyContent = 'center';
                                  dragImage.style.color = 'black';
                                  dragImage.style.fontWeight = 'bold';
                                  dragImage.textContent = index + 1;
                                  document.body.appendChild(dragImage);
                                  e.dataTransfer.setDragImage(dragImage, 20, 20);
                                  setTimeout(() => document.body.removeChild(dragImage), 0);
                                }}
                              >
                                {index + 1}
                              </div>
                            );
                          })}
                        </div>
                      ),
                      'multiple_response': (
                        currentQuestionData.type == 'multiple_response' &&
                        currentQuestionData.options.map((option, index) => {
                          const isSelected = selectedAnswer?.data?.includes(index);
                          const isCorrect = currentQuestionData.answer.includes(option);
                          const isIncorrectSelection = finishedExam && isSelected && !isCorrect;

                          let borderClass = 'border-gray-200 hover:border-orange-300 hover:bg-orange-50';
                          let backgroundClass = '';
                          let textClass = 'text-gray-800';
                          let letterClass = 'bg-gray-100 text-gray-500';

                          if (finishedExam) {
                            if (isCorrect) {
                              borderClass = 'outline outline-green-500';
                              if (isSelected) backgroundClass = 'bg-green-50';
                              letterClass = 'bg-green-500 text-white';
                            }
                            if (isIncorrectSelection) {
                              borderClass = 'border-red-500';
                              backgroundClass = 'bg-red-50';
                              letterClass = 'bg-red-500 text-white';
                              textClass = 'text-red-800';
                            }
                          } else if (isSelected) {
                            borderClass = 'border-orange-500';
                            backgroundClass = 'bg-orange-50';
                            letterClass = 'bg-orange-500 text-white';
                            textClass = 'text-orange-900';
                          }

                          return (
                            <button
                              key={index}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${borderClass} ${backgroundClass} ${textClass}`}
                              onClick={() => handleSelectAnswer('multiple_response', index)}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${letterClass}`}>
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <span>{option}</span>
                              </div>
                            </button>
                          );
                        })
                      ),

                    }[currentQuestionData && currentQuestionData.type]
                  ): null
                }
                
                <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">

                {finishedExam && currentQuestionData && (
                  wrongAnswers.includes(currentQuestionData.id) ? (
                    <p className="text-red-500 font-bold">
                      Fout!{' '}
                      <span className="font-normal">
                        {currentQuestionData.type === 'drag_order'
                          ? 'Juiste volgorde ziet je in de afbeelding'
                          : currentQuestionData.type === 'invulvraag'
                            ? (
                              <span>
                                Het goede antwoord is: <span className="underline">{currentQuestionData.answer}</span>
                              </span>
                            )
                            : currentQuestionData.why}
                      </span>
                    </p>
                  ) : (
                    <p className="text-green-600 font-bold">Goed!</p>
                  )
                )}

                {!finishedExam && (
                  <>
                    <HelpCircleIcon className="w-4 h-4" />
                    {currentQuestionData == null
                      ? "Kies het juiste antwoord"
                      : currentQuestionData.type === 'ja/nee'
                      ? "Selecteer een antwoord om door te gaan"
                      : currentQuestionData.type === 'invulvraag'
                      ? "Typ je antwoord in het veld"
                      : currentQuestionData.type === 'drag_order'
                      ? "Kies de juiste volgorde door de items te slepen"
                      : currentQuestionData.type === 'multiple_response'
                      ? "Selecteer één of meer antwoorden om door te gaan"
                      : "Kies het juiste antwoord"}
                  </>
                )}
                </div>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 1}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg ${currentQuestion === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Vorige vraag
            </button>
            <div className="flex gap-1">
              {[...Array(totalQuestions)].map((_, i) => (
                <div
                  onClick={() => {
                    if (i + 1 <= topQuestion || finishedExam) {
                      setCurrentQuestion(i + 1);
                      setCurrentQuestionData(questions[i]);
                      const examData = JSON.parse(localStorage.getItem(`exam_${examId}`));
                      if (examData && examData.answers && examData.answers.length > i) {
                        setSelectedAnswer(examData.answers[i]);
                      } else {
                        setSelectedAnswer(null);
                      }
                    }
                  }}
                  key={i}
                  className={`pb-1 cursor-pointer ${
                    finishedExam === true
                      ? currentQuestionData && wrongAnswers.includes(i + 1)
                        ? 'border-b-2 border-red-500'   // wrong answer
                        : 'border-b-2 border-green-500' // correct answer
                      : ''
                  }`}
                                  >
                  <span className={`w-4 h-4 rounded-full flex justify-center items-center text-center text-[10px] text-white ${(i+1) == currentQuestion ? 'bg-orange-200' : 'bg-gray-200'}  ${i + 1 <= topQuestion || finishedExam ? 'bg-orange-500' : 'bg-gray-200'}`}>
                    {i+1}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={!isAnswerComplete(selectedAnswer, currentQuestionData)}
              className={`flex items-center gap-2 py-2 px-6 rounded-lg ${
                !isAnswerComplete(selectedAnswer, currentQuestionData)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}            >
              {finishedExam != null && finishedExam === true && currentQuestion == totalQuestions
                  ? "Naar overzicht"
                  : currentQuestion == totalQuestions
                  ? "Examen voltooien"
                  : "Volgende vraag"}
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
      {/* Progress bar */}
      <div className="bg-white border-t border-gray-200 py-3 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-500 h-full rounded-full"
              style={{
                width: `${(currentQuestion / totalQuestions) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Begin</span>
            <span>
              Vraag {currentQuestion}/{totalQuestions}
            </span>
            <span>Einde</span>
          </div>
        </div>
      </div>
    </div>
  )
}
