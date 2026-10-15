/*
 * 시험 기간 공부 계획 (2026.10.15 – 10.22)
 * 날짜·시간·진도는 여기서만 고치면 메인의 계획 섹션에 그대로 반영됩니다.
 * hours: 막대 길이 계산용 숫자, time: 화면에 보이는 표기
 */

export type Subject = 'dyn' | 'math' | 'fluid';

export const subjects: Record<Subject, { name: string; short: string }> = {
  dyn: { name: '동역학', short: '동역학' },
  math: { name: '공업수학 2', short: '공수' },
  fluid: { name: '유체역학', short: '유체' },
};

export type Task = { subject: Subject; hours: number; time: string; goal: string };

export type PlanDay = {
  date: string; // YYYY-MM-DD (KST)
  exam?: Subject; // 그날 치르는 시험
  note?: string; // 시험 전·후 같은 짧은 메모
  tasks: Task[];
};

export const planRange = { start: '2026-10-15', end: '2026-10-22' };

export const plan: PlanDay[] = [
  {
    date: '2026-10-15',
    tasks: [
      { subject: 'dyn', hours: 3, time: '3시간', goal: 'L01 요약 · L02~03' },
      { subject: 'math', hours: 1.5, time: '1.5시간', goal: '푸리에 급수' },
      { subject: 'fluid', hours: 2.5, time: '2.5시간', goal: 'Ch.1~2' },
    ],
  },
  {
    date: '2026-10-16',
    tasks: [
      { subject: 'dyn', hours: 3, time: '3시간', goal: 'L04~05' },
      { subject: 'math', hours: 1.5, time: '1.5시간', goal: '푸리에 적분·변환' },
      { subject: 'fluid', hours: 2.5, time: '2.5시간', goal: 'Ch.2 마무리 · Ch.3 시작' },
    ],
  },
  {
    date: '2026-10-17',
    tasks: [
      { subject: 'dyn', hours: 3, time: '3시간', goal: 'L06~08' },
      { subject: 'math', hours: 1.5, time: '1.5시간', goal: 'PDE I' },
      { subject: 'fluid', hours: 2.5, time: '2.5시간', goal: 'Ch.3 중심, 가능하면 Ch.4 시작' },
    ],
  },
  {
    date: '2026-10-18',
    note: '동역학 집중',
    tasks: [
      {
        subject: 'dyn',
        hours: 6.5,
        time: '6~7시간',
        goal: '남은 개념·예제 보완 → 대표 문제 직접 풀기 → 치팅시트 완성',
      },
    ],
  },
  {
    date: '2026-10-19',
    exam: 'dyn',
    note: '시험 후',
    tasks: [
      { subject: 'math', hours: 3, time: '3시간', goal: 'PDE II → PDE III 시작' },
      { subject: 'fluid', hours: 4, time: '4시간', goal: 'Ch.4까지 첫 학습 마무리, 족보 적용' },
    ],
  },
  {
    date: '2026-10-20',
    note: '공업수학 2 집중',
    tasks: [
      { subject: 'math', hours: 7, time: '약 7시간', goal: 'PDE III 남은 부분 → 전 범위 총정리·문제·오답' },
    ],
  },
  {
    date: '2026-10-21',
    exam: 'math',
    note: '시험 후',
    tasks: [
      { subject: 'fluid', hours: 6.5, time: '6~7시간', goal: '족보 재풀이 · 취약 개념 보완 · 치팅시트 완성' },
    ],
  },
  {
    date: '2026-10-22',
    exam: 'fluid',
    note: '시험 전',
    tasks: [{ subject: 'fluid', hours: 1.5, time: '1~2시간', goal: '오답·부호·단위·치팅시트 최종 확인' }],
  },
];

/** 막대 전체 길이에 해당하는 시간 */
export const maxHours = 7;
