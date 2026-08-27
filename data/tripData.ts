export interface Highlight {
  name: string;
  description: string;
  lat: number;
  lng: number;
}

export interface TacticalProtocol {
  title: string;
  detail: string;
}

export interface TripDay {
  day: number;
  date: string;
  title: string;
  campsite: {
    name: string;
    lat: number;
    lng: number;
  } | null;
  vibeOutfit: string;
  tacticalProtocols: TacticalProtocol[];
  highlights: Highlight[];
}

export const tripData: TripDay[] = [
  {
    day: 1,
    date: '2026-09-19',
    title: 'TPE ➔ AKL ➔ CHC ➔ Geraldine',
    campsite: {
      name: 'Geraldine TOP 10 Holiday Park',
      lat: -44.095,
      lng: 171.244,
    },
    vibeOutfit: '【極致舒適】垂墜感寬褲 + 貼身內搭 + 針織外套 + 運動鞋',
    tacticalProtocols: [
      { title: '【搭接駁車去取車】', detail: '乘車點位於國內抵達區1-2號門外' },
      {
        title: '[物流防禦]',
        detail:
          '避開市區，於 1 號公路順向的 Rolleston 區大型超市進行首波生鮮採買。',
      },
      {
        title: '[駐車索求]',
        detail:
          '備註要求 Drive-through 與靠近設施的平整營位，消除首日倒車壓力。',
      },
    ],
    highlights: [
      {
        name: '裝備展開與平原巡航',
        description:
          "PAK'nSAVE Rolleston採買物資。領取Apollo Euro Tourer，行李全數攤平於床下儲物艙。傍晚在林地營區體驗車內客廳與駐車暖氣。Geraldine 河邊傍晚非常舒服。不用排行程。買杯 Flat White。坐30分鐘。就是很棒的第一天。",
        lat: -43.5964,
        lng: 172.3964,
      },
    ],
  },
  {
    day: 2,
    date: '2026-09-20',
    title: 'Geraldine ➔ Tekapo ➔ Mt Cook',
    campsite: {
      name: 'Glentanner Park Centre',
      lat: -43.903,
      lng: 170.128,
    },
    vibeOutfit: '【溫柔湖畔】粗針織毛衣 + 傘狀長裙 + 切爾西短靴 + 羊毛大衣',
    tacticalProtocols: [
      { title: '[水資源歸零]', detail: '離開 Tekapo 前於鎮上 PDS 排空水箱。' },
      {
        title: '[時間閘門]',
        detail: '14:30 壓線抵達營地櫃檯，交涉索取無遮蔽的雪山景觀第一排營位。',
      },
    ],
    highlights: [
      {
        name: 'Fairlie Bakehouse',
        description: '買派當午餐',
        lat: -44.0983,
        lng: 170.8321,
      },
      {
        name: 'Church of the Good Shepherd',
        description: '好牧羊人教堂，快速拍照後撤退',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -44.003,
        lng: 170.482,
      },
      {
        name: "Peter's Lookout",
        description: '完美的湖景與雪山拍攝點，露營車停車友善',
        lat: -44.0885,
        lng: 170.1425,
      },
    ],
  },
  {
    day: 3,
    date: '2026-09-21',
    title: 'Mt Cook (定點)',
    campsite: {
      name: 'Glentanner Park Centre',
      lat: -43.903,
      lng: 170.128,
    },
    vibeOutfit:
      '【輕裝健行】微直筒牛仔褲 + 高領發熱衣 + 針織毛衣 + 短版羽絨外套 + 運動鞋 + 針織毛帽',
    tacticalProtocols: [
      {
        title: '[拔營與防禦紀律]',
        detail:
          '06:15 拔營甦醒：起床盥洗。準備便攜式早餐。07:00 車廂防禦確認。07:15 實體佔位與斷電。07:30 啟動引擎出發。',
      },
      { title: '[時間閘門]', detail: '07:50 進入 White Horse Hill 停車場。' },
    ],
    highlights: [
      {
        name: 'Hooker Valley Track',
        description: '來回3小時，建議8點前到較好停車',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -43.718,
        lng: 170.092,
      },
      {
        name: 'Tasman Glacier Viewpoint',
        description: '下午體力充足時的備案',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -43.698,
        lng: 170.165,
      },
    ],
  },
  {
    day: 4,
    date: '2026-09-22',
    title: 'Mt Cook ➔ Wanaka',
    campsite: {
      name: 'Glendhu Bay Motor Camp',
      lat: -44.662,
      lng: 169.043,
    },
    vibeOutfit: '【公路旅行】垂墜感寬褲 + 針織外套 + 羊毛大衣 + 運動鞋',
    tacticalProtocols: [
      {
        title: '[黑水傾倒與補給]',
        detail:
          '南下途經 Twizel 鎮上免費 Dump Station 徹底清空。並完成超市及油箱及清水補給',
      },
      {
        title: '[側風應對]',
        detail: '啞口易有強陣風，7.1m 車體遇風扯動時強制降速至 80 km/h 以下。',
      },
    ],
    highlights: [
      {
        name: 'High Country Salmon',
        description: '高山鮭魚',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -44.296,
        lng: 170.091,
      },
      {
        name: 'Lindis Pass Viewpoint',
        description: '高山公路最高點，風勢強勁',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -44.585,
        lng: 169.645,
      },
      {
        name: 'New World Three Parks',
        description: '購物中心超市採買生鮮補充2天食物',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -44.713,
        lng: 169.155,
      },
      {
        name: 'That Wanaka Tree',
        description: '瓦納卡孤獨樹拍攝',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -44.697,
        lng: 169.117,
      },
    ],
  },
  {
    day: 5,
    date: '2026-09-23',
    title: 'Wanaka (定點)',
    campsite: {
      name: 'Glendhu Bay Motor Camp',
      lat: -44.662,
      lng: 169.043,
    },
    vibeOutfit: '【靈活戶外】微直筒牛仔褲 + 貼身內搭 + 短版羽絨外套 + 運動鞋',
    tacticalProtocols: [
      {
        title: '[物資盤點]',
        detail:
          '檢查車內生鮮庫存與油量，為進入物價較高、補給點較少的峽灣區做準備。',
      },
    ],
    highlights: [
      {
        name: 'Diamond Lake & Rocky Mountain Track',
        description:
          '沿著 Mount Aspiring Road 往西走，約 25～30 分鐘可達登山口。登頂 Rocky Mountain 來回約 3 小時',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -44.646,
        lng: 168.956,
      },
      {
        name: 'Millennium Track',
        description: '千禧步道湖畔漫步，入口營區步行1分鐘',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -44.685,
        lng: 169.091,
      },
    ],
  },
  {
    day: 6,
    date: '2026-09-24',
    title: 'Wanaka ➔ Te Anau',
    campsite: {
      name: 'Te Anau Lakeview Holiday Park',
      lat: -45.421,
      lng: 167.712,
    },
    vibeOutfit: '【小鎮漫遊】傘狀長裙 + 粗針織毛衣 + 切爾西短靴',
    tacticalProtocols: [
      {
        title: '[路線封印]',
        detail:
          '嚴禁駛入 Crown Range 高山捷徑。強制繞行 SH6 經 Cromwell 南下，確保長軸車輛安全。',
      },
    ],
    highlights: [
      {
        name: 'Frankton 購物區',
        description: "Pak'nSave 或 Woolworths補充物資",
        // 🟢 Please fill in here: 請填入確切座標
        lat: -45.018,
        lng: 168.741,
      },
      {
        name: 'Jones Family Fruit Stall',
        description: '補給新鮮水果及水果冰淇淋',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -45.031,
        lng: 169.215,
      },
      {
        name: "Devil's Staircase Viewpoint",
        description: '避車灣可靠邊停靠',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -45.204,
        lng: 168.747,
      },
      {
        name: 'Five Rivers Café',
        description: 'Lumsden 附近休息喝咖啡',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -45.589,
        lng: 168.455,
      },
      {
        name: 'Te Anau Bird Sanctuary',
        description: '免費看塔卡赫鳥 Takahe',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -45.426,
        lng: 167.705,
      },
    ],
  },
  {
    day: 7,
    date: '2026-09-25',
    title: 'Te Anau (定點)',
    campsite: {
      name: 'Te Anau Lakeview Holiday Park',
      lat: -45.421,
      lng: 167.712,
    },
    vibeOutfit:
      '【重裝防禦】微直筒牛仔褲 + 高領發熱衣 + 針織毛衣 + 短版羽絨外套 + 毛帽 + 披肩圍巾',
    tacticalProtocols: [
      {
        title: '[駕駛特休]',
        detail:
          '徹底放棄自駕 Milford Road 的高壓勞動。將駕駛任務外包，兩人在大巴上安心補眠與觀景。',
      },
    ],
    highlights: [
      {
        name: 'Milford Sound 峽灣遊船',
        description:
          '千條瀑布與特有生態。搭乘玻璃頂大巴深入峽灣。欣賞初春融雪激發的壯觀瀑布群，並在遊船上尋找 9 月限定的峽灣冠企鵝蹤跡。',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -44.671,
        lng: 167.925,
      },
    ],
  },
  {
    day: 8,
    date: '2026-09-26',
    title: 'Te Anau ➔ Arrowtown',
    campsite: {
      name: 'Arrowtown Holiday Park',
      lat: -44.941,
      lng: 168.832,
    },
    vibeOutfit:
      '【復古文青】傘狀長裙 + 高領內搭 + 針織外套 + 羊毛大衣 + 貝雷帽 + 短靴',
    tacticalProtocols: [
      {
        title: '[營地防禦]',
        detail:
          '選擇腹地廣大且寧靜的箭鎮營區，規避皇后鎮市區極度狹窄且難以停靠 7.1m 車輛的觀光熱區。',
      },
    ],
    highlights: [
      {
        name: 'Arrowtown Main St',
        description: '漫步 Buckingham St 主街與古鎮風情',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -44.941,
        lng: 168.83,
      },
      {
        name: 'Arrow River Trail',
        description: '魔戒取景地步道',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -44.938,
        lng: 168.835,
      },
    ],
  },
  {
    day: 9,
    date: '2026-09-27',
    title: 'Arrowtown ➔ Omarama',
    campsite: {
      name: 'Omarama TOP 10 Holiday Park',
      lat: -44.485,
      lng: 169.971,
    },
    vibeOutfit: '【便捷穿脫】垂墜感寬褲 + 簡單上衣 + 羊毛大衣',
    tacticalProtocols: [
      {
        title: '[黑冰閃避]',
        detail:
          '通過 Lindis Pass 的時間強制鎖定在 10:00 至 15:00 之間，利用日照溫度確保路面暗冰徹底消退。',
      },
    ],
    highlights: [
      {
        name: 'Kawarau Gorge Suspension Bridge',
        description: '高空彈跳發源地，可下車看別人跳',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -45.013,
        lng: 168.901,
      },
      {
        name: 'Roaring Meg Lookout',
        description: '水壩觀景台',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -45.011,
        lng: 169.047,
      },
      {
        name: 'Hot Tubs Omarama',
        description: '獨立柴燒浴桶，已預定18:30分時段',
        // 🟢 Please fill in here: 請填入確切座標
        lat: -44.482,
        lng: 169.976,
      },
    ],
  },
  {
    day: 10,
    date: '2026-09-28',
    title: 'Omarama ➔ CHC ➔ AKL',
    campsite: null,
    vibeOutfit: '【俐落移動】微直筒牛仔褲 + 高領內搭 + 針織外套 + 運動鞋',
    tacticalProtocols: [
      {
        title: '[長征收尾]',
        detail:
          '08:30 拔營出發。在營地徹底清空灰/黑水。沿 1 號公路北上，中午在 Ashburton 用餐，下午 14:00 在基督城機場附近的 Yaldhurst 或 Hornby 區域加滿柴油。14:45 抵達 Apollo 門市還車',
      },
    ],
    highlights: [],
  },
];
