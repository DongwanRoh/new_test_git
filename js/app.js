// 애플리케이션 상태 및 생명주기 관리 컨트롤러
(function() {
  // 상태 객체
  const state = {
    currentScreen: 'home',
    selectedRecipeId: null,
    currentStepIndex: 0,
    checkedIngredients: {}, // { recipeId: { ingredientName: true/false } }
    activeCategory: '전체',
    activeMoods: new Set(),
    searchQuery: '',
    
    // 설정 상태
    autoNextEnabled: true,
    sttEnabled: true,
    ttsSpeed: 1.0,

    // 브라우저 리소스
    wakeLockSentinel: null
  };

  // DOM 요소 참조
  const DOM = {
    backBtn: document.getElementById('back-btn'),
    headerTitle: document.getElementById('header-title'),
    
    // 화면들
    screens: {
      home: document.getElementById('home-screen'),
      detail: document.getElementById('detail-screen'),
      cooking: document.getElementById('cooking-screen'),
      complete: document.getElementById('complete-screen')
    },

    // 홈 화면 요소
    searchInput: document.getElementById('search-input'),
    categoryChips: document.getElementById('category-chips'),
    moodTags: document.getElementById('mood-tags'),
    recipesList: document.getElementById('recipes-list'),

    // 상세 화면 요소
    detailRecipeTitle: document.getElementById('detail-recipe-title'),
    detailRecipeImg: document.getElementById('detail-recipe-img'),
    detailMetaTime: document.getElementById('detail-meta-time'),
    detailMetaDifficulty: document.getElementById('detail-meta-difficulty'),
    detailMetaServings: document.getElementById('detail-meta-servings'),
    detailIngredientsList: document.getElementById('detail-ingredients-list'),
    startCookingBtn: document.getElementById('start-cooking-btn'),

    // 요리 화면 요소
    cookingRecipeTitle: document.getElementById('cooking-recipe-title'),
    cookingStepProgress: document.getElementById('cooking-step-progress'),
    cookingProgressFill: document.getElementById('cooking-progress-fill'),
    wakelockAlert: document.getElementById('wakelock-alert'),
    cookingStepLabel: document.getElementById('cooking-step-label'),
    cookingStepInstruction: document.getElementById('cooking-step-instruction'),
    
    // 요리 타이머
    timerSection: document.getElementById('cooking-timer-section'),
    timerTime: document.getElementById('cooking-timer-time'),
    timerToggleBtn: document.getElementById('timer-toggle-btn'),
    timerFastBtn: document.getElementById('timer-fast-btn'),
    timerBar: document.getElementById('cooking-timer-bar'),

    // 요리 제어판
    sttToggle: document.getElementById('stt-toggle'),
    autoNextToggle: document.getElementById('auto-next-toggle'),
    ttsSpeedSlider: document.getElementById('tts-speed-slider'),
    ttsSpeedLabel: document.getElementById('tts-speed-label'),
    voiceStatusIndicator: document.getElementById('voice-status-indicator'),
    sttLogBar: document.getElementById('stt-log-bar'),

    // 엘보우 컨트롤러
    cookPrevBtn: document.getElementById('cook-prev-btn'),
    cookRepeatBtn: document.getElementById('cook-repeat-btn'),
    cookNextBtn: document.getElementById('cook-next-btn'),

    // 완료 화면 요소
    completeRecipeMessage: document.getElementById('complete-recipe-message'),
    recommendRecipesList: document.getElementById('recommend-recipes-list'),
    completeHomeBtn: document.getElementById('complete-home-btn')
  };

  // 테스트 가속 플래그
  let isTimerAccelerated = false;

  // 초기화 함수
  function init() {
    loadCheckedIngredients();
    setupEventListeners();
    renderHome();
    
    // 초기 로드 시 TTS 활성화 체크
    if (!window.VoiceController.isSupportedTTS()) {
      console.warn('TTS가 지원되지 않는 브라우저입니다.');
    }
  }

  // 로컬스토리지 재료 데이터 읽기
  function loadCheckedIngredients() {
    try {
      const saved = localStorage.getItem('checked_ingredients');
      if (saved) {
        state.checkedIngredients = JSON.parse(saved);
      }
    } catch (e) {
      console.error('로컬스토리지 읽기 에러:', e);
    }
  }

  // 로컬스토리지 재료 데이터 저장
  function saveCheckedIngredients() {
    try {
      localStorage.setItem('checked_ingredients', JSON.stringify(state.checkedIngredients));
    } catch (e) {
      console.error('로컬스토리지 저장 에러:', e);
    }
  }

  // 화면 전환 (SPA 라우터)
  function navigateTo(screenName) {
    state.currentScreen = screenName;

    // 모든 타이머 및 음성인식 초기화/방지 로직
    if (screenName !== 'cooking') {
      window.TimerController.stop();
      window.VoiceController.stopRecognition();
      releaseWakeLock();
    }

    // 모든 화면 숨김 후 지정된 화면 표시
    Object.keys(DOM.screens).forEach(name => {
      if (name === screenName) {
        DOM.screens[name].classList.add('active');
      } else {
        DOM.screens[name].classList.remove('active');
      }
    });

    // 헤더 및 뒤로가기 버튼 분기 제어
    if (screenName === 'home') {
      DOM.backBtn.style.visibility = 'hidden';
      DOM.headerTitle.querySelector('span').textContent = '핸즈프리 셰프';
      renderHome();
    } else if (screenName === 'detail') {
      DOM.backBtn.style.visibility = 'visible';
      DOM.headerTitle.querySelector('span').textContent = '레시피 보기';
      renderDetail();
    } else if (screenName === 'cooking') {
      DOM.backBtn.style.visibility = 'visible';
      DOM.headerTitle.querySelector('span').textContent = '핸즈프리 요리';
      startCookingMode();
    } else if (screenName === 'complete') {
      DOM.backBtn.style.visibility = 'hidden';
      DOM.headerTitle.querySelector('span').textContent = '완성 완료!';
      renderComplete();
    }

    // 상단으로 스크롤 이동
    window.scrollTo(0, 0);
  }

  // 이벤트 리스너 바인딩
  function setupEventListeners() {
    // 뒤로가기 버튼
    DOM.backBtn.addEventListener('click', () => {
      if (state.currentScreen === 'detail') {
        navigateTo('home');
      } else if (state.currentScreen === 'cooking') {
        if (confirm('요리를 중단하고 레시피 상세 화면으로 돌아가시겠습니까?')) {
          navigateTo('detail');
        }
      }
    });

    // 1. 홈 화면 이벤트
    // 검색창 입력
    DOM.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      renderHome();
    });

    // 카테고리 필터 클릭
    DOM.categoryChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;

      // 이전 활성 칩 해제 및 새로운 칩 활성화
      DOM.categoryChips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      state.activeCategory = chip.dataset.category;
      renderHome();
    });

    // 감성 태그 필터 클릭 (다중 선택 토글)
    DOM.moodTags.addEventListener('click', (e) => {
      const btn = e.target.closest('.mood-tag-btn');
      if (!btn) return;

      const mood = btn.dataset.mood;
      if (state.activeMoods.has(mood)) {
        state.activeMoods.delete(mood);
        btn.classList.remove('active');
      } else {
        state.activeMoods.add(mood);
        btn.classList.add('active');
      }
      renderHome();
    });

    // 2. 상세 화면 이벤트
    // 요리 시작하기 버튼
    DOM.startCookingBtn.addEventListener('click', () => {
      navigateTo('cooking');
    });

    // 3. 요리 모드 이벤트
    // 타이머 일시정지 / 재개 버튼
    DOM.timerToggleBtn.addEventListener('click', () => {
      if (window.TimerController.getIsRunning()) {
        window.TimerController.pause();
        DOM.timerToggleBtn.textContent = '이어하기';
        DOM.timerToggleBtn.style.color = 'var(--text-main)';
        DOM.timerToggleBtn.style.background = 'rgba(255, 255, 255, 0.1)';
      } else {
        window.TimerController.resume();
        DOM.timerToggleBtn.textContent = '일시정지';
        DOM.timerToggleBtn.style.color = 'var(--accent-color)';
        DOM.timerToggleBtn.style.background = 'rgba(245, 158, 11, 0.1)';
      }
    });

    // 타이머 가속 버튼 (테스트 편의용 10배속 토글)
    DOM.timerFastBtn.addEventListener('click', () => {
      isTimerAccelerated = !isTimerAccelerated;
      if (isTimerAccelerated) {
        window.TimerController.setSpeedMultiplier(10);
        DOM.timerFastBtn.textContent = '정속 1x';
        DOM.timerFastBtn.style.background = 'var(--accent-color)';
        DOM.timerFastBtn.style.color = '#0b0f19';
      } else {
        window.TimerController.setSpeedMultiplier(1.0);
        DOM.timerFastBtn.textContent = '▶▶ 가속';
        DOM.timerFastBtn.style.background = 'rgba(239, 68, 68, 0.1)';
        DOM.timerFastBtn.style.color = '#FCA5A5';
      }
    });

    // 음성안내 속도 조절 슬라이더
    DOM.ttsSpeedSlider.addEventListener('input', (e) => {
      const speed = parseFloat(e.target.value);
      state.ttsSpeed = speed;
      DOM.ttsSpeedLabel.textContent = `${speed.toFixed(1)}x`;
      window.VoiceController.setSpeed(speed);
    });

    // 타이머 종료 후 자동 진행 체크박스
    DOM.autoNextToggle.addEventListener('change', (e) => {
      state.autoNextEnabled = e.target.checked;
    });

    // 음성 인식 토글 스위치
    DOM.sttToggle.addEventListener('change', (e) => {
      state.sttEnabled = e.target.checked;
      if (state.sttEnabled) {
        startSTT();
      } else {
        stopSTT();
      }
    });

    // 거대 엘보우 컨트롤러 터치 이벤트
    DOM.cookPrevBtn.addEventListener('click', () => {
      goToPreviousStep();
    });
    DOM.cookRepeatBtn.addEventListener('click', () => {
      speakCurrentStep();
    });
    DOM.cookNextBtn.addEventListener('click', () => {
      goToNextStep();
    });

    // 4. 완료 화면 이벤트
    DOM.completeHomeBtn.addEventListener('click', () => {
      navigateTo('home');
    });
  }

  // ==========================================
  // [1] 홈 화면 비즈니스 로직
  // ==========================================
  function renderHome() {
    DOM.recipesList.innerHTML = '';

    // 검색어, 카테고리, 감성태그로 레시피 리스트 필터링
    const filtered = window.RECIPES.filter(recipe => {
      // 1. 검색어 매칭 (제목 또는 재료명)
      if (state.searchQuery) {
        const titleMatch = recipe.title.includes(state.searchQuery);
        const ingredientMatch = recipe.ingredients.some(ing => ing.name.includes(state.searchQuery));
        if (!titleMatch && !ingredientMatch) return false;
      }

      // 2. 카테고리 매칭
      if (state.activeCategory !== '전체') {
        if (recipe.category !== state.activeCategory) return false;
      }

      // 3. 감성 태그 매칭 (선택된 감성 태그 중 하나라도 레시피에 있으면 매칭)
      if (state.activeMoods.size > 0) {
        const hasMood = recipe.moodTags.some(mood => state.activeMoods.has(mood));
        if (!hasMood) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      DOM.recipesList.innerHTML = `
        <div class="recipe-empty">
          <p>조건에 맞는 맛있는 레시피를 찾지 못했습니다.</p>
          <p style="font-size:12px; margin-top:6px; color:var(--text-muted);">다른 필터를 선택하거나 검색어를 변경해보세요!</p>
        </div>
      `;
      return;
    }

    filtered.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';
      card.dataset.id = recipe.id;

      const tagHtml = recipe.moodTags.map(tag => `<span class="recipe-tag mood">#${tag}</span>`).join('');
      const categoryTag = `<span class="recipe-tag">${recipe.category}</span>`;

      card.innerHTML = `
        <div class="recipe-card-img">
          ${recipe.imageSvg}
        </div>
        <div class="recipe-card-info">
          <div>
            <div class="recipe-card-title">${recipe.title}</div>
            <div class="recipe-card-meta">
              <span>⏱️ ${recipe.totalTimeMinutes}분</span>
              <span>•</span>
              <span>⭐ ${recipe.difficulty}</span>
              <span>•</span>
              <span>👥 ${recipe.servings}인분</span>
            </div>
          </div>
          <div class="recipe-card-tags">
            ${categoryTag}
            ${tagHtml}
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        state.selectedRecipeId = recipe.id;
        navigateTo('detail');
      });

      DOM.recipesList.appendChild(card);
    });
  }

  // ==========================================
  // [2] 상세 화면 비즈니스 로직
  // ==========================================
  function renderDetail() {
    const recipe = window.RECIPES.find(r => r.id === state.selectedRecipeId);
    if (!recipe) return;

    // 제목 및 메타정보 채우기
    DOM.detailRecipeTitle.textContent = recipe.title;
    DOM.detailRecipeImg.innerHTML = recipe.imageSvg;
    DOM.detailMetaTime.textContent = `${recipe.totalTimeMinutes}분`;
    DOM.detailMetaDifficulty.textContent = recipe.difficulty;
    DOM.detailMetaServings.textContent = `${recipe.servings}인분`;

    // 해당 레시피의 체크리스트 캐시 로드
    if (!state.checkedIngredients[recipe.id]) {
      state.checkedIngredients[recipe.id] = {};
    }

    // 재료 목록 렌더링
    DOM.detailIngredientsList.innerHTML = '';
    recipe.ingredients.forEach(ing => {
      const isChecked = !!state.checkedIngredients[recipe.id][ing.name];

      const item = document.createElement('div');
      item.className = `ingredient-item ${isChecked ? 'checked' : ''}`;
      item.innerHTML = `
        <div class="ingredient-name-wrap">
          <div class="ingredient-checkbox"></div>
          <span class="ingredient-name">${ing.name}</span>
        </div>
        <span class="ingredient-amount">${ing.amount}</span>
      `;

      item.addEventListener('click', () => {
        const currentChecked = !state.checkedIngredients[recipe.id][ing.name];
        state.checkedIngredients[recipe.id][ing.name] = currentChecked;
        
        if (currentChecked) {
          item.classList.add('checked');
        } else {
          item.classList.remove('checked');
        }
        saveCheckedIngredients();
      });

      DOM.detailIngredientsList.appendChild(item);
    });
  }

  // ==========================================
  // [3] 핸즈프리 요리 모드 비즈니스 로직
  // ==========================================
  function startCookingMode() {
    state.currentStepIndex = 0;
    
    // 설정값 컨트롤러 바인딩 반영
    DOM.autoNextToggle.checked = state.autoNextEnabled;
    DOM.sttToggle.checked = state.sttEnabled;
    DOM.ttsSpeedSlider.value = state.ttsSpeed;
    DOM.ttsSpeedLabel.textContent = `${state.ttsSpeed.toFixed(1)}x`;
    window.VoiceController.setSpeed(state.ttsSpeed);

    // Wake Lock 방지 및 STT 시작
    requestWakeLock();
    if (state.sttEnabled) {
      startSTT();
    } else {
      stopSTT();
    }

    renderStep();
  }

  function renderStep() {
    const recipe = window.RECIPES.find(r => r.id === state.selectedRecipeId);
    if (!recipe) return;

    const step = recipe.steps[state.currentStepIndex];
    if (!step) return;

    // 헤더 및 진행바 갱신
    DOM.cookingRecipeTitle.textContent = recipe.title;
    DOM.cookingStepProgress.textContent = `${state.currentStepIndex + 1} / ${recipe.steps.length} 단계`;
    
    const progressPercent = Math.round(((state.currentStepIndex + 1) / recipe.steps.length) * 100);
    DOM.cookingProgressFill.style.width = `${progressPercent}%`;

    // 단계 카드 내용 갱신
    DOM.cookingStepLabel.textContent = `STEP ${step.order}`;
    DOM.cookingStepInstruction.textContent = step.instruction;

    // 하단 버튼 구성 변경 (마지막 단계 시 완료로 변형)
    if (state.currentStepIndex === recipe.steps.length - 1) {
      DOM.cookNextBtn.innerHTML = `
        <svg viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
        </svg>
        요리 완성!
      `;
      DOM.cookNextBtn.classList.add('btn-primary');
    } else {
      DOM.cookNextBtn.innerHTML = `
        <svg viewBox="0 0 24 24">
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
        </svg>
        다음 단계
      `;
      DOM.cookNextBtn.classList.remove('btn-primary');
    }

    // 이전 버튼 비활성화 분기
    if (state.currentStepIndex === 0) {
      DOM.cookPrevBtn.disabled = true;
      DOM.cookPrevBtn.style.opacity = '0.4';
    } else {
      DOM.cookPrevBtn.disabled = false;
      DOM.cookPrevBtn.style.opacity = '1';
    }

    // 타이머 모듈 동작 여부 결정
    if (step.timerSeconds > 0) {
      DOM.timerSection.classList.remove('hidden');
      DOM.timerToggleBtn.textContent = '일시정지';
      DOM.timerToggleBtn.style.color = 'var(--accent-color)';
      DOM.timerToggleBtn.style.background = 'rgba(245, 158, 11, 0.1)';
      
      // 타이머 시작
      window.TimerController.start(
        step.timerSeconds,
        // Tick 콜백
        (remaining, formatted, percent) => {
          DOM.timerTime.textContent = formatted;
          DOM.timerBar.style.width = `${100 - percent}%`;
        },
        // 완료(Complete) 콜백
        () => {
          // 타이머 완료 시 TTS 멘트 안내
          window.VoiceController.speak("타이머가 완료되었습니다.", null, () => {
            if (state.autoNextEnabled) {
              // 잠시 대기 후 자동 다음 단계 이동
              setTimeout(() => {
                if (state.currentScreen === 'cooking') {
                  window.VoiceController.speak("이어서 다음 단계를 안내합니다.");
                  goToNextStep();
                }
              }, 2000);
            }
          });
        }
      );
    } else {
      window.TimerController.stop();
      DOM.timerSection.classList.add('hidden');
    }

    // 현재 단계 안내 음성(TTS) 읽기
    speakCurrentStep();
  }

  // TTS 현재 단계 읽어주기 실행
  function speakCurrentStep() {
    const recipe = window.RECIPES.find(r => r.id === state.selectedRecipeId);
    if (!recipe) return;

    const step = recipe.steps[state.currentStepIndex];
    if (!step) return;

    const textToSpeak = `${step.order}단계. ${step.instruction}`;
    window.VoiceController.speak(textToSpeak);
  }

  // 다음 단계 이동 함수
  function goToNextStep() {
    const recipe = window.RECIPES.find(r => r.id === state.selectedRecipeId);
    if (!recipe) return;

    if (state.currentStepIndex < recipe.steps.length - 1) {
      state.currentStepIndex++;
      renderStep();
    } else {
      // 마지막 단계에서 '다음' 누르면 요리 완료 처리
      navigateTo('complete');
    }
  }

  // 이전 단계 이동 함수
  function goToPreviousStep() {
    if (state.currentStepIndex > 0) {
      state.currentStepIndex--;
      renderStep();
    }
  }

  // ==========================================
  // [4] 완료 화면 비즈니스 로직
  // ==========================================
  function renderComplete() {
    const recipe = window.RECIPES.find(r => r.id === state.selectedRecipeId);
    if (!recipe) return;

    DOM.completeRecipeMessage.textContent = `"${recipe.title}" 요리를 무사히 마쳤습니다. 맛있는 식사 되세요!`;

    // 다음에 만들 추천 레시피 바인딩 (현재 카테고리와 같거나 랜덤 2개 선정)
    const recommendations = window.RECIPES
      .filter(r => r.id !== recipe.id) // 본인 제외
      .sort(() => 0.5 - Math.random()) // 랜덤 셔플
      .slice(0, 2);

    DOM.recommendRecipesList.innerHTML = '';
    recommendations.forEach(rec => {
      const card = document.createElement('div');
      card.className = 'recipe-card';
      card.style.background = 'rgba(255, 255, 255, 0.03)';
      card.style.borderRadius = '14px';
      
      const tags = rec.moodTags.slice(0, 2).map(tag => `<span class="recipe-tag mood">#${tag}</span>`).join('');

      card.innerHTML = `
        <div class="recipe-card-img" style="width:70px; height:70px; padding:6px;">
          ${rec.imageSvg}
        </div>
        <div class="recipe-card-info" style="padding:10px;">
          <div>
            <div class="recipe-card-title" style="font-size:14px;">${rec.title}</div>
            <div class="recipe-card-meta" style="font-size:10px; margin-bottom:0;">
              <span>⏱️ ${rec.totalTimeMinutes}분</span>
              <span>•</span>
              <span>⭐ ${rec.difficulty}</span>
            </div>
          </div>
          <div class="recipe-card-tags" style="margin-top:4px;">
            ${tags}
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        state.selectedRecipeId = rec.id;
        navigateTo('detail');
      });

      DOM.recommendRecipesList.appendChild(card);
    });

    // 축하 팡파레 효과음 재생
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        // 간단한 축하 소리 합성 (솔 -> 도 -> 미 -> 솔 음계)
        const notes = [392.00, 523.25, 659.25, 783.99];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.value = freq;
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          const time = ctx.currentTime + (idx * 0.15);
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.2, time + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
          
          osc.start(time);
          osc.stop(time + 0.45);
        });
      }
    } catch (e) {
      console.warn('완성 효과음 실패:', e);
    }
  }

  // ==========================================
  // [5] 음성 인식(STT) 구동 및 연동 제어
  // ==========================================
  function startSTT() {
    window.VoiceController.startRecognition(
      // 1. 음성 명령 핸들러
      (command) => {
        if (state.currentScreen !== 'cooking') return;

        if (command === 'NEXT') {
          console.log('음성 명령 실행: 다음 단계');
          DOM.sttLogBar.textContent = '🗣️ "다음" 감지됨 → 다음 단계로 이동합니다.';
          goToNextStep();
        } else if (command === 'PREV') {
          console.log('음성 명령 실행: 이전 단계');
          DOM.sttLogBar.textContent = '🗣️ "이전" 감지됨 → 이전 단계로 이동합니다.';
          goToPreviousStep();
        } else if (command === 'REPEAT') {
          console.log('음성 명령 실행: 다시 들려주기');
          DOM.sttLogBar.textContent = '🗣️ "다시" 감지됨 → 음성을 다시 재생합니다.';
          speakCurrentStep();
        }
      },
      // 2. 상태 변화 핸들러
      (status, message) => {
        console.log(`STT 상태 [${status}]: ${message}`);
        DOM.sttLogBar.textContent = message;

        if (status === 'LISTENING') {
          DOM.voiceStatusIndicator.className = 'voice-status-dot listening';
        } else if (status === 'STOPPED' || status === 'NOT_SUPPORTED') {
          DOM.voiceStatusIndicator.className = 'voice-status-dot';
        } else if (status.startsWith('ERROR')) {
          DOM.voiceStatusIndicator.className = 'voice-status-dot';
          // 권한 에러 등이 발생했을 때, 스위치 끄기로 상태 연동 처리
          if (status === 'ERROR_PERMISSION') {
            DOM.sttToggle.checked = false;
            state.sttEnabled = false;
          }
        }
      }
    );
  }

  function stopSTT() {
    window.VoiceController.stopRecognition();
    DOM.voiceStatusIndicator.className = 'voice-status-dot';
    DOM.sttLogBar.textContent = '음성 명령이 꺼져 있습니다.';
  }

  // ==========================================
  // [6] Wake Lock API (화면 꺼짐 방지)
  // ==========================================
  async function requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        state.wakeLockSentinel = await navigator.wakeLock.request('screen');
        console.log('화면 꺼짐 방지(Wake Lock)가 정상 작동 중입니다.');
        DOM.wakelockAlert.classList.add('hidden');
        
        // 브라우저 탭 포커스 해제 후 재배치 이벤트 처리
        state.wakeLockSentinel.addEventListener('release', () => {
          console.log('Wake Lock이 해제되었습니다.');
        });
      } catch (err) {
        console.error('Wake Lock 요청 실패:', err);
        DOM.wakelockAlert.classList.remove('hidden');
      }
    } else {
      console.warn('Wake Lock API가 지원되지 않는 브라우저입니다.');
      DOM.wakelockAlert.classList.remove('hidden');
    }
  }

  function releaseWakeLock() {
    if (state.wakeLockSentinel) {
      state.wakeLockSentinel.release()
        .then(() => {
          state.wakeLockSentinel = null;
        });
    }
    DOM.wakelockAlert.classList.add('hidden');
  }

  // 앱 로드 시 실행
  window.addEventListener('DOMContentLoaded', init);
})();
