// Web Speech API 기반 음성 출력(TTS) 및 음성 입력(STT) 제어 모듈
window.VoiceController = (function() {
  const synth = window.speechSynthesis;
  let recognition = null;
  let isListening = false;
  let ttsSpeed = 1.0; // 배속 설정 가능

  // 브라우저 호환성 지원 여부 정의
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

  // TTS 지원 확인
  function isSupportedTTS() {
    return !!synth;
  }

  // STT 지원 확인
  function isSupportedSTT() {
    return !!SpeechRecognition;
  }

  // TTS 말하기 함수
  function speak(text, onStart, onEnd) {
    if (!isSupportedTTS()) return;
    
    // 현재 말하는 소리가 있으면 중지
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = ttsSpeed;

    // 한국어 목소리 설정 (가급적 기본 한국어 음성)
    const voices = synth.getVoices();
    const koVoice = voices.find(voice => voice.lang === 'ko-KR' || voice.lang.startsWith('ko'));
    if (koVoice) {
      utterance.voice = koVoice;
    }

    utterance.onstart = function() {
      if (onStart) onStart();
    };

    utterance.onend = function() {
      if (onEnd) onEnd();
    };

    utterance.onerror = function(event) {
      console.error('TTS 에러 발생:', event);
      if (onEnd) onEnd();
    };

    synth.speak(utterance);
  }

  // TTS 정지 함수
  function cancel() {
    if (isSupportedTTS()) {
      synth.cancel();
    }
  }

  // TTS 배속 변경
  function setSpeed(speed) {
    ttsSpeed = speed;
  }

  // STT 음성인식 초기화 및 시작
  function startRecognition(onCommand, onStatusChange) {
    if (!isSupportedSTT()) {
      if (onStatusChange) onStatusChange('NOT_SUPPORTED', '이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }

    if (isListening) return;

    try {
      recognition = new SpeechRecognition();
      recognition.lang = 'ko-KR';
      recognition.continuous = false; // 한 단어/문장 인식 후 완료
      recognition.interimResults = false; // 중간 결과는 생략
      recognition.maxAlternatives = 1;

      recognition.onstart = function() {
        isListening = true;
        if (onStatusChange) onStatusChange('LISTENING', '음성 명령 수신 중... ("다음", "이전", "다시" 라고 말해보세요)');
      };

      recognition.onresult = function(event) {
        const resultText = event.results[0][0].transcript.trim();
        console.log('음성 인식 결과:', resultText);
        if (onStatusChange) onStatusChange('RESULT', `인식된 명령: "${resultText}"`);

        // 음성 명령어 파싱
        if (resultText.includes('다음') || resultText.includes('다응') || resultText.includes('다움')) {
          onCommand('NEXT');
        } else if (resultText.includes('이전') || resultText.includes('이정') || resultText.includes('뒤로')) {
          onCommand('PREV');
        } else if (resultText.includes('다시') || resultText.includes('반복') || resultText.includes('말해줘') || resultText.includes('정지')) {
          onCommand('REPEAT');
        }
      };

      recognition.onerror = function(event) {
        console.error('STT 에러 발생:', event.error);
        if (event.error === 'not-allowed') {
          isListening = false;
          if (onStatusChange) onStatusChange('ERROR_PERMISSION', '마이크 권한이 차단되었습니다. 주소창의 마이크 설정을 확인하세요.');
        } else {
          if (onStatusChange) onStatusChange('ERROR', `인식 오류: ${event.error}`);
        }
      };

      recognition.onend = function() {
        // 지속 인식을 위해 사용자 요청에 따라 재시작 처리
        if (isListening) {
          try {
            recognition.start();
          } catch (e) {
            console.error('STT 자동 재시작 실패:', e);
          }
        } else {
          if (onStatusChange) onStatusChange('STOPPED', '음성 명령이 중지되었습니다.');
        }
      };

      recognition.start();
    } catch (err) {
      console.error('음성인식 시작 오류:', err);
      if (onStatusChange) onStatusChange('ERROR', '음성인식 시작 실패');
    }
  }

  // STT 정지 함수
  function stopRecognition() {
    isListening = false;
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {
        console.error('STT 정지 에러:', e);
      }
    }
  }

  // 최초 음성 데이터 로드를 위한 이벤트 리스너 등록
  if (isSupportedTTS()) {
    // Chrome 등 일부 브라우저에서 voices가 비동기로 로드되므로 강제 호출하여 캐시함
    synth.getVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = () => synth.getVoices();
    }
  }

  return {
    speak,
    cancel,
    setSpeed,
    startRecognition,
    stopRecognition,
    isSupportedTTS,
    isSupportedSTT,
    getIsListening: () => isListening
  };
})();
