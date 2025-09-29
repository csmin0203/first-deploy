import Image from "next/image";
import generalData from '../data/general.json';
import portfolioData from '../data/portfolio.json';
import type { GeneralData, PortfolioData } from '../types.ts';

// 서버 컴포넌트에서 직접 API 호출
async function getResumeInfo() {
  const res = await fetch('https://raw.githubusercontent.com/dMario24/first-deploy/refs/heads/main/service/resume_general_info_service.json');
  // API 응답이 성공적인지 확인
  if (!res.ok) {
    // 응답이 실패하면 오류를 던져 Next.js가 오류 페이지를 보여주도록 함
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {

  const typedGeneralData = generalData as GeneralData;
  const typedPortfolioData = portfolioData as PortfolioData;


  const data = await getResumeInfo();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://namu.wiki/w/%ED%82%B9%EB%B6%80%EB%81%84"
          alt="Next.js logo"
          width={333}
          height={38}
          priority
        />
        {/* --- 프로필 섹션 --- */}
        <section className="w-full text-center py-20 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
          <h1 className="text-5xl font-extrabold">{typedGeneralData.name}</h1>
          <p className="text-lg mt-4 text-gray-300">A Passionate Developer</p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href={typedGeneralData.links.github}
              target="_blank"
              className="bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${typedGeneralData.links.contact}`}
              className="border border-white text-white font-semibold py-2 px-6 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
          </div>
        </section>

        {/* --- 프로젝트 섹션 --- */}
        <section className="w-full max-w-4xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold mb-8 border-b-2 pb-2">Projects</h2>
          <div className="space-y-6">
            {typedPortfolioData.project.map((p, index) => (
              <div key={index} className="p-6 border rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                <a
                  href={p.url}
                  target="_blank"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  View on GitHub ↗
                </a>
              </div>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
}
