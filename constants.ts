import { Character, Location, SocialPost } from './types';

export const APP_TITLE = "거짓의 덫, 진실의 패악";
export const APP_SUBTITLE = "Trap of Lies, Vice of Truth";

export const CHARACTERS: Character[] = [
  {
    id: 'tianhua',
    name: '후천화 (后天花)',
    role: '백화점 천화원 회장',
    age: '32세',
    description: '거짓으로 쌓아 올린 성의 주인. 살기 위해 자신을 팔았고, 이제는 타인을 옭아매는 아름다운 포식자.',
    image: 'https://i.postimg.cc/Bnx5b99M/hu-peupil.png', // Updated Main Profile
    socialImage: 'https://i.postimg.cc/B6fdDGtd/inpeu.png', // Instagram Specific Profile
    color: 'from-purple-900 to-purple-600',
    tags: ['주인공', '집착', '애정결핍', '지배자', '마미'],
    details: {
      height: '172cm',
      likes: ['돈', '성공', '명예', '머리 쓰다듬기(비밀)'],
      dislikes: ['가난', '못생김', '통제 불가능한 상황'],
      personality: {
        surface: '모두를 홀리는 완벽한 미소와 우아한 태도. 계산적이며 빈틈없는 사업가.',
        inner: '사랑을 갈구하며 버려질까 두려워하는 상처받은 아이. 극도의 스트레스 상황에선 자해를 하는 위태로운 영혼.'
      },
      quotes: [
        "내 세상에 들어왔으면, 규칙은 내가 정해. 알겠어?",
        "사랑? 하... 돈으로 살 수 없는 건 없어. 만약 있다면, 그건 가짜겠지.",
        "가지 마... 날 혼자 두지 마. 제발, 명령이야."
      ]
    }
  },
  {
    id: 'chengyen',
    name: '구청옌 (Gu Chengyen)',
    role: '반도체 기업 청예한 CEO',
    age: '55세',
    description: '천화의 남편이라는 이름의 감시자. 그녀를 자신의 트로피이자 도구로 여기는 냉혹한 설계자.',
    image: 'https://i.postimg.cc/NfNqnVPP/gucheong-yen.png', // Updated
    color: 'from-emerald-900 to-slate-800',
    tags: ['조연', '빌런', '통제광', '소시오패스'],
    details: {
      height: '180cm',
      likes: ['질서', '복종', '체면'],
      dislikes: ['무질서', '반항', '실패'],
      personality: {
        surface: '자상한 남편이자 성공한 기업가.',
        inner: '인간의 감정을 이해하지 못하며 타인을 체스 말로만 보는 냉혈한.'
      },
      quotes: [
        "당신은 아름다운 인형으로 남아있으면 됩니다, 천화.",
        "선을 넘지 마십시오. 그 대가는 당신이 가장 싫어하는 방식일 테니."
      ]
    }
  },
  {
    id: 'gamin',
    name: '김가민 (Kim Gamin)',
    role: '후천화의 수행비서',
    age: '28세',
    description: '구청옌이 심어둔 덫, 그러나 천화라는 늪에 빠져버린 관찰자.',
    image: 'https://i.postimg.cc/wj78YVSP/gimgamin.png', // Updated
    color: 'from-blue-900 to-slate-900',
    tags: ['조연', '조력자', '짝사랑', '묵묵함'],
    details: {
      height: '178cm',
      likes: ['원칙', '정확함', '후천화(비밀)'],
      dislikes: ['변수', '감정표현', '구청옌'],
      personality: {
        surface: '감정을 드러내지 않는 완벽한 비서.',
        inner: '자신의 임무와 천화를 향한 연심 사이에서 갈등하는 위태로운 로맨티스트.'
      },
      quotes: [
        "회장님, 저는 그저 지시를 따를 뿐입니다.",
        "제 눈을 속일 순 없습니다. ...하지만, 이번만은 못 본 척해드리죠."
      ]
    }
  }
];

export const LOCATIONS: Location[] = [
  {
    id: 'shanghai',
    name: '상하이 펜트하우스',
    description: '화려한 야경 아래 숨겨진 거대한 새장. 천화와 구청옌이 거주하는 180평의 차가운 공간.',
    image: 'https://i.postimg.cc/kgrL6bDd/jibjung-gug.png'
  },
  {
    id: 'store',
    name: '백화점 천화원',
    description: '천화의 왕국. 그녀가 유일하게 숨 쉴 수 있는 곳이자, 자신의 가치를 증명하는 전장.',
    image: 'https://i.postimg.cc/kgrL6bDm/jibbaeghwajeom.png'
  },
  {
    id: 'gangneung',
    name: '강릉 유배지',
    description: '바다가 보이는 아름다운 감옥. 구청옌이 천화를 고립시킬 때 사용하는 단독주택.',
    image: 'https://i.postimg.cc/3J0PxB81/jibgangleung.png'
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 1,
    image: 'https://i.postimg.cc/Dw8k3gtt/inge1.png', // inge1
    likes: '124.5K',
    comments: 842,
    location: 'Tianhua Garden VVIP Lounge',
    caption: '오늘도 완벽한 하루를 연기하며. 🥂 #TianhuaGarden #MyKingdom',
    date: '2 HOURS AGO',
    initialComments: [
      {
        id: 1,
        user: 'kim_gamin_sec',
        text: '회장님, 다음 미팅 장소가 준비되었습니다.',
        time: '1h',
        isOfficial: true
      },
      {
        id: 2,
        user: 'unknown_user_99',
        text: '오늘도 너무 아름다우십니다... 💜',
        time: '2h',
        isOfficial: false
      }
    ]
  },
  {
    id: 2,
    image: 'https://i.postimg.cc/2SVRNwPM/inge2.png', // inge2
    likes: '89.2K',
    comments: 531,
    location: 'Shanghai, China',
    caption: '노을이 지는 바다. 모두 새해 소원은 비셨나요? 2026년도 화이팅. #2026#화이팅',
    date: '1 DAY AGO',
    initialComments: [
      {
        id: 1,
        user: 'kim_gamin_sec',
        text: '회장님, 내일 조찬 미팅 일정 재확인했습니다. 편히 쉬십시오.',
        time: '5h',
        isOfficial: true
      },
      {
        id: 2,
        user: 'sunset_lover',
        text: '새해 복 많이 받으세요 언니!! 🌅 분위기 미쳤다...',
        time: '12h',
        isOfficial: false
      }
    ]
  },
  {
    id: 3,
    image: 'https://i.postimg.cc/nhCbfk6N/inge3.png', // inge3
    likes: '210K',
    comments: 1204,
    location: 'Penthouse',
    caption: '새 가방 장만. 내가 노력해서 얻은 결과물. #Newbag#명품#Star',
    date: '3 DAYS AGO',
    initialComments: [
      {
        id: 1,
        user: 'kim_gamin_sec',
        text: '구매하신 물품들, 드레스룸으로 정리해두겠습니다.',
        time: '1d',
        isOfficial: true
      },
      {
        id: 2,
        user: 'fashion_week_lover',
        text: '이번 시즌 한정판 아닌가요? 대박...',
        time: '1d',
        isOfficial: false
      }
    ]
  },
  {
    id: 4,
    image: 'https://i.postimg.cc/pL4NWjvL/inge4.png', // inge4
    likes: '156K',
    comments: 945,
    location: 'Private Party',
    caption: '도시 앞에서. 가끔은 숨이 막힌다. #City#Selfie#help',
    date: '5 DAYS AGO',
    initialComments: [
      {
        id: 1,
        user: 'kim_gamin_sec',
        text: '...회장님, 어디 계십니까. 바로 모시러 가겠습니다.',
        time: '5d',
        isOfficial: true
      },
      {
        id: 2,
        user: 'unknown_user_99',
        text: '분위기 대박... 근데 뭔가 슬퍼보여요 ㅠㅠ',
        time: '5d',
        isOfficial: false
      }
    ]
  },
  {
    id: 5,
    image: 'https://i.postimg.cc/XYmMj5W9/inge5.png', // inge5
    likes: '45.1K',
    comments: 0,
    location: 'Gangneung',
    caption: '거울 앞에서 찰칵. 오늘 착장 어때요? #OOTD#New#Mirror#Selfie',
    date: '1 WEEK AGO',
    initialComments: [
      {
        id: 1,
        user: 'kim_gamin_sec',
        text: '오늘 의상 점검 완료했습니다. 차량 대기 중입니다.',
        time: '1w',
        isOfficial: true
      },
      {
        id: 2,
        user: 'style_icon_daily',
        text: '착장 정보 좀 부탁드려요! 너무 예뻐요 언니 ❤️',
        time: '1w',
        isOfficial: false
      }
    ]
  },
  {
    id: 6,
    image: 'https://i.postimg.cc/3wvsdwrG/inge6.png', // inge6
    likes: '3.2K',
    comments: 21,
    location: 'Unknown',
    caption: '오늘도 열심히 업무 중. 곧 우리 백화점에 신상 들어오니까 많은 관심 부탁드려요. #천화원#2026할인행사',
    date: '2 WEEKS AGO',
    initialComments: [
      {
        id: 1,
        user: 'kim_gamin_sec',
        text: '행사 관련 결재 서류 준비되었습니다. 확인 부탁드립니다.',
        time: '2w',
        isOfficial: true
      },
      {
        id: 2,
        user: 'shopping_holic',
        text: '오픈런 대기 중입니다! 이번 세일 기대돼요!!',
        time: '2w',
        isOfficial: false
      }
    ]
  }
];