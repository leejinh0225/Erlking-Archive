import { Fragment, type CSSProperties } from 'react';
import Interactions from './interactions';
import StudyPlan from './study-plan';

const courses = [
  {
    code: 'MC2202',
    name: '공업수학 2',
    english: 'Engineering Mathematics II',
    description: '공업수학 2 강의자료를 바탕으로 한 한국어 개념 해설과 상세 문제 풀이.',
    notes: 'https://leejinh0225.github.io/MC2202-Engineering-Mathematics-2/',
    repo: 'https://github.com/leejinh0225/MC2202-Engineering-Mathematics-2',
  },
  {
    code: 'MC2103',
    name: '동역학',
    english: 'Dynamics',
    description: '원본 강의 슬라이드와 영어 스크립트를 대조한 한국어 학습 노트.',
    notes: 'https://leejinh0225.github.io/MC2103-Dynamics/',
    repo: 'https://github.com/leejinh0225/MC2103-Dynamics',
  },
  {
    code: 'MC2102',
    name: '유체역학',
    english: 'Fluid Mechanics',
    description: '유체역학 강의별 학습 노트와 원문 자료.',
    notes: 'https://leejinh0225.github.io/MC2102-Fluid/index.html',
    repo: 'https://github.com/leejinh0225/MC2102-Fluid',
  },
];

const projects = [
  {
    index: '01',
    title: 'IT ARENA',
    repo: '2026-IT-ARENA',
    date: '2026.08.30',
    description: '자율주행 차량의 센서 구성과 제어를 다루는 IT ARENA 프로젝트',
    href: 'https://github.com/GIST-ISAAC-Robotics/2026-IT-ARENA',
  },
  {
    index: '02',
    title: 'PnP Study',
    repo: '2026-pnp-study',
    date: '2026.07.26',
    description: 'ROS 2 기반 perception-to-manipulation 흐름을 익히는 Pick & Place 스터디',
    href: 'https://github.com/GIST-ISAAC-Robotics/2026-pnp-study',
  },
  {
    index: '03',
    title: 'Drawing Machine',
    repo: 'drawing-machine-gcode-tool',
    date: '2026.07.24',
    description: '드로잉 머신 시연을 위한 이미지–G-code 변환 도구',
    href: 'https://github.com/GIST-ISAAC-Robotics/drawing-machine-gcode-tool',
  },
  {
    index: '04',
    title: 'Table Tennis Robot',
    repo: 'takgu2025',
    date: '2026.07.22',
    description: '탁구 로봇의 스테레오 비전 코드 백업과 해설',
    href: 'https://github.com/GIST-ISAAC-Robotics/takgu2025',
  },
];

const marqueeWords = ['강의 노트', '문제 풀이', '로봇 비전', '코드 해설'];

const order = (i: number) => ({ '--i': i }) as CSSProperties;

function Letters({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span key={i} style={order(i)} aria-hidden="true">
          {ch}
        </span>
      ))}
    </>
  );
}

export const dynamic = 'force-static';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#plan">
        본문으로 건너뛰기
      </a>

      <header className="nav">
        <div className="wrap nav-bar">
          <a className="wm" href="#top" aria-label="Erlking Archive 처음으로">
            Erlking<b>.</b>
          </a>
          <nav className="nav-links" aria-label="섹션">
            <span className="nav-pill" aria-hidden="true" />
            <a href="#plan">시험 계획</a>
            <a href="#study">학습 노트</a>
            <a href="#projects">프로젝트</a>
            <span className="nav-dot" aria-hidden="true" />
          </nav>
          <span className="spacer" />
          <button className="btn icon-btn" id="themeBtn" type="button" aria-label="다크 모드로 전환">
            <span className="ic" id="iconMoon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
              </svg>
            </span>
            <span className="ic" id="iconSun" hidden>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            </span>
          </button>
          <a className="btn btn-secondary btn-sm" href="https://github.com/leejinh0225" target="_blank" rel="noreferrer">
            GitHub <span className="arr ne" aria-hidden="true">↗</span>
          </a>
          <button
            className="btn icon-btn menu-btn"
            id="menuBtn"
            type="button"
            aria-expanded="false"
            aria-controls="mMenu"
            aria-label="메뉴 열기"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line className="l1" x1="4" y1="7" x2="20" y2="7" />
              <line className="l2" x1="4" y1="12" x2="20" y2="12" />
              <line className="l3" x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
        <nav className="m-menu" id="mMenu" aria-label="섹션 메뉴" hidden>
          <div className="wrap">
            <a href="#plan" style={order(0)}>
              시험 계획
            </a>
            <a href="#study" style={order(1)}>
              학습 노트
            </a>
            <a href="#projects" style={order(2)}>
              프로젝트
            </a>
            <a href="https://github.com/leejinh0225" target="_blank" rel="noreferrer" style={order(3)}>
              GitHub
            </a>
          </div>
        </nav>
        <span className="progress" aria-hidden="true" />
      </header>

      <main id="top">
        {/* ============================ HERO ============================ */}
        <section className="hero" aria-labelledby="archive-title">
          <div className="amb" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="wrap hero-copy">
            <p className="hero-label">
              <b>Erlking</b>의 개인 아카이브
            </p>
            <h1 className="mark" id="archive-title" aria-label="Archive.">
              <Letters text="Archive." />
            </h1>
            <p className="lead">강의별 학습 노트와 로봇 프로젝트 저장소를 한곳에 모은 개인 인덱스.</p>
            <div className="btn-row">
              <a className="btn btn-primary" href="#plan" data-magnetic>
                시험 계획 보기 <span className="arr down" aria-hidden="true">↓</span>
              </a>
              <a className="btn btn-secondary" href="#study">
                학습 노트 <span className="arr down" aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="hero-meta">
              <span>
                강의 노트<b className="num">{courses.length}개</b>
              </span>
              <span>
                로봇 프로젝트<b className="num">{projects.length}개</b>
              </span>
            </p>
          </div>
        </section>

        {/* ============================ EXAM PLAN ============================ */}
        <StudyPlan />

        {/* ============================ STUDY ============================ */}
        <section className="block" id="study" aria-labelledby="study-title">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="title" id="study-title" data-reveal>
                강의별 학습 노트
              </h2>
              <p data-reveal style={order(1)}>
                강의 자료와 스크립트를 바탕으로 정리한 한국어 해설과 문제 풀이. 과목마다 노트 사이트와 GitHub 저장소를 함께
                둡니다.
              </p>
            </div>
            <div className="grid g3">
              {courses.map((c, i) => (
                <article className="cell course" key={c.code} data-reveal style={order(i)} aria-label={`${c.name} 학습 노트`}>
                  <div className="course-top">
                    <span className="label num course-code">{c.code}</span>
                    <span className="tag">
                      <i aria-hidden="true" />
                      공개 중
                    </span>
                  </div>
                  <h3 className="heading">{c.name}</h3>
                  <p className="course-en">{c.english}</p>
                  <p className="small">{c.description}</p>
                  <div className="course-actions">
                    <a className="btn btn-secondary btn-sm" href={c.notes} target="_blank" rel="noreferrer">
                      노트 열기 <span className="arr ne" aria-hidden="true">↗</span>
                    </a>
                    <a
                      className="text-link"
                      href={c.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${c.code} ${c.english} GitHub 저장소 열기`}
                    >
                      <span className="u">GitHub 저장소</span>
                      <span className="arr ne" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ PROJECTS ============================ */}
        <section className="block" id="projects" aria-labelledby="projects-title">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="title" id="projects-title" data-reveal>
                로봇 프로젝트
              </h2>
              <p data-reveal style={order(1)}>
                GIST-ISAAC-Robotics에 올린 동아리 프로젝트 저장소. 최근에 만든 순서.
              </p>
            </div>
            <div className="rows">
              {projects.map((p, i) => (
                <a className="row" href={p.href} target="_blank" rel="noreferrer" key={p.repo} data-reveal style={order(i)}>
                  <span className="row-i">{p.index}</span>
                  <span className="row-main">
                    <strong>{p.title}</strong>
                    <span>{p.description}</span>
                  </span>
                  <span className="row-meta">
                    <span>{p.date}</span>
                    <span>{p.repo}</span>
                  </span>
                  <span className="row-arrow" aria-hidden="true">
                    <span>↗</span>
                    <span>↗</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ MARQUEE ============================ */}
        <div className="marquee" aria-hidden="true">
          <div className="mq-track">
            {[0, 1].map((set) => (
              <div className="mq-set" key={set}>
                {marqueeWords.map((w) => (
                  <Fragment key={w}>
                    <span className="w">{w}</span>
                    <i />
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ============================ CLOSING (dark) ============================ */}
        <section className="closing" data-theme="dark" data-follow-zone aria-labelledby="closing-title">
          <div className="ember-rise" aria-hidden="true">
            <div className="ember-wide" data-follow />
          </div>
          <div className="wrap">
            <div className="sec-head">
              <h2 className="display" id="closing-title" data-reveal>
                기록으로 남긴
                <br />
                공부와 로봇
              </h2>
              <p data-reveal style={order(1)}>
                강의 노트와 프로젝트 코드는 모두 GitHub에. 개인 저장소와 동아리 저장소를 나눠 둡니다.
              </p>
            </div>
            <div className="btn-row" data-reveal style={order(2)}>
              <a className="btn btn-primary" href="https://github.com/leejinh0225" target="_blank" rel="noreferrer" data-magnetic>
                GitHub 프로필 <span className="arr ne" aria-hidden="true">↗</span>
              </a>
              <a className="btn btn-secondary" href="https://github.com/GIST-ISAAC-Robotics" target="_blank" rel="noreferrer">
                ISAAC 저장소 <span className="arr ne" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <p className="mega" aria-label="Erlking.">
            <Letters text="Erlking." />
          </p>
          <div className="foot-row">
            <span className="foot">Erlking Archive · GitHub Pages · 2026</span>
            <a className="foot" href="#top">
              <span className="u">맨 위로</span>{' '}
              <span className="arr up" aria-hidden="true">
                ↑
              </span>
            </a>
          </div>
        </div>
      </footer>

      <Interactions />
    </>
  );
}
