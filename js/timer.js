// 타이머 관리 및 Web Audio API 알림음 합성 모듈
window.TimerController = (function() {
  let timerInterval = null;
  let secondsRemaining = 0;
  let totalDuration = 0;
  let isRunning = false;
  let speedMultiplier = 1; // 테스트 배속 설정 (1 = 기본, 10 = 테스트용 10배속)

  let onTickCallback = null;
  let onCompleteCallback = null;

  // Web Audio API를 활용한 저작권 걱정 없는 알림음 합성 (딩동 소리)
  function playCompletionChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // 첫 번째 음: E5 (미, 659.25Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime);
      
      gain1.gain.setValueAtTime(0.3, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3); // 0.3초 동안 페이드 아웃

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.3);

      // 두 번째 음: A5 (라, 880.00Hz) - 0.2초 후에 재생 시작
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880.00, ctx.currentTime + 0.25);
      
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.25);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75); // 0.5초 동안 페이드 아웃

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.25);
      osc2.stop(ctx.currentTime + 0.75);

    } catch (e) {
      console.error('AudioContext 소리 재생 실패:', e);
    }
  }

  // 시간 포맷팅 함수 (MM:SS)
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // 타이머 시작
  function start(seconds, onTick, onComplete) {
    stop(); // 기존 동작 중인 타이머가 있으면 정리

    secondsRemaining = seconds;
    totalDuration = seconds;
    onTickCallback = onTick;
    onCompleteCallback = onComplete;
    isRunning = true;

    // 즉시 첫 번째 tick 반영
    if (onTickCallback) {
      onTickCallback(secondsRemaining, formatTime(secondsRemaining), getProgressPercent());
    }

    tick();
  }

  function tick() {
    if (!isRunning) return;

    // 배속 설정을 적용하기 위해 Interval 대신 재귀적인 setTimeout 구조 사용
    const delay = 1000 / speedMultiplier;

    timerInterval = setTimeout(function() {
      if (!isRunning) return;

      secondsRemaining--;

      if (secondsRemaining <= 0) {
        secondsRemaining = 0;
        isRunning = false;
        if (onTickCallback) {
          onTickCallback(0, formatTime(0), 100);
        }
        playCompletionChime();
        if (onCompleteCallback) {
          onCompleteCallback();
        }
      } else {
        if (onTickCallback) {
          onTickCallback(secondsRemaining, formatTime(secondsRemaining), getProgressPercent());
        }
        tick(); // 다음 틱 호출
      }
    }, delay);
  }

  // 타이머 일시정지
  function pause() {
    if (!isRunning) return;
    isRunning = false;
    if (timerInterval) {
      clearTimeout(timerInterval);
      timerInterval = null;
    }
  }

  // 타이머 재개
  function resume() {
    if (isRunning || secondsRemaining <= 0) return;
    isRunning = true;
    tick();
  }

  // 타이머 완전히 정지 및 초기화
  function stop() {
    isRunning = false;
    if (timerInterval) {
      clearTimeout(timerInterval);
      timerInterval = null;
    }
    secondsRemaining = 0;
    totalDuration = 0;
  }

  // 진행률 백분율 반환
  function getProgressPercent() {
    if (totalDuration === 0) return 0;
    return Math.min(100, Math.floor(((totalDuration - secondsRemaining) / totalDuration) * 100));
  }

  // 배속 설정 (1: 표준 속도, 10: 빠른 테스트 속도)
  function setSpeedMultiplier(multiplier) {
    speedMultiplier = multiplier;
    console.log(`타이머 배속이 ${multiplier}배속으로 변경되었습니다.`);
  }

  return {
    start,
    pause,
    resume,
    stop,
    playCompletionChime,
    setSpeedMultiplier,
    getSecondsRemaining: () => secondsRemaining,
    getIsRunning: () => isRunning,
    formatTime
  };
})();
