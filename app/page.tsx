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

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#study">
        본문으로 건너뛰기
      </a>

      <div className="ambient" aria-hidden="true" />
      <div className="page-shell">
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="Erlking Archive 처음으로">
            Erlking<span>.</span>
          </a>
          <nav aria-label="페이지 섹션">
            <a href="#study">Study</a>
            <a href="#projects">Projects</a>
            <a
              href="https://github.com/leejinh0225"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </header>

        <section className="masthead" id="top" aria-labelledby="archive-title">
          <p className="eyebrow"><span /> Personal index · 2026</p>
          <h1 id="archive-title">Archive.</h1>
          <div className="masthead-meta" aria-label="아카이브 구성">
            <span>02 study tracks</span>
            <span>04 projects</span>
          </div>
        </section>

        <section className="content-section" id="study" aria-labelledby="study-title">
          <div className="section-heading">
            <div>
              <p className="section-number">01 / Study</p>
              <h2 id="study-title">공부 자료</h2>
            </div>
            <p className="section-note">강의별 학습 노트와 원문 자료</p>
          </div>

          <div className="study-grid">
            <article className="study-card study-card--active">
              <div className="card-topline">
                <span className="status status--live"><i /> Live</span>
                <span className="course-code">MC2103</span>
              </div>
              <div>
                <p className="card-kicker">Course archive</p>
                <h3>Dynamics</h3>
                <p className="card-description">
                  원본 강의 슬라이드와 영어 스크립트를 대조한 한국어 학습 노트
                </p>
              </div>
              <div className="card-actions">
                <a
                  className="primary-link"
                  href="https://leejinh0225.github.io/MC2103-Dynamics/"
                  target="_blank"
                  rel="noreferrer"
                >
                  학습 노트 열기 <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="icon-link"
                  href="https://github.com/leejinh0225/MC2103-Dynamics"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="MC2103 Dynamics GitHub 저장소 열기"
                >
                  GH
                </a>
              </div>
            </article>

            <article className="study-card study-card--active" aria-label="유체역학 학습 노트">
              <div className="card-topline">
                <span className="status status--live"><i /> Live</span>
                <span className="course-code">MC2102</span>
              </div>
              <div>
                <p className="card-kicker">Course archive</p>
                <h3>Fluid Mechanics</h3>
                <p className="card-description">
                  유체역학 강의별 학습 노트와 원문 자료
                </p>
              </div>
              <div className="card-actions">
                <a className="primary-link" href="https://leejinh0225.github.io/MC2102-Fluid/index.html" target="_blank" rel="noreferrer">
                  학습 노트 열기 <span aria-hidden="true">↗</span>
                </a>
                <a className="icon-link" href="https://github.com/leejinh0225/MC2102-Fluid" target="_blank" rel="noreferrer" aria-label="MC2102 Fluid Mechanics GitHub 저장소 열기">GH</a>
              </div>
            </article>
          </div>
        </section>

        <section className="content-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <div>
              <p className="section-number">02 / Projects</p>
              <h2 id="projects-title">프로젝트</h2>
            </div>
            <p className="section-note">GitHub 저장소 생성일 최신순</p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <a
                className="project-row"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.repo}
              >
                <span className="project-index">{project.index}</span>
                <span className="project-main">
                  <strong>{project.title}</strong>
                  <span>{project.description}</span>
                </span>
                <span className="project-meta">
                  <span>{project.date}</span>
                  <span className="repo-name">GIST-ISAAC-Robotics/{project.repo}</span>
                </span>
                <span className="project-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        <footer>
          <span>Erlking Archive</span>
          <span>Built on GitHub Pages · 2026</span>
        </footer>
      </div>
    </main>
  );
}
