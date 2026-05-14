/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  X, 
  RotateCcw, 
  MapPin, 
  Sparkles, 
  Music, 
  Coffee, 
  ChevronRight, 
  Share2,
  Trophy,
  History,
  Plane,
  Copy
} from 'lucide-react';

// --- Types ---

type Category = 'travel' | 'experience' | 'entertainment' | 'food' | 'random';

interface Question {
  id: string;
  text: string;
  category: Category;
}

interface Answer {
  questionId: string;
  value: boolean;
}

// --- Constants ---

const QUESTIONS: Question[] = [
  // Travel
  { id: 't1', text: '47都道府県すべてに行ったことがある', category: 'travel' },
  { id: 't2', text: '海外に行ったことがある', category: 'travel' },
  { id: 't3', text: '一人カラオケをしたことがある', category: 'travel' },
  { id: 't4', text: '登山したことがある', category: 'travel' },
  { id: 't5', text: 'フェリーに乗ったことがある', category: 'travel' },
  { id: 't6', text: '寝台特急に乗ったことがある', category: 'travel' },
  { id: 't7', text: '五島列島や小笠原諸島などの離島に行ったことがある', category: 'travel' },
  { id: 't8', text: '沖縄の綺麗な海で泳いだことがある', category: 'travel' },
  { id: 't9', text: '北海道で本場のジンギスカンを食べたことがある', category: 'travel' },
  { id: 't10', text: '新幹線の中で駅弁を食べたことがある', category: 'travel' },
  { id: 't11', text: '飛行機に乗ったことがある', category: 'travel' },
  { id: 't12', text: 'キャンプをしてテントで一晩過ごしたことがある', category: 'travel' },
  { id: 't13', text: '水族館に行ったことがある', category: 'travel' },
  { id: 't14', text: '動物園で動物に餌をあげたことがある', category: 'travel' },
  { id: 't15', text: '雪国で自分が入れるくらいの「かまくら」を作ったことがある', category: 'travel' },
  { id: 't16', text: 'スキー場でスキーやスノーボードをしたことがある', category: 'travel' },
  { id: 't17', text: '鳥取砂丘などの砂漠のような場所を歩いたことがある', category: 'travel' },
  { id: 't18', text: '鍾乳洞（しょうにゅうどう）の中に入って冒険したことがある', category: 'travel' },
  { id: 't19', text: '大きな滝の裏側に入ったことがある', category: 'travel' },
  { id: 't20', text: 'ロープウェイに乗って山の頂上まで行ったことがある', category: 'travel' },
  { id: 't21', text: '高速道路のサービスエリアでソフトクリームを食べたことがある', category: 'travel' },
  { id: 't22', text: '大きなフェリーに乗って海を渡ったことがある', category: 'travel' },
  { id: 't23', text: 'お寺や神社でおみくじを引いて「大吉」を出したことがある', category: 'travel' },
  { id: 't24', text: '高いビルの展望台から街の夜景を見たことがある', category: 'travel' },
  { id: 't25', text: '観光牧場で牛の乳搾り体験をしたことがある', category: 'travel' },
  { id: 't26', text: '足がすくむような高い吊り橋を渡りきったことがある', category: 'travel' },
  { id: 't27', text: '誰もいないような無人駅で電車を待ったことがある', category: 'travel' },
  
  // Experience
  { id: 'e1', text: 'スカイダイビングをしたことがある', category: 'experience' },
  { id: 'e2', text: 'バンジージャンプを飛んだことがある', category: 'experience' },
  { id: 'e3', text: 'フルマラソン（42.195km）を完走したことがある', category: 'experience' },
  { id: 'e4', text: '幽霊やUFOなどの不思議な現象を見たことがある', category: 'experience' },
  { id: 'e5', text: '漫画などを大人買いしたことがある', category: 'experience' },
  { id: 'e6', text: 'テレビ番組や映画に映ったことがある', category: 'experience' },
  { id: 'e7', text: 'オーロラを生で見たことがある', category: 'experience' },
  { id: 'e8', text: '鉄棒の「逆上がり」が完璧にできる', category: 'experience' },
  { id: 'e9', text: '犬や猫などのペットを飼ったことがある', category: 'experience' },
  { id: 'e10', text: '骨折をしてギプスを巻いたことがある', category: 'experience' },
  { id: 'e11', text: '大きなショッピングモールで迷子になったことがある', category: 'experience' },
  { id: 'e12', text: '自然の中で自力で「四つ葉のクローバー」を見つけたことがある', category: 'experience' },
  { id: 'e13', text: '夜空を見上げて「流れ星」が流れる瞬間を見たことがある', category: 'experience' },
  { id: 'e14', text: '派手に転んで両膝（りょうひざ）を擦りむいたことがある', category: 'experience' },
  { id: 'e15', text: '有名人にファンレターを出して返事が来たことがある', category: 'experience' },
  { id: 'e16', text: '田んぼや小川で野生のアマガエルを捕まえたことがある', category: 'experience' },
  { id: 'e17', text: '一人で電車に乗って買い物に行ったことがある', category: 'experience' },
  { id: 'e18', text: '逆立ちをして10秒以上キープできる', category: 'experience' },
  { id: 'e19', text: '空中逆上がりなどの難しい鉄棒の技ができる', category: 'experience' },
  
  // Entertainment
  { id: 'en1', text: 'ディズニーランドとシーの両方を制覇している', category: 'entertainment' },
  { id: 'en2', text: 'テーマパークに行ったことがある', category: 'entertainment' },
  { id: 'en3', text: '推しのライブやコンサートで遠征したことがある', category: 'entertainment' },
  { id: 'en4', text: 'VRゲームをしていて酔ってしまったことがある', category: 'entertainment' },
  { id: 'en5', text: 'サウナの「整う」を完璧に理解している', category: 'entertainment' },
  { id: 'en6', text: '本格的な脱出ゲームをクリアしたことがある', category: 'entertainment' },
  { id: 'en7', text: 'ゲーム機（Switchなど）で100時間以上遊んだソフトがある', category: 'entertainment' },
  { id: 'en8', text: '好きなYouTuberの動画を毎日欠かさずチェックしている', category: 'entertainment' },
  { id: 'en9', text: '映画館でポップコーンを盛大にこぼしたことがある', category: 'entertainment' },
  { id: 'en10', text: '漫画を1巻から最新巻まで一気に読んだことがある', category: 'entertainment' },
  { id: 'en11', text: 'ピアノやギターなどの楽器を何か演奏できる', category: 'entertainment' },
  { id: 'en12', text: '自分で動画を撮影して編集までしたことがある', category: 'entertainment' },
  { id: 'en13', text: '一歩も外に出ず、1日中パジャマで過ごしたことがある', category: 'entertainment' },
  { id: 'en14', text: '冬の寒い日に綺麗なイルミネーションを見に行ったことがある', category: 'entertainment' },
  { id: 'en15', text: 'カラオケの採点で100点（または自己ベスト）を出したことがある', category: 'entertainment' },
  { id: 'en16', text: 'お祭りの屋台の「射的」を成功させたことがある', category: 'entertainment' },
  { id: 'en17', text: 'クレーンゲームで狙った大きなぬいぐるみをゲットしたことがある', category: 'entertainment' },
  { id: 'en18', text: 'プロ野球やJリーグの試合をスタジアムで生観戦したことがある', category: 'entertainment' },
  { id: 'en19', text: '劇場にミュージカルや演劇を観に行ったことがある', category: 'entertainment' },
  { id: 'en20', text: '1000ピース以上の巨大なジグソーパズルを完成させたことがある', category: 'entertainment' },
  { id: 'en21', text: 'プラネタリウムの暗闇の中で気持ちよく寝てしまったことがある', category: 'entertainment' },
  { id: 'en22', text: '遊園地にある激しめのジェットコースターに乗ったことがある', category: 'entertainment' },
  { id: 'en23', text: 'アスレチックパーク（公園）で遊んで全身が筋肉痛になったことがある', category: 'entertainment' },
  { id: 'en24', text: 'トレーディングカードを熱心に集めている（または集めていた）', category: 'entertainment' },
  
  // Food
  { id: 'f1', text: '激辛料理を食べすぎてお腹を壊したことがある', category: 'food' },
  { id: 'f2', text: 'パクチーを「飲み物」と言えるくらい大好きだ', category: 'food' },
  { id: 'f3', text: '昆虫食（コオロギなど）を勇気を出して食べたことがある', category: 'food' },
  { id: 'f4', text: '蛇やワニ、ラクダなどの珍しい肉を食べたことがある', category: 'food' },
  { id: 'f5', text: '納豆が大好きで、毎日でも食べられる', category: 'food' },
  { id: 'f6', text: '梅干しを食べて、あまりの酸っぱさに顔が歪んだことがある', category: 'food' },
  { id: 'f7', text: '材料の準備から片付けまで、自分でカレーを作ったことがある', category: 'food' },
  { id: 'f8', text: 'お箸を使って豆を一粒ずつ運ぶことができる', category: 'food' },
  { id: 'f9', text: 'ラーメンのスープを最後の一滴まで飲み干したことがある', category: 'food' },
  { id: 'f10', text: 'ホールケーキを自分一人で全部食べてみたいと思った（または食べた）', category: 'food' },
  { id: 'f11', text: '畑で収穫したばかりの野菜をその場で丸かじりしたことがある', category: 'food' },
  { id: 'f12', text: '魚を一匹まるごと三枚におろしたことがある', category: 'food' },
  { id: 'f13', text: '今まで大嫌いだった食べ物を、今は克服して食べられる', category: 'food' },
  { id: 'f14', text: '駄菓子屋さんで「100円ぴったり」になるように買い物をしたことがある', category: 'food' },
  { id: 'f15', text: 'かき氷を急いで食べて、頭が「キン」と痛くなったことがある', category: 'food' },
  { id: 'f16', text: 'お正月間に「お餅」を一度に3つ以上食べたことがある', category: 'food' },
  { id: 'f17', text: '竹で作った本格的な「流しそうめん」をしたことがある', category: 'food' },
  { id: 'f18', text: 'バーベキューでマシュマロを焼いてトロトロにして食べたことがある', category: 'food' },
  { id: 'f19', text: 'ベランダや庭で自分で育てた本物の野菜を食べたことがある', category: 'food' },
  { id: 'f20', text: '回転寿司に行って、一人で20皿以上食べたことがある', category: 'food' },
  { id: 'f21', text: 'クッキーやケーキなどの手作りお菓子を誰かにプレゼントしたことがある', category: 'food' },
  { id: 'f22', text: '寿司屋で「わさび抜き」を卒業した', category: 'food' },
  { id: 'f23', text: '料理を焦がしてしまい、部屋中を煙（けむり）だらけにしたことがある', category: 'food' },
  { id: 'f24', text: '「松茸（まつたけ）」を土瓶蒸しや焼き物で食べたことがある', category: 'food' },
  { id: 'f25', text: '本場の「北京ダック」をお腹いっぱい食べたことがある', category: 'food' },
  { id: 'f26', text: '「キャビア・フォアグラ・トリュフ」の三大珍味をすべて食べたことがある', category: 'food' },
  { id: 'f27', text: '「ドリアン」の強烈な匂いに耐えて食べたことがある', category: 'food' },
  { id: 'f28', text: '「ジビエ料理（シカやイノシシの肉）」をワイルドに食べたことがある', category: 'food' },
  { id: 'f29', text: '「ふぐの白子」をやけどしそうになりながら食べたことがある', category: 'food' },
  { id: 'f30', text: '自分で釣ったばかりの「ピチピチの魚」をその場で食べたことがある', category: 'food' },
  { id: 'f31', text: '世界一臭いと言われる「シュールストレミング」を勇気を出して食べたことがある', category: 'food' },
  { id: 'f32', text: '1パック数千円するような「超高級フルーツ」を贅沢に食べたことがある', category: 'food' },
  { id: 'f33', text: '青白くカビの生えた「ブルーチーズ」を好んで食べたことがある', category: 'food' },
];

const CATEGORY_MAP = {
  travel: { label: '旅行・場所', icon: Plane, color: 'bg-blue-500' },
  experience: { label: '特別な経験', icon: Sparkles, color: 'bg-purple-500' },
  entertainment: { label: '娯楽・遊び', icon: Music, color: 'bg-pink-500' },
  food: { label: 'グルメ・食', icon: Coffee, color: 'bg-orange-500' },
  random: { label: 'ランダム全種', icon: History, color: 'bg-gray-800' },
};

// --- Components ---

export default function App() {
  const [view, setView] = useState<'home' | 'play' | 'result'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [currentIndex]);

  const currentQuestions = useMemo(() => {
    if (!selectedCategory) return [];
    
    let filtered = [];
    if (selectedCategory === 'random') {
      filtered = [...QUESTIONS];
    } else {
      filtered = QUESTIONS.filter(q => q.category === selectedCategory);
    }

    // シャッフルして10問を抽出
    return filtered
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  }, [selectedCategory]);

  const handleStart = (category: Category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setAnswers([]);
    setView('play');
    setFeedback(null);
  };

  const handleCopy = () => {
    const text = currentQuestions[currentIndex].text;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnswer = (value: boolean) => {
    const questionId = currentQuestions[currentIndex].id;
    setAnswers(prev => [...prev, { questionId, value }]);
    setFeedback(value ? 'yes' : 'no');
    
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < currentQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setView('result');
      }
    }, 400); // フィードバック表示時間
  };

  const handleReset = () => {
    setView('home');
    setSelectedCategory(null);
    setCurrentIndex(0);
    setAnswers([]);
    setFeedback(null);
  };

  const yesCount = answers.filter(a => a.value).length;
  const progressPercent = currentQuestions.length > 0 
    ? ((currentIndex + 1) / currentQuestions.length) * 100 
    : 0;

  const getRank = (count: number) => {
    if (count >= 9) return { label: '経験マスター', color: 'text-yellow-500' };
    if (count >= 7) return { label: 'プロ冒険家', color: 'text-orange-500' };
    if (count >= 5) return { label: 'アクティブ派', color: 'text-green-500' };
    if (count >= 3) return { label: 'これからに期待', color: 'text-blue-500' };
    return { label: 'ビギナー', color: 'text-gray-500' };
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] grid-pattern selection:bg-black selection:text-white flex flex-col items-center py-12 px-6">
      {/* Header with Marquee-like feel */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center relative"
      >
        <button 
          onClick={handleReset}
          className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black tracking-[0.3em] uppercase mb-4 brutal-shadow-sm hover:bg-yellow-400 hover:text-black transition-colors cursor-pointer"
        >
          Talking Tool Kit
        </button>
        <h1 
          onClick={handleReset}
          className="text-7xl sm:text-8xl font-display font-black tracking-tighter italic leading-[0.8] mb-4 cursor-pointer hover:text-gray-700 transition-colors"
        >
          EXPERI
        </h1>
        <div className="h-0.5 w-full bg-black mt-2" />
      </motion.div>

      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white border-2 border-black p-8 brutal-shadow relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-400 border-2 border-black rounded-full brutal-shadow-sm hidden sm:block group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-black mb-4 relative z-10 font-display uppercase italic">
                  Let's Talk
                </h2>
                <p className="text-lg font-bold leading-tight relative z-10">
                  質問にYES/NOで答えてみよう
                </p>
                <p className="text-sm text-gray-500 mt-2 font-medium">
                  どんなことを経験したことがある？
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(Object.keys(CATEGORY_MAP) as Category[]).map((cat, idx) => {
                  const info = CATEGORY_MAP[cat];
                  const Icon = info.icon;
                  return (
                    <motion.button
                      key={cat}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleStart(cat)}
                      className="group relative flex flex-col p-6 bg-white border-2 border-black brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 text-left h-48"
                      id={`category-btn-${cat}`}
                    >
                      <div className={`${info.color} w-12 h-12 border-2 border-black brutal-shadow-sm group-hover:shadow-none mb-auto flex items-center justify-center transition-all`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className="block text-xl font-black uppercase tracking-tighter leading-none mb-1">{info.label}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Start Deck</span>
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {view === 'play' && (
            <motion.div
              key="play"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8"
            >
              {/* Progress */}
              <div className="relative">
                <div className="w-full bg-white border-2 border-black h-8 brutal-shadow-sm overflow-hidden flex items-center px-4">
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] z-10 pointer-events-none">
                    Progress: {currentIndex + 1} / {currentQuestions.length}
                  </div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className="absolute left-0 top-0 h-full bg-yellow-400 border-r-2 border-black"
                  />
                </div>
              </div>

              {/* Question Area */}
              <div className="relative min-h-[400px] flex flex-col">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="flex-1 bg-white border-4 border-black brutal-shadow-lg p-10 flex flex-col justify-center relative overflow-hidden"
                >
                  {/* Feedback Overlay */}
                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none ${feedback === 'yes' ? 'bg-green-500/10' : 'bg-red-500/10'}`}
                      >
                        {feedback === 'yes' ? (
                          <div className="bg-white border-4 border-black p-6 brutal-shadow-sm transform rotate-6">
                            <span className="text-4xl font-black text-green-600 uppercase">Yes!</span>
                          </div>
                        ) : (
                          <div className="bg-white border-4 border-black p-6 brutal-shadow-sm transform -rotate-6">
                            <span className="text-4xl font-black text-red-600 uppercase">No...</span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-start mb-6">
                    <div className="inline-block px-2 py-0.5 bg-black text-white text-[9px] font-black uppercase tracking-widest">
                      {selectedCategory && CATEGORY_MAP[selectedCategory].label}
                    </div>
                    <button
                      onClick={handleCopy}
                      className="p-2 border-2 border-black brutal-shadow-sm bg-white hover:bg-yellow-400 transition-colors flex items-center gap-2 group/copy"
                      title="お題をコピー"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-[10px] font-black uppercase">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 group-hover/copy:scale-110 transition-transform" />
                          <span className="text-[10px] font-black uppercase">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                    {currentQuestions[currentIndex].text}
                  </h3>

                  <div className="absolute -bottom-10 -right-10 font-display font-black text-[120px] opacity-[0.03] select-none italic">
                    {String(currentIndex + 1).padStart(2, '0')}
                  </div>
                </motion.div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <button
                    disabled={feedback !== null}
                    onClick={() => handleAnswer(true)}
                    className="group flex flex-col items-center justify-center py-10 bg-[#E8F5E9] border-2 border-black brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                    id="ans-yes"
                  >
                    <Check className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-black italic">YES</span>
                  </button>
                  <button
                    disabled={feedback !== null}
                    onClick={() => handleAnswer(false)}
                    className="group flex flex-col items-center justify-center py-10 bg-[#FFEBEE] border-2 border-black brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                    id="ans-no"
                  >
                    <X className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-black italic">NO</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <button 
                  onClick={handleReset} 
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black flex items-center gap-1 transition-colors group"
                >
                  <RotateCcw className="w-3 h-3 group-hover:rotate-[-45deg] transition-transform" /> Quit Session
                </button>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Experi // v1.2
                </div>
              </div>
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-white border-2 border-black brutal-shadow-lg relative">
                <div className="p-8 border-b-2 border-black text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400" />
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                  <div className="text-sm font-black uppercase tracking-[0.4em] text-gray-400 mb-2">Result Card</div>
                  <div className="text-8xl font-display font-black tracking-tighter leading-none mb-4 italic">
                    {yesCount}<span className="text-2xl font-bold align-top ml-2">/10</span>
                  </div>
                  <div className={`text-2xl font-black uppercase italic ${getRank(yesCount).color}`}>
                    {getRank(yesCount).label}
                  </div>
                </div>

                <div className="p-8">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    Experiences Mastered
                  </h4>
                  <div className="space-y-3 max-h-[320px] overflow-y-auto pr-4 custom-scrollbar">
                    {answers.map((ans, idx) => {
                      const q = QUESTIONS.find(q => q.id === ans.questionId);
                      return (
                        <div key={idx} className={`p-4 border-2 border-black brutal-shadow-sm flex items-start gap-4 ${ans.value ? 'bg-green-50' : 'bg-gray-50 opacity-60'}`}>
                          <div className={`mt-1 p-1 border-2 border-black ${ans.value ? 'bg-black text-white' : 'bg-white'}`}>
                            {ans.value ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          </div>
                          <span className="text-sm font-bold leading-tight">{q?.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-8 border-t-2 border-black bg-black text-white">
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => {
                        const text = `Experiで私の経験をチェックしました！\n結果: ${yesCount}/10\n称号: ${getRank(yesCount).label}\n#Experi #トークツール`;
                        navigator.clipboard.writeText(text);
                        alert('結果をコピーしました！');
                      }}
                      className="bg-white text-black p-4 font-black uppercase italic tracking-tighter hover:bg-yellow-400 transition-colors"
                      id="share-btn"
                    >
                      Share Score
                    </button>
                    <button 
                      onClick={handleReset}
                      className="border-2 border-white p-4 font-black uppercase italic tracking-tighter hover:bg-white hover:text-black transition-colors"
                      id="retry-btn"
                    >
                      New Deck
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center px-8">
                <p className="text-sm font-bold text-gray-500 italic">
                  これらの「YES」のエピソードについて詳しく聞いてみよう！
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Floaters for Desktop */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 hidden lg:block">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-[10%] w-32 h-32 border-2 border-black bg-purple-100 brutal-shadow-sm opacity-20" 
        />
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-20 right-[10%] w-40 h-40 border-2 border-black bg-yellow-100 rounded-full brutal-shadow-sm opacity-20" 
        />
      </div>
    </div>
  );
}
