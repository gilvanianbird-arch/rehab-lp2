"use client";

import { useState, useEffect } from "react";

/* ─────────────────────────────────────────
   データ定義
───────────────────────────────────────── */

const painItems = [
  { icon: "🚶", text: "歩くのが不安定で外出が怖い" },
  { icon: "🏠", text: "家族の介助負担が日々増している" },
  { icon: "🏥", text: "また入院しないか常に不安がある" },
  { icon: "💪", text: "退院後から体力が落ちていく一方" },
  { icon: "📋", text: "病院のリハビリが終わってしまった" },
  { icon: "😔", text: "外出できず気力も低下している" },
];

const strengths = [
  {
    num: "01",
    title: "回復期病棟10年以上の経験",
    desc: "脳血管・整形・廃用など幅広い病態に対応。退院直後の難しい時期を知り尽くした専門家が担当します。",
  },
  {
    num: "02",
    title: "完全個別プログラム",
    desc: "FIM評価・筋力・バランスを丁寧に評価し、その方だけのリハビリ計画を作成。画一的な対応は一切しません。",
  },
  {
    num: "03",
    title: "家族へのケア指導も同時に",
    desc: "介助の方法や転倒予防策を家族にもお伝え。ご家族の負担軽減にもつながります。",
  },
];

const beforeItems = [
  "歩行が不安定で室内でも転倒リスク",
  "外出できず家に閉じこもりがち",
  "家族がつきっきりで介助が必要",
  "再入院への不安で意欲も低下",
];

const afterItems = [
  "安定した歩行で近所へ一人で外出",
  "日常生活動作が自立してきた",
  "家族の介助負担が大幅に軽減",
  "目標を持って前向きに過ごせる",
];

const services = [
  "身体機能の専門的評価（バランス・筋力・歩行能力）",
  "個別リハビリプログラムの立案と実施",
  "歩行訓練・筋力トレーニング・バランス練習",
  "日常生活動作（ADL）の改善指導",
  "転倒予防のための環境調整アドバイス",
  "家族・介護者への介助指導",
];

const flowSteps = [
  {
    title: "無料相談（お電話・LINE）",
    desc: "現在の状態や困りごとをお聞かせください。どんな小さな相談でも歓迎です。",
  },
  {
    title: "初回訪問・評価",
    desc: "ご自宅にお伺いし、身体機能・生活環境・ご要望を丁寧に評価します。",
  },
  {
    title: "プログラム提案",
    desc: "評価結果をもとに、個別リハビリ計画をご説明。ご納得いただいてから開始します。",
  },
  {
    title: "リハビリ開始",
    desc: "定期的に訪問し、目標に向けて一緒に取り組みます。進捗に応じてプランを調整します。",
  },
];

const voices = [
  {
    text: "退院後の生活に本当に不安でしたが、毎回丁寧に対応してくれて安心できました。歩ける距離が少しずつ伸びてきています。",
    meta: "70代・女性 / 脳梗塞後のリハビリ",
  },
  {
    text: "病院に行かなくてもリハビリが受けられるのが助かります。母の変化が目に見えてわかり、家族全員が喜んでいます。",
    meta: "ご家族様 / 骨折術後のリハビリ",
  },
];

const faqs = [
  {
    q: "介護保険は使えますか？",
    a: "介護保険の適用については、ご状況により異なります。詳しくは無料相談時にご確認ください。自費サービスとしてもご利用いただけます。",
  },
  {
    q: "対応エリアはどこですか？",
    a: "現在は北九州市周辺を中心に対応しています。詳細なエリアについてはお問い合わせください。",
  },
  {
    q: "週に何回来てもらえますか？",
    a: "ご状態やご希望に応じて週1〜3回程度で対応しています。まずはご相談ください。",
  },
  {
    q: "退院してすぐでも相談できますか？",
    a: "はい、むしろ退院直後からのスタートをおすすめしています。退院後の身体の変化が大きい時期に早めに介入することで、より効果的なリハビリが期待できます。",
  },
];

type Case = {
  id: number;
  title: { rendered: string };
  acf: {
    age: string;
    disease: string;
    before: string;
    after: string;
  };
};

/* ─────────────────────────────────────────
   サブコンポーネント
───────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-xs font-bold tracking-widest text-orange-500 mb-3 uppercase">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-10 leading-snug">
      {children}
    </h2>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left px-5 py-4 font-bold text-sm text-gray-900 hover:bg-gray-50 transition-colors"
      >
        <span>{q}</span>
        <span
          className={`text-green-600 text-xl transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   メインページ
───────────────────────────────────────── */

export default function Home() {
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    fetch("http://rehab-lp2.local/wp-json/wp/v2/case")
      .then((res) => res.json())
      .then((data) => setCases(data));
  }, []);
  return (
    <main className="bg-gray-50 text-gray-800 font-sans">

      {/* ① ヒーロー */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white py-16 px-4 text-center">
        {/* 背景デコレーション */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-orange-100 opacity-40 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-orange-100 opacity-30 pointer-events-none" />

        <div className="relative max-w-2xl mx-auto">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest px-4 py-1 rounded-full mb-5">
            理学療法士による訪問リハビリ
          </span>

          <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-5 text-gray-900">
            退院後の<span className="text-orange-600">転倒・再入院を防ぐ</span>
            <br />
            訪問リハビリサービス
          </h1>

          <p className="text-gray-500 text-sm md:text-base leading-loose mb-8">
            病院経験豊富な理学療法士がご自宅に訪問し、<br />
            一人ひとりに合わせたリハビリで
            <strong className="text-gray-700">安心して生活できる身体</strong>をつくります。
          </p>

          {/* CTAカード */}
          <div className="bg-white rounded-2xl shadow-lg px-6 py-7 max-w-sm mx-auto">
            <p className="text-xs text-gray-400 mb-3">まずは気軽にご相談ください</p>
            <button className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white w-full py-4 rounded-xl font-bold text-base tracking-wide transition-all">
              無料相談はこちら →
            </button>
          </div>

          {/* 信頼バッジ */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-500">
            {["理学療法士が直接対応", "初回相談無料", "土日祝も対応可"].map((t) => (
              <span key={t} className="flex items-center gap-1">
                <span className="text-green-500 font-bold">✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ② 悩み */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-2xl mx-auto">
          <SectionLabel>こんなお悩みはありませんか？</SectionLabel>
          <SectionTitle>
            退院後に「こんなはずじゃ
            <br />
            なかった」と感じていませんか
          </SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {painItems.map(({ icon, text }) => (
              <div
                key={text}
                className="bg-white border border-orange-200 rounded-xl px-4 py-4 flex items-center gap-3 text-sm font-medium text-orange-900"
              >
                <span className="text-xl">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ③ 解決策 */}
      <section className="py-16 px-4 bg-orange-50 text-center">
        <div className="max-w-xl mx-auto">
          <SectionLabel>解決策</SectionLabel>
          <SectionTitle>
            そのお悩み、
            <br />
            訪問リハビリで解決できます
          </SectionTitle>
          <p className="text-gray-600 text-sm md:text-base leading-loose">
            <span className="bg-orange-200 text-orange-900 font-bold px-2 py-0.5 rounded">
              病院経験のある理学療法士
            </span>
            がご自宅に訪問し、
            <br />
            退院後の身体状態を専門的に評価。
            <br />
            一人ひとりに最適なリハビリプログラムで
            <br />
            日常生活の不安を取り除きます。
          </p>
        </div>
      </section>

      {/* ④ 強み */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>選ばれる理由</SectionLabel>
          <SectionTitle>3つの強み</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strengths.map(({ num, title, desc }) => (
              <div
                key={num}
                className="border border-orange-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <p className="text-4xl font-bold text-orange-600 leading-none mb-3">{num}</p>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤ Before / After */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <SectionLabel>変化の実例</SectionLabel>
          <SectionTitle>リハビリでここまで変わります</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-red-200 rounded-2xl p-5">
              <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                Before
              </span>
              <ul className="space-y-2 text-sm text-gray-600">
                {beforeItems.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">・</span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border-2 border-green-200 rounded-2xl p-5">
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                After
              </span>
              <ul className="space-y-2 text-sm text-gray-600">
                {afterItems.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">・</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 症例（WordPress連携） */}
<section className="py-16 px-4 bg-white">
  <div className="max-w-2xl mx-auto">
    <SectionLabel>症例紹介</SectionLabel>
    <SectionTitle>実際の改善事例</SectionTitle>

    <div className="space-y-6">
      {cases.map((c) => (
        <div key={c.id} className="border rounded-xl p-5 shadow-sm">
          <h3
            className="font-bold text-lg mb-2"
            dangerouslySetInnerHTML={{ __html: c.title.rendered }}
          />

          <p className="text-sm text-gray-500 mb-2">
            {c.acf?.age} / {c.acf?.disease}
          </p>

          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Before：</strong>{c.acf?.before}</p>
            <p><strong>After：</strong>{c.acf?.after}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ⑥ サービス内容 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-xl mx-auto">
          <SectionLabel>提供内容</SectionLabel>
          <SectionTitle>サービス内容</SectionTitle>
          <ul className="space-y-3">
            {services.map((s) => (
              <li
                key={s}
                className="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl px-4 py-3 text-sm font-medium text-orange-900"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ⑦ 流れ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-md mx-auto">
          <SectionLabel>ご利用の流れ</SectionLabel>
          <SectionTitle>ご相談から開始まで</SectionTitle>
          <ol className="relative space-y-0">
            {flowSteps.map(({ title, desc }, i) => (
              <li key={title} className="flex gap-4 pb-8 relative">
                {/* 縦線 */}
                {i < flowSteps.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-orange-100" />
                )}
                <div className="w-10 h-10 rounded-full bg-orange-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 z-10">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ⑧ お客様の声 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <SectionLabel>ご利用者様の声</SectionLabel>
          <SectionTitle>お客様の声</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {voices.map(({ text, meta }) => (
              <div
                key={meta}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5"
              >
                <p className="text-sm text-gray-700 leading-loose italic mb-3">
                  「{text}」
                </p>
                <p className="text-xs text-gray-400">{meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑨ FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-xl mx-auto">
          <SectionLabel>よくある質問</SectionLabel>
          <SectionTitle>FAQ</SectionTitle>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <FaqItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ⑩ 最終CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug mb-4">
            一歩踏み出す勇気が、
            <br />
            生活を変えます。
          </h2>
          <p className="text-white text-sm mb-8 leading-loose">
            まずはお気軽にご相談ください。費用・内容・対応エリアなど、
            <br />
            どんなことでもお答えします。
          </p>
          <button className="bg-white text-orange-700 font-bold text-base px-10 py-4 rounded-xl hover:bg-orange-50 active:scale-95 transition-all">
            無料相談はこちら →
          </button>
        </div>
      </section>
      <section className="py-20 px-4 text-center bg-gray-50">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">運営会社</h2>
          <p>〇〇株式会社</p>
          <p>所在地：〇〇</p>
          <p>事業内容：訪問リハビリ事業</p>
        </div>
      </section>

      {/* 固定フッターCTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3 pb-safe">
        <button className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm py-3.5 rounded-xl w-full max-w-md mx-auto block transition-all">
          📞 無料相談はこちら（完全無料）
        </button>
      </div>

      {/* 固定CTAの高さ分のスペーサー */}
      <div className="h-20" />
    </main>
  );
}
