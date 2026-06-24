// 레시피 데이터베이스 (window.RECIPES)
window.RECIPES = [
  {
    "id": "kimchi-jjigae",
    "title": "돼지고기 김치찌개",
    "category": "국찌개",
    "moodTags": ["칼칼", "얼큰", "짭짤", "든든"],
    "servings": 2,
    "totalTimeMinutes": 25,
    "difficulty": "초급",
    "imageSvg": `<svg viewBox="0 0 100 100" class="recipe-svg">
      <rect x="15" y="45" width="70" height="40" rx="10" fill="#E25C3D" />
      <path d="M10,50 Q10,42 20,42 L80,42 Q90,42 90,50 Z" fill="#D32F2F" />
      <rect x="42" y="32" width="16" height="10" rx="3" fill="#D32F2F" />
      <circle cx="50" cy="65" r="12" fill="#FFE082" />
      <path d="M42,65 C45,55 55,55 58,65" stroke="#E64A19" stroke-width="3" fill="none" />
      <path d="M45,70 Q50,75 55,70" stroke="#E64A19" stroke-width="2" fill="none" />
      <!-- 보글보글 거품 -->
      <circle cx="35" cy="55" r="4" fill="#FF8A65" />
      <circle cx="65" cy="53" r="5" fill="#FF8A65" />
      <circle cx="48" cy="52" r="3" fill="#FF8A65" />
    </svg>`,
    "ingredients": [
      { "name": "돼지고기(찌개용)", "amount": "150g" },
      { "name": "신김치", "amount": "1/4포기(약 200g)" },
      { "name": "두부", "amount": "1/2모" },
      { "name": "대파", "amount": "1/2대" },
      { "name": "청양고취", "amount": "1개" },
      { "name": "물 또는 쌀뜨물", "amount": "500ml" },
      { "name": "고춧가루", "amount": "1큰술" },
      { "name": "국간장", "amount": "1큰술" },
      { "name": "다진 마늘", "amount": "1/2큰술" }
    ],
    "steps": [
      {
        "order": 1,
        "instruction": "재료를 손질합니다. 신김치는 한입 크기로 썰고, 두부는 1cm 두께로, 대파와 청양고추는 어긋썰기 합니다.",
        "timerSeconds": 0
      },
      {
        "order": 2,
        "instruction": "냄비에 식용유를 살짝 두르고 돼지고기와 다진 마늘을 넣어 고기 겉면이 하얗게 변할 때까지 강불에서 2분간 볶아줍니다.",
        "timerSeconds": 120
      },
      {
        "order": 3,
        "instruction": "썰어둔 신김치를 넣고 고기 기름에 김치가 나른해질 때까지 3분간 더 달달 볶아줍니다.",
        "timerSeconds": 180
      },
      {
        "order": 4,
        "instruction": "물(또는 쌀뜨물) 500ml를 붓고 고춧가루 1큰술, 국간장 1큰술을 넣은 뒤 강불에서 끓여줍니다. 끓어오르면 중불로 줄여 10분간 푹 끓여줍니다.",
        "timerSeconds": 600
      },
      {
        "order": 5,
        "instruction": "두부, 대파, 청양고추를 넣고 약불에서 3분간 더 끓여 국물이 자작하게 우러나도록 마무리합니다.",
        "timerSeconds": 180
      }
    ]
  },
  {
    "id": "miyeokguk",
    "title": "맑은 소고기 미역국",
    "category": "국찌개",
    "moodTags": ["담백", "깔끔", "든든"],
    "servings": 3,
    "totalTimeMinutes": 35,
    "difficulty": "초급",
    "imageSvg": `<svg viewBox="0 0 100 100" class="recipe-svg">
      <path d="M15,40 Q50,30 85,40 L75,80 Q50,90 25,80 Z" fill="#3E2723" />
      <path d="M15,40 Q50,48 85,40 Q50,52 15,40" fill="#2E7D32" />
      <path d="M30,44 C32,55 25,60 33,70" stroke="#1B5E20" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M45,45 C48,58 40,65 47,75" stroke="#1B5E20" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M60,43 C58,52 65,60 62,72" stroke="#1B5E20" stroke-width="4" stroke-linecap="round" fill="none" />
      <rect x="52" y="55" width="8" height="6" rx="1" fill="#D7CCC8" transform="rotate(15, 52, 55)" />
      <rect x="36" y="60" width="10" height="7" rx="1" fill="#D7CCC8" transform="rotate(-10, 36, 60)" />
    </svg>`,
    "ingredients": [
      { "name": "소고기 국거리(양지)", "amount": "120g" },
      { "name": "자른 건미역", "amount": "10g(종이컵 1/3컵)" },
      { "name": "참기름", "amount": "1.5큰술" },
      { "name": "국간장", "amount": "1.5큰술" },
      { "name": "다진 마늘", "amount": "1/2큰술" },
      { "name": "멸치액젓 또는 참치액", "amount": "1큰술" },
      { "name": "물", "amount": "1L" }
    ],
    "steps": [
      {
        "order": 1,
        "instruction": "건미역을 물에 담가 15분 동안 불려줍니다. 불어난 미역은 물기를 꼭 짜고 한입 크기로 썰어 준비합니다.",
        "timerSeconds": 900
      },
      {
        "order": 2,
        "instruction": "냄비에 참기름 1.5큰술을 두르고 소고기를 넣어 중불에서 핏기가 거의 사라질 때까지 2분간 볶아줍니다.",
        "timerSeconds": 120
      },
      {
        "order": 3,
        "instruction": "불려둔 미역과 다진 마늘 1/2큰술, 국간장 1.5큰술을 냄비에 추가한 뒤 미역이 부드러워질 때까지 3분간 더 볶아줍니다.",
        "timerSeconds": 180
      },
      {
        "order": 4,
        "instruction": "물 1L를 붓고 센 불로 끓입니다. 끓어오르면 불을 중약불로 줄인 뒤, 뚜껑을 살짝 덮고 15분간 은근하게 끓여 미역의 깊은 맛을 냅니다.",
        "timerSeconds": 900
      },
      {
        "order": 5,
        "instruction": "멸치액젓(또는 참치액) 1큰술을 넣어 간을 맞추고 2분간 더 끓여 마무리합니다. 부족한 간은 소금으로 기호에 맞게 맞추세요.",
        "timerSeconds": 120
      }
    ]
  },
  {
    "id": "jeyuk",
    "title": "매콤 제육볶음",
    "category": "구이볶음",
    "moodTags": ["매콤", "짭짤", "든든"],
    "servings": 2,
    "totalTimeMinutes": 20,
    "difficulty": "중급",
    "imageSvg": `<svg viewBox="0 0 100 100" class="recipe-svg">
      <ellipse cx="50" cy="60" rx="42" ry="25" fill="#EEEEEE" stroke="#B0BEC5" stroke-width="2" />
      <path d="M25,55 Q35,45 45,55 Q55,42 65,52 Q75,45 80,58 Q65,65 50,60 Q35,68 25,55" fill="#D32F2F" />
      <path d="M30,58 Q40,50 50,61 Q60,48 70,55" stroke="#FF6F00" stroke-width="4" stroke-linecap="round" fill="none" />
      <!-- 통깨 솔솔 -->
      <circle cx="45" cy="52" r="1" fill="#FFF" />
      <circle cx="55" cy="50" r="1" fill="#FFF" />
      <circle cx="62" cy="54" r="1" fill="#FFF" />
      <circle cx="38" cy="58" r="1" fill="#FFF" />
      <!-- 파 초록 고명 -->
      <path d="M48,56 L52,54" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" />
      <path d="M58,51 L60,53" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" />
    </svg>`,
    "ingredients": [
      { "name": "돼지고기(뒷다리살 또는 앞다리살)", "amount": "300g" },
      { "name": "양파", "amount": "1/2개" },
      { "name": "대파", "amount": "1/2대" },
      { "name": "설탕", "amount": "1.5큰술" },
      { "name": "고추장", "amount": "1.5큰술" },
      { "name": "고춧가루", "amount": "2큰술" },
      { "name": "진간장", "amount": "2큰술" },
      { "name": "다진 마늘", "amount": "1큰술" },
      { "name": "참기름", "amount": "1큰술" }
    ],
    "steps": [
      {
        "order": 1,
        "instruction": "양파는 채 썰고 대파는 어긋썰기 하여 준비합니다. 고기는 먹기 좋은 한입 크기로 잘라둡니다.",
        "timerSeconds": 0
      },
      {
        "order": 2,
        "instruction": "팬을 강불로 달군 뒤 식용유 없이 고기만 넣어 먼저 굽듯이 볶아줍니다. 고기 표면이 노릇해질 때까지 약 3분간 볶습니다.",
        "timerSeconds": 180
      },
      {
        "order": 3,
        "instruction": "고기 기름이 나오기 시작하면 설탕 1.5큰술을 넣어 단맛이 고기에 배도록 1분간 코팅하듯 볶아줍니다.",
        "timerSeconds": 60
      },
      {
        "order": 4,
        "instruction": "고추장 1.5큰술, 고춧가루 2큰술, 진간장 2큰술, 다진 마늘 1큰술을 넣고 양념이 뭉치지 않게 중불에서 빠르게 3분간 볶아줍니다.",
        "timerSeconds": 180
      },
      {
        "order": 5,
        "instruction": "썰어둔 양파와 대파를 넣고 강불에서 2분간 채소가 숨이 죽을 때까지만 빠르게 휘리릭 볶아냅니다.",
        "timerSeconds": 120
      },
      {
        "order": 6,
        "instruction": "불을 끄고 참기름 1큰술을 둘러 가볍게 섞어 완성합니다.",
        "timerSeconds": 0
      }
    ]
  },
  {
    "id": "kimchi-fried-rice",
    "title": "스팸 김치볶음밥",
    "category": "한그릇",
    "moodTags": ["짭짤", "달콤", "든든"],
    "servings": 1,
    "totalTimeMinutes": 15,
    "difficulty": "초급",
    "imageSvg": `<svg viewBox="0 0 100 100" class="recipe-svg">
      <ellipse cx="50" cy="62" rx="40" ry="24" fill="#ECEFF1" stroke="#CFD8DC" stroke-width="2" />
      <path d="M22,60 Q50,40 78,60 Q50,75 22,60" fill="#E64A19" />
      <!-- 계란 후라이 -->
      <circle cx="50" cy="56" r="16" fill="#FFF" />
      <circle cx="50" cy="56" r="7" fill="#FFC107" />
      <!-- 김가루 -->
      <path d="M38,62 L44,60 M40,65 L46,63 M58,62 L64,65" stroke="#212121" stroke-width="2" />
    </svg>`,
    "ingredients": [
      { "name": "신김치", "amount": "1종이컵(잘게 썬 것)" },
      { "name": "스팸 또는 통조림햄", "amount": "1/2캔(약 60g)" },
      { "name": "밥", "amount": "1공기" },
      { "name": "대파", "amount": "1/3대" },
      { "name": "진간장", "amount": "1큰술" },
      { "name": "설탕", "amount": "1/2큰술" },
      { "name": "참기름", "amount": "1큰술" },
      { "name": "계란", "amount": "1개" }
    ],
    "steps": [
      {
        "order": 1,
        "instruction": "신김치와 스팸은 사방 1cm 미만으로 잘게 다지듯 썰고, 대파는 송송 썰어 준비합니다.",
        "timerSeconds": 0
      },
      {
        "order": 2,
        "instruction": "팬에 식용유 1큰술을 두르고 대파를 넣어 중불에서 2분간 파기름을 냅니다.",
        "timerSeconds": 120
      },
      {
        "order": 3,
        "instruction": "파 향이 올라오면 스팸을 넣고 2분간 노릇해질 때까지 함께 볶아줍니다.",
        "timerSeconds": 120
      },
      {
        "order": 4,
        "instruction": "신김치와 설탕 1/2큰술을 넣고 김치 색이 투명해질 때까지 3분간 더 볶습니다.",
        "timerSeconds": 180
      },
      {
        "order": 5,
        "instruction": "재료들을 팬 한쪽으로 몰아두고, 빈 공간에 진간장 1큰술을 부어 바글바글 끓여 불맛을 낸 후 전체를 섞어줍니다.",
        "timerSeconds": 60
      },
      {
        "order": 6,
        "instruction": "불을 약불로 줄이거나 잠시 끈 뒤, 밥 1공기를 넣고 주걱을 세워 뭉친 밥을 잘 비벼줍니다.",
        "timerSeconds": 0
      },
      {
        "order": 7,
        "instruction": "밥이 빨갛게 다 비벼지면 센 불에서 1분간 빠르게 볶아 고슬고슬하게 만들고, 참기름 1큰술을 두르고 불을 끕니다. 계란 후라이를 따로 만들어 위에 얹어 즐기세요.",
        "timerSeconds": 60
      }
    ]
  },
  {
    "id": "gyeranmari",
    "title": "폭신한 야채 계란말이",
    "category": "반찬",
    "moodTags": ["담백", "짭짤", "깔끔"],
    "servings": 2,
    "totalTimeMinutes": 15,
    "difficulty": "중급",
    "imageSvg": `<svg viewBox="0 0 100 100" class="recipe-svg">
      <ellipse cx="50" cy="62" rx="42" ry="22" fill="#FAFAFA" stroke="#E0E0E0" stroke-width="2" />
      <path d="M22,60 L78,50 L72,68 L20,72 Z" fill="#FFCA28" />
      <path d="M24,59 C28,52 35,53 38,62" stroke="#FFF" stroke-width="2" stroke-linecap="round" fill="none" />
      <path d="M42,55 C46,48 53,49 56,58" stroke="#FFF" stroke-width="2" stroke-linecap="round" fill="none" />
      <path d="M60,51 C64,44 71,45 74,54" stroke="#FFF" stroke-width="2" stroke-linecap="round" fill="none" />
      <!-- 당근 파 초록/주홍 점들 -->
      <circle cx="32" cy="62" r="1.5" fill="#E65100" />
      <circle cx="48" cy="58" r="1.5" fill="#2E7D32" />
      <circle cx="64" cy="54" r="1.5" fill="#E65100" />
      <circle cx="36" cy="67" r="1.5" fill="#2E7D32" />
      <circle cx="52" cy="63" r="1.5" fill="#E65100" />
    </svg>`,
    "ingredients": [
      { "name": "계란", "amount": "4개" },
      { "name": "당근", "amount": "1/8개(다져서 1큰술)" },
      { "name": "대파(초록부분)", "amount": "1/2대(다져서 1큰술)" },
      { "name": "소금", "amount": "1/3작은술" },
      { "name": "맛술(선택)", "amount": "1큰술" },
      { "name": "식용유", "amount": "적당량" }
    ],
    "steps": [
      {
        "order": 1,
        "instruction": "당근과 대파는 고른 두께로 아주 잘게 다져줍니다. 입자가 크면 계란말이를 말 때 찢어지기 쉽습니다.",
        "timerSeconds": 0
      },
      {
        "order": 2,
        "instruction": "볼에 계란 4개, 소금 1/3작은술, 맛술 1큰술을 넣고 흰자와 노른자가 충분히 섞이도록 알끈을 풀며 저어준 뒤, 다진 당근과 대파를 넣어 가볍게 섞습니다.",
        "timerSeconds": 0
      },
      {
        "order": 3,
        "instruction": "팬에 식용유를 가볍게 두르고 키친타올로 얇게 코팅하듯 닦아낸 다음 약불로 달구어 줍니다.",
        "timerSeconds": 60
      },
      {
        "order": 4,
        "instruction": "계란물의 1/3 분량을 팬에 넓게 부어 얇게 편 뒤, 윗면이 약간 덜 익었을 때 끝에서부터 말아줍니다. 다 말아지면 한쪽 끝으로 당겨줍니다.",
        "timerSeconds": 120
      },
      {
        "order": 5,
        "instruction": "남은 계란물의 절반을 부어주고 먼저 말아둔 계란 밑으로 계란물이 들어가게 연결한 뒤, 다시 말아줍니다. 이 과정을 한 번 더 반복하여 두툼한 모양을 완성합니다.",
        "timerSeconds": 180
      },
      {
        "order": 6,
        "instruction": "다 말아진 계란말이를 뒤집개로 살짝 누르며 사면을 돌려가며 은근한 약불에서 속까지 2분간 완전히 익혀줍니다. 한 김 식힌 뒤 칼로 썰어 드세요.",
        "timerSeconds": 120
      }
    ]
  },
  {
    "id": "kongnamul",
    "title": "아삭한 콩나물무침",
    "category": "반찬",
    "moodTags": ["깔끔", "담백", "짭짤"],
    "servings": 2,
    "totalTimeMinutes": 15,
    "difficulty": "초급",
    "imageSvg": `<svg viewBox="0 0 100 100" class="recipe-svg">
      <ellipse cx="50" cy="62" rx="38" ry="20" fill="#E0F7FA" stroke="#80DEEA" stroke-width="2" />
      <path d="M35,50 C38,62 48,58 52,68 C58,60 62,65 68,52" stroke="#FFF59D" stroke-width="4" stroke-linecap="round" fill="none" />
      <circle cx="34" cy="48" r="3.5" fill="#FFEE58" />
      <circle cx="69" cy="50" r="3.5" fill="#FFEE58" />
      <path d="M42,53 C46,65 52,58 58,67 C60,59 64,57 65,46" stroke="#FFF59D" stroke-width="3" stroke-linecap="round" fill="none" />
      <circle cx="66" cy="44" r="3.5" fill="#FFEE58" />
      <!-- 파 실고명 -->
      <path d="M48,58 L55,56 M42,61 L46,59" stroke="#81C784" stroke-width="2" />
    </svg>`,
    "ingredients": [
      { "name": "콩나물", "amount": "1봉지(300g)" },
      { "name": "물", "amount": "1/2컵(100ml)" },
      { "name": "소금(데치기용)", "amount": "1/2큰술" },
      { "name": "다진 대파", "amount": "1큰술" },
      { "name": "다진 마늘", "amount": "1/2작은술" },
      { "name": "국간장 또는 참치액", "amount": "1/2큰술" },
      { "name": "꽃소금(간 맞춤)", "amount": "2~3꼬집" },
      { "name": "참기름", "amount": "1큰술" },
      { "name": "통깨", "amount": "1/2큰술" }
    ],
    "steps": [
      {
        "order": 1,
        "instruction": "콩나물을 흐르는 물에 2~3번 흔들어 깨끗이 씻고 체에 밭쳐 물기를 빼줍니다.",
        "timerSeconds": 0
      },
      {
        "order": 2,
        "instruction": "냄비에 씻어둔 콩나물과 물 100ml, 소금 1/2큰술을 넣고 뚜껑을 덮은 뒤 강불로 가열합니다. 김이 올라오기 시작하면 중불로 낮추어 딱 4분간 삶아줍니다. (중간에 뚜껑을 열면 비린내가 납니다!)",
        "timerSeconds": 240
      },
      {
        "order": 3,
        "instruction": "삶아진 콩나물을 즉시 건져서 넓은 쟁반에 펼쳐 자연적으로 식혀줍니다. 찬물에 헹구지 않아야 콩나물 본연의 고소한 맛이 유지되고 아삭해집니다.",
        "timerSeconds": 300
      },
      {
        "order": 4,
        "instruction": "볼에 한 김 식은 콩나물과 다진 대파 1큰술, 다진 마늘 1/2작은술, 국간장 1/2큰술, 참기름 1큰술, 꽃소금 2꼬집, 통깨를 넣고 조물조물 가볍게 무쳐내어 완성합니다.",
        "timerSeconds": 0
      }
    ]
  },
  {
    "id": "doenjang-jjigae",
    "title": "차돌 된장찌개",
    "category": "국찌개",
    "moodTags": ["깔끔", "짭짤", "든든"],
    "servings": 2,
    "totalTimeMinutes": 20,
    "difficulty": "중급",
    "imageSvg": `<svg viewBox="0 0 100 100" class="recipe-svg">
      <rect x="15" y="48" width="70" height="38" rx="8" fill="#4E342E" />
      <path d="M12,50 Q50,42 88,50 L84,80 Q50,88 16,80 Z" fill="#3E2723" />
      <ellipse cx="50" cy="52" rx="34" ry="8" fill="#8D6E63" />
      <!-- 두부 조각 -->
      <rect x="30" y="50" width="12" height="8" fill="#FFF" transform="rotate(-15, 30, 50)" />
      <rect x="48" y="49" width="10" height="8" fill="#FFF" transform="rotate(10, 48, 49)" />
      <!-- 애호박 조각 -->
      <path d="M58,51 A6,6 0 0,1 68,54 L66,56 A6,6 0 0,0 56,53 Z" fill="#81C784" />
    </svg>`,
    "ingredients": [
      { "name": "차돌박이 또는 우삼겹", "amount": "80g" },
      { "name": "된장", "amount": "2큰술" },
      { "name": "고추장", "amount": "1/2큰술" },
      { "name": "두부", "amount": "1/2모" },
      { "name": "애호박", "amount": "1/3개" },
      { "name": "표고버섯", "amount": "1개" },
      { "name": "대파", "amount": "1/3대" },
      { "name": "멸치 다시마 육수", "amount": "450ml" },
      { "name": "다진 마늘", "amount": "1/2큰술" }
    ],
    "steps": [
      {
        "order": 1,
        "instruction": "애호박, 표고버섯, 두부는 1.5cm 사방 크기로 깍둑썰기하고, 대파는 송송 썰어 준비합니다.",
        "timerSeconds": 0
      },
      {
        "order": 2,
        "instruction": "뚝배기나 냄비에 차돌박이를 넣고 중불에서 고기 겉면이 노릇해지고 기름이 충분히 나올 때까지 2분간 볶아줍니다.",
        "timerSeconds": 120
      },
      {
        "order": 3,
        "instruction": "차돌박이 기름에 된장 2큰술, 고추장 1/2큰술을 넣고 중약불에서 타지 않게 고기와 함께 1분간 골고루 볶아 떫은 맛을 날립니다.",
        "timerSeconds": 60
      },
      {
        "order": 4,
        "instruction": "멸치 다시마 육수 450ml를 부은 뒤 센 불로 끓이고, 육수가 끓어오르면 썰어둔 애호박과 표고버섯, 다진 마늘 1/2큰술을 넣고 중불에서 5분간 끓입니다.",
        "timerSeconds": 300
      },
      {
        "order": 5,
        "instruction": "마지막으로 두부와 대파를 넣고 한소끔 더 끓여내어 3분간 자작하게 익혀 마무리합니다.",
        "timerSeconds": 180
      }
    ]
  },
  {
    "id": "tteokbokki",
    "title": "시장식 국물 떡볶이",
    "category": "한그릇",
    "moodTags": ["매콤", "달콤", "칼칼", "짭짤"],
    "servings": 2,
    "totalTimeMinutes": 20,
    "difficulty": "초급",
    "imageSvg": `<svg viewBox="0 0 100 100" class="recipe-svg">
      <ellipse cx="50" cy="62" rx="42" ry="24" fill="#E0F2F1" stroke="#B2DFDB" stroke-width="2" />
      <path d="M18,60 Q50,42 82,60 Q50,75 18,60" fill="#E64A19" />
      <!-- 밀떡들 -->
      <rect x="30" y="53" width="18" height="6" rx="2" fill="#FFF" transform="rotate(15, 30, 53)" />
      <rect x="42" y="58" width="18" height="6" rx="2" fill="#FFF" transform="rotate(-10, 42, 58)" />
      <rect x="52" y="50" width="18" height="6" rx="2" fill="#FFF" transform="rotate(30, 52, 50)" />
      <!-- 어묵 삼각 조각 -->
      <polygon points="58,56 68,52 64,64" fill="#FFE082" />
    </svg>`,
    "ingredients": [
      { "name": "떡볶이 떡(밀떡 또는 쌀떡)", "amount": "300g" },
      { "name": "사각 어묵", "amount": "2장" },
      { "name": "대파", "amount": "1/2대" },
      { "name": "물", "amount": "400ml" },
      { "name": "고추장", "amount": "2큰술" },
      { "name": "진간장", "amount": "1.5큰술" },
      { "name": "고춧가루", "amount": "1큰술" },
      { "name": "설탕", "amount": "2큰술" },
      { "name": "올리고당", "amount": "1큰술" }
    ],
    "steps": [
      {
        "order": 1,
        "instruction": "떡은 물에 10분간 담가 가볍게 헹구어 건져놓고, 어묵은 삼각형 또는 한입 크기로 썰고, 대파는 듬성듬성 3cm 길이로 썰어 준비합니다.",
        "timerSeconds": 600
      },
      {
        "order": 2,
        "instruction": "팬에 물 400ml를 붓고 고추장 2큰술, 진간장 1.5큰술, 고춧가루 1큰술, 설탕 2큰술, 올리고당 1큰술을 잘 풀어준 뒤 센 불로 가열합니다.",
        "timerSeconds": 120
      },
      {
        "order": 3,
        "instruction": "국물이 바글바글 끓어오르면 준비해 둔 떡을 먼저 넣고 떡에 양념이 밸 때까지 3분간 중불에서 저어가며 끓여줍니다.",
        "timerSeconds": 180
      },
      {
        "order": 4,
        "instruction": "떡이 통통하게 부풀며 말랑해지면 썰어둔 어묵과 대파를 한꺼번에 넣고 국물이 살짝 걸쭉해질 때까지 4분간 더 졸여 줍니다.",
        "timerSeconds": 240
      }
    ]
  },
  {
    "id": "gyeran-ganjangbap",
    "title": "초간단 계란 간장비빔밥",
    "category": "한그릇",
    "moodTags": ["담백", "짭짤", "달콤"],
    "servings": 1,
    "totalTimeMinutes": 8,
    "difficulty": "초급",
    "imageSvg": `<svg viewBox="0 0 100 100" class="recipe-svg">
      <ellipse cx="50" cy="62" rx="38" ry="20" fill="#F5F5F5" stroke="#E0E0E0" stroke-width="2" />
      <path d="M20,60 Q50,48 80,60 Q50,70 20,60" fill="#FFF" />
      <!-- 계란 노른자 반숙 -->
      <circle cx="50" cy="58" r="14" fill="#FFE082" />
      <circle cx="50" cy="58" r="8" fill="#FFB300" />
      <!-- 간장 방울 효과 -->
      <ellipse cx="38" cy="57" rx="3" ry="1.5" fill="#3E2723" transform="rotate(-15, 38, 57)" />
      <!-- 깨와 파 -->
      <circle cx="54" cy="52" r="1" fill="#2E7D32" />
      <circle cx="44" cy="63" r="1" fill="#8D6E63" />
    </svg>`,
    "ingredients": [
      { "name": "따뜻한 밥", "amount": "1공기" },
      { "name": "계란", "amount": "2개" },
      { "name": "진간장 또는 맛간장", "amount": "1.5큰술" },
      { "name": "참기름", "amount": "1큰술" },
      { "name": "버터 또는 마가린(선택)", "amount": "1/2조각(약 5g)" },
      { "name": "통깨", "amount": "약간" },
      { "name": "식용유", "amount": "1큰술" }
    ],
    "steps": [
      {
        "order": 1,
        "instruction": "팬에 식용유 1큰술을 두르고 계란 2개를 올려 흰자는 바삭하게 익히고 노른자는 익히지 않는 '써니 사이드 업(반숙)' 스타일로 2분간 구워줍니다.",
        "timerSeconds": 120
      },
      {
        "order": 2,
        "instruction": "따뜻한 밥 1공기를 대접에 담고, 밥 위에 버터 1/2조각을 얹어 밥 온도로 녹여 줍니다.",
        "timerSeconds": 60
      },
      {
        "order": 3,
        "instruction": "버터를 얹은 밥 위에 구워진 계란 후라이 2개를 올리고 진간장 1.5큰술, 참기름 1큰술, 통깨를 골고루 뿌려줍니다. 노른자를 터뜨려 뜨거울 때 맛있게 비벼 드세요.",
        "timerSeconds": 0
      }
    ]
  }
];
